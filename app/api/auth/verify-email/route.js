import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { createId } from "@paralleldrive/cuid2";

const jsonHeader = { "Content-Type": "application/json" };

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Verification token is required" }),
      {
        status: 400,
        headers: jsonHeader,
      }
    );
  }

  try {
    // Find EmailVerification record by token
    const emailVerification = await prisma.emailVerification.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!emailVerification) {
      return new Response(
        JSON.stringify({ error: "Invalid verification token" }),
        {
          status: 400,
          headers: jsonHeader,
        }
      );
    }

    // Check if already verified
    if (emailVerification.verifiedAt) {
      return new Response(
        JSON.stringify({ error: "Email has already been verified" }),
        {
          status: 400,
          headers: jsonHeader,
        }
      );
    }

    // Check if token has expired
    if (new Date() > emailVerification.expiresAt) {
      return new Response(
        JSON.stringify({ error: "Verification token has expired" }),
        {
          status: 400,
          headers: jsonHeader,
        }
      );
    }

    // Check if user is already verified (edge case)
    if (emailVerification.user.emailVerified) {
      // Mark this verification as used anyway
      await prisma.emailVerification.update({
        where: { id: emailVerification.id },
        data: { verifiedAt: new Date() },
      });

      return new Response(
        JSON.stringify({ message: "Email is already verified" }),
        {
          status: 200,
          headers: jsonHeader,
        }
      );
    }

    // Update EmailVerification: set verifiedAt
    await prisma.emailVerification.update({
      where: { id: emailVerification.id },
      data: { verifiedAt: new Date() },
    });

    // Create Stripe customer
    let customer;
    try {
      customer = await stripe.customers.create({
        email: emailVerification.user.email,
      });
    } catch (stripeError) {
      console.error("Error creating Stripe customer:", stripeError);
      return new Response(
        JSON.stringify({
          error: "Failed to create Stripe customer. Please contact support.",
        }),
        {
          status: 500,
          headers: jsonHeader,
        }
      );
    }

    // Update User: set emailVerified: true and stripeCustomerId
    await prisma.user.update({
      where: { id: emailVerification.user.id },
      data: {
        emailVerified: true,
        stripeCustomerId: customer.id,
      },
    });

    // Create subscription record
    try {
      await prisma.subscription.create({
        data: {
          id: createId(),
          userId: emailVerification.user.id,
          plan: "MONTHLY",
          status: "TRIAL",
          createdAt: new Date(),
          currentPeriodEnd: new Date(
            Date.now() + 10 * 365 * 24 * 60 * 60 * 1000
          ),
        },
      });
    } catch (subscriptionError) {
      console.error("Error creating subscription:", subscriptionError);
      // Don't fail verification if subscription creation fails
      // User can still log in and subscription can be created later
    }

    // Optionally: invalidate other pending verification records for this user
    await prisma.emailVerification.updateMany({
      where: {
        userId: emailVerification.user.id,
        verifiedAt: null,
        id: { not: emailVerification.id },
      },
      data: {
        verifiedAt: new Date(), // Mark as "used" by setting verifiedAt
      },
    });

    return new Response(
      JSON.stringify({
        message: "Email verified successfully! You can now log in.",
      }),
      {
        status: 200,
        headers: jsonHeader,
      }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred during verification. Please try again.",
      }),
      {
        status: 500,
        headers: jsonHeader,
      }
    );
  }
}

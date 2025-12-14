import prisma from "@/lib/prisma";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/email";
import { createId } from "@paralleldrive/cuid2";
import joi from "joi";

const jsonHeader = { "Content-Type": "application/json" };

const resendSchema = joi.object({
  email: joi.string().email().required(),
});

export async function POST(req) {
  const body = await req.json();

  // Validate the request body
  const { error, value } = resendSchema.validate(body);
  if (error) {
    return new Response(
      JSON.stringify({
        error: "Validation error: " + error.details[0].message,
      }),
      {
        status: 400,
        headers: jsonHeader,
      }
    );
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: value.email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      return new Response(
        JSON.stringify({
          message:
            "If an account exists with this email, a verification email has been sent.",
        }),
        {
          status: 200,
          headers: jsonHeader,
        }
      );
    }

    // Check if user is already verified
    if (user.emailVerified) {
      return new Response(
        JSON.stringify({
          message: "This email has already been verified.",
        }),
        {
          status: 200,
          headers: jsonHeader,
        }
      );
    }

    // Optionally: invalidate existing pending verification records
    await prisma.emailVerification.updateMany({
      where: {
        userId: user.id,
        verifiedAt: null,
      },
      data: {
        verifiedAt: new Date(), // Mark as "used" by setting verifiedAt
      },
    });

    // Generate new token
    const verificationToken = generateVerificationToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Create new EmailVerification record
    try {
      await prisma.emailVerification.create({
        data: {
          id: createId(),
          userId: user.id,
          token: verificationToken,
          expiresAt: expiresAt,
        },
      });
    } catch (verificationError) {
      console.error("Error creating verification record:", verificationError);
      return new Response(
        JSON.stringify({
          error: "Failed to create verification record. Please try again.",
        }),
        {
          status: 500,
          headers: jsonHeader,
        }
      );
    }

    // Send new verification email
    const emailResult = await sendVerificationEmail(
      value.email,
      verificationToken
    );

    if (!emailResult.success) {
      console.error("Failed to send verification email:", emailResult.error);
      return new Response(
        JSON.stringify({
          error: "Failed to send verification email. Please try again later.",
        }),
        {
          status: 500,
          headers: jsonHeader,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Verification email has been sent. Please check your inbox.",
      }),
      {
        status: 200,
        headers: jsonHeader,
      }
    );
  } catch (error) {
    console.error("Error resending verification email:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred. Please try again later.",
      }),
      {
        status: 500,
        headers: jsonHeader,
      }
    );
  }
}

import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

// Initialize Stripe using your secret key (replace with your actual secret key or env variable)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    // Retrieve the Checkout Session to get session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer", "subscription"],
    });

    // Get the Stripe subscription ID from the session
    const stripeSubId = session.subscription?.id || session.subscription;
    if (!stripeSubId) {
      return NextResponse.json(
        { error: "Subscription ID not found on session." },
        { status: 404 }
      );
    }

    // Query Prisma for the Subscription linked by this Stripe subscription ID
    const subscription = await prisma.subscription.findUnique({
      where: {
        stripeSubId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({
      session,
      customer: session.customer,
      subscription, // Prisma Subscription info
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

// Stripe requires the raw body to verify the signature
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  let body;

  try {
    // Get the raw body as a buffer
    body = await req.arrayBuffer();
    const buf = Buffer.from(body);

    const signature = req.headers.get("stripe-signature");

    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(buf, signature, endpointSecret);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return new NextResponse("Webhook Error: " + err.message, {
          status: 400,
        });
      }
    } else {
      event = JSON.parse(buf.toString());
    }

    // --- Handle subscription logic on checkout.session.completed ---
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object;

      try {
        // Retrieve subscription from Stripe if present in session
        const stripeSubId = session.subscription;
        const stripeCustomerId = session.customer;

        if (!stripeSubId || !stripeCustomerId) {
          console.error("Missing subscription or customer ID in session.");
          return new NextResponse("Missing subscription info.", {
            status: 400,
          });
        }

        // Fetch full subscription details from Stripe (to get plan details)
        const stripeSub = await stripe.subscriptions.retrieve(stripeSubId);

        // Get price id, plan type
        const lookupKey = stripeSub.items.data[0]?.price?.lookup_key;

        // Determine plan type (schema uses: MONTHLY or YEARLY)
        let planType = "MONTHLY";
        if (
          lookupKey?.toLowerCase().includes("year") ||
          stripeSub.items.data[0]?.price?.recurring?.interval === "year"
        ) {
          planType = "YEARLY";
        }

        // Get current period end timestamp
        let currentPeriodEnd = new Date(
          stripeSub.items.data[0].current_period_end * 1000
        );

        // Find user by stripeCustomerId
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId },
        });

        if (!user) {
          console.error(
            "User not found for Stripe customer ID:",
            stripeCustomerId
          );
          return new NextResponse("User not found.", { status: 404 });
        }

        // Upsert/activate subscription for user in our DB
        await prisma.subscription.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            stripeSubId,
            plan: planType,
            status: "ACTIVE",
            currentPeriodEnd,
          },
          update: {
            stripeSubId,
            plan: planType,
            status: "ACTIVE",
            currentPeriodEnd,
          },
        });

        return new NextResponse(null, { status: 200 });
      } catch (err) {
        console.error(
          "Error updating subscription on checkout.session.completed:",
          err
        );
        return new NextResponse("Subscription update error", { status: 500 });
      }
    }

    // --- Handle subscription logic on customer.subscription.updated ---
    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object;
      const stripeSubId = subscription.id;
      const stripeCustomerId = subscription.customer;
      const status = subscription.status;
      const items = subscription.items?.data?.[0];
      const price = items?.price;
      const lookupKey = price?.lookup_key;

      let planType = "MONTHLY";
      if (
        lookupKey?.toLowerCase().includes("year") ||
        price?.recurring?.interval === "year"
      ) {
        planType = "YEARLY";
      }
      const currentPeriodEnd = subscription.items.data[0].current_period_end
        ? new Date(subscription.items.data[0].current_period_end * 1000)
        : null;

      // Find user by stripeCustomerId
      const user = await prisma.user.findUnique({
        where: { stripeCustomerId },
      });

      if (!user) {
        console.error(
          "User not found for Stripe customer ID:",
          stripeCustomerId
        );
        return new NextResponse("User not found.", { status: 404 });
      }

      // Map Stripe status to your app subscription status or flags
      let appStatus;
      if (status === "active") {
        // Full paid access
        appStatus = "ACTIVE";
      } else if (
        status === "past_due" ||
        status === "unpaid" ||
        status === "incomplete"
      ) {
        // Show payment warning (keep subscription active, set a "payment warning" flag maybe)
        appStatus = "WARNING";
      } else if (status === "canceled" || status === "incomplete_expired") {
        // Disable paid features
        appStatus = "CANCELED";
      } else {
        // Unhandled status, default to canceled for safety.
        appStatus = "CANCELED";
      }

      await prisma.subscription.update({
        where: { userId: user.id },
        data: {
          stripeSubId,
          plan: planType,
          status: appStatus,
          currentPeriodEnd,
          user: { connect: { id: user.id } },
        },
      });

      return new NextResponse(null, { status: 200 });
    }

    // Default: acknowledge event but do nothing
    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error("Webhook handler failed:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

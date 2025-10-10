import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

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

    let subscription;
    let status;

    switch (event.type) {
      case "customer.subscription.trial_will_end":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.deleted":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // handleSubscriptionDeleted(subscription);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // handleSubscriptionCreated(subscription);
        break;
      case "customer.subscription.updated":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // handleSubscriptionUpdated(subscription);
        break;
      case "entitlements.active_entitlement_summary.updated":
        subscription = event.data.object;
        console.log(`Active entitlement summary updated for ${subscription}.`);
        // handleEntitlementUpdated(subscription);
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error("Webhook handler failed:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
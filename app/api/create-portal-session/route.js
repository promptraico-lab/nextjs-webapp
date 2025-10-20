// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

import { getUserFromToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let customerId = null;

    if (contentType.startsWith("multipart/form-data")) {
      // Parse the form data from the request
      const formData = await req.formData();
      const session_id = formData.get("session_id");

      if (!session_id) {
        return NextResponse.json(
          { error: "Missing session_id in multipart/form-data request" },
          { status: 400 }
        );
      }

      // Retrieve the checkout session to get the customer ID
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

      if (!checkoutSession || !checkoutSession.customer) {
        return NextResponse.json(
          { error: "Invalid session or customer not found" },
          { status: 400 }
        );
      }

      customerId = checkoutSession.customer;
    } else {
      // Try to get stripeCustomerId from the JWT in the request header
      const user = await getUserFromToken(req);
      if (!user || !user.stripeCustomerId) {
        return NextResponse.json(
          { error: "No valid JWT or stripeCustomerId found" },
          { status: 400 }
        );
      }
      customerId = user.stripeCustomerId;
    }

    // Create the billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/pricing`,
    });

    // Respond with the billing portal URL
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

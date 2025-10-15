// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the form data from the request
    const formData = await req.formData();
    const session_id = formData.get("session_id");

    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
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

    // Create the billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/pricing`,
    });

    // Redirect to the billing portal
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

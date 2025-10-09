import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ["data.product"],
    });
    console.log(prices);

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices.data[0].id,
          // For usage-based billing, don't pass quantity
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/test?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/test?canceled=true`,
    });
    console.log(session);

    return NextResponse.redirect(session.url);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

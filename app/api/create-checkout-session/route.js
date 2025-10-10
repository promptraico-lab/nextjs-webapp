import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse form data from the request
    const formData = await req.formData();
    const lookup_key = formData.get("lookup_key");
    
    const prices = await stripe.prices.list({
      lookup_keys: [lookup_key],
      expand: ["data.product"],
    });
    console.log({ lookup_key });

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
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/thank-you?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/thank-you?canceled=true`,
    });

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

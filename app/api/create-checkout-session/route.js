import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // Parse form data from the request
    const formData = await req.formData();
    const lookup_key = formData.get("lookup_key");

    // Get cookie from request headers (Node.js, Next.js API Route)
    const cookie = req.headers.get("cookie") || "";
    // Extract promptr-auth-token value from cookie string
    const match = cookie.match(/promptr-auth-token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify and decode JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Retrieve user ID from the decoded JWT payload (assumes user id is in 'id' field)
    const userId = decoded.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    // Now, find user by ID
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: "No Stripe customer associated with this user." },
        { status: 400 }
      );
    }

    const prices = await stripe.prices.list({
      lookup_keys: [lookup_key],
      expand: ["data.product"],
    });

    if (!prices.data.length) {
      return NextResponse.json(
        { error: "Price not found for selected plan." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: user.stripeCustomerId,
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/thank-you?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/thank-you?canceled=true`,
    });

    // Determine request source and respond accordingly
    const source = req.headers.get("x-request-source");
    if (source && source.toLowerCase() === "extension") {
      return NextResponse.json({ url: session.url });
    } else {
      return NextResponse.redirect(session.url, { status: 303 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

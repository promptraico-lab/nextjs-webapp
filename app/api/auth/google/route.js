import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import jwt from "jsonwebtoken";
import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";
import { createId } from "@paralleldrive/cuid2";

// This is the Google redirect URL after login with @react-oauth/google
export async function POST(req) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const supabase = createClient(await cookies());

  try {
    let { user: googleUser } = await req.json();

    if (!googleUser) {
      return new Response(
        JSON.stringify({ message: "Missing user data from Google" }),
        { status: 400, headers }
      );
    }

    // Use Google email to find or create user in the DB
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
      include: {
        subscription: {
          select: {
            id: true,
            stripeSubId: true,
            plan: true,
            status: true,
            currentPeriodEnd: true,
          },
        },
      },
    });

    if (!user) {
      // Create Stripe customer using Google user's email
      const customer = await stripe.customers.create({
        email: googleUser.email,
      });

      // Create a new user in the database using Supabase
      const { data, error: userError } = await supabase
        .from("User")
        .insert([
          {
            id: createId(),
            email: googleUser.email,
            password: "",
            stripeCustomerId: customer.id,
          },
        ])
        .select("*")
        .single();

      if (userError) {
        return new Response(JSON.stringify({ error: userError.message }), {
          status: 500,
          headers: jsonHeader,
        });
      }
      user = data;
    }

    // Issue JWT like in /auth/login/route.js
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_PRIVATE_KEY
    );
    headers.set("X-Auth-Token", token);
    headers.set("Access-Control-Expose-Headers", "X-Auth-Token");

    // Remove password from user object before sending
    const { password: _, ...userResponse } = user;

    return new Response(JSON.stringify({ user: userResponse }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.log("Handeling google oauth: ", error);

    return new Response(
      JSON.stringify({
        message: "Error handling Google OAuth code",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { stripe } from "@/lib/stripe";

// This is the Google redirect URL after login with @react-oauth/google
export async function POST(req) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

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

      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          password: "",
          name: googleUser.name,
          stripeCustomerId: customer.id,
        },
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
    return new Response(
      JSON.stringify({
        message: "Error handling Google OAuth code",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

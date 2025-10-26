import joi from "joi";
import bcrypt from "bcrypt";
import { stripe } from "@/lib/stripe"; // ensure this import is available
import { createId } from "@paralleldrive/cuid2";
import prisma from "@/lib/prisma";

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const jsonHeader = { "Content-Type": "application/json" };

export async function POST(req) {
  const body = await req.json();

  // Validate the request body
  const { error, value } = registerSchema.validate(body);
  if (error) {
    return new Response(
      JSON.stringify({
        error: "Validation error: " + error.details[0].message,
      }),
      {
        status: 400,
        headers: jsonHeader,
      }
    );
  }

  // Check if user already exists using Supabase
  const existingUser = await prisma.user.findUnique({
    where: { email: value.email },
  });

  if (existingUser)
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
      headers: jsonHeader,
    });

  // Hash the password
  const hashedPassword = await bcrypt.hash(value.password, 10);

  // Create a Stripe customer
  const customer = await stripe.customers.create({
    email: value.email,
  });

  // Create a new user in the database using Supabase
  let newUser, userError;
  try {
    newUser = await prisma.user.create({
      data: {
        id: createId(),
        email: value.email,
        password: hashedPassword,
        stripeCustomerId: customer.id,
      },
    });
    userError = null;
  } catch (e) {
    newUser = null;
    userError = e;
  }

  if (userError) {
    return new Response(
      JSON.stringify({ error: "Could not create user: " + userError.message }),
      {
        status: 500,
        headers: jsonHeader,
      }
    );
  }

  // After user is created, create a subscription record for the user in the database
  let subscriptionError = null;
  try {
    await prisma.subscription.create({
      data: {
        id: createId(),
        userId: newUser.id,
        plan: "MONTHLY",
        status: "TRIAL",
        createdAt: new Date(),
        currentPeriodEnd: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
      },
    });
  } catch (e) {
    subscriptionError = e;
  }

  if (subscriptionError) {
    return new Response(
      JSON.stringify({
        error: "Could not create subscription: " + subscriptionError.message,
      }),
      {
        status: 500,
        headers: jsonHeader,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "User registered successfully",
      user: { email: newUser.email },
    }),
    {
      status: 201,
      headers: jsonHeader,
    }
  );
}

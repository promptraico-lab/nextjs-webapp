import joi from "joi";
import bcrypt from "bcrypt";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe"; // ensure this import is available
import { createId } from "@paralleldrive/cuid2";

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const jsonHeader = { "Content-Type": "application/json" };

export async function POST(req) {
  const supabase = createClient(await cookies());

  const body = await req.json();

  // Validate the request body
  const { error, value } = registerSchema.validate(body);
  if (error) {
    return new Response(JSON.stringify({ error: error.details[0].message }), {
      status: 400,
      headers: jsonHeader,
    });
  }

  // Check if user already exists using Supabase
  const { data: existingUser } = await supabase
    .from("User")
    .select("*")
    .eq("email", value.email)
    .single();

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

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: "price_1SGPBb08FpMa3rw4NVJ1wId1" }],
    trial_period_days: 365,
    payment_settings: {
      save_default_payment_method: "on_subscription",
    },
    trial_settings: {
      end_behavior: {
        missing_payment_method: "pause",
      },
    },
  });

  // Create a new user in the database using Supabase
  const { data: newUser, error: userError } = await supabase
    .from("User")
    .insert([
      {
        id: createId(),
        email: value.email,
        password: hashedPassword,
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

  // Create a new subscription in the database using Supabase
  const { error: subscriptionError } = await supabase
    .from("Subscription")
    .insert([
      {
        id: createId(),
        userId: newUser.id,
        stripeSubId: subscription.id,
        plan: "MONTHLY",
        status: "TRIAL",
        currentPeriodEnd: new Date(
          subscription.items.data[0].current_period_end * 1000
        ),
      },
    ]);

  if (subscriptionError) {
    return new Response(JSON.stringify({ error: subscriptionError.message }), {
      status: 500,
      headers: jsonHeader,
    });
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

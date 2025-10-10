import joi from "joi";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe"; // ensure this import is available

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
    return new Response(JSON.stringify({ error: error.details[0].message }), {
      status: 400,
      headers: jsonHeader,
    });
  }

  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: {
      email: value.email,
    },
  });
  if (userExists)
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

  // Create a new user in the database
  const newUser = await prisma.user.create({
    data: {
      email: value.email,
      password: hashedPassword,
      stripeCustomerId: customer.id,
    },
  });

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

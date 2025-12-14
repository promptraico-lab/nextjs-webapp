import joi from "joi";
import bcrypt from "bcrypt";
import { createId } from "@paralleldrive/cuid2";
import prisma from "@/lib/prisma";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/email";

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

  // Create a new user in the database (Stripe customer and subscription will be created after email verification)
  let newUser, userError;
  try {
    newUser = await prisma.user.create({
      data: {
        id: createId(),
        email: value.email,
        password: hashedPassword,
        emailVerified: false,
        stripeCustomerId: null, // Will be set after email verification
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

  // Generate verification token and create EmailVerification record
  const verificationToken = generateVerificationToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  let verificationError = null;
  try {
    await prisma.emailVerification.create({
      data: {
        id: createId(),
        userId: newUser.id,
        token: verificationToken,
        expiresAt: expiresAt,
      },
    });
  } catch (e) {
    verificationError = e;
  }

  if (verificationError) {
    return new Response(
      JSON.stringify({
        error:
          "Could not create verification record: " + verificationError.message,
      }),
      {
        status: 500,
        headers: jsonHeader,
      }
    );
  }

  // Send verification email
  const emailResult = await sendVerificationEmail(
    value.email,
    verificationToken
  );

  if (!emailResult.success) {
    console.error("Failed to send verification email:", emailResult.error);
    // Don't fail registration if email fails, but log it
    // User can request resend later
  }

  return new Response(
    JSON.stringify({
      message:
        "Registration successful! Please check your email to verify your account.",
      user: { email: newUser.email },
    }),
    {
      status: 201,
      headers: jsonHeader,
    }
  );
}

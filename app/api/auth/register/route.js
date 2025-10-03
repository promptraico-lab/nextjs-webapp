import joi from "joi";
import bcrypt from "bcrypt";
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
    return new Response(JSON.stringify({ error: error.details[0].message }), {
      status: 400,
      headers: jsonHeader,
    });
  }

  // Check if user already exists
  const user = await prisma.user.findUnique({
    where: {
      email: value.email,
    },
  });
  if (user)
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
      headers: jsonHeader,
    });

  // Hash the password
  const hashedPassword = await bcrypt.hash(value.password, 10);

  // Create the new user in the database
  const newUser = await prisma.user.create({
    data: {
      email: value.email,
      password: hashedPassword,
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

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
  // Define a headers variable at the top
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required." }),
        {
          status: 400,
          headers,
        }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        {
          status: 401,
          headers,
        }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        {
          status: 401,
          headers,
        }
      );
    }

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
    console.log(error);

    // Reuse the headers variable
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers,
    });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function GET(request) {
  // Extract user using getUserFromToken (from promptr-auth-token in cookie)
  const user = await getUserFromToken(request);

  if (!user || !user.id) {
    return NextResponse.json(
      { error: "Invalid or missing authentication token" },
      { status: 401 }
    );
  }

  const userId = user.id;

  try {
    // Find user and their subscription in the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(user.subscription);

    return NextResponse.json({
      subscription: user.subscription,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

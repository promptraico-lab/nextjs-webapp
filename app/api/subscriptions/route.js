import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/, "").trim();

    if (!token) {
      return NextResponse.json(
        { error: "Missing or invalid authorization token." },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const userId = decoded.id || decoded.userId;
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid token payload." },
        { status: 401 }
      );
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: {
        id: true,
        plan: true,
        status: true,
        currentPeriodEnd: true,
        createdAt: true,
        stripeSubId: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        promptOptimizations: true,
      },
    });

    if (!subscription) {
      return NextResponse.json({
        subscription: null,
        promptOptimizations: user?.promptOptimizations ?? null,
      });
    }

    return NextResponse.json({
      ...subscription,
      promptOptimizations: user?.promptOptimizations ?? null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch subscription info." },
      { status: 500 }
    );
  }
}

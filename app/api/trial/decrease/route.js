import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
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

    // Find user and check current promptOptimizations
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { promptOptimizations: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (user.promptOptimizations <= 0) {
      return NextResponse.json(
        { error: "No remaining free optimized prompts. Please subscribe to a paid plan." },
        { status: 403 }
      );
    }

    // Decrease promptOptimizations by 1
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { promptOptimizations: { decrement: 1 } },
      select: { promptOptimizations: true }
    });

    return NextResponse.json({
      success: true,
      remaining: updatedUser.promptOptimizations
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not decrease prompt optimizations." },
      { status: 500 }
    );
  }
}

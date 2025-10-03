import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { updateUser } from "@/lib/db";

// GET: fetch profile
export async function GET(request) {
  const user = await getUserFromToken(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ user });
}

// PATCH: update profile
export async function PUT(request) {
  const user = await getUserFromToken(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  await updateUser(user.id, body);

  return NextResponse.json({ message: "Profile updated" });
}

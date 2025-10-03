"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div>
        <h1>Welcome, {session?.user?.email || "User"}!</h1>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <h1>You are not logged in.</h1>
      </div>
    );
  }

  return null;
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleResend = async () => {
    if (!email) {
      toast.error("Email address is required to resend verification");
      return;
    }

    try {
      setResending(true);
      const response = await apiClient.post("/auth/resend-verification", {
        email,
      });

      if (response.ok) {
        toast.success(
          response.data?.message ||
            "Verification email has been sent. Please check your inbox."
        );
      } else {
        toast.error(
          response.data?.error ||
            "Failed to resend verification email. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We've sent a verification link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="space-y-2 text-center text-sm">
              <p>
                Please check your email inbox and click on the verification link
                to activate your account.
              </p>
              <p className="text-muted-foreground">
                The verification link will expire in 24 hours.
              </p>
            </div>

            {email && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email?
                  </p>
                </div>
                <Button
                  onClick={handleResend}
                  disabled={resending}
                  variant="outline"
                  className="w-full"
                >
                  {resending ? "Sending..." : "Resend verification email"}
                </Button>
              </div>
            )}

            <div className="text-center text-sm">
              <Link href="/login" className="underline underline-offset-4">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

async function verifyEmail(token) {
  const baseUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  const apiUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, error: data.error || "Verification failed" };
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    return {
      success: false,
      error: "An error occurred during verification. Please try again.",
    };
  }
}

export default async function VerifyEmailTokenPage({ params }) {
  const { token } = params;

  if (!token) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Invalid Link</CardTitle>
              <CardDescription>
                The verification link is invalid or missing.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="text-center">
                <Link href="/verify-email">
                  <Button variant="outline">Go to verification page</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const result = await verifyEmail(token);

  if (result.success) {
    // Redirect to login with success message
    redirect("/login?verified=true");
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {result.success ? "Email Verified!" : "Verification Failed"}
            </CardTitle>
            <CardDescription>
              {result.success
                ? "Your email has been successfully verified."
                : result.error}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {result.success ? (
              <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  You can now log in to your account.
                </p>
                <Link href="/login" className="block">
                  <Button className="w-full">Go to Login</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  The verification link may have expired or is invalid. Please
                  request a new verification email.
                </p>
                <Link href="/verify-email" className="block">
                  <Button variant="outline" className="w-full">
                    Request New Verification Email
                  </Button>
                </Link>
                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm underline underline-offset-4"
                  >
                    Back to login
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

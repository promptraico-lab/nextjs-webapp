"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../public/logo.png";

export function LoginForm({ className, ...props }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const { logIn } = useAuth();
  const router = useRouter();

  // Decode JWT from credential
  const decodeJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleResendVerification = async (email) => {
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
        setUnverifiedEmail(null);
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

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setUnverifiedEmail(null);
      const response = await apiClient.post("/auth/login", data);
      setLoading(false);

      const token = response.headers && response.headers["x-auth-token"];

      if (response.ok && token) {
        logIn(response.data, token);
        toast.success("Login successful");
        if (typeof window !== "undefined") {
          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 100);
        }
        return response.data;
      }

      // Check if email is not verified
      if (
        response.status === 403 &&
        response.data?.error === "EMAIL_NOT_VERIFIED"
      ) {
        setUnverifiedEmail(response.data?.email || data.email);
        toast.error(
          response.data?.message ||
            "Please verify your email address before logging in."
        );
        return;
      }

      if (response.status === 401) {
        throw new Error("Invalid email or password");
      }

      throw new Error(
        response.data?.message || response.problem || "Login failed"
      );
    } catch (error) {
      toast.error(
        error.message || "An error occurred during login. Please try again."
      );
    }
  };

  const onGoogleSubmit = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      if (!credential) throw new Error("Missing Google credential");
      const user = decodeJwt(credential);

      // Send user data to your backend for registration/login
      const response = await apiClient.post("/auth/google", { user });

      const token = response.headers && response.headers["x-auth-token"];

      if (response.ok && token) {
        logIn(response.data, token);
        toast.success("Login successful");
        if (typeof window !== "undefined") {
          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 100);
        }
        return response.data;
      }

      if (response.status === 401) {
        throw new Error("Invalid email or password");
      }

      throw new Error(
        response.data?.message || response.problem || "Login failed"
      );
    } catch (error) {
      toast.error(error.message || "Google login failed. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Promptr account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email", { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password", { required: true })}
                />
              </div>
              {unverifiedEmail && (
                <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Your email address has not been verified. Please check your
                    inbox for the verification email.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => handleResendVerification(unverifiedEmail)}
                    disabled={resending}
                  >
                    {resending ? "Sending..." : "Resend verification email"}
                  </Button>
                </div>
              )}
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                disabled={loading}
              >
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <GoogleLogin
                  width="100%"
                  onSuccess={(credentialResponse) =>
                    onGoogleSubmit(credentialResponse)
                  }
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-white relative hidden md:block">
            <Image
              src={logo}
              alt="Logo"
              fill
              objectFit="contain"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              sizes="100vw"
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

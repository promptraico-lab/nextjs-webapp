"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import apiClient from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

export function RegisterForm({ className, ...props }) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("/auth/register", data);

      if (response.ok) {
        toast.success("User registered successfully!");
        reset();
        router.push("/login");
      } else {
        toast.error(
          response.data?.error ||
            "Registration failed. Please check your input and try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
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
              <Button type="submit" className="w-full">
                Register
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
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
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

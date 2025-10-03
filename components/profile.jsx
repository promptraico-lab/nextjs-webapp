"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

export default function ProfilePage() {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(!currentUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      phone: "",
      location: "",
    },
  });

  useEffect(() => {
    if (!currentUser) {
      setLoading(true);
      updateUser()
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      reset({
        name: currentUser.name || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        phone: currentUser.phone || "",
        location: currentUser.location || "",
      });
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, reset]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">No user found.</div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    // You can implement the update logic here, e.g. call an API to update the user profile
    // For now, just log the data
    // Optionally, you can call updateUser() after successful update
    // Example: await apiClient.put("/users/me", data);
    // await updateUser();
    // toast.success("Profile updated!");
    // For now:
    console.log("Profile form submitted:", data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <Card className="w-full h-full max-w-none max-h-none flex flex-col justify-center items-center rounded-none shadow-none">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="w-full max-w-md mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                {...register("bio")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. +1 555 123 4567"
                {...register("phone")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, Country"
                {...register("location")}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

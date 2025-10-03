"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import apiClient from "@/lib/apiClient";

export default function ProfilePage() {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(!currentUser);

  const {
    register,
    handleSubmit,
    reset,
    errors,
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
    try {
      const response = await apiClient.put("/users/profile", data);

      if (response.ok) {
        await updateUser(data);
        toast.success("Profile updated!");
      } else {
        const errorMsg = response.data?.error || "Failed to update profile";
        toast.error(errorMsg);
        console.error(
          "Failed to update profile:",
          response.problem,
          response.data
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile.");
    }
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
                {...register("name", { required: "Name is required" })}
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" {...register("bio")} />
              {errors?.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. +1 555 123 4567"
                {...register("phone")}
              />
              {errors?.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, Country"
                {...register("location")}
              />
              {errors?.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
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

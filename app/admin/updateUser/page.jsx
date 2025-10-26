"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import apiClient from "@/lib/apiClient";

export default function UpdateUserSubscription() {
  const { currentUser, updateUser } = useAuth();

  useEffect(() => {
    async function fetchAndUpdate() {
      try {
        // Get the user's subscription info from /api/session_id
        const response = await apiClient.get("/session_id");
        if (response.ok && response.data && response.data.subscription) {
          // Update currentUser locally with new subscription info
          await updateUser({
            ...currentUser,
            subscription: response.data.subscription,
          });
        }
      } catch (err) {
        console.error("Failed to refresh subscription info.", err);
        // Optionally handle error
      } finally {
        // Redirect to /admin/pricing after update/attempt
        window.location.replace("/admin/pricing");
      }
    }

    fetchAndUpdate();
    // Only runs once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}


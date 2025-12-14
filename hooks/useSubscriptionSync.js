"use client";

import { useEffect, useRef, useCallback } from "react";
import useAuth from "./useAuth";
import apiClient from "@/lib/apiClient";

/**
 * Hook that automatically syncs user subscription data when changes are detected.
 * This is useful for keeping the client-side state in sync with server-side webhook updates.
 */
export default function useSubscriptionSync() {
  const { currentUser, updateUser } = useAuth();
  const intervalRef = useRef(null);

  // Function to check for subscription changes
  const checkSubscriptionUpdate = useCallback(async () => {
    if (!currentUser) return;

    try {
      const { data, ok } = await apiClient.get("/users/profile");
      if (!ok || !data?.user) return;

      console.log(data.user);
      const latestSubscription = data.user.subscription;
      const currentSubscription = currentUser.subscription;

      // Compare subscription data to detect changes
      const hasChanged =
        !currentSubscription ||
        !latestSubscription ||
        currentSubscription.plan !== latestSubscription?.plan ||
        currentSubscription.status !== latestSubscription?.status ||
        new Date(currentSubscription.currentPeriodEnd).getTime() !==
          new Date(latestSubscription.currentPeriodEnd).getTime();

      if (hasChanged) {
        // Update user data when subscription changes are detected
        await updateUser();
        console.log("Subscription updated: User data refreshed");
      }
    } catch (error) {
      console.error("Error checking subscription update:", error);
    }
  }, [currentUser, updateUser]);

  useEffect(() => {
    if (!currentUser) return;

    // Check for updates periodically (every 30 seconds)
    intervalRef.current = setInterval(() => {
      checkSubscriptionUpdate();
    }, 30000);

    // Also check when page becomes visible (user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkSubscriptionUpdate();
      }
    };

    // Check when window gains focus
    const handleFocus = () => {
      checkSubscriptionUpdate();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [currentUser, checkSubscriptionUpdate]);

  return null;
}

"use client";

import { Provider } from "jotai";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useSubscriptionSync from "@/hooks/useSubscriptionSync";

export const Providers = ({ children }) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  return (
    <Provider>
      <GoogleOAuthProvider clientId="243544406453-stlvaig44op0917pgkqcru1fa3uveua8.apps.googleusercontent.com">
        <SubscriptionSyncWrapper>{children}</SubscriptionSyncWrapper>
      </GoogleOAuthProvider>
    </Provider>
  );
};

// Wrapper component to use the subscription sync hook
function SubscriptionSyncWrapper({ children }) {
  useSubscriptionSync();
  return <>{children}</>;
}

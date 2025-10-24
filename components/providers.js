"use client";

import { Provider } from "jotai";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Providers = ({ children }) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  return (
    <Provider>
      <GoogleOAuthProvider clientId="192466123451-9dueae14nvv1irhpog6bimgp13ahdlnr.apps.googleusercontent.com">{children}</GoogleOAuthProvider>
    </Provider>
  );
};

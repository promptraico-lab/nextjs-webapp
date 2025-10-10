"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck } from "lucide-react";

const features = [
  "Unlimited prompt optimizations",
  "Works directly in ChatGPT",
  "Priority email support",
];

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="32px"
    height="36px"
    viewBox="0 0 14 16"
    version="1.1"
    className="mx-auto mb-4"
  >
    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>
  </svg>
);

const SuccessDisplay = ({ sessionId }) => (
  <div className="not-prose flex flex-col gap-8 px-8 py-24 text-center items-center justify-center min-h-[60vh]">
    <Logo />
    <Badge className="mb-2 text-base px-4 py-1 rounded-full bg-green-100 text-green-800 border-green-200">
      Payment Successful
    </Badge>
    <h1 className="text-4xl font-semibold mb-2 text-balance">
      Thank you for subscribing!
    </h1>
    <p className="text-lg text-muted-foreground max-w-xl mb-4">
      Your subscription to the Starter Plan was successful. You now have access
      to all premium features.
    </p>
    <ul className="flex flex-col gap-2 items-center mb-6">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-2 text-base">
          <BadgeCheck className="h-5 w-5 text-primary" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <form
      action="/api/create-portal-session"
      method="POST"
      className="w-full max-w-xs"
    >
      <input
        type="hidden"
        id="session-id"
        name="session_id"
        value={sessionId}
      />
      <Button id="checkout-and-portal-button" type="submit" className="w-full">
        Manage your billing information
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  </div>
);

const CancelDisplay = () => (
  <div className="not-prose flex flex-col gap-8 px-8 py-24 text-center items-center justify-center min-h-[60vh]">
    <Logo />
    <Badge className="mb-2 text-base px-4 py-1 rounded-full bg-red-100 text-red-800 border-red-200">
      Payment Canceled
    </Badge>
    <h1 className="text-4xl font-semibold mb-2 text-balance">
      Subscription canceled
    </h1>
    <p className="text-lg text-muted-foreground max-w-xl mb-4">
      Order canceled &mdash; continue to shop around and checkout when you're
      ready.
    </p>
    <Button asChild variant="secondary" className="w-full max-w-xs">
      <a href="/admin/pricing">
        Back to Pricing
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  </div>
);

export default function ThankYou() {
  const [status, setStatus] = useState("loading");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setStatus("success");
      setSessionId(query.get("session_id") || "");
    } else if (query.get("canceled")) {
      setStatus("canceled");
    } else {
      // Redirect to /admin/dashboard if neither success nor canceled
      window.location.replace("/admin/dashboard");
    }
  }, []);

  if (status === "success" && sessionId) {
    return <SuccessDisplay sessionId={sessionId} />;
  } else if (status === "canceled") {
    return <CancelDisplay />;
  } else {
    // This will only briefly show while redirecting
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 py-24">
        <Logo />
        <h1 className="text-2xl font-semibold mb-2">Loading...</h1>
        <p className="text-muted-foreground">
          Please wait while we process your request.
        </p>
      </div>
    );
  }
}

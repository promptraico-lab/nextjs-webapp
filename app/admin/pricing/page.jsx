"use client";

import NumberFlow from "@number-flow/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, BadgeCheck } from "lucide-react";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: {
      monthly: 10,
      yearly: 10, // fallback, not used
    },
    description:
      "Perfect for trying out promptR and optimizing your prompts directly from the ChatGPT interface. Cancel anytime.",
    features: [
      "Unlimited prompt optimizations",
      "Works directly in ChatGPT",
      "Priority email support",
    ],
    cta: "Subscribe Monthly",
    popular: false,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: {
      monthly: 8, // for display as "$8/month, billed yearly"
      yearly: 8,
    },
    description:
      "Unlock all promptR features and save 20% with annual billing. Optimize your prompts seamlessly in ChatGPT all year long.",
    features: [
      "Unlimited prompt optimizations",
      "Works directly in ChatGPT",
      "Priority email support",
    ],
    cta: "Subscribe Yearly",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <div className="not-prose flex flex-col gap-16 px-8 py-24 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="mb-0 text-balance font-medium text-5xl tracking-tighter!">
          promptR: Optimize your ChatGPT prompts instantly
        </h1>
        <p className="mx-auto mt-0 mb-0 max-w-2xl text-balance text-lg text-muted-foreground">
          Get{" "}
          <span className="font-semibold text-primary">
            10 free prompt optimizations
          </span>{" "}
          when you install promptR Chrome Extension!
        </p>
        {/* Pricing Table */}
        <div className="mt-8 w-full max-w-4xl mx-auto overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow ring-1 ring-muted">
            <thead>
              <tr className="bg-muted">
                <th className="py-4 px-6 text-lg font-semibold text-left"></th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={cn(
                      "py-4 px-6 text-lg font-semibold text-center",
                      plan.popular && "relative"
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <span>{plan.name}</span>
                      {plan.popular && (
                        <Badge className="absolute top-2 right-2 rounded-full">
                          Popular
                        </Badge>
                      )}
                      <NumberFlow
                        className="font-medium text-foreground text-2xl mt-2"
                        format={{
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }}
                        suffix={
                          plan.id === "yearly"
                            ? "/month, billed yearly"
                            : "/month, billed monthly"
                        }
                        value={plan.price.monthly}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-6 text-left font-medium">Description</td>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className="py-4 px-6 text-center text-muted-foreground"
                  >
                    {plan.description}
                  </td>
                ))}
              </tr>
              {plans[0].features.map((_, featureIdx) => (
                <tr
                  key={featureIdx}
                  className={featureIdx % 2 === 0 ? "bg-accent" : ""}
                >
                  <td className="py-4 px-6 text-left font-medium">
                    {plans[0].features[featureIdx]}
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-6 text-center">
                      <BadgeCheck className="inline h-5 w-5 text-primary" />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-4 px-6"></td>
                {plans.map((plan) => (
                  <td key={plan.id} className="py-4 px-6 text-center">
                    <form action="/api/create-checkout-session" method="POST">
                      <input
                        type="hidden"
                        name="lookup_key"
                        value={plan.lookup_key || plan.id}
                      />
                      <Button
                        className="w-full cursor-pointer"
                        variant={plan.popular ? "default" : "secondary"}
                        type="submit"
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

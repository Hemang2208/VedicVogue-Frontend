"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { subscriptionPlans } from "@/lib/allSubscriptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Check, Home, Utensils } from "lucide-react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useEffect } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");

  const plan = subscriptionPlans.find((p) => p.id === planId);

  useEffect(() => {
    if (!plan) {
      router.push("/subscriptions");
    }
  }, [plan, router]);

  if (!plan) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-100 text-green-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for subscribing to {plan.name}. Your meals will be
            delivered as scheduled.
          </p>

          <Card className="mb-8 text-left">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">₹{plan.price}/meal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">First Payment</span>
                  <span className="font-bold">
                    ₹
                    {plan.id === "daily-flexi"
                      ? plan.price * 1
                      : plan.id.includes("weekly")
                      ? plan.price * 7
                      : plan.price * 30}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Billing</span>
                  <span className="font-medium">
                    {plan.id === "daily-flexi"
                      ? "Only when you order"
                      : plan.id.includes("weekly")
                      ? "In 7 days"
                      : "In 30 days"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-14">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild className="h-14">
              <Link href="/user/profile/dashboard">
                <Utensils className="mr-2 h-4 w-4" />
                View Your Meals
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

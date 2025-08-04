"use client";

import { useParams, useRouter } from "next/navigation";
import { subscriptionPlans } from "@/lib/allSubscriptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { useEffect } from "react";

export default function SubscriptionDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const planId = Array.isArray(params.planId)
    ? params.planId[0]
    : params.planId;

  const plan = subscriptionPlans.find((p) => p.id === planId);

  useEffect(() => {
    if (!plan) {
      router.replace("/subscriptions");
    }
  }, [router, plan]);

  if (!plan) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{plan.name}</h1>
            <p className="text-lg text-muted-foreground">{plan.description}</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Plan Details</CardTitle>
                <Badge className={plan.badgeColor}>{plan.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ₹{plan.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{plan.originalPrice}
                  </span>
                  {plan.savings !== "0%" && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Save {plan.savings}
                    </Badge>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Best for:</h3>
                  <p className="text-muted-foreground">{plan.bestFor}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg relative">
                <h3 className="text-xl font-bold mb-4">Ready to Subscribe?</h3>
                <p className="text-muted-foreground mb-6">
                  Get started with {plan.name || "your preferred"} plan and
                  enjoy delicious meals delivered to your doorstep.
                </p>

                <div className="space-y-4">
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/user/checkout-subscription?plan=${plan.id}`}>
                      Subscribe Now
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/subscriptions">Compare Other Plans</Link>
                  </Button>
                </div>

                {/* <p className="text-sm text-muted-foreground mt-5">
                  All plans are flexible and can be adjusted anytime.
                </p> */}

                <p className="text-sm text-muted-foreground absolute mt-6 pr-5 bottom-5">
                  <strong>Important:</strong> By clicking &quot;Subscribe
                  Now&quot;, you agree to our{" "}
                  <Link
                    target="_blank"
                    className="underline hover:text-primary"
                    href="/terms"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    target="_blank"
                    className="underline hover:text-primary"
                    href="/privacy"
                  >
                    Privacy Policy.
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  All meals are delivered fresh daily between 7 AM - 9 AM for
                  breakfast, 12 PM - 2 PM for lunch, and 7 PM - 9 PM for dinner.
                </p>
                <p className="text-muted-foreground">
                  You can adjust your delivery window in your account settings
                  after subscribing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Flexibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {plan.id === "daily-flexi"
                    ? "This plan requires no commitment. Order whenever you want with no subscription needed."
                    : `This plan requires a minimum commitment of ${
                        plan.id.includes("weekly") ? "1 week" : "1 month"
                      }. You can pause or cancel anytime after the initial period.`}
                </p>
                <p className="text-muted-foreground">
                  All changes must be made at least 24 hours before delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

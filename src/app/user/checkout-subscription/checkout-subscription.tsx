"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { subscriptionPlans } from "@/lib/allSubscriptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CheckoutSubscriptionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");

  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = subscriptionPlans.find((p) => p.id === planId);

  if (!plan) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Plan Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The subscription plan you&apos;re looking for doesn&apos;t exist or
            has been removed.
          </p>
          <Button asChild>
            <Link href="/subscriptions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Plans
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/user/checkout-subscription/success?plan=${plan.id}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={`/subscriptions/${plan.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plan Details
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                    <Badge className={plan.badgeColor}>{plan.badge}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Plan Price</span>
                      <span>₹{plan.price}/meal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-green-500">{plan.savings}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">First Payment</span>
                      <span className="font-bold text-lg">
                        ₹
                        {plan.id === "daily-flexi"
                          ? plan.price * 1
                          : plan.id.includes("weekly")
                          ? plan.price * 7
                          : plan.price * 30}
                      </span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">What&apos;s included:</h4>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 5).map((feature, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className={`p-4 border rounded-lg text-center ${
                            paymentMethod === "credit-card"
                              ? "border-primary ring-2 ring-primary/50"
                              : "border-muted-foreground/30"
                          }`}
                          onClick={() => setPaymentMethod("credit-card")}
                        >
                          Credit Card
                        </button>
                        <button
                          type="button"
                          className={`p-4 border rounded-lg text-center ${
                            paymentMethod === "upi"
                              ? "border-primary ring-2 ring-primary/50"
                              : "border-muted-foreground/30"
                          }`}
                          onClick={() => setPaymentMethod("upi")}
                        >
                          UPI
                        </button>
                      </div>
                    </div>

                    {paymentMethod === "credit-card" ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 border rounded-lg"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full p-3 border rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full p-3 border rounded-lg"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full p-3 border rounded-lg"
                            required
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            UPI ID
                          </label>
                          <input
                            type="text"
                            placeholder="yourname@upi"
                            className="w-full p-3 border rounded-lg"
                            required
                          />
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-sm">
                          After submitting, you&apos;ll be redirected to your
                          UPI app to complete the payment.
                        </div>
                      </div>
                    )}

                    <div className="bg-muted p-4 rounded-lg text-sm">
                      <p className="font-medium mb-2">Subscription Terms:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          {plan.id === "daily-flexi"
                            ? "No commitment - cancel anytime"
                            : `Minimum commitment period: ${
                                plan.id.includes("weekly")
                                  ? "1 week"
                                  : "1 month"
                              }`}
                        </li>
                        <li>Auto-renews until canceled</li>
                        <li>Changes require 24 hours notice before delivery</li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Complete Subscription"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

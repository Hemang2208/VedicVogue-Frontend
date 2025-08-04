"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { VVBadge } from "@/components/ui/vv-badge";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Crown,
  Package,
  Zap,
  Check,
  X,
  Calendar,
  // CreditCard,
  Users,
  Star,
  TrendingUp,
  Shield,
  Headphones,
  Truck,
  ChefHat,
  Gift,
  Clock,
  Settings,
  ShoppingCart,
} from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  popular?: boolean;
  features: string[];
  limits: {
    orders: number | "unlimited";
    deliveries: number | "unlimited";
    support: string;
    recipes: number | "unlimited";
  };
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface UserSubscription {
  id: string;
  planId: string;
  status: "active" | "cancelled" | "expired" | "paused";
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  autoRenewal: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 299,
    billingCycle: "monthly",
    features: [
      "10 orders per month",
      "Standard delivery",
      "Basic recipe collection",
      "Email support",
      "Mobile app access",
    ],
    limits: {
      orders: 10,
      deliveries: 10,
      support: "Email only",
      recipes: 100,
    },
    color: "border-gray-200",
    icon: Package,
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    billingCycle: "monthly",
    popular: true,
    features: [
      "Unlimited orders",
      "Free delivery on all orders",
      "Premium recipe collection",
      "Priority customer support",
      "Exclusive menu items",
      "Early access to new features",
      "Monthly cooking classes",
    ],
    limits: {
      orders: "unlimited",
      deliveries: "unlimited",
      support: "Priority chat & phone",
      recipes: "unlimited",
    },
    color: "border-primary ring-2 ring-primary/20",
    icon: Crown,
  },
  {
    id: "pro",
    name: "Pro",
    price: 1999,
    billingCycle: "monthly",
    features: [
      "Everything in Premium",
      "Personal chef consultation",
      "Custom meal planning",
      "Nutrition tracking",
      "Family sharing (up to 5 members)",
      "Advanced analytics",
      "API access",
      "White-label options",
    ],
    limits: {
      orders: "unlimited",
      deliveries: "unlimited",
      support: "Dedicated account manager",
      recipes: "unlimited",
    },
    color: "border-purple-200",
    icon: Zap,
  },
];

const yearlyPlans: SubscriptionPlan[] = subscriptionPlans.map((plan) => ({
  ...plan,
  price: Math.floor(plan.price * 10), // 2 months free on yearly
  billingCycle: "yearly" as const,
}));

const mockUserSubscription: UserSubscription = {
  id: "SUB001",
  planId: "premium",
  status: "active",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  nextBillingDate: "2024-02-01",
  autoRenewal: true,
};

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [userSubscription, setUserSubscription] =
    useState<UserSubscription | null>(mockUserSubscription);
  const [loading, setLoading] = useState<string | null>(null);

  const currentPlans =
    billingCycle === "monthly" ? subscriptionPlans : yearlyPlans;
  const currentPlan = userSubscription
    ? currentPlans.find((plan) => plan.id === userSubscription.planId)
    : null;

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (userSubscription) {
      // Upgrade/downgrade existing subscription
      setUserSubscription({
        ...userSubscription,
        planId,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      });
    } else {
      // New subscription
      setUserSubscription({
        id: "SUB" + Date.now(),
        planId,
        status: "active",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        autoRenewal: true,
      });
    }

    setLoading(null);
  };

  // const handleCancelSubscription = async () => {
  //   if (!userSubscription) return;

  //   setLoading("cancel");

  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1500));

  //   setUserSubscription({
  //     ...userSubscription,
  //     status: "cancelled",
  //     autoRenewal: false,
  //   });

  //   setLoading(null);
  // };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateSavings = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 10;
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <VVButton variant="ghost" size="icon" asChild>
                <Link href="/user/profile">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Crown className="h-8 w-8" />
                  Subscription Plans
                </h1>
                <p className="text-muted-foreground">
                  Choose the perfect plan for your culinary journey
                </p>
              </div>
            </div>
          </motion.div>

          {/* Current Subscription */}
          {userSubscription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle>Current Subscription</VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {currentPlan && (
                        <>
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <currentPlan.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {currentPlan.name} Plan
                            </h3>
                            <p className="text-muted-foreground">
                              ₹{currentPlan.price} / {currentPlan.billingCycle}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <VVBadge
                        className={getStatusColor(userSubscription.status)}
                      >
                        {userSubscription.status.toUpperCase()}
                      </VVBadge>
                      <VVButton variant="outline" asChild>
                        <Link
                          href={`/user/profile/subscription/${userSubscription.id}`}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Manage
                        </Link>
                      </VVButton>
                    </div>
                  </div>

                  {userSubscription.status === "active" && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Next billing:{" "}
                            {new Date(
                              userSubscription.nextBillingDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Auto-renewal:{" "}
                            {userSubscription.autoRenewal ? "On" : "Off"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Valid until:{" "}
                            {new Date(
                              userSubscription.endDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </VVCardContent>
              </VVCard>
            </motion.div>
          )}

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex justify-center">
              <div className="flex items-center p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    billingCycle === "yearly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Yearly
                  <VVBadge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs">
                    Save 17%
                  </VVBadge>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Subscription Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {currentPlans.map((plan, index) => {
                const PlanIcon = plan.icon;
                const isCurrentPlan = userSubscription?.planId === plan.id;
                const savings =
                  billingCycle === "yearly"
                    ? calculateSavings(subscriptionPlans[index].price)
                    : null;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <VVBadge className="bg-primary text-primary-foreground">
                          <Star className="mr-1 h-3 w-3" />
                          Most Popular
                        </VVBadge>
                      </div>
                    )}

                    <VVCard
                      className={`h-full ${plan.color} ${
                        plan.popular ? "scale-105" : ""
                      }`}
                    >
                      <VVCardHeader className="text-center">
                        <div className="mx-auto p-3 bg-primary/10 rounded-lg w-fit mb-4">
                          <PlanIcon className="h-8 w-8 text-primary" />
                        </div>
                        <VVCardTitle className="text-2xl">
                          {plan.name}
                        </VVCardTitle>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold">
                            ₹{plan.price}
                            <span className="text-lg font-normal text-muted-foreground">
                              /{plan.billingCycle}
                            </span>
                          </div>
                          {savings && (
                            <div className="text-sm text-green-600">
                              Save ₹{savings.savings} ({savings.percentage}%
                              off)
                            </div>
                          )}
                        </div>
                      </VVCardHeader>

                      <VVCardContent className="space-y-6">
                        {/* Features */}
                        <div className="space-y-3">
                          {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Limits */}
                        <div className="pt-4 border-t space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Orders
                            </span>
                            <span className="font-medium">
                              {plan.limits.orders === "unlimited"
                                ? "Unlimited"
                                : `${plan.limits.orders}/month`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Free Deliveries
                            </span>
                            <span className="font-medium">
                              {plan.limits.deliveries === "unlimited"
                                ? "Unlimited"
                                : `${plan.limits.deliveries}/month`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Support
                            </span>
                            <span className="font-medium">
                              {plan.limits.support}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Recipes
                            </span>
                            <span className="font-medium">
                              {plan.limits.recipes === "unlimited"
                                ? "Unlimited"
                                : plan.limits.recipes}
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-4">
                          {isCurrentPlan ? (
                            <VVButton className="w-full" disabled>
                              <Check className="mr-2 h-4 w-4" />
                              Current Plan
                            </VVButton>
                          ) : (
                            <VVButton
                              className="w-full"
                              variant={plan.popular ? "default" : "outline"}
                              onClick={() => handleSubscribe(plan.id)}
                              disabled={loading === plan.id}
                            >
                              {loading === plan.id ? (
                                <>
                                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                  Processing...
                                </>
                              ) : userSubscription ? (
                                <>
                                  <TrendingUp className="mr-2 h-4 w-4" />
                                  {userSubscription.planId === "basic" &&
                                  plan.id !== "basic"
                                    ? "Upgrade"
                                    : userSubscription.planId === "pro" &&
                                      plan.id !== "pro"
                                    ? "Downgrade"
                                    : "Switch"}
                                </>
                              ) : (
                                <>
                                  <Crown className="mr-2 h-4 w-4" />
                                  Get Started
                                </>
                              )}
                            </VVButton>
                          )}
                        </div>
                      </VVCardContent>
                    </VVCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Feature Comparison</VVCardTitle>
              </VVCardHeader>
              <VVCardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Features</th>
                        <th className="text-center py-3 px-4">Basic</th>
                        <th className="text-center py-3 px-4">Premium</th>
                        <th className="text-center py-3 px-4">Pro</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-3 px-4 flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Monthly Orders
                        </td>
                        <td className="text-center py-3 px-4">10</td>
                        <td className="text-center py-3 px-4">Unlimited</td>
                        <td className="text-center py-3 px-4">Unlimited</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          Free Delivery
                        </td>
                        <td className="text-center py-3 px-4">
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 flex items-center gap-2">
                          <ChefHat className="h-4 w-4" />
                          Recipe Collection
                        </td>
                        <td className="text-center py-3 px-4">Basic</td>
                        <td className="text-center py-3 px-4">Premium</td>
                        <td className="text-center py-3 px-4">
                          Premium + Custom
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 flex items-center gap-2">
                          <Headphones className="h-4 w-4" />
                          Customer Support
                        </td>
                        <td className="text-center py-3 px-4">Email</td>
                        <td className="text-center py-3 px-4">Priority</td>
                        <td className="text-center py-3 px-4">
                          Dedicated Manager
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Family Sharing
                        </td>
                        <td className="text-center py-3 px-4">
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          Up to 5 members
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 flex items-center gap-2">
                          <Gift className="h-4 w-4" />
                          Exclusive Perks
                        </td>
                        <td className="text-center py-3 px-4">
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Frequently Asked Questions</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">
                    Can I change my plan anytime?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time.
                    Changes will be reflected in your next billing cycle.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">
                    What happens if I cancel my subscription?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll continue to have access to your plan benefits
                    until the end of your current billing period. After that,
                    you&apos;ll be moved to our free tier.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Do you offer refunds?</h4>
                  <p className="text-sm text-muted-foreground">
                    We offer a 30-day money-back guarantee for all new
                    subscriptions. Contact our support team for assistance.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">
                    Can I pause my subscription?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, Premium and Pro subscribers can pause their
                    subscription for up to 3 months per year.
                  </p>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

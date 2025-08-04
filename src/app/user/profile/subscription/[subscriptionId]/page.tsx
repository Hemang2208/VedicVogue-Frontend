"use client";

import { useState, useEffect } from "react";
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
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Crown,
  Calendar,
  CreditCard,
  // Users,
  Zap,
  Shield,
  Download,
  Settings,
  Pause,
  Play,
  X,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Package,
} from "lucide-react";

interface SubscriptionDetails {
  id: string;
  planName: string;
  planType: string;
  status: string;
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  amount: number;
  billingCycle: string;
  paymentMethod: string;
  features: string[];
  usage: {
    ordersUsed: number;
    ordersLimit: number;
    deliveriesUsed: number;
    deliveriesLimit: number;
    supportTickets: number;
    supportLimit: number;
  };
  billingHistory: {
    id: string;
    date: string;
    amount: number;
    status: string;
    invoiceUrl: string;
  }[];
  autoRenewal: boolean;
}

// Mock subscription data
const mockSubscriptions: { [key: string]: SubscriptionDetails } = {
  SUB001: {
    id: "SUB001",
    planName: "Premium Plan",
    planType: "premium",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    nextBillingDate: "2024-02-01",
    amount: 999,
    billingCycle: "monthly",
    paymentMethod: "Credit Card ending in 4242",
    autoRenewal: true,
    features: [
      "Unlimited food orders",
      "Free delivery on all orders",
      "Priority customer support",
      "Exclusive menu items",
      "Early access to new features",
      "Monthly cooking classes",
    ],
    usage: {
      ordersUsed: 45,
      ordersLimit: -1, // -1 means unlimited
      deliveriesUsed: 45,
      deliveriesLimit: -1,
      supportTickets: 3,
      supportLimit: 10,
    },
    billingHistory: [
      {
        id: "INV001",
        date: "2024-01-01",
        amount: 999,
        status: "paid",
        invoiceUrl: "#",
      },
      {
        id: "INV002",
        date: "2023-12-01",
        amount: 999,
        status: "paid",
        invoiceUrl: "#",
      },
      {
        id: "INV003",
        date: "2023-11-01",
        amount: 999,
        status: "paid",
        invoiceUrl: "#",
      },
    ],
  },
  SUB002: {
    id: "SUB002",
    planName: "Basic Plan",
    planType: "basic",
    status: "cancelled",
    startDate: "2023-06-01",
    endDate: "2023-12-01",
    nextBillingDate: "",
    amount: 299,
    billingCycle: "monthly",
    paymentMethod: "UPI",
    autoRenewal: false,
    features: [
      "10 food orders per month",
      "Standard delivery",
      "Email support",
      "Basic menu access",
    ],
    usage: {
      ordersUsed: 8,
      ordersLimit: 10,
      deliveriesUsed: 8,
      deliveriesLimit: 10,
      supportTickets: 1,
      supportLimit: 3,
    },
    billingHistory: [
      {
        id: "INV004",
        date: "2023-11-01",
        amount: 299,
        status: "paid",
        invoiceUrl: "#",
      },
      {
        id: "INV005",
        date: "2023-10-01",
        amount: 299,
        status: "paid",
        invoiceUrl: "#",
      },
    ],
  },
};

export default function SubscriptionDetailsPage() {
  const params = useParams();
  const subscriptionId = params.subscriptionId as string;
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const subscriptionData = mockSubscriptions[subscriptionId];
      setSubscription(subscriptionData || null);
      setLoading(false);
    }, 1000);
  }, [subscriptionId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return CheckCircle;
      case "cancelled":
        return X;
      case "paused":
        return Pause;
      case "expired":
        return AlertTriangle;
      default:
        return Crown;
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case "premium":
        return Crown;
      case "basic":
        return Package;
      default:
        return Crown;
    }
  };

  const handleAction = async (action: string) => {
    setActionLoading(action);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (subscription) {
      switch (action) {
        case "pause":
          setSubscription({ ...subscription, status: "paused" });
          break;
        case "resume":
          setSubscription({ ...subscription, status: "active" });
          break;
        case "cancel":
          setSubscription({
            ...subscription,
            status: "cancelled",
            autoRenewal: false,
          });
          break;
        case "toggle-renewal":
          setSubscription({
            ...subscription,
            autoRenewal: !subscription.autoRenewal,
          });
          break;
      }
    }

    setActionLoading(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <Crown className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                Subscription Not Found
              </h2>
              <p className="text-muted-foreground mb-6">
                The subscription you&apos;re looking for doesn&apos;t exist or
                has been removed.
              </p>
              <VVButton asChild>
                <Link href="/user/profile/subscription">
                  Back to Subscriptions
                </Link>
              </VVButton>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const StatusIcon = getStatusIcon(subscription.status);
  const PlanIcon = getPlanIcon(subscription.planType);

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
                <Link href="/user/profile/subscription">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <PlanIcon className="h-8 w-8" />
                  {subscription.planName}
                </h1>
                <p className="text-muted-foreground">
                  Manage your subscription and billing
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Subscription Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <div className="flex items-center justify-between">
                      <VVCardTitle className="flex items-center gap-3">
                        <StatusIcon className="h-6 w-6" />
                        Subscription Status
                      </VVCardTitle>
                      <VVBadge className={getStatusColor(subscription.status)}>
                        {subscription.status.toUpperCase()}
                      </VVBadge>
                    </div>
                  </VVCardHeader>
                  <VVCardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Start Date</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              subscription.startDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">End Date</p>
                          <p className="text-sm text-muted-foreground">
                            {subscription.endDate
                              ? new Date(
                                  subscription.endDate
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Billing Cycle</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{subscription.amount} / {subscription.billingCycle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Auto Renewal</p>
                          <p className="text-sm text-muted-foreground">
                            {subscription.autoRenewal ? "Enabled" : "Disabled"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {subscription.nextBillingDate && (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-1">
                          Next Billing Date
                        </p>
                        <p className="text-lg font-semibold">
                          {new Date(
                            subscription.nextBillingDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Usage Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Usage Statistics
                    </VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {subscription.usage.ordersUsed}
                          {subscription.usage.ordersLimit > 0 && (
                            <span className="text-lg text-muted-foreground">
                              /{subscription.usage.ordersLimit}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Orders This Month
                        </p>
                        {subscription.usage.ordersLimit > 0 && (
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${
                                  (subscription.usage.ordersUsed /
                                    subscription.usage.ordersLimit) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {subscription.usage.deliveriesUsed}
                          {subscription.usage.deliveriesLimit > 0 && (
                            <span className="text-lg text-muted-foreground">
                              /{subscription.usage.deliveriesLimit}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Free Deliveries
                        </p>
                        {subscription.usage.deliveriesLimit > 0 && (
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${
                                  (subscription.usage.deliveriesUsed /
                                    subscription.usage.deliveriesLimit) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {subscription.usage.supportTickets}
                          <span className="text-lg text-muted-foreground">
                            /{subscription.usage.supportLimit}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Support Tickets
                        </p>
                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${
                                (subscription.usage.supportTickets /
                                  subscription.usage.supportLimit) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Plan Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Plan Features</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {subscription.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Billing History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Billing History</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="space-y-4">
                      {subscription.billingHistory.map((bill) => (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted rounded-lg">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">Invoice #{bill.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(bill.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold">₹{bill.amount}</p>
                              <VVBadge
                                variant={
                                  bill.status === "paid"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {bill.status}
                              </VVBadge>
                            </div>
                            <VVButton variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </VVButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Quick Actions</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-3">
                    {subscription.status === "active" && (
                      <>
                        <VVButton
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleAction("pause")}
                          disabled={actionLoading === "pause"}
                        >
                          {actionLoading === "pause" ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Pause className="mr-2 h-4 w-4" />
                          )}
                          Pause Subscription
                        </VVButton>
                        <VVButton
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleAction("toggle-renewal")}
                          disabled={actionLoading === "toggle-renewal"}
                        >
                          {actionLoading === "toggle-renewal" ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Settings className="mr-2 h-4 w-4" />
                          )}
                          {subscription.autoRenewal ? "Disable" : "Enable"}{" "}
                          Auto-Renewal
                        </VVButton>
                      </>
                    )}

                    {subscription.status === "paused" && (
                      <VVButton
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAction("resume")}
                        disabled={actionLoading === "resume"}
                      >
                        {actionLoading === "resume" ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Play className="mr-2 h-4 w-4" />
                        )}
                        Resume Subscription
                      </VVButton>
                    )}

                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/user/profile/payment-methods">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Update Payment Method
                      </Link>
                    </VVButton>

                    {subscription.status === "active" && (
                      <VVButton
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={() => handleAction("cancel")}
                        disabled={actionLoading === "cancel"}
                      >
                        {actionLoading === "cancel" ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <X className="mr-2 h-4 w-4" />
                        )}
                        Cancel Subscription
                      </VVButton>
                    )}
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Payment Information</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Payment Method</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Current Plan</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{subscription.amount} per {subscription.billingCycle}
                      </p>
                    </div>
                    {subscription.nextBillingDate && (
                      <div>
                        <p className="text-sm font-medium mb-1">Next Billing</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(
                            subscription.nextBillingDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Upgrade Options */}
              {subscription.planType !== "premium" &&
                subscription.status === "active" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <VVCard>
                      <VVCardHeader>
                        <VVCardTitle className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Upgrade Available
                        </VVCardTitle>
                      </VVCardHeader>
                      <VVCardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upgrade to Premium for unlimited orders and exclusive
                          features.
                        </p>
                        <VVButton className="w-full">
                          <Crown className="mr-2 h-4 w-4" />
                          Upgrade to Premium
                        </VVButton>
                      </VVCardContent>
                    </VVCard>
                  </motion.div>
                )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

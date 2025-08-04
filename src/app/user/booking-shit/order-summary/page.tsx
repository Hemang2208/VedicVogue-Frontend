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
import { VVAlert, VVAlertDescription } from "@/components/ui/vv-alert";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Edit,
  Gift,
  ArrowLeft,
  Calendar,
  Users,
  Utensils,
} from "lucide-react";

const orderSummary = {
  plan: {
    name: "Premium Thali Plan",
    type: "Monthly",
    duration: "30 days",
    meals: ["Lunch", "Dinner"],
    people: 2,
    startDate: "Dec 20, 2024",
    endDate: "Jan 19, 2025",
  },
  pricing: {
    basePrice: 180,
    days: 30,
    people: 2,
    subtotal: 10800,
    discount: 2700,
    deliveryFee: 0,
    taxes: 540,
    total: 8640,
  },
  delivery: {
    address: "123 MG Road, Koramangala, Bangalore - 560034",
    timeSlot: "12:00 PM - 2:00 PM",
    instructions: "Please call before delivery",
  },
  payment: {
    method: "UPI",
    details: "•••• •••• •••• 4242",
  },
  addOns: [
    { name: "Fresh Salad", price: 30, quantity: 15 },
    { name: "Traditional Sweet", price: 40, quantity: 10 },
  ],
};

export default function OrderSummaryPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to success page or dashboard
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <VVButton variant="ghost" size="icon" asChild>
                <Link href="/booking">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold">Order Summary</h1>
                <p className="text-muted-foreground">
                  Review your order details before confirming
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Plan Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <div className="flex items-center justify-between">
                      <VVCardTitle className="flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        Plan Details
                      </VVCardTitle>
                      <VVButton variant="ghost" size="sm" asChild>
                        <Link href="/booking">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </VVButton>
                    </div>
                  </VVCardHeader>
                  <VVCardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {orderSummary.plan.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {orderSummary.plan.type} Subscription
                        </p>
                      </div>
                      <VVBadge variant="gradient">Premium</VVBadge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {orderSummary.plan.duration}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Duration
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {orderSummary.plan.people} People
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Serving
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {orderSummary.plan.meals.join(", ")}
                          </p>
                          <p className="text-xs text-muted-foreground">Meals</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {orderSummary.plan.startDate}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Start Date
                          </p>
                        </div>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Delivery Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <div className="flex items-center justify-between">
                      <VVCardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Delivery Details
                      </VVCardTitle>
                      <VVButton variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </VVButton>
                    </div>
                  </VVCardHeader>
                  <VVCardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Delivery Address</h4>
                      <p className="text-muted-foreground">
                        {orderSummary.delivery.address}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Delivery Time</h4>
                      <p className="text-muted-foreground">
                        {orderSummary.delivery.timeSlot}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Special Instructions</h4>
                      <p className="text-muted-foreground">
                        {orderSummary.delivery.instructions}
                      </p>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Add-ons */}
              {orderSummary.addOns.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <VVCard>
                    <VVCardHeader>
                      <VVCardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5" />
                        Add-ons
                      </VVCardTitle>
                    </VVCardHeader>
                    <VVCardContent>
                      <div className="space-y-3">
                        {orderSummary.addOns.map((addon, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">{addon.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {addon.quantity}
                              </p>
                            </div>
                            <p className="font-semibold">
                              ₹{addon.price * addon.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </VVCardContent>
                  </VVCard>
                </motion.div>
              )}

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <div className="flex items-center justify-between">
                      <VVCardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Method
                      </VVCardTitle>
                      <VVButton variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Change
                      </VVButton>
                    </div>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">
                        UPI
                      </div>
                      <div>
                        <p className="font-medium">
                          {orderSummary.payment.method}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {orderSummary.payment.details}
                        </p>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <VVCard className="sticky top-24">
                  <VVCardHeader>
                    <VVCardTitle>Order Summary</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>
                          Base Price (₹{orderSummary.pricing.basePrice}/day)
                        </span>
                        <span>₹{orderSummary.pricing.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span>{orderSummary.pricing.days} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>People</span>
                        <span>{orderSummary.pricing.people}</span>
                      </div>
                      {orderSummary.addOns.map((addon, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span>{addon.name}</span>
                          <span>₹{addon.price * addon.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>
                          ₹
                          {orderSummary.pricing.subtotal +
                            orderSummary.addOns.reduce(
                              (sum, addon) =>
                                sum + addon.price * addon.quantity,
                              0
                            )}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Discount (25%)</span>
                        <span>-₹{orderSummary.pricing.discount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span className="text-green-600">FREE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & Fees</span>
                        <span>₹{orderSummary.pricing.taxes}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        ₹{orderSummary.pricing.total}
                      </span>
                    </div>

                    <VVAlert variant="info">
                      <VVAlertDescription>
                        You&apos;re saving ₹{orderSummary.pricing.discount} with
                        this monthly plan!
                      </VVAlertDescription>
                    </VVAlert>

                    <div className="space-y-3 pt-4">
                      <VVButton
                        className="w-full"
                        size="lg"
                        loading={isProcessing}
                        onClick={handleConfirmOrder}
                      >
                        {isProcessing ? "Processing..." : "Confirm Order"}
                      </VVButton>

                      <VVButton variant="outline" className="w-full" asChild>
                        <Link href="/booking">Back to Booking</Link>
                      </VVButton>
                    </div>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3" />
                        <span>Free cancellation within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3" />
                        <span>Pause or skip meals anytime</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3" />
                        <span>100% money-back guarantee</span>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

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
import { VVStepper } from "@/components/ui/vv-stepper";
import { VVAlert, VVAlertDescription } from "@/components/ui/vv-alert";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";

const bookingSteps = [
  {
    id: "meal",
    title: "Select Meal",
    description: "Choose your preferred meal type",
  },
  { id: "date", title: "Select Date", description: "Pick delivery schedule" },
  { id: "addons", title: "Add-ons", description: "Enhance your meal" },
  { id: "review", title: "Review", description: "Confirm your order" },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "Order placed successfully",
  },
];

// Mock order data
const orderData = {
  meal: {
    id: "classic-thali",
    name: "Classic Veg Thali",
    description:
      "Traditional Indian thali with dal, sabzi, rice, roti, pickle, and papad",
    price: 120,
    image: "https://placehold.co/100x100/svg",
  },
  delivery: {
    date: "December 20, 2024",
    timeSlot: "12:00 PM - 2:00 PM",
    type: "Single Delivery",
    address: "123 MG Road, Koramangala, Bangalore - 560034",
  },
  addOns: [
    { id: "gulab-jamun", name: "Gulab Jamun", price: 40, quantity: 1 },
    { id: "lassi", name: "Sweet Lassi", price: 30, quantity: 1 },
  ],
  pricing: {
    mealPrice: 120,
    addOnsPrice: 70,
    deliveryFee: 0,
    taxes: 9.5,
    total: 199.5,
  },
  payment: {
    method: "UPI",
    details: "•••• •••• •••• 4242",
  },
};

export default function ReviewPage() {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    // Simulate order placement
    setTimeout(() => {
      window.location.href = "/user/book/confirmation";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <VVButton variant="ghost" size="icon" asChild>
              <Link href="/user/book/addons">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </VVButton>
            <div>
              <h1 className="text-3xl font-bold">Review Your Order</h1>
              <p className="text-muted-foreground">
                Please review your order details before confirming
              </p>
            </div>
          </div>

          {/* Stepper */}
          <VVStepper steps={bookingSteps} currentStep={3} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meal Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <VVCard>
                <VVCardHeader>
                  <div className="flex items-center justify-between">
                    <VVCardTitle>Selected Meal</VVCardTitle>
                    <VVButton variant="ghost" size="sm" asChild>
                      <Link href="/user/book/select-meal">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </VVButton>
                  </div>
                </VVCardHeader>
                <VVCardContent>
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        orderData.meal.image || "https://placehold.co/50x50/svg"
                      }
                      alt={orderData.meal.name}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {orderData.meal.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {orderData.meal.description}
                      </p>
                      <p className="text-xl font-bold text-primary mt-2">
                        ₹{orderData.meal.price}
                      </p>
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
                    <VVButton variant="ghost" size="sm" asChild>
                      <Link href="/user/book/select-date">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </VVButton>
                  </div>
                </VVCardHeader>
                <VVCardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Date</h4>
                      <p className="text-muted-foreground">
                        {orderData.delivery.date}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Time Slot</h4>
                      <p className="text-muted-foreground">
                        {orderData.delivery.timeSlot}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Delivery Address</h4>
                    <p className="text-muted-foreground">
                      {orderData.delivery.address}
                    </p>
                  </div>
                  <VVBadge variant="outline">{orderData.delivery.type}</VVBadge>
                </VVCardContent>
              </VVCard>
            </motion.div>

            {/* Add-ons */}
            {orderData.addOns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <div className="flex items-center justify-between">
                      <VVCardTitle>Add-ons</VVCardTitle>
                      <VVButton variant="ghost" size="sm" asChild>
                        <Link href="/user/book/addons">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </VVButton>
                    </div>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="space-y-3">
                      {orderData.addOns.map((addOn, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{addOn.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {addOn.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ₹{addOn.price * addOn.quantity}
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
                      <p className="font-medium">{orderData.payment.method}</p>
                      <p className="text-sm text-muted-foreground">
                        {orderData.payment.details}
                      </p>
                    </div>
                  </div>
                </VVCardContent>
              </VVCard>
            </motion.div>
          </div>

          {/* Order Summary */}
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
                    <span>Meal Price</span>
                    <span>₹{orderData.pricing.mealPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add-ons</span>
                    <span>₹{orderData.pricing.addOnsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{orderData.pricing.taxes}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    ₹{orderData.pricing.total}
                  </span>
                </div>

                <VVAlert variant="info">
                  <VVAlertDescription>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        Estimated delivery: {orderData.delivery.timeSlot}
                      </span>
                    </div>
                  </VVAlertDescription>
                </VVAlert>

                <div className="space-y-3 pt-4">
                  <VVButton
                    className="w-full"
                    size="lg"
                    loading={isPlacingOrder}
                    onClick={handlePlaceOrder}
                  >
                    {isPlacingOrder ? "Placing Order..." : "Place Order"}
                  </VVButton>

                  <VVButton variant="outline" className="w-full" asChild>
                    <Link href="/user/book/addons">Back to Add-ons</Link>
                  </VVButton>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>Free cancellation within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>100% money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>Fresh, hygienic preparation</span>
                  </div>
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

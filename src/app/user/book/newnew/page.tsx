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
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  CalendarIcon,
  Users,
} from "lucide-react";

type BookingStep = {
  id: string;
  title: string;
  description: string;
};

type TimeSlot = {
  id: string;
  time: string;
  label: string;
  available: boolean;
};

type DeliveryOption = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type AddOnItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type OrderData = {
  meal: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  delivery: {
    date: string;
    timeSlot: string;
    type: string;
    address: string;
  };
  addOns: AddOnItem[];
  pricing: {
    mealPrice: number;
    addOnsPrice: number;
    deliveryFee: number;
    taxes: number;
    total: number;
  };
  payment: {
    method: string;
    details: string;
  };
};

const bookingSteps: BookingStep[] = [
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

const timeSlots: TimeSlot[] = [
  {
    id: "morning",
    time: "8:00 AM - 10:00 AM",
    label: "Breakfast",
    available: true,
  },
  { id: "lunch", time: "12:00 PM - 2:00 PM", label: "Lunch", available: true },
  {
    id: "evening",
    time: "6:00 PM - 8:00 PM",
    label: "Dinner",
    available: true,
  },
];

const deliveryOptions: DeliveryOption[] = [
  {
    id: "single",
    name: "Single Delivery",
    description: "One-time delivery for selected date",
    icon: CalendarIcon,
  },
  {
    id: "recurring",
    name: "Recurring Delivery",
    description: "Repeat delivery for multiple days",
    icon: Users,
  },
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Mock order data
const initialOrderData: OrderData = {
  meal: {
    id: "classic-thali",
    name: "Classic Veg Thali",
    description:
      "Traditional Indian thali with dal, sabzi, rice, roti, pickle, and papad",
    price: 120,
    image: "https://placehold.co/100x100/svg",
  },
  delivery: {
    date: "",
    timeSlot: "",
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

type BookingStepType = "date" | "review";

export default function BookingProcessPage() {
  const [currentStep, setCurrentStep] = useState<BookingStepType>("date");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<string>("single");
  const [recurringDays, setRecurringDays] = useState<string[]>([]);
  const [orderData, setOrderData] = useState<OrderData>(initialOrderData);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const toggleRecurringDay = (day: string) => {
    setRecurringDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const canContinue =
    selectedDate &&
    selectedTimeSlot &&
    (deliveryType === "single" || recurringDays.length > 0);

  const handleContinueToReview = () => {
    if (canContinue) {
      const selectedTime = timeSlots.find(
        (slot) => slot.id === selectedTimeSlot
      );
      const deliveryTypeName =
        deliveryType === "single" ? "Single Delivery" : "Recurring Delivery";

      setOrderData((prev) => ({
        ...prev,
        delivery: {
          ...prev.delivery,
          date: selectedDate?.toLocaleDateString() || "",
          timeSlot: selectedTime?.time || "",
          type: deliveryTypeName,
        },
      }));

      setCurrentStep("review");
    }
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    // Simulate order placement
    setTimeout(() => {
      window.location.href = "/user/book/confirmation";
    }, 2000);
  };

  const renderDateSelectionStep = () => (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Date & Time Selection */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="space-y-6">
          {/* Delivery Type */}
          <VVCard>
            <VVCardHeader>
              <VVCardTitle>Delivery Type</VVCardTitle>
            </VVCardHeader>
            <VVCardContent>
              <div className="grid grid-cols-2 gap-4">
                {deliveryOptions.map((option) => (
                  <VVCard
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      deliveryType === option.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setDeliveryType(option.id)}
                  >
                    <VVCardContent className="p-4 text-center">
                      <option.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium mb-1">{option.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </VVCardContent>
                  </VVCard>
                ))}
              </div>
            </VVCardContent>
          </VVCard>

          {/* Calendar */}
          <VVCard>
            <VVCardHeader>
              <VVCardTitle>Select Date</VVCardTitle>
            </VVCardHeader>
            <VVCardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  date < new Date() || date < new Date(Date.now() - 86400000)
                }
                className="rounded-md border w-full"
              />
              {selectedDate && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">Selected Date:</p>
                  <p className="text-primary font-semibold">
                    {selectedDate.toLocaleDateString()}
                  </p>
                </div>
              )}
            </VVCardContent>
          </VVCard>

          {/* Recurring Days (if recurring selected) */}
          {deliveryType === "recurring" && (
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Select Days</VVCardTitle>
                <p className="text-muted-foreground text-sm">
                  Choose which days you want recurring delivery
                </p>
              </VVCardHeader>
              <VVCardContent>
                <div className="grid grid-cols-2 gap-2">
                  {weekDays.map((day) => (
                    <VVButton
                      key={day}
                      variant={
                        recurringDays.includes(day) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => toggleRecurringDay(day)}
                    >
                      {day.slice(0, 3)}
                    </VVButton>
                  ))}
                </div>
                {recurringDays.length > 0 && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium">Selected Days:</p>
                    <p className="text-primary font-semibold">
                      {recurringDays.join(", ")}
                    </p>
                  </div>
                )}
              </VVCardContent>
            </VVCard>
          )}
        </div>
      </motion.div>

      {/* Time Slots */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <VVCard className="sticky top-24">
          <VVCardHeader>
            <VVCardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Select Time Slot
            </VVCardTitle>
          </VVCardHeader>
          <VVCardContent className="space-y-4">
            {timeSlots.map((slot) => (
              <VVCard
                key={slot.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTimeSlot === slot.id
                    ? "ring-2 ring-primary bg-primary/5"
                    : ""
                } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
              >
                <VVCardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{slot.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        {slot.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedTimeSlot === slot.id && (
                        <VVBadge variant="default">Selected</VVBadge>
                      )}
                      {!slot.available && (
                        <VVBadge variant="destructive">Unavailable</VVBadge>
                      )}
                    </div>
                  </div>
                </VVCardContent>
              </VVCard>
            ))}

            {/* Summary */}
            {selectedDate && selectedTimeSlot && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Delivery Summary</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Date:</span>{" "}
                    <span className="font-medium">
                      {selectedDate.toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Time:</span>{" "}
                    <span className="font-medium">
                      {
                        timeSlots.find((slot) => slot.id === selectedTimeSlot)
                          ?.time
                      }
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Type:</span>{" "}
                    <span className="font-medium">
                      {deliveryType === "single"
                        ? "Single Delivery"
                        : "Recurring Delivery"}
                    </span>
                  </p>
                  {deliveryType === "recurring" && recurringDays.length > 0 && (
                    <p>
                      <span className="text-muted-foreground">Days:</span>{" "}
                      <span className="font-medium">
                        {recurringDays.join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Continue Button */}
            {canContinue && (
              <VVButton
                className="w-full"
                size="lg"
                onClick={handleContinueToReview}
              >
                Continue to Review
                <ArrowRight className="ml-2 h-4 w-4" />
              </VVButton>
            )}
          </VVCardContent>
        </VVCard>
      </motion.div>
    </div>
  );

  const renderReviewStep = () => (
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
                  src={orderData.meal.image || "https://placehold.co/50x50/svg"}
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
                <VVButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep("date")}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
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
              <span className="text-primary">₹{orderData.pricing.total}</span>
            </div>

            <VVAlert variant="info">
              <VVAlertDescription>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated delivery: {orderData.delivery.timeSlot}</span>
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

              <VVButton
                variant="outline"
                className="w-full"
                onClick={() => setCurrentStep("date")}
              >
                Back to Date Selection
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
  );

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
              <Link
                href={currentStep === "date" ? "/user/book/select-meal" : "#"}
                onClick={(e) => {
                  if (currentStep === "review") {
                    e.preventDefault();
                    setCurrentStep("date");
                  }
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </VVButton>
            <div>
              <h1 className="text-3xl font-bold">
                {currentStep === "date"
                  ? "Select Date & Time"
                  : "Review Your Order"}
              </h1>
              <p className="text-muted-foreground">
                {currentStep === "date"
                  ? "Choose when you want your meal delivered"
                  : "Please review your order details before confirming"}
              </p>
            </div>
          </div>

          {/* Stepper */}
          <VVStepper
            steps={bookingSteps}
            currentStep={currentStep === "date" ? 1 : 3}
          />
        </motion.div>

        {currentStep === "date"
          ? renderDateSelectionStep()
          : renderReviewStep()}
      </div>

      <Footer />
    </div>
  );
}

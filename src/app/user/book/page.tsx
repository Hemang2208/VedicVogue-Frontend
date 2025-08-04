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
// import { VVStepper } from "@/components/ui/vv-stepper";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Users, Calendar, Gift } from "lucide-react";

// const bookingSteps = [
//   {
//     id: "meal",
//     title: "Select Meal",
//     description: "Choose your preferred meal type",
//   },
//   { id: "date", title: "Select Date", description: "Pick delivery schedule" },
//   { id: "addons", title: "Add-ons", description: "Enhance your meal" },
//   { id: "review", title: "Review", description: "Confirm your order" },
//   {
//     id: "confirmation",
//     title: "Confirmation",
//     description: "Order placed successfully",
//   },
// ];

const quickBookOptions = [
  {
    title: "Today's Special",
    description: "Classic Veg Thali for today",
    time: "12:00 PM - 2:00 PM",
    price: 120,
    image: "https://placehold.co/300x200/svg",
    popular: true,
  },
  {
    title: "Tomorrow's Meal",
    description: "Fitness Bowl for tomorrow",
    time: "12:00 PM - 2:00 PM",
    price: 150,
    image: "https://placehold.co/300x200/svg",
    popular: false,
  },
  {
    title: "Weekly Plan",
    description: "5 days lunch subscription",
    time: "Flexible timing",
    price: 600,
    image: "https://placehold.co/300x200/svg",
    popular: true,
  },
];

export default function BookPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Book Your Meal</h1>
          <p className="text-xl px-4 text-muted-foreground max-w-3xl mx-auto">
            Choose from quick booking options or create a custom meal plan that
            fits your schedule.
          </p>
        </motion.div>

        {/* Booking Stepper */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <VVStepper steps={bookingSteps} currentStep={currentStep} />
        </motion.div> */}

        <div className="grid lg:grid-cols-2 gap-12 relative">
          {/* Quick Booking */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
            id="quick-booking"
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Quick Booking
                </VVCardTitle>
                <p className="text-muted-foreground">
                  Get started with our popular meal options
                </p>
              </VVCardHeader>
              <VVCardContent className="space-y-4">
                {quickBookOptions.map((option, index: number) => (
                  <VVCard
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-all border-2 border-transparent hover:border-primary/20"
                  >
                    <VVCardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Left Section: Title, Tag, Description */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-base sm:text-lg">
                              {option.title}
                            </h3>
                            {option.popular && (
                              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm mb-1">
                            {option.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {option.time}
                          </p>
                        </div>

                        {/* Right Section: Price and CTA */}
                        <div className="text-left sm:text-right">
                          <p className="text-xl font-bold text-primary mb-2 sm:mb-1">
                            ₹{option.price}
                          </p>
                          <VVButton size="sm" asChild>
                            <Link
                              href="/user/book/select-meal"
                              className="inline-flex items-center"
                            >
                              Book Now
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Link>
                          </VVButton>
                        </div>
                      </div>
                    </VVCardContent>
                  </VVCard>
                ))}
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Custom Booking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-25 self-start"
            style={{ alignSelf: "flex-start" }}
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Custom Booking
                </VVCardTitle>
                <p className="text-muted-foreground">
                  Create a personalized meal plan
                </p>
              </VVCardHeader>
              <VVCardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <VVCard
                    className="text-center p-4 cursor-pointer hover:shadow-md transition-all"
                    asChild
                  >
                    <Link href="/user/book/select-meal">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium">Single Meal</h4>
                      <p className="text-sm text-muted-foreground">
                        Book for today or specific date
                      </p>
                    </Link>
                  </VVCard>

                  <VVCard
                    className="text-center p-4 cursor-pointer hover:shadow-md transition-all"
                    asChild
                  >
                    <Link href="/subscriptions">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium">Subscription</h4>
                      <p className="text-sm text-muted-foreground">
                        Weekly or monthly plans
                      </p>
                    </Link>
                  </VVCard>
                </div>

                <div className="space-y-4">
                  <VVButton className="w-full" size="lg" asChild>
                    <Link href="/user/book/select-meal">
                      Start Custom Booking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </VVButton>

                  <VVButton variant="outline" className="w-full" asChild>
                    <Link href="/user/customize">
                      <Gift className="mr-2 h-4 w-4" />
                      Customize Preferences First
                    </Link>
                  </VVButton>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Need help choosing? Check our</p>
                  <Link
                    href="/user/profile/help/bookings"
                    className="text-primary hover:underline"
                  >
                    Booking Guide
                  </Link>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <VVCard>
            <VVCardHeader>
              <VVCardTitle className="text-center">
                Why Book With Us?
              </VVCardTitle>
            </VVCardHeader>
            <VVCardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h4 className="font-medium mb-2">Flexible Timing</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred delivery time slot
                  </p>
                </div>
                <div>
                  <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h4 className="font-medium mb-2">Family Plans</h4>
                  <p className="text-sm text-muted-foreground">
                    Order for multiple people with one booking
                  </p>
                </div>
                <div>
                  <Gift className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h4 className="font-medium mb-2">Add-ons Available</h4>
                  <p className="text-sm text-muted-foreground">
                    Enhance your meal with sweets and drinks
                  </p>
                </div>
              </div>
            </VVCardContent>
          </VVCard>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

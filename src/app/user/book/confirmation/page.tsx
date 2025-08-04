"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { VVButton } from "@/components/ui/vv-button"
import { VVCard, VVCardContent, VVCardHeader, VVCardTitle } from "@/components/ui/vv-card"
import { VVBadge } from "@/components/ui/vv-badge"
import { VVStepper } from "@/components/ui/vv-stepper"
import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle, Clock, MapPin, Phone, Star, Calendar, Home } from "lucide-react"

const bookingSteps = [
  { id: "meal", title: "Select Meal", description: "Choose your preferred meal type" },
  { id: "date", title: "Select Date", description: "Pick delivery schedule" },
  { id: "addons", title: "Add-ons", description: "Enhance your meal" },
  { id: "review", title: "Review", description: "Confirm your order" },
  { id: "confirmation", title: "Confirmation", description: "Order placed successfully" },
]

const orderDetails = {
  orderId: "VV-2024-001234",
  meal: "Classic Veg Thali",
  date: "December 20, 2024",
  timeSlot: "12:00 PM - 2:00 PM",
  total: 199.5,
  estimatedDelivery: "45 minutes",
}

export default function ConfirmationPage() {
  const [, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Order Confirmation</h1>
            <p className="text-muted-foreground">Your order has been placed successfully!</p>
          </div>

          {/* Stepper */}
          <VVStepper steps={bookingSteps} currentStep={4} />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
            <p className="text-muted-foreground">
              Thank you for choosing VedicVogue Kitchen. Your delicious meal is being prepared.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Order Details</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order ID:</span>
                  <VVBadge variant="outline" className="font-mono">
                    {orderDetails.orderId}
                  </VVBadge>
                </div>

                <div className="flex justify-between">
                  <span>Meal:</span>
                  <span className="font-medium">{orderDetails.meal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Date:</span>
                  <span className="font-medium">{orderDetails.date}</span>
                </div>

                <div className="flex justify-between">
                  <span>Time Slot:</span>
                  <span className="font-medium">{orderDetails.timeSlot}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-bold text-primary">₹{orderDetails.total}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-medium text-green-600">{orderDetails.estimatedDelivery}</span>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Next Steps */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <VVCard className="mt-6">
              <VVCardHeader>
                <VVCardTitle>What&apos;s Next?</VVCardTitle>
              </VVCardHeader>
              <VVCardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Order Preparation</h4>
                      <p className="text-sm text-muted-foreground">
                        Our chefs are preparing your fresh meal with the finest ingredients.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Out for Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        You&apos;ll receive a notification when your order is out for delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Rate Your Experience</h4>
                      <p className="text-sm text-muted-foreground">
                        After delivery, please rate your meal to help us improve.
                      </p>
                    </div>
                  </div>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <VVButton asChild>
                <Link href="/user/tracker">
                  <MapPin className="mr-2 h-4 w-4" />
                  Track Order
                </Link>
              </VVButton>
              <VVButton variant="outline" asChild>
                <Link href="/user/profile/orders">
                  <Calendar className="mr-2 h-4 w-4" />
                  My Orders
                </Link>
              </VVButton>
            </div>

            <VVButton variant="outline" className="w-full" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </VVButton>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <VVCard className="bg-muted/50">
              <VVCardContent className="p-6">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is here to assist you with any questions.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <VVButton variant="ghost" size="sm" asChild>
                    <Link href="/user/contact-support">Contact Support</Link>
                  </VVButton>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

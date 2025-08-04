"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { VVButton } from "@/components/ui/vv-button"
import { VVCard, VVCardContent, VVCardHeader, VVCardTitle } from "@/components/ui/vv-card"
import { VVBadge } from "@/components/ui/vv-badge"
import { VVStepper } from "@/components/ui/vv-stepper"
import { Calendar } from "@/components/ui/calendar"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, CalendarIcon, Users } from "lucide-react"

const bookingSteps = [
  { id: "meal", title: "Select Meal", description: "Choose your preferred meal type" },
  { id: "date", title: "Select Date", description: "Pick delivery schedule" },
  { id: "addons", title: "Add-ons", description: "Enhance your meal" },
  { id: "review", title: "Review", description: "Confirm your order" },
  { id: "confirmation", title: "Confirmation", description: "Order placed successfully" },
]

const timeSlots = [
  { id: "morning", time: "8:00 AM - 10:00 AM", label: "Breakfast", available: true },
  { id: "lunch", time: "12:00 PM - 2:00 PM", label: "Lunch", available: true },
  { id: "evening", time: "6:00 PM - 8:00 PM", label: "Dinner", available: true },
]

const deliveryOptions = [
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
]

export default function SelectDatePage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [deliveryType, setDeliveryType] = useState<string>("single")
  const [recurringDays, setRecurringDays] = useState<string[]>([])

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const toggleRecurringDay = (day: string) => {
    setRecurringDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const canContinue = selectedDate && selectedTimeSlot && (deliveryType === "single" || recurringDays.length > 0)

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <VVButton variant="ghost" size="icon" asChild>
              <Link href="/user/book/select-meal">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </VVButton>
            <div>
              <h1 className="text-3xl font-bold">Select Date & Time</h1>
              <p className="text-muted-foreground">Choose when you want your meal delivered</p>
            </div>
          </div>

          {/* Stepper */}
          <VVStepper steps={bookingSteps} currentStep={1} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Date & Time Selection */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
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
                          <p className="text-xs text-muted-foreground">{option.description}</p>
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
                    disabled={(date) => date < new Date() || date < new Date(Date.now() - 86400000)}
                    className="rounded-md border w-full"
                  />
                  {selectedDate && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium">Selected Date:</p>
                      <p className="text-primary font-semibold">{selectedDate.toLocaleDateString()}</p>
                    </div>
                  )}
                </VVCardContent>
              </VVCard>

              {/* Recurring Days (if recurring selected) */}
              {deliveryType === "recurring" && (
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Select Days</VVCardTitle>
                    <p className="text-muted-foreground text-sm">Choose which days you want recurring delivery</p>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {weekDays.map((day) => (
                        <VVButton
                          key={day}
                          variant={recurringDays.includes(day) ? "default" : "outline"}
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
                        <p className="text-primary font-semibold">{recurringDays.join(", ")}</p>
                      </div>
                    )}
                  </VVCardContent>
                </VVCard>
              )}
            </div>
          </motion.div>

          {/* Time Slots */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
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
                      selectedTimeSlot === slot.id ? "ring-2 ring-primary bg-primary/5" : ""
                    } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                  >
                    <VVCardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{slot.label}</h4>
                          <p className="text-sm text-muted-foreground">{slot.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedTimeSlot === slot.id && <VVBadge variant="default">Selected</VVBadge>}
                          {!slot.available && <VVBadge variant="destructive">Unavailable</VVBadge>}
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
                        <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Time:</span>{" "}
                        <span className="font-medium">
                          {timeSlots.find((slot) => slot.id === selectedTimeSlot)?.time}
                        </span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Type:</span>{" "}
                        <span className="font-medium">
                          {deliveryType === "single" ? "Single Delivery" : "Recurring Delivery"}
                        </span>
                      </p>
                      {deliveryType === "recurring" && recurringDays.length > 0 && (
                        <p>
                          <span className="text-muted-foreground">Days:</span>{" "}
                          <span className="font-medium">{recurringDays.join(", ")}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                {canContinue && (
                  <VVButton className="w-full" size="lg" asChild>
                    <Link href="/user/book/addons">
                      Continue to Add-ons
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </VVButton>
                )}
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

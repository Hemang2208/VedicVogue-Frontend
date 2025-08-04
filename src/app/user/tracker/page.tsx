"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Truck,
  CheckCircle,
  Phone,
  Star,
  CalendarIcon,
  ChefHat,
  Package,
  NavigationIcon,
} from "lucide-react";

const todaysMeals = [
  {
    id: 1,
    name: "Classic Veg Thali",
    type: "Lunch",
    time: "12:00 PM - 2:00 PM",
    status: "out-for-delivery",
    estimatedTime: "15 mins",
    image: "https://placehold.co/80x80/svg",
    deliveryPartner: "Rajesh Kumar",
    phone: "+91 98765 43210",
    trackingSteps: [
      { step: "Order Confirmed", completed: true, time: "10:30 AM" },
      { step: "Preparing", completed: true, time: "11:00 AM" },
      { step: "Out for Delivery", completed: true, time: "11:45 AM" },
      { step: "Delivered", completed: false, time: "12:00 PM" },
    ],
  },
  {
    id: 2,
    name: "Protein Power Bowl",
    type: "Dinner",
    time: "6:00 PM - 8:00 PM",
    status: "preparing",
    estimatedTime: "2 hours",
    image: "https://placehold.co/80x80/svg",
    trackingSteps: [
      { step: "Order Confirmed", completed: true, time: "5:30 PM" },
      { step: "Preparing", completed: true, time: "6:00 PM" },
      { step: "Out for Delivery", completed: false, time: "7:00 PM" },
      { step: "Delivered", completed: false, time: "7:30 PM" },
    ],
  },
];

const upcomingMeals = [
  {
    id: 3,
    date: "Tomorrow",
    meals: [
      { name: "South Indian Delight", type: "Lunch", time: "12:00 PM" },
      { name: "Keto Diet Special", type: "Dinner", time: "7:00 PM" },
    ],
  },
  {
    id: 4,
    date: "Day After Tomorrow",
    meals: [
      { name: "Fitness Special", type: "Lunch", time: "12:00 PM" },
      { name: "Classic Veg Thali", type: "Dinner", time: "7:00 PM" },
    ],
  },
];

export default function TrackerPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("today");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500";
      case "preparing":
        return "bg-yellow-500";
      case "out-for-delivery":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Order Confirmed";
      case "preparing":
        return "Being Prepared";
      case "out-for-delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Meal Tracker</h1>
            <p className="text-muted-foreground">
              Track your meals and delivery status in real-time
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today&apos;s Meals</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Today's Meals */}
            <TabsContent value="today">
              <div className="grid lg:grid-cols-2 gap-6">
                {todaysMeals.map((meal) => (
                  <Card key={meal.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={meal.image || "https://placehold.co/50x50/svg"}
                            alt={meal.name}
                            width={60}
                            height={60}
                            className="rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold">{meal.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {meal.type} • {meal.time}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(meal.status)}>
                          {getStatusText(meal.status)}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Delivery Progress */}
                      <div className="space-y-3">
                        {meal.trackingSteps.map((step, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                step.completed ? "bg-primary" : "bg-muted"
                              }`}
                            >
                              {step.completed && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className={`text-sm ${
                                  step.completed
                                    ? "font-medium"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {step.step}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {step.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Partner Info */}
                      {meal.status === "out-for-delivery" && (
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">
                                Delivery Partner
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {meal.deliveryPartner}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <NavigationIcon className="h-4 w-4 mr-1" />
                                Track
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ETA */}
                      {meal.status !== "delivered" && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">
                              Estimated delivery: {meal.estimatedTime}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        {meal.status === "delivered" ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/feedback">Rate Meal</Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            Modify Order
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <ChefHat className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">Meals Today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Truck className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">In Transit</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Package className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Preparing</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Delivered</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Upcoming Meals */}
            <TabsContent value="upcoming">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {upcomingMeals.map((day) => (
                    <Card key={day.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5" />
                          {day.date}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {day.meals.map((meal, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div>
                                <h4 className="font-medium">{meal.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {meal.type} • {meal.time}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Skip
                                </Button>
                                <Button variant="outline" size="sm">
                                  Modify
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card>
                    <CardContent className="p-6 text-center">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Plan Your Week</h3>
                      <p className="text-muted-foreground mb-4">
                        Schedule your meals for the upcoming week
                      </p>
                      <Button asChild>
                        <Link href="/booking">Plan Meals</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* History */}
            <TabsContent value="history">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Image
                            src="https://placehold.co/60x60/svg"
                            alt="Meal"
                            width={60}
                            height={60}
                            className="rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold">Classic Veg Thali</h3>
                            <p className="text-sm text-muted-foreground">
                              Delivered on Dec {15 - index}, 2024 at 12:30 PM
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="outline">Delivered</Badge>
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}

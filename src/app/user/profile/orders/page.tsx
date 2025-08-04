"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
import { CalendarIcon, Clock, Pause, Play, Edit, Trash2, Plus, Download, Filter } from "lucide-react"

const activeSubscriptions = [
  {
    id: "SUB001",
    name: "Premium Thali Plan",
    type: "Monthly",
    startDate: "Dec 1, 2024",
    endDate: "Dec 31, 2024",
    status: "active",
    progress: 60,
    mealsCompleted: 18,
    totalMeals: 30,
    price: 3600,
    meals: ["Lunch", "Dinner"],
    nextDelivery: "Today, 12:00 PM",
  },
  {
    id: "SUB002",
    name: "Fitness Special",
    type: "Weekly",
    startDate: "Dec 10, 2024",
    endDate: "Dec 17, 2024",
    status: "paused",
    progress: 71,
    mealsCompleted: 5,
    totalMeals: 7,
    price: 1400,
    meals: ["Breakfast", "Lunch", "Dinner"],
    nextDelivery: "Paused",
  },
]

const orderHistory = [
  {
    id: "ORD001",
    date: "Dec 15, 2024",
    items: ["Classic Veg Thali", "Fresh Fruit Bowl"],
    amount: 180,
    status: "delivered",
    rating: 5,
    deliveryTime: "12:30 PM",
  },
  {
    id: "ORD002",
    date: "Dec 14, 2024",
    items: ["Protein Power Bowl", "Keto Diet Special"],
    amount: 360,
    status: "delivered",
    rating: 4,
    deliveryTime: "7:15 PM",
  },
  {
    id: "ORD003",
    date: "Dec 13, 2024",
    items: ["South Indian Delight"],
    amount: 140,
    status: "delivered",
    rating: 5,
    deliveryTime: "12:45 PM",
  },
]

export default function OrdersPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [filterStatus, setFilterStatus] = useState("all")

  const handlePauseSubscription = (id: string) => {
    console.log("Pausing subscription:", id)
  }

  const handleResumeSubscription = (id: string) => {
    console.log("Resuming subscription:", id)
  }

  const handleCancelSubscription = (id: string) => {
    console.log("Cancelling subscription:", id)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Orders & Subscriptions</h1>
              <p className="text-muted-foreground">Manage your meal plans and view order history</p>
            </div>
            <Button asChild>
              <Link href="/booking">
                <Plus className="h-4 w-4 mr-2" />
                New Subscription
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="subscriptions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
              <TabsTrigger value="history">Order History</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Meals</TabsTrigger>
            </TabsList>

            {/* Active Subscriptions */}
            <TabsContent value="subscriptions">
              <div className="space-y-6">
                {activeSubscriptions.map((subscription) => (
                  <Card key={subscription.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {subscription.name}
                            <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                              {subscription.status}
                            </Badge>
                          </CardTitle>
                          <p className="text-muted-foreground">
                            {subscription.type} Plan • {subscription.meals.join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">₹{subscription.price}</p>
                          <p className="text-sm text-muted-foreground">Total amount</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>
                            {subscription.mealsCompleted}/{subscription.totalMeals} meals
                          </span>
                        </div>
                        <Progress value={subscription.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Started: {subscription.startDate}</span>
                          <span>Ends: {subscription.endDate}</span>
                        </div>
                      </div>

                      {/* Next Delivery */}
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">Next Delivery:</span>
                          <span>{subscription.nextDelivery}</span>
                        </div>
                        {subscription.status === "active" && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/tracker">Track</Link>
                          </Button>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {subscription.status === "active" ? (
                          <Button variant="outline" size="sm" onClick={() => handlePauseSubscription(subscription.id)}>
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => handleResumeSubscription(subscription.id)}>
                            <Play className="h-4 w-4 mr-1" />
                            Resume
                          </Button>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Modify
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Modify Subscription</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Delivery Time</label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="morning">8:00 AM - 10:00 AM</SelectItem>
                                    <SelectItem value="lunch">12:00 PM - 2:00 PM</SelectItem>
                                    <SelectItem value="evening">6:00 PM - 8:00 PM</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Skip Dates</label>
                                <Calendar
                                  mode="multiple"
                                  selected={selectedDate ? [selectedDate] : []}
                                  onSelect={(dates) => setSelectedDate(dates?.[0])}
                                  className="rounded-md border"
                                />
                              </div>
                              <Button className="w-full">Save Changes</Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm" onClick={() => handleCancelSubscription(subscription.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>

                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Invoice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {activeSubscriptions.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">No Active Subscriptions</h3>
                      <p className="text-muted-foreground mb-4">
                        Start your healthy meal journey with our subscription plans
                      </p>
                      <Button asChild>
                        <Link href="/booking">Browse Plans</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Order History */}
            <TabsContent value="history">
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center gap-4">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                {/* Order List */}
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-semibold">Order #{order.id}</h3>
                              <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                              <p className="text-xs text-muted-foreground">
                                {order.date} • Delivered at {order.deliveryTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold">₹{order.amount}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-xs ${i < order.rating ? "text-yellow-400" : "text-gray-300"}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <Badge variant="outline">{order.status}</Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Reorder
                              </Button>
                              <Button variant="outline" size="sm">
                                Invoice
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center pt-4">
                  <Button variant="outline">Load More Orders</Button>
                </div>
              </div>
            </TabsContent>

            {/* Upcoming Meals */}
            <TabsContent value="upcoming">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {/* This Week */}
                  <Card>
                    <CardHeader>
                      <CardTitle>This Week&apos;s Meals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { day: "Today", meals: ["Classic Veg Thali", "Protein Power Bowl"] },
                          { day: "Tomorrow", meals: ["South Indian Delight", "Keto Diet Special"] },
                          { day: "Wednesday", meals: ["Fitness Special", "Classic Veg Thali"] },
                          { day: "Thursday", meals: ["Premium Thali", "Diet Bowl"] },
                          { day: "Friday", meals: ["Regional Special", "Light Dinner"] },
                        ].map((day, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{day.day}</h4>
                              <p className="text-sm text-muted-foreground">{day.meals.join(", ")}</p>
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

                  {/* Next Week Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Next Week Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">Plan Next Week</h3>
                        <p className="text-muted-foreground mb-4">
                          Your next week&apos;s meals will be available for planning soon
                        </p>
                        <Button asChild>
                          <Link href="/booking">Plan Meals</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" asChild>
                        <Link href="/booking">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Meals
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause All
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Bulk Modify
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}

"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Truck,
  Star,
  Plus,
  Settings,
  TrendingUp,
  Heart,
  Gift,
  Bell,
  ChefHat,
  Target,
} from "lucide-react";

const upcomingMeals = [
  {
    id: 1,
    name: "Classic Veg Thali",
    date: "Today",
    time: "12:00 PM - 2:00 PM",
    status: "preparing",
    image: "https://placehold.co/80x80/svg",
  },
  {
    id: 2,
    name: "Protein Power Bowl",
    date: "Today",
    time: "6:00 PM - 8:00 PM",
    status: "scheduled",
    image: "https://placehold.co/80x80/svg",
  },
  {
    id: 3,
    name: "South Indian Delight",
    date: "Tomorrow",
    time: "12:00 PM - 2:00 PM",
    status: "scheduled",
    image: "https://placehold.co/80x80/svg",
  },
];

const recentOrders = [
  {
    id: "ORD001",
    date: "Yesterday",
    meals: ["Classic Veg Thali", "Fresh Fruit Bowl"],
    amount: 180,
    status: "delivered",
    rating: 5,
  },
  {
    id: "ORD002",
    date: "2 days ago",
    meals: ["Fitness Special", "Keto Diet Bowl"],
    amount: 360,
    status: "delivered",
    rating: 4,
  },
];

const quickStats = [
  { label: "Active Plans", value: "2", icon: Calendar, color: "text-blue-600" },
  {
    label: "Meals This Month",
    value: "24",
    icon: ChefHat,
    color: "text-green-600",
  },
  {
    label: "Money Saved",
    value: "₹1,200",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    label: "Referral Points",
    value: "150",
    icon: Gift,
    color: "text-orange-600",
  },
];

export default function DashboardPage() {
  const [notifications] = useState([
    {
      id: 1,
      message: "Your lunch is being prepared!",
      time: "10 mins ago",
      type: "info",
    },
    {
      id: 2,
      message: "Rate your yesterday's meal",
      time: "1 day ago",
      type: "action",
    },
    {
      id: 3,
      message: "New menu items added!",
      time: "2 days ago",
      type: "update",
    },
  ]);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8 relative">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Priya! 👋</h1>
              <p className="text-muted-foreground">
                Here&apos;s what&apos;s happening with your meals today
              </p>
            </div>
            <Button asChild>
              <Link href="/booking">
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Meals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today&apos;s Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeals
                    .filter((meal) => meal.date === "Today")
                    .map((meal) => (
                      <div
                        key={meal.id}
                        className="flex items-start gap-4 p-4 border rounded-lg"
                      >
                        <Image
                          src={meal.image || "https://placehold.co/50x50/svg"}
                          alt={meal.name}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div className="flex flex-col gap-2 w-full">
                          <div className="flex justify-between items-start gap-15">
                            <h3 className="font-semibold">{meal.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {meal.time}
                            </p>
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            <Badge
                              variant={
                                meal.status === "preparing"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {meal.status === "preparing"
                                ? "Preparing"
                                : "Scheduled"}
                            </Badge>
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/user/tracker">Track</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Subscriptions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Active Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">Premium Thali Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          Monthly subscription
                        </p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>18/30 meals</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Started: Dec 1, 2024</span>
                        <span>Ends: Dec 31, 2024</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/orders">Manage</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        Pause
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">Fitness Special</h3>
                        <p className="text-sm text-muted-foreground">
                          Weekly subscription
                        </p>
                      </div>
                      <Badge variant="secondary">Paused</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>5/7 meals</span>
                      </div>
                      <Progress value={71} className="h-2" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Resume
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/orders">Manage</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Recent Orders
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/orders">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.meals.join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.amount}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < order.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-25 self-start">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/booking">
                    <Plus className="h-4 w-4 mr-2" />
                    Order New Meal
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/menu">
                    <Heart className="h-4 w-4 mr-2" />
                    Browse Menu
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/user/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/user/profile/referral">
                    <Gift className="h-4 w-4 mr-2" />
                    Refer Friends
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 border rounded-lg"
                    >
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Health Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Daily Calories</span>
                      <span>1,200 / 1,500</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Protein Intake</span>
                      <span>45g / 60g</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Weekly Goal</span>
                      <span>5 / 7 meals</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

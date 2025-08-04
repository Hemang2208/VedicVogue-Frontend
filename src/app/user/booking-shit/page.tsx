"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";

const mealPlans = [
  {
    id: "basic",
    name: "Basic Veg Plan",
    description: "Traditional vegetarian meals with dal, sabzi, rice, and roti",
    price: 120,
    originalPrice: 150,
    meals: ["Lunch", "Dinner"],
    features: ["Fresh vegetables", "Traditional recipes", "Balanced nutrition"],
    image: "https://placehold.co/300x200/svg",
  },
  {
    id: "premium",
    name: "Premium Thali",
    description:
      "Complete thali with variety of dishes, sweets, and premium ingredients",
    price: 180,
    originalPrice: 220,
    meals: ["Lunch", "Dinner"],
    features: ["Premium ingredients", "Variety of dishes", "Sweet included"],
    image: "https://placehold.co/300x200/svg",
    popular: true,
  },
  {
    id: "fitness",
    name: "Fitness Special",
    description:
      "High-protein, low-carb meals designed for fitness enthusiasts",
    price: 200,
    originalPrice: 240,
    meals: ["Breakfast", "Lunch", "Dinner"],
    features: ["High protein", "Low carb", "Calorie counted"],
    image: "https://placehold.co/300x200/svg",
  },
  {
    id: "diet",
    name: "Diet Plan",
    description: "Specially curated low-calorie meals for weight management",
    price: 160,
    originalPrice: 190,
    meals: ["Lunch", "Dinner"],
    features: ["Low calorie", "Portion controlled", "Nutritionist approved"],
    image: "https://placehold.co/300x200/svg",
  },
];

const deliverySlots = [
  { id: "morning", time: "8:00 AM - 10:00 AM", label: "Morning" },
  { id: "lunch", time: "12:00 PM - 2:00 PM", label: "Lunch Time" },
  { id: "evening", time: "6:00 PM - 8:00 PM", label: "Evening" },
];

const subscriptionDurations = [
  { id: "weekly", name: "1 Week", days: 7, discount: 0 },
  { id: "monthly", name: "1 Month", days: 30, discount: 10 },
  { id: "quarterly", name: "3 Months", days: 90, discount: 20 },
  { id: "yearly", name: "6 Months", days: 180, discount: 30 },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [skipDays, setSkipDays] = useState<Date[]>([]);
  const [mealCount, setMealCount] = useState(1);

  const totalSteps: number = 4;
  const progress: number = (currentStep / totalSteps) * 100;

  const selectedPlanData = mealPlans.find((plan) => plan.id === selectedPlan);
  const selectedDurationData = subscriptionDurations.find(
    (d) => d.id === selectedDuration
  );

  const calculateTotal = () => {
    if (!selectedPlanData || !selectedDurationData) return 0;
    const basePrice: number =
      selectedPlanData.price * selectedDurationData.days * mealCount;
    const discount: number = (basePrice * selectedDurationData.discount) / 100;
    return basePrice - discount;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleMeal = (meal: string) => {
    setSelectedMeals((prev: string[]) =>
      prev.includes(meal)
        ? prev.filter((m: string) => m !== meal)
        : [...prev, meal]
    );
  };

  // const toggleSkipDay = (date: Date) => {
  //   setSkipDays((prev) => {
  //     const dateString = date.toDateString()
  //     const exists = prev.find((d) => d.toDateString() === dateString)
  //     if (exists) {
  //       return prev.filter((d) => d.toDateString() !== dateString)
  //     } else {
  //       return [...prev, date]
  //     }
  //   })
  // }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Book Your Meal Plan
          </h1>
          <p className="text-xl text-muted-foreground">
            Create your personalized tiffin subscription in just a few steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            <span
              className={currentStep >= 1 ? "text-primary font-medium" : ""}
            >
              Choose Plan
            </span>
            <span
              className={currentStep >= 2 ? "text-primary font-medium" : ""}
            >
              Select Meals
            </span>
            <span
              className={currentStep >= 3 ? "text-primary font-medium" : ""}
            >
              Schedule
            </span>
            <span
              className={currentStep >= 4 ? "text-primary font-medium" : ""}
            >
              Confirm
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Choose Plan */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Choose Your Meal Plan</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {mealPlans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div className="relative">
                        <Image
                          src={plan.image || "https://placehold.co/50x50/svg"}
                          alt={plan.name}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        {plan.popular && (
                          <Badge className="absolute top-2 left-2">
                            Most Popular
                          </Badge>
                        )}
                        <div className="absolute top-2 right-2">
                          <div className="bg-white rounded-lg p-2 shadow-md">
                            <div className="text-lg font-bold text-primary">
                              ₹{plan.price}
                            </div>
                            <div className="text-xs text-muted-foreground line-through">
                              ₹{plan.originalPrice}
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {plan.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>{plan.meals.join(", ")}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {plan.features.map((feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {selectedPlan === plan.id && (
                          <div className="mt-3 flex items-center gap-2 text-primary">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Selected
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Meals */}
            {currentStep === 2 && selectedPlanData && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Customize Your Meals</h2>

                <Card>
                  <CardHeader>
                    <CardTitle>Meal Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Select Meals
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                          <div
                            key={meal}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={meal}
                              checked={selectedMeals.includes(meal)}
                              onCheckedChange={() => toggleMeal(meal)}
                            />
                            <Label htmlFor={meal}>{meal}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Number of People
                      </Label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setMealCount(Math.max(1, mealCount - 1))
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-xl font-semibold w-12 text-center">
                          {mealCount}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setMealCount(mealCount + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Subscription Duration
                      </Label>
                      <RadioGroup
                        value={selectedDuration}
                        onValueChange={setSelectedDuration}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          {subscriptionDurations.map((duration) => (
                            <div
                              key={duration.id}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={duration.id}
                                id={duration.id}
                              />
                              <Label htmlFor={duration.id} className="flex-1">
                                <div className="flex justify-between">
                                  <span>{duration.name}</span>
                                  {duration.discount > 0 && (
                                    <Badge variant="secondary">
                                      {duration.discount}% off
                                    </Badge>
                                  )}
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Schedule Your Delivery</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Start Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Delivery Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          value={selectedSlot}
                          onValueChange={setSelectedSlot}
                        >
                          {deliverySlots.map((slot) => (
                            <div
                              key={slot.id}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={slot.id} id={slot.id} />
                              <Label htmlFor={slot.id} className="flex-1">
                                <div>
                                  <div className="font-medium">
                                    {slot.label}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {slot.time}
                                  </div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Skip Days (Optional)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          Select dates when you don&apos;t need delivery
                        </p>
                        <Calendar
                          mode="multiple"
                          selected={skipDays}
                          onSelect={(dates) => setSkipDays(dates || [])}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Confirm Your Order</h2>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedPlanData && (
                      <div className="flex items-center gap-4">
                        <Image
                          src={selectedPlanData.image || "https://placehold.co/50x50/svg"}
                          alt={selectedPlanData.name}
                          width={80}
                          height={60}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {selectedPlanData.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedPlanData.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ₹{selectedPlanData.price}/day
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per person
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Selected Meals:</span>
                        <span>{selectedMeals.join(", ") || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of People:</span>
                        <span>{mealCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{selectedDurationData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Start Date:</span>
                        <span>{startDate?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Time:</span>
                        <span>
                          {
                            deliverySlots.find((s) => s.id === selectedSlot)
                              ?.label
                          }
                        </span>
                      </div>
                      {skipDays.length > 0 && (
                        <div className="flex justify-between">
                          <span>Skip Days:</span>
                          <span>{skipDays.length} days</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button size="lg" asChild>
                    <Link href="/sign-up">Proceed to Payment</Link>
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    You&apos;ll need to create an account to complete your order
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={nextStep}
                disabled={
                  currentStep === totalSteps ||
                  (currentStep === 1 && !selectedPlan) ||
                  (currentStep === 2 && selectedMeals.length === 0) ||
                  (currentStep === 3 && (!startDate || !selectedSlot))
                }
                className="flex items-center gap-2"
              >
                {currentStep === totalSteps ? "Complete" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlanData && (
                  <>
                    <div className="flex items-center gap-3">
                      <Image
                        src={selectedPlanData.image || "https://placehold.co/50x50/svg"}
                        alt={selectedPlanData.name}
                        width={60}
                        height={45}
                        className="rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium text-sm">
                          {selectedPlanData.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          ₹{selectedPlanData.price}/day
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span>₹{selectedPlanData.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>People:</span>
                        <span>{mealCount}</span>
                      </div>
                      {selectedDurationData && (
                        <>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{selectedDurationData.days} days</span>
                          </div>
                          {selectedDurationData.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>
                                Discount ({selectedDurationData.discount}%):
                              </span>
                              <span>
                                -₹
                                {Math.round(
                                  (selectedPlanData.price *
                                    selectedDurationData.days *
                                    mealCount *
                                    selectedDurationData.discount) /
                                    100
                                )}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">₹{calculateTotal()}</span>
                    </div>
                  </>
                )}

                {!selectedPlanData && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a plan to see pricing</p>
                  </div>
                )}

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>Free delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>Fresh daily preparation</span>
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

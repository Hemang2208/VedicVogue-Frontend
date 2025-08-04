"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Link from "next/link"
import { Leaf, Dumbbell, Briefcase, Target, Clock, Users, CalendarIcon, Save, ArrowRight } from "lucide-react"

const dietaryPreferences = [
  {
    id: "vegetarian",
    name: "Vegetarian",
    description: "Pure vegetarian meals with authentic flavors",
    icon: Leaf,
    color: "bg-green-100 text-green-800",
    features: ["No meat", "Fresh vegetables", "Traditional recipes", "Jain options available"],
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "High-protein, calorie-smart nutrition",
    icon: Dumbbell,
    color: "bg-orange-100 text-orange-800",
    features: ["High protein", "Calorie counted", "Post-workout friendly", "Lean ingredients"],
  },
  {
    id: "office-light",
    name: "Office Light",
    description: "Light, easily digestible meals for work",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-800",
    features: ["Low oil", "Easy to eat", "No heavy spices", "Quick consumption"],
  },
  {
    id: "diet-special",
    name: "Diet Special",
    description: "Keto, diabetic-friendly, specialized diets",
    icon: Target,
    color: "bg-purple-100 text-purple-800",
    features: ["Keto options", "Diabetic-friendly", "Calorie controlled", "Sugar-free"],
  },
]

const mealTimes = [
  { id: "breakfast", name: "Breakfast", time: "8:00 AM - 10:00 AM", enabled: false },
  { id: "lunch", name: "Lunch", time: "12:00 PM - 2:00 PM", enabled: true },
  { id: "dinner", name: "Dinner", time: "6:00 PM - 8:00 PM", enabled: true },
]

const addOns = [
  { id: "sweets", name: "Traditional Sweets", price: 40, description: "Gulab jamun, rasgulla" },
  { id: "salad", name: "Fresh Salads", price: 30, description: "Seasonal mixed vegetables" },
  { id: "drinks", name: "Detox Drinks", price: 25, description: "Lemon water, green tea" },
  { id: "snacks", name: "Healthy Snacks", price: 45, description: "Nuts, dry fruits" },
]

export default function CustomizePage() {
  const [selectedPreference, setSelectedPreference] = useState("vegetarian")
  const [selectedMealTimes, setSelectedMealTimes] = useState(["lunch", "dinner"])
  const [portionSize, setPortionSize] = useState([2])
  const [spiceLevel, setSpiceLevel] = useState([3])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  // const [deliveryTime, setDeliveryTime] = useState("lunch")

  const toggleMealTime = (mealId: string) => {
    setSelectedMealTimes((prev) => (prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]))
  }

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const calculateTotal = () => {
    const basePrice = 150 * selectedMealTimes.length * portionSize[0]
    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)
    return basePrice + addOnPrice
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Customize Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailor your meal plan to perfectly match your dietary preferences, schedule, and lifestyle.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Customization */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="preferences" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="preferences">Dietary Preferences</TabsTrigger>
                <TabsTrigger value="schedule">Schedule & Timing</TabsTrigger>
                <TabsTrigger value="addons">Add-ons & Extras</TabsTrigger>
              </TabsList>

              {/* Dietary Preferences */}
              <TabsContent value="preferences">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Choose Your Meal Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {dietaryPreferences.map((preference) => (
                          <Card
                            key={preference.id}
                            className={`cursor-pointer transition-all hover:shadow-lg ${
                              selectedPreference === preference.id ? "ring-2 ring-primary" : ""
                            }`}
                            onClick={() => setSelectedPreference(preference.id)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${preference.color}`}>
                                  <preference.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-2">{preference.name}</h3>
                                  <p className="text-muted-foreground text-sm mb-3">{preference.description}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {preference.features.map((feature, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Meal Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="text-base font-medium mb-4 block">Portion Size (Number of People)</Label>
                        <div className="space-y-4">
                          <Slider
                            value={portionSize}
                            onValueChange={setPortionSize}
                            max={6}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>1 person</span>
                            <span className="font-medium">
                              {portionSize[0]} {portionSize[0] === 1 ? "person" : "people"}
                            </span>
                            <span>6 people</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-4 block">Spice Level</Label>
                        <div className="space-y-4">
                          <Slider
                            value={spiceLevel}
                            onValueChange={setSpiceLevel}
                            max={5}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Mild</span>
                            <span className="font-medium">
                              {["Very Mild", "Mild", "Medium", "Spicy", "Very Spicy"][spiceLevel[0] - 1]}
                            </span>
                            <span>Very Spicy</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Schedule & Timing */}
              <TabsContent value="schedule">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Meal Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mealTimes.map((meal) => (
                          <div key={meal.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{meal.name}</h4>
                              <p className="text-sm text-muted-foreground">{meal.time}</p>
                            </div>
                            <Switch
                              checked={selectedMealTimes.includes(meal.id)}
                              onCheckedChange={() => toggleMealTime(meal.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Delivery Calendar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Select specific dates when you want meal delivery (optional)
                        </p>
                        <Calendar
                          mode="multiple"
                          selected={selectedDates}
                          onSelect={(dates) => setSelectedDates(dates || [])}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                        {selectedDates.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Selected Dates:</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedDates.map((date, index) => (
                                <Badge key={index} variant="outline">
                                  {date.toLocaleDateString()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Add-ons & Extras */}
              <TabsContent value="addons">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add-ons & Extras</CardTitle>
                      <p className="text-muted-foreground">Enhance your meal experience with our premium add-ons</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {addOns.map((addOn) => (
                          <Card
                            key={addOn.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedAddOns.includes(addOn.id) ? "ring-2 ring-primary bg-primary/5" : ""
                            }`}
                            onClick={() => toggleAddOn(addOn.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{addOn.name}</h4>
                                <Badge variant="secondary">₹{addOn.price}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{addOn.description}</p>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={selectedAddOns.includes(addOn.id)}
                                  onCheckedChange={() => toggleAddOn(addOn.id)}
                                />
                                <Label className="text-sm">Add to my plan</Label>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Plan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Dietary Preference</h4>
                    <Badge className={dietaryPreferences.find((p) => p.id === selectedPreference)?.color}>
                      {dietaryPreferences.find((p) => p.id === selectedPreference)?.name}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Meal Times</h4>
                    <div className="space-y-1">
                      {selectedMealTimes.map((mealId) => {
                        const meal = mealTimes.find((m) => m.id === mealId)
                        return (
                          <div key={mealId} className="text-sm text-muted-foreground">
                            {meal?.name} ({meal?.time})
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Portion Size</h4>
                    <p className="text-sm text-muted-foreground">
                      {portionSize[0]} {portionSize[0] === 1 ? "person" : "people"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Spice Level</h4>
                    <p className="text-sm text-muted-foreground">
                      {["Very Mild", "Mild", "Medium", "Spicy", "Very Spicy"][spiceLevel[0] - 1]}
                    </p>
                  </div>

                  {selectedAddOns.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Add-ons</h4>
                      <div className="space-y-1">
                        {selectedAddOns.map((addOnId) => {
                          const addOn = addOns.find((a) => a.id === addOnId)
                          return (
                            <div key={addOnId} className="flex justify-between text-sm">
                              <span>{addOn?.name}</span>
                              <span>₹{addOn?.price}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {selectedDates.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Selected Dates</h4>
                      <p className="text-sm text-muted-foreground">{selectedDates.length} dates selected</p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Estimated Daily Cost:</span>
                    <span className="text-xl font-bold text-primary">₹{calculateTotal()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    *Final pricing may vary based on subscription plan and duration
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/book">
                      Continue to Booking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span>Preferences saved to your account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Can be modified anytime</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Presets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Presets</CardTitle>
              <p className="text-muted-foreground">Popular combinations to get you started quickly</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    name: "Office Worker",
                    description: "Light lunch + dinner, mild spice",
                    meals: ["lunch", "dinner"],
                    preference: "office-light",
                    spice: 2,
                  },
                  {
                    name: "Fitness Enthusiast",
                    description: "High protein, all meals",
                    meals: ["breakfast", "lunch", "dinner"],
                    preference: "fitness",
                    spice: 3,
                  },
                  {
                    name: "Traditional Vegetarian",
                    description: "Classic veg meals, medium spice",
                    meals: ["lunch", "dinner"],
                    preference: "vegetarian",
                    spice: 3,
                  },
                ].map((preset, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{preset.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{preset.description}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedPreference(preset.preference)
                          setSelectedMealTimes(preset.meals)
                          setSpiceLevel([preset.spice])
                        }}
                      >
                        Apply Preset
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Leaf,
  Dumbbell,
  Briefcase,
  Target,
} from "lucide-react";

const dietaryOptions = [
  {
    id: "vegetarian",
    name: "Vegetarian",
    icon: Leaf,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: Dumbbell,
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "office-light",
    name: "Office Light",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "diet-special",
    name: "Diet Special",
    icon: Target,
    color: "bg-purple-100 text-purple-800",
  },
];

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    dietaryType: "vegetarian",
    spiceLevel: [3],
    portionSize: [2],
    allergies: "None",
    specialInstructions: "Please avoid onions and garlic",
    notifications: {
      orderUpdates: true,
      promotions: false,
      mealReminders: true,
      weeklyMenu: true,
    },
  });

  const handleSave = () => {
    console.log("Saving preferences:", preferences);
    // In a real app, save to backend
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <VVButton variant="ghost" size="icon" asChild>
                <Link href="/user/profile">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold">Meal Preferences</h1>
                <p className="text-muted-foreground">
                  Customize your meal experience
                </p>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="dietary" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dietary">Dietary Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Dietary Preferences */}
            <TabsContent value="dietary">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Meal Type Preference</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {dietaryOptions.map((option) => (
                        <VVCard
                          key={option.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            preferences.dietaryType === option.id
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                          onClick={() =>
                            setPreferences((prev) => ({
                              ...prev,
                              dietaryType: option.id,
                            }))
                          }
                        >
                          <VVCardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${option.color}`}>
                                <option.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">{option.name}</h4>
                                {preferences.dietaryType === option.id && (
                                  <VVBadge variant="default" className="mt-1">
                                    Selected
                                  </VVBadge>
                                )}
                              </div>
                            </div>
                          </VVCardContent>
                        </VVCard>
                      ))}
                    </div>
                  </VVCardContent>
                </VVCard>

                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Meal Customization</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Spice Level:{" "}
                        {
                          [
                            "Very Mild",
                            "Mild",
                            "Medium",
                            "Spicy",
                            "Very Spicy",
                          ][preferences.spiceLevel[0] - 1]
                        }
                      </Label>
                      <Slider
                        value={preferences.spiceLevel}
                        onValueChange={(value) =>
                          setPreferences((prev) => ({
                            ...prev,
                            spiceLevel: value,
                          }))
                        }
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>Very Mild</span>
                        <span>Very Spicy</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Portion Size: {preferences.portionSize[0]}{" "}
                        {preferences.portionSize[0] === 1 ? "person" : "people"}
                      </Label>
                      <Slider
                        value={preferences.portionSize}
                        onValueChange={(value) =>
                          setPreferences((prev) => ({
                            ...prev,
                            portionSize: value,
                          }))
                        }
                        max={6}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>1 person</span>
                        <span>6 people</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="allergies">
                          Allergies & Food Restrictions
                        </Label>
                        <Select
                          value={preferences.allergies}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              allergies: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Nuts">Nuts</SelectItem>
                            <SelectItem value="Dairy">Dairy</SelectItem>
                            <SelectItem value="Gluten">Gluten</SelectItem>
                            <SelectItem value="Multiple">
                              Multiple Allergies
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialInstructions">
                          Special Instructions
                        </Label>
                        <Textarea
                          id="specialInstructions"
                          value={preferences.specialInstructions}
                          onChange={(e) =>
                            setPreferences((prev) => ({
                              ...prev,
                              specialInstructions: e.target.value,
                            }))
                          }
                          placeholder="Any special cooking instructions..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Notification Preferences</VVCardTitle>
                    <p className="text-muted-foreground">
                      Choose what notifications you&apos;d like to receive
                    </p>
                  </VVCardHeader>
                  <VVCardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Order Updates</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified about order status, delivery updates
                          </p>
                        </div>
                        <Switch
                          checked={preferences.notifications.orderUpdates}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("orderUpdates", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Meal Reminders</h4>
                          <p className="text-sm text-muted-foreground">
                            Reminders about upcoming meal deliveries
                          </p>
                        </div>
                        <Switch
                          checked={preferences.notifications.mealReminders}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("mealReminders", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Weekly Menu</h4>
                          <p className="text-sm text-muted-foreground">
                            Get weekly menu updates and new dish announcements
                          </p>
                        </div>
                        <Switch
                          checked={preferences.notifications.weeklyMenu}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("weeklyMenu", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Promotions & Offers</h4>
                          <p className="text-sm text-muted-foreground">
                            Special offers, discounts, and promotional content
                          </p>
                        </div>
                        <Switch
                          checked={preferences.notifications.promotions}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("promotions", checked)
                          }
                        />
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <VVButton onClick={handleSave} size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </VVButton>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

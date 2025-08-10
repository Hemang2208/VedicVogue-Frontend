"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { toast } from "react-hot-toast";

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
  const { preferences, loading, updatePreferences } = useUserPreferences();

  const [localPreferences, setLocalPreferences] = useState({
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

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isToastShowing, setIsToastShowing] = useState(false);

  // Update local state when preferences are loaded from backend
  useEffect(() => {
    if (preferences) {
      setLocalPreferences({
        dietaryType: preferences.meals?.type || "vegetarian",
        spiceLevel: [getSpiceLevelNumber(preferences.meals?.spice) || 3],
        portionSize: [2], // This might need to be derived from another field
        allergies: preferences.meals?.restrictions || "None",
        specialInstructions: preferences.meals?.message || "",
        notifications: {
          orderUpdates: preferences.notifications?.order,
          promotions: preferences.notifications?.promotions,
          mealReminders: preferences.notifications?.reminders,
          weeklyMenu: preferences.notifications?.menu,
        },
      });
      setHasUnsavedChanges(false);
    }
  }, [preferences]);

  // Helper function to convert spice level string to number
  const getSpiceLevelNumber = (spiceLevel?: string): number => {
    switch (spiceLevel) {
      case "very-mild":
        return 1;
      case "mild":
        return 2;
      case "medium":
        return 3;
      case "spicy":
        return 4;
      case "very-spicy":
        return 5;
      default:
        return 3;
    }
  };

  // Helper function to convert spice level number to string
  const getSpiceLevelString = (spiceLevel: number): string => {
    switch (spiceLevel) {
      case 1:
        return "very-mild";
      case 2:
        return "mild";
      case 3:
        return "medium";
      case 4:
        return "spicy";
      case 5:
        return "very-spicy";
      default:
        return "medium";
    }
  };

  // Helper function to manage toast notifications
  const showToast = (message: string, type: "success" | "error") => {
    // Prevent multiple toasts from being shown
    if (isToastShowing) return;

    setIsToastShowing(true);

    // Dismiss all existing toasts immediately
    toast.dismiss();

    // Show new toast directly
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }

    // Reset the toast showing state after the toast duration
    setTimeout(() => {
      setIsToastShowing(false);
    }, 4500); // Slightly longer than toast duration to ensure cleanup
  };

  const handleSave = async () => {
    // Prevent multiple save operations
    if (isSaving) return;

    setIsSaving(true);
    try {
      // Update preferences in backend (both meal and notification preferences)
      await updatePreferences({
        meals: {
          type: localPreferences.dietaryType,
          spice: getSpiceLevelString(localPreferences.spiceLevel[0]),
          restrictions: localPreferences.allergies,
          message: localPreferences.specialInstructions,
        },
        notifications: {
          order: localPreferences.notifications.orderUpdates,
          reminders: localPreferences.notifications.mealReminders,
          menu: localPreferences.notifications.weeklyMenu,
          promotions: localPreferences.notifications.promotions,
        },
        paymentMethod: preferences?.paymentMethod || [],
      });

      setHasUnsavedChanges(false);
      showToast("All preferences saved successfully!", "success");
    } catch (error) {
      console.error("Error saving preferences:", error);
      showToast("Failed to save preferences", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    // Update local state immediately for responsive UI
    setLocalPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));

    // Mark as having unsaved changes
    setHasUnsavedChanges(true);
  };

  const handlePreferenceChange = (
    field: string,
    value: string | number[] | string[]
  ) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
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

          {/* Loading State */}
          {loading && !preferences ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-12"
            >
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2 text-lg">Loading your preferences...</span>
            </motion.div>
          ) : (
            <>
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
                                localPreferences.dietaryType === option.id
                                  ? "ring-2 ring-primary"
                                  : ""
                              }`}
                              onClick={() =>
                                handlePreferenceChange("dietaryType", option.id)
                              }
                            >
                              <VVCardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`p-2 rounded-lg ${option.color}`}
                                  >
                                    <option.icon className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">
                                      {option.name}
                                    </h4>
                                    {localPreferences.dietaryType ===
                                      option.id && (
                                      <VVBadge
                                        variant="default"
                                        className="mt-1"
                                      >
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
                              ][localPreferences.spiceLevel[0] - 1]
                            }
                          </Label>
                          <Slider
                            value={localPreferences.spiceLevel}
                            onValueChange={(value) =>
                              handlePreferenceChange("spiceLevel", value)
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

                        {/* <div>
                      <Label className="text-base font-medium mb-4 block">
                        Portion Size: {localPreferences.portionSize[0]}{" "}
                        {localPreferences.portionSize[0] === 1 ? "person" : "people"}
                      </Label>
                      <Slider
                        value={localPreferences.portionSize}
                        onValueChange={(value) =>
                          setLocalPreferences((prev) => ({
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
                    </div> */}

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="allergies">
                              Allergies & Food Restrictions
                            </Label>
                            <Select
                              value={localPreferences.allergies}
                              onValueChange={(value) =>
                                handlePreferenceChange("allergies", value)
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
                              value={localPreferences.specialInstructions}
                              onChange={(e) =>
                                handlePreferenceChange(
                                  "specialInstructions",
                                  e.target.value
                                )
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
                                Get notified about order status, delivery
                                updates
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={
                                  localPreferences.notifications.orderUpdates
                                }
                                onCheckedChange={(checked) =>
                                  handleNotificationChange(
                                    "orderUpdates",
                                    checked
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Meal Reminders</h4>
                              <p className="text-sm text-muted-foreground">
                                Reminders about upcoming meal deliveries
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={
                                  localPreferences.notifications.mealReminders
                                }
                                onCheckedChange={(checked) =>
                                  handleNotificationChange(
                                    "mealReminders",
                                    checked
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Weekly Menu</h4>
                              <p className="text-sm text-muted-foreground">
                                Get weekly menu updates and new dish
                                announcements
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={
                                  localPreferences.notifications.weeklyMenu
                                }
                                onCheckedChange={(checked) =>
                                  handleNotificationChange(
                                    "weeklyMenu",
                                    checked
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                Promotions & Offers
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Special offers, discounts, and promotional
                                content
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={
                                  localPreferences.notifications.promotions
                                }
                                onCheckedChange={(checked) =>
                                  handleNotificationChange(
                                    "promotions",
                                    checked
                                  )
                                }
                              />
                            </div>
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
                <VVButton
                  className="cursor-pointer"
                  onClick={handleSave}
                  size="lg"
                  disabled={loading || isSaving || !hasUnsavedChanges}
                  variant={hasUnsavedChanges ? "default" : "secondary"}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {hasUnsavedChanges ? "Save Changes" : "All Saved"}
                    </>
                  )}
                </VVButton>
                {hasUnsavedChanges && (
                  <p className="text-sm text-muted-foreground mt-2">
                    You have unsaved changes. Click &quot;Save Changes&quot; to
                    apply them.
                  </p>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

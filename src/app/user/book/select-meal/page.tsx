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
import { VVStepper } from "@/components/ui/vv-stepper";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  Users,
  Leaf,
  Dumbbell,
  Briefcase,
  Target,
} from "lucide-react";

const bookingSteps = [
  {
    id: "meal",
    title: "Select Meal",
    description: "Choose your preferred meal type",
  },
  { id: "date", title: "Select Date", description: "Pick delivery schedule" },
  { id: "addons", title: "Add-ons", description: "Enhance your meal" },
  { id: "review", title: "Review", description: "Confirm your order" },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "Order placed successfully",
  },
];

const mealCategories = [
  {
    id: "vegetarian",
    name: "Vegetarian",
    icon: Leaf,
    color: "bg-green-100 text-green-800",
    description: "Pure vegetarian meals with authentic flavors",
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: Dumbbell,
    color: "bg-orange-100 text-orange-800",
    description: "High-protein, calorie-smart nutrition",
  },
  {
    id: "office-light",
    name: "Office Light",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-800",
    description: "Light, easily digestible meals for work",
  },
  {
    id: "diet-special",
    name: "Diet Special",
    icon: Target,
    color: "bg-purple-100 text-purple-800",
    description: "Keto, diabetic-friendly, specialized diets",
  },
];

const meals = [
  {
    id: "classic-thali",
    name: "Classic Veg Thali",
    category: "vegetarian",
    description:
      "Traditional Indian thali with dal, sabzi, rice, roti, pickle, and papad",
    price: 120,
    originalPrice: 150,
    rating: 4.8,
    reviews: 234,
    prepTime: "30 mins",
    serves: "1 person",
    image: "https://placehold.co/300x200/svg",
    popular: true,
    tags: ["Traditional", "Complete Meal", "Vegetarian"],
  },
  {
    id: "fitness-bowl",
    name: "Protein Power Bowl",
    category: "fitness",
    description:
      "High-protein quinoa bowl with grilled paneer, vegetables, and nuts",
    price: 150,
    originalPrice: 180,
    rating: 4.7,
    reviews: 189,
    prepTime: "25 mins",
    serves: "1 person",
    image: "https://placehold.co/300x200/svg",
    popular: false,
    tags: ["High Protein", "Quinoa", "Healthy"],
  },
  {
    id: "office-light",
    name: "Office Light Meal",
    category: "office-light",
    description: "Light curry with rice, easy to eat during work hours",
    price: 100,
    originalPrice: 120,
    rating: 4.5,
    reviews: 156,
    prepTime: "20 mins",
    serves: "1 person",
    image: "https://placehold.co/300x200/svg",
    popular: false,
    tags: ["Light", "Quick", "Office Friendly"],
  },
  {
    id: "keto-special",
    name: "Keto Diet Bowl",
    category: "diet-special",
    description: "Low-carb, high-fat meal with cauliflower rice and vegetables",
    price: 140,
    originalPrice: 170,
    rating: 4.6,
    reviews: 98,
    prepTime: "35 mins",
    serves: "1 person",
    image: "https://placehold.co/300x200/svg",
    popular: false,
    tags: ["Keto", "Low Carb", "Diet"],
  },
  {
    id: "south-indian",
    name: "South Indian Delight",
    category: "vegetarian",
    description: "Sambar rice with rasam, vegetables, and coconut chutney",
    price: 130,
    originalPrice: 160,
    rating: 4.9,
    reviews: 267,
    prepTime: "25 mins",
    serves: "1 person",
    image: "https://placehold.co/300x200/svg",
    popular: true,
    tags: ["South Indian", "Traditional", "Spicy"],
  },
  {
    id: "gym-special",
    name: "Post-Workout Special",
    category: "fitness",
    description:
      "High-protein meal with lean ingredients for post-workout recovery",
    price: 160,
    originalPrice: 190,
    rating: 4.8,
    reviews: 145,
    prepTime: "30 mins",
    serves: "1 person",
    image: "https://placehold.co/300x200/svg",
    popular: false,
    tags: ["Post Workout", "High Protein", "Recovery"],
  },
];

export default function SelectMealPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const filteredMeals = selectedCategory
    ? meals.filter((meal) => meal.category === selectedCategory)
    : meals;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <VVButton variant="ghost" size="icon" asChild>
              <Link href="/book">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </VVButton>
            <div>
              <h1 className="text-3xl font-bold">Select Your Meal</h1>
              <p className="text-muted-foreground">
                Choose from our variety of authentic Indian meals
              </p>
            </div>
          </div>

          {/* Stepper */}
          <VVStepper steps={bookingSteps} currentStep={0} />
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <VVCard className="sticky top-24">
              <VVCardHeader>
                <VVCardTitle>Meal Categories</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="space-y-2">
                <VVButton
                  variant={selectedCategory === null ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Meals
                </VVButton>
                {mealCategories.map((category) => (
                  <VVButton
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </VVButton>
                ))}
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Meals Grid */}
          <div className="lg:col-span-3">
            {/* Category Description */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <VVCard>
                  <VVCardContent className="p-4">
                    {(() => {
                      const category = mealCategories.find(
                        (cat) => cat.id === selectedCategory
                      );
                      if (!category) return null;
                      return (
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            <category.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </VVCardContent>
                </VVCard>
              </motion.div>
            )}

            {/* Meals Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMeals.map((meal, index) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VVCard
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedMeal === meal.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedMeal(meal.id)}
                  >
                    <div className="relative">
                      <Image
                        src={meal.image || "https://placehold.co/50x50/svg"}
                        alt={meal.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {meal.popular && (
                        <VVBadge className="absolute top-2 left-2 bg-orange-500">
                          Popular
                        </VVBadge>
                      )}
                      <VVBadge
                        variant="secondary"
                        className="absolute top-2 right-2"
                      >
                        {Math.round(
                          ((meal.originalPrice - meal.price) /
                            meal.originalPrice) *
                            100
                        )}
                        % off
                      </VVBadge>
                    </div>

                    <VVCardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">{meal.name}</h3>
                          <p className="text-muted-foreground text-sm">
                            {meal.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{meal.rating}</span>
                            <span>({meal.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{meal.prepTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{meal.serves}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {meal.tags.map((tag, i) => (
                            <VVBadge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </VVBadge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">
                              ₹{meal.price}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{meal.originalPrice}
                            </span>
                          </div>
                          {selectedMeal === meal.id && (
                            <VVBadge variant="default" className="bg-green-500">
                              Selected
                            </VVBadge>
                          )}
                        </div>
                      </div>
                    </VVCardContent>
                  </VVCard>
                </motion.div>
              ))}
            </div>

            {/* Continue Button */}
            {selectedMeal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <VVButton size="lg" asChild>
                  <Link href="/user/book/select-date">
                    Continue to Date Selection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </VVButton>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

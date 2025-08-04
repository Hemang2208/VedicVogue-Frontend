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
  Plus,
  Minus,
  ShoppingCart,
  Star,
  Clock,
  Users,
  Leaf,
  Dumbbell,
  Briefcase,
  Target,
} from "lucide-react";

type BookingStep = {
  id: string;
  title: string;
  description: string;
};

type MealCategory = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
};

type Meal = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  prepTime: string;
  serves: string;
  image: string;
  popular: boolean;
  tags: string[];
};

type AddOnCategory = {
  id: string;
  name: string;
  items: AddOnItem[];
};

type AddOnItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular: boolean;
};

const bookingSteps: BookingStep[] = [
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

const mealCategories: MealCategory[] = [
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

const meals: Meal[] = [
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
];

const addOnCategories: AddOnCategory[] = [
  {
    id: "sweets",
    name: "Traditional Sweets",
    items: [
      {
        id: "gulab-jamun",
        name: "Gulab Jamun",
        description: "Soft, syrupy milk dumplings",
        price: 40,
        image: "https://placehold.co/150x150/svg",
        popular: true,
      },
      {
        id: "rasgulla",
        name: "Rasgulla",
        description: "Spongy cottage cheese balls",
        price: 35,
        image: "https://placehold.co/150x150/svg",
        popular: false,
      },
    ],
  },
  {
    id: "drinks",
    name: "Healthy Beverages",
    items: [
      {
        id: "lassi",
        name: "Sweet Lassi",
        description: "Traditional yogurt drink",
        price: 30,
        image: "https://placehold.co/150x150/svg",
        popular: true,
      },
      {
        id: "buttermilk",
        name: "Spiced Buttermilk",
        description: "Digestive drink with spices",
        price: 25,
        image: "https://placehold.co/150x150/svg",
        popular: false,
      },
    ],
  },
];

type BookingStepType = "meal" | "date" | "addons" | "review" | "confirmation";

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStepType>("meal");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>(
    {}
  );

  const filteredMeals = selectedCategory
    ? meals.filter((meal) => meal.category === selectedCategory)
    : meals;

  const addToCart = (itemId: string) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setSelectedAddOns((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(selectedAddOns).reduce(
      (total, [itemId, quantity]) => {
        const item = addOnCategories
          .flatMap((cat) => cat.items)
          .find((item) => item.id === itemId);
        return total + (item?.price || 0) * quantity;
      },
      0
    );
  };

  const getTotalItems = () => {
    return Object.values(selectedAddOns).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  const renderMealSelectionStep = () => (
    <>
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
              <VVButton size="lg" onClick={() => setCurrentStep("addons")}>
                Continue to Add-ons
                <ArrowRight className="ml-2 h-4 w-4" />
              </VVButton>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );

  const renderAddOnsStep = () => (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Add-ons */}
      <div className="lg:col-span-3">
        <div className="space-y-8">
          {addOnCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle>{category.name}</VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: categoryIndex * 0.1 + itemIndex * 0.05,
                        }}
                      >
                        <VVCard className="hover:shadow-md transition-all">
                          <VVCardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Image
                                  src={
                                    item.image ||
                                    "https://placehold.co/50x50/svg"
                                  }
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="rounded-lg"
                                />
                                {item.popular && (
                                  <VVBadge className="absolute -top-2 -right-2 bg-orange-500 text-xs">
                                    Popular
                                  </VVBadge>
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.description}
                                </p>
                                <p className="text-lg font-bold text-primary">
                                  ₹{item.price}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {selectedAddOns[item.id] ? (
                                  <div className="flex items-center gap-2">
                                    <VVButton
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </VVButton>
                                    <span className="font-medium min-w-8 text-center">
                                      {selectedAddOns[item.id]}
                                    </span>
                                    <VVButton
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => addToCart(item.id)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </VVButton>
                                  </div>
                                ) : (
                                  <VVButton
                                    size="sm"
                                    onClick={() => addToCart(item.id)}
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add
                                  </VVButton>
                                )}
                              </div>
                            </div>
                          </VVCardContent>
                        </VVCard>
                      </motion.div>
                    ))}
                  </div>
                </VVCardContent>
              </VVCard>
            </motion.div>
          ))}
        </div>

        {/* Skip Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <VVButton variant="outline" size="lg" asChild>
            <Link href="/user/book/review">
              Skip Add-ons & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </VVButton>
        </motion.div>
      </div>

      {/* Cart Summary */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <VVCard className="sticky top-24">
          <VVCardHeader>
            <VVCardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add-ons Cart ({getTotalItems()})
            </VVCardTitle>
          </VVCardHeader>
          <VVCardContent>
            {Object.keys(selectedAddOns).length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No add-ons selected</p>
                <p className="text-sm text-muted-foreground">
                  Add some extras to enhance your meal!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(selectedAddOns).map(([itemId, quantity]) => {
                  const item = addOnCategories
                    .flatMap((cat) => cat.items)
                    .find((item) => item.id === itemId);
                  if (!item) return null;

                  return (
                    <div
                      key={itemId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ₹{item.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">×{quantity}</span>
                        <span className="font-semibold">
                          ₹{item.price * quantity}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total Add-ons:</span>
                    <span className="text-primary">₹{getTotalPrice()}</span>
                  </div>
                </div>

                <VVButton className="w-full" size="lg" asChild>
                  <Link href="/user/book/review">
                    Continue to Review
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </VVButton>
              </div>
            )}
          </VVCardContent>
        </VVCard>
      </motion.div>
    </div>
  );

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
              <Link
                href={
                  currentStep === "meal"
                    ? "/user/book"
                    : "/user/book/select-date"
                }
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </VVButton>
            <div>
              <h1 className="text-3xl font-bold">
                {currentStep === "meal"
                  ? "Select Your Meal"
                  : "Add-ons & Extras"}
              </h1>
              <p className="text-muted-foreground">
                {currentStep === "meal"
                  ? "Choose from our variety of authentic Indian meals"
                  : "Enhance your meal with our delicious add-ons"}
              </p>
            </div>
          </div>

          {/* Stepper */}
          <VVStepper
            steps={bookingSteps}
            currentStep={currentStep === "meal" ? 0 : 2}
          />
        </motion.div>

        {currentStep === "meal"
          ? renderMealSelectionStep()
          : renderAddOnsStep()}
      </div>

      <Footer />
    </div>
  );
}

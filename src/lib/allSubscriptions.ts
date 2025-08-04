export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  badge: string;
  badgeColor: string;
  popular: boolean;
  features: string[];
  savings: string;
  bestFor: string;
}

export interface MealType {
  id: string;
  name: string;
  description: string;
  icon: string;
  plans: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "daily-flexi",
    name: "Daily Flexi",
    description: "Perfect for trying out our service",
    price: 150,
    originalPrice: 180,
    duration: "per meal",
    badge: "Flexible",
    badgeColor: "bg-blue-500",
    popular: false,
    features: [
      "Order on-demand",
      "No commitment",
      "Same day delivery",
      "Cancel anytime",
      "All meal types available",
    ],
    savings: "0%",
    bestFor: "First-time users, occasional orders",
  },
  {
    id: "weekly-basic",
    name: "Weekly Basic",
    description: "Great for office-goers",
    price: 135,
    originalPrice: 150,
    duration: "per meal",
    badge: "Popular",
    badgeColor: "bg-green-500",
    popular: true,
    features: [
      "5-7 meals per week",
      "10% discount",
      "Skip weekends option",
      "Consistent schedule",
      "Priority support",
    ],
    savings: "10%",
    bestFor: "Working professionals, students",
  },
  {
    id: "weekly-pro",
    name: "Weekly Pro",
    description: "Complete nutrition solution",
    price: 128,
    originalPrice: 150,
    duration: "per meal",
    badge: "Complete",
    badgeColor: "bg-purple-500",
    popular: false,
    features: [
      "12-14 meals per week",
      "15% discount",
      "Breakfast + Lunch + Dinner",
      "Customizable menu",
      "Free add-ons",
    ],
    savings: "15%",
    bestFor: "Busy professionals, families",
  },
  {
    id: "monthly-premium",
    name: "Monthly Premium",
    description: "Best value for regular users",
    price: 112,
    originalPrice: 150,
    duration: "per meal",
    badge: "Best Value",
    badgeColor: "bg-orange-500",
    popular: false,
    features: [
      "60+ meals per month",
      "25% discount",
      "All meal types included",
      "Premium ingredients",
      "Dedicated support",
      "Free delivery",
    ],
    savings: "25%",
    bestFor: "Regular subscribers, health enthusiasts",
  },
];

export const mealTypes: MealType[] = [
  {
    id: "vegetarian",
    name: "Vegetarian",
    description: "Pure vegetarian meals with authentic flavors",
    icon: "🥬",
    plans: ["daily-flexi", "weekly-basic", "weekly-pro", "monthly-premium"],
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "High-protein, calorie-smart nutrition",
    icon: "💪",
    plans: ["daily-flexi", "weekly-pro", "monthly-premium"],
  },
  {
    id: "office-light",
    name: "Office Light",
    description: "Light, easily digestible meals for work",
    icon: "💼",
    plans: ["daily-flexi", "weekly-basic", "weekly-pro"],
  },
  {
    id: "diet-special",
    name: "Diet Special",
    description: "Keto, diabetic-friendly, specialized diets",
    icon: "🎯",
    plans: ["weekly-pro", "monthly-premium"],
  },
];

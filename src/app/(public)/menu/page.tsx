"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

// Import menu service
import MenuService, { MenuItem } from "@/services/menu.service";
import {
  Search,
  Heart,
  Clock,
  Flame,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Filter,
  Info,
  Leaf,
  Zap,
  Shield,
  Award,
  TrendingUp,
  ChefHat,
  Package,
  Calendar,
} from "lucide-react";

const menuCategories = [
  {
    id: "all",
    name: "All Items",
    count: 0,
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "veg",
    name: "Vegetarian",
    count: 0,
    icon: <Leaf className="h-4 w-4" />,
  },
  {
    id: "fitness",
    name: "Fitness",
    count: 0,
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "office",
    name: "Office Light",
    count: 0,
    icon: <ChefHat className="h-4 w-4" />,
  },
  {
    id: "diet",
    name: "Diet Special",
    count: 0,
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "addons",
    name: "Add-ons",
    count: 0,
    icon: <Plus className="h-4 w-4" />,
  },
];

interface CartItem {
  id: string;
  quantity: number;
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // API state
  const [meals, setMeals] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState(menuCategories);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage] = useState(1);

  // Fetch menu items from API
  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {
        category: selectedCategory === "all" ? undefined : selectedCategory,
        search: debouncedQuery || undefined,
        sortBy: sortBy as "popular" | "rating" | "price-low" | "price-high" | "calories" | "nutrition" | "name" | "newest",
        page: currentPage,
        limit: 12,
        isAvailable: true,
      };

      const response = await MenuService.getMenuItems(filters);
      
      console.log('Menu items response:', response);
      
      // Ensure response has the expected structure
      if (response && response.items && Array.isArray(response.items)) {
        console.log('Setting meals:', response.items);
        setMeals(response.items);
        setTotalItems(response.total || 0);
      } else {
        console.warn('Invalid response structure:', response);
        setMeals([]);
        setTotalItems(0);
        setError("Invalid data format received from server");
      }
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setMeals([]);
      setTotalItems(0);
      setError(err instanceof Error ? err.message : "Failed to fetch menu items");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedQuery, sortBy, currentPage]);

  // Fetch categories with counts
  const fetchCategories = async () => {
    try {
      const apiCategories = await MenuService.getMenuCategories();
      
      // Ensure apiCategories is an array
      if (!Array.isArray(apiCategories)) {
        console.warn('Invalid categories response:', apiCategories);
        return;
      }
      
      const updatedCategories = menuCategories.map((category) => {
        if (category.id === "all") {
          return {
            ...category,
            count: apiCategories.reduce((sum, cat) => sum + (cat.count || 0), 0),
          };
        }
        
        const apiCategory = apiCategories.find(cat => cat.category === category.id);
        return {
          ...category,
          count: apiCategory ? apiCategory.count || 0 : 0,
        };
      });

      setCategories(updatedCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Keep using default categories if API fails
    }
  };

  // Debounce search query
  useEffect(() => {
    if (searchQuery.length < 3 && searchQuery.length > 0) return;

    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch data when filters change
  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleFavorite = (mealId: string) => {
    setFavorites((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const addToCart = (mealId: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === mealId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === mealId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: mealId, quantity: 1 }];
    });
  };

  const removeFromCart = (mealId: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === mealId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) =>
          item.id === mealId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== mealId);
    });
  };

  const getCartItemQuantity = (mealId: string) => {
    return cart.find((item) => item.id === mealId)?.quantity || 0;
  };

  const getSpiceIndicator = (level: number) => {
    return "🌶️".repeat(level) + "⚪".repeat(3 - level);
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const currentCategory = categories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="relative py-12 sm:py-20 lg:py-32 md:py-26 hero-pattern overflow-hidden">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 sm:space-y-8"
              >
                <Badge
                  variant="secondary"
                  className="w-fit mx-auto text-xs sm:text-sm text-orange-600"
                >
                  🍽️ Fresh • Authentic • Nutritious
                </Badge>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                  Our Delicious
                  <span className="text-orange-600 block">Menu</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Discover our wide variety of fresh, authentic, and nutritious
                  meals crafted with love and traditional recipes
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Award className="h-5 w-5 mr-2" />
                    Premium Quality
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-200 hover:bg-orange-50 text-orange-600"
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Healthy Choices
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container py-8">
          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                  <Input
                    placeholder="Search meals, ingredients, or dietary preferences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full lg:w-48 h-12 border-orange-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="calories">Lowest Calories</SelectItem>
                      <SelectItem value="nutrition">Best Nutrition</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Navigation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto p-1 bg-orange-50">
                  {menuCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex flex-col items-center gap-2 p-4 text-sm font-medium data-[state=active]:text-orange-600 data-[state=active]:bg-white"
                    >
                      <div className="flex items-center gap-1">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs text-orange-600 bg-orange-50"
                      >
                        {category.count}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Special Add-ons Navigation */}
            {selectedCategory === "addons" && (
              <div className="bg-primary/10 rounded-2xl p-6 border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-primary">
                      Explore All Add-ons
                    </h3>
                    <p className="text-muted-foreground">
                      Complete your meal with our premium add-ons collection
                    </p>
                  </div>
                  <Button size="lg" asChild>
                    <Link href="/menu/addons">
                      <Package className="h-5 w-5 mr-2" />
                      View All Add-ons
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-semibold text-primary">
                  {loading ? "Loading..." : totalItems}
                </span>
                <span>items found</span>
                {currentCategory && (
                  <>
                    <span>in</span>
                    <Badge variant="outline">{currentCategory.name}</Badge>
                  </>
                )}
              </div>
              {getTotalCartItems() > 0 && (
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getTotalCartItems()})
                </Button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Loading delicious meals...
              </h3>
              <p className="text-gray-600">Please wait while we fetch the menu</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-2xl font-bold mb-2 text-red-600">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button
                onClick={fetchMenuItems}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Meals Grid */}
          {!loading && !error && meals && Array.isArray(meals) && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {meals.map((meal: MenuItem) => {
                const cartQuantity = getCartItemQuantity(meal.id);
                const savings = meal.originalPrice ? meal.originalPrice - meal.price : 0;
                const discountPercentage = meal.originalPrice ? Math.round(
                  (savings / meal.originalPrice) * 100
                ) : 0;

                return (
                  <Card
                    key={meal.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={meal.image}
                        alt={meal.name}
                        width={400}
                        height={300}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {meal.tags && Array.isArray(meal.tags) && meal.tags.slice(0, 2).map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            className="bg-primary text-white shadow-lg"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Favorite button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg"
                            onClick={() => toggleFavorite(meal.id)}
                          >
                            <Heart
                              className={`h-5 w-5 transition-colors ${
                                favorites.includes(meal.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-500"
                              }`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {favorites.includes(meal.id)
                            ? "Remove from favorites"
                            : "Add to favorites"}
                        </TooltipContent>
                      </Tooltip>

                      {/* Discount badge */}
                      {savings > 0 && (
                        <Badge className="absolute bottom-3 left-3 bg-green-500 text-white shadow-lg">
                          {discountPercentage}% OFF
                        </Badge>
                      )}

                      {/* Nutrition score */}
                      <div className="absolute bottom-3 right-3 bg-white/90 rounded-full p-2 shadow-lg">
                        <div className="text-xs font-bold text-primary">
                          {meal.nutritionScore}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                            {meal.name}
                          </h3>
                          <div className="text-right">
                            <div className="font-bold text-2xl text-primary">
                              ₹{meal.price}
                            </div>
                            {meal.originalPrice && meal.originalPrice > meal.price && (
                              <div className="text-sm text-muted-foreground line-through">
                                ₹{meal.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {meal.description}
                        </p>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 py-3 border-t">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">{meal.prepTime}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Preparation time</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Flame className="h-4 w-4 text-red-500" />
                              <span className="font-medium">{meal.calories}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Calories per serving</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{meal.rating}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{meal.reviews} reviews</TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Nutrition Score */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">
                            Nutrition Score
                          </span>
                          <span className="text-sm font-bold text-orange-600">
                            {meal.nutritionScore}/100
                          </span>
                        </div>
                        <Progress value={meal.nutritionScore} className="h-2" />
                      </div>

                      {/* Spice Level */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          Spice Level:
                        </span>
                        <span className="text-sm">
                          {getSpiceIndicator(meal.spiceLevel)}
                        </span>
                      </div>

                      {/* Dietary badges */}
                      <div className="flex flex-wrap gap-2">
                        {meal.dietary && Array.isArray(meal.dietary) && meal.dietary.map((diet: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border-orange-200 text-orange-700"
                          >
                            {diet}
                          </Badge>
                        ))}
                      </div>

                      <Separator />

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        {cartQuantity > 0 ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(meal.id)}
                              className="border-orange-200 hover:bg-orange-50"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="flex-1 text-center font-semibold text-orange-600">
                              {cartQuantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(meal.id)}
                              className="border-orange-200 hover:bg-orange-50"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => addToCart(meal.id)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-orange-200 hover:bg-orange-50"
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View details</TooltipContent>
                        </Tooltip>
                      </div>

                      <Button
                        className="w-full flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        asChild
                      >
                        <Link href="/user/book/select-date">
                          <Calendar className="h-4 w-4 mr-2" />
                          Add to Meal Plan
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && meals && Array.isArray(meals) && meals.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                No meals found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Clear all filters
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-muted/60 rounded-3xl p-8 lg:p-12 text-black shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Start Your Meal Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Choose your favorite meals and create a personalized
                subscription plan tailored to your taste and nutrition needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="bg-white text-orange-600 hover:bg-white/50"
                >
                  <Link href="/user/book">
                    <ChefHat className="h-5 w-5 mr-2" />
                    Create Your Plan
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-orange-500 hover:bg-white/50 hover:text-orange-600"
                >
                  <Link href="/menu/addons">
                    <Package className="h-5 w-5 mr-2" />
                    Browse Add-ons
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </TooltipProvider>
  );
}

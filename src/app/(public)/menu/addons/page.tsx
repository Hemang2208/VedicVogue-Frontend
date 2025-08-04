"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Minus, ShoppingCart, Star, Heart, Filter } from "lucide-react";

const addOnCategories = [
  {
    id: "sweets",
    name: "Traditional Sweets",
    description: "Authentic Indian desserts",
    icon: "🍯",
    items: [
      {
        id: "gulab-jamun",
        name: "Gulab Jamun",
        description: "Soft, syrupy milk dumplings",
        price: 40,
        originalPrice: 50,
        rating: 4.8,
        reviews: 124,
        image: "https://placehold.co/200x200/svg",
        popular: true,
        tags: ["Sweet", "Traditional", "Vegetarian"],
      },
      {
        id: "rasgulla",
        name: "Rasgulla",
        description: "Spongy cottage cheese balls in syrup",
        price: 35,
        originalPrice: 45,
        rating: 4.6,
        reviews: 89,
        image: "https://placehold.co/200x200/svg",
        popular: false,
        tags: ["Sweet", "Bengali", "Vegetarian"],
      },
      {
        id: "kheer",
        name: "Rice Kheer",
        description: "Creamy rice pudding with nuts",
        price: 45,
        originalPrice: 55,
        rating: 4.7,
        reviews: 156,
        image: "https://placehold.co/200x200/svg",
        popular: false,
        tags: ["Sweet", "Creamy", "Festive"],
      },
    ],
  },
  {
    id: "drinks",
    name: "Healthy Beverages",
    description: "Refreshing and nutritious drinks",
    icon: "🥤",
    items: [
      {
        id: "lassi",
        name: "Sweet Lassi",
        description: "Traditional yogurt-based drink",
        price: 30,
        originalPrice: 40,
        rating: 4.5,
        reviews: 78,
        image: "https://placehold.co/200x200/svg",
        popular: true,
        tags: ["Drink", "Yogurt", "Refreshing"],
      },
      {
        id: "buttermilk",
        name: "Spiced Buttermilk",
        description: "Digestive drink with spices",
        price: 25,
        originalPrice: 35,
        rating: 4.4,
        reviews: 92,
        image: "https://placehold.co/200x200/svg",
        popular: false,
        tags: ["Drink", "Digestive", "Spiced"],
      },
      {
        id: "green-tea",
        name: "Herbal Green Tea",
        description: "Antioxidant-rich green tea blend",
        price: 20,
        originalPrice: 30,
        rating: 4.3,
        reviews: 67,
        image: "https://placehold.co/200x200/svg",
        popular: false,
        tags: ["Tea", "Herbal", "Healthy"],
      },
    ],
  },
  {
    id: "snacks",
    name: "Healthy Snacks",
    description: "Nutritious evening snacks",
    icon: "🥜",
    items: [
      {
        id: "mixed-nuts",
        name: "Premium Mixed Nuts",
        description: "Roasted almonds, cashews, and walnuts",
        price: 60,
        originalPrice: 75,
        rating: 4.9,
        reviews: 203,
        image: "https://placehold.co/200x200/svg",
        popular: true,
        tags: ["Nuts", "Protein", "Healthy"],
      },
      {
        id: "fruit-bowl",
        name: "Seasonal Fruit Bowl",
        description: "Fresh cut seasonal fruits",
        price: 50,
        originalPrice: 65,
        rating: 4.6,
        reviews: 145,
        image: "https://placehold.co/200x200/svg",
        popular: false,
        tags: ["Fruits", "Fresh", "Vitamins"],
      },
      {
        id: "roasted-chana",
        name: "Roasted Chana",
        description: "Spiced roasted chickpeas",
        price: 25,
        originalPrice: 35,
        rating: 4.4,
        reviews: 87,
        image: "https://placehold.co/200x200/svg",
        popular: false,
        tags: ["Protein", "Crunchy", "Spiced"],
      },
    ],
  },
  {
    id: "supplements",
    name: "Health Supplements",
    description: "Nutritional supplements and boosters",
    icon: "💊",
    items: [
      {
        id: "protein-powder",
        name: "Plant Protein Powder",
        description: "Organic plant-based protein supplement",
        price: 80,
        originalPrice: 100,
        rating: 4.7,
        reviews: 234,
        image: "https://placehold.co/200x200/svg",
        popular: true,
        tags: ["Protein", "Plant-based", "Organic"],
      },
      {
        id: "vitamin-c",
        name: "Vitamin C Tablets",
        description: "Natural immunity booster",
        price: 40,
        originalPrice: 50,
        rating: 4.5,
        reviews: 167,
        image: "https://placehold.co/200x200/svg",
        popular: false,
        tags: ["Vitamins", "Immunity", "Natural"],
      },
    ],
  },
];

export default function AddOnsPage() {
  const [selectedCategory, setSelectedCategory] = useState("sweets");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = addOnCategories
        .flatMap((cat) => cat.items)
        .find((item) => item.id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Add-On Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enhance your meal experience with our premium add-ons, sweets,
            drinks, and healthy supplements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {addOnCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Cart Summary */}
            {getCartItemCount() > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Cart ({getCartItemCount()})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(cart).map(([itemId, quantity]) => {
                      const item = addOnCategories
                        .flatMap((cat) => cat.items)
                        .find((item) => item.id === itemId);
                      if (!item) return null;

                      return (
                        <div
                          key={itemId}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="flex-1 truncate">{item.name}</span>
                          <span className="mx-2">×{quantity}</span>
                          <span className="font-medium">
                            ₹{item.price * quantity}
                          </span>
                        </div>
                      );
                    })}
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                    <Button className="w-full" size="sm">
                      Add to Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {addOnCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: selectedCategory === category.id ? 1 : 0,
                  y: selectedCategory === category.id ? 0 : 20,
                }}
                className={
                  selectedCategory === category.id ? "block" : "hidden"
                }
              >
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <CardTitle className="text-2xl">
                          {category.name}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        <div className="relative">
                          <Image
                            src={item.image || "https://placehold.co/svg"}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.popular && (
                            <Badge className="absolute top-2 left-2 bg-orange-500">
                              Popular
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`absolute top-2 right-2 ${
                              favorites.includes(item.id)
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                            onClick={() => toggleFavorite(item.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                favorites.includes(item.id)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          </Button>
                        </div>

                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {item.name}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">
                                  {item.rating}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                ({item.reviews})
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-primary">
                                  ₹{item.price}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{item.originalPrice}
                                </span>
                              </div>
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800"
                              >
                                {Math.round(
                                  ((item.originalPrice - item.price) /
                                    item.originalPrice) *
                                    100
                                )}
                                % off
                              </Badge>
                            </div>

                            <div className="flex items-center gap-2">
                              {cart[item.id] ? (
                                <div className="flex items-center gap-2 flex-1">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="font-medium min-w-8 text-center">
                                    {cart[item.id]}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => addToCart(item.id)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  className="flex-1"
                                  onClick={() => addToCart(item.id)}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Combos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle>Popular Combos</CardTitle>
              <p className="text-muted-foreground">
                Save more with these popular add-on combinations
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Sweet Tooth Combo",
                    items: ["Gulab Jamun", "Rice Kheer", "Sweet Lassi"],
                    originalPrice: 115,
                    comboPrice: 95,
                    savings: 20,
                  },
                  {
                    name: "Healthy Snack Pack",
                    items: ["Mixed Nuts", "Fruit Bowl", "Green Tea"],
                    originalPrice: 130,
                    comboPrice: 110,
                    savings: 20,
                  },
                  {
                    name: "Fitness Bundle",
                    items: ["Protein Powder", "Mixed Nuts", "Buttermilk"],
                    originalPrice: 165,
                    comboPrice: 140,
                    savings: 25,
                  },
                ].map((combo, index) => (
                  <Card
                    key={index}
                    className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{combo.name}</h4>
                      <ul className="text-sm text-muted-foreground mb-3 space-y-1">
                        {combo.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-primary">
                            ₹{combo.comboPrice}
                          </span>
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ₹{combo.originalPrice}
                          </span>
                        </div>
                        <Badge className="bg-green-500">
                          Save ₹{combo.savings}
                        </Badge>
                      </div>
                      <Button className="w-full" size="sm">
                        Add Combo
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
  );
}

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
import { ArrowLeft, ArrowRight, Plus, Minus, ShoppingCart } from "lucide-react";

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

const addOnCategories = [
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
  {
    id: "snacks",
    name: "Healthy Snacks",
    items: [
      {
        id: "mixed-nuts",
        name: "Mixed Nuts",
        description: "Roasted almonds and cashews",
        price: 60,
        image: "https://placehold.co/150x150/svg",
        popular: true,
      },
      {
        id: "fruit-bowl",
        name: "Fruit Bowl",
        description: "Fresh seasonal fruits",
        price: 50,
        image: "https://placehold.co/150x150/svg",
        popular: false,
      },
    ],
  },
];

export default function AddOnsPage() {
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>(
    {}
  );

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
              <Link href="/user/book/select-date">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </VVButton>
            <div>
              <h1 className="text-3xl font-bold">Add-ons & Extras</h1>
              <p className="text-muted-foreground">
                Enhance your meal with our delicious add-ons
              </p>
            </div>
          </div>

          {/* Stepper */}
          <VVStepper steps={bookingSteps} currentStep={2} />
        </motion.div>

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
                                      src={item.image || "https://placehold.co/50x50/svg"}
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
                                    <h4 className="font-semibold">
                                      {item.name}
                                    </h4>
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
                                          onClick={() =>
                                            removeFromCart(item.id)
                                          }
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
                    {Object.entries(selectedAddOns).map(
                      ([itemId, quantity]) => {
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
                      }
                    )}

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
      </div>

      <Footer />
    </div>
  );
}

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
import { VVInput } from "@/components/ui/vv-input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  Book,
  CreditCard,
  Truck,
  Users,
  Shield,
} from "lucide-react";

const faqCategories = [
  {
    id: "orders",
    title: "Orders & Subscriptions",
    icon: Book,
    faqs: [
      {
        question: "How do I place my first order?",
        answer:
          "To place your first order, simply browse our menu, select your preferred meal plan, choose your delivery schedule, and proceed to checkout. You can customize your meals based on dietary preferences and portion sizes.",
      },
      {
        question: "Can I modify my subscription after placing an order?",
        answer:
          "Yes! You can modify your subscription anytime through your dashboard. You can pause, skip meals, change delivery times, or update your meal preferences with at least 24 hours notice.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "You can cancel your subscription anytime from your account dashboard. Go to 'My Subscriptions' and click 'Cancel'. If you cancel within 24 hours of your next delivery, you'll receive a full refund.",
      },
      {
        question: "What if I want to skip a few days?",
        answer:
          "You can easily skip meals through your dashboard or mobile app. Just select the dates you want to skip with at least 24 hours notice. You won't be charged for skipped meals.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Timing",
    icon: Truck,
    faqs: [
      {
        question: "What are your delivery hours?",
        answer:
          "We deliver meals during three time slots: Morning (8-10 AM), Lunch (12-2 PM), and Evening (6-8 PM). You can choose your preferred time slot during checkout.",
      },
      {
        question: "Do you deliver on weekends?",
        answer:
          "Yes, we deliver 7 days a week including weekends and holidays. However, you can choose to skip weekend deliveries if you prefer.",
      },
      {
        question: "What if I'm not home during delivery?",
        answer:
          "Our delivery partners will call you before arriving. If you're not available, they can leave the meal in a safe location as per your instructions, or you can reschedule the delivery.",
      },
      {
        question: "Is there a delivery fee?",
        answer:
          "Delivery is free for all subscription plans. For single-day orders, a small delivery fee may apply depending on your location.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & Billing",
    icon: CreditCard,
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major payment methods including UPI, credit/debit cards, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.",
      },
      {
        question: "When will I be charged?",
        answer:
          "For subscriptions, you'll be charged at the beginning of each billing cycle. For single orders, payment is processed immediately after order confirmation.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Yes, we offer full refunds for cancellations made at least 24 hours before your next delivery. For quality issues, we provide immediate refunds or meal replacements.",
      },
      {
        question: "Do you offer any discounts?",
        answer:
          "Yes! We offer discounts for longer subscription periods, referral bonuses, and seasonal promotions. Check our offers page for current deals.",
      },
    ],
  },
  {
    id: "food",
    title: "Food & Quality",
    icon: Shield,
    faqs: [
      {
        question: "How do you ensure food quality and hygiene?",
        answer:
          "We follow strict FSSAI guidelines with regular quality checks. Our kitchen is certified, and we use fresh ingredients daily. All meals are prepared in hygienic conditions and packed in food-grade containers.",
      },
      {
        question: "Do you cater to special dietary requirements?",
        answer:
          "We offer various meal plans including vegetarian, vegan, Jain, keto, diabetic-friendly, and high-protein options. You can specify your dietary preferences during signup.",
      },
      {
        question: "How long do the meals stay fresh?",
        answer:
          "Our meals are prepared fresh daily and are best consumed within 4-6 hours of delivery. We use temperature-controlled packaging to maintain freshness during transit.",
      },
      {
        question: "What if I don't like a meal?",
        answer:
          "If you're not satisfied with any meal, please contact us immediately. We'll either provide a replacement meal or issue a refund. Your satisfaction is our priority.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Profile",
    icon: Users,
    faqs: [
      {
        question: "How do I update my delivery address?",
        answer:
          "You can update your delivery address anytime from your profile settings. Changes will apply to your next delivery. Make sure to update at least 24 hours before your next scheduled delivery.",
      },
      {
        question: "Can I have multiple delivery addresses?",
        answer:
          "Yes, you can save multiple addresses in your profile and choose different addresses for different days. This is perfect if you want meals delivered to your office and home.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click on 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link via email. Follow the instructions to create a new password.",
      },
      {
        question: "Can I share my subscription with family members?",
        answer:
          "Yes! You can add family members to your account and manage their meal preferences separately. Each member can have different dietary requirements and delivery schedules.",
      },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) =>
      selectedCategory
        ? category.id === selectedCategory
        : category.faqs.length > 0
    );

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to frequently asked questions about VedicVogue
              Kitchen
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto">
              <VVInput
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                className="text-center"
              />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <VVCard
              className="text-center p-6 hover:shadow-lg transition-all cursor-pointer"
              asChild
            >
              <Link href="/user/contact-support">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                <p className="text-muted-foreground">
                  Get instant help from our support team
                </p>
              </Link>
            </VVCard>

            <VVCard className="text-center p-6 hover:shadow-lg transition-all cursor-pointer">
              <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-lg mb-2">Call Support</h3>
              <p className="text-muted-foreground">+91 98765 43210</p>
            </VVCard>

            <VVCard className="text-center p-6 hover:shadow-lg transition-all cursor-pointer">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground">support@vedicvogue.com</p>
            </VVCard>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              <VVButton
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </VVButton>
              {faqCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <VVButton
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    leftIcon={<Icon className="h-4 w-4" />}
                  >
                    {category.title}
                  </VVButton>
                );
              })}
            </div>
          </motion.div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * categoryIndex }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle className="flex items-center gap-3">
                      <category.icon className="h-6 w-6 text-primary" />
                      {category.title}
                    </VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const itemId = `${category.id}-${faqIndex}`;
                        const isOpen = openItems.includes(itemId);

                        return (
                          <Collapsible key={faqIndex}>
                            <CollapsibleTrigger
                              className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50 transition-colors"
                              onClick={() => toggleItem(itemId)}
                            >
                              <span className="font-medium">
                                {faq.question}
                              </span>
                              <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </motion.div>
                            </CollapsibleTrigger>
                            <AnimatePresence>
                              {isOpen && (
                                <CollapsibleContent>
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="px-4 pb-4"
                                  >
                                    <p className="text-muted-foreground leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </motion.div>
                                </CollapsibleContent>
                              )}
                            </AnimatePresence>
                          </Collapsible>
                        );
                      })}
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredFAQs.every((category) => category.faqs.length === 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn&apos;t find any FAQs matching your search. Try
                different keywords or contact our support team.
              </p>
              <VVButton asChild>
                <Link href="/user/contact-support">Contact Support</Link>
              </VVButton>
            </motion.div>
          )}

          {/* Still Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <VVCard className="text-center p-8 bg-gradient-to-r from-primary/5 to-orange-500/5">
              <VVCardContent>
                <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
                <p className="text-muted-foreground mb-6">
                  Can&apos;t find what you&apos;re looking for? Our support team
                  is here to help you 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <VVButton asChild>
                    <Link href="/user/contact-support">Contact Support</Link>
                  </VVButton>
                  <VVButton variant="outline" asChild>
                    <Link href="/user/profile/feedback">Send Feedback</Link>
                  </VVButton>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

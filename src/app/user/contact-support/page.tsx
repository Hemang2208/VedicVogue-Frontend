"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Send,
  Headphones,
  CheckCircle,
  AlertCircle,
  Star,
  Users,
  Shield,
} from "lucide-react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const supportCategories = [
  { value: "order", label: "Order Issues", icon: "📦" },
  { value: "delivery", label: "Delivery Problems", icon: "🚚" },
  { value: "payment", label: "Payment & Billing", icon: "💳" },
  { value: "food-quality", label: "Food Quality", icon: "🍽️" },
  { value: "account", label: "Account Management", icon: "👤" },
  { value: "subscription", label: "Subscription Changes", icon: "📋" },
  { value: "technical", label: "Technical Issues", icon: "⚙️" },
  { value: "other", label: "Other", icon: "❓" },
];

const urgencyLevels = [
  {
    value: "low",
    label: "Low - General inquiry",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    value: "medium",
    label: "Medium - Need help soon",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    value: "high",
    label: "High - Urgent issue",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    value: "critical",
    label: "Critical - Emergency",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    urgency: "",
    subject: "",
    message: "",
    orderNumber: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Support ticket submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      urgency: "",
      subject: "",
      message: "",
      orderNumber: "",
    });
  };

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      subtitle: "Average response: 2 min",
      action: "Start Chat",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+91 98765 43210",
      subtitle: "Mon-Sun: 8 AM - 10 PM",
      action: "Call Now",
      gradient: "from-orange-400 to-amber-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@vedicvogue.com",
      subtitle: "Response within 2 hours",
      action: "Send Email",
      gradient: "from-amber-500 to-yellow-500",
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Clock, value: "< 2 min", label: "Avg Response" },
    { icon: Star, value: "4.9/5", label: "Support Rating" },
    { icon: Shield, value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Navigation />

      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              We&apos;re Here to Help
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Get instant support from our expert team. We&apos;re committed to
              resolving your issues quickly and efficiently.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-orange-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Quick Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-8 mb-16 -mt-8"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-xl mb-6 text-white shadow-lg`}
                >
                  <action.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 mb-1">{action.description}</p>
                <p className="text-sm text-orange-600 font-medium mb-6">
                  {action.subtitle}
                </p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  {action.action}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Support Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8">
                  <div className="flex items-center gap-3 text-white">
                    <Headphones className="w-8 h-8" />
                    <div>
                      <h2 className="text-2xl font-bold">
                        Submit a Support Ticket
                      </h2>
                      <p className="text-orange-100 mt-1">
                        Fill out the form below and we&apos;ll get back to you
                        as soon as possible
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">
                          Ticket Submitted Successfully!
                        </p>
                        <p className="text-sm text-green-600">
                          We&apos;ll get back to you soon with a response.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-8">
                      {/* Personal Information */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-100 pb-2">
                          Personal Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              placeholder="Enter your full name"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              placeholder="Enter your email"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              placeholder="Enter your phone number"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500                               focus:border-transparent transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Order Number (if applicable)
                            </label>
                            <input
                              type="text"
                              value={formData.orderNumber}
                              onChange={(e) =>
                                handleInputChange("orderNumber", e.target.value)
                              }
                              placeholder="Enter your order number"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Support Details */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-100 pb-2">
                          Support Details
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) =>
                              handleInputChange("category", e.target.value)
                            }
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            {supportCategories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.icon} {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Urgency *
                          </label>
                          <select
                            value={formData.urgency}
                            onChange={(e) =>
                              handleInputChange("urgency", e.target.value)
                            }
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="" disabled>
                              Select urgency level
                            </option>
                            {urgencyLevels.map((level) => (
                              <option key={level.value} value={level.value}>
                                {level.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject *
                          </label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) =>
                              handleInputChange("subject", e.target.value)
                            }
                            required
                            placeholder="Enter subject"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                          </label>
                          <textarea
                            rows={5}
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            required
                            placeholder="Describe your issue or inquiry in detail"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Send className="w-5 h-5" />
                          Submit Ticket
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tips or Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-orange-50 p-6 rounded-3xl border border-orange-100 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-bold text-orange-800">
                Tips for Quick Support
              </h3>
            </div>
            <ul className="list-disc list-inside text-sm text-orange-700 space-y-2">
              <li>Be specific in describing your issue.</li>
              <li>Attach your order number if applicable.</li>
              <li>Mention previous interactions or tickets.</li>
              <li>Choose appropriate urgency to help us prioritize.</li>
            </ul>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

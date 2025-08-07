"use client";

import type React from "react";

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
import { VVBadge } from "@/components/ui/vv-badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  HelpCircle,
  Headphones,
  FileText,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { encrypt } from "@/utils/crypto";
import toast from "react-hot-toast";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  issueType: string;
  subject: string;
  message: string;
  priority: string;
}

const supportChannels = [
  {
    id: "chat",
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    availability: "24/7 Available",
    responseTime: "< 2 minutes",
    status: "online",
  },
  {
    id: "phone",
    title: "Phone Support",
    description: "Speak directly with our experts",
    icon: Phone,
    availability: "9 AM - 9 PM",
    responseTime: "Immediate",
    status: "available",
    // contact: "+91 98765 43210",
  },
  {
    id: "email",
    title: "Email Support",
    description: "Send us detailed queries",
    icon: Mail,
    availability: "24/7 Available",
    responseTime: "< 4 hours",
    status: "online",
    contact: "support@vedicvogue.com",
  },
  {
    id: "callback",
    title: "Request Callback",
    description: "We'll call you back at your convenience",
    icon: Headphones,
    availability: "9 AM - 9 PM",
    responseTime: "< 30 minutes",
    status: "available",
  },
];

const issueTypes = [
  "Order Issues",
  "Delivery Problems",
  "Payment & Billing",
  "Account & Profile",
  "Food Quality",
  "Technical Issues",
  "Feedback & Suggestions",
  "Other",
];

export default function SupportPage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    subject: "",
    message: "",
    priority: "low",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        issueType: formData.issueType,
        subject: formData.subject,
        message: formData.message,
        priority: formData.priority,
      };

      const encryptedData = encrypt(JSON.stringify(contactData));

      const URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${URL}/api/contacts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Server Error Response:", responseData);
        throw new Error(
          responseData.message || "Failed to submit contact request"
        );
      }

      toast.success(
        responseData.message || "Application Submitted Successfully!"
      );

      setSubmitError(null);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting contact:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit contact request. Please try again.";
      toast.error(errorMessage);
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        issueType: "",
        subject: "",
        message: "",
        priority: "low",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "success";
      case "available":
        return "info";
      case "busy":
        return "warning";
      default:
        return "secondary";
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <VVCard className="p-8">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold mb-4">Request Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for contacting us. We&apos;ve received your request
                and will get back to you soon.
              </p>
              <div className="space-y-3">
                <VVButton className="w-full" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </VVButton>
                <VVButton
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsSubmitted(false);
                    // Reset form data
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      issueType: "",
                      subject: "",
                      message: "",
                      priority: "low",
                    });
                  }}
                >
                  Submit Another Request
                </VVButton>
              </div>
            </VVCard>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Support Center</h1>
            <p className="text-xl text-muted-foreground">
              We&apos;re here to help! Choose how you&apos;d like to get in
              touch with us.
            </p>
          </motion.div>

          {/* Support Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <VVCard
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedChannel === channel.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <VVCardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <channel.icon className="h-12 w-12 mx-auto text-primary" />
                      <VVBadge
                        variant={getStatusColor(channel.status)}
                        className="absolute -top-2 -right-2"
                        size="sm"
                      >
                        {channel.status}
                      </VVBadge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {channel.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {channel.description}
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{channel.availability}</span>
                      </div>
                      <div className="font-medium text-primary">
                        Response: {channel.responseTime}
                      </div>
                      {channel.contact && (
                        <div className="font-medium">{channel.contact}</div>
                      )}
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky self-start top-24"
            >
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send us a Message
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-4">
                        <p className="text-sm">{submitError}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <VVInput
                        label="Full Name *"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        leftIcon={<User className="h-4 w-4" />}
                        required
                      />
                      <VVInput
                        label="Email *"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        leftIcon={<Mail className="h-4 w-4" />}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <VVInput
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        leftIcon={<Phone className="h-4 w-4" />}
                        required
                      />
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Issue Type *
                        </label>
                        <Select
                          value={formData.issueType}
                          onValueChange={(value) =>
                            handleInputChange("issueType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            {issueTypes.map((type) => (
                              <SelectItem
                                key={type}
                                value={type.toLowerCase().replace(/\s+/g, "-")}
                              >
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <VVInput
                      label="Subject *"
                      placeholder="Brief description of your issue"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      required
                    />

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message *</label>
                      <Textarea
                        placeholder="Please describe your issue in detail..."
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        rows={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          handleInputChange("priority", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            Low - General inquiry
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium - Standard issue
                          </SelectItem>
                          <SelectItem value="high">
                            High - Urgent issue
                          </SelectItem>
                          <SelectItem value="critical">
                            Critical - Service disruption
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <VVButton
                      type="submit"
                      className="w-full cursor-pointer"
                      size="lg"
                      loading={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </VVButton>
                  </form>
                </VVCardContent>
              </VVCard>
            </motion.div>

            {/* Quick Actions & Info */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Quick Actions</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-4">
                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/help">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Browse FAQ
                      </Link>
                    </VVButton>
                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/orders">
                        <FileText className="h-4 w-4 mr-2" />
                        Check Order Status
                      </Link>
                    </VVButton>
                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/profile">
                        <User className="h-4 w-4 mr-2" />
                        Update Profile
                      </Link>
                    </VVButton>
                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Callback
                    </VVButton>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Support Hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Support Hours
                    </VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Live Chat</span>
                      <VVBadge variant="success">24/7</VVBadge>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone Support</span>
                      <span className="text-sm">9 AM - 9 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Support</span>
                      <VVBadge variant="success">24/7</VVBadge>
                    </div>
                    <div className="flex justify-between">
                      <span>Callback Service</span>
                      <span className="text-sm">9 AM - 9 PM</span>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <VVCard className="bg-red-50 border-red-200">
                  <VVCardHeader>
                    <VVCardTitle className="text-red-800">
                      Emergency Support
                    </VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent>
                    <p className="text-red-700 text-sm mb-4">
                      For urgent issues like food poisoning or severe allergic
                      reactions, please contact us immediately.
                    </p>
                    <VVButton variant="destructive" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Hotline: +91 98765 43210
                    </VVButton>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

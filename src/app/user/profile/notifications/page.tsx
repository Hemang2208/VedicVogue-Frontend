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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
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
  ArrowLeft,
  Bell,
  Mail,
  Smartphone,
  Settings,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  ShoppingCart,
  // Utensils,
  // Calendar,
  Gift,
  MessageCircle,
  Shield,
  TrendingUp,
  Save,
} from "lucide-react";

interface NotificationSettings {
  email: {
    orderUpdates: boolean;
    promotions: boolean;
    newsletter: boolean;
    securityAlerts: boolean;
    recommendations: boolean;
    reviews: boolean;
  };
  push: {
    orderUpdates: boolean;
    promotions: boolean;
    recommendations: boolean;
    messages: boolean;
    reminders: boolean;
  };
  sms: {
    orderUpdates: boolean;
    securityAlerts: boolean;
    promotions: boolean;
  };
  frequency: {
    email: "immediate" | "daily" | "weekly";
    push: "immediate" | "daily" | "off";
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

interface NotificationItem {
  id: string;
  type:
    | "order"
    | "promotion"
    | "security"
    | "recommendation"
    | "review"
    | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
  actionUrl?: string;
  actionText?: string;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "order",
    title: "Order Delivered Successfully",
    message:
      "Your order #VV-2024-001 has been delivered. Rate your experience!",
    timestamp: "2024-01-20T14:30:00Z",
    read: false,
    priority: "high",
    actionUrl: "/user/profile/orders/ORD001",
    actionText: "View Order",
  },
  {
    id: "2",
    type: "promotion",
    title: "Weekend Special: 30% Off",
    message: "Enjoy 30% off on all orders this weekend. Use code WEEKEND30",
    timestamp: "2024-01-20T10:00:00Z",
    read: false,
    priority: "medium",
    actionUrl: "/offers",
    actionText: "Shop Now",
  },
  {
    id: "3",
    type: "security",
    title: "New Login Detected",
    message: "We detected a new login to your account from Chrome on Windows",
    timestamp: "2024-01-19T16:45:00Z",
    read: true,
    priority: "high",
    actionUrl: "/user/profile/security",
    actionText: "Review Activity",
  },
  {
    id: "4",
    type: "recommendation",
    title: "Try These New Recipes",
    message:
      "Based on your preferences, we think you'll love these authentic Biryani recipes",
    timestamp: "2024-01-19T12:00:00Z",
    read: true,
    priority: "low",
    actionUrl: "/recipes/biryani",
    actionText: "Explore Recipes",
  },
  {
    id: "5",
    type: "review",
    title: "Rate Your Recent Order",
    message: "How was your Paneer Tikka Masala? Your feedback helps us improve",
    timestamp: "2024-01-18T20:15:00Z",
    read: false,
    priority: "medium",
    actionUrl: "/user/profile/orders/ORD001",
    actionText: "Leave Review",
  },
  {
    id: "6",
    type: "system",
    title: "App Update Available",
    message:
      "Version 2.1.0 is now available with new features and improvements",
    timestamp: "2024-01-18T09:00:00Z",
    read: true,
    priority: "low",
    actionUrl: "/app-update",
    actionText: "Update Now",
  },
];

const defaultSettings: NotificationSettings = {
  email: {
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    securityAlerts: true,
    recommendations: true,
    reviews: true,
  },
  push: {
    orderUpdates: true,
    promotions: false,
    recommendations: true,
    messages: true,
    reminders: true,
  },
  sms: {
    orderUpdates: true,
    securityAlerts: true,
    promotions: false,
  },
  frequency: {
    email: "immediate",
    push: "immediate",
  },
  quietHours: {
    enabled: true,
    start: "22:00",
    end: "08:00",
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("notifications");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return ShoppingCart;
      case "promotion":
        return Gift;
      case "security":
        return Shield;
      case "recommendation":
        return TrendingUp;
      case "review":
        return Star;
      case "system":
        return Settings;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-green-100 text-green-800";
      case "promotion":
        return "bg-purple-100 text-purple-800";
      case "security":
        return "bg-red-100 text-red-800";
      case "recommendation":
        return "bg-blue-100 text-blue-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return AlertCircle;
      case "medium":
        return Info;
      case "low":
        return CheckCircle;
      default:
        return Info;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return time.toLocaleDateString();
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateEmailSetting = (
    key: keyof NotificationSettings["email"],
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      email: { ...prev.email, [key]: value },
    }));
  };

  const updatePushSetting = (
    key: keyof NotificationSettings["push"],
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      push: { ...prev.push, [key]: value },
    }));
  };

  const updateSmsSetting = (
    key: keyof NotificationSettings["sms"],
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      sms: { ...prev.sms, [key]: value },
    }));
  };

  const updateFrequency = (type: "email" | "push", value: string) => {
    setSettings((prev) => ({
      ...prev,
      frequency: {
        ...prev.frequency,
        [type]: value as NotificationSettings["frequency"][typeof type],
      },
    }));
  };

  const updateQuietHours = (
    key: keyof NotificationSettings["quietHours"],
    value: boolean | string
  ) => {
    setSettings((prev) => ({
      ...prev,
      quietHours: { ...prev.quietHours, [key]: value },
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    console.log("Saving notification settings:", settings);
    alert("Notification settings saved successfully!");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const highPriorityCount = notifications.filter(
    (n) => n.priority === "high" && !n.read
  ).length;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
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
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Bell className="h-8 w-8" />
                  Notifications
                  {unreadCount > 0 && (
                    <VVBadge className="bg-red-600 text-white">
                      {unreadCount}
                    </VVBadge>
                  )}
                </h1>
                <p className="text-muted-foreground">
                  Manage your notifications and preferences
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {notifications.length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Notifications
                  </p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {unreadCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {highPriorityCount}
                  </div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </VVCardContent>
              </VVCard>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <VVCard>
                    <VVCardHeader>
                      <div className="flex items-center justify-between">
                        <VVCardTitle>Recent Notifications</VVCardTitle>
                        <div className="flex gap-2">
                          {unreadCount > 0 && (
                            <VVButton
                              variant="outline"
                              size="sm"
                              onClick={markAllAsRead}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark All Read
                            </VVButton>
                          )}
                          <VVButton
                            variant="outline"
                            size="sm"
                            onClick={clearAllNotifications}
                            className="text-red-600 hover:text-red-700"
                          >
                            Clear All
                          </VVButton>
                        </div>
                      </div>
                    </VVCardHeader>
                    <VVCardContent>
                      {notifications.length === 0 ? (
                        <div className="text-center py-12">
                          <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            No notifications
                          </h3>
                          <p className="text-muted-foreground">
                            You&apos;re all caught up! New notifications will
                            appear here.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {notifications.map((notification, index) => {
                            const TypeIcon = getTypeIcon(notification.type);
                            const PriorityIcon = getPriorityIcon(
                              notification.priority
                            );

                            return (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                                  notification.read
                                    ? "bg-card hover:bg-muted/50"
                                    : "bg-blue-50 border-blue-200 hover:bg-blue-100"
                                }`}
                              >
                                {/* Icon */}
                                <div
                                  className={`p-2 rounded-lg ${getTypeColor(
                                    notification.type
                                  )}`}
                                >
                                  <TypeIcon className="h-5 w-5" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h3
                                          className={`font-medium text-sm ${
                                            !notification.read
                                              ? "font-semibold"
                                              : ""
                                          }`}
                                        >
                                          {notification.title}
                                        </h3>
                                        {!notification.read && (
                                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                        )}
                                        <VVBadge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {notification.type}
                                        </VVBadge>
                                        {notification.priority === "high" && (
                                          <PriorityIcon className="h-4 w-4 text-red-500" />
                                        )}
                                      </div>

                                      <p className="text-sm text-muted-foreground mb-2">
                                        {notification.message}
                                      </p>

                                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {formatTimeAgo(
                                            notification.timestamp
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                  {notification.actionUrl && (
                                    <VVButton
                                      size="sm"
                                      variant="outline"
                                      asChild
                                    >
                                      <Link href={notification.actionUrl}>
                                        {notification.actionText || "View"}
                                      </Link>
                                    </VVButton>
                                  )}

                                  {!notification.read && (
                                    <VVButton
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        markAsRead(notification.id)
                                      }
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </VVButton>
                                  )}

                                  <VVButton
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    ×
                                  </VVButton>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </VVCardContent>
                  </VVCard>
                </motion.div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  {/* Email Notifications */}
                  <VVCard>
                    <VVCardHeader>
                      <VVCardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Email Notifications
                      </VVCardTitle>
                    </VVCardHeader>
                    <VVCardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-orders">Order Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about order status changes
                          </p>
                        </div>
                        <Switch
                          id="email-orders"
                          checked={settings.email.orderUpdates}
                          onCheckedChange={(checked) =>
                            updateEmailSetting("orderUpdates", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-promotions">
                            Promotions & Offers
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional emails and special offers
                          </p>
                        </div>
                        <Switch
                          id="email-promotions"
                          checked={settings.email.promotions}
                          onCheckedChange={(checked) =>
                            updateEmailSetting("promotions", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-newsletter">Newsletter</Label>
                          <p className="text-sm text-muted-foreground">
                            Weekly newsletter with recipes and tips
                          </p>
                        </div>
                        <Switch
                          id="email-newsletter"
                          checked={settings.email.newsletter}
                          onCheckedChange={(checked) =>
                            updateEmailSetting("newsletter", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-security">
                            Security Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Important security notifications
                          </p>
                        </div>
                        <Switch
                          id="email-security"
                          checked={settings.email.securityAlerts}
                          onCheckedChange={(checked) =>
                            updateEmailSetting("securityAlerts", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-recommendations">
                            Recommendations
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Personalized food and recipe recommendations
                          </p>
                        </div>
                        <Switch
                          id="email-recommendations"
                          checked={settings.email.recommendations}
                          onCheckedChange={(checked) =>
                            updateEmailSetting("recommendations", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-reviews">Review Requests</Label>
                          <p className="text-sm text-muted-foreground">
                            Requests to review your orders
                          </p>
                        </div>
                        <Switch
                          id="email-reviews"
                          checked={settings.email.reviews}
                          onCheckedChange={(checked) =>
                            updateEmailSetting("reviews", checked)
                          }
                        />
                      </div>

                      <div className="pt-4 border-t">
                        <Label htmlFor="email-frequency">Email Frequency</Label>
                        <Select
                          value={settings.frequency.email}
                          onValueChange={(value) =>
                            updateFrequency("email", value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">
                              Weekly Summary
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </VVCardContent>
                  </VVCard>

                  {/* Push Notifications */}
                  <VVCard>
                    <VVCardHeader>
                      <VVCardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Push Notifications
                      </VVCardTitle>
                    </VVCardHeader>
                    <VVCardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-orders">Order Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Real-time order status updates
                          </p>
                        </div>
                        <Switch
                          id="push-orders"
                          checked={settings.push.orderUpdates}
                          onCheckedChange={(checked) =>
                            updatePushSetting("orderUpdates", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-promotions">Promotions</Label>
                          <p className="text-sm text-muted-foreground">
                            Special offers and deals
                          </p>
                        </div>
                        <Switch
                          id="push-promotions"
                          checked={settings.push.promotions}
                          onCheckedChange={(checked) =>
                            updatePushSetting("promotions", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-recommendations">
                            Recommendations
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Personalized suggestions
                          </p>
                        </div>
                        <Switch
                          id="push-recommendations"
                          checked={settings.push.recommendations}
                          onCheckedChange={(checked) =>
                            updatePushSetting("recommendations", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-messages">Messages</Label>
                          <p className="text-sm text-muted-foreground">
                            Support messages and replies
                          </p>
                        </div>
                        <Switch
                          id="push-messages"
                          checked={settings.push.messages}
                          onCheckedChange={(checked) =>
                            updatePushSetting("messages", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-reminders">Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Meal reminders and cooking tips
                          </p>
                        </div>
                        <Switch
                          id="push-reminders"
                          checked={settings.push.reminders}
                          onCheckedChange={(checked) =>
                            updatePushSetting("reminders", checked)
                          }
                        />
                      </div>

                      <div className="pt-4 border-t">
                        <Label htmlFor="push-frequency">Push Frequency</Label>
                        <Select
                          value={settings.frequency.push}
                          onValueChange={(value) =>
                            updateFrequency("push", value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="daily">Daily Summary</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </VVCardContent>
                  </VVCard>

                  {/* SMS Notifications */}
                  <VVCard>
                    <VVCardHeader>
                      <VVCardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        SMS Notifications
                      </VVCardTitle>
                    </VVCardHeader>
                    <VVCardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-orders">Order Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Critical order status updates via SMS
                          </p>
                        </div>
                        <Switch
                          id="sms-orders"
                          checked={settings.sms.orderUpdates}
                          onCheckedChange={(checked) =>
                            updateSmsSetting("orderUpdates", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-security">Security Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Important security notifications
                          </p>
                        </div>
                        <Switch
                          id="sms-security"
                          checked={settings.sms.securityAlerts}
                          onCheckedChange={(checked) =>
                            updateSmsSetting("securityAlerts", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-promotions">Promotions</Label>
                          <p className="text-sm text-muted-foreground">
                            Special offers via SMS
                          </p>
                        </div>
                        <Switch
                          id="sms-promotions"
                          checked={settings.sms.promotions}
                          onCheckedChange={(checked) =>
                            updateSmsSetting("promotions", checked)
                          }
                        />
                      </div>
                    </VVCardContent>
                  </VVCard>

                  {/* Quiet Hours */}
                  <VVCard>
                    <VVCardHeader>
                      <VVCardTitle className="flex items-center gap-2">
                        {settings.quietHours.enabled ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                        Quiet Hours
                      </VVCardTitle>
                    </VVCardHeader>
                    <VVCardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="quiet-hours">
                            Enable Quiet Hours
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Pause non-urgent notifications during specified
                            hours
                          </p>
                        </div>
                        <Switch
                          id="quiet-hours"
                          checked={settings.quietHours.enabled}
                          onCheckedChange={(checked) =>
                            updateQuietHours("enabled", checked)
                          }
                        />
                      </div>

                      {settings.quietHours.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="quiet-start">Start Time</Label>
                            <input
                              id="quiet-start"
                              type="time"
                              value={settings.quietHours.start}
                              onChange={(e) =>
                                updateQuietHours("start", e.target.value)
                              }
                              className="mt-2 w-full p-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <Label htmlFor="quiet-end">End Time</Label>
                            <input
                              id="quiet-end"
                              type="time"
                              value={settings.quietHours.end}
                              onChange={(e) =>
                                updateQuietHours("end", e.target.value)
                              }
                              className="mt-2 w-full p-2 border rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </VVCardContent>
                  </VVCard>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <VVButton
                      onClick={saveSettings}
                      className="w-full sm:w-auto"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </VVButton>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

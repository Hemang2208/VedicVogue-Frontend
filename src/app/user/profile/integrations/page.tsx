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
import {
  Tabs,
  // TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  CheckCircle,
  XCircle,
  Settings,
  // ExternalLink,
  Shield,
  Calendar,
  Clock,
  AlertTriangle,
  Plus,
  // Trash2,
  RefreshCw,
  // Key,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Camera,
  Music,
  MapPin,
  // ShoppingCart,
  CreditCard,
  Users,
  BarChart3,
  // FileText,
  Cloud,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category:
    | "social"
    | "payment"
    | "productivity"
    | "analytics"
    | "communication"
    | "storage";
  provider: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  isConnected: boolean;
  connectedDate?: string;
  lastSync?: string;
  permissions: string[];
  features: string[];
  status: "active" | "inactive" | "error" | "syncing";
  apiKey?: string;
  webhookUrl?: string;
}

const availableIntegrations: Integration[] = [
  {
    id: "google",
    name: "Google Account",
    description: "Connect your Google account for seamless login and data sync",
    category: "social",
    provider: "Google",
    icon: Globe,
    color: "bg-red-100 text-red-800",
    isConnected: true,
    connectedDate: "2024-01-15",
    lastSync: "2024-01-20T10:30:00Z",
    permissions: ["Profile", "Email", "Calendar"],
    features: ["Single Sign-On", "Calendar Integration", "Contact Sync"],
    status: "active",
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Share your food experiences and connect with friends",
    category: "social",
    provider: "Meta",
    icon: Users,
    color: "bg-blue-100 text-blue-800",
    isConnected: false,
    permissions: ["Profile", "Friends", "Posts"],
    features: ["Social Sharing", "Friend Recommendations", "Reviews"],
    status: "inactive",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Share food photos and discover new recipes",
    category: "social",
    provider: "Meta",
    icon: Camera,
    color: "bg-pink-100 text-pink-800",
    isConnected: true,
    connectedDate: "2024-01-10",
    lastSync: "2024-01-19T15:20:00Z",
    permissions: ["Profile", "Media", "Stories"],
    features: ["Photo Sharing", "Story Integration", "Recipe Discovery"],
    status: "active",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Receive order updates and support via WhatsApp",
    category: "communication",
    provider: "Meta",
    icon: MessageSquare,
    color: "bg-green-100 text-green-800",
    isConnected: false,
    permissions: ["Messages", "Business Profile"],
    features: ["Order Notifications", "Customer Support", "Menu Sharing"],
    status: "inactive",
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Create dining playlists and discover food-themed music",
    category: "social",
    provider: "Spotify",
    icon: Music,
    color: "bg-green-100 text-green-800",
    isConnected: false,
    permissions: ["Playlists", "Library", "Playback"],
    features: ["Dining Playlists", "Music Recommendations", "Mood-based Music"],
    status: "inactive",
  },
  {
    id: "googlemaps",
    name: "Google Maps",
    description: "Find nearby restaurants and get delivery tracking",
    category: "productivity",
    provider: "Google",
    icon: MapPin,
    color: "bg-blue-100 text-blue-800",
    isConnected: true,
    connectedDate: "2024-01-12",
    lastSync: "2024-01-20T09:15:00Z",
    permissions: ["Location", "Places", "Directions"],
    features: [
      "Restaurant Discovery",
      "Delivery Tracking",
      "Location Services",
    ],
    status: "active",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Secure payment processing and transaction management",
    category: "payment",
    provider: "Razorpay",
    icon: CreditCard,
    color: "bg-blue-100 text-blue-800",
    isConnected: true,
    connectedDate: "2024-01-01",
    lastSync: "2024-01-20T14:45:00Z",
    permissions: ["Payments", "Refunds", "Webhooks"],
    features: [
      "Payment Processing",
      "Refund Management",
      "Transaction Analytics",
    ],
    status: "active",
    apiKey: "rzp_test_••••••••••••1234",
    webhookUrl: "https://api.vedicvogue.com/webhooks/razorpay",
  },
  {
    id: "paytm",
    name: "Paytm",
    description: "Alternative payment gateway for seamless transactions",
    category: "payment",
    provider: "Paytm",
    icon: Smartphone,
    color: "bg-blue-100 text-blue-800",
    isConnected: false,
    permissions: ["Payments", "Wallet", "UPI"],
    features: ["Wallet Payments", "UPI Integration", "QR Code Payments"],
    status: "inactive",
  },
  {
    id: "googleanalytics",
    name: "Google Analytics",
    description: "Track user behavior and app performance metrics",
    category: "analytics",
    provider: "Google",
    icon: BarChart3,
    color: "bg-orange-100 text-orange-800",
    isConnected: true,
    connectedDate: "2024-01-05",
    lastSync: "2024-01-20T12:00:00Z",
    permissions: ["Analytics", "Reports", "Events"],
    features: ["User Analytics", "Performance Tracking", "Custom Reports"],
    status: "active",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing and newsletter management",
    category: "communication",
    provider: "Mailchimp",
    icon: Mail,
    color: "bg-yellow-100 text-yellow-800",
    isConnected: false,
    permissions: ["Campaigns", "Lists", "Templates"],
    features: ["Email Campaigns", "Newsletter", "Automated Marketing"],
    status: "inactive",
  },
  {
    id: "googledrive",
    name: "Google Drive",
    description: "Store and sync your recipes and food photos",
    category: "storage",
    provider: "Google",
    icon: Cloud,
    color: "bg-blue-100 text-blue-800",
    isConnected: false,
    permissions: ["Files", "Folders", "Sharing"],
    features: ["File Storage", "Recipe Backup", "Photo Sync"],
    status: "inactive",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows between VedicVogue and other apps",
    category: "productivity",
    provider: "Zapier",
    icon: Zap,
    color: "bg-orange-100 text-orange-800",
    isConnected: false,
    permissions: ["Triggers", "Actions", "Webhooks"],
    features: ["Workflow Automation", "App Connections", "Custom Triggers"],
    status: "inactive",
  },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(availableIntegrations);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState<string | null>(null);
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return CheckCircle;
      case "inactive":
        return XCircle;
      case "error":
        return AlertTriangle;
      case "syncing":
        return RefreshCw;
      default:
        return XCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "syncing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const handleToggleIntegration = async (id: string) => {
    setLoading(id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIntegrations(
      integrations.map((integration) => {
        if (integration.id === id) {
          const isConnecting = !integration.isConnected;
          return {
            ...integration,
            isConnected: isConnecting,
            status: isConnecting ? "active" : "inactive",
            connectedDate: isConnecting
              ? new Date().toISOString().split("T")[0]
              : undefined,
            lastSync: isConnecting ? new Date().toISOString() : undefined,
          };
        }
        return integration;
      })
    );

    setLoading(null);
  };

  const handleSyncIntegration = async (id: string) => {
    setLoading(id);

    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? { ...integration, status: "syncing" }
          : integration
      )
    );

    // Simulate sync
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              status: "active",
              lastSync: new Date().toISOString(),
            }
          : integration
      )
    );

    setLoading(null);
  };

  const filteredIntegrations =
    selectedCategory === "all"
      ? integrations
      : integrations.filter(
          (integration) => integration.category === selectedCategory
        );

  const connectedCount = integrations.filter(
    (integration) => integration.isConnected
  ).length;
  const activeCount = integrations.filter(
    (integration) => integration.status === "active"
  ).length;
  const errorCount = integrations.filter(
    (integration) => integration.status === "error"
  ).length;

  const categories = [
    { id: "all", name: "All", count: integrations.length },
    {
      id: "social",
      name: "Social",
      count: integrations.filter((i) => i.category === "social").length,
    },
    {
      id: "payment",
      name: "Payment",
      count: integrations.filter((i) => i.category === "payment").length,
    },
    {
      id: "productivity",
      name: "Productivity",
      count: integrations.filter((i) => i.category === "productivity").length,
    },
    {
      id: "analytics",
      name: "Analytics",
      count: integrations.filter((i) => i.category === "analytics").length,
    },
    {
      id: "communication",
      name: "Communication",
      count: integrations.filter((i) => i.category === "communication").length,
    },
    {
      id: "storage",
      name: "Storage",
      count: integrations.filter((i) => i.category === "storage").length,
    },
  ];

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
                  <Zap className="h-8 w-8" />
                  Integrations
                </h1>
                <p className="text-muted-foreground">
                  Connect VedicVogue with your favorite apps and services
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {integrations.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Available</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {connectedCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {activeCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Active</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {errorCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Errors</p>
                </VVCardContent>
              </VVCard>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-7">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Integrations Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration, index) => {
                const StatusIcon = getStatusIcon(integration.status);
                const IntegrationIcon = integration.icon;

                return (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <VVCard className="h-full hover:shadow-lg transition-shadow">
                      <VVCardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${integration.color}`}
                            >
                              <IntegrationIcon className="h-6 w-6" />
                            </div>
                            <div>
                              <VVCardTitle className="text-lg">
                                {integration.name}
                              </VVCardTitle>
                              <p className="text-sm text-muted-foreground">
                                by {integration.provider}
                              </p>
                            </div>
                          </div>
                          <VVBadge
                            className={getStatusColor(integration.status)}
                          >
                            <StatusIcon
                              className={`mr-1 h-3 w-3 ${
                                integration.status === "syncing"
                                  ? "animate-spin"
                                  : ""
                              }`}
                            />
                            {integration.status}
                          </VVBadge>
                        </div>
                      </VVCardHeader>

                      <VVCardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>

                        {/* Features */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Features:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {integration.features
                              .slice(0, 3)
                              .map((feature, idx) => (
                                <VVBadge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {feature}
                                </VVBadge>
                              ))}
                            {integration.features.length > 3 && (
                              <VVBadge variant="secondary" className="text-xs">
                                +{integration.features.length - 3} more
                              </VVBadge>
                            )}
                          </div>
                        </div>

                        {/* Connection Info */}
                        {integration.isConnected && (
                          <div className="text-xs text-muted-foreground space-y-1">
                            {integration.connectedDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Connected:{" "}
                                {new Date(
                                  integration.connectedDate
                                ).toLocaleDateString()}
                              </div>
                            )}
                            {integration.lastSync && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Last sync: {formatTimeAgo(integration.lastSync)}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <VVButton
                            className="flex-1"
                            variant={
                              integration.isConnected ? "outline" : "default"
                            }
                            onClick={() =>
                              handleToggleIntegration(integration.id)
                            }
                            disabled={loading === integration.id}
                          >
                            {loading === integration.id ? (
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            ) : integration.isConnected ? (
                              <XCircle className="mr-2 h-4 w-4" />
                            ) : (
                              <Plus className="mr-2 h-4 w-4" />
                            )}
                            {integration.isConnected ? "Disconnect" : "Connect"}
                          </VVButton>

                          {integration.isConnected && (
                            <>
                              <VVButton
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  handleSyncIntegration(integration.id)
                                }
                                disabled={loading === integration.id}
                              >
                                <RefreshCw
                                  className={`h-4 w-4 ${
                                    loading === integration.id
                                      ? "animate-spin"
                                      : ""
                                  }`}
                                />
                              </VVButton>

                              <VVButton
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                  setSelectedIntegration(integration);
                                  setShowApiDialog(true);
                                }}
                              >
                                <Settings className="h-4 w-4" />
                              </VVButton>
                            </>
                          )}
                        </div>
                      </VVCardContent>
                    </VVCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* API Configuration Dialog */}
          <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {selectedIntegration?.name} Configuration
                </DialogTitle>
                <DialogDescription>
                  Manage API keys and webhook settings for this integration.
                </DialogDescription>
              </DialogHeader>

              {selectedIntegration && (
                <div className="space-y-4">
                  {/* Permissions */}
                  <div>
                    <Label className="text-sm font-medium">Permissions</Label>
                    <div className="mt-2 space-y-2">
                      {selectedIntegration.permissions.map(
                        (permission, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm">{permission}</span>
                            <Switch defaultChecked />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* API Key */}
                  {selectedIntegration.apiKey && (
                    <div>
                      <Label className="text-sm font-medium">API Key</Label>
                      <div className="mt-2 p-3 bg-muted rounded-md font-mono text-sm">
                        {selectedIntegration.apiKey}
                      </div>
                    </div>
                  )}

                  {/* Webhook URL */}
                  {selectedIntegration.webhookUrl && (
                    <div>
                      <Label className="text-sm font-medium">Webhook URL</Label>
                      <div className="mt-2 p-3 bg-muted rounded-md font-mono text-sm break-all">
                        {selectedIntegration.webhookUrl}
                      </div>
                    </div>
                  )}

                  {/* Last Sync */}
                  {selectedIntegration.lastSync && (
                    <div>
                      <Label className="text-sm font-medium">
                        Last Synchronization
                      </Label>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(
                          selectedIntegration.lastSync
                        ).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <DialogFooter>
                <VVButton
                  variant="outline"
                  onClick={() => setShowApiDialog(false)}
                >
                  Close
                </VVButton>
                <VVButton>Save Changes</VVButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <VVCard className="border-blue-200 bg-blue-50">
              <VVCardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Your data is secure
                    </h3>
                    <p className="text-sm text-blue-800 mb-3">
                      All integrations use secure OAuth 2.0 authentication and
                      encrypted connections. We only access the data you
                      explicitly grant permission for, and you can revoke access
                      at any time.
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• OAuth 2.0 secure authentication</li>
                      <li>• Encrypted data transmission</li>
                      <li>• Granular permission control</li>
                      <li>• Regular security audits</li>
                    </ul>
                  </div>
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

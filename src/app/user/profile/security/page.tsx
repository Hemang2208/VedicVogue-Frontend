"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { 
  fetchSecuritySettings, 
  fetchActiveSessions,
  fetchSecurityActivity 
} from "@/redux/slice/user/security.slice";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Key,
  Monitor,
  Activity,
  ChevronRight,
} from "lucide-react";

const securityOptions = [
  {
    title: "Password Management",
    description: "Update and manage your account password",
    icon: Key,
    href: "/user/profile/security/password",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Security Settings",
    description: "Configure two-factor auth and security preferences",
    icon: Shield,
    href: "/user/profile/security/settings",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Active Sessions",
    description: "Manage devices logged into your account",
    icon: Monitor,
    href: "/user/profile/security/sessions",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Security Activity",
    description: "View recent security-related activities",
    icon: Activity,
    href: "/user/profile/security/activity",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export default function SecurityPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { settings, sessions, loading } = useSelector(
    (state: RootState) => state.userSecurity
  );

  useEffect(() => {
    // Load security data when component mounts
    dispatch(fetchSecuritySettings());
    dispatch(fetchActiveSessions());
    dispatch(fetchSecurityActivity({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
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
                <h1 className="text-3xl font-bold">Security Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account security and privacy
                </p>
              </div>
            </div>
          </motion.div>

          {/* Security Options Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {securityOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VVCard className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <Link href={option.href}>
                      <VVCardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${option.bgColor}`}>
                              <Icon className={`h-6 w-6 ${option.color}`} />
                            </div>
                            <div>
                              <VVCardTitle className="group-hover:text-primary transition-colors">
                                {option.title}
                              </VVCardTitle>
                              <p className="text-muted-foreground text-sm mt-1">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </VVCardHeader>
                    </Link>
                  </VVCard>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Security Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Status
                </VVCardTitle>
              </VVCardHeader>
              <VVCardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">✓</div>
                    <p className="text-sm font-medium">Password Protected</p>
                    <p className="text-xs text-muted-foreground">
                      Strong password set
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {settings.twoFactorAuth ? "✓" : "!"}
                    </div>
                    <p className="text-sm font-medium">
                      2FA {settings.twoFactorAuth ? "Enabled" : "Disabled"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {settings.twoFactorAuth ? "Account secured" : "Enable for better security"}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {loading.sessions ? "..." : sessions.length}
                    </div>
                    <p className="text-sm font-medium">Active Sessions</p>
                    <p className="text-xs text-muted-foreground">
                      Across different devices
                    </p>
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

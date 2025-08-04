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
import { VVBadge } from "@/components/ui/vv-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Shield,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Monitor,
  Trash2,
} from "lucide-react";

const securitySettings = {
  twoFactorAuth: false,
  loginNotifications: true,
  sessionTimeout: true,
  deviceTracking: true,
  passwordExpiry: false,
};

const loginSessions = [
  {
    id: "1",
    device: "Chrome on Windows",
    location: "Gurgaon, Haryana",
    lastActive: "2 minutes ago",
    current: true,
    ip: "192.168.1.1",
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "Delhi, India",
    lastActive: "2 hours ago",
    current: false,
    ip: "192.168.1.2",
  },
  {
    id: "3",
    device: "Chrome on Android",
    location: "Mumbai, Maharashtra",
    lastActive: "1 day ago",
    current: false,
    ip: "192.168.1.3",
  },
];

const securityActivities = [
  {
    id: "1",
    type: "login",
    description: "Successful login from Chrome on Windows",
    timestamp: "2 minutes ago",
    status: "success",
    location: "Gurgaon, Haryana",
  },
  {
    id: "2",
    type: "password_change",
    description: "Password changed successfully",
    timestamp: "3 days ago",
    status: "success",
    location: "Gurgaon, Haryana",
  },
  {
    id: "3",
    type: "failed_login",
    description: "Failed login attempt",
    timestamp: "1 week ago",
    status: "warning",
    location: "Unknown location",
  },
];

export default function SecurityPage() {
  const [settings, setSettings] = useState(securitySettings);
  const [sessions, setSessions] = useState(loginSessions);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log("Changing password:", passwordData);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleTerminateSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
  };

  const handleTerminateAllSessions = () => {
    setSessions((prev) => prev.filter((session) => session.current));
  };

  const getActivityIcon = (type: string, status: string) => {
    if (status === "warning") return AlertTriangle;
    if (type === "login") return Shield;
    if (type === "password_change") return Key;
    return CheckCircle;
  };

  const getActivityColor = (status: string) => {
    if (status === "warning") return "text-yellow-600";
    if (status === "success") return "text-green-600";
    return "text-blue-600";
  };

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

          <Tabs defaultValue="password" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Password Management */}
            <TabsContent value="password">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      Change Password
                    </VVCardTitle>
                    <p className="text-muted-foreground">
                      Update your password to keep your account secure
                    </p>
                  </VVCardHeader>
                  <VVCardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <VVInput
                          label="Current Password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter current password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <div className="relative">
                        <VVInput
                          label="New Password"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter new password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <div className="relative">
                        <VVInput
                          label="Confirm New Password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          placeholder="Confirm new password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">
                        Password Requirements:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Contains uppercase and lowercase letters</li>
                        <li>• Contains at least one number</li>
                        <li>• Contains at least one special character</li>
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <VVButton onClick={handlePasswordChange}>
                        <Save className="mr-2 h-4 w-4" />
                        Update Password
                      </VVButton>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Preferences
                    </VVCardTitle>
                    <p className="text-muted-foreground">
                      Configure your account security settings
                    </p>
                  </VVCardHeader>
                  <VVCardContent className="space-y-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            <h4 className="font-medium">
                              Two-Factor Authentication
                            </h4>
                            <VVBadge variant="secondary">Recommended</VVBadge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) =>
                            handleSettingChange("twoFactorAuth", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Login Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone logs into your account
                          </p>
                        </div>
                        <Switch
                          checked={settings.loginNotifications}
                          onCheckedChange={(checked) =>
                            handleSettingChange("loginNotifications", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Session Timeout</h4>
                          <p className="text-sm text-muted-foreground">
                            Automatically log out after 30 minutes of inactivity
                          </p>
                        </div>
                        <Switch
                          checked={settings.sessionTimeout}
                          onCheckedChange={(checked) =>
                            handleSettingChange("sessionTimeout", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Device Tracking</h4>
                          <p className="text-sm text-muted-foreground">
                            Track devices that access your account
                          </p>
                        </div>
                        <Switch
                          checked={settings.deviceTracking}
                          onCheckedChange={(checked) =>
                            handleSettingChange("deviceTracking", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Password Expiry</h4>
                          <p className="text-sm text-muted-foreground">
                            Require password change every 90 days
                          </p>
                        </div>
                        <Switch
                          checked={settings.passwordExpiry}
                          onCheckedChange={(checked) =>
                            handleSettingChange("passwordExpiry", checked)
                          }
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <VVButton>
                        <Save className="mr-2 h-4 w-4" />
                        Save Security Settings
                      </VVButton>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>

            {/* Active Sessions */}
            <TabsContent value="sessions">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <VVCardTitle className="flex items-center gap-2">
                          <Monitor className="h-5 w-5" />
                          Active Sessions
                        </VVCardTitle>
                        <p className="text-muted-foreground">
                          Manage devices that are currently logged into your
                          account
                        </p>
                      </div>
                      <VVButton
                        variant="outline"
                        onClick={handleTerminateAllSessions}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Terminate All Others
                      </VVButton>
                    </div>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted rounded-lg">
                              <Monitor className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">
                                  {session.device}
                                </h4>
                                {session.current && (
                                  <VVBadge variant="default">Current</VVBadge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {session.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {session.lastActive}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                IP: {session.ip}
                              </p>
                            </div>
                          </div>
                          {!session.current && (
                            <VVButton
                              variant="outline"
                              size="sm"
                              onClick={() => handleTerminateSession(session.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Terminate
                            </VVButton>
                          )}
                        </div>
                      ))}
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>

            {/* Security Activity */}
            <TabsContent value="activity">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Activity
                    </VVCardTitle>
                    <p className="text-muted-foreground">
                      Recent security-related activities on your account
                    </p>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="space-y-4">
                      {securityActivities.map((activity) => {
                        const Icon = getActivityIcon(
                          activity.type,
                          activity.status
                        );
                        const colorClass = getActivityColor(activity.status);

                        return (
                          <div
                            key={activity.id}
                            className="flex items-start gap-4 p-4 border rounded-lg"
                          >
                            <div
                              className={`p-2 rounded-lg ${colorClass} bg-muted`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {activity.description}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {activity.timestamp}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {activity.location}
                                </span>
                              </div>
                            </div>
                            <VVBadge
                              variant={
                                activity.status === "warning"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {activity.status === "warning"
                                ? "Warning"
                                : "Success"}
                            </VVBadge>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 text-center">
                      <VVButton variant="outline" asChild>
                        <Link href="/user/profile/security/activity">
                          View All Activity
                        </Link>
                      </VVButton>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}

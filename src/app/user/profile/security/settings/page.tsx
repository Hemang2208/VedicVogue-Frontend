"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { 
  fetchSecuritySettings, 
  updateSecuritySettings
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
import { VVBadge } from "@/components/ui/vv-badge";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Save, Shield, Smartphone } from "lucide-react";
import toast from "react-hot-toast";

export default function SecuritySettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { settings, loading } = useSelector((state: RootState) => state.userSecurity);
  
  // Local state to track changes
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load security settings when component mounts
    dispatch(fetchSecuritySettings());
  }, [dispatch]);

  // Update local settings when Redux settings change
  useEffect(() => {
    setLocalSettings(settings);
    setHasChanges(false);
  }, [settings]);

  // Check if there are changes between original and local settings
  useEffect(() => {
    const changes = Object.keys(localSettings).some(
      (key) => localSettings[key as keyof typeof localSettings] !== settings[key as keyof typeof settings]
    );
    setHasChanges(changes);
  }, [localSettings, settings]);

  const handleSettingChange = (key: string, value: boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      await dispatch(updateSecuritySettings(localSettings)).unwrap();
      toast.success("Security settings saved successfully");
      setHasChanges(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleResetChanges = () => {
    setLocalSettings(settings);
    setHasChanges(false);
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
                <Link href="/user/profile/security">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold">Security Preferences</h1>
                <p className="text-muted-foreground">
                  Configure your account security settings
                </p>
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
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
                      checked={localSettings.twoFactorAuth}
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
                      checked={localSettings.loginNotifications}
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
                      checked={localSettings.sessionTimeout}
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
                      checked={localSettings.deviceTracking}
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
                      checked={localSettings.passwordExpiry}
                      onCheckedChange={(checked) =>
                        handleSettingChange("passwordExpiry", checked)
                      }
                    />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <VVButton 
                      onClick={handleSaveSettings}
                      disabled={loading.settings || !hasChanges}
                      className={!hasChanges ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {loading.settings ? "Saving..." : "Save Changes"}
                    </VVButton>
                    
                    {hasChanges && (
                      <VVButton 
                        variant="outline"
                        onClick={handleResetChanges}
                        disabled={loading.settings}
                      >
                        Reset
                      </VVButton>
                    )}
                  </div>
                  
                  {!hasChanges && (
                    <p className="text-sm text-muted-foreground mt-2">
                      No changes to save
                    </p>
                  )}
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

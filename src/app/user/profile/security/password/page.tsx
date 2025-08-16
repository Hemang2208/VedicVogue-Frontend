"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { changePassword, clearError } from "@/redux/slice/user/security.slice";
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
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Save, Key, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function PasswordPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.userSecurity);
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Check if there are any changes in the form
  const hasChanges = passwordData.currentPassword.trim() !== "" || 
                     passwordData.newPassword.trim() !== "" || 
                     passwordData.confirmPassword.trim() !== "";

  const isFormValid = passwordData.currentPassword.trim() !== "" &&
                      passwordData.newPassword.trim() !== "" &&
                      passwordData.confirmPassword.trim() !== "" &&
                      passwordData.newPassword === passwordData.confirmPassword &&
                      passwordData.newPassword.length >= 8;

  const handlePasswordChange = async () => {
    // Clear any previous errors
    dispatch(clearError());
    
    // Validation
    if (!passwordData.currentPassword.trim()) {
      toast.error("Please enter your current password");
      return;
    }
    
    if (!passwordData.newPassword.trim()) {
      toast.error("Please enter a new password");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      await dispatch(changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })).unwrap();
      
      // Success
      toast.success("Password changed successfully");
      
      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error as string);
    }
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
                <h1 className="text-3xl font-bold">Password Management</h1>
                <p className="text-muted-foreground">
                  Update your password to keep your account secure
                </p>
              </div>
            </div>
          </motion.div>

          {/* Password Management */}
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
                  <h4 className="font-medium mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Contains uppercase and lowercase letters</li>
                    <li>• Contains at least one number</li>
                    <li>• Contains at least one special character</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <VVButton 
                    onClick={handlePasswordChange}
                    disabled={loading.passwordChange || !isFormValid}
                    className={!isFormValid ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {loading.passwordChange ? "Updating..." : "Update Password"}
                  </VVButton>
                </div>
                
                {!hasChanges && (
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Enter your current password and new password to update
                  </p>
                )}
                
                {hasChanges && !isFormValid && (
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Please complete all fields with valid data to update password
                  </p>
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

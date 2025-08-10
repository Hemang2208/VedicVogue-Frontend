"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import LogoutButton from "@/components/ui/logout-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { VVInput } from "@/components/ui/vv-input";
import { VVBadge } from "@/components/ui/vv-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Edit,
  Save,
  Users,
  LayoutDashboard,
  Download,
  MessageSquare,
  HelpCircle,
  History,
  Bell,
  CreditCard,
  Heart,
  Trash2,
  Link as LinkIcon,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { updateUserProfile } from "@/redux/slice/user/profile.slice";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useUserProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [localProfileData, setLocalProfileData] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "other" as "male" | "female" | "other",
  });

  // Update local state when profile is loaded
  useEffect(() => {
    if (profile) {
      setLocalProfileData({
        fullname: profile.fullname || "",
        email: profile.account?.email || "",
        phone: profile.account?.phone || "",
        gender: profile.account?.gender || "other",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;

    try {
      const updateData = {
        fullname: localProfileData.fullname,
        account: {
          ...profile.account,
          email: localProfileData.email,
          phone: localProfileData.phone,
          gender: localProfileData.gender,
        },
      };

      await dispatch(
        updateUserProfile({
          userId: profile._id,
          profileData: updateData,
        })
      ).unwrap();

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setLocalProfileData((prev) => ({ ...prev, [field]: value }));
  };

  // Helper function to format member since date
  const formatMemberSince = (date: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <VVButton onClick={() => window.location.reload()}>
            Try Again
          </VVButton>
        </div>
      </div>
    );
  }

  // No profile state
  if (!profile) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No profile data found</p>
          <VVButton asChild>
            <Link href="/auth/login">Login</Link>
          </VVButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VVButton variant="ghost" size="icon" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 text-black" />
                  </Link>
                </VVButton>
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                  <p className="text-muted-foreground">
                    Manage your account information and preferences
                  </p>
                </div>
              </div>
              <LogoutButton
                variant="outline"
                size="icon"
                showConfirmDialog={true}
                className="w-32 cursor-pointer"
              >
                <span className="">Logout</span>
              </LogoutButton>
            </div>
          </motion.div>

          <Tabs
            defaultValue="personal"
            className="space-y-16 sm:space-y-6 mb-5"
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences" asChild>
                <Link href="/user/profile/preferences">Preferences</Link>
              </TabsTrigger>
              <TabsTrigger value="address" asChild>
                <Link href="/user/profile/address">Address</Link>
              </TabsTrigger>
              <TabsTrigger value="security" asChild>
                <Link href="/user/profile/security">Security</Link>
              </TabsTrigger>
              <TabsTrigger value="orders" asChild>
                <Link href="/user/profile/orders">Orders</Link>
              </TabsTrigger>
              <TabsTrigger value="subscription" asChild>
                <Link href="/user/profile/subscription">Subscription</Link>
              </TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 mb-5 sm:mb-1">
                      <VVCardTitle>Personal Information</VVCardTitle>
                      <VVButton
                        className="cursor-pointer"
                        variant={isEditing ? "default" : "outline"}
                        onClick={() =>
                          isEditing ? handleSave() : setIsEditing(true)
                        }
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : isEditing ? (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </>
                        )}
                      </VVButton>
                    </div>
                  </VVCardHeader>
                  <VVCardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-5 sm:mb-1">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage
                            src={
                              profile.account?.profilePictureUrl ||
                              (profile.account?.gender === "male"
                                ? "/BOY.svg"
                                : profile.account?.gender === "female"
                                ? "/GIRL.svg"
                                : "https://placehold.co/50x50/svg")
                            }
                          />
                          <AvatarFallback className="text-lg">
                            {profile.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {profile.fullname}
                        </h3>
                        <p className="text-muted-foreground">
                          {profile.account?.email}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <VVBadge
                            variant={
                              profile.status?.isVerified
                                ? "default"
                                : "secondary"
                            }
                          >
                            {profile.status?.isVerified
                              ? "Verified Member"
                              : "Unverified"}
                          </VVBadge>
                          <VVBadge variant="outline">
                            {profile.security?.role || "User"}
                          </VVBadge>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <VVInput
                        label="Full Name"
                        value={localProfileData.fullname}
                        onChange={(e) =>
                          handleInputChange("fullname", e.target.value)
                        }
                        disabled={!isEditing}
                        leftIcon={<User className="h-4 w-4 text-black" />}
                      />

                      <VVInput
                        label="Email"
                        type="email"
                        value={localProfileData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                        leftIcon={<Mail className="h-4 w-4 text-black" />}
                      />

                      <VVInput
                        label="Phone Number"
                        value={localProfileData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                        leftIcon={<Phone className="h-4 w-4 text-black" />}
                      />

                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Gender</label>
                        <div className="flex items-center relative">
                          <Users className="h-4 w-4 text-black absolute left-3" />
                          <select
                            value={localProfileData.gender}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                            disabled={!isEditing}
                            className={`w-full pl-10 h-10 rounded-md border ${
                              !isEditing
                                ? "bg-muted text-muted-foreground"
                                : "bg-background"
                            } text-sm`}
                          >
                            <option value="other">Other</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t">
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">
                          Member Since
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatMemberSince(profile.activity?.memberSince)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {profile.activity?.orders?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Orders
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {profile.activity?.loyaltyPoints || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Loyalty Points
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {profile.activity?.favorites?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Favorite Items
                        </div>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Profile Sections</VVCardTitle>
              </VVCardHeader>
              <VVCardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/dashboard">
                      <LayoutDashboard className="h-6 w-6 mb-2" />
                      <span className="text-sm">Dashboard</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/history">
                      <History className="h-6 w-6 mb-2" />
                      <span className="text-sm">History</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/transaction-history">
                      <CreditCard className="h-6 w-6 mb-2" />
                      <span className="text-sm">Transactions</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/notifications">
                      <Bell className="h-6 w-6 mb-2" />
                      <span className="text-sm">Notifications</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/saved">
                      <Heart className="h-6 w-6 mb-2" />
                      <span className="text-sm">Saved Items</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/downloads">
                      <Download className="h-6 w-6 mb-2" />
                      <span className="text-sm">Downloads</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/referral">
                      <Users className="h-6 w-6 mb-2" />
                      <span className="text-sm">Referral</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/integrations">
                      <LinkIcon className="h-6 w-6 mb-2" />
                      <span className="text-sm">Integrations</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/feedback">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span className="text-sm">Feedback</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/help">
                      <HelpCircle className="h-6 w-6 mb-2" />
                      <span className="text-sm">Help</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col"
                    asChild
                  >
                    <Link href="/user/profile/payment-methods">
                      <CreditCard className="h-6 w-6 mb-2" />
                      <span className="text-sm">Payment</span>
                      <span className="text-sm">Methods</span>
                    </Link>
                  </VVButton>

                  <VVButton
                    variant="outline"
                    className="h-auto p-4 flex-col border-red-200 text-red-600 hover:bg-red-50"
                    asChild
                  >
                    <Link href="/user/profile/account-delete">
                      <Trash2 className="h-6 w-6 mb-2" />
                      <span className="text-sm">Delete</span>
                      <span className="text-sm">Account</span>
                    </Link>
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

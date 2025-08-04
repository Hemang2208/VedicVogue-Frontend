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
// import { VVBadge } from "@/components/ui/vv-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  Download,
  // Trash2,
  // Clock,
  CheckCircle,
  X,
  RefreshCw,
  // Mail,
  // Phone,
  CreditCard,
  Package,
  MessageCircle,
} from "lucide-react";

const deleteReasons = [
  "I don't use the service anymore",
  "I found a better alternative",
  "Too expensive",
  "Privacy concerns",
  "Poor customer service",
  "Technical issues",
  "Account security concerns",
  "Other",
];

const accountData = {
  orders: 45,
  activeSubscriptions: 1,
  savedAddresses: 3,
  paymentMethods: 2,
  supportTickets: 5,
  accountValue: 2499,
  memberSince: "January 2024",
};

export default function AccountDeletePage() {
  const [step, setStep] = useState(1);
  const [deleteReason, setDeleteReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [dataDownloaded, setDataDownloaded] = useState(false);
  const [subscriptionsCancelled, setSubscriptionsCancelled] = useState(false);
  const [understandConsequences, setUnderstandConsequences] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  const handleDataDownload = async () => {
    setLoading(true);
    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDataDownloaded(true);
    setLoading(false);
    alert(
      "Your data has been prepared for download. Check your email for the download link."
    );
  };

  const handleCancelSubscriptions = async () => {
    setLoading(true);
    // Simulate cancellation process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubscriptionsCancelled(true);
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    // Simulate account deletion process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);
    // In a real app, this would redirect to a goodbye page or logout
    alert(
      "Your account has been scheduled for deletion. You will receive a confirmation email shortly."
    );
  };

  const canProceedToStep2 = dataDownloaded && subscriptionsCancelled;
  const canProceedToStep3 = deleteReason && understandConsequences;
  const canDeleteAccount = confirmText === "DELETE MY ACCOUNT";

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
                <h1 className="text-3xl font-bold text-red-600 flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8" />
                  Delete Account
                </h1>
                <p className="text-muted-foreground">
                  Permanently delete your VedicVogue account and all associated
                  data
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNumber
                        ? "bg-red-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-24 h-1 mx-2 ${
                        step > stepNumber ? "bg-red-600" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Prepare Account</span>
              <span>Confirm Deletion</span>
              <span>Final Confirmation</span>
            </div>
          </motion.div>

          {/* Step 1: Prepare Account */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Account Overview */}
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Your Account Overview
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {accountData.orders}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Total Orders
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        ₹{accountData.accountValue}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Account Value
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {accountData.memberSince}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Member Since
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800 mb-1">
                          What happens when you delete your account?
                        </h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>
                            • All your order history will be permanently deleted
                          </li>
                          <li>
                            • Your saved addresses and payment methods will be
                            removed
                          </li>
                          <li>• Active subscriptions will be cancelled</li>
                          <li>
                            • You&apos;ll lose access to customer support
                            history
                          </li>
                          <li>• This action cannot be undone</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </VVCardContent>
              </VVCard>

              {/* Data Download */}
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Your Data
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <p className="text-muted-foreground mb-4">
                    Before deleting your account, you can download a copy of
                    your data including order history, preferences, and account
                    information.
                  </p>
                  <VVButton
                    onClick={handleDataDownload}
                    disabled={loading || dataDownloaded}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Preparing Download...
                      </>
                    ) : dataDownloaded ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Data Downloaded
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download My Data
                      </>
                    )}
                  </VVButton>
                </VVCardContent>
              </VVCard>

              {/* Cancel Subscriptions */}
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Cancel Active Subscriptions
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <p className="text-muted-foreground mb-4">
                    You have {accountData.activeSubscriptions} active
                    subscription(s). These must be cancelled before deleting
                    your account.
                  </p>
                  <VVButton
                    onClick={handleCancelSubscriptions}
                    disabled={loading || subscriptionsCancelled}
                    variant="outline"
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Cancelling Subscriptions...
                      </>
                    ) : subscriptionsCancelled ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Subscriptions Cancelled
                      </>
                    ) : (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Cancel All Subscriptions
                      </>
                    )}
                  </VVButton>
                </VVCardContent>
              </VVCard>

              {/* Next Step Button */}
              <div className="flex justify-end">
                <VVButton
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Continue to Deletion
                </VVButton>
              </div>
            </motion.div>
          )}

          {/* Step 2: Confirm Deletion */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Deletion Reason */}
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle>Why are you deleting your account?</VVCardTitle>
                </VVCardHeader>
                <VVCardContent className="space-y-4">
                  <Select value={deleteReason} onValueChange={setDeleteReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {deleteReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div>
                    <Label htmlFor="feedback">
                      Additional Feedback (Optional)
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder="Help us improve by sharing more details..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </VVCardContent>
              </VVCard>

              {/* Consequences Confirmation */}
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle className="text-red-600">
                    Confirm You Understand the Consequences
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="understand"
                        checked={understandConsequences}
                        onCheckedChange={(checked) =>
                          setUnderstandConsequences(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="understand"
                        className="text-sm leading-relaxed"
                      >
                        I understand that deleting my account is permanent and
                        irreversible. All my data, including order history,
                        saved addresses, payment methods, and account
                        preferences will be permanently deleted and cannot be
                        recovered.
                      </Label>
                    </div>
                  </div>
                </VVCardContent>
              </VVCard>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <VVButton variant="outline" onClick={() => setStep(1)}>
                  Back
                </VVButton>
                <VVButton
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Proceed to Final Step
                </VVButton>
              </div>
            </motion.div>
          )}

          {/* Step 3: Final Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Final Warning */}
              <VVCard className="border-red-200">
                <VVCardHeader>
                  <VVCardTitle className="text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Final Confirmation Required
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">
                        This is your last chance to reconsider
                      </h4>
                      <p className="text-sm text-red-700">
                        Once you confirm, your account and all associated data
                        will be permanently deleted within 24 hours. This action
                        cannot be undone.
                      </p>
                    </div>

                    <div>
                      <Label
                        htmlFor="confirm-text"
                        className="text-sm font-medium"
                      >
                        Type &quot;DELETE MY ACCOUNT&quot; to confirm:
                      </Label>
                      <VVInput
                        id="confirm-text"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder="DELETE MY ACCOUNT"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </VVCardContent>
              </VVCard>

              {/* Alternative Options */}
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle>Consider These Alternatives</VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <VVButton
                      variant="outline"
                      className="h-auto p-4 flex-col"
                      asChild
                    >
                      <Link href="/user/profile/security">
                        <Shield className="h-6 w-6 mb-2" />
                        <span className="font-medium">
                          Deactivate Temporarily
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          Hide your account without deleting data
                        </span>
                      </Link>
                    </VVButton>
                    <VVButton
                      variant="outline"
                      className="h-auto p-4 flex-col"
                      asChild
                    >
                      <Link href="/user/profile/help">
                        <MessageCircle className="h-6 w-6 mb-2" />
                        <span className="font-medium">Contact Support</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          Let us help resolve your concerns
                        </span>
                      </Link>
                    </VVButton>
                  </div>
                </VVCardContent>
              </VVCard>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <VVButton variant="outline" onClick={() => setStep(2)}>
                  Back
                </VVButton>

                <AlertDialog
                  open={showFinalConfirm}
                  onOpenChange={setShowFinalConfirm}
                >
                  <AlertDialogTrigger asChild>
                    <VVButton
                      disabled={!canDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete My Account
                    </VVButton>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-600">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Yes, delete my account"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

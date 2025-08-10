"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { VVButton } from "@/components/ui/vv-button";
import { toast } from "react-hot-toast";
import { clearTokens } from "@/utils/tokenManager";

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [logoutError, setLogoutError] = useState(false);
  const { logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        setIsLoggingOut(true);
        setLogoutError(false);

        // Perform logout with backend call
        await logout(true);

        setLogoutSuccess(true);
        toast.success("Logged out successfully");
      } catch (error) {
        console.error("Logout error:", error);
        setLogoutError(true);

        // Clear tokens locally even if backend logout fails
        clearTokens();
        toast.error(
          "Network error during logout, but you have been logged out locally"
        );
      } finally {
        setIsLoggingOut(false);
      }
    };

    // Wait for auth context to load
    if (isLoading) {
      return;
    }

    // Only perform logout if user is authenticated
    if (isAuthenticated) {
      performLogout();
    }
  }, [logout, isAuthenticated, isLoading, router]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  // Show loading screen while auth context is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-8 text-center shadow-xl"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Loading...
            </h1>
            <p className="text-muted-foreground mb-8">
              Please wait while we prepare your logout.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-8 text-center shadow-xl"
        >
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={isLoggingOut ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: isLoggingOut ? 1 : 0.3,
              repeat: isLoggingOut ? Infinity : 0,
              ease: "linear",
            }}
          >
            {logoutSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-green-500/10 p-4 rounded-full"
              >
                <CheckCircle className="h-12 w-12 text-green-500" />
              </motion.div>
            ) : logoutError ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-orange-500/10 p-4 rounded-full"
              >
                <AlertTriangle className="h-12 w-12 text-orange-500" />
              </motion.div>
            ) : isLoggingOut ? (
              <div className="bg-primary/10 p-4 rounded-full">
                <Loader2 className="h-12 w-12 text-primary" />
              </div>
            ) : (
              <div className="bg-primary/10 p-4 rounded-full">
                <LogOut className="h-12 w-12 text-primary" />
              </div>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-foreground mb-4"
          >
            {logoutSuccess
              ? "Logged Out Successfully"
              : logoutError
              ? "Logout Warning"
              : isLoggingOut
              ? "Logging Out..."
              : "Logout"}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mb-8"
          >
            {logoutSuccess
              ? "You have been successfully logged out."
              : logoutError
              ? "There was a network issue, but you have been logged out locally."
              : isLoggingOut
              ? "Please wait while we securely log you out of your account."
              : "You are being logged out of your account."}
          </motion.p>

          {/* Progress bar for logging out */}
          {isLoggingOut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full bg-muted/50 rounded-full h-2 mb-6"
            >
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          )}

          {/* Action buttons */}
          {(logoutSuccess || logoutError) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <VVButton
                onClick={handleGoHome}
                className="w-full cursor-pointer"
                size="lg"
              >
                Go to Homepage Now
              </VVButton>

              <VVButton
                onClick={handleSignIn}
                variant="outline"
                className="w-full cursor-pointer"
                size="lg"
              >
                Sign In Again
              </VVButton>
            </motion.div>
          )}

          {/* Security notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 pt-4 border-t border-border/30"
          >
            <p className="text-xs text-muted-foreground">
              {logoutSuccess
                ? "For your security, all active sessions have been terminated."
                : logoutError
                ? "Your local session has been cleared for security."
                : "Securing your account..."}
            </p>
          </motion.div>
        </motion.div>

        {/* Additional information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Thank you for using Vedic Vogue. We look forward to seeing you
            again!
          </p>
        </motion.div>
      </div>
    </div>
  );
}

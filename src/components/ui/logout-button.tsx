"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { VVButton } from "@/components/ui/vv-button";
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
import { toast } from "react-hot-toast";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  showConfirmDialog?: boolean;
  redirectTo?: string;
  children?: React.ReactNode;
}

export function LogoutButton({
  variant = "outline",
  size = "default",
  className,
  showIcon = true,
  showConfirmDialog = true,
  redirectTo = "/logout",
  children,
}: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (!showConfirmDialog) {
      await performLogout();
      return;
    }
  };

  const performLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Use logout page for better UX
      if (redirectTo === "/logout") {
        router.push("/user/logout");
      } else {
        // Direct logout without page
        await logout(true);
        toast.success("Logged out successfully");
        router.push(redirectTo);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const LogoutButtonContent = () => (
    <>
      {isLoggingOut ? (
        <Loader2
          className={showIcon && !children ? "h-4 w-4 mr-2" : "h-4 w-4"}
        />
      ) : showIcon ? (
        <LogOut className={!children ? "h-4 w-4" : "h-4 w-4 mr-2"} />
      ) : null}
      {children || (isLoggingOut ? "Logging out..." : "Logout")}
    </>
  );

  if (showConfirmDialog) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <VVButton
            variant={variant}
            size={size}
            className={className}
            disabled={isLoggingOut}
          >
            <LogoutButtonContent />
          </VVButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will end your current session and you&apos;ll need to sign in
              again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={performLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <VVButton
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <LogoutButtonContent />
    </VVButton>
  );
}

export default LogoutButton;

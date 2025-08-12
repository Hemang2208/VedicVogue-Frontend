"use client";

import { useState } from "react";
import { VVButton } from "@/components/ui/vv-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import {
  sendVerificationOTP,
  verifyEmailOTP,
} from "@/services/emailVerification.service";
import toast from "react-hot-toast";

interface EmailVerificationPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
  onVerificationSuccess: () => void;
}

export function EmailVerificationPopup({
  open,
  onOpenChange,
  userEmail,
  onVerificationSuccess,
}: EmailVerificationPopupProps) {
  const [step, setStep] = useState<"send" | "verify">("send");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendOTP = async () => {
    setLoading(true);

    try {
      await sendVerificationOTP(userEmail);

      toast.success(`A 6-digit verification code has been sent to ${userEmail}`, {
        duration: 4000,
      });

      setStep("verify");
      setCountdown(60); // 60 seconds countdown

      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Failed to Send Code: ${message}`, {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit verification code", {
        duration: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      await verifyEmailOTP(userEmail, otp);

      toast.success("Email Verified Successfully! Your email address has been verified.", {
        duration: 4000,
      });

      onVerificationSuccess();
      onOpenChange(false);

      // Reset state
      setStep("send");
      setOtp("");
      setCountdown(0);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid or expired code";
      toast.error(`Verification Failed: ${message}`, {
        duration: 4000,
      });
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtp("");
    await handleSendOTP();
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep("send");
    setOtp("");
    setCountdown(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Verify Your Email
          </DialogTitle>
          <DialogDescription>
            {step === "send"
              ? "Verify your email address to complete your account setup"
              : "Enter the 6-digit code sent to your email"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === "send" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{userEmail}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                We&apos;ll send a 6-digit verification code to this email
                address.
              </p>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Code sent to: <span className="font-medium">{userEmail}</span>
                </p>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    disabled={loading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {countdown > 0 && (
                  <p className="text-xs text-muted-foreground cursor-pointer">
                    Resend code in {countdown}s
                  </p>
                )}

                {countdown === 0 && (
                  <VVButton
                    variant="link"
                    size="sm"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-xs"
                  >
                    Didn&apos;t receive the code? Resend
                  </VVButton>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <VVButton
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="order-2 sm:order-1 cursor-pointer"
          >
            Cancel
          </VVButton>

          {step === "send" && (
            <VVButton
              onClick={handleSendOTP}
              disabled={loading}
              className="order-1 sm:order-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Code
                </>
              )}
            </VVButton>
          )}

          {step === "verify" && (
            <VVButton
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="order-1 sm:order-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify Email
                </>
              )}
            </VVButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { encrypt } from "@/utils/crypto";

interface ForgotPasswordStep {
  step: "email" | "otp" | "password" | "success";
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep["step"]>("email");
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Error states
  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Validate email
  const validateEmail = () => {
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate OTP
  const validateOTP = () => {
    const newErrors: typeof errors = {};
    
    if (!otp) {
      newErrors.otp = "OTP is required";
    } else if (otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate passwords
  const validatePasswords = () => {
    const newErrors: typeof errors = {};
    
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP to email
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;
    
    setIsLoading(true);
    
    try {
      const encryptedData = encrypt(JSON.stringify({ email }));
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const response = await fetch(`${apiUrl}/api/forgot-password/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("OTP sent to your email address");
        setCurrentStep("otp");
      } else {
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOTP()) return;
    
    setIsLoading(true);
    
    try {
      const encryptedData = encrypt(JSON.stringify({ email, otp }));
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const response = await fetch(`${apiUrl}/api/forgot-password/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("OTP verified successfully");
        setCurrentStep("password");
      } else {
        toast.error(result.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;
    
    setIsLoading(true);
    
    try {
      const encryptedData = encrypt(JSON.stringify({ 
        email, 
        otp, 
        newPassword, 
        confirmPassword 
      }));
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const response = await fetch(`${apiUrl}/api/forgot-password/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Password reset successfully!");
        setCurrentStep("success");
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render email step
  const renderEmailStep = () => (
    <form onSubmit={handleSendOTP} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </Button>
      
      <div className="text-center">
        <Link
          href="/sign-in"
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Sign In
        </Link>
      </div>
    </form>
  );

  // Render OTP step
  const renderOTPStep = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a 6-digit OTP to <strong>{email}</strong>
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="otp">Enter OTP</Label>
        <Input
          id="otp"
          type="text"
          placeholder="000000"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className={`text-center text-lg tracking-widest ${errors.otp ? "border-red-500" : ""}`}
          disabled={isLoading}
          maxLength={6}
        />
        {errors.otp && (
          <p className="text-sm text-red-600">{errors.otp}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>
      
      <div className="text-center space-y-2">
        <button
          type="button"
          onClick={() => setCurrentStep("email")}
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          disabled={isLoading}
        >
          <ArrowLeft className="h-3 w-3" />
          Change Email
        </button>
        
        <div>
          <button
            type="button"
            onClick={handleSendOTP}
            className="text-sm text-muted-foreground hover:text-primary"
            disabled={isLoading}
          >
            Didn&apos;t receive OTP? Resend
          </button>
        </div>
      </div>
    </form>
  );

  // Render password reset step
  const renderPasswordStep = () => (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`pl-10 ${errors.newPassword ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
        </div>
        {errors.newPassword && (
          <p className="text-sm text-red-600">{errors.newPassword}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
        {isLoading ? "Resetting Password..." : "Reset Password"}
      </Button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setCurrentStep("otp")}
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          disabled={isLoading}
        >
          <ArrowLeft className="h-3 w-3" />
          Back to OTP
        </button>
      </div>
    </form>
  );

  // Render success step
  const renderSuccessStep = () => (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Password Reset Successful!
        </h3>
        <p className="text-muted-foreground mb-6">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
      </div>
      
      <Button 
        onClick={() => router.push("/sign-in")} 
        className="w-full cursor-pointer"
      >
        Go to Sign In
      </Button>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return "Forgot Password";
      case "otp":
        return "Verify OTP";
      case "password":
        return "Set New Password";
      case "success":
        return "Success!";
      default:
        return "Forgot Password";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "email":
        return "Enter your email address to receive an OTP";
      case "otp":
        return "Enter the OTP sent to your email";
      case "password":
        return "Enter your new password";
      case "success":
        return "Your password has been reset successfully";
      default:
        return "Reset your password";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="min-h-screen flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {getStepTitle()}
            </CardTitle>
            <p className="text-muted-foreground">
              {getStepDescription()}
            </p>
          </CardHeader>
          
          <CardContent>
            {currentStep === "email" && renderEmailStep()}
            {currentStep === "otp" && renderOTPStep()}
            {currentStep === "password" && renderPasswordStep()}
            {currentStep === "success" && renderSuccessStep()}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}

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
import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  // Facebook, Chrome
} from "lucide-react";
import { collectClientData, UserData } from "@/utils/collectData";
import toast from "react-hot-toast";
import { encrypt, decrypt } from "@/utils/crypto";
import { setTokens } from "@/utils/tokenManager";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must include at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must include at least one number";
    } else if (!/[@$!%*?&]/.test(password)) {
      newErrors.password =
        "Password must include at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const clientData: UserData = await collectClientData();

      const loginData = {
        email: email.toLowerCase().trim(),
        password: password,
        rememberMe: rememberMe,
        clientData: clientData,
      };

      const encryptedData = encrypt(JSON.stringify(loginData));

      const URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.message || "";

        // Check for specific account status issues first
        if (errorMessage.includes("Your account is banned")) {
          toast.error(
            "Your account is banned. Kindly talk to Support on /contact to get your account updated."
          );
          return;
        } else if (errorMessage.includes("Your account is inactive")) {
          toast.error(
            "Your account is inactive. Kindly talk to Support on /contact to get your account updated."
          );
          return;
        } else if (errorMessage.includes("Your account is deleted")) {
          toast.error(
            "Your account is deleted. Kindly talk to Support on /contact to get your account updated."
          );
          return;
        } else if (
          errorMessage.includes("Kindly talk to Support on /contact")
        ) {
          // Fallback for any other support-related messages
          toast.error(errorMessage);
          return;
        }

        // Handle other HTTP status codes
        if (response.status === 401) {
          toast.error("Invalid email or password. Please try again.");
        } else if (response.status === 403) {
          toast.error("Account access denied. Please contact support.");
        } else if (response.status === 400) {
          toast.error("Please check your email and password format.");
        } else {
          toast.error(errorMessage || "Login failed. Please try again.");
        }
        return;
      }

      const decryptedResponse = JSON.parse(decrypt(responseData.data));
      const { user, tokens } = decryptedResponse;

      setTokens(
        {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user: user,
        },
        rememberMe
      );

      toast.success("Login successful! Redirecting to your profile...");
      router.push("/user/profile");
    } catch (error) {
      console.error("Login error:", error);

      // Handle different types of errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
      } else if (error instanceof Error) {
        // If it's an error we threw from our response handling, show that message
        if (error.message.includes("Kindly talk to Support")) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSocialLogin = (provider: string) => {
  //   console.log(`Login with ${provider}`);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navigation />

      <div className="container px-4 py-6 sm:py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center px-4 sm:px-6 py-6 sm:py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                Sign in to your VedicVogue Kitchen account
              </p>
            </CardHeader>

            <CardContent className="space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
              {/* Social Login Buttons */}
              {/* <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-11 border-2 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                  onClick={() => handleSocialLogin("google")}
                >
                  <Chrome className="h-4 w-4 mr-2" />
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Continue with Facebook
                </Button>
              </div> */}

              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-muted-foreground font-medium">
                    Or continue with email
                  </span>
                </div>
              </div> */}

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
                        errors.email
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
                        errors.password
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200"
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute cursor-pointer right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                      className="border-2 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label htmlFor="remember" className="text-sm font-medium">
                      Remember me
                    </Label>
                  </div>

                  <Link
                    href="forgot-password"
                    className="text-sm text-orange-600 hover:text-orange-700 underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="cursor-pointer w-full h-12 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="text-center text-sm border-t pt-6">
                <span className="text-muted-foreground">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  href="sign-up"
                  className="text-orange-600 hover:text-orange-700 underline font-semibold"
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

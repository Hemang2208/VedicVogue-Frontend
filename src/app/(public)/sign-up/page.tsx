"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
import {
  // Facebook,
  // Chrome,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building,
  MapIcon,
  Hash,
} from "lucide-react";
import { collectClientData, UserData } from "@/utils/collectData";
import toast from "react-hot-toast";
import { encrypt } from "@/utils/crypto";
import { useRouter } from "next/navigation";

interface StepOneData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface StepTwoData {
  label: string;
  houseNumber: string;
  street: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [stepOneData, setStepOneData] = useState<StepOneData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    label: "Home",
    houseNumber: "",
    street: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStepOne = () => {
    const newErrors: Record<string, string> = {};

    if (!stepOneData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (stepOneData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!stepOneData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(stepOneData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!stepOneData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(stepOneData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!stepOneData.password) {
      newErrors.password = "Password is required";
    } else if (stepOneData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(stepOneData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (stepOneData.password !== stepOneData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors: Record<string, string> = {};

    if (!stepTwoData.houseNumber.trim()) {
      newErrors.houseNumber = "House number is required";
    }

    if (!stepTwoData.street.trim()) {
      newErrors.street = "Street is required";
    }

    if (!stepTwoData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!stepTwoData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!stepTwoData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!stepTwoData.zipcode) {
      newErrors.zipcode = "Pin code is required";
    } else if (!/^\d{6}$/.test(stepTwoData.zipcode.replace(/\D/g, ""))) {
      newErrors.zipcode = "Please enter a valid 6-digit pin code";
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepOneChange = (field: keyof StepOneData, value: string) => {
    setStepOneData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleStepTwoChange = (field: keyof StepTwoData, value: string) => {
    setStepTwoData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNextStep = () => {
    if (validateStepOne()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const generateUserId = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const YYYY = now.getFullYear();
    const MM = pad(now.getMonth() + 1);
    const DD = pad(now.getDate());
    const HH = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());
    const randomNum = Math.floor(Math.random() * 100000) // 5-digit random number
      .toString()
      .padStart(6, "0"); // 6-digit random number

    return `USER${YYYY}${MM}${DD}${HH}${mm}${ss}${randomNum}`;
  };

  const ID: string = generateUserId();

  const convertToUserModel = (
    stepOne: StepOneData,
    stepTwo: StepTwoData,
    clientData: UserData
  ) => {
    return {
      userId: ID,
      fullname: stepOne.fullName.trim(),
      account: {
        email: stepOne.email.toLowerCase().trim(),
        phone: stepOne.phone.toLowerCase().trim(),
        password: stepOne.password,
        gender: "other",
        profilePictureUrl: "",
      },
      security: {
        role: "user",
        ipAddress: clientData.ip,
        tokens: [],
      },
      addresses: [
        {
          label: stepTwo.label,
          houseNumber: stepTwo.houseNumber,
          street: stepTwo.street,
          area: stepTwo.area,
          landmark: stepTwo.landmark || "",
          city: stepTwo.city,
          state: stepTwo.state,
          zipcode: stepTwo.zipcode,
          country: stepTwo.country,
        },
      ],
      activity: {
        memberSince: new Date().toISOString(),
        favorites: [],
        cart: [],
        orders: [],
        contacts: [],
        loyaltyPoints: 0,
      },
      preferences: {
        meals: {
          type: "none",
          spice: "low",
          restrictions: "none",
          message: "",
        },
        notifications: {
          order: false,
          reminders: false,
          menu: false,
          promotions: false,
        },
        paymentMethod: [],
      },
      additionalInfo: {
        coordinates: {
          latitude: clientData.geo.latitude ?? undefined,
          longitude: clientData.geo.longitude ?? undefined,
        },
        timezone: clientData.geo.timezone || "",
        isp: clientData.geo.isp || "",
        org: clientData.geo.org || "",
        session: {
          timestamp: clientData.session.timestamp,
          sessionId: clientData.session.sessionId,
          referrer: clientData.session.referrer,
          currentUrl: clientData.session.currentUrl,
          timeZone: clientData.session.timeZone,
          timeZoneOffset: clientData.session.timeZoneOffset,
          language: clientData.session.language,
          languages: clientData.session.languages,
          visitDuration: clientData.session.visitDuration || 0,
          pageLoadTime: clientData.session.pageLoadTime || 0,
        },
        browser: {
          name: clientData.browser.name,
          version: clientData.browser.version,
          engine: clientData.browser.engine,
          engineVersion: clientData.browser.engineVersion,
          vendor: clientData.browser.vendor,
          mobile: clientData.browser.mobile,
          tablet: clientData.browser.tablet,
          desktop: clientData.browser.desktop,
        },
        headers: {
          userAgent: clientData.headers.userAgent,
          accept: clientData.headers.accept,
          acceptLanguage: clientData.headers.acceptLanguage,
          acceptEncoding: clientData.headers.acceptEncoding,
          secChUa: clientData.headers.secChUa || "",
          secChUaPlatform: clientData.headers.secChUaPlatform || "",
          secChUaMobile: clientData.headers.secChUaMobile || "",
          secFetchSite: clientData.headers.secFetchSite || "",
          secFetchMode: clientData.headers.secFetchMode || "",
          secFetchDest: clientData.headers.secFetchDest || "",
        },
      },
      status: {
        ban: {
          isBanned: false,
          banReason: "",
          bannedAt: null,
        },
        isVerified: false,
        isActive: true,
        isDeleted: false,
        deletedAt: null,
      },
      lastLogin: new Date().toISOString(),
      lastProfileUpdate: new Date().toISOString(),
      lastPasswordChange: new Date().toISOString(),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStepTwo()) return;

    setIsLoading(true);

    try {
      const clientDataResult = await collectClientData();
      const userData = convertToUserModel(
        stepOneData,
        stepTwoData,
        clientDataResult
      );

      const encryptedData = encrypt(JSON.stringify(userData));

      const URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${URL}/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error(responseData.message || "Email already in use");
          toast.error("Kindly Login");
        } else if (response.status === 410) {
          toast.error(responseData.message || "Phone Number is already used");
          toast.error("Kindly use different Phone Number");
        } else {
          console.error("Server Error Response:", responseData);
          toast.error(responseData.message || "Failed to create account");
        }
        return;
      }

      toast.success("Account created successfully! Please sign in.");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error("Error creating account:", error);
    } finally {
      setIsLoading(false);
      setStepOneData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setStepTwoData({
        label: "Home",
        houseNumber: "",
        street: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        zipcode: "",
        country: "India",
      });
      setCurrentStep(1);
      setAcceptTerms(false);
    }
  };

  // const handleSocialSignUp = (provider: string) => {
  //   console.log(`Sign up with ${provider}`);
  //   // In a real app, handle social sign up here
  // };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            currentStep === 1
              ? "bg-orange-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          1
        </div>
        <div
          className={`h-1 w-12 ${
            currentStep === 2 ? "bg-orange-500" : "bg-gray-300"
          }`}
        />
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            currentStep === 2
              ? "bg-orange-500 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          2
        </div>
      </div>
    </div>
  );

  const renderStepOne = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNextStep();
      }}
      className="space-y-5"
    >
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            placeholder="Enter your full name"
            required
            value={stepOneData.fullName}
            onChange={(e) => handleStepOneChange("fullName", e.target.value)}
            className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
              errors.fullName ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
        </div>
        {errors.fullName && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
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
            required
            value={stepOneData.email}
            onChange={(e) => handleStepOneChange("email", e.target.value)}
            className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
              errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
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

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            required
            value={stepOneData.phone}
            onChange={(e) => handleStepOneChange("phone", e.target.value)}
            className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
              errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.phone}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            required
            value={stepOneData.password}
            onChange={(e) => handleStepOneChange("password", e.target.value)}
            className={`pl-10 pr-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
              errors.password ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
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

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            required
            value={stepOneData.confirmPassword}
            onChange={(e) =>
              handleStepOneChange("confirmPassword", e.target.value)
            }
            className={`pl-10 pr-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
              errors.confirmPassword
                ? "border-red-400 bg-red-50"
                : "border-gray-200"
            }`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="cursor-pointer w-full h-12 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
      >
        Next Step
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );

  const renderStepTwo = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Address Label */}
      <div className="space-y-2">
        <Label htmlFor="label" className="text-sm font-medium">
          Address Label
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="label"
            placeholder="e.g., Home, Work, Other"
            required
            value={stepTwoData.label}
            onChange={(e) => handleStepTwoChange("label", e.target.value)}
            className="pl-10 h-11 border-2 border-gray-200 focus:border-orange-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* House Number & Street */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="houseNumber" className="text-sm font-medium">
            House/Flat Number
          </Label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="houseNumber"
              placeholder="123, A-4"
              required
              value={stepTwoData.houseNumber}
              onChange={(e) =>
                handleStepTwoChange("houseNumber", e.target.value)
              }
              className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
                errors.houseNumber
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200"
              }`}
            />
          </div>
          {errors.houseNumber && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.houseNumber}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="street" className="text-sm font-medium">
            Street
          </Label>
          <div className="relative">
            <MapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="street"
              placeholder="Main Street, MG Road"
              required
              value={stepTwoData.street}
              onChange={(e) => handleStepTwoChange("street", e.target.value)}
              className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
                errors.street ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
          </div>
          {errors.street && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.street}
            </p>
          )}
        </div>
      </div>

      {/* Area & Landmark */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="area" className="text-sm font-medium">
            Area
          </Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="area"
              placeholder="Sector 15, Koramangala"
              required
              value={stepTwoData.area}
              onChange={(e) => handleStepTwoChange("area", e.target.value)}
              className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
                errors.area ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
          </div>
          {errors.area && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.area}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="landmark" className="text-sm font-medium">
            Landmark (Optional)
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="landmark"
              placeholder="Near Metro Station"
              value={stepTwoData.landmark}
              onChange={(e) => handleStepTwoChange("landmark", e.target.value)}
              className="pl-10 h-11 border-2 border-gray-200 focus:border-orange-400 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* City, State, Country */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium">
            City
          </Label>
          <Input
            id="city"
            placeholder="New Delhi"
            required
            value={stepTwoData.city}
            onChange={(e) => handleStepTwoChange("city", e.target.value)}
            className={`h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
              errors.city ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.city && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.city}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium">
            State
          </Label>
          <Input
            id="state"
            placeholder="Delhi"
            required
            value={stepTwoData.state}
            onChange={(e) => handleStepTwoChange("state", e.target.value)}
            className={`h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
              errors.state ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.state && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.state}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium">
            Country
          </Label>
          <Input
            id="country"
            value={stepTwoData.country}
            required
            onChange={(e) => handleStepTwoChange("country", e.target.value)}
            className="h-11 border-2 border-gray-200 focus:border-orange-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* Zipcode */}
      <div className="space-y-2">
        <Label htmlFor="zipcode" className="text-sm font-medium">
          Pin Code
        </Label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="zipcode"
            placeholder="110001"
            required
            value={stepTwoData.zipcode}
            onChange={(e) => handleStepTwoChange("zipcode", e.target.value)}
            className={`pl-10 h-11 border-2 transition-all duration-200 focus:border-orange-400 ${
              errors.zipcode ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
        </div>
        {errors.zipcode && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.zipcode}
          </p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-2">
        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            required
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            className="mt-1 border-2 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
          />
          <Label
            htmlFor="terms"
            className="text-sm leading-relaxed text-gray-700"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-orange-600 hover:text-orange-700 underline font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-orange-600 hover:text-orange-700 underline font-medium"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.terms}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevStep}
          className="flex-1 h-12 cursor-pointer border-2 border-gray-300 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          type="submit"
          className="flex-1 h-12 cursor-pointer bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navigation />

      <div className="container px-4 py-6 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center px-4 sm:px-6 py-6 sm:py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                {currentStep === 1
                  ? "Create Your Account"
                  : "Complete Your Profile"}
              </CardTitle>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                {currentStep === 1
                  ? "Enter your basic details to get started"
                  : "Add your address for meal delivery"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
              {renderStepIndicator()}

              {/* Social Sign Up Buttons - Only on Step 1 */}
              {currentStep === 1 && (
                <>
                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleSocialSignUp("google")}
                      className="w-full h-11 border-2 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                    >
                      <Chrome className="h-4 w-4 mr-2" />
                      Continue with Google
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleSocialSignUp("facebook")}
                      className="w-full h-11 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
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
                        Or sign up with email
                      </span>
                    </div>
                  </div> */}
                </>
              )}

              {/* Render Current Step */}
              {currentStep === 1 ? renderStepOne() : renderStepTwo()}

              <div className="text-center text-sm border-t pt-6">
                <span className="text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <Link
                  href="/sign-in"
                  className="text-orange-600 hover:text-orange-700 underline font-semibold"
                >
                  Sign in
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

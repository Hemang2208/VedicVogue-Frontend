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
import { VVBadge } from "@/components/ui/vv-badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Star,
  Shield,
  Smartphone,
  Wallet,
  Building,
  CheckCircle,
  AlertCircle,
  Calendar,
  Lock,
  Save,
  // X,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "wallet" | "bank";
  name: string;
  details: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
  isVerified: boolean;
  addedDate: string;
  provider: string;
  icon: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    name: "Visa Credit Card",
    details: "•••• •••• •••• 4242",
    lastFour: "4242",
    expiryDate: "12/26",
    isDefault: true,
    isVerified: true,
    addedDate: "2024-01-15",
    provider: "Visa",
    icon: "💳",
  },
  {
    id: "2",
    type: "upi",
    name: "Google Pay",
    details: "priya.sharma@okaxis",
    isDefault: false,
    isVerified: true,
    addedDate: "2024-01-10",
    provider: "Google Pay",
    icon: "📱",
  },
  {
    id: "3",
    type: "wallet",
    name: "Paytm Wallet",
    details: "+91 98765 43210",
    isDefault: false,
    isVerified: true,
    addedDate: "2024-01-08",
    provider: "Paytm",
    icon: "💰",
  },
  {
    id: "4",
    type: "card",
    name: "Mastercard Debit",
    details: "•••• •••• •••• 8888",
    lastFour: "8888",
    expiryDate: "08/25",
    isDefault: false,
    isVerified: false,
    addedDate: "2024-01-05",
    provider: "Mastercard",
    icon: "💳",
  },
];

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [newMethodType, setNewMethodType] = useState<
    "card" | "upi" | "wallet" | "bank"
  >("card");
  const [loading, setLoading] = useState<string | null>(null);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [walletNumber, setWalletNumber] = useState("");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "card":
        return CreditCard;
      case "upi":
        return Smartphone;
      case "wallet":
        return Wallet;
      case "bank":
        return Building;
      default:
        return CreditCard;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "card":
        return "bg-blue-100 text-blue-800";
      case "upi":
        return "bg-green-100 text-green-800";
      case "wallet":
        return "bg-purple-100 text-purple-800";
      case "bank":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSetDefault = async (id: string) => {
    setLoading(id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );

    setLoading(null);
  };

  const handleDeleteMethod = async (id: string) => {
    setLoading(id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPaymentMethods((methods) =>
      methods.filter((method) => method.id !== id)
    );

    setLoading(null);
  };

  const handleVerifyMethod = async (id: string) => {
    setLoading(id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPaymentMethods((methods) =>
      methods.map((method) =>
        method.id === id ? { ...method, isVerified: true } : method
      )
    );

    setLoading(null);
  };

  const resetForm = () => {
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardholderName("");
    setUpiId("");
    setWalletNumber("");
  };

  const handleAddPaymentMethod = async () => {
    setLoading("add");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let newMethod: PaymentMethod;

    switch (newMethodType) {
      case "card":
        newMethod = {
          id: Date.now().toString(),
          type: "card",
          name: cardholderName || "Credit Card",
          details: `•••• •••• •••• ${cardNumber.slice(-4)}`,
          lastFour: cardNumber.slice(-4),
          expiryDate,
          isDefault: paymentMethods.length === 0,
          isVerified: false,
          addedDate: new Date().toISOString().split("T")[0],
          provider: cardNumber.startsWith("4") ? "Visa" : "Mastercard",
          icon: "💳",
        };
        break;
      case "upi":
        newMethod = {
          id: Date.now().toString(),
          type: "upi",
          name: "UPI ID",
          details: upiId,
          isDefault: paymentMethods.length === 0,
          isVerified: false,
          addedDate: new Date().toISOString().split("T")[0],
          provider: "UPI",
          icon: "📱",
        };
        break;
      case "wallet":
        newMethod = {
          id: Date.now().toString(),
          type: "wallet",
          name: "Digital Wallet",
          details: walletNumber,
          isDefault: paymentMethods.length === 0,
          isVerified: false,
          addedDate: new Date().toISOString().split("T")[0],
          provider: "Wallet",
          icon: "💰",
        };
        break;
      default:
        return;
    }

    setPaymentMethods((methods) => [...methods, newMethod]);
    setShowAddDialog(false);
    resetForm();
    setLoading(null);
  };

  const defaultMethod = paymentMethods.find((method) => method.isDefault);
  const verifiedCount = paymentMethods.filter(
    (method) => method.isVerified
  ).length;

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
                <Link href="/user/profile">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <CreditCard className="h-8 w-8" />
                  Payment Methods
                </h1>
                <p className="text-muted-foreground">
                  Manage your saved payment methods and billing information
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {paymentMethods.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Methods</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {verifiedCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
                  <p className="text-sm text-muted-foreground">
                    Default Method
                  </p>
                </VVCardContent>
              </VVCard>
            </div>
          </motion.div>

          {/* Default Payment Method */}
          {defaultMethod && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <VVCard className="border-primary/20 bg-primary/5">
                <VVCardHeader>
                  <VVCardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Default Payment Method
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${getTypeColor(
                        defaultMethod.type
                      )}`}
                    >
                      <span className="text-2xl">{defaultMethod.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{defaultMethod.name}</h3>
                      <p className="text-muted-foreground">
                        {defaultMethod.details}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <VVBadge className={getTypeColor(defaultMethod.type)}>
                          {defaultMethod.type.toUpperCase()}
                        </VVBadge>
                        {defaultMethod.isVerified ? (
                          <VVBadge className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </VVBadge>
                        ) : (
                          <VVBadge className="bg-yellow-100 text-yellow-800">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Unverified
                          </VVBadge>
                        )}
                      </div>
                    </div>
                    {defaultMethod.expiryDate && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Expires</p>
                        <p className="font-medium">
                          {defaultMethod.expiryDate}
                        </p>
                      </div>
                    )}
                  </div>
                </VVCardContent>
              </VVCard>
            </motion.div>
          )}

          {/* Payment Methods List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <VVCard>
              <VVCardHeader>
                <div className="flex items-center justify-between">
                  <VVCardTitle>All Payment Methods</VVCardTitle>
                  <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                    <DialogTrigger asChild>
                      <VVButton>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </VVButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>
                          Choose a payment method type and enter the details.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="method-type">
                            Payment Method Type
                          </Label>
                          <Select
                            value={newMethodType}
                            onValueChange={(
                              value: "card" | "upi" | "wallet" | "bank"
                            ) => setNewMethodType(value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card">
                                Credit/Debit Card
                              </SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="wallet">
                                Digital Wallet
                              </SelectItem>
                              <SelectItem value="bank">Bank Account</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {newMethodType === "card" && (
                          <>
                            <div>
                              <Label htmlFor="cardholder-name">
                                Cardholder Name
                              </Label>
                              <VVInput
                                id="cardholder-name"
                                value={cardholderName}
                                onChange={(e) =>
                                  setCardholderName(e.target.value)
                                }
                                placeholder="John Doe"
                                className="mt-2"
                              />
                            </div>
                            <div>
                              <Label htmlFor="card-number">Card Number</Label>
                              <VVInput
                                id="card-number"
                                value={cardNumber}
                                onChange={(e) =>
                                  setCardNumber(
                                    formatCardNumber(e.target.value)
                                  )
                                }
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                className="mt-2"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry-date">Expiry Date</Label>
                                <VVInput
                                  id="expiry-date"
                                  value={expiryDate}
                                  onChange={(e) =>
                                    setExpiryDate(
                                      formatExpiryDate(e.target.value)
                                    )
                                  }
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  className="mt-2"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <VVInput
                                  id="cvv"
                                  value={cvv}
                                  onChange={(e) =>
                                    setCvv(
                                      e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 4)
                                    )
                                  }
                                  placeholder="123"
                                  maxLength={4}
                                  className="mt-2"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {newMethodType === "upi" && (
                          <div>
                            <Label htmlFor="upi-id">UPI ID</Label>
                            <VVInput
                              id="upi-id"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="yourname@upi"
                              className="mt-2"
                            />
                          </div>
                        )}

                        {newMethodType === "wallet" && (
                          <div>
                            <Label htmlFor="wallet-number">Phone Number</Label>
                            <VVInput
                              id="wallet-number"
                              value={walletNumber}
                              onChange={(e) => setWalletNumber(e.target.value)}
                              placeholder="+91 98765 43210"
                              className="mt-2"
                            />
                          </div>
                        )}
                      </div>

                      <DialogFooter>
                        <VVButton
                          variant="outline"
                          onClick={() => {
                            setShowAddDialog(false);
                            resetForm();
                          }}
                        >
                          Cancel
                        </VVButton>
                        <VVButton
                          onClick={handleAddPaymentMethod}
                          disabled={loading === "add"}
                        >
                          {loading === "add" ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Add Method
                            </>
                          )}
                        </VVButton>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </VVCardHeader>
              <VVCardContent>
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No payment methods
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Add a payment method to start making purchases.
                    </p>
                    <VVButton onClick={() => setShowAddDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Payment Method
                    </VVButton>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => {
                      const TypeIcon = getTypeIcon(method.type);

                      return (
                        <motion.div
                          key={method.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                          {/* Icon */}
                          <div
                            className={`p-3 rounded-lg ${getTypeColor(
                              method.type
                            )}`}
                          >
                            <TypeIcon className="h-6 w-6" />
                          </div>

                          {/* Details */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{method.name}</h3>
                              {method.isDefault && (
                                <VVBadge className="bg-primary text-primary-foreground">
                                  <Star className="mr-1 h-3 w-3" />
                                  Default
                                </VVBadge>
                              )}
                              <VVBadge className={getTypeColor(method.type)}>
                                {method.type.toUpperCase()}
                              </VVBadge>
                              {method.isVerified ? (
                                <VVBadge className="bg-green-100 text-green-800">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Verified
                                </VVBadge>
                              ) : (
                                <VVBadge className="bg-yellow-100 text-yellow-800">
                                  <AlertCircle className="mr-1 h-3 w-3" />
                                  Unverified
                                </VVBadge>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {method.details}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Added{" "}
                                {new Date(
                                  method.addedDate
                                ).toLocaleDateString()}
                              </span>
                              {method.expiryDate && (
                                <span>Expires {method.expiryDate}</span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {!method.isVerified && (
                              <VVButton
                                size="sm"
                                variant="outline"
                                onClick={() => handleVerifyMethod(method.id)}
                                disabled={loading === method.id}
                              >
                                {loading === method.id ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                ) : (
                                  <>
                                    <Shield className="mr-1 h-3 w-3" />
                                    Verify
                                  </>
                                )}
                              </VVButton>
                            )}

                            {!method.isDefault && (
                              <VVButton
                                size="sm"
                                variant="outline"
                                onClick={() => handleSetDefault(method.id)}
                                disabled={loading === method.id}
                              >
                                {loading === method.id ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                ) : (
                                  <>
                                    <Star className="mr-1 h-3 w-3" />
                                    Set Default
                                  </>
                                )}
                              </VVButton>
                            )}

                            <VVButton
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingMethod(method)}
                            >
                              <Edit className="h-4 w-4" />
                            </VVButton>

                            <VVButton
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteMethod(method.id)}
                              disabled={
                                method.isDefault || loading === method.id
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              {loading === method.id ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </VVButton>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <VVCard className="border-blue-200 bg-blue-50">
              <VVCardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Your payment information is secure
                    </h3>
                    <p className="text-sm text-blue-800 mb-3">
                      We use industry-standard encryption to protect your
                      payment data. Your card details are never stored on our
                      servers and are processed through secure payment gateways.
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 256-bit SSL encryption</li>
                      <li>• PCI DSS compliant</li>
                      <li>• Fraud detection and monitoring</li>
                      <li>• Secure tokenization</li>
                    </ul>
                  </div>
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

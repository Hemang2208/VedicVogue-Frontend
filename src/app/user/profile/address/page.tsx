"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Home,
  Building,
  Star,
  Phone,
  Loader2,
} from "lucide-react";
import { useUserAddress } from "@/hooks/useUserAddress";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "react-hot-toast";
import type { FrontendAddress } from "@/redux/slice/user/address.slice";

const addressTypes = [
  {
    id: "home",
    name: "Home",
    icon: Home,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "office",
    name: "Office",
    icon: Building,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "other",
    name: "Other",
    icon: MapPin,
    color: "bg-gray-100 text-gray-800",
  },
];

export default function AddressPage() {
  // Redux hooks for address management
  const {
    addresses,
    loading,
    error,
    handleAddAddress,
    handleUpdateAddress,
    handleRemoveAddress,
    handleSetDefaultAddress,
  } = useUserAddress();

  // Get user profile for default values
  const { profile } = useUserProfile();

  // Local state for UI management
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("addresses");
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{
    isOpen: boolean;
    addressIndex: number | null;
    addressName: string;
  }>({
    isOpen: false,
    addressIndex: null,
    addressName: "",
  });

  // Form state for address input
  const [newAddress, setNewAddress] = useState<Partial<FrontendAddress>>({
    type: "home",
    name: "",
    fullName: profile?.fullname || "",
    phone: profile?.account?.phone || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    isDefault: false,
  });

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      setNewAddress((prev) => ({
        ...prev,
        fullName: profile.fullname || "",
        phone: profile.account?.phone || "",
      }));
    }
  }, [profile]);

  // Validation functions
  const validatePhoneNumber = (phone: string): boolean => {
    // Indian phone number validation: should be 10 digits, can start with country code
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const validatePincode = (pincode: string): boolean => {
    // Indian pincode validation: exactly 6 digits
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };

  const validateName = (name: string): boolean => {
    // Name should contain only letters, spaces, and common punctuation
    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    return nameRegex.test(name) && name.trim().length >= 2;
  };

  const handleSave = async () => {
    try {
      // Comprehensive validation
      if (!newAddress.fullName?.trim()) {
        toast.error("Full name is required");
        return;
      }

      if (!validateName(newAddress.fullName)) {
        toast.error(
          "Please enter a valid full name (letters only, minimum 2 characters)"
        );
        return;
      }

      if (!newAddress.phone?.trim()) {
        toast.error("Phone number is required");
        return;
      }

      if (!validatePhoneNumber(newAddress.phone)) {
        toast.error("Please enter a valid Indian phone number (10 digits)");
        return;
      }

      if (!newAddress.addressLine1?.trim()) {
        toast.error("Address line 1 is required");
        return;
      }

      if (newAddress.addressLine1.trim().length < 5) {
        toast.error("Address line 1 must be at least 5 characters long");
        return;
      }

      if (!newAddress.city?.trim()) {
        toast.error("City is required");
        return;
      }

      if (newAddress.city.trim().length < 2) {
        toast.error("City name must be at least 2 characters long");
        return;
      }

      if (!newAddress.state?.trim()) {
        toast.error("State is required");
        return;
      }

      if (!newAddress.pincode?.trim()) {
        toast.error("PIN code is required");
        return;
      }

      if (!validatePincode(newAddress.pincode)) {
        toast.error("Please enter a valid 6-digit PIN code");
        return;
      }

      // Optional field validation
      if (
        newAddress.addressLine2 &&
        newAddress.addressLine2.trim().length > 0 &&
        newAddress.addressLine2.trim().length < 3
      ) {
        toast.error("Address line 2 must be at least 3 characters if provided");
        return;
      }

      if (
        newAddress.landmark &&
        newAddress.landmark.trim().length > 0 &&
        newAddress.landmark.trim().length < 3
      ) {
        toast.error("Landmark must be at least 3 characters if provided");
        return;
      }

      let success = false;

      if (isAddingNew) {
        success = await handleAddAddress(newAddress);
      } else if (editingId !== null) {
        const addressIndex = parseInt(editingId);
        success = await handleUpdateAddress(addressIndex, newAddress);
      }

      if (success) {
        // Reset form and switch back to addresses tab
        setIsAddingNew(false);
        setEditingId(null);
        setActiveTab("addresses");
        resetForm();
      }
    } catch {
      toast.error("Failed to save address");
    }
  };

  const handleEdit = (address: FrontendAddress, index: number) => {
    setNewAddress({ ...address });
    setEditingId(index.toString());
    setIsAddingNew(false);
    setActiveTab("add-edit");
  };

  const handleDelete = (index: number) => {
    const address = addresses[index];
    if (address?.isDefault && addresses.length > 1) {
      toast.error(
        "Cannot delete default address. Please set another address as default first."
      );
      return;
    }

    if (addresses.length === 1) {
      toast.error(
        "Cannot delete the only address. You must have at least one address."
      );
      return;
    }

    // Show confirmation dialog
    setDeleteConfirmDialog({
      isOpen: true,
      addressIndex: index,
      addressName:
        address?.name || getAddressTypeInfo(address?.type || "home").name,
    });
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmDialog.addressIndex === null) return;

    const success = await handleRemoveAddress(deleteConfirmDialog.addressIndex);

    if (success && editingId === deleteConfirmDialog.addressIndex.toString()) {
      setEditingId(null);
      setActiveTab("addresses");
      resetForm();
    }

    // Close dialog
    setDeleteConfirmDialog({
      isOpen: false,
      addressIndex: null,
      addressName: "",
    });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmDialog({
      isOpen: false,
      addressIndex: null,
      addressName: "",
    });
  };

  const handleSetDefault = async (index: number) => {
    await handleSetDefaultAddress(index);
  };

  const handleInputChange = (field: keyof FrontendAddress, value: string) => {
    let processedValue = value;

    // Apply specific formatting based on field type
    switch (field) {
      case "phone":
        // Remove all non-digits and format phone number
        processedValue = value.replace(/\D/g, "");
        if (processedValue.length > 10) {
          processedValue = processedValue.slice(0, 10);
        }
        break;

      case "pincode":
        // Only allow digits, max 6 characters
        processedValue = value.replace(/\D/g, "");
        if (processedValue.length > 6) {
          processedValue = processedValue.slice(0, 6);
        }
        break;

      case "fullName":
        // Only allow letters, spaces, dots, apostrophes, and hyphens
        processedValue = value.replace(/[^a-zA-Z\s.'-]/g, "");
        break;

      case "city":
      case "state":
        // Only allow letters and spaces
        processedValue = value.replace(/[^a-zA-Z\s]/g, "");
        break;

      case "addressLine1":
      case "addressLine2":
        // Remove excessive whitespace
        processedValue = value.replace(/\s+/g, " ");
        break;

      case "landmark":
        // Remove excessive whitespace
        processedValue = value.replace(/\s+/g, " ");
        break;

      default:
        break;
    }

    setNewAddress((prev) => ({ ...prev, [field]: processedValue }));
  };

  const resetForm = () => {
    setNewAddress({
      type: "home",
      name: "",
      fullName: profile?.fullname || "",
      phone: profile?.account?.phone || "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      isDefault: false,
    });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setActiveTab("add-edit");
    resetForm();
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setActiveTab("addresses");
    resetForm();
  };

  const getAddressTypeInfo = (type: string) => {
    return addressTypes.find((t) => t.id === type) || addressTypes[0];
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
                <Link href="/user/profile">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold">Address Management</h1>
                <p className="text-muted-foreground">
                  Manage your delivery addresses
                </p>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading addresses...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="w-full text-center">
              <TabsTrigger value="addresses">My Addresses</TabsTrigger>
              {/* <TabsTrigger value="add-edit">
                {isAddingNew
                  ? "Add New"
                  : editingId !== null
                  ? "Edit Address"
                  : "Add New"}
              </TabsTrigger> */}
            </TabsList>

            {/* Address List */}
            <TabsContent value="addresses">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Saved Addresses</h2>
                  <VVButton className="cursor-pointer" onClick={handleAddNew}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </VVButton>
                </div>

                {addresses.length === 0 && !loading ? (
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No addresses found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Add your first delivery address to get started
                    </p>
                    <VVButton onClick={handleAddNew}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Address
                    </VVButton>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {addresses.map((address, index) => {
                      const typeInfo = getAddressTypeInfo(address.type);
                      return (
                        <VVCard key={address.id || index} className="relative">
                          <VVCardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg ${typeInfo.color}`}
                                >
                                  <typeInfo.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {address.name || typeInfo.name}
                                  </h3>
                                  {address.isDefault && (
                                    <VVBadge variant="default" className="mt-1">
                                      <Star className="mr-1 h-3 w-3" />
                                      Default
                                    </VVBadge>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <VVButton
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEdit(address, index)}
                                >
                                  <Edit className="h-4 w-4" />
                                </VVButton>
                                <VVButton
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleDelete(index)}
                                  disabled={
                                    address.isDefault && addresses.length === 1
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </VVButton>
                              </div>
                            </div>

                            <div className="space-y-2 text-sm">
                              <p className="font-medium">{address.fullName}</p>
                              <p className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                {address.phone}
                              </p>
                              <div className="text-muted-foreground">
                                <p>{address.addressLine1}</p>
                                {address.addressLine2 && (
                                  <p>{address.addressLine2}</p>
                                )}
                                <p>
                                  {address.city}, {address.state} -{" "}
                                  {address.pincode}
                                </p>
                                {address.landmark && (
                                  <p className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {address.landmark}
                                  </p>
                                )}
                              </div>
                            </div>

                            {!address.isDefault && (
                              <div className="mt-4 pt-4 border-t">
                                <VVButton
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSetDefault(index)}
                                >
                                  <Star className="mr-2 h-4 w-4" />
                                  Set as Default
                                </VVButton>
                              </div>
                            )}
                          </VVCardContent>
                        </VVCard>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Add/Edit Address */}
            <TabsContent value="add-edit">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>
                      {isAddingNew ? "Add New Address" : "Edit Address"}
                    </VVCardTitle>
                    <p className="text-muted-foreground">
                      Fill in the details for your delivery address
                    </p>
                  </VVCardHeader>
                  <VVCardContent className="space-y-6">
                    {/* Address Type Selection */}
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Address Type
                      </Label>
                      <div className="grid md:grid-cols-3 gap-4">
                        {addressTypes.map((type) => (
                          <VVCard
                            key={type.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              newAddress.type === type.id
                                ? "ring-2 ring-primary"
                                : ""
                            }`}
                            onClick={() => handleInputChange("type", type.id)}
                          >
                            <VVCardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${type.color}`}>
                                  <type.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{type.name}</h4>
                                  {newAddress.type === type.id && (
                                    <VVBadge variant="default" className="mt-1">
                                      Selected
                                    </VVBadge>
                                  )}
                                </div>
                              </div>
                            </VVCardContent>
                          </VVCard>
                        ))}
                      </div>
                    </div>

                    {/* Address Name */}
                    <VVInput
                      label="Address Name (Optional)"
                      value={newAddress.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="e.g., My Home, Office, etc."
                    />

                    {/* Personal Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <VVInput
                          label="Full Name"
                          value={newAddress.fullName || ""}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          placeholder="Enter full name"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Letters only, minimum 2 characters
                        </p>
                      </div>
                      <div className="space-y-2">
                        <VVInput
                          label="Phone Number"
                          value={newAddress.phone || ""}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="10-digit mobile number"
                          required
                          maxLength={10}
                        />
                        <p className="text-xs text-muted-foreground">
                          {newAddress.phone && newAddress.phone.length > 0
                            ? `${newAddress.phone.length}/10 digits`
                            : "Enter 10-digit mobile number"}
                        </p>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <VVInput
                          label="Address Line 1"
                          value={newAddress.addressLine1 || ""}
                          onChange={(e) =>
                            handleInputChange("addressLine1", e.target.value)
                          }
                          placeholder="House/Flat No., Building Name, Street"
                          required
                          maxLength={100}
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum 5 characters, maximum 100
                        </p>
                      </div>
                      <VVInput
                        label="Address Line 2"
                        value={newAddress.addressLine2 || ""}
                        onChange={(e) =>
                          handleInputChange("addressLine2", e.target.value)
                        }
                        placeholder="Area, Sector, Locality"
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <VVInput
                          label="City"
                          value={newAddress.city || ""}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          placeholder="Enter city"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Letters only
                        </p>
                      </div>
                      <div className="space-y-2">
                        <VVInput
                          label="State"
                          value={newAddress.state || ""}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                          placeholder="Enter state"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Letters only
                        </p>
                      </div>
                      <div className="space-y-2">
                        <VVInput
                          label="PIN Code"
                          value={newAddress.pincode || ""}
                          onChange={(e) =>
                            handleInputChange("pincode", e.target.value)
                          }
                          placeholder="6-digit PIN code"
                          required
                          maxLength={6}
                        />
                        <p className="text-xs text-muted-foreground">
                          {newAddress.pincode && newAddress.pincode.length > 0
                            ? `${newAddress.pincode.length}/6 digits`
                            : "Enter 6-digit PIN code"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Textarea
                        id="landmark"
                        value={newAddress.landmark || ""}
                        onChange={(e) =>
                          handleInputChange("landmark", e.target.value)
                        }
                        placeholder="Nearby landmark for easy delivery"
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="default"
                          checked={newAddress.isDefault || false}
                          onChange={(e) =>
                            handleInputChange(
                              "isDefault",
                              e.target.checked.toString()
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="default">Set as default address</Label>
                      </div>
                      <div className="flex gap-4">
                        <VVButton variant="outline" onClick={handleCancel}>
                          Cancel
                        </VVButton>
                        <VVButton onClick={handleSave} disabled={loading}>
                          {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="mr-2 h-4 w-4" />
                          )}
                          Save Address
                        </VVButton>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmDialog.isOpen}
        onOpenChange={handleCancelDelete}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the address &ldquo;
              {deleteConfirmDialog.addressName}&rdquo;? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <VVButton
              className="cursor-pointer"
              variant="outline"
              onClick={handleCancelDelete}
            >
              Cancel
            </VVButton>
            <VVButton
              variant="destructive"
              className="cursor-pointer"
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Address
                </>
              )}
            </VVButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

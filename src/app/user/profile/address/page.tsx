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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";

interface Address {
  id: string;
  type: string;
  name: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  isDefault: boolean;
}

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

const initialAddresses = [
  {
    id: "1",
    type: "home",
    name: "Home Address",
    fullName: "Priya Sharma",
    phone: "+91 98765 43210",
    addressLine1: "123, Green Valley Apartments",
    addressLine2: "Sector 15, Near City Mall",
    city: "Gurgaon",
    state: "Haryana",
    pincode: "122001",
    landmark: "Opposite Metro Station",
    isDefault: true,
  },
  {
    id: "2",
    type: "office",
    name: "Office Address",
    fullName: "Priya Sharma",
    phone: "+91 98765 43210",
    addressLine1: "456, Tech Tower",
    addressLine2: "Cyber City, DLF Phase 2",
    city: "Gurgaon",
    state: "Haryana",
    pincode: "122002",
    landmark: "Near Rapid Metro",
    isDefault: false,
  },
];

export default function AddressPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState({
    type: "home",
    name: "",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    isDefault: false,
  });

  const handleSave = () => {
    if (isAddingNew) {
      const id = Date.now().toString();
      setAddresses((prev) => [...prev, { ...newAddress, id }]);
      setIsAddingNew(false);
      setNewAddress({
        type: "home",
        name: "",
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        isDefault: false,
      });
    } else if (editingId) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...addr, ...newAddress } : addr
        )
      );
      setEditingId(null);
    }
    console.log("Saving addresses:", addresses);
  };

  const handleEdit = (address: Address) => {
    setNewAddress(address);
    setEditingId(address.id);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
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

          <Tabs defaultValue="addresses" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="addresses">My Addresses</TabsTrigger>
              <TabsTrigger value="add-edit">
                {isAddingNew
                  ? "Add New"
                  : editingId
                  ? "Edit Address"
                  : "Add New"}
              </TabsTrigger>
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
                  <VVButton
                    onClick={() => {
                      setIsAddingNew(true);
                      setEditingId(null);
                      setNewAddress({
                        type: "home",
                        name: "",
                        fullName: "",
                        phone: "",
                        addressLine1: "",
                        addressLine2: "",
                        city: "",
                        state: "",
                        pincode: "",
                        landmark: "",
                        isDefault: false,
                      });
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </VVButton>
                </div>

                <div className="grid gap-4">
                  {addresses.map((address) => {
                    const typeInfo = getAddressTypeInfo(address.type);
                    return (
                      <VVCard key={address.id} className="relative">
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
                                onClick={() => handleEdit(address)}
                              >
                                <Edit className="h-4 w-4" />
                              </VVButton>
                              <VVButton
                                variant="outline"
                                size="icon"
                                onClick={() => handleDelete(address.id)}
                                disabled={address.isDefault}
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
                                onClick={() => handleSetDefault(address.id)}
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
                      value={newAddress.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="e.g., My Home, Office, etc."
                    />

                    {/* Personal Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <VVInput
                        label="Full Name"
                        value={newAddress.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="Enter full name"
                        required
                      />
                      <VVInput
                        label="Phone Number"
                        value={newAddress.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>

                    {/* Address Details */}
                    <div className="space-y-4">
                      <VVInput
                        label="Address Line 1"
                        value={newAddress.addressLine1}
                        onChange={(e) =>
                          handleInputChange("addressLine1", e.target.value)
                        }
                        placeholder="House/Flat No., Building Name"
                        required
                      />
                      <VVInput
                        label="Address Line 2 (Optional)"
                        value={newAddress.addressLine2}
                        onChange={(e) =>
                          handleInputChange("addressLine2", e.target.value)
                        }
                        placeholder="Area, Street, Sector"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <VVInput
                        label="City"
                        value={newAddress.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Enter city"
                        required
                      />
                      <Select
                        value={newAddress.state}
                        onValueChange={(value) =>
                          handleInputChange("state", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Haryana">Haryana</SelectItem>
                          <SelectItem value="Punjab">Punjab</SelectItem>
                          <SelectItem value="Uttar Pradesh">
                            Uttar Pradesh
                          </SelectItem>
                          <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="Maharashtra">
                            Maharashtra
                          </SelectItem>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                          <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="West Bengal">
                            West Bengal
                          </SelectItem>
                          <SelectItem value="Gujarat">Gujarat</SelectItem>
                        </SelectContent>
                      </Select>
                      <VVInput
                        label="PIN Code"
                        value={newAddress.pincode}
                        onChange={(e) =>
                          handleInputChange("pincode", e.target.value)
                        }
                        placeholder="Enter PIN code"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Textarea
                        id="landmark"
                        value={newAddress.landmark}
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
                          checked={newAddress.isDefault}
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
                        <VVButton
                          variant="outline"
                          onClick={() => {
                            setIsAddingNew(false);
                            setEditingId(null);
                          }}
                        >
                          Cancel
                        </VVButton>
                        <VVButton onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
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

      <Footer />
    </div>
  );
}

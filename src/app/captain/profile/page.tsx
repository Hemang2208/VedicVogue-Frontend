"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, MapPin, Star, Package, Clock, Edit, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CaptainProfile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Arjun Kumar",
    id: "CAP-001",
    phone: "+91 98765 43210",
    email: "arjun@vedicvogue.com",
    address: "Koramangala, Bangalore",
    vehicleNumber: "KA-01-AB-1234",
    licenseNumber: "KA1234567890",
    joinDate: "January 2024",
    rating: 4.8,
    totalDeliveries: 1247,
    onTimeDeliveries: 1189,
    emergencyContact: "+91 87654 32109",
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    })
  }

  const onTimePercentage = Math.round((profile.onTimeDeliveries / profile.totalDeliveries) * 100)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your delivery profile</p>
        </div>
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
        >
          {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-gray-600">Captain ID: {profile.id}</p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{profile.rating}</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Top Performer
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{profile.totalDeliveries}</div>
              <div className="text-sm text-gray-600">Total Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{onTimePercentage}%</div>
              <div className="text-sm text-gray-600">On-Time Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{profile.joinDate}</div>
              <div className="text-sm text-gray-600">Member Since</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={profile.email}
                onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="emergency">Emergency Contact</Label>
              <Input
                id="emergency"
                value={profile.emergencyContact}
                onChange={(e) => setProfile((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={profile.address}
              onChange={(e) => setProfile((prev) => ({ ...prev, address: e.target.value }))}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicle">Vehicle Number</Label>
              <Input
                id="vehicle"
                value={profile.vehicleNumber}
                onChange={(e) => setProfile((prev) => ({ ...prev, vehicleNumber: e.target.value }))}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="license">License Number</Label>
              <Input
                id="license"
                value={profile.licenseNumber}
                onChange={(e) => setProfile((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Performance Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-600">{profile.totalDeliveries}</div>
              <div className="text-sm text-gray-600">Total Deliveries</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600">{profile.onTimeDeliveries}</div>
              <div className="text-sm text-gray-600">On-Time Deliveries</div>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-yellow-600">{profile.rating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-600">{onTimePercentage}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

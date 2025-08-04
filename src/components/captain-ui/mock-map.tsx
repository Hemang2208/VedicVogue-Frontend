"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation } from "lucide-react"
import { deliveryAreas } from "@/lib/captain-data"

export function MockMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Delivery Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mock Map Container */}
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 mb-4 min-h-[200px] border-2 border-dashed border-gray-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">Interactive Map</p>
              <p className="text-sm text-gray-400">GPS navigation would appear here</p>
            </div>
          </div>

          {/* Mock Location Pins */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
              <MapPin className="h-3 w-3" />
              Kitchen
            </div>
          </div>

          <div className="absolute top-12 right-8">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
              <MapPin className="h-3 w-3" />
              You
            </div>
          </div>

          <div className="absolute bottom-8 left-12">
            <div className="flex items-center gap-1 bg-orange-600 text-white px-2 py-1 rounded-full text-xs">
              <MapPin className="h-3 w-3" />
              Delivery
            </div>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Active Delivery Areas</h4>
          <div className="grid grid-cols-1 gap-2">
            {deliveryAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{area.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{area.orders} orders</Badge>
                  <span className="text-sm text-gray-600">{area.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

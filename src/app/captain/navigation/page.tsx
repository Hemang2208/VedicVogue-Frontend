"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MockMap } from "@/components/captain-ui/mock-map"
import { Navigation, MapPin, Clock, Route, Phone } from "lucide-react"
import { captainOrders } from "@/lib/captain-data"
import { useToast } from "@/hooks/use-toast"

export default function CaptainNavigation() {
  const { toast } = useToast()
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  const activeOrders = captainOrders.filter((order) => ["assigned", "picked_up", "en_route"].includes(order.status))

  const handleStartNavigation = (orderId: string) => {
    setSelectedRoute(orderId)
    toast({
      title: "Navigation Started",
      description: "GPS navigation has been activated",
    })
  }

  const handleCallCustomer = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Navigation</h1>
        <p className="text-gray-600">Your delivery route and map</p>
      </div>

      {/* Mock Map */}
      <MockMap />

      {/* Current Location Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Current Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Location</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Koramangala 4th Block
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Distance to Kitchen</span>
              <span className="text-sm font-medium">2.3 km</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Next Delivery</span>
              <span className="text-sm font-medium">Whitefield (12 km)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Route className="h-5 w-5 text-orange-600" />
            Delivery Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeOrders.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-400 mb-2">No active deliveries</div>
              <p className="text-sm text-gray-600">Your delivery queue is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order, index) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{order.user}</h3>
                        <p className="text-sm text-gray-600">{order.area}</p>
                      </div>
                    </div>
                    <Badge
                      className={
                        order.status === "assigned"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "picked_up"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-purple-100 text-purple-800"
                      }
                    >
                      {order.status === "assigned"
                        ? "Assigned"
                        : order.status === "picked_up"
                          ? "Picked Up"
                          : "En Route"}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="flex-1">{order.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>
                        Delivery: {order.deliverySlot} • ETA: {order.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleStartNavigation(order.id)}
                      disabled={selectedRoute === order.id}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      {selectedRoute === order.id ? "Navigating..." : "Navigate"}
                    </Button>

                    <Button
                      onClick={() => handleCallCustomer(order.phone)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => toast({ title: "Navigation", description: "Navigating to kitchen" })}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              To Kitchen
            </Button>

            <Button
              variant="outline"
              onClick={() => toast({ title: "Navigation", description: "Navigating to nearest fuel station" })}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Fuel Station
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

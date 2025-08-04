"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DeliveryStatusBadge } from "./delivery-status-badge"
import { MapPin, Clock, Phone, Package, IndianRupee, Navigation } from "lucide-react"
import type { CaptainOrder } from "@/lib/captain-data"

interface CaptainOrderCardProps {
  order: CaptainOrder
  onStatusChange: (orderId: string, newStatus: CaptainOrder["status"]) => void
}

export function CaptainOrderCard({ order, onStatusChange }: CaptainOrderCardProps) {
  const getNextStatus = (currentStatus: CaptainOrder["status"]) => {
    switch (currentStatus) {
      case "assigned":
        return "picked_up"
      case "picked_up":
        return "en_route"
      case "en_route":
        return "delivered"
      default:
        return currentStatus
    }
  }

  const getActionLabel = (currentStatus: CaptainOrder["status"]) => {
    switch (currentStatus) {
      case "assigned":
        return "Pick Up"
      case "picked_up":
        return "Start Delivery"
      case "en_route":
        return "Mark Delivered"
      default:
        return "Update"
    }
  }

  const canProgress = !["delivered", "issue"].includes(order.status)

  const handleCall = () => {
    window.open(`tel:${order.phone}`)
  }

  const handleNavigate = () => {
    // Mock navigation - in real app would open maps
    window.open(`https://maps.google.com/?q=${encodeURIComponent(order.address)}`)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{order.user}</h3>
            <p className="text-sm text-gray-600 font-mono">{order.id}</p>
          </div>
          <DeliveryStatusBadge status={order.status} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-gray-500" />
            <span>
              {order.meal} (Qty: {order.quantity})
            </span>
          </div>

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

          <div className="flex items-center gap-2 text-sm">
            <IndianRupee className="h-4 w-4 text-gray-500" />
            <span>
              ₹{order.orderValue} • {order.paymentMethod.toUpperCase()}
            </span>
          </div>
        </div>

        {order.specialInstructions && (
          <div className="mb-4 p-2 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-xs font-medium text-yellow-800 mb-1">Special Instructions:</p>
            <p className="text-xs text-yellow-700">{order.specialInstructions}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCall} className="flex items-center gap-1 bg-transparent">
            <Phone className="h-4 w-4" />
            Call
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNavigate}
            className="flex items-center gap-1 bg-transparent"
          >
            <Navigation className="h-4 w-4" />
            Navigate
          </Button>

          {canProgress && (
            <Button
              onClick={() => onStatusChange(order.id, getNextStatus(order.status))}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              {getActionLabel(order.status)}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

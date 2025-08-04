"use client"

import { Badge } from "@/components/ui/badge"
import type { CaptainOrder } from "@/lib/captain-data"

interface DeliveryStatusBadgeProps {
  status: CaptainOrder["status"]
}

export function DeliveryStatusBadge({ status }: DeliveryStatusBadgeProps) {
  const getStatusConfig = (status: CaptainOrder["status"]) => {
    switch (status) {
      case "assigned":
        return {
          label: "Assigned",
          className: "bg-blue-100 text-blue-800 border-blue-200",
        }
      case "picked_up":
        return {
          label: "Picked Up",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        }
      case "en_route":
        return {
          label: "En Route",
          className: "bg-purple-100 text-purple-800 border-purple-200",
        }
      case "delivered":
        return {
          label: "Delivered",
          className: "bg-green-100 text-green-800 border-green-200",
        }
      case "issue":
        return {
          label: "Issue",
          className: "bg-red-100 text-red-800 border-red-200",
        }
      default:
        return {
          label: "Unknown",
          className: "bg-gray-100 text-gray-800 border-gray-200",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

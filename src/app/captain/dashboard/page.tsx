"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShiftSummary } from "@/components/captain-ui/shift-summary"
import { Clock, Package, CheckCircle, XCircle, Route, Eye, Phone, AlertTriangle } from "lucide-react"
import { shiftStats, captainOrders } from "@/lib/captain-data"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function CaptainDashboard() {
  const { toast } = useToast()
  const [isOnRoute, setIsOnRoute] = useState(false)

  const handleStartRoute = () => {
    setIsOnRoute(true)
    toast({
      title: "Route Started",
      description: "You're now on delivery route. Safe driving!",
    })
  }

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Initiated`,
      description: `${action} action has been triggered.`,
    })
  }

  const activeOrders = captainOrders.filter((order) => ["assigned", "picked_up", "en_route"].includes(order.status))

  return (
    <div className="p-4 space-y-6">
      {/* Shift Summary */}
      <ShiftSummary />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{shiftStats.totalDeliveries}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{shiftStats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-yellow-600">{shiftStats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-600">{shiftStats.cancelled}</div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={handleStartRoute}
            disabled={isOnRoute}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
            size="lg"
          >
            <Route className="h-5 w-5 mr-2" />
            {isOnRoute ? "Route Active" : "Start Route"}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => handleQuickAction("View Orders")} className="py-3">
              <Eye className="h-4 w-4 mr-2" />
              View Orders
            </Button>

            <Button variant="outline" onClick={() => handleQuickAction("Call Kitchen")} className="py-3">
              <Phone className="h-4 w-4 mr-2" />
              Call Kitchen
            </Button>
          </div>

          <Button variant="destructive" onClick={() => handleQuickAction("Emergency Support")} className="w-full py-3">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Emergency Support
          </Button>
        </CardContent>
      </Card>

      {/* Active Orders Preview */}
      {activeOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Active Orders
              <Badge variant="outline">{activeOrders.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{order.user}</div>
                    <div className="text-sm text-gray-600">
                      {order.area} • {order.deliverySlot}
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
                    {order.status === "assigned" ? "Assigned" : order.status === "picked_up" ? "Picked Up" : "En Route"}
                  </Badge>
                </div>
              ))}

              {activeOrders.length > 3 && (
                <div className="text-center pt-2">
                  <Button variant="ghost" size="sm">
                    View {activeOrders.length - 3} more orders
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

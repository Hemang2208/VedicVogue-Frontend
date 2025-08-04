"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DeliveryStatusBadge } from "@/components/captain-ui/delivery-status-badge"
import { Search, Calendar, MapPin, Package, IndianRupee, Clock } from "lucide-react"
import { completedOrders } from "@/lib/captain-data"
import { motion } from "framer-motion"

export default function CompletedOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("today")

  const filteredOrders = completedOrders.filter((order) => {
    const matchesSearch =
      order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalEarnings = filteredOrders.reduce((sum, order) => sum + order.orderValue, 0)

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Completed Deliveries</h1>
        <p className="text-gray-600">Your delivery history</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{filteredOrders.length}</div>
            <div className="text-sm text-gray-600">Completed Today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">₹{totalEarnings}</div>
            <div className="text-sm text-gray-600">Total Value</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search completed orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={dateFilter === "today" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateFilter("today")}
            className="whitespace-nowrap"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Today
          </Button>
          <Button
            variant={dateFilter === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateFilter("week")}
            className="whitespace-nowrap"
          >
            This Week
          </Button>
          <Button
            variant={dateFilter === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateFilter("month")}
            className="whitespace-nowrap"
          >
            This Month
          </Button>
        </div>
      </div>

      {/* Completed Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-400 mb-2">No completed orders</div>
            <p className="text-sm text-gray-600">Completed deliveries will appear here</p>
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{order.user}</h3>
                      <p className="text-sm text-gray-600">{order.id}</p>
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
                      <span>{order.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{order.estimatedTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee className="h-4 w-4 text-gray-500" />
                      <span>
                        ₹{order.orderValue} • {order.paymentMethod.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Delivered Successfully
                    </Badge>
                    <span className="text-xs text-gray-500">Completed at {order.estimatedTime.split(" at ")[1]}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

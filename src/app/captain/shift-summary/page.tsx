"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, MapPin, Package, IndianRupee, TrendingUp, Star, Download } from "lucide-react"
import { shiftStats, completedOrders } from "@/lib/captain-data"
import { useToast } from "@/hooks/use-toast"

export default function ShiftSummary() {
  const { toast } = useToast()

  const handleEndShift = () => {
    toast({
      title: "Shift Ended",
      description: "Your shift has been completed successfully",
    })
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Shift summary report has been downloaded",
    })
  }

  const efficiency = Math.round((shiftStats.completed / shiftStats.totalDeliveries) * 100)
  const avgDeliveryTime = "18 mins"
  const customerRating = 4.8

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Shift Summary</h1>
          <p className="text-gray-600">Your performance overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadReport} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleEndShift} className="bg-red-600 hover:bg-red-700" size="sm">
            End Shift
          </Button>
        </div>
      </div>

      {/* Shift Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Shift Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{shiftStats.shiftStart}</div>
              <div className="text-sm text-gray-600">Shift Start</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{shiftStats.currentTime}</div>
              <div className="text-sm text-gray-600">Current Time</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Shift Progress</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <Progress value={65} className="h-2" />
            <div className="text-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                3h 30m remaining
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{shiftStats.completed}</div>
            <div className="text-sm text-gray-600">Deliveries</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{shiftStats.totalDistance}</div>
            <div className="text-sm text-gray-600">Distance</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <IndianRupee className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">₹{shiftStats.totalEarnings}</div>
            <div className="text-sm text-gray-600">Earnings</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{efficiency}%</div>
            <div className="text-sm text-gray-600">Efficiency</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Delivery Time</span>
              <span className="font-medium">{avgDeliveryTime}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customer Rating</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{customerRating}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">On-Time Deliveries</span>
              <span className="font-medium">
                {Math.round((shiftStats.completed / shiftStats.totalDeliveries) * 100)}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Areas Covered</span>
              <span className="font-medium">5 zones</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{order.user}</div>
                  <div className="text-sm text-gray-600">
                    {order.area} • {order.estimatedTime}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Delivered</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

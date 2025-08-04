"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, MapPin, IndianRupee, Package } from "lucide-react";
import { shiftStats } from "@/lib/captain-data";

export function ShiftSummary() {
  const shiftProgress = 65; // Mock progress percentage
  const hoursWorked = 4.5;
  const hoursRemaining = 3.5;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Today&apos;s Shift
          </span>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {shiftStats.shiftStart}
            </div>
            <div className="text-xs text-gray-600">Started</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {shiftStats.shiftEnd}
            </div>
            <div className="text-xs text-gray-600">Ends</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Shift Progress</span>
            <span>{shiftProgress}%</span>
          </div>
          <Progress value={shiftProgress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{hoursWorked}h worked</span>
            <span>{hoursRemaining}h remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Package className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-lg font-bold text-green-600">
              {shiftStats.completed}
            </div>
            <div className="text-xs text-gray-600">Delivered</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-600">
              {shiftStats.totalDistance}
            </div>
            <div className="text-xs text-gray-600">Distance</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <IndianRupee className="h-4 w-4 text-orange-600" />
            </div>
            <div className="text-lg font-bold text-orange-600">
              ₹{shiftStats.totalEarnings}
            </div>
            <div className="text-xs text-gray-600">Earned</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

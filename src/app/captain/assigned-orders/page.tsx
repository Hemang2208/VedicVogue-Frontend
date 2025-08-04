"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaptainOrderCard } from "@/components/captain-ui/captain-order-card";
import { Search, SortAsc } from "lucide-react";
import { captainOrders, type CaptainOrder } from "@/lib/captain-data";
import { useToast } from "@/hooks/use-toast";

export default function AssignedOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(captainOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"time" | "area">("time");

  const handleStatusChange = (
    orderId: string,
    newStatus: CaptainOrder["status"]
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const statusMessages = {
      assigned: "Order assigned to captain",
      picked_up: "Order picked up from kitchen",
      en_route: "Started delivery to customer",
      delivered: "Order delivered successfully",
      issue: "Issue reported for this order",
    };

    toast({
      title: "Status Updated",
      description: statusMessages[newStatus] || "Order status updated",
    });
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "time") {
        return a.deliverySlot.localeCompare(b.deliverySlot);
      } else {
        return a.area.localeCompare(b.area);
      }
    });

  const statusCounts = {
    all: orders.length,
    assigned: orders.filter((o) => o.status === "assigned").length,
    picked_up: orders.filter((o) => o.status === "picked_up").length,
    en_route: orders.filter((o) => o.status === "en_route").length,
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Assigned Orders</h1>
        <p className="text-gray-600">Manage your delivery queue</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by customer, area, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className="whitespace-nowrap"
          >
            All ({statusCounts.all})
          </Button>
          <Button
            variant={statusFilter === "assigned" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("assigned")}
            className="whitespace-nowrap"
          >
            Assigned ({statusCounts.assigned})
          </Button>
          <Button
            variant={statusFilter === "picked_up" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("picked_up")}
            className="whitespace-nowrap"
          >
            Picked Up ({statusCounts.picked_up})
          </Button>
          <Button
            variant={statusFilter === "en_route" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("en_route")}
            className="whitespace-nowrap"
          >
            En Route ({statusCounts.en_route})
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {filteredOrders.length} orders
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortBy(sortBy === "time" ? "area" : "time")}
            className="flex items-center gap-1"
          >
            <SortAsc className="h-4 w-4" />
            Sort by {sortBy === "time" ? "Area" : "Time"}
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No orders found</div>
            <p className="text-sm text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No orders assigned yet"}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <CaptainOrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

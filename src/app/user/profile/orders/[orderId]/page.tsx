"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { VVBadge } from "@/components/ui/vv-badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  // Mail,
  Download,
  Star,
  MessageCircle,
  RefreshCw,
  Calendar,
  CreditCard,
} from "lucide-react";
import Image from "next/image";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  trackingNumber: string;
  estimatedDelivery: string;
  orderTimeline: {
    status: string;
    timestamp: string;
    description: string;
    completed: boolean;
  }[];
}

// Mock order data
const mockOrders: { [key: string]: OrderDetails } = {
  ORD001: {
    id: "ORD001",
    orderNumber: "VV-2024-001",
    status: "delivered",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-18",
    totalAmount: 1299,
    paymentMethod: "UPI",
    paymentStatus: "paid",
    trackingNumber: "VV123456789",
    estimatedDelivery: "2024-01-18",
    items: [
      {
        id: "1",
        name: "Organic Paneer Tikka Masala",
        image: "https://placehold.co/80x80/svg",
        quantity: 2,
        price: 399,
        category: "Main Course",
      },
      {
        id: "2",
        name: "Fresh Naan Bread",
        image: "https://placehold.co/80x80/svg",
        quantity: 4,
        price: 125,
        category: "Bread",
      },
    ],
    shippingAddress: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      address: "123, Green Valley Apartments, Sector 15",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
    },
    orderTimeline: [
      {
        status: "Order Placed",
        timestamp: "2024-01-15 10:30 AM",
        description: "Your order has been placed successfully",
        completed: true,
      },
      {
        status: "Order Confirmed",
        timestamp: "2024-01-15 11:00 AM",
        description: "Order confirmed and being prepared",
        completed: true,
      },
      {
        status: "Out for Delivery",
        timestamp: "2024-01-18 09:00 AM",
        description: "Your order is out for delivery",
        completed: true,
      },
      {
        status: "Delivered",
        timestamp: "2024-01-18 02:30 PM",
        description: "Order delivered successfully",
        completed: true,
      },
    ],
  },
  ORD002: {
    id: "ORD002",
    orderNumber: "VV-2024-002",
    status: "in_transit",
    orderDate: "2024-01-20",
    deliveryDate: "",
    totalAmount: 899,
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    trackingNumber: "VV987654321",
    estimatedDelivery: "2024-01-22",
    items: [
      {
        id: "3",
        name: "Vegan Buddha Bowl",
        image: "https://placehold.co/80x80/svg",
        quantity: 1,
        price: 449,
        category: "Healthy",
      },
      {
        id: "4",
        name: "Green Smoothie",
        image: "https://placehold.co/80x80/svg",
        quantity: 2,
        price: 225,
        category: "Beverages",
      },
    ],
    shippingAddress: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      address: "123, Green Valley Apartments, Sector 15",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
    },
    orderTimeline: [
      {
        status: "Order Placed",
        timestamp: "2024-01-20 02:15 PM",
        description: "Your order has been placed successfully",
        completed: true,
      },
      {
        status: "Order Confirmed",
        timestamp: "2024-01-20 02:45 PM",
        description: "Order confirmed and being prepared",
        completed: true,
      },
      {
        status: "Out for Delivery",
        timestamp: "2024-01-22 10:00 AM",
        description: "Your order is out for delivery",
        completed: true,
      },
      {
        status: "Delivered",
        timestamp: "",
        description: "Order will be delivered soon",
        completed: false,
      },
    ],
  },
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const orderData = mockOrders[orderId];
      setOrder(orderData || null);
      setLoading(false);
    }, 1000);
  }, [orderId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return CheckCircle;
      case "in_transit":
        return Truck;
      case "processing":
        return Clock;
      default:
        return Package;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The order you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
              <VVButton asChild>
                <Link href="/user/profile/orders">Back to Orders</Link>
              </VVButton>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const StatusIcon = getStatusIcon(order.status);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <VVButton variant="ghost" size="icon" asChild>
                <Link href="/user/profile/orders">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold">Order Details</h1>
                <p className="text-muted-foreground">
                  Order #{order.orderNumber}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <div className="flex items-center justify-between">
                      <VVCardTitle className="flex items-center gap-3">
                        <StatusIcon className="h-6 w-6" />
                        Order Status
                      </VVCardTitle>
                      <VVBadge className={getStatusColor(order.status)}>
                        {order.status.replace("_", " ").toUpperCase()}
                      </VVBadge>
                    </div>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="space-y-4">
                      {order.orderTimeline.map((timeline, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              timeline.completed
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4
                                className={`font-medium ${
                                  timeline.completed
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {timeline.status}
                              </h4>
                              {timeline.timestamp && (
                                <span className="text-sm text-muted-foreground">
                                  {timeline.timestamp}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {timeline.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Order Items</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="space-y-4">
                      {order.items.map((item, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 border rounded-lg"
                        >
                          <div className="relative w-16 h-16">
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="rounded-lg object-cover"
                              fill
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.category}
                            </p>
                            <p className="text-sm">
                              Quantity: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ₹{item.quantity * item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Order Actions</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent>
                    <div className="flex flex-wrap gap-4">
                      <VVButton variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Invoice
                      </VVButton>
                      <VVButton variant="outline">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Support
                      </VVButton>
                      {order.status === "delivered" && (
                        <VVButton variant="outline">
                          <Star className="mr-2 h-4 w-4" />
                          Rate Order
                        </VVButton>
                      )}
                      <VVButton variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reorder
                      </VVButton>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle>Order Summary</VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Order Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Payment</p>
                        <p className="text-sm text-muted-foreground">
                          {order.paymentMethod} - {order.paymentStatus}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Tracking</p>
                        <p className="text-sm text-muted-foreground">
                          {order.trackingNumber}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Amount</span>
                        <span className="font-bold text-lg">
                          ₹{order.totalAmount}
                        </span>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>

              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <VVCard>
                  <VVCardHeader>
                    <VVCardTitle className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Delivery Address
                    </VVCardTitle>
                  </VVCardHeader>
                  <VVCardContent className="space-y-2">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pincode}
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {order.shippingAddress.phone}
                      </span>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

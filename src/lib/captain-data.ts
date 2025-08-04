export interface CaptainOrder {
  id: string
  user: string
  phone: string
  address: string
  area: string
  meal: string
  quantity: number
  deliverySlot: string
  status: "assigned" | "picked_up" | "en_route" | "delivered" | "issue"
  estimatedTime: string
  specialInstructions?: string
  orderValue: number
  paymentMethod: "online" | "cod"
}

export interface DeliveryIssue {
  id: string
  orderId: string
  user: string
  address: string
  issue: string
  reportedAt: string
  status: "open" | "resolved"
  resolution?: string
}

export interface SupportContact {
  id: string
  name: string
  role: string
  phone: string
  email: string
  available: boolean
}

export const captainOrders: CaptainOrder[] = [
  {
    id: "ORD-3421",
    user: "Ravi Sharma",
    phone: "+91 98765 43210",
    address: "Brigade Metropolis, Whitefield",
    area: "Whitefield",
    meal: "Office Light Lunch",
    quantity: 1,
    deliverySlot: "12:30 PM",
    status: "assigned",
    estimatedTime: "25 mins",
    orderValue: 299,
    paymentMethod: "online",
  },
  {
    id: "ORD-3422",
    user: "Priya Nair",
    phone: "+91 87654 32109",
    address: "Prestige Shantiniketan, Whitefield",
    area: "Whitefield",
    meal: "Healthy Dinner Box",
    quantity: 2,
    deliverySlot: "7:00 PM",
    status: "picked_up",
    estimatedTime: "15 mins",
    specialInstructions: "Ring doorbell twice",
    orderValue: 598,
    paymentMethod: "cod",
  },
  {
    id: "ORD-3423",
    user: "Amit Kumar",
    phone: "+91 76543 21098",
    address: "Koramangala 4th Block",
    area: "Koramangala",
    meal: "Weekend Special Thali",
    quantity: 1,
    deliverySlot: "1:00 PM",
    status: "en_route",
    estimatedTime: "8 mins",
    orderValue: 399,
    paymentMethod: "online",
  },
  {
    id: "ORD-3424",
    user: "Sneha Reddy",
    phone: "+91 65432 10987",
    address: "HSR Layout Sector 2",
    area: "HSR Layout",
    meal: "Quick Snack Box",
    quantity: 1,
    deliverySlot: "4:30 PM",
    status: "delivered",
    estimatedTime: "Completed",
    orderValue: 199,
    paymentMethod: "online",
  },
]

export const completedOrders: CaptainOrder[] = [
  {
    id: "ORD-3401",
    user: "Rajesh Gupta",
    phone: "+91 54321 09876",
    address: "Indiranagar 100 Feet Road",
    area: "Indiranagar",
    meal: "Traditional Lunch",
    quantity: 1,
    deliverySlot: "12:00 PM",
    status: "delivered",
    estimatedTime: "Completed at 12:05 PM",
    orderValue: 349,
    paymentMethod: "cod",
  },
  {
    id: "ORD-3402",
    user: "Kavya Shetty",
    phone: "+91 43210 98765",
    address: "JP Nagar 7th Phase",
    area: "JP Nagar",
    meal: "Evening Snacks",
    quantity: 2,
    deliverySlot: "5:00 PM",
    status: "delivered",
    estimatedTime: "Completed at 4:58 PM",
    orderValue: 298,
    paymentMethod: "online",
  },
]

export const deliveryIssues: DeliveryIssue[] = [
  {
    id: "ISS-001",
    orderId: "ORD-3420",
    user: "Vikram Singh",
    address: "Electronic City Phase 1",
    issue: "Customer not available, phone unreachable",
    reportedAt: "2:30 PM",
    status: "open",
  },
  {
    id: "ISS-002",
    orderId: "ORD-3419",
    user: "Meera Joshi",
    address: "Marathahalli Bridge",
    issue: "Wrong address provided",
    reportedAt: "1:45 PM",
    status: "resolved",
    resolution: "Customer provided correct address, delivered successfully",
  },
]

export const supportContacts: SupportContact[] = [
  {
    id: "SUP-001",
    name: "Kitchen Supervisor",
    role: "Kitchen Operations",
    phone: "+91 80 1234 5678",
    email: "kitchen@vedicvogue.com",
    available: true,
  },
  {
    id: "SUP-002",
    name: "Customer Support",
    role: "Customer Service",
    phone: "+91 80 2345 6789",
    email: "support@vedicvogue.com",
    available: true,
  },
  {
    id: "SUP-003",
    name: "Emergency Hotline",
    role: "Emergency Support",
    phone: "+91 80 3456 7890",
    email: "emergency@vedicvogue.com",
    available: true,
  },
  {
    id: "SUP-004",
    name: "Delivery Manager",
    role: "Delivery Operations",
    phone: "+91 80 4567 8901",
    email: "delivery@vedicvogue.com",
    available: false,
  },
]

export const deliveryAreas = [
  { name: "Whitefield", orders: 8, distance: "12 km" },
  { name: "Koramangala", orders: 6, distance: "8 km" },
  { name: "HSR Layout", orders: 4, distance: "10 km" },
  { name: "Indiranagar", orders: 3, distance: "6 km" },
  { name: "Electronic City", orders: 2, distance: "15 km" },
]

export const shiftStats = {
  totalDeliveries: 12,
  completed: 8,
  pending: 3,
  cancelled: 1,
  totalDistance: "45 km",
  totalEarnings: 2400,
  shiftStart: "9:00 AM",
  shiftEnd: "6:00 PM",
  currentTime: "2:30 PM",
}

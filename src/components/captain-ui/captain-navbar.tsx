"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Package,
  CheckCircle,
  AlertTriangle,
  Navigation,
  HeadphonesIcon,
  Bell,
  BarChart3,
  User,
} from "lucide-react"
import { captainOrders, deliveryIssues } from "@/lib/captain-data"

const navigationItems = [
  { href: "/captain/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/captain/assigned-orders", label: "Orders", icon: Package },
  { href: "/captain/completed", label: "Completed", icon: CheckCircle },
  { href: "/captain/issues", label: "Issues", icon: AlertTriangle },
  { href: "/captain/navigation", label: "Navigate", icon: Navigation },
]

const moreItems = [
  { href: "/captain/notifications", label: "Alerts", icon: Bell },
  { href: "/captain/shift-summary", label: "Summary", icon: BarChart3 },
  { href: "/captain/profile", label: "Profile", icon: User },
  { href: "/captain/support", label: "Support", icon: HeadphonesIcon },
]

export function CaptainNavbar() {
  const pathname = usePathname()

  const getOrderCount = (path: string) => {
    switch (path) {
      case "/captain/assigned-orders":
        return captainOrders.filter((order) => ["assigned", "picked_up", "en_route"].includes(order.status)).length
      case "/captain/issues":
        return deliveryIssues.filter((issue) => issue.status === "open").length
      default:
        return 0
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const count = getOrderCount(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {count > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 text-white"
                  >
                    {count}
                  </Badge>
                )}
              </div>
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Secondary Navigation - Accessible via swipe or long press in real app */}
      <div className="hidden">
        {moreItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

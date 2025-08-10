"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/ui/logout-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator"
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
  LogOut,
  Menu,
} from "lucide-react";
import { captainOrders, deliveryIssues } from "@/lib/captain-data";
import { useState } from "react";

const allNavigationItems = [
  {
    href: "/captain/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics",
  },
  {
    href: "/captain/assigned-orders",
    label: "Assigned Orders",
    icon: Package,
    description: "Active deliveries",
  },
  {
    href: "/captain/completed",
    label: "Completed Orders",
    icon: CheckCircle,
    description: "Delivery history",
  },
  {
    href: "/captain/issues",
    label: "Issues & Reports",
    icon: AlertTriangle,
    description: "Problems & feedback",
  },
  {
    href: "/captain/navigation",
    label: "Navigation",
    icon: Navigation,
    description: "Route planning",
  },
  {
    href: "/captain/notifications",
    label: "Notifications",
    icon: Bell,
    description: "Alerts & updates",
  },
  {
    href: "/captain/shift-summary",
    label: "Shift Summary",
    icon: BarChart3,
    description: "Performance metrics",
  },
  {
    href: "/captain/profile",
    label: "Profile Settings",
    icon: User,
    description: "Account management",
  },
  {
    href: "/captain/support",
    label: "Help & Support",
    icon: HeadphonesIcon,
    description: "Get assistance",
  },
];

export function CaptainMobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getOrderCount = (path: string) => {
    switch (path) {
      case "/captain/assigned-orders":
        return captainOrders.filter((order) =>
          ["assigned", "picked_up", "en_route"].includes(order.status)
        ).length;
      case "/captain/issues":
        return deliveryIssues.filter((issue) => issue.status === "open").length;
      case "/captain/notifications":
        return 3; // Mock notification count
      default:
        return 0;
    }
  };

  const NavItem = ({ item }: { item: (typeof allNavigationItems)[0] }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;
    const count = getOrderCount(item.href);

    return (
      <Link
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        <div className="relative flex-shrink-0">
          <Icon className="h-5 w-5" />
          {count > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0"
            >
              {count}
            </Badge>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium">{item.label}</div>
          <div className="text-xs text-muted-foreground truncate">
            {item.description}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center px-4 border-b">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Package className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Captain Panel</h2>
              </div>
            </div>
          </div>

          {/* Captain Status */}
          <div className="px-4 py-3 border-b bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">Captain John</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium">
                    Online & Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {allNavigationItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-3">
            <LogoutButton
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              showConfirmDialog={true}
              redirectTo="/"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </LogoutButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

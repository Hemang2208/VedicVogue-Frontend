import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const captainRoutes = [
  {
    path: "/captain/dashboard",
    name: "Dashboard",
    description: "Main overview with key metrics and quick actions",
    icon: LayoutDashboard,
    category: "Main",
  },
  {
    path: "/captain/assigned-orders",
    name: "Assigned Orders",
    description: "View and manage currently assigned delivery orders",
    icon: Package,
    category: "Main",
  },
  {
    path: "/captain/completed",
    name: "Completed Orders",
    description: "History of successfully completed deliveries",
    icon: CheckCircle,
    category: "Main",
  },
  {
    path: "/captain/issues",
    name: "Issues & Reports",
    description: "Handle delivery problems and customer complaints",
    icon: AlertTriangle,
    category: "Main",
  },
  {
    path: "/captain/navigation",
    name: "Navigation",
    description: "Route planning and GPS navigation tools",
    icon: Navigation,
    category: "Main",
  },
  {
    path: "/captain/notifications",
    name: "Notifications",
    description: "System alerts, updates, and important messages",
    icon: Bell,
    category: "Tools",
  },
  {
    path: "/captain/shift-summary",
    name: "Shift Summary",
    description: "Performance metrics and earnings summary",
    icon: BarChart3,
    category: "Tools",
  },
  {
    path: "/captain/profile",
    name: "Profile Settings",
    description: "Manage personal information and preferences",
    icon: User,
    category: "Account",
  },
  {
    path: "/captain/support",
    name: "Help & Support",
    description: "Get help, report issues, and contact support",
    icon: HeadphonesIcon,
    category: "Account",
  },
];

export function CaptainRoutesOverview() {
  const categories = ["Main", "Tools", "Account"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Captain Panel Routes
        </h2>
        <p className="text-muted-foreground">
          Complete overview of all available captain dashboard pages
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{category} Navigation</h3>
            <Badge variant="secondary">
              {
                captainRoutes.filter((route) => route.category === category)
                  .length
              }{" "}
              pages
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {captainRoutes
              .filter((route) => route.category === category)
              .map((route) => {
                const Icon = route.icon;
                return (
                  <Card
                    key={route.path}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {route.name}
                          </CardTitle>
                          <code className="text-xs text-muted-foreground">
                            {route.path}
                          </code>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{route.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✅ All routes are properly linked in the sidebar navigation</p>
          <p>✅ Mobile-responsive design with collapsible sidebar</p>
          <p>✅ Badge notifications for orders and issues</p>
          <p>✅ User-friendly icons and descriptions</p>
          <p>✅ Organized into logical categories (Main, Tools, Account)</p>
        </CardContent>
      </Card>
    </div>
  );
}

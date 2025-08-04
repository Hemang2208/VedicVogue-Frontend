"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "order" | "reminder" | "alert" | "update";
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: "low" | "medium" | "high";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Assigned",
    message:
      "Order VV-2024-001 has been assigned to you for delivery to Whitefield",
    time: "2 mins ago",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "reminder",
    title: "Delivery Reminder",
    message: "Order VV-2024-002 is due for delivery in 15 minutes",
    time: "15 mins ago",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "update",
    title: "Route Updated",
    message:
      "Your delivery route has been optimized. Check navigation for updates",
    time: "30 mins ago",
    read: true,
    priority: "low",
  },
  {
    id: "4",
    type: "alert",
    title: "Weather Alert",
    message: "Heavy rain expected in your delivery area. Drive safely",
    time: "1 hour ago",
    read: true,
    priority: "high",
  },
  {
    id: "5",
    type: "order",
    title: "Order Completed",
    message: "Order VV-2024-003 has been successfully delivered",
    time: "2 hours ago",
    read: true,
    priority: "low",
  },
];

export default function CaptainNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const { toast } = useToast();

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read",
    });
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    toast({
      title: "Notification Deleted",
      description: "Notification has been removed",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="h-5 w-5 text-blue-600" />;
      case "reminder":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "update":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with your delivery tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {unreadCount} unread
          </Badge>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-400 mb-2">No notifications</div>
              <p className="text-sm text-gray-600">
                You&apos;re all caught up!
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all ${
                !notification.read
                  ? "border-l-4 border-l-blue-500 bg-blue-50/30"
                  : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-medium ${
                            !notification.read
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <Badge
                        className={getPriorityColor(notification.priority)}
                        variant="outline"
                      >
                        {notification.priority}
                      </Badge>
                    </div>

                    <p
                      className={`text-sm mb-2 ${
                        !notification.read ? "text-gray-700" : "text-gray-600"
                      }`}
                    >
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            onClick={() => handleMarkAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                          >
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          onClick={() =>
                            handleDeleteNotification(notification.id)
                          }
                          variant="ghost"
                          size="sm"
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

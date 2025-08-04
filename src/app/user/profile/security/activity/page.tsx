"use client";

import { useCallback, useEffect, useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { VVInput } from "@/components/ui/vv-input";
import { VVBadge } from "@/components/ui/vv-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Monitor,
  // Filter,
  Download,
  Search,
  // Calendar,
} from "lucide-react";

interface SecurityActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status: string;
  location: string;
  device?: string;
  ip?: string;
  userAgent?: string;
}

// Extended security activities data
const allSecurityActivities: SecurityActivity[] = [
  {
    id: "1",
    type: "login",
    description: "Successful login from Chrome on Windows",
    timestamp: "2 minutes ago",
    status: "success",
    location: "Gurgaon, Haryana",
    device: "Chrome on Windows",
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "2",
    type: "password_change",
    description: "Password changed successfully",
    timestamp: "3 days ago",
    status: "success",
    location: "Gurgaon, Haryana",
    device: "Chrome on Windows",
    ip: "192.168.1.1",
  },
  {
    id: "3",
    type: "failed_login",
    description: "Failed login attempt",
    timestamp: "1 week ago",
    status: "warning",
    location: "Unknown location",
    device: "Unknown device",
    ip: "203.0.113.1",
  },
  {
    id: "4",
    type: "login",
    description: "Successful login from Safari on iPhone",
    timestamp: "2 weeks ago",
    status: "success",
    location: "Delhi, India",
    device: "Safari on iPhone",
    ip: "192.168.1.2",
  },
  {
    id: "5",
    type: "logout",
    description: "Logged out from Chrome on Windows",
    timestamp: "2 weeks ago",
    status: "info",
    location: "Gurgaon, Haryana",
    device: "Chrome on Windows",
    ip: "192.168.1.1",
  },
  {
    id: "6",
    type: "failed_login",
    description: "Multiple failed login attempts",
    timestamp: "3 weeks ago",
    status: "warning",
    location: "Unknown location",
    device: "Unknown device",
    ip: "198.51.100.1",
  },
  {
    id: "7",
    type: "security_setting",
    description: "Two-factor authentication enabled",
    timestamp: "1 month ago",
    status: "success",
    location: "Gurgaon, Haryana",
    device: "Chrome on Windows",
    ip: "192.168.1.1",
  },
  {
    id: "8",
    type: "login",
    description: "Successful login from Chrome on Android",
    timestamp: "1 month ago",
    status: "success",
    location: "Mumbai, Maharashtra",
    device: "Chrome on Android",
    ip: "192.168.1.3",
  },
  {
    id: "9",
    type: "session_terminated",
    description: "Session terminated due to inactivity",
    timestamp: "1 month ago",
    status: "info",
    location: "Gurgaon, Haryana",
    device: "Chrome on Windows",
    ip: "192.168.1.1",
  },
  {
    id: "10",
    type: "failed_login",
    description: "Failed login attempt with incorrect password",
    timestamp: "2 months ago",
    status: "warning",
    location: "Bangalore, Karnataka",
    device: "Firefox on Windows",
    ip: "203.0.113.5",
  },
];

export default function SecurityActivityPage() {
  const [activities] = useState(allSecurityActivities);
  const [filteredActivities, setFilteredActivities] = useState(
    allSecurityActivities
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const getActivityIcon = (type: string, status: string) => {
    if (status === "warning") return AlertTriangle;
    if (type === "login") return Shield;
    if (type === "logout") return Shield;
    if (type === "password_change") return Key;
    if (type === "security_setting") return Shield;
    if (type === "session_terminated") return Clock;
    return CheckCircle;
  };

  const getActivityColor = (status: string) => {
    if (status === "warning") return "text-yellow-600";
    if (status === "success") return "text-green-600";
    if (status === "info") return "text-blue-600";
    return "text-gray-600";
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "warning") return "destructive";
    if (status === "success") return "default";
    if (status === "info") return "secondary";
    return "outline";
  };

  const applyFilters = useCallback(
    (search: string, status: string, type: string, time: string) => {
      let filtered = activities;

      // Search filter
      if (search) {
        filtered = filtered.filter(
          (activity) =>
            activity.description.toLowerCase().includes(search.toLowerCase()) ||
            activity.location.toLowerCase().includes(search.toLowerCase()) ||
            activity.device?.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Status filter
      if (status !== "all") {
        filtered = filtered.filter((activity) => activity.status === status);
      }

      // Type filter
      if (type !== "all") {
        filtered = filtered.filter((activity) => activity.type === type);
      }

      // Time filter (simplified - in real app, you'd parse actual dates)
      if (time !== "all") {
        // This is a simplified implementation
        // In a real app, you'd parse the timestamp and filter by actual dates
        if (time === "today") {
          filtered = filtered.filter(
            (activity) =>
              activity.timestamp.includes("minutes ago") ||
              activity.timestamp.includes("hours ago")
          );
        } else if (time === "week") {
          filtered = filtered.filter(
            (activity) =>
              activity.timestamp.includes("minutes ago") ||
              activity.timestamp.includes("hours ago") ||
              activity.timestamp.includes("days ago") ||
              activity.timestamp.includes("1 week ago")
          );
        } else if (time === "month") {
          filtered = filtered.filter(
            (activity) => !activity.timestamp.includes("months ago")
          );
        }
      }

      setFilteredActivities(filtered);
    },
    [activities]
  );

  const handleSearch = useCallback(
    async (term: string) => {
      setSearchTerm(term);
      applyFilters(term, statusFilter, typeFilter, timeFilter);
      console.log("Searching for:", term);
    },
    [statusFilter, typeFilter, timeFilter, applyFilters]
  );

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status, typeFilter, timeFilter);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    applyFilters(searchTerm, statusFilter, type, timeFilter);
  };

  const handleTimeFilter = (time: string) => {
    setTimeFilter(time);
    applyFilters(searchTerm, statusFilter, typeFilter, time);
  };

  // Debounce logic - runs 1 sec after typing stops
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredActivities(activities);
        return;
      }
      applyFilters(searchTerm, statusFilter, typeFilter, timeFilter);
      setDebouncedSearch(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    statusFilter,
    typeFilter,
    timeFilter,
    applyFilters,
    activities,
  ]);

  // Actual search handler (fires after debounce)
  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch, handleSearch]);

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/PDF report
    console.log("Exporting security activity report...");
    alert("Security activity report will be downloaded shortly.");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <VVButton variant="ghost" size="icon" asChild>
                <Link href="/user/profile/security">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold">Security Activity</h1>
                <p className="text-muted-foreground">
                  Complete history of your account security activities
                </p>
              </div>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <VVCard>
              <VVCardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <VVInput
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Optional Search Button */}
                  <VVButton
                    variant="default"
                    onClick={() => handleSearch(searchTerm)}
                    className="whitespace-nowrap"
                  >
                    Search
                  </VVButton>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select
                      value={statusFilter}
                      onValueChange={handleStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={handleTypeFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="login">Login</SelectItem>
                        <SelectItem value="logout">Logout</SelectItem>
                        <SelectItem value="failed_login">
                          Failed Login
                        </SelectItem>
                        <SelectItem value="password_change">
                          Password Change
                        </SelectItem>
                        <SelectItem value="security_setting">
                          Security Setting
                        </SelectItem>
                        <SelectItem value="session_terminated">
                          Session Terminated
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={timeFilter} onValueChange={handleTimeFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>

                    <VVButton variant="outline" onClick={handleExport}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </VVButton>
                  </div>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Activity List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center justify-between">
                  <span>Security Activities ({filteredActivities.length})</span>
                  <VVBadge variant="secondary">
                    {filteredActivities.length} of {activities.length}{" "}
                    activities
                  </VVBadge>
                </VVCardTitle>
              </VVCardHeader>
              <VVCardContent>
                {filteredActivities.length === 0 ? (
                  <div className="text-center py-12">
                    <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No activities found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredActivities.map((activity, index) => {
                      const Icon = getActivityIcon(
                        activity.type,
                        activity.status
                      );
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                          <div
                            className={`p-2 rounded-full bg-muted ${getActivityColor(
                              activity.status
                            )}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <p className="font-medium text-sm mb-1">
                                  {activity.description}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {activity.timestamp}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {activity.location}
                                  </span>
                                  {activity.device && (
                                    <span className="flex items-center gap-1">
                                      <Monitor className="h-3 w-3" />
                                      {activity.device}
                                    </span>
                                  )}
                                  {activity.ip && (
                                    <span className="font-mono">
                                      IP: {activity.ip}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <VVBadge
                                variant={getStatusBadgeVariant(activity.status)}
                              >
                                {activity.status}
                              </VVBadge>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
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
  Tabs,
  // TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  History,
  Search,
  Clock,
  Eye,
  ShoppingCart,
  Utensils,
  Trash2,
  Download,
  Star,
  MapPin,
  // Calendar,
  // BookOpen,
  // Filter,
  // ChefHat,
  // Coffee,
  // Bookmark,
} from "lucide-react";
import Image from "next/image";

interface HistoryItem {
  id: string;
  type: "order" | "view" | "search" | "restaurant_visit";
  title: string;
  description: string;
  image?: string;
  timestamp: string;
  category: string;
  metadata: {
    rating?: number;
    price?: number;
    location?: string;
    duration?: string;
    searchQuery?: string;
    orderStatus?: string;
  };
  url: string;
}

const mockHistoryItems: HistoryItem[] = [
  {
    id: "1",
    type: "order",
    title: "Paneer Tikka Masala Order",
    description: "Order #VV-2024-001 - Delivered successfully",
    image: "https://placehold.co/60x60/svg",
    timestamp: "2024-01-20T14:30:00Z",
    category: "Main Course",
    metadata: {
      rating: 4.5,
      price: 299,
      orderStatus: "delivered",
    },
    url: "/user/profile/orders/ORD001",
  },
  {
    id: "2",
    type: "view",
    title: "Butter Chicken Recipe",
    description: "Viewed recipe details and cooking instructions",
    image: "https://placehold.co/60x60/svg",
    timestamp: "2024-01-20T12:15:00Z",
    category: "Recipe",
    metadata: {
      rating: 4.8,
      duration: "3 minutes",
    },
    url: "/recipes/butter-chicken",
  },
  {
    id: "3",
    type: "restaurant_visit",
    title: "Spice Garden Restaurant",
    description: "Browsed menu and restaurant information",
    image: "https://placehold.co/60x60/svg",
    timestamp: "2024-01-19T19:45:00Z",
    category: "Restaurant",
    metadata: {
      rating: 4.3,
      location: "Gurgaon, Haryana",
      duration: "8 minutes",
    },
    url: "/restaurants/spice-garden",
  },
  {
    id: "4",
    type: "search",
    title: 'Search: "vegetarian biryani"',
    description: "Searched for vegetarian biryani recipes and restaurants",
    timestamp: "2024-01-19T16:20:00Z",
    category: "Search",
    metadata: {
      searchQuery: "vegetarian biryani",
    },
    url: "/search?q=vegetarian+biryani",
  },
  {
    id: "5",
    type: "view",
    title: "10 Health Benefits of Turmeric",
    description: "Read article about turmeric's health benefits",
    image: "https://placehold.co/60x60/svg",
    timestamp: "2024-01-19T11:30:00Z",
    category: "Article",
    metadata: {
      duration: "5 minutes",
    },
    url: "/articles/turmeric-benefits",
  },
  {
    id: "6",
    type: "order",
    title: "Masala Dosa & Filter Coffee",
    description: "Order #VV-2024-002 - Currently being prepared",
    image: "https://placehold.co/60x60/svg",
    timestamp: "2024-01-18T09:15:00Z",
    category: "South Indian",
    metadata: {
      price: 199,
      orderStatus: "preparing",
    },
    url: "/user/profile/orders/ORD002",
  },
  {
    id: "7",
    type: "view",
    title: "Homemade Naan Recipe",
    description: "Viewed step-by-step naan bread recipe",
    image: "https://placehold.co/60x60/svg",
    timestamp: "2024-01-17T20:10:00Z",
    category: "Recipe",
    metadata: {
      rating: 4.6,
      duration: "4 minutes",
    },
    url: "/recipes/naan-bread",
  },
  {
    id: "8",
    type: "search",
    title: 'Search: "healthy indian breakfast"',
    description: "Searched for healthy Indian breakfast options",
    timestamp: "2024-01-17T08:30:00Z",
    category: "Search",
    metadata: {
      searchQuery: "healthy indian breakfast",
    },
    url: "/search?q=healthy+indian+breakfast",
  },
];

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState(mockHistoryItems);
  const [filteredItems, setFilteredItems] = useState(mockHistoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return ShoppingCart;
      case "view":
        return Eye;
      case "search":
        return Search;
      case "restaurant_visit":
        return Utensils;
      default:
        return History;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-green-100 text-green-800";
      case "view":
        return "bg-blue-100 text-blue-800";
      case "search":
        return "bg-purple-100 text-purple-800";
      case "restaurant_visit":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;

    return time.toLocaleDateString();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedType, selectedCategory, timeFilter, activeTab);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    applyFilters(searchTerm, type, selectedCategory, timeFilter, activeTab);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, selectedType, category, timeFilter, activeTab);
  };

  const handleTimeFilter = (time: string) => {
    setTimeFilter(time);
    applyFilters(searchTerm, selectedType, selectedCategory, time, activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    applyFilters(searchTerm, selectedType, selectedCategory, timeFilter, tab);
  };

  const applyFilters = (
    search: string,
    type: string,
    category: string,
    time: string,
    tab: string
  ) => {
    let filtered = historyItems;

    // Tab filter
    if (tab !== "all") {
      filtered = filtered.filter((item) => item.type === tab);
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.metadata.searchQuery
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    // Type filter
    if (type !== "all") {
      filtered = filtered.filter((item) => item.type === type);
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Time filter
    if (time !== "all") {
      const now = new Date();
      filtered = filtered.filter((item) => {
        const itemTime = new Date(item.timestamp);
        const diffInHours =
          (now.getTime() - itemTime.getTime()) / (1000 * 60 * 60);

        switch (time) {
          case "today":
            return diffInHours <= 24;
          case "week":
            return diffInHours <= 168; // 7 days
          case "month":
            return diffInHours <= 720; // 30 days
          default:
            return true;
        }
      });
    }

    setFilteredItems(filtered);
  };

  const clearHistory = (type?: string) => {
    if (type) {
      const updatedItems = historyItems.filter((item) => item.type !== type);
      setHistoryItems(updatedItems);
      setFilteredItems(
        updatedItems.filter(
          (item) => activeTab === "all" || item.type === activeTab
        )
      );
    } else {
      setHistoryItems([]);
      setFilteredItems([]);
    }
  };

  const removeItem = (id: string) => {
    const updatedItems = historyItems.filter((item) => item.id !== id);
    setHistoryItems(updatedItems);
    setFilteredItems(filteredItems.filter((item) => item.id !== id));
  };

  const exportHistory = () => {
    // In a real app, this would generate and download a file
    console.log("Exporting history...");
    alert("History export will be available for download shortly.");
  };

  const categories = Array.from(
    new Set(historyItems.map((item) => item.category))
  );
  const orderCount = historyItems.filter(
    (item) => item.type === "order"
  ).length;
  const viewCount = historyItems.filter((item) => item.type === "view").length;
  const searchCount = historyItems.filter(
    (item) => item.type === "search"
  ).length;
  const visitCount = historyItems.filter(
    (item) => item.type === "restaurant_visit"
  ).length;

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
                <Link href="/user/profile">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </VVButton>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <History className="h-8 w-8" />
                  Activity History
                </h1>
                <p className="text-muted-foreground">
                  Your browsing, ordering, and search history
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">
                  All ({historyItems.length})
                </TabsTrigger>
                <TabsTrigger value="order">
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  Orders ({orderCount})
                </TabsTrigger>
                <TabsTrigger value="view">
                  <Eye className="mr-1 h-4 w-4" />
                  Views ({viewCount})
                </TabsTrigger>
                <TabsTrigger value="search">
                  <Search className="mr-1 h-4 w-4" />
                  Searches ({searchCount})
                </TabsTrigger>
                <TabsTrigger value="restaurant_visit">
                  <Utensils className="mr-1 h-4 w-4" />
                  Visits ({visitCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Filters and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <VVCard>
              <VVCardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <VVInput
                        placeholder="Search your history..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select
                      value={selectedType}
                      onValueChange={handleTypeFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="order">Orders</SelectItem>
                        <SelectItem value="view">Views</SelectItem>
                        <SelectItem value="search">Searches</SelectItem>
                        <SelectItem value="restaurant_visit">
                          Restaurant Visits
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedCategory}
                      onValueChange={handleCategoryFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
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

                    <VVButton variant="outline" onClick={exportHistory}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </VVButton>
                  </div>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* History Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filteredItems.length === 0 ? (
              <VVCard>
                <VVCardContent className="text-center py-12">
                  <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No history found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </VVCardContent>
              </VVCard>
            ) : (
              <VVCard>
                <VVCardHeader className="flex flex-row items-center justify-between">
                  <VVCardTitle>
                    Activity History ({filteredItems.length} items)
                  </VVCardTitle>
                  <VVButton
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      clearHistory(activeTab === "all" ? undefined : activeTab)
                    }
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear {activeTab === "all" ? "All" : activeTab} History
                  </VVButton>
                </VVCardHeader>
                <VVCardContent>
                  <div className="space-y-4">
                    {filteredItems.map((item, index: number) => {
                      const TypeIcon = getTypeIcon(item.type);

                      return (
                        <motion.div
                          key={item.id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                          {/* Icon and Image */}
                          <div className="flex-shrink-0">
                            {item.image ? (
                              <div className="relative">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  className="w-12 h-12 rounded-lg object-cover"
                                  fill
                                />
                                <div className="absolute -top-1 -right-1">
                                  <div
                                    className={`p-1 rounded-full ${getTypeColor(
                                      item.type
                                    )}`}
                                  >
                                    <TypeIcon className="h-3 w-3" />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`p-3 rounded-lg ${getTypeColor(
                                  item.type
                                )}`}
                              >
                                <TypeIcon className="h-6 w-6" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-medium text-sm mb-1 line-clamp-1">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                  {item.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatTimeAgo(item.timestamp)}
                                  </span>

                                  {item.metadata.duration && (
                                    <span>
                                      Duration: {item.metadata.duration}
                                    </span>
                                  )}

                                  {item.metadata.location && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {item.metadata.location}
                                    </span>
                                  )}

                                  {item.metadata.rating && (
                                    <span className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      {item.metadata.rating}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {item.metadata.price && (
                                  <VVBadge variant="secondary">
                                    ₹{item.metadata.price}
                                  </VVBadge>
                                )}

                                {item.metadata.orderStatus && (
                                  <VVBadge
                                    className={getOrderStatusColor(
                                      item.metadata.orderStatus
                                    )}
                                  >
                                    {item.metadata.orderStatus}
                                  </VVBadge>
                                )}

                                <VVButton size="sm" variant="outline" asChild>
                                  <Link href={item.url}>
                                    <Eye className="mr-1 h-3 w-3" />
                                    View
                                  </Link>
                                </VVButton>

                                <VVButton
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 text-red-500 hover:text-red-700"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </VVButton>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </VVCardContent>
              </VVCard>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

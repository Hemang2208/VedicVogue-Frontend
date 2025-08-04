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
  Download,
  Search,
  Calendar,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  HardDrive,
  Share2,
  // Eye,
  // Filter,
} from "lucide-react";

interface DownloadItem {
  id: string;
  name: string;
  type: "pdf" | "image" | "video" | "audio" | "archive" | "document";
  size: string;
  downloadDate: string;
  status: "completed" | "downloading" | "failed" | "expired";
  progress?: number;
  category: string;
  description: string;
  expiryDate?: string;
  downloadCount: number;
  maxDownloads?: number;
  url: string;
}

const mockDownloads: DownloadItem[] = [
  {
    id: "1",
    name: "VedicVogue Recipe Collection 2024.pdf",
    type: "pdf",
    size: "15.2 MB",
    downloadDate: "2024-01-20T14:30:00Z",
    status: "completed",
    category: "Recipes",
    description: "Complete collection of traditional Indian recipes",
    downloadCount: 3,
    maxDownloads: 5,
    url: "#",
  },
  {
    id: "2",
    name: "Cooking Masterclass - Biryani.mp4",
    type: "video",
    size: "245.8 MB",
    downloadDate: "2024-01-19T16:45:00Z",
    status: "completed",
    category: "Video Tutorials",
    description: "Step-by-step biryani cooking masterclass",
    expiryDate: "2024-02-19T16:45:00Z",
    downloadCount: 1,
    maxDownloads: 3,
    url: "#",
  },
  {
    id: "3",
    name: "Spice Identification Guide.pdf",
    type: "pdf",
    size: "8.7 MB",
    downloadDate: "2024-01-18T11:20:00Z",
    status: "completed",
    category: "Educational",
    description: "Visual guide to identify and use Indian spices",
    downloadCount: 2,
    url: "#",
  },
  {
    id: "4",
    name: "Restaurant Menu Templates.zip",
    type: "archive",
    size: "42.3 MB",
    downloadDate: "2024-01-17T09:15:00Z",
    status: "completed",
    category: "Templates",
    description: "Professional menu design templates",
    downloadCount: 1,
    maxDownloads: 10,
    url: "#",
  },
  {
    id: "5",
    name: "Indian Classical Music for Dining.mp3",
    type: "audio",
    size: "67.4 MB",
    downloadDate: "2024-01-16T20:30:00Z",
    status: "completed",
    category: "Audio",
    description: "Curated playlist for dining ambiance",
    downloadCount: 5,
    url: "#",
  },
  {
    id: "6",
    name: "Food Photography Tips.pdf",
    type: "pdf",
    size: "12.1 MB",
    downloadDate: "2024-01-15T13:45:00Z",
    status: "downloading",
    progress: 67,
    category: "Photography",
    description: "Professional food photography techniques",
    downloadCount: 0,
    url: "#",
  },
  {
    id: "7",
    name: "Ayurvedic Cooking Principles.pdf",
    type: "pdf",
    size: "9.8 MB",
    downloadDate: "2024-01-14T10:20:00Z",
    status: "failed",
    category: "Health",
    description: "Ancient Ayurvedic principles for healthy cooking",
    downloadCount: 0,
    url: "#",
  },
  {
    id: "8",
    name: "Regional Cuisine Map of India.jpg",
    type: "image",
    size: "5.2 MB",
    downloadDate: "2024-01-13T15:10:00Z",
    status: "expired",
    category: "Educational",
    description: "Interactive map showing regional Indian cuisines",
    expiryDate: "2024-01-20T15:10:00Z",
    downloadCount: 2,
    maxDownloads: 3,
    url: "#",
  },
];

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState(mockDownloads);
  const [filteredDownloads, setFilteredDownloads] = useState(mockDownloads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return FileText;
      case "image":
        return Image;
      case "video":
        return Video;
      case "audio":
        return Music;
      case "archive":
        return Archive;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return "bg-red-100 text-red-800";
      case "image":
        return "bg-green-100 text-green-800";
      case "video":
        return "bg-blue-100 text-blue-800";
      case "audio":
        return "bg-purple-100 text-purple-800";
      case "archive":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "downloading":
        return RefreshCw;
      case "failed":
        return AlertCircle;
      case "expired":
        return Clock;
      default:
        return Download;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "downloading":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
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

    return time.toLocaleDateString();
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(
      term,
      selectedType,
      selectedStatus,
      selectedCategory,
      activeTab
    );
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    applyFilters(searchTerm, type, selectedStatus, selectedCategory, activeTab);
  };

  // const handleStatusFilter = (status: string) => {
  //   setSelectedStatus(status);
  //   applyFilters(searchTerm, selectedType, status, selectedCategory, activeTab);
  // };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, selectedType, selectedStatus, category, activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    applyFilters(
      searchTerm,
      selectedType,
      selectedStatus,
      selectedCategory,
      tab
    );
  };

  const applyFilters = (
    search: string,
    type: string,
    status: string,
    category: string,
    tab: string
  ) => {
    let filtered = downloads;

    // Tab filter
    if (tab !== "all") {
      filtered = filtered.filter((item) => item.status === tab);
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type filter
    if (type !== "all") {
      filtered = filtered.filter((item) => item.type === type);
    }

    // Status filter
    if (status !== "all") {
      filtered = filtered.filter((item) => item.status === status);
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    setFilteredDownloads(filtered);
  };

  const handleDownload = (id: string) => {
    const item = downloads.find((d) => d.id === id);
    if (!item) return;

    if (item.status === "expired") {
      alert(
        "This download has expired. Please contact support for a new link."
      );
      return;
    }

    if (item.maxDownloads && item.downloadCount >= item.maxDownloads) {
      alert("Maximum download limit reached for this item.");
      return;
    }

    // Simulate download
    const updatedDownloads = downloads.map((d) =>
      d.id === id ? { ...d, downloadCount: d.downloadCount + 1 } : d
    );
    setDownloads(updatedDownloads);
    setFilteredDownloads(
      filteredDownloads.map((d) =>
        d.id === id ? { ...d, downloadCount: d.downloadCount + 1 } : d
      )
    );

    // In a real app, this would trigger the actual download
    console.log(`Downloading: ${item.name}`);
  };

  const handleRetryDownload = (id: string) => {
    const updatedDownloads = downloads.map((d) =>
      d.id === id ? { ...d, status: "downloading" as const, progress: 0 } : d
    );
    setDownloads(updatedDownloads);
    setFilteredDownloads(
      filteredDownloads.map((d) =>
        d.id === id ? { ...d, status: "downloading" as const, progress: 0 } : d
      )
    );

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        const completedDownloads = downloads.map((d) =>
          d.id === id
            ? { ...d, status: "completed" as const, progress: undefined }
            : d
        );
        setDownloads(completedDownloads);
        setFilteredDownloads(
          filteredDownloads.map((d) =>
            d.id === id
              ? { ...d, status: "completed" as const, progress: undefined }
              : d
          )
        );
      } else {
        const progressDownloads = downloads.map((d) =>
          d.id === id ? { ...d, progress } : d
        );
        setDownloads(progressDownloads);
        setFilteredDownloads(
          filteredDownloads.map((d) => (d.id === id ? { ...d, progress } : d))
        );
      }
    }, 500);
  };

  const removeDownload = (id: string) => {
    const updatedDownloads = downloads.filter((d) => d.id !== id);
    setDownloads(updatedDownloads);
    setFilteredDownloads(filteredDownloads.filter((d) => d.id !== id));
  };

  const clearAllDownloads = () => {
    setDownloads([]);
    setFilteredDownloads([]);
  };

  const categories = Array.from(
    new Set(downloads.map((item) => item.category))
  );
  const completedCount = downloads.filter(
    (item) => item.status === "completed"
  ).length;
  const downloadingCount = downloads.filter(
    (item) => item.status === "downloading"
  ).length;
  const failedCount = downloads.filter(
    (item) => item.status === "failed"
  ).length;
  const expiredCount = downloads.filter(
    (item) => item.status === "expired"
  ).length;

  const totalSize = downloads
    .filter((item) => item.status === "completed")
    .reduce((total, item) => {
      const size = parseFloat(item.size);
      const unit = item.size.split(" ")[1];
      const multiplier = unit === "GB" ? 1024 : unit === "KB" ? 0.001 : 1;
      return total + size * multiplier;
    }, 0);

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
                  <Download className="h-8 w-8" />
                  Downloads
                </h1>
                <p className="text-muted-foreground">
                  Manage your downloaded files and assets
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {downloads.length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Downloads
                  </p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {completedCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {downloadingCount}
                  </div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </VVCardContent>
              </VVCard>
              <VVCard>
                <VVCardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {totalSize.toFixed(1)} MB
                  </div>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                </VVCardContent>
              </VVCard>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({downloads.length})</TabsTrigger>
                <TabsTrigger value="completed">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Completed ({completedCount})
                </TabsTrigger>
                <TabsTrigger value="downloading">
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Downloading ({downloadingCount})
                </TabsTrigger>
                <TabsTrigger value="failed">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  Failed ({failedCount})
                </TabsTrigger>
                <TabsTrigger value="expired">
                  <Clock className="mr-1 h-4 w-4" />
                  Expired ({expiredCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
                        placeholder="Search downloads..."
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
                        <SelectValue placeholder="File Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="image">Images</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="archive">Archives</SelectItem>
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

                    <VVButton
                      variant="outline"
                      onClick={clearAllDownloads}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All
                    </VVButton>
                  </div>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Downloads List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {filteredDownloads.length === 0 ? (
              <VVCard>
                <VVCardContent className="text-center py-12">
                  <Download className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No downloads found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </VVCardContent>
              </VVCard>
            ) : (
              <VVCard>
                <VVCardHeader>
                  <VVCardTitle>
                    Downloads ({filteredDownloads.length} items)
                  </VVCardTitle>
                </VVCardHeader>
                <VVCardContent>
                  <div className="space-y-4">
                    {filteredDownloads.map((item, index) => {
                      const TypeIcon = getTypeIcon(item.type);
                      const StatusIcon = getStatusIcon(item.status);
                      const expired = isExpired(item.expiryDate);

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                          {/* File Type Icon */}
                          <div
                            className={`p-3 rounded-lg ${getTypeColor(
                              item.type
                            )}`}
                          >
                            <TypeIcon className="h-6 w-6" />
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-medium text-sm mb-1 line-clamp-1">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                  {item.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <HardDrive className="h-3 w-3" />
                                    {item.size}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatTimeAgo(item.downloadDate)}
                                  </span>
                                  <VVBadge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {item.category}
                                  </VVBadge>
                                  {item.maxDownloads && (
                                    <span>
                                      {item.downloadCount}/{item.maxDownloads}{" "}
                                      downloads
                                    </span>
                                  )}
                                  {item.expiryDate && !expired && (
                                    <span className="text-yellow-600">
                                      Expires:{" "}
                                      {new Date(
                                        item.expiryDate
                                      ).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>

                                {/* Progress Bar for Downloading */}
                                {item.status === "downloading" &&
                                  item.progress !== undefined && (
                                    <div className="mt-2">
                                      <div className="flex items-center justify-between text-xs mb-1">
                                        <span>Downloading...</span>
                                        <span>
                                          {Math.round(item.progress)}%
                                        </span>
                                      </div>
                                      <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                          className="bg-primary h-2 rounded-full transition-all"
                                          style={{ width: `${item.progress}%` }}
                                        />
                                      </div>
                                    </div>
                                  )}
                              </div>

                              <div className="flex items-center gap-2">
                                <VVBadge
                                  className={getStatusColor(item.status)}
                                >
                                  <StatusIcon
                                    className={`mr-1 h-3 w-3 ${
                                      item.status === "downloading"
                                        ? "animate-spin"
                                        : ""
                                    }`}
                                  />
                                  {item.status}
                                </VVBadge>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {item.status === "completed" && !expired && (
                              <VVButton
                                size="sm"
                                onClick={() => handleDownload(item.id)}
                                disabled={
                                  item.maxDownloads
                                    ? item.downloadCount >= item.maxDownloads
                                    : false
                                }
                              >
                                <Download className="mr-1 h-3 w-3" />
                                Download
                              </VVButton>
                            )}

                            {item.status === "failed" && (
                              <VVButton
                                size="sm"
                                variant="outline"
                                onClick={() => handleRetryDownload(item.id)}
                              >
                                <RefreshCw className="mr-1 h-3 w-3" />
                                Retry
                              </VVButton>
                            )}

                            {item.status === "expired" && (
                              <VVButton size="sm" variant="outline" disabled>
                                <Clock className="mr-1 h-3 w-3" />
                                Expired
                              </VVButton>
                            )}

                            <VVButton
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                            >
                              <Share2 className="h-4 w-4" />
                            </VVButton>

                            <VVButton
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-500 hover:text-red-700"
                              onClick={() => removeDownload(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </VVButton>
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

"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  // VVCardHeader,
  // VVCardTitle,
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
  Bookmark,
  Heart,
  Search,
  // Filter,
  Grid3X3,
  List,
  Star,
  // Clock,
  ShoppingCart,
  Trash2,
  Share2,
  Eye,
  Calendar,
  Tag,
  ChefHat,
  Utensils,
  Coffee,
} from "lucide-react";
import Image from "next/image";

interface SavedItem {
  id: string;
  type: "recipe" | "restaurant" | "dish" | "article";
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  price?: number;
  savedDate: string;
  tags: string[];
  url: string;
  isFavorite: boolean;
}

const mockSavedItems: SavedItem[] = [
  {
    id: "1",
    type: "recipe",
    title: "Authentic Butter Chicken Recipe",
    description:
      "Learn to make restaurant-style butter chicken at home with this easy recipe",
    image: "https://placehold.co/300x200/svg",
    category: "Main Course",
    rating: 4.8,
    savedDate: "2024-01-20",
    tags: ["Indian", "Chicken", "Curry", "Easy"],
    url: "/recipes/butter-chicken",
    isFavorite: true,
  },
  {
    id: "2",
    type: "restaurant",
    title: "Spice Garden Restaurant",
    description: "Authentic Indian cuisine with modern presentation",
    image: "https://placehold.co/300x200/svg",
    category: "Indian Restaurant",
    rating: 4.5,
    savedDate: "2024-01-18",
    tags: ["Indian", "Fine Dining", "Vegetarian Options"],
    url: "/restaurants/spice-garden",
    isFavorite: false,
  },
  {
    id: "3",
    type: "dish",
    title: "Paneer Tikka Masala",
    description: "Creamy and flavorful paneer tikka in rich tomato gravy",
    image: "https://placehold.co/300x200/svg",
    category: "Vegetarian",
    rating: 4.6,
    price: 299,
    savedDate: "2024-01-15",
    tags: ["Vegetarian", "Paneer", "Spicy"],
    url: "/dishes/paneer-tikka-masala",
    isFavorite: true,
  },
  {
    id: "4",
    type: "article",
    title: "10 Health Benefits of Indian Spices",
    description: "Discover the amazing health benefits of common Indian spices",
    image: "https://placehold.co/300x200/svg",
    category: "Health & Wellness",
    rating: 4.3,
    savedDate: "2024-01-12",
    tags: ["Health", "Spices", "Wellness", "Ayurveda"],
    url: "/articles/indian-spices-benefits",
    isFavorite: false,
  },
  {
    id: "5",
    type: "recipe",
    title: "Homemade Naan Bread",
    description:
      "Soft and fluffy naan bread recipe that's perfect for any curry",
    image: "https://placehold.co/300x200/svg",
    category: "Bread",
    rating: 4.7,
    savedDate: "2024-01-10",
    tags: ["Bread", "Indian", "Homemade", "Easy"],
    url: "/recipes/naan-bread",
    isFavorite: false,
  },
  {
    id: "6",
    type: "dish",
    title: "Biryani Special",
    description:
      "Aromatic basmati rice cooked with tender meat and exotic spices",
    image: "https://placehold.co/300x200/svg",
    category: "Rice Dishes",
    rating: 4.9,
    price: 399,
    savedDate: "2024-01-08",
    tags: ["Rice", "Biryani", "Spicy", "Non-Vegetarian"],
    url: "/dishes/biryani-special",
    isFavorite: true,
  },
];

export default function SavedPage() {
  const [savedItems, setSavedItems] = useState(mockSavedItems);
  const [filteredItems, setFilteredItems] = useState(mockSavedItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "recipe":
        return ChefHat;
      case "restaurant":
        return Utensils;
      case "dish":
        return Coffee;
      case "article":
        return Bookmark;
      default:
        return Bookmark;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "recipe":
        return "bg-green-100 text-green-800";
      case "restaurant":
        return "bg-blue-100 text-blue-800";
      case "dish":
        return "bg-orange-100 text-orange-800";
      case "article":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedType, selectedCategory, sortBy, activeTab);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    applyFilters(searchTerm, type, selectedCategory, sortBy, activeTab);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, selectedType, category, sortBy, activeTab);
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
    applyFilters(searchTerm, selectedType, selectedCategory, sort, activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    applyFilters(searchTerm, selectedType, selectedCategory, sortBy, tab);
  };

  const applyFilters = (
    search: string,
    type: string,
    category: string,
    sort: string,
    tab: string
  ) => {
    let filtered = savedItems;

    // Tab filter
    if (tab === "favorites") {
      filtered = filtered.filter((item) => item.isFavorite);
    } else if (tab !== "all") {
      filtered = filtered.filter((item) => item.type === tab);
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
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

    // Sort
    filtered.sort((a, b) => {
      switch (sort) {
        case "newest":
          return (
            new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.savedDate).getTime() - new Date(b.savedDate).getTime()
          );
        case "rating":
          return b.rating - a.rating;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  };

  const toggleFavorite = (id: string) => {
    const updatedItems = savedItems.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setSavedItems(updatedItems);

    // Update filtered items as well
    const updatedFiltered = filteredItems.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setFilteredItems(updatedFiltered);
  };

  const removeItem = (id: string) => {
    const updatedItems = savedItems.filter((item) => item.id !== id);
    setSavedItems(updatedItems);
    setFilteredItems(filteredItems.filter((item) => item.id !== id));
  };

  const categories = Array.from(
    new Set(savedItems.map((item) => item.category))
  );
  const favoriteCount = savedItems.filter((item) => item.isFavorite).length;

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
                  <Bookmark className="h-8 w-8" />
                  Saved Items
                </h1>
                <p className="text-muted-foreground">
                  Your bookmarked recipes, restaurants, dishes, and articles
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
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All ({savedItems.length})</TabsTrigger>
                <TabsTrigger value="favorites">
                  <Heart className="mr-1 h-4 w-4" />
                  Favorites ({favoriteCount})
                </TabsTrigger>
                <TabsTrigger value="recipe">
                  <ChefHat className="mr-1 h-4 w-4" />
                  Recipes
                </TabsTrigger>
                <TabsTrigger value="restaurant">
                  <Utensils className="mr-1 h-4 w-4" />
                  Restaurants
                </TabsTrigger>
                <TabsTrigger value="dish">
                  <Coffee className="mr-1 h-4 w-4" />
                  Dishes
                </TabsTrigger>
                <TabsTrigger value="article">
                  <Bookmark className="mr-1 h-4 w-4" />
                  Articles
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Filters and Search */}
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
                        placeholder="Search saved items..."
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
                        <SelectItem value="recipe">Recipes</SelectItem>
                        <SelectItem value="restaurant">Restaurants</SelectItem>
                        <SelectItem value="dish">Dishes</SelectItem>
                        <SelectItem value="article">Articles</SelectItem>
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

                    <Select value={sortBy} onValueChange={handleSort}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="title">Alphabetical</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Mode Toggle */}
                    <div className="flex border rounded-lg">
                      <VVButton
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </VVButton>
                      <VVButton
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </VVButton>
                    </div>
                  </div>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filteredItems.length === 0 ? (
              <VVCard>
                <VVCardContent className="text-center py-12">
                  <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No saved items found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </VVCardContent>
              </VVCard>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredItems.map((item, index) => {
                  const TypeIcon = getTypeIcon(item.type);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <VVCard
                        className={`h-full hover:shadow-lg transition-shadow ${
                          viewMode === "list" ? "flex-row" : ""
                        }`}
                      >
                        <div
                          className={viewMode === "list" ? "flex w-full" : ""}
                        >
                          {/* Image */}
                          <div
                            className={`relative ${
                              viewMode === "list"
                                ? "w-48 flex-shrink-0"
                                : "aspect-video"
                            }`}
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-t-lg"
                              fill
                            />
                            <div className="absolute top-2 left-2">
                              <VVBadge className={getTypeColor(item.type)}>
                                <TypeIcon className="mr-1 h-3 w-3" />
                                {item.type}
                              </VVBadge>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-1">
                              <VVButton
                                size="icon"
                                variant="secondary"
                                className="h-8 w-8"
                                onClick={() => toggleFavorite(item.id)}
                              >
                                <Heart
                                  className={`h-4 w-4 ${
                                    item.isFavorite
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                  }`}
                                />
                              </VVButton>
                            </div>
                          </div>

                          {/* Content */}
                          <VVCardContent
                            className={`p-4 ${
                              viewMode === "list" ? "flex-1" : ""
                            }`}
                          >
                            <div
                              className={`space-y-3 ${
                                viewMode === "list"
                                  ? "flex flex-col justify-between h-full"
                                  : ""
                              }`}
                            >
                              <div>
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="font-semibold text-lg line-clamp-2">
                                    {item.title}
                                  </h3>
                                  {item.price && (
                                    <span className="font-bold text-primary">
                                      ₹{item.price}
                                    </span>
                                  )}
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                  {item.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{item.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(
                                        item.savedDate
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-3">
                                  {item.tags.slice(0, 3).map((tag) => (
                                    <VVBadge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      <Tag className="mr-1 h-3 w-3" />
                                      {tag}
                                    </VVBadge>
                                  ))}
                                  {item.tags.length > 3 && (
                                    <VVBadge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      +{item.tags.length - 3} more
                                    </VVBadge>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                  <VVButton size="sm" asChild>
                                    <Link href={item.url}>
                                      <Eye className="mr-1 h-4 w-4" />
                                      View
                                    </Link>
                                  </VVButton>
                                  {item.type === "dish" && (
                                    <VVButton size="sm" variant="outline">
                                      <ShoppingCart className="mr-1 h-4 w-4" />
                                      Order
                                    </VVButton>
                                  )}
                                </div>

                                <div className="flex gap-1">
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
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </VVButton>
                                </div>
                              </div>
                            </div>
                          </VVCardContent>
                        </div>
                      </VVCard>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

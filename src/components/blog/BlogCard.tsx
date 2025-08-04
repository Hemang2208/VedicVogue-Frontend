// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import Link from "next/link";
// import { Clock, Calendar, User } from "lucide-react";
// import { BlogPost } from "@/lib/allBlogs";

// interface BlogCardProps {
//   post: BlogPost;
// }

// export function BlogCard({ post }: BlogCardProps) {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getCategoryColor = (category: string) => {
//     const colors = {
//       "Health & Nutrition": "bg-green-100 text-green-800 border-green-300",
//       Recipes: "bg-orange-100 text-orange-800 border-orange-300",
//       "Meal Planning": "bg-blue-100 text-blue-800 border-blue-300",
//       Nutrition: "bg-purple-100 text-purple-800 border-purple-300",
//       Ayurveda: "bg-yellow-100 text-yellow-800 border-yellow-300",
//       "Meal Prep": "bg-pink-100 text-pink-800 border-pink-300",
//     };
//     return (
//       colors[category as keyof typeof colors] ||
//       "bg-gray-100 text-gray-800 border-gray-300"
//     );
//   };

//   return (
//     <Card className="h-full group hover:shadow-lg transition-all duration-300 overflow-hidden">
//       <Link href={`/blogs/${post.id}`}>
//         <div className="relative aspect-video overflow-hidden">
//           <Image
//             src={post.featuredImage}
//             alt={post.title}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//           <div className="absolute top-3 left-3 flex gap-2">
//             <Badge
//               className={`${getCategoryColor(post.category)} border font-medium`}
//             >
//               {post.category}
//             </Badge>
//             {post.featured && (
//               <Badge className="bg-yellow-500 text-white border-yellow-600">
//                 Featured
//               </Badge>
//             )}
//           </div>
//         </div>

//         <CardContent className="p-6 space-y-4">
//           <div className="space-y-3">
//             <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
//               {post.title}
//             </h3>
//             <p className="text-muted-foreground line-clamp-3 leading-relaxed">
//               {post.excerpt}
//             </p>
//           </div>

//           <div className="flex items-center gap-4 text-sm text-muted-foreground">
//             <div className="flex items-center gap-1">
//               <Clock className="h-4 w-4" />
//               <span>{post.readTime} min read</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Calendar className="h-4 w-4" />
//               <span>{formatDate(post.publishedAt)}</span>
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//             <div className="flex items-center gap-3">
//               <div className="relative w-8 h-8 rounded-full overflow-hidden">
//                 <Image
//                   src={post.author.avatar}
//                   alt={post.author.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="flex items-center gap-1 text-sm">
//                 <User className="h-3 w-3" />
//                 <span className="font-medium">{post.author.name}</span>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-1">
//               {post.tags.slice(0, 2).map((tag) => (
//                 <Badge key={tag} variant="outline" className="text-xs">
//                   #{tag}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Link>
//     </Card>
//   );
// }
// import { motion } from "framer-motion";
// import { Navigation } from "@/components/layout/navbar";
// import { Footer } from "@/components/layout/footer";
// import { VVButton } from "@/components/ui/vv-button";
// import { VVCard, VVCardContent } from "@/components/ui/vv-card";
// import { VVBadge } from "@/components/ui/vv-badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Search,
//   Clock,
//   // User,
//   // Calendar,
//   TrendingUp,
//   BookOpen,
//   Filter,
//   Star,
//   ArrowRight,
// } from "lucide-react";
// import {
//   mockBlogs,
//   getFeaturedBlogs,
//   getAllCategories,
//   type BlogPost,
// } from "@/lib/allBlogs";

// const categories = ["All", ...getAllCategories()];

// const sortOptions = [
//   { value: "newest", label: "Newest First" },
//   { value: "oldest", label: "Oldest First" },
//   { value: "popular", label: "Most Popular" },
//   { value: "featured", label: "Featured First" },
// ];

// export default function BlogPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("newest");
//   const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(mockBlogs);
//   const featuredBlogs = getFeaturedBlogs();

//   useEffect(() => {
//     let filtered = mockBlogs;

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (blog) =>
//           blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           blog.tags.some((tag) =>
//             tag.toLowerCase().includes(searchQuery.toLowerCase())
//           ) ||
//           blog.category.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Filter by category
//     if (selectedCategory !== "All") {
//       filtered = filtered.filter((blog) => blog.category === selectedCategory);
//     }

//     // Sort blogs
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "oldest":
//           return (
//             new Date(a.publishedAt).getTime() -
//             new Date(b.publishedAt).getTime()
//           );
//         case "popular":
//           return b.readTime - a.readTime; // Using readTime as popularity metric
//         case "featured":
//           return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
//         default: // newest
//           return (
//             new Date(b.publishedAt).getTime() -
//             new Date(a.publishedAt).getTime()
//           );
//       }
//     });

//     setFilteredBlogs(filtered);
//   }, [searchQuery, selectedCategory, sortBy]);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getCategoryColor = (category: string) => {
//     const colors = {
//       "Health & Nutrition": "bg-green-100 text-green-800",
//       Recipes: "bg-orange-100 text-orange-800",
//       "Meal Planning": "bg-blue-100 text-blue-800",
//       Nutrition: "bg-purple-100 text-purple-800",
//       Ayurveda: "bg-yellow-100 text-yellow-800",
//       "Meal Prep": "bg-pink-100 text-pink-800",
//     };
//     return (
//       colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
//     );
//   };

//   return (
//     <div className="min-h-screen bg-muted/30">
//       <Navigation />

//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-primary/5 to-primary/10 py-20">
//         <div className="container">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 px-2">
//               Pure Veg Food Blog
//             </h1>
//             <p className="text-xl text-muted-foreground mb-8 px-4">
//               Discover the world of vegetarian cuisine with our expert recipes,
//               nutrition tips, and meal planning guides.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/recipes">
//                 <VVButton size="lg">Explore Recipes</VVButton>
//               </Link>
//               <Link href="/meal-plans">
//                 <VVButton size="lg" variant="outline">
//                   Meal Plans
//                 </VVButton>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container py-12">
//         {/* Featured Blogs */}
//         {featuredBlogs.length > 0 && (
//           <div className="mb-16">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-2xl font-bold flex items-center gap-2">
//                 <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
//                 Featured Posts
//               </h2>
//               <Link
//                 href="/blog/featured"
//                 className="text-primary hover:underline flex items-center gap-1"
//               >
//                 View all <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {featuredBlogs.slice(0, 3).map((blog) => (
//                 <VVCard
//                   key={blog.id}
//                   className="h-full group hover:shadow-lg transition-shadow"
//                 >
//                   <Link href={`/blog/${blog.id}`}>
//                     <div className="relative aspect-video overflow-hidden rounded-t-lg">
//                       <Image
//                         src={blog.featuredImage}
//                         alt={blog.title}
//                         fill
//                         className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       {blog.featured && (
//                         <VVBadge className="absolute top-2 left-2 bg-yellow-500 text-white">
//                           Featured
//                         </VVBadge>
//                       )}
//                     </div>
//                     <VVCardContent className="pt-4">
//                       <div className="flex justify-between items-center mb-2">
//                         <span
//                           className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
//                             blog.category
//                           )}`}
//                         >
//                           {blog.category}
//                         </span>
//                         <span className="text-sm text-muted-foreground flex items-center gap-1">
//                           <Clock className="w-3 h-3" />
//                           {blog.readTime} min read
//                         </span>
//                       </div>
//                       <h3 className="font-bold text-lg mb-2 line-clamp-2">
//                         {blog.title}
//                       </h3>
//                       <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
//                         {blog.excerpt}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <div className="relative w-6 h-6 rounded-full overflow-hidden">
//                             <Image
//                               src={blog.author.avatar}
//                               alt={blog.author.name}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                           <span className="text-sm">{blog.author.name}</span>
//                         </div>
//                         <span className="text-sm text-muted-foreground">
//                           {formatDate(blog.publishedAt)}
//                         </span>
//                       </div>
//                     </VVCardContent>
//                   </Link>
//                 </VVCard>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Search and Filter */}
//         <div className="mb-12">
//           <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search blogs..."
//                 className="pl-10"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="flex gap-4">
//               <Select
//                 value={selectedCategory}
//                 onValueChange={setSelectedCategory}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <div className="flex items-center gap-2">
//                     <Filter className="w-4 h-4" />
//                     <SelectValue placeholder="Filter by category" />
//                   </div>
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger className="w-[180px]">
//                   <div className="flex items-center gap-2">
//                     <TrendingUp className="w-4 h-4" />
//                     <SelectValue placeholder="Sort by" />
//                   </div>
//                 </SelectTrigger>
//                 <SelectContent>
//                   {sortOptions.map((option) => (
//                     <SelectItem key={option.value} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>

//         {/* All Blogs */}
//         <div>
//           <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//             <BookOpen className="w-5 h-5" />
//             Latest Articles
//           </h2>

//           {filteredBlogs.length === 0 ? (
//             <div className="text-center py-12">
//               <h3 className="text-xl font-medium mb-2">No blogs found</h3>
//               <p className="text-muted-foreground">
//                 Try adjusting your search or filter criteria
//               </p>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredBlogs.map((blog) => (
//                 <VVCard
//                   key={blog.id}
//                   className="h-full group hover:shadow-lg transition-shadow"
//                 >
//                   <Link href={`/blog/${blog.id}`}>
//                     <div className="relative aspect-video overflow-hidden rounded-t-lg">
//                       <Image
//                         src={blog.featuredImage}
//                         alt={blog.title}
//                         fill
//                         className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       {blog.featured && (
//                         <VVBadge className="absolute top-2 left-2 bg-yellow-500 text-white">
//                           Featured
//                         </VVBadge>
//                       )}
//                     </div>
//                     <VVCardContent className="pt-4">
//                       <div className="flex justify-between items-center mb-2">
//                         <span
//                           className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
//                             blog.category
//                           )}`}
//                         >
//                           {blog.category}
//                         </span>
//                         <span className="text-sm text-muted-foreground flex items-center gap-1">
//                           <Clock className="w-3 h-3" />
//                           {blog.readTime} min read
//                         </span>
//                       </div>
//                       <h3 className="font-bold text-lg mb-2 line-clamp-2">
//                         {blog.title}
//                       </h3>
//                       <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
//                         {blog.excerpt}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <div className="relative w-6 h-6 rounded-full overflow-hidden">
//                             <Image
//                               src={blog.author.avatar}
//                               alt={blog.author.name}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                           <span className="text-sm">{blog.author.name}</span>
//                         </div>
//                         <span className="text-sm text-muted-foreground">
//                           {formatDate(blog.publishedAt)}
//                         </span>
//                       </div>
//                     </VVCardContent>
//                   </Link>
//                 </VVCard>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Star,
  Eye,
  Heart,
} from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: number;
  featured: boolean;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Health & Nutrition": "bg-green-100 text-green-800 hover:bg-green-200",
      Recipes: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      "Meal Planning": "bg-blue-100 text-blue-800 hover:bg-blue-200",
      Nutrition: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      Ayurveda: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      "Meal Prep": "bg-pink-100 text-pink-800 hover:bg-pink-200",
      Lifestyle: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      Wellness: "bg-teal-100 text-teal-800 hover:bg-teal-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 hover:bg-gray-200"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={getCategoryColor(post.category)}>
              {post.category}
            </Badge>
            {post.featured && (
              <Badge className="bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Overlay actions */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col h-full">
          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-muted hover:bg-muted/80 cursor-pointer"
              >
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-muted">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </div>

          {/* Read time and stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{Math.floor(Math.random() * 1000) + 100}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{Math.floor(Math.random() * 50) + 10}</span>
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <Link href={`/blogs/${post.id}`} className="mt-auto">
            <Button
              variant="outline"
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

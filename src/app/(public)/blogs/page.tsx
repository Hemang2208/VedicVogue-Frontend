import { mockBlogs } from "@/lib/allBlogs";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const featuredPost = mockBlogs.find((post) => post.featured);

  const categories = Array.from(
    new Set(mockBlogs.map((post) => post.category))
  );
  const recentPosts = mockBlogs.filter((post) => !post.featured).slice(0, 7);

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Badge variant="secondary" className="mb-4 text-sm font-medium">
          Healthy Living
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
          Pure Veg Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover delicious recipes, nutrition tips, and healthy living advice
          for vegetarians.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Input
            placeholder="Search articles..."
            className="pl-10 pr-4 py-6 text-base"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-auto">
              <Image
                src={featuredPost.featuredImage}
                alt={featuredPost.title}
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Featured
                </Badge>
                <Badge variant="secondary">{featuredPost.category}</Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {featuredPost.excerpt}
              </p>
              <Button asChild className="w-fit group" variant="outline">
                <a href={`/blogs/${featuredPost.id}`}>
                  Read Article
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className="rounded-full px-4 py-2 border"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Articles */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recent Articles</h2>
          <Button variant="ghost" className="text-primary">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(mockBlogs.flatMap((post) => post.tags)))
            .slice(0, 12)
            .map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="px-3 py-1 text-sm cursor-pointer hover:bg-muted"
              >
                #{tag}
              </Badge>
            ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Subscribe to our newsletter for weekly recipes and nutrition tips
          delivered to your inbox.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <Input placeholder="Your email address" className="flex-1" />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}

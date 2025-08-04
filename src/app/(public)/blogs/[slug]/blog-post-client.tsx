"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Bookmark,
  BookmarkCheck,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
  Star,
  // ChevronRight,
  Eye,
  ThumbsUp,
  Send,
  // User,
  TrendingUp,
  Award,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface BlogPostClientProps {
  blog: BlogPost;
  initialLikes: number;
  initialViews: number;
  initialComments: Comment[];
}

// Main Component
export default function BlogPostClient({
  blog,
  initialLikes,
  initialViews,
  initialComments,
}: BlogPostClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [views] = useState(initialViews);
  const [copied, setCopied] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentLike = (commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleShare = async (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = blog.title;

    switch (platform) {
      case "copy":
        if (typeof navigator !== "undefined") {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        break;
      case "twitter":
        if (typeof window !== "undefined") {
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url
            )}&text=${encodeURIComponent(title)}`,
            "_blank"
          );
        }
        break;
      case "facebook":
        if (typeof window !== "undefined") {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`,
            "_blank"
          );
        }
        break;
      case "linkedin":
        if (typeof window !== "undefined") {
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              url
            )}`,
            "_blank"
          );
        }
        break;
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        author: "You",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        content: comment,
        date: "Just now",
        likes: 0,
        isLiked: false,
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Health & Nutrition": "bg-green-100 text-green-800 border-green-300",
      Recipes: "bg-orange-100 text-orange-800 border-orange-300",
      "Meal Planning": "bg-blue-100 text-blue-800 border-blue-300",
      Nutrition: "bg-purple-100 text-purple-800 border-purple-300",
      Ayurveda: "bg-yellow-100 text-yellow-800 border-yellow-300",
      "Meal Prep": "bg-pink-100 text-pink-800 border-pink-300",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-300"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />

      {/* Breadcrumb */}
      {/* <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/blog" className="hover:text-blue-600 font-medium">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">
              {blog.title}
            </span>
          </div>
        </div>
      </div> */}

      {/* Article Header */}
      <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge
                className={`${getCategoryColor(
                  blog.category
                )} border font-semibold`}
              >
                {blog.category}
              </Badge>
              {blog.featured && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {blog.title}
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium">By {blog.author.name}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{blog.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Eye className="h-4 w-4 text-blue-600" />
                <span>{views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLike}
                className={`${
                  isLiked
                    ? "text-red-500 border-red-500 bg-red-50"
                    : "hover:border-red-300 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
                />
                {likes}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleBookmark}
                className={`${
                  isBookmarked
                    ? "text-blue-500 border-blue-500 bg-blue-50"
                    : "hover:border-blue-300 hover:text-blue-500"
                }`}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 mr-2" />
                ) : (
                  <Bookmark className="h-4 w-4 mr-2" />
                )}
                {isBookmarked ? "Saved" : "Save"}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare("twitter")}
                  className="hover:text-blue-400"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare("facebook")}
                  className="hover:text-blue-600"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare("linkedin")}
                  className="hover:text-blue-700"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare("copy")}
                  className="hover:text-green-500"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-1 rounded-full text-sm transition-colors border border-gray-200 hover:border-blue-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <Card className="shadow-lg">
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{blog.author.name}</h3>
                      <p className="text-sm text-gray-600">
                        Nutrition Expert & Recipe Developer
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {blog.author.bio ||
                      "Passionate about creating healthy, delicious vegetarian recipes that nourish both body and soul."}
                  </p>
                  <Button className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Follow Author
                  </Button>
                </CardContent>
              </Card>

              {/* Share Card */}
              <Card className="shadow-lg">
                <CardContent>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share this article
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                      className="w-full justify-start"
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                      className="w-full justify-start"
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("linkedin")}
                      className="w-full justify-start"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("copy")}
                      className="w-full justify-start"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-blue-600" />
          Comments ({comments.length})
        </h2>

        {/* Add Comment */}
        <Card className="mb-8">
          <CardContent>
            <Textarea
              placeholder="Share your thoughts about this article..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <div className="flex justify-end">
              <Button onClick={handleCommentSubmit} disabled={!comment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent>
                <div className="flex items-start gap-4">
                  <Image
                    src={comment.avatar}
                    alt={comment.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{comment.author}</h4>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCommentLike(comment.id)}
                      className={`${
                        comment.isLiked
                          ? "text-blue-600 bg-blue-50"
                          : "hover:text-blue-600"
                      }`}
                    >
                      <ThumbsUp
                        className={`h-4 w-4 mr-1 ${
                          comment.isLiked ? "fill-current" : ""
                        }`}
                      />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blogs">
          <Button variant="outline" size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

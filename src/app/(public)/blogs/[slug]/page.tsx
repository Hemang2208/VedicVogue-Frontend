import { notFound } from "next/navigation";
import { mockBlogs } from "@/lib/allBlogs";
import BlogPostClient from "./blog-post-client";
import React from "react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = React.use(params);

  const foundBlog = mockBlogs.find((b) => b.id === slug.slug);
  if (!foundBlog) {
    notFound();
  }

  const likes = Math.floor(Math.random() * 100) + 20;
  const views = Math.floor(Math.random() * 1000) + 100;

  const initialComments = [
    {
      id: 1,
      author: "Priya Sharma",
      avatar: "https://placehold.co/40x40/svg",
      content:
        "This recipe looks amazing! I tried it last week and my family loved it. Thank you for sharing such detailed instructions.",
      date: "2 days ago",
      likes: 12,
      isLiked: false,
    },
    {
      id: 2,
      author: "Rajesh Kumar",
      avatar: "https://placehold.co/40x40/svg",
      content:
        "Great nutritional information! As someone who's been following a vegetarian diet for years, I appreciate the detailed breakdown of nutrients.",
      date: "1 week ago",
      likes: 8,
      isLiked: false,
    },
  ];

  return (
    <BlogPostClient
      blog={foundBlog}
      initialLikes={likes}
      initialViews={views}
      initialComments={initialComments}
    />
  );
}

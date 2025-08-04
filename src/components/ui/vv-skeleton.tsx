"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

function VVSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // @ts-expect-error – Suppressing type incompatibility with Slot + framer-motion
    <motion.div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      {...props}
    />
  )
}

// Preset skeleton components
function VVSkeletonCard() {
  return (
    <div className="space-y-3">
      <VVSkeleton className="h-48 w-full rounded-xl" />
      <div className="space-y-2">
        <VVSkeleton className="h-4 w-3/4" />
        <VVSkeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

function VVSkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <VVSkeleton key={i} className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")} />
      ))}
    </div>
  )
}

function VVSkeletonAvatar() {
  return <VVSkeleton className="h-12 w-12 rounded-full" />
}

export { VVSkeleton, VVSkeletonCard, VVSkeletonText, VVSkeletonAvatar }

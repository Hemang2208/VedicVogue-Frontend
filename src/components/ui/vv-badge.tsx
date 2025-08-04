"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white",
        warning: "border-transparent bg-yellow-500 text-white",
        info: "border-transparent bg-blue-500 text-white",
        gradient:
          "border-transparent bg-gradient-to-r from-primary to-orange-600 text-white",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface BadgeBaseProps extends VariantProps<typeof badgeVariants> {
  animate?: boolean;
}

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type MotionDivProps = HTMLMotionProps<"div">;

export type BadgeProps = BadgeBaseProps & (DivProps | MotionDivProps);

function VVBadge({
  className,
  variant,
  size,
  animate = false,
  ...props
}: BadgeProps) {
  const badgeClasses = cn(badgeVariants({ variant, size }), className);

  if (animate) {
    return (
      <motion.div
        className={badgeClasses}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        {...(props as MotionDivProps)}
      />
    );
  }

  return <div className={badgeClasses} {...(props as DivProps)} />;
}

export { VVBadge, badgeVariants };

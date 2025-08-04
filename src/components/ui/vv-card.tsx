"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// Card style variants
const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "shadow-sm hover:shadow-md",
        elevated: "shadow-lg hover:shadow-xl",
        outline: "border-2",
        ghost: "border-transparent bg-transparent",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

export interface CardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
  asChild?: boolean;
  children?: React.ReactNode; // ✅ Ensures safe children type
}

export const VVCard = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      hover = true,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(cardVariants({ variant, padding }), className);

    if (asChild) {
      return (
        // @ts-expect-error – Suppressing type incompatibility with Slot + framer-motion
        <Slot ref={ref} className={classes} {...props}>
          {children as React.ReactNode}
        </Slot>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={classes}
        whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
        transition={hover ? { duration: 0.2 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
VVCard.displayName = "VVCard";

// ---- Subcomponents ----

export const VVCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
VVCardHeader.displayName = "VVCardHeader";

export const VVCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
VVCardTitle.displayName = "VVCardTitle";

export const VVCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
VVCardDescription.displayName = "VVCardDescription";

export const VVCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
VVCardContent.displayName = "VVCardContent";

export const VVCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
VVCardFooter.displayName = "VVCardFooter";

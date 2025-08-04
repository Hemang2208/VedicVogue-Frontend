"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-10 sm:py-12 md:py-15 lg:py-18 mb-10 hero-pattern overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center lg:justify-start"
              >
                <Badge
                  variant="secondary"
                  className="text-xs sm:text-sm md:text-base px-3 py-1 sm:px-4 sm:py-2"
                >
                  🌿 Fresh • Healthy • Authentic • Pure Veg
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight"
              >
                Authentic Indian
                <span className="text-primary block mt-1 sm:mt-2">
                  Tiffin Service
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-muted-foreground max-w-md sm:max-w-lg lg:max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Experience the taste of home with our daily tiffin subscription.
                Fresh, nutritious, and authentic Indian meals delivered to your
                doorstep.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                asChild
                className="group w-full @max-xs:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                <Link href="/subscriptions">
                  <span className="hidden sm:inline">
                    Start Your Subscription
                  </span>
                  <span className="sm:hidden">Start Subscription</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group w-full xs:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                <Link href="/menu">
                  <Play className="mr-2 h-4 w-4" />
                  Explore Menu
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-6"
            >
              <div className="text-center lg:text-left">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">
                  10K+
                </div>
                <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold flex items-center gap-1 justify-center lg:justify-start">
                  4.8
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">
                  50+
                </div>
                <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Menu Items
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl">
              <Image
                src="https://placehold.co/50x50/svg"
                alt="Delicious Indian Tiffin"
                width={500}
                height={500}
                className="rounded-2xl w-full shadow-2xl object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

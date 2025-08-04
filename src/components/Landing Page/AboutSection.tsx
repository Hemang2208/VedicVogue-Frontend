"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

const features = [
  "🌅 Fresh ingredients sourced daily",
  "👩‍🍳 Traditional recipes from experienced chefs",
  "🧼 FSSAI certified hygienic kitchen",
  "📦 Eco-friendly packaging",
];

export function AboutSection() {
  return (
    <section className="py-12 sm:py-16 md:py-18 lg:py-20 xl:py-24 2xl:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
              <Image
                src="https://placehold.co/50x50/svg"
                alt="Our Kitchen"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              About VedicVogue Kitchen
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Founded with a passion for authentic Indian cuisine, we bring the
              warmth of home-cooked meals to your doorstep. Our experienced
              chefs use traditional recipes and the freshest ingredients to
              create meals that nourish both body and soul.
            </p>

            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start pt-2 sm:pt-4">
              <Button
                asChild
                className="group text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                size="lg"
              >
                <Link href="/about">
                  <span className="hidden sm:inline">Explore Our Story</span>
                  <span className="sm:hidden">Our Story</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

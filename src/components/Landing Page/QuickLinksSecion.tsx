"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface QuickLink {
  title: string;
  description: string;
  href: string;
  image: string;
  badge: string;
}

const quickLinks: QuickLink[] = [
  {
    title: "Browse Menu",
    description: "Explore our variety of authentic Indian meals",
    href: "/menu",
    image: "https://placehold.co/300x200/svg",
    badge: "50+ Items",
  },
  {
    title: "Book a Meal",
    description: "Quick booking for today or schedule for later",
    href: "/book",
    image: "https://placehold.co/300x200/svg",
    badge: "Quick Order",
  },
  {
    title: "Subscription Plans",
    description: "Save more with our flexible subscription options",
    href: "/subscriptions",
    image: "https://placehold.co/300x200/svg",
    badge: "Save 25%",
  },
  {
    title: "Customize Plan",
    description: "Tailor meals to your dietary preferences",
    href: "/customize",
    image: "https://placehold.co/300x200/svg",
    badge: "Personalized",
  },
];

export function QuickLinksSection() {
  return (
    <section className="py-12 sm:py-16 md:py-18 lg:py-20 xl:py-24 2xl:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            Get Started Today
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-muted-foreground">
            Choose your path to delicious, healthy meals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full hover:scale-[1.02]">
                <Link href={link.href}>
                  <div className="relative">
                    <Image
                      src={link.image || "https://placehold.co/50x50/svg"}
                      alt={link.title}
                      width={300}
                      height={200}
                      className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 text-xs sm:text-sm px-2 py-1">
                      {link.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed">
                      {link.description}
                    </p>
                    <div className="flex items-center text-primary">
                      <span className="text-xs sm:text-sm md:text-base font-medium">
                        Learn More
                      </span>
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

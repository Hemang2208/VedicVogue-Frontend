"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    content:
      "VedicVogue Kitchen has been a lifesaver! The food tastes just like home-cooked meals. The variety and quality are exceptional.",
    rating: 5,
    avatar: "https://placehold.co/60x60/svg",
  },
  {
    name: "Rajesh Kumar",
    role: "Marketing Manager",
    content:
      "I've been subscribing for 6 months now. The consistency in taste and delivery time is remarkable. Highly recommended!",
    rating: 5,
    avatar: "https://placehold.co/60x60/svg",
  },
  {
    name: "Anita Patel",
    role: "Doctor",
    content:
      "As a working professional, this service is perfect. Healthy, tasty, and delivered on time. The diet plans are well-balanced.",
    rating: 5,
    avatar: "https://placehold.co/60x60/svg",
  },
];

export function TestimonialsSection() {
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
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust us for their daily
            meals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <Card className="p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 h-full hover:scale-[1.02]">
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 justify-center lg:justify-start">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-base text-muted-foreground italic text-center lg:text-left leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
                    <div className="relative">
                      <Image
                        src={testimonial.avatar || "https://placehold.co/50x50/svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover"
                      />
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="font-semibold text-sm sm:text-base md:text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

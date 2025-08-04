"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-18 lg:py-20 xl:py-24 2xl:py-28 text-black bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            Ready to Start Your Healthy Meal Journey?
          </h2>

          <p className="text-sm sm:text-base md:text-md lg:text-lg xl:text-xl opacity-90 leading-relaxed max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto">
            Join thousands of satisfied customers and experience the convenience
            of fresh, authentic Indian meals delivered daily to your doorstep.
          </p>

          <div className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center pt-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="group w-full xs:w-auto sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5"
            >
              <Link href="/book">
                <span className="hidden sm:inline">Start Subscription</span>
                <span className="sm:hidden">Subscribe</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-black text-black hover:bg-white hover:text-primary w-full xs:w-auto sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5"
              asChild
            >
              <Link href="/menu">
                <span className="hidden sm:inline">Explore Menu</span>
                <span className="sm:hidden">Menu</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, Shield, Truck, Users, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Clock,
    title: "Always On Time",
    description: "Reliable delivery within your chosen time slot",
  },
  {
    icon: Shield,
    title: "100% Hygienic",
    description: "FSSAI certified kitchen with strict quality controls",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "No delivery charges on subscription plans",
  },
  {
    icon: Users,
    title: "10K+ Happy Customers",
    description: "Join our growing family of satisfied customers",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-18 lg:py-20 xl:py-24 2xl:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            Why Choose VedicVogue Kitchen?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4">
            Experience the perfect blend of tradition, quality, and convenience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <Card className="text-center p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 group h-full hover:scale-[1.02]">
                <CardContent className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

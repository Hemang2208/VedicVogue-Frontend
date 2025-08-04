"use client";

import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  // ArrowRight,
  Star,
  // Clock,
  Shield,
  // Truck,
  Users,
  // CheckCircle,
  Heart,
  Award,
  Utensils,
  Leaf,
  ChefHat,
  MapPin,
  Calendar,
  Target,
  Eye,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  MessageSquare,
  Clock,
} from "lucide-react";
import { VVButton } from "@/components/ui/vv-button";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  experience: string;
}

interface Value {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Achievement {
  icon: React.ElementType;
  title: string;
  description: string;
  metric: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "ramesh-gupta",
    name: "Chef Ramesh Gupta",
    role: "Head Chef & Founder",
    image: "https://placehold.co/300x300/svg",
    bio: "With 15+ years of experience in traditional Indian cuisine, Chef Ramesh brings authentic flavors from various regions of India to every meal.",
    experience: "15+ Years Experience",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Operations Manager",
    image: "https://placehold.co/300x300/svg",
    bio: "Priya ensures seamless operations and customer satisfaction with her expertise in logistics and customer service management.",
    experience: "10+ Years Experience",
  },
  {
    id: "anjali-mehta",
    name: "Dr. Anjali Mehta",
    role: "Nutritionist",
    image: "https://placehold.co/300x300/svg",
    bio: "Dr. Anjali designs balanced meal plans that provide optimal nutrition while maintaining the authentic taste of Indian cuisine.",
    experience: "8+ Years Experience",
  },
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    role: "Quality Assurance Head",
    image: "https://placehold.co/300x300/svg",
    bio: "Rajesh maintains the highest standards of food safety and quality, ensuring every meal meets our strict hygiene protocols.",
    experience: "12+ Years Experience",
  },
];

const values: Value[] = [
  {
    icon: Heart,
    title: "Passion for Authenticity",
    description:
      "Every recipe is crafted with love and respect for traditional Indian cooking methods.",
  },
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description:
      "We maintain the highest standards in ingredients, preparation, and food safety.",
  },
  {
    icon: Leaf,
    title: "Fresh & Sustainable",
    description:
      "We source fresh, local ingredients and use eco-friendly packaging to protect our planet.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description:
      "Your satisfaction and dietary needs are at the heart of everything we do.",
  },
];

const milestones: Milestone[] = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Started VedicVogue Kitchen with a vision to bring authentic home-cooked meals to busy professionals.",
  },
  {
    year: "2020",
    title: "FSSAI Certification",
    description:
      "Achieved FSSAI certification and established our state-of-the-art hygienic kitchen facility.",
  },
  {
    year: "2021",
    title: "1000+ Customers",
    description:
      "Crossed our first milestone of serving 1000+ happy customers with daily meal subscriptions.",
  },
  {
    year: "2022",
    title: "Menu Expansion",
    description:
      "Expanded our menu to include regional specialties and customizable diet plans.",
  },
  {
    year: "2023",
    title: "5000+ Families",
    description:
      "Proudly serving over 5000 families across the city with healthy, authentic meals.",
  },
  {
    year: "2024",
    title: "Award Recognition",
    description:
      "Received 'Best Tiffin Service' award and achieved 10,000+ satisfied customers.",
  },
];

const achievements: Achievement[] = [
  {
    icon: Users,
    title: "Happy Customers",
    description: "Families trust us for their daily nutrition",
    metric: "10,000+",
  },
  {
    icon: Star,
    title: "Customer Rating",
    description: "Average rating across all platforms",
    metric: "4.8/5",
  },
  {
    icon: Utensils,
    title: "Meals Delivered",
    description: "Fresh meals delivered to date",
    metric: "500K+",
  },
  {
    icon: Award,
    title: "Awards Won",
    description: "Industry recognition for excellence",
    metric: "5+",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 md:py-26 hero-pattern overflow-hidden">
        <div className="container px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <Badge
                variant="secondary"
                className="w-fit mx-auto text-xs sm:text-sm"
              >
                🌿 Our Story • Our Mission • Our Values
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                About
                <span className="text-primary block">VedicVogue Kitchen</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Born from a passion for authentic Indian cuisine and a
                commitment to healthy living, VedicVogue Kitchen has been
                serving fresh, nutritious, and delicious meals to families
                across the city since 2019.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground">
                To make healthy, authentic Indian home-cooked meals accessible
                to everyone, regardless of their busy lifestyle. We believe that
                good food is the foundation of a healthy life, and we&apos;re
                committed to bringing the warmth and nutrition of traditional
                Indian cooking to your doorstep.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground">
                To become the most trusted name in healthy meal delivery,
                setting new standards for quality, taste, and customer
                satisfaction. We envision a world where everyone has access to
                nutritious, delicious meals that connect them to their cultural
                roots and support their well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at VedicVogue Kitchen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Our Journey
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to serving thousands of families
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block"></div>

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 w-full">
                    <Card className="p-6 hover:shadow-lg transition-all duration-300">
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">
                            {milestone.year}
                          </Badge>
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="hidden md:flex w-12 h-12 bg-primary rounded-full items-center justify-center text-white font-bold z-10">
                    {index + 1}
                  </div>

                  <div className="flex-1 w-full md:w-0"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Our Achievements
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {achievement.metric}
                    </div>
                    <h3 className="font-semibold text-lg">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate people behind VedicVogue Kitchen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                  <div className="relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 text-xs bg-primary/90">
                      {member.experience}
                    </Badge>
                  </div>
                  <CardContent className="p-5 -mt-5 space-y-4 flex-1 flex flex-col">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-primary font-medium text-sm">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {member.bio}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/about/${member.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Quality You Can Trust
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                At VedicVogue Kitchen, quality is not just a promise—it&apos;s
                our commitment to every single meal we prepare. From sourcing
                the finest ingredients to maintaining the highest hygiene
                standards, we ensure excellence at every step.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, text: "FSSAI Certified Kitchen" },
                  { icon: Leaf, text: "Fresh Ingredients Daily" },
                  { icon: ChefHat, text: "Expert Chefs & Nutritionists" },
                  { icon: Sparkles, text: "Hygienic Food Preparation" },
                ].map((item, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="https://placehold.co/500x400/svg"
                alt="Our Quality Kitchen"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              Our Location
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Visit Our Kitchen
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the warmth of our kitchen and the excellence of our
              service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden">
                <div className="h-[300px] bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.7167906186024!2d80.94598131504807!3d26.847008983155703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1645521626000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  ></iframe>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Central Kitchen</h3>
                      <p className="text-muted-foreground text-sm">
                        Main Facility
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    123 Food Street, Hazratganj
                    <br />
                    Lucknow, Uttar Pradesh 226001
                    <br />
                    India
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 lg:sticky lg:top-24 lg:self-start hidden lg:block"
            >
              <Card className="p-6">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Operating Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Kitchen & Delivery
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Kitchen Hours:</span>
                      <span className="font-medium">5:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Hours:</span>
                      <span className="font-medium">7:00 AM - 9:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Contact Details</h3>
                      <p className="text-sm text-muted-foreground">
                        Get in touch
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="tel:+919876543210">
                        <Phone className="h-4 w-4 mr-2" />
                        +91 98765 43210
                      </Link>
                    </VVButton>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="mailto:hello@vedicvogue.com">
                        <Mail className="h-4 w-4 mr-2" />
                        hello@vedicvogue.com
                      </Link>
                    </Button>
                    <VVButton
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="https://wa.me/919876543210">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        WhatsApp Support
                      </Link>
                    </VVButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-12 sm:py-16 lg:py-20 brand-gradient text-white">
        <div className="container text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6 sm:space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Ready to Join the VedicVogue Family?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl opacity-90">
              Experience the difference that passion, quality, and authenticity
              make. Start your journey with us today and taste the love in every
              meal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="group w-full sm:w-auto"
              >
                <Link href="/subscriptions">
                  Start Your Subscription
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                asChild
              >
                <Link href="/menu">Explore Our Menu</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}

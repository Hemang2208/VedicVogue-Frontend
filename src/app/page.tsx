"use client";

import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LandingPageOverview } from "@/components/Overview Page/LandingPageOverview";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <LandingPageOverview />
      <Footer />
    </div>
  );
}

// "use client";

// import { Navigation } from "@/components/layout/navbar";
// import { Footer } from "@/components/layout/footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   ArrowRight,
//   Star,
//   Clock,
//   Shield,
//   Truck,
//   Users,
//   CheckCircle,
//   Play,
// } from "lucide-react";

// const testimonials = [
//   {
//     name: "Priya Sharma",
//     role: "Software Engineer",
//     content:
//       "VedicVogue Kitchen has been a lifesaver! The food tastes just like home-cooked meals. The variety and quality are exceptional.",
//     rating: 5,
//     avatar: "https://placehold.co/60x60/svg",
//   },
//   {
//     name: "Rajesh Kumar",
//     role: "Marketing Manager",
//     content:
//       "I've been subscribing for 6 months now. The consistency in taste and delivery time is remarkable. Highly recommended!",
//     rating: 5,
//     avatar: "https://placehold.co/60x60/svg",
//   },
//   {
//     name: "Anita Patel",
//     role: "Doctor",
//     content:
//       "As a working professional, this service is perfect. Healthy, tasty, and delivered on time. The diet plans are well-balanced.",
//     rating: 5,
//     avatar: "https://placehold.co/60x60/svg",
//   },
// ];

// const features = [
//   {
//     icon: Clock,
//     title: "Always On Time",
//     description: "Reliable delivery within your chosen time slot",
//   },
//   {
//     icon: Shield,
//     title: "100% Hygienic",
//     description: "FSSAI certified kitchen with strict quality controls",
//   },
//   {
//     icon: Truck,
//     title: "Free Delivery",
//     description: "No delivery charges on subscription plans",
//   },
//   {
//     icon: Users,
//     title: "10K+ Happy Customers",
//     description: "Join our growing family of satisfied customers",
//   },
// ];

// const quickLinks = [
//   {
//     title: "Browse Menu",
//     description: "Explore our variety of authentic Indian meals",
//     href: "/menu",
//     image: "https://placehold.co/300x200/svg",
//     badge: "50+ Items",
//   },
//   {
//     title: "Book a Meal",
//     description: "Quick booking for today or schedule for later",
//     href: "/book",
//     image: "https://placehold.co/300x200/svg",
//     badge: "Quick Order",
//   },
//   {
//     title: "Subscription Plans",
//     description: "Save more with our flexible subscription options",
//     href: "/subscriptions",
//     image: "https://placehold.co/300x200/svg",
//     badge: "Save 25%",
//   },
//   {
//     title: "Customize Plan",
//     description: "Tailor meals to your dietary preferences",
//     href: "/customize",
//     image: "https://placehold.co/300x200/svg",
//     badge: "Personalized",
//   },
// ];

// export default function HomePage() {
//   return (
//     <div className="min-h-screen">
//       <Navigation />

//       {/* Hero Section */}
//       <section className="relative py-12 sm:py-20 lg:py-32 md:py-26 hero-pattern overflow-hidden">
//         <div className="container px-4">
//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left"
//             >
//               <div className="space-y-4 sm:space-y-6">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="flex justify-center lg:justify-start"
//                 >
//                   <Badge
//                     variant="secondary"
//                     className="w-fit mb-2 sm:mb-4 text-xs sm:text-sm"
//                   >
//                     🌿 Fresh • Healthy • Authentic
//                   </Badge>
//                 </motion.div>

//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
//                 >
//                   Authentic Indian
//                   <span className="text-primary block">Tiffin Service</span>
//                 </motion.h1>

//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0"
//                 >
//                   Experience the taste of home with our daily tiffin
//                   subscription. Fresh, nutritious, and authentic Indian meals
//                   delivered to your doorstep.
//                 </motion.p>
//               </div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
//               >
//                 <Button size="lg" asChild className="group w-full sm:w-auto">
//                   <Link href="/book">
//                     Start Your Subscription
//                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   asChild
//                   className="group w-full sm:w-auto"
//                 >
//                   <Link href="/menu">
//                     <Play className="mr-2 h-4 w-4" />
//                     Explore Menu
//                   </Link>
//                 </Button>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//                 className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 lg:gap-8 pt-4"
//               >
//                 <div className="text-center">
//                   <div className="text-xl sm:text-2xl font-bold">10K+</div>
//                   <div className="text-xs sm:text-sm text-muted-foreground">
//                     Happy Customers
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl sm:text-2xl font-bold flex items-center gap-1 justify-center">
//                     4.8
//                     <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
//                   </div>
//                   <div className="text-xs sm:text-sm text-muted-foreground">
//                     Average Rating
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl sm:text-2xl font-bold">50+</div>
//                   <div className="text-xs sm:text-sm text-muted-foreground">
//                     Menu Items
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="flex-1 relative max-w-md lg:max-w-none mx-auto"
//             >
//               <div className="relative z-10">
//                 <Image
//                   src="https://placehold.co/50x50/svg"
//                   alt="Delicious Indian Tiffin"
//                   width={500}
//                   height={600}
//                   className="rounded-2xl shadow-2xl w-2/3 h-fit"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-12 sm:py-16 lg:py-20 md:py-18 bg-muted/30">
//         <div className="container px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
//               Why Choose VedicVogue Kitchen?
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
//               Experience the perfect blend of tradition, quality, and
//               convenience
//             </p>
//           </motion.div>

//           <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-rap gap-6 sm:gap-8 justify-center">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="flex-1 min-w-[280px] sm:min-w-0 sm:max-w-[calc(50%-1rem)] lg:max-w-none"
//               >
//                 <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group h-full">
//                   <CardContent className="space-y-3 sm:space-y-4">
//                     <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                       <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
//                     </div>
//                     <h3 className="font-semibold text-base sm:text-lg">
//                       {feature.title}
//                     </h3>
//                     <p className="text-sm sm:text-base text-muted-foreground">
//                       {feature.description}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Quick Links Section */}
//       <section className="py-12 sm:py-16 lg:py-20">
//         <div className="container px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
//               Get Started Today
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
//               Choose your path to delicious, healthy meals
//             </p>
//           </motion.div>

//           <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-4 sm:gap-6 justify-center">
//             {quickLinks.map((link, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="flex-1 min-w-[280px] sm:min-w-0 sm:max-w-[calc(50%-0.75rem)] lg:max-w-none"
//               >
//                 <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
//                   <Link href={link.href}>
//                     <div className="relative">
//                       <Image
//                         src={link.image || "https://placehold.co/50x50/svg"}
//                         alt={link.title}
//                         width={300}
//                         height={200}
//                         className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <Badge className="absolute top-2 right-2 text-xs">
//                         {link.badge}
//                       </Badge>
//                     </div>
//                     <CardContent className="p-4 sm:p-6">
//                       <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
//                         {link.title}
//                       </h3>
//                       <p className="text-muted-foreground text-sm mb-3 sm:mb-4">
//                         {link.description}
//                       </p>
//                       <div className="flex items-center text-primary">
//                         <span className="text-xs sm:text-sm font-medium">
//                           Learn More
//                         </span>
//                         <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </CardContent>
//                   </Link>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
//         <div className="container px-4">
//           <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="flex-1 order-2 lg:order-1"
//             >
//               <Image
//                 src="https://placehold.co/50x50/svg"
//                 alt="Our Kitchen"
//                 width={500}
//                 height={400}
//                 className="rounded-2xl shadow-xl ml-5 w-3/4 h-auto"
//               />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="flex-1 space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left"
//             >
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
//                 About VedicVogue Kitchen
//               </h2>
//               <p className="text-base sm:text-lg text-muted-foreground">
//                 Founded with a passion for authentic Indian cuisine, we bring
//                 the warmth of home-cooked meals to your doorstep. Our
//                 experienced chefs use traditional recipes and the freshest
//                 ingredients to create meals that nourish both body and soul.
//               </p>

//               <div className="space-y-3 sm:space-y-4">
//                 {[
//                   "🌅 Fresh ingredients sourced daily",
//                   "👩‍🍳 Traditional recipes from experienced chefs",
//                   "🧼 FSSAI certified hygienic kitchen",
//                   "📦 Eco-friendly packaging",
//                 ].map((feature, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: 20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center gap-3 justify-center lg:justify-start"
//                   >
//                     <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
//                     <span className="text-sm sm:text-base">{feature}</span>
//                   </motion.div>
//                 ))}
//               </div>

//               <div className="flex justify-center lg:justify-start">
//                 <Button asChild className="group">
//                   <Link href="/menu">
//                     Explore Our Story
//                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                 </Button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-12 sm:py-16 lg:py-20">
//         <div className="container px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
//               What Our Customers Say
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
//               Join thousands of satisfied customers who trust us for their daily
//               meals
//             </p>
//           </motion.div>

//           <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="flex-1"
//               >
//                 <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 h-full">
//                   <CardContent className="space-y-3 sm:space-y-4">
//                     <div className="flex items-center gap-1 justify-center lg:justify-start">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
//                         />
//                       ))}
//                     </div>
//                     <p className="text-sm sm:text-base text-muted-foreground italic text-center lg:text-left">
//                       &quot;{testimonial.content}&quot;
//                     </p>
//                     <div className="flex items-center gap-3 justify-center lg:justify-start">
//                       <Image
//                         src={testimonial.avatar || "https://placehold.co/50x50/svg"}
//                         alt={testimonial.name}
//                         width={40}
//                         height={40}
//                         className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
//                       />
//                       <div className="text-center lg:text-left">
//                         <div className="font-semibold text-sm sm:text-base">
//                           {testimonial.name}
//                         </div>
//                         <div className="text-xs sm:text-sm text-muted-foreground">
//                           {testimonial.role}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 sm:py-16 lg:py-20 brand-gradient text-white">
//         <div className="container text-center px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto space-y-6 sm:space-y-8"
//           >
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
//               Ready to Start Your Healthy Meal Journey?
//             </h2>
//             <p className="text-base sm:text-lg lg:text-xl opacity-90">
//               Join thousands of satisfied customers and experience the
//               convenience of fresh, authentic Indian meals delivered daily to
//               your doorstep.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
//               <Button
//                 size="lg"
//                 variant="secondary"
//                 asChild
//                 className="group w-full sm:w-auto"
//               >
//                 <Link href="/book">
//                   Start Subscription
//                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="bg-transparent border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
//                 asChild
//               >
//                 <Link href="/menu">Explore Menu</Link>
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

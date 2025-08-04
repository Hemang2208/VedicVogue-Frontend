"use client";

import type React from "react";
import { animate } from "framer-motion";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { VVBadge } from "@/components/ui/vv-badge";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  // Lightbulb,
  Mail,
  Send,
  // PenTool,
  // Video,
  // Palette,
  // TrendingUp,
  // Smartphone,
  // Bot,
  // Code,
  Heart,
  Calendar,
  Home,
  GraduationCap,
  ExternalLink,
  DollarSign,
  Layers,
  Globe,
  BookOpen,
  Shield,
  Coffee,
  IndianRupee,
} from "lucide-react";
import Link from "next/link";
import { jobListings } from "@/lib/jobListings";
import Image from "next/image";

const perks = [
  {
    title: "Flexible Work Schedule",
    description:
      "Enjoy a balanced 25-30 hour work week with flexible timing that fits your lifestyle.",
    icon: Calendar,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Creative Workspace",
    description:
      "Our Lucknow office is designed to inspire with comfortable work areas, meeting spaces, and chill zones.",
    icon: Home,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Learning & Growth",
    description:
      "We actively promote continuous learning through mentorship, training, and hands-on experience with cutting-edge tech.",
    icon: GraduationCap,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Competitive Compensation",
    description:
      "We offer attractive pay packages with performance bonuses and regular reviews.",
    icon: DollarSign,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Diverse Projects",
    description:
      "Work on a variety of challenging projects across different industries and technologies.",
    icon: Layers,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Global Exposure",
    description:
      "Opportunity to work with international clients and expand your professional network.",
    icon: Globe,
    color: "bg-indigo-50 text-indigo-600",
  },
];

const benefits = [
  {
    title: "Skill Development",
    description:
      "Regular training sessions and workshops to enhance your skills",
    icon: BookOpen,
  },
  {
    title: "Work-Life Balance",
    description: "Flexible hours and hybrid options to suit your lifestyle",
    icon: Coffee,
  },
  {
    title: "Health & Wellness",
    description: "Support for your physical and mental wellbeing",
    icon: Heart,
  },
  {
    title: "Job Security",
    description: "Stable growth path with long-term opportunities",
    icon: Shield,
  },
];

const getDepartmentColor = (department: string) => {
  switch (department.toLowerCase()) {
    case "marketing":
      return "bg-pink-100 text-pink-800";
    case "creative":
      return "bg-purple-100 text-purple-800";
    case "growth":
      return "bg-green-100 text-green-800";
    case "design":
      return "bg-blue-100 text-blue-800";
    case "tech innovation":
      return "bg-orange-100 text-orange-800";
    case "engineering":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getWorkTypeIcon = (workType: string) => {
  switch (workType.toLowerCase()) {
    case "remote":
      return <Home className="h-4 w-4" />;
    case "hybrid":
      return <Users className="h-4 w-4" />;
    case "on-site":
      return <MapPin className="h-4 w-4" />;
    default:
      return <Briefcase className="h-4 w-4" />;
  }
};

const handleSmoothScroll = () => {
  const el = document.getElementById("job");
  if (el) {
    const yOffset = -270;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    animate(window.scrollY, y, {
      duration: 0.8,
      onUpdate: (latest) => window.scrollTo(0, latest),
      ease: [0.25, 0.1, 0.25, 1],
    });
  }
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 px-2">
              Build Your Career With Us
            </h1>
            <p className="text-xl text-muted-foreground mb-8 px-4">
              Join our team of innovators and creators. We&apos;re building the
              future while maintaining a flexible, supportive work environment.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
              <VVButton
                size="lg"
                className="bg-primary cursor-pointer hover:bg-primary/90 w-3/4 sm:w-auto"
                onClick={handleSmoothScroll}
              >
                <Briefcase className="h-5 w-5 mr-2" />
                View Open Positions
              </VVButton>

              <Link href="/careers/apply/intern" passHref>
                <VVButton
                  variant="outline"
                  size="lg"
                  className="w-full cursor-pointer sm:w-auto"
                >
                  <div className="flex justify-center items-center gap-1">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Apply for Internship
                  </div>
                </VVButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Why Work With Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <VVBadge className="mb-4 bg-primary/10 text-primary">
                Why Join Us
              </VVBadge>
              <h2 className="text-3xl font-bold mb-4">
                A Workplace That Values You
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe in creating an environment where talent thrives and
                innovation flourishes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VVCard className="h-full hover:shadow-lg transition-all duration-200 border-0">
                    <VVCardContent className="p-1">
                      <div
                        className={`inline-flex p-3 rounded-full ${perk.color} mb-4`}
                      >
                        <perk.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {perk.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {perk.description}
                      </p>
                    </VVCardContent>
                  </VVCard>
                </motion.div>
              ))}
            </div>

            <br />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VVCard className="h-full hover:shadow-lg transition-all duration-200 border-0">
                    <VVCardContent className="space-y-4">
                      <div className="w-full rounded-lg overflow-hidden">
                        <Image
                          src="https://placehold.co/300x200/svg"
                          alt={perk.title}
                          width={300}
                          height={200}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{perk.title}</h3>
                        <p className="text-muted-foreground">
                          {perk.description}
                        </p>
                      </div>
                    </VVCardContent>
                  </VVCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Job Listings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <VVBadge className="mb-4 bg-primary/10 text-primary">
                Open Positions
              </VVBadge>
              <h2 className="text-3xl font-bold mb-4">
                Find Your Perfect Role
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We&apos;re looking for passionate individuals to join our
                growing team.
              </p>
            </div>

            <div id="job" className="space-y-6 scroll-mt-55">
              {jobListings.map((job, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VVCard className="hover:shadow-lg transition-all duration-200 group">
                    <VVCardContent className="p-5">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="w-full bg-background">
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                              {/* Icon */}
                              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex justify-center text-center items-center">
                                <job.icon className="h-6 w-6 text-primary items-center" />
                              </div>

                              {/* Job Info */}
                              <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-foreground">
                                  {job.title}
                                </h3>

                                {/* Tags */}
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <VVBadge
                                    className={getDepartmentColor(
                                      job.department
                                    )}
                                    size="sm"
                                  >
                                    {job.department}
                                  </VVBadge>
                                  <VVBadge variant="outline" size="sm">
                                    <IndianRupee className="h-3 w-3 mr-1 text-muted-foreground" />
                                    {job.pay}
                                  </VVBadge>
                                  <VVBadge variant="outline" size="sm">
                                    <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                                    {job.location}
                                  </VVBadge>
                                </div>
                              </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                              <VVBadge
                                variant="secondary"
                                className="flex items-center"
                              >
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                {job.experience}
                              </VVBadge>
                              <VVBadge
                                variant="secondary"
                                className="flex items-center"
                              >
                                {getWorkTypeIcon(job.workType)}
                                <span className="ml-1">{job.workType}</span>
                              </VVBadge>
                              <VVBadge
                                variant="secondary"
                                className="flex items-center"
                              >
                                <Briefcase className="h-3 w-3 mr-1 text-muted-foreground" />
                                {job.employment}
                              </VVBadge>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground leading-relaxed hidden sm:block">
                              {job.description}
                            </p>
                          </div>

                          {/* <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="font-medium mb-2">
                                Responsibilities:
                              </h4>
                              <ul className="text-sm text-muted-foreground space-y-2">
                                {job.responsibilities.map(
                                  (resp: string, i: number) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-primary mt-1">
                                        •
                                      </span>
                                      {resp}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">
                                Requirements:
                              </h4>
                              <ul className="text-sm text-muted-foreground space-y-2">
                                {job.requirements.map(
                                  (req: string, i: number) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-primary mt-1">
                                        •
                                      </span>
                                      {req}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>

                          {job.perks && job.perks.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-medium mb-2">Perks:</h4>
                              <div className="flex flex-wrap gap-2">
                                {job.perks.map((perk: string, i: number) => (
                                  <VVBadge
                                    key={i}
                                    variant="outline"
                                    className="text-primary border-primary/30 bg-primary/10"
                                  >
                                    {perk}
                                  </VVBadge>
                                ))}
                              </div>
                            </div>
                          )} */}
                        </div>

                        <div className="flex flex-col sm:flex gap-2 lg:min-w-[180px]">
                          <Link
                            href={`/careers/apply?position=${encodeURIComponent(
                              job.title
                            )}`}
                          >
                            <VVButton
                              className="w-full cursor-pointer"
                              size="lg"
                            >
                              <div className="flex justify-center items-center gap-1">
                                <Send className="h-4 w-4 mr-2" />
                                Apply Now
                              </div>
                            </VVButton>
                          </Link>
                          <Link href={`/careers/${job.id}`}>
                            <VVButton
                              variant="outline"
                              className="w-full cursor-pointer"
                              size="lg"
                            >
                              <div className="flex justify-center items-center gap-1">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Job Details
                              </div>
                            </VVButton>
                          </Link>
                        </div>
                      </div>
                    </VVCardContent>
                  </VVCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <VVBadge className="mb-4 bg-primary/10 text-primary">
                Employee Benefits
              </VVBadge>
              <h2 className="text-3xl font-bold mb-4">
                More Than Just a Salary
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We take care of our team with comprehensive benefits and perks.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index: number) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VVCard className="h-full hover:shadow-lg transition-all duration-200 border-0">
                    <VVCardContent className="p-6 text-center">
                      <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
                        <benefit.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </VVCardContent>
                  </VVCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Open Application */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <VVCard className="bg-gradient-to-r w-full from-primary/5 to-primary/10 border border-primary/20">
              <VVCardContent className="px-6 py-10 sm:p-12 text-center min-w-full">
                <Heart className="h-12 w-12 mx-auto mb-6 text-primary" />
                <h3 className="text-2xl font-bold mb-4">
                  Don&apos;t See Your Dream Job?
                </h3>
                <p className="text-muted-foreground mb-8">
                  We&apos;re always looking for talented people. Send us your
                  resume and we&apos;ll contact you when a matching position
                  opens up.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/careers/apply" passHref>
                    <VVButton
                      size="lg"
                      className="bg-primary cursor-pointer hover:bg-primary/90 w-full sm:w-auto"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      <span className="block sm:hidden">Apply Now</span>
                      <span className="hidden sm:inline">
                        Submit General Application
                      </span>
                    </VVButton>
                  </Link>

                  {/* Optional Internship Button */}
                  <Link href="/careers/apply/intern" passHref>
                    <VVButton
                      variant="outline"
                      size="lg"
                      className="w-full cursor-pointer sm:w-auto"
                    >
                      <div className="flex justify-center items-center gap-1">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <span className="block sm:hidden">Internship</span>
                        <span className="hidden sm:inline">
                          Apply for Internship
                        </span>
                      </div>
                    </VVButton>
                  </Link>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Contact HR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Have Questions?
                </VVCardTitle>
              </VVCardHeader>
              <VVCardContent>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      For any queries regarding open positions or the
                      application process, our HR team is happy to help.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href="mailto:hr@vedicvogue.com"
                          className="text-primary hover:text-primary/80 font-medium"
                        >
                          hr@vedicvogue.com
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <VVButton className="shrink-0 cursor-pointer" asChild>
                      <a target="_blank" href="mailto:hr@vedicvogue.com">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact HR
                      </a>
                    </VVButton>
                    <VVButton
                      variant="outline"
                      className="shrink-0 cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Office
                    </VVButton>
                  </div>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

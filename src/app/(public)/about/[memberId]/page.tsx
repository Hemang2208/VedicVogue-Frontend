"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Clock,
  Star,
  Users,
  Mail,
  Phone,
  //   MapPin,
} from "lucide-react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVBadge } from "@/components/ui/vv-badge";
import { VVButton } from "@/components/ui/vv-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Using the same team members data from the about page
const teamMembers = [
  {
    id: "ramesh-gupta",
    name: "Chef Ramesh Gupta",
    role: "Head Chef & Founder",
    image: "https://placehold.co/300x300/svg",
    bio: "With 15+ years of experience in traditional Indian cuisine, Chef Ramesh brings authentic flavors from various regions of India to every meal.",
    experience: "15+ Years Experience",
    achievements: [
      "Led multiple award-winning restaurant kitchens",
      "Developed over 200 authentic Indian recipes",
      "Trained more than 50 professional chefs",
      "Featured in leading culinary magazines",
    ],
    specialties: [
      "North Indian Cuisine",
      "Traditional Recipes",
      "Menu Development",
      "Team Leadership",
    ],
    certification: [
      "Certified Master Chef",
      "Food Safety Management",
      "Advanced Culinary Arts",
      "Restaurant Management",
    ],
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Operations Manager",
    image: "https://placehold.co/300x300/svg",
    bio: "Priya ensures seamless operations and customer satisfaction with her expertise in logistics and customer service management.",
    experience: "10+ Years Experience",
    achievements: [
      "Optimized delivery operations by 40%",
      "Achieved 98% customer satisfaction rate",
      "Implemented efficient inventory management system",
      "Led team of 25+ delivery partners",
    ],
    specialties: [
      "Operations Management",
      "Customer Service",
      "Team Leadership",
      "Process Optimization",
    ],
    certification: [
      "Operations Management",
      "Supply Chain Management",
      "Leadership Development",
      "Customer Service Excellence",
    ],
  },
  {
    id: "anjali-mehta",
    name: "Dr. Anjali Mehta",
    role: "Nutritionist",
    image: "https://placehold.co/300x300/svg",
    bio: "Dr. Anjali designs balanced meal plans that provide optimal nutrition while maintaining the authentic taste of Indian cuisine.",
    experience: "8+ Years Experience",
    achievements: [
      "Designed nutrition plans for 5000+ customers",
      "Published research on traditional Indian nutrition",
      "Reduced customer health complaints by 60%",
      "Certified in clinical nutrition and dietetics",
    ],
    specialties: [
      "Clinical Nutrition",
      "Diet Planning",
      "Health Consultation",
      "Traditional Medicine",
    ],
    certification: [
      "Clinical Nutritionist",
      "Registered Dietitian",
      "Food Science Specialist",
      "Ayurvedic Nutrition",
    ],
  },
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    role: "Quality Assurance Head",
    image: "https://placehold.co/300x300/svg",
    bio: "Rajesh maintains the highest standards of food safety and quality, ensuring every meal meets our strict hygiene protocols.",
    experience: "12+ Years Experience",
    achievements: [
      "Achieved 100% FSSAI compliance record",
      "Implemented ISO 22000 food safety standards",
      "Zero food safety incidents in 3+ years",
      "Trained quality teams across multiple locations",
    ],
    specialties: [
      "Food Safety Management",
      "Quality Control",
      "HACCP Implementation",
      "Team Training",
    ],
    certification: [
      "FSSAI Food Safety Supervisor",
      "ISO 22000 Lead Auditor",
      "HACCP Certified",
      "Quality Management Systems",
    ],
  },
];

export default function TeamMemberDetailPage() {
  const router = useRouter();
  const params = useParams();

  const memberId = Array.isArray(params.memberId)
    ? params.memberId[0]
    : params.memberId;
  const member = teamMembers.find((m) => m.id === memberId);

  useEffect(() => {
    if (!member) {
      router.replace("/about");
    }
  }, [member, router]);

  if (!member) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/about"
              className="text-primary hover:underline flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to team
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Section */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/3">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {member.name}
                  </h1>
                  <VVBadge className="bg-primary/10 text-primary mb-4">
                    {member.role}
                  </VVBadge>
                  <p className="text-muted-foreground mb-4 text-sm md:text-base">
                    {member.bio}
                  </p>
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{member.experience}</span>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <VVButton className="bg-primary hover:bg-primary/90">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact {member.name.split(" ")[0]}
                    </VVButton>
                    <VVButton variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </VVButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Achievements Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3">
                    {member.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Specialties and Certifications Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Specialties Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Areas of Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, i) => (
                        <VVBadge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </VVBadge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {member.certification.map((cert, i) => (
                        <VVBadge
                          key={i}
                          className="bg-primary/10 text-primary text-xs"
                        >
                          {cert}
                        </VVBadge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Professional Background */}
              <Card>
                <CardHeader>
                  <CardTitle>Professional Background</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {member.name} brings extensive experience and expertise to
                    VedicVogue Kitchen. With {member.experience.toLowerCase()},
                    they have consistently demonstrated excellence in their
                    field and contributed significantly to our mission of
                    delivering authentic, high-quality meals to our customers.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">
                      Why {member.name.split(" ")[0]} Joined VedicVogue
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      &quot;I believe in the power of authentic, nutritious food
                      to bring families together and support healthy lifestyles.
                      At VedicVogue Kitchen, I can combine my passion for{" "}
                      {member.role.toLowerCase()} with our shared commitment to
                      quality and tradition.&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <VVButton className="bg-primary hover:bg-primary/90 w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Get in Touch
                </VVButton>
                <VVButton variant="outline" className="w-full" asChild>
                  <Link href="/about">
                    <Users className="h-4 w-4 mr-2" />
                    Meet Other Team Members
                  </Link>
                </VVButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

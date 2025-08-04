"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VVButton } from "@/components/ui/vv-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  School,
  Linkedin,
  FileText,
  Globe,
  Send,
} from "lucide-react";

// 1. Zod schema: all fields are strings (including URLs)
const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(100, { message: "Full name must be less than 100 characters." }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, {
      message: "Phone number must be 10 digits.",
    }),

  college: z
    .string()
    .trim()
    .min(20, { message: "Must be at least 20 characters." })
    .max(150, { message: "Must be less than 150 characters." }),

  experience: z
    .string()
    .trim()
    .max(500, { message: "Experience must be less than 500 characters." })
    .optional(),

  linkedin: z
    .string()
    .trim()
    .url({ message: "Please enter a valid LinkedIn profile URL." })
    .refine((url) => url.includes("linkedin.com"), {
      message: "URL must be a valid LinkedIn profile link.",
    }),

  resumeLink: z
    .string()
    .trim()
    .max(500, { message: "Resume link must be less than 500 characters." })
    .url({ message: "Resume link must be a valid URL." }),

  portfolioLink: z
    .string()
    .trim()
    .max(500, { message: "Portfolio link must be less than 500 characters." })
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be more than 10 characters." })
    .max(1000, { message: "Message must be under 1000 characters." }),
});

export default function ApplyPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      college: "",
      experience: "",
      linkedin: "",
      resumeLink: "",
      portfolioLink: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Send API request here - values are all strings
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              Apply for Internship at Vedic Vogue
            </h1>
            <p className="text-muted-foreground">
              We&apos;re excited to welcome passionate students. Fill the form
              below.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="9988776655" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <School className="h-4 w-4" />
                          College Details
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="B.Tech CSE , First Year , IIT Delhi"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-6">
                  {/* Links */}
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn Profile
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/in/username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="resumeLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Resume Link (Google Drive / Notion)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://drive.google.com/resume"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="portfolioLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Portfolio / Project Link (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://your-portfolio.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Exp in Months (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="3 Months of Freelance"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Cover Letter */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to join us .. ?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us why you're a great fit... what makes you stand out as an intern ?"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    By submitting, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <VVButton
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </VVButton>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

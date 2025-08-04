"use client";

import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { motion } from "framer-motion";
import { FileText, Calendar, Shield, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: December 15, 2024
            </p>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <VVCard className="text-center p-4">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Legal Agreement</h3>
              <p className="text-sm text-muted-foreground">
                Binding terms between you and VedicVogue Kitchen
              </p>
            </VVCard>
            <VVCard className="text-center p-4">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Regular Updates</h3>
              <p className="text-sm text-muted-foreground">
                Terms may be updated to reflect service changes
              </p>
            </VVCard>
            <VVCard className="text-center p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Your Protection</h3>
              <p className="text-sm text-muted-foreground">
                Clear guidelines for fair service usage
              </p>
            </VVCard>
          </motion.div>

          {/* Terms Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>1. Acceptance of Terms</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  By accessing and using VedicVogue Kitchen&apos;s services, you
                  accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above,
                  please do not use this service.
                </p>
                <p>
                  These Terms of Service (&quot;Terms&quot;) govern your use of
                  our meal subscription service, website, and mobile application
                  (collectively, the &quot;Service&quot;) operated by VedicVogue
                  Kitchen (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>2. Service Description</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  VedicVogue Kitchen provides a meal subscription service that
                  delivers freshly prepared Indian meals to customers. Our
                  services include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Daily, weekly, and monthly meal subscription plans</li>
                  <li>
                    Customizable meal preferences and dietary requirements
                  </li>
                  <li>Scheduled meal delivery services</li>
                  <li>Customer support and account management</li>
                  <li>Mobile application and website access</li>
                </ul>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>3. User Accounts</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  To use our Service, you must create an account and provide
                  accurate, complete, and current information. You are
                  responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>
                    Ensuring your contact information is current and accurate
                  </li>
                </ul>
                <p>
                  You must be at least 18 years old to create an account and use
                  our services.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>4. Orders and Subscriptions</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <h4 className="font-semibold">Order Placement</h4>
                <p>
                  All orders are subject to acceptance by VedicVogue Kitchen. We
                  reserve the right to refuse or cancel any order for any
                  reason, including but not limited to product availability,
                  errors in pricing, or suspected fraudulent activity.
                </p>

                <h4 className="font-semibold">Subscription Terms</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Subscriptions automatically renew unless cancelled</li>
                  <li>
                    You can modify or cancel subscriptions with 24-hour notice
                  </li>
                  <li>Pricing is subject to change with 30 days notice</li>
                  <li>Refunds are processed according to our refund policy</li>
                </ul>

                <h4 className="font-semibold">Delivery</h4>
                <p>
                  We aim to deliver meals within the specified time windows.
                  Delivery times are estimates and may vary due to weather,
                  traffic, or other unforeseen circumstances.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>5. Payment Terms</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  Payment is required at the time of order placement or
                  subscription signup. We accept various payment methods
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Credit and debit cards</li>
                  <li>UPI and digital wallets</li>
                  <li>Net banking</li>
                  <li>Other approved payment methods</li>
                </ul>
                <p>
                  All prices are in Indian Rupees (INR) and include applicable
                  taxes unless otherwise stated. You authorize us to charge your
                  payment method for all fees and charges incurred.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>6. Cancellation and Refunds</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <h4 className="font-semibold">Cancellation Policy</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Orders can be cancelled up to 24 hours before scheduled
                    delivery
                  </li>
                  <li>
                    Subscriptions can be cancelled anytime with immediate effect
                  </li>
                  <li>No cancellation fees apply for timely cancellations</li>
                </ul>

                <h4 className="font-semibold">Refund Policy</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Full refunds for cancellations made 24+ hours in advance
                  </li>
                  <li>
                    Partial refunds for quality issues or delivery failures
                  </li>
                  <li>Refunds processed within 5-7 business days</li>
                  <li>Refunds issued to original payment method</li>
                </ul>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>7. Food Safety and Quality</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  We are committed to providing safe, high-quality meals.
                  However:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You are responsible for informing us of any food allergies
                    or dietary restrictions
                  </li>
                  <li>
                    We cannot guarantee complete absence of allergens due to
                    shared kitchen facilities
                  </li>
                  <li>
                    Meals should be consumed within recommended timeframes
                  </li>
                  <li>
                    Report any quality issues immediately for prompt resolution
                  </li>
                </ul>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>8. Limitation of Liability</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  To the maximum extent permitted by law, VedicVogue Kitchen
                  shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including but not limited
                  to loss of profits, data, or other intangible losses.
                </p>
                <p>
                  Our total liability for any claim arising from or relating to
                  this agreement shall not exceed the amount paid by you for the
                  specific service giving rise to the claim.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>9. Privacy and Data Protection</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  Your privacy is important to us. Our collection and use of
                  personal information is governed by our Privacy Policy, which
                  is incorporated into these Terms by reference.
                </p>
                <p>
                  By using our Service, you consent to the collection, use, and
                  sharing of your information as described in our Privacy
                  Policy.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>10. Modifications to Terms</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  We reserve the right to modify these Terms at any time. We
                  will notify users of significant changes via email or through
                  our Service. Continued use of the Service after such
                  modifications constitutes acceptance of the updated Terms.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>11. Contact Information</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <ul className="list-none space-y-2">
                  <li>
                    <strong>Email:</strong> legal@vedicvogue.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +91 98765 43210
                  </li>
                  <li>
                    <strong>Address:</strong> VedicVogue Kitchen Pvt. Ltd.,
                    Bangalore, Karnataka, India
                  </li>
                </ul>
              </VVCardContent>
            </VVCard>

            {/* Important Notice */}
            <VVCard className="border-orange-200 bg-orange-50">
              <VVCardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-2">
                      Important Notice
                    </h3>
                    <p className="text-orange-700 text-sm">
                      These terms constitute a legally binding agreement. Please
                      read them carefully and contact us if you have any
                      questions before using our services.
                    </p>
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

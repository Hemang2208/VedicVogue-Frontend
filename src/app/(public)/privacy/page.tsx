"use client"

import { Navigation } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { VVCard, VVCardContent, VVCardHeader, VVCardTitle } from "@/components/ui/vv-card"
import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users, Database, Settings } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 15, 2024</p>
          </motion.div>

          {/* Privacy Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <VVCard className="text-center p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Data Protection</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and securely stored</p>
            </VVCard>
            <VVCard className="text-center p-4">
              <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Transparency</h3>
              <p className="text-sm text-muted-foreground">Clear information about data usage</p>
            </VVCard>
            <VVCard className="text-center p-4">
              <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Your Control</h3>
              <p className="text-sm text-muted-foreground">Manage your privacy preferences</p>
            </VVCard>
          </motion.div>

          {/* Privacy Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Information We Collect
                </VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <h4 className="font-semibold">Personal Information</h4>
                <p>When you create an account or use our services, we collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Delivery address and location data</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                  <li>Dietary preferences and food allergies</li>
                  <li>Order history and meal preferences</li>
                </ul>

                <h4 className="font-semibold">Usage Information</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>App usage patterns and feature interactions</li>
                  <li>Location data for delivery purposes</li>
                  <li>Customer service interactions and feedback</li>
                </ul>

                <h4 className="font-semibold">Cookies and Tracking</h4>
                <p>
                  We use cookies and similar technologies to enhance your experience, remember your preferences, and
                  analyze usage patterns. You can control cookie settings through your browser.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  How We Use Your Information
                </VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Provide Services:</strong> Process orders, schedule deliveries, and manage subscriptions
                  </li>
                  <li>
                    <strong>Personalization:</strong> Customize meal recommendations and improve user experience
                  </li>
                  <li>
                    <strong>Communication:</strong> Send order updates, promotional offers, and important notifications
                  </li>
                  <li>
                    <strong>Payment Processing:</strong> Handle transactions and billing (through secure third-party
                    processors)
                  </li>
                  <li>
                    <strong>Customer Support:</strong> Respond to inquiries and resolve issues
                  </li>
                  <li>
                    <strong>Analytics:</strong> Analyze usage patterns to improve our services
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> Meet regulatory requirements and protect our rights
                  </li>
                </ul>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Information Sharing
                </VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>We may share your information with:</p>

                <h4 className="font-semibold">Service Providers</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivery partners for meal delivery</li>
                  <li>Payment processors for transaction handling</li>
                  <li>Cloud storage providers for data hosting</li>
                  <li>Analytics services for usage insights</li>
                  <li>Customer support tools</li>
                </ul>

                <h4 className="font-semibold">Legal Requirements</h4>
                <p>We may disclose information when required by law, court order, or to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Comply with legal obligations</li>
                  <li>Protect our rights and property</li>
                  <li>Ensure user safety</li>
                  <li>Investigate fraud or security issues</li>
                </ul>

                <h4 className="font-semibold">Business Transfers</h4>
                <p>
                  In case of merger, acquisition, or sale of assets, your information may be transferred to the new
                  entity, subject to the same privacy protections.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Data Security
                </VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>We implement comprehensive security measures to protect your information:</p>

                <h4 className="font-semibold">Technical Safeguards</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>AES-256 encryption for data storage</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure cloud infrastructure with access controls</li>
                  <li>Multi-factor authentication for admin access</li>
                </ul>

                <h4 className="font-semibold">Operational Safeguards</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Limited access to personal data on a need-to-know basis</li>
                  <li>Regular employee training on data protection</li>
                  <li>Incident response procedures</li>
                  <li>Data backup and recovery systems</li>
                </ul>

                <p>
                  While we strive to protect your information, no method of transmission over the internet is 100%
                  secure. We encourage you to use strong passwords and keep your account credentials confidential.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Your Rights and Choices</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>You have the following rights regarding your personal information:</p>

                <h4 className="font-semibold">Access and Portability</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request a copy of your personal data</li>
                  <li>Download your data in a portable format</li>
                  <li>View your order history and preferences</li>
                </ul>

                <h4 className="font-semibold">Correction and Updates</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Update your profile information anytime</li>
                  <li>Correct inaccurate data</li>
                  <li>Modify dietary preferences and delivery details</li>
                </ul>

                <h4 className="font-semibold">Deletion and Restriction</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request deletion of your account and data</li>
                  <li>Restrict processing of certain information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>

                <h4 className="font-semibold">Communication Preferences</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unsubscribe from promotional emails</li>
                  <li>Manage notification settings</li>
                  <li>Choose communication channels</li>
                </ul>

                <p>To exercise these rights, contact us at privacy@vedicvogue.com or through your account settings.</p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Data Retention</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>We retain your information for different periods based on the type of data:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Account Information:</strong> Until you delete your account or request deletion
                  </li>
                  <li>
                    <strong>Order History:</strong> 7 years for tax and legal compliance
                  </li>
                  <li>
                    <strong>Payment Data:</strong> As required by payment processors and regulations
                  </li>
                  <li>
                    <strong>Marketing Data:</strong> Until you opt-out or we determine it&apos;s no longer needed
                  </li>
                  <li>
                    <strong>Support Interactions:</strong> 3 years for quality assurance
                  </li>
                  <li>
                    <strong>Analytics Data:</strong> Aggregated and anonymized data may be retained indefinitely
                  </li>
                </ul>

                <p>
                  When we no longer need your information, we securely delete or anonymize it according to our data
                  retention schedule.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Children&apos;s Privacy</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  Our services are not intended for children under 18 years of age. We do not knowingly collect personal
                  information from children under 18. If you are a parent or guardian and believe your child has
                  provided us with personal information, please contact us immediately.
                </p>
                <p>
                  If we discover that we have collected personal information from a child under 18, we will delete such
                  information promptly.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>International Data Transfers</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  Your information may be transferred to and processed in countries other than your country of
                  residence. These countries may have different data protection laws than your country.
                </p>
                <p>
                  When we transfer your information internationally, we ensure appropriate safeguards are in place, such
                  as:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Standard contractual clauses approved by regulatory authorities</li>
                  <li>Adequacy decisions by relevant data protection authorities</li>
                  <li>Certification schemes and codes of conduct</li>
                </ul>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Changes to This Policy</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                  legal requirements, or other factors.
                </p>
                <p>When we make significant changes, we will:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Notify you via email or through our app/website</li>
                  <li>Update the &quot;Last updated&quot; date at the top of this policy</li>
                  <li>Provide a summary of key changes</li>
                  <li>Give you time to review the changes before they take effect</li>
                </ul>
                <p>
                  Your continued use of our services after the effective date constitutes acceptance of the updated
                  Privacy Policy.
                </p>
              </VVCardContent>
            </VVCard>

            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Contact Us</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="prose prose-sm max-w-none">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                  please contact us:
                </p>
                <ul className="list-none space-y-2">
                  <li>
                    <strong>Privacy Officer:</strong> privacy@vedicvogue.com
                  </li>
                  <li>
                    <strong>General Support:</strong> support@vedicvogue.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +91 98765 43210
                  </li>
                  <li>
                    <strong>Address:</strong> VedicVogue Kitchen Pvt. Ltd., Data Protection Office, Bangalore,
                    Karnataka, India
                  </li>
                </ul>
                <p>We will respond to your inquiry within 30 days of receipt.</p>
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

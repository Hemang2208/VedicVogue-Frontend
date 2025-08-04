import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChefHat,
} from "lucide-react";
// import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center space-x-2 group flex-shrink-0"
            >
              <ChefHat className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange-600 transition-transform group-hover:rotate-12" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-orange-600 transition-colors">
                <span className="hidden sm:inline">VedicVogue Kitchen</span>
                <span className="sm:hidden">VedicVogue</span>
              </span>
            </Link>
            <p className="text-sm">
              Your fastest delivery solution for everyday needs. We bring the
              store to your door in minutes.
            </p>

            <div className="flex space-x-4">
              <Link
                target="_blank"
                href="#"
                className="text-gray-400 hover:text-white hover:scale-110 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                target="_blank"
                href="#"
                className="text-gray-400 hover:text-white hover:scale-110 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                target="_blank"
                href="#"
                className="text-gray-400 hover:text-white hover:scale-110 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                target="_blank"
                href="#"
                className="text-gray-400 hover:text-white hover:scale-110 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                target="_blank"
                href="#"
                className="text-gray-400 hover:text-white hover:scale-110 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Delivery Hours</p>
                  <p className="text-sm">7:00 AM - 11:00 PM, Daily</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  Today&apos;s Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/express-delivery"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  Express Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/subscriptions"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  Subscribe & Save
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-sm hover:text-white transition-colors hover:underline flex items-center w-fit gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Our Location</p>
                  <p className="text-sm">
                    123 Commerce Street, Tech City, TC 12345
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p className="text-sm">+1 (234) 567-8900</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="text-sm">support@vedicvogue.com</p>
                </div>
              </div>

              {/* <div className="pt-2">
                <h4 className="font-medium text-white mb-2">
                  Download Our App
                </h4>
                <div className="flex gap-2">
                  <Link href="#" className="block">
                    <Image
                      src="https://placehold.co/50x50/svg"
                      alt="App Store"
                      className=""
                      width={100}
                      height={100}
                    />
                  </Link>
                  <Link href="#" className="block">
                    <Image
                      src="https://placehold.co/50x50/svg"
                      alt="Play Store"
                      className=""
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center sm:text-left">
            <Link
              href="/privacy"
              className="text-sm hover:text-white transition-colors hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm hover:text-white transition-colors hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm hover:text-white transition-colors hover:underline"
            >
              Cookie Policy
            </Link>
          </div>

          <p className="text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} QuickCommerce. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

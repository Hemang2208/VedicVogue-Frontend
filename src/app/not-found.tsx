import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Home, Search } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* 404 Illustration */}
          <div className="relative">
            <Image
              src="https://placehold.co/400x300/svg/"
              alt="Page not found"
              width={400}
              height={300}
              className="mx-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl font-bold text-primary/20">404</div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              The page you&apos;re looking for seems to have gone on a food
              adventure. Let&apos;s get you back to something delicious!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/menu" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Browse Menu
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link
                href="/menu"
                className="text-muted-foreground hover:text-primary"
              >
                View Menu
              </Link>
              <Link
                href="/booking"
                className="text-muted-foreground hover:text-primary"
              >
                Book Meals
              </Link>
              <Link
                href="/support"
                className="text-muted-foreground hover:text-primary"
              >
                Get Help
              </Link>
              <Link
                href="/sign-up"
                className="text-muted-foreground hover:text-primary"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Fun Message */}
          <div className="bg-muted/30 rounded-2xl p-6 mt-12">
            <p className="text-muted-foreground">
              ��� While you&apos;re here, did you know we serve over 50
              different authentic Indian dishes?
              <Link href="/menu" className="text-primary hover:underline ml-1">
                Explore our menu
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

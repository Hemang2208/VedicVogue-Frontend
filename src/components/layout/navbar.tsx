"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  ChefHat,
  Phone,
  User,
  // ShoppingCart,
  // HelpCircle,
  Utensils,
  Menu,
  X,
  ChevronDown,
  SquareMenu,
  Store,
  CornerDownRight,
  CalendarPlus,
} from "lucide-react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group flex-shrink-0"
            >
              <ChefHat className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange-600 transition-transform group-hover:rotate-12" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                <span className="hidden sm:inline">VedicVogue Kitchen</span>
                <span className="sm:hidden">VedicVogue</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="gap-1 text-sm cursor-pointer">
                {/* Menu */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/menu"
                      className="flex items-center cursor-pointer"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-1 text-sm cursor-pointer"
                      >
                        <SquareMenu className="h-4 w-4 text-black" />
                        Menu
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className="flex items-center cursor-pointer"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-1 text-sm cursor-pointer"
                      >
                        <Store className="h-4 w-4 text-black" />
                        About
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="flex items-center cursor-pointer"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-1 text-sm cursor-pointer"
                      >
                        <Phone className="h-4 w-4 text-black" />
                        Contact
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Subscriptions */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/subscriptions"
                      className="flex items-center cursor-pointer"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-1 text-sm cursor-pointer"
                      >
                        <CalendarPlus className="h-4 w-4 text-black" />
                        Subscription
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop User Menu */}
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="gap-1 text-sm">
                      <User className="h-4 w-4 text-black" />
                      <span className="hidden lg:inline">Account</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="rounded-lg shadow-lg">
                      <div className="p-2 w-48">
                        <NavigationMenuLink asChild>
                          <Link href="/sign-in">
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm"
                            >
                              <User className="h-4 w-4 text-black" />
                              Sign In
                            </Button>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/sign-up">
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm"
                            >
                              <User className="h-4 w-4 text-black" />
                              Sign Up
                            </Button>
                          </Link>
                        </NavigationMenuLink>
                        {/* <NavigationMenuLink asChild>
                          <Link href="/user/profile">
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm"
                            >
                              <User className="h-4 w-4 text-black" />
                              My Profile
                            </Button>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/user/profile/dashboard">
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm"
                            >
                              <User className="h-4 w-4 text-black" />
                              Dashboard
                            </Button>
                          </Link>
                        </NavigationMenuLink> */}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* CTA Button */}
              <Link href="/user/book" className="hidden sm:block">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-1 text-sm px-3 sm:px-4 cursor-pointer">
                  <CornerDownRight className="h-4 w-4" />
                  <span className="hidden md:inline">Order Now</span>
                  <span className="md:hidden">Order</span>
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {/* Mobile Navigation Links */}

              <Link href="/menu" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 py-3 text-base"
                >
                  <Utensils className="h-5 w-5" />
                  Our Menu
                </Button>
              </Link>

              <Link href="/contact" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 py-3 text-base"
                >
                  <Utensils className="h-5 w-5" />
                  Contact
                </Button>
              </Link>

              <Link href="/subscriptions" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 py-3 text-base"
                >
                  <Utensils className="h-5 w-5" />
                  Subscription
                </Button>
              </Link>

              {/* <Link href="/user/book" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 py-3 text-base"
                >
                  <Utensils className="h-5 w-5" />
                  Book
                </Button>
              </Link> */}

              {/* Mobile Orders Dropdown */}
              {/* <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between gap-3 py-3 text-base"
                  onClick={() => toggleDropdown("orders")}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "orders" ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {openDropdown === "orders" && (
                  <div className="ml-8 space-y-1 mt-2">
                    <Link href="/user/orders" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <ShoppingCart className="h-4 w-4 text-black" />
                        My Orders
                      </Button>
                    </Link>
                    <Link href="/user/order-summary" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <ShoppingCart className="h-4 w-4 text-black" />
                        Order Summary
                      </Button>
                    </Link>
                  </div>
                )}
              </div> */}

              {/* Mobile Support Dropdown */}
              {/* <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between gap-3 py-3 text-base"
                  onClick={() => toggleDropdown("support")}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5" />
                    Support
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "support" ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {openDropdown === "support" && (
                  <div className="ml-8 space-y-1 mt-2">
                    <Link href="/user/help" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <HelpCircle className="h-4 w-4 text-black" />
                        Help Center
                      </Button>
                    </Link>
                    <Link
                      href="/user/contact-support"
                      onClick={closeMobileMenu}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <Phone className="h-4 w-4 text-black" />
                        Contact Us
                      </Button>
                    </Link>
                    <Link href="/user/feedback" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <HelpCircle className="h-4 w-4 text-black" />
                        Feedback
                      </Button>
                    </Link>
                  </div>
                )}
              </div> */}

              {/* Mobile Account Dropdown */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between gap-3 py-3 text-base"
                  onClick={() => toggleDropdown("account")}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    Account
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "account" ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {openDropdown === "account" && (
                  <div className="ml-8 space-y-1 mt-2">
                    <Link href="/sign-in" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <User className="h-4 w-4 text-black" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <User className="h-4 w-4 text-black" />
                        Sign Up
                      </Button>
                    </Link>
                    {/* <div className="h-px bg-gray-100 my-2" />
                    <Link href="/user/profile" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <User className="h-4 w-4 text-black" />
                        My Profile
                      </Button>
                    </Link>
                    <Link href="/user/dashboard" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <User className="h-4 w-4 text-black" />
                        Dashboard
                      </Button>
                    </Link> */}
                  </div>
                )}
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-gray-100">
                <Link href="/user/book" onClick={closeMobileMenu}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 py-3 text-base">
                    <CornerDownRight className="h-5 w-5" />
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// Bottom Tab Navigation Component (Alternative Mobile Navigation)
// export function BottomTabNavigation() {
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 sm:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-40">
//       <div className="flex justify-around items-center py-2 px-2 safe-area-pb">
//         <Link href="/" className="flex flex-col items-center min-w-0 flex-1">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
//           >
//             <Home className="h-4 w-4 text-black sm:h-5 sm:w-5" />
//             <span className="text-xs font-medium">Home</span>
//           </Button>
//         </Link>

//         <Link
//           href="/menu"
//           className="flex flex-col items-center min-w-0 flex-1"
//         >
//           <Button
//             variant="ghost"
//             size="sm"
//             className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
//           >
//             <Utensils className="h-4 w-4 text-black sm:h-5 sm:w-5" />
//             <span className="text-xs font-medium">Menu</span>
//           </Button>
//         </Link>

//         <Link
//           href="/book"
//           className="flex flex-col items-center min-w-0 flex-1"
//         >
//           <Button
//             variant="ghost"
//             size="sm"
//             className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
//           >
//             <Calendar className="h-4 w-4 text-black sm:h-5 sm:w-5" />
//             <span className="text-xs font-medium">Book</span>
//           </Button>
//         </Link>

//         <Link
//           href="/orders"
//           className="flex flex-col items-center min-w-0 flex-1"
//         >
//           <Button
//             variant="ghost"
//             size="sm"
//             className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
//           >
//             <ShoppingCart className="h-4 w-4 text-black sm:h-5 sm:w-5" />
//             <span className="text-xs font-medium">Orders</span>
//           </Button>
//         </Link>

//         <Link
//           href="/profile"
//           className="flex flex-col items-center min-w-0 flex-1"
//         >
//           <Button
//             variant="ghost"
//             size="sm"
//             className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
//           >
//             <User className="h-4 w-4 text-black sm:h-5 sm:w-5" />
//             <span className="text-xs font-medium">Profile</span>
//           </Button>
//         </Link>
//       </div>
//     </nav>
//   );
// }

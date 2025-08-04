import React from "react";
// import UserAuthGuard from "@/components/guards/UserAuthGuard";

export const metadata = {
  title: "User Dashboard",
  description: "Manage your profile, orders, bookings, and more.",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* <UserAuthGuard> */}
      {children}
      {/* </UserAuthGuard> */}
    </div>
  );
}

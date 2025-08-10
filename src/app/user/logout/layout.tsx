import React from "react";

export const metadata = {
  title: "Logout - Vedic Vogue",
  description: "Securely logging you out of your Vedic Vogue account.",
};

export default function LogoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

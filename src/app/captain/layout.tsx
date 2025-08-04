import type React from "react";
import { CaptainDashboardWrapper } from "@/components/captain-ui/captain-dashboard-wrapper";
// import CaptainAuthGuard from "@/components/guards/CaptainAuthGaurd";

export const metadata = {
  title: "Captain Dashboard - VedicVogue",
  description:
    "Delivery management dashboard for VedicVogue captains. Manage orders, routes, and deliveries efficiently.",
};

export default function CaptainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <CaptainAuthGuard>
      <CaptainDashboardWrapper>{children}</CaptainDashboardWrapper>
    // </CaptainAuthGuard>
  );
}

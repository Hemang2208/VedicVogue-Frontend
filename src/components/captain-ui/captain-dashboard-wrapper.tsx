"use client";

import type React from "react";
import { CaptainSidebar } from "./captain-sidebar";
import { CaptainMobileNav } from "./captain-mobile-nav";

interface CaptainDashboardWrapperProps {
  children: React.ReactNode;
}

export function CaptainDashboardWrapper({
  children,
}: CaptainDashboardWrapperProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <CaptainSidebar className="h-full" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Navigation Trigger */}
              <CaptainMobileNav />

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  VedicVogue Captain
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  Delivery Management Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium hidden sm:inline">
                  Online & Ready
                </span>
                <span className="text-sm text-green-600 font-medium sm:hidden">
                  Online
                </span>
              </div>
              <div className="text-sm text-gray-500 hidden md:block">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

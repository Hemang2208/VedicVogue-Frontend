"use client";

import { Suspense } from "react";
import SuccessPage from "./success";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Careers() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuccessPage />
    </Suspense>
  );
}

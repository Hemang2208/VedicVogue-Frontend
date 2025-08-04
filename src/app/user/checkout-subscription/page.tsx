"use client";

import { Suspense } from "react";
import CheckoutSubscriptionPage from "./checkout-subscription";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Careers() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CheckoutSubscriptionPage />
    </Suspense>
  );
}

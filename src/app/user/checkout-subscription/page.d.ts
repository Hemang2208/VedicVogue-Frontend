// app/checkout/page.d.ts
import { SubscriptionPlan } from "../../../lib/allSubscriptions";

export interface CheckoutPageProps {
  searchParams: {
    plan?: SubscriptionPlan["id"];
  };
}

export interface SuccessPageProps {
  searchParams: {
    plan?: SubscriptionPlan["id"];
  };
}

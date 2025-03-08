// app/invitation/gifts/[gift]/checkout/page.tsx
"use client";

import CheckoutContent from "@/components/CheckoutPage/CheckoutContent";

export default function CheckoutPage() {
  return <CheckoutContent isInvitationPage={true} />;
}
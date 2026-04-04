export const COLORS = {
  background: "#111111",
  surface: "#1A1A1A",
  border: "#333333",
  gold: "#D4A017",
  white: "#FFFFFF",
  muted: "#AAAAAA",
  error: "#E53935",
  success: "#43A047",
};

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27000000000",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+27000000000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@vula24.co.za",
};

/** Locksmith web dashboard login URL — set NEXT_PUBLIC_LOCKSMITH_LOGIN_URL in production */
export const LOCKSMITH_LOGIN_URL =
  process.env.NEXT_PUBLIC_LOCKSMITH_LOGIN_URL ?? "";

/** Dedicated account page: dashboard login + application form */
export const LOCKSMITH_PORTAL_HREF = "/for-locksmiths/account";
export const LOCKSMITH_SIGNUP_HREF = "/for-locksmiths/account?signup=1";

export const CITIES = {
  gauteng: [
    "Johannesburg",
    "Pretoria",
    "Sandton",
    "Midrand",
    "Soweto",
    "Centurion",
    "Randburg",
    "Roodepoort",
  ],
  westernCape: [
    "Cape Town",
    "Worcester",
    "Stellenbosch",
    "Paarl",
    "Franschhoek",
    "Somerset West",
    "Bellville",
    "George",
  ],
};

export const PRICING = [
  {
    name: "Starter",
    price: "R499",
    period: "month",
    features: [
      "1 city coverage",
      "Up to 15 job requests per month",
      "SMS lead alerts to your phone",
      "Customer contact details sent directly to you",
      "Basic verified profile",
      "Standard support",
    ],
    cta: "Start with Starter",
  },
  {
    name: "Pro",
    price: "R899",
    period: "month",
    features: [
      "Full province coverage",
      "Unlimited job requests",
      "Priority listing in search",
      "PSIRA verified badge",
      "Priority SMS lead alerts",
      "First locksmith notified in your area",
      "Dedicated support",
      "Business account (add your team)",
    ],
    cta: "Go Pro",
    featured: true,
  },
];

export const HEARD_ABOUT_OPTIONS = [
  { value: "", label: "Select an option" },
  { value: "google", label: "Google" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "referral", label: "Referred by another locksmith" },
  { value: "social", label: "Social media" },
  { value: "other", label: "Other" },
];

/** Customer request form — service types */
export const CUSTOMER_JOB_SERVICES = [
  "Car Lockout",
  "House Lockout",
  "Key Duplication",
  "Lock Replacement",
  "Lock Repair",
  "Safe Opening",
  "Other",
];

/** Legacy alias if needed elsewhere */
export const SERVICES = CUSTOMER_JOB_SERVICES;

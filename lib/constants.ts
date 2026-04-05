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

/** Locksmith apply page */
export const LOCKSMITH_PORTAL_HREF = "/for-locksmiths/account";

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

/**
 * Services customers can request — keep in sync with locksmith signup offerings.
 * Locksmiths select a subset via checkboxes on /for-locksmiths.
 */
export const CUSTOMER_JOB_SERVICES = [
  "Emergency / 24-hour",
  "Car Lockout",
  "House Lockout",
  "Commercial / office",
  "Key Duplication",
  "Lock Replacement",
  "Lock Repair",
  "Safe Opening",
  "Security & access control",
  "Gate & garage",
  "Onsite / mobile",
  "Other",
] as const;

/** Same list for locksmith application — multi-select all they offer */
export const LOCKSMITH_SERVICE_OPTIONS = CUSTOMER_JOB_SERVICES;

/** Legacy alias if needed elsewhere */
export const SERVICES = CUSTOMER_JOB_SERVICES;

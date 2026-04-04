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

/** Locksmith app / dashboard login — set NEXT_PUBLIC_LOCKSMITH_LOGIN_URL in production */
export const LOCKSMITH_LOGIN_URL =
  process.env.NEXT_PUBLIC_LOCKSMITH_LOGIN_URL ?? "";

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
      "WhatsApp job notifications",
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
      "WhatsApp + SMS + push notifications",
      "Dedicated support",
      "Business account (add your team)",
    ],
    cta: "Go Pro",
    featured: true,
  },
];

export const NAV_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Coverage", href: "/coverage" },
  { label: "For Locksmiths", href: "/for-locksmiths" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const HEARD_ABOUT_OPTIONS = [
  { value: "", label: "Select an option" },
  { value: "google", label: "Google" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "referral", label: "Referred by another locksmith" },
  { value: "social", label: "Social media" },
  { value: "other", label: "Other" },
];

export const SERVICES = [
  "Car Lockout",
  "House Lockout",
  "Key Replacement",
  "Lock Change",
  "Safe Opening",
  "Other",
];

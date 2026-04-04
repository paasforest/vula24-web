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
      "Up to 15 jobs per month",
      "WhatsApp notifications",
      "Basic listing",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "R899",
    period: "month",
    features: [
      "Full province coverage",
      "Unlimited jobs",
      "Verified badge",
      "Priority listing",
      "WhatsApp + SMS notifications",
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

export const SERVICES = [
  "Car Lockout",
  "House Lockout",
  "Key Replacement",
  "Lock Change",
  "Safe Opening",
  "Other",
];

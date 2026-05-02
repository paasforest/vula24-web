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
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27661235067",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+27661235067",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@vula24.co.za",
};

/** Locksmith apply page */
export const LOCKSMITH_PORTAL_HREF = "/for-locksmiths/account";

/** First month targeted for platform subscription billing — keep marketing and admin copy in sync. */
export const FIRST_PLATFORM_BILLING_MONTH = "November 2026";

/** Launch: founding period — hide monthly tier prices in locksmith + admin; approvals still assign tier. */
export const LAUNCH_FREE_PLATFORM = true;

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

/** City → province for customer request suburb dropdown */
export const CITY_PROVINCE: Record<string, "GP" | "WC"> = {
  Johannesburg: "GP",
  Pretoria: "GP",
  Sandton: "GP",
  Midrand: "GP",
  Soweto: "GP",
  Centurion: "GP",
  Randburg: "GP",
  Roodepoort: "GP",
  "Cape Town": "WC",
  Worcester: "WC",
  Stellenbosch: "WC",
  Paarl: "WC",
  Franschhoek: "WC",
  "Somerset West": "WC",
  Bellville: "WC",
  George: "WC",
};

/** Suburbs by province — customer request form */
export const SUBURBS: Record<"GP" | "WC", string[]> = {
  GP: [
    "Sandton",
    "Randburg",
    "Midrand",
    "Centurion",
    "Pretoria CBD",
    "Menlyn",
    "Soweto",
    "Roodepoort",
    "Boksburg",
    "Germiston",
    "Edenvale",
    "Fourways",
    "Bryanston",
    "Parktown",
    "Johannesburg CBD",
    "Rosebank",
    "Bedfordview",
    "Alberton",
    "Kempton Park",
    "Benoni",
    "Tembisa",
    "Mamelodi",
  ],
  WC: [
    "Cape Town CBD",
    "Sea Point",
    "Green Point",
    "Camps Bay",
    "Claremont",
    "Rondebosch",
    "Mitchells Plain",
    "Bellville",
    "Tygervalley",
    "Stellenbosch",
    "Paarl",
    "Worcester",
    "George",
    "Franschhoek",
    "Somerset West",
    "Strand",
    "Brackenfell",
    "Kuils River",
    "Parow",
    "Durbanville",
    "Constantia",
    "Wynberg",
    "Retreat",
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

import { API_SERVICE_OPTIONS } from "@/lib/api-services";

/** Display labels only — same order as API keys in `API_SERVICE_OPTIONS`. */
export const CUSTOMER_JOB_SERVICES = API_SERVICE_OPTIONS.map(
  (o) => o.label
) as readonly string[];

/** Same list for locksmith application — multi-select all they offer */
export const LOCKSMITH_SERVICE_OPTIONS = CUSTOMER_JOB_SERVICES;

/** Legacy alias if needed elsewhere */
export const SERVICES = CUSTOMER_JOB_SERVICES;

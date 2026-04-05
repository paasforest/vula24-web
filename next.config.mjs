import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const locPath = path.join(__dirname, "lib", "locations-data.json");
const locData = JSON.parse(fs.readFileSync(locPath, "utf8"));
const citySlugs = [...locData.gauteng, ...locData.westernCape].map(
  (l) => l.slug
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  /**
   * Public URLs stay /locksmith-{slug} (SEO). The page lives at /locksmith/[city].
   * Without rewrites, Next would only serve the literal broken path /locksmith-[city].
   */
  async rewrites() {
    return citySlugs.map((slug) => ({
      source: `/locksmith-${slug}`,
      destination: `/locksmith/${slug}`,
    }));
  },
  /** Canonical hyphen URLs — slash variants consolidate here. */
  async redirects() {
    return citySlugs.map((slug) => ({
      source: `/locksmith/${slug}`,
      destination: `/locksmith-${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;

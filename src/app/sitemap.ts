import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = [
  "/",
  "/pricing",
  "/security",
  "/about",
  "/careers",
  "/blog",
  "/blog/where-agents-should-pause",
  "/blog/run-histories-auditors-read",
  "/blog/why-we-price-per-workspace",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: p.startsWith("/blog") ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.startsWith("/blog") ? 0.6 : 0.7,
  }));
}

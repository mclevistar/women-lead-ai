import type { MetadataRoute } from "next";
import { getAllEpisodes } from "@/lib/get-episodes";
import { SITE_URL } from "@/lib/seo";

// Rebuilt every 15 minutes, so new podcast episodes get added on their own
export const revalidate = 900;

const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/podcast", priority: 0.9, changeFrequency: "weekly" },
  { path: "/courses/ai-sales-marketing-bootcamp", priority: 0.9, changeFrequency: "weekly" },
  { path: "/courses", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/motion-graphics-effects", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/ai-hook-effects", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/nyc-through-time", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/ask-for-more", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/speaking", priority: 0.7, changeFrequency: "monthly" },
  { path: "/b2b", priority: 0.7, changeFrequency: "monthly" },
  { path: "/youtube", priority: 0.5, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await getAllEpisodes();
  const latest = episodes.map((ep) => ep.date).filter(Boolean).sort().pop();

  return [
    ...PAGES.map((page) => ({
      url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
      lastModified: page.path === "/" || page.path === "/podcast" ? latest : undefined,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...episodes.map((ep) => ({
      url: `${SITE_URL}/podcast/${ep.id}`,
      lastModified: ep.date || undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

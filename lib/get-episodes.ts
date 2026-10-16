import { RSS_URL, parseEpisodes } from "@/lib/parse-rss";
import { episodes as staticEpisodes } from "@/lib/episodes";
import type { Episode } from "@/lib/episodes";

// All episodes from the podcast RSS feed, cached for 15 minutes.
export async function getAllEpisodes(timeoutMs = 5000): Promise<Episode[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(RSS_URL, { next: { revalidate: 900 }, signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const episodes = parseEpisodes(await res.text());
      if (episodes.length > 0) return episodes;
    }
  } catch {
    // fall through to static fallback
  }
  return staticEpisodes;
}

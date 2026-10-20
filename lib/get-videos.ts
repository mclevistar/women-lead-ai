import { XMLParser } from "fast-xml-parser";

export const YOUTUBE_CHANNEL_ID = "UCDb-8JMynToZiQ7Z3zUgDeQ";
// UULF = the channel's long-form uploads only (no Shorts, no live streams). YouTube returns the latest 15.
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=UULF${YOUTUBE_CHANNEL_ID.slice(2)}`;

export type Video = {
  id: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
};

type FeedEntry = {
  "yt:videoId": string;
  title: string;
  published: string;
  "media:group"?: { "media:description"?: string };
};

// Latest long-form YouTube videos, cached for 15 minutes so new uploads appear on their own.
export async function getLatestVideos(timeoutMs = 5000): Promise<Video[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(FEED_URL, { next: { revalidate: 900 }, signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return [];

    const feed = new XMLParser({ processEntities: true, htmlEntities: true }).parse(await res.text());
    const raw = feed?.feed?.entry ?? [];
    const entries: FeedEntry[] = Array.isArray(raw) ? raw : [raw];

    return entries.map((e) => ({
      id: String(e["yt:videoId"]),
      title: String(e.title),
      date: e.published,
      description: String(e["media:group"]?.["media:description"] ?? ""),
      thumbnail: `https://i.ytimg.com/vi/${e["yt:videoId"]}/hqdefault.jpg`,
    }));
  } catch {
    return [];
  }
}

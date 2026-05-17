import { XMLParser } from "fast-xml-parser";
import type { Episode } from "./episodes";

export const RSS_URL = "https://anchor.fm/s/10ef58958/podcast/rss";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function parseDuration(raw: string | null | undefined): string {
  if (!raw) return "";
  const str = String(raw);
  const parts = str.split(":");
  if (parts.length === 3) {
    const h = parseInt(parts[0]);
    const m = parseInt(parts[1]);
    return h > 0 ? `${h}h ${m}m` : `${m} min`;
  }
  if (parts.length === 2) {
    return `${parseInt(parts[0])} min`;
  }
  const secs = parseInt(str);
  if (!isNaN(secs)) {
    return `${Math.round(secs / 60)} min`;
  }
  return str;
}

// Splits "Clean Title | ft. Guest Name" or "Clean Title | Show Ep N Guest Name"
function extractTitleAndGuest(raw: string): { title: string; guest: string } {
  const pipeIdx = raw.indexOf("|");
  if (pipeIdx === -1) return { title: raw.trim(), guest: "" };

  const title = raw.slice(0, pipeIdx).trim();
  const suffix = raw.slice(pipeIdx + 1).trim();

  const ftMatch = suffix.match(/\bft\.?\s+(.+)/i) || suffix.match(/\bwith\s+(.+)/i);
  if (ftMatch) return { title, guest: ftMatch[1].trim() };

  // Remove "Women Lead AI Ep N" prefix and use remainder as guest name
  const cleaned = suffix.replace(/women lead ai ep\s*\d+/i, "").trim();
  return { title, guest: cleaned };
}

export function parseEpisodes(xml: string): Episode[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const feed = parser.parse(xml);
  const channel = feed?.rss?.channel;
  if (!channel) return [];

  const items = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];
  const episodes: Episode[] = [];

  for (const item of items) {
    const rawTitle = String(item.title || "Untitled");
    const { title, guest } = extractTitleAndGuest(rawTitle);
    const descriptionRaw = item.description || "";
    const description = stripHtml(descriptionRaw);
    const pubDate = item.pubDate || "";
    const date = pubDate ? new Date(pubDate).toISOString().split("T")[0] : "";
    const duration = parseDuration(item["itunes:duration"] || null);
    const enclosureUrl = item.enclosure?.["@_url"] || "";
    const link = item.link || "";
    const epNum = item["itunes:episode"];

    const keywords = item["itunes:keywords"] || "";
    const topics = keywords
      ? String(keywords).split(",").map((k: string) => k.trim()).filter(Boolean).slice(0, 4)
      : ["AI", "Leadership"];

    const id = slugify(title);

    episodes.push({
      id,
      title,
      description: description.slice(0, 300),
      guest: guest || "Wiktoria Korbecka",
      guestBio: "",
      date,
      duration,
      topics,
      showNotes: description,
      keyTakeaways: [],
      linksMentioned: link ? [{ title: "Listen on Spotify", url: link }] : [],
      transcript: "",
      episodeNumber: epNum ? parseInt(String(epNum)) : 0,
      audioUrl: enclosureUrl,
    });
  }

  return episodes;
}

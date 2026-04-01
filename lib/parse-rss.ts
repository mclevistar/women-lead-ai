import { XMLParser } from "fast-xml-parser";
import type { Episode } from "./episodes";

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
  let episodeNumber = items.length;

  for (const item of items) {
    const title = item.title || "Untitled";
    const descriptionRaw = item.description || "";
    const description = stripHtml(descriptionRaw);
    const pubDate = item.pubDate || "";
    const date = pubDate ? new Date(pubDate).toISOString().split("T")[0] : "";
    const duration = parseDuration(
      item["itunes:duration"] || null
    );
    const author = item["itunes:author"] || "";
    const enclosureUrl = item.enclosure?.["@_url"] || "";
    const link = item.link || "";

    const keywords = item["itunes:keywords"] || "";
    const topics = keywords
      ? String(keywords).split(",").map((k: string) => k.trim()).filter(Boolean).slice(0, 4)
      : ["AI", "Leadership"];

    const id = slugify(title);

    episodes.push({
      id,
      title,
      description: description.slice(0, 300),
      guest: author || "Women Lead AI",
      guestBio: "",
      date,
      duration,
      topics,
      showNotes: description,
      keyTakeaways: [],
      linksMentioned: link ? [{ title: "Listen on Spotify", url: link }] : [],
      transcript: "",
      episodeNumber: episodeNumber--,
      audioUrl: enclosureUrl,
    });
  }

  return episodes;
}

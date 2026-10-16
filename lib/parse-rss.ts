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

// Like slugify, but cut at a whole word so URLs don't end mid-word
function cleanSlug(text: string): string {
  const full = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (full.length <= 80) return full;
  return full.slice(0, 81).replace(/-[^-]*$/, "");
}

function stripHtml(html: string): string {
  // Tags become spaces so paragraphs and line breaks don't glue words together
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function cleanDescription(raw: string): string {
  let text = decodeEntities(stripHtml(raw)).replace(/^Send us Fan Mail\s*/i, "");
  // Remove chapters list and links section that appear at the end of RSS descriptions
  const cutAt = text.search(/⏳\s*Chapters?:|🔗\s*Links|Links\s*&\s*Resources|Connect with\s+\w/i);
  if (cutAt > 80) text = text.slice(0, cutAt);
  return text.trim();
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

// Feed titles look like "Ep 8 I Clean Title I Guest", "Ep. 6 Clean Title ft. Guest"
// or "Clean Title | Women Lead AI Ep 2 Guest". Pull out the clean title, guest and number,
// so episode URLs stay short and stable even when the title prefix style changes.
function extractTitleAndGuest(raw: string): { title: string; guest: string; episodeNumber: number } {
  let text = decodeEntities(raw).replace(/\s+/g, " ").trim();
  let episodeNumber = 0;

  const prefix = text.match(/^Ep\.?\s*(\d+)\.?\s*(?:I\s+|\|\s*)?/i);
  if (prefix) {
    episodeNumber = parseInt(prefix[1]);
    text = text.slice(prefix[0].length);
  }

  let title = text;
  let guest = "";
  // The last " | " or " I " separator splits off the guest
  const separators = [...text.matchAll(/\s(?:\||I)\s/g)];
  const last = separators[separators.length - 1];
  if (last && last.index !== undefined && text.length - last.index < 70) {
    title = text.slice(0, last.index);
    guest = text.slice(last.index + last[0].length);
  }
  const ft = title.match(/\s+ft\.?\s+(.+)$/i);
  if (ft && ft.index !== undefined) {
    guest = ft[1];
    title = title.slice(0, ft.index);
  }

  const suffixNumber = guest.match(/\bEp\.?\s*(\d+)\.?/i);
  if (!episodeNumber && suffixNumber) episodeNumber = parseInt(suffixNumber[1]);
  guest = guest
    .replace(/women lead ai/i, "")
    .replace(/\bEp\.?\s*\d+\.?/i, "")
    .replace(/^\s*(?:ft\.?|with)\s+/i, "")
    .trim();

  return { title: title.trim(), guest, episodeNumber };
}

// The URL slug the site used before 16 Oct 2026 (title up to the first "|"),
// kept so old links can redirect to the clean URL.
function legacySlug(raw: string): string {
  const pipeIdx = raw.indexOf("|");
  return slugify((pipeIdx === -1 ? raw : raw.slice(0, pipeIdx)).trim());
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
    const { title, guest, episodeNumber } = extractTitleAndGuest(rawTitle);
    const descriptionRaw = item.description || "";
    const description = cleanDescription(descriptionRaw);
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

    const id = cleanSlug(title);

    episodes.push({
      id,
      legacyId: legacySlug(rawTitle),
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
      episodeNumber: epNum ? parseInt(String(epNum)) : episodeNumber,
      audioUrl: enclosureUrl,
    });
  }

  return episodes;
}

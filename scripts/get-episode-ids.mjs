#!/usr/bin/env node
/**
 * Fetches the RSS feed and prints current episode IDs.
 * Use these IDs when calling add-transcript.mjs.
 *
 * Usage: node scripts/get-episode-ids.mjs
 */

const RSS_URL = "https://anchor.fm/s/10ef58958/podcast/rss";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

function extractTitle(raw) {
  const pipeIdx = raw.indexOf("|");
  return pipeIdx === -1 ? raw.trim() : raw.slice(0, pipeIdx).trim();
}

const res = await fetch(RSS_URL);
const xml = await res.text();

const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
for (const [, item] of items) {
  const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]>/);
  const epMatch = item.match(/<itunes:episode>(\d+)<\/itunes:episode>/);
  if (!titleMatch) continue;
  const rawTitle = titleMatch[1];
  const cleanTitle = extractTitle(rawTitle);
  const id = slugify(cleanTitle);
  const ep = epMatch ? `EP${epMatch[1]}` : "trailer";
  console.log(`${ep}: ${id}`);
}

#!/usr/bin/env node
/**
 * Add a transcript to lib/transcripts.ts.
 *
 * Usage:
 *   node scripts/add-transcript.mjs <episode-id> <transcript-file>
 *
 * Example:
 *   node scripts/add-transcript.mjs "my-episode-title" ../podcast\ episodes/transcript.txt
 *
 * The episode ID must match the slug generated from the RSS title.
 * Run `node scripts/get-episode-id.mjs` to see current episode IDs.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const [,, episodeId, transcriptFile] = process.argv;

if (!episodeId || !transcriptFile) {
  console.error("Usage: node scripts/add-transcript.mjs <episode-id> <transcript-file>");
  process.exit(1);
}

const transcriptPath = resolve(transcriptFile);
let raw;
try {
  raw = readFileSync(transcriptPath, "utf-8");
} catch {
  console.error(`Could not read file: ${transcriptPath}`);
  process.exit(1);
}

// Strip common timestamp formats
const cleaned = raw
  .replace(/\[\d{2}:\d{2}(:\d{2})? - \d{2}:\d{2}(:\d{2})?\]\s*/g, "")
  .replace(/\[\d+\.?\d*s -> \d+\.?\d*s\]\s*/g, "")
  .replace(/\[\d{2}:\d{2}\]\s*/g, "")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

// Escape for template literal
const escaped = cleaned.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const transcriptsPath = resolve(new URL(".", import.meta.url).pathname, "../lib/transcripts.ts");
let content = readFileSync(transcriptsPath, "utf-8");

// Check if ID already exists
if (content.includes(`"${episodeId}"`)) {
  console.error(`Episode ID "${episodeId}" already exists in lib/transcripts.ts`);
  console.error("Remove the existing entry manually before re-adding.");
  process.exit(1);
}

// Insert before the closing }
const insertionPoint = content.lastIndexOf("};");
if (insertionPoint === -1) {
  console.error("Could not find closing }; in lib/transcripts.ts");
  process.exit(1);
}

const newEntry = `\n  "${episodeId}": \`${escaped}\`,\n`;
content = content.slice(0, insertionPoint) + newEntry + content.slice(insertionPoint);

writeFileSync(transcriptsPath, content);
console.log(`Added transcript for "${episodeId}" (${cleaned.length} chars).`);
console.log("Commit and push to deploy to Vercel.");

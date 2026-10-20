// Downloads YouTube captions for the latest long-form videos and saves them to
// lib/video-transcripts.json as { [videoId]: { title, date, transcript } }, so a video page
// keeps working after the video drops out of YouTube's latest-15 feed.
// Needs yt-dlp: python3 -m pip install --user yt-dlp
// Usage: node scripts/add-video-transcripts.mjs            (only videos without a transcript)
//        node scripts/add-video-transcripts.mjs <videoId>  (one video, overwrites)
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHANNEL_ID = "UCDb-8JMynToZiQ7Z3zUgDeQ";
// UULF = the channel's long-form uploads (no Shorts, no live streams)
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=UULF${CHANNEL_ID.slice(2)}`;
const OUT = new URL("../lib/video-transcripts.json", import.meta.url);
const YT_DLP = process.env.YT_DLP ?? "yt-dlp";

// Words YouTube's auto captions regularly get wrong on this channel
const FIXES = [
  [/\b(claude|cloth|cloud|clawed|clod) code\b/gi, "Claude Code"],
  [/\bclaw?d\b(?= (code|design|ai|desktop|chat))/gi, "Claude"],
  [/\banthr?opic\b/gi, "Anthropic"],
  [/\bhiggs ?field\b/gi, "Higgsfield"],
  [/\bchat ?gpt\b/gi, "ChatGPT"],
];

function clean(text) {
  let t = text.replace(/\s+/g, " ").trim();
  for (const [pattern, replacement] of FIXES) t = t.replace(pattern, replacement);
  return t;
}

function captionText(file) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  return data.events
    .map((e) => (e.segs ?? []).map((s) => s.utf8 ?? "").join(""))
    .join(" ");
}

function fetchTranscript(id) {
  const dir = mkdtempSync(join(tmpdir(), "yt-subs-"));
  try {
    execFileSync(
      YT_DLP,
      ["--skip-download", "--write-auto-subs", "--write-subs", "--sub-langs", "en-orig,en", "--sub-format", "json3",
        "--sleep-subtitles", "5", "-o", join(dir, "%(id)s.%(ext)s"), `https://www.youtube.com/watch?v=${id}`],
      { stdio: "ignore" },
    );
  } catch {
    // yt-dlp exits non-zero when one of the two languages fails; use whatever downloaded
  }
  const files = readdirSync(dir).filter((f) => f.endsWith(".json3"));
  // prefer uploaded/original-language captions over the auto-translated track
  const pick = files.find((f) => f.includes(".en-orig.")) ?? files.find((f) => f.includes(".en."));
  const text = pick ? clean(captionText(join(dir, pick))) : "";
  rmSync(dir, { recursive: true, force: true });
  return text;
}

function decode(text) {
  return text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

const transcripts = JSON.parse(readFileSync(OUT, "utf8"));
const xml = await (await fetch(FEED_URL)).text();
const feed = Object.fromEntries(
  [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => [
    entry.match(/<yt:videoId>([^<]+)/)[1],
    { title: decode(entry.match(/<title>([^<]+)/)[1]), date: entry.match(/<published>([^<]+)/)[1] },
  ]),
);
let ids = process.argv.slice(2);
if (ids.length === 0) ids = Object.keys(feed).filter((id) => !transcripts[id]);

for (const id of ids) {
  const text = fetchTranscript(id);
  if (text) {
    transcripts[id] = { title: feed[id]?.title ?? transcripts[id]?.title ?? "", date: feed[id]?.date ?? transcripts[id]?.date ?? "", transcript: text };
    writeFileSync(OUT, JSON.stringify(transcripts, null, 2) + "\n");
    console.log(`✓ ${id} (${text.split(" ").length} words)`);
  } else {
    console.log(`✗ ${id}: no captions yet (YouTube may be rate limiting, try again later)`);
  }
  await new Promise((r) => setTimeout(r, 8000));
}

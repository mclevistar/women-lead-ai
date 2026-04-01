import { NextResponse } from "next/server";
import { parseEpisodes } from "@/lib/parse-rss";

const RSS_URL = "https://anchor.fm/s/10ef58958/podcast/rss";

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch RSS" }, { status: 502 });
    }

    const xml = await res.text();
    const episodes = parseEpisodes(xml);

    return NextResponse.json(episodes, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

import type { Metadata } from "next";
import { RSS_URL, parseEpisodes } from "@/lib/parse-rss";
import { episodes as staticEpisodes } from "@/lib/episodes";
import PodcastList from "./podcast-list";

export const metadata: Metadata = {
  title: "Podcast",
  description: "Conversations with builders, operators and visionaries shaping the AI era.",
};

async function getEpisodes() {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 900 } });
    if (res.ok) {
      const episodes = parseEpisodes(await res.text());
      if (episodes.length > 0) return episodes;
    }
  } catch {
    // fall through to static fallback
  }
  return staticEpisodes;
}

export default async function PodcastPage() {
  const episodes = await getEpisodes();

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Podcast
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Conversations with builders, operators and visionaries shaping the AI era.
        </p>
        <PodcastList episodes={episodes} />
      </div>
    </section>
  );
}

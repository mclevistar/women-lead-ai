import type { Metadata } from "next";
import { episodes as staticEpisodes } from "@/lib/episodes";
import PodcastList from "./podcast-list";

export const metadata: Metadata = {
  title: "Podcast",
  description: "Conversations with builders, operators and visionaries shaping the AI era.",
};

async function getEpisodes() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/podcast-feed`, {
      next: { revalidate: 900 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) return data;
    }
  } catch {
    // Fall through to static data
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

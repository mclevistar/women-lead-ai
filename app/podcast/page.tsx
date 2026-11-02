import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata, SITE_URL, PODCAST_ID, PERSON_ID, ORGANIZATION_ID } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import JsonLd from "@/components/json-ld";
import { getAllEpisodes } from "@/lib/get-episodes";
import PodcastList from "./podcast-list";

export const metadata: Metadata = pageMetadata({
  title: "Podcast",
  description:
    "Conversations with builders, operators and visionaries shaping the AI era.",
  path: "/podcast",
});

export default async function PodcastPage() {
  const episodes = await getAllEpisodes();

  const seriesSchema = {
    "@type": "PodcastSeries",
    "@id": PODCAST_ID,
    name: "Women Lead AI",
    url: `${SITE_URL}/podcast`,
    description:
      "The Women Lead AI podcast, hosted by Wiktoria Korbecka: conversations with women founders, operators and experts about using AI in careers and businesses.",
    image: `${SITE_URL}/images/podcast-cover.png`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
    webFeed: "https://anchor.fm/s/10ef58958/podcast/rss",
    sameAs: [EXTERNAL_LINKS.spotify, EXTERNAL_LINKS.applePodcasts, EXTERNAL_LINKS.youtube, "https://www.wikidata.org/wiki/Q141974035"],
    episode: episodes.map((ep) => ({
      "@type": "PodcastEpisode",
      name: ep.title,
      url: `${SITE_URL}/podcast/${ep.id}`,
      datePublished: ep.date || undefined,
    })),
  };

  return (
    <section className="py-24 md:py-32 px-6">
      <JsonLd data={seriesSchema} />
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Podcast
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Conversations with builders, operators and visionaries shaping the AI era, hosted by{" "}
          <Link href="/about" className="text-primary hover:underline">Wiktoria Korbecka</Link>.
        </p>
        {/* Visible platform links so directories and AI search can tie the show to this site */}
        <div className="flex flex-wrap gap-3 mb-12">
          {[
            { href: EXTERNAL_LINKS.spotify, label: "Spotify" },
            { href: EXTERNAL_LINKS.applePodcasts, label: "Apple Podcasts" },
            { href: EXTERNAL_LINKS.youtube, label: "YouTube" },
          ].map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              Listen on {p.label}
            </a>
          ))}
        </div>
        <PodcastList episodes={episodes} />
      </div>
    </section>
  );
}

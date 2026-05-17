import Link from "next/link";
import { notFound } from "next/navigation";
import { RSS_URL, parseEpisodes } from "@/lib/parse-rss";
import { episodes as staticEpisodes } from "@/lib/episodes";
import { transcripts } from "@/lib/transcripts";
import { EXTERNAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import type { Episode } from "@/lib/episodes";
import EpisodeAudio from "./episode-audio";

type Props = {
  params: Promise<{ id: string }>;
};

async function getAllEpisodes(): Promise<Episode[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 900 } });
    if (res.ok) {
      const rssEpisodes = parseEpisodes(await res.text());
      if (rssEpisodes.length > 0) {
        // Merge RSS episodes with static ones, RSS takes priority
        const rssIds = new Set(rssEpisodes.map((e) => e.id));
        const staticOnly = staticEpisodes.filter((e) => !rssIds.has(e.id));
        return [...rssEpisodes, ...staticOnly];
      }
    }
  } catch {
    // fall through to static
  }
  return staticEpisodes;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const episodes = await getAllEpisodes();
  const episode = episodes.find((ep) => ep.id === id);
  if (!episode) return { title: "Episode Not Found" };

  return {
    title: episode.title,
    description: episode.description,
    openGraph: {
      title: episode.title,
      description: episode.description,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const episodes = await getAllEpisodes();
  return episodes.map((ep) => ({ id: ep.id }));
}

export default async function EpisodePage({ params }: Props) {
  const { id } = await params;
  const episodes = await getAllEpisodes();
  const episode = episodes.find((ep) => ep.id === id);
  if (!episode) notFound();

  const transcript = transcripts[id] ?? episode.transcript ?? "";

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/podcast"
          className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
        >
          &larr; All Episodes
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            {episode.episodeNumber > 0 && (
              <>
                <span className="font-medium text-primary">EP {episode.episodeNumber}</span>
                <span>&middot;</span>
              </>
            )}
            <span>
              {new Date(episode.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            {episode.duration && (
              <>
                <span>&middot;</span>
                <span>{episode.duration}</span>
              </>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {episode.title}
          </h1>
          <p className="text-lg text-muted-foreground">with {episode.guest}</p>
          {episode.guestBio && (
            <p className="text-sm text-muted-foreground mt-2 italic">{episode.guestBio}</p>
          )}
        </div>

        {/* Topics */}
        {episode.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {episode.topics.map((topic) => (
              <span
                key={topic}
                className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Audio player */}
        {episode.audioUrl && <EpisodeAudio audioUrl={episode.audioUrl} />}

        {/* Show notes */}
        {episode.showNotes && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              Show Notes
            </h2>
            <p className="text-muted-foreground leading-relaxed">{episode.showNotes}</p>
          </div>
        )}

        {/* Key takeaways */}
        {episode.keyTakeaways.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              Key Takeaways
            </h2>
            <ol className="space-y-2">
              {episode.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-xs font-medium text-primary mt-0.5 shrink-0">
                    {i + 1}.
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Listen on */}
        <div className="mb-10">
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">Listen On</h2>
          <div className="flex gap-4">
            <a
              href={EXTERNAL_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Spotify
            </a>
            <a
              href={EXTERNAL_LINKS.applePodcasts}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Apple Podcasts
            </a>
          </div>
        </div>

        {/* Links mentioned */}
        {episode.linksMentioned.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              Links Mentioned
            </h2>
            <ul className="space-y-1">
              {episode.linksMentioned.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <details className="group border-t border-border/60 pt-8">
            <summary className="font-display text-xl font-semibold text-foreground cursor-pointer select-none list-none flex items-center justify-between">
              <span>Transcript</span>
              <span className="text-sm font-normal text-muted-foreground group-open:hidden">
                Show
              </span>
              <span className="text-sm font-normal text-muted-foreground hidden group-open:inline">
                Hide
              </span>
            </summary>
            <div className="mt-6 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {transcript}
            </div>
          </details>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { episodes as staticEpisodes } from "@/lib/episodes";
import { EXTERNAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import type { Episode } from "@/lib/episodes";
import EpisodeAudio from "./episode-audio";

type Props = {
  params: Promise<{ id: string }>;
};

function findEpisode(id: string): Episode | undefined {
  return staticEpisodes.find((ep) => ep.id === id);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const episode = findEpisode(id);
  if (!episode) return { title: "Episode Not Found" };

  return {
    title: episode.title,
    description: episode.description,
  };
}

export function generateStaticParams() {
  return staticEpisodes.map((ep) => ({ id: ep.id }));
}

export default async function EpisodePage({ params }: Props) {
  const { id } = await params;
  const episode = findEpisode(id);
  if (!episode) notFound();

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link href="/podcast" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block">
          &larr; All Episodes
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span className="font-medium text-primary">EP {episode.episodeNumber}</span>
            <span>&middot;</span>
            <span>{new Date(episode.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span>&middot;</span>
            <span>{episode.duration}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {episode.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            with {episode.guest}
          </p>
          {episode.guestBio && (
            <p className="text-sm text-muted-foreground mt-2 italic">{episode.guestBio}</p>
          )}
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-8">
          {episode.topics.map((topic) => (
            <span key={topic} className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
              {topic}
            </span>
          ))}
        </div>

        {/* Audio player */}
        {episode.audioUrl && <EpisodeAudio audioUrl={episode.audioUrl} />}

        {/* Show notes */}
        <div className="mb-10">
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">Show Notes</h2>
          <p className="text-muted-foreground leading-relaxed">{episode.showNotes}</p>
        </div>

        {/* Key takeaways */}
        {episode.keyTakeaways.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Key Takeaways</h2>
            <ol className="space-y-2">
              {episode.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-xs font-medium text-primary mt-0.5 shrink-0">{i + 1}.</span>
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
            <a href={EXTERNAL_LINKS.spotify} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
              Spotify
            </a>
            <a href={EXTERNAL_LINKS.applePodcasts} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
              Apple Podcasts
            </a>
          </div>
        </div>

        {/* Links mentioned */}
        {episode.linksMentioned.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Links Mentioned</h2>
            <ul className="space-y-1">
              {episode.linksMentioned.map((link) => (
                <li key={link.title}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Transcript */}
        {episode.transcript && (
          <details className="group">
            <summary className="font-display text-xl font-semibold text-foreground cursor-pointer select-none">
              Transcript
            </summary>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {episode.transcript}
            </p>
          </details>
        )}
      </div>
    </section>
  );
}

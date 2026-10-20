import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getAllEpisodes } from "@/lib/get-episodes";
import { transcripts } from "@/lib/transcripts";
import { youtubeVideos } from "@/lib/youtube-videos";
import videoTranscripts from "@/lib/video-transcripts.json";
import { EXTERNAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import type { Episode } from "@/lib/episodes";
import JsonLd from "@/components/json-ld";
import { pageMetadata, SITE_URL, PODCAST_ID, PERSON_ID } from "@/lib/seo";
import EpisodeAudio from "./episode-audio";
import Transcript from "@/components/transcript";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const episodes = await getAllEpisodes();
  const episode = episodes.find((ep) => ep.id === id);
  if (!episode) return { title: "Episode Not Found" };

  return pageMetadata({
    title: pageTitle(episode),
    description: episode.description,
    path: `/podcast/${episode.id}`,
    type: "article",
  });
}

const HOST = "Wiktoria Korbecka";

// "Episode title, with Guest Name" so guest names are searchable too
function pageTitle(episode: Episode): string {
  return episode.guest && episode.guest !== HOST ? `${episode.title}, with ${episode.guest}` : episode.title;
}

function episodeSchema(episode: Episode, youtubeId: string | null) {
  const url = `${SITE_URL}/podcast/${episode.id}`;
  return {
    "@type": "PodcastEpisode",
    "@id": `${url}#episode`,
    url,
    name: episode.title,
    description: episode.showNotes || episode.description,
    datePublished: episode.date || undefined,
    episodeNumber: episode.episodeNumber || undefined,
    partOfSeries: { "@id": PODCAST_ID, "@type": "PodcastSeries", name: "Women Lead AI", url: `${SITE_URL}/podcast` },
    author: { "@id": PERSON_ID },
    actor: episode.guest && episode.guest !== HOST ? [{ "@type": "Person", name: episode.guest }] : undefined,
    keywords: episode.topics.join(", ") || undefined,
    associatedMedia: episode.audioUrl ? { "@type": "MediaObject", contentUrl: episode.audioUrl } : undefined,
    video: youtubeId
      ? {
          "@type": "VideoObject",
          name: episode.title,
          description: episode.description,
          thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
          uploadDate: episode.date || undefined,
          embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
          contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
        }
      : undefined,
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
  if (!episode) {
    const renamed = episodes.find((ep) => ep.legacyId === id);
    if (renamed) permanentRedirect(`/podcast/${renamed.id}`);
    notFound();
  }

  const youtubeId = youtubeVideos[id] ?? null;
  // Fall back to the YouTube transcript when the episode has none of its own
  const videoTranscript = youtubeId
    ? (videoTranscripts as Record<string, { transcript?: string }>)[youtubeId]?.transcript
    : undefined;
  const transcript = transcripts[id] || episode.transcript || videoTranscript || "";

  return (
    <section className="py-24 md:py-32 px-6">
      <JsonLd data={episodeSchema(episode, youtubeId)} />
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

        {/* YouTube embed */}
        {youtubeId && (
          <div className="mb-8 rounded-xl overflow-hidden aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={episode.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Audio player — shown only when no YouTube video */}
        {episode.audioUrl && !youtubeId && <EpisodeAudio audioUrl={episode.audioUrl} />}

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
        {transcript && <Transcript text={transcript} />}
      </div>
    </section>
  );
}

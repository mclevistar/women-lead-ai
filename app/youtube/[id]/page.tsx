import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLatestVideos, type Video } from "@/lib/get-videos";
import { youtubeVideos } from "@/lib/youtube-videos";
import videoTranscripts from "@/lib/video-transcripts.json";
import { EXTERNAL_LINKS } from "@/lib/constants";
import JsonLd from "@/components/json-ld";
import Transcript from "@/components/transcript";
import { pageMetadata, SITE_URL, PERSON_ID } from "@/lib/seo";

type Props = {
  params: Promise<{ id: string }>;
};

type StoredVideo = { title: string; date: string; transcript: string };
const stored = videoTranscripts as Record<string, StoredVideo>;

// Videos stay findable after they drop out of YouTube's latest-15 feed, as long as we saved a transcript
async function findVideo(id: string): Promise<Video | null> {
  const fromFeed = (await getLatestVideos()).find((v) => v.id === id);
  if (fromFeed) return fromFeed;
  const saved = stored[id];
  if (!saved) return null;
  return { id, title: saved.title, date: saved.date, description: "", thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` };
}

function summary(video: Video) {
  const firstPara = video.description.split(/\n{2,}/)[0]?.trim();
  return firstPara || video.title;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = await findVideo(id);
  if (!video) return { title: "Video Not Found" };

  return pageMetadata({
    title: video.title,
    description: summary(video).slice(0, 300),
    path: `/youtube/${video.id}`,
    type: "article",
  });
}

export async function generateStaticParams() {
  const ids = new Set([...(await getLatestVideos()).map((v) => v.id), ...Object.keys(stored)]);
  return [...ids].map((id) => ({ id }));
}

// Turn bare URLs in the YouTube description into links
function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const video = await findVideo(id);
  if (!video) notFound();

  const transcript = stored[id]?.transcript ?? "";
  const podcastEpisode = Object.entries(youtubeVideos).find(([, ytId]) => ytId === id)?.[0];

  const schema = {
    "@type": "VideoObject",
    "@id": `${SITE_URL}/youtube/${id}#video`,
    name: video.title,
    description: summary(video),
    thumbnailUrl: video.thumbnail,
    uploadDate: video.date,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    contentUrl: `https://www.youtube.com/watch?v=${id}`,
    author: { "@id": PERSON_ID },
    transcript: transcript || undefined,
  };

  return (
    <section className="py-24 md:py-32 px-6">
      <JsonLd data={schema} />
      <div className="max-w-3xl mx-auto">
        <Link
          href="/youtube"
          className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
        >
          &larr; All Videos
        </Link>

        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3">
            {new Date(video.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{video.title}</h1>
        </div>

        <div className="mb-8 rounded-xl overflow-hidden aspect-video bg-secondary">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {video.description && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">About this video</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              <Linkified text={video.description} />
            </p>
          </div>
        )}

        <div className="mb-10 flex flex-wrap gap-4 text-sm">
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Watch on YouTube
          </a>
          {podcastEpisode && (
            <Link href={`/podcast/${podcastEpisode}`} className="text-primary hover:underline">
              Podcast episode page
            </Link>
          )}
          <a href={EXTERNAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Subscribe
          </a>
        </div>

        {transcript && <Transcript text={transcript} />}
      </div>
    </section>
  );
}

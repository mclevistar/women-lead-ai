import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getLatestVideos } from "@/lib/get-videos";

export const metadata: Metadata = pageMetadata({
  title: "YouTube",
  description:
    "Watch Women Lead AI on YouTube. AI education, interviews and insights, with full transcripts.",
  path: "/youtube",
});

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function YouTubePage() {
  const videos = await getLatestVideos();
  const [latest, ...rest] = videos;

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              YouTube
            </h1>
            <p className="text-lg text-muted-foreground">
              Video content on AI, leadership and the future of tech.
            </p>
          </div>
          <a
            href={EXTERNAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shrink-0"
          >
            Subscribe on YouTube
          </a>
        </div>

        {/* Latest video */}
        {latest && (
          <div className="mb-16">
            <div className="aspect-video rounded-lg overflow-hidden bg-secondary mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${latest.id}`}
                title={latest.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Latest &middot; {formatDate(latest.date)}</p>
            <Link href={`/youtube/${latest.id}`} className="group">
              <h2 className="font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {latest.title}
              </h2>
              <span className="text-sm font-medium text-primary">Read the transcript &rarr;</span>
            </Link>
          </div>
        )}

        {/* All recent long-form videos */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-16">
            {rest.map((video) => (
              <Link key={video.id} href={`/youtube/${video.id}`} className="group">
                <div className="aspect-video rounded-lg overflow-hidden bg-secondary mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{formatDate(video.date)}</p>
                <h3 className="font-display font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <a
            href={EXTERNAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all videos on YouTube &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

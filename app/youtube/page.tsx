import { EXTERNAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube",
  description: "Watch Women Lead AI on YouTube. AI education, interviews and insights.",
};

export default function YouTubePage() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
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

        {/* Featured video embed */}
        <div className="aspect-video rounded-lg overflow-hidden bg-secondary mb-12">
          <iframe
            src="https://www.youtube.com/embed?listType=user_uploads&list=WiktoriaKor"
            title="Women Lead AI - Latest Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

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

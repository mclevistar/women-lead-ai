import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Date Through the Decades: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to get ready for the same first date in 1888, 1925, 1943, 1977, 1996 and today, plus the Claude Code edits that finish the video.",
  path: "/resources/date-through-the-decades",
  ogTitle: "Date Through the Decades: the prompts | Women Lead AI",
  ogDescription:
    "Six decades, one mirror, one cancelled date. Every prompt, copy and paste ready.",
  images: ["/resources/fddecades-cover.jpg"],
});

const previews = [
  { src: "/resources/fddecades-page-mirror.jpg", name: "The same mirror in every decade" },
  { src: "/resources/fddecades-page-rituals.jpg", name: "Every ritual, word for word" },
  { src: "/resources/fddecades-page-finish.jpg", name: "The finishing touches in Claude Code" },
];

export default function DateThroughTheDecadesPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          Date Through the Decades: <em className="text-[#602D37]">the prompts</em>
        </>
      }
      intro="Every prompt I used in Higgsfield to get ready for the same first date in six decades, from a corset in 1888 to a text that cancels it today."
      form={<DownloadForm align="left" downloadUrl="/downloads/date-through-the-decades.pdf" tag="date-through-the-decades" buttonLabel="Get it free" />}
      cover={{ src: "/resources/fddecades-page-cover.jpg", alt: "Cover of Date Through the Decades: the prompts, a free resource from Women Lead AI", width: "w-52 md:w-72" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

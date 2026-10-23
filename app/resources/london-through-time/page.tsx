import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "London Through Time: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to put myself into nearly 2,000 years of London history, from Boudica riding into Londinium to New Year 2026 over the Thames.",
  path: "/resources/london-through-time",
  ogTitle: "London Through Time: the prompts | Women Lead AI",
  ogDescription:
    "Step into history as it happens in your own AI video. Every prompt, copy and paste ready.",
  images: ["/resources/london-cover.jpg"],
});

const moments = [
  { src: "/resources/london-1666.jpg", year: "1666" },
  { src: "/resources/london-1894.jpg", year: "1894" },
  { src: "/resources/london-1918.jpg", year: "1918" },
];

const inside = [
  "The eight moments I picked, AD 60 to 2026, with their real dates",
  "The character sheet prompt, plus a ready outfit line for every era",
  "The animation prompt template and the sounds for each clip",
  "My full 1918 clip prompt, word for word",
  "How to add the flipping paper calendar, and five fixes from my redos",
];

const previews = moments.map((m) => ({ src: m.src, name: m.year }));

export default function LondonThroughTimePage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          London Through Time: <em className="text-[#602D37]">the prompts</em>
        </>
      }
      intro="Every prompt I used to step into 2,000 years of London history."
      form={<DownloadForm align="left" downloadUrl="/downloads/london-through-time-prompts.pdf" tag="london-through-time" buttonLabel="Get it free" />}
      cover={{ src: "/resources/london-cover.jpg", alt: "", width: "w-52 md:w-72" }}
      previews={previews}
      aspect="aspect-[9/16]"
      compactMobile
      inside={inside}
      note="You don't need to be a filmmaker. You'll need a Higgsfield account, 2 or 3 clear photos of your face and an editor like CapCut."
      ctaTitle="Want more guides like this?"
    />
  );
}

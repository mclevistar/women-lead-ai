import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "NYC Through Time: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to put myself into 143 years of New York history, from the Brooklyn Bridge opening in 1883 to SoHo today.",
  path: "/resources/nyc-through-time",
  ogTitle: "NYC Through Time: the prompts | Women Lead AI",
  ogDescription:
    "Walk through history in your own AI video. Every prompt, copy and paste ready.",
  images: ["/resources/nyc-cover.jpg"],
});

const moments = [
  { src: "/resources/nyc-1917.jpg", year: "1917" },
  { src: "/resources/nyc-1930.jpg", year: "1930" },
  { src: "/resources/nyc-1964.jpg", year: "1964" },
];

const inside = [
  "The character sheet prompt to dress you for every decade",
  "A start frame prompt for each of the seven moments, 1883 to 2026",
  "The animation prompts, with music and sound for every clip",
  "How to add the flipping paper calendar in your editor",
  "The Higgsfield settings and what the whole video cost in credits",
];

const previews = moments.map((m) => ({ src: m.src, name: m.year }));

export default function NycThroughTimePage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          NYC Through Time: <em className="text-[#602D37]">the prompts</em>
        </>
      }
      intro="Every prompt I used to step into 143 years of New York history."
      form={<DownloadForm align="left" downloadUrl="/downloads/nyc-through-time-prompts.pdf" tag="nyc-through-time" buttonLabel="Get it free" />}
      cover={{ src: "/resources/nyc-cover.jpg", alt: "", width: "w-52 md:w-72" }}
      previews={previews}
      aspect="aspect-[9/16]"
      compactMobile
      inside={inside}
      note="You don't need to be a filmmaker. You'll need a Higgsfield account, 6 to 8 photos of yourself and an editor like CapCut."
      ctaTitle="Want more guides like this?"
    />
  );
}

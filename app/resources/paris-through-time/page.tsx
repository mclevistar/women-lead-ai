import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Paris Through Time: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to put myself into 200+ years of Paris history, from the storming of the Bastille in 1789 to the streets of Paris in October 2026.",
  path: "/resources/paris-through-time",
  ogTitle: "Paris Through Time: the prompts | Women Lead AI",
  ogDescription:
    "Step into history as it happens in your own AI video. Every prompt, copy and paste ready.",
  images: ["/resources/paris-cover.jpg"],
});

const moments = [
  { src: "/resources/paris-1789.jpg", year: "1789" },
  { src: "/resources/paris-1944.jpg", year: "1944" },
  { src: "/resources/paris-2019.jpg", year: "2019" },
];

const inside = [
  "The eight moments I picked, 1789 to 2026, with their real dates",
  "The character sheet prompt, plus a ready outfit line for every era",
  "The start frame prompt and the two-angle trick that makes you look at the moment",
  "The animation prompt template, the sounds for each clip, and my 2019 clip word for word",
  "How to add the paper calendar, and five fixes from my redos",
];

const previews = moments.map((m) => ({ src: m.src, name: m.year }));

export default function ParisThroughTimePage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          Paris Through Time: <em className="text-[#602D37]">the prompts</em>
        </>
      }
      intro="Every prompt I used to step into 200 years of Paris history."
      form={<DownloadForm align="left" downloadUrl="/downloads/paris-through-time-prompts.pdf" tag="paris-through-time" buttonLabel="Get it free" />}
      cover={{ src: "/resources/paris-cover.jpg", alt: "", width: "w-52 md:w-72" }}
      previews={previews}
      aspect="aspect-[9/16]"
      compactMobile
      inside={inside}
      note="You don't need to be a filmmaker. You'll need a Higgsfield account, 2 or 3 clear photos of your face and an editor like CapCut."
      ctaTitle="Want more guides like this?"
    />
  );
}

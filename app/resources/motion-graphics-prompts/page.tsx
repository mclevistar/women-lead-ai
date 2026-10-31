import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "5 Motion Graphics: the prompts",
  description:
    "Free prompt pack: the exact Claude Code prompts behind five motion graphics, from a papercut collage and a papercraft travel map to a self-assembling blueprint, an Apple style phone reveal and a receipt.",
  path: "/resources/motion-graphics-prompts",
  ogTitle: "5 Motion Graphics: the prompts | Women Lead AI",
  ogDescription:
    "Five motion graphics I'd steal for every video, made with Claude Code. Every prompt, copy and paste ready.",
  images: ["/resources/mgprompts-cover.jpg"],
});

const previews = [
  { src: "/resources/mgprompts-page-start.jpg", name: "The prompt to start every edit" },
  { src: "/resources/mgprompts-page-map.jpg", name: "Each effect, prompt word for word" },
  { src: "/resources/mgprompts-page-blueprint.jpg", name: "What I learned from five rounds of notes" },
];

const inside = [
  "How to set up Claude Code and the free HyperFrames plugin in two commands",
  "The one prompt that turns a talking head clip into a timed, subtitled reel",
  "The reference trick that took my effects from fine to good",
  "All five prompts: papercut collage, travel map, blueprint, Apple style reveal and receipt",
  "How to give notes like you have an editor",
];

export default function MotionGraphicsPromptsPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          5 Motion Graphics: <em className="text-[#602D37]">the prompts</em>
        </>
      }
      intro="The exact prompts behind the five motion graphics in my reel, all made with Claude Code."
      form={<DownloadForm align="left" downloadUrl="/downloads/motion-graphics-prompts.pdf" tag="motion-graphics-prompts" buttonLabel="Get it free" />}
      cover={{ src: "/resources/mgprompts-cover.jpg", alt: "", width: "w-52 md:w-72" }}
      previews={previews}
      inside={inside}
      note="You don't need to code. You'll need Claude Code and a talking head clip."
      ctaTitle="Want more guides like this?"
    />
  );
}

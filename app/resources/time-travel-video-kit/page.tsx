import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Time Travel Video Kit",
  description:
    "Free kit: the exact workflow behind my London and Paris history reels made with Higgsfield and Claude Code. Moments, character sheets, video prompts, the flipping calendar and how to save credits.",
  path: "/resources/time-travel-video-kit",
  ogTitle: "The Time Travel Video Kit | Women Lead AI",
  ogDescription:
    "Put yourself into your city's history with AI. The templates behind 200K+ views.",
  images: ["/resources/ttkit-cover.jpg"],
});

const previews = [
  { src: "/resources/ttkit-1666.jpg", name: "London 1666" },
  { src: "/resources/ttkit-1894.jpg", name: "London 1894" },
  { src: "/resources/ttkit-1889.jpg", name: "Paris 1889" },
];

const inside = [
  "How to connect Higgsfield to Claude Code and set up the project folder",
  "The moment picker: why backdrops fail, plus a worksheet for your own city",
  "The character sheet and video prompt templates I used for every era",
  "The two-angle trick so you look at the moment, not away from it",
  "The Claude Code prompt for the flipping calendar, the sound plan and a credit checklist",
];

export default function TimeTravelVideoKitPage() {
  return (
    <ResourcePage
      eyebrow="Free kit"
      title={
        <>
          The Time Travel <em className="text-[#602D37]">Video Kit</em>
        </>
      }
      intro="The workflow behind my London and Paris history reels, ready for your city."
      form={<DownloadForm align="left" downloadUrl="/downloads/time-travel-video-kit.pdf" tag="time-travel-video-kit" buttonLabel="Get it free" />}
      cover={{ src: "/resources/ttkit-cover.jpg", alt: "", width: "w-52 md:w-72" }}
      previews={previews}
      aspect="aspect-[9/16]"
      compactMobile
      inside={inside}
      note="You'll need a Higgsfield account, 2 or 3 clear photos of your face and Claude Code (or CapCut for the edit)."
      ctaTitle="Want more guides like this?"
    />
  );
}

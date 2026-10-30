import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Instagram Covers with Claude: the prompt that made my grid consistent",
  description:
    "Free prompt pack: the exact prompt I gave Claude to make the covers of my first 20 reels match, the five style rules behind a consistent grid, and the review page prompts.",
  path: "/resources/ig-covers-prompt",
  ogTitle: "Instagram Covers with Claude | Women Lead AI",
  ogDescription:
    "The prompt, the style rules and the review page behind my consistent Instagram grid, made with Claude.",
  images: ["/resources/igcovers-cover.jpg"],
});

const previews = [
  { src: "/resources/igcovers-page-prompt.jpg", name: "The prompt" },
  { src: "/resources/igcovers-page-style.jpg", name: "The style rules" },
  { src: "/resources/igcovers-page-review.jpg", name: "The review page" },
];

const inside = [
  "The exact prompt I gave Claude to redo the covers of my first 20 reels",
  "My real before and after grid, same reels in the same order",
  "The five style rules that make a grid look like one brand",
  "How to keep your face and text inside the 4:5 profile crop",
  "The review page where you just tap Approve or leave a note",
  "Follow-up prompts for the review rounds, the export and your style file",
];

export default function IgCoversPromptPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          Instagram covers <em className="text-[#602D37]">with Claude</em>
        </>
      }
      intro="The prompt I used to make all my reel covers match, so my grid looks like one brand."
      form={<DownloadForm align="left" downloadUrl="/downloads/ig-covers-prompt.pdf" tag="ig-covers-prompt" buttonLabel="Get it free" />}
      cover={{ src: "/resources/igcovers-page-cover.jpg", alt: "" }}
      previews={previews}
      inside={inside}
      note="You'll need the Claude Pro plan ($20 a month) with Claude in Chrome. Higgsfield is optional."
      ctaTitle="Want more guides like this?"
    />
  );
}

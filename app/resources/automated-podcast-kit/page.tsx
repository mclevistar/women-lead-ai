import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Automated Podcast Kit: every prompt to build a podcast with Claude and ElevenLabs",
  description:
    "Free prompt pack: every prompt and setup step I used to build Build By AI, a weekly podcast that writes, voices and publishes itself with Claude, ElevenLabs and GitHub Actions. No coding needed.",
  path: "/resources/automated-podcast-kit",
  ogTitle: "The Automated Podcast Kit | Women Lead AI",
  ogDescription:
    "Every prompt and setup step behind Build By AI, the podcast that writes, voices and publishes itself every week.",
  images: ["/resources/podcastkit-cover.jpg"],
});

const previews = [
  { src: "/resources/podcastkit-cover.jpg", name: "The kit" },
  { src: "/resources/podcastkit-page-setup.jpg", name: "The one-time setup" },
  { src: "/resources/podcastkit-page-prompts.jpg", name: "A prompt for every stage" },
  { src: "/resources/podcastkit-page-autopilot.jpg", name: "Autopilot and fixes" },
];

const inside = [
  "What you need and how Claude, ElevenLabs, GitHub and Captivate connect",
  "The setup checklist, including every GitHub secret the weekly run needs",
  "The prompt to pick your two host voices from the ElevenLabs library",
  "The planning prompt plus one prompt for each of the eight stages",
  "Cold open styles and episode memory, so it sounds like a real show",
  "The GitHub Actions schedule, the fix-it prompt and the pronunciation fix",
  "What broke for me, so it doesn't break for you",
];

export default function AutomatedPodcastKitPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          The automated <em className="text-[#602D37]">podcast</em> kit
        </>
      }
      intro="Every prompt and setup step behind Build By AI, the podcast that writes, voices and publishes itself."
      form={<DownloadForm align="left" downloadUrl="/downloads/automated-podcast-kit.pdf" tag="automated-podcast-kit" buttonLabel="Get it free" />}
      cover={{ src: previews[0].src, alt: "" }}
      previews={previews}
      inside={inside}
      note="You need a Claude account, an ElevenLabs account, a free GitHub account and a podcast host like Captivate or Buzzsprout."
      ctaTitle="Want more guides like this?"
    />
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Claude Video Editing Starter Kit: edit your YouTube videos with Claude Code",
  description:
    "Free starter kit: everything Claude installs, the exact prompts I use to edit my YouTube videos with Claude Code, a starter editing playbook and the GitHub folder structure that makes Claude remember your feedback.",
  path: "/resources/claude-video-editing",
  ogTitle: "The Claude Video Editing Starter Kit | Women Lead AI",
  ogDescription:
    "The install list, prompts, starter playbook and GitHub structure behind how I edit every YouTube video with Claude Code.",
  images: ["/resources/cvkit-cover.jpg"],
});

const previews = [
  { src: "/resources/cvkit-page-cover.jpg", name: "The starter kit" },
  { src: "/resources/cvkit-page-install.jpg", name: "What Claude installs" },
  { src: "/resources/cvkit-page-github.jpg", name: "GitHub, so Claude remembers" },
];

const inside = [
  "The five things you need, and the one prompt that installs everything else",
  "The full install list, so you know what goes onto your computer",
  "How to set up your brand folder, with my own brand rules as an example",
  "A starter YouTube edit playbook you can copy and make your own",
  "The edit prompt, the b-roll prompt and the review page prompt",
  "The GitHub prompt and folder structure, so Claude remembers every note",
  "The 5 best practices that saved me the most rounds of feedback",
];

export default function ClaudeVideoEditingPage() {
  return (
    <ResourcePage
      eyebrow="Free starter kit"
      title={
        <>
          The Claude video <em className="text-[#602D37]">editing kit</em>
        </>
      }
      intro="Everything I use to have Claude Code edit my YouTube videos while I just leave notes."
      form={<DownloadForm align="left" downloadUrl="/downloads/claude-video-editing-starter-kit.pdf" tag="claude-video-editing" buttonLabel="Get it free" />}
      cover={{ src: previews[0].src, alt: "" }}
      previews={previews}
      inside={inside}
      note="You'll need the Claude Pro plan ($20 a month) with Claude Code. DaVinci Resolve is optional."
      ctaTitle="Want more guides like this?"
    />
  );
}

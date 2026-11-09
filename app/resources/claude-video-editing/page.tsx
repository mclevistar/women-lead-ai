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
      cover={{ src: previews[0].src, alt: "Cover of The Claude Video Editing Starter Kit: edit your YouTube videos with Claude Code, a free resource from Women Lead AI" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

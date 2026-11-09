import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Claude Code cheat sheet: the other 90% of Claude, in plain English",
  description:
    "Free cheat sheet: connectors, MCP, API keys, skills, plugins, slash commands, projects, artifacts and routines explained in plain English, where each one lives in the Claude desktop app, and every prompt from my Claude Code basics video.",
  path: "/resources/claude-code-cheat-sheet",
  ogTitle: "The Claude Code cheat sheet | Women Lead AI",
  ogDescription:
    "The 9 Claude features most people never touch, where they live in the app, and the prompts to try each one today.",
  images: ["/resources/cheatsheet-cover.jpg"],
});

const previews = [
  { src: "/resources/cheatsheet-page-cover.jpg", name: "The cheat sheet" },
  { src: "/resources/cheatsheet-page-connectors.jpg", name: "Connectors, MCP and API keys" },
  { src: "/resources/cheatsheet-page-commands.jpg", name: "Skills, plugins and slash commands" },
];

export default function ClaudeCodeCheatSheetPage() {
  return (
    <ResourcePage
      eyebrow="Free cheat sheet"
      title={
        <>
          The Claude Code <em className="text-[#602D37]">cheat sheet</em>
        </>
      }
      intro="Every Claude Code feature in plain English, with prompts to try today."
      form={<DownloadForm align="left" downloadUrl="/downloads/claude-code-cheat-sheet.pdf" tag="claude-code-cheat-sheet" buttonLabel="Get it free" />}
      cover={{ src: previews[0].src, alt: "Cover of The Claude Code cheat sheet: the other 90% of Claude, in plain English, a free resource from Women Lead AI" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

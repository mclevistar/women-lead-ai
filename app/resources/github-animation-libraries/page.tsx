import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "10 free GitHub libraries for animating with Claude Code",
  description:
    "The open source tools behind my reel where every frame was drawn by Claude Code: what each library does, what I made with it, and the prompt to paste.",
  path: "/resources/github-animation-libraries",
  ogTitle: "10 free GitHub libraries for animating with Claude Code | Women Lead AI",
  ogDescription: "No video model, no After Effects. The 10 libraries I used and the prompts to paste into Claude Code.",
  images: ["/resources/animlibs-cover.jpg"],
});

const previews = [
  { src: "/resources/animlibs-page-how.jpg", name: "How to use any library with Claude Code" },
  { src: "/resources/animlibs-page-brush.jpg", name: "What I made with each one" },
  { src: "/resources/animlibs-page-finish.jpg", name: "A prompt to paste for every library" },
];

export default function GithubAnimationLibrariesPage() {
  return (
    <ResourcePage
      eyebrow="Free guide"
      title={
        <>
          10 free GitHub libraries for <em className="text-[#602D37]">animating</em> with Claude Code
        </>
      }
      intro="The tools behind my reel where every frame was drawn by Claude Code."
      form={<DownloadForm align="left" downloadUrl="/downloads/github-animation-libraries.pdf" tag="github-animation-libraries" buttonLabel="Get it free" />}
      cover={{ src: "/resources/animlibs-cover.jpg", alt: "Cover of 10 free GitHub libraries for animating with Claude Code, a free resource from Women Lead AI", width: "w-52 md:w-72" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

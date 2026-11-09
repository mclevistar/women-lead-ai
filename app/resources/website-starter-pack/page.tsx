import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Website Starter Pack: build your business website with Claude Code",
  description:
    "Free starter pack: the 10 tips from my video, every Claude Code prompt to plan, design, build and launch your business website, a CLAUDE.md template and the launch checklist I use before going live.",
  path: "/resources/website-starter-pack",
  ogTitle: "The Website Starter Pack | Women Lead AI",
  ogDescription:
    "Every prompt and the launch checklist for building a business website with Claude Code, without writing code yourself.",
  images: ["/resources/starter-cover.jpg"],
});

const previews = [
  { src: "/resources/starter-page-cover.jpg", name: "The starter pack" },
  { src: "/resources/starter-page-prompts.jpg", name: "Every prompt from the video" },
  { src: "/resources/starter-page-checklist.jpg", name: "The launch checklist" },
];

export default function WebsiteStarterPackPage() {
  return (
    <ResourcePage
      eyebrow="Free starter pack"
      title={
        <>
          Build your website <em className="text-[#602D37]">with Claude Code</em>
        </>
      }
      intro="Everything I used to build womenlead.ai with Claude Code, in one pack."
      form={<DownloadForm align="left" downloadUrl="/downloads/website-starter-pack.pdf" tag="website-starter-pack" buttonLabel="Get it free" />}
      cover={{ src: previews[0].src, alt: "Cover of The Website Starter Pack: build your business website with Claude Code, a free resource from Women Lead AI" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

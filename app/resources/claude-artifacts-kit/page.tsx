import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Claude Artifacts Kit: 5 apps that run my business, and every prompt to build them",
  description:
    "Free kit: the exact prompts behind my review page, custom CRM, quote builder, content dashboard and ROI calculator, built as Claude artifacts with no code, plus how to put any of them on your own website.",
  path: "/resources/claude-artifacts-kit",
  ogTitle: "The Claude Artifacts Kit | Women Lead AI",
  ogDescription:
    "5 apps that replace up to $300 a month of subscriptions, built in Claude for $20 a month. Every prompt, step by step.",
  images: ["/resources/artifactskit-cover.jpg"],
});

const previews = [
  { src: "/resources/artifactskit-page-cover.jpg", name: "The kit" },
  { src: "/resources/artifactskit-page-crm.jpg", name: "Review page and custom CRM" },
  { src: "/resources/artifactskit-page-website.jpg", name: "Put it on your own website" },
];

export default function ClaudeArtifactsKitPage() {
  return (
    <ResourcePage
      eyebrow="Free kit"
      title={
        <>
          The Claude <em className="text-[#602D37]">artifacts kit</em>
        </>
      }
      intro="5 apps that run my business, every prompt to build them, and how to put them on your own website."
      form={<DownloadForm align="left" downloadUrl="/downloads/claude-artifacts-kit.pdf" tag="claude-artifacts-kit" buttonLabel="Get it free" />}
      cover={{ src: previews[0].src, alt: "Cover of The Claude Artifacts Kit: 5 apps that run my business, for a $20 Claude subscription and no code, a free resource from Women Lead AI" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

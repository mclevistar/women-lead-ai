import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Lead Magnet Funnel Kit: build it with Claude Code",
  description:
    "Free kit: the system behind every free download on womenlead.ai, the page, email form, database, tracking and Instagram DMs, built with Claude Code on free plans, with every prompt to copy.",
  path: "/resources/lead-magnet-funnel-kit",
  ogTitle: "The Lead Magnet Funnel Kit | Women Lead AI",
  ogDescription:
    "Build your own lead magnet funnel with Claude Code, Supabase and Vercel, step by step, with every prompt.",
  images: ["/resources/funnelkit-cover.jpg"],
});

const previews = [
  { src: "/resources/funnelkit-page-brand.jpg", name: "Your brand folder" },
  { src: "/resources/funnelkit-page-template.jpg", name: "One page template" },
  { src: "/resources/funnelkit-page-command.jpg", name: "One command" },
];

export default function LeadMagnetFunnelKitPage() {
  return (
    <ResourcePage
      eyebrow="Free kit"
      title={
        <>
          The lead magnet <em className="text-[#602D37]">funnel</em> kit
        </>
      }
      intro="The system behind every free download on this site, built with Claude Code on free plans. Ten steps, every prompt to copy."
      form={<DownloadForm align="left" downloadUrl="/downloads/lead-magnet-funnel-kit.pdf" tag="lead-magnet-funnel-kit" buttonLabel="Get it free" />}
      cover={{ src: "/resources/funnelkit-page-cover.jpg", alt: "Cover of The Lead Magnet Funnel Kit, a free resource from Women Lead AI" }}
      previews={previews}
      note="You'll need Claude on a paid plan for Claude Code. GitHub, Vercel, Supabase and ManyChat all have free plans to start."
      ctaTitle="Want more guides like this?"
    />
  );
}

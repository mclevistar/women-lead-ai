import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The AEO audit kit: get AI to recommend your website",
  description:
    "Free audit kit: the 20 question AEO audit I ran on my own website, a template to log it, and every Claude Code prompt from my video for robots.txt, sitemaps, schema and pages AI can quote.",
  path: "/resources/aeo-audit-kit",
  ogTitle: "The AEO Audit Kit | Women Lead AI",
  ogDescription:
    "Find out if ChatGPT, Claude, Perplexity and Gemini recommend your website, then fix it with copy and paste Claude Code prompts.",
  images: ["/resources/aeo-cover.jpg"],
});

const previews = [
  { src: "/resources/aeo-page-cover.jpg", name: "The audit kit" },
  { src: "/resources/aeo-page-sheet.jpg", name: "The 20 question audit sheet" },
  { src: "/resources/aeo-page-prompts.jpg", name: "Every Claude Code prompt" },
];

export default function AeoAuditKitPage() {
  return (
    <ResourcePage
      eyebrow="Free audit kit"
      title={
        <>
          Get AI to recommend <em className="text-[#602D37]">your website</em>
        </>
      }
      intro="The audit that took my site from 5 to 43 AI recommendations in two weeks."
      form={<DownloadForm align="left" downloadUrl="/downloads/aeo-audit-kit.pdf" tag="aeo-audit-kit" buttonLabel="Get it free" extra={{ url: "/downloads/aeo-audit-template.xlsx", label: "Download the audit spreadsheet" }} />}
      cover={{ src: previews[0].src, alt: "Cover of The AEO audit kit: get AI to recommend your website, a free resource from Women Lead AI" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

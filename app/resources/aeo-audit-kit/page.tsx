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

const inside = [
  "The prompt that writes the 20 questions your audience actually asks AI",
  "How to run the audit across ChatGPT, Claude, Perplexity and Gemini so the results are honest",
  "A printable audit sheet, plus a spreadsheet that adds up your AEO score out of 80",
  "Every Claude Code prompt from the video: the SEO and AEO audit, robots.txt and sitemap fixes, schema markup, summaries and Q&A",
  "How to find the pages AI reads, and a pitch prompt for getting onto \"best of\" lists",
  "Where to measure it every month, and what not to do",
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
      cover={{ src: previews[0].src, alt: "" }}
      previews={previews}
      inside={inside}
      note="You'll need Claude for the questions and Claude Code for the website fixes. On Webflow, Squarespace or WordPress the steps are the same, you'll just click through settings instead."
      ctaTitle="Want more guides like this?"
    />
  );
}

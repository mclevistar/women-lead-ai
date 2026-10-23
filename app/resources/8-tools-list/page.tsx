import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "8 tools that aren't AI (but will grow your sales): the free list",
  description:
    "Free list: the 8 basic marketing and sales tools most founders skip, from email tracking and heatmaps to ad libraries, Search Console and UTM links. Every link, how I set each one up, and how I use the data with Claude afterwards.",
  path: "/resources/8-tools-list",
  ogTitle: "8 Tools That Aren't AI | Women Lead AI",
  ogDescription:
    "The basic marketing and sales tools most founders skip, with every link and my setup notes. Most of them are free.",
  images: ["/resources/8tools-cover.jpg"],
});

const previews = [
  { src: "/resources/8tools-page-cover.jpg", name: "The list" },
  { src: "/resources/8tools-page-tools.jpg", name: "Every tool, with setup notes" },
  { src: "/resources/8tools-page-ai.jpg", name: "Then bring in AI" },
];

const inside = [
  "HubSpot email tracking: see the moment someone opens your proposal",
  "Microsoft Clarity: heatmaps and recordings of real visitors on your website",
  "Meta and LinkedIn ad libraries: every ad your competitors are running right now",
  "AnswerThePublic: the real questions people type into Google about your topic",
  "Google Search Console: the exact searches that bring people to your site",
  "LinkedIn Smart Links: see who opened your deck and which pages they read",
  "PageSpeed Insights: how fast your site loads on a phone, and what's slowing it down",
  "UTM links: which post, email or channel actually brought you a customer",
];

export default function EightToolsListPage() {
  return (
    <ResourcePage
      eyebrow="Free tool list"
      title={
        <>
          8 tools that <em className="text-[#602D37]">aren&apos;t AI</em>
        </>
      }
      intro="The basic sales tools most founders skip, with every link and how I set them up."
      form={<DownloadForm align="left" downloadUrl="/downloads/8-tools-list.pdf" tag="8-tools-list" buttonLabel="Get it free" />}
      cover={{ src: previews[0].src, alt: "" }}
      previews={previews}
      inside={inside}
      note="Seven of the eight are free. LinkedIn Smart Links needs a paid Sales Navigator plan."
      ctaTitle="Want more guides like this?"
    />
  );
}

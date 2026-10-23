import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Startup perks tracker: free credits for new founders",
  description:
    "Free tracker: every startup perk from my video in one place, from AWS and Notion to Stripe Atlas and Datadog. What you get, who can apply, the link to apply and a box to tick when you have.",
  path: "/resources/startup-perks",
  ogTitle: "Startup Perks Tracker | Women Lead AI",
  ogDescription:
    "Every startup perk from my video: the offer, who can apply and the application link, split into three lists. Tick them off as you go.",
  images: ["/resources/perks-cover.jpg"],
});

const previews = [
  { src: "/resources/perks-page-cover.jpg", name: "The tracker" },
  { src: "/resources/perks-page-list1.jpg", name: "List 1: anyone can apply" },
  { src: "/resources/perks-page-list2.jpg", name: "List 2: via your bank" },
];

const inside = [
  "All 29 perks from the video, from AWS Activate and Notion to Stripe Atlas and Datadog",
  "What each one offers today, checked on the programme page",
  "Who can apply, and the direct link to the application page",
  "A box to tick when you've applied, plus a spreadsheet version to track your status",
  "How to stack them so the perks get bigger as your startup grows",
];

export default function StartupPerksPage() {
  return (
    <ResourcePage
      eyebrow="Free tracker"
      title={
        <>
          Startup perks tracker <em className="text-[#602D37]">stop paying full price</em>
        </>
      }
      intro="Every perk from my video, who can apply and where. Tick them off as you go."
      form={<DownloadForm align="left" downloadUrl="/downloads/startup-perks-tracker.pdf" tag="startup-perks" buttonLabel="Get it free" extra={{ url: "/downloads/startup-perks-tracker.xlsx", label: "Download the spreadsheet" }} />}
      cover={{ src: previews[0].src, alt: "" }}
      previews={previews}
      inside={inside}
      ctaTitle="Want to build smarter with AI?"
    />
  );
}

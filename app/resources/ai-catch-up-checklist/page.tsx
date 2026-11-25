import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Catch Up on AI in 30 Days: Free Checklist",
  description:
    "Free checklist: score yourself on the 7 signs you're falling behind on AI, then follow nine small steps over four weeks, with the exact tools, where to click and the prompts to copy.",
  path: "/resources/ai-catch-up-checklist",
  ogTitle: "Catch Up on AI in 30 Days | Women Lead AI",
  ogDescription:
    "Score yourself out of 7, then nine small steps over four weeks to go from using AI now and then to having it work for you.",
  images: ["/resources/catchup-cover.jpg"],
});

const previews = [
  { src: "/resources/catchup-page-score.jpg", name: "What's your score?" },
  { src: "/resources/catchup-page-plan.jpg", name: "Nine steps, four weeks" },
  { src: "/resources/catchup-page-week1.jpg", name: "Week by week, with prompts" },
  { src: "/resources/catchup-page-day30.jpg", name: "Score again on day 30" },
];

export default function AiCatchUpChecklistPage() {
  return (
    <ResourcePage
      eyebrow="Free checklist"
      title={
        <>
          Catch up on AI <em className="text-[#602D37]">in 30 days</em>
        </>
      }
      intro="Score yourself on the 7 signs you're falling behind, then follow nine small steps over four weeks: the exact tools, where to click and the prompts to copy, from using AI now and then to having it work for you."
      form={<DownloadForm align="left" downloadUrl="/downloads/ai-catch-up-checklist.pdf" tag="ai-catch-up-checklist" buttonLabel="Get it free" />}
      cover={{ src: "/resources/catchup-page-cover.jpg", alt: "Cover of Catch Up on AI in 30 Days, a free checklist from Women Lead AI" }}
      previews={previews}
      note="Each step takes 10 to 30 minutes. Tools and settings change often, so where a menu has moved, look for the same option nearby."
      ctaTitle="Want more checklists like this?"
    />
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Get Quoted for Free: The AI PR Agent Kit",
  description:
    "Free kit: the AI PR agent that got me quoted in the press in two weeks without a cold pitch. Where journalists ask for experts, the exact prompt, the reply that gets picked and what to do once you're published.",
  path: "/resources/pr-agent-kit",
  ogTitle: "Get Quoted for Free | Women Lead AI",
  ogDescription:
    "Set up an AI PR agent that finds journalist requests and drafts your answers, with the prompt, a press profile template and the reply that gets picked.",
  images: ["/resources/prkit-cover.jpg"],
});

const previews = [
  { src: "/resources/prkit-page-where.jpg", name: "Where journalists ask" },
  { src: "/resources/prkit-page-prompt.jpg", name: "The PR agent prompt" },
  { src: "/resources/prkit-page-profile.jpg", name: "Your press profile" },
  { src: "/resources/prkit-page-reply.jpg", name: "The reply that gets picked" },
];

export default function PrAgentKitPage() {
  return (
    <ResourcePage
      eyebrow="Free kit"
      title={
        <>
          Get quoted <em className="text-[#602D37]">for free</em>
        </>
      }
      intro="The AI PR agent that checks journalist requests four times a day, picks the ones that fit me and drafts my answer in my voice. Two weeks in, it got me quoted in TechRound. Here's the exact setup."
      form={<DownloadForm align="left" downloadUrl="/downloads/pr-agent-kit.pdf" tag="pr-agent-kit" buttonLabel="Get it free" />}
      cover={{ src: "/resources/prkit-page-cover.jpg", alt: "Cover of Get Quoted for Free, a free AI PR agent kit from Women Lead AI" }}
      previews={previews}
      note="The prompt has an approval step built in, so your agent drafts and you decide. Platforms and their plans change, so check each one before you sign up."
      ctaTitle="Want more kits like this?"
    />
  );
}

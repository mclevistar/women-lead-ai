import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Copy My AI Team: Grok Bot Agents and Prompts",
  description:
    "Free kit: the Grok Bot agents I use to run my business, four more worth hiring, copy-paste prompts for each one and ten rules that keep them from doing anything you didn't approve.",
  path: "/resources/grok-bot-agents",
  ogTitle: "Copy My AI Team | Women Lead AI",
  ogDescription:
    "11 AI agents you can set up in Grok Bot, with the exact prompts, the best practices and a brief template for your own.",
  images: ["/resources/grokteam-cover.jpg"],
});

const previews = [
  { src: "/resources/grokteam-page-glance.jpg", name: "11 jobs at a glance" },
  { src: "/resources/grokteam-page-prompts.jpg", name: "Copy-paste prompts" },
  { src: "/resources/grokteam-page-rules.jpg", name: "Ten rules" },
  { src: "/resources/grokteam-page-brief.jpg", name: "Your agent brief" },
];

export default function GrokBotAgentsPage() {
  return (
    <ResourcePage
      eyebrow="Free kit"
      title={
        <>
          Copy my <em className="text-[#602D37]">AI team</em>
        </>
      }
      intro="The Grok Bot agents that find me press, sort my inbox, catch fake brand deals and chase invoices, plus four more worth hiring, with the exact prompt to set up each one."
      form={<DownloadForm align="left" downloadUrl="/downloads/grok-bot-agents.pdf" tag="grok-bot-agents" buttonLabel="Get it free" />}
      cover={{ src: "/resources/grokteam-page-cover.jpg", alt: "Cover of Copy My AI Team, a free Grok Bot agents kit from Women Lead AI" }}
      previews={previews}
      note="Every prompt has an approval step built in, so your agents draft and you decide. What each agent can do depends on your accounts and Grok Bot's current features."
      ctaTitle="Want more kits like this?"
    />
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Ask For More: the Claude skill that negotiates for you",
  description:
    "A free Claude skill for people who hate negotiating. Get the number, the exact words and a rehearsal for pricing projects, brand deals, raising rates and answering \"that's over our budget\".",
  path: "/resources/ask-for-more",
  ogTitle: "Ask For More | Women Lead AI",
  ogDescription:
    "A free Claude skill that helps you price, counter and rehearse money conversations.",
});

const uses = [
  "Price a new client project",
  "Reply to a brand offer, including usage rights and exclusivity",
  "Raise your rates with existing clients",
  "Answer \"that's over our budget\" without discounting",
  "Counter a low, gifted or \"exposure\" offer",
  "Rehearse a money conversation before it happens",
];

const steps = [
  "Download the ZIP. Don't unzip it.",
  "In Claude, open Settings, then Capabilities, and turn on Code execution.",
  "Go to Customize, then Skills. Click +, choose Create skill, then Upload a skill, and pick the ZIP.",
  "Start a new chat and say \"help me negotiate\", or paste a client or brand email that mentions money.",
];

export default function AskForMorePage() {
  return (
    <ResourcePage
      eyebrow="Free Claude skill"
      title={
        <>
          Ask for more, <em className="text-[#602D37]">without the awkwardness</em>
        </>
      }
      intro="A Claude skill that helps you price, counter and rehearse money conversations."
      form={<DownloadForm align="left" downloadUrl="/downloads/ask-for-more-skill.zip" tag="ask-for-more" buttonLabel="Get it free" />}
      insideTitle="What it helps you do"
      steps={{ title: "Set it up in 2 minutes", items: steps }}
      inside={uses}
      note="It never sends anything for you. You always read the message and send it yourself."
      ctaTitle="Want more skills like this?"
    />
  );
}

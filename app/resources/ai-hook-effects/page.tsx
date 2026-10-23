import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "3 AI hook effects that stop the scroll: every prompt",
  description:
    "Free prompt guide: every prompt I used in Higgsfield to make an Instagram post pour out cotton candy, my inbox fold into paper planes and strawberries melt out of my phone.",
  path: "/resources/ai-hook-effects",
  ogTitle: "3 AI Hook Effects | Women Lead AI",
  ogDescription:
    "Every prompt behind the pop out, paper plane and melt effects. Copy, paste, swap in your details.",
  images: ["/resources/hook-end_candy.jpg"],
});

const effects = [
  { src: "/resources/hook-end_candy.jpg", name: "The pop out" },
  { src: "/resources/hook-end_planes.jpg", name: "The paper plane" },
  { src: "/resources/hook-end_jam.jpg", name: "The melt" },
];

const inside = [
  "The character sheet prompt that keeps your face and outfit the same in every clip",
  "How to get readable words on screen (image models can spell, video models can move)",
  "The start frame prompt for each effect",
  "The Seedance 2.5 animation prompt for each effect",
  "The exact Higgsfield settings and what each clip cost me",
];

const previews = effects;

export default function AiHookEffectsPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt guide"
      title={
        <>
          3 AI hook effects <em className="text-[#602D37]">that stop the scroll</em>
        </>
      }
      intro="Every prompt behind my scroll stopping AI hooks. Copy, paste, make it yours."
      form={<DownloadForm align="left" downloadUrl="/downloads/3-ai-hook-effects-prompts.pdf" tag="ai-hook-effects" buttonLabel="Get it free" />}
      cover={{ src: "/resources/hook-end_candy.jpg", alt: "", width: "w-52 md:w-72" }}
      previews={previews}
      aspect="aspect-[9/16]"
      compactMobile
      inside={inside}
      note="You'll need a Higgsfield account, 6 to 10 photos of yourself and an editor like CapCut."
      ctaTitle="Want more guides like this?"
    />
  );
}

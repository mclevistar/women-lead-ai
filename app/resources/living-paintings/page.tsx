import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Living Paintings: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to put myself inside four surreal paintings that come to life, from a porcelain octopus at sea to a swing hanging from Saturn.",
  path: "/resources/living-paintings",
  ogTitle: "Living Paintings: the prompts | Women Lead AI",
  ogDescription:
    "Step inside a surreal painting that breathes. Every prompt, copy and paste ready.",
  images: ["/resources/livingpaint-cover.jpg"],
});

const previews = [
  { src: "/resources/livingpaint-page-sheet.jpg", name: "One character sheet per look" },
  { src: "/resources/livingpaint-page-scenes.jpg", name: "My painting prompts, word for word" },
  { src: "/resources/livingpaint-page-moving.jpg", name: "The Seedance prompts that bring them to life" },
];

const inside = [
  "The character sheet prompt and my four outfit lines, ready to paste",
  "The painting formula and all four scene prompts: octopus, Saturn swing, moon and zodiac",
  "The exact Seedance 2.5 settings, plus the animation template",
  "The moving parts for each painting, word for word",
  "Five fixes from my redos, from closed eyes to failed jobs, and more worlds to try",
];

export default function LivingPaintingsPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          Living Paintings: <em className="text-[#602D37]">the prompts</em>
        </>
      }
      intro="Every prompt I used to step inside four surreal paintings that come to life."
      form={<DownloadForm align="left" downloadUrl="/downloads/living-paintings-prompts.pdf" tag="living-paintings" buttonLabel="Get it free" />}
      cover={{ src: "/resources/livingpaint-cover.jpg", alt: "", width: "w-52 md:w-72" }}
      previews={previews}
      inside={inside}
      note="You don't need to be an artist. You'll need a Higgsfield account and a character sheet of your face."
      ctaTitle="Want more guides like this?"
    />
  );
}

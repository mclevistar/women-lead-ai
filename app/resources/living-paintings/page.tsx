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
      cover={{ src: "/resources/livingpaint-cover.jpg", alt: "Cover of Living Paintings: the prompts, a free resource from Women Lead AI", width: "w-52 md:w-72" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

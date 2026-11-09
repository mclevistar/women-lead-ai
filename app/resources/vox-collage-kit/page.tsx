import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Vox Collage Kit",
  description:
    "Free prompt and setup guide: the exact prompt I gave Claude Code to turn a talking-head video into a Vox-style paper collage reel, with no editing app.",
  path: "/resources/vox-collage-kit",
  ogTitle: "The Vox Collage Kit | Women Lead AI",
  ogDescription:
    "Vox-style collage animation from one prompt. The exact prompt plus the five minute setup.",
  images: ["/resources/voxkit-cover.jpg"],
});

const previews = [
  { src: "/resources/voxkit-page-prompt.jpg", name: "The one prompt I used, word for word" },
  { src: "/resources/voxkit-page-reference.jpg", name: "How to make it study your reference first" },
  { src: "/resources/voxkit-page-recipe.jpg", name: "The collage recipe: colours, textures, type, motion" },
];

export default function VoxCollageKitPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt and setup guide"
      title={
        <>
          The Vox <em className="text-[#602D37]">Collage</em> Kit
        </>
      }
      intro="The exact prompt I gave Claude Code to turn a talking-head video into a Vox-style collage reel."
      form={<DownloadForm align="left" downloadUrl="/downloads/vox-collage-kit.pdf" tag="vox-collage-kit" buttonLabel="Get it free" />}
      cover={{ src: "/resources/voxkit-cover.jpg", alt: "Cover of The Vox Collage Kit, a free resource from Women Lead AI", width: "w-52 md:w-72" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

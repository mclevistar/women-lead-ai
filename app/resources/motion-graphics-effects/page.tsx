import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "10 motion graphics effects with Claude Code: every prompt",
  description:
    "Free prompt guide: every prompt behind the 10 motion graphics effects in my video, from newspaper highlights and a 3D globe to text behind you and a 3D phone mockup, all made with only Claude Code.",
  path: "/resources/motion-graphics-effects",
  ogTitle: "10 Motion Graphics Effects | Women Lead AI",
  ogDescription:
    "Every prompt behind the newspaper highlight, globe and map zoom, text behind you, chat and 3D phone effects. Copy, paste, swap in your details.",
  images: ["/resources/motion-behind.jpg"],
});

const effects = [
  { src: "/resources/motion-map.jpg", name: "The map zoom" },
  { src: "/resources/motion-behind.jpg", name: "Text behind you" },
  { src: "/resources/motion-phone.jpg", name: "The 3D phone" },
];

const previews = effects;

export default function MotionGraphicsEffectsPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt guide"
      title={
        <>
          10 motion graphics effects <em className="text-[#602D37]">made with only Claude Code</em>
        </>
      }
      intro="Every prompt behind the effects in my video. No After Effects needed."
      form={<DownloadForm align="left" downloadUrl="/downloads/10-motion-graphics-effects-prompts.pdf" tag="motion-graphics-effects" buttonLabel="Get it free" />}
      cover={{ src: "/resources/motion-map.jpg", alt: "Cover of 10 motion graphics effects with Claude Code: every prompt, a free resource from Women Lead AI", width: "w-full max-w-lg" }}
      previews={previews}
      aspect="aspect-video"
      ctaTitle="Want more guides like this?"
    />
  );
}

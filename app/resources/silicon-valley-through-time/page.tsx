import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Silicon Valley Through Time: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield and Claude Code to live through 60 years of the Bay Area in one AI video, from the Summer of Love to a robotaxi with nobody driving.",
  path: "/resources/silicon-valley-through-time",
  ogTitle: "Silicon Valley Through Time: the prompts | Women Lead AI",
  ogDescription:
    "1967 to 2026 in 30 seconds. Real-looking frames, screens you can read and brand names fixed in code. Every prompt, copy and paste ready.",
  images: ["/resources/svtime-cover.jpg"],
});

const previews = [
  { src: "/resources/svtime-page-frames.jpg", name: "First frames that look real" },
  { src: "/resources/svtime-page-screens.jpg", name: "Screens you can actually read" },
  { src: "/resources/svtime-page-angles.jpg", name: "Two angles for every screen" },
];

export default function SiliconValleyThroughTimePage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          Silicon Valley Through Time: <em className="text-[#602D37]">the prompts</em>
        </>
      }
      intro="Every prompt I used to live through 60 years of the Bay Area in one AI video: the Summer of Love, the first Amazon order, Snake on a Nokia, the Facebook poke, the first Tinder match and a robotaxi with nobody driving."
      form={<DownloadForm align="left" downloadUrl="/downloads/silicon-valley-through-time.pdf" tag="silicon-valley-through-time" buttonLabel="Get it free" />}
      cover={{ src: "/resources/svtime-page-cover.jpg", alt: "Cover of Silicon Valley Through Time: the prompts, a free resource from Women Lead AI", width: "w-52 md:w-72" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

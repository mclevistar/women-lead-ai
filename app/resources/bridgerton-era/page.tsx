import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "A Day in the Bridgerton Era: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to spend one day as a debutante in London, April 1813, from being laced into my stays to the Queen's verdict and the first waltz.",
  path: "/resources/bridgerton-era",
  ogTitle: "A Day in the Bridgerton Era: the prompts | Women Lead AI",
  ogDescription:
    "Put yourself into Regency London in your own AI video. Every prompt, copy and paste ready.",
  images: ["/resources/bridgerton-cover.jpg"],
});

const moments = [
  { src: "/resources/bridgerton-queen.jpg", name: "2 pm, the Queen" },
  { src: "/resources/bridgerton-waltz.jpg", name: "11 pm, the waltz" },
  { src: "/resources/bridgerton-morning.jpg", name: "9 am, the morning after" },
];

const inside = [
  "How I planned one day as six moments, with what happens on camera in each",
  "The plain character sheet, the outfit sheet prompt and my four Regency outfit lines",
  "The first frame prompt, plus how to get a varied, mixed crowd and the Queen's look",
  "The animation prompt, the reference order, and my Queen scene word for word",
  "What went wrong and the fixes: blocked faces, the copyright filter and timing the line",
  "The edit: the flipping calendar, intro title, subtitle and music ideas",
];

export default function BridgertonEraPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          A Day in the Bridgerton Era: <em className="text-[#602D37]">the prompts</em>
        </>
      }
      intro="Every prompt I used to spend one day as a debutante in London, 1813."
      form={<DownloadForm align="left" downloadUrl="/downloads/bridgerton-era-prompts.pdf" tag="bridgerton-era" buttonLabel="Get it free" />}
      cover={{ src: "/resources/bridgerton-cover.jpg", alt: "", width: "w-52 md:w-72" }}
      previews={moments}
      aspect="aspect-[9/16]"
      compactMobile
      inside={inside}
      note="You don't need to be a filmmaker. You'll need a Higgsfield account, a few clear photos of your face and an editor like CapCut."
      ctaTitle="Want more guides like this?"
    />
  );
}

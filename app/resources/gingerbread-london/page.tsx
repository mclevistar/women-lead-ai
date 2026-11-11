import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "Gingerbread London: 5 AI video models, one prompt",
  description:
    "Free prompt pack: every prompt and lesson from my test of Veo 3.1, Kling 4.0, MiniMax H3, Wan 3.0 and Seedance 2.5, where each model got the same photo of me and the same prompt to turn grey London into gingerbread.",
  path: "/resources/gingerbread-london",
  ogTitle: "Gingerbread London: 5 AI video models, one prompt | Women Lead AI",
  ogDescription:
    "Which AI video model keeps your face? The exact prompts, the character sheet, the start frame and my ranking from Veo to Seedance.",
  images: ["/resources/gbldn-cover.jpg"],
});

const previews = [
  { src: "/resources/gbldn-page-first-frame.jpg", name: "Make the first frame as an image" },
  { src: "/resources/gbldn-page-prompt.jpg", name: "The prompt, word for word" },
  { src: "/resources/gbldn-page-winner.jpg", name: "Seedance 2.5, the winner" },
];

export default function GingerbreadLondonPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          Gingerbread London: <em className="text-[#602D37]">5 AI video models</em>, one prompt
        </>
      }
      intro="Every prompt, frame and lesson from my test of Veo 3.1, Kling 4.0, MiniMax H3, Wan 3.0 and Seedance 2.5, where I gave each model the same photo of me and the same prompt and watched a snow globe turn grey London into gingerbread."
      form={<DownloadForm align="left" downloadUrl="/downloads/gingerbread-london-ai-video-models.pdf" tag="gingerbread-london" buttonLabel="Get it free" />}
      cover={{ src: "/resources/gbldn-page-cover.jpg", alt: "Cover of Gingerbread London: 5 AI video models, one prompt, a free resource from Women Lead AI", width: "w-52 md:w-72" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

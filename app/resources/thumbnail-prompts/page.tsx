import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Thumbnail Prompt Pack: make scroll-stopping YouTube thumbnails with AI",
  description:
    "Free prompt pack: the exact prompts I use to build my AI double (character sheet) and make 10 YouTube thumbnail options in about 5 minutes with Claude and Higgsfield, plus the phone test and my 3 thumbnail rules.",
  path: "/resources/thumbnail-prompts",
  ogTitle: "The Thumbnail Prompt Pack | Women Lead AI",
  ogDescription:
    "My exact character sheet and thumbnail prompts for Claude and Higgsfield, plus the 3 rules that make the biggest difference.",
  images: ["/resources/tprompts-cover.jpg"],
});

const previews = [
  { src: "/resources/tprompts-page-cover.jpg", name: "The prompt pack" },
  { src: "/resources/tprompts-page-double.jpg", name: "Build your AI double" },
  { src: "/resources/tprompts-page-rules.jpg", name: "The 3 rules checklist" },
];

const inside = [
  "The setup: connecting Higgsfield to Claude and the three folders I use",
  "Where I find reference thumbnails, and how to borrow the structure, not the thumbnail",
  "My character sheet prompt for building your AI double from 6 to 8 photos",
  "The fix-it prompts for when the sheet doesn't look like you",
  "The generate ONE thumbnail first prompt, then the other nine",
  "The phone test and the 'give me 3 more of number 4' prompt",
  "The 3 rules checklist to run before you upload",
];

export default function ThumbnailPromptsPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          The thumbnail <em className="text-[#602D37]">prompt pack</em>
        </>
      }
      intro="The exact prompts I use to make 10 thumbnail options in about 5 minutes with Claude and Higgsfield."
      form={<DownloadForm align="left" downloadUrl="/downloads/thumbnail-prompts.pdf" tag="thumbnail-prompts" buttonLabel="Get it free" />}
      cover={{ src: previews[0].src, alt: "" }}
      previews={previews}
      inside={inside}
      note="You'll need Claude and a Higgsfield account. I use GPT Image 2.5 on Higgsfield for every thumbnail."
      ctaTitle="Want more guides like this?"
    />
  );
}

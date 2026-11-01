import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The Story Behind the Object: every prompt from my AI history film",
  description:
    "Free prompt pack: every prompt I used to make a World War II film starring my brother, an antique dealer, and the real 1940 banknote he sells, with templates for your own product.",
  path: "/resources/story-behind-the-object",
  ogTitle: "The Story Behind the Object | Women Lead AI",
  ogDescription:
    "Every prompt behind my AI history film of my brother and a real 1940 banknote, made with Higgsfield and Claude.",
  images: ["/resources/storyobject-cover.jpg"],
});

const previews = [
  { src: "/resources/storyobject-page-story.jpg", name: "The life story" },
  { src: "/resources/storyobject-page-sheet.jpg", name: "The character sheet" },
  { src: "/resources/storyobject-page-scenes.jpg", name: "Every scene" },
];

const inside = [
  "How to plan a product's life story in seven short shots",
  "The character sheet prompt and the two settings that fixed his face",
  "Edit prompts that change one thing without starting again",
  "Every scene and video prompt, as a template and word for word",
  "Lip sync with their real voice, captions and the music prompt",
  "Five fixes that saved credits, and what the whole film cost",
];

export default function StoryBehindTheObjectPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          The story behind <em className="text-[#602D37]">the object</em>
        </>
      }
      intro="Every prompt I used to turn my brother and a real 1940 banknote into a World War II film. Swap in your own product."
      form={<DownloadForm align="left" downloadUrl="/downloads/story-behind-the-object.pdf" tag="story-behind-the-object" buttonLabel="Get it free" />}
      cover={{ src: "/resources/storyobject-page-cover.jpg", alt: "" }}
      previews={previews}
      inside={inside}
      note="You'll need a Higgsfield account (the whole film cost about $50) and Claude with the Higgsfield connector."
      ctaTitle="Want more guides like this?"
    />
  );
}

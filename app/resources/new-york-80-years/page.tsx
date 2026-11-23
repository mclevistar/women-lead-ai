import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "80 Years of New York: the prompts",
  description:
    "Free prompt pack: every prompt I used in Runway to step into six New York moments, from a 1920 speakeasy to the millennium ball drop, with the character sheets, first frames, video prompts and the fixes that saved my clips.",
  path: "/resources/new-york-80-years",
  ogTitle: "80 Years of New York: the prompts | Women Lead AI",
  ogDescription:
    "Live through 80 years of history in your own AI video. Every prompt, copy and paste ready.",
  images: ["/resources/nyc80-cover.jpg"],
});

const previews = [
  { src: "/resources/nyc80-page-moments.jpg", name: "Six moments" },
  { src: "/resources/nyc80-page-outfits.jpg", name: "Outfit lines" },
  { src: "/resources/nyc80-page-frames.jpg", name: "Two angles" },
  { src: "/resources/nyc80-page-calendar.jpg", name: "The calendar" },
];

export default function NewYork80YearsPage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          80 years of <em className="text-[#602D37]">New York</em>: the prompts
        </>
      }
      intro="Every prompt I used to live through six New York moments, from a 1920 speakeasy to the millennium ball drop."
      form={<DownloadForm align="left" downloadUrl="/downloads/nyc-80-years-prompts.pdf" tag="new-york-80-years" buttonLabel="Get it free" />}
      cover={{ src: "/resources/nyc80-page-cover.jpg", alt: "Cover of 80 Years of New York: the prompts, a free resource from Women Lead AI" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

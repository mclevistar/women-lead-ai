import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "10 Ways to Get Paid by AI Companies",
  description:
    "Free guide: ten real programmes that pay you for your voice, face, footage, everyday clips or expertise, what each one actually pays, and the small print to read first.",
  path: "/resources/get-paid-by-ai",
  ogTitle: "10 Ways to Get Paid by AI Companies | Women Lead AI",
  ogDescription:
    "Ten real programmes that pay you for your voice, face, footage or expertise, with checked numbers and the honest caveats.",
  images: ["/resources/getpaidai-cover.jpg"],
});

const previews = [
  { src: "/resources/getpaidai-page-list.jpg", name: "The ten at a glance" },
  { src: "/resources/getpaidai-page-voice.jpg", name: "What each one pays" },
  { src: "/resources/getpaidai-page-start.jpg", name: "Where to start" },
];

export default function GetPaidByAIPage() {
  return (
    <ResourcePage
      eyebrow="Free guide"
      title={
        <>
          10 ways to get paid by <em className="text-[#602D37]">AI companies</em>
        </>
      }
      intro="No app to build. Ten real programmes that pay you for your voice, your face, your footage or what you know, with the numbers checked and the small print explained."
      form={<DownloadForm align="left" downloadUrl="/downloads/get-paid-by-ai.pdf" tag="get-paid-by-ai" buttonLabel="Get it free" />}
      cover={{ src: "/resources/getpaidai-page-cover.jpg", alt: "Cover of 10 Ways to Get Paid by AI Companies, a free guide from Women Lead AI" }}
      previews={previews}
      note="Every figure was checked on the company's own site in November 2026. Programmes change their terms, so check before you rely on a number."
      ctaTitle="Want more guides like this?"
    />
  );
}

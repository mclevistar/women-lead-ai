import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DownloadForm from "@/components/download-form";
import ResourcePage from "@/components/resource-page";

export const metadata: Metadata = pageMetadata({
  title: "The vending machine that sells places: the AI video prompts",
  description:
    "Free prompt pack: every prompt, frame and lesson behind my AI video where I press TOKYO on a street vending machine, get sucked into a tiny glass bottle and land in Shibuya.",
  path: "/resources/tokyo-vending-machine",
  ogTitle: "The vending machine that sells places | Women Lead AI",
  ogDescription:
    "The character sheet, the first frame and the Seedance 2.5 prompts behind my Tokyo vending machine video, word for word.",
  images: ["/resources/tokyovm-cover.jpg"],
});

const previews = [
  { src: "/resources/tokyovm-page-first-frame.jpg", name: "Three tries at the first frame" },
  { src: "/resources/tokyovm-page-bottle.jpg", name: "Sucked into the bottle" },
  { src: "/resources/tokyovm-page-shibuya.jpg", name: "Shibuya from every angle" },
];

export default function TokyoVendingMachinePage() {
  return (
    <ResourcePage
      eyebrow="Free prompt pack"
      title={
        <>
          The vending machine that <em className="text-[#602D37]">sells places</em>
        </>
      }
      intro="Every prompt, frame and lesson behind my AI video where I press TOKYO on a street vending machine, get sucked into a tiny glass bottle and land in the middle of Shibuya crossing, made with GPT Image 2 and Seedance 2.5."
      form={<DownloadForm align="left" downloadUrl="/downloads/tokyo-vending-machine-prompts.pdf" tag="tokyo-vending-machine" buttonLabel="Get it free" />}
      cover={{ src: "/resources/tokyovm-page-cover.jpg", alt: "Cover of The vending machine that sells places, a free prompt pack from Women Lead AI", width: "w-52 md:w-72" }}
      previews={previews}
      ctaTitle="Want more guides like this?"
    />
  );
}

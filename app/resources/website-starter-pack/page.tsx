import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";
import PagePreviews from "@/components/page-previews";

export const metadata: Metadata = pageMetadata({
  title: "The Website Starter Pack: build your business website with Claude Code",
  description:
    "Free starter pack: the 10 tips from my video, every Claude Code prompt to plan, design, build and launch your business website, a CLAUDE.md template and the launch checklist I use before going live.",
  path: "/resources/website-starter-pack",
  ogTitle: "The Website Starter Pack | Women Lead AI",
  ogDescription:
    "Every prompt and the launch checklist for building a business website with Claude Code, without writing code yourself.",
  images: ["/resources/starter-cover.jpg"],
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const previews = [
  { src: "/resources/starter-page-cover.jpg", name: "The starter pack" },
  { src: "/resources/starter-page-prompts.jpg", name: "Every prompt from the video" },
  { src: "/resources/starter-page-checklist.jpg", name: "The launch checklist" },
];

const inside = [
  "The 10 tips from the video on one page",
  "The interview prompt that writes your website brief, plus a CLAUDE.md template",
  "Prompts for references, your brand kit, the setup, plan mode and your design rules",
  "The mobile check, GitHub, data and consent, and the SEO and AI search audit prompts",
  "The launch checklist, printable, with every check I run before going live",
  "How to set up analytics and Microsoft Clarity, and a weekly review routine",
];

const steps = [
  "Let Claude interview you and save the brief to CLAUDE.md.",
  "Plan every page, then get the homepage perfect before building the rest.",
  "Run the launch checklist, go live, and review your analytics every week.",
];

export default function WebsiteStarterPackPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Starter pack
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            Build your website <em className="text-[#602D37]">with Claude Code</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            I built womenlead.ai with Claude Code without writing a line of code myself. This is everything from my video in
            one pack: the 10 tips, every prompt in the order I&apos;d use them, a CLAUDE.md template and the launch
            checklist I run before anything goes live.
          </p>
          <div id="download" className="mt-10 scroll-mt-28 bg-[#602D37] px-6 py-8 md:px-10 md:py-10 text-center">
            <h2 className="text-3xl md:text-4xl text-[#EFE2D3] mb-3 leading-tight" style={display}>
              Get the starter pack free
            </h2>
            <p className="text-[#EFE2D3]/70 mb-6">Pop in your email and the PDF downloads straight away.</p>
            <DownloadForm
              downloadUrl="/downloads/website-starter-pack.pdf"
              tag="website-starter-pack"
              buttonLabel="Get the starter pack"
            />
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-14">
          <PagePreviews previews={previews} />
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-5" style={heading}>
              What&apos;s inside
            </h2>
            <ul className="space-y-3">
              {inside.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-[#602D37] mt-1 shrink-0">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-5" style={heading}>
              The playbook in 3 steps
            </h2>
            <ol className="space-y-3">
              {steps.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-xs font-bold text-[#602D37] mt-1 shrink-0" style={heading}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground mt-6">
              You&apos;ll need Claude Code. Every prompt works whether you&apos;re starting from scratch or moving a site
              away from a website builder.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center border-t-2 border-[#602D37]/10 pt-16">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4" style={display}>
            Want more guides like this?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join Women Lead AI, the community for women putting AI to work in their business.
          </p>
          <a href={EXTERNAL_LINKS.skool} className="btn-bold" style={heading}>
            Join the community
          </a>
        </div>
      </section>
    </>
  );
}

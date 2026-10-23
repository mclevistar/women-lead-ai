import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";
import PagePreviews from "@/components/page-previews";

export const metadata: Metadata = pageMetadata({
  title: "8 tools that aren't AI (but will grow your sales): the free list",
  description:
    "Free list: the 8 basic marketing and sales tools most founders skip, from email tracking and heatmaps to ad libraries, Search Console and UTM links. Every link, how I set each one up, and how I use the data with Claude afterwards.",
  path: "/resources/8-tools-list",
  ogTitle: "8 Tools That Aren't AI | Women Lead AI",
  ogDescription:
    "The basic marketing and sales tools most founders skip, with every link and my setup notes. Most of them are free.",
  images: ["/resources/8tools-cover.jpg"],
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const previews = [
  { src: "/resources/8tools-page-cover.jpg", name: "The list" },
  { src: "/resources/8tools-page-tools.jpg", name: "Every tool, with setup notes" },
  { src: "/resources/8tools-page-ai.jpg", name: "Then bring in AI" },
];

const inside = [
  "HubSpot email tracking: see the moment someone opens your proposal",
  "Microsoft Clarity: heatmaps and recordings of real visitors on your website",
  "Meta and LinkedIn ad libraries: every ad your competitors are running right now",
  "AnswerThePublic: the real questions people type into Google about your topic",
  "Google Search Console: the exact searches that bring people to your site",
  "LinkedIn Smart Links: see who opened your deck and which pages they read",
  "PageSpeed Insights: how fast your site loads on a phone, and what's slowing it down",
  "UTM links: which post, email or channel actually brought you a customer",
];

const steps = [
  "Set up Microsoft Clarity. It takes a minute and it's free.",
  "Open Search Console and sort your searches by impressions.",
  "Give what you find to Claude with the prompt in the list.",
];

export default function EightToolsListPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Tool list
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            8 tools that <em className="text-[#602D37]">aren&apos;t AI</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Everyone is chasing the newest AI tool, but most founders haven&apos;t set up the basics that get sales. This
            is the full list from my video: every link, how I set each one up, and how I use the data with Claude
            afterwards. Most of them are free.
          </p>
          <div id="download" className="mt-10 scroll-mt-28 bg-[#602D37] px-6 py-8 md:px-10 md:py-10 text-center">
            <h2 className="text-3xl md:text-4xl text-[#EFE2D3] mb-3 leading-tight" style={display}>
              Get the list free
            </h2>
            <p className="text-[#EFE2D3]/70 mb-6">Pop in your email and the PDF downloads straight away.</p>
            <DownloadForm downloadUrl="/downloads/8-tools-list.pdf" tag="8-tools-list" buttonLabel="Get the list" />
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
              Start with these 3
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
              Seven of the eight are free. LinkedIn Smart Links needs a paid Sales Navigator plan.
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

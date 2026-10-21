import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";
import PagePreviews from "@/components/page-previews";

export const metadata: Metadata = pageMetadata({
  title: "London Through Time: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to put myself into nearly 2,000 years of London history, from Boudica riding into Londinium to New Year 2026 over the Thames.",
  path: "/resources/london-through-time",
  ogTitle: "London Through Time: the prompts | Women Lead AI",
  ogDescription:
    "Step into history as it happens in your own AI video. Every prompt, copy and paste ready.",
  images: ["/resources/london-cover.jpg"],
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const moments = [
  { src: "/resources/london-1666.jpg", year: "1666" },
  { src: "/resources/london-1894.jpg", year: "1894" },
  { src: "/resources/london-1918.jpg", year: "1918" },
];

const inside = [
  "The eight moments I picked, AD 60 to 2026, with their real dates",
  "The character sheet prompt, plus a ready outfit line for every era",
  "The animation prompt template and the sounds for each clip",
  "My full 1918 clip prompt, word for word",
  "How to add the flipping paper calendar, and five fixes from my redos",
];

const steps = [
  "Pick moments you can see: events that happen in front of the camera.",
  "Dress for every era: one character sheet per era, with your face.",
  "Animate the moment: one 8 second clip per era, with sound.",
  "Flip the calendar: add the years in your edit and stitch it all together.",
];

export default function LondonThroughTimePage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Prompt pack
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            London Through Time: <em className="text-[#602D37]">the prompts</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Every prompt I used to put myself into nearly 2,000 years of London history, from Boudica riding into
            Londinium to New Year 2026 over the Thames. Copy, paste, swap in your own city and your own moments.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mt-14">
          <PagePreviews previews={moments.map((m) => ({ src: m.src, name: m.year }))} aspect="aspect-[9/16]" compactMobile />
        </div>
      </section>

      <section id="download" className="py-16 md:py-20 px-6 bg-[#602D37]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-[#EFE2D3] mb-4 leading-tight" style={display}>
            Get the prompts free
          </h2>
          <p className="text-[#EFE2D3]/70 mb-8">Pop in your email and the PDF downloads straight away.</p>
          <DownloadForm
            downloadUrl="/downloads/london-through-time-prompts.pdf"
            tag="london-through-time"
            buttonLabel="Get the PDF"
          />
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
              The four steps
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
              You don&apos;t need to be a filmmaker. You&apos;ll need a Higgsfield account, 2 or 3 clear photos of
              your face and an editor like CapCut.
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

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";
import PagePreviews from "@/components/page-previews";

export const metadata: Metadata = pageMetadata({
  title: "Paris Through Time: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to put myself into 200+ years of Paris history, from the storming of the Bastille in 1789 to the streets of Paris in October 2026.",
  path: "/resources/paris-through-time",
  ogTitle: "Paris Through Time: the prompts | Women Lead AI",
  ogDescription:
    "Step into history as it happens in your own AI video. Every prompt, copy and paste ready.",
  images: ["/resources/paris-cover.jpg"],
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const moments = [
  { src: "/resources/paris-1789.jpg", year: "1789" },
  { src: "/resources/paris-1944.jpg", year: "1944" },
  { src: "/resources/paris-2019.jpg", year: "2019" },
];

const inside = [
  "The eight moments I picked, 1789 to 2026, with their real dates",
  "The character sheet prompt, plus a ready outfit line for every era",
  "The start frame prompt and the two-angle trick that makes you look at the moment",
  "The animation prompt template, the sounds for each clip, and my 2019 clip word for word",
  "How to add the paper calendar, and five fixes from my redos",
];

const steps = [
  "Dress for every era: one character sheet per moment, with your face.",
  "Set the scene: one still photo per angle, before you pay for video.",
  "Bring it to life: animate each still with sound, in two angles when you react.",
  "Add the calendar: add the dates in your edit and stitch it all together.",
];

export default function ParisThroughTimePage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Prompt pack
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            Paris Through Time: <em className="text-[#602D37]">the prompts</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Every prompt I used to put myself into 200+ years of Paris history, from the storming of the Bastille in
            1789 to the streets of Paris in October 2026. Copy, paste, swap in your own city and your own moments.
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
            downloadUrl="/downloads/paris-through-time-prompts.pdf"
            tag="paris-through-time"
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

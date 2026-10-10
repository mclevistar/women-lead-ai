import type { Metadata } from "next";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";

export const metadata: Metadata = {
  title: "NYC Through Time: the prompts",
  description:
    "Free prompt pack: every prompt I used in Higgsfield to put myself into 143 years of New York history, from the Brooklyn Bridge opening in 1883 to SoHo today.",
  openGraph: {
    title: "NYC Through Time: the prompts | Women Lead AI",
    description: "Walk through history in your own AI video. Every prompt, copy and paste ready.",
    url: "https://womenlead.ai/resources/nyc-through-time",
    images: ["/resources/nyc-cover.jpg"],
  },
};

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const moments = [
  { src: "/resources/nyc-1917.jpg", year: "1917" },
  { src: "/resources/nyc-1930.jpg", year: "1930" },
  { src: "/resources/nyc-1964.jpg", year: "1964" },
];

const inside = [
  "The character sheet prompt to dress you for every decade",
  "A start frame prompt for each of the seven moments, 1883 to 2026",
  "The animation prompts, with music and sound for every clip",
  "How to add the flipping paper calendar in your editor",
  "The Higgsfield settings and what the whole video cost in credits",
];

const steps = [
  "Dress for every era: one character sheet per decade.",
  "Set the scene: one start frame per moment.",
  "Bring it to life: animate each frame into a 6 second clip with sound.",
  "Flip the calendar: add the years in your editor and stitch it together.",
];

export default function NycThroughTimePage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Prompt pack
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            NYC Through Time: <em className="text-[#602D37]">the prompts</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Every prompt I used to put myself into 143 years of New York history, from the Brooklyn Bridge opening in
            1883 to the streets of SoHo today. Copy, paste, swap in your own city and your own moments.
          </p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3 md:gap-5 mt-12">
          {moments.map((m) => (
            <figure key={m.year}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={`New York, ${m.year}`} className="w-full aspect-[9/16] object-cover border-2 border-[#602D37]" />
              <figcaption className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#602D37] mt-3" style={heading}>
                {m.year}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="download" className="py-16 md:py-20 px-6 bg-[#602D37]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-[#EFE2D3] mb-4 leading-tight" style={display}>
            Get the prompts free
          </h2>
          <p className="text-[#EFE2D3]/70 mb-8">Pop in your email and the PDF downloads straight away.</p>
          <DownloadForm
            downloadUrl="/downloads/nyc-through-time-prompts.pdf"
            tag="nyc-through-time"
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
              You don&apos;t need to be a filmmaker. You&apos;ll need a Higgsfield account, 6 to 8 photos of yourself
              and an editor like CapCut.
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

import type { Metadata } from "next";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";

export const metadata: Metadata = {
  title: "3 AI hook effects that stop the scroll: every prompt",
  description:
    "Free prompt guide: every prompt I used in Higgsfield to make an Instagram post pour out cotton candy, my inbox fold into paper planes and strawberries melt out of my phone.",
  openGraph: {
    title: "3 AI Hook Effects | Women Lead AI",
    description: "Every prompt behind the pop out, paper plane and melt effects. Copy, paste, swap in your details.",
    url: "https://womenlead.ai/resources/ai-hook-effects",
    images: ["/resources/hook-end_candy.jpg"],
  },
};

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const effects = [
  { src: "/resources/hook-end_candy.jpg", name: "The pop out" },
  { src: "/resources/hook-end_planes.jpg", name: "The paper plane" },
  { src: "/resources/hook-end_jam.jpg", name: "The melt" },
];

const inside = [
  "The character sheet prompt that keeps your face and outfit the same in every clip",
  "How to get readable words on screen (image models can spell, video models can move)",
  "The start frame prompt for each effect",
  "The Seedance 2.5 animation prompt for each effect",
  "The exact Higgsfield settings and what each clip cost me",
];

const steps = [
  "Lock your look with a character sheet.",
  "Put the words in a still: the start frame.",
  "Animate from it with Seedance 2.5.",
];

export default function AiHookEffectsPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Prompt guide
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            3 AI hook effects <em className="text-[#602D37]">that stop the scroll</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Every prompt I used to make an Instagram post pour out cotton candy, my inbox fold into paper planes and
            strawberries melt out of my phone. Copy, paste, swap in your details.
          </p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3 md:gap-5 mt-12">
          {effects.map((e) => (
            <figure key={e.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.src} alt={e.name} className="w-full aspect-[9/16] object-cover border-2 border-[#602D37]" />
              <figcaption className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#602D37] mt-3" style={heading}>
                {e.name}
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
            downloadUrl="/downloads/3-ai-hook-effects-prompts.pdf"
            tag="ai-hook-effects"
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
              The workflow in 3 steps
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
              You&apos;ll need a Higgsfield account, 6 to 10 photos of yourself and an editor like CapCut.
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

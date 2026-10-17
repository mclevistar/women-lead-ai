import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";

export const metadata: Metadata = pageMetadata({
  title: "10 motion graphics effects with Claude Code: every prompt",
  description:
    "Free prompt guide: every prompt behind the 10 motion graphics effects in my video, from newspaper highlights and a 3D globe to text behind you and a 3D phone mockup, all made with only Claude Code.",
  path: "/resources/motion-graphics-effects",
  ogTitle: "10 Motion Graphics Effects | Women Lead AI",
  ogDescription:
    "Every prompt behind the newspaper highlight, globe and map zoom, text behind you, chat and 3D phone effects. Copy, paste, swap in your details.",
  images: ["/resources/motion-behind.jpg"],
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const effects = [
  { src: "/resources/motion-map.jpg", name: "The map zoom" },
  { src: "/resources/motion-behind.jpg", name: "Text behind you" },
  { src: "/resources/motion-phone.jpg", name: "The 3D phone" },
];

const inside = [
  "The setup prompt that transcribes your video and times every effect to your words",
  "A copy and paste prompt for each of the 10 effects",
  "Newspaper highlight, globe and map zoom, text behind you, title card, callouts and zoom",
  "Chapters and progress bar, data graphics, logo reveal, chat conversation and 3D phone mockup",
  "The three habits that save the most time when you edit with Claude",
];

const steps = [
  "Film a normal talking head video.",
  "Let Claude Code transcribe it and cut the pauses.",
  "Paste the prompt for each effect you want.",
];

export default function MotionGraphicsEffectsPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Prompt guide
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            10 motion graphics effects <em className="text-[#602D37]">made with only Claude Code</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Every prompt behind the effects in my video: newspaper highlights, a 3D globe and map zoom, text behind me,
            chat conversations, a 3D phone mockup and more. No After Effects. Copy, paste, swap in your details.
          </p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 mt-12">
          {effects.map((e) => (
            <figure key={e.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.src} alt={e.name} className="w-full aspect-video object-cover border-2 border-[#602D37]" />
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
            downloadUrl="/downloads/10-motion-graphics-effects-prompts.pdf"
            tag="motion-graphics-effects"
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
              You&apos;ll need Claude Code. DaVinci Resolve Studio helps for long videos; for a one or two minute video
              Claude Code can do it all.
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

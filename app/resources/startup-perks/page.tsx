import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";

export const metadata: Metadata = pageMetadata({
  title: "Startup perks tracker: free credits for new founders",
  description:
    "Free tracker: every startup perk from my video in one place, from AWS and Notion to Stripe Atlas and Datadog. What you get, who can apply, the link to apply and a box to tick when you have.",
  path: "/resources/startup-perks",
  ogTitle: "Startup Perks Tracker | Women Lead AI",
  ogDescription:
    "Every startup perk from my video: the offer, who can apply and the application link, split into three lists. Tick them off as you go.",
  images: ["/resources/perks-cover.jpg"],
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const previews = [
  { src: "/resources/perks-cover.jpg", name: "The tracker" },
  { src: "/resources/perks-list1.jpg", name: "List 1: anyone can apply" },
  { src: "/resources/perks-list2.jpg", name: "List 2: via your bank" },
];

const inside = [
  "All 29 perks from the video, from AWS Activate and Notion to Stripe Atlas and Datadog",
  "What each one offers today, checked on the programme page",
  "Who can apply, and the direct link to the application page",
  "A box to tick when you've applied, plus a spreadsheet version to track your status",
  "How to stack them so the perks get bigger as your startup grows",
];

const lists = [
  "Perks anyone can apply for, no investor needed.",
  "Perks you unlock with a Brex, Mercury or Ramp business account.",
  "Perks that need an investor or accelerator behind you.",
];

export default function StartupPerksPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Tracker
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            Startup perks tracker <em className="text-[#602D37]">stop paying full price</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Every perk from my video in one place: what you get, who can apply and the link to apply. Work through them
            one by one and tick each one off. Offers change often, so always check the page before you apply.
          </p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 mt-12">
          {previews.map((e) => (
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
            Get the tracker free
          </h2>
          <p className="text-[#EFE2D3]/70 mb-8">Pop in your email and the PDF downloads straight away.</p>
          <DownloadForm downloadUrl="/downloads/startup-perks-tracker.pdf" tag="startup-perks" buttonLabel="Get the tracker" />
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
              Three lists
            </h2>
            <ol className="space-y-3">
              {lists.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-xs font-bold text-[#602D37] mt-1 shrink-0" style={heading}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center border-t-2 border-[#602D37]/10 pt-16">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4" style={display}>
            Want to build smarter with AI?
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

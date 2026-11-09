import type { ReactNode } from "react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import PagePreviews from "@/components/page-previews";
import ReferralText from "@/components/referral-text";
import RelatedResources from "@/components/related-resources";

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

type Preview = { src: string; name: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  /** the DownloadForm, shown straight under the intro */
  form: ReactNode;
  /** the hero image on the right, usually the PDF cover */
  cover?: { src: string; alt: string; width?: string };
  previews?: Preview[];
  aspect?: string;
  compactMobile?: boolean;
  /** optional numbered steps (for example how to install), shown under the previews */
  steps?: { title: string; items: string[] };
  /** a short line under the steps; only shown when there are steps */
  note?: string;
  ctaTitle: string;
};

export default function ResourcePage({
  eyebrow,
  title,
  intro,
  form,
  cover,
  previews,
  aspect,
  compactMobile,
  steps,
  note,
  ctaTitle,
}: Props) {
  return (
    <>
      <section className="pt-32 md:pt-40 px-6">
        <div className={`mx-auto grid gap-12 md:gap-16 items-center ${cover ? "max-w-6xl md:grid-cols-2" : "max-w-3xl"}`}>
          <div>
            <span className="text-sm font-semibold text-[#602D37]/80 mb-5 block" style={heading}>
              {eyebrow}
            </span>
            <h1 className="text-5xl md:text-6xl leading-[1.04] tracking-tight text-foreground mb-6" style={display}>
              {title}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-10 max-w-lg"><ReferralText>{intro}</ReferralText></p>
            <div id="download" className="scroll-mt-32">
              {form}
            </div>
          </div>
          {cover && (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover.src}
                alt={cover.alt}
                className={`${cover.width ?? "w-64 md:w-96"} rotate-2 rounded-lg object-cover shadow-[0_24px_70px_rgba(96,45,55,0.28)]`}
              />
            </div>
          )}
        </div>
        {previews && (
          <div className="max-w-5xl mx-auto mt-24 md:mt-32">
            <PagePreviews previews={previews} aspect={aspect} compactMobile={compactMobile} />
          </div>
        )}
      </section>

      {steps && (
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-foreground text-center mb-10" style={display}>
              {steps.title}
            </h2>
            <ol className="border-t border-[#602D37]/10">
              {steps.items.map((item, n) => (
                <li key={item} className="flex gap-4 py-4 border-b border-[#602D37]/10 text-foreground leading-relaxed">
                  <span className="text-sm font-semibold text-[#602D37]/60 mt-0.5 w-5 shrink-0" style={heading}>
                    {n + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            {note && <p className="text-sm text-muted-foreground text-center mt-8"><ReferralText>{note}</ReferralText></p>}
          </div>
        </section>
      )}

      <div className={steps ? "" : "mt-24 md:mt-32"}>
        <RelatedResources />
      </div>

      <section className="pb-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-foreground mb-3" style={display}>
            {ctaTitle}
          </h2>
          <p className="text-muted-foreground mb-8">Join Women Lead AI, the community for women putting AI to work.</p>
          <a
            href={EXTERNAL_LINKS.skool}
            className="inline-flex items-center px-6 py-3 rounded-full border border-[#602D37]/30 text-[#602D37] text-sm font-semibold hover:bg-[#602D37] hover:text-[#EFE2D3] transition-colors"
            style={heading}
          >
            Join the community
          </a>
        </div>
      </section>
    </>
  );
}

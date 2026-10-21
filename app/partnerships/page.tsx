import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import ScrollReveal from "@/components/scroll-reveal";
import PartnershipForm from "./partnership-form";
import { HeroReel, CountUp, Bar, WorkGrid, type Work } from "./partnerships-client";

export const metadata: Metadata = pageMetadata({
  title: "Brand Partnerships",
  description:
    "Work with Wiktoria Korbecka on a sponsored video. 1.54M monthly Instagram views and a professional audience of founders, executives and women in tech.",
  path: "/partnerships",
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const PARTNERSHIPS_EMAIL = "partnerships@womenlead.ai";

// Videos live in public/partnerships as <slug>-loop.mp4 (silent preview), <slug>.mp4 (full, with sound) and <slug>.jpg
const work: Work[] = [
  { slug: "runway", brand: "Runway", platform: "Instagram", url: "https://www.instagram.com/p/Dd3i47Mgi5G/" },
  { slug: "pink-nyc", brand: "Higgsfield", platform: "Instagram", url: "https://www.instagram.com/p/Ddy9LkugPE9/" },
  { slug: "veed", brand: "VEED", platform: "LinkedIn", url: "https://www.linkedin.com/posts/veedhq_spending-your-evenings-working-not-the-one-activity-7513529130571730944-m7I6", landscape: true },
  { slug: "imagine", brand: "Imagine", platform: "Instagram", url: "https://www.instagram.com/p/DcLYUXUohxq/" },
  { slug: "higgsfield", brand: "Higgsfield", platform: "Instagram", url: "https://www.instagram.com/p/DXumWciDtc8/" },
  { slug: "sintra", brand: "Sintra AI", platform: "Instagram", url: "https://www.instagram.com/p/DZXrVroH4U1/" },
];

const brands = ["Runway", "Higgsfield", "VEED", "Imagine", "Sintra AI"];

const stats = [
  { to: 1.54, decimals: 2, suffix: "M", label: "Instagram views in 30 days" },
  { to: 905, suffix: "K", label: "Accounts reached in a month" },
  { to: 97.4, decimals: 1, suffix: "%", label: "Views from non followers" },
  { to: 33.7, decimals: 1, suffix: "K", label: "LinkedIn impressions in 28 days" },
  { to: 13, suffix: "K", label: "Instagram followers" },
  { to: 1, suffix: "K+", label: "Community members" },
];

const channels = [
  { label: "YouTube", href: EXTERNAL_LINKS.youtube },
  { label: "Podcast", href: "/podcast", internal: true },
  { label: "Instagram", href: EXTERNAL_LINKS.instagram },
  { label: "TikTok", href: EXTERNAL_LINKS.tiktok },
  { label: "LinkedIn", href: EXTERNAL_LINKS.linkedin },
  { label: "Spotify", href: EXTERNAL_LINKS.spotify },
];

const pill = "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ECB398] mb-5" style={heading}>
      {children}
    </p>
  );
}

export default function PartnershipsPage() {
  return (
    <div className="bg-[#0E0A0B] text-[#EFE2D3]">
      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden pt-24">
        <HeroReel slugs={work.map((w) => w.slug)} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0A0B] via-[#0E0A0B]/85 to-[#0E0A0B]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A0B] via-transparent to-[#0E0A0B]/60" />
        <div className="relative w-full max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
          <p className="fade-in text-xs font-bold uppercase tracking-[0.25em] text-[#ECB398] mb-6" style={heading}>
            Brand Partnerships
          </p>
          <h1 className="text-[3.4rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.95] tracking-tight max-w-4xl mb-8" style={display}>
            {["Videos", "people", "actually"].map((w, i) => (
              <span key={w}><span className="pt-word" style={{ animationDelay: `${150 + i * 120}ms` }}>{w}</span>{" "}</span>
            ))}
            <span className="pt-word italic text-[#ECB398]" style={{ animationDelay: "510ms" }}>watch.</span>
          </h1>
          <p className="fade-in-up delay-600 text-lg md:text-xl text-[#EFE2D3]/75 max-w-md mb-10">
            AI tutorials that put your product to work, for founders and women in tech.
          </p>
          <div className="fade-in-up delay-700 flex flex-wrap gap-3">
            <a href="#enquire" className={`${pill} bg-[#EFE2D3] text-[#602D37] hover:bg-white`} style={heading}>
              Work with me <span aria-hidden="true">→</span>
            </a>
            <a href="#work" className={`${pill} border border-[#EFE2D3]/40 text-[#EFE2D3] hover:border-[#EFE2D3] hover:bg-white/5`} style={heading}>
              Watch the work
            </a>
          </div>
        </div>
      </section>

      {/* Brands marquee */}
      <section className="border-y border-white/10 py-8 overflow-hidden">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#EFE2D3]/50 mb-6" style={heading}>
          Worked with
        </p>
        <div className="marquee-track flex whitespace-nowrap w-max" style={{ animationDuration: "28s" }}>
          {[...brands, ...brands, ...brands, ...brands].map((b, i) => (
            <span key={i} className="mx-8 md:mx-14 text-3xl md:text-5xl text-[#EFE2D3]/85" style={display}>{b}</span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="pt-glow py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Eyebrow>By the numbers</Eyebrow>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
            {stats.map((s) => (
              <ScrollReveal key={s.label}>
                <p className="text-5xl md:text-7xl lg:text-8xl leading-none mb-3 tabular-nums" style={display}>
                  <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="text-sm md:text-base text-[#EFE2D3]/60">{s.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 md:py-32 px-4 md:px-10 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="px-2 md:px-0 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
            <div>
              <Eyebrow>Past work</Eyebrow>
              <h2 className="text-5xl md:text-7xl leading-[0.95]" style={display}>
                Made with <span className="italic text-[#ECB398]">these brands</span>
              </h2>
            </div>
            <p className="text-[#EFE2D3]/60 md:text-right">Tap any video to watch with sound.</p>
          </ScrollReveal>
          <ScrollReveal>
            <WorkGrid work={work} />
          </ScrollReveal>
        </div>
      </section>

      {/* Audience */}
      <section className="pt-glow py-24 md:py-32 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          <ScrollReveal>
            <Eyebrow>The audience</Eyebrow>
            <h2 className="text-5xl md:text-7xl leading-[0.95]" style={display}>
              Professionals <span className="italic text-[#ECB398]">who buy</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="space-y-7">
            <Bar label="Women" pct={71.7} />
            <Bar label="Aged 25 to 34" pct={40.6} />
            <Bar label="Senior level on LinkedIn" pct={38.9} />
            <Bar label="Skool engagement rate" pct={39} />
            <Bar label="Work at companies with 10K+ staff" pct={29.9} />
          </ScrollReveal>
        </div>
      </section>

      {/* Channels */}
      <section className="py-20 md:py-24 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <Eyebrow>Watch and listen</Eyebrow>
          </ScrollReveal>
          <ScrollReveal className="flex flex-wrap gap-3">
            {channels.map((c) => {
              const cls = `${pill} border border-white/15 text-[#EFE2D3] hover:bg-[#EFE2D3] hover:text-[#602D37] text-base`;
              return c.internal ? (
                <Link key={c.label} href={c.href} className={cls} style={heading}>{c.label} <span aria-hidden="true">↗</span></Link>
              ) : (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className={cls} style={heading}>{c.label} <span aria-hidden="true">↗</span></a>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="bg-[#EFE2D3] text-[#232323] py-24 md:py-32 px-6 md:px-10 scroll-mt-16">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-5" style={heading}>Let&apos;s work together</p>
            <h2 className="text-5xl md:text-7xl leading-[0.95] text-[#602D37] mb-6" style={display}>
              Reach your <span className="italic">ideal customer</span>
            </h2>
            <p className="text-[#5A4A44] mb-10">
              Tell me about your product and I&apos;ll come back with ideas. Or email{" "}
              <a href={`mailto:${PARTNERSHIPS_EMAIL}`} className="text-[#602D37] font-semibold underline">{PARTNERSHIPS_EMAIL}</a>.
            </p>
          </ScrollReveal>
          <PartnershipForm />
        </div>
      </section>
    </div>
  );
}

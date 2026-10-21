import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import ScrollReveal from "@/components/scroll-reveal";
import PartnershipForm from "./partnership-form";
import { HeroReel, CountUp, PinnedWorkRow, Analytics, type Work, type Panel } from "./partnerships-client";

export const metadata: Metadata = pageMetadata({
  title: "Brand Partnerships",
  description:
    "Work with Wiktoria Korbecka on a sponsored video. 1.54M monthly Instagram views and a professional audience of founders, executives and women in tech.",
  path: "/partnerships",
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const PARTNERSHIPS_EMAIL = "partnerships@womenlead.ai";

// Silent previews live in public/partnerships as <slug>-loop.mp4 and <slug>.jpg; each card links to the original post
const work: Work[] = [
  { slug: "runway", brand: "Runway", platform: "Instagram", url: "https://www.instagram.com/p/Dd3i47Mgi5G/", logo: "/partnerships/logos/runway.svg" },
  { slug: "pink-nyc", brand: "Higgsfield", platform: "Instagram", url: "https://www.instagram.com/p/Ddy9LkugPE9/", logo: "/partnerships/logos/higgsfield-glyph.svg", logoText: true },
  { slug: "veed", brand: "VEED", platform: "LinkedIn", url: "https://www.linkedin.com/posts/veedhq_spending-your-evenings-working-not-the-one-activity-7513529130571730944-m7I6", shape: "wide", logo: "/partnerships/logos/veed.svg" },
  { slug: "imagine", brand: "Imagine", platform: "Instagram", url: "https://www.instagram.com/p/DcLYUXUohxq/", logo: "/partnerships/logos/imagine.svg" },
  { slug: "higgsfield", brand: "Higgsfield", platform: "Instagram", url: "https://www.instagram.com/p/DXumWciDtc8/", logo: "/partnerships/logos/higgsfield-glyph.svg", logoText: true },
  { slug: "sintra", brand: "Sintra AI", platform: "Instagram", url: "https://www.instagram.com/p/DZXrVroH4U1/", logo: "/partnerships/logos/sintra.svg" },
];

// Recent organic videos: YouTube shows its thumbnail, Instagram plays a silent preview
const organic: Work[] = [
  { slug: "yt-11NTCS9P7BQ", brand: "Claude Code", platform: "YouTube", shape: "wide", image: "/partnerships/yt-11NTCS9P7BQ.jpg", title: "10 Video Effects You Can Make With Claude Code, Step by Step", url: "https://www.youtube.com/watch?v=11NTCS9P7BQ" },
  { slug: "organic-higgs", brand: "AI video", platform: "Instagram", url: "https://www.instagram.com/p/DeUdMozAUC4/" },
  { slug: "yt-EEEo1Obql1A", brand: "AEO Playbook", platform: "YouTube", shape: "wide", image: "/partnerships/yt-EEEo1Obql1A.jpg", title: "How to Get AI to Recommend Your Website: AEO 2026 Playbook", url: "https://www.youtube.com/watch?v=EEEo1Obql1A" },
  { slug: "organic-history", brand: "Time travel", platform: "Instagram", shape: "feed", url: "https://www.instagram.com/p/Deew5AhgA1M/" },
  { slug: "yt-DJ2J8OxWafQ", brand: "Podcast", platform: "YouTube", shape: "wide", image: "/partnerships/yt-DJ2J8OxWafQ.jpg", title: "The $1 Trillion Gap In Women's Health, Ep 9", url: "https://www.youtube.com/watch?v=DJ2J8OxWafQ" },
];

// White logos taken from each brand's own site, in public/partnerships/logos. Higgsfield's wordmark is live text on their site, so it is set in type next to the glyph.
const brands = [
  { name: "Runway", logo: "/partnerships/logos/runway.svg", height: "h-7 md:h-10" },
  { name: "Higgsfield", logo: "/partnerships/logos/higgsfield-glyph.svg", height: "h-8 md:h-11", wordmark: true },
  { name: "VEED", logo: "/partnerships/logos/veed.svg", height: "h-6 md:h-9" },
  { name: "ImagineArt", logo: "/partnerships/logos/imagine.svg", height: "h-6 md:h-8" },
  { name: "Sintra AI", logo: "/partnerships/logos/sintra.svg", height: "h-7 md:h-10" },
];

const stats = [
  { to: 1.54, decimals: 2, suffix: "M", label: "Instagram views in a month" },
  { to: 84.9, decimals: 1, suffix: "%", label: "Women in the Instagram audience" },
  { to: 97.4, decimals: 1, suffix: "%", label: "Views from non followers" },
  { to: 33.7, decimals: 1, suffix: "K", label: "LinkedIn impressions in 28 days" },
  { to: 12.7, decimals: 1, suffix: "K", label: "Instagram followers" },
  { to: 1.1, decimals: 1, suffix: "K+", label: "Community members" },
];

// Instagram and LinkedIn from the media kit (Apr to May 2026); community from the Skool member export (Oct 2026, 1,163 members)
const panels: Panel[] = [
  {
    id: "instagram",
    label: "Instagram",
    source: "Instagram insights, 30 days to 20 October 2026. 183.6K views from 104.9K accounts, 12.7K followers.",
    groups: [
      { title: "Gender", rows: [["Women", 84.9], ["Men", 15.1]] },
      { title: "Age", rows: [["25 to 34", 35.5], ["35 to 44", 31.0], ["45 to 54", 14.7], ["18 to 24", 13.2]] },
      { title: "Top countries", rows: [["United States", 22.5], ["India", 14.6], ["United Kingdom", 7.2], ["Australia", 4.0], ["Germany", 3.9]] },
    ],
  },
  {
    id: "youtube",
    label: "YouTube",
    source: "YouTube Studio, 23 July to 20 October 2026. 14.5K views from 6K viewers, 72 hours watched, 38.4K thumbnail impressions.",
    groups: [
      { title: "Top countries", rows: [["United Kingdom", 23.9], ["United States", 14.2], ["India", 2.6], ["Germany", 0.9]] },
      { title: "Viewers", rows: [["New to the channel", 97.7], ["Stayed to watch Shorts", 48.1]] },
      { title: "Stayed to watch, top Shorts", rows: [["Claude skill that negotiates for me", 66.7], ["Canva AI Vision event in London", 62.0], ["Can your boss see your Claude chats?", 61.1], ["DaVinci Resolve with Claude Code", 50.8]] },
    ],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    source: "LinkedIn analytics, 7 April to 4 May 2026. 33.7K impressions, 16.7K members reached.",
    groups: [
      { title: "Seniority", rows: [["Senior", 38.9], ["Entry level", 18.8], ["Owner or founder", 10.8], ["Director", 10.4]] },
      { title: "Company size", rows: [["10,001+ employees", 29.9], ["1 to 10 employees", 15.0]] },
      { title: "Industry", rows: [["Medical and MedTech", 14.9], ["Tech and internet", 9.3], ["IT consulting", 9.3]] },
    ],
  },
  {
    id: "community",
    label: "Community",
    source: "Women Lead AI on Skool: answers from 1,163 members when they joined. 39% engagement rate.",
    groups: [
      { title: "AI experience", rows: [["Tried a few tools, want confidence", 39.1], ["Use AI regularly, want to go deeper", 28.3], ["Brand new to AI", 17.4]] },
      { title: "What they want from AI", rows: [["Build agents and apps", 28.4], ["Grow business and income", 28.3], ["Marketing and content", 25.1], ["Automate and save time", 22.6]] },
      { title: "Who they are", rows: [["Skool engagement rate", 39], ["Want to grow their career", 14.8], ["Run their own business", 12]] },
    ],
  },
];

// Member answers to "What would you love AI to help you with?", lightly tidied for spelling, names left out
const quotes = [
  { text: "I want AI to build a strong system for my business that runs on automation without stressing me out.", who: "Business owner" },
  { text: "I have a kidswear business online and I need AI to generate product videos, schedule posts and write scripts.", who: "Ecommerce founder" },
  { text: "I would love for it to help me serve more clients. I lead our AI team for a consultancy.", who: "AI lead, consultancy" },
  { text: "I'd like to delegate more of my work to AI and automate as much as possible, so I can focus on getting more clients.", who: "Freelancer" },
  { text: "I am building my own AI operating system to manage my work and personal life.", who: "Community member" },
  { text: "I'd like to be managing agent teams, with automated workflows and business development through agents.", who: "Founder" },
  { text: "Help me be more efficient in business and deliver faster for my clients.", who: "Consultant" },
  { text: "I want to use AI to boost my career, scale my social media and build content.", who: "Community member" },
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
            {["Videos", "that", "actually"].map((w, i) => (
              <span key={w}><span className="pt-word" style={{ animationDelay: `${150 + i * 120}ms` }}>{w}</span>{" "}</span>
            ))}
            <span className="pt-word italic text-[#ECB398]" style={{ animationDelay: "510ms" }}>convert.</span>
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

      {/* Brands belt */}
      <section className="border-y border-white/10 py-7 md:py-9 overflow-hidden bg-[#140E10]">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#EFE2D3]/50 mb-5" style={heading}>
          Brands I&apos;ve worked with
        </p>
        <div className="marquee-track flex items-center whitespace-nowrap w-max" style={{ animationDuration: "30s" }}>
          {[...brands, ...brands, ...brands, ...brands].map((b, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="mx-10 md:mx-16 inline-flex items-center gap-2.5 md:gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.logo} alt={b.wordmark ? "" : b.name} className={`${b.height} w-auto`} />
                {b.wordmark && <span className="text-3xl md:text-[2.6rem] font-semibold tracking-tight text-white" style={heading}>{b.name}</span>}
              </span>
              <span className="text-base md:text-xl text-[#ECB398]/70" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Organic content */}
      <PinnedWorkRow id="organic" work={organic}>
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 md:mb-10">
          <div>
            <Eyebrow>Organic content</Eyebrow>
            <h2 className="text-5xl md:text-7xl leading-[0.95]" style={display}>
              Recent <span className="italic text-[#ECB398]">videos</span>
            </h2>
          </div>
          <a href={EXTERNAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-[#EFE2D3]/70 hover:text-[#EFE2D3] underline underline-offset-4 md:text-right">
            See the full YouTube channel
          </a>
        </div>
      </PinnedWorkRow>

      {/* Sponsored work: pinned, scrolling down slides it sideways */}
      <PinnedWorkRow id="work" work={work}>
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 md:mb-10">
          <div>
            <Eyebrow>Past work</Eyebrow>
            <h2 className="text-5xl md:text-7xl leading-[0.95]" style={display}>
              Made with <span className="italic text-[#ECB398]">these brands</span>
            </h2>
          </div>
          <p className="text-[#EFE2D3]/60 md:text-right">Keep scrolling, tap a video to watch it.</p>
        </div>
      </PinnedWorkRow>

      {/* Stats */}
      <section className="pt-glow py-24 md:py-32 px-6 md:px-10 border-t border-white/10">
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

      {/* Audience analytics */}
      <section className="py-24 md:py-32 px-4 md:px-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="px-2 md:px-0 mb-10 md:mb-14">
            <Eyebrow>Audience analytics</Eyebrow>
            <h2 className="text-5xl md:text-7xl leading-[0.95]" style={display}>
              Professionals <span className="italic text-[#ECB398]">who buy</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <Analytics panels={panels} />
          </ScrollReveal>
        </div>
      </section>

      {/* Member quotes */}
      <section className="pt-glow py-24 md:py-32 border-t border-white/10 overflow-hidden">
        <ScrollReveal className="max-w-6xl mx-auto px-6 md:px-10 mb-10 md:mb-14">
          <Eyebrow>In their words</Eyebrow>
          <h2 className="text-5xl md:text-7xl leading-[0.95]" style={display}>
            What my community <span className="italic text-[#ECB398]">wants from AI</span>
          </h2>
        </ScrollReveal>
        <div className="marquee-track flex gap-5 w-max" style={{ animationDuration: "70s" }}>
          {[...quotes, ...quotes].map((q, i) => (
            <figure key={i} className="w-[300px] md:w-[380px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-8 flex flex-col justify-between gap-6">
              <blockquote className="text-xl md:text-2xl leading-snug text-[#EFE2D3] whitespace-normal" style={display}>
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="text-xs font-bold uppercase tracking-[0.2em] text-[#ECB398]" style={heading}>{q.who}</figcaption>
            </figure>
          ))}
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

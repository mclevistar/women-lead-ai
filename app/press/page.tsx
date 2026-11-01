import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata, SITE_URL, SITE_DESCRIPTION, personSchema, organizationSchema } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { getAllEpisodes } from "@/lib/get-episodes";
import JsonLd from "@/components/json-ld";

export const revalidate = 900;

export const metadata: Metadata = pageMetadata({
  title: "Press and Media Kit",
  description:
    "Press kit for Women Lead AI and founder Wiktoria Korbecka: bios, boilerplate, headshots, story angles, podcast facts and media contact for journalists, editors and podcast hosts.",
  path: "/press",
});

const SHORT_BIO =
  "Wiktoria Korbecka is the founder of Women Lead AI and host of the Women Lead AI podcast. She teaches professional women and organisations how to use AI in practice, from AI video and Claude to AI for sales and marketing.";

const LONG_BIO = [
  "Wiktoria Korbecka is an AI educator, consultant and podcast host, and the founder of Women Lead AI, a podcast, community and education platform that helps professional women use AI to grow their careers and businesses.",
  "On the Women Lead AI podcast she interviews women founders, operators and experts building with AI, from venture backed startup founders to data and leadership specialists. On YouTube and Instagram she runs real AI experiments in public, including AI history films made with image and video models and step by step tutorials on Claude Code, AI video editing and getting brands recommended by AI search.",
  "She runs workshops, keynotes and consulting for organisations that want AI to be practical and to stick, and she speaks on AI for non technical leaders, closing the gender gap in AI adoption, and building with AI as a solo founder.",
];

const ANGLES = [
  {
    title: "Why women are less likely to use AI at work",
    desc: "Research suggests women are around 25% less likely to use generative AI. Wiktoria can speak to why the gap exists and what employers can do about it.",
  },
  {
    title: "One person, a full team's output",
    desc: "How a solo founder uses Claude Code and AI video tools to edit, design and publish content that used to need an agency.",
  },
  {
    title: "Getting found by ChatGPT, not just Google",
    desc: "Answer engine optimisation (AEO) explained in plain English, based on a real before and after test on her own website.",
  },
  {
    title: "AI for non technical leaders",
    desc: "Why leaders without a technical background can adopt AI faster, and the leadership mistakes that make AI projects stall.",
  },
  {
    title: "History, recreated with AI",
    desc: "The making of her AI time travel films of London, Paris and New York, and what they show about where AI video is heading.",
  },
  {
    title: "Women founders building with AI",
    desc: "Lessons from the founders on the podcast, from validating a startup with flyers to raising $6M after a 2,500 person waitlist.",
  },
];

const FACTS = [
  { value: "12.7K", label: "Instagram followers" },
  { value: "1.54M", label: "Instagram views in a month" },
  { value: "1.1K+", label: "Community members" },
  { value: "85%", label: "Of the Instagram audience are women" },
];

const HEADSHOTS = [
  { src: "/images/founder-photo.jpg", alt: "Wiktoria Korbecka, founder of Women Lead AI, portrait" },
  { src: "/images/founder-photo-2.jpg", alt: "Wiktoria Korbecka, founder of Women Lead AI, second portrait" },
  { src: "/images/speaking-photo.jpg", alt: "Wiktoria Korbecka speaking at an event" },
];

const label = "text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-4";
const heading = "text-4xl md:text-5xl text-[#232323] leading-none mb-8";
const bebas = { fontFamily: "'Bebas Neue', Impact, sans-serif" };
const manrope = { fontFamily: "'Manrope', system-ui, sans-serif" };
const dmSans = { fontFamily: "'DM Sans', system-ui, sans-serif" };

export default async function PressPage() {
  const episodes = await getAllEpisodes();
  const guests = episodes.filter((ep) => ep.guest && ep.guest !== "Wiktoria Korbecka");

  return (
    <>
      <JsonLd
        data={{
          "@type": "ProfilePage",
          url: `${SITE_URL}/press`,
          name: "Women Lead AI press and media kit",
          mainEntity: personSchema,
          about: organizationSchema,
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-10 bg-[#EFE2D3]">
        <div className="max-w-4xl mx-auto">
          <p className={label} style={manrope}>Press and Media</p>
          <h1 className="text-[4.5rem] md:text-[7rem] text-[#602D37] leading-none mb-8" style={bebas}>
            Media Kit
          </h1>
          <p className="text-lg text-[#5A4A44] leading-relaxed max-w-2xl" style={dmSans}>
            Everything a journalist, editor or podcast host needs to feature Women Lead AI or quote Wiktoria Korbecka.
            For interviews, comment or guest requests, email{" "}
            <a href={`mailto:${EXTERNAL_LINKS.email}?subject=Press%20enquiry`} className="text-[#602D37] font-semibold underline">
              {EXTERNAL_LINKS.email}
            </a>
            . Replies usually within one working day.
          </p>
        </div>
      </section>

      {/* Boilerplate and bios */}
      <section className="py-20 px-6 md:px-10 bg-[#FAF5EF] border-y border-[#D9CCBE]">
        <div className="max-w-4xl mx-auto space-y-12" style={dmSans}>
          <div>
            <p className={label} style={manrope}>About Women Lead AI</p>
            <p className="text-lg text-[#232323] leading-relaxed">{SITE_DESCRIPTION}</p>
          </div>
          <div>
            <p className={label} style={manrope}>Short bio</p>
            <p className="text-[#5A4A44] leading-relaxed">{SHORT_BIO}</p>
          </div>
          <div>
            <p className={label} style={manrope}>Full bio</p>
            <div className="space-y-4 text-[#5A4A44] leading-relaxed">
              {LONG_BIO.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="py-20 px-6 md:px-10 bg-[#602D37] text-[#EFE2D3]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-8" style={manrope}>Quick facts</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="text-5xl md:text-6xl leading-none mb-2" style={bebas}>{fact.value}</p>
                <p className="text-sm opacity-80" style={dmSans}>{fact.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs opacity-60 mt-8" style={dmSans}>
            Instagram figures for the 30 days to 20 October 2026. The podcast has {episodes.length} episodes on{" "}
            <a href={EXTERNAL_LINKS.spotify} className="underline">Spotify</a>,{" "}
            <a href={EXTERNAL_LINKS.applePodcasts} className="underline">Apple Podcasts</a> and{" "}
            <a href={EXTERNAL_LINKS.youtube} className="underline">YouTube</a>.
          </p>
        </div>
      </section>

      {/* Story angles */}
      <section className="py-20 px-6 md:px-10 bg-[#FAF5EF]">
        <div className="max-w-4xl mx-auto">
          <p className={label} style={manrope}>Story angles</p>
          <h2 className={heading} style={bebas}>What Wiktoria Can Comment On</h2>
          <div className="grid md:grid-cols-2 gap-px bg-[#D9CCBE]">
            {ANGLES.map((angle) => (
              <div key={angle.title} className="bg-[#FAF5EF] p-8" style={{ borderTop: "3px solid #602D37" }}>
                <h3 className="text-lg font-bold text-[#232323] mb-2" style={manrope}>{angle.title}</h3>
                <p className="text-sm text-[#5A4A44] leading-relaxed" style={dmSans}>{angle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headshots */}
      <section className="py-20 px-6 md:px-10 bg-[#EFE2D3] border-y border-[#D9CCBE]">
        <div className="max-w-4xl mx-auto">
          <p className={label} style={manrope}>Photos</p>
          <h2 className={heading} style={bebas}>Headshots</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {HEADSHOTS.map((shot) => (
              <a key={shot.src} href={shot.src} download className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#D9CCBE]">
                  <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <p className="text-sm text-[#602D37] font-semibold mt-2" style={manrope}>Download full size</p>
              </a>
            ))}
          </div>
          <p className="text-sm text-[#5A4A44] mt-6" style={dmSans}>Free to use with coverage of Women Lead AI. Please credit Women Lead AI.</p>
        </div>
      </section>

      {/* Podcast guests */}
      {guests.length > 0 && (
        <section className="py-20 px-6 md:px-10 bg-[#FAF5EF]">
          <div className="max-w-4xl mx-auto">
            <p className={label} style={manrope}>The podcast</p>
            <h2 className={heading} style={bebas}>Recent Guests</h2>
            <ul className="divide-y divide-[#D9CCBE] border-y border-[#D9CCBE]" style={dmSans}>
              {guests.map((ep) => (
                <li key={ep.id} className="py-4">
                  <Link href={`/podcast/${ep.id}`} className="group block">
                    <p className="font-semibold text-[#232323] group-hover:text-[#602D37]">{ep.guest}</p>
                    <p className="text-sm text-[#5A4A44]">{ep.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[#5A4A44] mt-8" style={dmSans}>
              Want to be a guest, or have Wiktoria on your show? Email{" "}
              <a href={`mailto:${EXTERNAL_LINKS.email}?subject=Podcast%20guest`} className="text-[#602D37] font-semibold underline">
                {EXTERNAL_LINKS.email}
              </a>
              .
            </p>
          </div>
        </section>
      )}
    </>
  );
}

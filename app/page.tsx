import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Headphones, Play, BookOpen, Building2, Users } from "lucide-react";
import { episodes as staticEpisodes } from "@/lib/episodes";
import { RSS_URL, parseEpisodes } from "@/lib/parse-rss";
import NewsletterSignup from "@/components/newsletter-signup";
import ScrollReveal from "@/components/scroll-reveal";
import Marquee from "@/components/marquee";
import { EXTERNAL_LINKS } from "@/lib/constants";

export default async function Home() {
  let latestEpisodes = staticEpisodes.slice(0, 4);
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(RSS_URL, { next: { revalidate: 900 }, signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const rssEpisodes = parseEpisodes(await res.text());
      if (rssEpisodes.length > 0) latestEpisodes = rssEpisodes.slice(0, 4);
    }
  } catch {
    // keep static fallback
  }

  return (
    <>
      {/* ============ HERO — Split screen ============ */}
      <section className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left: text */}
        <div className="flex-1 flex items-center bg-[#EFE2D3] px-8 md:px-14 lg:px-20 pt-28 pb-16 lg:pt-0">
          <div className="max-w-lg w-full">
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-6 fade-in-up"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif", animationFillMode: "both" }}
            >
              Podcast &middot; Community &middot; Education
            </p>
            <h1
              className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] leading-none text-[#602D37] mb-6 fade-in-up delay-100"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", animationFillMode: "both" }}
            >
              Women
              <br />
              Lead AI
            </h1>
            <p
              className="text-lg leading-relaxed text-[#5A4A44] max-w-md mb-10 fade-in-up delay-200"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif", animationFillMode: "both" }}
            >
              Exploring AI, leadership and the future of tech from a female founder&apos;s perspective. Conversations with the builders and visionaries shaping the AI era.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-300" style={{ animationFillMode: "both" }}>
              <Link href="/podcast" className="btn-bold">
                <Headphones className="h-4 w-4" />
                Listen Now
              </Link>
              <a
                href={EXTERNAL_LINKS.skool}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bold-outline"
              >
                Join the Community
              </a>
            </div>
          </div>
        </div>

        {/* Right: photo */}
        <div className="lg:w-[48%] xl:w-[46%] relative bg-[#AB5961] flex items-end justify-center overflow-hidden min-h-[55vw] lg:min-h-0">
          <div
            className="absolute inset-0 slide-in-right delay-300"
            style={{
              backgroundImage: "url('/images/hero-davos-3.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              animationFillMode: "both",
            }}
          />
          <div className="relative w-full h-full flex items-end justify-center pb-0">
            {/* Overlay gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
            {/* Left badge: name + title */}
            <div className="absolute bottom-6 left-6 bg-[#EFE2D3] px-4 py-2">
              <p
                className="text-xs font-bold uppercase tracking-wider text-[#602D37]"
                style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
              >
                Wiktoria Korbecka
              </p>
              <p
                className="text-xs text-[#5A4A44]"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Founder, Women Lead AI
              </p>
            </div>
            {/* Right badge: location */}
            <div className="absolute bottom-6 right-6 bg-[#602D37] px-4 py-2">
              <p
                className="text-xs font-bold uppercase tracking-wider text-[#EFE2D3]"
                style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
              >
                at Davos during WEF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee items={[
        "AI Strategy",
        "Leadership",
        "Future of Work",
        "AI Tools",
        "Startups",
        "Ethics & Governance",
        "Product Development",
        "Career Growth",
      ]} />

      {/* ============ STATS STRIP ============ */}
      <section className="py-16 px-6 md:px-10 border-b border-[#D9CCBE]">
        <ScrollReveal variant="stagger" className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "15K+", label: "Social Followers" },
              { num: "1,200+", label: "Podcast Listeners" },
              { num: "1,000+", label: "Community Members" },
              { num: "40+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-5xl md:text-6xl text-[#602D37] leading-none mb-2"
                  style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                >
                  {stat.num}
                </p>
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-[#5A4A44]"
                  style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ============ LATEST EPISODES ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#EFE2D3]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-3"
                  style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                >
                  From the Podcast
                </p>
                <h2
                  className="text-5xl md:text-6xl text-[#232323] leading-none"
                  style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
                >
                  Latest Episodes
                </h2>
              </div>
              <Link
                href="/podcast"
                className="hidden md:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#602D37] link-underline"
                style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="stagger">
            <div className="grid md:grid-cols-2 gap-px bg-[#D9CCBE]">
              {latestEpisodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/podcast/${episode.id}`}
                  className="episode-card group block p-7 md:p-8 bg-[#FAF5EF]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider bg-[#602D37] text-[#EFE2D3] px-3 py-1"
                      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                    >
                      EP {episode.episodeNumber}
                    </span>
                    <span className="text-xs text-[#5A4A44]">{episode.duration}</span>
                  </div>
                  <h3
                    className="text-lg font-bold text-[#232323] group-hover:text-[#602D37] transition-colors mb-1"
                    style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                  >
                    {episode.title}
                  </h3>
                  <p className="text-sm text-[#5A4A44] mb-3">with {episode.guest}</p>
                  <p className="text-sm text-[#5A4A44]/70 line-clamp-2">{episode.description}</p>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/podcast"
              className="text-sm font-semibold uppercase tracking-wider text-[#602D37] link-underline"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
            >
              View all episodes &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============ BIG QUOTE ============ */}
      <section className="py-28 md:py-36 px-6 md:px-10 bg-[#602D37] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10"
          style={{
            background: "radial-gradient(circle, #ECB398 0%, transparent 70%)"
          }}
        />
        <ScrollReveal className="relative max-w-4xl mx-auto text-center">
          <span
            className="text-[#ECB398] text-8xl md:text-9xl leading-none block mb-2 opacity-40"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            &ldquo;
          </span>
          <blockquote
            className="text-4xl md:text-5xl lg:text-6xl text-[#EFE2D3] leading-tight mb-8"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            AI isn&apos;t going anywhere. The question is whether you&apos;re going to use it or be left behind.
          </blockquote>
          <p
            className="text-[#ECB398] font-bold text-sm uppercase tracking-widest mb-1"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            Wiktoria Korbecka
          </p>
          <p
            className="text-[#EFE2D3]/70 text-xl"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Founder, Women Lead AI
          </p>
        </ScrollReveal>
      </section>

      {/* ============ WHAT I DO ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#FAF5EF]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-14">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-3"
                style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
              >
                What I Do
              </p>
              <h2
                className="text-5xl md:text-6xl text-[#232323] leading-none"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                Build. Teach. Lead.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Headphones,
                title: "Podcast",
                desc: "Weekly conversations with AI leaders, founders and operators shaping the future.",
                href: "/podcast",
                label: "Listen now",
              },
              {
                icon: BookOpen,
                title: "Courses",
                desc: "Practical AI education for founders and professionals who want to lead confidently.",
                href: "/courses",
                label: "Join waitlist",
              },
              {
                icon: Building2,
                title: "B2B Advisory",
                desc: "Helping organisations navigate AI through workshops, strategy and consulting.",
                href: "/b2b",
                label: "Learn more",
              },
              {
                icon: Users,
                title: "Community",
                desc: "A network of ambitious builders exploring AI, leadership and the future of work.",
                href: EXTERNAL_LINKS.skool,
                label: "Join free",
                external: true,
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-card group block p-8 h-full"
                  >
                    <item.icon className="h-5 w-5 text-[#602D37] mb-5" />
                    <h3
                      className="text-xl font-bold text-[#232323] group-hover:text-[#602D37] transition-colors mb-2"
                      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5A4A44] leading-relaxed mb-5">{item.desc}</p>
                    <span
                      className="text-xs font-bold uppercase tracking-wider text-[#602D37] link-underline"
                      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                    >
                      {item.label} &rarr;
                    </span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="editorial-card group block p-8 h-full"
                  >
                    <item.icon className="h-5 w-5 text-[#602D37] mb-5" />
                    <h3
                      className="text-xl font-bold text-[#232323] group-hover:text-[#602D37] transition-colors mb-2"
                      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5A4A44] leading-relaxed mb-5">{item.desc}</p>
                    <span
                      className="text-xs font-bold uppercase tracking-wider text-[#602D37] link-underline"
                      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                    >
                      {item.label} &rarr;
                    </span>
                  </Link>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT STRIP ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#EFE2D3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <ScrollReveal variant="left" className="shrink-0">
            <div className="relative">
              <Image
                src="/images/founder-photo.jpg"
                alt="Wiktoria Korbecka"
                width={320}
                height={400}
                className="polaroid w-56 md:w-72 object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" className="flex-1">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
            >
              About
            </p>
            <h2
              className="text-5xl md:text-6xl text-[#232323] leading-none mb-6"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              Hi, I&apos;m Wiktoria.
            </h2>
            <p
              className="text-lg leading-relaxed text-[#5A4A44] mb-6"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              I built automations, created tools, and started seeing firsthand how AI could transform the way we work, especially for women, who are 25% less likely to even try it. So I founded Women Lead AI, a community and education platform to help women learn, implement, and scale AI in their careers and businesses.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#602D37] link-underline"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
            >
              Read my story <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ FEATURED VIDEO ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#FAF5EF]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-14">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-3"
                style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
              >
                Watch
              </p>
              <h2
                className="text-5xl md:text-6xl text-[#232323] leading-none"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                Latest Video
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale">
            <div className="relative max-w-4xl">
              <div className="video-container aspect-video bg-[#D9CCBE]">
                <iframe
                  src="https://www.youtube.com/embed/6RAJnLDSkXs"
                  title="Women Lead AI - Latest Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-8">
              <a
                href={EXTERNAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#602D37] link-underline"
                style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
              >
                <Play className="h-4 w-4" />
                Watch more on YouTube
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <ScrollReveal variant="scale">
        <NewsletterSignup />
      </ScrollReveal>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Headphones, Play, BookOpen, Building2, Users, Sparkles } from "lucide-react";
import { episodes } from "@/lib/episodes";
import NewsletterSignup from "@/components/newsletter-signup";
import ScrollReveal from "@/components/scroll-reveal";
import Marquee from "@/components/marquee";
import { EXTERNAL_LINKS } from "@/lib/constants";

export default function Home() {
  const latestEpisodes = episodes.slice(0, 4);

  return (
    <>
      {/* ============ HERO - Full viewport, cinematic ============ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
        {/* Subtle animated glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" style={{ animation: "pulse-glow 6s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" style={{ animation: "pulse-glow 8s ease-in-out infinite 2s" }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text */}
            <div className="flex-1 max-w-2xl">
              <div className="fade-in-up" style={{ animationFillMode: "both" }}>
                <span className="inline-block text-xs font-medium text-primary uppercase tracking-[0.2em] mb-6 border border-primary/30 rounded-full px-4 py-1.5">
                  Podcast &middot; Community &middot; Education
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-[1.05] mb-6 fade-in-up delay-100" style={{ animationFillMode: "both" }}>
                Women
                <br />
                <span className="text-primary">Lead</span> AI
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-lg mb-10 fade-in-up delay-200" style={{ animationFillMode: "both" }}>
                Exploring AI, leadership and the future of tech from a female founder&apos;s perspective. Conversations with the builders and visionaries shaping the AI era.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-300" style={{ animationFillMode: "both" }}>
                <Link
                  href="/podcast"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]"
                >
                  <Headphones className="h-4 w-4" />
                  Listen to the Podcast
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={EXTERNAL_LINKS.skool}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-secondary/60 hover:border-primary/30 transition-all duration-300"
                >
                  Join the Community
                </a>
              </div>
            </div>

            {/* Podcast cover with glow effect */}
            <div className="shrink-0 slide-in-right delay-300" style={{ animationFillMode: "both" }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-2xl" style={{ animation: "pulse-glow 4s ease-in-out infinite" }} />
                <div className="float relative">
                  <Image
                    src="/images/podcast-cover.png"
                    alt="Women Lead AI podcast cover"
                    width={420}
                    height={420}
                    className="w-72 md:w-80 lg:w-[420px] rounded-2xl shadow-2xl shadow-black/40 transition-transform duration-500 hover:scale-[1.03]"
                    priority
                  />
                </div>
              </div>
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

      {/* ============ VIDEO / FEATURED SECTION ============ */}
      <section className="py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
                Watch the Latest
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Real conversations about AI with the people building the future.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale">
            <div className="relative max-w-4xl mx-auto">
              <div className="video-container aspect-video bg-card">
                <iframe
                  src="https://www.youtube.com/embed?listType=user_uploads&list=WiktoriaKor"
                  title="Women Lead AI - Latest Video"
                  className="w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* Glow under video */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mt-10">
              <a
                href={EXTERNAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary link-underline"
              >
                <Play className="h-4 w-4" />
                Watch more on YouTube
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ LATEST EPISODES ============ */}
      <section className="py-28 px-6 md:px-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">From the Podcast</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                  Latest Episodes
                </h2>
              </div>
              <Link
                href="/podcast"
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary link-underline"
              >
                View all episodes <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="stagger">
            <div className="grid md:grid-cols-2 gap-4">
              {latestEpisodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/podcast/${episode.id}`}
                  className="glow-card group block p-6 md:p-8 rounded-2xl bg-card/60 border border-border/30 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">EP {episode.episodeNumber}</span>
                    <span className="text-xs text-muted-foreground">{episode.duration}</span>
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">with {episode.guest}</p>
                  <p className="text-sm text-muted-foreground/70 line-clamp-2">{episode.description}</p>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-8 text-center md:hidden">
            <Link href="/podcast" className="text-sm font-medium text-primary link-underline">
              View all episodes &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============ BIG QUOTE / MISSION ============ */}
      <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <ScrollReveal className="relative max-w-4xl mx-auto text-center">
          <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
            &ldquo;The conversation around AI needs more diverse voices at the table.&rdquo;
          </blockquote>
          <p className="text-lg text-muted-foreground mb-2">Wiktoria Korbecka</p>
          <p className="text-sm text-muted-foreground/60">Founder, Women Lead AI</p>
        </ScrollReveal>
      </section>

      {/* ============ WHAT I DO - Interactive cards ============ */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">What I Do</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Build. Teach. Lead.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <ScrollReveal key={item.title} delay={i * 100}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-card group block p-8 rounded-2xl bg-card/60 border border-border/30 h-full"
                  >
                    <item.icon className="h-6 w-6 text-primary mb-5 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <span className="text-sm font-medium text-primary link-underline">{item.label} &rarr;</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="glow-card group block p-8 rounded-2xl bg-card/60 border border-border/30 h-full"
                  >
                    <item.icon className="h-6 w-6 text-primary mb-5 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <span className="text-sm font-medium text-primary link-underline">{item.label} &rarr;</span>
                  </Link>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT STRIP ============ */}
      <section className="py-28 px-6 md:px-10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-card/60 via-background to-card/60" />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <ScrollReveal variant="left" className="shrink-0">
            <div className="relative">
              <div className="absolute -inset-3 bg-primary/10 rounded-2xl blur-xl" />
              <Image
                src="/images/founder-photo.jpg"
                alt="Wiktoria Korbecka"
                width={320}
                height={320}
                className="relative w-56 md:w-72 rounded-2xl shadow-xl"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" className="flex-1">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">About</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hi, I&apos;m Wiktoria.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              I started Women Lead AI because I believe the conversation around artificial intelligence needs more diverse voices. After years in leadership at Fortune 500 companies, I saw AI transforming industries, but the narrative didn&apos;t reflect the diversity of those impacted.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary link-underline"
            >
              Read my story <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ STATS / PROOF ============ */}
      <section className="py-20 px-6 md:px-10 border-y border-border/20">
        <ScrollReveal variant="stagger" className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "50+", label: "Episodes" },
              { num: "10K+", label: "Listeners" },
              { num: "100+", label: "Community Members" },
              { num: "6", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-1">{stat.num}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <ScrollReveal variant="scale">
        <NewsletterSignup />
      </ScrollReveal>
    </>
  );
}

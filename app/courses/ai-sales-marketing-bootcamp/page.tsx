import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Clapperboard,
  LayoutGrid,
  Scissors,
  Film,
  Send,
} from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import Marquee from "@/components/marquee";
import LoopVideoPlayer from "@/components/loop-video";
import CarouselPlayer from "@/components/carousel-player";
import WaitlistForm from "../waitlist-form";
import Countdown from "@/components/countdown";
import { BOOTCAMP_CHECKOUT_URL, BOOTCAMP_PRICE, BOOTCAMP_START } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Your AI Marketing Team in 14 Days",
  description:
    "A 2-week bootcamp on using AI for sales and marketing, starting 1 November. Every day you get one task and a video showing exactly how to do it: cinematic AI videos, animated carousels built with Claude, long and short form videos edited by Claude, and AI-powered outreach.",
  openGraph: {
    title: "Your AI Marketing Team in 14 Days | Women Lead AI",
    description:
      "Starts 1 November. 14 days, 14 tasks. Make cinematic AI videos, animated carousels and Claude-edited content, then turn it into sales with AI outreach.",
    url: "https://womenlead.ai/courses/ai-sales-marketing-bootcamp",
    images: ["/course/pink-nyc.jpg"],
  },
};

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };
const script = { fontFamily: "var(--loaded-dmserif), Georgia, serif", fontStyle: "italic" as const };

const hasCheckout = BOOTCAMP_CHECKOUT_URL.length > 0;
const enrolHref = hasCheckout ? BOOTCAMP_CHECKOUT_URL : "#enrol";

function EnrolButton() {
  return (
    <a href={enrolHref} className="btn-bold" style={heading}>
      {hasCheckout ? `Enrol for $${BOOTCAMP_PRICE}` : "Get early access"}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function LoopVideo({ src, ratio, label }: { src: string; ratio: "9/16" | "4/5" | "16/9"; label?: string }) {
  return (
    <div className="relative overflow-hidden bg-[#232323] border-2 border-[#602D37]" style={{ aspectRatio: ratio }}>
      <LoopVideoPlayer src={`/course/${src}.mp4`} poster={`/course/${src}.jpg`} />
      {label && (
        <span
          className="absolute top-3 left-3 bg-[#602D37] text-[#EFE2D3] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1"
          style={heading}
        >
          {label}
        </span>
      )}
    </div>
  );
}

const heroOutcomes = [
  "Make cinematic AI videos, like my pink New York reel",
  "Create animated carousels that Claude designs for you",
  "Have Claude edit your Reels, TikToks and YouTube videos",
  "Turn your new content into messages that win clients",
];

const slides = (key: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/course/slides/${key}-${String(i + 1).padStart(2, "0")}`);

const carousels = {
  pink: slides("pink", 7),
  claude: slides("claude", 8),
  donut: slides("donut", 8),
};

const outcomes = [
  {
    icon: Clapperboard,
    video: "pink-nyc",
    ratio: "9/16" as const,
    title: "Cinematic AI videos",
    desc: "Make scroll-stopping videos like my New York goes pink edit. Consistent character, cinematic camera moves, music and sound, all with AI tools and no film crew.",
  },
  {
    icon: LayoutGrid,
    video: "claude-carousel",
    ratio: "4/5" as const,
    title: "Animated carousels built by Claude",
    desc: "Moving carousels for Instagram and LinkedIn that Claude designs and animates for you, on brand, slide by slide. No Canva, no designer.",
  },
  {
    icon: Scissors,
    video: "claude-edit-split",
    ratio: "9/16" as const,
    title: "Short form, edited by Claude",
    desc: "Hand Claude a raw take and get back a clean cut with captions, b-roll, sound effects and motion graphics. Reels, TikToks and Shorts in minutes.",
  },
  {
    icon: Film,
    video: "podcast-intro",
    ratio: "16/9" as const,
    title: "Long form, edited by Claude",
    desc: "YouTube videos and podcast episodes edited with Claude, then sliced into a week of shorts. One recording, dozens of pieces of content.",
  },
];

const week1 = [
  { day: 1, title: "Set up your AI marketing stack", task: "Get Claude, Claude Code and your video tools ready, and write a brand brief Claude can reuse in every task." },
  { day: 2, title: "Build your AI character", task: "Create a character sheet so you (or your product) look identical in every AI shot." },
  { day: 3, title: "Your first cinematic AI scene", task: "Recreate the grey city to pink world transition, prompt by prompt." },
  { day: 4, title: "Stitch, score and ship it", task: "Stitch your clips, add an AI soundtrack and sound effects, export for Reels, TikTok and Shorts." },
  { day: 5, title: "Animated carousel with Claude", task: "Have Claude build and animate an 8-slide carousel in your brand colours and fonts." },
  { day: 6, title: "Hooks and captions that convert", task: "Use Claude to write five hooks per post and pick the winner, plus captions that sell without sounding salesy." },
  { day: 7, title: "Publish day", task: "Post your first three pieces and schedule a week ahead so content goes out while you sleep." },
];

const week2 = [
  { day: 8, title: "Claude edits your talking head", task: "Film one take on your phone. Claude cuts the mistakes, adds captions, SFX and on-screen text." },
  { day: 9, title: "Motion graphics and proof", task: "Add animated callouts, screenshots and text-behind-you effects that make viewers stop." },
  { day: 10, title: "Long form, edited by Claude", task: "Edit a YouTube video or podcast episode with Claude: clean cut, chapters, title and description." },
  { day: 11, title: "One recording, 30 pieces", task: "Turn one long video into shorts, carousels, posts and a newsletter with a single Claude workflow." },
  { day: 12, title: "Find your buyers with AI", task: "Build a list of ideal clients and let Claude research each one so you know exactly what to say." },
  { day: 13, title: "Outreach that gets replies", task: "Claude drafts personalised emails and DMs plus follow-ups, in your voice, ready to send." },
  { day: 14, title: "Your AI sales and marketing system", task: "Put it all together into a weekly routine you can run in a few hours, then share your results." },
];

const included = [
  "14 daily tasks, one clear deliverable each day",
  "Step-by-step screen-recorded videos for every task",
  "My exact prompts, Claude workflows and templates",
  "Copy-paste setup for Claude Code editing and carousels",
  "Outreach email and DM templates you can adapt",
  "Lifetime access to all videos and future updates",
];

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "No. You will use Claude Code, but I show every click and give you the exact prompts. If you can copy and paste, you can do this.",
  },
  {
    q: "How much time does it take each day?",
    a: "Plan for 30 to 60 minutes. Each day is one video lesson and one task, so you finish with real content, not just notes.",
  },
  {
    q: "Which tools will I need?",
    a: "Claude (a paid plan is recommended) plus an AI video generator for the cinematic videos. I walk you through the setup on day one and point out free options where they exist.",
  },
  {
    q: "What if I fall behind?",
    a: "Every lesson stays available after it unlocks, so you can do two days in one or take a weekend off and pick up where you left off.",
  },
  {
    q: "Is this for sales or for marketing?",
    a: "Both. Week one builds your content engine, week two turns that content into conversations and clients with AI-powered outreach.",
  },
  {
    q: "When do I get access?",
    a: "The bootcamp starts on 1 November. You get your access email straight after checkout, day one unlocks on the 1st and a new day unlocks every morning after that.",
  },
];

function DayList({ days }: { days: typeof week1 }) {
  return (
    <ol className="divide-y divide-[#D9CCBE] border-y border-[#D9CCBE]">
      {days.map((d) => (
        <li key={d.day} className="flex gap-5 py-5">
          <span className="shrink-0 w-14 text-4xl leading-[1.05] text-[#AB5961]" style={display}>
            {String(d.day).padStart(2, "0")}
          </span>
          <div>
            <h4 className="text-base font-bold text-[#232323] mb-1" style={heading}>
              {d.title}
            </h4>
            <p className="text-sm text-[#5A4A44] leading-relaxed">{d.task}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function AiSalesMarketingBootcampPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 px-6 md:px-10 bg-[#EFE2D3] overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-10 items-center">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-6 fade-in-up"
              style={{ ...heading, animationFillMode: "both" }}
            >
              2-week bootcamp &middot; starts 1 November
            </p>
            <h1
              className="text-[3rem] md:text-[4.5rem] leading-[1.02] text-[#602D37] mb-5 fade-in-up delay-100"
              style={{ ...display, animationFillMode: "both" }}
            >
              Your AI marketing team <em className="text-[#AB5961]">in 14 days</em>
            </h1>
            <p className="text-2xl md:text-3xl text-[#5A4A44] mb-6 fade-in-up delay-200" style={{ ...script, animationFillMode: "both" }}>
              The 14-day AI bootcamp for sales and marketing
            </p>
            <div className="max-w-xl mb-10 fade-in-up delay-300" style={{ animationFillMode: "both" }}>
              <p className="text-lg leading-relaxed text-[#5A4A44] mb-5">
                One task a day for 14 days. Each day comes with a short video showing you exactly what to do, step by
                step. By the end, you&apos;ll be able to:
              </p>
              <ul className="space-y-2.5">
                {heroOutcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#232323] leading-snug">
                    <Check className="h-5 w-5 text-[#AB5961] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-10 fade-in-up delay-300" style={{ animationFillMode: "both" }}>
              <Countdown target={BOOTCAMP_START} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 fade-in-up delay-400" style={{ animationFillMode: "both" }}>
              <EnrolButton />
              <a href="#curriculum" className="btn-bold-outline" style={heading}>
                See the 14 days
              </a>
            </div>
          </div>

          {/* Hero video stack */}
          <div className="relative grid grid-cols-2 gap-4 max-w-md lg:max-w-none mx-auto w-full scale-in delay-300" style={{ animationFillMode: "both" }}>
            <div className="translate-y-8">
              <LoopVideo src="pink-nyc" ratio="9/16" label="AI video" />
            </div>
            <div>
              <LoopVideo src="claude-edit-split" ratio="9/16" label="Edited by Claude" />
            </div>
            <span
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#602D37] text-[#EFE2D3] px-5 py-2 text-2xl whitespace-nowrap rotate-[-2deg]"
              style={script}
            >
              you&apos;ll make these
            </span>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Cinematic AI videos",
          "Animated carousels",
          "Claude edits your shorts",
          "Claude edits your long form",
          "AI outreach",
          "One task a day",
        ]}
      />

      {/* ============ OUTCOMES ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#FAF5EF]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-3" style={heading}>
                What you&apos;ll be able to do
              </p>
              <h2 className="text-4xl md:text-5xl text-[#232323] leading-[1.05] mb-5" style={display}>
                Content that used to need a whole team
              </h2>
              <p className="text-lg text-[#5A4A44] leading-relaxed">
                Everything below was made with the exact workflows you will learn. No agency, no editor, no designer.
                Just you, Claude and a few AI tools.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-20 md:space-y-28">
            {outcomes.map((o, i) => (
              <div
                key={o.title}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <ScrollReveal variant={i % 2 === 1 ? "right" : "left"}>
                  <div className={`mx-auto ${o.ratio === "9/16" ? "max-w-[280px]" : o.ratio === "16/9" ? "max-w-[560px]" : "max-w-[360px]"}`}>
                    {o.ratio === "4/5" ? (
                      <CarouselPlayer slides={carousels.claude} label={o.title} />
                    ) : (
                      <LoopVideo src={o.video} ratio={o.ratio} />
                    )}
                  </div>
                </ScrollReveal>
                <ScrollReveal variant={i % 2 === 1 ? "left" : "right"}>
                  <o.icon className="h-6 w-6 text-[#602D37] mb-5" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#AB5961] mb-2" style={heading}>
                    Skill {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-4xl md:text-5xl text-[#232323] leading-[1.05] mb-5" style={display}>
                    {o.title}
                  </h3>
                  <p className="text-lg text-[#5A4A44] leading-relaxed max-w-md">{o.desc}</p>
                </ScrollReveal>
              </div>
            ))}

            {/* Outreach (no video) */}
            <ScrollReveal>
              <div className="bg-[#602D37] text-[#EFE2D3] p-10 md:p-14 grid md:grid-cols-[auto_1fr] gap-8 items-start">
                <Send className="h-10 w-10 text-[#ECB398]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ECB398] mb-2" style={heading}>
                    Skill 05
                  </p>
                  <h3 className="text-4xl md:text-5xl leading-[1.05] mb-5" style={display}>
                    Outreach that turns content into clients
                  </h3>
                  <p className="text-lg text-[#EFE2D3]/80 leading-relaxed max-w-2xl">
                    Content gets attention, outreach gets sales. Claude finds and researches your ideal clients, then
                    writes personalised emails, DMs and follow-ups in your voice, with your new videos and carousels as
                    proof of what you do.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 md:py-28 px-6 md:px-10 bg-[#EFE2D3] border-y border-[#D9CCBE]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-[#232323] leading-[1.05] mb-14 text-center" style={display}>
              How it works
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="stagger">
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { n: "1", t: "Get your task", d: "From 1 November, each morning a new day unlocks with one clear task and the result you should have by the end of it." },
                { n: "2", t: "Watch me do it", d: "A screen-recorded video shows exactly how I do it, every prompt and every click, so you never get stuck." },
                { n: "3", t: "Ship it", d: "Do the task, post the result. After 14 days you have a portfolio of content and a sales system that runs." },
              ].map((s) => (
                <div key={s.n} className="editorial-card p-8 h-full">
                  <span className="text-6xl leading-[1.05] text-[#ECB398] block mb-4" style={display}>
                    {s.n}
                  </span>
                  <h3 className="text-xl font-bold text-[#232323] mb-2" style={heading}>
                    {s.t}
                  </h3>
                  <p className="text-sm text-[#5A4A44] leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ CURRICULUM ============ */}
      <section id="curriculum" className="py-24 md:py-32 px-6 md:px-10 bg-[#FAF5EF] scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-3" style={heading}>
                The curriculum
              </p>
              <h2 className="text-4xl md:text-5xl text-[#232323] leading-[1.05]" style={display}>
                14 days, one task a day
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal variant="left">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="text-3xl text-[#602D37]" style={display}>
                  Week 1: Create
                </h3>
                <span className="text-xl text-[#AB5961]" style={script}>
                  build your content engine
                </span>
              </div>
              <DayList days={week1} />
            </ScrollReveal>
            <ScrollReveal variant="right">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="text-3xl text-[#602D37]" style={display}>
                  Week 2: Edit &amp; Sell
                </h3>
                <span className="text-xl text-[#AB5961]" style={script}>
                  turn it into clients
                </span>
              </div>
              <DayList days={week2} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ MORE EXAMPLES ============ */}
      <section className="py-24 md:py-28 px-6 md:px-10 bg-[#232323]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-[#EFE2D3] leading-[1.05] mb-3 text-center" style={display}>
              Made with these workflows
            </h2>
            <p className="text-2xl text-[#ECB398] text-center mb-14" style={script}>
              every one of these is a day in the course
            </p>
          </ScrollReveal>
          <ScrollReveal variant="stagger">
            <div className="grid sm:grid-cols-3 gap-6 max-w-sm sm:max-w-none mx-auto">
              <CarouselPlayer slides={carousels.pink} label="Pink New York tutorial carousel" />
              <CarouselPlayer slides={carousels.donut} label="Donut New York tutorial carousel" />
              <CarouselPlayer slides={carousels.claude} label="Claude Code editing carousel" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#EFE2D3]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <ScrollReveal variant="left" className="shrink-0">
            <Image
              src="/images/founder-photo.jpg"
              alt="Wiktoria Korbecka"
              width={320}
              height={400}
              className="polaroid w-56 md:w-72 object-cover"
            />
          </ScrollReveal>
          <ScrollReveal variant="right" className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4" style={heading}>
              Your teacher
            </p>
            <h2 className="text-4xl md:text-5xl text-[#232323] leading-[1.05] mb-6" style={display}>
              Hi, I&apos;m Wiktoria.
            </h2>
            <p className="text-lg leading-relaxed text-[#5A4A44] mb-4">
              I run Women Lead AI, host the Women Lead AI podcast and create all of my content with AI. My videos,
              carousels, podcast edits and outreach are made with the exact workflows in this course.
            </p>
            <p className="text-lg leading-relaxed text-[#5A4A44]">
              I built this bootcamp because I kept getting the same DM: &ldquo;How did you make that?&rdquo; This is the
              answer, one day at a time.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="enrol" className="py-24 md:py-32 px-6 md:px-10 bg-[#602D37] relative overflow-hidden scroll-mt-20">
        <div
          className="absolute top-0 right-0 w-[32rem] h-[32rem] opacity-10"
          style={{ background: "radial-gradient(circle, #ECB398 0%, transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#EFE2D3] leading-[1.05] mb-3" style={display}>
              Join the bootcamp
            </h2>
            <p className="text-2xl text-[#ECB398]" style={script}>
              doors close when we start on 1 November
            </p>
            <div className="mt-8 flex justify-center">
              <Countdown target={BOOTCAMP_START} tone="dark" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale">
            <div className="bg-[#FAF5EF] p-8 md:p-12 border-t-4 border-[#ECB398]">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-8 border-b border-[#D9CCBE]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-2" style={heading}>
                    Your AI Marketing Team in 14 Days
                  </p>
                  <p className="text-[#5A4A44]">Starts 1 November &middot; 14 days &middot; 14 tasks</p>
                </div>
                <p className="text-6xl md:text-7xl leading-none text-[#602D37]" style={display}>
                  ${BOOTCAMP_PRICE}
                </p>
              </div>

              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#232323] text-sm leading-relaxed">
                    <Check className="h-4 w-4 text-[#AB5961] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {hasCheckout ? (
                <div className="text-center">
                  <a
                    href={BOOTCAMP_CHECKOUT_URL}
                    className="btn-bold w-full sm:w-auto text-base px-12 py-5"
                    style={heading}
                  >
                    Enrol now for ${BOOTCAMP_PRICE}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="text-xs text-[#5A4A44] mt-4">Secure checkout with Stripe. Your place is confirmed by email straight away.</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-[#232323] font-semibold mb-4" style={heading}>
                    Enrolment opens soon. Get on the list for first access.
                  </p>
                  <WaitlistForm />
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#FAF5EF]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-[#232323] leading-[1.05] mb-12 text-center" style={display}>
              Questions
            </h2>
          </ScrollReveal>
          <div className="divide-y divide-[#D9CCBE] border-y border-[#D9CCBE]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary
                  className="flex items-center justify-between cursor-pointer list-none text-lg font-bold text-[#232323] hover:text-[#602D37] transition-colors"
                  style={heading}
                >
                  {f.q}
                  <span className="ml-4 text-2xl text-[#AB5961] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[#5A4A44] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-14">
            <EnrolButton />
          </div>
        </div>
      </section>
    </>
  );
}

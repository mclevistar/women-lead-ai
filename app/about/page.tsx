import Image from "next/image";
import { EXTERNAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, PERSON_ID } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "About Wiktoria Korbecka",
  description:
    "Wiktoria Korbecka is the founder of Women Lead AI and host of the Women Lead AI podcast, teaching professional women to use AI in their careers and businesses.",
  path: "/about",
});

const WORK = [
  {
    title: "The Women Lead AI Podcast",
    href: "/podcast",
    description:
      "Interviews with women founders, operators and experts building with AI, from startup founders who raised millions to data and leadership specialists. Every episode has show notes and a transcript.",
  },
  {
    title: "Practical AI on YouTube",
    href: "/youtube",
    description:
      "Real experiments in public: editing videos with Claude Code instead of editing software, AI history films made with image and video models, and getting a website recommended by ChatGPT.",
  },
  {
    title: "Free AI Resources",
    href: "/resources",
    description:
      "Prompt packs, cheat sheets and starter kits from each experiment, free to download, so you can copy what works instead of starting from scratch.",
  },
  {
    title: "Workshops and Keynotes",
    href: "/speaking",
    description:
      "Talks and hands-on workshops on AI for non technical leaders, closing the gender gap in AI adoption, and building with AI as a solo founder.",
  },
];

const FAQ = [
  {
    q: "Who is Wiktoria Korbecka?",
    a: "Wiktoria Korbecka is an AI educator, consultant and podcast host, and the founder of Women Lead AI. She teaches professional women and organisations how to use AI in practice, from AI video and Claude Code to AI for sales and marketing.",
  },
  {
    q: "What is Women Lead AI?",
    a: "Women Lead AI is a podcast, community and education platform that helps professional women use AI to grow their careers and businesses. It includes the Women Lead AI podcast, a free online community, YouTube tutorials, free resources and courses.",
  },
  {
    q: "Who is the Women Lead AI community for?",
    a: "Professional women, founders and freelancers who want to use AI in their work but want practical, honest guidance rather than hype. You don't need a technical background.",
  },
  {
    q: "How can I book Wiktoria to speak or get a comment for an article?",
    a: "For keynotes, panels and workshops, use the speaking page. For press, quotes and interviews, the press page has bios, photos and story angles, or email hello@womenlead.ai.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Founder */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10 md:gap-14">
            <div className="shrink-0">
              <Image
                src="/images/founder-photo-2.jpg"
                alt="Wiktoria Korbecka, founder of Women Lead AI"
                width={280}
                height={280}
                className="w-48 md:w-64 rounded-2xl"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Wiktoria Korbecka
              </h1>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m Wiktoria Korbecka, podcast host, AI educator and consultant. I started Women Lead AI because I kept seeing the same pattern: women who were capable, ambitious and smart, but holding back from AI because nobody was talking to them in a way that actually made sense.
                </p>
                <p>
                  So I built the podcast, the community, and the education platform to change that. Alongside it, I run AI workshops and consult with organisations on how to make AI practical and make it stick. If you&apos;re ready to stop watching AI from the sidelines, you&apos;re in the right place.
                </p>
              </div>
              <p className="mt-8 font-display text-xl italic text-foreground">
                Wiktoria Korbecka
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I do, so search engines and AI tools can tell who Wiktoria is */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">
            What I Do
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {WORK.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  <Link href={item.href} className="hover:text-primary transition-colors">{item.title}</Link>
                </h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions people ask */}
      <section className="py-24 px-6 border-t border-border/40">
        <JsonLd
          data={{
            "@type": "FAQPage",
            about: { "@id": PERSON_ID },
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">
            Questions People Ask
          </h2>
          <div className="space-y-8">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Women Lead AI Is */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10 text-center">
            What is Women Lead AI?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "A Podcast",
                description: "Weekly conversations with leaders, founders and experts shaping the AI era. Real talk, practical insights, no hype.",
              },
              {
                title: "A Learning Platform",
                description: "Courses and resources designed to help ambitious professionals build real AI skills and lead with confidence.",
              },
              {
                title: "A Network",
                description: "A community of builders, operators and visionaries who believe in the power of diverse perspectives in tech.",
              },
              {
                title: "A Space to Explore",
                description: "A place to ask big questions about AI, leadership, ethics and the future of work, without pretending to have all the answers.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={EXTERNAL_LINKS.skool}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Join the Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

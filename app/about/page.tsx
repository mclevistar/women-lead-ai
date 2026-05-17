import Image from "next/image";
import { EXTERNAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the founder behind Women Lead AI and learn about our mission to explore AI, leadership and the future of tech.",
};

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
                About the Founder
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

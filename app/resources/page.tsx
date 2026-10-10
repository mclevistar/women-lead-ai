import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free Claude skills, guides and tools from Women Lead AI to help you put AI to work in your business.",
};

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const resources = [
  {
    href: "/resources/ask-for-more",
    label: "Free · Claude skill",
    title: "Ask For More",
    description:
      "A negotiation coach for Claude. Price a project, reply to a brand offer, raise your rates or rehearse a money conversation before it happens.",
  },
  {
    href: "/resources/ai-hook-effects",
    label: "Free · Prompt guide",
    title: "3 AI Hook Effects",
    description:
      "Every prompt behind the pop out, paper plane and melt effects. Make your phone behave like a real object and stop the scroll.",
  },
  {
    href: "/resources/nyc-through-time",
    label: "Free · Prompt pack",
    title: "NYC Through Time",
    description:
      "Every prompt I used to walk through 143 years of New York history in one AI video, from 1883 to today.",
  },
];

export default function ResourcesPage() {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
          Resources
        </span>
        <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
          Free tools to <em className="text-[#602D37]">put AI to work</em>
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mb-14">
          Claude skills and guides you can download and use today.
        </p>

        <div className="grid gap-6">
          {resources.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group grid md:grid-cols-[1fr_auto] gap-6 items-center bg-[#602D37] text-[#EFE2D3] p-8 md:p-10 border-2 border-[#602D37] hover:-translate-y-1 transition-transform"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ECB398] mb-3 block" style={heading}>
                  {r.label}
                </span>
                <h2 className="text-3xl md:text-4xl leading-tight mb-3" style={display}>
                  {r.title}
                </h2>
                <p className="text-[#EFE2D3]/80 leading-relaxed max-w-xl">{r.description}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={heading}>
                Get it free <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-12">
          Looking for more?{" "}
          <a href={EXTERNAL_LINKS.gumroad} target="_blank" rel="noopener noreferrer" className="text-[#602D37] font-semibold underline underline-offset-4">
            See my guides on Gumroad
          </a>
          .
        </p>
      </div>
    </section>
  );
}

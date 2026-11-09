"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { resources } from "@/lib/resources";
import ResourceCover from "@/components/resource-cover";

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

// The next three resources after this one in the list (wrapping round), so every
// page links on to others and the picks don't change between visits
export default function RelatedResources() {
  const path = usePathname();
  const at = resources.findIndex((r) => r.href === path);
  const picks = [1, 2, 3].map((n) => resources[(Math.max(at, 0) + n) % resources.length]).filter((r) => r.href !== path);

  return (
    <section className="py-24 px-6 border-t border-[#602D37]/10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-foreground text-center mb-10" style={display}>
          More free resources
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {picks.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex flex-col rounded-2xl border border-[#602D37]/15 p-6 hover:border-[#602D37]/40 transition-colors"
            >
              <ResourceCover resource={r} className="aspect-[4/3] mb-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#602D37]/70 mb-3" style={heading}>
                {r.label}
              </span>
              <span className="text-xl text-foreground mb-2 leading-snug" style={display}>
                {r.title}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed flex-1">{r.description}</span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#602D37]" style={heading}>
                Get it free <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
        <p className="text-center mt-10">
          <Link href="/resources" className="text-sm font-semibold text-[#602D37] underline underline-offset-4" style={heading}>
            See all free resources
          </Link>
        </p>
      </div>
    </section>
  );
}

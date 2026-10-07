import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WaitlistForm from "./waitlist-form";
import { SPRINT_PRICE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Courses",
  description: "AI education for leaders. Practical courses on AI strategy, tools and implementation.",
};

const expectations = [
  "Practical, hands-on curriculum designed for real-world application",
  "Expert-led sessions with proven frameworks and tools",
  "A cohort-based format so you learn alongside ambitious peers",
  "Flexible scheduling designed for busy professionals",
  "Lifetime access to materials, templates and community",
];

export default function CoursesPage() {
  return (
    <>
    <section className="pt-32 md:pt-40 pb-8 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/courses/ai-marketing-sprint"
          className="group grid md:grid-cols-[1fr_auto] gap-8 items-center bg-[#602D37] text-[#EFE2D3] p-8 md:p-12 border-2 border-[#602D37] hover:-translate-y-1 transition-transform"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ECB398] mb-3 block" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
              New &middot; 2-week course &middot; ${SPRINT_PRICE}
            </span>
            <h2 className="text-5xl md:text-6xl leading-none mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
              AI Marketing Sprint
            </h2>
            <p className="text-[#EFE2D3]/80 leading-relaxed max-w-xl">
              14 days, 14 tasks, a video for every one. Make cinematic AI videos, animated carousels with Claude, short and long form edited by Claude, plus AI outreach that wins clients.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#EFE2D3]" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
            See the course <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs font-medium text-primary uppercase tracking-widest mb-4 block">Coming Soon</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
          AI Education for Leaders
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground mb-10">
          Structured, practical courses on AI strategy, tools and implementation, designed for founders and professionals who want to lead confidently in the AI era.
        </p>

        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
            The AI Leadership Accelerator
          </h2>
          <p className="text-muted-foreground mb-8">
            Our flagship programme. Be the first to know when it launches.
          </p>
          <WaitlistForm />
        </div>

        <div className="text-left max-w-lg mx-auto">
          <h3 className="font-display text-xl font-semibold text-foreground mb-4">What to Expect</h3>
          <ol className="space-y-3">
            {expectations.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="text-xs font-medium text-primary mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
    </>
  );
}

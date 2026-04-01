import type { Metadata } from "next";
import WaitlistForm from "./waitlist-form";

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
    <section className="py-24 md:py-32 px-6">
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
  );
}

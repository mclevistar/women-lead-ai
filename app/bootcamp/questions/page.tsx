import type { Metadata } from "next";
import { Suspense } from "react";
import QuestionsForm from "./questions-form";

// Linked from every bootcamp email ("Stuck or got a question? Ask me here"), so students only
export const metadata: Metadata = {
  title: "Ask a question | Your AI Marketing Team in 14 Days",
  description: "Stuck on a bootcamp day? Send Wiktoria your question.",
  robots: { index: false, follow: false },
};

export default function BootcampQuestionsPage() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-xl mx-auto">
        <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground text-center mb-3">
          Your AI Marketing Team in 14 Days
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
          Stuck? Ask me here
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-10">
          Tell me which day you&apos;re on and what happened. A screenshot description or the exact error message helps
          loads, and I&apos;ll get back to you by email 💬
        </p>

        <Suspense>
          <QuestionsForm />
        </Suspense>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import IntakeForm from "./intake-form";

// Sent to students before 1 November so the course can be set up around their business, so students only
export const metadata: Metadata = {
  title: "Before we start | Your AI Marketing Team in 14 Days",
  description: "A few quick questions before the bootcamp starts.",
  robots: { index: false, follow: false },
};

export default function BootcampBeforeWeStartPage() {
  return (
    <section className="py-16 md:py-24 px-6">
      <IntakeForm />
    </section>
  );
}

import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "B2B Services",
  description: "AI strategy, advisory, workshops and consulting for forward-thinking organisations.",
};

const services = [
  { title: "AI Advisory", description: "Strategic guidance on AI adoption, implementation and governance for leadership teams." },
  { title: "Workshops & Training", description: "Hands-on sessions to upskill your teams on AI tools, strategy and practical applications." },
  { title: "Executive AI Briefings", description: "Concise, high-impact sessions designed for board-level and C-suite audiences." },
  { title: "Leadership Training", description: "Develop AI-literate leaders who can drive transformation across your organisation." },
  { title: "Custom Programmes", description: "Tailored engagements designed around your organisation's specific challenges and goals." },
];

const steps = [
  { num: "01", title: "Discovery", description: "We learn about your organisation, challenges and goals." },
  { num: "02", title: "Proposal", description: "We design a tailored plan with clear deliverables and timelines." },
  { num: "03", title: "Deliver", description: "We execute with hands-on collaboration and practical outputs." },
  { num: "04", title: "Support", description: "Ongoing guidance to embed what you have learned and drive lasting change." },
];

export default function B2BPage() {
  return (
    <>
      {/* Header */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI Strategy for Forward-Thinking Organisations
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground mb-8">
            We help leadership teams and organisations navigate AI with confidence through advisory, workshops, keynote speaking and strategic consulting.
          </p>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">Who this is for</h3>
            <ul className="space-y-2 text-muted-foreground">
              {[
                "Leadership teams exploring AI strategy",
                "Organisations beginning their AI transformation",
                "Conferences and events seeking expert speakers",
                "Teams needing hands-on AI training",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">
            Services
          </h2>
          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.title} className="pb-6 border-b border-border/40 last:border-0">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 px-6 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">
            How We Work
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.num}>
                <span className="text-xs font-medium text-primary">{step.num}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 border-t border-border/40">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-foreground mb-8 text-center">
            Get in Touch
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

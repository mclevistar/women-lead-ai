// Shared layout for the privacy policy and terms of use
export const COMPANY = {
  name: "The Oxford Talks Ltd",
  number: "13643164",
  address: "Office 1.02 Chester House, 1-3 Brixton Road, London, SW9 6DE, United Kingdom",
};

export const LAST_UPDATED = "29 October 2026";

export default function LegalPage({ title, intro, children }: { title: string; intro: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {LAST_UPDATED}</p>
        <div className="text-lg leading-relaxed text-muted-foreground mb-12">{intro}</div>
        <div className="space-y-12">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">{title}</h2>
      <div className="space-y-4 leading-relaxed text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}

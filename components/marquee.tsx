"use client";

export default function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border/20 py-5 bg-card/50">
      <div className="marquee-track flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center mx-8 text-sm md:text-base font-medium text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-4 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

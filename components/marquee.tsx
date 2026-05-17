"use client";

export default function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden bg-[#602D37] py-4">
      <div className="marquee-track flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-6 text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-[#EFE2D3]"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            <span className="mr-5 text-[#ECB398]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export type Work = {
  slug: string;
  brand: string;
  platform: string;
  url: string;
  // tall 9:16 reel (default), wide 16:9 video, feed 4:5 post
  shape?: "tall" | "wide" | "feed";
  // a still thumbnail (eg YouTube) in place of a looping preview
  image?: string;
  title?: string;
};

const shapeClass = {
  tall: "aspect-[9/16] h-[420px] md:h-[560px]",
  wide: "aspect-video h-[300px] md:h-[440px]",
  feed: "aspect-[4/5] h-[420px] md:h-[560px]",
};

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

// Muted loop that only plays while on screen. `muted` is set before play() so autoplay rules allow it.
function Loop({ slug, className = "" }: { slug: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={`/partnerships/${slug}-loop.mp4`}
      poster={`/partnerships/${slug}.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

// Hero backdrop: columns of sponsored reels drifting up and down
export function HeroReel({ slugs }: { slugs: string[] }) {
  const columns = [
    { items: [slugs[0], slugs[3], slugs[1]], dir: "up", speed: "38s" },
    { items: [slugs[2], slugs[5], slugs[4]], dir: "down", speed: "44s" },
    { items: [slugs[4], slugs[1], slugs[3]], dir: "up", speed: "50s" },
  ];

  return (
    <div className="absolute inset-0 flex gap-3 md:gap-4 justify-end px-3 md:pr-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {columns.map((col, c) => (
        <div key={c} className={`w-1/3 md:w-[15rem] shrink-0 ${c === 2 ? "hidden sm:block" : ""}`}>
          <div className={`flex flex-col gap-3 md:gap-4 pt-reel-${col.dir}`} style={{ animationDuration: col.speed }}>
            {[...col.items, ...col.items].map((slug, i) => (
              <div key={i} className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#1c1416]">
                <Loop slug={slug} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Number that counts up once it scrolls into view
export function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1600, 1);
        setValue(to * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Bar that grows to its percentage once in view
export function Bar({ label, pct }: { label: string; pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm text-[#EFE2D3]/80 mb-2">
        <span>{label}</span>
        <span className="font-bold text-[#EFE2D3]">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#A8475A] to-[#ECB398] transition-[width] duration-[1600ms] ease-out"
          style={{ width: shown ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

// One row of sponsored videos that scrolls sideways. Each card opens the original post.
export function WorkRow({ work }: { work: Work[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  function nudge(dir: number) {
    const row = rowRef.current;
    if (row) row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={rowRef}
        className="flex items-end gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pl-6 md:pl-10 pr-6 md:pr-10 [scrollbar-width:thin] [scrollbar-color:#602D37_transparent]"
      >
        {work.map((w) => (
          <a
            key={w.slug}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative shrink-0 snap-start overflow-hidden rounded-2xl md:rounded-3xl bg-[#1c1416] max-w-[85vw] ${shapeClass[w.shape ?? "tall"]}`}
            aria-label={`Watch ${w.title ?? `the ${w.brand} video`} on ${w.platform}`}
          >
            {w.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={w.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            ) : (
              <Loop slug={w.slug} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/90" style={heading}>
              {w.platform}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-3xl md:text-4xl text-white leading-none" style={display}>{w.brand}</p>
                {w.title && <p className="mt-2 text-sm text-white/80 leading-snug line-clamp-2">{w.title}</p>}
              </div>
              <span className="shrink-0 px-4 h-10 md:h-11 rounded-full bg-[#EFE2D3] text-[#602D37] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105" style={heading}>
                Watch <span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className="hidden md:flex justify-end gap-3 pr-10 mt-4">
        {[-1, 1].map((dir) => (
          <button
            key={dir}
            onClick={() => nudge(dir)}
            className="w-12 h-12 rounded-full border border-[#EFE2D3]/30 text-[#EFE2D3] hover:bg-[#EFE2D3] hover:text-[#602D37] transition-colors"
            aria-label={dir < 0 ? "Previous videos" : "Next videos"}
          >
            {dir < 0 ? "←" : "→"}
          </button>
        ))}
      </div>
    </div>
  );
}

export type Panel = {
  id: string;
  label: string;
  source: string;
  groups: { title: string; rows: [string, number][] }[];
};

// Audience analytics with a tab per platform; bars regrow each time a tab opens
export function Analytics({ panels }: { panels: Panel[] }) {
  const [active, setActive] = useState(panels[0].id);
  const panel = panels.find((p) => p.id === active) ?? panels[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-10">
      <div className="flex flex-wrap gap-2 mb-8 md:mb-10" role="tablist" aria-label="Audience data">
        {panels.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={p.id === active}
            onClick={() => setActive(p.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${
              p.id === active ? "bg-[#EFE2D3] text-[#602D37]" : "border border-white/15 text-[#EFE2D3]/80 hover:text-[#EFE2D3] hover:border-white/40"
            }`}
            style={heading}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div key={panel.id} className="grid md:grid-cols-3 gap-10 md:gap-12" role="tabpanel">
        {panel.groups.map((g) => (
          <div key={g.title} className="space-y-5 min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ECB398]" style={heading}>{g.title}</p>
            {g.rows.map(([label, pct]) => (
              <Bar key={label} label={label} pct={pct} />
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-[#EFE2D3]/45 mt-10">{panel.source}</p>
    </div>
  );
}

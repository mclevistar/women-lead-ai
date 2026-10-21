"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

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
  // white brand logo shown above the card; `logoText` sets the brand name in type beside it
  logo?: string;
  logoText?: boolean;
};

// White platform marks in place of the "Instagram" / "LinkedIn" / "YouTube" labels
function PlatformIcon({ platform }: { platform: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", "aria-label": platform, role: "img" as const };
  if (platform === "Instagram") {
    return (
      <svg {...common} fill="none" stroke="#fff" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="#fff" stroke="none" />
      </svg>
    );
  }
  if (platform === "LinkedIn") {
    return (
      <svg {...common} fill="#fff">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="#fff">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

const shapeClass = {
  tall: "aspect-[9/16] h-[420px] md:h-[560px]",
  wide: "aspect-video h-[300px] md:h-[440px]",
  feed: "aspect-[4/5] h-[420px] md:h-[560px]",
};

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

// Muted loop that plays while on screen, or only while `active` when a row picks one video at a time.
// `muted` is set before play() so autoplay rules allow it.
function Loop({ slug, className = "", active }: { slug: string; className?: string; active?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || active === undefined) return;
    video.muted = true;
    if (active) video.play().catch(() => {});
    else video.pause();
  }, [active]);

  useEffect(() => {
    const video = ref.current;
    if (!video || active !== undefined) return;
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
  }, [active]);

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

// A video card that opens the original post in a new tab
function WorkCard({ w, className, style, active }: { w: Work; className: string; style?: React.CSSProperties; active?: boolean }) {
  const cursorRef = useRef<HTMLSpanElement>(null);

  // A small "Watch" disc follows the mouse in place of the pointer
  function moveCursor(e: React.MouseEvent<HTMLAnchorElement>) {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const box = e.currentTarget.getBoundingClientRect();
    cursor.style.transform = `translate(${e.clientX - box.left}px, ${e.clientY - box.top}px) translate(-50%, -50%)`;
  }

  return (
    <a
      href={w.url}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onMouseMove={moveCursor}
      className={`group relative shrink-0 overflow-hidden rounded-2xl md:rounded-3xl bg-[#1c1416] md:cursor-none transition-[opacity,transform] duration-500 ${
        active === false ? "opacity-45 scale-[0.96]" : "opacity-100"
      } ${className}`}
      aria-label={`Watch ${w.title ?? `the ${w.brand} video`} on ${w.platform}`}
    >
      {w.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={w.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      ) : (
        <Loop slug={w.slug} active={active} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      )}
      {!w.logo && <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
        <PlatformIcon platform={w.platform} />
      </div>
      {!w.logo && (
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <p className="text-3xl md:text-4xl text-white leading-none" style={display}>{w.brand}</p>
          {w.title && <p className="mt-2 text-sm text-white/80 leading-snug line-clamp-2">{w.title}</p>}
        </div>
      )}
      <span
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden md:flex w-[72px] h-[72px] rounded-full bg-[#EFE2D3] text-[#602D37] items-center justify-center text-[11px] font-bold uppercase tracking-wider opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-[opacity,scale] duration-200"
        style={heading}
      >
        Watch ↗
      </span>
    </a>
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
          <WorkCard key={w.slug} w={w} className={`snap-start max-w-[85vw] ${shapeClass[w.shape ?? "tall"]}`} />
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

// Past work pinned in place: scrolling down slides the row sideways, then the page carries on.
// With reduced motion it falls back to the ordinary sideways scrolling row.
export function PinnedWorkRow({ id, work, children }: { id: string; work: Work[]; children: React.ReactNode }) {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [centred, setCentred] = useState(0);
  const reduced = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED).matches, () => false);

  useEffect(() => {
    if (reduced) return;
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    let frame = 0;
    const update = () => {
      frame = 0;
      const travel = outer.offsetHeight - window.innerHeight;
      const progress = travel > 0 ? Math.min(Math.max(-outer.getBoundingClientRect().top / travel, 0), 1) : 0;
      track.style.transform = `translate3d(${-progress * (track.scrollWidth - window.innerWidth)}px, 0, 0)`;

      // Only the card nearest the middle of the screen plays
      const middle = window.innerWidth / 2;
      let best = 0;
      let bestGap = Infinity;
      Array.from(track.children).forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const gap = Math.abs(r.left + r.width / 2 - middle);
        if (gap < bestGap) {
          bestGap = gap;
          best = i;
        }
      });
      setCentred(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    update();
    const resize = new ResizeObserver(() => {
      measure();
      update();
    });
    resize.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section id={id} className="py-24 md:py-32 scroll-mt-16">
        {children}
        <WorkRow work={work} />
      </section>
    );
  }

  // Section height = one screen plus the sideways distance, so one pixel down moves the row one pixel across
  return (
    <section id={id} ref={outerRef} className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center pt-16 md:pt-20">
        {children}
        <div ref={trackRef} className="flex items-end gap-4 md:gap-6 w-max px-6 md:px-10 will-change-transform">
          {work.map((w, i) => (
            <div key={w.slug} className="shrink-0 flex flex-col gap-3 md:gap-4">
              {w.logo && (
                <div className={`flex items-center gap-2 h-7 md:h-8 transition-opacity duration-500 ${i === centred ? "opacity-100" : "opacity-45"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.logo} alt={w.logoText ? "" : w.brand} className="h-full w-auto max-w-[160px] object-contain object-left" />
                  {w.logoText && <span className="text-xl md:text-2xl font-semibold tracking-tight text-white" style={heading}>{w.brand}</span>}
                </div>
              )}
              <WorkCard
                w={w}
                active={i === centred}
                className={w.shape === "wide" ? "aspect-video" : w.shape === "feed" ? "aspect-[4/5]" : "aspect-[9/16]"}
                style={{ height: w.shape === "wide" ? "min(420px, 36svh)" : "min(560px, 48svh)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

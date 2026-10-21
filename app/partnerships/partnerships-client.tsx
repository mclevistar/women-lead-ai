"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type Work = {
  slug: string;
  brand: string;
  platform: string;
  url: string;
  landscape?: boolean;
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

// Grid of sponsored videos: silent loops, click to watch the full video with sound
export function WorkGrid({ work }: { work: Work[] }) {
  const [open, setOpen] = useState<Work | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {work.map((w) => (
          <button
            key={w.slug}
            onClick={() => setOpen(w)}
            className="group relative aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden bg-[#1c1416] text-left"
            aria-label={`Watch the ${w.brand} video`}
          >
            <Loop slug={w.slug} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/90" style={heading}>
              {w.platform}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between gap-2">
              <p className="text-2xl md:text-4xl text-white leading-none" style={display}>{w.brand}</p>
              <span className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#EFE2D3] text-[#602D37] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true"><path d="M0 0l14 8-14 8z" /></svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Portalled to body: the grid sits inside a transformed reveal wrapper, which would otherwise trap position: fixed */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${open.brand} sponsored video`}
        >
          <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <video
              src={`/partnerships/${open.slug}.mp4`}
              poster={`/partnerships/${open.slug}.jpg`}
              className={`rounded-2xl bg-black ${open.landscape ? "w-[min(92vw,960px)]" : "h-[min(80vh,860px)] max-w-[92vw]"}`}
              controls
              autoPlay
              playsInline
            />
            <div className="mt-4 flex items-center gap-6">
              <a href={open.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#EFE2D3] underline underline-offset-4">
                View the original on {open.platform}
              </a>
              <button onClick={() => setOpen(null)} className="text-sm font-semibold text-[#EFE2D3]/70 hover:text-[#EFE2D3]">
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

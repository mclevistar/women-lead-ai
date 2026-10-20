"use client";

import { useCallback, useEffect, useState } from "react";

type Preview = { src: string; name: string };

const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

export default function PagePreviews({ previews }: { previews: Preview[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + previews.length) % previews.length)),
    [previews.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {previews.map((e, i) => (
          <figure key={e.name}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View ${e.name} larger`}
              className="group relative block w-full border-2 border-[#602D37] bg-white shadow-[0_12px_40px_-12px_rgba(96,45,55,0.45)] transition-transform duration-300 hover:-translate-y-1 cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.src} alt={e.name} className="w-full aspect-[1/1.414] object-cover object-top" />
              <span
                className="absolute bottom-3 right-3 bg-[#602D37] text-[#EFE2D3] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 opacity-90 group-hover:opacity-100"
                style={heading}
              >
                Click to enlarge
              </span>
            </button>
            <figcaption className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#602D37] mt-4" style={heading}>
              {e.name}
            </figcaption>
          </figure>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previews[open].name}
          onClick={close}
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 md:p-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previews[open].src}
            alt={previews[open].name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain shadow-2xl bg-white"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-4xl leading-none w-11 h-11"
          >
            &times;
          </button>
          {previews.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous page"
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white text-5xl leading-none w-12 h-12"
              >
                &lsaquo;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next page"
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white text-5xl leading-none w-12 h-12"
              >
                &rsaquo;
              </button>
            </>
          )}
          <p
            className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-xs font-bold uppercase tracking-wider"
            style={heading}
          >
            {previews[open].name} &middot; {open + 1} / {previews.length}
          </p>
        </div>
      )}
    </>
  );
}

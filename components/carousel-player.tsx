"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_MS = 3500;

// Instagram-style 4:5 carousel that swipes through animated slides on its own.
// Only the visible slide's clip plays; the rest show their poster frame.
export default function CarouselPlayer({ slides, label }: { slides: string[]; label: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.muted = true;
      if (i === index && inView) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index, inView]);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, inView, paused, slides.length]);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden bg-[#232323] border-2 border-[#602D37] select-none"
      style={{ aspectRatio: "4/5" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <video
            key={slide}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className="w-full h-full shrink-0 object-cover"
            src={`${slide}.mp4`}
            poster={`${slide}.jpg`}
            muted
            loop
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            aria-hidden={i !== index}
          />
        ))}
      </div>

      <span className="absolute top-3 right-3 bg-black/55 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
        {index + 1}/{slides.length}
      </span>

      <button
        onClick={() => go(index - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/85 text-[#602D37] flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => go(index + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/85 text-[#602D37] flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

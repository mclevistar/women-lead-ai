"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { BOOTCAMP_PRICE, BOOTCAMP_START } from "@/lib/constants";

const BOOTCAMP_PATH = "/courses/ai-sales-marketing-bootcamp";
const DISMISS_KEY = "wla-bootcamp-popup-dismissed";
// Once closed, stay hidden for a week so it doesn't nag on every page.
const DISMISS_MS = 7 * 86_400_000;

const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };
const serif = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };

function recentlyDismissed() {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return at > 0 && Date.now() - at < DISMISS_MS;
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {}
}

export default function BootcampPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Show on load, except on the bootcamp page itself, after it has started, or if recently closed.
  useEffect(() => {
    if (pathname === BOOTCAMP_PATH) return;
    if (Date.now() >= new Date(BOOTCAMP_START).getTime()) return;
    if (recentlyDismissed()) return;
    const id = setTimeout(() => setOpen(true), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      rememberDismissal();
    };
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    rememberDismissal();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#232323]/60 backdrop-blur-sm fade-in"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bootcamp-popup-title"
        className="relative w-full max-w-3xl max-h-[calc(100vh-2rem)] overflow-y-auto bg-[#EFE2D3] text-[#232323] shadow-2xl grid md:grid-cols-[2fr_3fr] fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 p-2 bg-[#EFE2D3] text-[#602D37] hover:bg-[#602D37] hover:text-[#EFE2D3] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative hidden md:block bg-[#602D37]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/course/pink-nyc.jpg" alt="Still from the pink New York AI video" className="absolute inset-0 h-full w-full object-cover" />
          <span
            className="absolute bottom-4 left-4 bg-[#602D37] text-[#EFE2D3] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1"
            style={heading}
          >
            Made with AI
          </span>
        </div>

        <div className="p-7 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-4" style={heading}>
            New &middot; 2-week bootcamp &middot; starts 1 November
          </p>
          <h2 id="bootcamp-popup-title" className="text-4xl md:text-5xl leading-[1.05] text-[#602D37] mb-4" style={serif}>
            Your AI marketing team <em className="text-[#AB5961]">in 14 days</em>
          </h2>
          <p className="text-[#5A4A44] mb-6">
            One task a day, with a short video showing you exactly what to do. Learn to make:
          </p>
          <ul className="space-y-2 mb-8 text-sm">
            {[
              "Cinematic AI videos",
              "Animated carousels Claude designs for you",
              "Reels, TikToks and YouTube videos edited by Claude",
              "Outreach that turns content into clients",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#AB5961]">&#10022;</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={BOOTCAMP_PATH} onClick={close} className="btn-bold" style={heading}>
              See the bootcamp &middot; ${BOOTCAMP_PRICE}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={close}
              className="text-sm text-[#5A4A44] underline underline-offset-4 hover:text-[#602D37]"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

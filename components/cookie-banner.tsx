"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "wla-cookie-consent";
const OPEN_EVENT = "wla-open-cookie-settings";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

function storedChoice(): Choice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

// Tell Clarity what the visitor chose. Without a "granted" signal it runs without cookies.
function signalClarity(choice: Choice) {
  window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: choice });
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = storedChoice();
    if (choice) signalClarity(choice);
    const id = setTimeout(() => setOpen(!choice), 0);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      clearTimeout(id);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {}
    signalClarity(choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-[110] bg-[#FAF5EF] text-[#232323] border border-[#D9CCBE] shadow-2xl p-6 fade-in-up"
    >
      <p id="cookie-banner-title" className="text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-3" style={heading}>
        Cookies
      </p>
      <p className="text-sm text-[#5A4A44] mb-5">
        We use analytics cookies to see how people use the site so we can make it better. No ads, and nothing is sold.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="px-5 py-2.5 bg-[#602D37] text-[#EFE2D3] border-2 border-[#602D37] text-sm font-bold hover:bg-transparent hover:text-[#602D37] transition-colors"
          style={heading}
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="px-5 py-2.5 border-2 border-[#602D37] text-[#602D37] text-sm font-bold hover:bg-[#602D37] hover:text-[#EFE2D3] transition-colors"
          style={heading}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

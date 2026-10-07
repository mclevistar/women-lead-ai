"use client";

import { useEffect, useState } from "react";

function remaining(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    parts: [
      { label: "Days", value: Math.floor(ms / 86_400_000) },
      { label: "Hours", value: Math.floor(ms / 3_600_000) % 24 },
      { label: "Mins", value: Math.floor(ms / 60_000) % 60 },
      { label: "Secs", value: Math.floor(ms / 1000) % 60 },
    ],
  };
}

export default function Countdown({ target, tone = "light" }: { target: string; tone?: "light" | "dark" }) {
  const targetMs = new Date(target).getTime();
  // Render placeholders on the server so the static HTML doesn't bake in a stale time.
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const tick = () => setTime(remaining(targetMs));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [targetMs]);

  const box = tone === "dark" ? "bg-[#EFE2D3] text-[#602D37]" : "bg-[#602D37] text-[#EFE2D3]";
  const label = tone === "dark" ? "text-[#EFE2D3]/80" : "text-[#5A4A44]";

  if (time?.done) {
    return (
      <p className={`inline-block px-5 py-3 text-sm font-bold uppercase tracking-wider ${box}`} style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
        The bootcamp has started
      </p>
    );
  }

  return (
    <div role="timer" aria-label="Time until the bootcamp starts" className="flex gap-3">
      {(time?.parts ?? remaining(0).parts).map((p) => (
        <div key={p.label} className="text-center">
          <div
            className={`w-16 md:w-20 py-3 md:py-4 text-3xl md:text-4xl leading-none tabular-nums ${box}`}
            style={{ fontFamily: "var(--loaded-dmserif), Georgia, serif" }}
          >
            {time ? String(p.value).padStart(2, "0") : "--"}
          </div>
          <p
            className={`mt-2 text-[10px] font-bold uppercase tracking-[0.2em] ${label}`}
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            {p.label}
          </p>
        </div>
      ))}
    </div>
  );
}

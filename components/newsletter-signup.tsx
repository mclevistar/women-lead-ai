"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-24 px-6 bg-[#602D37]">
      <div className="max-w-xl mx-auto text-center">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] text-[#ECB398] mb-4"
          style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
        >
          Weekly AI Insights
        </p>
        <h2
          className="text-5xl md:text-6xl text-[#EFE2D3] mb-4 leading-none"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          Stay Ahead of AI
        </h2>
        <p
          className="text-[#EFE2D3]/70 mb-10 text-base"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          Leadership insights, curated tools and new episode alerts. No spam. Unsubscribe anytime.
        </p>
        {status === "success" ? (
          <p
            className="text-[#ECB398] font-bold text-lg"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            You&apos;re in. Welcome to the community.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-3.5 bg-[#EFE2D3]/10 border-2 border-[#EFE2D3]/30 text-[#EFE2D3] placeholder:text-[#EFE2D3]/40 focus:outline-none focus:border-[#ECB398] text-sm transition-all"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-7 py-3.5 bg-[#EFE2D3] text-[#602D37] font-bold text-sm uppercase tracking-wider border-2 border-[#EFE2D3] hover:bg-transparent hover:text-[#EFE2D3] transition-all duration-300 disabled:opacity-50"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-[#EFE2D3]/50 text-sm mt-3">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}

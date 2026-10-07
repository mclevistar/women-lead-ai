"use client";

import { useState } from "react";
import { Download } from "lucide-react";

const DOWNLOAD_URL = "/downloads/ask-for-more-skill.zip";
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

export default function DownloadForm() {
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
        body: JSON.stringify({ email, tag: "ask-for-more" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        window.location.href = DOWNLOAD_URL;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <p className="text-[#ECB398] font-bold text-lg mb-4" style={heading}>
          You&apos;re in. Your download should start now.
        </p>
        <a
          href={DOWNLOAD_URL}
          download
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#EFE2D3] text-[#602D37] font-bold text-sm uppercase tracking-wider border-2 border-[#EFE2D3] hover:bg-transparent hover:text-[#EFE2D3] transition-all duration-300"
          style={heading}
        >
          <Download className="h-4 w-4" />
          Download again
        </a>
      </div>
    );
  }

  return (
    <>
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
          style={heading}
        >
          {status === "loading" ? "Sending..." : "Get the skill"}
        </button>
      </form>
      <p className="text-[#EFE2D3]/50 text-xs mt-3 text-center">
        You&apos;ll also get my weekly AI insights. Unsubscribe anytime.
      </p>
      {status === "error" && (
        <p className="text-[#EFE2D3]/70 text-sm mt-3 text-center">Something went wrong. Please try again.</p>
      )}
    </>
  );
}

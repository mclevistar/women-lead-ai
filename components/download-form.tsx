"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { storedUtm } from "@/lib/utm";

const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

type Props = {
  downloadUrl: string;
  tag: string;
  buttonLabel: string;
  /** optional second file offered after sign up (for example a spreadsheet version) */
  extra?: { url: string; label: string };
  align?: "center" | "left";
};

export default function DownloadForm({ downloadUrl, tag, buttonLabel, extra, align = "center" }: Props) {
  const left = align === "left";
  const formId = `${tag}-form`;
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag, utm: storedUtm() }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        window.location.href = downloadUrl;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={left ? "" : "text-center"}>
        <p className="text-foreground font-semibold mb-4" style={heading}>
          You&apos;re in. Your download should start now.
        </p>
        <div className={`flex flex-col sm:flex-row items-center gap-3 ${left ? "sm:justify-start" : "justify-center"}`}>
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#602D37] text-[#EFE2D3] text-sm font-semibold hover:bg-[#4a2229] transition-colors"
            style={heading}
          >
            <Download className="h-4 w-4" />
            Download again
          </a>
          {extra && (
            <a
              href={extra.url}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#602D37]/30 text-[#602D37] text-sm font-semibold hover:bg-[#602D37] hover:text-[#EFE2D3] transition-colors"
              style={heading}
            >
              <Download className="h-4 w-4" />
              {extra.label}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        id={formId}
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 max-w-md ${left ? "" : "mx-auto"} p-1.5 rounded-full bg-white/70 border border-[#602D37]/15 shadow-[0_8px_30px_rgba(96,45,55,0.08)] focus-within:border-[#602D37]/40 transition-colors`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Your email"
          required
          className="flex-1 min-w-0 bg-transparent pl-4 pr-2 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 px-5 py-2.5 rounded-full bg-[#602D37] text-[#EFE2D3] text-sm font-semibold hover:bg-[#4a2229] transition-colors disabled:opacity-50"
          style={heading}
        >
          {status === "loading" ? "Sending..." : buttonLabel}
        </button>
      </form>
      <label className={`flex items-start gap-2 max-w-md mt-4 ${left ? "" : "mx-auto justify-center"} text-muted-foreground text-xs leading-relaxed cursor-pointer`}>
        <input
          type="checkbox"
          form={formId}
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#602D37] cursor-pointer"
        />
        <span className="text-left">
          I agree to get emails from Women Lead AI with AI tips, resources and occasional offers. Unsubscribe anytime.
        </span>
      </label>
      {status === "error" && (
        <p className={`text-[#602D37] text-sm mt-3 ${left ? "" : "text-center"}`}>Something went wrong. Please try again.</p>
      )}
    </>
  );
}

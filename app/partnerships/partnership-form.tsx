"use client";

import { useState } from "react";

export default function PartnershipForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const website = formData.get("website") as string;
    const budget = formData.get("budget") as string;
    const details = [
      website && `Website: ${website}`,
      budget && `Budget: ${budget}`,
      formData.get("message") as string,
    ].filter(Boolean).join("\n\n");

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organisation: formData.get("organisation") as string,
      eventType: formData.get("format") as string,
      eventDate: formData.get("timing") as string,
      message: details,
      type: "partnership",
      reason: "Brand Partnership",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full px-4 py-3 bg-[#FAF5EF] border-2 border-[#D9CCBE] text-[#232323] placeholder:text-[#5A4A44]/40 focus:outline-none focus:border-[#602D37] text-base md:text-sm transition-colors";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-[#602D37] mb-1.5";

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <p className="text-3xl text-[#602D37] mb-2" style={{ fontFamily: "var(--loaded-dmserif), Georgia, serif" }}>
          Thank you for reaching out!
        </p>
        <p className="text-[#5A4A44]">I&apos;ll be in touch shortly with ideas for your campaign.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Your Name</label>
          <input id="name" name="name" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Work Email</label>
          <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="organisation" className={labelClass}>Brand / Company</label>
          <input id="organisation" name="organisation" required placeholder="Acme AI" className={inputClass} />
        </div>
        <div>
          <label htmlFor="website" className={labelClass}>Website</label>
          <input id="website" name="website" placeholder="acme.ai" className={inputClass} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="format" className={labelClass}>What are you interested in?</label>
          <select id="format" name="format" className={inputClass}>
            <option value="">Select an option</option>
            <option value="Sponsored Reel / TikTok">Sponsored Reel / TikTok</option>
            <option value="Sponsored YouTube video">Sponsored YouTube video</option>
            <option value="Podcast ad read">Podcast ad read</option>
            <option value="LinkedIn post">LinkedIn post</option>
            <option value="Monthly partnership">Monthly partnership</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>Budget</label>
          <input id="budget" name="budget" placeholder="Optional" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="timing" className={labelClass}>Ideal timing</label>
        <input id="timing" name="timing" placeholder="e.g. launch on 15 November, or flexible" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Tell me about the campaign</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Your product, who you want to reach, and what a great result looks like..."
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-[#602D37] text-[#EFE2D3] text-sm font-bold uppercase tracking-wider border-2 border-[#602D37] hover:bg-transparent hover:text-[#602D37] transition-all duration-200 disabled:opacity-50"
        style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
      >
        {status === "loading" ? "Sending..." : "Send Partnership Enquiry"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">Something went wrong. Please try again or email hello@womenlead.ai.</p>
      )}
    </form>
  );
}

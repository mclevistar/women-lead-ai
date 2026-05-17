"use client";

import { useState } from "react";

export default function SpeakingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organisation: formData.get("organisation") as string,
      eventType: formData.get("eventType") as string,
      eventDate: formData.get("eventDate") as string,
      message: formData.get("message") as string,
      type: "speaking",
      reason: "Speaking Request",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full px-4 py-3 bg-[#FAF5EF] border-2 border-[#D9CCBE] text-[#232323] placeholder:text-[#5A4A44]/40 focus:outline-none focus:border-[#602D37] text-sm transition-colors";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-[#602D37] mb-1.5";

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-bold text-[#602D37] mb-2" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
          Thank you for reaching out!
        </p>
        <p className="text-[#5A4A44]">Wiktoria will be in touch shortly to discuss the opportunity.</p>
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
          <label htmlFor="email" className={labelClass}>Email Address</label>
          <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputClass} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="organisation" className={labelClass}>Organisation / Company</label>
          <input id="organisation" name="organisation" placeholder="Acme Corp" className={inputClass} />
        </div>
        <div>
          <label htmlFor="eventType" className={labelClass}>Event Type</label>
          <select id="eventType" name="eventType" className={inputClass}>
            <option value="">Select event type</option>
            <option value="conference">Conference / Summit</option>
            <option value="corporate">Corporate Event</option>
            <option value="panel">Panel Discussion</option>
            <option value="workshop">Workshop</option>
            <option value="podcast">Podcast / Media</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="eventDate" className={labelClass}>Event Date (if known)</label>
        <input id="eventDate" name="eventDate" type="text" placeholder="e.g. June 2025 or flexible" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Tell me about the opportunity</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Describe the event, audience, topic you have in mind, and anything else relevant..."
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-[#602D37] text-[#EFE2D3] text-sm font-bold uppercase tracking-wider border-2 border-[#602D37] hover:bg-transparent hover:text-[#602D37] transition-all duration-200 disabled:opacity-50"
        style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
      >
        {status === "loading" ? "Sending..." : "Submit Speaking Enquiry"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

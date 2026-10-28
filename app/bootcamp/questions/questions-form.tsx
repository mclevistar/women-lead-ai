"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { notifyEnquiry } from "@/lib/notify-enquiry";

const DAYS = ["Before we start", ...Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`), "Something else"];

// The email link sends ?day=Day 3 of 14 (or WELCOME etc. for the lead-up emails)
function dayFromLink(raw: string | null) {
  const match = raw?.match(/Day (\d+)/i);
  if (match) return `Day ${match[1]}`;
  return raw ? "Before we start" : "";
}

const field = "w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary";

export default function QuestionsForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      reason: formData.get("day") as string,
      message: formData.get("message") as string,
      type: "bootcamp",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await notifyEnquiry(res);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center text-foreground font-medium py-8">
        Got it! I&apos;ll get back to you by email as soon as I can 💌
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">First name</label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email (the one you signed up with)</label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="day" className="block text-sm font-medium text-foreground mb-1">Which day?</label>
        <select id="day" name="day" required defaultValue={dayFromLink(params.get("day"))} className={field}>
          <option value="" disabled>Choose a day</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Your question</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What were you trying to do, and what happened instead?"
          className={`${field} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send my question"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">Something went wrong. Please try again, or just reply to any of my emails.</p>
      )}
    </form>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { notifyEnquiry } from "@/lib/notify-enquiry";

// Form funnel for Vercel Analytics, Google Analytics and Clarity: started, each question reached, finished
type Win = { gtag?: (...a: unknown[]) => void; clarity?: (...a: unknown[]) => void };
function trackStep(event: string, props: Record<string, string | number> = {}) {
  try {
    track(event, props);
    const w = window as unknown as Win;
    w.gtag?.("event", event, props);
    // Clarity events carry no properties, so each question gets its own event name for the drop-off funnel
    w.clarity?.("event", props.question ? `${event}_${props.number}_${props.question}` : event);
    if (props.question) w.clarity?.("set", "intake_last_question", String(props.question));
  } catch {
    // analytics must never break the form
  }
}

// One question per screen, Typeform style: Enter moves on, letter keys pick an option
type Step =
  | { id: string; kind: "text" | "email" | "long"; q: string | ((a: Answers) => string); hint?: string; placeholder?: string; optional?: boolean }
  | { id: string; kind: "choice" | "multi"; q: string; hint?: string; options: string[] };
type Answers = Record<string, string | string[]>;

const PLAN_YES = "Yes, Pro or Max";

const STEPS: Step[] = [
  { id: "name", kind: "text", q: "First things first, what's your first name?" },
  { id: "sell", kind: "long", q: (a) => `Nice to meet you${a.name ? `, ${a.name}` : ""}! What do you sell, and who to?`, placeholder: "e.g. 1:1 coaching for new mums going back to work" },
  { id: "link", kind: "text", q: "Where can I see your business?", hint: "Your Instagram handle or website.", optional: true },
  { id: "computer", kind: "choice", q: "Which computer will you use for the course?", options: ["Mac", "Windows", "Not sure"] },
  { id: "plan", kind: "choice", q: "Do you have a paid Claude plan?", hint: "You'll need one from Day 1. Pro is enough.", options: [PLAN_YES, "Not yet", "Not sure"] },
  { id: "claude", kind: "choice", q: "Have you used Claude before?", options: ["Never", "A little", "Loads"] },
  { id: "platforms", kind: "multi", q: "Where do you post?", hint: "Choose as many as you like.", options: ["Instagram", "TikTok", "YouTube", "LinkedIn", "Facebook", "Not posting yet"] },
  { id: "editing", kind: "multi", q: "What do you use to edit your videos right now?", hint: "Choose as many as you like.", options: ["CapCut", "Canva", "iMovie", "Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "InShot", "Instagram Edits", "Something else", "I don't edit yet"] },
  { id: "goal", kind: "long", q: "What do you most want from these 14 days?" },
  { id: "worry", kind: "long", q: "Anything that might get in the way?", hint: "Time, tech nerves, anything at all. No judgement 💛", optional: true },
  { id: "email", kind: "email", q: "Last one! What's the email you signed up with?", hint: "So I can match your answers to your place on the course." },
];

const LETTERS = "ABCDEFGHIJ";

export default function IntakeForm() {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const step = STEPS[i];
  const value = answers[step.id];
  const progress = status === "success" ? 100 : started ? Math.round((i / STEPS.length) * 100) : 0;

  useEffect(() => {
    if (!started) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    inputRef.current?.focus({ preventScroll: true });
    trackStep("intake_question", { number: i + 1, question: STEPS[i].id });
  }, [i, started]);

  function set(v: string | string[]) {
    setError("");
    setAnswers((a) => ({ ...a, [step.id]: v }));
  }

  function check(): string {
    const v = answers[step.id];
    const empty = !v || (Array.isArray(v) ? v.length === 0 : !v.trim());
    if (empty && !("optional" in step && step.optional)) return step.kind === "multi" || step.kind === "choice" ? "Please choose an answer" : "Please fill this in";
    if (step.kind === "email" && !/^\S+@\S+\.\S+$/.test(String(v))) return "Hmm, that email doesn't look quite right";
    return "";
  }

  function next() {
    const problem = check();
    if (problem) return setError(problem);
    if (i === STEPS.length - 1) return submit();
    setDir(1);
    setI(i + 1);
  }

  function back() {
    if (i === 0) return;
    setError("");
    setDir(-1);
    setI(i - 1);
  }

  function pick(option: string) {
    if (step.kind === "multi") {
      const cur = (value as string[]) ?? [];
      set(cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option]);
    } else {
      set(option);
      setDir(1);
      setTimeout(() => setI((n) => (n === i ? Math.min(n + 1, STEPS.length - 1) : n)), 350);
    }
  }

  // Letter keys pick options, Enter moves on (Shift+Enter makes a new line in long answers)
  useEffect(() => {
    if (!started || status !== "idle") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        next();
        return;
      }
      if ((step.kind === "choice" || step.kind === "multi") && e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
        const n = LETTERS.indexOf(e.key.toUpperCase());
        if (n >= 0 && n < step.options.length) pick(step.options[n]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  async function submit() {
    setStatus("loading");
    const a = (k: string) => {
      const v = answers[k];
      return Array.isArray(v) ? v.join(", ") : (v ?? "").trim();
    };
    // Every answer goes into the message so it reads as one block in the notification email and in Supabase
    const lines: [string, string][] = [
      ["What they sell, and who to", a("sell")],
      ["Link", a("link") || "None given"],
      ["Computer", a("computer")],
      ["Paid Claude plan", a("plan")],
      ["Used Claude before", a("claude")],
      ["Posts on", a("platforms")],
      ["Edits videos with", a("editing")],
      ["Wants from the 14 days", a("goal")],
      ["Might get in the way", a("worry") || "Nothing said"],
    ];
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: a("name"),
          email: a("email"),
          reason: a("plan"),
          message: lines.map(([q, v]) => `${q}: ${v}`).join("\n\n"),
          answers: Object.fromEntries(lines),
          type: "bootcamp-intake",
        }),
      });
      if (!res.ok) throw new Error();
      await notifyEnquiry(res);
      trackStep("intake_completed", { plan: a("plan"), computer: a("computer") });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const question = typeof step.q === "function" ? step.q(answers) : step.q;
  const line = "w-full bg-transparent border-0 border-b-2 border-border focus:border-primary focus:outline-none text-2xl md:text-3xl text-foreground placeholder:text-muted-foreground/50 py-2 transition-colors";

  return (
    <div className="relative min-h-[70vh] flex flex-col">
      <style>{`
        @keyframes tf-up { from { opacity: 0; transform: translateY(40px) } to { opacity: 1; transform: none } }
        @keyframes tf-down { from { opacity: 0; transform: translateY(-40px) } to { opacity: 1; transform: none } }
        .tf-in { animation: tf-up .5s cubic-bezier(.2,.8,.2,1) both }
        .tf-back { animation: tf-down .5s cubic-bezier(.2,.8,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .tf-in, .tf-back { animation: none } }
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-1 bg-border/40 z-50" aria-hidden>
        <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex items-center">
        <div className="w-full max-w-2xl mx-auto">
          {!started ? (
            <div className="tf-in text-center">
              <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-4">Your AI Marketing Team in 14 Days</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-5">Before we start</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10">
                A few quick questions so I know where you&apos;re starting from and can help you properly 🙌
              </p>
              <button onClick={() => { setStarted(true); trackStep("intake_started"); }} className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-lg font-medium hover:bg-primary/90 transition-colors">
                Let&apos;s go
              </button>
              <p className="text-sm text-muted-foreground mt-4">Takes about 3 minutes</p>
            </div>
          ) : status === "success" ? (
            <div className="tf-in text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">Thank you{answers.name ? `, ${answers.name}` : ""}!! 💌</h2>
              <p className="text-lg md:text-xl text-muted-foreground">That really helps. See you on 1 November.</p>
              {answers.plan !== PLAN_YES && (
                <p className="mt-8 text-base text-foreground bg-muted/50 rounded-2xl p-5 text-left">
                  One thing before Day 1: the bootcamp needs a paid Claude plan (Pro is enough). Grab it at claude.ai
                  before we start so you&apos;re not stuck on the first morning.
                </p>
              )}
            </div>
          ) : (
            <div key={step.id} className={dir === 1 ? "tf-in" : "tf-back"}>
              <div className="flex items-start gap-3 mb-6">
                <span className="text-primary text-base md:text-lg font-medium pt-1.5 md:pt-2 shrink-0">{i + 1} →</span>
                <div>
                  <h2 className="font-display text-2xl md:text-4xl text-foreground leading-snug">
                    {question}
                    {"optional" in step && step.optional ? null : <span className="text-primary"> *</span>}
                  </h2>
                  {step.hint && <p className="text-base md:text-lg text-muted-foreground mt-2">{step.hint}</p>}
                </div>
              </div>

              <div className="md:pl-10">
                {step.kind === "text" || step.kind === "email" ? (
                  <input
                    ref={inputRef}
                    type={step.kind === "email" ? "email" : "text"}
                    value={(value as string) ?? ""}
                    onChange={(e) => set(e.target.value)}
                    placeholder={step.placeholder ?? "Type your answer here..."}
                    className={line}
                    autoComplete={step.id === "name" ? "given-name" : step.kind === "email" ? "email" : "off"}
                  />
                ) : step.kind === "long" ? (
                  <textarea
                    ref={inputRef}
                    rows={2}
                    value={(value as string) ?? ""}
                    onChange={(e) => set(e.target.value)}
                    placeholder={step.placeholder ?? "Type your answer here..."}
                    className={`${line} resize-none`}
                  />
                ) : (
                  <div className={"options" in step && step.options.length > 6 ? "grid sm:grid-cols-2 gap-2.5 max-w-xl" : "flex flex-col gap-2.5 max-w-sm"} role={step.kind === "multi" ? "group" : "radiogroup"}>
                    {("options" in step ? step.options : []).map((o, n) => {
                      const on = step.kind === "multi" ? ((value as string[]) ?? []).includes(o) : value === o;
                      return (
                        <button
                          key={o}
                          type="button"
                          role={step.kind === "multi" ? "checkbox" : "radio"}
                          aria-checked={on}
                          onClick={() => pick(o)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left text-lg transition-all ${
                            on ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background hover:bg-muted/60 text-foreground"
                          }`}
                        >
                          <span className={`w-7 h-7 shrink-0 rounded-md border text-xs font-semibold flex items-center justify-center ${on ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
                            {LETTERS[n]}
                          </span>
                          <span className="flex-1">{o}</span>
                          {on && <span className="text-primary">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}

                {error ? (
                  <p className="mt-4 inline-block text-sm text-red-700 bg-red-50 rounded-md px-3 py-1.5">{error}</p>
                ) : null}

                {step.kind !== "choice" && (
                  <div className="flex items-center gap-3 mt-6">
                    <button
                      type="button"
                      onClick={next}
                      disabled={status === "loading"}
                      className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {status === "loading" ? "Sending..." : i === STEPS.length - 1 ? "Submit" : "OK ✓"}
                    </button>
                    <span className="hidden md:inline text-xs text-muted-foreground">
                      press <strong>Enter ↵</strong>
                      {step.kind === "long" ? " · Shift + Enter for a new line" : ""}
                    </span>
                  </div>
                )}

                {status === "error" && (
                  <p className="mt-4 text-sm text-red-700">Something went wrong. Please try again, or just reply to any of my emails.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {started && status !== "success" && (
        <div className="fixed bottom-6 right-6 flex items-center gap-1 z-40">
          <button type="button" onClick={back} disabled={i === 0} aria-label="Previous question" className="w-10 h-10 rounded-l-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90">↑</button>
          <button type="button" onClick={next} aria-label="Next question" className="w-10 h-10 rounded-r-lg bg-primary text-primary-foreground hover:bg-primary/90">↓</button>
        </div>
      )}
    </div>
  );
}

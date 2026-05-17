import type { Metadata } from "next";
import Image from "next/image";
import SpeakingForm from "./speaking-form";

export const metadata: Metadata = {
  title: "Speaking",
  description: "Invite Wiktoria Korbecka to speak at your event. Keynotes, panels and workshops on AI, leadership and the future of work.",
};

const topics = [
  {
    title: "AI for Non-Technical Leaders",
    desc: "How founders and executives can adopt AI without a technical background, and why that actually gives them an edge.",
  },
  {
    title: "Women & AI: Closing the Gap",
    desc: "Why women are 25% less likely to use AI and what organisations can do to change that before the window closes.",
  },
  {
    title: "Building with AI as a Solo Founder",
    desc: "A practical look at how a single person can use AI to do the work of a full team, with real examples and tools.",
  },
  {
    title: "The Future of Work",
    desc: "What AI actually means for careers, teams and organisations over the next five years, beyond the hype.",
  },
];

export default function SpeakingPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col lg:flex-row overflow-hidden">
        {/* Left: text */}
        <div className="flex-1 flex items-center bg-[#EFE2D3] px-8 md:px-14 lg:px-20 pt-28 pb-16 lg:pt-0">
          <div className="max-w-lg w-full">
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-6"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
            >
              Keynote Speaking
            </p>
            <h1
              className="text-[5rem] md:text-[7rem] lg:text-[8rem] text-[#602D37] leading-none mb-8"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
            >
              Invite Wiktoria
              <br />
              to Speak
            </h1>
            <p
              className="text-lg text-[#5A4A44] leading-relaxed"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Wiktoria speaks at conferences, corporate events and panels on AI, leadership and the future of work. She brings real-world experience, practical insight and an honest perspective that cuts through the noise.
            </p>
          </div>
        </div>

        {/* Right: photo */}
        <div className="lg:w-[46%] relative bg-[#D9CCBE] min-h-[55vw] lg:min-h-0">
          <Image
            src="/images/speaking-photo.jpg"
            alt="Wiktoria Korbecka speaking at an event"
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 px-6 md:px-10 bg-[#FAF5EF] border-y border-[#D9CCBE]">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-4"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            Topics
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#232323] leading-none mb-12"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            What Wiktoria Speaks On
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-[#D9CCBE]">
            {topics.map((topic) => (
              <div key={topic.title} className="bg-[#FAF5EF] p-8 border-t-3 border-[#602D37]" style={{ borderTopWidth: "3px", borderTopColor: "#602D37" }}>
                <h3
                  className="text-lg font-bold text-[#232323] mb-2"
                  style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                >
                  {topic.title}
                </h3>
                <p className="text-sm text-[#5A4A44] leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-6 md:px-10 bg-[#EFE2D3]">
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#602D37] mb-4"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#232323] leading-none mb-4"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            Enquire About Booking
          </h2>
          <p
            className="text-[#5A4A44] mb-10"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Fill in the form below and Wiktoria will get back to you directly. You can also reach her at{" "}
            <a href="mailto:hello@womenlead.ai" className="text-[#602D37] font-semibold underline">
              hello@womenlead.ai
            </a>
            .
          </p>
          <SpeakingForm />
        </div>
      </section>
    </>
  );
}

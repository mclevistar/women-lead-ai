import type { Metadata } from "next";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "./download-form";

export const metadata: Metadata = {
  title: "Ask For More: the Claude skill that negotiates for you",
  description:
    "A free Claude skill for people who hate negotiating. Get the number, the exact words and a rehearsal for pricing projects, brand deals, raising rates and answering \"that's over our budget\".",
  openGraph: {
    title: "Ask For More | Women Lead AI",
    description: "A free Claude skill that helps you price, counter and rehearse money conversations.",
    url: "https://womenlead.ai/resources/ask-for-more",
  },
};

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const uses = [
  "Price a new client project",
  "Reply to a brand offer, including usage rights and exclusivity",
  "Raise your rates with existing clients",
  "Answer \"that's over our budget\" without discounting",
  "Counter a low, gifted or \"exposure\" offer",
  "Rehearse a money conversation before it happens",
];

const steps = [
  "Download the ZIP. Don't unzip it.",
  "In Claude, open Settings, then Capabilities, and turn on Code execution.",
  "Go to Customize, then Skills. Click +, choose Create skill, then Upload a skill, and pick the ZIP.",
  "Start a new chat and say \"help me negotiate\", or paste a client or brand email that mentions money.",
];

const prompts = [
  "A brand offered me £300 for a Reel. Help me reply.",
  "What should I charge for a 3 month social media project?",
  "They said it's over budget. What do I say?",
  "Practise this call with me. Play a tough haggler.",
];

export default function AskForMorePage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Claude skill
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            Ask for more, <em className="text-[#602D37]">without the awkwardness</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            A negotiation coach for Claude, built for women running businesses and creators working with brands.
            It gives you the number, the exact words and a rehearsal, so the real conversation feels like reading a
            script you already know.
          </p>
        </div>
      </section>

      <section id="download" className="py-16 md:py-20 px-6 bg-[#602D37]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-[#EFE2D3] mb-4 leading-tight" style={display}>
            Get the skill free
          </h2>
          <p className="text-[#EFE2D3]/70 mb-8">Pop in your email and the download starts straight away.</p>
          <DownloadForm />
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-5" style={heading}>
              What it helps you do
            </h2>
            <ul className="space-y-3">
              {uses.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-[#602D37] mt-1 shrink-0">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-5" style={heading}>
              Set it up in 2 minutes
            </h2>
            <ol className="space-y-3">
              {steps.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-xs font-bold text-[#602D37] mt-1 shrink-0" style={heading}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-5" style={heading}>
            Try saying
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {prompts.map((p) => (
              <p key={p} className="border-2 border-[#602D37]/20 px-5 py-4 text-foreground">
                &ldquo;{p}&rdquo;
              </p>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            It never sends anything for you. You always read the message and send it yourself.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center border-t-2 border-[#602D37]/10 pt-16">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4" style={display}>
            Want more skills like this?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join Women Lead AI, the community for women putting AI to work in their business.
          </p>
          <a href={EXTERNAL_LINKS.skool} className="btn-bold" style={heading}>
            Join the community
          </a>
        </div>
      </section>
    </>
  );
}

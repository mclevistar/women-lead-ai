import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";
import PagePreviews from "@/components/page-previews";

export const metadata: Metadata = pageMetadata({
  title: "The Claude Code cheat sheet: the other 90% of Claude, in plain English",
  description:
    "Free cheat sheet: connectors, MCP, API keys, skills, plugins, slash commands, projects, artifacts and routines explained in plain English, where each one lives in the Claude desktop app, and every prompt from my Claude Code basics video.",
  path: "/resources/claude-code-cheat-sheet",
  ogTitle: "The Claude Code cheat sheet | Women Lead AI",
  ogDescription:
    "The 9 Claude features most people never touch, where they live in the app, and the prompts to try each one today.",
  images: ["/resources/cheatsheet-cover.jpg"],
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const previews = [
  { src: "/resources/cheatsheet-page-cover.jpg", name: "The cheat sheet" },
  { src: "/resources/cheatsheet-page-connectors.jpg", name: "Connectors, MCP and API keys" },
  { src: "/resources/cheatsheet-page-commands.jpg", name: "Skills, plugins and slash commands" },
];

const inside = [
  "Connectors and MCP: plug Claude into Gmail, your calendar, Drive and the tools you already use",
  "API keys: how to keep them safe, and the one thing you should never paste into the chat",
  "Skills and plugins: teach Claude how you like things done, and where to find ready made ones",
  "The slash commands worth knowing, from /init to /rewind",
  "Projects and artifacts: one folder per area of your business, and reports you can actually look at",
  "Routines: three jobs Claude can run on a schedule while your laptop is closed",
];

const steps = [
  "Connect Gmail and your calendar, and ask for drafts first.",
  "Turn anything you do twice into a skill.",
  "Set up one routine, like a Monday morning briefing.",
];

export default function ClaudeCodeCheatSheetPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Cheat sheet
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            The Claude Code <em className="text-[#602D37]">cheat sheet</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Most people use Claude as a chat box. This is the other 90% from my Claude Code basics video, in plain
            English: what each feature is, where it lives in the Claude desktop app, and the prompts to copy and paste so
            you can try it today.
          </p>
          <div id="download" className="mt-10 scroll-mt-28 bg-[#602D37] px-6 py-8 md:px-10 md:py-10 text-center">
            <h2 className="text-3xl md:text-4xl text-[#EFE2D3] mb-3 leading-tight" style={display}>
              Get the cheat sheet free
            </h2>
            <p className="text-[#EFE2D3]/70 mb-6">Pop in your email and the PDF downloads straight away.</p>
            <DownloadForm
              downloadUrl="/downloads/claude-code-cheat-sheet.pdf"
              tag="claude-code-cheat-sheet"
              buttonLabel="Get the cheat sheet"
            />
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-14">
          <PagePreviews previews={previews} />
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-5" style={heading}>
              What&apos;s inside
            </h2>
            <ul className="space-y-3">
              {inside.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-[#602D37] mt-1 shrink-0">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-5" style={heading}>
              Start with these 3
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
            <p className="text-sm text-muted-foreground mt-6">
              You&apos;ll need the Claude desktop app. Every prompt is written for beginners, no coding needed.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center border-t-2 border-[#602D37]/10 pt-16">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4" style={display}>
            Want more guides like this?
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

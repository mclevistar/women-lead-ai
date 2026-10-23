import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EXTERNAL_LINKS } from "@/lib/constants";
import DownloadForm from "@/components/download-form";
import PagePreviews from "@/components/page-previews";

export const metadata: Metadata = pageMetadata({
  title: "The AEO audit kit: get AI to recommend your website",
  description:
    "Free audit kit: the 20 question AEO audit I ran on my own website, a template to log it, and every Claude Code prompt from my video for robots.txt, sitemaps, schema and pages AI can quote.",
  path: "/resources/aeo-audit-kit",
  ogTitle: "The AEO Audit Kit | Women Lead AI",
  ogDescription:
    "Find out if ChatGPT, Claude, Perplexity and Gemini recommend your website, then fix it with copy and paste Claude Code prompts.",
  images: ["/resources/aeo-cover.jpg"],
});

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };
const heading = { fontFamily: "'Manrope', system-ui, sans-serif" };

const previews = [
  { src: "/resources/aeo-page-cover.jpg", name: "The audit kit" },
  { src: "/resources/aeo-page-sheet.jpg", name: "The 20 question audit sheet" },
  { src: "/resources/aeo-page-prompts.jpg", name: "Every Claude Code prompt" },
];

const inside = [
  "The prompt that writes the 20 questions your audience actually asks AI",
  "How to run the audit across ChatGPT, Claude, Perplexity and Gemini so the results are honest",
  "A printable audit sheet, plus a spreadsheet that adds up your AEO score out of 80",
  "Every Claude Code prompt from the video: the SEO and AEO audit, robots.txt and sitemap fixes, schema markup, summaries and Q&A",
  "How to find the pages AI reads, and a pitch prompt for getting onto \"best of\" lists",
  "Where to measure it every month, and what not to do",
];

const steps = [
  "Run the 20 question audit before you change anything.",
  "Fix the basics with Claude Code: crawlers, sitemap, schema, clear answers.",
  "Get mentioned where AI reads, then run the audit again every month.",
];

export default function AeoAuditKitPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#602D37] mb-4 block" style={heading}>
            Free resource &middot; Audit kit
          </span>
          <h1 className="text-5xl md:text-6xl leading-[1.05] text-foreground mb-6" style={display}>
            Get AI to recommend <em className="text-[#602D37]">your website</em>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            My website came up in 5 out of 80 AI answers. After two weeks of fixes with Claude Code it came up in 43. This
            is the exact audit I used, the template to log it, and every prompt from the video, so you can run it on your
            own site this week.
          </p>
          <div id="download" className="mt-10 scroll-mt-28 bg-[#602D37] px-6 py-8 md:px-10 md:py-10 text-center">
            <h2 className="text-3xl md:text-4xl text-[#EFE2D3] mb-3 leading-tight" style={display}>
              Get the audit kit free
            </h2>
            <p className="text-[#EFE2D3]/70 mb-6">Pop in your email and the PDF downloads straight away.</p>
            <DownloadForm
              downloadUrl="/downloads/aeo-audit-kit.pdf"
              tag="aeo-audit-kit"
              buttonLabel="Get the audit kit"
              extra={{ url: "/downloads/aeo-audit-template.xlsx", label: "Download the audit spreadsheet" }}
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
              The playbook in 3 steps
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
              You&apos;ll need Claude for the questions and Claude Code for the website fixes. On Webflow, Squarespace or
              WordPress the steps are the same, you&apos;ll just click through settings instead.
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

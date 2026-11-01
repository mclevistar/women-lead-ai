import type { ReactNode } from "react";
import { REFERRAL_LINKS } from "@/lib/referral-links";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// "folk" is matched case sensitively so the everyday word "Folk" at the start of a sentence is left alone
const pattern = new RegExp(`\\b(${REFERRAL_LINKS.map((r) => escape(r.name)).join("|")})\\b`, "g");

/** Plain text with the first mention of each referral app turned into its referral link. */
export default function ReferralText({ children }: { children: string }) {
  const seen = new Set<string>();
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of children.matchAll(pattern)) {
    const link = REFERRAL_LINKS.find((r) => r.name === m[0]);
    if (!link || seen.has(link.name)) continue;
    seen.add(link.name);
    parts.push(children.slice(last, m.index));
    parts.push(
      <a
        key={m.index}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="underline underline-offset-2 decoration-[#602D37]/40 hover:text-[#602D37]"
      >
        {m[0]}
      </a>,
    );
    last = m.index! + m[0].length;
  }
  parts.push(children.slice(last));
  return <>{parts}</>;
}

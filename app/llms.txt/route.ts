import { getAllEpisodes } from "@/lib/get-episodes";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/seo";
import { EXTERNAL_LINKS, BOOTCAMP_PRICE } from "@/lib/constants";

// Plain-text summary of the site for AI tools (llmstxt.org format)
export const revalidate = 900;

export async function GET() {
  const episodes = await getAllEpisodes();
  const episodeLines = episodes
    .map((ep) => {
      const label = ep.episodeNumber ? `Ep ${ep.episodeNumber}: ` : "";
      const guest = ep.guest && ep.guest !== "Wiktoria Korbecka" ? ` with ${ep.guest}` : "";
      return `- [${label}${ep.title}${guest}](${SITE_URL}/podcast/${ep.id}): ${ep.description.slice(0, 160).trim()}`;
    })
    .join("\n");

  const body = `# Women Lead AI

> ${SITE_DESCRIPTION}

Women Lead AI is run by Wiktoria Korbecka, a podcast host, AI educator and consultant. It covers practical AI for marketing, content and video (including Claude and AI video tools), AI strategy and leadership, and building careers and companies with AI.

## Main pages
- [About Wiktoria Korbecka](${SITE_URL}/about): who runs Women Lead AI and why
- [Podcast](${SITE_URL}/podcast): interviews with women founders, operators and experts working with AI
- [Your AI Marketing Team in 14 Days](${SITE_URL}/courses/ai-sales-marketing-bootcamp): a 2-week online bootcamp ($${BOOTCAMP_PRICE}) on using AI for sales and marketing
- [Free resources](${SITE_URL}/resources): free Claude skills and AI prompt guides
- [Speaking](${SITE_URL}/speaking): keynotes, panels and workshops on AI and leadership
- [Contact](${SITE_URL}/contact)

## Podcast episodes
${episodeLines}

## Elsewhere
- YouTube: ${EXTERNAL_LINKS.youtube}
- LinkedIn: ${EXTERNAL_LINKS.linkedin}
- Community: ${EXTERNAL_LINKS.skool}
- Spotify: ${EXTERNAL_LINKS.spotify}
- Apple Podcasts: ${EXTERNAL_LINKS.applePodcasts}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

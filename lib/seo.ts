import type { Metadata } from "next";
import { EXTERNAL_LINKS } from "@/lib/constants";

// www is the primary domain (womenlead.ai redirects here)
export const SITE_URL = "https://www.womenlead.ai";
export const SITE_NAME = "Women Lead AI";

// One sentence that says what the site is. Keep this the same on LinkedIn,
// YouTube, Skool and podcast bios so AI tools can match them all up.
export const SITE_DESCRIPTION =
  "Women Lead AI is a podcast, community and education platform founded by Wiktoria Korbecka that helps professional women use AI to grow their careers and businesses.";

export const DEFAULT_OG_IMAGE = "/og-default.jpg";

export const SOCIAL_PROFILES = [
  EXTERNAL_LINKS.linkedin,
  EXTERNAL_LINKS.youtube,
  EXTERNAL_LINKS.instagram,
  EXTERNAL_LINKS.tiktok,
  EXTERNAL_LINKS.skool,
  EXTERNAL_LINKS.spotify,
  EXTERNAL_LINKS.applePodcasts,
  "https://www.wikidata.org/wiki/Q141974034",
];

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  images?: string[];
  type?: "website" | "article";
};

// Google shows about 60 characters of a title and 160 of a description
const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE = 65;
const MAX_DESCRIPTION = 160;

// Cuts long text at a word boundary so search results don't end mid-word
export function clampText(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

// Title, description, canonical URL and share card for a page
export function pageMetadata({ title, description, path, ogTitle, ogDescription, images, type = "website" }: PageMetadataInput): Metadata {
  // Long titles drop the site name rather than get cut off
  const fullTitle = title.length + TITLE_SUFFIX.length > MAX_TITLE ? { absolute: title } : title;
  return {
    title: fullTitle,
    description: clampText(description, MAX_DESCRIPTION),
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle ?? `${title} | ${SITE_NAME}`,
      description: clampText(ogDescription ?? description, 200),
      url: path,
      siteName: SITE_NAME,
      type,
      images: images ?? [DEFAULT_OG_IMAGE],
    },
    twitter: { card: "summary_large_image" },
  };
}

// Stable ids so pages can point at the same person and organisation
export const PERSON_ID = `${SITE_URL}/about#wiktoria-korbecka`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PODCAST_ID = `${SITE_URL}/podcast#series`;

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Wiktoria Korbecka",
  jobTitle: "Founder of Women Lead AI, podcast host, AI educator and consultant",
  description:
    "Wiktoria Korbecka is the founder of Women Lead AI and host of the Women Lead AI podcast. She teaches professional women and organisations how to use AI in practice through courses, workshops and keynotes.",
  image: `${SITE_URL}/images/founder-photo.jpg`,
  url: `${SITE_URL}/about`,
  worksFor: { "@id": ORGANIZATION_ID },
  knowsAbout: ["Artificial intelligence", "AI for marketing", "AI video editing", "Claude", "AI leadership", "Future of work"],
  sameAs: [
    EXTERNAL_LINKS.linkedin,
    EXTERNAL_LINKS.youtube,
    EXTERNAL_LINKS.instagram,
    EXTERNAL_LINKS.tiktok,
    "https://www.wikidata.org/wiki/Q141974031",
  ],
};

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description: SITE_DESCRIPTION,
  email: EXTERNAL_LINKS.email,
  founder: { "@id": PERSON_ID },
  sameAs: SOCIAL_PROFILES,
};

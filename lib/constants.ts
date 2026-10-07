export const EXTERNAL_LINKS = {
  skool: "https://www.skool.com/women-lead-ai-1882/about",
  youtube: "https://www.youtube.com/@WiktoriaKor",
  spotify: "https://open.spotify.com/show/6TasSwMc9QkwNmLti7Y5L6",
  applePodcasts: "https://podcasts.apple.com/us/podcast/women-lead-ai/id1876556097",
  linkedin: "https://www.linkedin.com/in/wiktoria-korbecka/",
  instagram: "https://instagram.com/wiktoriakorr",
  tiktok: "https://tiktok.com/@wiktoriakorr",
  gumroad: "https://wiktoriaoxford.gumroad.com/l/mfgtd",
  email: "hello@womenlead.ai",
} as const;

// AI for Sales and Marketing Bootcamp ($95, starts 1 November 2026, UK time).
// Paste the Stripe Payment Link (https://buy.stripe.com/...) here. While empty, the page shows a waitlist form instead.
export const BOOTCAMP_CHECKOUT_URL = "";
export const BOOTCAMP_PRICE = 95;
export const BOOTCAMP_START = "2026-11-01T00:00:00Z";

export const NAV_LINKS = [
  { href: "/podcast", label: "Podcast" },
  { href: "/youtube", label: "YouTube" },
  { href: "/courses", label: "Courses" },
  { href: "/b2b", label: "B2B" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

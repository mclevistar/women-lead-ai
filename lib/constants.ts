export const EXTERNAL_LINKS = {
  skool: "https://www.skool.com/she-leads-ai-1882",
  youtube: "https://www.youtube.com/@WiktoriaKor",
  spotify: "https://open.spotify.com/show/6TasSwMc9QkwNmLti7Y5L6",
  applePodcasts: "https://podcasts.apple.com/us/podcast/women-lead-ai/id1876556097",
  linkedin: "https://www.linkedin.com/in/wiktoria-korbecka/",
  instagram: "https://instagram.com/wiktoriakorr",
  tiktok: "https://tiktok.com/@wiktoriakorr",
  gumroad: "https://wiktoriaoxford.gumroad.com/l/mfgtd",
  email: "hello@womenlead.ai",
} as const;

// "Your AI Marketing Team in 14 Days" bootcamp ($95, expected launch 1 December 2026, UK time).
// Stripe Payment Link (served on the oxfordtalks.io custom checkout domain). Set to "" to show a waitlist form instead.
// Waiting list until launch. Live link: "https://checkout.oxfordtalks.io/b/bJeeVe9PG9EAgFX7Yyawo0v"
export const BOOTCAMP_CHECKOUT_URL = "";
export const BOOTCAMP_PRICE = 95;
export const BOOTCAMP_START = "2026-12-01T00:00:00Z";

export const NAV_LINKS = [
  { href: "/podcast", label: "Podcast" },
  { href: "/youtube", label: "YouTube" },
  { href: "/courses", label: "Courses" },
  { href: "/resources", label: "Resources" },
  { href: "/speaking", label: "Speaking" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// Google Analytics 4 Measurement ID ("G-..."). Leave "" to keep GA off.
export const GA_MEASUREMENT_ID = "G-X8YB21SDHY";

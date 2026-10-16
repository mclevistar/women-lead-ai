export interface Episode {
  id: string;
  // Old URL slug, redirected to id
  legacyId?: string;
  title: string;
  description: string;
  guest: string;
  guestBio: string;
  date: string;
  duration: string;
  topics: string[];
  showNotes: string;
  keyTakeaways: string[];
  linksMentioned: { title: string; url: string }[];
  transcript: string;
  episodeNumber: number;
  audioUrl?: string;
}

// Episodes come from the podcast RSS feed (lib/parse-rss.ts). This used to hold
// placeholder episodes, which were being published as real pages, so the fallback is empty.
export const episodes: Episode[] = [];

export const allTopics = [
  "AI Strategy",
  "AI Tools",
  "AI Ethics",
  "Leadership",
  "Startups",
  "Future of Work",
  "Product Development",
  "Career Development",
  "Executive Education",
  "Governance",
];

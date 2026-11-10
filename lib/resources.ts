// Every free resource, newest first. Used by the /resources index and the
// "More free resources" block at the bottom of each resource page.
// image: the lead magnet cover, shown as a preview on the cards (leave out for a text-only tile)
export type Resource = { href: string; label: string; title: string; description: string; image?: string };

export const resources: Resource[] = [
  {
    href: "/resources/get-paid-by-ai",
    image: "/resources/getpaidai-page-cover.jpg",
    label: "Free · Guide",
    title: "10 Ways to Get Paid by AI Companies",
    description:
      "Ten real programmes that pay you for your voice, face, footage or expertise, what each one actually pays, and the small print to read first.",
  },
  {
    href: "/resources/lead-magnet-funnel-kit",
    image: "/resources/funnelkit-page-cover.jpg",
    label: "Free · Kit",
    title: "The Lead Magnet Funnel Kit",
    description:
      "The system behind every free download on this site: page, email form, database, tracking and Instagram DMs, built with Claude Code. Every prompt to copy.",
  },
  {
    href: "/resources/story-behind-the-object",
    image: "/resources/storyobject-page-cover.jpg",
    label: "Free · Prompt pack",
    title: "The Story Behind the Object",
    description:
      "Every prompt behind my AI history film of my brother and a real 1940 banknote, with templates for your own product.",
  },
  {
    href: "/resources/motion-graphics-prompts",
    image: "/resources/mgprompts-cover.jpg",
    label: "Free · Prompt pack",
    title: "5 Motion Graphics: the prompts",
    description:
      "The Claude Code prompts behind five effects I'd steal for every video: papercut collage, travel map, blueprint, Apple style reveal and receipt.",
  },
  {
    href: "/resources/vox-collage-kit",
    image: "/resources/voxkit-cover.jpg",
    label: "Free · Prompt + setup guide",
    title: "The Vox Collage Kit",
    description:
      "The exact prompt I gave Claude Code to turn a talking-head video into a Vox-style paper collage reel, plus the five minute setup.",
  },
  {
    href: "/resources/github-animation-libraries",
    image: "/resources/animlibs-cover.jpg",
    label: "Free · Guide",
    title: "10 free GitHub libraries for animating with Claude Code",
    description:
      "The open source tools behind my reel where every frame was drawn by Claude Code, with a prompt to paste for each one.",
  },
  {
    href: "/resources/living-paintings",
    image: "/resources/livingpaint-cover.jpg",
    label: "Free · Prompt pack",
    title: "Living Paintings",
    description:
      "Every prompt I used to step inside four surreal paintings that come to life: a porcelain octopus, a Saturn swing, the moon and the zodiac.",
  },
  {
    href: "/resources/bridgerton-era",
    image: "/resources/bridgerton-cover.jpg",
    label: "Free · Prompt pack",
    title: "A Day in the Bridgerton Era",
    description:
      "Every prompt I used to spend one day as a debutante in London, 1813, from the corset to the Queen's verdict and the first waltz.",
  },
  {
    href: "/resources/ig-covers-prompt",
    image: "/resources/igcovers-page-cover.jpg",
    label: "Free · Prompt pack",
    title: "Instagram Covers with Claude",
    description:
      "The prompt, the style rules and the review page behind my consistent Instagram grid, made with Claude.",
  },
  {
    href: "/resources/claude-video-editing",
    image: "/resources/cvkit-page-cover.jpg",
    label: "Free · Starter kit",
    title: "The Claude Video Editing Starter Kit",
    description:
      "The install list, prompts, starter playbook and GitHub structure behind how I edit every YouTube video with Claude Code.",
  },
  {
    href: "/resources/time-travel-video-kit",
    image: "/resources/ttkit-cover.jpg",
    label: "Free · Kit",
    title: "The Time Travel Video Kit",
    description:
      "The workflow behind my London and Paris history reels: moments, character sheets, video prompts, the flipping calendar and how to save credits.",
  },
  {
    href: "/resources/thumbnail-prompts",
    image: "/resources/tprompts-page-cover.jpg",
    label: "Free · Prompt pack",
    title: "The Thumbnail Prompt Pack",
    description:
      "My exact character sheet and thumbnail prompts for Claude and Higgsfield, the phone test, and the 3 rules that make the biggest difference.",
  },
  {
    href: "/resources/automated-podcast-kit",
    image: "/resources/podcastkit-cover.jpg",
    label: "Free · Prompt pack",
    title: "The Automated Podcast Kit",
    description:
      "Every prompt and setup step behind Build By AI, the weekly podcast that writes, voices and publishes itself with Claude and ElevenLabs.",
  },
  {
    href: "/resources/8-tools-list",
    image: "/resources/8tools-page-cover.jpg",
    label: "Free · Tool list",
    title: "8 Tools That Aren't AI",
    description:
      "The basic marketing and sales tools most founders skip, from email tracking and heatmaps to UTM links, with every link and my setup notes.",
  },
  {
    href: "/resources/claude-code-cheat-sheet",
    image: "/resources/cheatsheet-page-cover.jpg",
    label: "Free · Cheat sheet",
    title: "The Claude Code Cheat Sheet",
    description:
      "Connectors, MCP, skills, plugins, slash commands, artifacts and routines in plain English, where each lives in the app, and every prompt from my video.",
  },
  {
    href: "/resources/paris-through-time",
    image: "/resources/paris-cover.jpg",
    label: "Free · Prompt pack",
    title: "Paris Through Time",
    description:
      "Every prompt I used to step into eight moments of Paris history in one AI video, from the Bastille in 1789 to October 2026.",
  },
  {
    href: "/resources/london-through-time",
    image: "/resources/london-cover.jpg",
    label: "Free · Prompt pack",
    title: "London Through Time",
    description:
      "Every prompt I used to step into eight moments of London history in one AI video, from Boudica in AD 60 to New Year 2026.",
  },
  {
    href: "/resources/website-starter-pack",
    image: "/resources/starter-page-cover.jpg",
    label: "Free · Starter pack",
    title: "The Website Starter Pack",
    description:
      "Every prompt and the launch checklist from my video, for building a business website with Claude Code without writing code yourself.",
  },
  {
    href: "/resources/aeo-audit-kit",
    image: "/resources/aeo-page-cover.jpg",
    label: "Free · Audit kit",
    title: "The AEO Audit Kit",
    description:
      "Find out if ChatGPT, Claude, Perplexity and Gemini recommend your website, then fix it with every Claude Code prompt from my video.",
  },
  {
    href: "/resources/startup-perks",
    image: "/resources/perks-page-cover.jpg",
    label: "Free · Tracker",
    title: "Startup Perks Tracker",
    description:
      "Every startup perk from my video in one place: what you get, who can apply and the link to apply, with a box to tick when you have.",
  },
  {
    href: "/resources/ask-for-more",
    label: "Free · Claude skill",
    title: "Ask For More",
    description:
      "A negotiation coach for Claude. Price a project, reply to a brand offer, raise your rates or rehearse a money conversation before it happens.",
  },
  {
    href: "/resources/motion-graphics-effects",
    image: "/resources/motion-map.jpg",
    label: "Free · Prompt guide",
    title: "10 Motion Graphics Effects",
    description:
      "Every prompt behind the newspaper highlight, globe and map zoom, text behind you, chat and 3D phone effects. Made with only Claude Code.",
  },
  {
    href: "/resources/ai-hook-effects",
    image: "/resources/hook-end_candy.jpg",
    label: "Free · Prompt guide",
    title: "3 AI Hook Effects",
    description:
      "Every prompt behind the pop out, paper plane and melt effects. Make your phone behave like a real object and stop the scroll.",
  },
  {
    href: "/resources/nyc-through-time",
    image: "/resources/nyc-cover.jpg",
    label: "Free · Prompt pack",
    title: "NYC Through Time",
    description:
      "Every prompt I used to walk through 143 years of New York history in one AI video, from 1883 to today.",
  },
];

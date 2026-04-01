export interface Episode {
  id: string;
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

export const episodes: Episode[] = [
  {
    id: "ai-leadership-playbook",
    title: "The AI Leadership Playbook: What Every Executive Needs to Know",
    description: "How should leaders think about AI adoption? We break down the frameworks, mindset shifts and strategic decisions that separate AI-ready organisations from the rest.",
    guest: "Dr. Sarah Chen",
    guestBio: "Former VP of Engineering at a Fortune 500 company, now advising boards on AI transformation strategy. Author of 'Leading Through Disruption'.",
    date: "2025-02-10",
    duration: "48 min",
    topics: ["Leadership", "AI Strategy", "Executive Education"],
    showNotes: "In this episode, we explore what it truly means to lead in the AI era. Dr. Sarah Chen shares her journey from engineering leadership to advising C-suite executives on AI transformation, and breaks down the key frameworks every leader needs.",
    keyTakeaways: [
      "AI adoption is a leadership challenge, not just a technology one",
      "Start with the problem, not the tool",
      "Build AI literacy across your entire leadership team",
      "Create psychological safety for experimentation"
    ],
    linksMentioned: [
      { title: "Leading Through Disruption (Book)", url: "#" },
      { title: "AI Readiness Assessment Framework", url: "#" }
    ],
    transcript: "This is a placeholder for the full episode transcript. In a production environment, this would contain the complete, timestamped transcript of the conversation.",
    episodeNumber: 12,
  },
  {
    id: "building-ai-first-companies",
    title: "Building AI-First Companies: From Zero to Scale",
    description: "What does it take to build a company with AI at its core? A candid conversation about the real challenges of building AI-native products and teams.",
    guest: "Marcus Rivera",
    guestBio: "Co-founder and CEO of an AI-native SaaS platform that scaled from 0 to 50,000 users in 18 months. Previously at Google DeepMind.",
    date: "2025-01-27",
    duration: "52 min",
    topics: ["Startups", "AI Tools", "Product Development"],
    showNotes: "Marcus Rivera shares the unfiltered story of building an AI-first company, including the technical decisions, hiring challenges and product pivots that shaped his journey.",
    keyTakeaways: [
      "AI-first means rethinking your entire product development cycle",
      "Hire for adaptability over specific AI expertise",
      "Ship fast, but invest deeply in data quality from day one",
      "Customer feedback loops are even more critical with AI products"
    ],
    linksMentioned: [
      { title: "AI Product Development Guide", url: "#" },
      { title: "The AI-First Company Playbook", url: "#" }
    ],
    transcript: "This is a placeholder for the full episode transcript.",
    episodeNumber: 11,
  },
  {
    id: "ethics-ai-governance",
    title: "Ethics, Governance and the Responsible AI Movement",
    description: "AI governance is no longer optional. We discuss practical frameworks for responsible AI, and why ethics should be a competitive advantage.",
    guest: "Prof. Amara Okafor",
    guestBio: "Professor of AI Ethics at Oxford, advisor to the EU AI Act, and founder of a responsible AI consultancy working with governments and enterprises worldwide.",
    date: "2025-01-13",
    duration: "45 min",
    topics: ["AI Ethics", "Governance", "Future of Work"],
    showNotes: "Prof. Amara Okafor brings a global perspective to the conversation around AI governance, sharing practical insights from her work advising governments and organisations on responsible AI.",
    keyTakeaways: [
      "Ethics is not a constraint, it is a design principle",
      "Start governance early, not after deployment",
      "Diverse teams build more robust AI systems",
      "Regulation is coming, get ahead of it"
    ],
    linksMentioned: [
      { title: "EU AI Act Summary", url: "#" },
      { title: "Responsible AI Framework (Download)", url: "#" }
    ],
    transcript: "This is a placeholder for the full episode transcript.",
    episodeNumber: 10,
  },
  {
    id: "from-operator-to-ai-leader",
    title: "From Operator to AI Leader: A Career Transformation Story",
    description: "How one operations leader upskilled in AI and transformed her career trajectory. A deeply personal conversation about growth, reinvention and leading change.",
    guest: "Priya Mehta",
    guestBio: "Chief Operating Officer at a high-growth fintech. Previously in traditional banking, she led her organisation's AI transformation and now champions AI literacy for non-technical leaders.",
    date: "2024-12-30",
    duration: "41 min",
    topics: ["Leadership", "Career Development", "AI Strategy"],
    showNotes: "Priya Mehta shares her personal journey from traditional operations to AI leadership, offering practical advice for professionals looking to make a similar transition.",
    keyTakeaways: [
      "You don't need a technical background to lead AI initiatives",
      "Curiosity is the most underrated leadership skill in AI",
      "Find your AI champions and build a coalition",
      "Lead the culture change, not just the technology change"
    ],
    linksMentioned: [
      { title: "AI for Non-Technical Leaders (Course)", url: "#" }
    ],
    transcript: "This is a placeholder for the full episode transcript.",
    episodeNumber: 9,
  },
  {
    id: "future-of-work-ai",
    title: "The Future of Work: How AI is Reshaping Every Industry",
    description: "From healthcare to creative industries, AI is transforming how we work. We explore what this means for professionals, teams and entire organisations.",
    guest: "James Whitfield",
    guestBio: "Future of work researcher and bestselling author. His work has been featured in Harvard Business Review, Wired and the Financial Times.",
    date: "2024-12-16",
    duration: "55 min",
    topics: ["Future of Work", "AI Tools", "Leadership"],
    showNotes: "James Whitfield shares his research on how AI is fundamentally reshaping work across industries, and what leaders need to do to prepare their organisations and teams.",
    keyTakeaways: [
      "AI will augment most roles, not replace them",
      "The biggest impact will be on knowledge work",
      "Organisations need to invest in continuous learning",
      "Soft skills become more important, not less"
    ],
    linksMentioned: [
      { title: "Future of Work Report 2025", url: "#" },
      { title: "AI Impact Assessment Tool", url: "#" }
    ],
    transcript: "This is a placeholder for the full episode transcript.",
    episodeNumber: 8,
  },
  {
    id: "ai-tools-founders",
    title: "AI Tools Every Founder Should Know in 2025",
    description: "A practical deep-dive into the AI tools and platforms that can give founders and small teams a serious competitive advantage.",
    guest: "Elena Vasquez",
    guestBio: "Serial entrepreneur and AI tools educator. Runs a community of 20,000+ founders exploring practical AI applications for business growth.",
    date: "2024-12-02",
    duration: "43 min",
    topics: ["AI Tools", "Startups", "Product Development"],
    showNotes: "Elena Vasquez walks us through her curated toolkit of AI solutions for founders, from content creation and customer support to data analysis and product development.",
    keyTakeaways: [
      "Start with one high-impact use case, not ten",
      "AI tools are only as good as your prompting strategy",
      "Build workflows, not just tool stacks",
      "The best AI tool is the one your team actually uses"
    ],
    linksMentioned: [
      { title: "Founder's AI Toolkit (Free Download)", url: "#" },
      { title: "AI Workflow Templates", url: "#" }
    ],
    transcript: "This is a placeholder for the full episode transcript.",
    episodeNumber: 7,
  },
];

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

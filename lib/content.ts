// Single source of truth for all site copy. Edit here; components read from this.

export const profile = {
  name: "Mahdi Haji",
  tagline: ["DPhil (PhD) Student in CS.", "University of Oxford."],
  location: "Tehran → Oxford",
  email: "Mata1381@gmail.com",
  cv: "/MahdiHaji_CV.pdf",
};

export type InputKind = "research" | "education" | "experience" | "interest";

export type NetInput = {
  id: string;
  label: string;
  kind: InputKind;
  value: number; // 0–1 input activation
};

// The neural-network hero: these inputs are fed forward and the bio is decoded.
export const network = {
  inputs: [
    { id: "dist", label: "Distributed Systems", kind: "research", value: 0.98 },
    { id: "rel", label: "Reliability", kind: "research", value: 0.96 },
    { id: "aiinfra", label: "AI Infrastructure", kind: "research", value: 0.9 },
    { id: "llm", label: "Deterministic LLMs", kind: "research", value: 0.86 },
    { id: "oxford", label: "Oxford · DPhil", kind: "education", value: 0.99 },
    { id: "ut", label: "UT · Bachelor", kind: "education", value: 0.9 },
    { id: "direct", label: "Direct PhD from BSc", kind: "education", value: 0.82 },
    { id: "umich", label: "Univ. of Michigan", kind: "experience", value: 0.93 },
    { id: "orderlab", label: "OrderLab", kind: "experience", value: 0.94 },
    { id: "backend", label: "Backend Eng", kind: "experience", value: 0.85 },
    { id: "fintech", label: "Fintech", kind: "experience", value: 0.76 },
    { id: "quant", label: "Quant", kind: "experience", value: 0.72 },
    { id: "volley", label: "Volleyball", kind: "interest", value: 0.77 },
    { id: "cook", label: "Persian Cooking", kind: "interest", value: 0.74 },
    { id: "saul", label: "Better Call Saul", kind: "interest", value: 1.0 },
  ] satisfies NetInput[],
  // The decoded output. `from` lists the inputs each sentence attends to (hover to trace).
  bio: [
    { text: "I’m Mahdi, a CS DPhil student at Oxford. ", from: ["oxford"], para: true },
    {
      text: "I came straight from my bachelor’s at the University of Tehran. ",
      from: ["ut", "direct"],
      para: true,
    },
    {
      text: "I work on making distributed systems and AI infrastructure reliable. ",
      from: ["dist", "rel", "aiinfra"],
      para: true,
    },
    {
      text: "Before Oxford, I did research at OrderLab (University of Michigan) and on deterministic LLMs. ",
      from: ["orderlab", "umich", "llm"],
      para: true,
    },
    {
      text: "I’ve also built backends for fintech and quant teams. ",
      from: ["backend", "fintech", "quant"],
      para: true,
    },
    { text: "Off duty: volleyball, Persian cooking, and Better Call Saul.", from: ["volley", "cook", "saul"] },
  ] as { text: string; from: string[]; para?: boolean }[],
};

export type Research = {
  logo: "oxford" | "michigan" | "tehran" | "mcgill";
  university: string;
  title: string;
  blurb: string;
};

export const research: Research[] = [
  {
    logo: "oxford",
    university: "University of Oxford · DPhil",
    title: "Reliable AI & Distributed Infrastructure",
    blurb:
      "Turning existing tests into formal protocol specifications (session types) to catch silent failures in AI and distributed systems infrastructure.",
  },
  {
    logo: "michigan",
    university: "University of Michigan · OrderLab",
    title: "Chess: Checkers from Tests",
    blurb:
      "Synthesizing runtime checkers that catch silent bugs in systems like ZooKeeper, Kafka and HBase.",
  },
  {
    logo: "tehran",
    university: "University of Tehran · Bachelor thesis",
    title: "Deterministic LLM Inference",
    blurb: "Making LLM outputs reproducible so they can be trusted in real-time systems.",
  },
  {
    logo: "mcgill",
    university: "McGill University · Research intern",
    title: "Knowledge-Graph Diagnostics",
    blurb: "Helping LLMs find the root cause of performance problems from system traces.",
  },
];

export type Work = {
  role: string;
  color: string; // monogram colour
  company: string;
  href: string;
  blurb: string;
};

export const work: Work[] = [
  {
    role: "Software Engineer",
    company: "Enigma Investing",
    color: "#a78bfa",
    href: "https://enigma.ir/",
    blurb: "Fintech and quant platform, plus a RAG agent over live stock market data.",
  },
  {
    role: "Software Engineer",
    company: "Rasta.ai",
    color: "#22d3ee",
    href: "https://rastai.ai/",
    blurb: "Backend for an adaptive e-learning platform.",
  },
  {
    role: "Data Engineer Intern",
    company: "Vasl",
    color: "#fbbf24",
    href: "#",
    blurb: "Streaming data pipelines and dashboards.",
  },
  {
    role: "Co-founder",
    company: "Bibadeal",
    color: "#f472b6",
    href: "#",
    blurb: "NLP startup turning customer feedback into strategy.",
  },
];

export const fun = {
  intro: "Life away from distributed systems: the people, plays, and shows I love.",
  image: {
    src: "/bob-and-me.jpg",
    caption: "Me & Bob Odenkirk. Yes, that Saul Goodman.",
  },
  // Featured obsession.
  feature: {
    emoji: "⚖️",
    title: "Absolute Better Call Saul fan",
    text: "I’ll defend it as the best-written show ever made. S’all good, man.",
  },
  items: [
    {
      emoji: "🏐",
      title: "Volleyball",
      text: "Professional player. I competed in the national league back in the day.",
    },
    {
      emoji: "👨🏻‍🍳",
      title: "Cooking",
      text: "Persian food especially. Nothing beats homemade tahchin.",
    },
    {
      emoji: "❤️",
      title: "Family",
      text: "A bit of a cliché, but my parents are genuinely remarkable people.",
    },
    {
      emoji: "🎵",
      title: "Friends",
      text: "My favorite partners in adventure: Ghazal, Amirali, and Setareh.",
    },
  ],
};

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "telegram" | "email";
  handle: string;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/matahho", icon: "github", handle: "matahho" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/smahdihaji", icon: "linkedin", handle: "smahdihaji" },
  { label: "X", href: "https://x.com/mahdi_haji_2003", icon: "x", handle: "@mahdi_haji_2003" },
  { label: "Telegram", href: "https://t.me/Sed_mim", icon: "telegram", handle: "@Sed_mim" },
  { label: "Email", href: "mailto:Mata1381@gmail.com", icon: "email", handle: "Mata1381@gmail.com" },
];

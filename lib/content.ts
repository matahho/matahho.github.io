// Single source of truth for all site copy. Edit here — components read from this.

export const profile = {
  name: "Mahdi Haji",
  tagline: "Reliability of Distributed Systems & AI",
  // Short hero subline, kept deliberately minimal.
  intro: "CS DPhil Student at Oxford",
  location: "Tehran → Oxford",
  email: "Mata1381@gmail.com",
  cv: "/MahdiHaji_CV.pdf",
};

export const about = {
  // 3–4 short lines, no walls of text.
  lines: [
    "I’m Mahdi — a computer engineer working at the intersection of distributed systems, AI systems, and reliability.",
    "Currently a Research Assistant at the Ordered Systems Lab (University of Michigan) with Prof. Peng Huang, building automated checkers that catch silent semantic violations in systems like ZooKeeper, Kafka, and HBase.",
    "I’m also finishing my bachelor’s thesis at the University of Tehran on deterministic LLM inference for real-time cyber-physical systems.",
  ],
  highlight: {
    label: "Incoming PhD",
    text: "University of Oxford — Reliability of Distributed Systems, Fall 2026.",
  },
  open: "Alongside my studies, I’m actively looking for internships and part-time roles where I can work on real systems — distributed infrastructure, backend, or applied AI. Open to industrial collaboration; let’s talk.",
};

export type Research = {
  title: string;
  org: string;
  blurb: string;
  tags: string[];
  link?: { label: string; href: string };
};

export const research: Research[] = [
  {
    title: "Chess — Test-Guided Program Synthesis for Distributed Checkers",
    org: "Ordered Systems Lab · University of Michigan",
    blurb:
      "Automatically synthesizing runtime checkers that detect silent semantic violations in production distributed systems.",
    tags: ["Program synthesis", "Runtime validation", "ZooKeeper · Kafka · HBase"],
    link: { label: "Published at SOSP 2026", href: "#" },
  },
  {
    title: "Deterministic LLM Inference for Real-Time CPS",
    org: "Bachelor Thesis · University of Tehran",
    blurb:
      "Defeating batch-invariance nondeterminism so language models produce reproducible, safety-compatible outputs for embedded control loops.",
    tags: ["Batch-invariance", "Reinforcement-learning shield", "Real-time CPS"],
  },
  {
    title: "Knowledge-Graph System Diagnostics",
    org: "Research Intern · McGill University",
    blurb:
      "Linking LTTng traces to a knowledge graph and RAG so LLMs can reason about performance anomalies and root causes.",
    tags: ["Observability", "RAG", "Anomaly detection"],
  },
];

export type Paper = {
  title: string;
  venue: string;
  href: string;
};

export const papers: Paper[] = [
  {
    title: "Argos: A Decentralized Federated System for Traffic-Sign Detection in CAVs",
    venue: "arXiv · presented at the Flower Event, University of Cambridge",
    href: "https://arxiv.org/abs/2508.12712",
  },
  {
    title: "Chess: Test-Guided Program Synthesis for Distributed System Checkers",
    venue: "SOSP 2026",
    href: "#",
  },
];

export type Work = {
  role: string;
  company: string;
  href: string;
  blurb: string;
  tags: string[];
};

export const work: Work[] = [
  {
    role: "Software Engineer",
    company: "Enigma Investing",
    href: "https://enigma.ir/",
    blurb:
      "Event-sourced financial platform automating NAV calculations, plus a RAG agent over live Tehran Stock Exchange data (1s → 0.3s queries).",
    tags: ["Django", "Event sourcing", "LangChain", "ChromaDB"],
  },
  {
    role: "Software Engineer",
    company: "Rasta.ai",
    href: "https://rastai.ai/",
    blurb:
      "Core backend for an adaptive e-learning platform driven by reinforcement-learning personalization.",
    tags: ["Kotlin", "Spring Boot", "Microservices", "MongoDB"],
  },
  {
    role: "Data Engineer Intern",
    company: "Vasl",
    href: "#",
    blurb:
      "Streaming pipelines and change-data-capture across MongoDB and ClickHouse, with custom Apache Superset dashboards.",
    tags: ["Apache NiFi", "ClickHouse", "CDC", "Superset"],
  },
  {
    role: "Co-founder",
    company: "Bibadeal",
    href: "#",
    blurb:
      "AI startup turning customer feedback into strategy via NLP — acquired by the Iran University of Science and Technology accelerator.",
    tags: ["NLP", "PyTorch", "Transformers", "FastAPI"],
  },
];

export const fun = {
  intro: "Life away from distributed systems — the people, plays, and shows I love.",
  image: {
    src: "/bob-and-me.jpg",
    caption: "Me & Bob Odenkirk — yes, that Saul Goodman.",
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
      text: "Professional player — I competed in the national league back in the day.",
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
      text: "My favorite partners in adventure — Ghazal, Amirali, and Setareh.",
    },
  ],
};

export type Social = { label: string; href: string };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/matahho" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/smahdihaji" },
  { label: "X", href: "https://x.com/mahdi_haji_2003" },
  { label: "Email", href: "mailto:Mata1381@gmail.com" },
];

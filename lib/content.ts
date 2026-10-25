export type IconName =
  | "github"
  | "linkedin"
  | "x"
  | "mail"
  | "leetcode"
  | "codeforces"
  | "medium"
  | "resume"
  | "blog"
  | "lastfm";

export type ConnectLink = {
  label: string;
  handle: string;
  href: string;
  icon: IconName;
};

export type Experience = {
  company: string;
  companyUrl?: string;
  role: string;
  type: string;
  period: string;
  points: string[];
  stack: string[];
};

export type Education = {
  school: string;
  schoolUrl?: string;
  degree: string;
  period: string;
};

export type Project = {
  name: string;
  blurb: string;
  insight?: string;
  href?: string;
  repo?: string;
  image?: string;
  stack: string[];
  year: string;
  mark: string;
  tone?: "foreground" | "muted" | "info" | "live";
  anim?: "blink" | "bob" | "pulse" | "scan" | "jitter";
};

export const site = {
  name: "Vraj Patel",
  username: "vrajpat3ll",
  role: "Software Developer",
  location: "India",
  email: "vrajpat3ll@gmail.com",
  url: "https://vrajpat3ll.github.io",
  title: "Vraj Patel — Software Developer",
  description:
    "Personal site and portfolio of Vraj Patel — software developer building at the intersection of systems, AI, and the web.",
  bio: "Software developer working across systems, quantitative research, and AI — taking complex things apart, then rebuilding them.",
} as const;

export const about: string[] = [
  "I'm an engineer who works across systems, quantitative research, and AI. I like taking complex things apart to see how they work, then rebuilding them.",
  "Most of what I build starts from a question. How does a network behave under load? How much does a market simulator distort what a strategy learns? How far can an autonomous agent get with a few tools? I write up a few of them as notes in the blog.",
];

export const resumeHref = "/resume.pdf";

export const connect: ConnectLink[] = [
  {
    label: "Résumé",
    handle: "PDF",
    href: resumeHref,
    icon: "resume",
  },
  {
    label: "GitHub",
    handle: "@vrajpat3ll",
    href: "https://github.com/vrajpat3ll",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "vrajpat3ll",
    href: "https://linkedin.com/in/vrajpat3ll/",
    icon: "linkedin",
  },
  {
    label: "X",
    handle: "@vrajpat3ll",
    href: "https://x.com/vrajpat3ll",
    icon: "x",
  },
  {
    label: "Email",
    handle: "vrajpat3ll@gmail.com",
    href: "mailto:vrajpat3ll@gmail.com",
    icon: "mail",
  },
  {
    label: "LeetCode",
    handle: "@vrajpat3ll",
    href: "https://leetcode.com/u/vrajpat3ll/",
    icon: "leetcode",
  },
  {
    label: "Codeforces",
    handle: "@vrajpat3ll",
    href: "https://codeforces.com/profile/vrajpat3ll",
    icon: "codeforces",
  },
  {
    label: "Last.fm",
    handle: "@vrajpat3ll",
    href: "https://last.fm/user/vrajpat3ll",
    icon: "lastfm",
  },
  {
    label: "Medium",
    handle: "vrajpat3ll",
    href: "https://medium.com/@vrajpat3ll",
    icon: "medium",
  },
];

export const nav: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
];

export const moreNav: { title: string; href: string; external?: boolean }[] = [
  { title: "Blog", href: "/blog" },
  { title: "Reading", href: "/reading" },
];

export const rolePhrases = [
  "Systems & AI",
  "Taking complex things apart",
  "CSE '26 · IIT Jammu",
];

export const experience: Experience[] = [
  {
    company: "Accenture",
    companyUrl: "https://www.accenture.com/",
    role: "AI Native Software Engineering Analyst",
    type: "Full-time",
    period: "Jul 2026 — Present",
    points: [
      "Developing full-stack applications using C#.NET and ASP.NET, owning features across application development and AI engineering, applying solid software engineering practices.",
    ],
    stack: ["Azure", "C#", ".NET", "ASP.NET", "AI Engineering"],
  },
  {
    company: "Accenture",
    companyUrl: "https://www.accenture.com/",
    role: "Advanced Application Engineering Analyst Intern",
    type: "Internship",
    period: "May 2025 — Jul 2025",
    points: [
      "Automated cloud capacity monitoring and utilization reporting across 10+ Azure subscriptions, improving visibility into infrastructure usage for operational planning.",
      "Built REST API-driven analytics and event-based reporting pipelines with real-time dashboards to improve observability of cloud resource consumption.",
      "Developed an AI-assisted infrastructure provisioning workflow combining Terraform and LLM APIs to automate deployment decisions and workflows.",
    ],
    stack: ["Azure", "Terraform", "REST APIs", "LLM APIs"],
  },
  {
    company: "Indian Institute of Technology, Jammu",
    companyUrl: "https://www.iitjammu.ac.in/",
    role: "Undergraduate Student Researcher",
    type: "Full-time",
    period: "Jan 2025 — Dec 2025",
    points: [
      "Worked under Dr. Samaresh Bera on auto-scaling and load balancing techniques for 5G core networks, primarily focusing on AMFs.",
      "Paper accepted at IEEE INDISCON 2026 in the Communication Systems & Network Technologies track.",
    ],
    stack: ["Kubernetes", "Docker", "Bash", "C", "Python"],
  },
  {
    company: "Indian Institute of Technology, Kanpur",
    companyUrl: "https://www.iitk.ac.in/",
    role: "Summer Intern",
    type: "Internship",
    period: "May 2024 — Jul 2024",
    points: [
      "Created Python scripts to calculate the fractal dimension of facial images for emotion recognition, and built graphs to show patterns between fractal dimension and emotions.",
    ],
    stack: ["Python", "Algorithms"],
  },
];

export const education: Education[] = [
  {
    school: "Indian Institute of Technology, Jammu",
    schoolUrl: "https://www.iitjammu.ac.in/",
    degree: "B.Tech · Computer Science & Engineering",
    period: "2022 — 2026",
  },
];

export const projects: Project[] = [
  {
    name: "Orion",
    blurb:
      "An autonomous coding agent with an interactive CLI for running prompts and managing tools, built around an edit-run-review loop.",
    insight:
      "A tight edit-run-review loop was more reliable than one large prompt.",
    repo: "https://github.com/vrajpat3ll/orion",
    stack: ["Python", "LLMs", "CLI"],
    year: "2026",
    mark: "OR",
    tone: "foreground",
    anim: "bob",
  },
  {
    name: "Load balancing for 5G networks",
    blurb:
      "A 5G core simulation for testing traffic-aware AMF load balancing and auto-scaling, moving UE context between instances without dropping sessions.",
    insight:
      "UE context can move between AMF instances without a session drop.",
    repo: "https://github.com/vrajpat3ll/elastic-lb",
    stack: ["C", "SCTP", "Kubernetes"],
    year: "2025",
    mark: "5G",
    tone: "info",
    anim: "scan",
  },
  {
    name: "Movie recommendation",
    blurb:
      "A content-based recommender that suggests movies and shows from synopsis, genre, cast, and director, shipped as a live Streamlit app.",
    insight:
      "Metadata alone carries enough signal to avoid a cold-start problem.",
    href: "https://movie-recs-vrajpat3ll.streamlit.app",
    repo: "https://github.com/vrajpat3ll/movie-recommendation",
    stack: ["Python", "Streamlit", "NLP"],
    year: "2026",
    mark: "MR",
    tone: "live",
    anim: "blink",
  },
  {
    name: "Dream 11 dream team predictor",
    blurb:
      "Our solution to Dream11's Next-Gen Dream Team Predictor problem statement at Inter-IIT 13.0, held at IIT Bombay.",
    insight:
      "A reproducible pipeline mattered more than model choice under time pressure.",
    repo: "https://github.com/vrajpat3ll/Dream-11-Mid-Prep",
    stack: ["Python", "Machine learning", "Data science"],
    year: "2025",
    mark: "D11",
    tone: "foreground",
    anim: "jitter",
  },
  {
    name: "Aarogya Salahkar",
    blurb:
      "A GraphRAG healthcare assistant that answers medical questions in Gujarati using a Neo4j knowledge graph, ChromaDB embeddings, and a QLoRA fine-tuned Qwen model.",
    insight:
      "Graph retrieval plus fine-tuning put grounded Q&A into Gujarati, not English.",
    repo: "https://github.com/vrajpat3ll/aarogya-salahkar",
    stack: ["Python", "GraphRAG", "QLoRA", "Neo4j"],
    year: "2026",
    mark: "AS",
    tone: "info",
    anim: "pulse",
  },
];

export const lastfm = {
  username: "vrajpat3ll",
} as const;

export const tilUrl = "https://vrajpat3ll.github.io/til";

export type Quote = {
  text: string;
  author: string;
};

export const quotes: Quote[] = [
  {
    text: "What I cannot create, I do not understand.",
    author: "Richard Feynman",
  },
  {
    text: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
  },
  {
    text: "Everyone knows that debugging is twice as hard as writing a program in the first place.",
    author: "Brian Kernighan",
  },
  {
    text: "Focus is a matter of deciding what things you're not going to do.",
    author: "John Carmack",
  },
  {
    text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    author: "Alan Turing",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "If you double the number of experiments you do per year, you're going to double your inventiveness.",
    author: "Jeff Bezos",
  },
  {
    text: "The most dangerous phrase in the language is, 'We've always done it this way.'",
    author: "Grace Hopper",
  },
  {
    text: "It's easier to ask forgiveness than it is to get permission.",
    author: "Grace Hopper",
  },
  {
    text: "The people who are crazy enough to think they can change the world are the ones who do.",
    author: "Steve Jobs",
  },
  {
    text: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
  },
  {
    text: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
    author: "Bill Gates",
  },
  {
    text: "Our industry does not respect tradition — it only respects innovation.",
    author: "Satya Nadella",
  },
  {
    text: "Make something people want.",
    author: "Paul Graham",
  },
  {
    text: "If you are not embarrassed by the first version of your product, you've launched too late.",
    author: "Reid Hoffman",
  },
  {
    text: "The Web does not just connect machines, it connects people.",
    author: "Tim Berners-Lee",
  },
  {
    text: "Failure is an option here. If things are not failing, you are not innovating enough.",
    author: "Elon Musk",
  },
];

export type IconName =
  | "github"
  | "linkedin"
  | "x"
  | "mail"
  | "leetcode"
  | "codeforces"
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
  href?: string;
  repo?: string;
  image?: string;
  stack: string[];
  year: string;
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
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
} as const;

export const about: string[] = [
  "I'm an engineer who moves between systems, quantitative research, and AI. The through-line is curiosity: I like understanding how complex things work, then rebuilding them well enough that the understanding holds up.",
  "Most of what I build starts as a question rather than a product — how a network behaves under load, how a market simulator distorts what a strategy actually learns, how far an autonomous agent can get with a small set of tools. I document the ones worth sharing in the Workbench below.",
];

export const connect: ConnectLink[] = [
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
    label: "Resume",
    handle: "PDF",
    href: "/resume.pdf",
    icon: "resume",
  },
];

export const nav: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
];

export const moreNav: { title: string; href: string; external?: boolean }[] = [
  { title: "Blogs", href: "/blog" },
];

export const rolePhrases = [
  "Software Developer",
  "CSE '26 · IIT Jammu",
  "Systems & AI",
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
      "An autonomous coding agent with an interactive CLI that runs prompts, manages tools, and automates development workflows around a tight edit-run-review loop.",
    repo: "https://github.com/vrajpat3ll/orion",
    stack: ["Python", "LLMs", "CLI"],
    year: "2026",
  },
  {
    name: "Load balancing for 5G networks",
    blurb:
      "A 5G core simulation for testing traffic-aware AMF load balancing and auto-scaling, moving UE context between instances without dropping sessions.",
    repo: "https://github.com/vrajpat3ll/elastic-lb",
    stack: ["C", "SCTP", "Kubernetes"],
    year: "2025",
  },
  {
    name: "Movie recommendation",
    blurb:
      "A content-based recommender that suggests movies and shows from synopsis, genre, cast, and director, shipped as a live Streamlit app.",
    href: "https://movie-recs-vrajpat3ll.streamlit.app",
    repo: "https://github.com/vrajpat3ll/movie-recommendation",
    stack: ["Python", "Streamlit", "NLP"],
    year: "2026",
  },
  {
    name: "Dream 11 dream team predictor",
    blurb:
      "Our solution to Dream11's Next-Gen Dream Team Predictor problem statement at Inter-IIT 13.0, held at IIT Bombay.",
    repo: "https://github.com/vrajpat3ll/Dream-11-Mid-Prep",
    stack: ["Python", "Machine learning", "Data science"],
    year: "2025",
  },
  {
    name: "Aarogya Salahkar",
    blurb:
      "A GraphRAG healthcare assistant that answers medical questions in Gujarati, grounded in a Neo4j knowledge graph, ChromaDB embeddings, and a QLoRA fine-tuned Qwen model.",
    repo: "https://github.com/vrajpat3ll/aarogya-salahkar",
    stack: ["Python", "GraphRAG", "QLoRA", "Neo4j"],
    year: "2026",
  },
];

export const lastfm = {
  username: "vrajpat3ll",
} as const;

export type Quote = {
  text: string;
  author: string;
};

export const quotes: Quote[] = [
  {
    text: "The people who are crazy enough to think they can change the world are the ones who do.",
    author: "Steve Jobs",
  },
  {
    text: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
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
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
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
    text: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "What I cannot create, I do not understand.",
    author: "Richard Feynman",
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
    text: "If you double the number of experiments you do per year, you're going to double your inventiveness.",
    author: "Jeff Bezos",
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
    text: "Focus is a matter of deciding what things you're not going to do.",
    author: "John Carmack",
  },
  {
    text: "Everyone knows that debugging is twice as hard as writing a program in the first place.",
    author: "Brian Kernighan",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
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

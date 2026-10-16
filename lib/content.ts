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
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
    handle: "in/vrajpat3ll",
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
  {
    label: "Blog",
    handle: "TIL / Notes",
    href: "https://vrajpat3ll.github.io/til",
    icon: "blog",
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

export const experience: Experience[] = [];

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
    name: "Project One",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder description to be replaced with a real project.",
    repo: "https://github.com/vrajpat3ll",
    stack: ["Next.js", "TypeScript"],
    year: "2026",
  },
  {
    name: "Project Two",
    blurb:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placeholder description to be replaced with a real project.",
    repo: "https://github.com/vrajpat3ll",
    stack: ["Python", "PyTorch"],
    year: "2025",
  },
  {
    name: "Project Three",
    blurb:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco. Placeholder description to be replaced with a real project.",
    repo: "https://github.com/vrajpat3ll",
    stack: ["Go", "Docker"],
    year: "2025",
  },
  {
    name: "Project Four",
    blurb:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse. Placeholder description to be replaced with a real project.",
    repo: "https://github.com/vrajpat3ll",
    stack: ["C++", "CMake"],
    year: "2024",
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

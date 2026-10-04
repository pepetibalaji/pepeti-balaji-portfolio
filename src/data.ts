export type Profile = {
  name: string;
  role: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  resume: string;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  github: string;
  highlights: string[];
  architecture: string;
  kind: 'commerce' | 'library';
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export type Experience = {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type Education = {
  qualification: string;
  institution: string;
  period: string;
};

export const profile: Profile = {
  name: 'Pepeti Balaji',
  role: 'Software Development Engineer in Test',
  email: 'pepetibalaji@gmail.com',
  location: 'Bengaluru, India',
  github: 'https://github.com/pepetibalaji',
  linkedin: 'https://www.linkedin.com/in/pepetibalaji/',
  resume: '/Pepeti-Balaji-Resume.pdf',
};

export const projects: Project[] = [
  {
    id: 'commerce',
    number: '01',
    title: 'Event-driven commerce platform',
    category: 'Distributed systems · Full-stack engineering',
    summary:
      'Seven business services coordinate identity, catalog, inventory, carts, orders, payments, and notifications. Built around reliable workflows, with a React and TypeScript storefront.',
    stack: ['Java 21', 'Spring Boot', 'Kafka', 'gRPC', 'PostgreSQL', 'Redis', 'MongoDB', 'React'],
    github: 'https://github.com/pepetibalaji/ecommerce-platform',
    highlights: [
      'Database-backed idempotency protects checkout from duplicate and concurrent requests.',
      'Transactional outboxes and retryable inventory compensation keep failures recoverable.',
      'Signature-verified payment webhooks enter a durable inbox before processing.',
      'Container-backed integration tests and GitHub Actions check services and the storefront.',
    ],
    architecture:
      'React storefront → API gateway → domain services · Kafka events + gRPC inventory',
    kind: 'commerce',
  },
  {
    id: 'library',
    number: '02',
    title: 'Library management system',
    category: 'Backend engineering · Testable architecture',
    summary:
      'A Java and Spring Boot application for library lending, with JWT authentication and PostgreSQL persistence. Designed around decoupled routing and explicit lending state.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'JUnit 5', 'Mockito', 'MockMvc'],
    github: 'https://github.com/pepetibalaji/Library-Management-System',
    highlights: [
      'Dynamic service registration separates routing from lending behavior.',
      'JWT authentication protects application workflows.',
      'JUnit 5, Mockito, and MockMvc cover service behavior and API integration.',
    ],
    architecture:
      'Authenticated requests → decoupled service routing → lending workflows → PostgreSQL',
    kind: 'library',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Quality engineering',
    description: 'Confidence across the browser, API, and critical user journeys.',
    skills: ['Playwright', 'TypeScript', 'JUnit 5', 'Mockito', 'MockMvc', 'axe / WCAG', 'k6'],
  },
  {
    title: 'Backend systems',
    description: 'Services designed with clear contracts and recoverable failures.',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'Kafka', 'gRPC', 'PostgreSQL', 'Redis', 'MongoDB'],
  },
  {
    title: 'Delivery & observability',
    description: 'Repeatable checks and visibility into how systems behave.',
    skills: [
      'GitHub Actions',
      'Docker',
      'Testcontainers',
      'CI/CD',
      'Prometheus',
      'Grafana',
      'OpenTelemetry',
    ],
  },
  {
    title: 'AI-assisted engineering',
    description: 'AI-supported automation, grounded in engineering judgment.',
    skills: ['OpenAI Codex', 'GitHub Copilot', 'Cursor', 'Oracle Code Assist', 'Cline'],
  },
];

export const experience: Experience[] = [
  {
    company: 'Oracle',
    title: 'QA Engineer — Test Automation & Backend Validation',
    period: 'Nov 2024 – Present',
    location: 'Bengaluru, India',
    summary:
      'Building automation for learning experiences, validating backend behavior, and helping teams ship with greater confidence.',
    highlights: [
      'Developed modular Playwright and TypeScript automation for 500+ UI, UX, and core learning workflows.',
      'Increased sprint automation throughput by 45% using AI-assisted engineering tools.',
      'Investigated flaky tests in CI to improve automation reliability.',
      'Used axe for WCAG accessibility scans and k6 to evaluate load and latency.',
    ],
  },
];

export const education: Education[] = [
  {
    qualification: 'B.Tech in Computer Science',
    institution: 'Gayathri Vidya Parishad College of Engineering, Visakhapatnam',
    period: 'Mar 2021 – May 2024',
  },
  {
    qualification: 'Diploma in Computer Engineering',
    institution: 'AANM & VVRSR Gudlavalleru Polytechnic',
    period: 'Jul 2018 – May 2021',
  },
];

export const certifications = [
  {
    title: 'OCI 2024 Certified AI Foundations Associate',
    issuer: 'Oracle',
    year: '2024',
  },
];

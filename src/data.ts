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
  capabilities: string[];
  revision: string;
  sourceLinks: { label: string; path: string }[];
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
    title: 'Pepekart commerce platform',
    category: 'Full-stack · Event-driven systems',
    summary:
      'A React shopping experience with dedicated seller and admin workspaces, backed by seven Java services. From catalog and carts to checkout, refunds, and transactional email.',
    stack: [
      'Java 21',
      'Spring Boot',
      'React 19',
      'Kafka',
      'gRPC',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Stripe',
      'Testcontainers',
      'Docker',
    ],
    github: 'https://github.com/pepetibalaji/ecommerce-platform',
    capabilities: [
      'Customer, seller & admin workspaces',
      'Stripe checkout & refund integration',
      'Durable events & inventory recovery',
    ],
    highlights: [
      'Customer shopping and checkout, seller catalog and inventory tools, and admin operations use separate React routes and role guards.',
      'PostgreSQL-backed idempotency handles repeated checkout requests. Orders reserve stock through gRPC and queue inventory releases when compensation is needed.',
      'Stripe hosted checkout and refunds connect to signature-verified webhooks, a durable inbox, duplicate detection, and retry processing.',
      'Transactional outboxes publish order and payment events through Kafka. Notifications store email intents and retry failed delivery with backoff.',
      'Testcontainers suites cover concurrent checkout, duplicate webhooks, rollback, and failure recovery. GitHub Actions configures service verification, frontend checks, and Docker builds.',
    ],
    architecture:
      'React → API Gateway → 7 business services · gRPC inventory reservations · Kafka domain events · PostgreSQL / MongoDB / Redis',
    kind: 'commerce',
    revision: '4d6d07e6c2ec073cb4939deffdebcd1257f732ae',
    sourceLinks: [
      {
        label: 'Checkout, idempotency & inventory recovery',
        path: 'order-service/src/main/java/com/ecommerce/order/service/OrderServiceImpl.java',
      },
      {
        label: 'Durable payment webhook inbox',
        path: 'payment-service/src/main/java/com/ecommerce/payment/webhook/VerifiedWebhookInbox.java',
      },
      {
        label: 'Payment reliability integration tests',
        path: 'payment-service/src/test/java/com/ecommerce/payment/service/impl/PaymentConfirmationPostgresTest.java',
      },
    ],
  },
  {
    id: 'library',
    number: '02',
    title: 'Library lending microservices',
    category: 'Backend · Spring Cloud',
    summary:
      'A Java backend for member accounts, book catalogs, and borrowing. Three domain services sit behind Spring Cloud Gateway, with Eureka discovery, OpenFeign calls, and MySQL persistence.',
    stack: [
      'Java 17',
      'Spring Boot',
      'MySQL',
      'Eureka',
      'OpenFeign',
      'Spring Cloud Gateway',
      'Spring Security',
      'JWT',
      'Spring Data JPA',
      'Maven',
    ],
    github: 'https://github.com/pepetibalaji/Library-Management-System',
    capabilities: [
      'Book catalog & member accounts',
      '14-day loans & return-date tracking',
      'Gateway routing & service discovery',
    ],
    highlights: [
      'Authentication, book catalog, and borrowing run as three Spring applications, supported by a separate gateway and Eureka service registry.',
      'Account flows use BCrypt password encoding and JWT issuance, with token validation in gateway and service filters.',
      'The borrowing service calls member and book APIs through OpenFeign, forwards the bearer token, checks stock, and requests a stock decrement.',
      'Each new loan records a 14-day due date in MySQL. APIs expose lending history by member and record return dates.',
      'Catalog endpoints support adding, retrieving, editing, and deleting books. Spring Data JPA repositories persist users, books, and borrowing records.',
    ],
    architecture:
      'Client → Spring Cloud Gateway → Auth / Book / Borrow · Eureka service discovery · OpenFeign calls via gateway · MySQL persistence',
    kind: 'library',
    revision: 'd8651cb65aa5bf3c8546612c491b5259dc14fe9b',
    sourceLinks: [
      {
        label: 'Borrowing workflow & return tracking',
        path: 'borrow/src/main/java/library/borrow/service/BorrowService.java',
      },
      {
        label: 'OpenFeign book-service integration',
        path: 'borrow/src/main/java/library/borrow/api/BookClient.java',
      },
      {
        label: 'Gateway routes & Eureka discovery',
        path: 'Gateway/src/main/resources/application.properties',
      },
    ],
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

# Portfolio content sources

Prepared on 4 October 2026. This file records the sources for the portfolio's professional claims and the limits of verification.

## Supplied resume

Source filename: `Pepeti_Balaji_SDET_Resume (1).pdf`.

The resume is the primary source for employment history, education, contact information, technical skills, and professional achievements. It describes an Oracle QA Engineer role focused on test automation and backend validation, from November 2024 to Present.

The figures **500+ workflows** and **45% improvement in AI-assisted automation throughput** are self-reported resume achievements. They were not independently audited. Keep their wording and context aligned with the resume when editing the website. They describe professional experience, not measurements of this portfolio or its sample projects.

The downloadable copy is provided as `public/Pepeti-Balaji-Resume.pdf`.

## Public GitHub profile

The [pepetibalaji GitHub profile](https://github.com/pepetibalaji) was accessible and checked. It identifies Pepeti Balaji, lists Oracle and Bangalore, and describes backend development interests including Java, Spring Boot, microservices, Kafka, Docker, Kubernetes, DevOps, and AI.

The profile pins these projects:

| Project                                                                                | Details visible on the public profile                                                                                                                                                         |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Ecommerce Platform](https://github.com/pepetibalaji/ecommerce-platform)               | An event-driven ecommerce microservices project described with Spring Boot, Kafka, Docker, Kubernetes, Redis, PostgreSQL, Elasticsearch, and AI integrations; Java is listed as its language. |
| [Library Management System](https://github.com/pepetibalaji/Library-Management-System) | A library management microservices implementation using Spring Boot; Java is listed as its language.                                                                                          |

Individual repository pages, raw README URLs, and the GitHub API could not be retrieved through public browsing during this review. The profile's descriptions establish the owner's stated project scope. They do not independently establish production readiness or measured performance.

## Local ecommerce source inspection

The existing local `ecommerce-platform` checkout provided code evidence beyond the public profile. The following implementation details were inspected during portfolio preparation:

| Local evidence                           | Supported description                                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `OrderIdempotencyService`                | Database-backed handling of concurrent idempotent order requests.                                            |
| `InventoryReleaseOutboxProcessor`        | Durable processing of inventory release compensations.                                                       |
| `PaymentWebhookServiceImpl`              | Webhook signature verification and a durable inbox.                                                          |
| `AuthOutboxPostgresKafkaIntegrationTest` | JUnit and Testcontainers integration test code covering the authentication outbox with PostgreSQL and Kafka. |
| `.github/workflows/ci.yml`               | A CI configuration with Maven verification and frontend checks.                                              |
| `monitoring/README.md`                   | Documentation of Prometheus, Grafana, Tempo, and Loki in the observability setup.                            |

These observations support descriptions of engineering choices visible in the checkout. The ecommerce services and their tests were not executed as part of building this portfolio. Test code and CI configuration are evidence that checks are implemented, not proof that they currently pass. Monitoring documentation is evidence of the documented setup, not a verified running deployment.

## LinkedIn

The [LinkedIn URL](https://www.linkedin.com/in/pepetibalaji/) came from the supplied resume. Public fetching was blocked by LinkedIn's robots policy. The URL is included as a contact link; no additional employment history, endorsements, recommendations, or other profile claims were inferred from inaccessible LinkedIn content.

## Presentation choices

- The portfolio combines the resume's SDET and quality engineering experience with the GitHub profile's backend engineering work.
- Project links point to source repositories. No live project demo URL or production deployment is claimed.
- No testimonials, client names, certifications, business impact figures, or performance measurements were invented.
- System diagrams and project illustrations are explanatory visuals, not screenshots of a deployed product.

## Deployment references

README deployment instructions were checked against [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) and [Using Monorepos](https://vercel.com/docs/monorepos) on 4 October 2026. This portfolio is a standalone repository with the application at its root and `npm run build` producing `dist`.

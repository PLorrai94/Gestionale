Claude Code CLI: Project Guard Rails
Project: Gestionale (Branch Alpha) Context: Java 17 Microservices | Angular Standalone | Oracle XE | Maven | npm

This document outlines the strictly enforced behaviors for this project.

1. General Development Rules (Non-Negotiable)
Pre-Commit Quality Gate:

MUST run tests before every commit.

MUST run linting/formatting before every commit.

Command: mvn clean verify (Backend) / npm run lint && npm test (Frontend).

Commit Hygiene:

DO use strict semantic titles: [Service-Name] Short description.

DO include a detailed body for complex changes.

DON'T use co-authored-by trailers (unless explicitly requested).

Refactoring:

NEVER perform "silent" refactoring. All refactors must be in dedicated commits/PRs.

ALWAYS document breaking changes in the relevant migration guide or PR description.

2.  Backend: Java & Spring Boot
Scope: backend/ directory Stack: Java 17, Spring Boot 3.3.1, Spring Cloud 2023.0.2, Maven 3.x

Core Java Guidelines
Language Level: Use Java 17 features strictly (Records for DTOs, Switch Expressions, Text Blocks).

Build Tool: ONLY use Maven Wrapper (./mvnw). Never use local mvn.

Boilerplate: Use Lombok @Data, @Builder, @Slf4j to reduce noise.

Logging: Use log.error("Msg", e) (SLF4J). FORBIDDEN: System.out.println or e.printStackTrace().

Spring Boot Constraints
Injection: ALWAYS use Constructor Injection. FORBIDDEN: Field injection (@Autowired on private fields).

Architecture: Follow the Controller -> Service -> Repository pattern.

Configuration: Prefer application.yml over .properties. Use strictly typed @ConfigurationProperties.

Testing:

Use @DataJpaTest for repositories.

Use @WebMvcTest for controllers (mocking services).

Avoid @SpringBootTest for unit tests (too slow).

3. Frontend: Angular
Scope: ui-angular-app/ directory Stack: Angular (Standalone Components), Node.js 18+, npm

CLI & Package Management
Package Manager: ONLY use npm.

Reason: Project lockfile is package-lock.json.

FORBIDDEN: pnpm, yarn, or bun.

Components: Use Standalone Components (standalone: true). Do not use NgModule unless strictly necessary for legacy libs.

State Management: Use Signals for local state. RxJS BehaviorSubject for shared services.

Code Style
Strict Typing: noImplicitAny is ON. No any types allowed without explicit justification.

Structure: One component per file. SCSS must be co-located with the component.

4. Database: Oracle & Flyway
Scope: Data Persistence Stack: Oracle XE (Dockerized), Flyway

Schema Management
Migrations: ALL schema changes must be done via Flyway V-scripts (e.g., V1__init.sql).

FORBIDDEN: Manually modifying the database schema (DDL) via SQL Developer/CLI.

FORBIDDEN: JPA/Hibernate ddl-auto: update in Production/Collaudo.

Naming: Tables must use SNAKE_CASE. Primary keys should be UUID or Sequence.

Data Integrity: Foreign keys are mandatory for all relationships.

5. Infrastructure (Docker)
Scope: Local Development & Deployment

Containers: Services must be stateless.

Networking: Use the defined Docker Network gestionale_network.

Configuration: All secrets (DB passwords, API keys) must be injected via Environment Variables, never hardcoded in Dockerfile.

6. Session Startup & Project Context
At the start of every work session, Claude Code MUST read these 4 files before making any changes:

1. `PROJECT_STATUS.md` — Current state of all services, infrastructure, and security.
2. `FUTURE_TASK.md` — Backlog of planned features and improvements.
3. `CHANGELOG.md` — History of all changes made to the project.
4. `claude_code.md` — This file. Behavioral rules and constraints.

7. Changelog Management
File: `CHANGELOG.md`

WHEN to update: Every time a task is started or completed during a session.

WHAT to write:
- **Date** and a short title for the work session.
- **What** — Describe the changes made (bullet points or numbered steps).
- **Why** — Explain the motivation or problem being solved.
- **Files** — List all files created, modified, or deleted.

WHY: The changelog is the single source of truth for understanding what happened across sessions. It prevents information loss, avoids duplicating work, and gives context to anyone (human or AI) picking up the project later.

Rules:
- Write entries as you work, not only at the end. If a step fails or changes direction, log that too.
- Keep entries concise but specific — enough detail to reconstruct the reasoning.
- Group related changes under a single session heading.
- Use the existing format (## Date — Title, ### What, ### Why, ### Changes, ### Files).
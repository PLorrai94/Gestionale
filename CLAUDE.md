# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gestionale is a microservices-based ERP platform built as a portfolio project. It uses Java Spring Boot backends, an Angular 20 frontend, Oracle Database, and Docker for orchestration. All services communicate via REST through a Spring Cloud Gateway, with Netflix Eureka for service discovery.

## Architecture

**Service topology (all register with Eureka):**

| Service | Port | Role |
|---|---|---|
| eureka-server | 8761 | Service discovery registry |
| api-gateway | 8080 | Single entry point, routes `/api/auth/**`, `/api/management/**`, `/api/batch/**` |
| security-service | 8081 | JWT auth (HS256, 1h expiry), user registration, role management, account lockout |
| management-service | 8082 | CRUD for Customers, Products, Orders, Order Items |
| batch-service | 8083 | Spring Batch — processes pending orders (manual trigger) |
| ui-angular-app | 4200 (dev) / 80 (prod) | Angular 20 standalone-component SPA |

**Database:** Oracle Free 23 (`FREEPDB1`). Schema owned by `GESTIONALE_OWNER`, with per-service DML users (`security_user`, `MANAGEMENT_USER`, `BATCH_USER`). Migrations managed by Flyway (15 versions in `security-service/src/main/resources/db/migration/`).

**Request flow:** Browser → nginx (prod) or proxy.conf.json (dev) → api-gateway:8080 → target service via Eureka. The gateway strips the `/api` prefix before forwarding.

## Tech Stack

- **Backend:** Java 17, Spring Boot 3.3.1, Spring Cloud 2023.0.2, Spring Security, Spring Batch
- **Frontend:** Angular 20.1, TypeScript 5.8, RxJS 7.8, Karma/Jasmine for tests
- **Database:** Oracle, Flyway migrations, Hibernate (validate mode — DDL via Flyway only)
- **Auth:** JWT (jjwt 0.11.5), BCrypt passwords, role-based (USER, ADMIN)
- **Infra:** Docker, Docker Compose (two-file strategy), nginx for prod SPA serving

## Build & Run Commands

### Full stack deployment (Docker)
```bash
cp .env.example .env           # first time — fill in real credentials
./deploy.sh --init-db          # first time — bootstrap Oracle DB
./deploy.sh                    # build all + deploy (default)
./deploy.sh --skip-angular     # rebuild Java services only
./deploy.sh --skip-maven       # rebuild Angular + Docker only
./deploy.sh --up               # start containers without rebuilding
./deploy.sh --down             # stop app services (DB stays running)
./deploy.sh --logs             # tail all service logs
./deploy.sh --status           # show running containers
```

### Build a single Java service
```bash
cd <service-dir>
./mvnw clean package -DskipTests
```

### Angular frontend
```bash
cd ui-angular-app
npm install
npm start                      # dev server on :4200, proxies /api to :8080
npm run build                  # production build
npm test                       # Karma + Jasmine tests
```

### Java tests
```bash
cd <service-dir>
./mvnw test
```

## Project Layout

Each Java service follows the same package structure under `com.PierLorrai.Gestionale`:
```
config/        — Security, JWT, CORS, database config
controller/    — REST endpoints
dto/           — Request/response DTOs
exception/     — Custom exceptions + GlobalExceptionHandler
model/         — JPA entities
repository/    — Spring Data JPA repositories
service/       — Business logic
```

The Angular app uses standalone components with lazy-loaded routes (`app.routes.ts`). Core services live in `src/app/core/services/`, page components in `src/app/pages/`, shared UI in `src/app/shared/`.

## Docker Compose Strategy

Two compose files, both require a `.env` file (copy from `.env.example`):
- **docker-compose-db.yml** — Oracle DB (run once, persistent volume `oracle-data`)
- **docker-compose-myapp.yml** — All application services (rebuilt frequently)

Both share the external `gestionale_network` bridge network. The `deploy.sh` script orchestrates both.

## Environment Variables

All secrets are in `.env` (gitignored). Key variables: `ORACLE_PASSWORD`, `GESTIONALE_OWNER_PASSWORD`, `SECURITY_DB_PASSWORD`, `MANAGEMENT_DB_PASSWORD`, `BATCH_DB_PASSWORD`, `JWT_SECRET_KEY`. See `.env.example` for the full list.

## Key Conventions

- Package path is `com.PierLorrai.Gestionale` (note: capital P in PierLorrai)
- Flyway migrations are numbered `V1__` through `V15__` and live in `security-service/src/main/resources/db/migration/`
- Hibernate is set to `validate` — never `update` or `create`. All DDL goes through Flyway.
- Angular components are standalone (no NgModules). Routes use `loadComponent` with dynamic imports.
- The API gateway strips one path segment: frontend calls `/api/auth/login`, gateway forwards to security-service at `/auth/login`.

---

## Development Rules

### Pre-Commit Quality Gate

- MUST run tests before every commit.
- MUST run linting/formatting before every commit.
- Commands: `mvn clean verify` (Backend) / `npm run lint && npm test` (Frontend).

### Commit Hygiene

- DO use strict semantic titles: `[Service-Name] Short description`.
- DO include a detailed body for complex changes.

### Refactoring

- NEVER perform "silent" refactoring. All refactors must be in dedicated commits/PRs.
- ALWAYS document breaking changes in the relevant migration guide or PR description.

## Java & Spring Boot Rules

Scope: all Java service directories. Stack: Java 17, Spring Boot 3.3.1, Spring Cloud 2023.0.2, Maven 3.x.

- **Language Level:** Use Java 17 features strictly (Records for DTOs, Switch Expressions, Text Blocks).
- **Build Tool:** ONLY use Maven Wrapper (`./mvnw`). Never use local `mvn`.
- **Boilerplate:** Use Lombok `@Data`, `@Builder`, `@Slf4j` to reduce noise.
- **Logging:** Use `log.error("Msg", e)` (SLF4J). FORBIDDEN: `System.out.println` or `e.printStackTrace()`.
- **Injection:** ALWAYS use Constructor Injection. FORBIDDEN: Field injection (`@Autowired` on private fields).
- **Architecture:** Follow the Controller -> Service -> Repository pattern.
- **Configuration:** Prefer `application.yml` over `.properties`. Use strictly typed `@ConfigurationProperties`.
- **Testing:** Use `@DataJpaTest` for repositories, `@WebMvcTest` for controllers (mocking services). Avoid `@SpringBootTest` for unit tests.

## Angular Rules

Scope: `ui-angular-app/` directory. Stack: Angular (Standalone Components), Node.js 18+, npm.

- **Package Manager:** ONLY use `npm`. FORBIDDEN: pnpm, yarn, bun.
- **Components:** Use Standalone Components (`standalone: true`). No NgModule unless strictly necessary for legacy libs.
- **State Management:** Use Signals for local state. RxJS `BehaviorSubject` for shared services.
- **Strict Typing:** `noImplicitAny` is ON. No `any` types allowed without explicit justification.
- **Structure:** One component per file. SCSS must be co-located with the component.

## Database & Flyway Rules

- ALL schema changes must be done via Flyway V-scripts (e.g., `V16__description.sql`).
- FORBIDDEN: Manually modifying the database schema via SQL Developer/CLI.
- FORBIDDEN: JPA/Hibernate `ddl-auto: update` in Production/Collaudo.
- Tables must use `SNAKE_CASE`. Primary keys should be UUID or Sequence.
- Foreign keys are mandatory for all relationships.

## Docker Rules

- Services must be stateless.
- Use the defined Docker Network `gestionale_network`.
- All secrets (DB passwords, API keys) must be injected via Environment Variables, never hardcoded in Dockerfile.

## Session Startup

At the start of every work session, Claude Code MUST read these files before making any changes:

1. `CLAUDE.md` — This file. Project overview and behavioral rules.
2. Per-service docs for the service being worked on:
   - `<service>/STATUS.md` — Current state, endpoints, components.
   - `<service>/CHANGELOG.md` — History of changes.
   - `<service>/TASKS.md` — Planned features and improvements.

## Changelog Management

Each service has its own `<service>/CHANGELOG.md`.

**WHEN to update:** Every time a task is started or completed during a session.

**WHAT to write:**
- **Date** and a short title for the work session.
- **What** — Describe the changes made (bullet points or numbered steps).
- **Why** — Explain the motivation or problem being solved.
- **Files** — List all files created, modified, or deleted.

**Rules:**
- Write entries as you work, not only at the end. If a step fails or changes direction, log that too.
- Keep entries concise but specific — enough detail to reconstruct the reasoning.
- Group related changes under a single session heading.
- Use the existing format (`## Date — Title`, `### What`, `### Why`, `### Files`).

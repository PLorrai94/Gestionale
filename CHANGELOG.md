# Changelog

All notable changes to the Gestionale project are documented here.
Each entry describes **what** was done, **why**, and which files were affected.

---

## 2026-01-31 — Automated DB User Creation on First Deploy

### What
Created init scripts that automatically create all Oracle DB users (GESTIONALE_OWNER, SECURITY_USER, MANAGEMENT_USER, BATCH_USER) with proper grants on first container startup. Replaced the old manual `Script DB` folder.

### Why
Users had to manually run SQL scripts from the `Script DB` folder after starting the DB — with hardcoded passwords and a missing BATCH_USER. Now `docker-compose-db.yml` mounts `init-db/` into the container's init directory, so user creation happens automatically with passwords from `.env`.

### Changes
1. **Created `init-db/01_create_users.sh`** — shell script that reads password env vars and creates all 4 DB users with correct grants via sqlplus.
2. **Created `init-db/02_reset_schema.sql`** — utility script (not auto-run) to wipe GESTIONALE_OWNER schema for a fresh Flyway re-migration.
3. **Updated `docker-compose-db.yml`** — mounts `./init-db` to `/container-entrypoint-initdb.d`, passes all password env vars to the container.

### Files (3)
`init-db/01_create_users.sh` (new), `init-db/02_reset_schema.sql` (new), `docker-compose-db.yml`

---

## 2026-01-31 — Split Docker Compose (DB vs App)

### What
Separated Oracle DB into its own `docker-compose-db.yml` (one-time bootstrap) and removed it from `docker-compose-myapp.yml` (app services only).

### Why
The existing Oracle DB was already running on the host, causing a port 1521 conflict when `docker compose up` tried to start a second instance. The DB lifecycle is independent from the app services — it should be started once and left running.

### Changes
1. **Created `docker-compose-db.yml`** — standalone compose for Oracle XE with volume, healthcheck, and `gestionale_network`.
2. **Updated `docker-compose-myapp.yml`** — removed `oracle-db` service, removed `depends_on: oracle-db` from all services, network set to `external: true` (joins the network created by the DB compose).
3. **Updated `deploy.sh`** — added `ensure_network` and `ensure_db` helpers (auto-starts DB if not running, connects it to the shared network), added `--init-db` CLI option, `--down` and `--clean` no longer touch the DB.

### Files (3)
`docker-compose-db.yml` (new), `docker-compose-myapp.yml`, `deploy.sh`

---

## 2026-01-30 — Deployment Infrastructure Overhaul

### What
Rewrote the entire deployment stack: docker-compose, deploy.sh, all Dockerfiles, and application.yml hostname references.

### Why
The previous setup had mismatched ports, missing services, `localhost` hardcoded where Docker hostnames were needed, no Oracle DB container, no env-var management, and no error handling in the deploy script. The application could not be deployed end-to-end with `docker compose up`.

### Changes
1. **Created `.env.example`** — template with all environment variables (DB passwords, JWT key, ports, Spring profile).
2. **Updated `.gitignore`** — added `.env` to prevent secret leaks.
3. **Fixed `application.yml` hostnames** — replaced `localhost` with Docker container names in 4 services:
   - `api-gateway` — Eureka URL → `gestionale-eureka-server`
   - `batch-service` — DB URL → `oracle-db`, Eureka URL → `gestionale-eureka-server`
   - `management-service` — Eureka instance hostname → `gestionale-management-service`
   - `eureka-server` — instance hostname → `gestionale-eureka-server`
4. **Rewrote `docker-compose-myapp.yml`** — added Oracle DB + batch-service, fixed all port mappings, set container names, added healthchecks, `depends_on` with `service_healthy`, `gestionale_network`, `oracle-data` volume, per-service env var injection.
5. **Improved all 6 Dockerfiles** — switched `eclipse-temurin:17-jdk-focal` / `openjdk:17-jdk-slim` → `eclipse-temurin:17-jre-focal`, added `EXPOSE`, ensured `ENV JAVA_TOOL_OPTIONS` on all.
6. **Rewrote `deploy.sh`** — added `set -euo pipefail`, batch-service to build list, `.env` validation, CLI options (`--build`, `--up`, `--down`, `--restart`, `--logs`, `--status`, `--clean`, `--skip-maven`, `--skip-angular`), color-coded output.

### Files (14)
`.env.example` (new), `.gitignore`, `docker-compose-myapp.yml`, `deploy.sh`, `eureka-server/Dockerfile`, `api-gateway/Dockerfile`, `security-service/Dockerfile`, `management-service/Dockerfile`, `batch-service/Dockerfile`, `ai-service/Dockerfile`, `api-gateway/src/main/resources/application.yml`, `batch-service/src/main/resources/application.yml`, `management-service/src/main/resources/application.yml`, `eureka-server/src/main/resources/application.yml`

---

## 2026-01-30 — Security Vulnerability Fixes (C1-C8)

### What
Fixed 8 critical security vulnerabilities across all services.

### Why
Hardcoded secrets, exposed password hashes, missing account lockout, and other OWASP Top 10 issues.

### Changes
- Externalized all secrets (DB passwords, JWT key) to environment variables with `${VAR:default}` syntax
- Added `@JsonProperty(access = WRITE_ONLY)` on password hash field
- Implemented account lockout (5 failed attempts, 30 min lock)
- Added input validation (`@Valid`, `@NotBlank`, `@Email`, `@Size`, etc.)
- Added `GlobalExceptionHandler` to prevent stack trace leaks
- Secured user endpoints with role-based access control

### Files
Multiple files across `security-service`, `management-service`, `batch-service`

---

## 2026-01-30 — Project Documentation Setup

### What
Created and organized project documentation into 4 markdown files.

### Why
Provide persistent context for every work session — project state, future tasks, change history, and behavioral rules.

### Changes
1. **Updated `PROJECT_STATUS.md`** — refreshed Infrastructure section with deployment work, moved backlog to dedicated file.
2. **Created `FUTURE_TASK.md`** — extracted "What's NOT Implemented Yet" from PROJECT_STATUS.md into standalone backlog.
3. **Created `CHANGELOG.md`** (this file) — running log of all work sessions with what/why/files.
4. **Updated `claude_code.md`** — added rule to maintain CHANGELOG.md and read all 4 docs at session start.

# Batch Service - Changelog

## 2026-02-02 — Role-Based Access Control and Gateway Routing Fix

### What
1. **Extract real roles from JWT:** Added `extractRoles(String token)` method to `JwtService` that reads the `roles` claim from the JWT. Updated `JwtAuthFilter` to use extracted roles instead of hardcoding `ROLE_USER` for all users.
2. **Secured batch endpoint:** Added `@EnableMethodSecurity` to `SecurityConfig` and `@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")` to `BatchController`. Only ADMIN and MANAGER users can now trigger batch jobs.
3. **Fixed controller path for gateway routing:** Changed `@RequestMapping("/api/batch")` to `@RequestMapping("/batch")` because the API gateway `StripPrefix=1` removes `/api/` before forwarding. The old path caused 404s.
4. **Renamed endpoint:** Changed `@PostMapping("/start-process-orders-job")` to `@PostMapping("/start")` to match what the frontend `BatchService` calls (`/api/batch/start`).
5. **Fixed SecurityConfig path matcher:** Changed `.requestMatchers("/api/**")` to `.requestMatchers("/batch/**")` to match actual incoming paths after gateway stripping.

### Why
All authenticated users could trigger batch jobs regardless of role, and the endpoint was unreachable through the gateway due to a double `/api/` prefix. The hardcoded `ROLE_USER` authority meant role checks were meaningless.

### Files
- `config/JwtService.java` — Added `extractRoles` method
- `config/JwtAuthFilter.java` — Uses real JWT roles instead of hardcoded `ROLE_USER`
- `config/SecurityConfig.java` — Added `@EnableMethodSecurity`, fixed path matcher
- `controller/BatchController.java` — Fixed path, added `@PreAuthorize`, renamed endpoint

---

## 2026-01-30 — Security Vulnerability Fixes

### What
- Externalized all secrets (DB passwords, JWT key) to environment variables

### Why
Part of the cross-service security hardening to address OWASP Top 10 issues.

### Files
- Config and properties files

---

## 2026-01-30 — Deployment Infrastructure Overhaul

### What
- Fixed `application.yml` hostname: DB URL changed to `oracle-db`, Eureka URL to `gestionale-eureka-server`
- Improved Dockerfile: switched to `eclipse-temurin:17-jre-focal`, added `EXPOSE 8083`
- Added batch-service to `docker-compose-myapp.yml` and `deploy.sh` build list

### Why
batch-service was missing from the Docker Compose orchestration entirely. Previous setup had `localhost` hardcoded, preventing DB and Eureka connectivity inside Docker.

### Files
- `batch-service/Dockerfile`
- `batch-service/src/main/resources/application.yml`

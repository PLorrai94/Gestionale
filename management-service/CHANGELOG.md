# Management Service - Changelog

## 2026-01-30 — Security Vulnerability Fixes

### What
- Externalized all secrets (DB passwords, JWT key) to environment variables
- Added input validation on entity fields (`@Valid`, `@NotBlank`, `@Email`, `@Size`, `@NotNull`, `@Positive`)
- Added `GlobalExceptionHandler` to prevent stack trace leaks

### Why
Part of the cross-service security hardening to address OWASP Top 10 issues.

### Files
- Multiple files across config, model, exception packages

---

## 2026-01-30 — Deployment Infrastructure Overhaul

### What
- Fixed `application.yml` hostname: Eureka instance hostname set to `gestionale-management-service`
- Improved Dockerfile: switched to `eclipse-temurin:17-jre-focal`, added `EXPOSE 8082`

### Why
Previous setup had `localhost` hardcoded, preventing registration with Eureka inside Docker.

### Files
- `management-service/Dockerfile`
- `management-service/src/main/resources/application.yml`

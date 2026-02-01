# Batch Service - Changelog

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

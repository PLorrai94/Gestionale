# Eureka Server - Changelog

## 2026-01-30 — Deployment Infrastructure Overhaul

### What
- Fixed `application.yml` hostname: instance hostname set to `gestionale-eureka-server` for Docker networking
- Improved Dockerfile: switched to `eclipse-temurin:17-jre-focal`, added `EXPOSE 8761`

### Why
Previous setup had `localhost` hardcoded where Docker hostnames were needed, preventing inter-service communication in Docker.

### Files
- `eureka-server/Dockerfile`
- `eureka-server/src/main/resources/application.yml`

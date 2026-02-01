# API Gateway - Changelog

## 2026-01-30 — Deployment Infrastructure Overhaul

### What
- Fixed `application.yml` hostname: Eureka URL changed to `gestionale-eureka-server` for Docker networking
- Improved Dockerfile: switched to `eclipse-temurin:17-jre-focal`, added `EXPOSE 8080`

### Why
Previous setup had `localhost` hardcoded where Docker hostnames were needed, preventing the gateway from registering with Eureka inside Docker.

### Files
- `api-gateway/Dockerfile`
- `api-gateway/src/main/resources/application.yml`

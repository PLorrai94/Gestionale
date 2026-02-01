# API Gateway - Status

## Overview

| Property | Value |
|---|---|
| Port | 8080 |
| Status | Partially implemented |
| Dockerized | Yes |

## Description

Spring Cloud Gateway acting as the single entry point for all client requests. Routes to downstream services via Eureka load balancer. Strips the `/api` prefix before forwarding to target services.

## Routes

| Path | Target Service |
|---|---|
| `/api/auth/**` | security-service |
| `/api/management/**` | management-service |
| `/api/batch/**` | batch-service |

## Implemented Features

- Basic routing to all downstream services via Eureka
- CORS configuration (`CorsConfig.java`)
- Request/response logging (`LoggingGlobalFilter.java`)
- Docker container with health check

## Missing Features

- JWT validation at gateway level (currently each service validates independently)
- Rate limiting
- Circuit breaker (Resilience4j)
- API versioning
- Centralized logging and tracing

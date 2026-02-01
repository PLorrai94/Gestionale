# API Gateway - Tasks

## High Priority

- [ ] JWT validation at gateway level (pre-filter to reject invalid tokens early, removing per-service validation burden)
- [ ] Rate limiting (prevent abuse on public endpoints like `/api/auth/register`)

## Medium Priority

- [ ] API versioning (header or path-based)

## Low Priority

- [ ] Circuit breaker (Resilience4j) for downstream service failures
- [ ] Centralized logging (ELK stack integration)
- [ ] Distributed tracing (Zipkin/Jaeger)
- [ ] Health check aggregation endpoint
- [ ] API documentation (Swagger/OpenAPI aggregation)

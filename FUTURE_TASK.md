# Gestionale - Future Tasks

Backlog of planned features and improvements, organized by priority.

---

## High Priority

- [ ] Pagination, sorting, and filtering on all list endpoints
- [ ] API Gateway JWT validation (pre-filter to reject invalid tokens early)
- [ ] API Gateway rate limiting
- [ ] Proper error response DTOs (standardized error format across services)
- [ ] Audit trail (created_by, updated_by on all entities)
- [ ] Refresh token mechanism (currently only access tokens with 1h expiry)

## Medium Priority

- [ ] Invoice / document generation
- [ ] Dashboard / reporting endpoints (sales summaries, top products, etc.)
- [ ] Email notifications (order confirmation, password reset)
- [ ] Product categories / catalog structure
- [ ] Customer address management
- [ ] Order status state machine (validate transitions: PENDING -> CONFIRMED -> SHIPPED -> DELIVERED)
- [ ] Search functionality (product search, customer search)
- [ ] Scheduled batch jobs (auto-process, cleanup, reports)
- [ ] Batch job monitoring endpoints (status, history)
- [ ] API versioning

## Low Priority / Future

- [ ] ai-service implementation (recommendations, forecasting, anomaly detection)
- [ ] Angular frontend implementation
- [ ] Terraform IaC implementation
- [ ] Circuit breaker (Resilience4j) in api-gateway
- [ ] Centralized logging (ELK stack)
- [ ] Distributed tracing (Zipkin/Jaeger)
- [ ] Health checks and monitoring
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests
- [ ] Password reset flow
- [ ] User profile management
- [ ] Multi-tenancy support
- [ ] File upload/attachment support (e.g., product images)
- [ ] Export functionality (CSV, PDF, Excel)

# Management Service - Tasks

## High Priority

- [ ] Pagination, sorting, and filtering on all list endpoints
- [ ] Audit trail (created_by, updated_by on all entities) -- `Auditable` base class exists, needs integration
- [ ] Standardized error response DTOs (consistent error format across all endpoints)

## Medium Priority

- [ ] Invoice / document generation
- [ ] Reporting / analytics endpoints (sales summaries, top products, etc.)
- [ ] Product categories / catalog structure
- [ ] Customer address management
- [ ] Order status state machine (validate transitions: PENDING -> CONFIRMED -> SHIPPED -> DELIVERED)
- [ ] Search functionality (product search, customer search)

## Low Priority

- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests (`@WebMvcTest` for controllers, `@DataJpaTest` for repositories)
- [ ] Multi-tenancy support
- [ ] File upload / attachment support (e.g., product images)
- [ ] Export functionality (CSV, PDF, Excel)
- [ ] Health check endpoint

# Security Service - Tasks

## High Priority

- [ ] Refresh token mechanism (currently only access tokens with 1h expiry; `REFRESH_TOKEN` table may exist)
- [ ] Standardized error response DTOs (consistent error format across all endpoints)

## Medium Priority

- [ ] Email notifications (registration confirmation, password reset)

## Low Priority

- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests (`@WebMvcTest` for controllers, `@DataJpaTest` for repositories)
- [ ] Password reset flow
- [ ] User profile management (update profile fields, change password)
- [ ] Health check endpoint

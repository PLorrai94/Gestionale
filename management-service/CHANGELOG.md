# Management Service - Changelog

## 2026-02-02 — JWT Role Extraction and Gateway Routing Fix

### What
1. **Extract real roles from JWT:** Added `extractRoles(String token)` method to `JwtService` that reads the `roles` claim. Updated `JwtAuthFilter` to use extracted roles instead of hardcoding `ROLE_USER` for all users.
2. **Fixed controller paths for gateway routing:** Removed `/api/` prefix from all controller `@RequestMapping` annotations. The API gateway `StripPrefix=1` already removes `/api/` before forwarding, so the old paths caused 404s:
   - `CustomerController`: `/api/management/customers` → `/management/customers`
   - `ProductController`: `/api/management/products` → `/management/products`
   - `OrderController`: `/api/management/orders` → `/management/orders`
3. **Fixed SecurityConfig path matcher:** Changed `.requestMatchers("/api/**")` to `.requestMatchers("/management/**")`.

### Why
The double `/api/` prefix (gateway strips one, controller adds another) caused all management-service endpoints to return 404 through the gateway. The hardcoded `ROLE_USER` authority prevented any role-based access control from working.

### Files
- `config/JwtService.java` — Added `extractRoles` method
- `config/JwtAuthFilter.java` — Uses real JWT roles instead of hardcoded `ROLE_USER`
- `config/SecurityConfig.java` — Fixed path matcher
- `controller/CustomerController.java` — Fixed `@RequestMapping` path
- `controller/ProductController.java` — Fixed `@RequestMapping` path
- `controller/OrderController.java` — Fixed `@RequestMapping` path

---

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

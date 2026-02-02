# Security Service - Changelog

## 2026-02-02 — JWT Roles, Default Admin User, and Role-Based Access Fix

### What
1. **JWT now includes roles claim:** Modified `JwtService.generateToken(UserDetails)` to extract user authorities and embed them as a `roles` array in the JWT payload. Previously the token only contained subject, issuedAt, and expiration — making all downstream role checks fail.
2. **Default admin user seeded via Flyway V16:** Created `V16__insert_default_admin_user.sql` that inserts an `admin` user with BCrypt-encoded password "admin" and assigns both ADMIN and USER roles. Password is intentionally weak and must be changed after first login.
3. **Fixed `hasRole` vs `hasAuthority` mismatch:** Changed `AuthController.assignRole` from `@PreAuthorize("hasRole('ADMIN')")` to `@PreAuthorize("hasAuthority('ADMIN')")` because roles in the DB are stored as `ADMIN` (no `ROLE_` prefix), and `hasRole` expects a `ROLE_ADMIN` authority.

### Why
Role-based access control was completely non-functional: the JWT contained no roles, so the frontend `adminGuard` always failed, and downstream services hardcoded `ROLE_USER` for every authenticated user regardless of their actual roles. The `hasRole`/`hasAuthority` mismatch also prevented admins from assigning roles via the API.

### Files
- `service/JwtService.java` — Added roles extraction from UserDetails authorities into JWT claims
- `controller/AuthController.java` — Changed `hasRole('ADMIN')` to `hasAuthority('ADMIN')`
- `resources/db/migration/V16__insert_default_admin_user.sql` — New Flyway migration

---

## 2026-01-31 — Registration System Improvements

### What
Enhanced user registration system with:
1. Improved `UserRegistrationRequest` DTO with comprehensive validation (username format, strong password, email format)
2. Added profile fields to User entity: firstName, lastName, phoneNumber
3. Created Flyway migration `V13__add_user_profile_fields.sql`
4. Password confirmation with `PasswordMismatchException`
5. Deprecated old DTOs (`RegisterRequest`, `AuthenticationResponse`)

### Why
Registration needed stronger validation, password confirmation, and additional profile information for a better user experience.

### Files
- `dto/UserRegistrationRequest.java`, `dto/RegisterRequest.java`, `dto/AuthenticationResponse.java`
- `model/User.java`
- `exception/PasswordMismatchException.java`, `exception/GlobalExceptionHandler.java`
- `service/AuthService.java`
- `db/migration/V13__add_user_profile_fields.sql`

---

## 2026-01-30 — Security Vulnerability Fixes (C1-C8)

### What
Fixed 8 critical security vulnerabilities:
- Externalized all secrets (DB passwords, JWT key) to environment variables
- Added `@JsonProperty(access = WRITE_ONLY)` on password hash field
- Implemented account lockout (5 failed attempts, 30 min lock)
- Added input validation (`@Valid`, `@NotBlank`, `@Email`, `@Size`)
- Added `GlobalExceptionHandler` to prevent stack trace leaks
- Secured user endpoints with role-based access control

### Why
Hardcoded secrets, exposed password hashes, missing account lockout, and other OWASP Top 10 issues needed remediation.

### Files
- Multiple files across config, controller, service, model, exception packages

---

## 2026-01-30 — Deployment Infrastructure Overhaul

### What
- Improved Dockerfile: switched to `eclipse-temurin:17-jre-focal`, added `EXPOSE 8081`

### Why
Standardized Docker image base across all services.

### Files
- `security-service/Dockerfile`

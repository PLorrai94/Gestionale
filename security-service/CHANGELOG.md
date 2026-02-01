# Security Service - Changelog

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

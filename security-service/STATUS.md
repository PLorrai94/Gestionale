# Security Service - Status

## Overview

| Property | Value |
|---|---|
| Port | 8081 |
| Status | Fully implemented |
| Dockerized | Yes |

## Description

Handles user registration, authentication (JWT), role management, and account lockout. Central authentication authority for the entire platform.

## Database

- **Tables:** USERS, ROLES, USER_ROLES, REFRESH_TOKEN
- **DB User:** `security_user`
- **Migrations:** Flyway V1 through V15 (managed from this service for all shared tables)

## API Endpoints

| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/authenticate` | Login, obtain JWT | Public |
| POST | `/api/auth/refresh` | Refresh JWT token | Public |
| GET | `/api/auth/test` | Protected test endpoint | Authenticated |
| POST | `/api/auth/users/{userId}/roles/{roleName}` | Assign role | ADMIN |
| GET | `/api/users` | List all users | ADMIN |
| GET | `/api/users/{id}` | Get user by ID | ADMIN or self |
| POST | `/api/users` | Create user | ADMIN |
| PUT | `/api/users/{id}` | Update user | ADMIN or self |
| DELETE | `/api/users/{id}` | Delete user | ADMIN or self |
| POST | `/api/users/{userId}/roles` | Assign roles to user | ADMIN |

## Implemented Features

- JWT token generation and validation (HS256, 1h expiry)
- Password hashing (BCrypt)
- Role-based access control (USER, ADMIN)
- Account lockout after 5 failed attempts (30 min lock)
- Password hash not exposed in API responses (`@JsonProperty(access = WRITE_ONLY)`)
- Secrets externalized via environment variables
- Enhanced registration with profile fields (firstName, lastName, phoneNumber)
- Strong password validation (8+ chars, uppercase, lowercase, digit, no whitespace)
- Password confirmation with PasswordMismatchException
- Deprecated DTOs marked (`RegisterRequest`, `AuthenticationResponse`)

## Components

- **Controllers:** AuthController, UserController
- **Services:** AuthService, JwtService, UserService, UserDetailsServiceImpl
- **Config:** SecurityConfig, JwtAuthFilter, JwtProperties, ApplicationConfig, UserSecurity
- **Models:** User (implements UserDetails), Role
- **DTOs:** AuthResponse, UserLoginRequest, UserRegistrationRequest, AuthenticationRequest, AuthenticationResponse, RegisterRequest
- **Exceptions:** GlobalExceptionHandler, UserNotFoundException, UsernameAlreadyExistsException, EmailAlreadyExistsException, RoleNotFoundException, PasswordMismatchException

## Missing Features

- Refresh token endpoint may be partially implemented
- Email verification flow
- Password reset flow
- Standardized error response DTOs
- API documentation (Swagger/OpenAPI)
- Unit and integration tests

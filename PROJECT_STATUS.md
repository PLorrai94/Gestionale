# Gestionale - Project Status

## Architecture Overview

Microservices-based ERP system built with Spring Boot 3.x, Oracle Database, Docker, and Spring Cloud (Netflix Eureka).

**Tech Stack:** Java 17, Spring Boot 3.x, Spring Cloud 2025.0.0, Oracle DB (FREEPDB1), Flyway, Docker, Angular

---

## Services

### 1. eureka-server (Service Discovery)
- **Port:** 8761
- **Status:** Implemented
- **What it does:** Netflix Eureka service registry. All microservices register here for discovery.
- **Dockerized:** Yes

### 2. api-gateway (Spring Cloud Gateway)
- **Port:** 8080
- **Status:** Implemented (basic routing + CORS + logging filter)
- **What it does:** Single entry point for all client requests. Routes to downstream services via Eureka load balancer.
- **Routes configured:**
  - `/api/auth/**` -> security-service
  - `/api/management/**` -> management-service
  - `/api/batch/**` -> batch-service
- **Existing components:**
  - `CorsConfig.java` - CORS configuration
  - `LoggingGlobalFilter.java` - Request/response logging
- **Missing:**
  - No JWT validation at gateway level (each service validates independently)
  - No rate limiting
  - No circuit breaker
- **Dockerized:** Yes

### 3. security-service (Authentication & Authorization)
- **Port:** 8081
- **Status:** Implemented
- **What it does:** User registration, authentication (JWT), role management, account lockout.
- **Database tables:** USERS, ROLES, USER_ROLES (managed via Flyway, 12 migrations)
- **API Endpoints:**
  - `POST /api/auth/register` - Register new user (public)
  - `POST /api/auth/authenticate` - Login, get JWT (public)
  - `POST /api/auth/users/{userId}/roles/{roleName}` - Assign role (ADMIN only)
  - `GET /api/auth/test` - Protected test endpoint
  - `GET /api/users` - List all users (ADMIN only)
  - `GET /api/users/{id}` - Get user by ID (ADMIN or self)
  - `POST /api/users` - Create user (ADMIN only)
  - `PUT /api/users/{id}` - Update user (ADMIN or self)
  - `DELETE /api/users/{id}` - Delete user (ADMIN or self)
  - `POST /api/users/{userId}/roles` - Assign roles to user (ADMIN only)
- **Security features:**
  - JWT token generation & validation (HS256, 1h expiry)
  - Password hashing (BCrypt)
  - Role-based access control (USER, ADMIN)
  - Account lockout after 5 failed attempts (30 min lock)
  - Password hash not exposed in API responses (@JsonProperty WRITE_ONLY)
  - Secrets externalized via environment variables
- **Existing components:**
  - Controllers: AuthController, UserController
  - Services: AuthService, JwtService, UserService, UserDetailsServiceImpl
  - Config: SecurityConfig, JwtAuthFilter, JwtProperties, ApplicationConfig, UserSecurity
  - Models: User (implements UserDetails), Role
  - DTOs: AuthResponse, UserLoginRequest, UserRegistrationRequest, AuthenticationRequest, AuthenticationResponse, RegisterRequest
  - Exceptions: GlobalExceptionHandler, UserNotFoundException, UsernameAlreadyExistsException, EmailAlreadyExistsException, RoleNotFoundException
- **Dockerized:** Yes

### 4. management-service (Business Logic - CRUD)
- **Port:** 8082
- **Status:** Implemented (basic CRUD)
- **What it does:** Manages customers, products, and orders. Core business entities.
- **Database tables:** CUSTOMER, PRODUCT, ORDERS, ORDER_ITEM (created by Flyway in security-service)
- **API Endpoints:**
  - **Customers** (`/api/management/customers`):
    - `GET /` - List all customers
    - `GET /{id}` - Get customer by ID
    - `POST /` - Create customer (validated)
    - `PUT /{id}` - Update customer (validated)
    - `DELETE /{id}` - Delete customer
  - **Products** (`/api/management/products`):
    - `GET /` - List all products
    - `GET /{id}` - Get product by ID
    - `POST /` - Create product (validated)
    - `PUT /{id}` - Update product (validated)
    - `DELETE /{id}` - Delete product
  - **Orders** (`/api/management/orders`):
    - `GET /` - List all orders
    - `GET /{id}` - Get order by ID
    - `POST /` - Create order (validated, stock check, total calc)
    - `PUT /{id}/status` - Update order status
    - `POST /{id}/cancel` - Cancel order (restores stock)
    - `DELETE /{id}` - Delete order
    - `GET /by-customer/{customerId}` - Get orders by customer
- **Business logic implemented:**
  - Order creation validates customer/product existence, checks stock, calculates totals, deducts stock
  - Order cancellation restores product stock
  - Duplicate email check on customer creation
- **Security:** JWT auth filter (validates token signature + expiry, stateless)
- **Validation:** @Valid on request bodies, @NotBlank/@Email/@Size/@NotNull/@Positive on entity fields
- **Missing:**
  - No pagination on list endpoints
  - No search/filter capabilities
  - No sorting options
  - No audit trail (who created/modified records)
  - No invoice generation
  - No reporting/analytics endpoints
- **Existing components:**
  - Controllers: CustomerController, OrderController, ProductController
  - Services: CustomerService, OrderService, ProductService
  - Repositories: CustomerRepository, OrderRepository, OrderItemRepository, ProductRepository
  - Models: Customer, Product, Order, OrderItem
  - Config: SecurityConfig, JwtAuthFilter, JwtProperties, JwtService
  - Exceptions: GlobalExceptionHandler, DuplicateEmailException
- **Dockerized:** Yes

### 5. batch-service (Async Processing)
- **Port:** 8083
- **Status:** Implemented (single job)
- **What it does:** Spring Batch service for processing pending orders. Changes PENDING orders to PROCESSED.
- **API Endpoints:**
  - `POST /api/batch/start-process-orders-job` - Trigger order processing batch job
- **Batch jobs:**
  - `processPendingOrdersJob` - Reads PENDING orders, sets status to PROCESSED (chunk size 10)
- **Security:** JWT auth filter (validates token signature + expiry, stateless)
- **Missing:**
  - No job status check endpoint
  - No job history endpoint
  - No scheduled execution (manual trigger only)
  - No additional batch jobs (e.g., report generation, data cleanup)
- **Existing components:**
  - Controllers: BatchController
  - Config: BatchConfig, SecurityConfig, JwtAuthFilter, JwtProperties, JwtService
  - Common models: Order, Customer, OrderItem, Product, OrderRepository
- **Dockerized:** Yes

### 6. ai-service (AI/ML - Placeholder)
- **Port:** Not configured (default 8080?)
- **Status:** Skeleton only - no business logic implemented
- **What it does:** Placeholder for future AI/ML functionality
- **Dependencies:** WebFlux, Actuator, Validation, Eureka client, Spring Cloud Config
- **Missing:** Everything - no controllers, services, models, or config beyond the application entry point
- **Dockerized:** Yes (Dockerfile exists)

### 7. ui-service (Spring Boot UI Backend - Placeholder)
- **Status:** Minimal placeholder - only has application-local.yml
- **Missing:** Everything

### 8. ui-angular-app (Angular Frontend)
- **Status:** Exists with project scaffolding (angular.json, package.json, tsconfig, proxy.conf)
- **Missing:** Unknown - needs investigation of actual Angular component implementation
- **Dockerized:** Yes

---

## Infrastructure

### Docker
- **`docker-compose-myapp.yml`** — Orchestrates all services + Oracle DB
  - Oracle XE (`gvenzl/oracle-xe:21-slim`) with volume persistence and built-in healthcheck
  - All Java services use `eclipse-temurin:17-jre-focal` (JRE, not JDK)
  - Container names match application.yml hostnames (e.g. `gestionale-eureka-server`, `oracle-db`)
  - Port mappings aligned with `server.port` in each service's application.yml
  - Healthcheck-based startup ordering (`depends_on` with `condition: service_healthy`)
  - Shared `gestionale_network` (bridge) for inter-service communication
  - Environment variables injected per service (DB passwords, JWT key, Flyway password, Spring profile)
- **`.env.example`** — Template for all required environment variables; `.env` is gitignored
- Each service has its own `Dockerfile` with correct `EXPOSE` directive

### Database
- **Engine:** Oracle Database (FREEPDB1)
- **Schema owner:** GESTIONALE_OWNER (DDL privileges, runs Flyway migrations)
- **Application users:**
  - `security_user` — Used by security-service for CRUD operations
  - `MANAGEMENT_USER` — Used by management-service for CRUD operations
  - `BATCH_USER` — Used by batch-service
- **Migrations:** 12 Flyway versions (V1-V12), all managed from security-service
- **Tables:** USERS, ROLES, USER_ROLES, CUSTOMER, PRODUCT, ORDERS, ORDER_ITEM

### Terraform
- Directory structure exists (`dev/`, `collaudo/`, `prod/`, `modules/`) but no implementation

### CI/CD
- **`deploy.sh`** — Full-featured deployment script
  - CLI options: `--build`, `--up`, `--down`, `--restart`, `--logs`, `--status`, `--clean`, `--skip-maven`, `--skip-angular`, `--help`
  - Validates `.env` before any operation (copies from `.env.example` if missing)
  - Builds all 5 Java services + Angular, then runs `docker compose up`
  - Error handling with `set -euo pipefail` and per-build exit code checks
  - Color-coded output (INFO/WARN/ERROR)

---

## Security Summary

- JWT authentication across all services (shared secret key)
- Secrets externalized via environment variables (`${ENV_VAR:default}`)
- Account lockout (5 failed attempts, 30 min lock)
- Password hash not exposed in API responses
- Input validation on management-service entities
- Role-based access (USER, ADMIN) on security-service endpoints
- CSRF disabled (stateless JWT)
- Stateless sessions across all services

---

## Future Work

See [FUTURE_TASK.md](FUTURE_TASK.md) for the full backlog of planned features and improvements.

# Gestionale

Microservices-based ERP platform built with Java Spring Boot, Angular, Oracle Database, and Docker.

**Author:** PLorrai94 -- Backend Developer

---

## Architecture

```
Browser --> nginx (prod) / proxy.conf.json (dev)
               |
         api-gateway:8080
          /       |        \
security    management    batch
 :8081       :8082        :8083
          \       |        /
         Oracle DB (FREEPDB1)
               |
         eureka-server:8761 (service discovery)
```

## Services

| Service | Port | Description | Status |
|---|---|---|---|
| eureka-server | 8761 | Netflix Eureka service discovery registry | Complete |
| api-gateway | 8080 | Spring Cloud Gateway, routes `/api/**` to downstream services | Partial |
| security-service | 8081 | JWT auth, user registration, role management, account lockout | Complete |
| management-service | 8082 | CRUD for Customers, Products, Orders | Complete |
| batch-service | 8083 | Spring Batch -- processes pending orders | Partial |
| ui-angular-app | 4200 / 80 | Angular standalone-component SPA | Partial |

Each service has its own documentation:
- `<service>/STATUS.md` -- current state, endpoints, components
- `<service>/CHANGELOG.md` -- history of changes
- `<service>/TASKS.md` -- planned features and improvements

## Tech Stack

| Layer | Technologies |
|---|---|
| Backend | Java 17, Spring Boot 3.3.1, Spring Cloud 2023.0.2, Spring Security, Spring Batch |
| Frontend | Angular 20.1, TypeScript 5.8, RxJS 7.8, Karma/Jasmine |
| Database | Oracle Free 23 (FREEPDB1), Flyway migrations, Hibernate (validate mode) |
| Auth | JWT (jjwt 0.11.5, HS256), BCrypt, role-based (USER, ADMIN) |
| Infra | Docker, Docker Compose (two-file strategy), nginx |

## Quick Start

```bash
cp .env.example .env           # fill in credentials
./deploy.sh --init-db          # first time: bootstrap Oracle DB
./deploy.sh                    # build all + deploy
```

See [DEPLOY.md](DEPLOY.md) for full deployment options and day-to-day commands.

## Database

Oracle Free 23 with schema owned by `GESTIONALE_OWNER`. Per-service DML users: `security_user`, `MANAGEMENT_USER`, `BATCH_USER`. All DDL is managed by Flyway (15 migrations in `security-service/src/main/resources/db/migration/`). Hibernate runs in `validate` mode only.

## Project Structure

```
Gestionale/
  README.md                     This file
  CLAUDE.md                     AI assistant instructions
  DEPLOY.md                     Deployment guide
  .env.example                  Environment variable template
  deploy.sh                     Build and deploy script
  docker-compose-db.yml         Oracle DB (one-time)
  docker-compose-myapp.yml      Application services
  eureka-server/                Service discovery
  api-gateway/                  Request routing
  security-service/             Authentication & authorization
  management-service/           Business logic CRUD
  batch-service/                Async processing
  ui-angular-app/               Angular frontend
  init-db/                      DB bootstrap scripts
  terraform/                    IaC (placeholder)
```

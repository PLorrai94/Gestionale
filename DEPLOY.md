# Deployment Guide

See [README.md](README.md) for project overview and architecture.

## Prerequisites

- Docker & Docker Compose
- Java 17 (Maven Wrapper included)
- Node.js 18+ / npm

## Quick Start

```bash
# 1. Create your .env file
cp .env.example .env
# Edit .env with real passwords

# 2. Start Oracle DB (first time only — creates users automatically)
./deploy.sh --init-db

# 3. Build everything and deploy
./deploy.sh
```

## deploy.sh Options

| Option           | Description                                      |
|------------------|--------------------------------------------------|
| *(no flag)*      | Full build (Maven + Angular) then start services |
| `--init-db`      | Bootstrap Oracle DB (one-time setup)             |
| `--up`           | Start services without rebuilding                |
| `--down`         | Stop application services (DB keeps running)     |
| `--restart`      | Stop then start services                         |
| `--logs`         | Tail logs from all services                      |
| `--status`       | Show running containers                          |
| `--clean`        | Stop app services (DB untouched)                 |
| `--skip-maven`   | Skip Java builds (Angular + Docker only)         |
| `--skip-angular` | Skip Angular build (Java + Docker only)          |
| `--help`         | Show help                                        |

## Architecture

Two separate Docker Compose files:

- **`docker-compose-db.yml`** — Oracle XE database (one-time, long-lived)
- **`docker-compose-myapp.yml`** — All application services (rebuilt frequently)

Both share the `gestionale_network` bridge network.

## First-Time Setup

`deploy.sh --init-db` does the following:

1. Creates the `gestionale_network` Docker network
2. Starts Oracle XE with a persistent volume
3. Runs `init-db/01_create_users.sh` automatically, which creates:
   - `GESTIONALE_OWNER` — schema owner (Flyway migrations)
   - `SECURITY_USER` — security-service
   - `MANAGEMENT_USER` — management-service
   - `BATCH_USER` — batch-service
4. Passwords are read from `.env`

After the DB is up, run `deploy.sh` to build and start all services. Flyway will create tables and grant permissions on first boot.

## Day-to-Day

```bash
./deploy.sh                 # rebuild + redeploy everything
./deploy.sh --up            # just restart containers (no rebuild)
./deploy.sh --skip-angular  # rebuild only Java services
./deploy.sh --logs          # follow logs
./deploy.sh --status        # check what's running
./deploy.sh --down          # stop app services (DB stays up)
```

## Destroying Everything

```bash
# Stop app services
./deploy.sh --clean

# Stop DB and delete all data
docker compose -f docker-compose-db.yml down -v
```

## Reset Database Schema

To wipe tables and let Flyway re-run all migrations:

```bash
sqlplus GESTIONALE_OWNER/<password>@//localhost:1521/FREEPDB1 @init-db/02_reset_schema.sql
```

Then restart the services — Flyway will re-create everything.

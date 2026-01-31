#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Build and deploy Gestionale microservices with Docker Compose
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
COMPOSE_FILE="$PROJECT_ROOT/docker-compose-myapp.yml"
COMPOSE_DB_FILE="$PROJECT_ROOT/docker-compose-db.yml"
ENV_FILE="$PROJECT_ROOT/.env"
ENV_EXAMPLE="$PROJECT_ROOT/.env.example"
NETWORK_NAME="gestionale_network"

SERVICES=(
  "eureka-server"
  "api-gateway"
  "security-service"
  "management-service"
  "batch-service"
)

ANGULAR_DIR="ui-angular-app"

# ---------------------------------------------------------------------------
# Colors
# ---------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

info()  { echo -e "${GREEN}[INFO]${NC}  $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; }

# ---------------------------------------------------------------------------
# .env check
# ---------------------------------------------------------------------------
ensure_env() {
  if [ ! -f "$ENV_FILE" ]; then
    if [ -f "$ENV_EXAMPLE" ]; then
      cp "$ENV_EXAMPLE" "$ENV_FILE"
      warn ".env not found — created from .env.example."
      error "Please edit .env with real credentials before deploying."
      exit 1
    else
      error ".env and .env.example are both missing. Cannot continue."
      exit 1
    fi
  fi
}

# ---------------------------------------------------------------------------
# Build helpers
# ---------------------------------------------------------------------------
build_maven() {
  info "Building Java microservices with Maven..."
  for service in "${SERVICES[@]}"; do
    if [ -d "$PROJECT_ROOT/$service" ]; then
      info "  -> $service"
      (cd "$PROJECT_ROOT/$service" && chmod +x mvnw && ./mvnw clean package -DskipTests) \
        || { error "Maven build failed for $service"; exit 1; }
    else
      warn "Directory not found: $service — skipping."
    fi
  done
  info "Maven builds complete."
}

build_angular() {
  info "Building Angular UI..."
  if [ -d "$PROJECT_ROOT/$ANGULAR_DIR" ]; then
    (cd "$PROJECT_ROOT/$ANGULAR_DIR" && npm install && npm run build) \
      || { error "Angular build failed"; exit 1; }
    info "Angular build complete."
  else
    warn "Angular directory not found: $ANGULAR_DIR — skipping."
  fi
}

# ---------------------------------------------------------------------------
# Network & DB helpers
# ---------------------------------------------------------------------------
ensure_network() {
  if ! docker network inspect "$NETWORK_NAME" &>/dev/null; then
    info "Creating Docker network: $NETWORK_NAME"
    docker network create "$NETWORK_NAME"
  fi
}

ensure_db() {
  if docker ps --format '{{.Names}}' | grep -q '^oracle-db$'; then
    info "Oracle DB container already running."
    # Make sure it's on the right network
    if ! docker inspect oracle-db --format '{{json .NetworkSettings.Networks}}' | grep -q "$NETWORK_NAME"; then
      info "Connecting oracle-db to $NETWORK_NAME..."
      docker network connect "$NETWORK_NAME" oracle-db 2>/dev/null || true
    fi
  else
    info "Oracle DB not running. Starting via docker-compose-db.yml..."
    docker compose -f "$COMPOSE_DB_FILE" --env-file "$ENV_FILE" up -d
    info "Waiting for Oracle DB to become healthy..."
    docker compose -f "$COMPOSE_DB_FILE" --env-file "$ENV_FILE" up --wait
    info "Oracle DB is ready."
  fi
}

# ---------------------------------------------------------------------------
# Docker Compose wrappers
# ---------------------------------------------------------------------------
compose() {
  docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" "$@"
}

do_up() {
  ensure_env
  ensure_network
  ensure_db
  info "Starting services..."
  compose up --build -d
  info "Services started. Use '$0 --logs' to follow output."
}

do_down() {
  info "Stopping application services..."
  compose down
  info "Application services stopped. Oracle DB is still running."
  info "To stop the DB too: docker compose -f docker-compose-db.yml down"
}

do_restart() {
  do_down
  do_up
}

do_logs() {
  compose logs -f
}

do_status() {
  compose ps
}

do_clean() {
  info "Stopping application services..."
  compose down
  info "Application services stopped."
  warn "Oracle DB was NOT removed. To destroy it and its data:"
  warn "  docker compose -f docker-compose-db.yml down -v"
}

do_init_db() {
  ensure_env
  ensure_network
  info "Bootstrapping Oracle DB (one-time setup)..."
  docker compose -f "$COMPOSE_DB_FILE" --env-file "$ENV_FILE" up -d
  info "Waiting for Oracle DB to become healthy..."
  docker compose -f "$COMPOSE_DB_FILE" --env-file "$ENV_FILE" up --wait
  info "Oracle DB is ready."
}

# ---------------------------------------------------------------------------
# Usage
# ---------------------------------------------------------------------------
usage() {
  cat <<EOF
${CYAN}Usage:${NC} $0 [OPTIONS]

${CYAN}Options:${NC}
  --build          Build Maven + Angular, then docker compose up (default)
  --up             Docker compose up (skip builds)
  --down           Docker compose down (keeps DB running)
  --restart        Down + up
  --logs           Follow docker compose logs
  --status         Show running containers
  --clean          Down application services (keeps DB)
  --init-db        Bootstrap Oracle DB (one-time setup)
  --skip-maven     Skip Maven builds (Angular + docker only)
  --skip-angular   Skip Angular build (Maven + docker only)
  --help           Show this help

${CYAN}Examples:${NC}
  $0 --init-db       # first-time: start Oracle DB
  $0                 # full build + deploy (auto-starts DB if needed)
  $0 --up            # just start containers (jars already built)
  $0 --skip-angular  # rebuild only Java services
  $0 --logs          # tail all service logs
EOF
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
main() {
  local skip_maven=false
  local skip_angular=false
  local action="build"

  if [ $# -eq 0 ]; then
    action="build"
  fi

  while [ $# -gt 0 ]; do
    case "$1" in
      --build)        action="build" ;;
      --up)           action="up" ;;
      --down)         action="down" ;;
      --restart)      action="restart" ;;
      --logs)         action="logs" ;;
      --status)       action="status" ;;
      --clean)        action="clean" ;;
      --init-db)      action="init-db" ;;
      --skip-maven)   skip_maven=true ;;
      --skip-angular) skip_angular=true ;;
      --help|-h)      usage; exit 0 ;;
      *)              error "Unknown option: $1"; usage; exit 1 ;;
    esac
    shift
  done

  case "$action" in
    build)
      ensure_env
      if [ "$skip_maven" = false ]; then
        build_maven
      else
        info "Skipping Maven builds (--skip-maven)."
      fi
      if [ "$skip_angular" = false ]; then
        build_angular
      else
        info "Skipping Angular build (--skip-angular)."
      fi
      do_up
      ;;
    up)       do_up ;;
    down)     do_down ;;
    restart)  do_restart ;;
    logs)     do_logs ;;
    status)   do_status ;;
    clean)    do_clean ;;
    init-db)  do_init_db ;;
  esac
}

main "$@"

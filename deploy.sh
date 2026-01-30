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
ENV_FILE="$PROJECT_ROOT/.env"
ENV_EXAMPLE="$PROJECT_ROOT/.env.example"

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
# Docker Compose wrappers
# ---------------------------------------------------------------------------
compose() {
  docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" "$@"
}

do_up() {
  ensure_env
  info "Starting services..."
  compose up --build -d
  info "Services started. Use '$0 --logs' to follow output."
}

do_down() {
  info "Stopping services..."
  compose down
  info "Services stopped."
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
  info "Stopping services and removing volumes..."
  compose down -v
  info "Clean complete."
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
  --down           Docker compose down
  --restart        Down + up
  --logs           Follow docker compose logs
  --status         Show running containers
  --clean          Down + remove volumes (destroys data!)
  --skip-maven     Skip Maven builds (Angular + docker only)
  --skip-angular   Skip Angular build (Maven + docker only)
  --help           Show this help

${CYAN}Examples:${NC}
  $0                 # full build + deploy
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
  esac
}

main "$@"

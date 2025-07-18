# deploy.sh - Script per buildare e avviare i microservizi + Angular con Docker

# Imposta la root del progetto
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

# Percorsi dei servizi
SERVICES=(
  "api-gateway"
  "management-service"
  "security-service"
  "eureka-server"
)

ANGULAR_DIR="ui-angular-app"

echo "\n>> Costruzione microservizi con Maven..."
for service in "${SERVICES[@]}"; do
  echo " - $service"
  if [ -d "$PROJECT_ROOT/$service" ]; then
    (cd "$PROJECT_ROOT/$service" && chmod +x mvnw && ./mvnw clean package -DskipTests)
  else
    echo "[WARN] Directory non trovata per: $service"
  fi
done

echo "\n>> Build Angular..."
if [ -d "$PROJECT_ROOT/$ANGULAR_DIR" ]; then
  (cd "$PROJECT_ROOT/$ANGULAR_DIR" && npm install && npm run build)
else
  echo "[WARN] Directory Angular non trovata: $PROJECT_ROOT/$ANGULAR_DIR"
fi

echo "\n>> Avvio servizi Docker..."
docker compose -f "$PROJECT_ROOT/docker-compose-myapp.yml" up --build -d

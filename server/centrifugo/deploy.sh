#!/bin/bash
set -e

echo "═══════════════════════════════════════════════════════════════"
echo " 🚀 INSTALLATION & DÉMARRAGE AUTOMATIQUE CENTRIFUGO BRICOLEMOI "
echo "═══════════════════════════════════════════════════════════════"

# 1. Vérification / Installation de Docker
if ! command -v docker &> /dev/null; then
    echo "📦 Installation de Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
fi

# 2. Création du dossier et configuration
WORKDIR="/opt/bricolemoi-centrifugo"
mkdir -p "$WORKDIR"
cd "$WORKDIR"

cat << 'EOF' > docker-compose.yml
version: '3.8'

services:
  centrifugo:
    image: centrifugo/centrifugo:v5
    container_name: bricolemoi-centrifugo
    restart: always
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
    ports:
      - "8000:8000"
    volumes:
      - ./config.json:/centrifugo/config.json:ro
    command: centrifugo -c config.json
    environment:
      - CENTRIFUGO_ADMIN_PASSWORD=BricoleMoi2026_AdminSecretKey!
      - CENTRIFUGO_ADMIN_SECRET=BricoleMoi2026_AdminJwtSecretToken!
EOF

cat << 'EOF' > config.json
{
  "token_hmac_secret_key": "bricolemoi_super_jwt_secret_key_v5_prod_2026",
  "admin": true,
  "admin_password": "BricoleMoi2026_AdminSecretKey!",
  "admin_secret": "BricoleMoi2026_AdminJwtSecretToken!",
  "api_key": "bricolemoi_http_api_key_v5_secret",
  "allowed_origins": ["*"],
  "client": {
    "allowed_origins": ["*"],
    "history_max_publication_limit": 100,
    "max_message_size": 65536
  },
  "namespaces": [
    { "name": "jobs", "allow_subscribe_for_anonymous": true, "allow_publish_for_anonymous": true, "history_size": 50, "history_ttl": "300s", "force_recovery": true },
    { "name": "tracking", "allow_subscribe_for_anonymous": true, "allow_publish_for_anonymous": true, "history_size": 10, "history_ttl": "60s" },
    { "name": "user", "allow_subscribe_for_anonymous": true, "allow_publish_for_anonymous": true, "history_size": 20, "history_ttl": "3600s", "presence": true },
    { "name": "admin", "allow_subscribe_for_anonymous": true, "allow_publish_for_anonymous": true, "history_size": 50, "history_ttl": "86400s" }
  ]
}
EOF

# 3. Lancement du conteneur
echo "⚡ Démarrage de Centrifugo v5..."
docker compose up -d

echo ""
echo "✔ CENTRIFUGO EST DÉMARRÉ AVEC SUCCÈS SUR LE PORT 8000 !"
echo "🌐 Tableau de bord : http://$(curl -s ifconfig.me):8000"
echo "🔑 Mot de passe Admin : BricoleMoi2026_AdminSecretKey!"
echo "═══════════════════════════════════════════════════════════════"

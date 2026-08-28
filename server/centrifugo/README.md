# 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS

Ce dossier contient l'ensemble des fichiers nécessaires pour faire tourner votre propre cluster **Centrifugo v5** en conteneur Docker avec un nom de domaine sécurisé en SSL (`wss://...`).

---

## 📋 Prérequis sur votre VPS
- Serveur VPS sous Ubuntu 22.04 / 24.04 (ou Debian).
- **Docker** et **Docker Compose** installés :
  ```bash
  curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
  ```
- Un sous-domaine qui pointe vers l'adresse IP de votre VPS (ex: `ws.bricolemoi.ma`).

---

## ⚡ Étape 1 : Copier les fichiers et Démarrer Centrifugo
1. Créez un dossier sur votre VPS :
   ```bash
   mkdir -p /opt/bricolemoi-centrifugo
   cd /opt/bricolemoi-centrifugo
   ```
2. Déposez-y `docker-compose.yml` et `config.json`.
3. Démarrez le service en arrière-plan :
   ```bash
   docker compose up -d
   ```
4. Vérifiez que Centrifugo tourne :
   ```bash
   docker compose ps
   # Doit afficher : Up (healthy) sur le port 8000
   ```

---

## 🔒 Étape 2 : Configurer Nginx & Certificat SSL (HTTPS / WSS)
1. Installez Nginx et Certbot :
   ```bash
   sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
   ```
2. Copiez `nginx-centrifugo.conf` dans `/etc/nginx/sites-available/ws.bricolemoi.ma` :
   ```bash
   sudo cp nginx-centrifugo.conf /etc/nginx/sites-available/ws.bricolemoi.ma
   sudo ln -s /etc/nginx/sites-available/ws.bricolemoi.ma /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
3. Générez le certificat SSL gratuit Let's Encrypt :
   ```bash
   sudo certbot --nginx -d ws.bricolemoi.ma
   ```

---

## 🖥️ Étape 3 : Accéder au Dashboard Admin Centrifugo
- Ouvrez votre navigateur sur : `https://ws.bricolemoi.ma`
- Mot de passe Admin : `BricoleMoi2026_AdminSecretKey!`
- Vous verrez en direct le graphique des connexions WebSockets et le trafic des canaux SOS !

---

## 📱 Étape 4 : Activer Centrifugo dans le projet Frontend (Vite)
Dans le fichier `.env` de votre application BricoleMoi, ajoutez :
```env
VITE_CENTRIFUGO_WS_URL=wss://ws.bricolemoi.ma/connection/websocket
```
L'application basculera automatiquement sur votre VPS Centrifugo avec une latence ultra-faible (< 15ms) !

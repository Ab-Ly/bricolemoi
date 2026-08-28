/**
 * Client WebSocket haute performance pour Centrifugo v5 (Open Source sur VPS)
 * Gère la connexion résiliente, les souscriptions multi-canaux et la publication d'événements.
 */

const CENTRIFUGO_WS_URL =
  import.meta.env.VITE_CENTRIFUGO_WS_URL ||
  'wss://centrifugo.51.255.46.206.sslip.io/connection/websocket';
const CENTRIFUGO_TOKEN = import.meta.env.VITE_CENTRIFUGO_TOKEN || '';

export const isCentrifugoConfigured = Boolean(CENTRIFUGO_WS_URL && CENTRIFUGO_WS_URL.startsWith('ws'));

class CentrifugoClient {
  constructor() {
    this.ws = null;
    this.url = CENTRIFUGO_WS_URL;
    this.token = CENTRIFUGO_TOKEN;
    this.isConnected = false;
    this.isConnecting = false;
    this.commandId = 1;
    this.callbacks = new Map();
    this.channelListeners = new Map();
    this.subscribedChannels = new Set();
    this.reconnectTimeout = null;
    this.pingInterval = null;
    this.clientId = null;
  }

  connect() {
    if (!isCentrifugoConfigured || typeof window === 'undefined') return;
    if (this.isConnected || this.isConnecting) return;

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        // Envoi de la commande de connexion initiale Centrifugo v5
        const connectCmd = {
          id: this.commandId++,
          connect: {
            token: this.token || ''
          }
        };
        this.sendRaw(connectCmd);
      };

      this.ws.onmessage = (event) => {
        try {
          const lines = event.data.split('\n').filter(Boolean);
          for (const line of lines) {
            const msg = JSON.parse(line);
            this.handleIncomingMessage(msg);
          }
        } catch (e) {
          console.warn('[Centrifugo] Erreur parsing message:', e);
        }
      };

      this.ws.onclose = () => {
        this.cleanup();
        this.scheduleReconnect();
      };

      this.ws.onerror = (err) => {
        console.warn('[Centrifugo] WebSocket erreur:', err);
        this.cleanup();
        this.scheduleReconnect();
      };
    } catch (err) {
      console.warn('[Centrifugo] Impossible d’initier la connexion:', err);
      this.cleanup();
      this.scheduleReconnect();
    }
  }

  handleIncomingMessage(msg) {
    // 1. Réponse de connexion Centrifugo v5
    if (msg.connect || msg.result?.client || (msg.id === 1 && !msg.error)) {
      this.isConnected = true;
      this.isConnecting = false;
      this.clientId = msg.connect?.client || msg.result?.client || 'client-v5';
      console.info('[Centrifugo] 🟢 Connecté au VPS temps réel (Client ID:', this.clientId, ')');

      // Démarrage du ping régulier (heartbeat 25s)
      this.startHeartbeat();

      // Réabonnement automatique à tous les canaux actifs
      this.subscribedChannels.forEach((channel) => {
        this.sendSubscribeCommand(channel);
      });
    }

    // 2. Publication reçue sur un canal (format push v5 ou direct)
    const pub = msg.pub || msg.push?.pub;
    const channel = msg.channel || msg.push?.channel;

    if (pub && channel) {
      const data = pub.data;
      const listeners = this.channelListeners.get(channel);
      if (listeners) {
        listeners.forEach((callback) => {
          try {
            callback(data);
          } catch (err) {
            console.error('[Centrifugo Handler Error]:', err);
          }
        });
      }
    }

    // 3. Réponse d'une commande via callback
    if (msg.id && this.callbacks.has(msg.id)) {
      const cb = this.callbacks.get(msg.id);
      this.callbacks.delete(msg.id);
      cb(msg);
    }
  }

  sendRaw(obj) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(obj));
    }
  }

  sendSubscribeCommand(channel) {
    const subCmd = {
      id: this.commandId++,
      subscribe: {
        channel
      }
    };
    this.sendRaw(subCmd);
  }

  subscribe(channel, callback) {
    if (!this.channelListeners.has(channel)) {
      this.channelListeners.set(channel, new Set());
    }
    this.channelListeners.get(channel).add(callback);
    this.subscribedChannels.add(channel);

    if (!this.isConnected) {
      this.connect();
    } else {
      this.sendSubscribeCommand(channel);
    }

    // Retourne la fonction de désabonnement
    return () => {
      const set = this.channelListeners.get(channel);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this.channelListeners.delete(channel);
          this.subscribedChannels.delete(channel);
          if (this.isConnected) {
            const unsubCmd = {
              id: this.commandId++,
              unsubscribe: { channel }
            };
            this.sendRaw(unsubCmd);
          }
        }
      }
    };
  }

  async publish(channel, data) {
    if (!this.isConnected) {
      this.connect();
      for (let i = 0; i < 25; i++) {
        if (this.isConnected && this.ws && this.ws.readyState === WebSocket.OPEN) break;
        await new Promise((r) => setTimeout(r, 100));
      }
    }

    return new Promise((resolve) => {
      const id = this.commandId++;
      this.callbacks.set(id, (res) => {
        resolve(!res.error);
      });

      const pubCmd = {
        id,
        publish: {
          channel,
          data
        }
      };
      this.sendRaw(pubCmd);

      // Timeout de sécurité si pas de réponse
      setTimeout(() => {
        if (this.callbacks.has(id)) {
          this.callbacks.delete(id);
          resolve(false);
        }
      }, 3000);
    });
  }

  startHeartbeat() {
    if (this.pingInterval) clearInterval(this.pingInterval);
    this.pingInterval = setInterval(() => {
      if (this.isConnected) {
        this.sendRaw({}); // Ping Centrifugo vide
      }
    }, 25000);
  }

  cleanup() {
    this.isConnected = false;
    this.isConnecting = false;
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  scheduleReconnect() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = setTimeout(() => {
      if (isCentrifugoConfigured) {
        this.connect();
      }
    }, 3000);
  }
}

// Instance Singleton
export const centrifugo = new CentrifugoClient();

// Auto-connexion immédiate au WebSocket dès le chargement de l'application
if (typeof window !== 'undefined' && isCentrifugoConfigured) {
  try {
    centrifugo.connect();
  } catch (e) {}
}

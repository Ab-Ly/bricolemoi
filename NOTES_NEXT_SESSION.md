# 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)

**Date :** 21 Août 2026  
**Statut Git :** Synchronisé sur `origin/main`

---

## 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### 📌 Concept & Spécification Validée
Pour maximiser l'adoption des artisans et supprimer toute crainte de perdre 15 DH sur un faux lead :

1. **Déblocage & Réservation (Escrow) :**
   - Le Maâlem clique sur « Accepter la mission » (vérification solde $\ge 15\text{ DH}$).
   - Les 15.00 DH sont placés en **`RESERVED` / En attente** (non débités définitivement).
   - L'artisan ne peut avoir qu'**1 seule mission active en instance à la fois**.

2. **Cas 1 : Mission Réalisée avec Succès (Débit Confirmé)**
   - L'artisan valide « Travail Terminé » + prix final convenu.
   - Le client confirme la fin des travaux + note 5★ et avis.
   - **Débit définitif :** La transaction passe de `RESERVED` à `VALIDATED` (`-15.00 DH`).

3. **Cas 2 : Abandon / Mission Non Réalisable (Restitution 0.00 DH)**
   - L'artisan déclare « Mission Non Réalisable » (ex: pièce manquante, faux problème).
   - Double-check automatique côté client : confirmation de l'abandon.
   - **Libération de la réserve :** La transaction passe à `CANCELLED` (`0.00 DH` débité), les 15 DH retournent dans le solde disponible.
   - Le client peut re-déclencher son SOS instantanément vers d'autres artisans.

---

## 🛠️ Plan d'Implémentation Technique pour l'autre PC

1. **Base de Données / Transactions :**
   - Mettre à jour `public.transactions` pour supporter les statuts : `PENDING`, `RESERVED`, `VALIDATED`, `CANCELLED`.
2. **Contextes d'État :**
   - [`src/context/AppContext.jsx`](file:///c:/my%20project/bricolemoi/src/context/AppContext.jsx) : fonctions `reserveLeadCredit(leadId)`, `confirmLeadDebit(leadId)`, `releaseLeadCredit(leadId)`.
   - [`src/context/EmergencyFlowContext.jsx`](file:///c:/my%20project/bricolemoi/src/context/EmergencyFlowContext.jsx) : intégration du flux d'abandon et de réassignation automatique.
3. **Composants UI :**
   - [`src/components/MaalemView.jsx`](file:///c:/my%20project/bricolemoi/src/components/MaalemView.jsx) : affichage du solde avec distinction *(Solde Total vs Solde Disponible)* + bouton *"Déclarer mission non réalisable"*.
   - [`src/components/ReviewModal.jsx`](file:///c:/my%20project/bricolemoi/src/components/ReviewModal.jsx) / vue client : confirmation de clôture déclenchant la déduction finale des 15 DH.

---

## 📦 Ce qui a été Réalisé et Poussé lors de cette Session

- ✅ **Auto-remplissage SIM 1-Clic :** `autoComplete="tel"`, `inputMode="tel"` dans `AuthModal.jsx`.
- ✅ **Validation Mobile Stricte Anti-Gaspillage SMS :** Blocage des fixes `05...` côté client et serveur (`api/send-otp.js`).
- ✅ **WebOTP & iOS AutoFill :** Lecture et validation automatique du code SMS à la volée.
- ✅ **Web Push Notifications PWA pour Maâlems :** Table `push_subscriptions`, service `pushNotificationService.js`, bannière `PushNotificationBanner.jsx`, et endpoint `api/send-push.js`.
- ✅ **Graphe Visuel Interactif :** Disponible dans [`architecture-graph.html`](file:///c:/my%20project/bricolemoi/architecture-graph.html).

# Modern Clean & Trust Engineering Guidelines (BricoleMoi)

Apply these rules strictly to all React + Tailwind CSS code in this PWA (`bricolemoi`):

## 1. Visual Identity & Palette (« Modern Clean & Trust »)
- **Background**: Soft pearl/off-white background (`bg-slate-50` / `#F8FAFC` or `bg-white`).
- **Typography**: High-contrast, clean slate typography (`text-slate-900` for titles, `text-slate-700` for body, `text-slate-500` for subtitles, `font-sans` / `Inter`).
- **Cards & Containers**: Crisp white cards with soft subtle elevation (`bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`).
- **Category & Icon Badges**: Clean pastel badges (`bg-blue-50 text-blue-600 border border-blue-100`, `bg-amber-50 text-amber-600 border border-amber-100`, `bg-emerald-50 text-emerald-600 border border-emerald-100`).

## 2. Action Buttons & Accents
- **Primary Action Buttons (Client / Global)**: Royal Blue & Indigo gradient (`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-blue-500/20 active:scale-95 transition-all`).
- **Secondary / Maâlem Action Buttons**: Warm Safran / Amber gradient (`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-amber-500/20 active:scale-95 transition-all`).
- **Neutral Outlined Buttons**: Clean white buttons with subtle borders (`bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs active:scale-95 transition-all`).

## 3. Map & Overlay Panels
- Floating clean glass panels (`bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 shadow-xl`).
- CartoDB Positron / OpenStreetMap Clean Light tiles (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png` or Positron).

## 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin)
**OBLIGATION ABSOLUE SUR CHAQUE DÉVELOPPEMENT / MODIFICATION :**
Toute modification, ajout de fonctionnalité ou correction doit OBLIGATOIREMENT être pensée, implémentée et synchronisée sur les **3 piliers indissociables de la plateforme** :
1. **Côté CLIENT** : Demandes SOS, suivi GPS temps réel, validation de fin de travaux, notation 1-5★ avec badges exclusifs, historique avec date/heure et tarification Accord Direct.
2. **Côté MAÂLEM** : Alerte radar, guidage GPS vers le quartier exact (sans repli Casablanca), déblocage (15 DH), exécution, réception de l'avis et synchronisation du solde de leads.
3. **Côté ADMIN** : Supervision des missions en direct, fiches Maâlems avec KPI et historique réel de chantiers, centre d'arbitrage/litiges avec recoupement complet Client + Maâlem (noms, téléphones, badges cohérents).
4. **Zéro Donnée Forcée** : Aucun tarif imposé (Accord Direct), aucune fausse photo stock d'Unsplash, aucun repli GPS arbitraire, aucune note parfaite de 5.0 imposée si 0 avis.

## 5. Règle Stricte Identifiants & Base de Données (PocketBase VPS)
- **Standard d'Identifiant Unique** : Tout identifiant d'entité (`profiles`, `interventions`, `maalem_details`, `transactions`, `reviews`, etc.) est **EXCLUSIVEMENT un string de 15 caractères alphanumériques minuscules** (`[a-z0-9]{15}`), natif PocketBase.
- **Interdiction Formelle du Champ `uuid`** : Ne JAMAIS réintroduire de champ ou propriété `uuid` ni d'acrobatie `r.uuid || r.id`. L'identifiant s'appelle TOUJOURS et UNIQUEMENT `id`.
- **Génération Côté Client** : Toujours utiliser `generatePbId()` (15 caractères). Ne JAMAIS générer d'UUID 36 caractères (`crypto.randomUUID()`) ou d'IDs arbitraires (`1`, `"m1"`).
- **Synchronisation du Schéma & Typage** : Toute modification ou ajout de collection PocketBase sur le VPS doit être suivie de l'exécution de `npm run typegen` (`scripts/generate-types.js`) pour régénérer `src/types/pocketbase-types.ts`.

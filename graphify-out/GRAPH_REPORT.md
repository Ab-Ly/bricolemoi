# Graph Report - bricolemoi  (2026-08-20)

## Corpus Check
- 84 files · ~211,594 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 311 nodes · 670 edges · 54 communities (26 shown, 28 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b3b08c5f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AppContext.jsx
- useAuth
- getSpecialtyMeta
- ClientView.jsx
- dependencies
- devDependencies
- AuthContext.jsx
- manifest.json
- LandingPage.jsx
- verify-otp-sms/index.ts
- send-otp-sms/index.ts
- send-infobip-otp/index.ts
- verify-infobip-otp/index.ts
- schema.sql
- verify-maalem-cin/index.ts
- public.transactions
- sw.js
- public.is_admin
- vercel.json
- services_seed.sql
- create_reviews_table.sql
- public.reviews
- public.maalem_details
- public.profiles
- public.interventions
- public.maalem_details
- public.transactions
- public.interventions
- public.maalem_details
- public.profiles
- public.maalem_details
- public.profiles
- public.interventions
- public.maalem_details
- public.transactions
- public.interventions
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- rules/graphify.md
- workflows/graphify.md
- public.maalem_details

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 42 edges
2. `getSpecialtyMeta()` - 20 edges
3. `useApp()` - 18 edges
4. `getSpecialtyLabel()` - 17 edges
5. `EmergencyFlowProvider()` - 14 edges
6. `EnhancedCategoryIcon()` - 13 edges
7. `switchSubdomainInDev()` - 13 edges
8. `InteractiveMap()` - 10 edges
9. `AuthProvider()` - 10 edges
10. `useAblyNotifications()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `UserProfilePage()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/UserProfilePage.jsx → src/context/AuthContext.jsx
- `MainApp()` --calls--> `useApp()`  [EXTRACTED]
  src/App.jsx → src/context/AppContext.jsx
- `MainApp()` --calls--> `useEmergencyFlow()`  [EXTRACTED]
  src/App.jsx → src/context/EmergencyFlowContext.jsx
- `MainApp()` --calls--> `useAblyNotifications()`  [EXTRACTED]
  src/App.jsx → src/hooks/useAblyNotifications.js
- `MainApp()` --calls--> `getAppSubdomain()`  [EXTRACTED]
  src/App.jsx → src/lib/subdomain.js

## Import Cycles
- None detected.

## Communities (54 total, 28 thin omitted)

### Community 0 - "AppContext.jsx"
Cohesion: 0.13
Nodes (33): EmergencySOSModal(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+25 more)

### Community 1 - "useAuth"
Cohesion: 0.20
Nodes (16): App(), MainApp(), AdminDashboard(), AdminAuthModal(), AdminView(), BottomNav(), LandingPage(), Navbar() (+8 more)

### Community 2 - "getSpecialtyMeta"
Cohesion: 0.15
Nodes (22): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+14 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.19
Nodes (13): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), MaalemView(), VoiceRecorder() (+5 more)

### Community 4 - "dependencies"
Cohesion: 0.08
Nodes (25): ably, firebase, framer-motion, leaflet, lucide-react, maplibre-gl, dependencies, ably (+17 more)

### Community 5 - "devDependencies"
Cohesion: 0.08
Nodes (24): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+16 more)

### Community 6 - "AuthContext.jsx"
Cohesion: 0.15
Nodes (25): AuthModal(), UserProfilePage(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider (+17 more)

### Community 7 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 8 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

### Community 13 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 15 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 49 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

## Knowledge Gaps
- **70 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+65 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `useAuth` to `AppContext.jsx`, `getSpecialtyMeta`, `ClientView.jsx`, `AuthContext.jsx`, `LandingPage.jsx`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _70 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12727272727272726 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
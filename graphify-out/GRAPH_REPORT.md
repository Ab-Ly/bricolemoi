# Graph Report - bricolemoi  (2026-08-20)

## Corpus Check
- 88 files · ~213,611 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 331 nodes · 670 edges · 61 communities (28 shown, 33 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cf8f241a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AppContext.jsx
- App.jsx
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
- backend_optimizations.sql
- test_prelude_otp.js
- inspect_prelude.js
- send-otp.js
- verify-otp.js

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 39 edges
2. `getSpecialtyMeta()` - 20 edges
3. `getSpecialtyLabel()` - 17 edges
4. `useApp()` - 17 edges
5. `EnhancedCategoryIcon()` - 13 edges
6. `switchSubdomainInDev()` - 13 edges
7. `EmergencyFlowProvider()` - 12 edges
8. `AuthProvider()` - 11 edges
9. `InteractiveMap()` - 10 edges
10. `AppProvider()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `MainApp()` --calls--> `useEmergencyFlow()`  [EXTRACTED]
  src/App.jsx → src/context/EmergencyFlowContext.jsx
- `MainApp()` --calls--> `useAblyNotifications()`  [EXTRACTED]
  src/App.jsx → src/hooks/useAblyNotifications.js
- `MainApp()` --calls--> `getAppSubdomain()`  [EXTRACTED]
  src/App.jsx → src/lib/subdomain.js
- `AuthModal()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/AuthModal.jsx → src/context/AuthContext.jsx
- `ClientView()` --calls--> `useApp()`  [EXTRACTED]
  src/components/ClientView.jsx → src/context/AppContext.jsx

## Import Cycles
- None detected.

## Communities (61 total, 33 thin omitted)

### Community 0 - "AppContext.jsx"
Cohesion: 0.12
Nodes (34): EmergencySOSModal(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+26 more)

### Community 1 - "App.jsx"
Cohesion: 0.15
Nodes (22): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+14 more)

### Community 2 - "getSpecialtyMeta"
Cohesion: 0.17
Nodes (20): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+12 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.16
Nodes (17): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), CITIES (+9 more)

### Community 4 - "dependencies"
Cohesion: 0.10
Nodes (21): ably, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, ably, firebase (+13 more)

### Community 5 - "devDependencies"
Cohesion: 0.08
Nodes (24): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+16 more)

### Community 6 - "AuthContext.jsx"
Cohesion: 0.19
Nodes (22): AuthModal(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, checkPhoneProfile() (+14 more)

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
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `App.jsx` to `AppContext.jsx`, `getSpecialtyMeta`, `ClientView.jsx`, `AuthContext.jsx`, `LandingPage.jsx`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _70 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12025901942645699 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
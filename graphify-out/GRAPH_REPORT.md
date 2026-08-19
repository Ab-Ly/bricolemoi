# Graph Report - bricolemoi  (2026-08-19)

## Corpus Check
- 80 files · ~205,803 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 300 nodes · 627 edges · 52 communities (26 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f379136e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- EmergencyFlowContext.jsx
- useAuth
- EnhancedCategoryIcon.jsx
- AppContext.jsx
- dependencies
- devDependencies
- AuthContext.jsx
- manifest.json
- LandingPage.jsx
- schema.sql
- public.transactions
- send-infobip-otp/index.ts
- verify-infobip-otp/index.ts
- public.is_admin
- verify-maalem-cin/index.ts
- services_seed.sql
- sw.js
- create_reviews_table.sql
- vercel.json
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
- public.maalem_details
- Dark Sci-Fi Glassmorphism Engineering Guidelines
- rules/graphify.md
- workflows/graphify.md

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 42 edges
2. `useApp()` - 18 edges
3. `getSpecialtyLabel()` - 17 edges
4. `getSpecialtyMeta()` - 16 edges
5. `EnhancedCategoryIcon()` - 13 edges
6. `EmergencyFlowProvider()` - 13 edges
7. `switchSubdomainInDev()` - 13 edges
8. `InteractiveMap()` - 10 edges
9. `AuthProvider()` - 10 edges
10. `useEmergencyFlow()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `UserProfilePage()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/UserProfilePage.jsx → src/context/AuthContext.jsx
- `MainApp()` --calls--> `useApp()`  [EXTRACTED]
  src/App.jsx → src/context/AppContext.jsx
- `MainApp()` --calls--> `useEmergencyFlow()`  [EXTRACTED]
  src/App.jsx → src/context/EmergencyFlowContext.jsx
- `MainApp()` --calls--> `useAblyNotifications()`  [EXTRACTED]
  src/App.jsx → src/hooks/useAblyNotifications.js
- `ClientView()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/ClientView.jsx → src/context/AuthContext.jsx

## Import Cycles
- None detected.

## Communities (52 total, 26 thin omitted)

### Community 0 - "EmergencyFlowContext.jsx"
Cohesion: 0.12
Nodes (31): EmergencySOSModal(), AppProvider(), ACTIONS, EMERGENCY_STATES, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+23 more)

### Community 1 - "useAuth"
Cohesion: 0.19
Nodes (18): App(), MainApp(), AdminDashboard(), AdminAuthModal(), AdminView(), AuthModal(), BottomNav(), LandingPage() (+10 more)

### Community 2 - "EnhancedCategoryIcon.jsx"
Cohesion: 0.28
Nodes (12): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), EnhancedCategoryIcon(), getSpecialtyLabel(), getSpecialtyMeta() (+4 more)

### Community 3 - "AppContext.jsx"
Cohesion: 0.11
Nodes (28): COUNTRY_DIAL_CODES, MOROCCAN_CITIES, CATEGORIES_TAXONOMY, CategorySelector(), CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug() (+20 more)

### Community 4 - "dependencies"
Cohesion: 0.08
Nodes (25): ably, firebase, framer-motion, leaflet, lucide-react, maplibre-gl, dependencies, ably (+17 more)

### Community 5 - "devDependencies"
Cohesion: 0.08
Nodes (24): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+16 more)

### Community 6 - "AuthContext.jsx"
Cohesion: 0.19
Nodes (18): AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, translations, checkPhoneProfile() (+10 more)

### Community 7 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 8 - "LandingPage.jsx"
Cohesion: 0.33
Nodes (5): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer()

### Community 9 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 10 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 49 - "Dark Sci-Fi Glassmorphism Engineering Guidelines"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette, 2. Action Buttons & Accents, 3. Map & Overlay Panels, Dark Sci-Fi Glassmorphism Engineering Guidelines

## Knowledge Gaps
- **71 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+66 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `useAuth` to `EmergencyFlowContext.jsx`, `EnhancedCategoryIcon.jsx`, `AppContext.jsx`, `AuthContext.jsx`, `LandingPage.jsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _71 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `EmergencyFlowContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11522198731501057 - nodes in this community are weakly interconnected._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10853658536585366 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
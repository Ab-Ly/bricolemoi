# Graph Report - bricolemoi  (2026-08-19)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 291 nodes · 621 edges · 49 communities (25 shown, 24 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3272d47e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AppContext.jsx
- AuthContext.jsx
- MaalemView.jsx
- ClientView.jsx
- dependencies
- devDependencies
- infobipAuthService.js
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

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 42 edges
2. `useApp()` - 18 edges
3. `getSpecialtyLabel()` - 17 edges
4. `getSpecialtyMeta()` - 16 edges
5. `EmergencyFlowProvider()` - 13 edges
6. `switchSubdomainInDev()` - 13 edges
7. `EnhancedCategoryIcon()` - 13 edges
8. `InteractiveMap()` - 10 edges
9. `AuthProvider()` - 10 edges
10. `useEmergencyFlow()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `UserProfilePage()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/UserProfilePage.jsx → src/context/AuthContext.jsx
- `AppProvider()` --calls--> `useAuth()`  [EXTRACTED]
  src/context/AppContext.jsx → src/context/AuthContext.jsx
- `EmergencyFlowProvider()` --calls--> `useApp()`  [EXTRACTED]
  src/context/EmergencyFlowContext.jsx → src/context/AppContext.jsx
- `EmergencyFlowProvider()` --calls--> `useAuth()`  [EXTRACTED]
  src/context/EmergencyFlowContext.jsx → src/context/AuthContext.jsx
- `MainApp()` --calls--> `useEmergencyFlow()`  [EXTRACTED]
  src/App.jsx → src/context/EmergencyFlowContext.jsx

## Import Cycles
- None detected.

## Communities (49 total, 24 thin omitted)

### Community 0 - "AppContext.jsx"
Cohesion: 0.12
Nodes (33): EmergencySOSModal(), AppContext, AppProvider(), ACTIONS, EMERGENCY_STATES, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+25 more)

### Community 1 - "AuthContext.jsx"
Cohesion: 0.13
Nodes (24): App(), MainApp(), AdminAuthModal(), AuthModal(), BottomNav(), LandingPage(), Navbar(), ProtectedRoute() (+16 more)

### Community 2 - "MaalemView.jsx"
Cohesion: 0.17
Nodes (21): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), AdminView(), EnhancedCategoryIcon() (+13 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.14
Nodes (17): COUNTRY_DIAL_CODES, MOROCCAN_CITIES, CATEGORIES_TAXONOMY, CategorySelector(), CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug() (+9 more)

### Community 4 - "dependencies"
Cohesion: 0.08
Nodes (25): ably, firebase, framer-motion, leaflet, lucide-react, maplibre-gl, dependencies, ably (+17 more)

### Community 5 - "devDependencies"
Cohesion: 0.08
Nodes (24): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+16 more)

### Community 6 - "infobipAuthService.js"
Cohesion: 0.37
Nodes (12): AuthProvider(), checkPhoneProfile(), formatInternationalPhone(), formatMoroccanPhone(), getLocalPin(), hashPin(), INFOBIP_BASE_URL, loginWithPin() (+4 more)

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

## Knowledge Gaps
- **66 isolated node(s):** `AppContext`, `ACTIONS`, `EmergencyFlowContext`, `initialState`, `activeChannels` (+61 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `AuthContext.jsx` to `LandingPage.jsx`, `AppContext.jsx`, `MaalemView.jsx`, `ClientView.jsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `AppContext`, `ACTIONS`, `EmergencyFlowContext` to the rest of the system?**
  _66 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11840888066604996 - nodes in this community are weakly interconnected._
- **Should `AuthContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13124274099883856 - nodes in this community are weakly interconnected._
- **Should `ClientView.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1396011396011396 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
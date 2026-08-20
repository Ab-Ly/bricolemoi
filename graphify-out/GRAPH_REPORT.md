# Graph Report - bricolemoi  (2026-08-20)

## Corpus Check
- 82 files · ~211,726 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 266 nodes · 644 edges · 23 communities (14 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2b3544b2`
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
- verify-maalem-cin/index.ts
- sw.js
- vercel.json
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- rules/graphify.md
- workflows/graphify.md

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
- `MainApp()` --calls--> `useEmergencyFlow()`  [EXTRACTED]
  src/App.jsx → src/context/EmergencyFlowContext.jsx
- `MainApp()` --calls--> `useAblyNotifications()`  [EXTRACTED]
  src/App.jsx → src/hooks/useAblyNotifications.js
- `MainApp()` --calls--> `getAppSubdomain()`  [EXTRACTED]
  src/App.jsx → src/lib/subdomain.js
- `AuthModal()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/AuthModal.jsx → src/context/AuthContext.jsx

## Import Cycles
- None detected.

## Communities (23 total, 9 thin omitted)

### Community 0 - "AppContext.jsx"
Cohesion: 0.12
Nodes (34): EmergencySOSModal(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EMERGENCY_STATES, EmergencyFlowContext, EmergencyFlowProvider() (+26 more)

### Community 1 - "useAuth"
Cohesion: 0.19
Nodes (18): App(), MainApp(), AdminDashboard(), AdminAuthModal(), AdminView(), BottomNav(), LandingPage(), Navbar() (+10 more)

### Community 2 - "getSpecialtyMeta"
Cohesion: 0.17
Nodes (20): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+12 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.20
Nodes (11): COUNTRY_DIAL_CODES, MOROCCAN_CITIES, CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), MOROCCAN_CITIES, SERVICE_TYPE_MAP (+3 more)

### Community 4 - "dependencies"
Cohesion: 0.08
Nodes (25): ably, firebase, framer-motion, leaflet, lucide-react, maplibre-gl, dependencies, ably (+17 more)

### Community 5 - "devDependencies"
Cohesion: 0.08
Nodes (24): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+16 more)

### Community 6 - "AuthContext.jsx"
Cohesion: 0.14
Nodes (27): AuthModal(), SpecialtySelect(), CITIES, UserProfilePage(), AuthContext, AuthProvider(), app, auth (+19 more)

### Community 7 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 8 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

### Community 49 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

## Knowledge Gaps
- **71 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+66 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `useAuth` to `AppContext.jsx`, `getSpecialtyMeta`, `ClientView.jsx`, `AuthContext.jsx`, `LandingPage.jsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _71 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11790780141843972 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `AuthContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13968253968253969 - nodes in this community are weakly interconnected._
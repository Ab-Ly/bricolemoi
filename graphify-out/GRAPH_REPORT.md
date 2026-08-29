# Graph Report - bricolemoi  (2026-08-29)

## Corpus Check
- 197 files · ~839,179 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10560 nodes · 30321 edges · 197 communities (150 shown, 47 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `49822984`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- public/maplibre-gl.mjs
- assets/maplibre-gl.mjs
- public/maplibre-gl-shared.mjs
- assets/maplibre-gl-shared.mjs
- public/maplibre-gl-dev.mjs
- assets/maplibre-gl-dev.mjs
- assets/maplibre-gl-shared-dev.mjs
- public/maplibre-gl-shared-dev.mjs
- coveringTiles
- get
- get
- get
- interpolate
- get
- get
- extend
- s
- extend
- constructor
- update
- constructor
- decodeGeometryColumn
- get
- push
- ._update
- n
- push
- concat
- ._update
- update
- locationToScreenPoint
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- render
- n
- public/maplibre-gl-worker.mjs
- loadTile
- clone
- readVarint
- s
- .handleEvent
- constructor
- public/maplibre-gl-worker-dev.mjs
- featureFilter
- constructor
- parse
- devDependencies
- addFeature
- queryIntersectsFeature
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- addFeature
- appendRoundCorner
- shapeLines
- UserProfileModal.jsx
- Wu
- get
- eliminateHoles
- getElevation
- eliminateHoles
- writeMessage
- evaluate
- Wu
- sub
- getElevation
- geometry
- useAblySupabaseSync.js
- readVarint
- getChildren
- load
- parse
- App.jsx
- getPitchedLabelPlaneMatrix
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- deepEqual
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- resize
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- .handleEvent
- workflows/graphify.md
- featureFilter
- altitudeFromMercatorZ
- fillExtrusionUniformValues
- inspect_finances.js
- useClientViewState.js
- LandingPage.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- relaunch_centrifugo.js
- appendRoundCorner
- inspect_docker.js
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- decodeFloat64Values
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- convertGeometryVector
- update_centrifugo.js
- serialize
- vercel.json
- sw.js
- clean_test_data.js
- check_labels.js
- simulate.js
- logs.js
- telemetry.js
- check_proxy.js
- list_all_data.js
- test_cycle.js
- placeLayerBucketPart
- Od
- Od
- evaluate
- maalem/MaalemView.jsx
- intersects
- decodeFloat64Values
- intersects
- hasDebugData
- _executeRelevantHandler
- MASTER_DEFINITIVE_MIGRATION.sql
- schema.sql
- admin_auth_and_audit.sql
- backend_optimizations.sql
- CentrifugoClient
- public.transactions
- public.is_admin
- public.push_subscriptions
- supabase-status.js
- 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS
- deploy.sh
- public.unlock_lead_secure
- services_seed.sql
- create_reviews_table.sql
- public.banking_reconciliations
- public.maalem_details
- public.profiles
- public.interventions
- public.maalem_details
- public.reviews
- public.transactions
- public.interventions
- public.maalem_details
- audit.js
- reconcile.js
- package.json
- public.profiles
- watch-deploy.js
- public.maalem_details
- public.profiles
- public.interventions
- public.maalem_details
- public.transactions
- public.interventions
- public.transactions
- public.interventions
- public.maalem_details
- public.profiles
- public.reviews
- public.transactions
- public.interventions
- public.maalem_details

## God Nodes (most connected - your core abstractions)
1. `push()` - 155 edges
2. `push()` - 155 edges
3. `constructor()` - 149 edges
4. `constructor()` - 149 edges
5. `push()` - 145 edges
6. `push()` - 145 edges
7. `constructor()` - 132 edges
8. `constructor()` - 132 edges
9. `n()` - 116 edges
10. `n()` - 116 edges

## Surprising Connections (you probably didn't know these)
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/assets/maplibre-gl-shared-dev.mjs → public/assets/maplibre-gl-shared.mjs
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `constructor()` --indirect_call--> `increment()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `key()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `x()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared.mjs

## Import Cycles
- None detected.

## Communities (197 total, 47 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (554): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+546 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (559): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+551 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (547): Ru(), ac(), add(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature(), addFeatures(), addHalfVertex() (+539 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (546): Ms(), quadrant(), Ru(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+538 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (211): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+203 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (237): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+229 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (242): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep(), applyBlockExceptions() (+234 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (240): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+232 more)

### Community 8 - "coveringTiles"
Cohesion: 0.06
Nodes (43): allowVariableZoom(), allowWorldCopies(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), distanceToTile2d(), distanceToTileSimple() (+35 more)

### Community 9 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (163): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+155 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (163): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+155 more)

### Community 12 - "interpolate"
Cohesion: 0.08
Nodes (27): calculateScaledKey(), calculateTileKey(), coalesce$1(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction(), evaluateIntervalFunction(), exponentialInterpolation() (+19 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (170): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+162 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (160): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+152 more)

### Community 15 - "extend"
Cohesion: 0.03
Nodes (154): _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), bindGradientAndDashTextures(), bindGradientTextures() (+146 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (145): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+137 more)

### Community 17 - "extend"
Cohesion: 0.03
Nodes (144): _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo() (+136 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (109): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+101 more)

### Community 19 - "update"
Cohesion: 0.04
Nodes (67): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold() (+59 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (135): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), backgroundPatternUniformValues(), bgPatternUniformValues(), _calculateTransform() (+127 more)

### Community 21 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (104): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+96 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (124): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+116 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (116): sphereSurfacePointToCoordinates(), addFeature$1(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint(), addPointsTileFeature(), addTileFeatures() (+108 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (99): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _applyResourceTiming(), _checkLoaded() (+91 more)

### Community 25 - "n"
Cohesion: 0.03
Nodes (186): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), Ar(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci() (+178 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (158): sphereSurfacePointToCoordinates(), addCommand(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+150 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (94): array(), assertRootKey(), bind(), checkChild(), checkSubtype(), coalesce$1(), concat(), createExpression() (+86 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (93): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+85 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (121): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+113 more)

### Community 30 - "locationToScreenPoint"
Cohesion: 0.14
Nodes (18): coordinatePoint(), depthAtPoint(), getElevationForLngLat(), getElevationForLngLatZoom(), getMinMaxElevation(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPitch() (+10 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (66): cameraPosition(), _computeClippingPlane(), _createStyleImage(), ic(), mf(), rayPlanetIntersection(), rc(), rs() (+58 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.03
Nodes (94): _diffStyle(), dispatchRenderCallbacks(), loadGlyphRange(), loadSprite(), loadTileJson(), loadURL(), transformRequest(), _updateDiff() (+86 more)

### Community 33 - "render"
Cohesion: 0.05
Nodes (56): anyTilesAfterTime(), commit(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), destruct(), equals(), finish() (+48 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (184): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+176 more)

### Community 35 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (83): cameraPosition(), _computeClippingPlane(), _createStyleImage(), ic(), mf(), rayPlanetIntersection(), rc(), rs() (+75 more)

### Community 36 - "loadTile"
Cohesion: 0.10
Nodes (27): _afterTileLoadWorkerResponse(), backfillDEM(), clearTextures(), deserialize(), destroy(), fillBorder(), _getNeighboringTiles(), _getOverzoomParameters() (+19 more)

### Community 37 - "clone"
Cohesion: 0.06
Nodes (41): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+33 more)

### Community 38 - "readVarint"
Cohesion: 0.09
Nodes (33): bbox(), nextField(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32(), readFixed64() (+25 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (135): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+127 more)

### Community 40 - ".handleEvent"
Cohesion: 0.04
Nodes (58): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+50 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (69): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+61 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+54 more)

### Community 43 - "featureFilter"
Cohesion: 0.05
Nodes (45): convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1(), convertInOp$1(), convertNegation(), _convertToCellCoord() (+37 more)

### Community 44 - "constructor"
Cohesion: 0.03
Nodes (74): _createStyleImage(), addImages(), backfillBorder(), bucketIndex(), compareMax(), constructor(), copy(), copyImage() (+66 more)

### Community 45 - "parse"
Cohesion: 0.04
Nodes (67): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+59 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "addFeature"
Cohesion: 0.08
Nodes (48): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+40 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.08
Nodes (33): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), intersectionTestMapMap() (+25 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (28): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+20 more)

### Community 50 - "dependencies"
Cohesion: 0.10
Nodes (21): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+13 more)

### Community 51 - "writeMessage"
Cohesion: 0.08
Nodes (47): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+39 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "addFeature"
Cohesion: 0.06
Nodes (57): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addHalfVertex() (+49 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.05
Nodes (51): getTileSkewVectors(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+43 more)

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (48): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+40 more)

### Community 56 - "UserProfileModal.jsx"
Cohesion: 0.14
Nodes (31): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY (+23 more)

### Community 57 - "Wu"
Cohesion: 0.07
Nodes (37): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+29 more)

### Community 58 - "get"
Cohesion: 0.03
Nodes (90): add(), addDebugCollisionBoxes(), addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), clamp$2(), constantOr() (+82 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.09
Nodes (34): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+26 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - "writeMessage"
Cohesion: 0.06
Nodes (47): cf(), ey(), finish(), Jv(), mv(), paint(), qv(), realloc() (+39 more)

### Community 63 - "evaluate"
Cohesion: 0.05
Nodes (68): addFeatures(), addGlobalState(), addTextVertices(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), canonicalID(), compareDistPair() (+60 more)

### Community 64 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 65 - "sub"
Cohesion: 0.08
Nodes (42): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+34 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+32 more)

### Community 67 - "geometry"
Cohesion: 0.07
Nodes (54): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox() (+46 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.09
Nodes (44): AdminRealtimeConsole(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+36 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 70 - "getChildren"
Cohesion: 0.06
Nodes (39): addTileFeatures(), appendLeaves(), cluster(), convertToGeoJSON(), createIndex(), createTile(), createTree(), extent() (+31 more)

### Community 71 - "load"
Cohesion: 0.04
Nodes (69): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createStyleImage(), _createTinySDF() (+61 more)

### Community 72 - "parse"
Cohesion: 0.11
Nodes (26): getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), gi(), as(), checkSubtype(), Do(), error() (+18 more)

### Community 73 - "App.jsx"
Cohesion: 0.10
Nodes (27): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+19 more)

### Community 74 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (29): anyTilesAfterTime(), calculatePosMatrix(), equals(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix() (+21 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.15
Nodes (27): useAuthModalLogic(), MOROCCAN_CITIES, AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider (+19 more)

### Community 76 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+8 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (18): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+10 more)

### Community 78 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "resize"
Cohesion: 0.12
Nodes (25): _addDefaultHandlers(), assignEvents(), _containerDimensions(), createQuadTriangles(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+17 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - ".handleEvent"
Cohesion: 0.06
Nodes (50): adjustFarPlaneByHorizonPlane(), _applyChanges(), _blockedByActive(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax() (+42 more)

### Community 89 - "featureFilter"
Cohesion: 0.12
Nodes (19): checkChild(), classifyChildren(), classifyFilter(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+11 more)

### Community 90 - "altitudeFromMercatorZ"
Cohesion: 0.18
Nodes (13): tileIdToLngLatBounds(), altitudeFromMercatorZ(), circumferenceAtLatitude(), getTileUnitsForMeters(), latFromMercatorY(), lngFromMercatorX(), mercatorScale(), meterInMercatorCoordinateUnits() (+5 more)

### Community 91 - "fillExtrusionUniformValues"
Cohesion: 0.20
Nodes (10): fillExtrusionPatternUniformValues(), fillExtrusionUniformValues(), fillOutlinePatternUniformValues(), fillPatternUniformValues(), patternUniformValues(), transformLightDirection(), create$4(), create$6() (+2 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.08
Nodes (36): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientHistoryList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard() (+28 more)

### Community 94 - "LandingPage.jsx"
Cohesion: 0.15
Nodes (13): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, translations (+5 more)

### Community 95 - "send-otp.js"
Cohesion: 0.60
Nodes (4): cleanPhoneNumber(), generateOtpSignature(), handler(), recentRequests

### Community 96 - "upload-media.js"
Cohesion: 0.40
Nodes (3): config, R2_PUBLIC_DOMAIN, s3Client

### Community 97 - "dispatch-sos.js"
Cohesion: 0.60
Nodes (4): formatEvolutionNumber(), getDistanceKm(), handler(), recentDispatches

### Community 98 - "verify-otp.js"
Cohesion: 0.83
Nodes (3): cleanPhoneNumber(), handler(), verifyOtpSignature()

### Community 99 - "relaunch_centrifugo.js"
Cohesion: 0.40
Nodes (4): configB64, configContent, conn, __dirname

### Community 100 - "appendRoundCorner"
Cohesion: 0.11
Nodes (22): tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues() (+14 more)

### Community 101 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 106 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 110 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 111 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 112 - "serialize"
Cohesion: 0.11
Nodes (18): serialize(), setState(), _addEventListener(), deref(), derefLayers(), emitValidationErrors(), filterObject(), fire() (+10 more)

### Community 113 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, framework, headers, outputDirectory, rewrites

### Community 118 - "clean_test_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 121 - "simulate.js"
Cohesion: 0.33
Nodes (6): __dirname, envPath, envVars, __filename, runSimulation(), sleep()

### Community 122 - "logs.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 129 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 130 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 131 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 132 - "evaluate"
Cohesion: 0.04
Nodes (64): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies(), charAllowsLetterSpacing() (+56 more)

### Community 133 - "maalem/MaalemView.jsx"
Cohesion: 0.20
Nodes (7): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), MaalemView()

### Community 134 - "intersects"
Cohesion: 0.27
Nodes (13): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+5 more)

### Community 135 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 136 - "intersects"
Cohesion: 0.27
Nodes (13): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+5 more)

### Community 137 - "hasDebugData"
Cohesion: 0.18
Nodes (12): addDebugCollisionBoxes(), destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData() (+4 more)

### Community 138 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 139 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 140 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 141 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 144 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 147 - "supabase-status.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 148 - "🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS"
Cohesion: 0.29
Nodes (6): 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS, 📋 Prérequis sur votre VPS, ⚡ Étape 1 : Copier les fichiers et Démarrer Centrifugo, 🔒 Étape 2 : Configurer Nginx & Certificat SSL (HTTPS / WSS), 🖥️ Étape 3 : Accéder au Dashboard Admin Centrifugo, 📱 Étape 4 : Activer Centrifugo dans le projet Frontend (Vite)

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

## Knowledge Gaps
- **543 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+538 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `getChildren`, `get`, `constructor`, `extend`, `resize`, `constructor`, `get`, `update`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `getChildren`, `get`, `get`, `constructor`, `extend`, `resize`, `constructor`, `get`, `update`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `assets/maplibre-gl-worker-dev.mjs`, `n`, `loadTile`, `assets/maplibre-gl-dev.mjs`, `intersects`, `s`, `parse`, `get`, `extend`, `resize`, `appendRoundCorner`, `.handleEvent`, `._update`, `get`, `update`, `locationToScreenPoint`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _543 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005276005984723207 - nodes in this community are weakly interconnected._
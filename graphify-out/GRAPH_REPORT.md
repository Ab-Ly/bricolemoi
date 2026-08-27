# Graph Report - bricolemoi  (2026-08-27)

## Corpus Check
- 176 files · ~820,925 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10438 nodes · 30118 edges · 178 communities (132 shown, 46 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `466a6bf5`
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
- s
- n
- get
- get
- get
- get
- get
- _calcMatrices
- n
- _calcMatrices
- constructor
- update
- constructor
- get
- get
- push
- ._update
- public/maplibre-gl-worker.mjs
- push
- evaluate
- ._update
- update
- get
- concat
- assets/maplibre-gl-worker-dev.mjs
- getChildren
- assets/maplibre-gl-worker.mjs
- .reset
- concat
- coveringTiles
- pointsToPolygonDistance
- s
- evaluate
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- extend
- queryIntersectsFeature
- devDependencies
- loadTile
- geometry
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- emplaceBack
- appendRoundCorner
- appendRoundCorner
- AdminDashboard.jsx
- parse
- coveringTiles
- sort
- updateVariableAnchorsForBucket
- eliminateHoles
- query
- update
- extend
- sub
- updateVariableAnchorsForBucket
- queryIntersectsFeature
- useAblySupabaseSync.js
- readVarint
- deepEqual
- loadTile
- _updateWorkerData
- App.jsx
- platformAuditReferee.js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- .handleEvent
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- Wu
- deepEqual
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- LandingPage.jsx
- constructor
- _createTinySDF
- MASTER_DEFINITIVE_MIGRATION.sql
- client/ClientView.jsx
- Wu
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- schema.sql
- convertGeometryVector
- convertGeometryVector
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- admin_auth_and_audit.sql
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- backend_optimizations.sql
- maalem/MaalemView.jsx
- public.transactions
- vercel.json
- sw.js
- public.is_admin
- decodeFloat64Values
- simulate.js
- ErrorBoundary
- telemetry.js
- public.push_subscriptions
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
- public.profiles
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
- audit.js
- reconcile.js
- package.json
- hasDebugData
- _executeRelevantHandler
- watch-deploy.js
- @supabase/supabase-js
- framer-motion

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

## Communities (178 total, 46 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (571): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+563 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (561): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+553 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (576): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+568 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (569): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+561 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (207): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+199 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (216): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+208 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (243): tileIdToLngLatBounds(), addEventDefaultOptions, _addEventListener(), align$1(), altitudeFromMercatorZ(), anchors, angleWith(), angleWithSep() (+235 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (274): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+266 more)

### Community 8 - "s"
Cohesion: 0.06
Nodes (133): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+125 more)

### Community 9 - "n"
Cohesion: 0.03
Nodes (173): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+165 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (164): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+156 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (163): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+155 more)

### Community 12 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (157): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+149 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (157): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+149 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.05
Nodes (97): apply(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing(), _calculateNearFarZIfNeeded(), cameraForBoxAndBearing(), center() (+89 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+135 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (124): add(), addClassName(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), _clearWatch(), cloneImages() (+116 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (96): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold() (+88 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (104): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _cancelRenderFrame() (+96 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (121): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+113 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (122): addIndicesForPlacedSymbol(), addTextVertices(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector() (+114 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (123): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+115 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (88): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), backgroundPatternUniformValues(), bgPatternUniformValues() (+80 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (59): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), dn() (+51 more)

### Community 26 - "push"
Cohesion: 0.04
Nodes (109): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+101 more)

### Community 27 - "evaluate"
Cohesion: 0.03
Nodes (126): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addGlobalState() (+118 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (107): addControl(), addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), checkGeolocationSupport() (+99 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (115): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+107 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 31 - "concat"
Cohesion: 0.04
Nodes (92): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+84 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (88): _diffStyle(), loadGlyphRange(), loadTileJson(), loadURL(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap(), assertRootKey() (+80 more)

### Community 33 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (66): cameraPosition(), _computeClippingPlane(), _createStyleImage(), ic(), mf(), rayPlanetIntersection(), rc(), rs() (+58 more)

### Community 35 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 36 - "concat"
Cohesion: 0.04
Nodes (88): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), createPropertyExpression() (+80 more)

### Community 37 - "coveringTiles"
Cohesion: 0.06
Nodes (51): allowVariableZoom(), allowWorldCopies(), backfillDEM(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel() (+43 more)

### Community 38 - "pointsToPolygonDistance"
Cohesion: 0.07
Nodes (49): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+41 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (138): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+130 more)

### Community 40 - "evaluate"
Cohesion: 0.03
Nodes (87): cameraBoundsWarning(), isStyleLoaded(), accumulatePointsToCentroid(), addFeature(), addFeatures(), addGlobalState(), addLineDashDependencies(), addPatternDependencies() (+79 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (104): add(), addImages(), array(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), checkSubtype() (+96 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (85): loadTileJson(), readImageNow(), addProtocol(), assertRootKey(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints() (+77 more)

### Community 43 - "readVarint"
Cohesion: 0.09
Nodes (33): bbox(), nextField(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32(), readFixed64() (+25 more)

### Community 44 - "extend"
Cohesion: 0.05
Nodes (49): _applyChanges(), _applyResourceTiming(), _blockedByActive(), _dispatchWorkerUpdate(), extend(), extractCoordinates(), fillExtrusionPatternUniformValues(), fillOutlinePatternUniformValues() (+41 more)

### Community 45 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (45): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+37 more)

### Community 46 - "devDependencies"
Cohesion: 0.13
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+7 more)

### Community 47 - "loadTile"
Cohesion: 0.10
Nodes (28): _afterTileLoadWorkerResponse(), clearTextures(), deserialize(), destroy(), doOnceCompleted(), _getNeighboringTiles(), _getOverzoomParameters(), getRTLTextPluginStatus() (+20 more)

### Community 48 - "geometry"
Cohesion: 0.08
Nodes (50): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+42 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (28): EmergencySOSModal(), MaalemRadarHeader(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+20 more)

### Community 50 - "dependencies"
Cohesion: 0.11
Nodes (19): ably, @aws-sdk/client-s3, firebase, lucide-react, maplibre-gl, dependencies, ably, @aws-sdk/client-s3 (+11 more)

### Community 51 - "writeMessage"
Cohesion: 0.08
Nodes (47): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+39 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "emplaceBack"
Cohesion: 0.08
Nodes (39): addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbol(), addSymbols(), addTextVariableAnchorOffsets(), addToLineVertexArray() (+31 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.05
Nodes (53): getTileSkewVectors(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+45 more)

### Community 55 - "appendRoundCorner"
Cohesion: 0.05
Nodes (55): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+47 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.19
Nodes (18): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), ClientHistoryList(), EnhancedCategoryIcon() (+10 more)

### Community 57 - "parse"
Cohesion: 0.05
Nodes (57): array(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+49 more)

### Community 58 - "coveringTiles"
Cohesion: 0.07
Nodes (41): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+33 more)

### Community 59 - "sort"
Cohesion: 0.06
Nodes (48): area(), buildBlockIndex(), clear(), compareXYSlope(), convertInOp$1(), covers(), createNode(), createTree() (+40 more)

### Community 60 - "updateVariableAnchorsForBucket"
Cohesion: 0.05
Nodes (64): _applyDiffToSource(), attemptAnchorPlacement(), calculateVariableLayoutShift(), calculateVariableRenderShift(), demoteFeatureIds(), diffToHashed(), fastInvertSkewMat4(), findOffsetIntersectionPoint() (+56 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - "query"
Cohesion: 0.08
Nodes (29): _convertFromCellCoord(), _convertToCellCoord(), createTree(), expandBy(), finish(), _forEachCell(), getId(), getKey() (+21 more)

### Community 63 - "update"
Cohesion: 0.09
Nodes (24): _createStyleImage(), compareMax(), findPoleOfInaccessibility(), getCentroidCell(), getEpsg3857Coords(), getQuadkey(), getTileBBox(), hasDataProperty() (+16 more)

### Community 64 - "extend"
Cohesion: 0.05
Nodes (69): adjustAntiMeridian(), _afterEase(), applyUpdatedTransform(), bearing(), cameraForBounds(), dblclick(), _ease(), easeOut() (+61 more)

### Community 65 - "sub"
Cohesion: 0.06
Nodes (56): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+48 more)

### Community 66 - "updateVariableAnchorsForBucket"
Cohesion: 0.05
Nodes (64): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getPerspectiveRatio(), getPitchedTextCorrection() (+56 more)

### Community 67 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (46): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), findPoleOfInaccessibility() (+38 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.13
Nodes (34): broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId(), isCurrentUserAdmin() (+26 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (35): loadGlyphRange(), bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 70 - "deepEqual"
Cohesion: 0.11
Nodes (25): serialize(), setState(), addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), deref(), derefLayers() (+17 more)

### Community 71 - "loadTile"
Cohesion: 0.05
Nodes (49): _afterTileLoadWorkerResponse(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), _diffStyle() (+41 more)

### Community 72 - "_updateWorkerData"
Cohesion: 0.12
Nodes (20): _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate(), extractCoordinates(), getCoordinatesFromGeometry() (+12 more)

### Community 73 - "App.jsx"
Cohesion: 0.16
Nodes (20): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), LandingPage() (+12 more)

### Community 74 - "platformAuditReferee.js"
Cohesion: 0.21
Nodes (10): AdminDashboard(), MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, AdminView, getCoordinatesFromDistrict(), auditPlatformState(), healPlatformState() (+2 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (34): useAuthModalLogic(), ClientReviewCompletionModal(), NEGATIVE_BADGES, POSITIVE_BADGES, SENTIMENT_FEEDBACK, COUNTRY_DIAL_CODES, MOROCCAN_CITIES, AuthContext (+26 more)

### Community 76 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+5 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+8 more)

### Community 78 - ".handleEvent"
Cohesion: 0.09
Nodes (31): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), createQuadTriangles(), _fireEvents(), generateMousePanHandler(), generateMousePitchHandler() (+23 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.33
Nodes (4): __dirname, envPath, envVars, __filename

### Community 82 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 83 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.10
Nodes (35): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+27 more)

### Community 89 - "LandingPage.jsx"
Cohesion: 0.10
Nodes (22): CATEGORIES_TAXONOMY, CategorySelector(), ClientSosForm(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer() (+14 more)

### Community 90 - "constructor"
Cohesion: 0.04
Nodes (61): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), copy() (+53 more)

### Community 91 - "_createTinySDF"
Cohesion: 0.14
Nodes (16): _charUsesLocalIdeographFontFamily(), _createTinySDF(), _downloadAndCacheRangePromise(), _drawGlyph(), _fontStyle(), _fontWeight(), _getAndCacheGlyphsPromise(), getGlyphs() (+8 more)

### Community 92 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 93 - "client/ClientView.jsx"
Cohesion: 0.14
Nodes (16): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), findNearestCatalogCity(), getServiceDisplay(), mapCategoryToSlug() (+8 more)

### Community 94 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 95 - "send-otp.js"
Cohesion: 0.60
Nodes (4): cleanPhoneNumber(), generateOtpSignature(), handler(), recentRequests

### Community 96 - "upload-media.js"
Cohesion: 0.40
Nodes (3): config, R2_PUBLIC_DOMAIN, s3Client

### Community 97 - "dispatch-sos.js"
Cohesion: 0.83
Nodes (3): formatEvolutionNumber(), getDistanceKm(), handler()

### Community 98 - "verify-otp.js"
Cohesion: 0.83
Nodes (3): cleanPhoneNumber(), handler(), verifyOtpSignature()

### Community 99 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 100 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 101 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 106 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 111 - "maalem/MaalemView.jsx"
Cohesion: 0.23
Nodes (12): MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemTransactionsModal(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), useMaalemViewState(), MaalemView(), useEmergencyFlow() (+4 more)

### Community 112 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 119 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 121 - "simulate.js"
Cohesion: 0.29
Nodes (7): __dirname, envPath, envVars, __filename, runSimulation(), sleep(), supabase

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 173 - "hasDebugData"
Cohesion: 0.18
Nodes (12): addDebugCollisionBoxes(), destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData() (+4 more)

### Community 174 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

## Knowledge Gaps
- **484 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+479 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `getChildren`, `assets/maplibre-gl-shared.mjs`, `assets/maplibre-gl-worker.mjs`, `get`, `_calcMatrices`, `constructor`, `get`, `coveringTiles`, `evaluate`, `update`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `getChildren`, `assets/maplibre-gl-shared.mjs`, `assets/maplibre-gl-worker.mjs`, `n`, `get`, `get`, `_calcMatrices`, `constructor`, `get`, `coveringTiles`, `evaluate`, `update`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `public/maplibre-gl.mjs`, `public/maplibre-gl-shared.mjs`, `queryIntersectsFeature`, `coveringTiles`, `evaluate`, `get`, `.handleEvent`, `_calcMatrices`, `n`, `constructor`, `get`, `push`, `public/maplibre-gl-worker.mjs`, `get`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _484 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0051021455702699925 - nodes in this community are weakly interconnected._
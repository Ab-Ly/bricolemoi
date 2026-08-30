# Graph Report - bricolemoi  (2026-08-30)

## Corpus Check
- 202 files · ~846,043 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10592 nodes · 30380 edges · 191 communities (144 shown, 47 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6943de32`
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
- concat
- get
- get
- add
- s
- _calcMatrices
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
- get
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- get
- loadTile
- clone
- readVarint
- s
- .handleEvent
- constructor
- public/maplibre-gl-worker-dev.mjs
- _createTinySDF
- constructor
- parse
- devDependencies
- populatePaintArray
- queryIntersectsFeature
- update
- dependencies
- writeMessage
- writeMessage
- dot
- appendRoundCorner
- shapeLines
- AdminDashboard.jsx
- parseCssColor
- featureFilter
- eliminateHoles
- updateVariableAnchorsForBucket
- eliminateHoles
- extend
- pointsToPolygonDistance
- parse
- placeLayerBucketPart
- getElevation
- geometry
- useAblySupabaseSync.js
- readVarint
- placeLayerBucketPart
- extend
- Wu
- App.jsx
- telemetryDaemon.js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- deepEqual
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- interpolate
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- _addDefaultHandlers
- workflows/graphify.md
- deepEqual
- latFromMercatorY
- evaluate
- inspect_finances.js
- InteractiveMap.jsx
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
- _executeRelevantHandler
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- decodeFloat64Values
- update_centrifugo.js
- decodeFloat64Values
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
- addFeature
- maalem/MaalemView.jsx
- deep-audit.js
- public/maplibre-gl-worker.mjs
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

## Communities (191 total, 47 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (562): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+554 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (570): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+562 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (560): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+552 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (559): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+551 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (226): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+218 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (219): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+211 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (259): addEventDefaultOptions, addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), anchors, angleWith() (+251 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (250): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+242 more)

### Community 8 - "coveringTiles"
Cohesion: 0.05
Nodes (60): allowVariableZoom(), allowWorldCopies(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+52 more)

### Community 9 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (164): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+156 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (180): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+172 more)

### Community 12 - "concat"
Cohesion: 0.06
Nodes (71): bind(), coalesce$1(), concat(), createFunction(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction() (+63 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (153): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+145 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (161): atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+153 more)

### Community 15 - "add"
Cohesion: 0.03
Nodes (152): add(), addClassName(), adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform() (+144 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (136): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+128 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.02
Nodes (174): adjustAntiMeridian(), adjustFarPlaneByHorizonPlane(), allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), _calcMatrices() (+166 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (123): addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning(), _cancelRenderFrame(), center() (+115 more)

### Community 19 - "update"
Cohesion: 0.02
Nodes (123): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+115 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (135): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), center() (+127 more)

### Community 21 - "decodeGeometryColumn"
Cohesion: 0.03
Nodes (112): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+104 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (126): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+118 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (122): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+114 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (90): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+82 more)

### Community 25 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (127): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+119 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (87): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), createPropertyExpression() (+79 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (116): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+108 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (121): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), calculateEasing(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+113 more)

### Community 30 - "get"
Cohesion: 0.03
Nodes (120): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+112 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (75): cameraPosition(), _getOperationsToPerform(), ic(), loadURL(), mf(), mo(), rayPlanetIntersection(), rc() (+67 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (74): loadTileJson(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), extend() (+66 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (27): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+19 more)

### Community 34 - "n"
Cohesion: 0.04
Nodes (162): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+154 more)

### Community 35 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 36 - "loadTile"
Cohesion: 0.06
Nodes (43): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), doOnceCompleted(), _downloadAndCacheRangePromise(), _drawGlyph() (+35 more)

### Community 37 - "clone"
Cohesion: 0.06
Nodes (40): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+32 more)

### Community 38 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 39 - "s"
Cohesion: 0.06
Nodes (128): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+120 more)

### Community 40 - ".handleEvent"
Cohesion: 0.06
Nodes (40): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dragEnd(), dragMove(), dragStart() (+32 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (74): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+66 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (61): addProtocol(), assertRootKey(), br(), clipGeometry(), createExpression(), createStyleLayer(), evaluateProperties(), featureFilter() (+53 more)

### Community 43 - "_createTinySDF"
Cohesion: 0.15
Nodes (15): _charUsesLocalIdeographFontFamily(), _createTinySDF(), _downloadAndCacheRangePromise(), _drawGlyph(), _fontStyle(), _fontWeight(), _getAndCacheGlyphsPromise(), getGlyphs() (+7 more)

### Community 44 - "constructor"
Cohesion: 0.03
Nodes (69): sphereSurfacePointToCoordinates(), add(), addImages(), applyPropertyUpdates(), applySourceDiff(), backfillBorder(), bucketIndex(), calculateScaledKey() (+61 more)

### Community 45 - "parse"
Cohesion: 0.04
Nodes (66): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+58 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "populatePaintArray"
Cohesion: 0.28
Nodes (9): emplace(), getPositionIds(), packColor(), packUint8ToFloat(), populatePaintArray(), populatePaintArrays(), _setPaintValue(), _setPaintValues() (+1 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.08
Nodes (33): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), intersectionTestMapMap() (+25 more)

### Community 49 - "update"
Cohesion: 0.09
Nodes (26): _createStyleImage(), dispatchRenderCallbacks(), compareMax(), findPoleOfInaccessibility(), getCentroidCell(), getEpsg3857Coords(), getQuadkey(), getTileBBox() (+18 more)

### Community 50 - "dependencies"
Cohesion: 0.10
Nodes (21): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+13 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "dot"
Cohesion: 0.15
Nodes (20): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), findAxisMinMax(), fromCenterSizeAngles(), getIdealNearFarPlaneDistance(), getNormalizedNearPlane(), isParallelogram(), add$4() (+12 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.06
Nodes (46): getTileSkewVectors(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+38 more)

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (49): addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+41 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.14
Nodes (31): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY (+23 more)

### Community 57 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 58 - "featureFilter"
Cohesion: 0.07
Nodes (37): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), expandBy(), featureFilter() (+29 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 60 - "updateVariableAnchorsForBucket"
Cohesion: 0.07
Nodes (45): calculateVariableRenderShift(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getPerspectiveRatio(), getPitchedTextCorrection(), getPixelScale(), getShiftedAnchor() (+37 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "extend"
Cohesion: 0.04
Nodes (83): _afterEase(), _applyChanges(), applyUpdatedTransform(), bearing(), _blockedByActive(), calculateCameraOptionsFromTo(), dblclick(), _ease() (+75 more)

### Community 63 - "pointsToPolygonDistance"
Cohesion: 0.12
Nodes (30): bboxToBBoxDistance(), compareDistPair(), distance(), _down(), getBBox(), getLngLatFromTileCoord(), getRangeSize(), isRangeSafe() (+22 more)

### Community 64 - "parse"
Cohesion: 0.07
Nodes (39): bo(), co(), Do(), getPitchedTextCorrection(), gi(), go(), ho(), ko() (+31 more)

### Community 65 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 66 - "getElevation"
Cohesion: 0.08
Nodes (37): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+29 more)

### Community 67 - "geometry"
Cohesion: 0.08
Nodes (50): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+42 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.10
Nodes (45): AdminRealtimeConsole(), AdminSystemHealthMatrix(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID (+37 more)

### Community 69 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 70 - "placeLayerBucketPart"
Cohesion: 0.08
Nodes (31): _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), demoteFeatureIds(), diffToHashed() (+23 more)

### Community 71 - "extend"
Cohesion: 0.05
Nodes (69): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _diffStyle(), _dispatchWorkerUpdate(), doOnceCompleted() (+61 more)

### Community 72 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 73 - "App.jsx"
Cohesion: 0.09
Nodes (28): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+20 more)

### Community 74 - "telemetryDaemon.js"
Cohesion: 0.31
Nodes (13): collectSystemTelemetry(), __dirname, envPath, envVars, fetchWithTimeout(), __filename, probeCentrifugo(), probeEvolutionApi() (+5 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.11
Nodes (35): useAuthModalLogic(), ClientReviewCompletionModal(), findNearestCatalogCity(), mapCategoryToSlug(), NEGATIVE_BADGES, POSITIVE_BADGES, SENTIMENT_FEEDBACK, useClientViewState() (+27 more)

### Community 76 - "scripts"
Cohesion: 0.09
Nodes (23): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+15 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.07
Nodes (27): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+19 more)

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

### Community 82 - "interpolate"
Cohesion: 0.22
Nodes (11): from(), getArrayValueLength(), hclToRgb(), interpolate(), interpolateArray(), interpolateNumber(), isNonInterpolableArrayChange(), lab2xyz() (+3 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.04
Nodes (60): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+52 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "_addDefaultHandlers"
Cohesion: 0.22
Nodes (14): _addDefaultHandlers(), assignEvents(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter(), getCoordinatesCenterTileID() (+6 more)

### Community 89 - "deepEqual"
Cohesion: 0.09
Nodes (31): serialize(), setState(), addCommand(), _addEventListener(), addSource(), canUpdateGeoJSON(), deepEqual(), diff() (+23 more)

### Community 90 - "latFromMercatorY"
Cohesion: 0.28
Nodes (9): tileIdToLngLatBounds(), getTileUnitsForMeters(), latFromMercatorY(), lngFromMercatorX(), mercatorScale(), meterInMercatorCoordinateUnits(), tileCoordinatesToLocation(), tileCoordinatesToMercatorCoordinates() (+1 more)

### Community 91 - "evaluate"
Cohesion: 0.03
Nodes (83): calculateVariableRenderShift(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), array(), _calculate() (+75 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "InteractiveMap.jsx"
Cohesion: 0.11
Nodes (20): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientSosForm(), getServiceDisplay() (+12 more)

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
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 101 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 106 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 110 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 111 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 112 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

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

### Community 132 - "addFeature"
Cohesion: 0.07
Nodes (50): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addFeature(), addFeatures(), addSymbol(), addSymbols() (+42 more)

### Community 133 - "maalem/MaalemView.jsx"
Cohesion: 0.20
Nodes (7): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), MaalemView()

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (72): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), determineAverageLineWidth() (+64 more)

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
- **560 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+555 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `get`, `_calcMatrices`, `update`, `constructor`, `_addDefaultHandlers`, `push`, `get`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `get`, `get`, `_calcMatrices`, `update`, `constructor`, `_addDefaultHandlers`, `push`, `get`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `assets/maplibre-gl-worker-dev.mjs`, `n`, `loadTile`, `assets/maplibre-gl-dev.mjs`, `s`, `parse`, `get`, `_calcMatrices`, `get`, `decodeGeometryColumn`, `appendRoundCorner`, `_addDefaultHandlers`, `._update`, `update`, `extend`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _560 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.00515435018746277 - nodes in this community are weakly interconnected._
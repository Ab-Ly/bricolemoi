# Graph Report - bricolemoi  (2026-08-27)

## Corpus Check
- 178 files · ~822,124 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10456 nodes · 30150 edges · 178 communities (133 shown, 45 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e7c0120`
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
- extend
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
- resize
- assets/maplibre-gl-worker.mjs
- .handleEvent
- concat
- coveringTiles
- geometry
- s
- evaluate
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- serialize
- queryIntersectsFeature
- devDependencies
- parse
- geometry
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- addFeature
- shapeLines
- shapeLines
- UserProfileModal.jsx
- constructor
- coveringTiles
- eliminateHoles
- updateVariableAnchorsForBucket
- eliminateHoles
- parseCssColor
- update
- appendRoundCorner
- sub
- getElevation
- queryIntersectsFeature
- useAblySupabaseSync.js
- readVarint
- deepEqual
- extend
- intersects
- App.jsx
- geoService.js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- .handleEvent
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- Wu
- placeLayerBucketPart
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- appendRoundCorner
- featureFilter
- warnOnce
- MASTER_DEFINITIVE_MIGRATION.sql
- useClientViewState.js
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
- logs.js
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
- _executeRelevantHandler
- decodeFloat64Values
- watch-deploy.js
- @aws-sdk/client-s3
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

## Communities (178 total, 45 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (556): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+548 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (567): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+559 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (563): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+555 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (576): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+568 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (223): acquire(), acquireRTT(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+215 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (207): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+199 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (252): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+244 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (238): addCommand(), addEventDefaultOptions, _addEventListener(), addImageSection(), addSource(), addTextSection(), align$1(), anchors (+230 more)

### Community 8 - "s"
Cohesion: 0.06
Nodes (133): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+125 more)

### Community 9 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (164): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+156 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (166): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+158 more)

### Community 12 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (174): addBucket(), applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+166 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (160): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+152 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (134): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+126 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (185): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+177 more)

### Community 17 - "extend"
Cohesion: 0.03
Nodes (153): _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo() (+145 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (129): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+121 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (106): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+98 more)

### Community 20 - "constructor"
Cohesion: 0.03
Nodes (101): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _cancelRenderFrame() (+93 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (131): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName() (+123 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+117 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (125): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+117 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (130): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyGlobalStateChanges(), _checkLoaded() (+122 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (69): _computeClippingPlane(), _createStyleImage(), _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers() (+61 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (128): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+120 more)

### Community 27 - "evaluate"
Cohesion: 0.04
Nodes (82): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addFeature(), addFeatures(), addGlobalState(), addSymbol() (+74 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (83): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+75 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (96): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+88 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 31 - "concat"
Cohesion: 0.05
Nodes (75): bind(), coalesce$1(), concat(), createFunction(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction() (+67 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (79): _diffStyle(), loadGlyphRange(), readImageNow(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap(), br(), clipGeometry() (+71 more)

### Community 33 - "resize"
Cohesion: 0.08
Nodes (39): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), _containerDimensions(), createQuadTriangles(), _createStyleImage(), dispatchRenderCallbacks() (+31 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (59): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), dn() (+51 more)

### Community 35 - ".handleEvent"
Cohesion: 0.04
Nodes (66): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dblclick(), _destroyUI(), disable() (+58 more)

### Community 36 - "concat"
Cohesion: 0.05
Nodes (83): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+75 more)

### Community 37 - "coveringTiles"
Cohesion: 0.05
Nodes (53): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint() (+45 more)

### Community 38 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (135): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+127 more)

### Community 40 - "evaluate"
Cohesion: 0.04
Nodes (73): addDebugCollisionBoxes(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies(), charAllowsLetterSpacing() (+65 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (67): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+59 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (60): readImageNow(), addProtocol(), br(), clipGeometry(), computeVideoFrameParameters(), createStyleLayer(), evaluateProperties(), fromVectorTileJs() (+52 more)

### Community 43 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 44 - "serialize"
Cohesion: 0.06
Nodes (39): breakLines(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), freeBufferAfterUpload() (+31 more)

### Community 45 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 46 - "devDependencies"
Cohesion: 0.13
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+7 more)

### Community 47 - "parse"
Cohesion: 0.08
Nodes (38): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+30 more)

### Community 48 - "geometry"
Cohesion: 0.08
Nodes (50): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+42 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.15
Nodes (27): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+19 more)

### Community 50 - "dependencies"
Cohesion: 0.11
Nodes (19): ably, firebase, lucide-react, maplibre-gl, dependencies, ably, firebase, lucide-react (+11 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "addFeature"
Cohesion: 0.07
Nodes (53): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+45 more)

### Community 54 - "shapeLines"
Cohesion: 0.05
Nodes (48): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+40 more)

### Community 55 - "shapeLines"
Cohesion: 0.08
Nodes (33): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+25 more)

### Community 56 - "UserProfileModal.jsx"
Cohesion: 0.14
Nodes (26): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), ClientHistoryList(), EnhancedCategoryIcon() (+18 more)

### Community 57 - "constructor"
Cohesion: 0.02
Nodes (118): add(), addImages(), array(), assertRootKey(), backfillBorder(), bucketIndex(), checkSubtype(), clone() (+110 more)

### Community 58 - "coveringTiles"
Cohesion: 0.05
Nodes (58): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+50 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "updateVariableAnchorsForBucket"
Cohesion: 0.06
Nodes (52): calculatePosMatrix(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getFastPathSimpleProjectionMatrix(), getPerspectiveRatio(), getPitchedTextCorrection(), getShiftedAnchor() (+44 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 63 - "update"
Cohesion: 0.10
Nodes (26): compareMax(), emplace(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions(), hasDataProperty() (+18 more)

### Community 64 - "appendRoundCorner"
Cohesion: 0.09
Nodes (26): fov(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1() (+18 more)

### Community 65 - "sub"
Cohesion: 0.09
Nodes (40): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+32 more)

### Community 66 - "getElevation"
Cohesion: 0.08
Nodes (38): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+30 more)

### Community 67 - "queryIntersectsFeature"
Cohesion: 0.04
Nodes (68): checkIntersection(), circleIntersection(), classifyRings(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1() (+60 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.13
Nodes (36): broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId(), isCurrentUserAdmin() (+28 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "extend"
Cohesion: 0.04
Nodes (82): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures(), createProjectionFromName(), _createTinySDF() (+74 more)

### Community 72 - "intersects"
Cohesion: 0.22
Nodes (15): adjustAntiMeridian(), cameraForBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast(), getWest() (+7 more)

### Community 73 - "App.jsx"
Cohesion: 0.08
Nodes (28): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+20 more)

### Community 74 - "geoService.js"
Cohesion: 0.21
Nodes (12): AdminDashboard(), MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, MOROCCAN_CITIES, findNearestCatalogCity(), geocodeMemoryCache, getCoordinatesFromDistrict() (+4 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.16
Nodes (25): useAuthModalLogic(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, reverseGeocodeMorocco() (+17 more)

### Community 76 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+6 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.07
Nodes (26): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+18 more)

### Community 78 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

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

### Community 83 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.09
Nodes (41): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+33 more)

### Community 89 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 90 - "featureFilter"
Cohesion: 0.05
Nodes (45): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), expandBy(), featureFilter() (+37 more)

### Community 91 - "warnOnce"
Cohesion: 0.04
Nodes (55): _applyDiffToSource(), _applyResourceTiming(), attemptAnchorPlacement(), calculateVariableLayoutShift(), cameraBoundsWarning(), _charUsesLocalIdeographFontFamily(), continuePlacement(), _createTinySDF() (+47 more)

### Community 92 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 93 - "useClientViewState.js"
Cohesion: 0.17
Nodes (15): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity(), getServiceDisplay() (+7 more)

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
Cohesion: 0.15
Nodes (19): MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemTransactionsModal(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), useMaalemViewState(), MaalemView() (+11 more)

### Community 112 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 119 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 121 - "simulate.js"
Cohesion: 0.29
Nodes (7): __dirname, envPath, envVars, __filename, runSimulation(), sleep(), supabase

### Community 122 - "logs.js"
Cohesion: 0.15
Nodes (9): ably, adminChannel, C, __dirname, envPath, envVars, __filename, jobsChannel (+1 more)

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 173 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 174 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

## Knowledge Gaps
- **494 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+489 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **45 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `readVarint`, `get`, `extend`, `constructor`, `get`, `coveringTiles`, `update`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `n`, `readVarint`, `get`, `get`, `extend`, `constructor`, `get`, `coveringTiles`, `update`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `resize`, `public/maplibre-gl-shared.mjs`, `coveringTiles`, `readVarint`, `constructor`, `get`, `_calcMatrices`, `constructor`, `get`, `push`, `public/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _494 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.00518380062305296 - nodes in this community are weakly interconnected._
# Graph Report - bricolemoi  (2026-08-23)

## Corpus Check
- 111 files · ~797,527 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10225 nodes · 29646 edges · 162 communities (120 shown, 42 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3000e1a5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AppContext.jsx
- App.jsx
- MaalemView.jsx
- ClientView.jsx
- assets/maplibre-gl.mjs
- dependencies
- AuthContext.jsx
- manifest.json
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
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
- get
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
- public.push_subscriptions
- public/maplibre-gl-shared.mjs
- public/maplibre-gl.mjs
- public.interventions
- public.transactions
- assets/maplibre-gl-shared.mjs
- public/maplibre-gl-dev.mjs
- public/maplibre-gl-shared-dev.mjs
- assets/maplibre-gl-dev.mjs
- assets/maplibre-gl-shared-dev.mjs
- get
- n
- n
- get
- get
- get
- constructor
- _calcMatrices
- s
- cameraForBoxAndBearing
- _calcMatrices
- get
- constructor
- push
- coveringTiles
- extend
- push
- get
- assets/maplibre-gl-worker-dev.mjs
- ._update
- update
- assets/maplibre-gl-worker.mjs
- update
- ._update
- constructor
- shapeLines
- public/maplibre-gl-worker.mjs
- concat
- extend
- public/maplibre-gl-worker-dev.mjs
- emplaceBack
- evaluate
- parse
- sub
- .handleEvent
- featureFilter
- clone
- parse
- evaluate
- _addDefaultHandlers
- writeMessage
- writeMessage
- render
- eliminateHoles
- shapeLines
- getElevation
- eliminateHoles
- get
- queryIntersectsFeature
- serialize
- concat
- queryIntersectsFeature
- serialize
- readVarint
- readVarint
- sub
- addFeature
- getElevation
- constructor
- Od
- placeLayerBucketPart
- parseCssColor
- .handleEvent
- getChildren
- decodeFloat64Values
- placeLayerBucketPart
- appendRoundCorner
- decodeFloat64Values
- pushNotificationService.js
- resize
- translate
- hasDebugData
- convertGeometryVector
- deepEqual
- deepEqual
- _executeRelevantHandler
- convertGeometryVector
- _executeRelevantHandler
- public.unlock_lead_secure
- public.banking_reconciliations
- LandingPage.jsx
- public.reviews
- public.interventions
- public.maalem_details
- public.profiles
- public.reviews
- public.transactions

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
- `interpolate()` --indirect_call--> `fy`  [INFERRED]
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

## Communities (162 total, 42 thin omitted)

### Community 0 - "AppContext.jsx"
Cohesion: 0.14
Nodes (30): EmergencySOSModal(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+22 more)

### Community 1 - "App.jsx"
Cohesion: 0.16
Nodes (19): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+11 more)

### Community 2 - "MaalemView.jsx"
Cohesion: 0.14
Nodes (30): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+22 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.16
Nodes (16): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), generateFallbackAudioDataUrl() (+8 more)

### Community 4 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (560): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+552 more)

### Community 5 - "dependencies"
Cohesion: 0.04
Nodes (45): ably, autoprefixer, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, ably (+37 more)

### Community 6 - "AuthContext.jsx"
Cohesion: 0.16
Nodes (25): AuthModal(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, checkAndRecordOtpRateLimit() (+17 more)

### Community 7 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 8 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 13 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 15 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 22 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 49 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 59 - "send-otp.js"
Cohesion: 0.67
Nodes (3): cleanPhoneNumber(), handler(), recentRequests

### Community 63 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (576): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+568 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (571): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+563 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (539): Da(), quadrant(), Ru(), Aa(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+531 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (207): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+199 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (239): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), anchors (+231 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (219): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+211 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (261): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+253 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (186): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+178 more)

### Community 75 - "n"
Cohesion: 0.03
Nodes (232): addSprite(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix() (+224 more)

### Community 76 - "n"
Cohesion: 0.03
Nodes (175): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+167 more)

### Community 77 - "get"
Cohesion: 0.04
Nodes (154): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+146 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (210): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+202 more)

### Community 79 - "get"
Cohesion: 0.03
Nodes (162): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+154 more)

### Community 80 - "constructor"
Cohesion: 0.02
Nodes (113): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+105 more)

### Community 81 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+135 more)

### Community 82 - "s"
Cohesion: 0.06
Nodes (130): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+122 more)

### Community 83 - "cameraForBoxAndBearing"
Cohesion: 0.11
Nodes (30): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), fitBounds(), fov(), getEast(), getLesserNonNegativeNonNull(), getNorth() (+22 more)

### Community 84 - "_calcMatrices"
Cohesion: 0.03
Nodes (149): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+141 more)

### Community 85 - "get"
Cohesion: 0.03
Nodes (142): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), applyPropertyUpdates(), applySourceDiff(), calculateGlyphDependencies(), columnToField(), columnTypeHasChildren() (+134 more)

### Community 86 - "constructor"
Cohesion: 0.02
Nodes (131): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), checkGeolocationSupport() (+123 more)

### Community 87 - "push"
Cohesion: 0.03
Nodes (115): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+107 more)

### Community 88 - "coveringTiles"
Cohesion: 0.06
Nodes (51): allowVariableZoom(), allowWorldCopies(), backfillDEM(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel() (+43 more)

### Community 89 - "extend"
Cohesion: 0.03
Nodes (104): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), cameraBoundsWarning(), _charUsesLocalIdeographFontFamily() (+96 more)

### Community 90 - "push"
Cohesion: 0.04
Nodes (104): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+96 more)

### Community 91 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+117 more)

### Community 92 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (63): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+55 more)

### Community 93 - "._update"
Cohesion: 0.04
Nodes (82): addLayer(), addSource(), addSprite(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction(), _createLayers() (+74 more)

### Community 94 - "update"
Cohesion: 0.03
Nodes (95): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _applyGlobalStateChanges(), _areDescendentsComplete(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+87 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (89): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), gc() (+81 more)

### Community 96 - "update"
Cohesion: 0.03
Nodes (97): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+89 more)

### Community 97 - "._update"
Cohesion: 0.04
Nodes (93): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+85 more)

### Community 98 - "constructor"
Cohesion: 0.03
Nodes (67): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+59 more)

### Community 99 - "shapeLines"
Cohesion: 0.05
Nodes (48): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+40 more)

### Community 100 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (66): _computeClippingPlane(), _createStyleImage(), loadURL(), mf(), mo(), rs(), al, bt() (+58 more)

### Community 101 - "concat"
Cohesion: 0.04
Nodes (92): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+84 more)

### Community 102 - "extend"
Cohesion: 0.03
Nodes (105): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio() (+97 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (65): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+57 more)

### Community 104 - "emplaceBack"
Cohesion: 0.09
Nodes (36): addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbol(), addSymbols(), addTextVariableAnchorOffsets(), addTextVertices() (+28 more)

### Community 105 - "evaluate"
Cohesion: 0.03
Nodes (104): sphereSurfacePointToCoordinates(), accumulatePointsToCentroid(), addFeature(), addFeatures(), addGlobalState(), addVertex$1(), allowsLetterSpacing(), anchorIsTooClose() (+96 more)

### Community 106 - "parse"
Cohesion: 0.06
Nodes (45): bo(), co(), Do(), getElevationForLngLatZoom(), getMinMaxElevation(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPitchedTextCorrection() (+37 more)

### Community 107 - "sub"
Cohesion: 0.08
Nodes (41): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+33 more)

### Community 108 - ".handleEvent"
Cohesion: 0.10
Nodes (23): _applyChanges(), _blockedByActive(), _elevateCameraIfInsideTerrain(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches() (+15 more)

### Community 109 - "featureFilter"
Cohesion: 0.06
Nodes (42): convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1(), convertInOp$1(), convertNegation(), _convertToCellCoord() (+34 more)

### Community 110 - "clone"
Cohesion: 0.07
Nodes (32): angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+24 more)

### Community 111 - "parse"
Cohesion: 0.08
Nodes (40): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+32 more)

### Community 112 - "evaluate"
Cohesion: 0.03
Nodes (99): addLineDashDependencies(), addPatternDependencies(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), calculateGlyphDependencies(), canonicalID(), compareDistPair() (+91 more)

### Community 113 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (33): _addDefaultHandlers(), assignEvents(), coordinatePoint(), depthAtPoint(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+25 more)

### Community 114 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 115 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 116 - "render"
Cohesion: 0.07
Nodes (36): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getTerrainCoords(), _getTerrainCoordsForRegularTile() (+28 more)

### Community 117 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 118 - "shapeLines"
Cohesion: 0.07
Nodes (34): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+26 more)

### Community 119 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+32 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (39): area(), buildBlockIndex(), clear(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+31 more)

### Community 121 - "get"
Cohesion: 0.06
Nodes (81): ac(), add(), addIndicesForPlacedSymbol(), ax, bb(), bs(), bx(), clear() (+73 more)

### Community 122 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 123 - "serialize"
Cohesion: 0.08
Nodes (34): completeTask(), containsMaxSafeIntegerValues(), decodeFsst(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getFeatures(), getProtocol() (+26 more)

### Community 124 - "concat"
Cohesion: 0.04
Nodes (103): getTileBoundingVolume(), array(), assertRootKey(), bind(), checkChild(), checkSubtype(), classifyChildren(), classifyFilter() (+95 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.04
Nodes (63): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), distSqr() (+55 more)

### Community 126 - "serialize"
Cohesion: 0.09
Nodes (29): completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), getTransition(), isArrayBuffer() (+21 more)

### Community 127 - "readVarint"
Cohesion: 0.07
Nodes (39): loadGlyphRange(), bbox(), decode(), decodeString$2(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean() (+31 more)

### Community 128 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 129 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 130 - "addFeature"
Cohesion: 0.07
Nodes (53): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+45 more)

### Community 131 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+32 more)

### Community 132 - "constructor"
Cohesion: 0.04
Nodes (64): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+56 more)

### Community 133 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 134 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 135 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 136 - ".handleEvent"
Cohesion: 0.05
Nodes (55): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dragEnd(), dragMove(), dragStart() (+47 more)

### Community 137 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 138 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 139 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 140 - "appendRoundCorner"
Cohesion: 0.11
Nodes (22): tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues() (+14 more)

### Community 141 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 142 - "pushNotificationService.js"
Cohesion: 0.44
Nodes (9): PushNotificationBanner(), getNotificationPermissionState(), isPushSupported(), showLocalPushNotification(), subscribeUserToPush(), testPushNotification(), unsubscribeUserFromPush(), urlBase64ToUint8Array() (+1 more)

### Community 143 - "resize"
Cohesion: 0.08
Nodes (35): _addDefaultHandlers(), assignEvents(), coordinatePoint(), createQuadTriangles(), depthAtPoint(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler() (+27 more)

### Community 144 - "translate"
Cohesion: 0.22
Nodes (10): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getTerrainCoords(), _getTerrainCoordsForRegularTile(), _getTerrainCoordsForTileRanges(), getViewportMatrix(), _isWithinTileRanges() (+2 more)

### Community 145 - "hasDebugData"
Cohesion: 0.33
Nodes (7): addDebugCollisionBoxes(), destroy(), destroyDebugData(), generateCollisionDebugBuffers(), hasDebugData(), hasIconCollisionBoxData(), hasTextCollisionBoxData()

### Community 146 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 147 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 148 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 149 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 150 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 151 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 154 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

## Knowledge Gaps
- **447 isolated node(s):** `recentRequests`, `name`, `private`, `version`, `type` (+442 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `n` to `update`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `featureFilter`, `get`, `resize`, `cameraForBoxAndBearing`, `_calcMatrices`, `get`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `update`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `featureFilter`, `get`, `resize`, `cameraForBoxAndBearing`, `_calcMatrices`, `get`, `constructor`, `get`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `constructor`, `public/maplibre-gl-worker.mjs`, `getChildren`, `get`, `constructor`, `_calcMatrices`, `_addDefaultHandlers`, `evaluate`, `coveringTiles`, `get`, `public/maplibre-gl-shared.mjs`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `name`, `private` to the rest of the system?**
  _447 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13588850174216027 - nodes in this community are weakly interconnected._
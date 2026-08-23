# Graph Report - bricolemoi  (2026-08-23)

## Corpus Check
- 109 files · ~795,760 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10213 nodes · 29641 edges · 151 communities (116 shown, 35 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7418b7ab`
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
- push
- get
- get
- get
- constructor
- _calcMatrices
- flyTo
- s
- extend
- decodeGeometryColumn
- constructor
- push
- evaluate
- update
- push
- get
- assets/maplibre-gl-worker-dev.mjs
- ._update
- update
- assets/maplibre-gl-worker.mjs
- update
- ._update
- constructor
- appendRoundCorner
- public/maplibre-gl-worker.mjs
- concat
- extend
- public/maplibre-gl-worker-dev.mjs
- get
- geometry
- parse
- sub
- .handleEvent
- queryRenderedFeatures
- clone
- mo
- geometry
- coveringTiles
- writeMessage
- writeMessage
- coveringTiles
- eliminateHoles
- performSymbolLayout
- getElevation
- eliminateHoles
- get
- queryIntersectsFeature
- ga
- concat
- queryIntersectsFeature
- render
- readVarint
- readVarint
- sub
- addFeature
- updateVariableAnchorsForBucket
- constructor
- query
- render
- getChildren
- .handleEvent
- featureToGeoJSON
- decodeFloat64Values
- intersects
- appendRoundCorner
- decodeFloat64Values
- pushNotificationService.js
- mergeSourceDiffs
- InteractiveMap.jsx
- am
- deepEqual
- deepEqual
- parse
- _executeRelevantHandler
- LandingPage.jsx

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

## Communities (151 total, 35 thin omitted)

### Community 0 - "AppContext.jsx"
Cohesion: 0.14
Nodes (30): EmergencySOSModal(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+22 more)

### Community 1 - "App.jsx"
Cohesion: 0.16
Nodes (20): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+12 more)

### Community 2 - "MaalemView.jsx"
Cohesion: 0.19
Nodes (22): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+14 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.16
Nodes (17): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), generateFallbackAudioDataUrl() (+9 more)

### Community 4 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (544): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+536 more)

### Community 5 - "dependencies"
Cohesion: 0.04
Nodes (45): ably, autoprefixer, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, ably (+37 more)

### Community 6 - "AuthContext.jsx"
Cohesion: 0.17
Nodes (24): AuthModal(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, checkPhoneProfile() (+16 more)

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

### Community 49 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 59 - "send-otp.js"
Cohesion: 0.67
Nodes (3): cleanPhoneNumber(), handler(), recentRequests

### Community 63 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (497): quadrant(), Ru(), ad, add(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+489 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (531): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+523 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (559): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+551 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (207): acquire(), acquireRTT(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+199 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (258): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+250 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (221): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+213 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (261): tileIdToLngLatBounds(), addEventDefaultOptions, addGlobalState(), align$1(), allowsLetterSpacing(), altitudeFromMercatorZ(), anchors, angleWith() (+253 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (179): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+171 more)

### Community 75 - "n"
Cohesion: 0.04
Nodes (163): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+155 more)

### Community 76 - "push"
Cohesion: 0.02
Nodes (273): addSprite(), calculateCenterFromCameraLngLatAlt(), ci(), _computeTileBoundingVolume(), querySourceFeatures(), _distanceToCenterFromAltElevationPitch(), eo(), es() (+265 more)

### Community 77 - "get"
Cohesion: 0.03
Nodes (164): addBucket(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+156 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (165): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+157 more)

### Community 79 - "get"
Cohesion: 0.04
Nodes (154): atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+146 more)

### Community 80 - "constructor"
Cohesion: 0.02
Nodes (153): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _calculateTransform() (+145 more)

### Community 81 - "_calcMatrices"
Cohesion: 0.03
Nodes (130): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+122 more)

### Community 82 - "flyTo"
Cohesion: 0.04
Nodes (144): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+136 more)

### Community 83 - "s"
Cohesion: 0.05
Nodes (135): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+127 more)

### Community 84 - "extend"
Cohesion: 0.03
Nodes (143): _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo() (+135 more)

### Community 85 - "decodeGeometryColumn"
Cohesion: 0.03
Nodes (111): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+103 more)

### Community 86 - "constructor"
Cohesion: 0.02
Nodes (136): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), _clearWatch() (+128 more)

### Community 87 - "push"
Cohesion: 0.04
Nodes (113): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+105 more)

### Community 88 - "evaluate"
Cohesion: 0.05
Nodes (56): addGlobalState(), addTextVertices(), array(), _calculate(), checkSubtype(), clamp$1(), constrainAngle(), crossFadingFactor() (+48 more)

### Community 89 - "update"
Cohesion: 0.09
Nodes (24): dispatchRenderCallbacks(), compareMax(), findPoleOfInaccessibility(), getCentroidCell(), getEpsg3857Coords(), getQuadkey(), getTileBBox(), hasDataProperty() (+16 more)

### Community 90 - "push"
Cohesion: 0.04
Nodes (107): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+99 more)

### Community 91 - "get"
Cohesion: 0.03
Nodes (135): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), constantOr() (+127 more)

### Community 92 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (89): _diffStyle(), loadGlyphRange(), loadTileJson(), loadURL(), readImageNow(), transformRequest(), _updateDiff(), addProtocol() (+81 more)

### Community 93 - "._update"
Cohesion: 0.04
Nodes (93): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+85 more)

### Community 94 - "update"
Cohesion: 0.04
Nodes (79): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), backfillDEM(), calculateEasing(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+71 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (75): cameraPosition(), _getOperationsToPerform(), ic(), loadURL(), mf(), mo(), rayPlanetIntersection(), rc() (+67 more)

### Community 96 - "update"
Cohesion: 0.03
Nodes (101): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+93 more)

### Community 97 - "._update"
Cohesion: 0.03
Nodes (109): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyGlobalStateChanges(), checkGeolocationSupport() (+101 more)

### Community 98 - "constructor"
Cohesion: 0.03
Nodes (73): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+65 more)

### Community 99 - "appendRoundCorner"
Cohesion: 0.06
Nodes (46): getTileSkewVectors(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+38 more)

### Community 100 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (113): Ar(), cameraPosition(), _computeClippingPlane(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), getRayDirectionFromPixel() (+105 more)

### Community 101 - "concat"
Cohesion: 0.04
Nodes (94): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+86 more)

### Community 102 - "extend"
Cohesion: 0.03
Nodes (105): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures() (+97 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (64): addProtocol(), assertRootKey(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createExpression(), createStyleLayer() (+56 more)

### Community 104 - "get"
Cohesion: 0.03
Nodes (126): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+118 more)

### Community 105 - "geometry"
Cohesion: 0.08
Nodes (50): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+42 more)

### Community 106 - "parse"
Cohesion: 0.07
Nodes (40): acquireRTT(), bindRTT(), coordinatePoint(), ec(), getElevationForLngLat(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom() (+32 more)

### Community 107 - "sub"
Cohesion: 0.10
Nodes (35): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+27 more)

### Community 108 - ".handleEvent"
Cohesion: 0.08
Nodes (32): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), generateMousePanHandler() (+24 more)

### Community 109 - "queryRenderedFeatures"
Cohesion: 0.08
Nodes (36): calculatePosMatrix(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), finish(), _flattenAndSortRenderedFeatures(), getAllIds(), getFastPathSimpleProjectionMatrix() (+28 more)

### Community 110 - "clone"
Cohesion: 0.05
Nodes (52): breakLines(), clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize() (+44 more)

### Community 111 - "mo"
Cohesion: 0.08
Nodes (30): bo(), co(), Do(), getPerspectiveRatio(), ho(), isInsideGrid(), isOffscreen(), ko() (+22 more)

### Community 112 - "geometry"
Cohesion: 0.08
Nodes (51): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox() (+43 more)

### Community 113 - "coveringTiles"
Cohesion: 0.09
Nodes (31): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), _flattenAndSortRenderedFeatures() (+23 more)

### Community 114 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 115 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 116 - "coveringTiles"
Cohesion: 0.06
Nodes (43): allowVariableZoom(), allowWorldCopies(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), distanceToTile2d(), distanceToTileSimple() (+35 more)

### Community 117 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 118 - "performSymbolLayout"
Cohesion: 0.05
Nodes (54): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+46 more)

### Community 119 - "getElevation"
Cohesion: 0.05
Nodes (63): calculateFogMatrix(), calculatePosMatrix(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler() (+55 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 121 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 122 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (48): _getDEMTileMatrix(), checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared() (+40 more)

### Community 123 - "ga"
Cohesion: 0.08
Nodes (32): allowVariableZoom(), allowWorldCopies(), distanceToTile2d(), distanceX(), distanceY(), Dp(), ga(), getCameraFrustum() (+24 more)

### Community 124 - "concat"
Cohesion: 0.04
Nodes (86): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), createPropertyExpression() (+78 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (37): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), getLineWidth() (+29 more)

### Community 126 - "render"
Cohesion: 0.09
Nodes (30): acquireRTT(), anyTilesAfterTime(), bindRTT(), commit(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getRTT(), getTexture() (+22 more)

### Community 127 - "readVarint"
Cohesion: 0.08
Nodes (36): loadGlyphRange(), bbox(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+28 more)

### Community 128 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 129 - "sub"
Cohesion: 0.06
Nodes (56): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+48 more)

### Community 130 - "addFeature"
Cohesion: 0.09
Nodes (41): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+33 more)

### Community 131 - "updateVariableAnchorsForBucket"
Cohesion: 0.04
Nodes (76): _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), attemptAnchorPlacement(), calculateVariableLayoutShift(), calculateVariableRenderShift(), demoteFeatureIds(), diffToHashed() (+68 more)

### Community 132 - "constructor"
Cohesion: 0.02
Nodes (102): _createStyleImage(), add(), addImages(), backfillBorder(), breakLines(), bucketIndex(), calculateScaledKey(), calculateTileKey() (+94 more)

### Community 133 - "query"
Cohesion: 0.08
Nodes (28): _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), expandBy(), _forEachCell(), getId(), getKey(), getState() (+20 more)

### Community 134 - "render"
Cohesion: 0.10
Nodes (29): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getState(), getVisibleCoordinates() (+21 more)

### Community 135 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 136 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 137 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

### Community 138 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 139 - "intersects"
Cohesion: 0.27
Nodes (13): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+5 more)

### Community 140 - "appendRoundCorner"
Cohesion: 0.10
Nodes (24): fov(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromQuat$1() (+16 more)

### Community 141 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 142 - "pushNotificationService.js"
Cohesion: 0.44
Nodes (9): PushNotificationBanner(), getNotificationPermissionState(), isPushSupported(), showLocalPushNotification(), subscribeUserToPush(), testPushNotification(), unsubscribeUserFromPush(), urlBase64ToUint8Array() (+1 more)

### Community 143 - "mergeSourceDiffs"
Cohesion: 0.28
Nodes (9): _applyDiffToSource(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds() (+1 more)

### Community 144 - "InteractiveMap.jsx"
Cohesion: 0.38
Nodes (6): getMapIconSvg(), getMapStyleJson(), InteractiveMap(), MAP_STYLES, ROAD_COLOR_THEMES, SVG_ICONS

### Community 145 - "am"
Cohesion: 0.40
Nodes (5): am(), Dm(), getIlluminationProperties(), om(), sn()

### Community 147 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 148 - "deepEqual"
Cohesion: 0.09
Nodes (30): serialize(), setState(), addCommand(), _addEventListener(), addSource(), canUpdateGeoJSON(), deepEqual(), deref() (+22 more)

### Community 149 - "parse"
Cohesion: 0.06
Nodes (43): array(), checkSubtype(), clamp$1(), constrainAngle(), error(), from(), getArrayValueLength(), getExpectedType() (+35 more)

### Community 153 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 154 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

## Knowledge Gaps
- **446 isolated node(s):** `recentRequests`, `name`, `private`, `version`, `type` (+441 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `getChildren`, `get`, `.handleEvent`, `get`, `coveringTiles`, `extend`, `constructor`, `update`, `ga`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `get`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `getChildren`, `get`, `n`, `.handleEvent`, `get`, `coveringTiles`, `extend`, `constructor`, `update`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `y()` connect `flyTo` to `public/maplibre-gl.mjs`, `constructor`, `public/maplibre-gl-worker.mjs`, `get`, `push`, `constructor`, `_calcMatrices`, `coveringTiles`, `get`, `public/maplibre-gl-shared.mjs`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `name`, `private` to the rest of the system?**
  _446 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13588850174216027 - nodes in this community are weakly interconnected._
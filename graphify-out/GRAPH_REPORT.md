# Graph Report - bricolemoi  (2026-08-22)

## Corpus Check
- 109 files · ~794,750 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10213 nodes · 29641 edges · 149 communities (114 shown, 35 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `538c085a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AppContext.jsx
- AuthContext.jsx
- MaalemView.jsx
- ClientView.jsx
- assets/maplibre-gl.mjs
- dependencies
- infobipAuthService.js
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
- extend
- flyTo
- s
- _calcMatrices
- decodeGeometryColumn
- constructor
- push
- get
- clone
- push
- decodeGeometryColumn
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
- loadTile
- public/maplibre-gl-worker-dev.mjs
- get
- geometry
- .reset
- sub
- extend
- _executeRelevantHandler
- clone
- mo
- geometry
- coveringTiles
- writeMessage
- writeMessage
- coveringTiles
- eliminateHoles
- shapeLines
- getElevation
- eliminateHoles
- get
- queryIntersectsFeature
- placeLayerBucketPart
- concat
- queryIntersectsFeature
- Wu
- readVarint
- readVarint
- sub
- addFeature
- updateVariableAnchorsForBucket
- constructor
- queryRenderedFeatures
- render
- getChildren
- convertGeometryVector
- featureToGeoJSON
- convertGeometryVector
- loadTile
- appendRoundCorner
- populatePaintArray
- pushNotificationService.js
- mergeSourceDiffs
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

## Communities (149 total, 35 thin omitted)

### Community 0 - "AppContext.jsx"
Cohesion: 0.14
Nodes (30): EmergencySOSModal(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+22 more)

### Community 1 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (24): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+16 more)

### Community 2 - "MaalemView.jsx"
Cohesion: 0.14
Nodes (30): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+22 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.16
Nodes (16): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), generateFallbackAudioDataUrl() (+8 more)

### Community 4 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (541): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+533 more)

### Community 5 - "dependencies"
Cohesion: 0.04
Nodes (45): ably, autoprefixer, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, ably (+37 more)

### Community 6 - "infobipAuthService.js"
Cohesion: 0.24
Nodes (19): AuthModal(), AuthProvider(), checkPhoneProfile(), formatInternationalPhone(), formatMoroccanPhone(), getLocalPin(), getPhoneCandidateVariants(), hashPin() (+11 more)

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
Nodes (520): quadrant(), Ru(), ad, add(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+512 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (563): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+555 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (549): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+541 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (209): acquire(), acquireRTT(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+201 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (256): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+248 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (218): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+210 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (260): addEventDefaultOptions, _addEventListener(), addGlobalState(), align$1(), allowsLetterSpacing(), anchors, angleWith(), angleWithSep() (+252 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (185): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+177 more)

### Community 75 - "n"
Cohesion: 0.03
Nodes (178): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+170 more)

### Community 76 - "push"
Cohesion: 0.03
Nodes (259): addSprite(), calculateCenterFromCameraLngLatAlt(), ci(), _computeTileBoundingVolume(), querySourceFeatures(), _distanceToCenterFromAltElevationPitch(), eo(), es() (+251 more)

### Community 77 - "get"
Cohesion: 0.03
Nodes (175): addBucket(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures() (+167 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (181): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+173 more)

### Community 79 - "get"
Cohesion: 0.04
Nodes (156): atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+148 more)

### Community 80 - "constructor"
Cohesion: 0.02
Nodes (113): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+105 more)

### Community 81 - "extend"
Cohesion: 0.03
Nodes (166): adjustAntiMeridian(), _afterEase(), apply(), _applyChanges(), applyUpdatedTransform(), bearing(), _blockedByActive(), _calcMatrices() (+158 more)

### Community 82 - "flyTo"
Cohesion: 0.03
Nodes (149): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+141 more)

### Community 83 - "s"
Cohesion: 0.05
Nodes (142): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+134 more)

### Community 84 - "_calcMatrices"
Cohesion: 0.04
Nodes (107): angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing(), _calculateNearFarZIfNeeded() (+99 more)

### Community 85 - "decodeGeometryColumn"
Cohesion: 0.03
Nodes (111): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+103 more)

### Community 86 - "constructor"
Cohesion: 0.02
Nodes (146): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _calculateTransform() (+138 more)

### Community 87 - "push"
Cohesion: 0.04
Nodes (113): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+105 more)

### Community 88 - "get"
Cohesion: 0.03
Nodes (98): calculateVariableRenderShift(), addDebugCollisionBoxes(), addGlobalState(), addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing() (+90 more)

### Community 89 - "clone"
Cohesion: 0.04
Nodes (52): _createStyleImage(), dispatchRenderCallbacks(), clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+44 more)

### Community 90 - "push"
Cohesion: 0.04
Nodes (107): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+99 more)

### Community 91 - "decodeGeometryColumn"
Cohesion: 0.03
Nodes (112): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+104 more)

### Community 92 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (87): _diffStyle(), loadGlyphRange(), loadTileJson(), loadURL(), readImageNow(), transformRequest(), _updateDiff(), addProtocol() (+79 more)

### Community 93 - "._update"
Cohesion: 0.03
Nodes (102): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray() (+94 more)

### Community 94 - "update"
Cohesion: 0.04
Nodes (86): _addTerrainIdealTiles(), _addTile(), _applyGlobalStateChanges(), _areDescendentsComplete(), backfillDEM(), calculateEasing(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+78 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (74): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), determineAverageLineWidth() (+66 more)

### Community 96 - "update"
Cohesion: 0.02
Nodes (130): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+122 more)

### Community 97 - "._update"
Cohesion: 0.04
Nodes (90): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), checkGeolocationSupport(), _checkLoaded() (+82 more)

### Community 98 - "constructor"
Cohesion: 0.03
Nodes (81): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+73 more)

### Community 99 - "appendRoundCorner"
Cohesion: 0.04
Nodes (58): getTileSkewVectors(), tileIdToLngLatBounds(), align(), allowsVerticalWritingMode(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), calculateBadness() (+50 more)

### Community 100 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (96): Ar(), cameraPosition(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), getRayDirectionFromPixel(), handlePanInertia() (+88 more)

### Community 101 - "concat"
Cohesion: 0.04
Nodes (94): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+86 more)

### Community 102 - "loadTile"
Cohesion: 0.05
Nodes (57): _afterTileLoadWorkerResponse(), _applyResourceTiming(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), _diffStyle(), _dispatchWorkerUpdate() (+49 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (73): addProtocol(), assertRootKey(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createExpression(), createStyleLayer() (+65 more)

### Community 104 - "get"
Cohesion: 0.03
Nodes (117): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+109 more)

### Community 105 - "geometry"
Cohesion: 0.08
Nodes (50): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+42 more)

### Community 106 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 107 - "sub"
Cohesion: 0.10
Nodes (35): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+27 more)

### Community 108 - "extend"
Cohesion: 0.04
Nodes (79): adjustAntiMeridian(), _afterEase(), _applyChanges(), applyUpdatedTransform(), bearing(), _blockedByActive(), cameraForBounds(), dblclick() (+71 more)

### Community 109 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

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
Cohesion: 0.07
Nodes (38): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+30 more)

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

### Community 118 - "shapeLines"
Cohesion: 0.08
Nodes (32): align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript(), charIsWhitespace() (+24 more)

### Community 119 - "getElevation"
Cohesion: 0.08
Nodes (36): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+28 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 121 - "get"
Cohesion: 0.05
Nodes (95): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+87 more)

### Community 122 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (48): _getDEMTileMatrix(), checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared() (+40 more)

### Community 123 - "placeLayerBucketPart"
Cohesion: 0.08
Nodes (31): _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), attemptAnchorPlacement(), calculateVariableLayoutShift(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate() (+23 more)

### Community 124 - "concat"
Cohesion: 0.05
Nodes (80): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+72 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (49): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+41 more)

### Community 126 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 127 - "readVarint"
Cohesion: 0.08
Nodes (36): loadGlyphRange(), bbox(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+28 more)

### Community 128 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 129 - "sub"
Cohesion: 0.10
Nodes (35): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+27 more)

### Community 130 - "addFeature"
Cohesion: 0.09
Nodes (41): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+33 more)

### Community 131 - "updateVariableAnchorsForBucket"
Cohesion: 0.07
Nodes (45): calculateVariableRenderShift(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getPerspectiveRatio(), getPitchedTextCorrection() (+37 more)

### Community 132 - "constructor"
Cohesion: 0.03
Nodes (72): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+64 more)

### Community 133 - "queryRenderedFeatures"
Cohesion: 0.07
Nodes (37): calculateFogMatrix(), calculatePosMatrix(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), _flattenAndSortRenderedFeatures(), getDEMElevation(), _getDEMTileMatrix() (+29 more)

### Community 134 - "render"
Cohesion: 0.10
Nodes (29): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getState(), getVisibleCoordinates() (+21 more)

### Community 135 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 136 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 137 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

### Community 138 - "convertGeometryVector"
Cohesion: 0.14
Nodes (18): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeFloat64Values(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeRleFloat64() (+10 more)

### Community 139 - "loadTile"
Cohesion: 0.15
Nodes (19): _afterTileLoadWorkerResponse(), clearTextures(), deserialize(), destroy(), _getNeighboringTiles(), _getOverzoomParameters(), getRTLTextPluginStatus(), lazyLoad() (+11 more)

### Community 140 - "appendRoundCorner"
Cohesion: 0.10
Nodes (24): fov(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromQuat$1() (+16 more)

### Community 141 - "populatePaintArray"
Cohesion: 0.28
Nodes (9): emplace(), getPositionIds(), packColor(), packUint8ToFloat(), populatePaintArray(), populatePaintArrays(), _setPaintValue(), _setPaintValues() (+1 more)

### Community 142 - "pushNotificationService.js"
Cohesion: 0.44
Nodes (9): PushNotificationBanner(), getNotificationPermissionState(), isPushSupported(), showLocalPushNotification(), subscribeUserToPush(), testPushNotification(), unsubscribeUserFromPush(), urlBase64ToUint8Array() (+1 more)

### Community 143 - "mergeSourceDiffs"
Cohesion: 0.28
Nodes (9): _applyDiffToSource(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds() (+1 more)

### Community 147 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 148 - "deepEqual"
Cohesion: 0.11
Nodes (25): serialize(), setState(), addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), deref(), derefLayers() (+17 more)

### Community 149 - "parse"
Cohesion: 0.09
Nodes (36): array(), assertRootKey(), checkSubtype(), createExpression(), createPropertyExpression(), eachChild(), error(), findZoomCurve() (+28 more)

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

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `getChildren`, `get`, `get`, `coveringTiles`, `_calcMatrices`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `getChildren`, `get`, `n`, `get`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `y()` connect `flyTo` to `public/maplibre-gl.mjs`, `constructor`, `public/maplibre-gl-worker.mjs`, `get`, `push`, `constructor`, `extend`, `coveringTiles`, `get`, `public/maplibre-gl-shared.mjs`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `name`, `private` to the rest of the system?**
  _446 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13588850174216027 - nodes in this community are weakly interconnected._
# Graph Report - bricolemoi  (2026-08-23)

## Corpus Check
- 112 files · ~798,534 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10229 nodes · 29650 edges · 163 communities (121 shown, 42 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d13a3088`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- EmergencyFlowContext.jsx
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
- add
- s
- cameraForBoxAndBearing
- add
- get
- constructor
- push
- coveringTiles
- loadTile
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
- loadTile
- public/maplibre-gl-worker-dev.mjs
- addFeature
- geometry
- parse
- sub
- preventDefault
- extend
- extend
- parse
- geometry
- update
- writeMessage
- writeMessage
- getPitchedLabelPlaneMatrix
- eliminateHoles
- appendRoundCorner
- updateVariableAnchorsForBucket
- eliminateHoles
- get
- queryIntersectsFeature
- clone
- concat
- queryIntersectsFeature
- serialize
- readVarint
- evaluate
- sub
- warnOnce
- getElevation
- constructor
- Wu
- .handleEvent
- renderLayer
- .handleEvent
- intersects
- decodeFloat64Values
- placeLayerBucketPart
- altitudeFromMercatorZ
- intersects
- update
- convertGeometryVector
- Wu
- evaluate
- AppContext.jsx
- deepEqual
- deepEqual
- _executeRelevantHandler
- admin_auth_and_audit.sql
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
- featureToGeoJSON

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

## Communities (163 total, 42 thin omitted)

### Community 0 - "EmergencyFlowContext.jsx"
Cohesion: 0.16
Nodes (26): EmergencySOSModal(), PushNotificationBanner(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState, useAblyNotifications() (+18 more)

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
Nodes (570): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+562 more)

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
Nodes (562): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+554 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (549): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+541 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (537): Da(), quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex() (+529 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (210): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+202 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (261): addEventDefaultOptions, _addEventListener(), align$1(), anchors, angleWith(), angleWithSep(), applyBlockExceptions(), applyTextFit() (+253 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (220): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+212 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (267): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+259 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (165): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+157 more)

### Community 75 - "n"
Cohesion: 0.03
Nodes (238): addSprite(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix() (+230 more)

### Community 76 - "n"
Cohesion: 0.03
Nodes (173): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+165 more)

### Community 77 - "get"
Cohesion: 0.03
Nodes (162): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+154 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (191): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+183 more)

### Community 79 - "get"
Cohesion: 0.04
Nodes (159): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+151 more)

### Community 80 - "constructor"
Cohesion: 0.02
Nodes (109): addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), backgroundPatternUniformValues(), bgPatternUniformValues(), _cancelRenderFrame() (+101 more)

### Community 81 - "add"
Cohesion: 0.03
Nodes (140): add(), addClassName(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing() (+132 more)

### Community 82 - "s"
Cohesion: 0.05
Nodes (138): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+130 more)

### Community 83 - "cameraForBoxAndBearing"
Cohesion: 0.16
Nodes (23): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), fitBounds(), getEast(), getLesserNonNegativeNonNull(), getNorth(), getNorthEast() (+15 more)

### Community 84 - "add"
Cohesion: 0.04
Nodes (111): add(), addClassName(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo() (+103 more)

### Community 85 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+117 more)

### Community 86 - "constructor"
Cohesion: 0.02
Nodes (104): addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport(), _clearWatch(), constructor() (+96 more)

### Community 87 - "push"
Cohesion: 0.03
Nodes (126): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+118 more)

### Community 88 - "coveringTiles"
Cohesion: 0.06
Nodes (44): allowVariableZoom(), allowWorldCopies(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), distanceToTile2d(), distanceToTileSimple() (+36 more)

### Community 89 - "loadTile"
Cohesion: 0.05
Nodes (52): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), demoteFeatureIds(), _diffStyle(), diffToHashed() (+44 more)

### Community 90 - "push"
Cohesion: 0.03
Nodes (124): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+116 more)

### Community 91 - "get"
Cohesion: 0.03
Nodes (127): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+119 more)

### Community 92 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (60): addProtocol(), allowsLetterSpacing(), br(), charAllowsLetterSpacing(), clipGeometry(), createArrays(), createStyleLayer(), evaluateVariableOffset() (+52 more)

### Community 93 - "._update"
Cohesion: 0.04
Nodes (97): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), _clearSource() (+89 more)

### Community 94 - "update"
Cohesion: 0.03
Nodes (119): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+111 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (73): hf(), lf, mf(), _onMoveEnd(), al, Bu(), C(), cn() (+65 more)

### Community 96 - "update"
Cohesion: 0.02
Nodes (129): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+121 more)

### Community 97 - "._update"
Cohesion: 0.03
Nodes (110): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+102 more)

### Community 98 - "constructor"
Cohesion: 0.04
Nodes (79): addImages(), array(), assertRootKey(), backfillBorder(), bind(), bucketIndex(), checkSubtype(), constructor() (+71 more)

### Community 99 - "appendRoundCorner"
Cohesion: 0.05
Nodes (55): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+47 more)

### Community 100 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (66): cameraPosition(), _computeClippingPlane(), _createStyleImage(), ic(), mf(), rayPlanetIntersection(), rc(), rs() (+58 more)

### Community 101 - "concat"
Cohesion: 0.05
Nodes (74): checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1() (+66 more)

### Community 102 - "loadTile"
Cohesion: 0.18
Nodes (15): _afterTileLoadWorkerResponse(), _getLoadGeoJSONParameters(), _getNeighboringTiles(), _getOverzoomParameters(), getRTLTextPluginStatus(), lazyLoad(), loadGlyphRange(), loadTile() (+7 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (88): _diffStyle(), loadTileJson(), loadURL(), readImageNow(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap(), br() (+80 more)

### Community 104 - "addFeature"
Cohesion: 0.08
Nodes (44): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+36 more)

### Community 105 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 106 - "parse"
Cohesion: 0.05
Nodes (59): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), gc() (+51 more)

### Community 107 - "sub"
Cohesion: 0.06
Nodes (52): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint(), depthAtPoint(), findAxisMinMax() (+44 more)

### Community 108 - "preventDefault"
Cohesion: 0.06
Nodes (46): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+38 more)

### Community 109 - "extend"
Cohesion: 0.09
Nodes (27): extend(), extractCoordinates(), fillExtrusionPatternUniformValues(), fillExtrusionUniformValues(), fillOutlinePatternUniformValues(), fillPatternUniformValues(), getBearing(), getCoordinatesFromGeometry() (+19 more)

### Community 110 - "extend"
Cohesion: 0.07
Nodes (47): _afterEase(), bearing(), dblclick(), _ease(), easeOut(), easeTo(), extend(), fillExtrusionPatternUniformValues() (+39 more)

### Community 111 - "parse"
Cohesion: 0.07
Nodes (41): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+33 more)

### Community 112 - "geometry"
Cohesion: 0.07
Nodes (53): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+45 more)

### Community 113 - "update"
Cohesion: 0.06
Nodes (36): _createStyleImage(), dispatchRenderCallbacks(), add(), compareMax(), emplace(), findPoleOfInaccessibility(), _getAndRemoveByKey(), getCentroidCell() (+28 more)

### Community 114 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 115 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 116 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.10
Nodes (26): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix(), getTerrainCoords(), _getTerrainCoordsForRegularTile() (+18 more)

### Community 117 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 118 - "appendRoundCorner"
Cohesion: 0.05
Nodes (49): getTileSkewVectors(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+41 more)

### Community 119 - "updateVariableAnchorsForBucket"
Cohesion: 0.05
Nodes (66): _applyDiffToSource(), _applyResourceTiming(), attemptAnchorPlacement(), calculateVariableLayoutShift(), calculateVariableRenderShift(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate() (+58 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 121 - "get"
Cohesion: 0.05
Nodes (90): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+82 more)

### Community 122 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 123 - "clone"
Cohesion: 0.06
Nodes (38): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+30 more)

### Community 124 - "concat"
Cohesion: 0.05
Nodes (82): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+74 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.05
Nodes (53): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), distSqr() (+45 more)

### Community 126 - "serialize"
Cohesion: 0.09
Nodes (30): breakLines(), completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), isArrayBuffer() (+22 more)

### Community 127 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 128 - "evaluate"
Cohesion: 0.04
Nodes (69): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), _calculate(), calculateGlyphDependencies(), constantOr(), convertComparisonOp$1() (+61 more)

### Community 129 - "sub"
Cohesion: 0.09
Nodes (41): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+33 more)

### Community 130 - "warnOnce"
Cohesion: 0.07
Nodes (50): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+42 more)

### Community 131 - "getElevation"
Cohesion: 0.10
Nodes (32): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+24 more)

### Community 132 - "constructor"
Cohesion: 0.03
Nodes (72): addImages(), backfillBorder(), bbox(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), containsMaxSafeIntegerValues() (+64 more)

### Community 133 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 134 - ".handleEvent"
Cohesion: 0.09
Nodes (31): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _fireEvents(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+23 more)

### Community 135 - "renderLayer"
Cohesion: 0.12
Nodes (15): acquireRTT(), bindRTT(), getRTT(), getTexture(), renderLayer(), am(), at(), Dm() (+7 more)

### Community 136 - ".handleEvent"
Cohesion: 0.04
Nodes (58): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+50 more)

### Community 137 - "intersects"
Cohesion: 0.27
Nodes (13): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+5 more)

### Community 138 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 139 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 140 - "altitudeFromMercatorZ"
Cohesion: 0.18
Nodes (13): tileIdToLngLatBounds(), altitudeFromMercatorZ(), circumferenceAtLatitude(), getTileUnitsForMeters(), latFromMercatorY(), lngFromMercatorX(), mercatorScale(), meterInMercatorCoordinateUnits() (+5 more)

### Community 141 - "intersects"
Cohesion: 0.30
Nodes (12): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+4 more)

### Community 142 - "update"
Cohesion: 0.08
Nodes (30): add(), compareMax(), emplace(), findPoleOfInaccessibility(), _getAndRemoveByKey(), getCentroidCell(), getNumericId(), getPositionIds() (+22 more)

### Community 143 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 144 - "Wu"
Cohesion: 0.12
Nodes (22): bo(), co(), Do(), getPitchedTextCorrection(), go(), ho(), jo(), ko() (+14 more)

### Community 145 - "evaluate"
Cohesion: 0.03
Nodes (83): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies(), calculateScaledKey(), calculateTileKey() (+75 more)

### Community 146 - "AppContext.jsx"
Cohesion: 0.25
Nodes (13): AppContext, AppProvider(), calculateDistanceInKm(), useAblyPresence(), ABLY_CHANNELS, getAblyClient(), getStableAnonymousClientId(), isAblyConfigured (+5 more)

### Community 147 - "deepEqual"
Cohesion: 0.14
Nodes (21): serialize(), setState(), addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), deref(), derefLayers() (+13 more)

### Community 148 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 149 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 150 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 151 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 154 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

### Community 162 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

## Knowledge Gaps
- **447 isolated node(s):** `recentRequests`, `name`, `private`, `version`, `type` (+442 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `n` to `update`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `.handleEvent`, `constructor`, `get`, `update`, `cameraForBoxAndBearing`, `add`, `get`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `update`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `.handleEvent`, `constructor`, `parse`, `get`, `update`, `cameraForBoxAndBearing`, `add`, `get`, `constructor`, `get`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `public/maplibre-gl-worker.mjs`, `get`, `constructor`, `add`, `update`, `coveringTiles`, `push`, `get`, `readVarint`, `public/maplibre-gl-shared.mjs`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `name`, `private` to the rest of the system?**
  _447 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MaalemView.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14242424242424243 - nodes in this community are weakly interconnected._
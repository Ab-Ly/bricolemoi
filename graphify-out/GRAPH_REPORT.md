# Graph Report - bricolemoi  (2026-08-25)

## Corpus Check
- 112 files · ~799,283 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10231 nodes · 29654 edges · 158 communities (117 shown, 41 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ebe032d1`
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
- _calcMatrices
- public/maplibre-gl-worker.mjs
- s
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
- clone
- appendRoundCorner
- mo
- concat
- get
- public/maplibre-gl-worker-dev.mjs
- addFeature
- geometry
- Wu
- sub
- .handleEvent
- extend
- render
- parse
- geometry
- addFeature
- writeMessage
- writeMessage
- getPitchedLabelPlaneMatrix
- eliminateHoles
- shapeLines
- updateVariableAnchorsForBucket
- eliminateHoles
- parse
- queryIntersectsFeature
- constructor
- featureFilter
- queryIntersectsFeature
- loadTile
- readVarint
- evaluate
- sub
- constructor
- getElevation
- update
- parse
- _createTinySDF
- convertGeometryVector
- .handleEvent
- parseCssColor
- decodeFloat64Values
- decodeFloat64Values
- convertGeometryVector
- evaluate
- AppContext.jsx
- deepEqual
- deepEqual
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
- getChildren

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
- `interpolate()` --indirect_call--> `fy`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `constructor()` --indirect_call--> `increment()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `key()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs

## Import Cycles
- None detected.

## Communities (158 total, 41 thin omitted)

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
Nodes (544): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+536 more)

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
Nodes (94): ac(), add(), addDebugCollisionBoxes(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bb() (+86 more)

### Community 49 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 59 - "send-otp.js"
Cohesion: 0.60
Nodes (4): cleanPhoneNumber(), generateOtpSignature(), handler(), recentRequests

### Community 60 - "verify-otp.js"
Cohesion: 0.83
Nodes (3): cleanPhoneNumber(), handler(), verifyOtpSignature()

### Community 63 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (538): ic(), Ms(), quadrant(), Ru(), addCurrentVertex(), addFeature(), addFeatures(), addHalfVertex() (+530 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (528): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+520 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (576): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+568 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (222): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+214 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (251): tileIdToLngLatBounds(), addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors (+243 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (225): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+217 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (239): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+231 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (165): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), Bu(), _buildSkirts() (+157 more)

### Community 75 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 76 - "n"
Cohesion: 0.03
Nodes (185): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+177 more)

### Community 77 - "get"
Cohesion: 0.03
Nodes (163): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+155 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (171): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+163 more)

### Community 79 - "get"
Cohesion: 0.04
Nodes (159): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+151 more)

### Community 80 - "constructor"
Cohesion: 0.03
Nodes (88): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _cancelRenderFrame(), checkGeolocationSupport(), _clearWatch() (+80 more)

### Community 81 - "_calcMatrices"
Cohesion: 0.03
Nodes (160): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+152 more)

### Community 82 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (194): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+186 more)

### Community 83 - "s"
Cohesion: 0.05
Nodes (140): ac(), acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices() (+132 more)

### Community 84 - "_calcMatrices"
Cohesion: 0.03
Nodes (145): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+137 more)

### Community 85 - "get"
Cohesion: 0.03
Nodes (135): addIndicesForPlacedSymbol(), applyPropertyUpdates(), applySourceDiff(), backfillBorder(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), convertToInternal() (+127 more)

### Community 86 - "constructor"
Cohesion: 0.02
Nodes (129): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+121 more)

### Community 87 - "push"
Cohesion: 0.03
Nodes (131): addPoint(), bind(), calcLineBBox(), checkChild(), clip(), clipGeometryOnAxis(), clipLine$1(), clipLines() (+123 more)

### Community 88 - "coveringTiles"
Cohesion: 0.05
Nodes (54): _addDefaultHandlers(), allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), assignEvents(), coordinatePoint(), coveringTiles() (+46 more)

### Community 89 - "extend"
Cohesion: 0.05
Nodes (61): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _diffStyle(), _dispatchWorkerUpdate(), doOnceCompleted(), extend() (+53 more)

### Community 90 - "push"
Cohesion: 0.03
Nodes (119): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+111 more)

### Community 91 - "get"
Cohesion: 0.03
Nodes (129): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+121 more)

### Community 92 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (55): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData(), groupByLayout() (+47 more)

### Community 93 - "._update"
Cohesion: 0.03
Nodes (99): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+91 more)

### Community 94 - "update"
Cohesion: 0.03
Nodes (117): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+109 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (61): _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers(), setState(), al (+53 more)

### Community 96 - "update"
Cohesion: 0.02
Nodes (129): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+121 more)

### Community 97 - "._update"
Cohesion: 0.03
Nodes (106): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+98 more)

### Community 98 - "clone"
Cohesion: 0.06
Nodes (40): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+32 more)

### Community 99 - "appendRoundCorner"
Cohesion: 0.04
Nodes (66): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+58 more)

### Community 100 - "mo"
Cohesion: 0.29
Nodes (7): loadURL(), mo(), pt(), qe(), qr, st(), te()

### Community 101 - "concat"
Cohesion: 0.05
Nodes (79): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+71 more)

### Community 102 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (87): _createStyleImage(), _diffStyle(), dispatchRenderCallbacks(), loadTileJson(), loadURL(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap() (+79 more)

### Community 104 - "addFeature"
Cohesion: 0.06
Nodes (56): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature() (+48 more)

### Community 105 - "geometry"
Cohesion: 0.06
Nodes (59): sphereSurfacePointToCoordinates(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry() (+51 more)

### Community 106 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 107 - "sub"
Cohesion: 0.06
Nodes (54): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint(), depthAtPoint(), findAxisMinMax() (+46 more)

### Community 108 - ".handleEvent"
Cohesion: 0.05
Nodes (55): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dragEnd(), dragMove(), dragStart() (+47 more)

### Community 109 - "extend"
Cohesion: 0.07
Nodes (34): _applyDiffToSource(), _applyResourceTiming(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate(), extend(), extractCoordinates(), fillExtrusionPatternUniformValues() (+26 more)

### Community 110 - "render"
Cohesion: 0.04
Nodes (61): acquireRTT(), anyTilesAfterTime(), bindRTT(), commit(), destruct(), eo(), equals(), getAllIds() (+53 more)

### Community 111 - "parse"
Cohesion: 0.04
Nodes (66): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+58 more)

### Community 112 - "geometry"
Cohesion: 0.07
Nodes (55): bboxToBBoxDistance(), boxWithinBox(), calculateSignedArea(), canonicalID(), classifyRings$1(), compareAreas(), compareDistPair(), distance() (+47 more)

### Community 113 - "addFeature"
Cohesion: 0.07
Nodes (53): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+45 more)

### Community 114 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 115 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 116 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (30): calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix() (+22 more)

### Community 117 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 118 - "shapeLines"
Cohesion: 0.06
Nodes (42): addDebugCollisionBoxes(), align(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charInComplexShapingScript(), charIsWhitespace() (+34 more)

### Community 119 - "updateVariableAnchorsForBucket"
Cohesion: 0.06
Nodes (55): attemptAnchorPlacement(), calculateVariableLayoutShift(), calculateVariableRenderShift(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler() (+47 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 121 - "parse"
Cohesion: 0.09
Nodes (33): array(), assertRootKey(), checkSubtype(), createExpression(), createPropertyExpression(), eachChild(), emitValidationErrors(), error() (+25 more)

### Community 122 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 123 - "constructor"
Cohesion: 0.04
Nodes (69): addImages(), bbox(), bucketIndex(), constructor(), copy(), copyImage(), createImage(), createVisibility() (+61 more)

### Community 124 - "featureFilter"
Cohesion: 0.06
Nodes (41): _convertFromCellCoord(), _convertToCellCoord(), createTree(), expandBy(), featureFilter(), findMixedLegacyFilter(), finish(), _forEachCell() (+33 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (44): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+36 more)

### Community 126 - "loadTile"
Cohesion: 0.10
Nodes (28): _afterTileLoadWorkerResponse(), clearTextures(), destroy(), doOnceCompleted(), _getLoadGeoJSONParameters(), _getNeighboringTiles(), _getOverzoomParameters(), getRTLTextPluginStatus() (+20 more)

### Community 127 - "readVarint"
Cohesion: 0.08
Nodes (36): loadGlyphRange(), bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+28 more)

### Community 128 - "evaluate"
Cohesion: 0.04
Nodes (72): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies(), calculateScaledKey(), calculateTileKey() (+64 more)

### Community 129 - "sub"
Cohesion: 0.08
Nodes (39): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), _computeTileBoundingVolume(), findAxisMinMax(), fromInvProjectionMatrix(), getIdealNearFarPlaneDistance(), getNormalizedNearPlane(), getTileSkewVectors() (+31 more)

### Community 130 - "constructor"
Cohesion: 0.03
Nodes (87): add(), addImages(), backfillBorder(), bucketIndex(), compare(), compareMax(), constructor(), convertComparisonOp$1() (+79 more)

### Community 131 - "getElevation"
Cohesion: 0.08
Nodes (36): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+28 more)

### Community 132 - "update"
Cohesion: 0.08
Nodes (31): add(), compareMax(), emplace(), feature(), findPoleOfInaccessibility(), _getAndRemoveByKey(), getCentroidCell(), getNumericId() (+23 more)

### Community 133 - "parse"
Cohesion: 0.08
Nodes (34): bl(), el(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPixelSize(), gi(), il() (+26 more)

### Community 134 - "_createTinySDF"
Cohesion: 0.12
Nodes (18): _charUsesLocalIdeographFontFamily(), _createTinySDF(), _downloadAndCacheRangePromise(), _drawGlyph(), _fontStyle(), _fontWeight(), _getAndCacheGlyphsPromise(), getGlyphs() (+10 more)

### Community 135 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 136 - ".handleEvent"
Cohesion: 0.04
Nodes (67): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+59 more)

### Community 137 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 138 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 139 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 143 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 145 - "evaluate"
Cohesion: 0.03
Nodes (74): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), allowsVerticalWritingMode(), _calculate(), calculateGlyphDependencies(), calculateScaledKey() (+66 more)

### Community 146 - "AppContext.jsx"
Cohesion: 0.25
Nodes (13): AppContext, AppProvider(), calculateDistanceInKm(), useAblyPresence(), ABLY_CHANNELS, getAblyClient(), getStableAnonymousClientId(), isAblyConfigured (+5 more)

### Community 147 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 148 - "deepEqual"
Cohesion: 0.31
Nodes (11): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById() (+3 more)

### Community 150 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 151 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 154 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

### Community 162 - "getChildren"
Cohesion: 0.07
Nodes (37): addTileFeatures(), appendLeaves(), cluster(), convertToGeoJSON(), createIndex(), createTile(), extent(), featureToGeoJSON() (+29 more)

## Knowledge Gaps
- **447 isolated node(s):** `recentRequests`, `name`, `private`, `version`, `type` (+442 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `update`, `getChildren`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `update`, `get`, `_calcMatrices`, `get`, `constructor`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `update`, `getChildren`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `update`, `get`, `n`, `get`, `_calcMatrices`, `get`, `constructor`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `x()` connect `public/maplibre-gl-worker.mjs` to `public/maplibre-gl.mjs`, `constructor`, `get`, `n`, `constructor`, `_calcMatrices`, `get`, `coveringTiles`, `push`, `get`, `readVarint`, `public/maplibre-gl-shared.mjs`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `name`, `private` to the rest of the system?**
  _447 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MaalemView.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14242424242424243 - nodes in this community are weakly interconnected._
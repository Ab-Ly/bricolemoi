# Graph Report - bricolemoi  (2026-08-24)

## Corpus Check
- 115 files · ~802,945 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10171 nodes · 29642 edges · 113 communities (101 shown, 12 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b6e992a3`
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
- parse
- verify-maalem-cin/index.ts
- getPitchedLabelPlaneMatrix
- sw.js
- _checkLoaded
- vercel.json
- getChildren
- _checkLoaded
- loadTile
- appendRoundCorner
- featureFilter
- parseCssColor
- cameraForBoxAndBearing
- serialize
- _addDefaultHandlers
- update
- resize
- clone
- Wu
- getPitchedLabelPlaneMatrix
- loadTile
- intersects
- upload-media.js
- addLine
- .handleEvent
- decodeFloat64Values
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- rules/graphify.md
- workflows/graphify.md
- test_prelude_otp.js
- inspect_prelude.js
- send-otp.js
- verify-otp.js
- public/maplibre-gl-shared.mjs
- public/maplibre-gl.mjs
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
- parse
- _calcMatrices
- get
- constructor
- push
- extend
- push
- get
- assets/maplibre-gl-worker-dev.mjs
- ._update
- update
- assets/maplibre-gl-worker.mjs
- update
- ._update
- parse
- shapeLines
- public/maplibre-gl-worker.mjs
- coveringTiles
- public/maplibre-gl-worker-dev.mjs
- evaluate
- geometry
- sub
- extend
- pointsToPolygonDistance
- constructor
- writeMessage
- writeMessage
- eliminateHoles
- shapeLines
- getElevation
- eliminateHoles
- queryIntersectsFeature
- constructor
- concat
- queryIntersectsFeature
- readVarint
- query
- sub
- getElevation
- .handleEvent
- evaluate
- deepEqual
- deepEqual
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

## Communities (113 total, 12 thin omitted)

### Community 0 - "AppContext.jsx"
Cohesion: 0.11
Nodes (39): EmergencySOSModal(), PushNotificationBanner(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider() (+31 more)

### Community 1 - "App.jsx"
Cohesion: 0.16
Nodes (19): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+11 more)

### Community 2 - "MaalemView.jsx"
Cohesion: 0.14
Nodes (30): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+22 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.14
Nodes (20): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), generateFallbackAudioDataUrl() (+12 more)

### Community 4 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (499): aa(), ac(), acquire(), add(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+491 more)

### Community 5 - "dependencies"
Cohesion: 0.04
Nodes (47): ably, autoprefixer, @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies (+39 more)

### Community 6 - "AuthContext.jsx"
Cohesion: 0.16
Nodes (25): AuthModal(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, checkAndRecordOtpRateLimit() (+17 more)

### Community 7 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 8 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 13 - "parse"
Cohesion: 0.06
Nodes (42): getTileBoundingVolume(), _addEventListener(), array(), checkSubtype(), clamp$1(), constrainAngle(), error(), fire() (+34 more)

### Community 15 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.08
Nodes (34): anyTilesAfterTime(), calculatePosMatrix(), equals(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix() (+26 more)

### Community 17 - "_checkLoaded"
Cohesion: 0.05
Nodes (71): addImage(), addLayer(), addSource(), _applyGlobalStateChanges(), _checkLoaded(), _createStyleImage(), dispatchRenderCallbacks(), ei() (+63 more)

### Community 20 - "getChildren"
Cohesion: 0.10
Nodes (23): addTileFeatures(), appendLeaves(), cluster(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom() (+15 more)

### Community 21 - "_checkLoaded"
Cohesion: 0.05
Nodes (67): addBucket(), addLayer(), addSource(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), _createLayers(), _disposeTexture() (+59 more)

### Community 22 - "loadTile"
Cohesion: 0.06
Nodes (49): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createDelegatedListener(), _createTinySDF(), destroy(), _diffStyle(), _downloadAndCacheRangePromise() (+41 more)

### Community 23 - "appendRoundCorner"
Cohesion: 0.09
Nodes (26): fov(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1() (+18 more)

### Community 24 - "featureFilter"
Cohesion: 0.05
Nodes (48): checkChild(), classifyChildren(), classifyFilter(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1() (+40 more)

### Community 25 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 26 - "cameraForBoxAndBearing"
Cohesion: 0.10
Nodes (32): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), fitBounds(), fov(), getEast(), getLesserNonNegativeNonNull(), getNorth() (+24 more)

### Community 27 - "serialize"
Cohesion: 0.10
Nodes (28): breakLines(), completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), isArrayBuffer() (+20 more)

### Community 28 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (33): _addDefaultHandlers(), assignEvents(), coordinatePoint(), depthAtPoint(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+25 more)

### Community 29 - "update"
Cohesion: 0.06
Nodes (42): compareMax(), createIndex(), createTile(), createTree(), emplace(), extent(), feature(), findPoleOfInaccessibility() (+34 more)

### Community 30 - "resize"
Cohesion: 0.08
Nodes (34): addImage(), _afterImageUpdated(), _containerDimensions(), createQuadTriangles(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading(), _getClampedPixelRatio() (+26 more)

### Community 31 - "clone"
Cohesion: 0.07
Nodes (33): angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+25 more)

### Community 32 - "Wu"
Cohesion: 0.07
Nodes (35): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+27 more)

### Community 33 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (31): calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix() (+23 more)

### Community 34 - "loadTile"
Cohesion: 0.09
Nodes (27): _afterTileLoadWorkerResponse(), _getLoadGeoJSONParameters(), _getNeighboringTiles(), _getOverzoomParameters(), lazyLoad(), loadTile(), loadURL(), loadVectorData() (+19 more)

### Community 35 - "intersects"
Cohesion: 0.17
Nodes (18): adjustAntiMeridian(), cameraForBounds(), _fireEvent(), fitBounds(), _fitInternal(), fitScreenCoordinates(), getEast(), getNorth() (+10 more)

### Community 36 - "upload-media.js"
Cohesion: 0.40
Nodes (3): config, R2_PUBLIC_DOMAIN, s3Client

### Community 38 - "addLine"
Cohesion: 0.15
Nodes (22): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPointsTileFeature() (+14 more)

### Community 41 - ".handleEvent"
Cohesion: 0.05
Nodes (47): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dblclick(), dragEnd(), dragMove() (+39 more)

### Community 44 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 49 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 59 - "send-otp.js"
Cohesion: 0.67
Nodes (3): cleanPhoneNumber(), handler(), recentRequests

### Community 63 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (537): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+529 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (496): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+488 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (638): Da(), quadrant(), Ru(), Aa(), ac(), ad, add(), _addCollisionDebugVertex() (+630 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (226): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+218 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (259): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+251 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (219): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+211 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (260): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith(), angleWithSep() (+252 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (178): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+170 more)

### Community 75 - "n"
Cohesion: 0.03
Nodes (229): addSprite(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix() (+221 more)

### Community 76 - "push"
Cohesion: 0.03
Nodes (270): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _createLayers(), querySourceFeatures(), es(), gc() (+262 more)

### Community 77 - "get"
Cohesion: 0.04
Nodes (153): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+145 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (211): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+203 more)

### Community 79 - "get"
Cohesion: 0.04
Nodes (156): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+148 more)

### Community 80 - "constructor"
Cohesion: 0.02
Nodes (113): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+105 more)

### Community 81 - "_calcMatrices"
Cohesion: 0.03
Nodes (134): _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo() (+126 more)

### Community 82 - "flyTo"
Cohesion: 0.03
Nodes (132): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+124 more)

### Community 83 - "parse"
Cohesion: 0.05
Nodes (57): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), gc() (+49 more)

### Community 84 - "_calcMatrices"
Cohesion: 0.03
Nodes (144): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+136 more)

### Community 85 - "get"
Cohesion: 0.03
Nodes (136): addIndicesForPlacedSymbol(), applyPropertyUpdates(), applySourceDiff(), backfillBorder(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName() (+128 more)

### Community 86 - "constructor"
Cohesion: 0.02
Nodes (134): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _calculateTransform() (+126 more)

### Community 87 - "push"
Cohesion: 0.04
Nodes (105): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+97 more)

### Community 89 - "extend"
Cohesion: 0.07
Nodes (42): _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _dispatchWorkerUpdate(), doOnceCompleted(), extend(), extractCoordinates(), fillExtrusionPatternUniformValues() (+34 more)

### Community 90 - "push"
Cohesion: 0.03
Nodes (139): sphereSurfacePointToCoordinates(), addPoint(), applyPropertyUpdates(), applySourceDiff(), bind(), calcLineBBox(), clip(), clipLine$1() (+131 more)

### Community 91 - "get"
Cohesion: 0.03
Nodes (126): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+118 more)

### Community 92 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (61): addProtocol(), assertRootKey(), br(), clipGeometry(), createExpression(), createStyleLayer(), evaluateProperties(), featureFilter() (+53 more)

### Community 93 - "._update"
Cohesion: 0.04
Nodes (87): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+79 more)

### Community 94 - "update"
Cohesion: 0.02
Nodes (132): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+124 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.06
Nodes (52): mf(), al, C(), cn(), ct(), dn(), f(), lt() (+44 more)

### Community 96 - "update"
Cohesion: 0.03
Nodes (98): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+90 more)

### Community 97 - "._update"
Cohesion: 0.04
Nodes (91): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+83 more)

### Community 98 - "parse"
Cohesion: 0.08
Nodes (39): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+31 more)

### Community 99 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 100 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (89): Ar(), cameraPosition(), _computeClippingPlane(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs() (+81 more)

### Community 102 - "coveringTiles"
Cohesion: 0.07
Nodes (40): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), finish() (+32 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+54 more)

### Community 104 - "evaluate"
Cohesion: 0.04
Nodes (82): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addGlobalState() (+74 more)

### Community 105 - "geometry"
Cohesion: 0.06
Nodes (59): sphereSurfacePointToCoordinates(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry() (+51 more)

### Community 107 - "sub"
Cohesion: 0.06
Nodes (57): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint(), depthAtPoint(), findAxisMinMax() (+49 more)

### Community 109 - "extend"
Cohesion: 0.04
Nodes (86): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily() (+78 more)

### Community 112 - "pointsToPolygonDistance"
Cohesion: 0.07
Nodes (49): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+41 more)

### Community 113 - "constructor"
Cohesion: 0.03
Nodes (89): _createStyleImage(), add(), addImages(), backfillBorder(), breakLines(), bucketIndex(), calculateScaledKey(), calculateTileKey() (+81 more)

### Community 114 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 115 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 117 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 118 - "shapeLines"
Cohesion: 0.07
Nodes (35): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+27 more)

### Community 119 - "getElevation"
Cohesion: 0.09
Nodes (35): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+27 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 122 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 123 - "constructor"
Cohesion: 0.03
Nodes (77): loadGlyphRange(), addImages(), bbox(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), copy() (+69 more)

### Community 124 - "concat"
Cohesion: 0.04
Nodes (90): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), createPropertyExpression() (+82 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 127 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 128 - "query"
Cohesion: 0.04
Nodes (62): add(), compareMax(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), emplace(), expandBy(), feature() (+54 more)

### Community 129 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 131 - "getElevation"
Cohesion: 0.09
Nodes (33): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+25 more)

### Community 134 - ".handleEvent"
Cohesion: 0.15
Nodes (15): _applyChanges(), _blockedByActive(), _fireEvents(), _getMapTouches(), hasChange(), isActive(), isPointOnMapSurface(), mergeHandlerResult() (+7 more)

### Community 145 - "evaluate"
Cohesion: 0.04
Nodes (92): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+84 more)

### Community 147 - "deepEqual"
Cohesion: 0.31
Nodes (11): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById() (+3 more)

### Community 148 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 154 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

## Knowledge Gaps
- **451 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+446 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `n` to `query`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `_calcMatrices`, `get`, `constructor`, `cameraForBoxAndBearing`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `query`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `parse`, `_calcMatrices`, `get`, `constructor`, `cameraForBoxAndBearing`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `update`, `._update`, `.handleEvent`, `coveringTiles`, `assets/maplibre-gl-dev.mjs`, `sub`, `n`, `parse`, `get`, `_calcMatrices`, `get`, `loadTile`, `extend`, `serialize`, `resize`, `clone`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _451 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11175616835994194 - nodes in this community are weakly interconnected._
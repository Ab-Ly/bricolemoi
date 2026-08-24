# Graph Report - bricolemoi  (2026-08-24)

## Corpus Check
- 114 files · ~800,080 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10171 nodes · 29642 edges · 115 communities (103 shown, 12 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ebe032d1`
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
- _addDefaultHandlers
- loadTile
- appendRoundCorner
- clone
- parseCssColor
- cameraForBoxAndBearing
- resize
- _move
- decodeFloat64Values
- readVarint
- addLine
- Od
- _executeRelevantHandler
- _executeRelevantHandler
- populatePaintArray
- upload-media.js
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
- jn
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
- parse
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
- featureFilter
- queryIntersectsFeature
- constructor
- concat
- queryIntersectsFeature
- serialize
- readVarint
- query
- sub
- getElevation
- .handleEvent
- .handleEvent
- decodeFloat64Values
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

## Communities (115 total, 12 thin omitted)

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
Nodes (551): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+543 more)

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
Cohesion: 0.06
Nodes (52): addBucket(), addLayer(), _applyGlobalStateChanges(), _checkLoaded(), ei(), findMatches(), generate(), getCrossTileIDsLists() (+44 more)

### Community 20 - "getChildren"
Cohesion: 0.07
Nodes (37): addTileFeatures(), appendLeaves(), cluster(), convertToGeoJSON(), createIndex(), createTile(), extent(), featureToGeoJSON() (+29 more)

### Community 21 - "_addDefaultHandlers"
Cohesion: 0.20
Nodes (15): _addDefaultHandlers(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+7 more)

### Community 22 - "loadTile"
Cohesion: 0.07
Nodes (38): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), _diffStyle(), _downloadAndCacheRangePromise(), _drawGlyph() (+30 more)

### Community 23 - "appendRoundCorner"
Cohesion: 0.09
Nodes (26): fov(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1() (+18 more)

### Community 24 - "clone"
Cohesion: 0.07
Nodes (33): angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+25 more)

### Community 25 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 26 - "cameraForBoxAndBearing"
Cohesion: 0.10
Nodes (32): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), fitBounds(), fov(), getEast(), getLesserNonNegativeNonNull(), getNorth() (+24 more)

### Community 27 - "resize"
Cohesion: 0.12
Nodes (25): _addDefaultHandlers(), assignEvents(), _containerDimensions(), createQuadTriangles(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+17 more)

### Community 28 - "_move"
Cohesion: 0.09
Nodes (27): coordinatePoint(), depthAtPoint(), gestureBeginsVertically(), getBearing(), getBearingDelta(), getElevationForLngLat(), getElevationForLngLatZoom(), getMinMaxElevation() (+19 more)

### Community 29 - "decodeFloat64Values"
Cohesion: 0.31
Nodes (9): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedInt64AsFloat64Stream(), decodeUnsignedRleFloat64(), decodeVarintFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value() (+1 more)

### Community 30 - "readVarint"
Cohesion: 0.11
Nodes (26): bbox(), cm(), decode(), nextField(), readBoolean(), readBytes(), readDouble(), readFixed32() (+18 more)

### Community 31 - "addLine"
Cohesion: 0.15
Nodes (22): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPointsTileFeature() (+14 more)

### Community 32 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 33 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 34 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 35 - "populatePaintArray"
Cohesion: 0.28
Nodes (9): emplace(), getPositionIds(), packColor(), packUint8ToFloat(), populatePaintArray(), populatePaintArrays(), _setPaintValue(), _setPaintValues() (+1 more)

### Community 36 - "upload-media.js"
Cohesion: 0.40
Nodes (3): config, R2_PUBLIC_DOMAIN, s3Client

### Community 49 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 59 - "send-otp.js"
Cohesion: 0.67
Nodes (3): cleanPhoneNumber(), handler(), recentRequests

### Community 63 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (497): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+489 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (533): aa(), acquire(), add(), addClassName(), addControl(), addDash(), _addDefaultHandlers(), addImage() (+525 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (616): Da(), quadrant(), Ru(), Aa(), ac(), add(), _addCollisionDebugVertex(), addCollisionDebugVertices() (+608 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (226): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+218 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (258): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), anchors (+250 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (216): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+208 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (274): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith(), angleWithSep() (+266 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (178): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+170 more)

### Community 75 - "n"
Cohesion: 0.03
Nodes (227): addSprite(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix() (+219 more)

### Community 76 - "push"
Cohesion: 0.03
Nodes (284): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _createLayers(), querySourceFeatures(), es(), gc() (+276 more)

### Community 77 - "get"
Cohesion: 0.04
Nodes (153): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+145 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (209): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+201 more)

### Community 79 - "get"
Cohesion: 0.04
Nodes (156): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+148 more)

### Community 80 - "constructor"
Cohesion: 0.02
Nodes (130): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+122 more)

### Community 81 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+135 more)

### Community 82 - "flyTo"
Cohesion: 0.04
Nodes (130): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+122 more)

### Community 83 - "jn"
Cohesion: 0.05
Nodes (56): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), gc() (+48 more)

### Community 84 - "_calcMatrices"
Cohesion: 0.03
Nodes (142): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+134 more)

### Community 85 - "get"
Cohesion: 0.03
Nodes (124): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+116 more)

### Community 86 - "constructor"
Cohesion: 0.03
Nodes (95): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), checkGeolocationSupport(), _clearWatch() (+87 more)

### Community 87 - "push"
Cohesion: 0.04
Nodes (107): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+99 more)

### Community 89 - "extend"
Cohesion: 0.07
Nodes (42): _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _dispatchWorkerUpdate(), doOnceCompleted(), extend(), extractCoordinates(), fillExtrusionPatternUniformValues() (+34 more)

### Community 90 - "push"
Cohesion: 0.03
Nodes (139): sphereSurfacePointToCoordinates(), addPoint(), applyPropertyUpdates(), applySourceDiff(), bind(), calcLineBBox(), clip(), clipLine$1() (+131 more)

### Community 91 - "get"
Cohesion: 0.03
Nodes (133): addDebugCollisionBoxes(), addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector() (+125 more)

### Community 92 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (61): addProtocol(), assertRootKey(), br(), clipGeometry(), createExpression(), createStyleLayer(), evaluateProperties(), featureFilter() (+53 more)

### Community 93 - "._update"
Cohesion: 0.04
Nodes (96): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+88 more)

### Community 94 - "update"
Cohesion: 0.02
Nodes (130): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+122 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (60): al, C(), ct(), determineAverageLineWidth(), determineLineBreaks(), f(), getMaxImageSize(), getMaxScale() (+52 more)

### Community 96 - "update"
Cohesion: 0.03
Nodes (99): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+91 more)

### Community 97 - "._update"
Cohesion: 0.03
Nodes (103): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+95 more)

### Community 98 - "parse"
Cohesion: 0.08
Nodes (39): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+31 more)

### Community 99 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 100 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (99): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getElevationForLngLatZoom() (+91 more)

### Community 102 - "coveringTiles"
Cohesion: 0.07
Nodes (43): allowVariableZoom(), allowWorldCopies(), continuePlacement(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel() (+35 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+54 more)

### Community 104 - "evaluate"
Cohesion: 0.04
Nodes (84): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addGlobalState() (+76 more)

### Community 105 - "geometry"
Cohesion: 0.06
Nodes (61): sphereSurfacePointToCoordinates(), applyPropertyUpdates(), applySourceDiff(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), convertToInternal() (+53 more)

### Community 106 - "parse"
Cohesion: 0.07
Nodes (35): bo(), co(), Do(), getElevationForLngLatZoom(), getMinMaxElevation(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPitchedTextCorrection() (+27 more)

### Community 107 - "sub"
Cohesion: 0.06
Nodes (57): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint(), depthAtPoint(), findAxisMinMax() (+49 more)

### Community 109 - "extend"
Cohesion: 0.04
Nodes (83): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle() (+75 more)

### Community 112 - "pointsToPolygonDistance"
Cohesion: 0.07
Nodes (49): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+41 more)

### Community 113 - "constructor"
Cohesion: 0.02
Nodes (100): _createStyleImage(), add(), addImages(), backfillBorder(), breakLines(), bucketIndex(), calculateScaledKey(), calculateTileKey() (+92 more)

### Community 114 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 115 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 117 - "eliminateHoles"
Cohesion: 0.09
Nodes (38): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+30 more)

### Community 118 - "shapeLines"
Cohesion: 0.06
Nodes (40): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+32 more)

### Community 119 - "getElevation"
Cohesion: 0.09
Nodes (35): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+27 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 121 - "featureFilter"
Cohesion: 0.04
Nodes (52): checkChild(), classifyChildren(), classifyFilter(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1() (+44 more)

### Community 122 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (45): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), findPoleOfInaccessibility() (+37 more)

### Community 123 - "constructor"
Cohesion: 0.03
Nodes (83): loadGlyphRange(), add(), addImages(), backfillBorder(), bbox(), bucketIndex(), calculateScaledKey(), calculateTileKey() (+75 more)

### Community 124 - "concat"
Cohesion: 0.04
Nodes (90): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), createPropertyExpression() (+82 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 126 - "serialize"
Cohesion: 0.10
Nodes (28): breakLines(), completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), isArrayBuffer() (+20 more)

### Community 127 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 128 - "query"
Cohesion: 0.06
Nodes (41): _convertFromCellCoord(), _convertToCellCoord(), createTree(), emplace(), expandBy(), feature(), finish(), _forEachCell() (+33 more)

### Community 129 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 131 - "getElevation"
Cohesion: 0.05
Nodes (63): calculatePosMatrix(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getFastPathSimpleProjectionMatrix() (+55 more)

### Community 134 - ".handleEvent"
Cohesion: 0.04
Nodes (74): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+66 more)

### Community 136 - ".handleEvent"
Cohesion: 0.14
Nodes (16): _applyChanges(), _blockedByActive(), getCameraAltitude(), _getMapTouches(), hasChange(), isPointOnMapSurface(), mergeHandlerResult(), pointCoordinate() (+8 more)

### Community 138 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 145 - "evaluate"
Cohesion: 0.04
Nodes (76): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addLineDashDependencies() (+68 more)

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

- **Why does `y()` connect `n` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `queryIntersectsFeature`, `get`, `jn`, `_calcMatrices`, `_addDefaultHandlers`, `constructor`, `get`, `cameraForBoxAndBearing`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `queryIntersectsFeature`, `get`, `jn`, `_calcMatrices`, `_addDefaultHandlers`, `constructor`, `get`, `cameraForBoxAndBearing`, `constructor`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `update`, `._update`, `.handleEvent`, `coveringTiles`, `assets/maplibre-gl-dev.mjs`, `sub`, `n`, `parse`, `get`, `_calcMatrices`, `_addDefaultHandlers`, `loadTile`, `get`, `clone`, `extend`, `serialize`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _451 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11175616835994194 - nodes in this community are weakly interconnected._
# Graph Report - bricolemoi  (2026-08-26)

## Corpus Check
- 121 files · ~812,480 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10193 nodes · 29705 edges · 117 communities (105 shown, 12 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cdc84772`
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
- n
- n
- get
- get
- s
- get
- get
- _calcMatrices
- constructor
- _calcMatrices
- constructor
- update
- constructor
- decodeGeometryColumn
- get
- push
- ._update
- public/maplibre-gl-worker.mjs
- push
- pointsToPolygonDistance
- ._update
- update
- get
- concat
- assets/maplibre-gl-worker-dev.mjs
- extend
- assets/maplibre-gl-worker.mjs
- constructor
- concat
- parse
- render
- constructor
- .reset
- constructor
- public/maplibre-gl-worker-dev.mjs
- emplaceBack
- render
- _move
- parse
- evaluate
- geometry
- AppContext.jsx
- dependencies
- writeMessage
- writeMessage
- featureFilter
- appendRoundCorner
- appendRoundCorner
- MaalemView.jsx
- extend
- _addDefaultHandlers
- eliminateHoles
- getElevation
- eliminateHoles
- update
- dist
- coveringTiles
- sub
- getElevation
- queryIntersectsFeature
- parseCssColor
- .handleEvent
- cameraForBoxAndBearing
- Od
- readVarint
- AuthContext.jsx
- featureFilter
- infobipAuthService.js
- getPitchedLabelPlaneMatrix
- ClientView.jsx
- parseCssColor
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- jn
- deepEqual
- deepEqual
- notify-recharge.js
- rules/graphify.md
- manifest.json
- .handleEvent
- workflows/graphify.md
- LandingPage.jsx
- update
- Wu
- decodeFloat64Values
- decodeFloat64Values
- convertGeometryVector
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- InteractiveMap.jsx
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- vercel.json
- sw.js
- get

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

## Communities (117 total, 12 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (453): aa(), ac(), acquire(), addBucket(), addControl(), addDash(), addImage(), addLayer() (+445 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (410): aa(), ac(), acquire(), acquireRTT(), addBucket(), addControl(), addDash(), addImage() (+402 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (543): Gs(), Ru(), Aa(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+535 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (576): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+568 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (222): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+214 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (224): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+216 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (251): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), altitudeFromMercatorZ() (+243 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (264): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+256 more)

### Community 8 - "n"
Cohesion: 0.03
Nodes (249): apply(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _computeClippingPlane(), constrainInternal(), querySourceFeatures() (+241 more)

### Community 9 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (174): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+166 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (166): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+158 more)

### Community 12 - "s"
Cohesion: 0.05
Nodes (135): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+127 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (153): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+145 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (162): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+154 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (145): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+137 more)

### Community 16 - "constructor"
Cohesion: 0.02
Nodes (208): add(), addClassName(), _addDefaultHandlers(), addTo(), af(), _afterEase(), _applyChanges(), applyUpdatedTransform() (+200 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+135 more)

### Community 18 - "constructor"
Cohesion: 0.03
Nodes (90): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), checkGeolocationSupport(), _clearWatch() (+82 more)

### Community 19 - "update"
Cohesion: 0.04
Nodes (67): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold() (+59 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (138): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+130 more)

### Community 21 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (110): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+102 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (145): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), constantOr() (+137 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (117): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+109 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (105): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), bgPatternUniformValues(), _checkLoaded() (+97 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (111): cameraPosition(), _computeTileBoundingVolume(), _createStyleImage(), fromAabb(), getElevationForLngLatZoom(), getMinMaxElevation(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom() (+103 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (126): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addIndicesForPlacedSymbol(), addLine(), addLinesTileFeature() (+118 more)

### Community 27 - "pointsToPolygonDistance"
Cohesion: 0.07
Nodes (51): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getLngLatFromTileCoord() (+43 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (93): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+85 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (94): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+86 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 31 - "concat"
Cohesion: 0.05
Nodes (77): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+69 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (61): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+53 more)

### Community 33 - "extend"
Cohesion: 0.03
Nodes (100): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF() (+92 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.06
Nodes (51): mf(), rs(), al, bt(), cn(), dn(), dt(), f() (+43 more)

### Community 35 - "constructor"
Cohesion: 0.03
Nodes (97): add(), addImages(), backfillBorder(), bbox(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor() (+89 more)

### Community 36 - "concat"
Cohesion: 0.05
Nodes (72): bind(), coalesce$1(), concat(), createFunction(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction() (+64 more)

### Community 37 - "parse"
Cohesion: 0.08
Nodes (40): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+32 more)

### Community 38 - "render"
Cohesion: 0.05
Nodes (60): anyTilesAfterTime(), commit(), continuePlacement(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), destruct(), equals() (+52 more)

### Community 39 - "constructor"
Cohesion: 0.02
Nodes (165): add(), addClassName(), _addDefaultHandlers(), addTo(), af(), _applyChanges(), bf(), _blockedByActive() (+157 more)

### Community 40 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (80): addImages(), backfillBorder(), bucketIndex(), completeTask(), constructor(), containsMaxSafeIntegerValues(), copy(), copyImage() (+72 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (65): loadGlyphRange(), readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters() (+57 more)

### Community 43 - "emplaceBack"
Cohesion: 0.10
Nodes (32): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbols(), addTextVariableAnchorOffsets(), addVertex() (+24 more)

### Community 44 - "render"
Cohesion: 0.11
Nodes (25): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), _handleTerrainDataEvent(), isHidden() (+17 more)

### Community 45 - "_move"
Cohesion: 0.08
Nodes (29): coordinatePoint(), depthAtPoint(), gestureBeginsVertically(), getBearing(), getBearingDelta(), getElevationForLngLat(), getElevationForLngLatZoom(), getLngLat() (+21 more)

### Community 46 - "parse"
Cohesion: 0.04
Nodes (66): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+58 more)

### Community 47 - "evaluate"
Cohesion: 0.04
Nodes (82): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+74 more)

### Community 48 - "geometry"
Cohesion: 0.07
Nodes (53): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+45 more)

### Community 49 - "AppContext.jsx"
Cohesion: 0.11
Nodes (38): EmergencySOSModal(), PushNotificationBanner(), AppContext, AppProvider(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+30 more)

### Community 50 - "dependencies"
Cohesion: 0.04
Nodes (47): ably, autoprefixer, @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies (+39 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "featureFilter"
Cohesion: 0.06
Nodes (41): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), featureFilter(), findMixedLegacyFilter() (+33 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.06
Nodes (42): calculateVariableRenderShift(), fov(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+34 more)

### Community 55 - "appendRoundCorner"
Cohesion: 0.06
Nodes (47): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+39 more)

### Community 56 - "MaalemView.jsx"
Cohesion: 0.19
Nodes (22): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+14 more)

### Community 57 - "extend"
Cohesion: 0.04
Nodes (77): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy() (+69 more)

### Community 58 - "_addDefaultHandlers"
Cohesion: 0.20
Nodes (15): _addDefaultHandlers(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+7 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.08
Nodes (37): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+29 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (42): area(), buildBlockIndex(), clear(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+34 more)

### Community 62 - "update"
Cohesion: 0.09
Nodes (29): add(), compareMax(), emplace(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions() (+21 more)

### Community 63 - "dist"
Cohesion: 0.07
Nodes (39): addToLineVertexArray(), anchorIsTooClose(), angleTo(), checkIntersection(), checkMaxAngle(), classifyRings(), dist(), distSqr() (+31 more)

### Community 64 - "coveringTiles"
Cohesion: 0.05
Nodes (59): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+51 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+32 more)

### Community 67 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 68 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 69 - ".handleEvent"
Cohesion: 0.08
Nodes (33): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), generateMousePanHandler() (+25 more)

### Community 70 - "cameraForBoxAndBearing"
Cohesion: 0.20
Nodes (20): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), fitBounds(), getEast(), getLesserNonNegativeNonNull(), getNorth(), getNorthEast() (+12 more)

### Community 71 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 72 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 73 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (26): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+18 more)

### Community 74 - "featureFilter"
Cohesion: 0.07
Nodes (37): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), expandBy() (+29 more)

### Community 75 - "infobipAuthService.js"
Cohesion: 0.27
Nodes (18): AuthModal(), AuthProvider(), checkAndRecordOtpRateLimit(), checkPhoneProfile(), formatInternationalPhone(), formatMoroccanPhone(), getLocalPin(), getPhoneCandidateVariants() (+10 more)

### Community 76 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.11
Nodes (27): calculatePosMatrix(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix(), getTerrainCoords(), _getTerrainCoordsForRegularTile(), _getTerrainCoordsForTileRanges() (+19 more)

### Community 77 - "ClientView.jsx"
Cohesion: 0.13
Nodes (22): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), VoiceAudioPlayer() (+14 more)

### Community 78 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "jn"
Cohesion: 0.08
Nodes (33): Ar(), ca(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), loadURL(), mo() (+25 more)

### Community 82 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 83 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - ".handleEvent"
Cohesion: 0.06
Nodes (52): adjustFarPlaneByHorizonPlane(), _applyChanges(), _blockedByActive(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax() (+44 more)

### Community 89 - "LandingPage.jsx"
Cohesion: 0.15
Nodes (13): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, translations (+5 more)

### Community 90 - "update"
Cohesion: 0.18
Nodes (14): compareMax(), findPoleOfInaccessibility(), getCentroidCell(), hasDataProperty(), height(), patchUpdatedImage(), patchUpdatedImages(), premultiplyAlpha() (+6 more)

### Community 91 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 92 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 93 - "decodeFloat64Values"
Cohesion: 0.31
Nodes (9): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedInt64AsFloat64Stream(), decodeUnsignedRleFloat64(), decodeVarintFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value() (+1 more)

### Community 94 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

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

### Community 99 - "InteractiveMap.jsx"
Cohesion: 0.32
Nodes (7): getMapIconSvg(), getMapStyleJson(), InteractiveMap(), MAP_STYLES, ROAD_COLOR_THEMES, SVG_ICONS, calculateDistanceInKm()

### Community 173 - "get"
Cohesion: 0.03
Nodes (100): addDebugCollisionBoxes(), addFeature(), addFeatures(), addLineDashDependencies(), addPatternDependencies(), addSymbol(), addTextVertices(), addToSortKeyRanges() (+92 more)

## Knowledge Gaps
- **451 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+446 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `update`, `get`, `get`, `_calcMatrices`, `constructor`, `_addDefaultHandlers`, `update`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `update`, `constructor`, `n`, `get`, `get`, `_calcMatrices`, `constructor`, `_addDefaultHandlers`, `update`, `get`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `constructor`, `assets/maplibre-gl-dev.mjs`, `render`, `n`, `s`, `_move`, `get`, `parse`, `_calcMatrices`, `decodeGeometryColumn`, `appendRoundCorner`, `.handleEvent`, `._update`, `extend`, `_addDefaultHandlers`, `update`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _451 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0058378512879161265 - nodes in this community are weakly interconnected._
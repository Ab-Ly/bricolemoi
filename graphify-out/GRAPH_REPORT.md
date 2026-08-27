# Graph Report - bricolemoi  (2026-08-27)

## Corpus Check
- 170 files · ~817,944 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10319 nodes · 30042 edges · 130 communities (117 shown, 13 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `964cd3a6`
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
- _checkLoaded
- n
- get
- get
- evaluate
- get
- get
- _calcMatrices
- n
- _calcMatrices
- constructor
- update
- constructor
- get
- get
- push
- ._update
- public/maplibre-gl-worker.mjs
- push
- geometry
- ._update
- update
- get
- concat
- assets/maplibre-gl-worker-dev.mjs
- extend
- assets/maplibre-gl-worker.mjs
- parse
- concat
- parseCssColor
- render
- s
- parse
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- Wu
- .reset
- serialize
- addFeature
- evaluate
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- featureFilter
- shapeLines
- performSymbolLayout
- AdminDashboard.jsx
- extend
- coveringTiles
- eliminateHoles
- getElevation
- eliminateHoles
- featureToGeoJSON
- queryIntersectsFeature
- getElevation
- sub
- placeCollisionCircles
- queryIntersectsFeature
- useAblySupabaseSync.js
- readVarint
- resize
- appendRoundCorner
- loadTile
- App.jsx
- update
- AuthContext.jsx
- diffSources
- auth/AuthModal.jsx
- convertGeometryVector
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- _executeRelevantHandler
- Wu
- deepEqual
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- LandingPage.jsx
- constructor
- ga
- decodeFloat64Values
- useClientViewState.js
- parse
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- writeTag
- .handleEvent
- query
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- renderLayer
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- decodeZigZagInt32Value
- maalem/MaalemView.jsx
- getChildren
- vercel.json
- sw.js
- ja
- platformAuditReferee.js
- appendRoundCorner
- decodeFloat64Values
- telemetry.js
- addFeature

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
- `constructor()` --indirect_call--> `increment()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `key()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `x()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared.mjs

## Import Cycles
- None detected.

## Communities (130 total, 13 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (504): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+496 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (515): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+507 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (572): Hs(), Ru(), ad, add(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+564 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (549): Ms(), quadrant(), Ru(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+541 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (224): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+216 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (198): acquire(), acquireRTT(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+190 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (237): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+229 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (247): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+239 more)

### Community 8 - "_checkLoaded"
Cohesion: 0.04
Nodes (86): addImage(), addLayer(), addSource(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), _createLayers() (+78 more)

### Community 9 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (198): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+190 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (173): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+165 more)

### Community 12 - "evaluate"
Cohesion: 0.04
Nodes (71): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies(), calculateScaledKey() (+63 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (154): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+146 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (173): addBucket(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+165 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+135 more)

### Community 16 - "n"
Cohesion: 0.04
Nodes (230): addSprite(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix() (+222 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (152): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+144 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (109): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+101 more)

### Community 19 - "update"
Cohesion: 0.02
Nodes (156): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), attemptAnchorPlacement(), backfillDEM() (+148 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (127): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+119 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (122): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+114 more)

### Community 22 - "get"
Cohesion: 0.04
Nodes (102): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+94 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (110): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+102 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (89): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+81 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (115): Ar(), ca(), cameraPosition(), _computeClippingPlane(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+107 more)

### Community 26 - "push"
Cohesion: 0.04
Nodes (106): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+98 more)

### Community 27 - "geometry"
Cohesion: 0.08
Nodes (51): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox() (+43 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (109): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+101 more)

### Community 29 - "update"
Cohesion: 0.04
Nodes (82): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold() (+74 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 31 - "concat"
Cohesion: 0.04
Nodes (95): bind(), checkChild(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1() (+87 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (51): addProtocol(), br(), clipGeometry(), createStyleLayer(), fromVectorTileJs(), getImageData(), Point(), readImageDataUsingOffscreenCanvas() (+43 more)

### Community 33 - "extend"
Cohesion: 0.04
Nodes (73): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle() (+65 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (64): mf(), rs(), al, bt(), cn(), determineAverageLineWidth(), determineLineBreaks(), dn() (+56 more)

### Community 35 - "parse"
Cohesion: 0.07
Nodes (41): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+33 more)

### Community 36 - "concat"
Cohesion: 0.05
Nodes (78): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+70 more)

### Community 37 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 38 - "render"
Cohesion: 0.08
Nodes (34): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getState(), getTerrainCoords() (+26 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (139): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+131 more)

### Community 40 - "parse"
Cohesion: 0.08
Nodes (40): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+32 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (78): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), completeTask(), constructor() (+70 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (50): addProtocol(), br(), createStyleLayer(), fromVectorTileJs(), getImageData(), Point(), readImageDataUsingOffscreenCanvas(), register() (+42 more)

### Community 43 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 44 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 45 - ".reset"
Cohesion: 0.05
Nodes (51): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+43 more)

### Community 46 - "serialize"
Cohesion: 0.07
Nodes (38): breakLines(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), freeBufferAfterUpload() (+30 more)

### Community 47 - "addFeature"
Cohesion: 0.09
Nodes (43): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+35 more)

### Community 48 - "evaluate"
Cohesion: 0.04
Nodes (87): addFeatures(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), calculateGlyphDependencies() (+79 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (28): EmergencySOSModal(), MaalemRadarHeader(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+20 more)

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
Cohesion: 0.05
Nodes (44): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), evaluateProperties(), expandBy() (+36 more)

### Community 54 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 55 - "performSymbolLayout"
Cohesion: 0.04
Nodes (56): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize() (+48 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.20
Nodes (17): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), EnhancedCategoryIcon(), getSpecialtyLabel() (+9 more)

### Community 57 - "extend"
Cohesion: 0.05
Nodes (60): _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), demoteFeatureIds(), diffToHashed() (+52 more)

### Community 58 - "coveringTiles"
Cohesion: 0.05
Nodes (52): allowVariableZoom(), allowWorldCopies(), _applyChanges(), _blockedByActive(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles() (+44 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+32 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

### Community 63 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 64 - "getElevation"
Cohesion: 0.07
Nodes (32): coordinatePoint(), depthAtPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), getElevationForLngLat(), getElevationForLngLatZoom(), _getElevationSampler() (+24 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "placeCollisionCircles"
Cohesion: 0.08
Nodes (38): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getShiftedAnchor(), getTileSkewVectors(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians(), pathSlicedToLongestUnoccluded() (+30 more)

### Community 67 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.13
Nodes (36): broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId(), isCurrentUserAdmin() (+28 more)

### Community 69 - "readVarint"
Cohesion: 0.07
Nodes (43): bbox(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), getFeatures(), getValue(), getValueFromBuffer() (+35 more)

### Community 70 - "resize"
Cohesion: 0.08
Nodes (39): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), _containerDimensions(), createQuadTriangles(), _createStyleImage(), dispatchRenderCallbacks() (+31 more)

### Community 71 - "appendRoundCorner"
Cohesion: 0.12
Nodes (19): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+11 more)

### Community 72 - "loadTile"
Cohesion: 0.07
Nodes (40): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), deserialize(), destroy(), _diffStyle(), _downloadAndCacheRangePromise() (+32 more)

### Community 73 - "App.jsx"
Cohesion: 0.11
Nodes (22): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+14 more)

### Community 74 - "update"
Cohesion: 0.10
Nodes (25): compareMax(), emplace(), findPoleOfInaccessibility(), getCentroidCell(), getPositionIds(), hasDataProperty(), height(), isStyleImageWebGLData() (+17 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.13
Nodes (29): useAuthModalLogic(), ClientPhoneRequirementModal(), COUNTRY_DIAL_CODES, MOROCCAN_CITIES, AuthContext, AuthProvider(), app, auth (+21 more)

### Community 76 - "diffSources"
Cohesion: 0.29
Nodes (10): addCommand(), addSource(), canUpdateGeoJSON(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById(), pluckId() (+2 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+8 more)

### Community 78 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 82 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 83 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.05
Nodes (63): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+55 more)

### Community 89 - "LandingPage.jsx"
Cohesion: 0.10
Nodes (22): CATEGORIES_TAXONOMY, CategorySelector(), ClientSosForm(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer() (+14 more)

### Community 90 - "constructor"
Cohesion: 0.03
Nodes (84): add(), addImages(), backfillBorder(), bucketIndex(), compare(), compareMax(), constructor(), convertInOp$1() (+76 more)

### Community 91 - "ga"
Cohesion: 0.08
Nodes (30): allowVariableZoom(), allowWorldCopies(), _computeClippingPlane(), _createStyleImage(), distanceToTile2d(), distanceX(), distanceY(), Dp() (+22 more)

### Community 92 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 93 - "useClientViewState.js"
Cohesion: 0.14
Nodes (20): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientHistoryList(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity(), getServiceDisplay() (+12 more)

### Community 94 - "parse"
Cohesion: 0.09
Nodes (29): getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), gi(), as(), checkSubtype(), Do(), fr (+21 more)

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

### Community 99 - "writeTag"
Cohesion: 0.13
Nodes (27): realloc(), ty(), writeBoolean(), writeBooleanField(), writeBytes(), writeBytesField(), writeDouble(), writeDoubleField() (+19 more)

### Community 100 - ".handleEvent"
Cohesion: 0.10
Nodes (23): _applyChanges(), _blockedByActive(), _elevateCameraIfInsideTerrain(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches() (+15 more)

### Community 101 - "query"
Cohesion: 0.10
Nodes (23): _convertFromCellCoord(), _convertToCellCoord(), evaluateProperties(), expandBy(), _forEachCell(), getId(), getState(), insert() (+15 more)

### Community 106 - "renderLayer"
Cohesion: 0.12
Nodes (22): acquireRTT(), bindRTT(), getRTT(), getTexture(), renderLayer(), ad, Dd(), dr (+14 more)

### Community 110 - "decodeZigZagInt32Value"
Cohesion: 0.14
Nodes (22): decodeComponentwiseDeltaVec2(), decodeComponentwiseDeltaVec2Scaled(), decodeDeltaRleInt32(), decodeLengthToOffsetBuffer(), decodeRleDeltaInt32(), decodeSignedConstInt32Stream(), decodeSignedInt32(), decodeUnsignedComponentwiseDeltaVec2() (+14 more)

### Community 111 - "maalem/MaalemView.jsx"
Cohesion: 0.23
Nodes (12): MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemTransactionsModal(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), useMaalemViewState(), MaalemView(), useEmergencyFlow() (+4 more)

### Community 112 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 118 - "ja"
Cohesion: 0.18
Nodes (17): Aa(), ba(), canonicalID(), da(), ea, ga(), ha(), ja() (+9 more)

### Community 119 - "platformAuditReferee.js"
Cohesion: 0.28
Nodes (9): AdminDashboard(), MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, getCoordinatesFromDistrict(), auditPlatformState(), healPlatformState(), normalizeIntervention() (+1 more)

### Community 121 - "appendRoundCorner"
Cohesion: 0.27
Nodes (10): angle(), appendRoundCorner(), clone$1(), dot$1(), fromValues(), getAngleDelta(), rotate(), roundPolygonCorners() (+2 more)

### Community 122 - "decodeFloat64Values"
Cohesion: 0.36
Nodes (8): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedInt64AsFloat64Stream(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 173 - "addFeature"
Cohesion: 0.08
Nodes (46): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+38 more)

## Knowledge Gaps
- **454 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+449 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `resize`, `get`, `evaluate`, `getChildren`, `_calcMatrices`, `constructor`, `get`, `coveringTiles`, `ga`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `resize`, `n`, `get`, `evaluate`, `getChildren`, `_calcMatrices`, `constructor`, `get`, `coveringTiles`, `get`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `parse`, `assets/maplibre-gl-dev.mjs`, `resize`, `render`, `loadTile`, `appendRoundCorner`, `s`, `n`, `get`, `serialize`, `_calcMatrices`, `get`, `sub`, `._update`, `extend`, `coveringTiles`, `update`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _454 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0055662211771283394 - nodes in this community are weakly interconnected._
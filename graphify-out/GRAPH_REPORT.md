# Graph Report - bricolemoi  (2026-08-22)

## Corpus Check
- 108 files · ~793,006 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10211 nodes · 29626 edges · 151 communities (116 shown, 35 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2305cd32`
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
- n
- get
- get
- get
- constructor
- _calcMatrices
- s
- s
- _calcMatrices
- get
- constructor
- push
- evaluate
- clone
- push
- get
- assets/maplibre-gl-worker-dev.mjs
- ._update
- update
- assets/maplibre-gl-worker.mjs
- update
- ._update
- constructor
- performSymbolLayout
- public/maplibre-gl-worker.mjs
- concat
- extend
- public/maplibre-gl-worker-dev.mjs
- addFeature
- evaluate
- .handleEvent
- sub
- .handleEvent
- _executeRelevantHandler
- serialize
- Wu
- wrap
- coveringTiles
- writeMessage
- writeMessage
- coveringTiles
- eliminateHoles
- shapeLines
- getElevation
- eliminateHoles
- get
- populate
- extend
- concat
- queryIntersectsFeature
- Wu
- readVarint
- readVarint
- sub
- get
- getElevation
- constructor
- featureFilter
- parse
- appendRoundCorner
- renderLayer
- ga
- convertGeometryVector
- loadTile
- appendRoundCorner
- upload
- pushNotificationService.js
- resize
- deepEqual
- deepEqual
- parse
- _executeRelevantHandler
- LandingPage.jsx
- decodeFloat64Values
- decodeFloat64Values

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
Cohesion: 0.13
Nodes (31): EmergencySOSModal(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+23 more)

### Community 1 - "App.jsx"
Cohesion: 0.15
Nodes (21): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+13 more)

### Community 2 - "MaalemView.jsx"
Cohesion: 0.15
Nodes (26): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+18 more)

### Community 3 - "ClientView.jsx"
Cohesion: 0.16
Nodes (17): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), generateFallbackAudioDataUrl() (+9 more)

### Community 4 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (515): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+507 more)

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
Nodes (564): Ms(), quadrant(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+556 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (551): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+543 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (549): Ms(), quadrant(), Ru(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+541 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (222): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+214 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (262): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+254 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (222): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+214 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (236): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+228 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (168): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+160 more)

### Community 75 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 76 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 77 - "get"
Cohesion: 0.04
Nodes (157): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+149 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (173): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+165 more)

### Community 79 - "get"
Cohesion: 0.04
Nodes (153): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+145 more)

### Community 80 - "constructor"
Cohesion: 0.02
Nodes (134): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), center() (+126 more)

### Community 81 - "_calcMatrices"
Cohesion: 0.03
Nodes (153): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+145 more)

### Community 82 - "s"
Cohesion: 0.05
Nodes (141): acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices(), calculateCameraOptionsFromTo() (+133 more)

### Community 83 - "s"
Cohesion: 0.05
Nodes (139): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+131 more)

### Community 84 - "_calcMatrices"
Cohesion: 0.03
Nodes (162): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+154 more)

### Community 85 - "get"
Cohesion: 0.03
Nodes (137): sphereSurfacePointToCoordinates(), addIndicesForPlacedSymbol(), applyPropertyUpdates(), applySourceDiff(), backfillBorder(), clear(), columnToField(), columnTypeHasChildren() (+129 more)

### Community 86 - "constructor"
Cohesion: 0.03
Nodes (96): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+88 more)

### Community 87 - "push"
Cohesion: 0.03
Nodes (113): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+105 more)

### Community 88 - "evaluate"
Cohesion: 0.04
Nodes (99): isStyleLoaded(), accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addFeature(), addFeatures(), addGlobalState() (+91 more)

### Community 89 - "clone"
Cohesion: 0.06
Nodes (39): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+31 more)

### Community 90 - "push"
Cohesion: 0.03
Nodes (116): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+108 more)

### Community 91 - "get"
Cohesion: 0.03
Nodes (135): addIndicesForPlacedSymbol(), addTextVertices(), applyPropertyUpdates(), applySourceDiff(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName() (+127 more)

### Community 92 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (57): addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), evaluateProperties(), fromVectorTileJs() (+49 more)

### Community 93 - "._update"
Cohesion: 0.03
Nodes (109): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+101 more)

### Community 94 - "update"
Cohesion: 0.03
Nodes (107): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), attemptAnchorPlacement(), backfillDEM(), calculateVariableLayoutShift(), _cleanUpRasterTiles() (+99 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (64): mf(), rs(), al, bt(), cn(), determineAverageLineWidth(), determineLineBreaks(), dn() (+56 more)

### Community 96 - "update"
Cohesion: 0.03
Nodes (108): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+100 more)

### Community 97 - "._update"
Cohesion: 0.03
Nodes (103): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+95 more)

### Community 98 - "constructor"
Cohesion: 0.03
Nodes (88): dispatchRenderCallbacks(), add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax() (+80 more)

### Community 99 - "performSymbolLayout"
Cohesion: 0.04
Nodes (71): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize() (+63 more)

### Community 100 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (64): mf(), rs(), al, bt(), cn(), determineAverageLineWidth(), determineLineBreaks(), dn() (+56 more)

### Community 101 - "concat"
Cohesion: 0.06
Nodes (69): bind(), coalesce$1(), concat(), createFunction(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction() (+61 more)

### Community 102 - "extend"
Cohesion: 0.04
Nodes (66): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle(), _dispatchWorkerUpdate() (+58 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (55): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData(), groupByLayout() (+47 more)

### Community 104 - "addFeature"
Cohesion: 0.06
Nodes (59): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+51 more)

### Community 105 - "evaluate"
Cohesion: 0.06
Nodes (63): addGlobalState(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), canonicalID(), compareDistPair(), distance(), easeCubicInOut() (+55 more)

### Community 106 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 107 - "sub"
Cohesion: 0.09
Nodes (38): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+30 more)

### Community 108 - ".handleEvent"
Cohesion: 0.04
Nodes (68): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+60 more)

### Community 109 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 110 - "serialize"
Cohesion: 0.07
Nodes (38): completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey() (+30 more)

### Community 111 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 112 - "wrap"
Cohesion: 0.08
Nodes (47): sphereSurfacePointToCoordinates(), bboxToBBoxDistance(), compareDistPair(), distance(), getBBox(), getLngLatFromTileCoord(), getPolygonBBox(), getRangeSize() (+39 more)

### Community 113 - "coveringTiles"
Cohesion: 0.06
Nodes (47): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), distanceToTile2d() (+39 more)

### Community 114 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 115 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 116 - "coveringTiles"
Cohesion: 0.06
Nodes (50): _addDefaultHandlers(), allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), assignEvents(), coordinatePoint(), coveringTiles() (+42 more)

### Community 117 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 118 - "shapeLines"
Cohesion: 0.05
Nodes (48): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+40 more)

### Community 119 - "getElevation"
Cohesion: 0.06
Nodes (48): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), getTerrainCoords() (+40 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 121 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 122 - "populate"
Cohesion: 0.03
Nodes (88): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), charInRTLScript(), charInSupportedScript(), checkIntersection(), circleIntersection(), classifyRings() (+80 more)

### Community 123 - "extend"
Cohesion: 0.06
Nodes (48): _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _dispatchWorkerUpdate(), doOnceCompleted(), extend(), extractCoordinates() (+40 more)

### Community 124 - "concat"
Cohesion: 0.04
Nodes (86): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+78 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 126 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 127 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 128 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 129 - "sub"
Cohesion: 0.06
Nodes (59): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+51 more)

### Community 130 - "get"
Cohesion: 0.05
Nodes (85): ac(), add(), addIndicesForPlacedSymbol(), ax, bs(), bx(), clear(), concat() (+77 more)

### Community 131 - "getElevation"
Cohesion: 0.05
Nodes (62): calculateFogMatrix(), calculatePosMatrix(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler() (+54 more)

### Community 132 - "constructor"
Cohesion: 0.03
Nodes (70): add(), addImages(), bucketIndex(), compare(), constructor(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1() (+62 more)

### Community 133 - "featureFilter"
Cohesion: 0.07
Nodes (35): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), featureFilter(), findMixedLegacyFilter() (+27 more)

### Community 134 - "parse"
Cohesion: 0.07
Nodes (42): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+34 more)

### Community 135 - "appendRoundCorner"
Cohesion: 0.16
Nodes (15): angle(), appendRoundCorner(), clone$1(), dot$1(), fromValues(), getAngleDelta(), getTileUnitsForMeters(), mercatorScale() (+7 more)

### Community 136 - "renderLayer"
Cohesion: 0.12
Nodes (22): acquireRTT(), bindRTT(), getRTT(), getTexture(), renderLayer(), ad, Dd(), dr (+14 more)

### Community 137 - "ga"
Cohesion: 0.08
Nodes (30): allowVariableZoom(), allowWorldCopies(), _computeClippingPlane(), _createStyleImage(), distanceToTile2d(), distanceX(), distanceY(), Dp() (+22 more)

### Community 138 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 139 - "loadTile"
Cohesion: 0.07
Nodes (40): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), _diffStyle(), _downloadAndCacheRangePromise(), _drawGlyph() (+32 more)

### Community 140 - "appendRoundCorner"
Cohesion: 0.10
Nodes (23): fov(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromQuat$1() (+15 more)

### Community 141 - "upload"
Cohesion: 0.20
Nodes (11): lazyLoad(), _requestImport(), rm(), Ru(), setRTLTextPlugin(), getBinderAttributes(), getVertexAttributes(), isEmpty() (+3 more)

### Community 142 - "pushNotificationService.js"
Cohesion: 0.47
Nodes (8): PushNotificationBanner(), getNotificationPermissionState(), isPushSupported(), subscribeUserToPush(), testPushNotification(), unsubscribeUserFromPush(), urlBase64ToUint8Array(), VAPID_PUBLIC_KEY

### Community 146 - "resize"
Cohesion: 0.18
Nodes (17): _addDefaultHandlers(), assignEvents(), createQuadTriangles(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+9 more)

### Community 147 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 148 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 149 - "parse"
Cohesion: 0.07
Nodes (40): getTileBoundingVolume(), array(), assertRootKey(), checkSubtype(), createExpression(), createPropertyExpression(), eachChild(), error() (+32 more)

### Community 153 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 154 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

### Community 155 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 156 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

## Knowledge Gaps
- **446 isolated node(s):** `recentRequests`, `name`, `private`, `version`, `type` (+441 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `ga`, `get`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `push`, `populate`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `n`, `get`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `push`, `get`, `populate`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `constructor`, `public/maplibre-gl-worker.mjs`, `get`, `constructor`, `_calcMatrices`, `resize`, `coveringTiles`, `evaluate`, `push`, `get`, `public/maplibre-gl-shared.mjs`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `name`, `private` to the rest of the system?**
  _446 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppContext.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13399778516057587 - nodes in this community are weakly interconnected._
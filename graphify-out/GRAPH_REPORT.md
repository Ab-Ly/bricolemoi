# Graph Report - bricolemoi  (2026-08-23)

## Corpus Check
- 112 files · ~798,798 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10229 nodes · 29650 edges · 162 communities (120 shown, 42 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a7e0b3cb`
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
- push
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
- coveringTiles
- public/maplibre-gl-worker-dev.mjs
- addFeature
- geometry
- parse
- sub
- preventDefault
- extend
- extend
- parse
- pointsToPolygonDistance
- add
- writeMessage
- writeMessage
- getPitchedLabelPlaneMatrix
- eliminateHoles
- appendRoundCorner
- updateVariableAnchorsForBucket
- eliminateHoles
- featureFilter
- queryIntersectsFeature
- readVarint
- concat
- queryIntersectsFeature
- serialize
- readVarint
- evaluate
- sub
- update
- getElevation
- constructor
- parse
- .handleEvent
- Od
- .reset
- parseCssColor
- decodeFloat64Values
- placeLayerBucketPart
- hasDebugData
- intersects
- translate
- convertGeometryVector
- hasDebugData
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

## Communities (162 total, 42 thin omitted)

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
Nodes (558): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+550 more)

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

### Community 22 - "push"
Cohesion: 0.02
Nodes (199): ac(), add(), addIndicesForPlacedSymbol(), addSymbols(), addTileFeatures(), addToLineVertexArray(), addToSortKeyRanges(), ah() (+191 more)

### Community 49 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 59 - "send-otp.js"
Cohesion: 0.67
Nodes (3): cleanPhoneNumber(), handler(), recentRequests

### Community 63 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (446): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+438 more)

### Community 64 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (559): _a(), aa(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+551 more)

### Community 69 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (614): Da(), quadrant(), Ru(), Aa(), ac(), add(), _addCollisionDebugVertex(), addCollisionDebugVertices() (+606 more)

### Community 70 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (213): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+205 more)

### Community 71 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (263): tileIdToLngLatBounds(), addEventDefaultOptions, _addEventListener(), align$1(), altitudeFromMercatorZ(), anchors, angleWith(), angleWithSep() (+255 more)

### Community 72 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (215): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+207 more)

### Community 73 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (245): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+237 more)

### Community 74 - "get"
Cohesion: 0.03
Nodes (171): ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu(), _buildSkirts() (+163 more)

### Community 75 - "n"
Cohesion: 0.03
Nodes (227): addSprite(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix() (+219 more)

### Community 76 - "n"
Cohesion: 0.03
Nodes (181): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+173 more)

### Community 77 - "get"
Cohesion: 0.04
Nodes (157): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+149 more)

### Community 78 - "get"
Cohesion: 0.03
Nodes (195): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+187 more)

### Community 79 - "get"
Cohesion: 0.03
Nodes (163): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+155 more)

### Community 80 - "constructor"
Cohesion: 0.02
Nodes (105): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _cancelRenderFrame() (+97 more)

### Community 81 - "_calcMatrices"
Cohesion: 0.03
Nodes (145): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+137 more)

### Community 82 - "s"
Cohesion: 0.06
Nodes (130): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+122 more)

### Community 83 - "cameraForBoxAndBearing"
Cohesion: 0.07
Nodes (48): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), Fi(), fitBounds(), fo(), fov(), getEast() (+40 more)

### Community 84 - "add"
Cohesion: 0.04
Nodes (111): add(), addClassName(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo() (+103 more)

### Community 85 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+117 more)

### Community 86 - "constructor"
Cohesion: 0.02
Nodes (93): addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport(), _clearWatch(), constructor() (+85 more)

### Community 87 - "push"
Cohesion: 0.03
Nodes (118): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+110 more)

### Community 88 - "coveringTiles"
Cohesion: 0.04
Nodes (67): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+59 more)

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
Cohesion: 0.03
Nodes (118): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyGlobalStateChanges() (+110 more)

### Community 94 - "update"
Cohesion: 0.03
Nodes (96): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+88 more)

### Community 95 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (65): mf(), al, C(), cn(), ct(), determineAverageLineWidth(), determineLineBreaks(), dn() (+57 more)

### Community 96 - "update"
Cohesion: 0.03
Nodes (106): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+98 more)

### Community 97 - "._update"
Cohesion: 0.03
Nodes (110): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+102 more)

### Community 98 - "constructor"
Cohesion: 0.03
Nodes (110): addImages(), array(), assertRootKey(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), checkSubtype() (+102 more)

### Community 99 - "appendRoundCorner"
Cohesion: 0.06
Nodes (44): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+36 more)

### Community 100 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (76): _computeClippingPlane(), _createStyleImage(), _getOperationsToPerform(), loadURL(), mf(), mo(), rs(), serialize() (+68 more)

### Community 101 - "concat"
Cohesion: 0.05
Nodes (72): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+64 more)

### Community 102 - "coveringTiles"
Cohesion: 0.05
Nodes (54): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+46 more)

### Community 103 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (88): _diffStyle(), loadTileJson(), loadURL(), readImageNow(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap(), br() (+80 more)

### Community 104 - "addFeature"
Cohesion: 0.06
Nodes (58): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+50 more)

### Community 105 - "geometry"
Cohesion: 0.07
Nodes (53): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+45 more)

### Community 106 - "parse"
Cohesion: 0.04
Nodes (79): Ar(), bo(), calculatePosMatrix(), cameraPosition(), co(), _computeTileBoundingVolume(), Do(), fromAabb() (+71 more)

### Community 107 - "sub"
Cohesion: 0.12
Nodes (33): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromInvProjectionMatrix(), getIdealNearFarPlaneDistance() (+25 more)

### Community 108 - "preventDefault"
Cohesion: 0.06
Nodes (46): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+38 more)

### Community 109 - "extend"
Cohesion: 0.06
Nodes (42): _applyChanges(), _blockedByActive(), extend(), extractCoordinates(), fillExtrusionPatternUniformValues(), fillOutlinePatternUniformValues(), fillPatternUniformValues(), _fireEvent() (+34 more)

### Community 110 - "extend"
Cohesion: 0.07
Nodes (47): _afterEase(), bearing(), dblclick(), _ease(), easeOut(), easeTo(), extend(), fillExtrusionPatternUniformValues() (+39 more)

### Community 111 - "parse"
Cohesion: 0.07
Nodes (41): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+33 more)

### Community 112 - "pointsToPolygonDistance"
Cohesion: 0.08
Nodes (46): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+38 more)

### Community 113 - "add"
Cohesion: 0.13
Nodes (18): add(), emplace(), _getAndRemoveByKey(), getNumericId(), getPositionIds(), getPositions(), id(), map() (+10 more)

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
Nodes (52): getTileSkewVectors(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+44 more)

### Community 119 - "updateVariableAnchorsForBucket"
Cohesion: 0.05
Nodes (63): attemptAnchorPlacement(), calculateVariableLayoutShift(), calculateVariableRenderShift(), continuePlacement(), demoteFeatureIds(), diffToHashed(), fastInvertSkewMat4(), findOffsetIntersectionPoint() (+55 more)

### Community 120 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 121 - "featureFilter"
Cohesion: 0.07
Nodes (37): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), expandBy() (+29 more)

### Community 122 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 123 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 124 - "concat"
Cohesion: 0.04
Nodes (87): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+79 more)

### Community 125 - "queryIntersectsFeature"
Cohesion: 0.08
Nodes (33): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), intersectionTestMapMap() (+25 more)

### Community 126 - "serialize"
Cohesion: 0.06
Nodes (39): breakLines(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), freeBufferAfterUpload() (+31 more)

### Community 127 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 128 - "evaluate"
Cohesion: 0.04
Nodes (64): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), _calculate(), calculateGlyphDependencies(), constantOr(), _convertFromCellCoord() (+56 more)

### Community 129 - "sub"
Cohesion: 0.10
Nodes (35): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+27 more)

### Community 130 - "update"
Cohesion: 0.09
Nodes (25): _createStyleImage(), dispatchRenderCallbacks(), compareMax(), findPoleOfInaccessibility(), getCentroidCell(), getEpsg3857Coords(), getQuadkey(), getTileBBox() (+17 more)

### Community 131 - "getElevation"
Cohesion: 0.10
Nodes (32): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+24 more)

### Community 132 - "constructor"
Cohesion: 0.03
Nodes (76): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compare(), compareMax() (+68 more)

### Community 133 - "parse"
Cohesion: 0.07
Nodes (43): bo(), co(), Do(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), gi(), ho() (+35 more)

### Community 134 - ".handleEvent"
Cohesion: 0.09
Nodes (31): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _fireEvents(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+23 more)

### Community 135 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 136 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 137 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 138 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 139 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 140 - "hasDebugData"
Cohesion: 0.20
Nodes (11): destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData(), hasTextCollisionBoxData() (+3 more)

### Community 141 - "intersects"
Cohesion: 0.30
Nodes (12): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+4 more)

### Community 142 - "translate"
Cohesion: 0.22
Nodes (11): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getTerrainCoords(), _getTerrainCoordsForRegularTile(), _getTerrainCoordsForTileRanges(), getViewportMatrix(), _isWithinTileRanges() (+3 more)

### Community 143 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 144 - "hasDebugData"
Cohesion: 0.20
Nodes (11): destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData(), hasTextCollisionBoxData() (+3 more)

### Community 145 - "evaluate"
Cohesion: 0.03
Nodes (113): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+105 more)

### Community 146 - "AppContext.jsx"
Cohesion: 0.25
Nodes (13): AppContext, AppProvider(), calculateDistanceInKm(), useAblyPresence(), ABLY_CHANNELS, getAblyClient(), getStableAnonymousClientId(), isAblyConfigured (+5 more)

### Community 147 - "deepEqual"
Cohesion: 0.14
Nodes (21): serialize(), setState(), addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), deref(), derefLayers() (+13 more)

### Community 148 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

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

- **Why does `y()` connect `n` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `.handleEvent`, `constructor`, `get`, `cameraForBoxAndBearing`, `add`, `get`, `constructor`, `readVarint`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `.handleEvent`, `constructor`, `parse`, `get`, `cameraForBoxAndBearing`, `add`, `get`, `constructor`, `readVarint`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `update`, `public/maplibre-gl-worker.mjs`, `get`, `constructor`, `_calcMatrices`, `evaluate`, `coveringTiles`, `push`, `get`, `public/maplibre-gl-shared.mjs`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `name`, `private` to the rest of the system?**
  _447 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MaalemView.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14242424242424243 - nodes in this community are weakly interconnected._
# Graph Report - bricolemoi  (2026-08-29)

## Corpus Check
- 197 files · ~835,971 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10479 nodes · 30278 edges · 140 communities (123 shown, 17 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8bd121dc`
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
- coveringTiles
- get
- get
- get
- concat
- get
- get
- _calcMatrices
- s
- _calcMatrices
- constructor
- update
- constructor
- decodeGeometryColumn
- decodeGeometryColumn
- push
- ._update
- n
- push
- dist
- ._update
- update
- coveringTiles
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- get
- n
- public/maplibre-gl-worker.mjs
- concat
- parse
- query
- s
- .handleEvent
- constructor
- public/maplibre-gl-worker-dev.mjs
- featureFilter
- get
- constructor
- devDependencies
- emplaceBack
- clone
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- emplaceBack
- appendRoundCorner
- appendRoundCorner
- AdminDashboard.jsx
- Wu
- queryIntersectsFeature
- eliminateHoles
- getElevation
- eliminateHoles
- ga
- pointsToPolygonDistance
- getSunPos
- sub
- updateVariableAnchorsForBucket
- get
- useAblySupabaseSync.js
- readVarint
- deepEqual
- extend
- pointsToPolygonDistance
- App.jsx
- getPitchedLabelPlaneMatrix
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- deepEqual
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- _addDefaultHandlers
- dist
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- convertGeometryVector
- resize
- extend
- inspect_finances.js
- useClientViewState.js
- LandingPage.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- relaunch_centrifugo.js
- mergeSourceDiffs
- inspect_docker.js
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- decodeFloat64Values
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- update_centrifugo.js
- vercel.json
- sw.js
- clean_test_data.js
- check_labels.js
- simulate.js
- logs.js
- telemetry.js
- check_proxy.js
- list_all_data.js
- test_cycle.js
- update
- maalem/MaalemView.jsx
- CentrifugoClient
- supabase-status.js
- 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS
- deploy.sh
- audit.js
- reconcile.js
- package.json
- watch-deploy.js

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

## Communities (140 total, 17 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (572): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+564 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (562): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+554 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (571): Ms(), quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex() (+563 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (560): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+552 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (219): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+211 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (217): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+209 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (281): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), altitudeFromMercatorZ() (+273 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (260): tileIdToLngLatBounds(), addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing() (+252 more)

### Community 8 - "coveringTiles"
Cohesion: 0.05
Nodes (57): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+49 more)

### Community 9 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (163): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+155 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (186): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+178 more)

### Community 12 - "concat"
Cohesion: 0.04
Nodes (94): bind(), checkChild(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1() (+86 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (151): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+143 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (153): atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+145 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (147): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+139 more)

### Community 16 - "s"
Cohesion: 0.06
Nodes (133): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+125 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.04
Nodes (116): adjustAntiMeridian(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+108 more)

### Community 18 - "constructor"
Cohesion: 0.03
Nodes (93): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _cancelRenderFrame(), checkGeolocationSupport(), _clearWatch() (+85 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (106): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+98 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (128): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), checkGeolocationSupport(), _clearWatch() (+120 more)

### Community 21 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (105): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+97 more)

### Community 22 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (108): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+100 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (132): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addIndicesForPlacedSymbol(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+124 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (102): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+94 more)

### Community 25 - "n"
Cohesion: 0.04
Nodes (168): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+160 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (139): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addIndicesForPlacedSymbol(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+131 more)

### Community 27 - "dist"
Cohesion: 0.33
Nodes (11): addToLineVertexArray(), anchorIsTooClose(), angleTo(), checkMaxAngle(), dist(), getAnchors(), getAngleWindowSize(), getCenterAnchor() (+3 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (87): addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures(), coalesceChanges() (+79 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (111): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+103 more)

### Community 30 - "coveringTiles"
Cohesion: 0.06
Nodes (45): allowVariableZoom(), allowWorldCopies(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), distanceToTile2d(), distanceToTileSimple() (+37 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (71): loadURL(), mf(), mo(), rs(), al, bt(), cn(), determineAverageLineWidth() (+63 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.03
Nodes (110): _afterTileLoadWorkerResponse(), _createStyleImage(), _diffStyle(), dispatchRenderCallbacks(), _getOverzoomParameters(), loadGlyphRange(), loadSprite(), loadTile() (+102 more)

### Community 33 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (175): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+167 more)

### Community 35 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (72): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), determineAverageLineWidth() (+64 more)

### Community 36 - "concat"
Cohesion: 0.05
Nodes (74): bind(), coalesce$1(), concat(), createFunction(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction() (+66 more)

### Community 37 - "parse"
Cohesion: 0.04
Nodes (67): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+59 more)

### Community 38 - "query"
Cohesion: 0.11
Nodes (23): _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), expandBy(), finish(), _forEachCell(), getKey() (+15 more)

### Community 39 - "s"
Cohesion: 0.06
Nodes (133): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+125 more)

### Community 40 - ".handleEvent"
Cohesion: 0.04
Nodes (70): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+62 more)

### Community 41 - "constructor"
Cohesion: 0.04
Nodes (64): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), copy() (+56 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (69): serialize(), addProtocol(), br(), clipGeometry(), createStyleLayer(), filterObject(), fromVectorTileJs(), getArrayBuffer() (+61 more)

### Community 43 - "featureFilter"
Cohesion: 0.06
Nodes (39): checkChild(), classifyChildren(), classifyFilter(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1() (+31 more)

### Community 44 - "get"
Cohesion: 0.03
Nodes (122): add(), addDebugCollisionBoxes(), addFeature(), addFeatures(), addLineDashDependencies(), addPatternDependencies(), addSymbol(), addTextVertices() (+114 more)

### Community 45 - "constructor"
Cohesion: 0.03
Nodes (79): addImages(), backfillBorder(), bbox(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), copy() (+71 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "emplaceBack"
Cohesion: 0.10
Nodes (33): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbols(), addTextVariableAnchorOffsets(), addVertex() (+25 more)

### Community 48 - "clone"
Cohesion: 0.06
Nodes (41): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+33 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (29): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+21 more)

### Community 50 - "dependencies"
Cohesion: 0.10
Nodes (21): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+13 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "emplaceBack"
Cohesion: 0.10
Nodes (33): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbols(), addTextVariableAnchorOffsets(), addVertex() (+25 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.06
Nodes (44): getTileSkewVectors(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+36 more)

### Community 55 - "appendRoundCorner"
Cohesion: 0.06
Nodes (44): getTileSkewVectors(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+36 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.14
Nodes (31): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY (+23 more)

### Community 57 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 58 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (45): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), findPoleOfInaccessibility() (+37 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 60 - "getElevation"
Cohesion: 0.10
Nodes (31): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+23 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (39): area(), buildBlockIndex(), clear(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+31 more)

### Community 62 - "ga"
Cohesion: 0.09
Nodes (26): allowVariableZoom(), allowWorldCopies(), _computeClippingPlane(), distanceToTile2d(), distanceX(), distanceY(), Dp(), ga() (+18 more)

### Community 63 - "pointsToPolygonDistance"
Cohesion: 0.07
Nodes (49): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+41 more)

### Community 64 - "getSunPos"
Cohesion: 0.12
Nodes (17): fillExtrusionUniformValues(), getCartesianPosition(), getSunPos(), transformLightDirection(), create$4(), create$6(), createIdentityMat4f32(), createIdentityMat4f64() (+9 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "updateVariableAnchorsForBucket"
Cohesion: 0.05
Nodes (67): _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), attemptAnchorPlacement(), calculateVariableLayoutShift(), calculateVariableRenderShift(), continuePlacement(), demoteFeatureIds() (+59 more)

### Community 67 - "get"
Cohesion: 0.03
Nodes (117): addDebugCollisionBoxes(), addFeature(), addFeatures(), addLineDashDependencies(), addPatternDependencies(), addSymbol(), addTextVertices(), addToSortKeyRanges() (+109 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.11
Nodes (37): AdminRealtimeConsole(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+29 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "extend"
Cohesion: 0.05
Nodes (62): _afterTileLoadWorkerResponse(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle(), doOnceCompleted() (+54 more)

### Community 72 - "pointsToPolygonDistance"
Cohesion: 0.13
Nodes (28): bboxToBBoxDistance(), compareDistPair(), distance(), getBBox(), getLngLatFromTileCoord(), getRangeSize(), isRangeSafe(), isValidBBox() (+20 more)

### Community 73 - "App.jsx"
Cohesion: 0.09
Nodes (27): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+19 more)

### Community 74 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.11
Nodes (26): calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix() (+18 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.11
Nodes (33): useAuthModalLogic(), ClientPhoneRequirementModal(), COUNTRY_DIAL_CODES, MOROCCAN_CITIES, useAdminService(), AuthContext, AuthProvider(), app (+25 more)

### Community 76 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+8 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.09
Nodes (20): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+12 more)

### Community 78 - "deepEqual"
Cohesion: 0.16
Nodes (19): setState(), addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), deref(), derefLayers(), diff() (+11 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "_addDefaultHandlers"
Cohesion: 0.20
Nodes (15): _addDefaultHandlers(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+7 more)

### Community 83 - "dist"
Cohesion: 0.07
Nodes (40): addToLineVertexArray(), anchorIsTooClose(), angleTo(), checkIntersection(), checkMaxAngle(), classifyRings(), dist(), distSqr() (+32 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.10
Nodes (35): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+27 more)

### Community 89 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 90 - "resize"
Cohesion: 0.12
Nodes (25): _addDefaultHandlers(), assignEvents(), _containerDimensions(), createQuadTriangles(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+17 more)

### Community 91 - "extend"
Cohesion: 0.04
Nodes (84): _afterEase(), _applyChanges(), _applyResourceTiming(), backgroundPatternUniformValues(), bearing(), bgPatternUniformValues(), _blockedByActive(), _cancelRenderFrame() (+76 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.09
Nodes (32): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientHistoryList(), ClientRadarSearchingCard(), ClientReviewCompletionModal() (+24 more)

### Community 94 - "LandingPage.jsx"
Cohesion: 0.15
Nodes (13): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, translations (+5 more)

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

### Community 99 - "relaunch_centrifugo.js"
Cohesion: 0.40
Nodes (4): configB64, configContent, conn, __dirname

### Community 100 - "mergeSourceDiffs"
Cohesion: 0.28
Nodes (9): _applyDiffToSource(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds() (+1 more)

### Community 101 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 106 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 111 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 113 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, framework, headers, outputDirectory, rewrites

### Community 118 - "clean_test_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 121 - "simulate.js"
Cohesion: 0.33
Nodes (6): __dirname, envPath, envVars, __filename, runSimulation(), sleep()

### Community 122 - "logs.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 133 - "update"
Cohesion: 0.08
Nodes (32): addImage(), _createStyleImage(), dispatchRenderCallbacks(), getImage(), getPattern(), updateImage(), _updatePatternAtlas(), compareMax() (+24 more)

### Community 137 - "maalem/MaalemView.jsx"
Cohesion: 0.20
Nodes (7): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), MaalemView()

### Community 147 - "supabase-status.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 148 - "🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS"
Cohesion: 0.29
Nodes (6): 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS, 📋 Prérequis sur votre VPS, ⚡ Étape 1 : Copier les fichiers et Démarrer Centrifugo, 🔒 Étape 2 : Configurer Nginx & Certificat SSL (HTTPS / WSS), 🖥️ Étape 3 : Accéder au Dashboard Admin Centrifugo, 📱 Étape 4 : Activer Centrifugo dans le projet Frontend (Vite)

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

## Knowledge Gaps
- **539 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+534 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `push`, `queryIntersectsFeature`, `get`, `get`, `get`, `_calcMatrices`, `constructor`, `resize`, `coveringTiles`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `queryIntersectsFeature`, `get`, `get`, `_calcMatrices`, `constructor`, `ga`, `resize`, `coveringTiles`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `public/maplibre-gl-shared.mjs`, `get`, `public/maplibre-gl-worker.mjs`, `update`, `coveringTiles`, `get`, `_calcMatrices`, `constructor`, `_addDefaultHandlers`, `push`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _539 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005095650096418027 - nodes in this community are weakly interconnected._
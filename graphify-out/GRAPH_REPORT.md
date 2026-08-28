# Graph Report - bricolemoi  (2026-08-28)

## Corpus Check
- 183 files · ~824,144 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10406 nodes · 30170 edges · 135 communities (120 shown, 15 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `799077f6`
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
- s
- push
- get
- get
- concat
- get
- get
- add
- n
- extend
- constructor
- update
- constructor
- get
- get
- push
- ._update
- public/maplibre-gl-worker.mjs
- push
- emplaceBack
- ._update
- update
- get
- queryRenderedFeatures
- assets/maplibre-gl-worker-dev.mjs
- resize
- assets/maplibre-gl-worker.mjs
- .handleEvent
- concat
- parseCssColor
- parse
- flyTo
- evaluate
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- evaluate
- featureFilter
- devDependencies
- .handleEvent
- pointsToPolygonDistance
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- clone
- shapeLines
- shapeLines
- UserProfileModal.jsx
- constructor
- queryIntersectsFeature
- eliminateHoles
- getElevation
- eliminateHoles
- parse
- coveringTiles
- placeLayerBucketPart
- sub
- updateVariableAnchorsForBucket
- query
- useAblySupabaseSync.js
- readVarint
- deepEqual
- extend
- _executeRelevantHandler
- App.jsx
- @supabase/supabase-js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- serialize
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- appendRoundCorner
- serialize
- extend
- useClientViewState.js
- LandingPage.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- readVarint
- placeLayerBucketPart
- convertGeometryVector
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- deepEqual
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- maalem/MaalemView.jsx
- Wu
- vercel.json
- sw.js
- clean_test_data.js
- decodeFloat64Values
- simulate.js
- logs.js
- telemetry.js
- inspect_data.js
- list_all_data.js
- .reset
- audit.js
- reconcile.js
- package.json
- decodeFloat64Values
- watch-deploy.js
- framer-motion

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

## Communities (135 total, 15 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (569): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+561 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (585): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+577 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (563): Ms(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+555 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (496): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+488 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (213): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+205 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (222): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+214 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (254): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+246 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (245): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep(), applyBlockExceptions() (+237 more)

### Community 8 - "s"
Cohesion: 0.05
Nodes (135): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+127 more)

### Community 9 - "push"
Cohesion: 0.03
Nodes (281): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _createLayers(), querySourceFeatures(), es(), gc() (+273 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (166): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+158 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (178): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+170 more)

### Community 12 - "concat"
Cohesion: 0.05
Nodes (79): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertInOp$1() (+71 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (153): atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+145 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (169): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+161 more)

### Community 15 - "add"
Cohesion: 0.03
Nodes (147): add(), addClassName(), adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform() (+139 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (185): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+177 more)

### Community 17 - "extend"
Cohesion: 0.03
Nodes (149): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+141 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (128): addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), center(), checkGeolocationSupport(), _clearWatch() (+120 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (96): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+88 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (105): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+97 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (130): add(), addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector() (+122 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (124): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+116 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (117): sphereSurfacePointToCoordinates(), addFeature$1(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint(), addPointsTileFeature(), addTileFeatures() (+109 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (88): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+80 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (63): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), dn() (+55 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (114): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+106 more)

### Community 27 - "emplaceBack"
Cohesion: 0.06
Nodes (57): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbol(), addSymbols(), addTextVariableAnchorOffsets() (+49 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (82): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+74 more)

### Community 29 - "update"
Cohesion: 0.02
Nodes (133): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+125 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (90): ac(), add(), addIndicesForPlacedSymbol(), ax, bb(), Bd(), bs(), bx() (+82 more)

### Community 31 - "queryRenderedFeatures"
Cohesion: 0.07
Nodes (42): calculateFogMatrix(), calculatePosMatrix(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), finish(), _flattenAndSortRenderedFeatures(), getAllIds() (+34 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (67): readImageNow(), _updatePatternAtlas(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters() (+59 more)

### Community 33 - "resize"
Cohesion: 0.08
Nodes (37): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), _containerDimensions(), createQuadTriangles(), _createStyleImage(), dispatchRenderCallbacks() (+29 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (99): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getElevationForLngLatZoom() (+91 more)

### Community 35 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 36 - "concat"
Cohesion: 0.05
Nodes (81): bind(), checkChild(), classifyChildren(), classifyFilter(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1() (+73 more)

### Community 37 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 38 - "parse"
Cohesion: 0.08
Nodes (40): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+32 more)

### Community 39 - "flyTo"
Cohesion: 0.03
Nodes (134): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+126 more)

### Community 40 - "evaluate"
Cohesion: 0.03
Nodes (121): isStyleLoaded(), accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature() (+113 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (67): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+59 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (63): addProtocol(), assertRootKey(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createExpression(), createStyleLayer() (+55 more)

### Community 43 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 44 - "evaluate"
Cohesion: 0.04
Nodes (97): addFeature(), addFeatures(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), anchorIsTooClose(), bboxToBBoxDistance() (+89 more)

### Community 45 - "featureFilter"
Cohesion: 0.07
Nodes (36): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), featureFilter(), findMixedLegacyFilter() (+28 more)

### Community 46 - "devDependencies"
Cohesion: 0.13
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+7 more)

### Community 47 - ".handleEvent"
Cohesion: 0.11
Nodes (21): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), _getMapTouches(), hasChange(), isActive() (+13 more)

### Community 48 - "pointsToPolygonDistance"
Cohesion: 0.07
Nodes (55): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getLngLatFromTileCoord() (+47 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.15
Nodes (26): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+18 more)

### Community 50 - "dependencies"
Cohesion: 0.11
Nodes (19): ably, @aws-sdk/client-s3, firebase, lucide-react, maplibre-gl, dependencies, ably, @aws-sdk/client-s3 (+11 more)

### Community 51 - "writeMessage"
Cohesion: 0.08
Nodes (47): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+39 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "clone"
Cohesion: 0.05
Nodes (50): addCurrentVertex(), addHalfVertex(), addLine(), anchorIsTooClose(), angle(), angleTo(), appendRoundCorner(), checkMaxAngle() (+42 more)

### Community 54 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 55 - "shapeLines"
Cohesion: 0.09
Nodes (28): calculateVariableRenderShift(), align(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charInComplexShapingScript(), charIsWhitespace(), codePointAllowsIdeographicBreaking() (+20 more)

### Community 56 - "UserProfileModal.jsx"
Cohesion: 0.14
Nodes (31): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), PaginationControls() (+23 more)

### Community 57 - "constructor"
Cohesion: 0.04
Nodes (63): sphereSurfacePointToCoordinates(), addImages(), applyPropertyUpdates(), applySourceDiff(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey() (+55 more)

### Community 58 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.08
Nodes (39): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+31 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "parse"
Cohesion: 0.06
Nodes (37): _addEventListener(), array(), checkSubtype(), clamp$1(), constrainAngle(), emitValidationErrors(), error(), fire() (+29 more)

### Community 63 - "coveringTiles"
Cohesion: 0.06
Nodes (40): allowVariableZoom(), allowWorldCopies(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), getCameraFrustum(), getCameraPoint() (+32 more)

### Community 64 - "placeLayerBucketPart"
Cohesion: 0.21
Nodes (13): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+5 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "updateVariableAnchorsForBucket"
Cohesion: 0.07
Nodes (45): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getPerspectiveRatio(), getPitchedTextCorrection(), getShiftedAnchor(), getTileSkewVectors(), hideGlyphs(), isInsideGrid() (+37 more)

### Community 67 - "query"
Cohesion: 0.06
Nodes (41): _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), emplace(), expandBy(), feature(), finish() (+33 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.11
Nodes (42): NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage() (+34 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "extend"
Cohesion: 0.03
Nodes (86): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), demoteFeatureIds() (+78 more)

### Community 72 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 73 - "App.jsx"
Cohesion: 0.10
Nodes (24): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+16 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.15
Nodes (27): useAuthModalLogic(), MOROCCAN_CITIES, AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider (+19 more)

### Community 76 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+6 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+8 more)

### Community 78 - "serialize"
Cohesion: 0.07
Nodes (38): breakLines(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), freeBufferAfterUpload() (+30 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.33
Nodes (4): __dirname, envPath, envVars, __filename

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): _getDEMTileMatrix(), getViewportMatrix(), checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+28 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.06
Nodes (57): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+49 more)

### Community 89 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 90 - "serialize"
Cohesion: 0.10
Nodes (28): breakLines(), completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), isArrayBuffer() (+20 more)

### Community 91 - "extend"
Cohesion: 0.03
Nodes (90): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures() (+82 more)

### Community 93 - "useClientViewState.js"
Cohesion: 0.12
Nodes (22): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientHistoryList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity() (+14 more)

### Community 94 - "LandingPage.jsx"
Cohesion: 0.10
Nodes (23): CATEGORIES_TAXONOMY, CategorySelector(), ClientSosForm(), LandingPage(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES (+15 more)

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

### Community 99 - "readVarint"
Cohesion: 0.11
Nodes (26): bbox(), cm(), decode(), nextField(), readBoolean(), readBytes(), readDouble(), readFixed32() (+18 more)

### Community 100 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 101 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 106 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 111 - "maalem/MaalemView.jsx"
Cohesion: 0.20
Nodes (7): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), MaalemView()

### Community 112 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 118 - "clean_test_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 119 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 121 - "simulate.js"
Cohesion: 0.29
Nodes (7): __dirname, envPath, envVars, __filename, runSimulation(), sleep(), supabase

### Community 122 - "logs.js"
Cohesion: 0.15
Nodes (9): ably, adminChannel, C, __dirname, envPath, envVars, __filename, jobsChannel (+1 more)

### Community 126 - "inspect_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 128 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 174 - "decodeFloat64Values"
Cohesion: 0.36
Nodes (8): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedInt64AsFloat64Stream(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

## Knowledge Gaps
- **507 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+502 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `flyTo` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `get`, `readVarint`, `extend`, `constructor`, `get`, `constructor`, `push`, `update`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `flyTo` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `get`, `readVarint`, `extend`, `constructor`, `get`, `constructor`, `push`, `update`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `resize`, `public/maplibre-gl-shared.mjs`, `evaluate`, `constructor`, `get`, `add`, `constructor`, `get`, `push`, `public/maplibre-gl-worker.mjs`, `coveringTiles`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _507 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005108306415826462 - nodes in this community are weakly interconnected._
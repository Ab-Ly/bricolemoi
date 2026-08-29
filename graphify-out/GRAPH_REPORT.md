# Graph Report - bricolemoi  (2026-08-29)

## Corpus Check
- 197 files · ~838,034 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10481 nodes · 30283 edges · 142 communities (125 shown, 17 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8bb38bfa`
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
- _addDefaultHandlers
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
- get
- decodeGeometryColumn
- push
- ._update
- n
- push
- concat
- ._update
- update
- coveringTiles
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- push
- n
- public/maplibre-gl-worker.mjs
- warnOnce
- clone
- readVarint
- s
- .reset
- constructor
- public/maplibre-gl-worker-dev.mjs
- featureFilter
- evaluate
- constructor
- devDependencies
- addFeature
- queryIntersectsFeature
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- addFeature
- shapeLines
- shapeLines
- UserProfileModal.jsx
- parse
- featureFilter
- eliminateHoles
- getElevation
- eliminateHoles
- .handleEvent
- geometry
- Wu
- sub
- getElevation
- geometry
- useAblySupabaseSync.js
- readVarint
- deepEqual
- loadTile
- extend
- App.jsx
- queryRenderedFeatures
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- deepEqual
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- update
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- .handleEvent
- appendRoundCorner
- extend
- inspect_finances.js
- useClientViewState.js
- LandingPage.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- relaunch_centrifugo.js
- appendRoundCorner
- inspect_docker.js
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- decodeFloat64Values
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- convertGeometryVector
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
- placeLayerBucketPart
- get
- decodeFloat64Values
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

## Communities (142 total, 17 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (555): _a(), aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName() (+547 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (562): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+554 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (477): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+469 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (559): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+551 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (224): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+216 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (213): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+205 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (252): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+244 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (246): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+238 more)

### Community 8 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (33): _addDefaultHandlers(), assignEvents(), coordinatePoint(), depthAtPoint(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+25 more)

### Community 9 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (166): ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu(), _buildSkirts() (+158 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (166): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+158 more)

### Community 12 - "concat"
Cohesion: 0.05
Nodes (76): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+68 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (152): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindFramebuffer(), bindLayerOpacity(), _buildSkirts(), calculateFogBlendOpacity() (+144 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (153): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+145 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (139): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+131 more)

### Community 16 - "s"
Cohesion: 0.06
Nodes (129): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+121 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (149): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+141 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (100): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+92 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (124): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+116 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (147): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _calculateTransform() (+139 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (136): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName() (+128 more)

### Community 22 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (105): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+97 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (127): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+119 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (82): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+74 more)

### Community 25 - "n"
Cohesion: 0.03
Nodes (182): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), coalesceChanges() (+174 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (127): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+119 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (103): array(), assertRootKey(), bind(), checkSubtype(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+95 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (104): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+96 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (93): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+85 more)

### Community 30 - "coveringTiles"
Cohesion: 0.06
Nodes (42): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+34 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (61): _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers(), setState(), al (+53 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): loadGlyphRange(), readImageNow(), addProtocol(), br(), clipGeometry(), computeVideoFrameParameters(), createStyleLayer(), evaluateProperties() (+54 more)

### Community 33 - "push"
Cohesion: 0.03
Nodes (166): ac(), add(), addIndicesForPlacedSymbol(), addSymbols(), addTileFeatures(), addToLineVertexArray(), addToSortKeyRanges(), ah() (+158 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (188): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+180 more)

### Community 35 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (69): _computeClippingPlane(), _createStyleImage(), _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers() (+61 more)

### Community 36 - "warnOnce"
Cohesion: 0.04
Nodes (80): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), cameraBoundsWarning(), _charUsesLocalIdeographFontFamily(), _clearSource(), clearTextures() (+72 more)

### Community 37 - "clone"
Cohesion: 0.04
Nodes (55): breakLines(), clone(), completeTask(), containsMaxSafeIntegerValues(), copy(), copyImage(), createImage(), decodeFsst() (+47 more)

### Community 38 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (141): acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices(), calculateCameraOptionsFromTo() (+133 more)

### Community 40 - ".reset"
Cohesion: 0.04
Nodes (59): _calculateTransform(), cloneImages(), contextmenu(), dblclick(), _destroyUI(), disable(), dragEnd(), dragMove() (+51 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (73): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+65 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (55): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData(), groupByLayout() (+47 more)

### Community 43 - "featureFilter"
Cohesion: 0.05
Nodes (44): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), expandBy() (+36 more)

### Community 44 - "evaluate"
Cohesion: 0.04
Nodes (55): calculateVariableRenderShift(), addGlobalState(), addTextVertices(), allowsLetterSpacing(), _calculate(), calculateScaledKey(), calculateTileKey(), charAllowsLetterSpacing() (+47 more)

### Community 45 - "constructor"
Cohesion: 0.02
Nodes (124): add(), addImages(), array(), assertRootKey(), backfillBorder(), bucketIndex(), checkSubtype(), clone() (+116 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "addFeature"
Cohesion: 0.07
Nodes (50): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+42 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.13
Nodes (29): EmergencySOSModal(), MaalemRadarHeader(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+21 more)

### Community 50 - "dependencies"
Cohesion: 0.10
Nodes (21): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+13 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "addFeature"
Cohesion: 0.09
Nodes (42): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+34 more)

### Community 54 - "shapeLines"
Cohesion: 0.06
Nodes (45): addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+37 more)

### Community 55 - "shapeLines"
Cohesion: 0.07
Nodes (35): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+27 more)

### Community 56 - "UserProfileModal.jsx"
Cohesion: 0.10
Nodes (40): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY (+32 more)

### Community 57 - "parse"
Cohesion: 0.04
Nodes (61): bo(), co(), Do(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPerspectiveRatio(), gi() (+53 more)

### Community 58 - "featureFilter"
Cohesion: 0.06
Nodes (37): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), feature(), featureFilter() (+29 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 60 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+32 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - ".handleEvent"
Cohesion: 0.14
Nodes (16): _applyChanges(), _blockedByActive(), getCameraAltitude(), _getMapTouches(), hasChange(), isPointOnMapSurface(), mergeHandlerResult(), pointCoordinate() (+8 more)

### Community 63 - "geometry"
Cohesion: 0.07
Nodes (57): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry() (+49 more)

### Community 64 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (43): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+35 more)

### Community 67 - "geometry"
Cohesion: 0.08
Nodes (50): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+42 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.10
Nodes (42): AdminRealtimeConsole(), broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId() (+34 more)

### Community 69 - "readVarint"
Cohesion: 0.08
Nodes (39): bbox(), decode(), decodeString$2(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes() (+31 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "loadTile"
Cohesion: 0.07
Nodes (39): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), _diffStyle(), _downloadAndCacheRangePromise(), _drawGlyph() (+31 more)

### Community 72 - "extend"
Cohesion: 0.05
Nodes (60): _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), bindDasharrayTextures(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures(), calculateTileRatio() (+52 more)

### Community 73 - "App.jsx"
Cohesion: 0.10
Nodes (24): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+16 more)

### Community 74 - "queryRenderedFeatures"
Cohesion: 0.07
Nodes (39): calculatePosMatrix(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), _flattenAndSortRenderedFeatures(), getFastPathSimpleProjectionMatrix(), getFeatureState(), getGlCoordMatrix() (+31 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (29): ClientPhoneRequirementModal(), MaalemActiveMissionCard(), COUNTRY_DIAL_CODES, MOROCCAN_CITIES, AuthContext, AuthProvider(), app, auth (+21 more)

### Community 76 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+8 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.09
Nodes (19): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), useAuthModalLogic() (+11 more)

### Community 78 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "update"
Cohesion: 0.16
Nodes (15): compareMax(), findPoleOfInaccessibility(), getCentroidCell(), hasDataProperty(), height(), isStyleImageWebGLData(), patchUpdatedImage(), patchUpdatedImages() (+7 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 89 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 90 - "appendRoundCorner"
Cohesion: 0.11
Nodes (22): tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues() (+14 more)

### Community 91 - "extend"
Cohesion: 0.07
Nodes (42): backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), calculateTranslation(), _createDelegatedListener(), extend(), extractCoordinates(), fillExtrusionPatternUniformValues() (+34 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.08
Nodes (34): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientHistoryList(), ClientRadarSearchingCard(), ClientReviewCompletionModal() (+26 more)

### Community 94 - "LandingPage.jsx"
Cohesion: 0.14
Nodes (14): LandingPage(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS (+6 more)

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

### Community 100 - "appendRoundCorner"
Cohesion: 0.11
Nodes (22): tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues() (+14 more)

### Community 101 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 106 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 110 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

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

### Community 129 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 132 - "get"
Cohesion: 0.03
Nodes (87): addDebugCollisionBoxes(), addGlobalState(), addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), _calculate() (+79 more)

### Community 135 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

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

- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `readVarint`, `get`, `get`, `_calcMatrices`, `update`, `constructor`, `get`, `push`, `coveringTiles`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `readVarint`, `get`, `_calcMatrices`, `update`, `constructor`, `get`, `push`, `coveringTiles`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `public/maplibre-gl-shared.mjs`, `public/maplibre-gl-worker.mjs`, `get`, `readVarint`, `_addDefaultHandlers`, `constructor`, `get`, `_calcMatrices`, `constructor`, `update`, `push`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _539 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.00517267229746614 - nodes in this community are weakly interconnected._
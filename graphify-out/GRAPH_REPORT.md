# Graph Report - bricolemoi  (2026-09-02)

## Corpus Check
- 252 files · ~865,234 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10667 nodes · 30581 edges · 190 communities (139 shown, 51 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9a02b5f0`
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
- push
- sub
- get
- get
- get
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
- concat
- concat
- ._update
- update
- extend
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- push
- get
- _addDefaultHandlers
- clone
- I
- l
- serialize
- addFeature
- public/maplibre-gl-worker-dev.mjs
- featureFilter
- constructor
- .handleEvent
- devDependencies
- parse
- queryIntersectsFeature
- readVarint
- dependencies
- writeMessage
- loadGeometry
- sub
- shapeLines
- shapeLines
- evaluate
- parse
- push
- eliminateHoles
- getElevation
- eliminateHoles
- .handleEvent
- geometry
- constructor
- placeLayerBucketPart
- getElevation
- geometry
- usePlatformDataSync.js
- has
- extend
- decodeFloat64Values
- coveringTiles
- AuthContext.jsx
- telemetryDaemon.js
- infobipAuthService.js
- scripts
- auth/AuthModal.jsx
- deepEqual
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- warnOnce
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- useClientViewState.js
- workflows/graphify.md
- deepEqual
- appendRoundCorner
- placeLayerBucketPart
- inspect_finances.js
- InteractiveMap.jsx
- AdminDashboard.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- inspect-supabase-records.js
- purge_all_data.mjs
- supabase-status.js
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- relaunch_centrifugo.js
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- test-adapter.js
- inspect_docker.js
- render
- vercel.json
- sw.js
- clean_test_data.js
- update_centrifugo.js
- simulate.js
- logs.js
- telemetry.js
- test-15-char.js
- list_all_data.js
- test-id-format.js
- test-pb.js
- check-coolify-actions.js
- migrate-supabase-to-pocketbase.js
- clone
- parse
- check-coolify-artisan.js
- deep-audit.js
- public/maplibre-gl-worker.mjs
- check-coolify-code.js
- pocketbase-status.js
- check-coolify-livewire.js
- check-coolify-pat.js
- check-coolify-svc-app.js
- check_labels.js
- CentrifugoClient
- check-pb-cmd.js
- check-pb-entry.js
- check-pb-help.js
- check-pb-logs.js
- 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS
- deploy.sh
- check-pb-superuser.js
- check_proxy.js
- deploy-pocketbase.js
- find-coolify-pb.js
- handover-to-coolify.js
- inspect-coolify.js
- inspect-coolify-app.js
- inspect-coolify-detail.js
- inspect-coolify-services.js
- inspect-coolify-tables.js
- inspect-coolify-token.js
- inspect-labels.js
- inspect-meili.js
- read-coolify-create.js
- read-coolify-pb-yaml.js
- register-coolify-service.js
- relaunch-pocketbase.js
- audit.js
- reconcile.js
- package.json
- setup-pocketbase-admin.js
- start-coolify-service.js
- watch-deploy.js
- test_cycle.js
- update-coolify-pb.js
- vps-diag.js
- remoteLogger.js
- intersects
- convertGeometryVector
- maalem/MaalemView.jsx
- has
- appendRoundCorner
- convertGeometryVector
- update
- getSpecialtyMeta
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

## Communities (190 total, 51 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (569): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+561 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (521): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+513 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (470): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+462 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (487): Hi(), Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex() (+479 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (210): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+202 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (216): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+208 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (248): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+240 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (247): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+239 more)

### Community 8 - "push"
Cohesion: 0.03
Nodes (168): ac(), add(), addIndicesForPlacedSymbol(), addTileFeatures(), addToLineVertexArray(), addToSortKeyRanges(), ah(), angleTo() (+160 more)

### Community 9 - "sub"
Cohesion: 0.05
Nodes (59): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+51 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (164): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+156 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (182): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+174 more)

### Community 12 - "get"
Cohesion: 0.03
Nodes (95): addGlobalState(), addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), allowsVerticalWritingMode(), _calculate() (+87 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (150): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+142 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (155): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+147 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (119): angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing() (+111 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (136): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+128 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (154): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+146 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (141): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), checkGeolocationSupport() (+133 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (102): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+94 more)

### Community 20 - "constructor"
Cohesion: 0.03
Nodes (93): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), center() (+85 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (126): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), constantOr(), createConstGeometryVector() (+118 more)

### Community 22 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (108): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+100 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (133): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+125 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (99): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures(), coalesceChanges(), coerceSpriteToArray() (+91 more)

### Community 25 - "n"
Cohesion: 0.04
Nodes (167): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+159 more)

### Community 26 - "concat"
Cohesion: 0.05
Nodes (81): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertInOp$1() (+73 more)

### Community 27 - "concat"
Cohesion: 0.03
Nodes (112): array(), assertRootKey(), bind(), checkChild(), checkSubtype(), classifyChildren(), classifyFilter(), coalesce$1() (+104 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (93): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures(), coalesceChanges(), coerceSpriteToArray() (+85 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (98): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+90 more)

### Community 30 - "extend"
Cohesion: 0.06
Nodes (56): _afterEase(), backgroundPatternUniformValues(), bearing(), bgPatternUniformValues(), dblclick(), _ease(), easeOut(), easeTo() (+48 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (83): fromCenterSizeAngles(), Fs(), _getOperationsToPerform(), loadURL(), mf(), mo(), serialize(), _serializeByIds() (+75 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (61): loadGlyphRange(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), createTree() (+53 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.09
Nodes (35): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+27 more)

### Community 34 - "push"
Cohesion: 0.03
Nodes (222): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _createLayers() (+214 more)

### Community 35 - "get"
Cohesion: 0.05
Nodes (89): ac(), add(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc(), bs() (+81 more)

### Community 36 - "_addDefaultHandlers"
Cohesion: 0.20
Nodes (15): _addDefaultHandlers(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+7 more)

### Community 37 - "clone"
Cohesion: 0.05
Nodes (50): breakLines(), clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize() (+42 more)

### Community 38 - "I"
Cohesion: 0.14
Nodes (21): cameraPosition(), _computePreZoomAroundLoc(), getRayDirectionFromPixel(), getVisibleUnwrappedCoordinates(), ic(), isPointOnMapSurface(), maxPitchScaleFactor(), op() (+13 more)

### Community 39 - "l"
Cohesion: 0.04
Nodes (160): ac(), _afterEase(), apply(), applyUpdatedTransform(), Ar(), ca(), _calcMatrices(), calculateCameraOptionsFromTo() (+152 more)

### Community 40 - "serialize"
Cohesion: 0.07
Nodes (37): breakLines(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), freeBufferAfterUpload() (+29 more)

### Community 41 - "addFeature"
Cohesion: 0.09
Nodes (42): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addSymbol() (+34 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (50): addProtocol(), br(), createStyleLayer(), fromVectorTileJs(), getImageData(), Point(), readImageDataUsingOffscreenCanvas(), register() (+42 more)

### Community 43 - "featureFilter"
Cohesion: 0.06
Nodes (37): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), feature(), featureFilter() (+29 more)

### Community 44 - "constructor"
Cohesion: 0.03
Nodes (70): addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor(), copy() (+62 more)

### Community 45 - ".handleEvent"
Cohesion: 0.09
Nodes (31): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _fireEvents(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+23 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "parse"
Cohesion: 0.08
Nodes (39): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+31 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 49 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 50 - "dependencies"
Cohesion: 0.09
Nodes (23): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+15 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "loadGeometry"
Cohesion: 0.07
Nodes (49): command(), loadGeometry(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean() (+41 more)

### Community 53 - "sub"
Cohesion: 0.08
Nodes (44): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), fillExtrusionUniformValues(), findAxisMinMax(), fromCenterSizeAngles() (+36 more)

### Community 54 - "shapeLines"
Cohesion: 0.08
Nodes (33): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+25 more)

### Community 55 - "shapeLines"
Cohesion: 0.09
Nodes (28): calculateVariableRenderShift(), align(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charInComplexShapingScript(), charIsWhitespace(), codePointAllowsIdeographicBreaking() (+20 more)

### Community 56 - "evaluate"
Cohesion: 0.03
Nodes (96): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+88 more)

### Community 57 - "parse"
Cohesion: 0.06
Nodes (41): _computeTileBoundingVolume(), fromAabb(), getElevationForLngLatZoom(), getMinMaxElevation(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), $s(), as() (+33 more)

### Community 58 - "push"
Cohesion: 0.04
Nodes (103): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+95 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.10
Nodes (32): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+24 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (39): area(), buildBlockIndex(), clear(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+31 more)

### Community 62 - ".handleEvent"
Cohesion: 0.04
Nodes (69): _applyChanges(), _blockedByActive(), _calculateTransform(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove() (+61 more)

### Community 63 - "geometry"
Cohesion: 0.08
Nodes (50): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+42 more)

### Community 64 - "constructor"
Cohesion: 0.04
Nodes (73): addImages(), backfillBorder(), bbox(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), copy() (+65 more)

### Community 65 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 66 - "getElevation"
Cohesion: 0.05
Nodes (52): calculatePosMatrix(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getFastPathSimpleProjectionMatrix() (+44 more)

### Community 67 - "geometry"
Cohesion: 0.07
Nodes (57): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry() (+49 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.10
Nodes (45): broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId(), isCurrentUserAdmin() (+37 more)

### Community 69 - "has"
Cohesion: 0.11
Nodes (23): add(), emplace(), filter(), getAndRemove(), _getAndRemoveByKey(), getNumericId(), getPositionIds(), getPositions() (+15 more)

### Community 70 - "extend"
Cohesion: 0.03
Nodes (89): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily() (+81 more)

### Community 71 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 72 - "coveringTiles"
Cohesion: 0.05
Nodes (54): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+46 more)

### Community 73 - "AuthContext.jsx"
Cohesion: 0.09
Nodes (36): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminSecurityModal(), AdminSystemHealthMatrix() (+28 more)

### Community 74 - "telemetryDaemon.js"
Cohesion: 0.31
Nodes (13): collectSystemTelemetry(), __dirname, envPath, envVars, fetchWithTimeout(), __filename, pb, probeCentrifugo() (+5 more)

### Community 75 - "infobipAuthService.js"
Cohesion: 0.29
Nodes (17): AuthProvider(), checkAndRecordOtpRateLimit(), checkPhoneProfile(), formatInternationalPhone(), formatMoroccanPhone(), getLocalPin(), getPhoneCandidateVariants(), hashPin() (+9 more)

### Community 76 - "scripts"
Cohesion: 0.08
Nodes (24): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+16 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (18): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), useAuthModalLogic() (+10 more)

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

### Community 82 - "warnOnce"
Cohesion: 0.05
Nodes (65): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), cameraBoundsWarning(), _charUsesLocalIdeographFontFamily(), _createStyleImage(), _createTinySDF() (+57 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.05
Nodes (57): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), distSqr(), distToSegmentSquared() (+49 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "useClientViewState.js"
Cohesion: 0.10
Nodes (33): ClientReviewCompletionModal(), findNearestCatalogCity(), mapCategoryToSlug(), NEGATIVE_BADGES, POSITIVE_BADGES, SENTIMENT_FEEDBACK, useClientViewState(), getSupportedMimeType() (+25 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "appendRoundCorner"
Cohesion: 0.11
Nodes (22): tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues() (+14 more)

### Community 91 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "InteractiveMap.jsx"
Cohesion: 0.10
Nodes (24): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientHistoryList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard() (+16 more)

### Community 94 - "AdminDashboard.jsx"
Cohesion: 0.15
Nodes (24): AdminClientsView(), AdminDashboard(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), PaginationControls(), MaalemTransactionsModal() (+16 more)

### Community 95 - "send-otp.js"
Cohesion: 0.60
Nodes (4): cleanPhoneNumber(), generateOtpSignature(), handler(), recentRequests

### Community 96 - "upload-media.js"
Cohesion: 0.40
Nodes (3): config, R2_PUBLIC_DOMAIN, s3Client

### Community 97 - "dispatch-sos.js"
Cohesion: 0.60
Nodes (4): formatEvolutionNumber(), getDistanceKm(), handler(), recentDispatches

### Community 98 - "verify-otp.js"
Cohesion: 0.83
Nodes (3): cleanPhoneNumber(), handler(), verifyOtpSignature()

### Community 99 - "inspect-supabase-records.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 101 - "supabase-status.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 106 - "relaunch_centrifugo.js"
Cohesion: 0.40
Nodes (4): configB64, configContent, conn, __dirname

### Community 110 - "test-adapter.js"
Cohesion: 0.50
Nodes (3): createPocketBaseSupabaseAdapter(), pb, testAdapter()

### Community 111 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 112 - "render"
Cohesion: 0.11
Nodes (25): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), _handleTerrainDataEvent(), isHidden() (+17 more)

### Community 113 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, framework, headers, outputDirectory, rewrites

### Community 118 - "clean_test_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 119 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 121 - "simulate.js"
Cohesion: 0.33
Nodes (6): __dirname, envPath, envVars, __filename, runSimulation(), sleep()

### Community 122 - "logs.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 131 - "migrate-supabase-to-pocketbase.js"
Cohesion: 0.22
Nodes (9): COLLECTIONS_SCHEMA, __dirname, envPath, envVars, __filename, pb, runMigration(), supabase (+1 more)

### Community 132 - "clone"
Cohesion: 0.08
Nodes (24): clone(), cloneImages(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getGlyphs(), getImages(), _getImagesForIds() (+16 more)

### Community 133 - "parse"
Cohesion: 0.05
Nodes (59): bo(), co(), Do(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPerspectiveRatio(), getPitchedTextCorrection() (+51 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (72): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), determineAverageLineWidth() (+64 more)

### Community 138 - "pocketbase-status.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, pb

### Community 148 - "🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS"
Cohesion: 0.29
Nodes (6): 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS, 📋 Prérequis sur votre VPS, ⚡ Étape 1 : Copier les fichiers et Démarrer Centrifugo, 🔒 Étape 2 : Configurer Nginx & Certificat SSL (HTTPS / WSS), 🖥️ Étape 3 : Accéder au Dashboard Admin Centrifugo, 📱 Étape 4 : Activer Centrifugo dans le projet Frontend (Vite)

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, pb

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

### Community 180 - "remoteLogger.js"
Cohesion: 0.13
Nodes (12): ErrorBoundary, useAblyPresence, useCentrifugoPresence, centrifugo, isCentrifugoConfigured, flushOfflineLogs(), getDeviceInfo(), initRemoteTelemetry() (+4 more)

### Community 181 - "intersects"
Cohesion: 0.27
Nodes (13): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+5 more)

### Community 182 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 183 - "maalem/MaalemView.jsx"
Cohesion: 0.27
Nodes (5): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemUnfeasibleModal(), MaalemView()

### Community 184 - "has"
Cohesion: 0.06
Nodes (38): add(), addIndicesForPlacedSymbol(), convertToGeoJSON(), emplace(), featureToGeoJSON(), filter(), filterUpdate(), geometryToGeoJSON() (+30 more)

### Community 185 - "appendRoundCorner"
Cohesion: 0.11
Nodes (21): altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues(), getAngleDelta() (+13 more)

### Community 186 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 190 - "update"
Cohesion: 0.16
Nodes (15): compareMax(), findPoleOfInaccessibility(), getCentroidCell(), hasDataProperty(), height(), isStyleImageWebGLData(), patchUpdatedImage(), patchUpdatedImages() (+7 more)

### Community 191 - "getSpecialtyMeta"
Cohesion: 0.12
Nodes (20): AdminDisputesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon(), getSpecialtyMeta(), SPECIALTY_CONFIG, SpecialtyBadge(), LandingPage() (+12 more)

### Community 202 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

## Knowledge Gaps
- **624 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+619 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **51 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `l` to `assets/maplibre-gl.mjs`, `push`, `assets/maplibre-gl-shared.mjs`, `_addDefaultHandlers`, `get`, `constructor`, `_calcMatrices`, `readVarint`, `constructor`, `get`, `update`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `l` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `_addDefaultHandlers`, `get`, `get`, `constructor`, `_calcMatrices`, `readVarint`, `constructor`, `get`, `update`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `push`, `_addDefaultHandlers`, `assets/maplibre-gl-dev.mjs`, `clone`, `extend`, `serialize`, `sub`, `l`, `get`, `parse`, `render`, `_calcMatrices`, `get`, `._update`, `appendRoundCorner`, `update`, `.handleEvent`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _624 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005101426541865753 - nodes in this community are weakly interconnected._
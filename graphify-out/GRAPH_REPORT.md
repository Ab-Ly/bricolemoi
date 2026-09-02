# Graph Report - bricolemoi  (2026-09-02)

## Corpus Check
- 250 files · ~864,121 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10661 nodes · 30561 edges · 204 communities (154 shown, 50 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a292a8a0`
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
- get
- sub
- get
- get
- constructor
- get
- get
- _calcMatrices
- s
- _calcMatrices
- constructor
- update
- constructor
- decodeGeometryColumn
- get
- push
- ._update
- n
- push
- concat
- ._update
- update
- get
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- get
- coveringTiles
- clone
- readVarint
- flyTo
- coveringTiles
- constructor
- public/maplibre-gl-worker-dev.mjs
- y
- constructor
- push
- devDependencies
- clone
- queryIntersectsFeature
- _checkLoaded
- dependencies
- writeMessage
- writeMessage
- sub
- shapeLines
- shapeLines
- maalem/MaalemView.jsx
- handleMapControlsRollPitchBearingZoom
- has
- eliminateHoles
- getElevation
- eliminateHoles
- .handleEvent
- geometry
- xr
- ga
- updateVariableAnchorsForBucket
- geometry
- usePlatformDataSync.js
- readVarint
- extend
- .handleEvent
- serialize
- App.jsx
- telemetryDaemon.js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- deepEqual
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- extend
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- update
- workflows/graphify.md
- deepEqual
- appendRoundCorner
- evaluate
- inspect_finances.js
- useClientViewState.js
- AdminDashboard.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- inspect-supabase-records.js
- addFeature
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
- loadTile
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
- populate
- update
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
- loadMatchingFeature
- resize
- constructor
- queryRenderedFeatures
- placeLayerBucketPart
- writeTag
- readVarint
- Wu
- loadTile
- parse
- update
- LandingPage.jsx
- getPitchedLabelPlaneMatrix
- addLine
- cameraForBoxAndBearing
- Od
- parseCssColor
- convertGeometryVector
- _onMoveEnd
- _executeRelevantHandler
- mergeSourceDiffs
- _executeRelevantHandler
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

## Communities (204 total, 50 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (549): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+541 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (136): aa(), acquire(), addBucket(), addDash(), addRegularDash(), addRoundDash(), Ai(), ao() (+128 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (558): Ms(), quadrant(), Ru(), Aa(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+550 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (222): Ru(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), ae(), Ai(), angleWith(), angleWithSep() (+214 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (218): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+210 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (225): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+217 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (276): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+268 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (248): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+240 more)

### Community 8 - "get"
Cohesion: 0.05
Nodes (99): ac(), add(), addLineDashDependencies(), addToSortKeyRanges(), angleTo(), ax, bs(), bx() (+91 more)

### Community 9 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (186): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+178 more)

### Community 11 - "get"
Cohesion: 0.04
Nodes (133): _a(), ad(), al(), bd(), bind(), bl(), Bu(), _buildSkirts() (+125 more)

### Community 12 - "constructor"
Cohesion: 0.03
Nodes (131): add(), addClassName(), _addDefaultHandlers(), addTo(), af(), _applyChanges(), bf(), _blockedByActive() (+123 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (138): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+130 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (173): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+165 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+135 more)

### Community 16 - "s"
Cohesion: 0.06
Nodes (132): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+124 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (159): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+151 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (123): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+115 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (93): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+85 more)

### Community 20 - "constructor"
Cohesion: 0.03
Nodes (92): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), center() (+84 more)

### Community 21 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (103): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+95 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (122): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+114 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (95): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+87 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (116): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _applyResourceTiming(), _checkLoaded() (+108 more)

### Community 25 - "n"
Cohesion: 0.04
Nodes (168): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+160 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (143): sphereSurfacePointToCoordinates(), addPoint(), applyPropertyUpdates(), applySourceDiff(), bind(), calcLineBBox(), clip(), clipLine$1() (+135 more)

### Community 27 - "concat"
Cohesion: 0.05
Nodes (80): checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1() (+72 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (86): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+78 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (109): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+101 more)

### Community 30 - "get"
Cohesion: 0.04
Nodes (80): addDebugCollisionBoxes(), addGlobalState(), addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), array() (+72 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.07
Nodes (48): $s(), al, bt(), f(), re(), Ri(), vn(), vr (+40 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (80): readImageNow(), addProtocol(), assertRootKey(), br(), checkChild(), classifyChildren(), classifyFilter(), clipGeometry() (+72 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.12
Nodes (30): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+22 more)

### Community 34 - "n"
Cohesion: 0.05
Nodes (159): calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix(), ci(), commit(), _d(), ef(), es() (+151 more)

### Community 35 - "get"
Cohesion: 0.05
Nodes (87): ac(), add(), addIndicesForPlacedSymbol(), ax, bb(), bs(), bx(), clear() (+79 more)

### Community 36 - "coveringTiles"
Cohesion: 0.05
Nodes (57): _addDefaultHandlers(), allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), assignEvents(), coordinatePoint(), coveringTiles() (+49 more)

### Community 37 - "clone"
Cohesion: 0.05
Nodes (51): breakLines(), clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize() (+43 more)

### Community 38 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 39 - "flyTo"
Cohesion: 0.05
Nodes (66): _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), _calculateNearFarZIfNeeded(), _cancelRenderFrame(), _clearMatrixCaches(), clearNearFarZOverride() (+58 more)

### Community 40 - "coveringTiles"
Cohesion: 0.07
Nodes (42): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), finish() (+34 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (92): add(), addImages(), array(), assertRootKey(), backfillBorder(), bind(), bucketIndex(), checkSubtype() (+84 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (60): readImageNow(), addProtocol(), br(), clipGeometry(), computeVideoFrameParameters(), createStyleLayer(), evaluateProperties(), fromVectorTileJs() (+52 more)

### Community 43 - "y"
Cohesion: 0.08
Nodes (30): querySourceFeatures(), addImageSection(), addTextSection(), determineAverageLineWidth(), determineLineBreaks(), getChildren(), loadGeometry(), toEvaluationFeature() (+22 more)

### Community 44 - "constructor"
Cohesion: 0.03
Nodes (70): addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compare(), compareMax(), constructor() (+62 more)

### Community 45 - "push"
Cohesion: 0.04
Nodes (100): Aa(), addIndicesForPlacedSymbol(), addTileFeatures(), ah(), appendLeaves(), Bf(), bh(), cg() (+92 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "clone"
Cohesion: 0.07
Nodes (32): angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+24 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.05
Nodes (57): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+49 more)

### Community 49 - "_checkLoaded"
Cohesion: 0.03
Nodes (97): addControl(), addImage(), addLayer(), addSource(), addSprite(), _applyDiffToSource(), _applyGlobalStateChanges(), _applyResourceTiming() (+89 more)

### Community 50 - "dependencies"
Cohesion: 0.09
Nodes (23): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+15 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "sub"
Cohesion: 0.06
Nodes (57): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+49 more)

### Community 54 - "shapeLines"
Cohesion: 0.07
Nodes (35): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+27 more)

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 56 - "maalem/MaalemView.jsx"
Cohesion: 0.15
Nodes (12): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemUnfeasibleModal(), MaalemWalletModal(), MaalemView(), NEGATIVE_BADGES, POSITIVE_BADGES (+4 more)

### Community 57 - "handleMapControlsRollPitchBearingZoom"
Cohesion: 0.04
Nodes (78): ac(), Ar(), ca(), calculateFogBlendOpacity(), cameraPosition(), cc(), _computeClippingPlane(), _computePreZoomAroundLoc() (+70 more)

### Community 58 - "has"
Cohesion: 0.04
Nodes (58): add(), addTileFeatures(), cluster(), convertToGeoJSON(), createIndex(), createTile(), createTree(), emplace() (+50 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.08
Nodes (38): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+30 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - ".handleEvent"
Cohesion: 0.04
Nodes (71): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+63 more)

### Community 63 - "geometry"
Cohesion: 0.06
Nodes (58): bboxToBBoxDistance(), boxWithinBox(), calculateSignedArea(), canonicalID(), classifyRings$1(), compareAreas(), compareDistPair(), distance() (+50 more)

### Community 64 - "xr"
Cohesion: 0.15
Nodes (19): calculatePosMatrix(), Fi(), fo(), getFastPathSimpleProjectionMatrix(), kr(), mo(), Or(), pl() (+11 more)

### Community 65 - "ga"
Cohesion: 0.05
Nodes (59): _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold(), _clearTileReloadTimer() (+51 more)

### Community 66 - "updateVariableAnchorsForBucket"
Cohesion: 0.05
Nodes (62): attemptAnchorPlacement(), calculateVariableLayoutShift(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler() (+54 more)

### Community 67 - "geometry"
Cohesion: 0.06
Nodes (62): _normalizeBearing(), sphereSurfacePointToCoordinates(), applyPropertyUpdates(), applySourceDiff(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair() (+54 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.07
Nodes (63): AdminSystemHealthMatrix(), broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId() (+55 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 70 - "extend"
Cohesion: 0.05
Nodes (65): _afterTileLoadWorkerResponse(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle(), doOnceCompleted() (+57 more)

### Community 71 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 72 - "serialize"
Cohesion: 0.10
Nodes (28): breakLines(), completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), getTransition() (+20 more)

### Community 73 - "App.jsx"
Cohesion: 0.07
Nodes (36): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminRealtimeConsole(), AdminSecurityModal() (+28 more)

### Community 74 - "telemetryDaemon.js"
Cohesion: 0.31
Nodes (13): collectSystemTelemetry(), __dirname, envPath, envVars, fetchWithTimeout(), __filename, pb, probeCentrifugo() (+5 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.18
Nodes (23): useAuthModalLogic(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, checkAndRecordOtpRateLimit() (+15 more)

### Community 76 - "scripts"
Cohesion: 0.08
Nodes (24): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+16 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+8 more)

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

### Community 82 - "extend"
Cohesion: 0.05
Nodes (59): _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle(), _dispatchWorkerUpdate(), doOnceCompleted() (+51 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "update"
Cohesion: 0.05
Nodes (55): acquireRTT(), _addTerrainIdealTiles(), anyTilesAfterTime(), bindRTT(), clone(), cloneImages(), _dataHandler(), destruct() (+47 more)

### Community 89 - "deepEqual"
Cohesion: 0.31
Nodes (11): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById() (+3 more)

### Community 90 - "appendRoundCorner"
Cohesion: 0.09
Nodes (26): fov(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1() (+18 more)

### Community 91 - "evaluate"
Cohesion: 0.04
Nodes (78): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addFeature(), addFeatures(), addGlobalState(), addSymbol() (+70 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.07
Nodes (39): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal() (+31 more)

### Community 94 - "AdminDashboard.jsx"
Cohesion: 0.14
Nodes (31): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), ClientHistoryList() (+23 more)

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

### Community 100 - "addFeature"
Cohesion: 0.07
Nodes (56): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addFeature$1() (+48 more)

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

### Community 112 - "loadTile"
Cohesion: 0.08
Nodes (37): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _clearSource(), clearTextures(), clearTiles(), _createStyleImage(), destroy() (+29 more)

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

### Community 132 - "populate"
Cohesion: 0.05
Nodes (53): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), charInRTLScript(), charInSupportedScript(), codePointRequiresComplexTextShaping(), constantOr(), containsRTLText() (+45 more)

### Community 133 - "update"
Cohesion: 0.06
Nodes (44): addSymbols(), av(), bp(), cp(), createNewSegment(), dp, emplace(), ep (+36 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (63): _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers(), setState(), al (+55 more)

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

### Community 180 - "loadMatchingFeature"
Cohesion: 0.09
Nodes (29): ad, Cd(), _convertFromCellCoord(), _convertToCellCoord(), Dd(), distSqr(), expandBy(), Fd() (+21 more)

### Community 181 - "resize"
Cohesion: 0.11
Nodes (27): _addDefaultHandlers(), assignEvents(), _containerDimensions(), createQuadTriangles(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+19 more)

### Community 182 - "constructor"
Cohesion: 0.06
Nodes (41): _createLayers(), addImages(), backfillBorder(), calculateScaledKey(), completeTask(), constructor(), _down(), fire() (+33 more)

### Community 183 - "queryRenderedFeatures"
Cohesion: 0.07
Nodes (32): _createDelegatedListener(), _flattenAndSortRenderedFeatures(), getData(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), getElevationForLngLatZoom(), _getElevationSampler() (+24 more)

### Community 184 - "placeLayerBucketPart"
Cohesion: 0.07
Nodes (38): attemptAnchorPlacement(), bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), _getTerrainElevationFunc(), go() (+30 more)

### Community 185 - "writeTag"
Cohesion: 0.08
Nodes (36): quadrant(), Bv(), getValueAndResolveTokens(), j_(), Kt(), realloc(), replace(), ty() (+28 more)

### Community 186 - "readVarint"
Cohesion: 0.07
Nodes (35): am(), at(), bbox(), cm(), decode(), Dm(), getIlluminationProperties(), loadGeometry() (+27 more)

### Community 187 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 188 - "loadTile"
Cohesion: 0.08
Nodes (34): _afterImageUpdated(), _afterTileLoadWorkerResponse(), _clearSource(), clearTextures(), clearTiles(), destroy(), _diffStyle(), _disposeTexture() (+26 more)

### Community 189 - "parse"
Cohesion: 0.09
Nodes (33): as(), checkSubtype(), crossFadingFactor(), distance(), Do(), eachChild(), eo(), error() (+25 more)

### Community 190 - "update"
Cohesion: 0.09
Nodes (27): compareMax(), emplace(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions(), hasDataProperty() (+19 more)

### Community 191 - "LandingPage.jsx"
Cohesion: 0.13
Nodes (16): CATEGORIES_TAXONOMY, CategorySelector(), LandingPage(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer() (+8 more)

### Community 192 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.12
Nodes (23): getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix(), getTerrainCoords(), _getTerrainCoordsForRegularTile(), _getTerrainCoordsForTileRanges(), getTileSkewVectors(), getViewportMatrix() (+15 more)

### Community 193 - "addLine"
Cohesion: 0.14
Nodes (21): addCurrentVertex(), addFeature(), addFeatures(), addHalfVertex(), addLine(), addToLineVertexArray(), bc(), dist() (+13 more)

### Community 194 - "cameraForBoxAndBearing"
Cohesion: 0.22
Nodes (17): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), getEast(), getLesserNonNegativeNonNull(), getNorth(), getNorthEast(), getNorthWest() (+9 more)

### Community 195 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 196 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 197 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 198 - "_onMoveEnd"
Cohesion: 0.20
Nodes (10): _drainInertiaBuffer(), hf(), lf, mf(), _onMoveEnd(), record(), cn(), dn() (+2 more)

### Community 199 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 200 - "mergeSourceDiffs"
Cohesion: 0.28
Nodes (9): _applyDiffToSource(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds() (+1 more)

### Community 201 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 202 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 203 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

## Knowledge Gaps
- **623 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+618 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `y` to `assets/maplibre-gl.mjs`, `cameraForBoxAndBearing`, `n`, `coveringTiles`, `ga`, `assets/maplibre-gl-shared.mjs`, `flyTo`, `_onMoveEnd`, `writeTag`, `get`, `constructor`, `_calcMatrices`, `constructor`, `handleMapControlsRollPitchBearingZoom`, `get`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `assets/maplibre-gl.mjs`, `cameraForBoxAndBearing`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `writeTag`, `get`, `y`, `constructor`, `constructor`, `get`, `_calcMatrices`, `constructor`, `handleMapControlsRollPitchBearingZoom`, `get`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `n`, `coveringTiles`, `assets/maplibre-gl-dev.mjs`, `extend`, `serialize`, `sub`, `y`, `get`, `clone`, `_calcMatrices`, `get`, `._update`, `update`, `.handleEvent`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _623 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005162287368539431 - nodes in this community are weakly interconnected._
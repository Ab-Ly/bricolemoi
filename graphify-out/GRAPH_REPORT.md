# Graph Report - bricolemoi  (2026-09-03)

## Corpus Check
- 289 files · ~868,556 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10776 nodes · 30785 edges · 191 communities (138 shown, 53 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b5811d53`
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
- sub
- get
- get
- geometry
- get
- get
- _calcMatrices
- push
- _calcMatrices
- constructor
- update
- constructor
- get
- get
- push
- ._update
- coveringTiles
- concat
- concat
- ._update
- update
- addFeature
- push
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- constructor
- .handleEvent
- constructor
- Wu
- l
- _addDefaultHandlers
- geometry
- public/maplibre-gl-worker-dev.mjs
- .handleEvent
- clone
- I
- devDependencies
- query
- queryIntersectsFeature
- getPitchedLabelPlaneMatrix
- dependencies
- writeMessage
- writeMessage
- sub
- shapeLines
- performSymbolLayout
- readVarint
- Wu
- push
- eliminateHoles
- getElevation
- eliminateHoles
- parse
- evaluate
- update
- appendRoundCorner
- getElevation
- appendRoundCorner
- usePlatformDataSync.js
- assets/maplibre-gl-worker.mjs
- LandingPage.jsx
- decodeFloat64Values
- populate
- useAuth
- telemetryDaemon.js
- InteractiveMap.jsx
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
- readVarint
- workflows/graphify.md
- deepEqual
- updateImage
- AuthContext.jsx
- inspect_finances.js
- useClientViewState.js
- featureToGeoJSON
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
- verify_centrifugo_rate.mjs
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
- decodeFloat64Values
- flyTo
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
- useMaalemViewState.js
- evaluate
- AdminDashboard.jsx
- pocketbase-schema.js
- pocketbase-types.ts
- extend
- generate-types.js
- convertGeometryVector
- check_admin_profile.mjs

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

## Communities (191 total, 53 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (548): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+540 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (507): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+499 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (512): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+504 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (484): Hi(), Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex() (+476 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (219): acquire(), acquireRTT(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+211 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (221): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+213 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (248): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep(), appendLeaves() (+240 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (250): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+242 more)

### Community 8 - "coveringTiles"
Cohesion: 0.07
Nodes (41): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), finish() (+33 more)

### Community 9 - "sub"
Cohesion: 0.06
Nodes (57): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+49 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (197): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+189 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (183): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+175 more)

### Community 12 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (163): addBucket(), applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+155 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (175): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+167 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (142): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+134 more)

### Community 16 - "push"
Cohesion: 0.02
Nodes (294): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), querySourceFeatures(), es(), gc(), getCameraQueryGeometry() (+286 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (161): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+153 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (141): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+133 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (102): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _applyGlobalStateChanges(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+94 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (135): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), center() (+127 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (124): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+116 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (124): addIndicesForPlacedSymbol(), addTextVertices(), backfillBorder(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector() (+116 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (125): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+117 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (79): addLayer(), addSource(), addSprite(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction(), _createLayers() (+71 more)

### Community 25 - "coveringTiles"
Cohesion: 0.05
Nodes (52): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint() (+44 more)

### Community 26 - "concat"
Cohesion: 0.04
Nodes (89): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), createPropertyExpression() (+81 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (95): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+87 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (95): addLayer(), addSource(), addSprite(), _checkLoaded(), clearTextures(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+87 more)

### Community 29 - "update"
Cohesion: 0.04
Nodes (88): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _applyGlobalStateChanges(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+80 more)

### Community 30 - "addFeature"
Cohesion: 0.09
Nodes (41): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+33 more)

### Community 31 - "push"
Cohesion: 0.03
Nodes (162): ac(), add(), addIndicesForPlacedSymbol(), addTileFeatures(), addToLineVertexArray(), addToSortKeyRanges(), ah(), angleTo() (+154 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (61): addProtocol(), assertRootKey(), br(), clipGeometry(), createExpression(), createStyleLayer(), evaluateProperties(), featureFilter() (+53 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.12
Nodes (30): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+22 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (189): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+181 more)

### Community 35 - "constructor"
Cohesion: 0.04
Nodes (63): add(), addImages(), backfillBorder(), bucketIndex(), constructor(), copy(), copyImage(), createImage() (+55 more)

### Community 36 - ".handleEvent"
Cohesion: 0.08
Nodes (31): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+23 more)

### Community 37 - "constructor"
Cohesion: 0.03
Nodes (95): add(), addImages(), breakLines(), bucketIndex(), calculateScaledKey(), calculateTileKey(), clone(), completeTask() (+87 more)

### Community 38 - "Wu"
Cohesion: 0.07
Nodes (35): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+27 more)

### Community 39 - "l"
Cohesion: 0.04
Nodes (158): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+150 more)

### Community 40 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (33): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading(), generateMousePanHandler() (+25 more)

### Community 41 - "geometry"
Cohesion: 0.07
Nodes (56): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry() (+48 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (64): _updatePatternAtlas(), addProtocol(), assertRootKey(), br(), clipGeometry(), createExpression(), createStyleLayer(), evaluateProperties() (+56 more)

### Community 43 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 44 - "clone"
Cohesion: 0.05
Nodes (52): breakLines(), clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize() (+44 more)

### Community 45 - "I"
Cohesion: 0.14
Nodes (21): cameraPosition(), _computePreZoomAroundLoc(), getRayDirectionFromPixel(), getVisibleUnwrappedCoordinates(), ic(), isPointOnMapSurface(), maxPitchScaleFactor(), op() (+13 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "query"
Cohesion: 0.08
Nodes (28): _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), expandBy(), _forEachCell(), getId(), getKey(), getState() (+20 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (45): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), findPoleOfInaccessibility() (+37 more)

### Community 49 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (31): calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix() (+23 more)

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
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 54 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 55 - "performSymbolLayout"
Cohesion: 0.05
Nodes (54): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+46 more)

### Community 56 - "readVarint"
Cohesion: 0.08
Nodes (36): loadGlyphRange(), bbox(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+28 more)

### Community 57 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 58 - "push"
Cohesion: 0.04
Nodes (104): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+96 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.06
Nodes (45): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+37 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - "parse"
Cohesion: 0.09
Nodes (28): _addEventListener(), array(), checkSubtype(), emitValidationErrors(), error(), fire(), getExpectedType(), hasPaintOverride() (+20 more)

### Community 63 - "evaluate"
Cohesion: 0.04
Nodes (89): isStyleLoaded(), accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures() (+81 more)

### Community 64 - "update"
Cohesion: 0.09
Nodes (28): compareMax(), emplace(), feature(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions() (+20 more)

### Community 65 - "appendRoundCorner"
Cohesion: 0.16
Nodes (15): angle(), appendRoundCorner(), clone$1(), dot$1(), fromValues(), getAngleDelta(), getTileUnitsForMeters(), mercatorScale() (+7 more)

### Community 66 - "getElevation"
Cohesion: 0.08
Nodes (36): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+28 more)

### Community 67 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.07
Nodes (69): AdminSystemHealthMatrix(), broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId() (+61 more)

### Community 69 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (66): fromCenterSizeAngles(), Fs(), mf(), al, bt(), C(), cn(), ct() (+58 more)

### Community 70 - "LandingPage.jsx"
Cohesion: 0.15
Nodes (13): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, translations (+5 more)

### Community 71 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 72 - "populate"
Cohesion: 0.05
Nodes (55): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), constantOr(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), emplace() (+47 more)

### Community 73 - "useAuth"
Cohesion: 0.07
Nodes (38): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminDashboard(), AdminRealtimeConsole() (+30 more)

### Community 74 - "telemetryDaemon.js"
Cohesion: 0.31
Nodes (13): collectSystemTelemetry(), __dirname, envPath, envVars, fetchWithTimeout(), __filename, pb, probeCentrifugo() (+5 more)

### Community 75 - "InteractiveMap.jsx"
Cohesion: 0.26
Nodes (12): InteractiveMap(), MapControlsOverlay(), calculateDistanceInKm(), computeBearing(), getMapIconSvg(), MAP_ICONS_SVG, renderMaalemPopupHtml(), renderTrackingPopupHtml() (+4 more)

### Community 76 - "scripts"
Cohesion: 0.07
Nodes (27): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+19 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.13
Nodes (12): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+4 more)

### Community 78 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.29
Nodes (6): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), 5. Règle Stricte Identifiants & Base de Données (PocketBase VPS), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.21
Nodes (12): C, checkPocketBaseHealth(), __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge() (+4 more)

### Community 82 - "extend"
Cohesion: 0.04
Nodes (70): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle(), _dispatchWorkerUpdate() (+62 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "readVarint"
Cohesion: 0.08
Nodes (39): bbox(), decode(), decodeString$2(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes() (+31 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "updateImage"
Cohesion: 0.14
Nodes (19): addImage(), _afterImageUpdated(), _createStyleImage(), dispatchRenderCallbacks(), getGlyphs(), getImage(), getImages(), _getImagesForIds() (+11 more)

### Community 91 - "AuthContext.jsx"
Cohesion: 0.10
Nodes (35): useAuthModalLogic(), LogoutWarningModal(), ProfileEditTab(), ProfileInfoTab(), ProfilePinTab(), ProfileReviewsTab(), extractPhoneAndCountry(), COUNTRY_DIAL_CODES (+27 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.09
Nodes (28): ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), ClientSosForm(), FunnelStepCategory() (+20 more)

### Community 94 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

### Community 95 - "send-otp.js"
Cohesion: 0.60
Nodes (4): cleanPhoneNumber(), generateOtpSignature(), handler(), recentRequests

### Community 96 - "upload-media.js"
Cohesion: 0.40
Nodes (3): config, R2_PUBLIC_DOMAIN, s3Client

### Community 97 - "dispatch-sos.js"
Cohesion: 0.47
Nodes (5): formatEvolutionNumber(), getDistanceKm(), handler(), POCKETBASE_URL, recentDispatches

### Community 98 - "verify-otp.js"
Cohesion: 0.70
Nodes (4): cleanPhoneNumber(), handler(), toPbId(), verifyOtpSignature()

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
Cohesion: 0.23
Nodes (12): C, __dirname, envPath, envVars, __filename, formatCentrifugoEvent(), formatTime(), getLevelBadge() (+4 more)

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 131 - "migrate-supabase-to-pocketbase.js"
Cohesion: 0.22
Nodes (9): COLLECTIONS_SCHEMA, __dirname, envPath, envVars, __filename, pb, runMigration(), supabase (+1 more)

### Community 132 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 133 - "flyTo"
Cohesion: 0.04
Nodes (130): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+122 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (92): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getElevationForLngLatZoom() (+84 more)

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

### Community 181 - "useMaalemViewState.js"
Cohesion: 0.08
Nodes (33): AdminRechargesView(), useAdminKpis(), RechargeMaalemModal(), RechargeRejectModal(), RechargeRowCard(), RechargeSlipModal(), RechargeStatsCards(), CustomDropdown() (+25 more)

### Community 182 - "evaluate"
Cohesion: 0.04
Nodes (65): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), array(), _calculate(), calculateGlyphDependencies(), checkSubtype(), clamp$1() (+57 more)

### Community 183 - "AdminDashboard.jsx"
Cohesion: 0.08
Nodes (33): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminSecurityModal(), AdminAuditModal(), AdminKpiBanners() (+25 more)

### Community 184 - "pocketbase-schema.js"
Cohesion: 0.24
Nodes (9): ALL_COLLECTIONS, __dirname, envPath, __filename, filterArg, formatType(), inspect(), pb (+1 more)

### Community 185 - "pocketbase-types.ts"
Cohesion: 0.39
Nodes (8): AdminNotificationsRecord, BaseRecord, Collections, InterventionsRecord, MaalemDetailsRecord, ProfilesRecord, ReviewsRecord, TransactionsRecord

### Community 186 - "extend"
Cohesion: 0.03
Nodes (94): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF() (+86 more)

### Community 187 - "generate-types.js"
Cohesion: 0.32
Nodes (7): __dirname, __filename, generate(), inferType(), KNOWN_COLLECTIONS, pb, toPascalCase()

### Community 190 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

## Knowledge Gaps
- **641 isolated node(s):** `POCKETBASE_URL`, `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` (+636 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `l` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `.handleEvent`, `coveringTiles`, `populate`, `get`, `queryIntersectsFeature`, `_calcMatrices`, `constructor`, `get`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `l` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `.handleEvent`, `assets/maplibre-gl-worker.mjs`, `coveringTiles`, `populate`, `get`, `queryIntersectsFeature`, `_calcMatrices`, `constructor`, `get`, `push`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `flyTo` to `public/maplibre-gl.mjs`, `update`, `public/maplibre-gl-shared.mjs`, `_addDefaultHandlers`, `public/maplibre-gl-worker.mjs`, `get`, `_calcMatrices`, `push`, `constructor`, `get`, `push`, `readVarint`, `coveringTiles`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `POCKETBASE_URL`, `recentDispatches`, `recentRequests` to the rest of the system?**
  _641 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0056054504912498955 - nodes in this community are weakly interconnected._
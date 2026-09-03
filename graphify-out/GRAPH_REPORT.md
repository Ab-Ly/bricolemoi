# Graph Report - bricolemoi  (2026-09-03)

## Corpus Check
- 289 files · ~865,459 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10769 nodes · 30764 edges · 192 communities (139 shown, 53 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `01901619`
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
- unprojectScreenPoint
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
- decodeGeometryColumn
- push
- ._update
- _checkLoaded
- concat
- concat
- ._update
- update
- get
- get
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- constructor
- .handleEvent
- parse
- extend
- s
- .reset
- geometry
- public/maplibre-gl-worker-dev.mjs
- .reset
- parse
- interpolate
- devDependencies
- extend
- queryIntersectsFeature
- writeMessage
- dependencies
- writeMessage
- writeMessage
- sub
- performSymbolLayout
- shapeLines
- readVarint
- Wu
- push
- eliminateHoles
- updateVariableAnchorsForBucket
- eliminateHoles
- coveringTiles
- warnOnce
- constructor
- appendRoundCorner
- getElevation
- appendRoundCorner
- usePlatformDataSync.js
- assets/maplibre-gl-worker.mjs
- Wu
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
- loadTile
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- readVarint
- workflows/graphify.md
- deepEqual
- ja
- AuthContext.jsx
- inspect_finances.js
- useClientViewState.js
- LandingPage.jsx
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
- parseCssColor
- cameraForBoxAndBearing
- check-coolify-artisan.js
- deep-audit.js
- jn
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
- placeLayerBucketPart
- platformAuditReferee.js
- parseCssColor
- AdminDashboard.jsx
- pocketbase-schema.js
- pocketbase-types.ts
- loadTile
- generate-types.js
- _executeRelevantHandler
- mergeSourceDiffs
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
- `interpolate()` --indirect_call--> `fy`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `constructor()` --indirect_call--> `increment()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `key()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs

## Import Cycles
- None detected.

## Communities (192 total, 53 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (572): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+564 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (552): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+544 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (592): Hs(), Ru(), ad, add(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+584 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (557): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+549 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (211): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+203 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (213): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+205 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (248): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep(), appendLeaves() (+240 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (244): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), anchors (+236 more)

### Community 8 - "coveringTiles"
Cohesion: 0.05
Nodes (49): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+41 more)

### Community 9 - "unprojectScreenPoint"
Cohesion: 0.10
Nodes (34): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+26 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (193): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+185 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (164): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+156 more)

### Community 12 - "evaluate"
Cohesion: 0.06
Nodes (65): addGlobalState(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), canonicalID(), compareDistPair(), distance(), _down() (+57 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (171): atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+163 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (148): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+140 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (105): apply(), _calcMatrices(), calculateCenterFromCameraLngLatAlt(), calculateEasing(), _calculateNearFarZIfNeeded(), cameraForBoxAndBearing(), _clearMatrixCaches(), clearNearFarZOverride() (+97 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (265): _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), clone() (+257 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.04
Nodes (114): angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing() (+106 more)

### Community 18 - "constructor"
Cohesion: 0.03
Nodes (104): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+96 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (104): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+96 more)

### Community 20 - "constructor"
Cohesion: 0.03
Nodes (90): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), checkGeolocationSupport(), _clearWatch(), constructor() (+82 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (126): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+118 more)

### Community 22 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (105): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+97 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (126): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+118 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (98): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+90 more)

### Community 25 - "_checkLoaded"
Cohesion: 0.06
Nodes (57): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), _createLayers(), ei() (+49 more)

### Community 26 - "concat"
Cohesion: 0.04
Nodes (89): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+81 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (88): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+80 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (108): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+100 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (100): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+92 more)

### Community 30 - "get"
Cohesion: 0.04
Nodes (100): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addIndicesForPlacedSymbol() (+92 more)

### Community 31 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (70): addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), evaluateProperties(), fromVectorTileJs() (+62 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.12
Nodes (30): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+22 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (177): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+169 more)

### Community 35 - "constructor"
Cohesion: 0.03
Nodes (72): add(), addImages(), backfillBorder(), bucketIndex(), compareMax(), constructor(), copy(), copyImage() (+64 more)

### Community 36 - ".handleEvent"
Cohesion: 0.09
Nodes (30): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _cancelRenderFrame(), _fireEvents(), generateMousePanHandler(), generateMousePitchHandler() (+22 more)

### Community 37 - "parse"
Cohesion: 0.04
Nodes (70): getTileBoundingVolume(), array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression() (+62 more)

### Community 38 - "extend"
Cohesion: 0.05
Nodes (64): adjustAntiMeridian(), _afterEase(), backgroundPatternUniformValues(), bearing(), bgPatternUniformValues(), calculateTileRatio(), cameraForBounds(), dblclick() (+56 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (138): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+130 more)

### Community 40 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 41 - "geometry"
Cohesion: 0.07
Nodes (56): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), calculateSignedArea(), canonicalID(), classifyRings$1(), compareAreas(), compareDistPair() (+48 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (60): addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), evaluateProperties(), featureFilter() (+52 more)

### Community 43 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 44 - "parse"
Cohesion: 0.04
Nodes (67): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+59 more)

### Community 45 - "interpolate"
Cohesion: 0.05
Nodes (46): _createStyleImage(), dispatchRenderCallbacks(), _addEventListener(), calculateScaledKey(), calculateTileKey(), emitValidationErrors(), fire(), from() (+38 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "extend"
Cohesion: 0.04
Nodes (88): adjustAntiMeridian(), _afterEase(), _applyChanges(), applyUpdatedTransform(), backgroundPatternUniformValues(), bearing(), bgPatternUniformValues(), _blockedByActive() (+80 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (32): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+24 more)

### Community 49 - "writeMessage"
Cohesion: 0.08
Nodes (39): ey(), realloc(), ty(), writeBoolean(), writeBooleanField(), writeBytes(), writeBytesField(), writeDouble() (+31 more)

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
Cohesion: 0.05
Nodes (64): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+56 more)

### Community 54 - "performSymbolLayout"
Cohesion: 0.05
Nodes (55): addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+47 more)

### Community 55 - "shapeLines"
Cohesion: 0.06
Nodes (41): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+33 more)

### Community 56 - "readVarint"
Cohesion: 0.08
Nodes (36): loadGlyphRange(), bbox(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+28 more)

### Community 57 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 58 - "push"
Cohesion: 0.04
Nodes (92): sphereSurfacePointToCoordinates(), addPoint(), addTileFeatures(), applyPropertyUpdates(), applySourceDiff(), calcLineBBox(), clip(), clipLine$1() (+84 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "updateVariableAnchorsForBucket"
Cohesion: 0.07
Nodes (46): calculateVariableRenderShift(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getPerspectiveRatio() (+38 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "coveringTiles"
Cohesion: 0.09
Nodes (31): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), _flattenAndSortRenderedFeatures() (+23 more)

### Community 63 - "warnOnce"
Cohesion: 0.06
Nodes (59): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addFeature$1() (+51 more)

### Community 64 - "constructor"
Cohesion: 0.03
Nodes (88): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compare(), compareMax() (+80 more)

### Community 65 - "appendRoundCorner"
Cohesion: 0.08
Nodes (30): getTileSkewVectors(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), create() (+22 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+32 more)

### Community 67 - "appendRoundCorner"
Cohesion: 0.11
Nodes (23): shouldReloadTile(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1() (+15 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.07
Nodes (66): AdminSystemHealthMatrix(), broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId() (+58 more)

### Community 69 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (82): _computeClippingPlane(), _createStyleImage(), _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers() (+74 more)

### Community 70 - "Wu"
Cohesion: 0.14
Nodes (19): bo(), co(), Do(), getPitchedTextCorrection(), go(), ho(), ko(), Oo() (+11 more)

### Community 71 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 72 - "populate"
Cohesion: 0.05
Nodes (52): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), charInRTLScript(), charInSupportedScript(), codePointRequiresComplexTextShaping(), constantOr(), containsRTLText() (+44 more)

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
Cohesion: 0.09
Nodes (18): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+10 more)

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
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "loadTile"
Cohesion: 0.05
Nodes (56): _afterTileLoadWorkerResponse(), _applyResourceTiming(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), _diffStyle(), _dispatchWorkerUpdate() (+48 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.05
Nodes (57): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+49 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "readVarint"
Cohesion: 0.06
Nodes (48): loadGlyphRange(), bbox(), getArrayBuffer(), getProtocol(), getReferrer(), isFileURL(), loadGeometry(), makeFetchRequest() (+40 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "ja"
Cohesion: 0.15
Nodes (19): Da(), Aa(), ba(), canonicalID(), da(), ea, ga(), ha() (+11 more)

### Community 91 - "AuthContext.jsx"
Cohesion: 0.10
Nodes (35): useAuthModalLogic(), LogoutWarningModal(), ProfileTabsNav(), ProfileEditTab(), ProfileInfoTab(), ProfilePinTab(), ProfileReviewsTab(), COUNTRY_DIAL_CODES (+27 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.08
Nodes (29): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), ClientHistoryList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal() (+21 more)

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
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 131 - "migrate-supabase-to-pocketbase.js"
Cohesion: 0.22
Nodes (9): COLLECTIONS_SCHEMA, __dirname, envPath, envVars, __filename, pb, runMigration(), supabase (+1 more)

### Community 132 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 133 - "cameraForBoxAndBearing"
Cohesion: 0.22
Nodes (17): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), getEast(), getLesserNonNegativeNonNull(), getNorth(), getNorthEast(), getNorthWest() (+9 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "jn"
Cohesion: 0.07
Nodes (36): Ar(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), ic(), mf(), Ms() (+28 more)

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

### Community 180 - "placeLayerBucketPart"
Cohesion: 0.08
Nodes (32): _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), demoteFeatureIds(), diffToHashed() (+24 more)

### Community 181 - "platformAuditReferee.js"
Cohesion: 0.30
Nodes (8): MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, getCoordinatesFromDistrict(), auditPlatformState(), healPlatformState(), normalizeIntervention(), normalizeMaalemProfile()

### Community 182 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 183 - "AdminDashboard.jsx"
Cohesion: 0.06
Nodes (52): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), AdminAuditModal(), AdminKpiBanners() (+44 more)

### Community 184 - "pocketbase-schema.js"
Cohesion: 0.24
Nodes (9): ALL_COLLECTIONS, __dirname, envPath, __filename, filterArg, formatType(), inspect(), pb (+1 more)

### Community 185 - "pocketbase-types.ts"
Cohesion: 0.39
Nodes (8): AdminNotificationsRecord, BaseRecord, Collections, InterventionsRecord, MaalemDetailsRecord, ProfilesRecord, ReviewsRecord, TransactionsRecord

### Community 186 - "loadTile"
Cohesion: 0.05
Nodes (51): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), deserialize(), destroy(), _diffStyle(), doOnceCompleted() (+43 more)

### Community 187 - "generate-types.js"
Cohesion: 0.32
Nodes (7): __dirname, __filename, generate(), inferType(), KNOWN_COLLECTIONS, pb, toPascalCase()

### Community 188 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 190 - "mergeSourceDiffs"
Cohesion: 0.28
Nodes (9): _applyDiffToSource(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds() (+1 more)

## Knowledge Gaps
- **640 isolated node(s):** `POCKETBASE_URL`, `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` (+635 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `.handleEvent`, `constructor`, `assets/maplibre-gl-shared-dev.mjs`, `assets/maplibre-gl-worker.mjs`, `coveringTiles`, `populate`, `get`, `_calcMatrices`, `constructor`, `get`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `.handleEvent`, `constructor`, `assets/maplibre-gl-shared-dev.mjs`, `assets/maplibre-gl-worker.mjs`, `coveringTiles`, `populate`, `get`, `_calcMatrices`, `constructor`, `get`, `get`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `public/maplibre-gl.mjs`, `constructor`, `public/maplibre-gl-shared.mjs`, `cameraForBoxAndBearing`, `jn`, `get`, `_calcMatrices`, `writeMessage`, `constructor`, `readVarint`, `get`, `coveringTiles`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `POCKETBASE_URL`, `recentDispatches`, `recentRequests` to the rest of the system?**
  _640 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.00511612826157443 - nodes in this community are weakly interconnected._
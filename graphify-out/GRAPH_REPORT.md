# Graph Report - bricolemoi  (2026-09-03)

## Corpus Check
- 289 files · ~868,011 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10772 nodes · 30775 edges · 194 communities (141 shown, 53 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8bd49d02`
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
- unprojectScreenPoint
- get
- get
- evaluate
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
- _addDefaultHandlers
- concat
- concat
- ._update
- update
- addFeature
- get
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- constructor
- .handleEvent
- clone
- extend
- s
- render
- evaluate
- public/maplibre-gl-worker-dev.mjs
- .handleEvent
- parse
- ga
- devDependencies
- extend
- queryIntersectsFeature
- getPitchedLabelPlaneMatrix
- dependencies
- writeMessage
- writeMessage
- sub
- shapeLines
- performSymbolLayout
- readVarint
- mo
- push
- eliminateHoles
- updateVariableAnchorsForBucket
- eliminateHoles
- getPitchedLabelPlaneMatrix
- warnOnce
- constructor
- appendRoundCorner
- getElevation
- appendRoundCorner
- usePlatformDataSync.js
- assets/maplibre-gl-worker.mjs
- useRealtimePresence.js
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
- ClientDiagnosticFunnel.jsx
- AuthContext.jsx
- inspect_finances.js
- UserProfileModal.jsx
- upload
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
- intersects
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
- placeLayerBucketPart
- useMaalemViewState.js
- parse
- AdminDashboard.jsx
- pocketbase-schema.js
- pocketbase-types.ts
- loadTile
- generate-types.js
- convertGeometryVector
- convertGeometryVector
- featureToGeoJSON
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

## Communities (194 total, 53 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (591): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+583 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (555): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+547 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (503): quadrant(), ad, add(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addFeature(), addFeatures() (+495 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (551): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+543 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (226): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+218 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (211): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+203 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (247): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+239 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (242): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith(), angleWithSep() (+234 more)

### Community 8 - "_addDefaultHandlers"
Cohesion: 0.09
Nodes (30): _addDefaultHandlers(), assignEvents(), coordinatePoint(), depthAtPoint(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+22 more)

### Community 9 - "unprojectScreenPoint"
Cohesion: 0.10
Nodes (34): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+26 more)

### Community 10 - "get"
Cohesion: 0.04
Nodes (164): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), Bu(), _buildSkirts() (+156 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (188): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+180 more)

### Community 12 - "evaluate"
Cohesion: 0.05
Nodes (73): addGlobalState(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), canonicalID(), compareDistPair(), distance(), easeCubicInOut() (+65 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (157): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+149 more)

### Community 14 - "get"
Cohesion: 0.05
Nodes (130): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+122 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (106): angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing() (+98 more)

### Community 16 - "push"
Cohesion: 0.03
Nodes (251): addSprite(), calculateCenterFromCameraLngLatAlt(), ci(), _computeTileBoundingVolume(), eo(), es(), gc(), getCameraQueryGeometry() (+243 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.04
Nodes (114): angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing() (+106 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (107): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), checkGeolocationSupport(), _clearWatch() (+99 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (121): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+113 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (138): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), checkGeolocationSupport() (+130 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (126): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+118 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), addTextVertices(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+117 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (103): sphereSurfacePointToCoordinates(), addPoint(), addTileFeatures(), appendLeaves(), applyPropertyUpdates(), applySourceDiff(), applyTextFit(), calcLineBBox() (+95 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (98): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+90 more)

### Community 25 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (34): _addDefaultHandlers(), assignEvents(), coordinatePoint(), depthAtPoint(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+26 more)

### Community 26 - "concat"
Cohesion: 0.04
Nodes (89): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+81 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (89): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), createPropertyExpression() (+81 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (92): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _applyResourceTiming(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray() (+84 more)

### Community 29 - "update"
Cohesion: 0.02
Nodes (135): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+127 more)

### Community 30 - "addFeature"
Cohesion: 0.06
Nodes (62): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addFeature$1() (+54 more)

### Community 31 - "get"
Cohesion: 0.05
Nodes (87): ac(), add(), addIndicesForPlacedSymbol(), ax, bs(), bx(), clear(), concat() (+79 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (66): addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), evaluateProperties(), fromVectorTileJs() (+58 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.09
Nodes (38): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, isUuid(), useReviewsLoyaltyService(), ACTIONS, EmergencyFlowContext (+30 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (186): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+178 more)

### Community 35 - "constructor"
Cohesion: 0.02
Nodes (97): _createStyleImage(), dispatchRenderCallbacks(), add(), addImages(), backfillBorder(), bucketIndex(), compareMax(), constructor() (+89 more)

### Community 36 - ".handleEvent"
Cohesion: 0.14
Nodes (17): _applyChanges(), _blockedByActive(), _fireEvents(), _getMapTouches(), hasChange(), isActive(), isPointOnMapSurface(), mergeHandlerResult() (+9 more)

### Community 37 - "clone"
Cohesion: 0.05
Nodes (52): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+44 more)

### Community 38 - "extend"
Cohesion: 0.05
Nodes (64): adjustAntiMeridian(), _afterEase(), backgroundPatternUniformValues(), bearing(), bgPatternUniformValues(), calculateTileRatio(), cameraForBounds(), dblclick() (+56 more)

### Community 39 - "s"
Cohesion: 0.06
Nodes (130): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+122 more)

### Community 40 - "render"
Cohesion: 0.09
Nodes (29): acquireRTT(), anyTilesAfterTime(), bindRTT(), commit(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getRTT(), getTexture() (+21 more)

### Community 41 - "evaluate"
Cohesion: 0.04
Nodes (86): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), calculateGlyphDependencies(), canonicalID() (+78 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (68): readImageNow(), addProtocol(), assertRootKey(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters() (+60 more)

### Community 43 - ".handleEvent"
Cohesion: 0.05
Nodes (59): _applyChanges(), _blockedByActive(), _calculateTransform(), _cancelRenderFrame(), cloneImages(), contextmenu(), dblclick(), dragEnd() (+51 more)

### Community 44 - "parse"
Cohesion: 0.05
Nodes (64): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+56 more)

### Community 45 - "ga"
Cohesion: 0.09
Nodes (27): allowVariableZoom(), allowWorldCopies(), distanceToTile2d(), distanceX(), distanceY(), Dp(), ga(), getCameraFrustum() (+19 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "extend"
Cohesion: 0.07
Nodes (52): _afterEase(), backgroundPatternUniformValues(), bearing(), bgPatternUniformValues(), calculateTileRatio(), _ease(), easeTo(), extend() (+44 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.08
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), intersectionTestMapMap() (+28 more)

### Community 49 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.10
Nodes (26): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix(), getTerrainCoords(), _getTerrainCoordsForRegularTile() (+18 more)

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
Nodes (48): align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), calculateScaledKey(), calculateTileKey() (+40 more)

### Community 55 - "performSymbolLayout"
Cohesion: 0.05
Nodes (55): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize() (+47 more)

### Community 56 - "readVarint"
Cohesion: 0.07
Nodes (39): loadGlyphRange(), bbox(), decode(), decodeString$2(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean() (+31 more)

### Community 57 - "mo"
Cohesion: 0.29
Nodes (7): loadURL(), mo(), pt(), qe(), qr, st(), te()

### Community 58 - "push"
Cohesion: 0.03
Nodes (114): sphereSurfacePointToCoordinates(), addFeature$1(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint(), addPointsTileFeature(), addTileFeatures() (+106 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "updateVariableAnchorsForBucket"
Cohesion: 0.07
Nodes (46): calculateVariableRenderShift(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getPerspectiveRatio() (+38 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.11
Nodes (25): anyTilesAfterTime(), calculatePosMatrix(), equals(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix(), getTerrainCoords() (+17 more)

### Community 63 - "warnOnce"
Cohesion: 0.05
Nodes (67): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature() (+59 more)

### Community 64 - "constructor"
Cohesion: 0.03
Nodes (67): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+59 more)

### Community 65 - "appendRoundCorner"
Cohesion: 0.09
Nodes (27): getTileSkewVectors(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), create() (+19 more)

### Community 66 - "getElevation"
Cohesion: 0.09
Nodes (35): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+27 more)

### Community 67 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.10
Nodes (45): NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, getOnlineMaalemsFromStorage(), getTabId() (+37 more)

### Community 69 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (74): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), determineAverageLineWidth() (+66 more)

### Community 70 - "useRealtimePresence.js"
Cohesion: 0.13
Nodes (12): ErrorBoundary, useAblyPresence, useCentrifugoPresence, centrifugo, isCentrifugoConfigured, flushOfflineLogs(), getDeviceInfo(), initRemoteTelemetry() (+4 more)

### Community 71 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 72 - "populate"
Cohesion: 0.05
Nodes (52): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), charInRTLScript(), charInSupportedScript(), codePointRequiresComplexTextShaping(), constantOr(), containsRTLText() (+44 more)

### Community 73 - "useAuth"
Cohesion: 0.09
Nodes (32): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminDashboard(), AdminSecurityModal() (+24 more)

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
Cohesion: 0.10
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+8 more)

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
Cohesion: 0.04
Nodes (71): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), _clearSource(), clearTextures(), clearTiles(), _createStyleImage() (+63 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.04
Nodes (67): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), distSqr(), distToSegmentSquared() (+59 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "ClientDiagnosticFunnel.jsx"
Cohesion: 0.18
Nodes (12): ClientDiagnosticFunnel(), ClientSosForm(), FunnelStepCategory(), FunnelStepConfirmation(), FunnelStepQuestions(), DIAGNOSTIC_TAXONOMY, getSupportedMimeType(), VoiceRecorder() (+4 more)

### Community 91 - "AuthContext.jsx"
Cohesion: 0.10
Nodes (42): AdminSystemHealthMatrix(), useAuthModalLogic(), generateUuid(), toSafeUUID(), useAdminAuthLogic(), AuthContext, AuthProvider(), useSystemTelemetry() (+34 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "UserProfileModal.jsx"
Cohesion: 0.08
Nodes (30): AdminLoyaltyRewardsView(), ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity() (+22 more)

### Community 94 - "upload"
Cohesion: 0.12
Nodes (18): lazyLoad(), _requestImport(), rm(), Ru(), setRTLTextPlugin(), addDebugCollisionBoxes(), destroy(), destroyDebugData() (+10 more)

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

### Community 132 - "intersects"
Cohesion: 0.24
Nodes (14): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+6 more)

### Community 133 - "flyTo"
Cohesion: 0.03
Nodes (154): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+146 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (101): Ar(), cameraPosition(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), getRayDirectionFromPixel(), ic() (+93 more)

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

### Community 181 - "useMaalemViewState.js"
Cohesion: 0.12
Nodes (25): AdminRechargesView(), useAdminKpis(), RechargeMaalemModal(), RechargeRejectModal(), RechargeRowCard(), RechargeSlipModal(), RechargeStatsCards(), MaalemActiveMissionCard() (+17 more)

### Community 182 - "parse"
Cohesion: 0.06
Nodes (41): _addEventListener(), array(), checkSubtype(), clamp$1(), constrainAngle(), error(), fire(), getExpectedType() (+33 more)

### Community 183 - "AdminDashboard.jsx"
Cohesion: 0.07
Nodes (37): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminAuditModal(), AdminKpiBanners(), AdminMaalemCard(), AdminMaalemDrawer() (+29 more)

### Community 184 - "pocketbase-schema.js"
Cohesion: 0.24
Nodes (9): ALL_COLLECTIONS, __dirname, envPath, __filename, filterArg, formatType(), inspect(), pb (+1 more)

### Community 185 - "pocketbase-types.ts"
Cohesion: 0.39
Nodes (8): AdminNotificationsRecord, BaseRecord, Collections, InterventionsRecord, MaalemDetailsRecord, ProfilesRecord, ReviewsRecord, TransactionsRecord

### Community 186 - "loadTile"
Cohesion: 0.06
Nodes (44): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), deserialize(), destroy(), _diffStyle(), doOnceCompleted() (+36 more)

### Community 187 - "generate-types.js"
Cohesion: 0.32
Nodes (7): __dirname, __filename, generate(), inferType(), KNOWN_COLLECTIONS, pb, toPascalCase()

### Community 188 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 190 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 191 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

## Knowledge Gaps
- **640 isolated node(s):** `POCKETBASE_URL`, `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` (+635 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `assets/maplibre-gl-worker.mjs`, `_addDefaultHandlers`, `populate`, `get`, `ga`, `_calcMatrices`, `constructor`, `get`, `push`, `update`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `constructor`, `assets/maplibre-gl-worker.mjs`, `_addDefaultHandlers`, `populate`, `get`, `_calcMatrices`, `constructor`, `get`, `push`, `update`, `get`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `flyTo` to `public/maplibre-gl.mjs`, `constructor`, `public/maplibre-gl-shared.mjs`, `public/maplibre-gl-worker.mjs`, `get`, `_calcMatrices`, `push`, `constructor`, `update`, `get`, `_addDefaultHandlers`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `POCKETBASE_URL`, `recentDispatches`, `recentRequests` to the rest of the system?**
  _640 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005349018588327051 - nodes in this community are weakly interconnected._
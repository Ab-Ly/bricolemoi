# Graph Report - bricolemoi  (2026-09-03)

## Corpus Check
- 289 files · ~869,515 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10777 nodes · 30786 edges · 194 communities (141 shown, 53 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7598c9b0`
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
- jn
- .handleEvent
- get
- get
- geometry
- get
- get
- _calcMatrices
- n
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
- evaluate
- shapeLines
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- constructor
- render
- constructor
- I
- l
- loadTile
- pointsToPolygonDistance
- public/maplibre-gl-worker-dev.mjs
- drawDebugSSRect
- serialize
- coveringTiles
- devDependencies
- featureFilter
- queryIntersectsFeature
- render
- dependencies
- writeMessage
- writeMessage
- sub
- resize
- clamp$2
- readVarint
- Od
- push
- eliminateHoles
- getElevation
- eliminateHoles
- parse
- evaluate
- altitudeFromMercatorZ
- clone
- getElevation
- writeMessage
- usePlatformDataSync.js
- assets/maplibre-gl-worker.mjs
- LandingPage.jsx
- convertGeometryVector
- mergeSourceDiffs
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
- _executeRelevantHandler
- AuthContext.jsx
- inspect_finances.js
- UserProfileModal.jsx
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
- l
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
- ClientDiagnosticFunnel.jsx
- AdminDashboard.jsx
- parse
- mergeSourceDiffs
- pocketbase-schema.js
- pocketbase-types.ts
- extend
- generate-types.js
- renderLayer
- placeLayerBucketPart
- decodeFloat64Values
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
Nodes (510): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+502 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (560): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+552 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (534): Qs(), Ru(), ac(), add(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature(), addFeatures() (+526 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (610): Hi(), mf(), Ms(), quadrant(), Ru(), ac(), add(), addCurrentVertex() (+602 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (221): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+213 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (214): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+206 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (257): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+249 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (262): addEventDefaultOptions, _addEventListener(), align$1(), anchors, angleWith(), angleWithSep(), applyBlockExceptions(), applyTextFit() (+254 more)

### Community 8 - "jn"
Cohesion: 0.03
Nodes (90): allowVariableZoom(), allowWorldCopies(), Ar(), cameraPosition(), _computePreZoomAroundLoc(), distanceToTile2d(), distanceX(), distanceY() (+82 more)

### Community 9 - ".handleEvent"
Cohesion: 0.05
Nodes (57): adjustFarPlaneByHorizonPlane(), _applyChanges(), _blockedByActive(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax() (+49 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (163): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), Bu(), _buildSkirts() (+155 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (175): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+167 more)

### Community 12 - "geometry"
Cohesion: 0.08
Nodes (50): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+42 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (157): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures() (+149 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (161): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+153 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (136): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+128 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (189): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+181 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (144): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+136 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (149): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), _applyChanges(), assignEvents() (+141 more)

### Community 19 - "update"
Cohesion: 0.04
Nodes (80): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold() (+72 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (132): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), checkGeolocationSupport() (+124 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (131): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createDecoderWorkspace(), createFastPforWireDecodeWorkspace() (+123 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (126): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+118 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (121): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+113 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (91): addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures(), coalesceChanges() (+83 more)

### Community 25 - "coveringTiles"
Cohesion: 0.04
Nodes (57): allowVariableZoom(), allowWorldCopies(), _computePreZoomAroundLoc(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), gestureBeginsVertically() (+49 more)

### Community 26 - "concat"
Cohesion: 0.05
Nodes (86): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), createPropertyExpression() (+78 more)

### Community 27 - "concat"
Cohesion: 0.05
Nodes (76): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+68 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (122): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _applyResourceTiming(), _checkLoaded() (+114 more)

### Community 29 - "update"
Cohesion: 0.05
Nodes (65): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold(), _clearTileReloadTimer() (+57 more)

### Community 30 - "evaluate"
Cohesion: 0.03
Nodes (127): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+119 more)

### Community 31 - "shapeLines"
Cohesion: 0.05
Nodes (46): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+38 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (61): addProtocol(), assertRootKey(), br(), clipGeometry(), createExpression(), createStyleLayer(), evaluateProperties(), featureFilter() (+53 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.08
Nodes (39): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, useReviewsLoyaltyService(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider() (+31 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (184): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _createLayers() (+176 more)

### Community 35 - "constructor"
Cohesion: 0.03
Nodes (72): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+64 more)

### Community 36 - "render"
Cohesion: 0.08
Nodes (35): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getDEMElevation(), _getDEMTileMatrix() (+27 more)

### Community 37 - "constructor"
Cohesion: 0.03
Nodes (83): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+75 more)

### Community 38 - "I"
Cohesion: 0.11
Nodes (25): cameraPosition(), getRayDirectionFromPixel(), ic(), isPointOnMapSurface(), op(), pointCoordinate(), rayPlanetIntersection(), rc() (+17 more)

### Community 39 - "l"
Cohesion: 0.04
Nodes (163): ac(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity(), _calculateNearFarZIfNeeded() (+155 more)

### Community 40 - "loadTile"
Cohesion: 0.06
Nodes (44): _afterTileLoadWorkerResponse(), _createStyleImage(), loadTile(), readImageNow(), setExpiryData(), completeTask(), computeVideoFrameParameters(), containsMaxSafeIntegerValues() (+36 more)

### Community 41 - "pointsToPolygonDistance"
Cohesion: 0.09
Nodes (43): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), getBBox(), getPolygonBBox(), getRangeSize() (+35 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (78): _diffStyle(), loadTileJson(), loadURL(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap(), br(), clipGeometry() (+70 more)

### Community 43 - "drawDebugSSRect"
Cohesion: 0.60
Nodes (5): drawCrosshair(), drawDebugPadding(), drawDebugSSRect(), drawHorizontalLine(), drawVerticalLine()

### Community 44 - "serialize"
Cohesion: 0.10
Nodes (28): completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), getTransition(), isArrayBuffer() (+20 more)

### Community 45 - "coveringTiles"
Cohesion: 0.04
Nodes (65): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+57 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "featureFilter"
Cohesion: 0.06
Nodes (38): querySourceFeatures(), checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), feature() (+30 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.04
Nodes (63): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+55 more)

### Community 49 - "render"
Cohesion: 0.04
Nodes (73): anyTilesAfterTime(), calculatePosMatrix(), commit(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), destruct(), equals() (+65 more)

### Community 50 - "dependencies"
Cohesion: 0.09
Nodes (23): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+15 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.08
Nodes (45): makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField(), writeBytes() (+37 more)

### Community 53 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 54 - "resize"
Cohesion: 0.14
Nodes (22): _addDefaultHandlers(), assignEvents(), _containerDimensions(), createQuadTriangles(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+14 more)

### Community 55 - "clamp$2"
Cohesion: 0.05
Nodes (47): getTileSkewVectors(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+39 more)

### Community 56 - "readVarint"
Cohesion: 0.08
Nodes (36): loadGlyphRange(), bbox(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+28 more)

### Community 57 - "Od"
Cohesion: 0.21
Nodes (15): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+7 more)

### Community 58 - "push"
Cohesion: 0.04
Nodes (105): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+97 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (39): area(), buildBlockIndex(), clear(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.07
Nodes (41): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+33 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - "parse"
Cohesion: 0.08
Nodes (31): array(), checkSubtype(), clamp$1(), emitValidationErrors(), error(), fire(), getExpectedType(), getOwn() (+23 more)

### Community 63 - "evaluate"
Cohesion: 0.03
Nodes (108): isStyleLoaded(), accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures() (+100 more)

### Community 64 - "altitudeFromMercatorZ"
Cohesion: 0.18
Nodes (13): tileIdToLngLatBounds(), altitudeFromMercatorZ(), circumferenceAtLatitude(), getTileUnitsForMeters(), latFromMercatorY(), lngFromMercatorX(), mercatorScale(), meterInMercatorCoordinateUnits() (+5 more)

### Community 65 - "clone"
Cohesion: 0.07
Nodes (32): angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+24 more)

### Community 66 - "getElevation"
Cohesion: 0.10
Nodes (32): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+24 more)

### Community 67 - "writeMessage"
Cohesion: 0.05
Nodes (56): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), cf() (+48 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.07
Nodes (54): MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+46 more)

### Community 69 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (65): $s(), al, bt(), C(), ct(), determineAverageLineWidth(), determineLineBreaks(), f() (+57 more)

### Community 70 - "LandingPage.jsx"
Cohesion: 0.15
Nodes (13): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, translations (+5 more)

### Community 71 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 72 - "mergeSourceDiffs"
Cohesion: 0.28
Nodes (9): _applyDiffToSource(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds() (+1 more)

### Community 73 - "useAuth"
Cohesion: 0.07
Nodes (43): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminDashboard(), AdminSecurityModal() (+35 more)

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
Cohesion: 0.21
Nodes (12): C, checkPocketBaseHealth(), __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge() (+4 more)

### Community 82 - "extend"
Cohesion: 0.11
Nodes (25): calculateTileRatio(), extend(), extractCoordinates(), fillExtrusionPatternUniformValues(), fillOutlinePatternUniformValues(), fillPatternUniformValues(), getBearing(), getCoordinatesFromGeometry() (+17 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.08
Nodes (34): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), intersectionTestMapMap() (+26 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "readVarint"
Cohesion: 0.07
Nodes (41): bbox(), command(), decode(), decodeString$2(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean() (+33 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 91 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (34): AdminSystemHealthMatrix(), useAuthModalLogic(), useAdminAuthLogic(), AuthContext, AuthProvider(), useSystemTelemetry(), db, dbClient (+26 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "UserProfileModal.jsx"
Cohesion: 0.08
Nodes (31): ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientHistoryList(), parseCommentAndBadges(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity() (+23 more)

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

### Community 133 - "l"
Cohesion: 0.04
Nodes (158): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+150 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (78): fromCenterSizeAngles(), Fs(), loadURL(), mf(), mo(), al, bt(), cn() (+70 more)

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

### Community 180 - "ClientDiagnosticFunnel.jsx"
Cohesion: 0.18
Nodes (12): ClientDiagnosticFunnel(), ClientSosForm(), FunnelStepCategory(), FunnelStepConfirmation(), FunnelStepQuestions(), DIAGNOSTIC_TAXONOMY, getSupportedMimeType(), VoiceRecorder() (+4 more)

### Community 181 - "AdminDashboard.jsx"
Cohesion: 0.07
Nodes (48): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), AdminAuditModal(), AdminKpiBanners() (+40 more)

### Community 182 - "parse"
Cohesion: 0.08
Nodes (40): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+32 more)

### Community 183 - "mergeSourceDiffs"
Cohesion: 0.29
Nodes (8): _applyDiffToSource(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds(), toUpdateable()

### Community 184 - "pocketbase-schema.js"
Cohesion: 0.24
Nodes (9): ALL_COLLECTIONS, __dirname, envPath, __filename, filterArg, formatType(), inspect(), pb (+1 more)

### Community 185 - "pocketbase-types.ts"
Cohesion: 0.39
Nodes (8): AdminNotificationsRecord, BaseRecord, Collections, InterventionsRecord, MaalemDetailsRecord, ProfilesRecord, ReviewsRecord, TransactionsRecord

### Community 186 - "extend"
Cohesion: 0.03
Nodes (90): addImage(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backfillDEM(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), _createStyleImage() (+82 more)

### Community 187 - "generate-types.js"
Cohesion: 0.32
Nodes (7): __dirname, __filename, generate(), inferType(), KNOWN_COLLECTIONS, pb, toPascalCase()

### Community 188 - "renderLayer"
Cohesion: 0.11
Nodes (25): acquireRTT(), bindRTT(), getRTT(), getTexture(), renderLayer(), ad, Dd(), distSqr() (+17 more)

### Community 190 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 191 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

## Knowledge Gaps
- **642 isolated node(s):** `POCKETBASE_URL`, `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` (+637 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `l` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `constructor`, `assets/maplibre-gl-worker.mjs`, `get`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `resize`, `evaluate`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `l` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `assets/maplibre-gl-worker.mjs`, `get`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `resize`, `evaluate`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `l` to `public/maplibre-gl.mjs`, `public/maplibre-gl-shared.mjs`, `writeMessage`, `constructor`, `public/maplibre-gl-worker.mjs`, `get`, `featureFilter`, `_calcMatrices`, `constructor`, `get`, `push`, `readVarint`, `coveringTiles`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `POCKETBASE_URL`, `recentDispatches`, `recentRequests` to the rest of the system?**
  _642 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005532296650717704 - nodes in this community are weakly interconnected._
# Graph Report - bricolemoi  (2026-09-02)

## Corpus Check
- 255 files · ~865,470 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10673 nodes · 30587 edges · 194 communities (141 shown, 53 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dab5b97c`
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
- sub
- get
- get
- geometry
- get
- get
- _calcMatrices
- cameraForBoxAndBearing
- _calcMatrices
- constructor
- update
- constructor
- get
- get
- push
- ._update
- n
- concat
- concat
- ._update
- update
- get
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- _checkLoaded
- .reset
- readVarint
- serialize
- parse
- n
- .handleEvent
- wrap
- public/maplibre-gl-worker-dev.mjs
- parse
- constructor
- evaluate
- devDependencies
- clone
- queryIntersectsFeature
- readVarint
- dependencies
- writeMessage
- writeMessage
- sub
- shapeLines
- shapeLines
- getPitchedLabelPlaneMatrix
- evaluate
- push
- eliminateHoles
- getElevation
- eliminateHoles
- getPitchedLabelPlaneMatrix
- addFeature
- constructor
- featureFilter
- updateVariableAnchorsForBucket
- _addDefaultHandlers
- usePlatformDataSync.js
- parse
- render
- decodeFloat64Values
- coveringTiles
- AuthContext.jsx
- telemetryDaemon.js
- Od
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
- useClientViewState.js
- workflows/graphify.md
- deepEqual
- clone
- infobipAuthService.js
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
- .handleEvent
- featureToGeoJSON
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
- Wu
- convertGeometryVector
- maalem/MaalemView.jsx
- convertGeometryVector
- featureToGeoJSON
- extend
- _executeRelevantHandler
- parseCssColor
- VoiceRecorder.jsx
- getSpecialtyMeta
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
- `interpolate()` --indirect_call--> `fy`  [INFERRED]
  public/assets/maplibre-gl-shared-dev.mjs → public/assets/maplibre-gl-shared.mjs
- `interpolate()` --indirect_call--> `fy`  [INFERRED]
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
Nodes (557): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+549 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (514): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+506 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (527): Da(), quadrant(), Ru(), Aa(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+519 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (617): Hs(), quadrant(), Ru(), Aa(), ad, add(), _addCollisionDebugVertex(), addCollisionDebugVertices() (+609 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (216): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+208 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (219): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+211 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (249): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith(), angleWithSep() (+241 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (254): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+246 more)

### Community 8 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (34): _addDefaultHandlers(), assignEvents(), coordinatePoint(), depthAtPoint(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+26 more)

### Community 9 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (201): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+193 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (198): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+190 more)

### Community 12 - "geometry"
Cohesion: 0.06
Nodes (61): sphereSurfacePointToCoordinates(), applyPropertyUpdates(), applySourceDiff(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), convertToInternal() (+53 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (133): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+125 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (153): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+145 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (144): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+136 more)

### Community 16 - "cameraForBoxAndBearing"
Cohesion: 0.10
Nodes (32): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), fitBounds(), fov(), getEast(), getLesserNonNegativeNonNull(), getNorth() (+24 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (147): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+139 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (101): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+93 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (95): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+87 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (129): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), checkGeolocationSupport(), _clearWatch() (+121 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (123): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+115 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (136): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName() (+128 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (99): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+91 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (89): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+81 more)

### Community 25 - "n"
Cohesion: 0.03
Nodes (227): addSprite(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix() (+219 more)

### Community 26 - "concat"
Cohesion: 0.04
Nodes (86): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+78 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (103): getMinMaxElevation(), getTileBoundingVolume(), array(), assertRootKey(), bind(), checkSubtype(), coalesce$1(), concat() (+95 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (86): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+78 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (95): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+87 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (90): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+82 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (112): Ar(), ca(), cameraPosition(), _computeClippingPlane(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+104 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (60): loadGlyphRange(), readImageNow(), addProtocol(), br(), clipGeometry(), computeVideoFrameParameters(), createStyleLayer(), fromVectorTileJs() (+52 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.09
Nodes (36): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+28 more)

### Community 34 - "_checkLoaded"
Cohesion: 0.04
Nodes (80): addImage(), addLayer(), addSource(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), _createLayers() (+72 more)

### Community 35 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 36 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 37 - "serialize"
Cohesion: 0.09
Nodes (29): completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), getTransition(), isArrayBuffer() (+21 more)

### Community 38 - "parse"
Cohesion: 0.07
Nodes (41): _addEventListener(), array(), assertRootKey(), checkSubtype(), clamp$1(), createExpression(), createPropertyExpression(), eachChild() (+33 more)

### Community 39 - "n"
Cohesion: 0.04
Nodes (231): addSprite(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix() (+223 more)

### Community 40 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 41 - "wrap"
Cohesion: 0.11
Nodes (33): sphereSurfacePointToCoordinates(), applyPropertyUpdates(), applySourceDiff(), bboxToBBoxDistance(), compareDistPair(), convertToInternal(), diffToHashed(), distance() (+25 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (58): addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), evaluateProperties(), finish() (+50 more)

### Community 43 - "parse"
Cohesion: 0.04
Nodes (62): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+54 more)

### Community 44 - "constructor"
Cohesion: 0.03
Nodes (88): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+80 more)

### Community 45 - "evaluate"
Cohesion: 0.03
Nodes (104): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addGlobalState() (+96 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "clone"
Cohesion: 0.04
Nodes (58): angle(), appendRoundCorner(), breakLines(), clone(), clone$1(), completeTask(), containsMaxSafeIntegerValues(), decode() (+50 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (43): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+35 more)

### Community 49 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

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

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (48): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+40 more)

### Community 56 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.10
Nodes (27): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix(), getTerrainCoords(), _getTerrainCoordsForRegularTile() (+19 more)

### Community 57 - "evaluate"
Cohesion: 0.04
Nodes (63): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies(), charAllowsLetterSpacing() (+55 more)

### Community 58 - "push"
Cohesion: 0.04
Nodes (103): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+95 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.08
Nodes (36): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+28 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (31): calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix() (+23 more)

### Community 63 - "addFeature"
Cohesion: 0.09
Nodes (42): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+34 more)

### Community 64 - "constructor"
Cohesion: 0.03
Nodes (74): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+66 more)

### Community 65 - "featureFilter"
Cohesion: 0.06
Nodes (38): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), featureFilter(), findMixedLegacyFilter() (+30 more)

### Community 66 - "updateVariableAnchorsForBucket"
Cohesion: 0.05
Nodes (59): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getPerspectiveRatio(), getPitchedTextCorrection() (+51 more)

### Community 67 - "_addDefaultHandlers"
Cohesion: 0.09
Nodes (31): _addDefaultHandlers(), assignEvents(), coordinatePoint(), depthAtPoint(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+23 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.10
Nodes (47): NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage() (+39 more)

### Community 69 - "parse"
Cohesion: 0.04
Nodes (64): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), gc() (+56 more)

### Community 70 - "render"
Cohesion: 0.11
Nodes (25): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), _handleTerrainDataEvent(), isHidden() (+17 more)

### Community 71 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 72 - "coveringTiles"
Cohesion: 0.07
Nodes (40): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), finish() (+32 more)

### Community 73 - "AuthContext.jsx"
Cohesion: 0.08
Nodes (37): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminSecurityModal(), AdminSystemHealthMatrix() (+29 more)

### Community 74 - "telemetryDaemon.js"
Cohesion: 0.31
Nodes (13): collectSystemTelemetry(), __dirname, envPath, envVars, fetchWithTimeout(), __filename, pb, probeCentrifugo() (+5 more)

### Community 75 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 76 - "scripts"
Cohesion: 0.08
Nodes (24): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+16 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.11
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), useAuthModalLogic() (+8 more)

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
Cohesion: 0.03
Nodes (104): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily() (+96 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "useClientViewState.js"
Cohesion: 0.12
Nodes (25): ClientReviewCompletionModal(), findNearestCatalogCity(), mapCategoryToSlug(), NEGATIVE_BADGES, POSITIVE_BADGES, SENTIMENT_FEEDBACK, useClientViewState(), COUNTRY_DIAL_CODES (+17 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "clone"
Cohesion: 0.07
Nodes (32): angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+24 more)

### Community 91 - "infobipAuthService.js"
Cohesion: 0.29
Nodes (17): AuthProvider(), checkAndRecordOtpRateLimit(), checkPhoneProfile(), formatInternationalPhone(), formatMoroccanPhone(), getLocalPin(), getPhoneCandidateVariants(), hashPin() (+9 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "InteractiveMap.jsx"
Cohesion: 0.10
Nodes (24): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientHistoryList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard() (+16 more)

### Community 94 - "AdminDashboard.jsx"
Cohesion: 0.18
Nodes (24): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), PaginationControls() (+16 more)

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

### Community 132 - ".handleEvent"
Cohesion: 0.10
Nodes (23): _applyChanges(), _blockedByActive(), _elevateCameraIfInsideTerrain(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches() (+15 more)

### Community 133 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (66): hf(), lf, mf(), _onMoveEnd(), al, Bu(), C(), cn() (+58 more)

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

### Community 181 - "Wu"
Cohesion: 0.12
Nodes (22): bo(), co(), Do(), getPitchedTextCorrection(), go(), ho(), jo(), ko() (+14 more)

### Community 182 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 183 - "maalem/MaalemView.jsx"
Cohesion: 0.24
Nodes (6): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemUnfeasibleModal(), MaalemWalletModal(), RECHARGE_PACKS

### Community 184 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 185 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

### Community 186 - "extend"
Cohesion: 0.02
Nodes (123): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), cameraBoundsWarning() (+115 more)

### Community 187 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 188 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 190 - "VoiceRecorder.jsx"
Cohesion: 0.50
Nodes (6): getSupportedMimeType(), VoiceRecorder(), blobToDataUrl(), compressImageToWebP(), R2_PUBLIC_DOMAIN, uploadMediaToR2()

### Community 191 - "getSpecialtyMeta"
Cohesion: 0.13
Nodes (19): CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon(), getSpecialtyMeta(), SPECIALTY_CONFIG, SpecialtyBadge(), LandingPage(), MOROCCAN_CITIES (+11 more)

### Community 192 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

## Knowledge Gaps
- **627 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+622 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `n` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `_addDefaultHandlers`, `get`, `constructor`, `_calcMatrices`, `constructor`, `get`, `update`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `_addDefaultHandlers`, `get`, `constructor`, `_calcMatrices`, `constructor`, `get`, `update`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `assets/maplibre-gl-dev.mjs`, `render`, `parse`, `_addDefaultHandlers`, `.handleEvent`, `sub`, `n`, `get`, `clone`, `_calcMatrices`, `get`, `._update`, `extend`, `update`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _627 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005475366178428762 - nodes in this community are weakly interconnected._
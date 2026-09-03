# Graph Report - bricolemoi  (2026-09-03)

## Corpus Check
- 290 files · ~916,671 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10796 nodes · 30804 edges · 195 communities (142 shown, 53 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a52c34e9`
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
- n
- sub
- get
- get
- evaluate
- get
- get
- _calcMatrices
- s
- _calcMatrices
- constructor
- update
- constructor
- get
- get
- push
- ._update
- coveringTiles
- featureFilter
- concat
- ._update
- update
- evaluate
- performSymbolLayout
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- constructor
- _checkLoaded
- constructor
- flyTo
- cameraForBoxAndBearing
- AdminDashboard.jsx
- geometry
- public/maplibre-gl-worker-dev.mjs
- .handleEvent
- get
- coveringTiles
- devDependencies
- featureFilter
- queryIntersectsFeature
- concat
- dependencies
- writeMessage
- writeMessage
- clamp
- addFeature
- appendRoundCorner
- readVarint
- warnOnce
- push
- eliminateHoles
- getElevation
- eliminateHoles
- parse
- extend
- Wu
- appendRoundCorner
- getElevation
- _executeRelevantHandler
- usePlatformDataSync.js
- jn
- LandingPage.jsx
- resize
- parseCssColor
- useAuth
- telemetryDaemon.js
- InteractiveMap.jsx
- scripts
- auth/AuthModal.jsx
- deepEqual
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- useRealtimePresence.js
- polygonIntersectsBufferedPoint
- notify-recharge.js
- rules/graphify.md
- manifest.json
- readVarint
- workflows/graphify.md
- deepEqual
- Wu
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
- placeLayerBucketPart
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
- useMaalemViewState.js
- parse
- convertGeometryVector
- pocketbase-schema.js
- pocketbase-types.ts
- extend
- generate-types.js
- convertGeometryVector
- w
- mergeSourceDiffs
- check_admin_profile.mjs
- 🇲🇦 BricoleMoi • بريكول موال

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
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/assets/maplibre-gl-shared-dev.mjs → public/assets/maplibre-gl-shared.mjs
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `constructor()` --indirect_call--> `increment()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `key()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs

## Import Cycles
- None detected.

## Communities (195 total, 53 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (553): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+545 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (537): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+529 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (557): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+549 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (653): Hs(), quadrant(), Ru(), Aa(), ad, add(), _addCollisionDebugVertex(), addCollisionDebugVertices() (+645 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (232): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+224 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (212): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+204 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (248): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+240 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (278): addEventDefaultOptions, _addEventListener(), align$1(), anchors, angleWith(), angleWithSep(), appendLeaves(), applyBlockExceptions() (+270 more)

### Community 8 - "n"
Cohesion: 0.03
Nodes (177): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+169 more)

### Community 9 - "sub"
Cohesion: 0.10
Nodes (35): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+27 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (166): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+158 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (195): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+187 more)

### Community 12 - "evaluate"
Cohesion: 0.04
Nodes (92): addFeatures(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), calculateGlyphDependencies() (+84 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (174): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures() (+166 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (156): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+148 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (115): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+107 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (141): acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices(), calculateCameraOptionsFromTo() (+133 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.04
Nodes (122): adjustAntiMeridian(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+114 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (105): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _cancelRenderFrame(), center(), checkGeolocationSupport() (+97 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (118): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+110 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (107): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), checkGeolocationSupport(), _clearWatch() (+99 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (126): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+118 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (127): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+119 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (105): sphereSurfacePointToCoordinates(), addFeature$1(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint(), addPointsTileFeature(), addTileFeatures() (+97 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (87): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+79 more)

### Community 25 - "coveringTiles"
Cohesion: 0.06
Nodes (52): _addDefaultHandlers(), allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), assignEvents(), coordinatePoint(), coveringTiles() (+44 more)

### Community 26 - "featureFilter"
Cohesion: 0.05
Nodes (46): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), expandBy() (+38 more)

### Community 27 - "concat"
Cohesion: 0.05
Nodes (76): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+68 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (99): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+91 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (117): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+109 more)

### Community 30 - "evaluate"
Cohesion: 0.04
Nodes (72): addDebugCollisionBoxes(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies(), calculateScaledKey() (+64 more)

### Community 31 - "performSymbolLayout"
Cohesion: 0.05
Nodes (54): calculateVariableRenderShift(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+46 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (66): loadGlyphRange(), addProtocol(), br(), clipGeometry(), evaluateProperties(), fromVectorTileJs(), getArrayBuffer(), getImageData() (+58 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.10
Nodes (35): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, useReviewsLoyaltyService(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider() (+27 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (276): _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), clone() (+268 more)

### Community 35 - "constructor"
Cohesion: 0.03
Nodes (70): add(), addImages(), applyTextFit(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax() (+62 more)

### Community 36 - "_checkLoaded"
Cohesion: 0.06
Nodes (57): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), _createLayers(), ei() (+49 more)

### Community 37 - "constructor"
Cohesion: 0.03
Nodes (81): add(), addImages(), backfillBorder(), bucketIndex(), compareMax(), constructor(), copy(), copyImage() (+73 more)

### Community 38 - "flyTo"
Cohesion: 0.04
Nodes (76): _afterEase(), _applyChanges(), bearing(), _blockedByActive(), _calculateTransform(), _cancelRenderFrame(), cloneImages(), contextmenu() (+68 more)

### Community 39 - "cameraForBoxAndBearing"
Cohesion: 0.22
Nodes (17): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), getEast(), getLesserNonNegativeNonNull(), getNorth(), getNorthEast(), getNorthWest() (+9 more)

### Community 40 - "AdminDashboard.jsx"
Cohesion: 0.10
Nodes (25): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminSecurityModal(), AdminAuditModal(), AdminKpiBanners(), AdminMaalemCard() (+17 more)

### Community 41 - "geometry"
Cohesion: 0.08
Nodes (51): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox() (+43 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (78): _diffStyle(), loadTileJson(), loadURL(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap(), br(), clipGeometry() (+70 more)

### Community 43 - ".handleEvent"
Cohesion: 0.05
Nodes (48): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dragEnd(), dragMove(), dragStart() (+40 more)

### Community 44 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 45 - "coveringTiles"
Cohesion: 0.06
Nodes (48): allowVariableZoom(), allowWorldCopies(), _computePreZoomAroundLoc(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), getCameraFrustum() (+40 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "featureFilter"
Cohesion: 0.07
Nodes (34): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), expandBy() (+26 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (32): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), intersectionTestMapMap() (+24 more)

### Community 49 - "concat"
Cohesion: 0.05
Nodes (76): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+68 more)

### Community 50 - "dependencies"
Cohesion: 0.09
Nodes (23): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+15 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.08
Nodes (45): makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField(), writeBytes() (+37 more)

### Community 53 - "clamp"
Cohesion: 0.04
Nodes (79): adjustFarPlaneByHorizonPlane(), calculateEasing(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), computeGlobePanCenter(), _computePreZoomAroundLoc(), _computeTileBoundingVolume() (+71 more)

### Community 54 - "addFeature"
Cohesion: 0.06
Nodes (64): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature() (+56 more)

### Community 55 - "appendRoundCorner"
Cohesion: 0.04
Nodes (61): getTileSkewVectors(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+53 more)

### Community 56 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 57 - "warnOnce"
Cohesion: 0.07
Nodes (54): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addHalfVertex() (+46 more)

### Community 58 - "push"
Cohesion: 0.04
Nodes (96): sphereSurfacePointToCoordinates(), addPoint(), addTileFeatures(), applyPropertyUpdates(), applySourceDiff(), calcLineBBox(), clip(), clipGeometryOnAxis() (+88 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.06
Nodes (44): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+36 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "parse"
Cohesion: 0.04
Nodes (67): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+59 more)

### Community 63 - "extend"
Cohesion: 0.04
Nodes (62): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), clearTextures(), demoteFeatureIds(), destroy(), diffToHashed(), _dispatchWorkerUpdate() (+54 more)

### Community 64 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 65 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 66 - "getElevation"
Cohesion: 0.11
Nodes (30): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+22 more)

### Community 67 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.07
Nodes (54): MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+46 more)

### Community 69 - "jn"
Cohesion: 0.09
Nodes (28): Ar(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), mf(), Ms(), ns() (+20 more)

### Community 70 - "LandingPage.jsx"
Cohesion: 0.15
Nodes (13): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, translations (+5 more)

### Community 71 - "resize"
Cohesion: 0.10
Nodes (30): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), createQuadTriangles(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading() (+22 more)

### Community 72 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 73 - "useAuth"
Cohesion: 0.10
Nodes (31): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal() (+23 more)

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
Cohesion: 0.11
Nodes (15): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+7 more)

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

### Community 82 - "useRealtimePresence.js"
Cohesion: 0.12
Nodes (15): ErrorBoundary, isCurrentUserAdmin(), isCurrentUserAssignedMaalemOf(), useAblyPresence, useCentrifugoPresence, centrifugo, isCentrifugoConfigured, flushOfflineLogs() (+7 more)

### Community 83 - "polygonIntersectsBufferedPoint"
Cohesion: 0.09
Nodes (29): checkIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), intersectionTestMapMap(), intersectionTestMapViewport() (+21 more)

### Community 86 - "manifest.json"
Cohesion: 0.13
Nodes (14): background_color, categories, description, display, icons, lang, name, orientation (+6 more)

### Community 87 - "readVarint"
Cohesion: 0.08
Nodes (38): bbox(), command(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+30 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 91 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (34): AdminSystemHealthMatrix(), useAuthModalLogic(), useAdminAuthLogic(), AuthContext, AuthProvider(), useSystemTelemetry(), db, dbClient (+26 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "UserProfileModal.jsx"
Cohesion: 0.09
Nodes (29): ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientHistoryList(), parseCommentAndBadges(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity() (+21 more)

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

### Community 133 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (74): _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers(), setState(), al (+66 more)

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

### Community 181 - "useMaalemViewState.js"
Cohesion: 0.10
Nodes (29): AdminMaalemsView(), AdminRechargesView(), useAdminKpis(), AdminPhotoModal(), RechargeMaalemModal(), RechargeRejectModal(), RechargeRowCard(), RechargeSlipModal() (+21 more)

### Community 182 - "parse"
Cohesion: 0.04
Nodes (68): _createStyleImage(), array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression() (+60 more)

### Community 183 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 184 - "pocketbase-schema.js"
Cohesion: 0.24
Nodes (9): ALL_COLLECTIONS, __dirname, envPath, __filename, filterArg, formatType(), inspect(), pb (+1 more)

### Community 185 - "pocketbase-types.ts"
Cohesion: 0.39
Nodes (8): AdminNotificationsRecord, BaseRecord, Collections, InterventionsRecord, MaalemDetailsRecord, ProfilesRecord, ReviewsRecord, TransactionsRecord

### Community 186 - "extend"
Cohesion: 0.03
Nodes (85): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), deserialize() (+77 more)

### Community 187 - "generate-types.js"
Cohesion: 0.32
Nodes (7): __dirname, __filename, generate(), inferType(), KNOWN_COLLECTIONS, pb, toPascalCase()

### Community 188 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 190 - "w"
Cohesion: 0.27
Nodes (10): determineAverageLineWidth(), determineLineBreaks(), getMaxImageSize(), getMaxScale(), getSection(), getSectionIndex(), hasZeroWidthSpaces(), length() (+2 more)

### Community 191 - "mergeSourceDiffs"
Cohesion: 0.28
Nodes (9): _applyDiffToSource(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds() (+1 more)

### Community 196 - "🇲🇦 BricoleMoi • بريكول موال"
Cohesion: 0.14
Nodes (13): 1. 👤 Côté Particulier (Client), 2. 🛠️ Côté Artisan (Maâlem), 3. 🛡️ Côté Administration & Cockpit DevOps, 🇲🇦 BricoleMoi • بريكول موال, Commandes Utiles, 🚀 Démarrage Rapide en Local, Installation, 🏛️ Les 3 Piliers Indissociables (+5 more)

## Knowledge Gaps
- **656 isolated node(s):** `POCKETBASE_URL`, `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` (+651 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `n` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `jn`, `cameraForBoxAndBearing`, `resize`, `get`, `evaluate`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `constructor`, `jn`, `cameraForBoxAndBearing`, `resize`, `get`, `evaluate`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `public/maplibre-gl.mjs`, `public/maplibre-gl-shared.mjs`, `constructor`, `public/maplibre-gl-shared-dev.mjs`, `n`, `public/maplibre-gl-worker.mjs`, `get`, `get`, `_calcMatrices`, `constructor`, `get`, `readVarint`, `coveringTiles`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `POCKETBASE_URL`, `recentDispatches`, `recentRequests` to the rest of the system?**
  _656 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005211193298663824 - nodes in this community are weakly interconnected._
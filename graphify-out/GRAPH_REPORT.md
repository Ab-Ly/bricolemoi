# Graph Report - bricolemoi  (2026-09-02)

## Corpus Check
- 253 files · ~865,872 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10670 nodes · 30583 edges · 189 communities (137 shown, 52 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fcbebe52`
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
- get
- get
- get
- add
- s
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
- n
- flyTo
- readVarint
- interpolate
- loadTile
- s
- getPitchedLabelPlaneMatrix
- evaluate
- public/maplibre-gl-worker-dev.mjs
- featureFilter
- constructor
- disable
- devDependencies
- parse
- queryIntersectsFeature
- readVarint
- dependencies
- writeMessage
- writeMessage
- sub
- appendRoundCorner
- shapeLines
- emplaceBack
- Wu
- push
- eliminateHoles
- getElevation
- eliminateHoles
- .reset
- evaluate
- constructor
- featureFilter
- getElevation
- pointsToPolygonDistance
- usePlatformDataSync.js
- mergeSourceDiffs
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
- extend
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
- convertGeometryVector
- maalem/MaalemView.jsx
- getChildren
- Wu
- parseCssColor
- parseCssColor
- getSpecialtyMeta
- _executeRelevantHandler
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

## Communities (189 total, 52 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (571): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+563 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (564): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+556 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (576): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+568 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (562): Ms(), quadrant(), Ru(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+554 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (228): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+220 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (225): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+217 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (260): tileIdToLngLatBounds(), addEventDefaultOptions, _addEventListener(), addGlobalState(), align$1(), allowsLetterSpacing(), altitudeFromMercatorZ(), anchors (+252 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (259): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), anchors (+251 more)

### Community 8 - "coveringTiles"
Cohesion: 0.07
Nodes (41): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+33 more)

### Community 9 - "sub"
Cohesion: 0.10
Nodes (35): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+27 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (164): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+156 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (170): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+162 more)

### Community 12 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (152): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+144 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (161): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures() (+153 more)

### Community 15 - "add"
Cohesion: 0.04
Nodes (117): add(), addClassName(), adjustAntiMeridian(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices() (+109 more)

### Community 16 - "s"
Cohesion: 0.06
Nodes (133): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+125 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.04
Nodes (106): adjustAntiMeridian(), apply(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing(), _calculateNearFarZIfNeeded(), cameraBoundsWarning() (+98 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (105): addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+97 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (108): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+100 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (104): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _cancelRenderFrame() (+96 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (127): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+119 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (122): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+114 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (104): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+96 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (85): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _applyResourceTiming(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray() (+77 more)

### Community 25 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 26 - "concat"
Cohesion: 0.05
Nodes (74): bind(), coalesce$1(), concat(), createFunction(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction() (+66 more)

### Community 27 - "concat"
Cohesion: 0.05
Nodes (79): assertRootKey(), bind(), coalesce$1(), concat(), createExpression(), createFunction(), createPropertyExpression(), deepUnbundle() (+71 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (96): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures(), coalesceChanges(), coerceSpriteToArray() (+88 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (115): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+107 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (80): acquireRTT(), bindRTT(), getRTT(), getTexture(), loadURL(), mf(), mo(), renderLayer() (+72 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.03
Nodes (94): addImage(), _createStyleImage(), _diffStyle(), dispatchRenderCallbacks(), getImage(), getPattern(), loadGlyphRange(), _updateDiff() (+86 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.09
Nodes (35): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+27 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 35 - "flyTo"
Cohesion: 0.03
Nodes (91): _afterEase(), _applyChanges(), bearing(), _blockedByActive(), calculateCameraOptionsFromTo(), _calculateTransform(), cloneImages(), contextmenu() (+83 more)

### Community 36 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 37 - "interpolate"
Cohesion: 0.07
Nodes (39): completeTask(), deserialize(), freeBufferAfterUpload(), from(), getArrayValueLength(), getClassRegistryKey(), getProtocol(), getReferrer() (+31 more)

### Community 38 - "loadTile"
Cohesion: 0.09
Nodes (30): _afterImageUpdated(), _afterTileLoadWorkerResponse(), _clearSource(), clearTextures(), clearTiles(), deserialize(), destroy(), _disposeTexture() (+22 more)

### Community 39 - "s"
Cohesion: 0.06
Nodes (134): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+126 more)

### Community 40 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.13
Nodes (22): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix(), getTerrainCoords(), _getTerrainCoordsForRegularTile() (+14 more)

### Community 41 - "evaluate"
Cohesion: 0.03
Nodes (110): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+102 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (50): addProtocol(), br(), createStyleLayer(), fromVectorTileJs(), getImageData(), Point(), readImageDataUsingOffscreenCanvas(), register() (+42 more)

### Community 43 - "featureFilter"
Cohesion: 0.05
Nodes (49): checkChild(), classifyChildren(), classifyFilter(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1() (+41 more)

### Community 44 - "constructor"
Cohesion: 0.04
Nodes (64): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+56 more)

### Community 45 - "disable"
Cohesion: 0.12
Nodes (19): bindFramebuffer(), createHeatmapFbo(), _destroyUI(), disable(), drawCrosshair(), drawDebugPadding(), drawDebugSSRect(), drawHorizontalLine() (+11 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "parse"
Cohesion: 0.04
Nodes (65): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+57 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.08
Nodes (33): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getIntersectionDistance(), intersectionTestMapMap() (+25 more)

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
Cohesion: 0.12
Nodes (33): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromInvProjectionMatrix(), getIdealNearFarPlaneDistance() (+25 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.06
Nodes (47): getTileSkewVectors(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+39 more)

### Community 55 - "shapeLines"
Cohesion: 0.06
Nodes (45): calculateVariableRenderShift(), align(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+37 more)

### Community 56 - "emplaceBack"
Cohesion: 0.07
Nodes (42): addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addSymbol(), addSymbols(), addTextVariableAnchorOffsets() (+34 more)

### Community 57 - "Wu"
Cohesion: 0.14
Nodes (18): bo(), co(), Do(), getPitchedTextCorrection(), go(), ho(), ko(), Oo() (+10 more)

### Community 58 - "push"
Cohesion: 0.04
Nodes (113): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+105 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.10
Nodes (31): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+23 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - ".reset"
Cohesion: 0.05
Nodes (48): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+40 more)

### Community 63 - "evaluate"
Cohesion: 0.03
Nodes (117): accumulatePointsToCentroid(), addFeature(), addFeatures(), addLineDashDependencies(), addPatternDependencies(), addVertex$1(), bboxToBBoxDistance(), boxWithinBox() (+109 more)

### Community 64 - "constructor"
Cohesion: 0.03
Nodes (76): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), clone(), constructor() (+68 more)

### Community 65 - "featureFilter"
Cohesion: 0.04
Nodes (56): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), emplace(), evaluateProperties() (+48 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (41): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+33 more)

### Community 67 - "pointsToPolygonDistance"
Cohesion: 0.08
Nodes (46): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+38 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.10
Nodes (45): broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId(), isCurrentUserAdmin() (+37 more)

### Community 69 - "mergeSourceDiffs"
Cohesion: 0.29
Nodes (8): _applyDiffToSource(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds(), toUpdateable()

### Community 70 - "extend"
Cohesion: 0.04
Nodes (84): _afterEase(), applyUpdatedTransform(), bearing(), calculateTileRatio(), dblclick(), doOnceCompleted(), _ease(), easeOut() (+76 more)

### Community 71 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 72 - "coveringTiles"
Cohesion: 0.06
Nodes (47): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+39 more)

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

### Community 82 - "extend"
Cohesion: 0.03
Nodes (94): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily() (+86 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.05
Nodes (51): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), findPoleOfInaccessibility() (+43 more)

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
Cohesion: 0.12
Nodes (19): _applyChanges(), _blockedByActive(), _elevateCameraIfInsideTerrain(), _fireEvents(), getCameraAltitude(), _getMapTouches(), hasChange(), isActive() (+11 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (59): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), dn() (+51 more)

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

### Community 182 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 183 - "maalem/MaalemView.jsx"
Cohesion: 0.27
Nodes (5): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemUnfeasibleModal(), MaalemView()

### Community 184 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 185 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 187 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 188 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 191 - "getSpecialtyMeta"
Cohesion: 0.12
Nodes (20): AdminDisputesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon(), getSpecialtyMeta(), SPECIALTY_CONFIG, SpecialtyBadge(), LandingPage() (+12 more)

### Community 192 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 202 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

## Knowledge Gaps
- **626 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+621 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **52 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `constructor`, `_calcMatrices`, `constructor`, `get`, `getChildren`, `assets/maplibre-gl-worker.mjs`, `evaluate`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `constructor`, `get`, `_calcMatrices`, `constructor`, `get`, `getChildren`, `assets/maplibre-gl-worker.mjs`, `evaluate`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `assets/maplibre-gl-worker-dev.mjs`, `n`, `.handleEvent`, `assets/maplibre-gl-dev.mjs`, `extend`, `loadTile`, `coveringTiles`, `sub`, `s`, `get`, `parse`, `_calcMatrices`, `get`, `appendRoundCorner`, `._update`, `update`, `.reset`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _626 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0051021455702699925 - nodes in this community are weakly interconnected._
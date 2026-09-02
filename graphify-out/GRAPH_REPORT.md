# Graph Report - bricolemoi  (2026-09-02)

## Corpus Check
- 288 files · ~864,776 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10754 nodes · 30741 edges · 191 communities (138 shown, 53 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `91eb397d`
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
- populate
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- constructor
- .handleEvent
- clone
- _addDefaultHandlers
- flyTo
- preventDefault
- evaluate
- public/maplibre-gl-worker-dev.mjs
- render
- parse
- interpolate
- devDependencies
- .handleEvent
- queryIntersectsFeature
- parse
- dependencies
- writeMessage
- writeMessage
- sub
- appendRoundCorner
- performSymbolLayout
- serialize
- serialize
- push
- eliminateHoles
- getElevation
- eliminateHoles
- load
- evaluate
- constructor
- parse
- getElevation
- render
- usePlatformDataSync.js
- Tt
- Od
- decodeFloat64Values
- query
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
- renderColorRamp
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
- hasDebugData
- _addDefaultHandlers
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
- platformAuditReferee.js
- convertGeometryVector
- AdminDashboard.jsx
- _executeRelevantHandler
- pocketbase-types.ts
- extend
- generate-types.js
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

## Communities (191 total, 53 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (536): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+528 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (534): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+526 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (583): Ru(), ac(), add(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature(), addFeatures(), addHalfVertex() (+575 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (554): Ms(), quadrant(), Ru(), ac(), ad, addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+546 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (228): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+220 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (222): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+214 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (253): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+245 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (251): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+243 more)

### Community 8 - "coveringTiles"
Cohesion: 0.07
Nodes (41): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), finish() (+33 more)

### Community 9 - "sub"
Cohesion: 0.06
Nodes (58): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+50 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (185): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+177 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (182): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+174 more)

### Community 12 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (164): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+156 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (152): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+144 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+135 more)

### Community 16 - "s"
Cohesion: 0.06
Nodes (130): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+122 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (133): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+125 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (136): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+128 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (108): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+100 more)

### Community 20 - "constructor"
Cohesion: 0.03
Nodes (95): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), center() (+87 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (122): addIndicesForPlacedSymbol(), backfillBorder(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector() (+114 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (124): addIndicesForPlacedSymbol(), backfillBorder(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector() (+116 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (125): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+117 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (80): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+72 more)

### Community 25 - "n"
Cohesion: 0.03
Nodes (193): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), Ar(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci() (+185 more)

### Community 26 - "concat"
Cohesion: 0.05
Nodes (81): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+73 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (95): array(), assertRootKey(), bind(), checkSubtype(), concat(), createExpression(), createFunction(), createPropertyExpression() (+87 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (94): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+86 more)

### Community 29 - "update"
Cohesion: 0.04
Nodes (80): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), backfillDEM(), calculateEasing(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+72 more)

### Community 30 - "populate"
Cohesion: 0.04
Nodes (58): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), checkChild(), classifyChildren(), classifyFilter(), constantOr(), convertComparisonOp$1() (+50 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (189): calculateCameraOptionsFromTo(), _createLayers(), ef(), _flattenAndSortRenderedFeatures(), fov(), getViewportMatrix(), Hs(), ii() (+181 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (57): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), featureFilter(), fromVectorTileJs(), geometryNeeded() (+49 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.12
Nodes (30): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+22 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (178): addImage(), addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), Ar(), calculateCenterFromCameraLngLatAlt(), cameraPosition() (+170 more)

### Community 35 - "constructor"
Cohesion: 0.03
Nodes (78): addImages(), bbox(), bucketIndex(), constructor(), containsMaxSafeIntegerValues(), copyImage(), createImage(), createVisibility() (+70 more)

### Community 36 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 37 - "clone"
Cohesion: 0.06
Nodes (36): fov(), angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst() (+28 more)

### Community 38 - "_addDefaultHandlers"
Cohesion: 0.20
Nodes (15): _addDefaultHandlers(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+7 more)

### Community 39 - "flyTo"
Cohesion: 0.03
Nodes (125): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), cameraForBounds() (+117 more)

### Community 40 - "preventDefault"
Cohesion: 0.06
Nodes (48): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+40 more)

### Community 41 - "evaluate"
Cohesion: 0.04
Nodes (109): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addGlobalState() (+101 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (55): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData(), groupByLayout() (+47 more)

### Community 43 - "render"
Cohesion: 0.07
Nodes (40): anyTilesAfterTime(), attemptAnchorPlacement(), calculateVariableLayoutShift(), commit(), continuePlacement(), destruct(), equals(), getAnisotropicFilterPitch() (+32 more)

### Community 44 - "parse"
Cohesion: 0.05
Nodes (53): array(), assertRootKey(), checkSubtype(), clamp$1(), clone(), createExpression(), createPropertyExpression(), div() (+45 more)

### Community 45 - "interpolate"
Cohesion: 0.08
Nodes (28): calculateScaledKey(), calculateTileKey(), coalesce$1(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction(), evaluateIntervalFunction(), exponentialInterpolation() (+20 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (45): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), findPoleOfInaccessibility() (+37 more)

### Community 49 - "parse"
Cohesion: 0.09
Nodes (30): getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), gi(), as(), checkSubtype(), Do(), error() (+22 more)

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

### Community 54 - "appendRoundCorner"
Cohesion: 0.06
Nodes (45): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+37 more)

### Community 55 - "performSymbolLayout"
Cohesion: 0.05
Nodes (54): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+46 more)

### Community 56 - "serialize"
Cohesion: 0.09
Nodes (30): breakLines(), completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), getTransition() (+22 more)

### Community 57 - "serialize"
Cohesion: 0.10
Nodes (28): completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), getTransition(), isArrayBuffer() (+20 more)

### Community 58 - "push"
Cohesion: 0.03
Nodes (128): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+120 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.06
Nodes (45): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+37 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - "load"
Cohesion: 0.10
Nodes (27): addImage(), _computeClippingPlane(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading(), getImage(), getPattern(), _hasInvalidDimensions() (+19 more)

### Community 63 - "evaluate"
Cohesion: 0.03
Nodes (96): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+88 more)

### Community 64 - "constructor"
Cohesion: 0.03
Nodes (79): add(), addImages(), bucketIndex(), compareMax(), constructor(), copy(), copyImage(), createImage() (+71 more)

### Community 65 - "parse"
Cohesion: 0.11
Nodes (25): querySourceFeatures(), as(), checkSubtype(), Do(), error(), fr, hr, Ir() (+17 more)

### Community 66 - "getElevation"
Cohesion: 0.06
Nodes (45): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+37 more)

### Community 67 - "render"
Cohesion: 0.11
Nodes (26): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), _handleTerrainDataEvent(), isHidden() (+18 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.07
Nodes (66): AdminSystemHealthMatrix(), broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId() (+58 more)

### Community 69 - "Tt"
Cohesion: 0.12
Nodes (20): hf(), lf, mf(), _onMoveEnd(), Bu(), cn(), dn(), emplace() (+12 more)

### Community 70 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 71 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 72 - "query"
Cohesion: 0.04
Nodes (54): add(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), emplace(), expandBy(), feature(), filter() (+46 more)

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
Cohesion: 0.08
Nodes (25): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+17 more)

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
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "extend"
Cohesion: 0.03
Nodes (92): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures() (+84 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "renderColorRamp"
Cohesion: 0.13
Nodes (16): _colorRampChanged(), _createColorRamp(), getColorRampTextures(), getUnpackVector(), gradientExpression(), _handleOverridablePaintPropertyUpdate(), _handleSpecialPaintPropertyUpdate(), isDataDriven() (+8 more)

### Community 91 - "AuthContext.jsx"
Cohesion: 0.09
Nodes (36): useAuthModalLogic(), ClientPhoneRequirementModal(), LogoutWarningModal(), ProfileTabsNav(), ProfileEditTab(), ProfileInfoTab(), ProfilePinTab(), ProfileReviewsTab() (+28 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.09
Nodes (28): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), ClientHistoryList(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), ClientSosForm() (+20 more)

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

### Community 132 - "hasDebugData"
Cohesion: 0.20
Nodes (11): destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData(), hasTextCollisionBoxData() (+3 more)

### Community 133 - "_addDefaultHandlers"
Cohesion: 0.20
Nodes (15): _addDefaultHandlers(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+7 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (95): cameraPosition(), ic(), loadURL(), mf(), mo(), rayPlanetIntersection(), rc(), rs() (+87 more)

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
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 181 - "platformAuditReferee.js"
Cohesion: 0.30
Nodes (8): MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, getCoordinatesFromDistrict(), auditPlatformState(), healPlatformState(), normalizeIntervention(), normalizeMaalemProfile()

### Community 182 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 183 - "AdminDashboard.jsx"
Cohesion: 0.06
Nodes (52): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), AdminAuditModal(), AdminKpiBanners() (+44 more)

### Community 184 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 185 - "pocketbase-types.ts"
Cohesion: 0.39
Nodes (8): AdminNotificationsRecord, BaseRecord, Collections, InterventionsRecord, MaalemDetailsRecord, ProfilesRecord, ReviewsRecord, TransactionsRecord

### Community 186 - "extend"
Cohesion: 0.03
Nodes (117): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily() (+109 more)

### Community 187 - "generate-types.js"
Cohesion: 0.32
Nodes (7): __dirname, __filename, generate(), inferType(), KNOWN_COLLECTIONS, pb, toPascalCase()

### Community 192 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

## Knowledge Gaps
- **630 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+625 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `flyTo` to `assets/maplibre-gl.mjs`, `parse`, `assets/maplibre-gl-shared.mjs`, `Tt`, `_addDefaultHandlers`, `coveringTiles`, `get`, `queryIntersectsFeature`, `_calcMatrices`, `constructor`, `get`, `push`, `assets/maplibre-gl-worker.mjs`, `evaluate`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `x()` connect `assets/maplibre-gl-worker.mjs` to `assets/maplibre-gl.mjs`, `parse`, `n`, `assets/maplibre-gl-shared.mjs`, `_addDefaultHandlers`, `flyTo`, `coveringTiles`, `get`, `queryIntersectsFeature`, `_calcMatrices`, `constructor`, `get`, `push`, `evaluate`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `public/maplibre-gl.mjs`, `constructor`, `public/maplibre-gl-shared.mjs`, `_addDefaultHandlers`, `public/maplibre-gl-worker.mjs`, `get`, `_calcMatrices`, `constructor`, `update`, `get`, `push`, `n`, `populate`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _630 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005272751188529981 - nodes in this community are weakly interconnected._
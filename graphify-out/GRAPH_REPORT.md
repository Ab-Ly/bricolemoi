# Graph Report - bricolemoi  (2026-09-02)

## Corpus Check
- 251 files · ~864,399 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10665 nodes · 30565 edges · 188 communities (137 shown, 51 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `97832783`
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
- constructor
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
- n
- concat
- concat
- ._update
- update
- evaluate
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- get
- coveringTiles
- clone
- parse
- l
- coveringTiles
- interpolate
- public/maplibre-gl-worker-dev.mjs
- featureFilter
- constructor
- update
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
- parseCssColor
- parse
- push
- eliminateHoles
- getElevation
- eliminateHoles
- preventDefault
- pointsToPolygonDistance
- mo
- .handleEvent
- getElevation
- geometry
- usePlatformDataSync.js
- readVarint
- extend
- .handleEvent
- placeLayerBucketPart
- App.jsx
- telemetryDaemon.js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- diff
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- extend
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- featureToGeoJSON
- workflows/graphify.md
- deepEqual
- appendRoundCorner
- addFeature
- inspect_finances.js
- useClientViewState.js
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
- featureFilter
- Od
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
- convertGeometryVector
- resize
- _executeRelevantHandler
- constructor
- LandingPage.jsx
- render
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

## Communities (188 total, 51 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (428): _a(), aa(), ac(), acquire(), acquireRTT(), addBucket(), addControl(), addDash() (+420 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (515): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+507 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (555): Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+547 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (602): Hi(), Ms(), quadrant(), Ru(), ac(), add(), _addCollisionDebugVertex(), addCollisionDebugVertices() (+594 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (213): acquire(), acquireRTT(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+205 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (222): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+214 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (264): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+256 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (239): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+231 more)

### Community 8 - "constructor"
Cohesion: 0.02
Nodes (160): add(), addClassName(), _addDefaultHandlers(), addTo(), af(), _applyChanges(), bf(), _blockedByActive() (+152 more)

### Community 9 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 10 - "get"
Cohesion: 0.04
Nodes (152): ad(), al(), attemptAnchorPlacement(), bd(), bind(), Bu(), _buildSkirts(), $c() (+144 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (180): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+172 more)

### Community 12 - "evaluate"
Cohesion: 0.03
Nodes (75): calculateVariableRenderShift(), addDebugCollisionBoxes(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies() (+67 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (178): addBucket(), applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+170 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (161): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+153 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (140): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+132 more)

### Community 16 - "s"
Cohesion: 0.04
Nodes (153): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+145 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (146): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+138 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (129): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+121 more)

### Community 19 - "update"
Cohesion: 0.04
Nodes (78): _addTerrainIdealTiles(), _addTile(), _applyGlobalStateChanges(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+70 more)

### Community 20 - "constructor"
Cohesion: 0.03
Nodes (96): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+88 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (123): addIndicesForPlacedSymbol(), addTextVertices(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+115 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+117 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (122): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+114 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (96): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures(), coalesceChanges(), coerceSpriteToArray() (+88 more)

### Community 25 - "n"
Cohesion: 0.04
Nodes (155): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+147 more)

### Community 26 - "concat"
Cohesion: 0.05
Nodes (81): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertInOp$1() (+73 more)

### Community 27 - "concat"
Cohesion: 0.04
Nodes (93): array(), assertRootKey(), bind(), checkSubtype(), coalesce$1(), concat(), createExpression(), createFunction() (+85 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (81): addLayer(), addSource(), addSprite(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction(), _createLayers() (+73 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (90): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+82 more)

### Community 30 - "evaluate"
Cohesion: 0.03
Nodes (110): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+102 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (72): fromCenterSizeAngles(), Fs(), $s(), al, bt(), C(), cn(), ct() (+64 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (64): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+56 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.12
Nodes (29): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+21 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (179): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+171 more)

### Community 35 - "get"
Cohesion: 0.05
Nodes (91): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bb() (+83 more)

### Community 36 - "coveringTiles"
Cohesion: 0.04
Nodes (65): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+57 more)

### Community 37 - "clone"
Cohesion: 0.06
Nodes (41): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+33 more)

### Community 38 - "parse"
Cohesion: 0.05
Nodes (53): bo(), co(), Do(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPerspectiveRatio(), gi() (+45 more)

### Community 39 - "l"
Cohesion: 0.04
Nodes (160): ac(), _afterEase(), apply(), applyUpdatedTransform(), Ar(), ca(), _calcMatrices(), calculateCameraOptionsFromTo() (+152 more)

### Community 40 - "coveringTiles"
Cohesion: 0.05
Nodes (52): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint() (+44 more)

### Community 41 - "interpolate"
Cohesion: 0.07
Nodes (40): completeTask(), deserialize(), freeBufferAfterUpload(), from(), getArrayValueLength(), getClassRegistryKey(), getProtocol(), getReferrer() (+32 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (58): addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), evaluateProperties(), finish() (+50 more)

### Community 43 - "featureFilter"
Cohesion: 0.05
Nodes (46): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), emplace(), expandBy(), feature() (+38 more)

### Community 44 - "constructor"
Cohesion: 0.04
Nodes (65): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), clone(), constructor() (+57 more)

### Community 45 - "update"
Cohesion: 0.16
Nodes (15): compareMax(), findPoleOfInaccessibility(), getCentroidCell(), hasDataProperty(), height(), isStyleImageWebGLData(), patchUpdatedImage(), patchUpdatedImages() (+7 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "parse"
Cohesion: 0.08
Nodes (37): array(), assertRootKey(), checkSubtype(), clamp$1(), constrainAngle(), createExpression(), createPropertyExpression(), eachChild() (+29 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 49 - "readVarint"
Cohesion: 0.07
Nodes (39): loadGlyphRange(), bbox(), decode(), decodeString$2(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean() (+31 more)

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

### Community 54 - "appendRoundCorner"
Cohesion: 0.07
Nodes (39): calculateVariableRenderShift(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+31 more)

### Community 55 - "shapeLines"
Cohesion: 0.06
Nodes (43): align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+35 more)

### Community 56 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 57 - "parse"
Cohesion: 0.04
Nodes (67): allowVariableZoom(), allowWorldCopies(), cameraPosition(), distanceToTile2d(), distanceX(), distanceY(), Dp(), ga() (+59 more)

### Community 58 - "push"
Cohesion: 0.04
Nodes (102): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+94 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.07
Nodes (42): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+34 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "preventDefault"
Cohesion: 0.06
Nodes (48): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+40 more)

### Community 63 - "pointsToPolygonDistance"
Cohesion: 0.08
Nodes (46): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+38 more)

### Community 64 - "mo"
Cohesion: 0.29
Nodes (7): loadURL(), mo(), pt(), qe(), qr, st(), te()

### Community 65 - ".handleEvent"
Cohesion: 0.07
Nodes (36): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _finishLoading(), _fireEvent(), _fireEvents(), fitScreenCoordinates() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+32 more)

### Community 67 - "geometry"
Cohesion: 0.08
Nodes (51): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox() (+43 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.06
Nodes (70): AdminRealtimeConsole(), AdminSystemHealthMatrix(), broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage() (+62 more)

### Community 69 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 70 - "extend"
Cohesion: 0.04
Nodes (85): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), calculateTranslation() (+77 more)

### Community 71 - ".handleEvent"
Cohesion: 0.11
Nodes (21): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), _getMapTouches(), hasChange(), isActive() (+13 more)

### Community 72 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 73 - "App.jsx"
Cohesion: 0.08
Nodes (35): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminSecurityModal(), AdminAuthModal() (+27 more)

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
Cohesion: 0.11
Nodes (15): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+7 more)

### Community 78 - "diff"
Cohesion: 0.27
Nodes (11): addCommand(), addSource(), canUpdateGeoJSON(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById() (+3 more)

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
Cohesion: 0.04
Nodes (68): _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle(), _dispatchWorkerUpdate(), doOnceCompleted() (+60 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

### Community 89 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 90 - "appendRoundCorner"
Cohesion: 0.09
Nodes (26): fov(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1() (+18 more)

### Community 91 - "addFeature"
Cohesion: 0.09
Nodes (43): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+35 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.07
Nodes (39): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal() (+31 more)

### Community 94 - "AdminDashboard.jsx"
Cohesion: 0.09
Nodes (40): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), ClientHistoryList() (+32 more)

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

### Community 112 - "loadTile"
Cohesion: 0.09
Nodes (29): _afterTileLoadWorkerResponse(), _clearSource(), clearTextures(), clearTiles(), destroy(), _disposeTexture(), _getNeighboringTiles(), getRTLTextPluginStatus() (+21 more)

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

### Community 132 - "featureFilter"
Cohesion: 0.05
Nodes (47): checkChild(), classifyChildren(), classifyFilter(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1() (+39 more)

### Community 133 - "Od"
Cohesion: 0.21
Nodes (15): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+7 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (58): cameraPosition(), ic(), mf(), rayPlanetIntersection(), rc(), rs(), al, bt() (+50 more)

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

### Community 180 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 181 - "resize"
Cohesion: 0.08
Nodes (39): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), _containerDimensions(), createQuadTriangles(), _createStyleImage(), dispatchRenderCallbacks() (+31 more)

### Community 182 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 190 - "constructor"
Cohesion: 0.03
Nodes (77): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+69 more)

### Community 191 - "LandingPage.jsx"
Cohesion: 0.13
Nodes (16): CATEGORIES_TAXONOMY, CategorySelector(), LandingPage(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer() (+8 more)

### Community 192 - "render"
Cohesion: 0.07
Nodes (40): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getDEMElevation(), _getDEMTileMatrix() (+32 more)

### Community 202 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 203 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

## Knowledge Gaps
- **624 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+619 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **51 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `l` to `.handleEvent`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `n`, `get`, `update`, `_calcMatrices`, `constructor`, `get`, `parse`, `evaluate`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `l` to `.handleEvent`, `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `update`, `_calcMatrices`, `constructor`, `get`, `evaluate`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `.handleEvent`, `n`, `coveringTiles`, `assets/maplibre-gl-dev.mjs`, `extend`, `l`, `sub`, `interpolate`, `get`, `_calcMatrices`, `get`, `appendRoundCorner`, `._update`, `update`, `preventDefault`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _624 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005597237108491128 - nodes in this community are weakly interconnected._
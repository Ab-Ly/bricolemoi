# Graph Report - bricolemoi  (2026-08-30)

## Corpus Check
- 221 files · ~852,476 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10662 nodes · 30454 edges · 211 communities (151 shown, 60 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9454e48f`
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
- concat
- get
- get
- _calcMatrices
- s
- _calcMatrices
- constructor
- update
- constructor
- decodeGeometryColumn
- decodeGeometryColumn
- push
- ._update
- n
- push
- featureFilter
- ._update
- update
- get
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- get
- coveringTiles
- parse
- readVarint
- s
- .handleEvent
- constructor
- public/maplibre-gl-worker-dev.mjs
- getChildren
- constructor
- clone
- devDependencies
- populatePaintArray
- queryIntersectsFeature
- addLine
- dependencies
- writeMessage
- writeMessage
- sub
- appendRoundCorner
- appendRoundCorner
- AdminDashboard.jsx
- parseCssColor
- renderLayer
- eliminateHoles
- updateVariableAnchorsForBucket
- eliminateHoles
- .handleEvent
- pointsToPolygonDistance
- parse
- queryRenderedFeatures
- getElevation
- geometry
- useAblySupabaseSync.js
- readVarint
- extend
- extend
- Wu
- AuthContext.jsx
- telemetryDaemon.js
- infobipAuthService.js
- scripts
- auth/AuthModal.jsx
- diffSources
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- interpolate
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- destroy
- workflows/graphify.md
- deepEqual
- _addDefaultHandlers
- get
- inspect_finances.js
- useClientViewState.js
- semanticSearchService.js
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- relaunch_centrifugo.js
- dist
- inspect_docker.js
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- _executeRelevantHandler
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- decodeFloat64Values
- update_centrifugo.js
- decodeFloat64Values
- vercel.json
- sw.js
- clean_test_data.js
- check_labels.js
- simulate.js
- logs.js
- telemetry.js
- check_proxy.js
- list_all_data.js
- test_cycle.js
- convertGeometryVector
- interpolate
- migrate-supabase-to-pocketbase.js
- emplaceBack
- maalem/MaalemView.jsx
- coalesce$1
- deep-audit.js
- public/maplibre-gl-worker.mjs
- inspect-supabase-records.js
- pocketbase-status.js
- MASTER_DEFINITIVE_MIGRATION.sql
- schema.sql
- admin_auth_and_audit.sql
- backend_optimizations.sql
- CentrifugoClient
- public.transactions
- public.is_admin
- public.push_subscriptions
- supabase-status.js
- 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS
- deploy.sh
- public.unlock_lead_secure
- services_seed.sql
- create_reviews_table.sql
- public.banking_reconciliations
- public.maalem_details
- public.profiles
- public.interventions
- public.maalem_details
- public.reviews
- public.transactions
- public.interventions
- public.maalem_details
- audit.js
- reconcile.js
- package.json
- public.profiles
- watch-deploy.js
- public.maalem_details
- public.profiles
- public.interventions
- public.maalem_details
- public.transactions
- public.interventions
- public.transactions
- public.interventions
- public.maalem_details
- public.profiles
- public.reviews
- public.transactions
- public.interventions
- public.maalem_details
- test-adapter.js
- test-15-char.js
- test-id-format.js
- test-pb.js
- check-pb-cmd.js
- check-pb-entry.js
- check-pb-help.js
- check-pb-logs.js
- check-pb-superuser.js
- deploy-pocketbase.js
- inspect-labels.js
- relaunch-pocketbase.js
- setup-pocketbase-admin.js
- vps-diag.js

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

## Communities (211 total, 60 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (565): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+557 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (557): _a(), aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+549 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (551): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+543 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (629): Ms(), quadrant(), Ru(), ac(), add(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex() (+621 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (216): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+208 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (224): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+216 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (260): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), anchors (+252 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (246): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+238 more)

### Community 8 - "coveringTiles"
Cohesion: 0.06
Nodes (47): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+39 more)

### Community 9 - "sub"
Cohesion: 0.06
Nodes (56): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+48 more)

### Community 10 - "get"
Cohesion: 0.04
Nodes (159): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+151 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (171): ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu(), _buildSkirts() (+163 more)

### Community 12 - "concat"
Cohesion: 0.03
Nodes (119): _calculateNearFarZIfNeeded(), array(), assertRootKey(), bind(), cameraDirectionFromPitchBearing(), checkChild(), checkSubtype(), classifyChildren() (+111 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (162): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+154 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (159): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+151 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (149): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+141 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (136): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+128 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (135): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+127 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (133): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+125 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (96): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+88 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (119): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _cancelRenderFrame() (+111 more)

### Community 21 - "decodeGeometryColumn"
Cohesion: 0.03
Nodes (112): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+104 more)

### Community 22 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (108): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+100 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (134): sphereSurfacePointToCoordinates(), addPoint(), applyPropertyUpdates(), applySourceDiff(), bind(), calcLineBBox(), clip(), clipGeometryOnAxis() (+126 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (89): addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), _clearSource(), clearTextures() (+81 more)

### Community 25 - "n"
Cohesion: 0.03
Nodes (187): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+179 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (124): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+116 more)

### Community 27 - "featureFilter"
Cohesion: 0.09
Nodes (28): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), featureFilter(), findMixedLegacyFilter() (+20 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (81): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+73 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (97): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+89 more)

### Community 30 - "get"
Cohesion: 0.03
Nodes (124): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+116 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (68): _getOperationsToPerform(), loadURL(), mf(), mo(), rs(), serialize(), _serializeByIds(), _serializedAllLayers() (+60 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.03
Nodes (136): addImage(), _afterTileLoadWorkerResponse(), _createStyleImage(), _diffStyle(), dispatchRenderCallbacks(), _finishLoading(), getImage(), _getOverzoomParameters() (+128 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.16
Nodes (24): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+16 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (182): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), coalesceChanges() (+174 more)

### Community 35 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 36 - "coveringTiles"
Cohesion: 0.06
Nodes (47): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), distanceToTile2d() (+39 more)

### Community 37 - "parse"
Cohesion: 0.04
Nodes (72): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+64 more)

### Community 38 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 39 - "s"
Cohesion: 0.06
Nodes (130): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+122 more)

### Community 40 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 41 - "constructor"
Cohesion: 0.04
Nodes (66): addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor(), copy() (+58 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (59): readImageNow(), addProtocol(), br(), clipGeometry(), computeVideoFrameParameters(), createStyleLayer(), fromVectorTileJs(), getImageData() (+51 more)

### Community 43 - "getChildren"
Cohesion: 0.06
Nodes (41): addIndicesForPlacedSymbol(), addTileFeatures(), appendLeaves(), clear(), convertToGeoJSON(), createTile(), extent(), featureToGeoJSON() (+33 more)

### Community 44 - "constructor"
Cohesion: 0.04
Nodes (64): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), copy() (+56 more)

### Community 45 - "clone"
Cohesion: 0.09
Nodes (24): clone(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), div(), divByPoint(), findGlobalStateRefs() (+16 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "populatePaintArray"
Cohesion: 0.28
Nodes (9): emplace(), getPositionIds(), packColor(), packUint8ToFloat(), populatePaintArray(), populatePaintArrays(), _setPaintValue(), _setPaintValues() (+1 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (47): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), findPoleOfInaccessibility() (+39 more)

### Community 49 - "addLine"
Cohesion: 0.11
Nodes (28): accumulatePointsToCentroid(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+20 more)

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
Cohesion: 0.05
Nodes (54): getTileSkewVectors(), tileIdToLngLatBounds(), align(), angle(), appendRoundCorner(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+46 more)

### Community 55 - "appendRoundCorner"
Cohesion: 0.06
Nodes (47): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+39 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.13
Nodes (35): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY (+27 more)

### Community 57 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 58 - "renderLayer"
Cohesion: 0.11
Nodes (25): acquireRTT(), bindRTT(), getRTT(), getTexture(), renderLayer(), ad, Dd(), distSqr() (+17 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "updateVariableAnchorsForBucket"
Cohesion: 0.06
Nodes (57): attemptAnchorPlacement(), calculateVariableLayoutShift(), calculateVariableRenderShift(), continuePlacement(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getPerspectiveRatio() (+49 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - ".handleEvent"
Cohesion: 0.05
Nodes (56): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dragEnd(), dragMove(), dragStart() (+48 more)

### Community 63 - "pointsToPolygonDistance"
Cohesion: 0.08
Nodes (48): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+40 more)

### Community 64 - "parse"
Cohesion: 0.07
Nodes (43): bo(), co(), Do(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), gi(), ho() (+35 more)

### Community 65 - "queryRenderedFeatures"
Cohesion: 0.08
Nodes (36): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), finish(), _flattenAndSortRenderedFeatures() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (43): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+35 more)

### Community 67 - "geometry"
Cohesion: 0.07
Nodes (53): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+45 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.08
Nodes (55): AdminSystemHealthMatrix(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+47 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), loadGeometry(), nextField(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 70 - "extend"
Cohesion: 0.05
Nodes (46): _applyDiffToSource(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate(), extend() (+38 more)

### Community 71 - "extend"
Cohesion: 0.03
Nodes (90): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), deserialize() (+82 more)

### Community 72 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 73 - "AuthContext.jsx"
Cohesion: 0.07
Nodes (37): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+29 more)

### Community 74 - "telemetryDaemon.js"
Cohesion: 0.31
Nodes (13): collectSystemTelemetry(), __dirname, envPath, envVars, fetchWithTimeout(), __filename, pb, probeCentrifugo() (+5 more)

### Community 75 - "infobipAuthService.js"
Cohesion: 0.27
Nodes (18): useAuthModalLogic(), AuthProvider(), checkAndRecordOtpRateLimit(), checkPhoneProfile(), formatInternationalPhone(), formatMoroccanPhone(), getLocalPin(), getPhoneCandidateVariants() (+10 more)

### Community 76 - "scripts"
Cohesion: 0.08
Nodes (24): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+16 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.11
Nodes (15): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+7 more)

### Community 78 - "diffSources"
Cohesion: 0.29
Nodes (10): addCommand(), addSource(), canUpdateGeoJSON(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById(), pluckId() (+2 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "interpolate"
Cohesion: 0.22
Nodes (11): from(), getArrayValueLength(), hclToRgb(), interpolate(), interpolateArray(), interpolateNumber(), isNonInterpolableArrayChange(), lab2xyz() (+3 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "destroy"
Cohesion: 0.11
Nodes (25): addImage(), _afterImageUpdated(), _clearSource(), clearTextures(), clearTiles(), _createStyleImage(), destroy(), dispatchRenderCallbacks() (+17 more)

### Community 89 - "deepEqual"
Cohesion: 0.16
Nodes (19): setState(), addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), deref(), derefLayers(), diff() (+11 more)

### Community 90 - "_addDefaultHandlers"
Cohesion: 0.20
Nodes (15): _addDefaultHandlers(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+7 more)

### Community 91 - "get"
Cohesion: 0.03
Nodes (101): add(), addDebugCollisionBoxes(), addFeature(), addFeatures(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addSymbol() (+93 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.07
Nodes (39): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal() (+31 more)

### Community 94 - "semanticSearchService.js"
Cohesion: 0.29
Nodes (7): MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, searchInstantMeili(), calculateLevenshteinDistance(), extractLocationFromQuery(), normalizeSearchText(), searchRepairProblems()

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

### Community 99 - "relaunch_centrifugo.js"
Cohesion: 0.40
Nodes (4): configB64, configContent, conn, __dirname

### Community 100 - "dist"
Cohesion: 0.33
Nodes (11): addToLineVertexArray(), anchorIsTooClose(), angleTo(), checkMaxAngle(), dist(), getAnchors(), getAngleWindowSize(), getCenterAnchor() (+3 more)

### Community 101 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 106 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 110 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 111 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 112 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 113 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, framework, headers, outputDirectory, rewrites

### Community 118 - "clean_test_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 121 - "simulate.js"
Cohesion: 0.33
Nodes (6): __dirname, envPath, envVars, __filename, runSimulation(), sleep()

### Community 122 - "logs.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 129 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 130 - "interpolate"
Cohesion: 0.22
Nodes (11): from(), getArrayValueLength(), hclToRgb(), interpolate(), interpolateArray(), interpolateNumber(), isNonInterpolableArrayChange(), lab2xyz() (+3 more)

### Community 131 - "migrate-supabase-to-pocketbase.js"
Cohesion: 0.22
Nodes (9): COLLECTIONS_SCHEMA, __dirname, envPath, envVars, __filename, pb, runMigration(), supabase (+1 more)

### Community 132 - "emplaceBack"
Cohesion: 0.14
Nodes (24): addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbols(), addVertex(), copyOrReuseVertex(), createNewSegment() (+16 more)

### Community 133 - "maalem/MaalemView.jsx"
Cohesion: 0.16
Nodes (10): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWalletModal(), MaalemWelcomeWhatsAppBanner(), MaalemView() (+2 more)

### Community 134 - "coalesce$1"
Cohesion: 0.25
Nodes (9): coalesce$1(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction(), evaluateIntervalFunction(), exponentialInterpolation(), findStopLessThanOrEqualTo(), interpolationFactor() (+1 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (72): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), determineAverageLineWidth() (+64 more)

### Community 137 - "inspect-supabase-records.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 138 - "pocketbase-status.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, pb

### Community 139 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 140 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 141 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 144 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 147 - "supabase-status.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

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

### Community 197 - "test-adapter.js"
Cohesion: 0.50
Nodes (3): createPocketBaseSupabaseAdapter(), pb, testAdapter()

## Knowledge Gaps
- **596 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+591 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **60 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `queryIntersectsFeature`, `_calcMatrices`, `constructor`, `push`, `get`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `queryIntersectsFeature`, `_calcMatrices`, `constructor`, `push`, `get`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `assets/maplibre-gl-worker-dev.mjs`, `n`, `coveringTiles`, `assets/maplibre-gl-dev.mjs`, `extend`, `s`, `sub`, `concat`, `get`, `_calcMatrices`, `decodeGeometryColumn`, `appendRoundCorner`, `get`, `._update`, `update`, `.handleEvent`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _596 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005137992289535252 - nodes in this community are weakly interconnected._
# Graph Report - bricolemoi  (2026-08-29)

## Corpus Check
- 202 files · ~844,517 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10587 nodes · 30370 edges · 191 communities (144 shown, 47 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `43099191`
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
- get
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
- get
- get
- push
- ._update
- n
- push
- concat
- ._update
- update
- evaluate
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- n
- get
- extend
- serialize
- readVarint
- s
- .handleEvent
- constructor
- public/maplibre-gl-worker-dev.mjs
- _addDefaultHandlers
- constructor
- clone
- devDependencies
- addFeature
- queryIntersectsFeature
- getPitchedLabelPlaneMatrix
- dependencies
- writeMessage
- writeMessage
- getChildren
- performSymbolLayout
- shapeLines
- AdminDashboard.jsx
- add
- populate
- eliminateHoles
- getElevation
- eliminateHoles
- .handleEvent
- geometry
- Wu
- sub
- getElevation
- geometry
- useAblySupabaseSync.js
- readVarint
- placeLayerBucketPart
- extend
- Wu
- App.jsx
- telemetryDaemon.js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- deepEqual
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- update
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- diff
- convertGeometryVector
- evaluate
- inspect_finances.js
- InteractiveMap.jsx
- LandingPage.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- relaunch_centrifugo.js
- appendRoundCorner
- inspect_docker.js
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- latFromMercatorY
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- convertGeometryVector
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
- addFeature
- maalem/MaalemView.jsx
- deep-audit.js
- public/maplibre-gl-worker.mjs
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

## Communities (191 total, 47 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (555): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+547 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (572): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+564 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (571): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+563 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (563): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+555 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (209): acquire(), acquireRTT(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+201 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (220): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+212 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (227): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+219 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (244): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+236 more)

### Community 8 - "coveringTiles"
Cohesion: 0.05
Nodes (55): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+47 more)

### Community 9 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (168): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+160 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (163): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+155 more)

### Community 12 - "concat"
Cohesion: 0.04
Nodes (103): assertRootKey(), bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1() (+95 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (163): addBucket(), applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+155 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (163): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+155 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (153): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+145 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (141): acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices(), calculateCameraOptionsFromTo() (+133 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (142): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+134 more)

### Community 18 - "constructor"
Cohesion: 0.03
Nodes (95): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+87 more)

### Community 19 - "update"
Cohesion: 0.04
Nodes (88): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+80 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (137): add(), addClassName(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), center(), _clearWatch() (+129 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (124): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+116 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (118): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+110 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (103): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+95 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (96): addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures(), coalesceChanges() (+88 more)

### Community 25 - "n"
Cohesion: 0.03
Nodes (185): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+177 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (122): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+114 more)

### Community 27 - "concat"
Cohesion: 0.05
Nodes (73): checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction() (+65 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (86): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+78 more)

### Community 29 - "update"
Cohesion: 0.02
Nodes (139): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+131 more)

### Community 30 - "evaluate"
Cohesion: 0.03
Nodes (76): addGlobalState(), array(), _calculate(), checkSubtype(), clamp$1(), _colorRampChanged(), _createColorRamp(), crossFadingFactor() (+68 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (72): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), determineAverageLineWidth() (+64 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (52): addProtocol(), br(), clipGeometry(), createStyleLayer(), finish(), fromVectorTileJs(), getImageData(), Point() (+44 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (27): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+19 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 35 - "get"
Cohesion: 0.05
Nodes (88): ac(), add(), addIndicesForPlacedSymbol(), ax, Bd(), bs(), bx(), clear() (+80 more)

### Community 36 - "extend"
Cohesion: 0.03
Nodes (109): addControl(), addImage(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), cameraBoundsWarning() (+101 more)

### Community 37 - "serialize"
Cohesion: 0.07
Nodes (38): breakLines(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), freeBufferAfterUpload() (+30 more)

### Community 38 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 39 - "s"
Cohesion: 0.06
Nodes (133): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+125 more)

### Community 40 - ".handleEvent"
Cohesion: 0.04
Nodes (70): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+62 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (99): add(), addImages(), array(), assertRootKey(), backfillBorder(), bind(), bucketIndex(), checkSubtype() (+91 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (54): addProtocol(), br(), clipGeometry(), createStyleLayer(), fromVectorTileJs(), getImageData(), groupByLayout(), mapObject() (+46 more)

### Community 43 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (34): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading(), generateMousePanHandler() (+26 more)

### Community 44 - "constructor"
Cohesion: 0.03
Nodes (78): addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), completeTask(), constructor() (+70 more)

### Community 45 - "clone"
Cohesion: 0.07
Nodes (32): angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+24 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "addFeature"
Cohesion: 0.09
Nodes (43): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addSymbol(), addSymbols() (+35 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 49 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (31): calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix() (+23 more)

### Community 50 - "dependencies"
Cohesion: 0.10
Nodes (21): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+13 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 54 - "performSymbolLayout"
Cohesion: 0.05
Nodes (55): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize() (+47 more)

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.14
Nodes (31): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY (+23 more)

### Community 57 - "add"
Cohesion: 0.19
Nodes (14): add(), emplace(), getNumericId(), getPositionIds(), getPositions(), id(), packColor(), packUint8ToFloat() (+6 more)

### Community 58 - "populate"
Cohesion: 0.05
Nodes (52): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), charInRTLScript(), charInSupportedScript(), codePointRequiresComplexTextShaping(), constantOr(), containsRTLText() (+44 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.07
Nodes (43): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+35 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - ".handleEvent"
Cohesion: 0.08
Nodes (33): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), generateMousePanHandler() (+25 more)

### Community 63 - "geometry"
Cohesion: 0.07
Nodes (54): addFeatures(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox() (+46 more)

### Community 64 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.08
Nodes (36): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+28 more)

### Community 67 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.10
Nodes (45): AdminRealtimeConsole(), AdminSystemHealthMatrix(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID (+37 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 70 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 71 - "extend"
Cohesion: 0.03
Nodes (88): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy() (+80 more)

### Community 72 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 73 - "App.jsx"
Cohesion: 0.09
Nodes (28): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+20 more)

### Community 74 - "telemetryDaemon.js"
Cohesion: 0.25
Nodes (13): collectSystemTelemetry(), __dirname, envPath, envVars, fetchWithTimeout(), __filename, probeCentrifugo(), probeEvolutionApi() (+5 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.11
Nodes (35): useAuthModalLogic(), ClientReviewCompletionModal(), findNearestCatalogCity(), mapCategoryToSlug(), NEGATIVE_BADGES, POSITIVE_BADGES, SENTIMENT_FEEDBACK, useClientViewState() (+27 more)

### Community 76 - "scripts"
Cohesion: 0.11
Nodes (18): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+10 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.07
Nodes (27): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+19 more)

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

### Community 82 - "update"
Cohesion: 0.09
Nodes (27): compareMax(), emplace(), feature(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions() (+19 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.04
Nodes (61): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), distSqr(), distToSegmentSquared() (+53 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.06
Nodes (58): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+50 more)

### Community 89 - "diff"
Cohesion: 0.27
Nodes (11): addCommand(), addSource(), canUpdateGeoJSON(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById() (+3 more)

### Community 90 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 91 - "evaluate"
Cohesion: 0.03
Nodes (78): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies(), calculateScaledKey(), calculateTileKey() (+70 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "InteractiveMap.jsx"
Cohesion: 0.11
Nodes (20): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientSosForm(), getServiceDisplay() (+12 more)

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

### Community 99 - "relaunch_centrifugo.js"
Cohesion: 0.40
Nodes (4): configB64, configContent, conn, __dirname

### Community 100 - "appendRoundCorner"
Cohesion: 0.14
Nodes (17): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+9 more)

### Community 101 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 106 - "latFromMercatorY"
Cohesion: 0.33
Nodes (7): shouldReloadTile(), tileIdToLngLatBounds(), latFromMercatorY(), lngFromMercatorX(), tileCoordinatesToLocation(), tileCoordinatesToMercatorCoordinates(), toLngLat()

### Community 110 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 111 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 112 - "decodeFloat64Values"
Cohesion: 0.31
Nodes (9): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedInt64AsFloat64Stream(), decodeUnsignedRleFloat64(), decodeVarintFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value() (+1 more)

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

### Community 132 - "addFeature"
Cohesion: 0.08
Nodes (44): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+36 more)

### Community 133 - "maalem/MaalemView.jsx"
Cohesion: 0.20
Nodes (7): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), MaalemView()

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (61): _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers(), setState(), al (+53 more)

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
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

## Knowledge Gaps
- **555 isolated node(s):** `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config` (+550 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `populate`, `get`, `constructor`, `_calcMatrices`, `constructor`, `get`, `push`, `update`, `.handleEvent`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `populate`, `get`, `get`, `constructor`, `_calcMatrices`, `constructor`, `get`, `push`, `update`, `.handleEvent`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `n`, `extend`, `assets/maplibre-gl-dev.mjs`, `s`, `clone`, `get`, `_calcMatrices`, `evaluate`, `get`, `sub`, `._update`, `update`, `.handleEvent`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN` to the rest of the system?**
  _555 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005197661052526363 - nodes in this community are weakly interconnected._
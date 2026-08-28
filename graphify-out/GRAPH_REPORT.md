# Graph Report - bricolemoi  (2026-08-28)

## Corpus Check
- 197 files · ~833,898 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10551 nodes · 30305 edges · 189 communities (141 shown, 48 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1f17889a`
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
- flyTo
- get
- get
- get
- concat
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
- public/maplibre-gl-worker.mjs
- push
- evaluate
- ._update
- update
- .reset
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- query
- n
- _checkLoaded
- concat
- coveringTiles
- parse
- s
- evaluate
- constructor
- public/maplibre-gl-worker-dev.mjs
- update
- geometry
- constructor
- devDependencies
- .handleEvent
- geometry
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- addFeature
- appendRoundCorner
- shapeLines
- AdminDashboard.jsx
- readVarint
- queryIntersectsFeature
- eliminateHoles
- updateVariableAnchorsForBucket
- eliminateHoles
- update
- .handleEvent
- Wu
- sub
- updateVariableAnchorsForBucket
- query
- useAblySupabaseSync.js
- readVarint
- deepEqual
- extend
- parseCssColor
- App.jsx
- intersects
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- serialize
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- appendRoundCorner
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- hasDebugData
- extend
- inspect_finances.js
- useClientViewState.js
- LandingPage.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- relaunch_centrifugo.js
- placeLayerBucketPart
- inspect_docker.js
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- deepEqual
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- _addDefaultHandlers
- update_centrifugo.js
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
- locationToScreenPoint
- MASTER_DEFINITIVE_MIGRATION.sql
- schema.sql
- maalem/MaalemView.jsx
- admin_auth_and_audit.sql
- backend_optimizations.sql
- public.transactions
- public.is_admin
- CentrifugoClient
- public.push_subscriptions
- public.unlock_lead_secure
- decodeFloat64Values
- supabase-status.js
- 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS
- deploy.sh
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
- public.profiles
- audit.js
- reconcile.js
- package.json
- public.maalem_details
- watch-deploy.js
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

## Communities (189 total, 48 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (549): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+541 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (564): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+556 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (496): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+488 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (565): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+557 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (213): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+205 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (212): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+204 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (245): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+237 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (264): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+256 more)

### Community 8 - "flyTo"
Cohesion: 0.03
Nodes (134): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+126 more)

### Community 9 - "get"
Cohesion: 0.05
Nodes (85): ac(), add(), addIndicesForPlacedSymbol(), ax, bs(), bx(), clear(), concat() (+77 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (178): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+170 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (170): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+162 more)

### Community 12 - "concat"
Cohesion: 0.04
Nodes (87): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+79 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (149): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+141 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (150): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+142 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (141): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+133 more)

### Community 16 - "push"
Cohesion: 0.03
Nodes (281): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _createLayers(), querySourceFeatures(), es(), gc() (+273 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.04
Nodes (125): _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo() (+117 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (114): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+106 more)

### Community 19 - "update"
Cohesion: 0.02
Nodes (129): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+121 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (108): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _cancelRenderFrame() (+100 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (121): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+113 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (131): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), constantOr() (+123 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (120): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+112 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (110): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), bgPatternUniformValues(), _checkLoaded() (+102 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (99): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getElevationForLngLatZoom() (+91 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (124): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+116 more)

### Community 27 - "evaluate"
Cohesion: 0.03
Nodes (99): cameraBoundsWarning(), isStyleLoaded(), accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature() (+91 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (101): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), _clearSource(), clearTextures(), clearTiles() (+93 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (97): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold() (+89 more)

### Community 30 - ".reset"
Cohesion: 0.04
Nodes (60): _calculateTransform(), cloneImages(), contextmenu(), dblclick(), _destroyUI(), disable(), dragEnd(), dragMove() (+52 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (78): cameraPosition(), ic(), mf(), rayPlanetIntersection(), rc(), rs(), al, bm() (+70 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+54 more)

### Community 33 - "query"
Cohesion: 0.04
Nodes (56): add(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), emplace(), expandBy(), feature() (+48 more)

### Community 34 - "n"
Cohesion: 0.04
Nodes (167): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+159 more)

### Community 35 - "_checkLoaded"
Cohesion: 0.08
Nodes (45): addLayer(), _applyGlobalStateChanges(), _checkLoaded(), ei(), getFilter(), getLayer(), getLayoutProperty(), _getOperationsToPerform() (+37 more)

### Community 36 - "concat"
Cohesion: 0.05
Nodes (82): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+74 more)

### Community 37 - "coveringTiles"
Cohesion: 0.07
Nodes (43): allowVariableZoom(), allowWorldCopies(), backfillDEM(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel() (+35 more)

### Community 38 - "parse"
Cohesion: 0.08
Nodes (40): getTileBoundingVolume(), array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div() (+32 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (140): ac(), acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices() (+132 more)

### Community 40 - "evaluate"
Cohesion: 0.04
Nodes (56): addGlobalState(), allowsLetterSpacing(), _calculate(), charAllowsLetterSpacing(), _colorRampChanged(), containsPolygonGeometry(), convertGeometryVector(), createArrays() (+48 more)

### Community 41 - "constructor"
Cohesion: 0.02
Nodes (129): add(), addImages(), array(), assertRootKey(), backfillBorder(), breakLines(), bucketIndex(), calculateScaledKey() (+121 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+54 more)

### Community 43 - "update"
Cohesion: 0.18
Nodes (14): compareMax(), findPoleOfInaccessibility(), getCentroidCell(), hasDataProperty(), height(), patchUpdatedImage(), patchUpdatedImages(), premultiplyAlpha() (+6 more)

### Community 44 - "geometry"
Cohesion: 0.07
Nodes (53): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+45 more)

### Community 45 - "constructor"
Cohesion: 0.03
Nodes (79): addImages(), backfillBorder(), bbox(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), containsMaxSafeIntegerValues() (+71 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - ".handleEvent"
Cohesion: 0.05
Nodes (51): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dragEnd(), dragMove(), dragStart() (+43 more)

### Community 48 - "geometry"
Cohesion: 0.06
Nodes (61): sphereSurfacePointToCoordinates(), applyPropertyUpdates(), applySourceDiff(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), convertToInternal() (+53 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.13
Nodes (30): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+22 more)

### Community 50 - "dependencies"
Cohesion: 0.10
Nodes (21): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+13 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "addFeature"
Cohesion: 0.07
Nodes (50): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+42 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.06
Nodes (44): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+36 more)

### Community 55 - "shapeLines"
Cohesion: 0.06
Nodes (44): addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+36 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.14
Nodes (30): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY (+22 more)

### Community 57 - "readVarint"
Cohesion: 0.11
Nodes (26): bbox(), cm(), decode(), nextField(), readBoolean(), readBytes(), readDouble(), readFixed32() (+18 more)

### Community 58 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "updateVariableAnchorsForBucket"
Cohesion: 0.07
Nodes (47): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getPerspectiveRatio(), getPitchedTextCorrection(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+39 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (39): area(), buildBlockIndex(), clear(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+31 more)

### Community 62 - "update"
Cohesion: 0.10
Nodes (26): compareMax(), emplace(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions(), hasDataProperty() (+18 more)

### Community 63 - ".handleEvent"
Cohesion: 0.15
Nodes (15): _applyChanges(), _blockedByActive(), _getMapTouches(), hasChange(), isPointOnMapSurface(), mergeHandlerResult(), pointCoordinate(), _requestFrame() (+7 more)

### Community 64 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 65 - "sub"
Cohesion: 0.06
Nodes (57): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+49 more)

### Community 66 - "updateVariableAnchorsForBucket"
Cohesion: 0.05
Nodes (66): attemptAnchorPlacement(), calculateVariableLayoutShift(), calculateVariableRenderShift(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation() (+58 more)

### Community 67 - "query"
Cohesion: 0.10
Nodes (24): _convertFromCellCoord(), _convertToCellCoord(), expandBy(), _forEachCell(), getId(), getKey(), getState(), insert() (+16 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.11
Nodes (39): NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage() (+31 more)

### Community 69 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "extend"
Cohesion: 0.03
Nodes (104): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), applySourceDiff(), backgroundPatternUniformValues(), bgPatternUniformValues() (+96 more)

### Community 72 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 73 - "App.jsx"
Cohesion: 0.09
Nodes (27): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+19 more)

### Community 74 - "intersects"
Cohesion: 0.24
Nodes (14): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+6 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.13
Nodes (29): useAuthModalLogic(), ClientPhoneRequirementModal(), COUNTRY_DIAL_CODES, MOROCCAN_CITIES, AuthContext, AuthProvider(), app, auth (+21 more)

### Community 76 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+8 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.09
Nodes (20): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+12 more)

### Community 78 - "serialize"
Cohesion: 0.07
Nodes (35): breakLines(), completeTask(), copy(), copyImage(), createImage(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey() (+27 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.09
Nodes (38): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+30 more)

### Community 89 - "hasDebugData"
Cohesion: 0.18
Nodes (12): addDebugCollisionBoxes(), destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData() (+4 more)

### Community 91 - "extend"
Cohesion: 0.04
Nodes (85): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), backgroundPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF() (+77 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.09
Nodes (31): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientHistoryList(), ClientRadarSearchingCard(), ClientReviewCompletionModal() (+23 more)

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
Cohesion: 0.83
Nodes (3): formatEvolutionNumber(), getDistanceKm(), handler()

### Community 98 - "verify-otp.js"
Cohesion: 0.83
Nodes (3): cleanPhoneNumber(), handler(), verifyOtpSignature()

### Community 99 - "relaunch_centrifugo.js"
Cohesion: 0.40
Nodes (4): configB64, configContent, conn, __dirname

### Community 100 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 101 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 106 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 110 - "_addDefaultHandlers"
Cohesion: 0.22
Nodes (14): _addDefaultHandlers(), assignEvents(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter(), getCoordinatesCenterTileID() (+6 more)

### Community 111 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

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

### Community 132 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 134 - "locationToScreenPoint"
Cohesion: 0.13
Nodes (18): coordinatePoint(), depthAtPoint(), getElevationForLngLat(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPitch(), isLocationOccluded() (+10 more)

### Community 135 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 136 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 137 - "maalem/MaalemView.jsx"
Cohesion: 0.20
Nodes (7): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), MaalemView()

### Community 138 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 140 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 146 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

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
- **538 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+533 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **48 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `update`, `get`, `constructor`, `_calcMatrices`, `constructor`, `get`, `push`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `update`, `get`, `constructor`, `_calcMatrices`, `constructor`, `get`, `push`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `y()` connect `flyTo` to `public/maplibre-gl.mjs`, `public/maplibre-gl-shared.mjs`, `readVarint`, `get`, `_addDefaultHandlers`, `_calcMatrices`, `push`, `constructor`, `update`, `get`, `push`, `public/maplibre-gl-worker.mjs`, `update`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _538 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005485157063409431 - nodes in this community are weakly interconnected._
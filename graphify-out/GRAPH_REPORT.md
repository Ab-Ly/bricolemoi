# Graph Report - bricolemoi  (2026-08-27)

## Corpus Check
- 175 files · ~820,557 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10430 nodes · 30110 edges · 177 communities (130 shown, 47 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f9097ac4`
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
- o
- n
- get
- get
- get
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
- public/maplibre-gl-worker.mjs
- push
- evaluate
- ._update
- update
- serialize
- concat
- assets/maplibre-gl-worker-dev.mjs
- getChildren
- assets/maplibre-gl-worker.mjs
- parseCssColor
- concat
- parseCssColor
- getPitchedLabelPlaneMatrix
- s
- evaluate
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- .handleEvent
- queryIntersectsFeature
- devDependencies
- extend
- pointsToPolygonDistance
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- placeLayerBucketPart
- appendRoundCorner
- shapeLines
- UserProfileModal.jsx
- parse
- _addDefaultHandlers
- eliminateHoles
- getElevation
- eliminateHoles
- placeLayerBucketPart
- render
- appendRoundCorner
- sub
- getElevation
- queryIntersectsFeature
- useAblySupabaseSync.js
- readVarint
- deepEqual
- load
- w
- App.jsx
- platformAuditReferee.js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- extend
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- Wu
- deepEqual
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- LandingPage.jsx
- constructor
- setElevation
- MASTER_DEFINITIVE_MIGRATION.sql
- useClientViewState.js
- mo
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- schema.sql
- convertGeometryVector
- featureFilter
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- admin_auth_and_audit.sql
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- backend_optimizations.sql
- maalem/MaalemView.jsx
- public.transactions
- vercel.json
- sw.js
- public.is_admin
- decodeFloat64Values
- simulate.js
- ErrorBoundary
- telemetry.js
- public.push_subscriptions
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
- public.profiles
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
- audit.js
- reconcile.js
- package.json
- emplaceBack
- lucide-react
- react-dom
- @supabase/supabase-js

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
- `interpolate()` --indirect_call--> `fy`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `constructor()` --indirect_call--> `increment()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `key()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs

## Import Cycles
- None detected.

## Communities (177 total, 47 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (530): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+522 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (557): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+549 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (602): quadrant(), Ru(), ad, add(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature(), addFeatures() (+594 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (580): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+572 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (206): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+198 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (228): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+220 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (250): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+242 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (277): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+269 more)

### Community 8 - "o"
Cohesion: 0.04
Nodes (173): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+165 more)

### Community 9 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (200): _a(), ac(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd() (+192 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (166): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+158 more)

### Community 12 - "get"
Cohesion: 0.05
Nodes (88): ac(), add(), addIndicesForPlacedSymbol(), ax, Bd(), bs(), bx(), clear() (+80 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (156): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+148 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (159): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+151 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (153): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+145 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (175): addImage(), addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), calculateFogMatrix(), _checkLoaded() (+167 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (146): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+138 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (157): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _calculateTransform() (+149 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (122): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+114 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (134): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), _cancelRenderFrame(), checkGeolocationSupport() (+126 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (135): addIndicesForPlacedSymbol(), addTextVertices(), applyPropertyUpdates(), applySourceDiff(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName() (+127 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (126): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), constantOr(), createConstGeometryVector() (+118 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (120): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addIndicesForPlacedSymbol(), addLine(), addLinesTileFeature() (+112 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (86): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+78 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (105): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum() (+97 more)

### Community 26 - "push"
Cohesion: 0.04
Nodes (104): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+96 more)

### Community 27 - "evaluate"
Cohesion: 0.03
Nodes (125): sphereSurfacePointToCoordinates(), accumulatePointsToCentroid(), addCircleVertex(), addFeature(), addFeatures(), addGlobalState(), addLineDashDependencies(), addPatternDependencies() (+117 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (91): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+83 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (109): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+101 more)

### Community 30 - "serialize"
Cohesion: 0.06
Nodes (43): completeTask(), containsMaxSafeIntegerValues(), copy(), copyImage(), createImage(), decode(), decodeFsst(), decodeString$2() (+35 more)

### Community 31 - "concat"
Cohesion: 0.05
Nodes (73): bind(), coalesce$1(), concat(), createFunction(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction() (+65 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+54 more)

### Community 33 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (61): _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers(), setState(), al (+53 more)

### Community 35 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 36 - "concat"
Cohesion: 0.03
Nodes (114): getTileBoundingVolume(), array(), assertRootKey(), bind(), checkChild(), checkSubtype(), classifyChildren(), classifyFilter() (+106 more)

### Community 37 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 38 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (31): calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix() (+23 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (141): acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices(), calculateCameraOptionsFromTo() (+133 more)

### Community 40 - "evaluate"
Cohesion: 0.04
Nodes (84): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addFeature(), addFeatures(), addGlobalState(), addSymbol() (+76 more)

### Community 41 - "constructor"
Cohesion: 0.02
Nodes (104): add(), addImages(), backfillBorder(), breakLines(), bucketIndex(), calculateScaledKey(), calculateTileKey(), clone() (+96 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (58): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), featureFilter(), fromVectorTileJs(), geometryNeeded() (+50 more)

### Community 43 - "readVarint"
Cohesion: 0.08
Nodes (36): loadGlyphRange(), bbox(), getArrayBuffer(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+28 more)

### Community 44 - ".handleEvent"
Cohesion: 0.11
Nodes (21): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), _getMapTouches(), hasChange(), isActive() (+13 more)

### Community 45 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 46 - "devDependencies"
Cohesion: 0.13
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+7 more)

### Community 47 - "extend"
Cohesion: 0.03
Nodes (100): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), cameraBoundsWarning() (+92 more)

### Community 48 - "pointsToPolygonDistance"
Cohesion: 0.08
Nodes (46): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+38 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (28): EmergencySOSModal(), MaalemRadarHeader(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+20 more)

### Community 50 - "dependencies"
Cohesion: 0.12
Nodes (17): ably, @aws-sdk/client-s3, firebase, framer-motion, maplibre-gl, dependencies, ably, @aws-sdk/client-s3 (+9 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.06
Nodes (43): calculateVariableRenderShift(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+35 more)

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 56 - "UserProfileModal.jsx"
Cohesion: 0.19
Nodes (18): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), ClientHistoryList(), EnhancedCategoryIcon() (+10 more)

### Community 57 - "parse"
Cohesion: 0.08
Nodes (39): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+31 more)

### Community 58 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (34): _addDefaultHandlers(), assignEvents(), coordinatePoint(), depthAtPoint(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+26 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.09
Nodes (35): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+27 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 63 - "render"
Cohesion: 0.07
Nodes (38): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getDEMElevation(), _getDEMTileMatrix() (+30 more)

### Community 64 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 65 - "sub"
Cohesion: 0.06
Nodes (54): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint(), depthAtPoint(), findAxisMinMax() (+46 more)

### Community 66 - "getElevation"
Cohesion: 0.09
Nodes (33): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+25 more)

### Community 67 - "queryIntersectsFeature"
Cohesion: 0.03
Nodes (77): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), distSqr() (+69 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.13
Nodes (36): broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId(), isCurrentUserAdmin() (+28 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "load"
Cohesion: 0.03
Nodes (81): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createStyleImage(), _createTinySDF(), deserialize() (+73 more)

### Community 72 - "w"
Cohesion: 0.27
Nodes (10): determineAverageLineWidth(), determineLineBreaks(), getMaxImageSize(), getMaxScale(), getSection(), getSectionIndex(), hasZeroWidthSpaces(), length() (+2 more)

### Community 73 - "App.jsx"
Cohesion: 0.16
Nodes (20): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), LandingPage() (+12 more)

### Community 74 - "platformAuditReferee.js"
Cohesion: 0.21
Nodes (10): AdminDashboard(), MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, AdminView, getCoordinatesFromDistrict(), auditPlatformState(), healPlatformState() (+2 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.17
Nodes (24): useAuthModalLogic(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, reverseGeocodeMorocco() (+16 more)

### Community 76 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, audit, build, dev, lint, listen, preview, reconcile (+1 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+8 more)

### Community 78 - "extend"
Cohesion: 0.06
Nodes (42): _applyChanges(), _applyDiffToSource(), _applyResourceTiming(), _blockedByActive(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate(), extend() (+34 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.33
Nodes (4): __dirname, envPath, envVars, __filename

### Community 82 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 83 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 89 - "LandingPage.jsx"
Cohesion: 0.10
Nodes (22): CATEGORIES_TAXONOMY, CategorySelector(), ClientSosForm(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer() (+14 more)

### Community 90 - "constructor"
Cohesion: 0.04
Nodes (66): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+58 more)

### Community 91 - "setElevation"
Cohesion: 0.33
Nodes (9): destruct(), equals(), getCenterClampedToGround(), _handleTerrainDataEvent(), releaseAllRTT(), releaseRTT(), setElevation(), setMinElevationForCurrentTile() (+1 more)

### Community 92 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 93 - "useClientViewState.js"
Cohesion: 0.11
Nodes (24): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity(), getServiceDisplay() (+16 more)

### Community 94 - "mo"
Cohesion: 0.33
Nodes (6): loadURL(), mo(), qe(), qr, st(), te()

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

### Community 99 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 100 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 101 - "featureFilter"
Cohesion: 0.07
Nodes (35): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), feature(), featureFilter() (+27 more)

### Community 106 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 111 - "maalem/MaalemView.jsx"
Cohesion: 0.23
Nodes (12): MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemTransactionsModal(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), useMaalemViewState(), MaalemView(), useEmergencyFlow() (+4 more)

### Community 112 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 119 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 121 - "simulate.js"
Cohesion: 0.29
Nodes (7): __dirname, envPath, envVars, __filename, runSimulation(), sleep(), supabase

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 173 - "emplaceBack"
Cohesion: 0.06
Nodes (45): _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addSymbol(), addSymbols(), addTextVariableAnchorOffsets(), addToLineVertexArray() (+37 more)

## Knowledge Gaps
- **480 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+475 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `getChildren`, `assets/maplibre-gl-shared.mjs`, `assets/maplibre-gl-worker.mjs`, `constructor`, `get`, `_calcMatrices`, `constructor`, `get`, `_addDefaultHandlers`, `evaluate`, `update`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `getChildren`, `assets/maplibre-gl-shared.mjs`, `assets/maplibre-gl-worker.mjs`, `constructor`, `n`, `get`, `get`, `_calcMatrices`, `constructor`, `get`, `_addDefaultHandlers`, `evaluate`, `update`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `appendRoundCorner`, `sub`, `public/maplibre-gl-dev.mjs`, `concat`, `load`, `o`, `constructor`, `get`, `extend`, `_calcMatrices`, `n`, `update`, `get`, `._update`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _480 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0054178797673903245 - nodes in this community are weakly interconnected._
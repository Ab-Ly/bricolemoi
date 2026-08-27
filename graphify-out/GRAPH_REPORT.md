# Graph Report - bricolemoi  (2026-08-27)

## Corpus Check
- 171 files · ~818,662 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10404 nodes · 30086 edges · 170 communities (127 shown, 43 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7003a211`
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
- s
- push
- get
- get
- _addDefaultHandlers
- get
- get
- _calcMatrices
- n
- _calcMatrices
- constructor
- update
- constructor
- decodeGeometryColumn
- decodeGeometryColumn
- push
- ._update
- public/maplibre-gl-worker.mjs
- push
- geometry
- ._update
- update
- featureFilter
- concat
- assets/maplibre-gl-worker-dev.mjs
- clone
- assets/maplibre-gl-worker.mjs
- _checkLoaded
- concat
- .reset
- queryRenderedFeatures
- flyTo
- get
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- .handleEvent
- queryIntersectsFeature
- getPitchedLabelPlaneMatrix
- extend
- pointsToPolygonDistance
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- get
- shapeLines
- appendRoundCorner
- AdminDashboard.jsx
- parse
- coveringTiles
- eliminateHoles
- getElevation
- eliminateHoles
- emplaceBack
- render
- altitudeFromMercatorZ
- .handleEvent
- updateVariableAnchorsForBucket
- queryIntersectsFeature
- useAblySupabaseSync.js
- readVarint
- appendRoundCorner
- loadTile
- b
- App.jsx
- platformAuditReferee.js
- AuthContext.jsx
- convertGeometryVector
- auth/AuthModal.jsx
- placeLayerBucketPart
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- Wu
- diff
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- LandingPage.jsx
- constructor
- coveringTiles
- MASTER_DEFINITIVE_MIGRATION.sql
- useClientViewState.js
- Wu
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
- decodeFloat64Values
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
- get

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

## Communities (170 total, 43 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (557): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+549 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (522): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+514 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (576): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+568 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (519): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+511 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (225): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+217 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (210): acquire(), acquireRTT(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+202 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (255): addCommand(), addEventDefaultOptions, _addEventListener(), addImageSection(), addSource(), addTextSection(), align$1(), anchors (+247 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (257): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), anchors (+249 more)

### Community 8 - "s"
Cohesion: 0.05
Nodes (141): acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices(), calculateCameraOptionsFromTo() (+133 more)

### Community 9 - "push"
Cohesion: 0.03
Nodes (278): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _createLayers(), querySourceFeatures(), es(), gc() (+270 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (168): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+160 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (177): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+169 more)

### Community 12 - "_addDefaultHandlers"
Cohesion: 0.08
Nodes (34): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading(), generateMousePanHandler() (+26 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (160): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+152 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (159): addBucket(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+151 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (146): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+138 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.04
Nodes (117): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+109 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (159): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _calculateTransform() (+151 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (95): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+87 more)

### Community 20 - "constructor"
Cohesion: 0.03
Nodes (92): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), center() (+84 more)

### Community 21 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (106): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+98 more)

### Community 22 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (109): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+101 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (143): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addIndicesForPlacedSymbol(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+135 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (87): addLayer(), addSource(), addSprite(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction(), _createLayers() (+79 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (59): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), dn() (+51 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (137): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+129 more)

### Community 27 - "geometry"
Cohesion: 0.07
Nodes (53): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+45 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (96): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+88 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (91): _addTerrainIdealTiles(), _addTile(), _applyGlobalStateChanges(), _areDescendentsComplete(), backfillDEM(), calculateEasing(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+83 more)

### Community 30 - "featureFilter"
Cohesion: 0.07
Nodes (36): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), createTree(), expandBy(), featureFilter() (+28 more)

### Community 31 - "concat"
Cohesion: 0.05
Nodes (72): bind(), coalesce$1(), concat(), createFunction(), deepUnbundle(), evaluateCategoricalFunction(), evaluateExponentialFunction(), evaluateIdentityFunction() (+64 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (60): loadGlyphRange(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), evaluateProperties() (+52 more)

### Community 33 - "clone"
Cohesion: 0.05
Nodes (47): _createStyleImage(), dispatchRenderCallbacks(), clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+39 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (79): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getMinMaxElevation() (+71 more)

### Community 35 - "_checkLoaded"
Cohesion: 0.07
Nodes (49): addLayer(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), ei(), getFilter(), getLayer(), getLayoutProperty() (+41 more)

### Community 36 - "concat"
Cohesion: 0.04
Nodes (104): array(), assertRootKey(), bind(), checkSubtype(), coalesce$1(), concat(), createExpression(), createFunction() (+96 more)

### Community 37 - ".reset"
Cohesion: 0.05
Nodes (51): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+43 more)

### Community 38 - "queryRenderedFeatures"
Cohesion: 0.08
Nodes (38): convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), _flattenAndSortRenderedFeatures(), getAllIds(), getFeatureState(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix() (+30 more)

### Community 39 - "flyTo"
Cohesion: 0.04
Nodes (130): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+122 more)

### Community 40 - "get"
Cohesion: 0.03
Nodes (102): addDebugCollisionBoxes(), addFeature(), addFeatures(), addLineDashDependencies(), addPatternDependencies(), addSymbol(), addTextVertices(), addToSortKeyRanges() (+94 more)

### Community 41 - "constructor"
Cohesion: 0.04
Nodes (63): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+55 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (85): _diffStyle(), loadGlyphRange(), loadTileJson(), loadURL(), readImageNow(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap() (+77 more)

### Community 43 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 44 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 45 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 46 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (34): calculateFogMatrix(), calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix() (+26 more)

### Community 47 - "extend"
Cohesion: 0.04
Nodes (84): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy() (+76 more)

### Community 48 - "pointsToPolygonDistance"
Cohesion: 0.09
Nodes (43): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), getBBox(), getPolygonBBox(), getRangeSize() (+35 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (28): EmergencySOSModal(), MaalemRadarHeader(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+20 more)

### Community 50 - "dependencies"
Cohesion: 0.04
Nodes (48): ably, autoprefixer, @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies (+40 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 54 - "shapeLines"
Cohesion: 0.06
Nodes (40): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+32 more)

### Community 55 - "appendRoundCorner"
Cohesion: 0.06
Nodes (42): getTileSkewVectors(), align(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+34 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.20
Nodes (17): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), EnhancedCategoryIcon(), getSpecialtyLabel() (+9 more)

### Community 57 - "parse"
Cohesion: 0.04
Nodes (67): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+59 more)

### Community 58 - "coveringTiles"
Cohesion: 0.05
Nodes (58): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint() (+50 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (38): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+30 more)

### Community 60 - "getElevation"
Cohesion: 0.09
Nodes (35): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+27 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 62 - "emplaceBack"
Cohesion: 0.10
Nodes (33): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbols(), addTextVariableAnchorOffsets(), addVertex() (+25 more)

### Community 63 - "render"
Cohesion: 0.10
Nodes (28): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getState(), getVisibleCoordinates() (+20 more)

### Community 64 - "altitudeFromMercatorZ"
Cohesion: 0.20
Nodes (12): tileIdToLngLatBounds(), altitudeFromMercatorZ(), circumferenceAtLatitude(), getTileUnitsForMeters(), latFromMercatorY(), lngFromMercatorX(), mercatorScale(), meterInMercatorCoordinateUnits() (+4 more)

### Community 65 - ".handleEvent"
Cohesion: 0.06
Nodes (47): adjustFarPlaneByHorizonPlane(), _applyChanges(), _blockedByActive(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax() (+39 more)

### Community 66 - "updateVariableAnchorsForBucket"
Cohesion: 0.07
Nodes (46): calculateVariableRenderShift(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getPerspectiveRatio() (+38 more)

### Community 67 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (44): addToLineVertexArray(), anchorIsTooClose(), angleTo(), checkIntersection(), checkMaxAngle(), circleIntersection(), classifyRings(), dist() (+36 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.13
Nodes (36): broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId(), isCurrentUserAdmin() (+28 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 70 - "appendRoundCorner"
Cohesion: 0.09
Nodes (25): fov(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromQuat$1() (+17 more)

### Community 71 - "loadTile"
Cohesion: 0.12
Nodes (23): _afterTileLoadWorkerResponse(), clearTextures(), destroy(), doOnceCompleted(), _getLoadGeoJSONParameters(), _getNeighboringTiles(), _getOverzoomParameters(), getRTLTextPluginStatus() (+15 more)

### Community 72 - "b"
Cohesion: 0.13
Nodes (19): b(), Cy(), determineAverageLineWidth(), determineLineBreaks(), interpolate(), toString(), fy, getMaxImageSize() (+11 more)

### Community 73 - "App.jsx"
Cohesion: 0.11
Nodes (22): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+14 more)

### Community 74 - "platformAuditReferee.js"
Cohesion: 0.28
Nodes (9): AdminDashboard(), MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, getCoordinatesFromDistrict(), auditPlatformState(), healPlatformState(), normalizeIntervention() (+1 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.13
Nodes (29): useAuthModalLogic(), ClientPhoneRequirementModal(), COUNTRY_DIAL_CODES, MOROCCAN_CITIES, AuthContext, AuthProvider(), app, auth (+21 more)

### Community 76 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+8 more)

### Community 78 - "placeLayerBucketPart"
Cohesion: 0.08
Nodes (30): _applyDiffToSource(), _applyResourceTiming(), attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate() (+22 more)

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
Nodes (35): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+27 more)

### Community 83 - "diff"
Cohesion: 0.27
Nodes (11): addCommand(), addSource(), canUpdateGeoJSON(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById() (+3 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.09
Nodes (39): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+31 more)

### Community 89 - "LandingPage.jsx"
Cohesion: 0.10
Nodes (22): CATEGORIES_TAXONOMY, CategorySelector(), ClientSosForm(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer() (+14 more)

### Community 90 - "constructor"
Cohesion: 0.03
Nodes (92): add(), addImages(), backfillBorder(), breakLines(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax() (+84 more)

### Community 91 - "coveringTiles"
Cohesion: 0.07
Nodes (39): allowVariableZoom(), allowWorldCopies(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), getCameraFrustum(), getCameraPoint() (+31 more)

### Community 92 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 93 - "useClientViewState.js"
Cohesion: 0.14
Nodes (20): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientHistoryList(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity(), getServiceDisplay() (+12 more)

### Community 94 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

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
Cohesion: 0.05
Nodes (46): checkChild(), classifyChildren(), classifyFilter(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1() (+38 more)

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

### Community 121 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 173 - "get"
Cohesion: 0.03
Nodes (104): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+96 more)

## Knowledge Gaps
- **462 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+457 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `flyTo` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `featureFilter`, `constructor`, `b`, `push`, `get`, `_addDefaultHandlers`, `get`, `_calcMatrices`, `constructor`, `coveringTiles`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `.handleEvent`, `public/maplibre-gl-dev.mjs`, `concat`, `queryRenderedFeatures`, `loadTile`, `get`, `s`, `public/maplibre-gl-worker-dev.mjs`, `get`, `_calcMatrices`, `n`, `update`, `decodeGeometryColumn`, `appendRoundCorner`, `coveringTiles`, `._update`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `x()` connect `flyTo` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `featureFilter`, `constructor`, `push`, `get`, `_addDefaultHandlers`, `get`, `_calcMatrices`, `constructor`, `coveringTiles`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _462 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0051841988459831335 - nodes in this community are weakly interconnected._
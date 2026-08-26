# Graph Report - bricolemoi  (2026-08-26)

## Corpus Check
- 122 files · ~812,679 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10271 nodes · 29742 edges · 164 communities (122 shown, 42 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dfc5cf71`
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
- push
- n
- get
- get
- s
- get
- get
- _calcMatrices
- flyTo
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
- geometry
- ._update
- update
- get
- concat
- assets/maplibre-gl-worker-dev.mjs
- loadTile
- assets/maplibre-gl-worker.mjs
- constructor
- concat
- evaluate
- render
- _checkLoaded
- clone
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- Wu
- .handleEvent
- serialize
- addFeature
- geometry
- AppContext.jsx
- dependencies
- writeMessage
- writeMessage
- populate
- shapeLines
- shapeLines
- MaalemView.jsx
- extend
- resize
- eliminateHoles
- getElevation
- eliminateHoles
- getChildren
- queryIntersectsFeature
- coveringTiles
- sub
- getElevation
- queryIntersectsFeature
- parseCssColor
- extend
- resize
- appendRoundCorner
- readVarint
- AuthContext.jsx
- placeLayerBucketPart
- infobipAuthService.js
- renderLayer
- ClientView.jsx
- convertGeometryVector
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- b
- mergeSourceDiffs
- deepEqual
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- LandingPage.jsx
- update
- Wu
- decodeFloat64Values
- decodeFloat64Values
- convertGeometryVector
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- InteractiveMap.jsx
- MASTER_DEFINITIVE_MIGRATION.sql
- schema.sql
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- admin_auth_and_audit.sql
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- backend_optimizations.sql
- public.transactions
- public.is_admin
- vercel.json
- sw.js
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
- evaluate

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

## Communities (164 total, 42 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (518): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+510 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (548): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+540 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (515): quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+507 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (563): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+555 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (222): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+214 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (209): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+201 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (242): addCommand(), addEventDefaultOptions, _addEventListener(), addImageSection(), addSource(), addTextSection(), align$1(), anchors (+234 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (234): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith(), angleWithSep() (+226 more)

### Community 8 - "push"
Cohesion: 0.03
Nodes (271): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _createLayers(), querySourceFeatures(), es(), gc() (+263 more)

### Community 9 - "n"
Cohesion: 0.03
Nodes (182): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+174 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (169): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+161 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (185): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+177 more)

### Community 12 - "s"
Cohesion: 0.06
Nodes (131): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+123 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (153): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+145 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (159): atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+151 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (111): adjustAntiMeridian(), apply(), _calcMatrices(), calculateCenterFromCameraLngLatAlt(), calculateEasing(), _calculateNearFarZIfNeeded(), cameraForBounds(), cameraForBoxAndBearing() (+103 more)

### Community 16 - "flyTo"
Cohesion: 0.04
Nodes (130): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+122 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (150): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+142 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (134): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+126 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (107): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+99 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (130): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+122 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (139): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), backfillBorder(), calculateGlyphDependencies(), clear(), columnToField(), columnTypeHasChildren() (+131 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+117 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (103): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+95 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (87): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+79 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (92): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getElevationForLngLatZoom() (+84 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (125): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+117 more)

### Community 27 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (110): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _applyResourceTiming(), backgroundPatternUniformValues() (+102 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (117): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+109 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (91): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bb() (+83 more)

### Community 31 - "concat"
Cohesion: 0.05
Nodes (82): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+74 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (55): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData(), groupByLayout() (+47 more)

### Community 33 - "loadTile"
Cohesion: 0.05
Nodes (53): _afterTileLoadWorkerResponse(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), _diffStyle(), doOnceCompleted(), _downloadAndCacheRangePromise() (+45 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (69): _computeClippingPlane(), _createStyleImage(), _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers() (+61 more)

### Community 35 - "constructor"
Cohesion: 0.03
Nodes (93): add(), addImages(), array(), assertRootKey(), bucketIndex(), checkSubtype(), clone(), constructor() (+85 more)

### Community 36 - "concat"
Cohesion: 0.04
Nodes (96): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+88 more)

### Community 37 - "evaluate"
Cohesion: 0.04
Nodes (59): _addEventListener(), addGlobalState(), addTextVertices(), array(), _calculate(), checkSubtype(), clamp$1(), constrainAngle() (+51 more)

### Community 38 - "render"
Cohesion: 0.05
Nodes (55): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), getDEMElevation(), _getDEMTileMatrix() (+47 more)

### Community 39 - "_checkLoaded"
Cohesion: 0.07
Nodes (49): addLayer(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), ei(), getFilter(), getLayer(), getLayoutProperty() (+41 more)

### Community 40 - "clone"
Cohesion: 0.05
Nodes (49): angle(), appendRoundCorner(), clone(), clone$1(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst() (+41 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (67): add(), addImages(), applyTextFit(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax() (+59 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (65): readImageNow(), addProtocol(), assertRootKey(), br(), clipGeometry(), computeVideoFrameParameters(), createExpression(), evaluateProperties() (+57 more)

### Community 43 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 44 - "Wu"
Cohesion: 0.10
Nodes (28): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+20 more)

### Community 45 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 46 - "serialize"
Cohesion: 0.06
Nodes (40): _createStyleImage(), breakLines(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize() (+32 more)

### Community 47 - "addFeature"
Cohesion: 0.04
Nodes (70): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+62 more)

### Community 48 - "geometry"
Cohesion: 0.07
Nodes (57): _updatePatternAtlas(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry() (+49 more)

### Community 49 - "AppContext.jsx"
Cohesion: 0.11
Nodes (38): EmergencySOSModal(), PushNotificationBanner(), AppContext, AppProvider(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+30 more)

### Community 50 - "dependencies"
Cohesion: 0.04
Nodes (47): ably, autoprefixer, @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies (+39 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "populate"
Cohesion: 0.05
Nodes (52): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), charInRTLScript(), charInSupportedScript(), codePointRequiresComplexTextShaping(), constantOr(), containsRTLText() (+44 more)

### Community 54 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 55 - "shapeLines"
Cohesion: 0.06
Nodes (46): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+38 more)

### Community 56 - "MaalemView.jsx"
Cohesion: 0.19
Nodes (22): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+14 more)

### Community 57 - "extend"
Cohesion: 0.04
Nodes (84): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy() (+76 more)

### Community 58 - "resize"
Cohesion: 0.08
Nodes (35): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), createQuadTriangles(), dispatchRenderCallbacks(), _finishLoading(), generateMousePanHandler() (+27 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 60 - "getElevation"
Cohesion: 0.09
Nodes (33): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), pathSlicedToLongestUnoccluded() (+25 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 63 - "queryIntersectsFeature"
Cohesion: 0.04
Nodes (58): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+50 more)

### Community 64 - "coveringTiles"
Cohesion: 0.06
Nodes (44): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+36 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.05
Nodes (59): calculatePosMatrix(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getFastPathSimpleProjectionMatrix() (+51 more)

### Community 67 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 68 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 69 - "extend"
Cohesion: 0.04
Nodes (79): _afterEase(), _applyChanges(), applyUpdatedTransform(), bearing(), _blockedByActive(), calculateCameraOptionsFromTo(), dblclick(), _ease() (+71 more)

### Community 70 - "resize"
Cohesion: 0.16
Nodes (18): _addDefaultHandlers(), assignEvents(), createQuadTriangles(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+10 more)

### Community 71 - "appendRoundCorner"
Cohesion: 0.16
Nodes (15): angle(), appendRoundCorner(), clone$1(), dot$1(), fromValues(), getAngleDelta(), getTileUnitsForMeters(), mercatorScale() (+7 more)

### Community 72 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 73 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (26): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+18 more)

### Community 74 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 75 - "infobipAuthService.js"
Cohesion: 0.27
Nodes (18): AuthModal(), AuthProvider(), checkAndRecordOtpRateLimit(), checkPhoneProfile(), formatInternationalPhone(), formatMoroccanPhone(), getLocalPin(), getPhoneCandidateVariants() (+10 more)

### Community 76 - "renderLayer"
Cohesion: 0.17
Nodes (12): acquireRTT(), bindRTT(), getRTT(), getTexture(), renderLayer(), at(), Dm(), dr (+4 more)

### Community 77 - "ClientView.jsx"
Cohesion: 0.13
Nodes (22): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), VoiceAudioPlayer() (+14 more)

### Community 78 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.40
Nodes (4): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "b"
Cohesion: 0.10
Nodes (24): loadURL(), mo(), b(), determineAverageLineWidth(), determineLineBreaks(), interpolate(), toString(), fy (+16 more)

### Community 82 - "mergeSourceDiffs"
Cohesion: 0.28
Nodes (9): _applyDiffToSource(), applySourceDiff(), demoteFeatureIds(), diffToHashed(), getFeatureId(), hashedToDiff(), mergeSourceDiffs(), promoteFeatureIds() (+1 more)

### Community 83 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.06
Nodes (59): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+51 more)

### Community 89 - "LandingPage.jsx"
Cohesion: 0.15
Nodes (13): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, translations (+5 more)

### Community 90 - "update"
Cohesion: 0.09
Nodes (28): compareMax(), emplace(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions(), hasDataProperty() (+20 more)

### Community 91 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 92 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 93 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 94 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

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

### Community 99 - "InteractiveMap.jsx"
Cohesion: 0.32
Nodes (7): getMapIconSvg(), getMapStyleJson(), InteractiveMap(), MAP_STYLES, ROAD_COLOR_THEMES, SVG_ICONS, calculateDistanceInKm()

### Community 100 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 101 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 106 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 111 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 173 - "evaluate"
Cohesion: 0.04
Nodes (88): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addGlobalState() (+80 more)

## Knowledge Gaps
- **454 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+449 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `update`, `readVarint`, `get`, `_calcMatrices`, `constructor`, `get`, `resize`, `update`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `update`, `n`, `readVarint`, `get`, `_calcMatrices`, `constructor`, `get`, `resize`, `update`, `get`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `constructor`, `assets/maplibre-gl-dev.mjs`, `render`, `appendRoundCorner`, `n`, `s`, `.handleEvent`, `get`, `serialize`, `_calcMatrices`, `get`, `sub`, `._update`, `extend`, `resize`, `update`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _454 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0056614358633986 - nodes in this community are weakly interconnected._
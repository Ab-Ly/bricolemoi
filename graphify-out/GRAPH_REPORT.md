# Graph Report - bricolemoi  (2026-08-28)

## Corpus Check
- 180 files · ~823,552 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10385 nodes · 30152 edges · 130 communities (115 shown, 15 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `caae8ea3`
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
- _checkLoaded
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
- addFeature
- ._update
- update
- get
- concat
- assets/maplibre-gl-worker-dev.mjs
- render
- assets/maplibre-gl-worker.mjs
- .handleEvent
- concat
- parseCssColor
- geometry
- flyTo
- evaluate
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- evaluate
- queryIntersectsFeature
- devDependencies
- coveringTiles
- geometry
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- addFeature
- shapeLines
- appendRoundCorner
- AdminDashboard.jsx
- constructor
- Od
- eliminateHoles
- updateVariableAnchorsForBucket
- eliminateHoles
- parseCssColor
- placeLayerBucketPart
- hasDebugData
- sub
- getElevation
- populate
- useAblySupabaseSync.js
- readVarint
- deepEqual
- extend
- convertGeometryVector
- App.jsx
- @supabase/supabase-js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- .handleEvent
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- Wu
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- appendRoundCorner
- extend
- ga
- useClientViewState.js
- LandingPage.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- placeLayerBucketPart
- convertGeometryVector
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- deepEqual
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- maalem/MaalemView.jsx
- vercel.json
- sw.js
- decodeFloat64Values
- simulate.js
- logs.js
- telemetry.js
- audit.js
- reconcile.js
- package.json
- decodeFloat64Values
- watch-deploy.js
- framer-motion

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

## Communities (130 total, 15 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (560): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+552 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (499): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+491 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (548): Ms(), quadrant(), Ru(), Aa(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+540 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (537): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+529 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (219): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+211 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (211): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+203 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (239): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+231 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (237): readImageNow(), addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+229 more)

### Community 8 - "s"
Cohesion: 0.05
Nodes (135): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+127 more)

### Community 9 - "push"
Cohesion: 0.03
Nodes (270): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _createLayers(), querySourceFeatures(), es(), gc() (+262 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (186): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+178 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (197): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+189 more)

### Community 12 - "_checkLoaded"
Cohesion: 0.07
Nodes (48): addLayer(), addSource(), _applyGlobalStateChanges(), _checkLoaded(), ei(), getFilter(), getLayer(), getLayoutProperty() (+40 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (159): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+151 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (141): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+133 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (157): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+149 more)

### Community 16 - "n"
Cohesion: 0.04
Nodes (168): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+160 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (167): adjustAntiMeridian(), _afterEase(), allowVariableZoom(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo() (+159 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (109): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+101 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (99): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _clearSource() (+91 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (108): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+100 more)

### Community 21 - "get"
Cohesion: 0.04
Nodes (116): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+108 more)

### Community 22 - "get"
Cohesion: 0.04
Nodes (116): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+108 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (119): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+111 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (113): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), _clearSource() (+105 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (70): _getOperationsToPerform(), loadURL(), mf(), mo(), rs(), serialize(), _serializeByIds(), _serializedAllLayers() (+62 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (128): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addIndicesForPlacedSymbol(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+120 more)

### Community 27 - "addFeature"
Cohesion: 0.07
Nodes (51): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+43 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (86): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+78 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (89): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+81 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (94): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bb() (+86 more)

### Community 31 - "concat"
Cohesion: 0.04
Nodes (87): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+79 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (57): _updatePatternAtlas(), addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData() (+49 more)

### Community 33 - "render"
Cohesion: 0.11
Nodes (25): anyTilesAfterTime(), commit(), destruct(), equals(), getAnisotropicFilterPitch(), getCenterClampedToGround(), _handleTerrainDataEvent(), isHidden() (+17 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (95): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getMinMaxElevation() (+87 more)

### Community 35 - ".handleEvent"
Cohesion: 0.04
Nodes (71): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+63 more)

### Community 36 - "concat"
Cohesion: 0.04
Nodes (102): assertRootKey(), bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1() (+94 more)

### Community 37 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 38 - "geometry"
Cohesion: 0.07
Nodes (55): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+47 more)

### Community 39 - "flyTo"
Cohesion: 0.03
Nodes (134): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+126 more)

### Community 40 - "evaluate"
Cohesion: 0.04
Nodes (73): _addEventListener(), addGlobalState(), addTextVertices(), allowsLetterSpacing(), array(), _calculate(), calculateScaledKey(), calculateTileKey() (+65 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (82): add(), addImages(), applyPropertyUpdates(), applySourceDiff(), backfillBorder(), breakLines(), bucketIndex(), completeTask() (+74 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.07
Nodes (49): addProtocol(), br(), clipGeometry(), createStyleLayer(), fromVectorTileJs(), Point(), register(), removeProtocol() (+41 more)

### Community 43 - "readVarint"
Cohesion: 0.08
Nodes (39): bbox(), decode(), decodeString$2(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes() (+31 more)

### Community 44 - "evaluate"
Cohesion: 0.04
Nodes (60): calculateVariableRenderShift(), addDebugCollisionBoxes(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), _calculate() (+52 more)

### Community 45 - "queryIntersectsFeature"
Cohesion: 0.03
Nodes (77): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree() (+69 more)

### Community 46 - "devDependencies"
Cohesion: 0.13
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+7 more)

### Community 47 - "coveringTiles"
Cohesion: 0.07
Nodes (41): allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), finish(), _flattenAndSortRenderedFeatures(), getAllIds() (+33 more)

### Community 48 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.15
Nodes (26): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+18 more)

### Community 50 - "dependencies"
Cohesion: 0.11
Nodes (19): ably, @aws-sdk/client-s3, firebase, lucide-react, maplibre-gl, dependencies, ably, @aws-sdk/client-s3 (+11 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "addFeature"
Cohesion: 0.06
Nodes (55): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+47 more)

### Community 54 - "shapeLines"
Cohesion: 0.08
Nodes (33): align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+25 more)

### Community 55 - "appendRoundCorner"
Cohesion: 0.06
Nodes (44): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+36 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.14
Nodes (24): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), ClientHistoryList() (+16 more)

### Community 57 - "constructor"
Cohesion: 0.02
Nodes (126): add(), addImages(), array(), assertRootKey(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey() (+118 more)

### Community 58 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "updateVariableAnchorsForBucket"
Cohesion: 0.06
Nodes (53): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getPerspectiveRatio(), getPitchedTextCorrection() (+45 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 63 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 64 - "hasDebugData"
Cohesion: 0.18
Nodes (12): addDebugCollisionBoxes(), destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData() (+4 more)

### Community 65 - "sub"
Cohesion: 0.06
Nodes (56): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+48 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (43): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+35 more)

### Community 67 - "populate"
Cohesion: 0.04
Nodes (62): addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), clone(), constantOr(), _convertFromCellCoord(), convertInOp$1() (+54 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.11
Nodes (42): NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage() (+34 more)

### Community 69 - "readVarint"
Cohesion: 0.07
Nodes (43): bbox(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), getFeatures(), getValue(), getValueFromBuffer() (+35 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "extend"
Cohesion: 0.03
Nodes (101): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), calculateTranslation() (+93 more)

### Community 72 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 73 - "App.jsx"
Cohesion: 0.11
Nodes (23): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+15 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.14
Nodes (29): useAuthModalLogic(), UserProfileModal(), COUNTRY_DIAL_CODES, MOROCCAN_CITIES, AuthContext, AuthProvider(), app, auth (+21 more)

### Community 76 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+6 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (16): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+8 more)

### Community 78 - ".handleEvent"
Cohesion: 0.03
Nodes (75): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+67 more)

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
Cohesion: 0.10
Nodes (28): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+20 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (45): checkIntersection(), circleIntersection(), classifyRings(), compareMax(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), findPoleOfInaccessibility() (+37 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.06
Nodes (58): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+50 more)

### Community 89 - "appendRoundCorner"
Cohesion: 0.16
Nodes (15): angle(), appendRoundCorner(), clone$1(), dot$1(), fromValues(), getAngleDelta(), getTileUnitsForMeters(), mercatorScale() (+7 more)

### Community 91 - "extend"
Cohesion: 0.03
Nodes (86): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), calculateTileRatio(), calculateTranslation(), _charUsesLocalIdeographFontFamily() (+78 more)

### Community 92 - "ga"
Cohesion: 0.09
Nodes (27): allowVariableZoom(), allowWorldCopies(), _computeClippingPlane(), distanceToTile2d(), distanceX(), distanceY(), Dp(), ga() (+19 more)

### Community 93 - "useClientViewState.js"
Cohesion: 0.13
Nodes (21): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity(), getServiceDisplay() (+13 more)

### Community 94 - "LandingPage.jsx"
Cohesion: 0.10
Nodes (23): CATEGORIES_TAXONOMY, CategorySelector(), ClientSosForm(), LandingPage(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES (+15 more)

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

### Community 100 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 101 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 106 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 111 - "maalem/MaalemView.jsx"
Cohesion: 0.18
Nodes (14): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemTransactionsModal(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), useMaalemViewState() (+6 more)

### Community 119 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 121 - "simulate.js"
Cohesion: 0.29
Nodes (7): __dirname, envPath, envVars, __filename, runSimulation(), sleep(), supabase

### Community 122 - "logs.js"
Cohesion: 0.15
Nodes (9): ably, adminChannel, C, __dirname, envPath, envVars, __filename, jobsChannel (+1 more)

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 174 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

## Knowledge Gaps
- **492 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+487 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `flyTo` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `get`, `readVarint`, `queryIntersectsFeature`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `push`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `flyTo` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `push`, `get`, `readVarint`, `queryIntersectsFeature`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `push`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `public/maplibre-gl-shared.mjs`, `populate`, `get`, `_calcMatrices`, `constructor`, `update`, `queryIntersectsFeature`, `get`, `push`, `public/maplibre-gl-worker.mjs`, `ga`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _492 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005107774032076821 - nodes in this community are weakly interconnected._
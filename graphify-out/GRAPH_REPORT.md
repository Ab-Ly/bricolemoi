# Graph Report - bricolemoi  (2026-08-28)

## Corpus Check
- 189 files · ~829,274 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10437 nodes · 30239 edges · 159 communities (142 shown, 17 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70a29a63`
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
- push
- get
- get
- concat
- get
- get
- _calcMatrices
- n
- _calcMatrices
- constructor
- update
- constructor
- get
- decodeGeometryColumn
- push
- ._update
- public/maplibre-gl-worker.mjs
- push
- evaluate
- ._update
- update
- get
- n
- assets/maplibre-gl-worker-dev.mjs
- extend
- assets/maplibre-gl-worker.mjs
- .handleEvent
- concat
- constructor
- parse
- s
- get
- constructor
- public/maplibre-gl-worker-dev.mjs
- constructor
- pointsToPolygonDistance
- featureFilter
- devDependencies
- .handleEvent
- geometry
- EmergencyFlowContext.jsx
- dependencies
- loadGeometry
- writeMessage
- addFeature
- shapeLines
- shapeLines
- AdminDashboard.jsx
- has
- queryIntersectsFeature
- eliminateHoles
- getElevation
- eliminateHoles
- parse
- coveringTiles
- parseCssColor
- sub
- getElevation
- featureFilter
- useAblySupabaseSync.js
- readVarint
- deepEqual
- loadTile
- push
- App.jsx
- @supabase/supabase-js
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- interpolate
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- parse
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- appendRoundCorner
- serialize
- extend
- load
- useClientViewState.js
- semanticSearchService.js
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- constructor
- placeLayerBucketPart
- update
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- deepEqual
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- preventDefault
- hasData
- vo
- vercel.json
- sw.js
- clean_test_data.js
- emplaceBack
- simulate.js
- logs.js
- telemetry.js
- loadTile
- list_all_data.js
- ga
- b
- Hd
- reset
- li
- _checkLoaded
- coveringTiles
- ablyRealtimeService.js
- update
- maalem/MaalemView.jsx
- appendRoundCorner
- populate
- ja
- parseCssColor
- _addDefaultHandlers
- CentrifugoClient
- translate
- mo
- decodeFloat64Values
- supabase-status.js
- 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS
- deploy.sh
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

## Communities (159 total, 17 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (151): aa(), acquire(), addBucket(), addDash(), addRegularDash(), addRoundDash(), Ai(), ao() (+143 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (575): _a(), aa(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+567 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (206): addImageSection(), addTextSection(), angleWith(), angleWithSep(), ap(), Ay(), bb(), Bd() (+198 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (496): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+488 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (220): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+212 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (227): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+219 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (242): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+234 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (252): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), allowsLetterSpacing(), anchors (+244 more)

### Community 8 - "flyTo"
Cohesion: 0.04
Nodes (109): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+101 more)

### Community 9 - "push"
Cohesion: 0.03
Nodes (175): ac(), add(), addIndicesForPlacedSymbol(), addSymbols(), addTileFeatures(), addToLineVertexArray(), addToSortKeyRanges(), ah() (+167 more)

### Community 10 - "get"
Cohesion: 0.05
Nodes (130): _a(), ad(), al(), bind(), Bu(), _buildSkirts(), $c(), calculatePosMatrix() (+122 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (171): ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu(), _buildSkirts() (+163 more)

### Community 12 - "concat"
Cohesion: 0.05
Nodes (75): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+67 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (171): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+163 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (157): atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures() (+149 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (116): angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing() (+108 more)

### Community 16 - "n"
Cohesion: 0.06
Nodes (128): bd(), calculateCenterFromCameraLngLatAlt(), ci(), _computeTileBoundingVolume(), es(), gc(), getTileBoundingVolume(), Ls() (+120 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+135 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (158): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+150 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (96): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+88 more)

### Community 20 - "constructor"
Cohesion: 0.03
Nodes (97): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), center() (+89 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), addTextVertices(), backfillBorder(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector() (+117 more)

### Community 22 - "decodeGeometryColumn"
Cohesion: 0.04
Nodes (108): columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded(), createFlatGpuVector() (+100 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (115): sphereSurfacePointToCoordinates(), addFeature$1(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint(), addPointsTileFeature(), addTileFeatures() (+107 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (91): addLayer(), addSource(), addSprite(), _checkLoaded(), clearTextures(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+83 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (83): fromCenterSizeAngles(), Fs(), mf(), mo(), ns(), rs(), al, bt() (+75 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (127): _normalizeBearing(), sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+119 more)

### Community 27 - "evaluate"
Cohesion: 0.04
Nodes (93): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addDynamicAttributes(), addFeature(), addFeatures() (+85 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (112): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+104 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (98): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _applyGlobalStateChanges(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles() (+90 more)

### Community 30 - "get"
Cohesion: 0.06
Nodes (80): calculateCameraOptionsFromTo(), _createLayers(), ac(), add(), ax, bs(), bx(), concat() (+72 more)

### Community 31 - "n"
Cohesion: 0.03
Nodes (182): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), coalesceChanges() (+174 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (50): addProtocol(), br(), createStyleLayer(), fromVectorTileJs(), getImageData(), Point(), readImageDataUsingOffscreenCanvas(), register() (+42 more)

### Community 33 - "extend"
Cohesion: 0.06
Nodes (54): adjustAntiMeridian(), _afterEase(), backgroundPatternUniformValues(), bearing(), bgPatternUniformValues(), calculateTileRatio(), cameraForBounds(), _ease() (+46 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (69): _computeClippingPlane(), _createStyleImage(), _getOperationsToPerform(), mf(), rs(), serialize(), _serializeByIds(), _serializedAllLayers() (+61 more)

### Community 35 - ".handleEvent"
Cohesion: 0.11
Nodes (22): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches(), hasChange() (+14 more)

### Community 36 - "concat"
Cohesion: 0.05
Nodes (76): bind(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1(), convertNegation() (+68 more)

### Community 37 - "constructor"
Cohesion: 0.02
Nodes (135): add(), addClassName(), _addDefaultHandlers(), addTo(), af(), _applyChanges(), _blockedByActive(), _cancelRenderFrame() (+127 more)

### Community 38 - "parse"
Cohesion: 0.07
Nodes (42): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+34 more)

### Community 39 - "s"
Cohesion: 0.06
Nodes (130): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateFogBlendOpacity() (+122 more)

### Community 40 - "get"
Cohesion: 0.03
Nodes (89): addDebugCollisionBoxes(), addIndicesForPlacedSymbol(), addLineDashDependencies(), addPatternDependencies(), addSymbol(), addTextVertices(), addToSortKeyRanges(), allowsVerticalWritingMode() (+81 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (66): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+58 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (60): readImageNow(), addProtocol(), br(), clipGeometry(), computeVideoFrameParameters(), createStyleLayer(), fromVectorTileJs(), getImageData() (+52 more)

### Community 43 - "constructor"
Cohesion: 0.03
Nodes (82): addImages(), bbox(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), containsMaxSafeIntegerValues(), copy() (+74 more)

### Community 44 - "pointsToPolygonDistance"
Cohesion: 0.07
Nodes (49): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+41 more)

### Community 45 - "featureFilter"
Cohesion: 0.05
Nodes (47): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), evaluateProperties() (+39 more)

### Community 46 - "devDependencies"
Cohesion: 0.13
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+7 more)

### Community 47 - ".handleEvent"
Cohesion: 0.09
Nodes (31): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _fireEvents(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler() (+23 more)

### Community 48 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (27): EmergencySOSModal(), MaalemRadarHeader(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer() (+19 more)

### Community 50 - "dependencies"
Cohesion: 0.11
Nodes (19): ably, @aws-sdk/client-s3, firebase, lucide-react, maplibre-gl, dependencies, ably, @aws-sdk/client-s3 (+11 more)

### Community 51 - "loadGeometry"
Cohesion: 0.07
Nodes (49): command(), loadGeometry(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean() (+41 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "addFeature"
Cohesion: 0.07
Nodes (55): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addFeatures() (+47 more)

### Community 54 - "shapeLines"
Cohesion: 0.05
Nodes (46): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+38 more)

### Community 55 - "shapeLines"
Cohesion: 0.09
Nodes (29): calculateVariableRenderShift(), align(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charInComplexShapingScript(), charIsWhitespace() (+21 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.16
Nodes (21): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), NewUserRegistrationStep(), ClientHistoryList() (+13 more)

### Community 57 - "has"
Cohesion: 0.06
Nodes (38): add(), compareMax(), emplace(), filter(), findPoleOfInaccessibility(), getAndRemove(), _getAndRemoveByKey(), getCentroidCell() (+30 more)

### Community 58 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (42): area(), buildBlockIndex(), clear(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+34 more)

### Community 60 - "getElevation"
Cohesion: 0.07
Nodes (41): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+33 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "parse"
Cohesion: 0.07
Nodes (44): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+36 more)

### Community 63 - "coveringTiles"
Cohesion: 0.05
Nodes (57): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+49 more)

### Community 64 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (42): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+34 more)

### Community 67 - "featureFilter"
Cohesion: 0.07
Nodes (37): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), expandBy() (+29 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.13
Nodes (36): AdminRealtimeConsole(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+28 more)

### Community 69 - "readVarint"
Cohesion: 0.08
Nodes (37): loadGlyphRange(), bbox(), getArrayBuffer(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes() (+29 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "loadTile"
Cohesion: 0.06
Nodes (43): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), demoteFeatureIds(), _diffStyle(), diffToHashed() (+35 more)

### Community 72 - "push"
Cohesion: 0.04
Nodes (90): addIndicesForPlacedSymbol(), addTileFeatures(), ah(), appendLeaves(), Bf(), bh(), cg(), ch() (+82 more)

### Community 73 - "App.jsx"
Cohesion: 0.13
Nodes (24): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), BottomNav() (+16 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (29): useAuthModalLogic(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), AuthContext, AuthProvider() (+21 more)

### Community 76 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+7 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.11
Nodes (14): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+6 more)

### Community 78 - "interpolate"
Cohesion: 0.07
Nodes (39): breakLines(), completeTask(), deserialize(), freeBufferAfterUpload(), from(), getArrayValueLength(), getClassRegistryKey(), getProtocol() (+31 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.33
Nodes (4): __dirname, envPath, envVars, __filename

### Community 82 - "parse"
Cohesion: 0.04
Nodes (61): fromInvProjectionMatrix(), getRayDirectionFromPixel(), ic(), Ms(), Ps(), rayPlanetIntersection(), rc(), bm() (+53 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.06
Nodes (58): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+50 more)

### Community 89 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 90 - "serialize"
Cohesion: 0.07
Nodes (37): completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey() (+29 more)

### Community 91 - "extend"
Cohesion: 0.03
Nodes (94): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), _createStyleImage() (+86 more)

### Community 92 - "load"
Cohesion: 0.04
Nodes (60): addControl(), addImage(), _afterImageUpdated(), ba(), bl(), _charUsesLocalIdeographFontFamily(), _createStyleImage(), _createTinySDF() (+52 more)

### Community 93 - "useClientViewState.js"
Cohesion: 0.10
Nodes (27): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity(), getServiceDisplay() (+19 more)

### Community 94 - "semanticSearchService.js"
Cohesion: 0.14
Nodes (16): CATEGORIES_TAXONOMY, CategorySelector(), ClientSosForm(), getSupportedMimeType(), VoiceRecorder(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, searchInstantMeili() (+8 more)

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

### Community 99 - "constructor"
Cohesion: 0.05
Nodes (55): addImages(), as(), backfillBorder(), bbox(), calculateScaledKey(), cm(), completeTask(), constructor() (+47 more)

### Community 100 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 101 - "update"
Cohesion: 0.05
Nodes (53): acquireRTT(), _addTerrainIdealTiles(), anyTilesAfterTime(), bindRTT(), commit(), _dataHandler(), destruct(), equals() (+45 more)

### Community 106 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 110 - "preventDefault"
Cohesion: 0.06
Nodes (46): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+38 more)

### Community 111 - "hasData"
Cohesion: 0.06
Nodes (49): _addTile(), _areDescendentsComplete(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold(), _clearTileReloadTimer(), clearTiles() (+41 more)

### Community 112 - "vo"
Cohesion: 0.07
Nodes (40): attemptAnchorPlacement(), bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho() (+32 more)

### Community 118 - "clean_test_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 119 - "emplaceBack"
Cohesion: 0.07
Nodes (46): _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addFeature(), addFeatures(), addHalfVertex(), addLine(), addSymbols() (+38 more)

### Community 121 - "simulate.js"
Cohesion: 0.33
Nodes (6): __dirname, envPath, envVars, __filename, runSimulation(), sleep()

### Community 122 - "logs.js"
Cohesion: 0.15
Nodes (9): ably, adminChannel, C, __dirname, envPath, envVars, __filename, jobsChannel (+1 more)

### Community 126 - "loadTile"
Cohesion: 0.06
Nodes (39): _afterTileLoadWorkerResponse(), clearTextures(), createVertexArray(), destroy(), _diffStyle(), _disposeTexture(), enableAttributes(), freshBind() (+31 more)

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 128 - "ga"
Cohesion: 0.06
Nodes (39): allowVariableZoom(), allowWorldCopies(), _calculateNearFarZIfNeeded(), _computePreZoomAroundLoc(), Dp(), _elevateCameraIfInsideTerrain(), ga(), getCameraAltitude() (+31 more)

### Community 129 - "b"
Cohesion: 0.08
Nodes (39): b(), Cy(), determineAverageLineWidth(), determineLineBreaks(), getMaxImageSize(), getMaxScale(), getSection(), getSectionIndex() (+31 more)

### Community 130 - "Hd"
Cohesion: 0.07
Nodes (37): ad, am(), at(), convert(), Dd(), distSqr(), Dm(), equals() (+29 more)

### Community 131 - "reset"
Cohesion: 0.09
Nodes (37): bf(), _calculateTransform(), contextmenu(), dblclick(), dragEnd(), dragMove(), dragStart(), _fireEvent() (+29 more)

### Community 132 - "li"
Cohesion: 0.06
Nodes (35): _applyDiffToSource(), _applyResourceTiming(), Ar(), ca(), _dispatchWorkerUpdate(), extend(), getBounds(), getData() (+27 more)

### Community 133 - "_checkLoaded"
Cohesion: 0.13
Nodes (33): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), getFilter(), getLayer(), getLayoutProperty() (+25 more)

### Community 134 - "coveringTiles"
Cohesion: 0.09
Nodes (31): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), _flattenAndSortRenderedFeatures() (+23 more)

### Community 135 - "ablyRealtimeService.js"
Cohesion: 0.14
Nodes (15): ErrorBoundary, useAblyPresence(), ABLY_CHANNELS, getAblyClient(), getStableAnonymousClientId(), isAblyConfigured, activeChannels, getOrCreateAblyChannel() (+7 more)

### Community 136 - "update"
Cohesion: 0.09
Nodes (28): Cd(), emplace(), expandBy(), feature(), getId(), getPositionIds(), getPositions(), hf() (+20 more)

### Community 137 - "maalem/MaalemView.jsx"
Cohesion: 0.17
Nodes (16): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemTransactionsModal(), MaalemUnfeasibleModal(), MaalemWalletModal(), MaalemWelcomeWhatsAppBanner(), useMaalemViewState() (+8 more)

### Community 138 - "appendRoundCorner"
Cohesion: 0.11
Nodes (23): shouldReloadTile(), tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1() (+15 more)

### Community 139 - "populate"
Cohesion: 0.10
Nodes (23): addDebugCollisionBoxes(), addLineDashDependencies(), calculateGlyphDependencies(), constantOr(), destroy(), destroyDebugData(), factory(), fromString() (+15 more)

### Community 140 - "ja"
Cohesion: 0.16
Nodes (18): Aa(), ba(), canonicalID(), da(), ea, ga(), ha(), ja() (+10 more)

### Community 141 - "parseCssColor"
Cohesion: 0.14
Nodes (16): clamp$1(), constrainAngle(), hcl(), hslToRgb(), f(), lab(), overwriteGetter(), parseAlpha() (+8 more)

### Community 142 - "_addDefaultHandlers"
Cohesion: 0.20
Nodes (15): _addDefaultHandlers(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter() (+7 more)

### Community 144 - "translate"
Cohesion: 0.22
Nodes (10): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getTerrainCoords(), _getTerrainCoordsForRegularTile(), _getTerrainCoordsForTileRanges(), getViewportMatrix(), _isWithinTileRanges() (+2 more)

### Community 145 - "mo"
Cohesion: 0.29
Nodes (7): loadURL(), mo(), pt(), qe(), qr, st(), te()

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

### Community 174 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

## Knowledge Gaps
- **514 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+509 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `_addDefaultHandlers`, `_calcMatrices`, `loadGeometry`, `constructor`, `get`, `has`, `push`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `coveringTiles`, `push`, `_addDefaultHandlers`, `_calcMatrices`, `loadGeometry`, `constructor`, `get`, `has`, `push`, `n`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `.handleEvent`, `assets/maplibre-gl-dev.mjs`, `coveringTiles`, `s`, `preventDefault`, `_addDefaultHandlers`, `get`, `_calcMatrices`, `interpolate`, `get`, `sub`, `._update`, `appendRoundCorner`, `extend`, `update`, `n`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _514 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.007212672733400742 - nodes in this community are weakly interconnected._
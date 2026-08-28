# Graph Report - bricolemoi  (2026-08-28)

## Corpus Check
- 180 files · ~822,972 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10383 nodes · 30144 edges · 134 communities (119 shown, 15 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a8a02226`
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
- _addDefaultHandlers
- assets/maplibre-gl-worker.mjs
- .handleEvent
- concat
- coveringTiles
- geometry
- flyTo
- evaluate
- constructor
- public/maplibre-gl-worker-dev.mjs
- readVarint
- evaluate
- queryIntersectsFeature
- devDependencies
- render
- geometry
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- addFeature
- shapeLines
- shapeLines
- AdminDashboard.jsx
- constructor
- coveringTiles
- eliminateHoles
- getElevation
- eliminateHoles
- parseCssColor
- update
- appendRoundCorner
- sub
- getElevation
- featureFilter
- useAblySupabaseSync.js
- readVarint
- deepEqual
- extend
- loadTile
- App.jsx
- platformAuditReferee.js
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
- update
- extend
- wn
- useClientViewState.js
- LandingPage.jsx
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- getChildren
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
- upload
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
- @aws-sdk/client-s3
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

## Communities (134 total, 15 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (573): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+565 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (479): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+471 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (551): Ms(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature(), addFeatures() (+543 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (506): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+498 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (220): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+212 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (211): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+203 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (246): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+238 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (233): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+225 more)

### Community 8 - "s"
Cohesion: 0.06
Nodes (130): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+122 more)

### Community 9 - "push"
Cohesion: 0.03
Nodes (283): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), querySourceFeatures(), es(), gc(), getCameraQueryGeometry() (+275 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (188): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+180 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (171): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+163 more)

### Community 12 - "_checkLoaded"
Cohesion: 0.03
Nodes (101): addImage(), addLayer(), addSource(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+93 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (164): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindFramebuffer(), bindLayerOpacity(), _buildSkirts() (+156 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (155): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindImagePatternTextures(), bindLayerOpacity() (+147 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (145): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+137 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (175): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+167 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (162): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), bindGradientAndDashTextures(), bindGradientTextures(), _calcMatrices() (+154 more)

### Community 18 - "constructor"
Cohesion: 0.02
Nodes (115): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+107 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (89): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold() (+81 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (111): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), cameraBoundsWarning() (+103 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (124): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+116 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (127): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), constantOr(), createConstGeometryVector() (+119 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (113): addFeature$1(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint(), addPointsTileFeature(), addTileFeatures(), appendLeaves() (+105 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (86): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+78 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (58): loadURL(), mf(), mo(), rs(), al, bt(), cn(), dn() (+50 more)

### Community 26 - "push"
Cohesion: 0.04
Nodes (103): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+95 more)

### Community 27 - "addFeature"
Cohesion: 0.07
Nodes (51): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+43 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (111): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+103 more)

### Community 29 - "update"
Cohesion: 0.04
Nodes (73): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource(), clearSymbolFadeHold() (+65 more)

### Community 30 - "get"
Cohesion: 0.04
Nodes (97): ac(), add(), addIndicesForPlacedSymbol(), addLineDashDependencies(), ax, bs(), bx(), calculateGlyphDependencies() (+89 more)

### Community 31 - "concat"
Cohesion: 0.04
Nodes (86): checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1() (+78 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): readImageNow(), _updatePatternAtlas(), addProtocol(), br(), clipGeometry(), computeVideoFrameParameters(), createStyleLayer(), evaluateProperties() (+54 more)

### Community 33 - "_addDefaultHandlers"
Cohesion: 0.22
Nodes (14): _addDefaultHandlers(), assignEvents(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler(), getCenter(), getCoordinatesCenterTileID() (+6 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (111): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getMinMaxElevation() (+103 more)

### Community 35 - ".handleEvent"
Cohesion: 0.04
Nodes (70): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+62 more)

### Community 36 - "concat"
Cohesion: 0.04
Nodes (83): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), createFunction(), deepUnbundle() (+75 more)

### Community 37 - "coveringTiles"
Cohesion: 0.05
Nodes (59): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+51 more)

### Community 38 - "geometry"
Cohesion: 0.07
Nodes (55): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+47 more)

### Community 39 - "flyTo"
Cohesion: 0.04
Nodes (129): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+121 more)

### Community 40 - "evaluate"
Cohesion: 0.04
Nodes (65): addGlobalState(), addTextVertices(), allowsLetterSpacing(), _calculate(), calculateScaledKey(), calculateTileKey(), charAllowsLetterSpacing(), _colorRampChanged() (+57 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (113): add(), addImages(), array(), assertRootKey(), backfillBorder(), breakLines(), bucketIndex(), checkSubtype() (+105 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (54): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData(), groupByLayout() (+46 more)

### Community 43 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 44 - "evaluate"
Cohesion: 0.04
Nodes (60): addDebugCollisionBoxes(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), allowsLetterSpacing(), _calculate(), calculateGlyphDependencies() (+52 more)

### Community 45 - "queryIntersectsFeature"
Cohesion: 0.04
Nodes (68): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), distSqr() (+60 more)

### Community 46 - "devDependencies"
Cohesion: 0.13
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, vite (+7 more)

### Community 47 - "render"
Cohesion: 0.05
Nodes (60): anyTilesAfterTime(), commit(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), destruct(), equals(), finish() (+52 more)

### Community 48 - "geometry"
Cohesion: 0.07
Nodes (56): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), geometry(), getBBox() (+48 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.19
Nodes (22): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+14 more)

### Community 50 - "dependencies"
Cohesion: 0.11
Nodes (19): ably, firebase, lucide-react, maplibre-gl, dependencies, ably, firebase, lucide-react (+11 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "addFeature"
Cohesion: 0.08
Nodes (48): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addFeatures() (+40 more)

### Community 54 - "shapeLines"
Cohesion: 0.07
Nodes (35): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation(), charInComplexShapingScript() (+27 more)

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.17
Nodes (20): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), ClientHistoryList(), PaginationControls() (+12 more)

### Community 57 - "constructor"
Cohesion: 0.02
Nodes (131): add(), addImages(), array(), assertRootKey(), backfillBorder(), bind(), breakLines(), bucketIndex() (+123 more)

### Community 58 - "coveringTiles"
Cohesion: 0.06
Nodes (42): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+34 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.07
Nodes (41): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+33 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (40): area(), buildBlockIndex(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+32 more)

### Community 62 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 63 - "update"
Cohesion: 0.18
Nodes (14): compareMax(), findPoleOfInaccessibility(), getCentroidCell(), hasDataProperty(), height(), patchUpdatedImage(), patchUpdatedImages(), premultiplyAlpha() (+6 more)

### Community 64 - "appendRoundCorner"
Cohesion: 0.11
Nodes (22): tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues() (+14 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (43): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+35 more)

### Community 67 - "featureFilter"
Cohesion: 0.06
Nodes (40): addIndicesForPlacedSymbol(), clear(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1(), convertInOp$1() (+32 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.10
Nodes (43): broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid(), getOnlineMaalemsFromStorage(), getTabId(), isCurrentUserAdmin() (+35 more)

### Community 69 - "readVarint"
Cohesion: 0.07
Nodes (43): bbox(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), getFeatures(), getValue(), getValueFromBuffer() (+35 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "extend"
Cohesion: 0.05
Nodes (59): _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), bindDasharrayTextures(), bindGradientAndDashTextures(), bindGradientTextures(), bindImagePatternTextures(), calculateTileRatio() (+51 more)

### Community 72 - "loadTile"
Cohesion: 0.07
Nodes (36): _afterTileLoadWorkerResponse(), backfillDEM(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), _diffStyle(), _downloadAndCacheRangePromise(), _drawGlyph(), fillBorder() (+28 more)

### Community 73 - "App.jsx"
Cohesion: 0.10
Nodes (25): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ClientView() (+17 more)

### Community 74 - "platformAuditReferee.js"
Cohesion: 0.27
Nodes (6): AdminDashboard(), NEGATIVE_BADGES, POSITIVE_BADGES, AdminView, auditPlatformState(), healPlatformState()

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
Cohesion: 0.04
Nodes (57): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dragEnd(), dragMove(), dragStart() (+49 more)

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
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 89 - "appendRoundCorner"
Cohesion: 0.16
Nodes (15): angle(), appendRoundCorner(), clone$1(), dot$1(), fromValues(), getAngleDelta(), getTileUnitsForMeters(), mercatorScale() (+7 more)

### Community 90 - "update"
Cohesion: 0.09
Nodes (28): compareMax(), emplace(), feature(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions() (+20 more)

### Community 91 - "extend"
Cohesion: 0.04
Nodes (86): addImage(), _afterImageUpdated(), _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures() (+78 more)

### Community 92 - "wn"
Cohesion: 0.10
Nodes (22): _computeClippingPlane(), _createStyleImage(), quadrant(), fire(), getValueAndResolveTokens(), _handleOverridablePaintPropertyUpdate(), isDataDriven(), j_() (+14 more)

### Community 93 - "useClientViewState.js"
Cohesion: 0.10
Nodes (28): CATEGORIES_TAXONOMY, CategorySelector(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), ClientSosForm() (+20 more)

### Community 94 - "LandingPage.jsx"
Cohesion: 0.14
Nodes (14): LandingPage(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS (+6 more)

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

### Community 99 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 100 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 101 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 106 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 110 - "upload"
Cohesion: 0.20
Nodes (11): lazyLoad(), _requestImport(), rm(), Ru(), setRTLTextPlugin(), getBinderAttributes(), getVertexAttributes(), isEmpty() (+3 more)

### Community 111 - "maalem/MaalemView.jsx"
Cohesion: 0.19
Nodes (13): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemTransactionsModal(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), useMaalemViewState() (+5 more)

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
- **491 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+486 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `flyTo` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `getChildren`, `push`, `get`, `readVarint`, `_calcMatrices`, `constructor`, `get`, `coveringTiles`, `update`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `x()` connect `flyTo` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `getChildren`, `push`, `get`, `readVarint`, `_calcMatrices`, `constructor`, `get`, `coveringTiles`, `update`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `public/maplibre-gl.mjs`, `_addDefaultHandlers`, `public/maplibre-gl-shared.mjs`, `coveringTiles`, `get`, `_calcMatrices`, `constructor`, `get`, `push`, `public/maplibre-gl-worker.mjs`, `update`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _491 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.00506534223399294 - nodes in this community are weakly interconnected._
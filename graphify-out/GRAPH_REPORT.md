# Graph Report - bricolemoi  (2026-08-26)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 10240 nodes · 29683 edges · 183 communities (144 shown, 39 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2477 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `312bc40a`
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
- n
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
- pointsToPolygonDistance
- ._update
- update
- get
- concat
- assets/maplibre-gl-worker-dev.mjs
- extend
- assets/maplibre-gl-worker.mjs
- constructor
- concat
- evaluate
- constructor
- clone
- extend
- constructor
- public/maplibre-gl-worker-dev.mjs
- evaluate
- coveringTiles
- push
- .reset
- addFeature
- geometry
- AppContext.jsx
- dependencies
- writeMessage
- writeMessage
- featureFilter
- appendRoundCorner
- shapeLines
- MaalemView.jsx
- warnOnce
- clone
- eliminateHoles
- getElevation
- eliminateHoles
- render
- queryIntersectsFeature
- coveringTiles
- sub
- getElevation
- queryIntersectsFeature
- serialize
- loadTile
- readVarint
- update
- readVarint
- App.jsx
- featureFilter
- AuthContext.jsx
- translate
- ClientView.jsx
- .handleEvent
- parseCssColor
- _checkLoaded
- get
- deepEqual
- deepEqual
- convertGeometryVector
- getChildren
- manifest.json
- sub
- _executeRelevantHandler
- LandingPage.jsx
- MASTER_DEFINITIVE_MIGRATION.sql
- Wu
- decodeFloat64Values
- decodeFloat64Values
- schema.sql
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- admin_auth_and_audit.sql
- backend_optimizations.sql
- public.transactions
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- public.is_admin
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- public.push_subscriptions
- public.unlock_lead_secure
- services_seed.sql
- vercel.json
- sw.js
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
- constructor
- addLine
- jn
- populate
- vo
- loadTile
- ga
- reset
- getPitchedLabelPlaneMatrix
- y
- parse
- writeTag
- zn
- interpolate
- cc
- ja
- Od
- placeLayerBucketPart
- placeLayerBucketPart
- update
- hasDebugData
- convertGeometryVector
- _executeRelevantHandler

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
- `add()` --indirect_call--> `n()`  [INFERRED]
  public/maplibre-gl.mjs → public/maplibre-gl-shared.mjs
- `addLayer()` --indirect_call--> `a()`  [INFERRED]
  public/maplibre-gl.mjs → public/maplibre-gl-shared.mjs
- `addLayer()` --indirect_call--> `n()`  [INFERRED]
  public/maplibre-gl.mjs → public/maplibre-gl-shared.mjs
- `addLayer()` --indirect_call--> `r()`  [INFERRED]
  public/maplibre-gl.mjs → public/maplibre-gl-shared.mjs

## Import Cycles
- None detected.

## Communities (183 total, 39 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (144): aa(), acquire(), addBucket(), addDash(), addRegularDash(), addRoundDash(), Ai(), ao() (+136 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (558): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+550 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (211): Hi(), Ru(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDebugCollisionBoxes(), addImageSection(), addTextSection(), ae() (+203 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (563): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+555 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (220): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+212 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (209): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+201 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (262): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+254 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (248): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+240 more)

### Community 8 - "n"
Cohesion: 0.05
Nodes (166): _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _computeClippingPlane(), querySourceFeatures(), eo(), es() (+158 more)

### Community 9 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 10 - "get"
Cohesion: 0.04
Nodes (138): _a(), ad(), al(), bd(), bind(), Bu(), _buildSkirts(), $c() (+130 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (166): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+158 more)

### Community 12 - "s"
Cohesion: 0.05
Nodes (135): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), _calculateNearFarZIfNeeded(), cameraForBounds() (+127 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (157): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+149 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (149): applySourceDiff(), atmosphereUniformValues(), backgroundPatternUniformValues(), backgroundUniformValues(), bgPatternUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer() (+141 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (144): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+136 more)

### Community 16 - "flyTo"
Cohesion: 0.04
Nodes (110): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), cameraForBounds(), cameraForBoxAndBearing(), clone(), _computePreZoomAroundLoc() (+102 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (145): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt() (+137 more)

### Community 18 - "constructor"
Cohesion: 0.03
Nodes (94): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+86 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (117): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+109 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (138): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), applyAnchorClass(), assignEvents(), _calculateTransform() (+130 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (125): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+117 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (121): addIndicesForPlacedSymbol(), addTextVertices(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+113 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (99): addFeature$1(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint(), addPointsTileFeature(), addTileFeatures(), calcLineBBox() (+91 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (109): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges() (+101 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.07
Nodes (45): al, f(), re(), Ri(), Rr(), abort(), abortTile(), addLayer() (+37 more)

### Community 26 - "push"
Cohesion: 0.04
Nodes (102): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+94 more)

### Community 27 - "pointsToPolygonDistance"
Cohesion: 0.07
Nodes (53): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), getBBox(), getLngLatFromTileCoord(), getPolygonBBox() (+45 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (111): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), clearTextures() (+103 more)

### Community 29 - "update"
Cohesion: 0.04
Nodes (84): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+76 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 31 - "concat"
Cohesion: 0.05
Nodes (82): assertRootKey(), bind(), coalesce$1(), concat(), createExpression(), createFunction(), createPropertyExpression(), deepUnbundle() (+74 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (86): _diffStyle(), loadGlyphRange(), loadTileJson(), loadURL(), readImageNow(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap() (+78 more)

### Community 33 - "extend"
Cohesion: 0.04
Nodes (77): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), demoteFeatureIds() (+69 more)

### Community 34 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.04
Nodes (72): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), determineAverageLineWidth() (+64 more)

### Community 35 - "constructor"
Cohesion: 0.04
Nodes (57): add(), addImages(), backfillBorder(), bucketIndex(), constructor(), copy(), copyImage(), createImage() (+49 more)

### Community 36 - "concat"
Cohesion: 0.04
Nodes (95): array(), assertRootKey(), bind(), checkSubtype(), coalesce$1(), concat(), createExpression(), createFunction() (+87 more)

### Community 37 - "evaluate"
Cohesion: 0.04
Nodes (61): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), allowsLetterSpacing(), allowsVerticalWritingMode(), _calculate(), calculateGlyphDependencies(), charAllowsLetterSpacing() (+53 more)

### Community 38 - "constructor"
Cohesion: 0.03
Nodes (105): add(), addClassName(), addControl(), _addDefaultHandlers(), addTo(), af(), _applyChanges(), _blockedByActive() (+97 more)

### Community 39 - "clone"
Cohesion: 0.06
Nodes (43): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+35 more)

### Community 40 - "extend"
Cohesion: 0.06
Nodes (44): _applyChanges(), _blockedByActive(), extend(), fillExtrusionPatternUniformValues(), fillOutlinePatternUniformValues(), fillPatternUniformValues(), _fireEvent(), _fireEvents() (+36 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (81): sphereSurfacePointToCoordinates(), add(), addImages(), applyPropertyUpdates(), applySourceDiff(), backfillBorder(), bucketIndex(), calculateScaledKey() (+73 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (57): addProtocol(), br(), clipGeometry(), createStyleLayer(), createTree(), evaluateProperties(), finish(), fromVectorTileJs() (+49 more)

### Community 43 - "evaluate"
Cohesion: 0.03
Nodes (97): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addGlobalState() (+89 more)

### Community 44 - "coveringTiles"
Cohesion: 0.06
Nodes (47): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coveringTiles(), coveringZoomLevel(), distanceToTile2d() (+39 more)

### Community 45 - "push"
Cohesion: 0.04
Nodes (101): addTileFeatures(), ah(), appendLeaves(), Bf(), bh(), bp(), cg(), ch() (+93 more)

### Community 46 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 47 - "addFeature"
Cohesion: 0.06
Nodes (57): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addFeatures() (+49 more)

### Community 48 - "geometry"
Cohesion: 0.07
Nodes (53): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), geometry(), getBBox(), getLngLatFromTileCoord() (+45 more)

### Community 49 - "AppContext.jsx"
Cohesion: 0.11
Nodes (39): EmergencySOSModal(), PushNotificationBanner(), AppContext, AppProvider(), calculateDistanceInKm(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider() (+31 more)

### Community 50 - "dependencies"
Cohesion: 0.04
Nodes (47): ably, autoprefixer, @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies (+39 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "featureFilter"
Cohesion: 0.06
Nodes (37): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), feature(), featureFilter() (+29 more)

### Community 54 - "appendRoundCorner"
Cohesion: 0.06
Nodes (45): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+37 more)

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (46): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+38 more)

### Community 56 - "MaalemView.jsx"
Cohesion: 0.14
Nodes (30): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminMaalemsView(), AdminRechargesView(), CATEGORIES_TAXONOMY, CategorySelector(), EnhancedCategoryIcon() (+22 more)

### Community 57 - "warnOnce"
Cohesion: 0.06
Nodes (41): _applyDiffToSource(), _applyResourceTiming(), cameraBoundsWarning(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate() (+33 more)

### Community 58 - "clone"
Cohesion: 0.07
Nodes (33): angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2() (+25 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 60 - "getElevation"
Cohesion: 0.09
Nodes (35): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+27 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLineInternal(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "render"
Cohesion: 0.07
Nodes (37): acquireRTT(), anyTilesAfterTime(), bindRTT(), commit(), destruct(), _finalizeElevation(), getAnisotropicFilterPitch(), getCenterClampedToGround() (+29 more)

### Community 63 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 64 - "coveringTiles"
Cohesion: 0.05
Nodes (53): _addDefaultHandlers(), allowVariableZoom(), allowWorldCopies(), assignEvents(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+45 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.07
Nodes (41): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors(), isInsideGrid(), isOffscreen() (+33 more)

### Community 67 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 68 - "serialize"
Cohesion: 0.10
Nodes (28): completeTask(), deserialize(), freeBufferAfterUpload(), getClassRegistryKey(), getProtocol(), getReferrer(), isArrayBuffer(), isFileURL() (+20 more)

### Community 69 - "loadTile"
Cohesion: 0.12
Nodes (23): _afterTileLoadWorkerResponse(), clearTextures(), destroy(), doOnceCompleted(), _getLoadGeoJSONParameters(), _getNeighboringTiles(), _getOverzoomParameters(), getRTLTextPluginStatus() (+15 more)

### Community 70 - "readVarint"
Cohesion: 0.09
Nodes (33): bbox(), nextField(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32(), readFixed64() (+25 more)

### Community 71 - "update"
Cohesion: 0.03
Nodes (81): _addTerrainIdealTiles(), _addTile(), _areDescendentsComplete(), ba(), bl(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+73 more)

### Community 72 - "readVarint"
Cohesion: 0.08
Nodes (36): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+28 more)

### Community 73 - "App.jsx"
Cohesion: 0.16
Nodes (19): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminDashboard(), AdminAuthModal(), AdminView() (+11 more)

### Community 74 - "featureFilter"
Cohesion: 0.05
Nodes (46): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), emplace(), expandBy(), feature() (+38 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.16
Nodes (25): AuthModal(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, checkAndRecordOtpRateLimit() (+17 more)

### Community 76 - "translate"
Cohesion: 0.22
Nodes (11): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getTerrainCoords(), _getTerrainCoordsForRegularTile(), _getTerrainCoordsForTileRanges(), getViewportMatrix(), _isWithinTileRanges() (+3 more)

### Community 77 - "ClientView.jsx"
Cohesion: 0.14
Nodes (20): CGUModal(), ClientView(), getServiceDisplay(), mapCategoryToSlug(), SERVICE_TYPE_MAP, CustomDropdown(), getSafeLabel(), generateFallbackAudioDataUrl() (+12 more)

### Community 78 - ".handleEvent"
Cohesion: 0.10
Nodes (23): _applyChanges(), _blockedByActive(), _elevateCameraIfInsideTerrain(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), getCameraAltitude(), _getMapTouches() (+15 more)

### Community 79 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 80 - "_checkLoaded"
Cohesion: 0.04
Nodes (79): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), _checkLoaded(), _createDelegatedListener() (+71 more)

### Community 81 - "get"
Cohesion: 0.05
Nodes (66): add(), addIndicesForPlacedSymbol(), ax, bb(), bx(), clear(), containsPolygonGeometry(), cx() (+58 more)

### Community 82 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 83 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 84 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 85 - "getChildren"
Cohesion: 0.12
Nodes (19): appendLeaves(), convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getChildren(), getClusterExpansionZoom(), getClusterGeoJSON(), getClusters() (+11 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.06
Nodes (57): adjustFarPlaneByHorizonPlane(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint() (+49 more)

### Community 88 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 89 - "LandingPage.jsx"
Cohesion: 0.28
Nodes (6): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), translations

### Community 90 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 91 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 92 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 93 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 94 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

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

### Community 99 - "admin_auth_and_audit.sql"
Cohesion: 0.67
Nodes (3): public.admin_audit_logs, public.is_admin(), public.profiles

### Community 101 - "public.transactions"
Cohesion: 0.67
Nodes (3): public.reconcile_transaction(), public.transactions, public.profiles

### Community 160 - "constructor"
Cohesion: 0.05
Nodes (57): addImages(), backfillBorder(), bbox(), calculateScaledKey(), cm(), completeTask(), constructor(), decode() (+49 more)

### Community 161 - "addLine"
Cohesion: 0.05
Nodes (48): addCurrentVertex(), addFeature(), addFeatures(), addHalfVertex(), addLine(), addToLineVertexArray(), addToSortKeyRanges(), am() (+40 more)

### Community 162 - "jn"
Cohesion: 0.06
Nodes (48): cameraPosition(), _computeTileBoundingVolume(), _createLayers(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getMinMaxElevation(), getRayDirectionFromPixel() (+40 more)

### Community 163 - "populate"
Cohesion: 0.05
Nodes (48): addLineDashDependencies(), addSymbols(), av(), calculateGlyphDependencies(), Cd(), constantOr(), _convertFromCellCoord(), _convertToCellCoord() (+40 more)

### Community 164 - "vo"
Cohesion: 0.07
Nodes (41): attemptAnchorPlacement(), bo(), co(), continuePlacement(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go() (+33 more)

### Community 165 - "loadTile"
Cohesion: 0.06
Nodes (40): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), ca(), clearTextures(), destroy(), _diffStyle(), _dispatchWorkerUpdate() (+32 more)

### Community 166 - "ga"
Cohesion: 0.06
Nodes (39): allowVariableZoom(), allowWorldCopies(), _calculateNearFarZIfNeeded(), coordinatePoint(), distanceToTile2d(), distanceX(), distanceY(), Dp() (+31 more)

### Community 167 - "reset"
Cohesion: 0.09
Nodes (36): bf(), _calculateTransform(), contextmenu(), dblclick(), dragEnd(), dragMove(), dragStart(), _firePreventable() (+28 more)

### Community 168 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.09
Nodes (31): calculatePosMatrix(), getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getFastPathSimpleProjectionMatrix(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix() (+23 more)

### Community 169 - "y"
Cohesion: 0.08
Nodes (28): b(), Cy(), determineAverageLineWidth(), determineLineBreaks(), getChildren(), getOriginId(), getMaxImageSize(), getMaxScale() (+20 more)

### Community 170 - "parse"
Cohesion: 0.11
Nodes (27): as(), checkSubtype(), crossFadingFactor(), Do(), eachChild(), error(), fr, getCrossfadeParameters() (+19 more)

### Community 171 - "writeTag"
Cohesion: 0.13
Nodes (27): realloc(), ty(), writeBoolean(), writeBooleanField(), writeBytes(), writeBytesField(), writeDouble(), writeDoubleField() (+19 more)

### Community 172 - "zn"
Cohesion: 0.09
Nodes (26): _createStyleImage(), quadrant(), Bv(), fire(), getValueAndResolveTokens(), gradientExpression(), _handleOverridablePaintPropertyUpdate(), _handleSpecialPaintPropertyUpdate() (+18 more)

### Community 173 - "interpolate"
Cohesion: 0.10
Nodes (22): calculateScaledKey(), calculateTileKey(), from(), getArrayValueLength(), getEpsg3857Coords(), getQuadkey(), getTileBBox(), hclToRgb() (+14 more)

### Community 174 - "cc"
Cohesion: 0.12
Nodes (17): ac(), calculateFogBlendOpacity(), cc(), _drainInertiaBuffer(), handlePanInertia(), hf(), lf, mf() (+9 more)

### Community 175 - "ja"
Cohesion: 0.18
Nodes (17): Aa(), ba(), canonicalID(), da(), ea, ga(), ha(), ja() (+9 more)

### Community 176 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 177 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 178 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 179 - "update"
Cohesion: 0.18
Nodes (14): compareMax(), findPoleOfInaccessibility(), getCentroidCell(), hasDataProperty(), height(), patchUpdatedImage(), patchUpdatedImages(), premultiplyAlpha() (+6 more)

### Community 180 - "hasDebugData"
Cohesion: 0.18
Nodes (12): addDebugCollisionBoxes(), destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData() (+4 more)

### Community 181 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 182 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

## Knowledge Gaps
- **446 isolated node(s):** `uo`, `wc`, `uo`, `wc`, `el` (+441 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `constructor()` connect `constructor` to `assets/maplibre-gl-worker-dev.mjs`, `assets/maplibre-gl-dev.mjs`, `loadTile`, `clone`, `extend`, `n`, `coveringTiles`, `s`, `get`, `_calcMatrices`, `get`, `appendRoundCorner`, `sub`, `._update`, `warnOnce`, `update`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `evaluate`, `coveringTiles`, `get`, `_calcMatrices`, `update`, `constructor`, `get`, `getChildren`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-worker.mjs`, `assets/maplibre-gl-shared.mjs`, `n`, `evaluate`, `coveringTiles`, `get`, `_calcMatrices`, `update`, `constructor`, `get`, `getChildren`, `get`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `uo`, `wc`, `uo` to the rest of the system?**
  _446 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.007444735132477657 - nodes in this community are weakly interconnected._
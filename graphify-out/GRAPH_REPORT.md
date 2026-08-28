# Graph Report - bricolemoi  (2026-08-28)

## Corpus Check
- 196 files · ~831,844 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10465 nodes · 30261 edges · 148 communities (129 shown, 19 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ac9d9444`
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
- constructor
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
- get
- push
- ._update
- public/maplibre-gl-worker.mjs
- push
- evaluate
- ._update
- update
- get
- ja
- assets/maplibre-gl-worker-dev.mjs
- extend
- jn
- .reset
- concat
- cameraForBoxAndBearing
- clone
- n
- url
- constructor
- public/maplibre-gl-worker-dev.mjs
- constructor
- pointsToPolygonDistance
- readVarint
- devDependencies
- .handleEvent
- evaluate
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- addFeature
- shapeLines
- performSymbolLayout
- AdminDashboard.jsx
- update
- queryIntersectsFeature
- eliminateHoles
- getElevation
- eliminateHoles
- parse
- coveringTiles
- update
- sub
- getElevation
- featureFilter
- useAblySupabaseSync.js
- readVarint
- deepEqual
- loadTile
- getPitchedLabelPlaneMatrix
- App.jsx
- Od
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- parse
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- intersects
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- adjustFarPlaneByHorizonPlane
- workflows/graphify.md
- convertGeometryVector
- featureToGeoJSON
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
- ._onClickFullscreen
- update_centrifugo.js
- Wu
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
- coveringTiles
- maalem/MaalemView.jsx
- appendRoundCorner
- parseCssColor
- _addDefaultHandlers
- CentrifugoClient
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
- `interpolate()` --indirect_call--> `fy`  [INFERRED]
  public/assets/maplibre-gl-shared-dev.mjs → public/assets/maplibre-gl-shared.mjs
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/assets/maplibre-gl-shared-dev.mjs → public/assets/maplibre-gl-shared.mjs
- `set()` --indirect_call--> `v()`  [INFERRED]
  public/maplibre-gl-shared-dev.mjs → public/maplibre-gl-shared.mjs
- `constructor()` --indirect_call--> `increment()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs
- `constructor()` --indirect_call--> `key()`  [INFERRED]
  public/assets/maplibre-gl-dev.mjs → public/assets/maplibre-gl-shared-dev.mjs

## Import Cycles
- None detected.

## Communities (148 total, 19 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (571): aa(), ac(), acquire(), acquireRTT(), add(), addBucket(), addClassName(), addControl() (+563 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (446): aa(), ac(), acquire(), addBucket(), addControl(), addDash(), addImage(), addLayer() (+438 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (577): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+569 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (619): Hs(), Ru(), add(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes(), addFeature() (+611 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (212): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+204 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (203): acquire(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable, anchorTranslate (+195 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (254): addEventDefaultOptions, addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith(), angleWithSep() (+246 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (252): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors, angleWith() (+244 more)

### Community 8 - "s"
Cohesion: 0.06
Nodes (133): adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), cameraForBounds(), cameraForBoxAndBearing() (+125 more)

### Community 9 - "constructor"
Cohesion: 0.02
Nodes (162): add(), addClassName(), _addDefaultHandlers(), addTo(), af(), _applyChanges(), bf(), _blockedByActive() (+154 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (164): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+156 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (193): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+185 more)

### Community 12 - "concat"
Cohesion: 0.04
Nodes (95): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+87 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (155): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+147 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (167): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+159 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (102): adjustAntiMeridian(), apply(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing(), _calculateNearFarZIfNeeded(), cameraForBounds() (+94 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (178): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+170 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (152): _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices(), calculateCameraOptionsFromTo() (+144 more)

### Community 18 - "constructor"
Cohesion: 0.03
Nodes (94): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+86 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (101): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+93 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (142): addControl(), addTo(), _blockedByActive(), _calculateTransform(), _cancelRenderFrame(), checkGeolocationSupport(), _clearWatch(), cloneImages() (+134 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (122): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+114 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (126): addLineDashDependencies(), addPatternDependencies(), calculateGlyphDependencies(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), constantOr(), createConstGeometryVector() (+118 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (129): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addIndicesForPlacedSymbol(), addLine(), addLinesTileFeature(), addLineTileFeautre() (+121 more)

### Community 24 - "._update"
Cohesion: 0.03
Nodes (120): add(), addClassName(), addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), applyAnchorClass() (+112 more)

### Community 25 - "public/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (59): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), dn() (+51 more)

### Community 26 - "push"
Cohesion: 0.04
Nodes (107): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+99 more)

### Community 27 - "evaluate"
Cohesion: 0.04
Nodes (95): isStyleLoaded(), accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures() (+87 more)

### Community 28 - "._update"
Cohesion: 0.03
Nodes (116): addImage(), addLayer(), addSource(), addSprite(), _afterImageUpdated(), _applyGlobalStateChanges(), backgroundPatternUniformValues(), bgPatternUniformValues() (+108 more)

### Community 29 - "update"
Cohesion: 0.02
Nodes (131): acquireRTT(), _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), bindRTT(), _cleanUpRasterTiles() (+123 more)

### Community 30 - "get"
Cohesion: 0.05
Nodes (89): ac(), add(), addIndicesForPlacedSymbol(), ax, Bd(), bs(), bx(), clear() (+81 more)

### Community 31 - "ja"
Cohesion: 0.15
Nodes (19): Da(), Aa(), ba(), canonicalID(), da(), ea, ga(), ha() (+11 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.03
Nodes (103): _diffStyle(), loadGlyphRange(), loadTileJson(), loadURL(), _updateDiff(), _updatePatternAtlas(), addProtocol(), arrayBufferToImageBitmap() (+95 more)

### Community 33 - "extend"
Cohesion: 0.04
Nodes (84): _afterEase(), applyUpdatedTransform(), bearing(), calculateTileRatio(), calculateTranslation(), dblclick(), _ease(), easeOut() (+76 more)

### Community 34 - "jn"
Cohesion: 0.07
Nodes (36): Ar(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), ic(), mf(), Ms() (+28 more)

### Community 35 - ".reset"
Cohesion: 0.05
Nodes (49): _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd(), dragMove(), dragStart() (+41 more)

### Community 36 - "concat"
Cohesion: 0.04
Nodes (85): bind(), checkChild(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), convertHasOp$1() (+77 more)

### Community 37 - "cameraForBoxAndBearing"
Cohesion: 0.06
Nodes (52): adjustAntiMeridian(), allowVariableZoom(), allowWorldCopies(), _calculateNearFarZIfNeeded(), cameraForBounds(), cameraForBoxAndBearing(), _computePreZoomAroundLoc(), Dp() (+44 more)

### Community 38 - "clone"
Cohesion: 0.07
Nodes (36): clampToSphere(), angle(), appendRoundCorner(), clone(), clone$1(), containsMaxSafeIntegerValues(), decode(), decodeFsst() (+28 more)

### Community 39 - "n"
Cohesion: 0.03
Nodes (265): _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), clone() (+257 more)

### Community 40 - "url"
Cohesion: 0.18
Nodes (12): getEpsg3857Coords(), getQuadkey(), getTileBBox(), getValueAndResolveTokens(), _handleOverridablePaintPropertyUpdate(), isDataDriven(), paintAttributeNames(), parseCacheControl() (+4 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (97): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), clone(), completeTask() (+89 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (55): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData(), groupByLayout() (+47 more)

### Community 43 - "constructor"
Cohesion: 0.04
Nodes (56): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), constructor(), copyImage() (+48 more)

### Community 44 - "pointsToPolygonDistance"
Cohesion: 0.08
Nodes (48): bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), distance(), _down(), getBBox(), getPolygonBBox() (+40 more)

### Community 45 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 46 - "devDependencies"
Cohesion: 0.12
Nodes (17): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+9 more)

### Community 47 - ".handleEvent"
Cohesion: 0.08
Nodes (33): _addDefaultHandlers(), _applyChanges(), assignEvents(), _blockedByActive(), _elevateCameraIfInsideTerrain(), _fireEvents(), generateMousePanHandler(), generateMousePitchHandler() (+25 more)

### Community 48 - "evaluate"
Cohesion: 0.05
Nodes (71): addGlobalState(), addTextVertices(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), canonicalID(), compareDistPair(), crossFadingFactor() (+63 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (28): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+20 more)

### Community 50 - "dependencies"
Cohesion: 0.11
Nodes (19): @aws-sdk/client-s3, firebase, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase, lucide-react (+11 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "addFeature"
Cohesion: 0.09
Nodes (42): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+34 more)

### Community 54 - "shapeLines"
Cohesion: 0.05
Nodes (47): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), calculateBadness(), calculateLineContentSize(), calculatePenalty(), charHasRotatedVerticalOrientation() (+39 more)

### Community 55 - "performSymbolLayout"
Cohesion: 0.04
Nodes (57): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize() (+49 more)

### Community 56 - "AdminDashboard.jsx"
Cohesion: 0.14
Nodes (30): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), PaginationControls() (+22 more)

### Community 57 - "update"
Cohesion: 0.09
Nodes (27): compareMax(), emplace(), feature(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions() (+19 more)

### Community 58 - "queryIntersectsFeature"
Cohesion: 0.06
Nodes (44): checkIntersection(), circleIntersection(), classifyRings(), _convertFromCellCoord(), _convertToCellCoord(), distSqr(), distToSegmentSquared(), edgeIntersectsBox() (+36 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 60 - "getElevation"
Cohesion: 0.08
Nodes (37): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc(), getTileSkewVectors() (+29 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - "parse"
Cohesion: 0.07
Nodes (42): array(), assertRootKey(), checkSubtype(), createExpression(), createPropertyExpression(), eachChild(), error(), findZoomCurve() (+34 more)

### Community 63 - "coveringTiles"
Cohesion: 0.05
Nodes (50): allowVariableZoom(), allowWorldCopies(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint() (+42 more)

### Community 64 - "update"
Cohesion: 0.09
Nodes (28): compareMax(), emplace(), feature(), findPoleOfInaccessibility(), getCentroidCell(), getNumericId(), getPositionIds(), getPositions() (+20 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.08
Nodes (36): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getElevation(), getShiftedAnchor(), _getTerrainElevationFunc(), isInsideGrid(), isOffscreen(), mercatorCoordinatesToAngularCoordinatesRadians() (+28 more)

### Community 67 - "featureFilter"
Cohesion: 0.07
Nodes (34): _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree(), expandBy(), featureFilter(), finish(), _forEachCell() (+26 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.11
Nodes (36): AdminRealtimeConsole(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+28 more)

### Community 69 - "readVarint"
Cohesion: 0.08
Nodes (37): loadGlyphRange(), bbox(), getArrayBuffer(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes() (+29 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "loadTile"
Cohesion: 0.05
Nodes (50): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), _charUsesLocalIdeographFontFamily(), _createTinySDF(), demoteFeatureIds(), _diffStyle(), diffToHashed() (+42 more)

### Community 72 - "getPitchedLabelPlaneMatrix"
Cohesion: 0.10
Nodes (27): getDEMElevation(), _getDEMTileMatrix(), _getElevationSampler(), getGlCoordMatrix(), getPitchedLabelPlaneMatrix(), getPixelPosMatrix(), getTerrainCoords(), _getTerrainCoordsForRegularTile() (+19 more)

### Community 73 - "App.jsx"
Cohesion: 0.09
Nodes (27): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+19 more)

### Community 74 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.11
Nodes (35): useAuthModalLogic(), ClientPhoneRequirementModal(), MaalemActiveMissionCard(), COUNTRY_DIAL_CODES, MOROCCAN_CITIES, useAdminService(), AuthContext, AuthProvider() (+27 more)

### Community 76 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+7 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (18): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+10 more)

### Community 78 - "parse"
Cohesion: 0.06
Nodes (41): _addEventListener(), array(), checkSubtype(), completeTask(), deserialize(), error(), fire(), freeBufferAfterUpload() (+33 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "intersects"
Cohesion: 0.24
Nodes (14): adjustAntiMeridian(), cameraForBounds(), fitBounds(), getEast(), getNorth(), getNorthWest(), getSouth(), getSouthEast() (+6 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "adjustFarPlaneByHorizonPlane"
Cohesion: 0.11
Nodes (23): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), _computeTileBoundingVolume(), findAxisMinMax(), getIdealNearFarPlaneDistance(), getNormalizedNearPlane(), isParallelogram(), mercatorCoordinatesToAngularCoordinatesRadians() (+15 more)

### Community 89 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 90 - "featureToGeoJSON"
Cohesion: 0.24
Nodes (10): convertToGeoJSON(), featureToGeoJSON(), geometryToGeoJSON(), getClusterGeoJSON(), getClusters(), getData(), unprojectPoint(), unprojectPoints() (+2 more)

### Community 91 - "extend"
Cohesion: 0.05
Nodes (52): _afterTileLoadWorkerResponse(), _applyDiffToSource(), _applyResourceTiming(), demoteFeatureIds(), diffToHashed(), _dispatchWorkerUpdate(), doOnceCompleted(), extend() (+44 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.12
Nodes (22): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientHistoryList(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity(), getServiceDisplay() (+14 more)

### Community 94 - "LandingPage.jsx"
Cohesion: 0.10
Nodes (22): CATEGORIES_TAXONOMY, CategorySelector(), ClientSosForm(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer() (+14 more)

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

### Community 110 - "._onClickFullscreen"
Cohesion: 0.29
Nodes (7): _exitFullscreen(), _getTitle(), _isFullscreen(), _requestFullscreen(), _setupUI(), _togglePseudoFullScreen(), _updateTitle()

### Community 111 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 112 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

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

### Community 134 - "coveringTiles"
Cohesion: 0.05
Nodes (47): allowVariableZoom(), allowWorldCopies(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), gestureBeginsVertically(), getBearing() (+39 more)

### Community 137 - "maalem/MaalemView.jsx"
Cohesion: 0.23
Nodes (6): MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner(), MaalemView()

### Community 138 - "appendRoundCorner"
Cohesion: 0.27
Nodes (10): angle(), appendRoundCorner(), clone$1(), dot$1(), fromValues(), getAngleDelta(), rotate(), roundPolygonCorners() (+2 more)

### Community 141 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 142 - "_addDefaultHandlers"
Cohesion: 0.16
Nodes (18): _addDefaultHandlers(), _applyChanges(), assignEvents(), _finishLoading(), generateMousePanHandler(), generateMousePitchHandler(), generateMouseRollHandler(), generateMouseRotationHandler() (+10 more)

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
- **531 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+526 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `y()` connect `n` to `assets/maplibre-gl.mjs`, `jn`, `assets/maplibre-gl-shared.mjs`, `cameraForBoxAndBearing`, `coveringTiles`, `get`, `readVarint`, `_addDefaultHandlers`, `_calcMatrices`, `constructor`, `get`, `update`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `x()` connect `n` to `assets/maplibre-gl.mjs`, `jn`, `assets/maplibre-gl-shared.mjs`, `cameraForBoxAndBearing`, `coveringTiles`, `constructor`, `get`, `readVarint`, `_addDefaultHandlers`, `_calcMatrices`, `constructor`, `get`, `update`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `assets/maplibre-gl-worker-dev.mjs`, `assets/maplibre-gl-dev.mjs`, `coveringTiles`, `clone`, `evaluate`, `n`, `_addDefaultHandlers`, `get`, `._onClickFullscreen`, `_calcMatrices`, `intersects`, `parse`, `get`, `._update`, `extend`, `update`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _531 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.0051021455702699925 - nodes in this community are weakly interconnected._
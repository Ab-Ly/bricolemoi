# Graph Report - bricolemoi  (2026-08-28)

## Corpus Check
- 197 files · ~834,508 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10555 nodes · 30309 edges · 192 communities (145 shown, 47 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2478 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5d3e9fac`
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
- n
- _calcMatrices
- constructor
- update
- constructor
- get
- get
- push
- ._update
- jn
- push
- addFeature
- ._update
- update
- .handleEvent
- assets/maplibre-gl-worker.mjs
- assets/maplibre-gl-worker-dev.mjs
- query
- n
- constructor
- concat
- resize
- parse
- s
- convertGeometryVector
- constructor
- public/maplibre-gl-worker-dev.mjs
- update
- evaluate
- constructor
- devDependencies
- .handleEvent
- evaluate
- EmergencyFlowContext.jsx
- dependencies
- writeMessage
- writeMessage
- emplaceBack
- performSymbolLayout
- appendRoundCorner
- UserProfileModal.jsx
- Wu
- polygonIntersectsBufferedPoint
- eliminateHoles
- getElevation
- eliminateHoles
- readVarint
- clone
- Wu
- sub
- getElevation
- featureFilter
- useAblySupabaseSync.js
- readVarint
- deepEqual
- extend
- wrap
- App.jsx
- getChildren
- AuthContext.jsx
- scripts
- auth/AuthModal.jsx
- Od
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- writeTag
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- sub
- workflows/graphify.md
- placeLayerBucketPart
- appendRoundCorner
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
- ja
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- _addDefaultHandlers
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
- hasDebugData
- _executeRelevantHandler
- convertGeometryVector
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

## Communities (192 total, 47 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (446): aa(), ac(), acquire(), addBucket(), addControl(), addDash(), addImage(), addLayer() (+438 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (557): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+549 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (600): Hs(), mf(), quadrant(), Ru(), add(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex() (+592 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (576): Ms(), quadrant(), Ru(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+568 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (223): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+215 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (224): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+216 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (256): addEventDefaultOptions, _addEventListener(), addGlobalState(), addImageSection(), addTextSection(), align$1(), altitudeFromMercatorZ(), anchors (+248 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (272): addCommand(), addEventDefaultOptions, _addEventListener(), addImageSection(), addSource(), addTextSection(), align$1(), altitudeFromMercatorZ() (+264 more)

### Community 8 - "coveringTiles"
Cohesion: 0.05
Nodes (51): allowVariableZoom(), allowWorldCopies(), convertFeaturesToMapFeatures(), convertFeaturesToMapFeaturesMultiple(), convertFeatureToMapFeature(), coordinatePoint(), coveringTiles(), coveringZoomLevel() (+43 more)

### Community 9 - "get"
Cohesion: 0.05
Nodes (92): ac(), add(), addIndicesForPlacedSymbol(), addToLineVertexArray(), addToSortKeyRanges(), angleTo(), ax, bc() (+84 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (187): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+179 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (168): _a(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bl(), Bu() (+160 more)

### Community 12 - "concat"
Cohesion: 0.04
Nodes (87): bind(), checkChild(), classifyChildren(), classifyFilter(), coalesce$1(), concat(), convertComparisonOp$1(), convertDisjunctionOp() (+79 more)

### Community 13 - "get"
Cohesion: 0.03
Nodes (167): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+159 more)

### Community 14 - "get"
Cohesion: 0.03
Nodes (164): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+156 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.03
Nodes (144): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+136 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (263): _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), clone() (+255 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (143): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+135 more)

### Community 18 - "constructor"
Cohesion: 0.03
Nodes (90): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+82 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (107): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+99 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (142): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _calculateTransform(), cameraBoundsWarning(), _cancelRenderFrame() (+134 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (120): addIndicesForPlacedSymbol(), clear(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector() (+112 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (120): addTextVertices(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+112 more)

### Community 23 - "push"
Cohesion: 0.04
Nodes (94): addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature(), addPoint() (+86 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (91): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+83 more)

### Community 25 - "jn"
Cohesion: 0.10
Nodes (26): Ar(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), Ms(), ns(), Ps() (+18 more)

### Community 26 - "push"
Cohesion: 0.03
Nodes (115): _normalizeBearing(), sphereSurfacePointToCoordinates(), addPoint(), addTileFeatures(), appendLeaves(), applyPropertyUpdates(), applySourceDiff(), calcLineBBox() (+107 more)

### Community 27 - "addFeature"
Cohesion: 0.07
Nodes (56): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addFeature$1() (+48 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (93): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _applyResourceTiming(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray() (+85 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (117): _addTerrainIdealTiles(), _addTile(), allowVariableZoom(), allowWorldCopies(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles() (+109 more)

### Community 30 - ".handleEvent"
Cohesion: 0.11
Nodes (21): _applyChanges(), _blockedByActive(), _fireEvent(), _fireEvents(), fitScreenCoordinates(), _getMapTouches(), hasChange(), isActive() (+13 more)

### Community 31 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.05
Nodes (59): _computeClippingPlane(), _createStyleImage(), mf(), rs(), al, bt(), cn(), dn() (+51 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (55): addProtocol(), br(), clipGeometry(), createStyleLayer(), evaluateProperties(), fromVectorTileJs(), getImageData(), groupByLayout() (+47 more)

### Community 33 - "query"
Cohesion: 0.06
Nodes (36): calculateSignedArea(), classifyRings$1(), compare(), compareAreas(), _convertFromCellCoord(), convertInOp$1(), _convertToCellCoord(), createTree() (+28 more)

### Community 34 - "n"
Cohesion: 0.03
Nodes (176): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), calculateCenterFromCameraLngLatAlt(), _checkLoaded(), ci(), _computeTileBoundingVolume() (+168 more)

### Community 35 - "constructor"
Cohesion: 0.02
Nodes (181): add(), addClassName(), _addDefaultHandlers(), addTo(), adjustAntiMeridian(), af(), _applyChanges(), bf() (+173 more)

### Community 36 - "concat"
Cohesion: 0.04
Nodes (96): array(), assertRootKey(), bind(), checkSubtype(), coalesce$1(), concat(), createExpression(), createFunction() (+88 more)

### Community 37 - "resize"
Cohesion: 0.07
Nodes (40): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), createQuadTriangles(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading() (+32 more)

### Community 38 - "parse"
Cohesion: 0.08
Nodes (38): getTileBoundingVolume(), array(), assertRootKey(), checkSubtype(), createExpression(), createPropertyExpression(), eachChild(), error() (+30 more)

### Community 39 - "s"
Cohesion: 0.05
Nodes (141): acquireRTT(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), bindRTT(), _calcMatrices(), calculateCameraOptionsFromTo() (+133 more)

### Community 40 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 41 - "constructor"
Cohesion: 0.03
Nodes (71): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+63 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.05
Nodes (62): readImageNow(), addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), computeVideoFrameParameters(), createStyleLayer() (+54 more)

### Community 43 - "update"
Cohesion: 0.10
Nodes (24): compareMax(), emplace(), findPoleOfInaccessibility(), getCentroidCell(), getPositionIds(), hasDataProperty(), height(), packColor() (+16 more)

### Community 44 - "evaluate"
Cohesion: 0.04
Nodes (91): addLineDashDependencies(), addPatternDependencies(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), calculateGlyphDependencies(), canonicalID(), circleIntersection() (+83 more)

### Community 45 - "constructor"
Cohesion: 0.02
Nodes (111): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), clone(), completeTask() (+103 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - ".handleEvent"
Cohesion: 0.04
Nodes (72): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+64 more)

### Community 48 - "evaluate"
Cohesion: 0.04
Nodes (75): accumulatePointsToCentroid(), addFeature(), addFeatures(), addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addVertex$1(), allowsLetterSpacing() (+67 more)

### Community 49 - "EmergencyFlowContext.jsx"
Cohesion: 0.14
Nodes (29): EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, ACTIONS, EmergencyFlowContext, EmergencyFlowProvider(), emergencyFlowReducer(), initialState (+21 more)

### Community 50 - "dependencies"
Cohesion: 0.10
Nodes (21): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+13 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "emplaceBack"
Cohesion: 0.09
Nodes (34): addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addSymbol(), addSymbols(), addTextVariableAnchorOffsets(), addToLineVertexArray() (+26 more)

### Community 54 - "performSymbolLayout"
Cohesion: 0.05
Nodes (55): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsLetterSpacing(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize() (+47 more)

### Community 55 - "appendRoundCorner"
Cohesion: 0.06
Nodes (45): calculateVariableRenderShift(), align(), allowsVerticalWritingMode(), angle(), appendRoundCorner(), breakLines(), calculateBadness(), calculateLineContentSize() (+37 more)

### Community 56 - "UserProfileModal.jsx"
Cohesion: 0.15
Nodes (30): AdminClientsView(), AdminDashboard(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), PaginationControls() (+22 more)

### Community 57 - "Wu"
Cohesion: 0.07
Nodes (34): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+26 more)

### Community 58 - "polygonIntersectsBufferedPoint"
Cohesion: 0.10
Nodes (28): checkIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport(), intersectionTestViewportMap() (+20 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.09
Nodes (38): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+30 more)

### Community 60 - "getElevation"
Cohesion: 0.07
Nodes (40): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+32 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.09
Nodes (39): area(), buildBlockIndex(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut(), earcutLinked() (+31 more)

### Community 62 - "readVarint"
Cohesion: 0.09
Nodes (34): bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields(), readFixed32() (+26 more)

### Community 63 - "clone"
Cohesion: 0.05
Nodes (52): clone(), completeTask(), containsMaxSafeIntegerValues(), decode(), decodeFsst(), decodeString$2(), deserialize(), div() (+44 more)

### Community 64 - "Wu"
Cohesion: 0.07
Nodes (36): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+28 more)

### Community 65 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 66 - "getElevation"
Cohesion: 0.06
Nodes (44): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+36 more)

### Community 67 - "featureFilter"
Cohesion: 0.06
Nodes (38): checkChild(), classifyChildren(), classifyFilter(), _convertFromCellCoord(), _convertToCellCoord(), expandBy(), feature(), featureFilter() (+30 more)

### Community 68 - "useAblySupabaseSync.js"
Cohesion: 0.10
Nodes (40): AdminRealtimeConsole(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+32 more)

### Community 69 - "readVarint"
Cohesion: 0.09
Nodes (35): bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 70 - "deepEqual"
Cohesion: 0.30
Nodes (12): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diff(), diffLayerPropertyChanges(), diffLayers(), diffSources() (+4 more)

### Community 71 - "extend"
Cohesion: 0.04
Nodes (76): _afterTileLoadWorkerResponse(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy(), _diffStyle() (+68 more)

### Community 72 - "wrap"
Cohesion: 0.07
Nodes (54): sphereSurfacePointToCoordinates(), applyPropertyUpdates(), applySourceDiff(), bboxToBBoxDistance(), boxWithinBox(), canonicalID(), compareDistPair(), convertToInternal() (+46 more)

### Community 73 - "App.jsx"
Cohesion: 0.09
Nodes (29): AdminApp, App(), ClientApp, MaalemApp, MainApp(), AdminAuthModal(), BottomNav(), ErrorBoundary (+21 more)

### Community 74 - "getChildren"
Cohesion: 0.09
Nodes (25): addIndicesForPlacedSymbol(), appendLeaves(), clear(), convertToGeoJSON(), featureToGeoJSON(), filterUpdate(), geometryToGeoJSON(), getChildren() (+17 more)

### Community 75 - "AuthContext.jsx"
Cohesion: 0.17
Nodes (24): useAuthModalLogic(), AuthContext, AuthProvider(), app, auth, firebaseConfig, googleProvider, reverseGeocodeMorocco() (+16 more)

### Community 76 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+8 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.10
Nodes (18): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+10 more)

### Community 78 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.24
Nodes (10): C, __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge(), getRoleBadge() (+2 more)

### Community 82 - "writeTag"
Cohesion: 0.13
Nodes (27): realloc(), ty(), writeBoolean(), writeBooleanField(), writeBytes(), writeBytesField(), writeDouble(), writeDoubleField() (+19 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 86 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 87 - "sub"
Cohesion: 0.06
Nodes (57): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), coordinatePoint(), depthAtPoint(), findAxisMinMax() (+49 more)

### Community 89 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 90 - "appendRoundCorner"
Cohesion: 0.19
Nodes (13): fov(), angle(), appendRoundCorner(), clone$1(), dot$1(), fromQuat$1(), fromValues(), getAngleDelta() (+5 more)

### Community 91 - "extend"
Cohesion: 0.03
Nodes (86): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), bgPatternUniformValues(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), deserialize() (+78 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "useClientViewState.js"
Cohesion: 0.07
Nodes (36): ClientView(), ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientDiagnosticFunnel(), DIAGNOSTIC_TAXONOMY, ClientHistoryList(), ClientPhoneRequirementModal(), ClientRadarSearchingCard() (+28 more)

### Community 94 - "LandingPage.jsx"
Cohesion: 0.13
Nodes (15): CATEGORIES_TAXONOMY, CategorySelector(), MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES (+7 more)

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

### Community 106 - "ja"
Cohesion: 0.15
Nodes (19): Da(), Aa(), ba(), canonicalID(), da(), ea, ga(), ha() (+11 more)

### Community 110 - "_addDefaultHandlers"
Cohesion: 0.11
Nodes (27): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading(), generateMousePanHandler() (+19 more)

### Community 111 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 112 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

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

### Community 129 - "hasDebugData"
Cohesion: 0.18
Nodes (12): addDebugCollisionBoxes(), destroy(), destroyDebugData(), generateCollisionDebugBuffers(), getBinderAttributes(), getVertexAttributes(), hasDebugData(), hasIconCollisionBoxData() (+4 more)

### Community 130 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 132 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 135 - "MASTER_DEFINITIVE_MIGRATION.sql"
Cohesion: 0.29
Nodes (6): public, public.interventions, public.maalem_details, public.profiles, public.reviews, public.transactions

### Community 136 - "schema.sql"
Cohesion: 0.47
Nodes (3): public.interventions, public.maalem_details, public.profiles

### Community 137 - "maalem/MaalemView.jsx"
Cohesion: 0.23
Nodes (6): MaalemActiveMissionCard(), MaalemLoyaltyGaugeCard(), MaalemPhotoPreviewModal(), MaalemRadarHeader(), MaalemUnfeasibleModal(), MaalemWelcomeWhatsAppBanner()

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
- **542 isolated node(s):** `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client`, `config`, `name` (+537 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `x()` connect `s` to `assets/maplibre-gl.mjs`, `n`, `assets/maplibre-gl-shared.mjs`, `resize`, `get`, `update`, `evaluate`, `get`, `_calcMatrices`, `constructor`, `get`, `push`, `update`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `y()` connect `s` to `assets/maplibre-gl.mjs`, `assets/maplibre-gl-shared.mjs`, `resize`, `update`, `evaluate`, `get`, `_calcMatrices`, `constructor`, `get`, `push`, `update`, `assets/maplibre-gl-worker.mjs`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `y()` connect `n` to `public/maplibre-gl.mjs`, `public/maplibre-gl-shared.mjs`, `constructor`, `readVarint`, `coveringTiles`, `constructor`, `get`, `getChildren`, `_addDefaultHandlers`, `_calcMatrices`, `constructor`, `writeTag`, `get`, `jn`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` to the rest of the system?**
  _542 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.00564358372456964 - nodes in this community are weakly interconnected._
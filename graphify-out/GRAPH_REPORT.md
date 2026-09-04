# Graph Report - bricolemoi  (2026-09-04)

## Corpus Check
- 291 files · ~917,865 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 10815 nodes · 30829 edges · 197 communities (144 shown, 53 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 2483 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `55fa2b05`
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
- _checkLoaded
- sub
- get
- get
- evaluate
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
- coveringTiles
- query
- writeMessage
- ._update
- update
- loadTile
- shapeLines
- assets/maplibre-gl-worker-dev.mjs
- EmergencyFlowContext.jsx
- push
- constructor
- warnOnce
- constructor
- .handleEvent
- flyTo
- feature
- evaluate
- public/maplibre-gl-worker-dev.mjs
- .handleEvent
- readVarint
- coveringTiles
- devDependencies
- featureFilter
- queryIntersectsFeature
- appendRoundCorner
- dependencies
- writeMessage
- writeMessage
- sub
- addFeature
- shapeLines
- readVarint
- addFeature
- push
- eliminateHoles
- getElevation
- eliminateHoles
- parse
- extend
- parse
- appendRoundCorner
- getElevation
- _executeRelevantHandler
- usePlatformDataSync.js
- assets/maplibre-gl-worker.mjs
- LandingPage.jsx
- _addDefaultHandlers
- parseCssColor
- useAuth
- telemetryDaemon.js
- InteractiveMap.jsx
- scripts
- auth/AuthModal.jsx
- diffSources
- 📝 Notes de Relais pour la Prochaine Session (BricoleMoi)
- Modern Clean & Trust Engineering Guidelines (BricoleMoi)
- listen.js
- stress-test.js
- queryIntersectsFeature
- notify-recharge.js
- rules/graphify.md
- manifest.json
- readVarint
- workflows/graphify.md
- deepEqual
- Wu
- AuthContext.jsx
- inspect_finances.js
- UserProfileModal.jsx
- update
- send-otp.js
- upload-media.js
- dispatch-sos.js
- verify-otp.js
- inspect-supabase-records.js
- purge_all_data.mjs
- supabase-status.js
- verify-infobip-otp/index.ts
- verify-otp-sms/index.ts
- inspect_prelude.js
- test_prelude_otp.js
- relaunch_centrifugo.js
- send-infobip-otp/index.ts
- send-otp-sms/index.ts
- verify-maalem-cin/index.ts
- test-adapter.js
- inspect_docker.js
- verify_centrifugo_rate.mjs
- vercel.json
- sw.js
- clean_test_data.js
- update_centrifugo.js
- simulate.js
- logs.js
- telemetry.js
- test-15-char.js
- list_all_data.js
- test-id-format.js
- test-pb.js
- check-coolify-actions.js
- migrate-supabase-to-pocketbase.js
- decodeFloat64Values
- placeLayerBucketPart
- check-coolify-artisan.js
- deep-audit.js
- jn
- check-coolify-code.js
- pocketbase-status.js
- check-coolify-livewire.js
- check-coolify-pat.js
- check-coolify-svc-app.js
- check_labels.js
- CentrifugoClient
- check-pb-cmd.js
- check-pb-entry.js
- check-pb-help.js
- check-pb-logs.js
- 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS
- deploy.sh
- check-pb-superuser.js
- check_proxy.js
- deploy-pocketbase.js
- find-coolify-pb.js
- handover-to-coolify.js
- inspect-coolify.js
- inspect-coolify-app.js
- inspect-coolify-detail.js
- inspect-coolify-services.js
- inspect-coolify-tables.js
- inspect-coolify-token.js
- inspect-labels.js
- inspect-meili.js
- read-coolify-create.js
- read-coolify-pb-yaml.js
- register-coolify-service.js
- relaunch-pocketbase.js
- audit.js
- reconcile.js
- package.json
- setup-pocketbase-admin.js
- start-coolify-service.js
- watch-deploy.js
- test_cycle.js
- update-coolify-pb.js
- vps-diag.js
- ClientDiagnosticFunnel.jsx
- AdminDashboard.jsx
- parse
- convertGeometryVector
- pocketbase-schema.js
- pocketbase-types.ts
- extend
- generate-types.js
- convertGeometryVector
- cameraForBoxAndBearing
- Od
- check_admin_profile.mjs
- parseCssColor
- decodeFloat64Values
- 🇲🇦 BricoleMoi • بريكول موال

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

## Communities (197 total, 53 thin omitted)

### Community 0 - "public/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (531): aa(), ac(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash() (+523 more)

### Community 1 - "assets/maplibre-gl.mjs"
Cohesion: 0.01
Nodes (562): aa(), acquire(), add(), addBucket(), addClassName(), addControl(), addDash(), _addDefaultHandlers() (+554 more)

### Community 2 - "public/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (579): Hi(), Hs(), quadrant(), Ru(), Aa(), add(), _addCollisionDebugVertex(), addCollisionDebugVertices() (+571 more)

### Community 3 - "assets/maplibre-gl-shared.mjs"
Cohesion: 0.01
Nodes (496): quadrant(), Ru(), Aa(), ad, _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDebugCollisionBoxes() (+488 more)

### Community 4 - "public/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (218): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+210 more)

### Community 5 - "assets/maplibre-gl-dev.mjs"
Cohesion: 0.01
Nodes (213): acquire(), acquireRTT(), addBucket(), addDash(), addRegularDash(), addRoundDash(), addSourceType(), alphaTable (+205 more)

### Community 6 - "assets/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (252): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+244 more)

### Community 7 - "public/maplibre-gl-shared-dev.mjs"
Cohesion: 0.01
Nodes (255): addEventDefaultOptions, _addEventListener(), addImageSection(), addTextSection(), align$1(), anchors, angleWith(), angleWithSep() (+247 more)

### Community 8 - "_checkLoaded"
Cohesion: 0.06
Nodes (57): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), _createLayers(), ei() (+49 more)

### Community 9 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 10 - "get"
Cohesion: 0.03
Nodes (195): _a(), acquireRTT(), ad(), al(), anyTilesAfterTime(), attemptAnchorPlacement(), bd(), bind() (+187 more)

### Community 11 - "get"
Cohesion: 0.03
Nodes (178): _a(), acquireRTT(), ad(), al(), attemptAnchorPlacement(), bd(), bind(), bindRTT() (+170 more)

### Community 12 - "evaluate"
Cohesion: 0.04
Nodes (90): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), calculateGlyphDependencies(), canonicalID() (+82 more)

### Community 13 - "get"
Cohesion: 0.04
Nodes (159): applySourceDiff(), atmosphereUniformValues(), attemptAnchorPlacement(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures() (+151 more)

### Community 14 - "get"
Cohesion: 0.04
Nodes (159): applySourceDiff(), atmosphereUniformValues(), backgroundUniformValues(), bind(), bindDasharrayTextures(), bindFramebuffer(), bindGradientAndDashTextures(), bindGradientTextures() (+151 more)

### Community 15 - "_calcMatrices"
Cohesion: 0.04
Nodes (121): angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), calculateEasing() (+113 more)

### Community 16 - "n"
Cohesion: 0.03
Nodes (287): _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), clone() (+279 more)

### Community 17 - "_calcMatrices"
Cohesion: 0.03
Nodes (145): adjustAntiMeridian(), _afterEase(), angularCoordinatesRadiansToVector(), angularCoordinatesToSurfaceVector(), apply(), applyUpdatedTransform(), bearing(), _calcMatrices() (+137 more)

### Community 18 - "constructor"
Cohesion: 0.03
Nodes (91): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), _cancelRenderFrame(), center(), checkGeolocationSupport() (+83 more)

### Community 19 - "update"
Cohesion: 0.03
Nodes (109): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), clearSymbolFadeHold() (+101 more)

### Community 20 - "constructor"
Cohesion: 0.02
Nodes (98): add(), addClassName(), addControl(), addTo(), applyAnchorClass(), cameraBoundsWarning(), _cancelRenderFrame(), checkGeolocationSupport() (+90 more)

### Community 21 - "get"
Cohesion: 0.03
Nodes (126): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+118 more)

### Community 22 - "get"
Cohesion: 0.03
Nodes (121): addIndicesForPlacedSymbol(), columnToField(), columnTypeHasChildren(), columnTypeHasName(), createConstGeometryVector(), createConstGpuVector(), createFlatGeometryVector(), createFlatGeometryVectorMortonEncoded() (+113 more)

### Community 23 - "push"
Cohesion: 0.03
Nodes (134): sphereSurfacePointToCoordinates(), addPoint(), applyPropertyUpdates(), applySourceDiff(), bind(), calcLineBBox(), clip(), clipLine$1() (+126 more)

### Community 24 - "._update"
Cohesion: 0.04
Nodes (86): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+78 more)

### Community 25 - "coveringTiles"
Cohesion: 0.05
Nodes (59): _addDefaultHandlers(), allowVariableZoom(), allowWorldCopies(), assignEvents(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint() (+51 more)

### Community 26 - "query"
Cohesion: 0.09
Nodes (27): _convertFromCellCoord(), _convertToCellCoord(), expandBy(), _forEachCell(), getId(), getKey(), getState(), insert() (+19 more)

### Community 27 - "writeMessage"
Cohesion: 0.08
Nodes (39): ey(), realloc(), ty(), writeBoolean(), writeBooleanField(), writeBytes(), writeBytesField(), writeDouble() (+31 more)

### Community 28 - "._update"
Cohesion: 0.04
Nodes (87): addLayer(), addSource(), addSprite(), _applyGlobalStateChanges(), _checkLoaded(), coalesceChanges(), coerceSpriteToArray(), createCalculateTileZoomFunction() (+79 more)

### Community 29 - "update"
Cohesion: 0.03
Nodes (120): _addTerrainIdealTiles(), _addTile(), anyTilesAfterTime(), _areDescendentsComplete(), backfillDEM(), _cleanUpRasterTiles(), _cleanUpVectorTiles(), _clearSource() (+112 more)

### Community 30 - "loadTile"
Cohesion: 0.07
Nodes (36): _afterImageUpdated(), _afterTileLoadWorkerResponse(), _clearSource(), clearTextures(), clearTiles(), deserialize(), destroy(), _disposeTexture() (+28 more)

### Community 31 - "shapeLines"
Cohesion: 0.05
Nodes (50): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+42 more)

### Community 32 - "assets/maplibre-gl-worker-dev.mjs"
Cohesion: 0.06
Nodes (56): addProtocol(), br(), clipGeometry(), clipGeometryOnAxis(), clipPoints(), createStyleLayer(), evaluateProperties(), fromVectorTileJs() (+48 more)

### Community 33 - "EmergencyFlowContext.jsx"
Cohesion: 0.08
Nodes (39): AdminRealtimeConsole(), EmergencySOSModal(), PushNotificationBanner(), EMERGENCY_STATES, useReviewsLoyaltyService(), ACTIONS, EmergencyFlowContext, EmergencyFlowProvider() (+31 more)

### Community 34 - "push"
Cohesion: 0.03
Nodes (281): addSprite(), calculateCameraOptionsFromTo(), calculateCenterFromCameraLngLatAlt(), ci(), _createLayers(), querySourceFeatures(), es(), gc() (+273 more)

### Community 35 - "constructor"
Cohesion: 0.03
Nodes (80): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), completeTask(), constructor() (+72 more)

### Community 36 - "warnOnce"
Cohesion: 0.08
Nodes (32): addImage(), backgroundPatternUniformValues(), bgPatternUniformValues(), cameraBoundsWarning(), _charUsesLocalIdeographFontFamily(), _createStyleImage(), _createTinySDF(), dispatchRenderCallbacks() (+24 more)

### Community 37 - "constructor"
Cohesion: 0.03
Nodes (81): add(), addImages(), backfillBorder(), bucketIndex(), calculateScaledKey(), calculateTileKey(), compareMax(), constructor() (+73 more)

### Community 38 - ".handleEvent"
Cohesion: 0.04
Nodes (65): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), _destroyUI(), disable(), dragEnd() (+57 more)

### Community 39 - "flyTo"
Cohesion: 0.03
Nodes (138): ac(), adjustAntiMeridian(), _afterEase(), apply(), applyUpdatedTransform(), _calcMatrices(), calculateFogBlendOpacity(), calculateFogMatrix() (+130 more)

### Community 40 - "feature"
Cohesion: 0.09
Nodes (27): addTileFeatures(), convertToGeoJSON(), createTile(), extent(), feature(), featureToGeoJSON(), geometryToGeoJSON(), getClusterFeature() (+19 more)

### Community 41 - "evaluate"
Cohesion: 0.04
Nodes (83): addGlobalState(), addLineDashDependencies(), addPatternDependencies(), addTextVertices(), bboxToBBoxDistance(), boxWithinBox(), _calculate(), calculateGlyphDependencies() (+75 more)

### Community 42 - "public/maplibre-gl-worker-dev.mjs"
Cohesion: 0.04
Nodes (83): _diffStyle(), loadTileJson(), loadURL(), _updateDiff(), addProtocol(), arrayBufferToImageBitmap(), br(), clipGeometry() (+75 more)

### Community 43 - ".handleEvent"
Cohesion: 0.04
Nodes (74): _applyChanges(), _blockedByActive(), _calculateTransform(), cloneImages(), contextmenu(), dblclick(), _destroyUI(), disable() (+66 more)

### Community 44 - "readVarint"
Cohesion: 0.11
Nodes (26): bbox(), cm(), decode(), nextField(), readBoolean(), readBytes(), readDouble(), readFixed32() (+18 more)

### Community 45 - "coveringTiles"
Cohesion: 0.06
Nodes (44): allowVariableZoom(), allowWorldCopies(), coordinatePoint(), coveringTiles(), coveringZoomLevel(), depthAtPoint(), distanceToTile2d(), distanceToTileSimple() (+36 more)

### Community 46 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, devDependencies, autoprefixer, postcss, ssh2, tailwindcss, @types/react, @types/react-dom (+13 more)

### Community 47 - "featureFilter"
Cohesion: 0.05
Nodes (50): checkChild(), classifyChildren(), classifyFilter(), convertComparisonOp$1(), convertDisjunctionOp(), convertFilter$1(), _convertFromCellCoord(), convertHasOp$1() (+42 more)

### Community 48 - "queryIntersectsFeature"
Cohesion: 0.07
Nodes (36): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), getLineWidth(), getMaximumPaintValue() (+28 more)

### Community 49 - "appendRoundCorner"
Cohesion: 0.11
Nodes (22): tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues() (+14 more)

### Community 50 - "dependencies"
Cohesion: 0.09
Nodes (23): @aws-sdk/client-s3, firebase, framer-motion, lucide-react, maplibre-gl, dependencies, @aws-sdk/client-s3, firebase (+15 more)

### Community 51 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 52 - "writeMessage"
Cohesion: 0.07
Nodes (48): command(), makeRoomForExtraLength(), realloc(), writeBigVarint(), writeBigVarintHigh(), writeBigVarintLow(), writeBoolean(), writeBooleanField() (+40 more)

### Community 53 - "sub"
Cohesion: 0.10
Nodes (36): adjustFarPlaneByHorizonPlane(), calculateRasterPerspectiveTransform(), cameraPosition(), clampToSphere(), _computeTileBoundingVolume(), findAxisMinMax(), fromCenterSizeAngles(), fromInvProjectionMatrix() (+28 more)

### Community 54 - "addFeature"
Cohesion: 0.05
Nodes (60): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addDynamicAttributes(), addFeature(), addFeatures(), addSymbol() (+52 more)

### Community 55 - "shapeLines"
Cohesion: 0.05
Nodes (48): calculateVariableRenderShift(), addDebugCollisionBoxes(), align(), allowsVerticalWritingMode(), breakLines(), calculateBadness(), calculateLineContentSize(), calculatePenalty() (+40 more)

### Community 56 - "readVarint"
Cohesion: 0.09
Nodes (35): loadGlyphRange(), bbox(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble(), readFields() (+27 more)

### Community 57 - "addFeature"
Cohesion: 0.05
Nodes (64): accumulatePointsToCentroid(), addCircleVertex(), _addCollisionDebugVertex(), addCollisionDebugVertices(), addCurrentVertex(), addDynamicAttributes(), addFeature(), addFeature$1() (+56 more)

### Community 58 - "push"
Cohesion: 0.03
Nodes (145): sphereSurfacePointToCoordinates(), addCurrentVertex(), addFeature$1(), addHalfVertex(), addLine(), addLinesTileFeature(), addLineTileFeautre(), addMultiPolygonTileFeature() (+137 more)

### Community 59 - "eliminateHoles"
Cohesion: 0.08
Nodes (42): area(), buildBlockIndex(), clear(), compareXYSlope(), covers(), createNode(), cureLocalIntersections(), earcut() (+34 more)

### Community 60 - "getElevation"
Cohesion: 0.06
Nodes (45): fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getShiftedAnchor(), _getTerrainElevationFunc() (+37 more)

### Community 61 - "eliminateHoles"
Cohesion: 0.08
Nodes (41): area(), buildBlockIndex(), clear(), clipLine(), compareXYSlope(), covers(), createNode(), cureLocalIntersections() (+33 more)

### Community 62 - "parse"
Cohesion: 0.05
Nodes (54): array(), assertRootKey(), checkSubtype(), clone(), createExpression(), createPropertyExpression(), div(), divByPoint() (+46 more)

### Community 63 - "extend"
Cohesion: 0.05
Nodes (64): adjustAntiMeridian(), _afterEase(), _applyResourceTiming(), bearing(), cameraForBounds(), _dispatchWorkerUpdate(), _ease(), easeTo() (+56 more)

### Community 64 - "parse"
Cohesion: 0.06
Nodes (47): bo(), co(), Do(), getElevationForLngLatZoom(), getMinTileElevationForLngLatZoom(), _getOverscaledTileIDFromLngLatZoom(), getPitchedTextCorrection(), go() (+39 more)

### Community 65 - "appendRoundCorner"
Cohesion: 0.11
Nodes (22): tileIdToLngLatBounds(), altitudeFromMercatorZ(), angle(), appendRoundCorner(), circumferenceAtLatitude(), clone$1(), dot$1(), fromValues() (+14 more)

### Community 66 - "getElevation"
Cohesion: 0.06
Nodes (46): calculatePosMatrix(), fastInvertSkewMat4(), findOffsetIntersectionPoint(), getDEMElevation(), _getDEMTileMatrix(), getElevation(), _getElevationSampler(), getFastPathSimpleProjectionMatrix() (+38 more)

### Community 67 - "_executeRelevantHandler"
Cohesion: 0.31
Nodes (9): endMove(), _executeRelevantHandler(), _isOneFingerTouch(), _isSameTouchEvent(), isValidEndEvent(), isValidMoveEvent(), isValidStartEvent(), Ef() (+1 more)

### Community 68 - "usePlatformDataSync.js"
Cohesion: 0.07
Nodes (54): MaalemActiveMissionCard(), NEGATIVE_BADGES, POSITIVE_BADGES, broadcastSync(), calculateDistanceInKm(), DUMMY_CLIENT_ID, DUMMY_MAALEM_ID, generateUuid() (+46 more)

### Community 69 - "assets/maplibre-gl-worker.mjs"
Cohesion: 0.03
Nodes (92): Ar(), cameraPosition(), _computeTileBoundingVolume(), fromAabb(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getElevationForLngLatZoom() (+84 more)

### Community 70 - "LandingPage.jsx"
Cohesion: 0.15
Nodes (13): MOROCCAN_CITIES, MOROCCAN_SERVICES, CLIENT_SCENES, MAALEM_SCENES, PromoVideoPlayer(), MOROCCAN_MAIN_CATEGORIES, MOROCCAN_REPAIR_PROBLEMS, translations (+5 more)

### Community 71 - "_addDefaultHandlers"
Cohesion: 0.10
Nodes (29): _addDefaultHandlers(), addImage(), _afterImageUpdated(), assignEvents(), bgPatternUniformValues(), _createStyleImage(), dispatchRenderCallbacks(), _finishLoading() (+21 more)

### Community 72 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 73 - "useAuth"
Cohesion: 0.07
Nodes (43): AdminApp, App(), ClientApp, ITApp, MaalemApp, MainApp(), AdminDashboard(), AdminSecurityModal() (+35 more)

### Community 74 - "telemetryDaemon.js"
Cohesion: 0.31
Nodes (13): collectSystemTelemetry(), __dirname, envPath, envVars, fetchWithTimeout(), __filename, pb, probeCentrifugo() (+5 more)

### Community 75 - "InteractiveMap.jsx"
Cohesion: 0.26
Nodes (12): InteractiveMap(), MapControlsOverlay(), calculateDistanceInKm(), computeBearing(), getMapIconSvg(), MAP_ICONS_SVG, renderMaalemPopupHtml(), renderTrackingPopupHtml() (+4 more)

### Community 76 - "scripts"
Cohesion: 0.07
Nodes (28): scripts, audit, build, deploy, deploy:logs, deploy:prod, deploy:status, dev (+20 more)

### Community 77 - "auth/AuthModal.jsx"
Cohesion: 0.09
Nodes (18): AuthModal(), AuthHeader(), CountryCodeSelector(), CountrySelectModal(), ErrorInfoBanner(), RememberedAccountCard(), RoleSwitcher(), ExistingUserPinStep() (+10 more)

### Community 78 - "diffSources"
Cohesion: 0.29
Nodes (10): addCommand(), addSource(), canUpdateGeoJSON(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById(), pluckId() (+2 more)

### Community 79 - "📝 Notes de Relais pour la Prochaine Session (BricoleMoi)"
Cohesion: 0.33
Nodes (5): 📦 Ce qui a été Réalisé et Poussé lors de cette Session, 📌 Concept & Spécification Validée, 📝 Notes de Relais pour la Prochaine Session (BricoleMoi), 🛠️ Plan d'Implémentation Technique pour l'autre PC, 🎯 Prochaine Tâche Prioritaire : Système de Lead en Instance (Lead Escrow)

### Community 80 - "Modern Clean & Trust Engineering Guidelines (BricoleMoi)"
Cohesion: 0.29
Nodes (6): 1. Visual Identity & Palette (« Modern Clean & Trust »), 2. Action Buttons & Accents, 3. Map & Overlay Panels, 4. Règle Fondamentale : Vision Architecturale Totale (Client - Maâlem - Admin), 5. Règle Stricte Identifiants & Base de Données (PocketBase VPS), Modern Clean & Trust Engineering Guidelines (BricoleMoi)

### Community 81 - "listen.js"
Cohesion: 0.21
Nodes (12): C, checkPocketBaseHealth(), __dirname, envPath, envVars, __filename, formatTime(), getLevelBadge() (+4 more)

### Community 82 - "stress-test.js"
Cohesion: 0.16
Nodes (15): args, calculateStats(), CONCURRENCY, __dirname, envPath, envVars, __filename, formatLatency() (+7 more)

### Community 83 - "queryIntersectsFeature"
Cohesion: 0.09
Nodes (31): checkIntersection(), circleIntersection(), classifyRings(), distSqr(), distToSegmentSquared(), edgeIntersectsBox(), intersectionTestMapMap(), intersectionTestMapViewport() (+23 more)

### Community 86 - "manifest.json"
Cohesion: 0.13
Nodes (14): background_color, categories, description, display, icons, lang, name, orientation (+6 more)

### Community 87 - "readVarint"
Cohesion: 0.08
Nodes (36): loadGlyphRange(), bbox(), loadGeometry(), nextField(), parseGlyphPbf(), readBoolean(), readBytes(), readDouble() (+28 more)

### Community 89 - "deepEqual"
Cohesion: 0.31
Nodes (11): addCommand(), addSource(), canUpdateGeoJSON(), deepEqual(), diffLayerPropertyChanges(), diffLayers(), diffSources(), indexById() (+3 more)

### Community 90 - "Wu"
Cohesion: 0.07
Nodes (35): bo(), co(), Do(), getPerspectiveRatio(), getPitchedTextCorrection(), go(), ho(), isInsideGrid() (+27 more)

### Community 91 - "AuthContext.jsx"
Cohesion: 0.12
Nodes (34): AdminSystemHealthMatrix(), useAuthModalLogic(), useAdminAuthLogic(), AuthContext, AuthProvider(), useSystemTelemetry(), db, dbClient (+26 more)

### Community 92 - "inspect_finances.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 93 - "UserProfileModal.jsx"
Cohesion: 0.08
Nodes (31): ClientActiveOngoingCard(), ClientActiveRequestsList(), ClientHistoryList(), parseCommentAndBadges(), ClientPhoneRequirementModal(), ClientRadarSearchingCard(), ClientReviewCompletionModal(), findNearestCatalogCity() (+23 more)

### Community 94 - "update"
Cohesion: 0.04
Nodes (55): addTileFeatures(), appendLeaves(), cluster(), compareMax(), convertToGeoJSON(), createIndex(), createTile(), createTree() (+47 more)

### Community 95 - "send-otp.js"
Cohesion: 0.60
Nodes (4): cleanPhoneNumber(), generateOtpSignature(), handler(), recentRequests

### Community 96 - "upload-media.js"
Cohesion: 0.40
Nodes (3): config, R2_PUBLIC_DOMAIN, s3Client

### Community 97 - "dispatch-sos.js"
Cohesion: 0.47
Nodes (5): formatEvolutionNumber(), getDistanceKm(), handler(), POCKETBASE_URL, recentDispatches

### Community 98 - "verify-otp.js"
Cohesion: 0.70
Nodes (4): cleanPhoneNumber(), handler(), toPbId(), verifyOtpSignature()

### Community 99 - "inspect-supabase-records.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 101 - "supabase-status.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 106 - "relaunch_centrifugo.js"
Cohesion: 0.40
Nodes (4): configB64, configContent, conn, __dirname

### Community 110 - "test-adapter.js"
Cohesion: 0.50
Nodes (3): createPocketBaseSupabaseAdapter(), pb, testAdapter()

### Community 111 - "inspect_docker.js"
Cohesion: 0.50
Nodes (3): configJson, conn, __dirname

### Community 113 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, framework, headers, outputDirectory, rewrites

### Community 118 - "clean_test_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 119 - "update_centrifugo.js"
Cohesion: 0.50
Nodes (3): conn, __dirname, newConfig

### Community 121 - "simulate.js"
Cohesion: 0.33
Nodes (6): __dirname, envPath, envVars, __filename, runSimulation(), sleep()

### Community 122 - "logs.js"
Cohesion: 0.23
Nodes (12): C, __dirname, envPath, envVars, __filename, formatCentrifugoEvent(), formatTime(), getLevelBadge() (+4 more)

### Community 127 - "list_all_data.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 131 - "migrate-supabase-to-pocketbase.js"
Cohesion: 0.22
Nodes (9): COLLECTIONS_SCHEMA, __dirname, envPath, envVars, __filename, pb, runMigration(), supabase (+1 more)

### Community 132 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 133 - "placeLayerBucketPart"
Cohesion: 0.17
Nodes (15): attemptAnchorPlacement(), calculateVariableLayoutShift(), continuePlacement(), markUsedJustification(), markUsedOrientation(), packOpacity(), placeLayerBucketPart(), showCollisionBoxes() (+7 more)

### Community 135 - "deep-audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 136 - "jn"
Cohesion: 0.08
Nodes (31): Ar(), fromCenterSizeAngles(), fromInvProjectionMatrix(), Fs(), getCameraFrustum(), loadURL(), mf(), mo() (+23 more)

### Community 138 - "pocketbase-status.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, pb

### Community 148 - "🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS"
Cohesion: 0.29
Nodes (6): 🚀 Guide de Déploiement : Centrifugo Temps Réel sur VPS, 📋 Prérequis sur votre VPS, ⚡ Étape 1 : Copier les fichiers et Démarrer Centrifugo, 🔒 Étape 2 : Configurer Nginx & Certificat SSL (HTTPS / WSS), 🖥️ Étape 3 : Accéder au Dashboard Admin Centrifugo, 📱 Étape 4 : Activer Centrifugo dans le projet Frontend (Vite)

### Community 170 - "audit.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, pb

### Community 171 - "reconcile.js"
Cohesion: 0.29
Nodes (5): __dirname, envPath, envVars, __filename, supabase

### Community 172 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 175 - "watch-deploy.js"
Cohesion: 0.83
Nodes (3): clearScreen(), sleep(), watchLiveDeployments()

### Community 180 - "ClientDiagnosticFunnel.jsx"
Cohesion: 0.18
Nodes (12): ClientDiagnosticFunnel(), ClientSosForm(), FunnelStepCategory(), FunnelStepConfirmation(), FunnelStepQuestions(), DIAGNOSTIC_TAXONOMY, getSupportedMimeType(), VoiceRecorder() (+4 more)

### Community 181 - "AdminDashboard.jsx"
Cohesion: 0.07
Nodes (48): AdminClientsView(), AdminDisputesView(), AdminLiveMissions(), AdminLoyaltyRewardsView(), AdminMaalemsView(), AdminRechargesView(), AdminAuditModal(), AdminKpiBanners() (+40 more)

### Community 182 - "parse"
Cohesion: 0.04
Nodes (70): array(), assertRootKey(), checkSubtype(), clone(), completeTask(), containsMaxSafeIntegerValues(), createExpression(), createPropertyExpression() (+62 more)

### Community 183 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 184 - "pocketbase-schema.js"
Cohesion: 0.24
Nodes (9): ALL_COLLECTIONS, __dirname, envPath, __filename, filterArg, formatType(), inspect(), pb (+1 more)

### Community 185 - "pocketbase-types.ts"
Cohesion: 0.39
Nodes (8): AdminNotificationsRecord, BaseRecord, Collections, InterventionsRecord, MaalemDetailsRecord, ProfilesRecord, ReviewsRecord, TransactionsRecord

### Community 186 - "extend"
Cohesion: 0.03
Nodes (93): _afterTileLoadWorkerResponse(), _applyResourceTiming(), backgroundPatternUniformValues(), calculateTileRatio(), _charUsesLocalIdeographFontFamily(), clearTextures(), _createTinySDF(), destroy() (+85 more)

### Community 187 - "generate-types.js"
Cohesion: 0.32
Nodes (7): __dirname, __filename, generate(), inferType(), KNOWN_COLLECTIONS, pb, toPascalCase()

### Community 188 - "convertGeometryVector"
Cohesion: 0.24
Nodes (11): containsPolygonGeometry(), convertGeometryVector(), decodeDictionaryEncodedLineString(), decodeDictionaryEncodedLineStringOrRing(), decodeMorton(), decodeMortonDictionaryEncodedLineString(), decodeZOrderCurve(), geometryType() (+3 more)

### Community 190 - "cameraForBoxAndBearing"
Cohesion: 0.22
Nodes (17): adjustAntiMeridian(), cameraForBounds(), cameraForBoxAndBearing(), getEast(), getLesserNonNegativeNonNull(), getNorth(), getNorthEast(), getNorthWest() (+9 more)

### Community 191 - "Od"
Cohesion: 0.18
Nodes (17): ad, Dd(), distSqr(), Fd(), Gd(), jd(), kd(), Ld() (+9 more)

### Community 194 - "parseCssColor"
Cohesion: 0.13
Nodes (17): clamp$1(), constrainAngle(), getOwn(), hcl(), hslToRgb(), f(), lab(), overwriteGetter() (+9 more)

### Community 195 - "decodeFloat64Values"
Cohesion: 0.43
Nodes (7): decodeFloat64Values(), decodeRleFloat64(), decodeUnsignedRleFloat64(), decodeZigZagDeltaFloat64(), decodeZigZagFloat64(), decodeZigZagFloat64Value(), decodeZigZagRleFloat64()

### Community 196 - "🇲🇦 BricoleMoi • بريكول موال"
Cohesion: 0.14
Nodes (13): 1. 👤 Côté Particulier (Client), 2. 🛠️ Côté Artisan (Maâlem), 3. 🛡️ Côté Administration & Cockpit DevOps, 🇲🇦 BricoleMoi • بريكول موال, Commandes Utiles, 🚀 Démarrage Rapide en Local, Installation, 🏛️ Les 3 Piliers Indissociables (+5 more)

## Knowledge Gaps
- **666 isolated node(s):** `POCKETBASE_URL`, `recentDispatches`, `recentRequests`, `R2_PUBLIC_DOMAIN`, `s3Client` (+661 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `x()` connect `flyTo` to `assets/maplibre-gl.mjs`, `push`, `assets/maplibre-gl-shared.mjs`, `assets/maplibre-gl-worker.mjs`, `_addDefaultHandlers`, `get`, `evaluate`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `update`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `y()` connect `flyTo` to `assets/maplibre-gl.mjs`, `push`, `assets/maplibre-gl-shared.mjs`, `assets/maplibre-gl-worker.mjs`, `_addDefaultHandlers`, `get`, `evaluate`, `coveringTiles`, `_calcMatrices`, `constructor`, `get`, `update`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `constructor()` connect `constructor` to `appendRoundCorner`, `push`, `constructor`, `assets/maplibre-gl-dev.mjs`, `.handleEvent`, `_addDefaultHandlers`, `flyTo`, `sub`, `coveringTiles`, `get`, `_calcMatrices`, `get`, `._update`, `extend`, `update`, `parse`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `constructor()` (e.g. with `name()` and `size()`) actually correct?**
  _`constructor()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `POCKETBASE_URL`, `recentDispatches`, `recentRequests` to the rest of the system?**
  _666 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `public/maplibre-gl.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.005372451895599162 - nodes in this community are weakly interconnected._
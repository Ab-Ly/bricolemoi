import React, { useState, useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { MAP_STYLES, getMapStyleJson } from './map/mapStyles';
import { MapControlsOverlay } from './map/MapControlsOverlay';
import { useMapMarkers } from './map/useMapMarkers';

if (typeof window !== 'undefined' && maplibregl?.config) {
  maplibregl.config.WORKER_URL = '/assets/maplibre-gl-worker.mjs';
}

export const InteractiveMap = ({
  onLocationSelect,
  selectedLat,
  selectedLng,
  mode = 'CLIENT_PICKER', // 'CLIENT_PICKER' | 'MAALEM_RADAR' | 'ADMIN_SUPERVISION'
  activeRouteCoords = null,
  trackingMaalemPos = null,
  trackingMaalemId = null,
  etaSummary = null,
  distanceKm = null,
  durationMin = null
}) => {
  const { user } = useAuth();
  const { maalems = [], interventions = [] } = useApp();

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hasGpuError, setHasGpuError] = useState(false);

  const [activeStyleKey, setActiveStyleKey] = useState('OSM_FR');
  const [mapTheme, setMapTheme] = useState('GOLD_CYAN');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Position GPS par défaut (Casablanca)
  const [userGPSPos, setUserGPSPos] = useState(() => {
    try {
      const saved = localStorage.getItem('bricolemoi_client_gps');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.lat && p.lng) return { lat: parseFloat(p.lat), lng: parseFloat(p.lng) };
      }
    } catch (e) {}
    return { lat: 33.5883, lng: -7.6328 };
  });

  const isMaalemOrAdmin = user?.role === 'MAALEM' || user?.role === 'ADMIN' || mode !== 'CLIENT_PICKER';

  // Hook dédié à la gestion des marqueurs
  useMapMarkers({
    mapRef,
    mapLoaded,
    user,
    userGPSPos,
    selectedLat,
    selectedLng,
    mode,
    onLocationSelect,
    activeRouteCoords,
    maalems,
    interventions,
    trackingMaalemPos,
    trackingMaalemId,
    isMaalemOrAdmin,
    etaSummary,
    distanceKm,
    durationMin
  });

  // 1. Initialisation MapLibre GL
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let map = null;
    try {
      const initialLat = parseFloat(selectedLat || userGPSPos.lat || 33.5883);
      const initialLng = parseFloat(selectedLng || userGPSPos.lng || -7.6328);

      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getMapStyleJson(activeStyleKey),
        center: [initialLng, initialLat],
        zoom: 14,
        maxZoom: 19,
        minZoom: 5,
        attributionControl: false
      });

      mapRef.current = map;

      map.on('load', () => {
        setMapLoaded(true);
        map.resize();
      });

      map.on('error', (e) => {
        if (e?.error?.message?.includes('WebGL') || e?.error?.message?.includes('GPU')) {
          setHasGpuError(true);
        }
      });
    } catch (err) {
      console.warn('[InteractiveMap] Fallback GPU non-WebGL:', err);
      setHasGpuError(true);
    }

    if (mode === 'CLIENT_PICKER' && map) {
      map.on('click', (e) => {
        if (onLocationSelect && (!activeRouteCoords || activeRouteCoords.length < 2)) {
          onLocationSelect(e.lngLat.lat, e.lngLat.lng);
        }
      });
    }

    return () => {
      setMapLoaded(false);
      try {
        if (map && typeof map.remove === 'function') {
          map.remove();
        }
      } catch (err) {}
      mapRef.current = null;
    };
  }, [activeStyleKey]);

  // 2. Centrage fluide sur changement de sélection
  useEffect(() => {
    if (activeRouteCoords && activeRouteCoords.length >= 2) return;

    if (mapRef.current && mapLoaded && selectedLat && selectedLng) {
      try {
        mapRef.current.flyTo({
          center: [parseFloat(selectedLng), parseFloat(selectedLat)],
          zoom: 14.5,
          speed: 1.2
        });
      } catch (e) {}
    }
  }, [selectedLat, selectedLng, activeRouteCoords, mapLoaded]);

  // 3. Tracé d'itinéraire OSRM
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const sourceId = 'active-sos-route-source';
    const layerId = 'active-sos-route-layer';

    if (activeRouteCoords && activeRouteCoords.length >= 2) {
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: activeRouteCoords
        }
      };

      if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(geojson);
      } else {
        map.addSource(sourceId, { type: 'geojson', data: geojson });
        map.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#2563eb',
            'line-width': 5,
            'line-opacity': 0.85
          }
        });
      }
    } else {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    }
  }, [activeRouteCoords, mapLoaded]);

  // Actions de cadrage
  const handleGeolocateUser = () => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserGPSPos(coords);
        setIsLocating(false);
        if (mapRef.current) {
          mapRef.current.flyTo({ center: [coords.lng, coords.lat], zoom: 15.5, speed: 1.4 });
        }
        if (onLocationSelect && mode === 'CLIENT_PICKER') {
          onLocationSelect(coords.lat, coords.lng);
        }
      },
      () => setIsLocating(false),
      { timeout: 6000, maximumAge: 30000 }
    );
  };

  const handleFitAllMaalems = () => {
    const map = mapRef.current;
    if (!map || maalems.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    maalems.forEach((m) => {
      const lat = parseFloat(m.lat);
      const lng = parseFloat(m.lng);
      if (!isNaN(lat) && !isNaN(lng)) bounds.extend([lng, lat]);
    });
    if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
  };

  const handleFitAllLeads = () => {
    const map = mapRef.current;
    if (!map) return;
    const pendingLeads = interventions.filter((i) => i.status === 'PENDING');
    if (pendingLeads.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    pendingLeads.forEach((item) => {
      const lat = parseFloat(item.lat);
      const lng = parseFloat(item.lng);
      if (!isNaN(lat) && !isNaN(lng)) bounds.extend([lng, lat]);
    });
    if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 60, maxZoom: 15 });
  };

  const handleFitFullRoute = () => {
    const map = mapRef.current;
    if (!map || !activeRouteCoords || activeRouteCoords.length < 2) return;
    const bounds = new maplibregl.LngLatBounds();
    activeRouteCoords.forEach((pt) => bounds.extend(pt));
    if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 60, maxZoom: 16 });
  };

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white font-sans">
      {/* Canvas MapLibre */}
      <div 
        ref={mapContainerRef} 
        className={`w-full h-[320px] xs:h-[370px] sm:h-[440px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden map-theme-${mapTheme.toLowerCase().replace('_', '-')}`} 
      />

      {/* Fallback GPU */}
      {hasGpuError && (
        <div className="absolute inset-0 bg-slate-50/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-xs">
            <MapPin className="w-6 h-6" />
          </div>
          <h4 className="font-black text-slate-900 text-sm sm:text-base">Coordonnées GPS Confirmées</h4>
          <p className="text-xs text-slate-600 max-w-sm mt-1">
            Votre position ({selectedLat ? Number(selectedLat).toFixed(4) : '33.5883'}, {selectedLng ? Number(selectedLng).toFixed(4) : '-7.6328'}) est transmise en temps réel.
          </p>
        </div>
      )}

      {/* Barres de Contrôles & Outils */}
      <MapControlsOverlay
        isLocating={isLocating}
        handleGeolocateUser={handleGeolocateUser}
        showThemeMenu={showThemeMenu}
        setShowThemeMenu={setShowThemeMenu}
        showLayerMenu={showLayerMenu}
        setShowLayerMenu={setShowLayerMenu}
        mapTheme={mapTheme}
        setMapTheme={setMapTheme}
        activeStyleKey={activeStyleKey}
        setActiveStyleKey={setActiveStyleKey}
        isMaalemOrAdmin={isMaalemOrAdmin}
        handleFitAllLeads={handleFitAllLeads}
        handleFitAllMaalems={handleFitAllMaalems}
        handleFitFullRoute={handleFitFullRoute}
        activeMaalemsCount={maalems.filter(m => m.is_online).length}
        pendingLeadsCount={interventions.filter(i => i.status === 'PENDING').length}
        activeRouteCoords={activeRouteCoords}
        mode={mode}
        selectedLat={selectedLat}
        selectedLng={selectedLng}
        onRecenterSelected={() => {
          if (mapRef.current && selectedLat && selectedLng) {
            mapRef.current.flyTo({ center: [parseFloat(selectedLng), parseFloat(selectedLat)], zoom: 15.5, speed: 1.3 });
          }
        }}
      />
    </div>
  );
};

import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import { 
  getMapIconSvg, 
  calculateDistanceInKm, 
  computeBearing, 
  renderMaalemPopupHtml, 
  renderTrackingPopupHtml 
} from './mapHelpers';

export const useMapMarkers = ({
  mapRef,
  mapLoaded,
  user,
  userGPSPos,
  selectedLat,
  selectedLng,
  mode,
  onLocationSelect,
  activeRouteCoords,
  maalems = [],
  interventions = [],
  trackingMaalemPos,
  trackingMaalemId,
  isMaalemOrAdmin,
  etaSummary,
  distanceKm,
  durationMin
}) => {
  const clientMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const maalemMarkersRef = useRef({});
  const trackingMaalemMarkerRef = useRef(null);
  const emergencyMarkersRef = useRef({});

  // Animation véhicule
  const vehicleAnimRef = useRef(null);
  const currentVehiclePosRef = useRef(null);
  const currentVehicleHeadingRef = useRef(0);
  const vehicleHeadingRingRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const isRouteActive = Boolean(activeRouteCoords && activeRouteCoords.length >= 2);

    // 1. Marqueur GPS Client (Pulse bleu)
    if (isRouteActive) {
      if (clientMarkerRef.current) {
        clientMarkerRef.current.remove();
        clientMarkerRef.current = null;
      }
    } else {
      if (!clientMarkerRef.current) {
        const el = document.createElement('div');
        el.style.width = '36px';
        el.style.height = '36px';
        el.className = 'relative flex items-center justify-center cursor-pointer';
        el.innerHTML = `
          <div class="absolute w-10 h-10 rounded-full bg-blue-500/25 animate-ping"></div>
          <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md shadow-blue-500/40"></div>
        `;

        const popup = new maplibregl.Popup({ offset: 25, className: 'clean-trust-popup' }).setHTML(
          `<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="font-black text-slate-900 text-xs">Votre Position GPS</p>
            <p class="text-[10px] text-slate-500 font-mono mt-0.5">${userGPSPos.lat.toFixed(4)}, ${userGPSPos.lng.toFixed(4)}</p>
          </div>`
        );

        clientMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat([userGPSPos.lng, userGPSPos.lat])
          .setPopup(popup)
          .addTo(map);
      } else {
        clientMarkerRef.current.setLngLat([userGPSPos.lng, userGPSPos.lat]);
        if (!clientMarkerRef.current.getElement().parentNode) {
          clientMarkerRef.current.addTo(map);
        }
      }
    }

    // 2. Marqueur Destination (Point d'intervention sélectionné)
    const destLat = parseFloat(selectedLat || userGPSPos?.lat || 33.5883);
    const destLng = parseFloat(selectedLng || userGPSPos?.lng || -7.6328);

    if (mode === 'CLIENT_PICKER' && !isNaN(destLat) && !isNaN(destLng)) {
      if (!destinationMarkerRef.current) {
        const el = document.createElement('div');
        el.style.width = '44px';
        el.style.height = '52px';
        el.className = `${isRouteActive ? '' : 'cursor-move'} transform -translate-y-full transition-transform hover:scale-110 z-30`;
        el.innerHTML = `
          <div class="relative flex flex-col items-center">
            <div class="w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border-2 border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="w-1.5 h-3.5 bg-blue-600 shadow-sm rounded-b-full"></div>
          </div>
        `;

        const popup = new maplibregl.Popup({ offset: 25, className: 'clean-trust-popup' }).setHTML(
          `<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="text-xs font-black text-slate-900">${isRouteActive ? "Point d'Arrivée" : "Point d'Intervention"}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">${isRouteActive ? "Adresse confirmée" : "Glissez pour affiner"}</p>
          </div>`
        );

        destinationMarkerRef.current = new maplibregl.Marker({ element: el, draggable: !isRouteActive })
          .setLngLat([destLng, destLat])
          .setPopup(popup)
          .addTo(map);

        if (!isRouteActive) {
          destinationMarkerRef.current.on('dragend', () => {
            const lngLat = destinationMarkerRef.current.getLngLat();
            if (onLocationSelect) {
              onLocationSelect(lngLat.lat, lngLat.lng);
            }
          });
        }
      } else {
        destinationMarkerRef.current.setLngLat([destLng, destLat]);
        destinationMarkerRef.current.setDraggable(!isRouteActive);
        if (!destinationMarkerRef.current.getElement().parentNode) {
          destinationMarkerRef.current.addTo(map);
        }
      }
    }

    // 3. Marqueurs Artisans Maâlems Disponibles
    const mapCenterLat = parseFloat(selectedLat || userGPSPos?.lat || 33.5883);
    const mapCenterLng = parseFloat(selectedLng || userGPSPos?.lng || -7.6328);

    const filteredMaalems = (maalems || []).filter((m) => {
      if (m.is_online !== true || m.is_available === false) return false;
      const mLat = parseFloat(m.lat);
      const mLng = parseFloat(m.lng);
      if (isNaN(mLat) || isNaN(mLng) || mLat < 20 || mLat > 38 || mLng >= 0) return false;
      return true;
    });

    Object.keys(maalemMarkersRef.current).forEach((id) => {
      const stillActive = filteredMaalems.some((m) => String(m.id).trim() === String(id).trim());
      if (!stillActive) {
        maalemMarkersRef.current[id].remove();
        delete maalemMarkersRef.current[id];
      }
    });

    filteredMaalems.forEach((m) => {
      if (trackingMaalemPos && trackingMaalemId && String(m.id).trim() === String(trackingMaalemId).trim()) {
        if (maalemMarkersRef.current[m.id]) {
          maalemMarkersRef.current[m.id].remove();
          delete maalemMarkersRef.current[m.id];
        }
        return;
      }

      const mLat = parseFloat(m.lat || 33.5883);
      const mLng = parseFloat(m.lng || -7.6328);
      if (isNaN(mLat) || isNaN(mLng) || mLat < 20 || mLat > 38 || mLng >= 0) return;

      const isSelf = user && String(m.id).trim() === String(user.id).trim();
      const svgIcon = getMapIconSvg(m.specialty);
      const dist = calculateDistanceInKm(mapCenterLat, mapCenterLng, mLat, mLng);
      const etaMin = Math.max(3, Math.round((dist / 30) * 60));

      if (!maalemMarkersRef.current[m.id]) {
        const el = document.createElement('div');
        el.style.width = '44px';
        el.style.height = '44px';
        el.className = 'relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125';

        if (isSelf) {
          el.innerHTML = `
            <div class="absolute w-12 h-12 rounded-2xl bg-emerald-500/30 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-500 shadow-md flex items-center justify-center text-emerald-600">
              ${svgIcon}
            </div>
            <span class="absolute -top-1 -right-1 px-1.5 py-0.2 bg-emerald-600 text-[8px] font-black text-white rounded-full border border-white">VOUS</span>
          `;
        } else {
          el.innerHTML = `
            <div class="absolute w-10 h-10 rounded-2xl bg-blue-500/20 animate-pulse"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-blue-600 shadow-md flex items-center justify-center text-blue-600">
              ${svgIcon}
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
          `;
        }

        const popup = new maplibregl.Popup({ offset: 20, className: 'clean-trust-popup' }).setHTML(
          renderMaalemPopupHtml({ maalem: m, isSelf, distanceKm: dist, etaMin })
        );

        maalemMarkersRef.current[m.id] = new maplibregl.Marker({ element: el })
          .setLngLat([mLng, mLat])
          .setPopup(popup)
          .addTo(map);
      } else {
        maalemMarkersRef.current[m.id].setLngLat([mLng, mLat]);
        if (!maalemMarkersRef.current[m.id].getElement().parentNode) {
          maalemMarkersRef.current[m.id].addTo(map);
        }
      }
    });

    // 4. Véhicule Maâlem en Route (Interpolation fluide WhatsApp)
    if (trackingMaalemPos && Array.isArray(trackingMaalemPos) && trackingMaalemPos.length >= 2) {
      const tLat = parseFloat(trackingMaalemPos[0]);
      const tLng = parseFloat(trackingMaalemPos[1]);
      if (!isNaN(tLat) && !isNaN(tLng) && tLat > 20 && tLat < 38) {
        const trackingMaalemObj = (maalems || []).find((m) => String(m.id).trim() === String(trackingMaalemId).trim());
        const trackingPopupHtml = renderTrackingPopupHtml({ maalem: trackingMaalemObj, etaSummary, distanceKm, durationMin });

        if (!trackingMaalemMarkerRef.current) {
          const el = document.createElement('div');
          el.style.width = '58px';
          el.style.height = '58px';
          el.className = 'relative flex items-center justify-center cursor-pointer z-40 group';

          el.innerHTML = `
            <div class="absolute w-14 h-14 rounded-full bg-amber-500/25 animate-ping pointer-events-none"></div>
            <div class="absolute w-11 h-11 rounded-full bg-amber-500/15 animate-pulse pointer-events-none"></div>
            <div class="vehicle-heading-ring absolute w-12 h-12 flex items-center justify-center transition-transform duration-500 ease-out pointer-events-none">
              <div class="absolute -top-1.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-amber-600 drop-shadow-sm"></div>
            </div>
            <div class="relative w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-700 border-2.5 border-white shadow-[0_6px_18px_rgba(217,119,6,0.45)] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-xs"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
              <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
            </div>
            <div class="absolute -bottom-3 px-2 py-0.5 bg-slate-900/95 backdrop-blur-md text-white text-[9px] font-black tracking-wide rounded-full border border-slate-700/80 shadow-md flex items-center gap-1 pointer-events-none whitespace-nowrap">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>MAÂLEM EN ROUTE</span>
            </div>
          `;

          vehicleHeadingRingRef.current = el.querySelector('.vehicle-heading-ring');
          currentVehiclePosRef.current = [tLng, tLat];

          const popup = new maplibregl.Popup({ offset: 25, className: 'clean-trust-popup' }).setHTML(trackingPopupHtml);

          trackingMaalemMarkerRef.current = new maplibregl.Marker({ element: el })
            .setLngLat([tLng, tLat])
            .setPopup(popup)
            .addTo(map);
        } else {
          if (!trackingMaalemMarkerRef.current.getElement().parentNode) {
            trackingMaalemMarkerRef.current.addTo(map);
          }

          const existingPopup = trackingMaalemMarkerRef.current.getPopup();
          if (existingPopup) existingPopup.setHTML(trackingPopupHtml);

          const prevPos = currentVehiclePosRef.current || [tLng, tLat];
          const [fromLng, fromLat] = prevPos;
          const delta = Math.hypot(tLng - fromLng, tLat - fromLat);

          if (delta > 0.00004) {
            const heading = computeBearing(fromLat, fromLng, tLat, tLng);
            currentVehicleHeadingRef.current = heading;
            if (vehicleHeadingRingRef.current) {
              vehicleHeadingRingRef.current.style.transform = `rotate(${Math.round(heading)}deg)`;
            }

            if (vehicleAnimRef.current) cancelAnimationFrame(vehicleAnimRef.current);

            const startTime = performance.now();
            const duration = 1200;

            const glideStep = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);

              const curLng = fromLng + (tLng - fromLng) * ease;
              const curLat = fromLat + (tLat - fromLat) * ease;
              currentVehiclePosRef.current = [curLng, curLat];

              if (trackingMaalemMarkerRef.current) {
                trackingMaalemMarkerRef.current.setLngLat([curLng, curLat]);
              }

              if (progress < 1) {
                vehicleAnimRef.current = requestAnimationFrame(glideStep);
              } else {
                vehicleAnimRef.current = null;
                currentVehiclePosRef.current = [tLng, tLat];
              }
            };

            vehicleAnimRef.current = requestAnimationFrame(glideStep);
          } else {
            trackingMaalemMarkerRef.current.setLngLat([tLng, tLat]);
            currentVehiclePosRef.current = [tLng, tLat];
          }
        }
      }
    } else if (trackingMaalemMarkerRef.current) {
      if (vehicleAnimRef.current) {
        cancelAnimationFrame(vehicleAnimRef.current);
        vehicleAnimRef.current = null;
      }
      trackingMaalemMarkerRef.current.remove();
      trackingMaalemMarkerRef.current = null;
      vehicleHeadingRingRef.current = null;
      currentVehiclePosRef.current = null;
    }

    // 5. Urgences SOS (Chantiers en attente PENDING)
    if (!isMaalemOrAdmin) {
      Object.keys(emergencyMarkersRef.current).forEach((id) => {
        emergencyMarkersRef.current[id].remove();
        delete emergencyMarkersRef.current[id];
      });
    } else {
      const pendingInterventions = interventions.filter((i) => i.status === 'PENDING');
      const pendingIds = new Set(pendingInterventions.map((i) => String(i.id).trim()));

      Object.keys(emergencyMarkersRef.current).forEach((id) => {
        if (!pendingIds.has(String(id).trim())) {
          emergencyMarkersRef.current[id].remove();
          delete emergencyMarkersRef.current[id];
        }
      });

      pendingInterventions.forEach((item) => {
        const lat = parseFloat(item.lat || 33.5883);
        const lng = parseFloat(item.lng || -7.6328);
        if (isNaN(lat) || isNaN(lng)) return;

        const svgIcon = getMapIconSvg(item.service_type);
        const distanceKmVal = calculateDistanceInKm(userGPSPos.lat, userGPSPos.lng, lat, lng);

        if (!emergencyMarkersRef.current[item.id]) {
          const el = document.createElement('div');
          el.style.width = '44px';
          el.style.height = '44px';
          el.className = 'relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125';
          el.innerHTML = `
            <div class="absolute w-11 h-11 rounded-2xl bg-red-500/20 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-red-500 shadow-md flex items-center justify-center text-red-600">
              ${svgIcon}
            </div>
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-xs"></span>
          `;

          const popup = new maplibregl.Popup({ offset: 25, className: 'clean-trust-popup' }).setHTML(
            `<div class="bg-white/95 backdrop-blur-xl border border-red-200 p-3.5 min-w-[240px] space-y-2 font-sans text-slate-800 rounded-2xl shadow-xl">
              <div class="flex items-center justify-between border-b border-red-100 pb-2">
                <span class="font-black text-xs text-red-600 uppercase">SOS ${item.subcategory || 'Dépannage Urgent'}</span>
                <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-mono font-bold">15 DH</span>
              </div>
              <p class="text-xs font-bold text-slate-900">📍 ${item.district || 'Casablanca'}</p>
              <div class="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                <span>Distance : <strong>${distanceKmVal} km</strong></span>
                <span class="text-blue-700 font-bold">Accord Direct</span>
              </div>
            </div>`
          );

          emergencyMarkersRef.current[item.id] = new maplibregl.Marker({ element: el })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map);
        } else {
          emergencyMarkersRef.current[item.id].setLngLat([lng, lat]);
          if (!emergencyMarkersRef.current[item.id].getElement().parentNode) {
            emergencyMarkersRef.current[item.id].addTo(map);
          }
        }
      });
    }

  }, [
    mapLoaded,
    maalems,
    interventions,
    userGPSPos,
    selectedLat,
    selectedLng,
    mode,
    activeRouteCoords,
    trackingMaalemPos,
    trackingMaalemId,
    isMaalemOrAdmin,
    etaSummary,
    distanceKm,
    durationMin
  ]);

  return {
    clientMarkerRef,
    destinationMarkerRef,
    maalemMarkersRef,
    trackingMaalemMarkerRef,
    emergencyMarkersRef
  };
};

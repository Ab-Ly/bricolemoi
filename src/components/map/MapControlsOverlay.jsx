import React from 'react';
import { motion } from 'framer-motion';
import { 
  Crosshair, 
  Palette, 
  Layers, 
  Sparkles, 
  Navigation, 
  MapPin 
} from 'lucide-react';
import { MAP_STYLES, ROAD_COLOR_THEMES } from './mapStyles';

export const MapControlsOverlay = ({
  isLocating,
  handleGeolocateUser,
  showThemeMenu,
  setShowThemeMenu,
  showLayerMenu,
  setShowLayerMenu,
  mapTheme,
  setMapTheme,
  activeStyleKey,
  setActiveStyleKey,
  isMaalemOrAdmin,
  handleFitAllLeads,
  handleFitAllMaalems,
  handleFitFullRoute,
  activeMaalemsCount = 0,
  pendingLeadsCount = 0,
  activeRouteCoords,
  mode,
  selectedLat,
  selectedLng,
  onRecenterSelected
}) => {
  return (
    <>
      {/* Floating Top Toolbar: GPS, Color Palette, & Layer Switcher */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1.25rem)] font-sans">
        <button
          type="button"
          onClick={handleGeolocateUser}
          disabled={isLocating}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer"
          title="Centrer sur ma position GPS"
        >
          <Crosshair className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isLocating ? 'animate-spin text-amber-500' : 'text-blue-600'}`} />
          <span className="hidden xs:inline">{isLocating ? 'GPS...' : 'GPS'}</span>
        </button>

        {/* Road & Streets Color Palette Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowThemeMenu(!showThemeMenu);
              setShowLayerMenu(false);
            }}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer"
            title="Personnaliser la couleur des rues et routes"
          >
            <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
            <span className="hidden sm:inline">Couleur Rues</span>
          </button>

          {showThemeMenu && (
            <div className="absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-2 shadow-xl z-30 space-y-1.5 font-sans">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1">Palette des Routes :</p>
              {ROAD_COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setMapTheme(theme.id);
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 cursor-pointer ${
                    mapTheme === theme.id
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${theme.iconColor} shadow-xs mt-0.5 flex-shrink-0`} />
                  <div>
                    <span className="block font-black leading-tight">{theme.label}</span>
                    <span className="text-[10px] font-normal text-slate-500 block">{theme.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Basemap Source Layer Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowLayerMenu(!showLayerMenu);
              setShowThemeMenu(false);
            }}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer"
            title="Changer la source de la carte"
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
            <span className="hidden xs:inline">{MAP_STYLES[activeStyleKey]?.name.split(' ')[0]}</span>
          </button>

          {showLayerMenu && (
            <div className="absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-1.5 shadow-xl z-30 space-y-1 font-sans">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1">Source Cartographique :</p>
              {Object.entries(MAP_STYLES).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveStyleKey(key);
                    setShowLayerMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeStyleKey === key
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-2">{item.name}</span>
                  {activeStyleKey === key && <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modern Clean Footer Bar */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 sm:p-3 px-2.5 sm:px-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs text-slate-700 shadow-sm font-sans">
        {isMaalemOrAdmin ? (
          <>
            <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2">
              <div className="h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 rounded-xl shadow-xs text-[10px] sm:text-xs whitespace-nowrap">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="truncate">GPS Pro</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleFitAllLeads}
                className="h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-red-800 hover:text-red-900 transition-all cursor-pointer bg-red-50 hover:bg-red-100 px-2 rounded-xl border border-red-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap"
                title="Cadrer sur toutes les urgences SOS ouvertes dans la zone"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 inline-block animate-ping flex-shrink-0" />
                <span className="truncate">SOS ({pendingLeadsCount})</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleFitAllMaalems}
                className="h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2 rounded-xl border border-emerald-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap"
                title="Cadrer sur les Maâlems disponibles sur la carte"
              >
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"></span>
                </span>
                <span className="truncate">Maâlems ({activeMaalemsCount})</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleFitAllLeads}
                className="h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                title="Cadrer l'ensemble de la zone active"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span className="truncate">Chantiers</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleGeolocateUser}
                disabled={isLocating}
                className="h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                title="Centrer la carte sur votre position GPS exacte"
              >
                <Navigation className={`w-3.5 h-3.5 text-white flex-shrink-0 ${isLocating ? 'animate-spin' : ''}`} />
                <span className="truncate">{isLocating ? '...' : 'Ma Position'}</span>
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2">
              <div className="h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 sm:px-3 rounded-xl shadow-xs text-[11px] sm:text-xs whitespace-nowrap">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="truncate">Votre Position</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleFitAllMaalems}
                className="h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 sm:px-3 rounded-xl border border-emerald-200 shadow-xs text-[11px] sm:text-xs whitespace-nowrap"
                title="Cadrer sur les Maâlems disponibles autour de vous"
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="truncate">Artisans ({activeMaalemsCount}) 🟢</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {activeRouteCoords && activeRouteCoords.length >= 2 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleFitFullRoute}
                  className="h-8 sm:h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 sm:px-3 rounded-xl border border-blue-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                  title="Cadrer l'ensemble du trajet (Artisan et Arrivée)"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="truncate">Tout le Trajet</span>
                </motion.button>
              )}

              {mode === 'CLIENT_PICKER' && selectedLat && selectedLng && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onRecenterSelected}
                  className="h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                  title="Recadrer sur l'adresse sélectionnée"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="truncate">Point SOS</span>
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleGeolocateUser}
                disabled={isLocating}
                className="h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer"
                title="Centrer la carte sur votre position GPS"
              >
                <Navigation className={`w-3.5 h-3.5 text-white flex-shrink-0 ${isLocating ? 'animate-spin' : ''}`} />
                <span className="truncate">{isLocating ? '...' : 'Ma Position'}</span>
              </motion.button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

import{j as e,m as B}from"./motion-vendor-CMfAyWHL-v3.js";import{r as x,M as Re,br as ze,bs as Ze,be as Ie,S as Ke,aG as pe,bt as We,aW as qe,az as Je,bu as Ye}from"./icons-vendor-BwZ0ELpS-v3.js";import{x as Qe,C as Xe,$ as Y,M as Q,K as se,a as Ge}from"./maplibre-vendor-v_HaOzn3-v3.js";import{u as et,a as tt,z as _e}from"./index-CDaB9hyo-v3.js";typeof window<"u"&&Ge&&(Ge.WORKER_URL="/assets/maplibre-gl-worker.mjs");const re={OSM_FR:{id:"OSM_FR",name:"Plan Urbain HD Maroc (Rues Nommées & Bâtiments)",tiles:["https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png","https://b.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png","https://c.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"],attribution:"&copy; OpenStreetMap France & contributeurs"},OSM_HOT:{id:"OSM_HOT",name:"OSM Humanitarian Hot (Épuré Pastel)",tiles:["https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png","https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png","https://c.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"],attribution:"&copy; OpenStreetMap contributors, Humanitarian OSM"},ESRI_STREETS:{id:"ESRI_STREETS",name:"Esri World Streets HD (Officiel & Détaillé)",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],attribution:"&copy; Esri, HERE, Garmin, OpenStreetMap"},VPS_DEDICATED:{id:"VPS_DEDICATED",name:"Serveur Dédié VPS BricoleMoi (Ultra-Rapide)",tiles:["/tiles-proxy/styles/basic-preview/{z}/{x}/{y}.png"],attribution:"&copy; BricoleMoi Dedicated VPS &copy; OpenMapTiles"},SATELLITE:{id:"SATELLITE",name:"Vue Satellite HD (Bâtiments réels)",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],attribution:"&copy; Esri, Maxar, Earthstar Geographics"}},st=[{id:"GOLD_CYAN",label:"Doré & Cyan (Haute Clarté)",iconColor:"bg-amber-400",desc:"Grands axes dorés et rues nettes"},{id:"NEON_CYBER",label:"Néon Cyberpunk (Sombre)",iconColor:"bg-cyan-400",desc:"Radar de nuit avec routes fluorescentes"},{id:"SILVER_SLATE",label:"Silver Épuré (Minimaliste)",iconColor:"bg-slate-300",desc:"Rendu monochrome moderne"},{id:"NATURAL",label:"Couleurs Naturelles (Standard)",iconColor:"bg-emerald-400",desc:"Rendu topographique officiel"}],rt=n=>{const t=re[n]||re.OSM_FR,p=typeof window<"u"&&(window.devicePixelRatio||1)>1.25;return{version:8,sources:{"base-tiles":{type:"raster",tiles:t.tiles.map(w=>w.replace("{r}",p?"@2x":"")),tileSize:256,attribution:t.attribution||"&copy; OpenStreetMap"}},layers:[{id:"base-tiles-layer",type:"raster",source:"base-tiles",minzoom:0,maxzoom:20,paint:{"raster-resampling":"linear","raster-contrast":.05,"raster-saturation":.05}}]}},C={PLUMBING:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
      <path d="M12 2.25C12 2.25 5.5 9.75 5.5 15.25C5.5 18.84 8.41 21.75 12 21.75C15.59 21.75 18.5 18.84 18.5 15.25C18.5 9.75 12 2.25 12 2.25Z" fill="url(#pGradMap)" stroke="#0284c7" stroke-width="1.5"/>
      <circle cx="10" cy="14" r="1.5" fill="#ffffff" opacity="0.9"/>
    </svg>
  `,ELECTRICIAN:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
      </defs>
      <path d="M13 2L3.5 13.5H12L11 22L20.5 10.5H12L13 2Z" fill="url(#eGradMap)" stroke="#b45309" stroke-width="1.2"/>
    </svg>
  `,AUTO_MECHANIC:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0891b2"/>
          <stop offset="100%" stop-color="#0e7490"/>
        </linearGradient>
      </defs>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.85 7H17.14L18.22 10.14H5.78L6.85 7Z" fill="url(#aGradMap)" stroke="#155e75" stroke-width="1.2"/>
    </svg>
  `,NETTOYAGE:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
      <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" fill="url(#cGradMap)" stroke="#0369a1" stroke-width="1.2"/>
    </svg>
  `,MENUISERIE:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
      </defs>
      <path d="M15 3L21 9L19.5 10.5L17.5 8.5L10 16L8 14L15.5 6.5L13.5 4.5L15 3Z" fill="url(#mGradMap)" stroke="#92400e" stroke-width="1.2"/>
    </svg>
  `,SERRURERIE:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#059669"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 7C13.66 7 15 8.34 15 10C15 11.23 14.26 12.28 13.2 12.74L14.5 17H12.5L12 15H11L10.5 17H8.5L9.8 12.74C8.74 12.28 8 11.23 8 10C8 8.34 9.34 7 12 7Z" fill="url(#sGradMap)" stroke="#065f46" stroke-width="1.2"/>
    </svg>
  `,ELECTROMENAGER:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tvGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9333ea"/>
          <stop offset="100%" stop-color="#7e22ce"/>
        </linearGradient>
      </defs>
      <rect x="2" y="6" width="20" height="13" rx="3" fill="url(#tvGradMap)" stroke="#6b21a8" stroke-width="1.2"/>
      <path d="M17 2L13 6M7 2L11 6" stroke="#9333ea" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,JARDINAGE:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#16a34a"/>
          <stop offset="100%" stop-color="#15803d"/>
        </linearGradient>
      </defs>
      <path d="M12 2C8 2 5 6 5 10C5 13.5 7.5 16.5 11 17.8V21H13V17.8C16.5 16.5 19 13.5 19 10C19 6 16 2 12 2Z" fill="url(#jGradMap)" stroke="#166534" stroke-width="1.2"/>
    </svg>
  `,DERATISATION:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#65a30d"/>
          <stop offset="100%" stop-color="#4d7c0f"/>
        </linearGradient>
      </defs>
      <path d="M12 2L3 6V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V6L12 2Z" fill="url(#dGradMap)" stroke="#3f6212" stroke-width="1.2"/>
    </svg>
  `,PISCINE:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="poGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
      <path d="M2 12C4.5 12 5.5 10 8 10C10.5 10 11.5 12 14 12C16.5 12 17.5 10 20 10M2 17C4.5 17 5.5 15 8 15C10.5 15 11.5 17 14 17C16.5 17 17.5 15 20 15" stroke="url(#poGradMap)" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,CLIMATISATION:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93M8 4L12 8L16 4M20 8L16 12L20 16M16 20L12 16L8 20M4 16L8 12L4 8" stroke="url(#clGradMap)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="2.5" fill="#38bdf8"/>
    </svg>
  `,PEINTURE:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ptGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899"/>
          <stop offset="100%" stop-color="#be185d"/>
        </linearGradient>
      </defs>
      <path d="M19 11V4C19 2.9 18.1 2 17 2H5C3.9 2 3 2.9 3 4V11C3 12.1 3.9 13 5 13H17C18.1 13 19 12.1 19 11ZM19 11V15C19 16.1 18.1 17 17 17H13V20H15C15.55 20 16 20.45 16 21C16 21.55 15.55 22 15 22H9C8.45 22 8 21.55 8 21C8 20.45 8.45 20 9 20H11V17H7C5.9 17 5 16.1 5 15V13" fill="url(#ptGradMap)" stroke="#be185d" stroke-width="1.2"/>
    </svg>
  `,MACONNERIE:`
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mcGradMap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ea580c"/>
          <stop offset="100%" stop-color="#c2410c"/>
        </linearGradient>
      </defs>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="url(#mcGradMap)" stroke="#9a3412" stroke-width="1.2"/>
      <path d="M2 9.5H22M2 14.5H22M8 4V9.5M16 4V9.5M12 9.5V14.5M6 14.5V20M18 14.5V20" stroke="#fed7aa" stroke-width="1.2"/>
    </svg>
  `},Oe=n=>{const t=String(n||"").toUpperCase();return t.includes("CLIM")||t.includes("FROID")||t.includes("HVAC")||t.includes("AIR")?C.CLIMATISATION:t.includes("PLOMB")||t.includes("PLUMB")||t.includes("EAU")?C.PLUMBING:t.includes("ELEC")||t.includes("VOLT")||t.includes("COURANT")?C.ELECTRICIAN:t.includes("AUTO")||t.includes("CAR")||t.includes("LAVAGE")||t.includes("MECAN")?C.AUTO_MECHANIC:t.includes("MENUIS")||t.includes("CARPENTER")||t.includes("WOOD")||t.includes("BOIS")?C.MENUISERIE:t.includes("SERRUR")||t.includes("KEY")||t.includes("LOCK")||t.includes("PORTE")?C.SERRURERIE:t.includes("PEINT")||t.includes("PAINT")||t.includes("DECO")?C.PEINTURE:t.includes("MACON")||t.includes("BRICK")||t.includes("BATIMENT")||t.includes("CIMENT")?C.MACONNERIE:t.includes("ELECTRO")||t.includes("MULTIMEDIA")||t.includes("TV")?C.ELECTROMENAGER:t.includes("JARDIN")||t.includes("GARDEN")||t.includes("PLANT")?C.JARDINAGE:t.includes("NETT")||t.includes("MENAGE")||t.includes("CLEAN")?C.NETTOYAGE:t.includes("DERAT")||t.includes("DESINF")||t.includes("PEST")?C.DERATISATION:t.includes("PISCINE")||t.includes("POOL")||t.includes("WAVE")?C.PISCINE:C.PLUMBING},nt=(n,t,p,m)=>{const w=L=>L*Math.PI/180,o=L=>L*180/Math.PI,N=w(m-t),k=Math.sin(N)*Math.cos(w(p)),v=Math.cos(w(n))*Math.sin(w(p))-Math.sin(w(n))*Math.cos(w(p))*Math.cos(N);return(o(Math.atan2(k,v))+360)%360},at=({maalem:n,etaSummary:t,distanceKm:p,durationMin:m})=>{const w=n!=null&&n.full_name&&n.full_name!=="Maalem"&&n.full_name!=="Artisan Maalem"?n.full_name:"Artisan Maâlem",o=_e(n==null?void 0:n.specialty),N=w.split(" ").filter(Boolean).slice(0,2).map(f=>f[0].toUpperCase()).join("")||"AM",k=(n!=null&&n.rating_avg?Number(n.rating_avg):5).toFixed(1),v=String((n==null?void 0:n.phone)||"").replace(/\D/g,""),F=v.length>=9,L=v.startsWith("212")?v:v.startsWith("0")?`212${v.slice(1)}`:`212${v}`;let W=m?`~${m} min`:"~5-10 min",y=p?`${p} km`:"En route";if(t){const f=t.match(/([\d.,]+)\s*km/i),I=t.match(/~?\s*(\d+)\s*min/i);f&&(y=`${f[1]} km`),I&&(W=`~${I[1]} min`)}return`
    <div class="bg-white border border-slate-200/90 rounded-2xl shadow-[0_12px_32px_rgba(15,23,42,0.18)] p-3.5 sm:p-4 font-sans text-slate-800 w-[290px] sm:w-[310px] space-y-3">
      <!-- Entête : Avatar & Statut -->
      <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0 font-black text-sm tracking-wider">
            ${N}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1">
              <span class="font-extrabold text-sm text-slate-900 tracking-tight truncate">${w}</span>
              <svg class="w-3.5 h-3.5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            </div>
            <p class="text-[11px] font-semibold text-slate-500 truncate">${o}</p>
          </div>
        </div>
        <span class="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          En direct
        </span>
      </div>

      <!-- Boîte ETA & Distance Temps Réel -->
      <div class="bg-blue-50/80 border border-blue-100 rounded-xl p-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <p class="text-[9px] font-bold text-blue-800 uppercase tracking-wider">Arrivée estimée</p>
            <p class="text-xs font-black text-slate-900 font-mono">${W}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Distance</p>
          <p class="text-xs font-black text-blue-700 font-mono">${y}</p>
        </div>
      </div>

      <!-- Pied de fiche : Note & Actions Téléphone / WhatsApp -->
      <div class="flex items-center justify-between gap-2 pt-0.5">
        <div class="flex items-center gap-1">
          <span class="text-amber-500 text-sm">★</span>
          <span class="font-black text-slate-800 text-xs">${k}</span>
          <span class="text-[10px] text-slate-400">/ 5.0</span>
        </div>
        ${F?`
          <div class="flex items-center gap-1.5">
            <a href="tel:${v}" class="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all no-underline">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              Appeler
            </a>
            <a href="https://wa.me/${L}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all no-underline shrink-0" title="Contacter sur WhatsApp">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </a>
          </div>
        `:""}
      </div>
    </div>
  `},lt=({maalem:n,isSelf:t,distanceKm:p,etaMin:m})=>{const w=((n==null?void 0:n.full_name)||"Artisan Maâlem").split(" ").map(L=>L.charAt(0).toUpperCase()+L.slice(1).toLowerCase()).join(" "),o=_e(n==null?void 0:n.specialty),N=(n!=null&&n.rating_avg?Number(n.rating_avg):5).toFixed(1),k=n!=null&&n.reviews_count?` (${n.reviews_count} avis)`:"",v=String((n==null?void 0:n.phone)||"").replace(/\D/g,""),F=v.length>=9&&!t;return`
    <div class="bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-2xl p-3.5 font-sans text-slate-800 min-w-[250px] max-w-[290px] space-y-2.5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <div class="flex items-center gap-2 min-w-0">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span class="font-extrabold text-sm text-slate-900 truncate">${t?"Votre Position Artisan":w}</span>
        </div>
        <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
          ${t?"🟢 En Ligne":"Disponible"}
        </span>
      </div>
      <div class="space-y-1.5 text-xs">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] text-slate-600 font-semibold truncate">${o}</span>
          <span class="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-[11px] shrink-0">
            ★ ${N} / 5.0${k}
          </span>
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-600 pt-1.5 border-t border-slate-100">
          <span>Distance : <strong class="text-slate-900">${p} km</strong></span>
          <span>Trajet : <strong class="text-blue-700 font-bold">~${m} min</strong></span>
        </div>
      </div>
      ${F?`
        <div class="pt-1 border-t border-slate-100 flex justify-end">
          <a href="tel:${v}" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold shadow-xs transition-all no-underline">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            Contacter
          </a>
        </div>
      `:""}
    </div>
  `},ut=({mode:n="CLIENT_PICKER",selectedLat:t,selectedLng:p,onLocationSelect:m,filterCategory:w,activeRouteCoords:o,trackingMaalemPos:N,trackingMaalemId:k,trackingClientPos:v,etaSummary:F,distanceKm:L,durationMin:W})=>{var Ce;const{user:y}=et(),{interventions:f,maalems:I,calculateDistanceInKm:U,showToast:S,isMaalemOnline:X,toggleMaalemOnlineStatus:it}=tt(),ue=!!(y&&(String(y.role||"").toUpperCase()==="MAALEM"||String(y.role||"").toUpperCase()==="ADMIN")),ne=x.useRef(null),M=x.useRef(null),z=(()=>{try{const s=localStorage.getItem("bricolemoi_client_gps")||localStorage.getItem("bricolemoi_maalem_gps");return s?JSON.parse(s):null}catch{return null}})(),xe=t||(z==null?void 0:z.lat)||33.5883,fe=p||(z==null?void 0:z.lng)||-7.6328,[Z,He]=x.useState("OSM_FR"),[he,Fe]=x.useState("GOLD_CYAN"),[u,be]=x.useState({lat:xe,lng:fe}),[K,me]=x.useState(!1),[$,ae]=x.useState(!1),[ge,le]=x.useState(!1),[we,ie]=x.useState(!1),[$e,ve]=x.useState(!1),A=x.useRef({}),T=x.useRef({}),G=x.useRef(null),O=x.useRef(null),E=x.useRef(null),ye=x.useRef(null),q=x.useRef(null),P=x.useRef(null),De=x.useRef(0),R=x.useRef(null),Ne=x.useRef(""),oe=x.useRef(!1);x.useEffect(()=>{if(!ne.current)return;if(G.current=null,O.current=null,R.current&&(cancelAnimationFrame(R.current),R.current=null),P.current=null,ye.current=null,q.current=null,E.current){try{E.current.remove()}catch{}E.current=null}A.current={},T.current={};let s=null;try{s=new Qe({container:ne.current,style:rt(Z),center:[fe,xe],zoom:14.5,minZoom:10,maxZoom:20,pitch:0,bearing:0,antialias:!0,attributionControl:!1}),s.addControl(new Xe({showCompass:!0}),"top-right"),M.current=s,s.on("load",()=>{me(!0);try{s.resize()}catch{}}),s.on("error",a=>{var c,b,j,D;((b=(c=a==null?void 0:a.error)==null?void 0:c.message)!=null&&b.includes("WebGL")||(D=(j=a==null?void 0:a.error)==null?void 0:j.message)!=null&&D.includes("GPU"))&&ve(!0)})}catch(a){console.warn("[InteractiveMap] WebGL/GPU indisponible sur ce navigateur:",a==null?void 0:a.message),ve(!0),M.current=null;return}const l=setTimeout(()=>{try{s&&s.resize()}catch{}},200);return s&&s.on("click",a=>{m&&(!o||o.length<2)&&m(a.lngLat.lat,a.lngLat.lng)}),()=>{clearTimeout(l),G.current=null,O.current=null,A.current={},T.current={},me(!1);try{s&&typeof s.remove=="function"&&s.remove()}catch(a){console.warn("[InteractiveMap] Erreur nettoyage map:",a==null?void 0:a.message)}M.current=null}},[Z]),x.useEffect(()=>{if(!(o&&o.length>=2)&&M.current&&K&&t&&p)try{M.current.flyTo({center:[p,t],zoom:14.5,speed:1.2})}catch{}},[t,p,o,K]),x.useEffect(()=>{const s=M.current;if(!s||!K)return;const l=!!(o&&o.length>=2);if(l)G.current&&(G.current.remove(),G.current=null);else if(G.current)G.current.setLngLat([u.lng,u.lat]),G.current.getElement().parentNode||G.current.addTo(s);else{const r=document.createElement("div");r.style.width="36px",r.style.height="36px",r.className="relative flex items-center justify-center cursor-pointer",r.innerHTML=`
          <div class="absolute w-10 h-10 rounded-full bg-blue-500/25 animate-ping"></div>
          <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md shadow-blue-500/40"></div>
        `;const d=new Y({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="font-black text-slate-900 text-xs">Votre Position GPS</p>
            <p class="text-[10px] text-slate-500 font-mono mt-0.5">${u.lat.toFixed(4)}, ${u.lng.toFixed(4)}</p>
          </div>`);G.current=new Q({element:r}).setLngLat([u.lng,u.lat]).setPopup(d).addTo(s)}const a=parseFloat(t||(u==null?void 0:u.lat)||33.5883),c=parseFloat(p||(u==null?void 0:u.lng)||-7.6328);if(n==="CLIENT_PICKER"&&!isNaN(a)&&!isNaN(c))if(O.current)O.current.setLngLat([c,a]),O.current.setDraggable(!l),O.current.getElement().parentNode||O.current.addTo(s);else{const r=document.createElement("div");r.style.width="44px",r.style.height="52px",r.className=`${l?"":"cursor-move"} transform -translate-y-full transition-transform hover:scale-110 z-30`,r.innerHTML=`
          <div class="relative flex flex-col items-center">
            <div class="w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border-2 border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="w-1.5 h-3.5 bg-blue-600 shadow-sm rounded-b-full"></div>
          </div>
        `;const d=new Y({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="text-xs font-black text-slate-900">${l?"Point d'Arrivée (Votre Adresse)":"Point d'Intervention"}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">${l?"Adresse confirmée de l'intervention":"Glissez le marqueur pour affiner"}</p>
          </div>`);O.current=new Q({element:r,draggable:!l}).setLngLat([c,a]).setPopup(d).addTo(s),l||O.current.on("dragend",()=>{const i=O.current.getLngLat();m&&m(i.lat,i.lng)})}const b=parseFloat(t||(u==null?void 0:u.lat)||33.5883),j=parseFloat(p||(u==null?void 0:u.lng)||-7.6328),D=(I||[]).filter(r=>{if(r.is_online!==!0||r.is_available===!1)return!1;const d=parseFloat(r.lat),i=parseFloat(r.lng);return!(isNaN(d)||isNaN(i)||d<20||d>38||i>=0)});if(Object.keys(A.current).forEach(r=>{D.some(i=>String(i.id).trim()===String(r).trim())||(A.current[r].remove(),delete A.current[r])}),D.forEach(r=>{if(N&&k&&String(r.id).trim()===String(k).trim()){A.current[r.id]&&(A.current[r.id].remove(),delete A.current[r.id]);return}const d=parseFloat(r.lat||33.5883),i=parseFloat(r.lng||-7.6328);if(isNaN(d)||isNaN(i)||d<20||d>38||i>=0)return;const _=y&&String(r.id).trim()===String(y.id).trim(),g=Oe(r.specialty),V=U(b,j,d,i),H=Math.max(3,Math.round(V/30*60));if((r.full_name||"Artisan Maâlem").split(" ").map(h=>h.charAt(0).toUpperCase()+h.slice(1).toLowerCase()).join(" "),A.current[r.id])A.current[r.id].setLngLat([i,d]),A.current[r.id].getElement().parentNode||A.current[r.id].addTo(s);else{const h=document.createElement("div");h.style.width="44px",h.style.height="44px",h.className="relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125",_?h.innerHTML=`
            <div class="absolute w-12 h-12 rounded-2xl bg-emerald-500/30 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-500 shadow-md flex items-center justify-center text-emerald-600">
              ${g}
            </div>
            <span class="absolute -top-1 -right-1 px-1.5 py-0.2 bg-emerald-600 text-[8px] font-black text-white rounded-full border border-white">VOUS</span>
          `:h.innerHTML=`
            <div class="absolute w-10 h-10 rounded-2xl bg-blue-500/20 animate-pulse"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-blue-600 shadow-md flex items-center justify-center text-blue-600">
              ${g}
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
          `;const ee=new Y({offset:20,className:"clean-trust-popup"}).setHTML(lt({maalem:r,isSelf:_,distanceKm:V,etaMin:H}));A.current[r.id]=new Q({element:h}).setLngLat([i,d]).setPopup(ee).addTo(s)}}),N&&Array.isArray(N)&&N.length>=2){const r=parseFloat(N[0]),d=parseFloat(N[1]);if(!isNaN(r)&&!isNaN(d)&&r>20&&r<38){const i=(I||[]).find(g=>String(g.id).trim()===String(k).trim()),_=at({maalem:i,etaSummary:F,distanceKm:L,durationMin:W});if(E.current){E.current.getElement().parentNode||E.current.addTo(s);const g=E.current.getPopup();g&&g.setHTML(_);const V=P.current||[d,r],[H,h]=V;if(Math.hypot(d-H,r-h)>4e-5){const te=nt(h,H,r,d);De.current=te,q.current&&(q.current.style.transform=`rotate(${Math.round(te)}deg)`),R.current&&cancelAnimationFrame(R.current);const de=performance.now(),Be=1200,ke=Ue=>{const Pe=Ue-de,Le=Math.min(Pe/Be,1),Ae=1-Math.pow(1-Le,3),Te=H+(d-H)*Ae,Se=h+(r-h)*Ae;P.current=[Te,Se],E.current&&E.current.setLngLat([Te,Se]),Le<1?R.current=requestAnimationFrame(ke):(R.current=null,P.current=[d,r])};R.current=requestAnimationFrame(ke)}else E.current.setLngLat([d,r]),P.current=[d,r]}else{const g=document.createElement("div");g.style.width="58px",g.style.height="58px",g.className="relative flex items-center justify-center cursor-pointer z-40 group",g.innerHTML=`
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
          `;const V=g.querySelector(".vehicle-heading-ring");q.current=V,P.current=[d,r];const H=new Y({offset:30,className:"clean-trust-popup",closeButton:!1}).setHTML(_);E.current=new Q({element:g}).setLngLat([d,r]).setPopup(H).addTo(s)}}}else E.current&&(R.current&&(cancelAnimationFrame(R.current),R.current=null),E.current.remove(),E.current=null,ye.current=null,q.current=null,P.current=null);if(!ue)Object.keys(T.current).forEach(r=>{T.current[r].remove(),delete T.current[r]});else{const r=f.filter(i=>i.status==="PENDING"),d=new Set(r.map(i=>String(i.id).trim()));Object.keys(T.current).forEach(i=>{d.has(String(i).trim())||(T.current[i].remove(),delete T.current[i])}),r.forEach(i=>{const _=parseFloat(i.lat||33.5883),g=parseFloat(i.lng||-7.6328);if(isNaN(_)||isNaN(g))return;const V=Oe(i.service_type),H=U(u.lat,u.lng,_,g);if(T.current[i.id])T.current[i.id].setLngLat([g,_]),T.current[i.id].getElement().parentNode||T.current[i.id].addTo(s);else{const h=document.createElement("div");h.style.width="44px",h.style.height="44px",h.style.willChange="transform",h.className="relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125",h.innerHTML=`
            <div class="absolute w-11 h-11 rounded-2xl bg-red-500/20 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-red-500 shadow-md flex items-center justify-center text-red-600">
              ${V}
            </div>
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-xs"></span>
          `;const ee=String(i.service_type||"").toUpperCase().includes("CLIM")?"Climatisation & Froid":i.service_type==="PLUMBING"?"Plomberie":i.service_type==="ELECTRICIAN"?"Électricité":i.service_type==="AUTO_MECHANIC"?"Mécanique Auto":i.service_type==="PEINTURE"?"Peinture":i.service_type==="MACONNERIE"?"Maçonnerie":i.service_type==="JARDINAGE"?"Jardinage":i.service_type==="SERRURERIE"?"Serrurerie":"Dépannage Urgent",te=i.subcategory?`<div class="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">${i.subcategory}</div>`:"",de=new Y({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-red-200 p-3.5 min-w-[240px] space-y-2 font-sans text-slate-800 rounded-2xl shadow-xl">
              <div class="flex items-center justify-between border-b border-red-100 pb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block"></span>
                  <span class="font-black text-xs text-red-600 uppercase tracking-tight">SOS ${ee}</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold font-mono border border-amber-200">15 DH</span>
              </div>
              ${te}
              <div class="space-y-1 pt-1 text-xs">
                <p class="font-bold text-slate-900">Quartier : <span class="text-blue-600 font-extrabold">${i.district||"Casablanca"}</span></p>
                <div class="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-1 whitespace-nowrap">
                  <span>Distance : <strong class="text-slate-900">${H} km</strong></span>
                  <span>Tarif : <strong class="text-blue-700 font-bold">Accord Direct</strong></span>
                </div>
              </div>
            </div>`);T.current[i.id]=new Q({element:h}).setLngLat([g,_]).setPopup(de).addTo(s)}})}},[K,y,u,t,p,N,w,I,f,Z]),x.useEffect(()=>{const s=M.current;if(!s||!K)return;const l="route-source",a="route-casing-layer",c="route-line-layer";if(!o||o.length<2){s.getLayer(c)&&s.removeLayer(c),s.getLayer(a)&&s.removeLayer(a),s.getSource(l)&&s.removeSource(l),oe.current=!1;return}const b={type:"Feature",properties:{},geometry:{type:"LineString",coordinates:o}};s.getSource(l)?s.getSource(l).setData(b):(s.addSource(l,{type:"geojson",data:b}),s.addLayer({id:a,type:"line",source:l,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#1d4ed8","line-width":8,"line-opacity":.4}}),s.addLayer({id:c,type:"line",source:l,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#3b82f6","line-width":5,"line-opacity":.95}}));const j=o[o.length-1],D=`${j[0].toFixed(3)},${j[1].toFixed(3)}`;if(!oe.current||Ne.current!==D){oe.current=!0,Ne.current=D;try{const r=new se;o.forEach(d=>{Array.isArray(d)&&d.length>=2&&!isNaN(d[0])&&!isNaN(d[1])&&r.extend(d)}),r.isEmpty()||s.fitBounds(r,{padding:60,maxZoom:16})}catch{}}},[o,K]);const ce=()=>{if(typeof window>"u"||!navigator.geolocation){S("Géolocalisation non supportée par votre navigateur.","error");return}ae(!0);const s=(l,a,c)=>{ae(!1),be({lat:l,lng:a}),M.current&&M.current.flyTo({center:[a,l],zoom:15.5,speed:1.4}),m&&m(l,a),S(`Position GPS détectée ${c}`,"success")};navigator.geolocation.getCurrentPosition(l=>{const{latitude:a,longitude:c,accuracy:b}=l.coords;s(a,c,`(Précision: ±${Math.round(b||10)}m)`)},()=>{navigator.geolocation.getCurrentPosition(l=>{const{latitude:a,longitude:c}=l.coords;s(a,c,"(Réseau / Wi-Fi)")},l=>{ae(!1);const a=t||33.5883,c=p||-7.6328;be({lat:a,lng:c}),M.current&&M.current.flyTo({center:[c,a],zoom:14,speed:1.2}),l.code===1?S("Accès GPS refusé. Autorisez la localisation dans votre navigateur pour cibler votre adresse.","warning"):S("Signal GPS indisponible sur cet appareil. Position par défaut (Casablanca) activée.","info")},{enableHighAccuracy:!1,timeout:6e3,maximumAge:6e4})},{enableHighAccuracy:!0,timeout:6e3,maximumAge:0})},J=(I||[]).filter(s=>{if(s.is_online!==!0||s.is_available===!1)return!1;const l=parseFloat(s.lat),a=parseFloat(s.lng);return!isNaN(l)&&!isNaN(a)&&l>=20&&l<=38&&a<0}),Me=J.length,je=()=>{const s=M.current;if(!s||J.length===0){S("Aucun Maâlem en ligne détecté pour le moment.","info");return}if(J.length===1){const c=J[0],b=parseFloat(c.lat),j=parseFloat(c.lng);if(!isNaN(b)&&!isNaN(j)&&j<0){s.flyTo({center:[j,b],zoom:15,speed:1.4}),m&&m(b,j),S(`📍 Cadrage sur l'artisan en direct (${c.full_name})`,"success");return}}const l=new se;let a=0;J.forEach(c=>{const b=parseFloat(c.lat),j=parseFloat(c.lng);!isNaN(b)&&!isNaN(j)&&j<0&&b>=20&&b<=38&&(l.extend([j,b]),a++)}),a>0&&(s.fitBounds(l,{padding:60,maxZoom:15}),S(`📍 Cadrage sur les ${a} Maâlem(s) en ligne`,"success"))},Ee=()=>{const s=M.current;if(!s)return;const l=f.filter(c=>c.status==="PENDING"&&c.lat&&c.lng);if(l.length===0){const c=parseFloat(t||(u==null?void 0:u.lat)||33.5883),b=parseFloat(p||(u==null?void 0:u.lng)||-7.6328);s.flyTo({center:[b,c],zoom:14.5,speed:1.2}),S("Aucune demande SOS en attente pour le moment.","info");return}if(l.length===1){s.flyTo({center:[parseFloat(l[0].lng),parseFloat(l[0].lat)],zoom:15,speed:1.4});return}const a=new se;l.forEach(c=>{a.extend([parseFloat(c.lng),parseFloat(c.lat)])}),s.fitBounds(a,{padding:60,maxZoom:15})},Ve=()=>{const s=M.current;if(!(!s||!o||o.length<2))try{const l=new se;o.forEach(a=>{Array.isArray(a)&&a.length>=2&&!isNaN(a[0])&&!isNaN(a[1])&&l.extend(a)}),l.isEmpty()||s.fitBounds(l,{padding:60,maxZoom:16})}catch{}};return e.jsxs("div",{className:"relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white",children:[e.jsx("div",{ref:ne,className:`w-full h-[320px] xs:h-[370px] sm:h-[440px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden map-theme-${he.toLowerCase().replace("_","-")}`}),$e&&e.jsxs("div",{className:"absolute inset-0 bg-slate-50/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-xs",children:e.jsx(Re,{className:"w-6 h-6"})}),e.jsx("h4",{className:"font-black text-slate-900 text-sm sm:text-base",children:"Coordonnées GPS Confirmées"}),e.jsxs("p",{className:"text-xs text-slate-600 max-w-sm mt-1",children:["Votre position (",t?Number(t).toFixed(4):"33.5883",", ",p?Number(p).toFixed(4):"-7.6328",") est bien enregistrée pour l'intervention."]}),e.jsx("span",{className:"text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mt-3",children:"✓ Position transmise au Maâlem"})]}),e.jsxs("div",{className:"absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1.25rem)]",children:[e.jsxs("button",{type:"button",onClick:ce,disabled:$,className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Centrer sur ma position GPS",children:[e.jsx(ze,{className:`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${$?"animate-spin text-amber-500":"text-blue-600"}`}),e.jsx("span",{className:"hidden xs:inline",children:$?"GPS...":"GPS"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>{ie(!we),le(!1)},className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Personnaliser la couleur des rues et routes",children:[e.jsx(Ze,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"hidden sm:inline",children:"Couleur Rues"})]}),we&&e.jsxs("div",{className:"absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-2 shadow-xl z-30 space-y-1.5 font-sans",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1",children:"Palette des Routes :"}),st.map(s=>e.jsxs("button",{type:"button",onClick:()=>{Fe(s.id),ie(!1)},className:`w-full text-left p-2 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 cursor-pointer ${he===s.id?"bg-blue-50 text-blue-900 border border-blue-200":"text-slate-700 hover:bg-slate-50"}`,children:[e.jsx("span",{className:`w-3.5 h-3.5 rounded-full ${s.iconColor} shadow-xs mt-0.5 flex-shrink-0`}),e.jsxs("div",{children:[e.jsx("span",{className:"block font-black leading-tight",children:s.label}),e.jsx("span",{className:"text-[10px] font-normal text-slate-500 block",children:s.desc})]})]},s.id))]})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>{le(!ge),ie(!1)},className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Changer la source de la carte",children:[e.jsx(Ie,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"hidden xs:inline",children:(Ce=re[Z])==null?void 0:Ce.name.split(" ")[0]})]}),ge&&e.jsxs("div",{className:"absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-1.5 shadow-xl z-30 space-y-1 font-sans",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1",children:"Source Cartographique :"}),Object.entries(re).map(([s,l])=>e.jsxs("button",{type:"button",onClick:()=>{He(s),le(!1)},className:`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${Z===s?"bg-blue-50 text-blue-900 border border-blue-200":"text-slate-700 hover:bg-slate-50"}`,children:[e.jsx("span",{className:"truncate pr-2",children:l.name}),Z===s&&e.jsx(Ke,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"})]},s))]})]})]}),e.jsx("div",{className:"bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 sm:p-3 px-2.5 sm:px-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs text-slate-700 shadow-sm font-sans",children:ue?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2",children:[e.jsxs("div",{className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 rounded-xl shadow-xs text-[10px] sm:text-xs whitespace-nowrap",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-blue-600"})]}),e.jsx("span",{className:"truncate",children:"GPS Pro"})]}),e.jsxs(B.button,{whileTap:{scale:.95},type:"button",onClick:Ee,className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-red-800 hover:text-red-900 transition-all cursor-pointer bg-red-50 hover:bg-red-100 px-2 rounded-xl border border-red-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap",title:"Cadrer sur toutes les urgences SOS ouvertes dans la zone",children:[e.jsx("span",{className:"w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 inline-block animate-ping flex-shrink-0"}),e.jsxs("span",{className:"truncate",children:["SOS (",f.filter(s=>s.status==="PENDING").length,")"]})]}),e.jsxs(B.button,{whileTap:{scale:.95},type:"button",onClick:je,className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2 rounded-xl border border-emerald-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap",title:"Cadrer sur les Maâlems disponibles sur la carte",children:[e.jsxs("span",{className:"relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"})]}),e.jsxs("span",{className:"truncate",children:["Maâlems (",Me,")"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0",children:[e.jsxs(B.button,{whileTap:{scale:.95},type:"button",onClick:Ee,className:"h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Cadrer l'ensemble de la zone active",children:[e.jsx(Ie,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Chantiers"})]}),e.jsxs(B.button,{whileTap:{scale:.95},type:"button",onClick:ce,disabled:$,className:"h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Centrer la carte sur votre position GPS exacte",children:[e.jsx(pe,{className:`w-3.5 h-3.5 text-white flex-shrink-0 ${$?"animate-spin":""}`}),e.jsx("span",{className:"truncate",children:$?"...":"Ma Position"})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2",children:[e.jsxs("div",{className:"h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 sm:px-3 rounded-xl shadow-xs text-[11px] sm:text-xs whitespace-nowrap",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-blue-600"})]}),e.jsx("span",{className:"truncate",children:"Votre Position"})]}),e.jsxs(B.button,{whileTap:{scale:.95},type:"button",onClick:je,className:"h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 sm:px-3 rounded-xl border border-emerald-200 shadow-xs text-[11px] sm:text-xs whitespace-nowrap",title:"Cadrer sur les Maâlems disponibles autour de vous",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-emerald-600"})]}),e.jsxs("span",{className:"truncate",children:["Artisans (",Me,") 🟢"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0",children:[o&&o.length>=2&&e.jsxs(B.button,{whileTap:{scale:.95},type:"button",onClick:Ve,className:"h-8 sm:h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 sm:px-3 rounded-xl border border-blue-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Cadrer l'ensemble du trajet (Artisan et Arrivée)",children:[e.jsx(pe,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Tout le Trajet"})]}),n==="CLIENT_PICKER"&&t&&p&&e.jsxs(B.button,{whileTap:{scale:.95},type:"button",onClick:()=>{M.current&&M.current.flyTo({center:[parseFloat(p),parseFloat(t)],zoom:15.5,speed:1.3})},className:"h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Recadrer sur l'adresse sélectionnée",children:[e.jsx(Re,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Point SOS"})]}),e.jsxs(B.button,{whileTap:{scale:.95},type:"button",onClick:ce,disabled:$,className:"h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Centrer la carte sur votre position GPS",children:[e.jsx(pe,{className:`w-3.5 h-3.5 text-white flex-shrink-0 ${$?"animate-spin":""}`}),e.jsx("span",{className:"truncate",children:$?"...":"Ma Position"})]})]})]})})]})},xt=({currentPage:n=1,totalPages:t=1,totalItems:p=0,startIndex:m=0,endIndex:w=0,onPageChange:o,pageSize:N,onPageSizeChange:k,pageSizeOptions:v=[10,20,50],className:F="",itemLabel:L="éléments"})=>{if(p===0||t<=1)return p>0&&t<=1&&v&&k?e.jsx("div",{className:`flex items-center justify-between py-3 text-xs text-slate-500 font-medium ${F}`,children:e.jsxs("span",{children:["Affichage de ",e.jsx("strong",{children:m})," à ",e.jsx("strong",{children:w})," sur ",e.jsx("strong",{children:p})," ",L]})}):null;const y=(()=>{const f=[];let U=Math.max(1,n-Math.floor(2.5)),S=Math.min(t,U+5-1);S-U+1<5&&(U=Math.max(1,S-5+1));for(let X=U;X<=S;X++)f.push(X);return f})();return e.jsxs("div",{className:`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 select-none border-t border-slate-100 ${F}`,children:[e.jsxs("div",{className:"text-xs text-slate-500 font-medium flex items-center gap-2",children:[e.jsxs("span",{children:["Affichage de ",e.jsx("strong",{className:"text-slate-800",children:m})," à ",e.jsx("strong",{className:"text-slate-800",children:w})," sur ",e.jsx("strong",{className:"text-slate-800",children:p})," ",L]}),v&&k&&e.jsxs("div",{className:"flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200",children:[e.jsx("span",{className:"text-[11px] text-slate-400",children:"Par page :"}),e.jsx("select",{value:N,onChange:f=>{k(Number(f.target.value)),o&&o(1)},className:"text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer",children:v.map(f=>e.jsx("option",{value:f,children:f},f))})]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[n>2&&t>4&&e.jsx("button",{type:"button",onClick:()=>o(1),disabled:n===1,title:"Première page",className:"p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95",children:e.jsx(We,{className:"w-4 h-4"})}),e.jsxs("button",{type:"button",onClick:()=>o(n-1),disabled:n===1,title:"Page précédente",className:"flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95",children:[e.jsx(qe,{className:"w-4 h-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Précédent"})]}),e.jsxs("div",{className:"flex items-center gap-1 px-1",children:[y[0]>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:()=>o(1),className:"w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95",children:"1"}),y[0]>2&&e.jsx("span",{className:"text-slate-400 px-0.5 text-xs font-bold",children:"..."})]}),y.map(f=>{const I=f===n;return e.jsx("button",{type:"button",onClick:()=>o(f),className:`w-8 h-8 rounded-xl text-xs font-bold transition-all active:scale-95 ${I?"bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30":"border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs"}`,children:f},f)}),y[y.length-1]<t&&e.jsxs(e.Fragment,{children:[y[y.length-1]<t-1&&e.jsx("span",{className:"text-slate-400 px-0.5 text-xs font-bold",children:"..."}),e.jsx("button",{type:"button",onClick:()=>o(t),className:"w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95",children:t})]})]}),e.jsxs("button",{type:"button",onClick:()=>o(n+1),disabled:n===t,title:"Page suivante",className:"flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95",children:[e.jsx("span",{className:"hidden sm:inline",children:"Suivant"}),e.jsx(Je,{className:"w-4 h-4"})]}),n<t-1&&t>4&&e.jsx("button",{type:"button",onClick:()=>o(t),disabled:n===t,title:"Dernière page",className:"p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95",children:e.jsx(Ye,{className:"w-4 h-4"})})]})]})};export{ut as I,xt as P};

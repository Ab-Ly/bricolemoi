import{j as e,m as V}from"./motion-vendor-_FeCaZtI-v3.js";import{r as x,bl as Ve,bm as Be,bn as Te,S as Ue,aF as pe,M as Pe,bo as ze,a$ as Ze,ay as Ke,bp as We}from"./icons-vendor-BhGpEixi-v3.js";import{x as qe,C as Je,$ as J,M as Y,K as se,a as Se}from"./maplibre-vendor-v_HaOzn3-v3.js";import{u as Ye,a as Qe,x as Ie}from"./index-BPdwi6Vb-v3.js";typeof window<"u"&&Se&&(Se.WORKER_URL="/assets/maplibre-gl-worker.mjs");const re={ESRI_STREETS:{id:"ESRI_STREETS",name:"Esri World Streets HD (Officiel & Détaillé)",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],attribution:"&copy; Esri, HERE, Garmin, OpenStreetMap"},VPS_DEDICATED:{id:"VPS_DEDICATED",name:"Serveur Dédié VPS BricoleMoi (Ultra-Rapide)",tiles:["/tiles-proxy/styles/basic-preview/{z}/{x}/{y}.png"],attribution:"&copy; BricoleMoi Dedicated VPS &copy; OpenMapTiles"},OSM_HOT:{id:"OSM_HOT",name:"OSM Humanitarian Hot (Épuré Pastel)",tiles:["https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png","https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png","https://c.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"],attribution:"&copy; OpenStreetMap contributors, Humanitarian OSM"},OSM_FR:{id:"OSM_FR",name:"Plan Urbain Classique OSM",tiles:["https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png","https://b.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png","https://c.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"],attribution:"&copy; OpenStreetMap France contributors"},SATELLITE:{id:"SATELLITE",name:"Vue Satellite HD (Bâtiments réels)",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],attribution:"&copy; Esri, Maxar, Earthstar Geographics"}},Xe=[{id:"GOLD_CYAN",label:"Doré & Cyan (Haute Clarté)",iconColor:"bg-amber-400",desc:"Grands axes dorés et rues nettes"},{id:"NEON_CYBER",label:"Néon Cyberpunk (Sombre)",iconColor:"bg-cyan-400",desc:"Radar de nuit avec routes fluorescentes"},{id:"SILVER_SLATE",label:"Silver Épuré (Minimaliste)",iconColor:"bg-slate-300",desc:"Rendu monochrome moderne"},{id:"NATURAL",label:"Couleurs Naturelles (Standard)",iconColor:"bg-emerald-400",desc:"Rendu topographique officiel"}],et=n=>{const t=re[n]||re.ESRI_STREETS,p=typeof window<"u"&&(window.devicePixelRatio||1)>1.25;return{version:8,sources:{"base-tiles":{type:"raster",tiles:t.tiles.map(g=>g.replace("{r}",p?"@2x":"")),tileSize:256,attribution:t.attribution||"&copy; OpenStreetMap"}},layers:[{id:"base-tiles-layer",type:"raster",source:"base-tiles",minzoom:0,maxzoom:19}]}},L={PLUMBING:`
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
  `},Re=n=>{const t=String(n||"").toUpperCase();return t.includes("CLIM")||t.includes("FROID")||t.includes("HVAC")||t.includes("AIR")?L.CLIMATISATION:t.includes("PLOMB")||t.includes("PLUMB")||t.includes("EAU")?L.PLUMBING:t.includes("ELEC")||t.includes("VOLT")||t.includes("COURANT")?L.ELECTRICIAN:t.includes("AUTO")||t.includes("CAR")||t.includes("LAVAGE")||t.includes("MECAN")?L.AUTO_MECHANIC:t.includes("MENUIS")||t.includes("CARPENTER")||t.includes("WOOD")||t.includes("BOIS")?L.MENUISERIE:t.includes("SERRUR")||t.includes("KEY")||t.includes("LOCK")||t.includes("PORTE")?L.SERRURERIE:t.includes("PEINT")||t.includes("PAINT")||t.includes("DECO")?L.PEINTURE:t.includes("MACON")||t.includes("BRICK")||t.includes("BATIMENT")||t.includes("CIMENT")?L.MACONNERIE:t.includes("ELECTRO")||t.includes("MULTIMEDIA")||t.includes("TV")?L.ELECTROMENAGER:t.includes("JARDIN")||t.includes("GARDEN")||t.includes("PLANT")?L.JARDINAGE:t.includes("NETT")||t.includes("MENAGE")||t.includes("CLEAN")?L.NETTOYAGE:t.includes("DERAT")||t.includes("DESINF")||t.includes("PEST")?L.DERATISATION:t.includes("PISCINE")||t.includes("POOL")||t.includes("WAVE")?L.PISCINE:L.PLUMBING},tt=(n,t,p,b)=>{const g=w=>w*Math.PI/180,o=w=>w*180/Math.PI,N=g(b-t),C=Math.sin(N)*Math.cos(g(p)),v=Math.cos(g(n))*Math.sin(g(p))-Math.sin(g(n))*Math.cos(g(p))*Math.cos(N);return(o(Math.atan2(C,v))+360)%360},st=({maalem:n,etaSummary:t,distanceKm:p,durationMin:b})=>{const g=n!=null&&n.full_name&&n.full_name!=="Maalem"&&n.full_name!=="Artisan Maalem"?n.full_name:"Artisan Maâlem",o=Ie(n==null?void 0:n.specialty),N=g.split(" ").filter(Boolean).slice(0,2).map(f=>f[0].toUpperCase()).join("")||"AM",C=(n!=null&&n.rating_avg?Number(n.rating_avg):5).toFixed(1),v=String((n==null?void 0:n.phone)||"").replace(/\D/g,""),H=v.length>=9,w=v.startsWith("212")?v:v.startsWith("0")?`212${v.slice(1)}`:`212${v}`;let $="~5 min",M="En route";if(b)$=`~${b} min`;else if(t){const f=t.split("•");f[0]&&($=f[0].replace("Trajet estimé :","").trim())}if(p)M=`${p} km`;else if(t&&t.includes("•")){const f=t.split("•");f[1]&&(M=f[1].trim())}return`
    <div class="bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-2xl p-4 font-sans text-slate-800 min-w-[270px] max-w-[310px] space-y-3">
      <!-- Entête : Avatar & Statut -->
      <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0 font-black text-sm tracking-wider">
            ${N}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1">
              <span class="font-extrabold text-sm text-slate-900 tracking-tight truncate">${g}</span>
              <svg class="w-3.5 h-3.5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            </div>
            <p class="text-[11px] font-semibold text-slate-500 truncate">${o}</p>
          </div>
        </div>
        <span class="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          En direct
        </span>
      </div>

      <!-- Boîte ETA & Distance Temps Réel -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-100/90 rounded-xl p-2.5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <p class="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Arrivée estimée</p>
            <p class="text-sm font-black text-slate-900">${$}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Distance</p>
          <p class="text-xs font-black text-blue-700 font-mono">${M}</p>
        </div>
      </div>

      <!-- Pied de fiche : Note & Actions Téléphone / WhatsApp -->
      <div class="flex items-center justify-between gap-2 pt-0.5">
        <div class="flex items-center gap-1">
          <span class="text-amber-500 text-sm">★</span>
          <span class="font-black text-slate-800 text-xs">${C}</span>
          <span class="text-[10px] text-slate-400">/ 5.0</span>
        </div>
        ${H?`
          <div class="flex items-center gap-1.5">
            <a href="tel:${v}" class="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold shadow-xs transition-all no-underline">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              Appeler
            </a>
            <a href="https://wa.me/${w}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-all no-underline" title="Contacter sur WhatsApp">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </a>
          </div>
        `:""}
      </div>
    </div>
  `},rt=({maalem:n,isSelf:t,distanceKm:p,etaMin:b})=>{const g=((n==null?void 0:n.full_name)||"Artisan Maâlem").split(" ").map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(" "),o=Ie(n==null?void 0:n.specialty),N=(n!=null&&n.rating_avg?Number(n.rating_avg):5).toFixed(1),C=n!=null&&n.reviews_count?` (${n.reviews_count} avis)`:"",v=String((n==null?void 0:n.phone)||"").replace(/\D/g,""),H=v.length>=9&&!t;return`
    <div class="bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-2xl shadow-2xl p-3.5 font-sans text-slate-800 min-w-[250px] max-w-[290px] space-y-2.5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <div class="flex items-center gap-2 min-w-0">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span class="font-extrabold text-sm text-slate-900 truncate">${t?"Votre Position Artisan":g}</span>
        </div>
        <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
          ${t?"🟢 En Ligne":"Disponible"}
        </span>
      </div>
      <div class="space-y-1.5 text-xs">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] text-slate-600 font-semibold truncate">${o}</span>
          <span class="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-[11px] shrink-0">
            ★ ${N} / 5.0${C}
          </span>
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-600 pt-1.5 border-t border-slate-100">
          <span>Distance : <strong class="text-slate-900">${p} km</strong></span>
          <span>Trajet : <strong class="text-blue-700 font-bold">~${b} min</strong></span>
        </div>
      </div>
      ${H?`
        <div class="pt-1 border-t border-slate-100 flex justify-end">
          <a href="tel:${v}" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold shadow-xs transition-all no-underline">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            Contacter
          </a>
        </div>
      `:""}
    </div>
  `},ot=({mode:n="CLIENT_PICKER",selectedLat:t,selectedLng:p,onLocationSelect:b,filterCategory:g,activeRouteCoords:o,trackingMaalemPos:N,trackingMaalemId:C,trackingClientPos:v,etaSummary:H})=>{var je;const{user:w}=Ye(),{interventions:$,maalems:M,calculateDistanceInKm:f,showToast:S,isMaalemOnline:Z,toggleMaalemOnlineStatus:Q}=Qe(),U=!!(w&&(String(w.role||"").toUpperCase()==="MAALEM"||String(w.role||"").toUpperCase()==="ADMIN")),ne=x.useRef(null),j=x.useRef(null),P=(()=>{try{const s=localStorage.getItem("bricolemoi_client_gps")||localStorage.getItem("bricolemoi_maalem_gps");return s?JSON.parse(s):null}catch{return null}})(),ue=t||(P==null?void 0:P.lat)||33.5883,xe=p||(P==null?void 0:P.lng)||-7.6328,[z,Ge]=x.useState("ESRI_STREETS"),[fe,Oe]=x.useState("GOLD_CYAN"),[u,he]=x.useState({lat:ue,lng:xe}),[X,be]=x.useState(!1),[F,le]=x.useState(!1),[me,ae]=x.useState(!1),[ge,ie]=x.useState(!1),k=x.useRef({}),A=x.useRef({}),I=x.useRef(null),G=x.useRef(null),E=x.useRef(null),we=x.useRef(null),K=x.useRef(null),B=x.useRef(null),_e=x.useRef(0),R=x.useRef(null),ve=x.useRef(""),oe=x.useRef(!1);x.useEffect(()=>{if(!ne.current)return;I.current=null,G.current=null,R.current&&(cancelAnimationFrame(R.current),R.current=null),B.current=null,we.current=null,K.current=null,E.current&&(E.current.remove(),E.current=null),k.current={},A.current={};const s=new qe({container:ne.current,style:et(z),center:[xe,ue],zoom:14.5,minZoom:10,maxZoom:19,pitch:0,bearing:0,antialias:!0,attributionControl:!1});s.addControl(new Je({showCompass:!0}),"top-right"),j.current=s,s.on("load",()=>{be(!0),s.resize()});const l=setTimeout(()=>{s&&s.resize()},200);return s.on("click",i=>{b&&(!o||o.length<2)&&b(i.lngLat.lat,i.lngLat.lng)}),()=>{clearTimeout(l),I.current=null,G.current=null,k.current={},A.current={},be(!1),s.remove()}},[z]),x.useEffect(()=>{o&&o.length>=2||j.current&&t&&p&&j.current.flyTo({center:[p,t],zoom:14.5,speed:1.2})},[t,p,o]),x.useEffect(()=>{const s=j.current;if(!s||!X)return;const l=!!(o&&o.length>=2);if(l)I.current&&(I.current.remove(),I.current=null);else if(I.current)I.current.setLngLat([u.lng,u.lat]),I.current.getElement().parentNode||I.current.addTo(s);else{const r=document.createElement("div");r.style.width="36px",r.style.height="36px",r.className="relative flex items-center justify-center cursor-pointer",r.innerHTML=`
          <div class="absolute w-10 h-10 rounded-full bg-blue-500/25 animate-ping"></div>
          <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md shadow-blue-500/40"></div>
        `;const d=new J({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="font-black text-slate-900 text-xs">Votre Position GPS</p>
            <p class="text-[10px] text-slate-500 font-mono mt-0.5">${u.lat.toFixed(4)}, ${u.lng.toFixed(4)}</p>
          </div>`);I.current=new Y({element:r}).setLngLat([u.lng,u.lat]).setPopup(d).addTo(s)}const i=parseFloat(t||(u==null?void 0:u.lat)||33.5883),c=parseFloat(p||(u==null?void 0:u.lng)||-7.6328);if(n==="CLIENT_PICKER"&&!isNaN(i)&&!isNaN(c))if(G.current)G.current.setLngLat([c,i]),G.current.setDraggable(!l),G.current.getElement().parentNode||G.current.addTo(s);else{const r=document.createElement("div");r.style.width="44px",r.style.height="52px",r.className=`${l?"":"cursor-move"} transform -translate-y-full transition-transform hover:scale-110 z-30`,r.innerHTML=`
          <div class="relative flex flex-col items-center">
            <div class="w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border-2 border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="w-1.5 h-3.5 bg-blue-600 shadow-sm rounded-b-full"></div>
          </div>
        `;const d=new J({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="text-xs font-black text-slate-900">${l?"Point d'Arrivée (Votre Adresse)":"Point d'Intervention"}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">${l?"Adresse confirmée de l'intervention":"Glissez le marqueur pour affiner"}</p>
          </div>`);G.current=new Y({element:r,draggable:!l}).setLngLat([c,i]).setPopup(d).addTo(s),l||G.current.on("dragend",()=>{const a=G.current.getLngLat();b&&b(a.lat,a.lng)})}const y=parseFloat(t||(u==null?void 0:u.lat)||33.5883),T=parseFloat(p||(u==null?void 0:u.lng)||-7.6328),q=(M||[]).filter(r=>{if(r.is_online!==!0||r.is_available===!1)return!1;const d=parseFloat(r.lat),a=parseFloat(r.lng);return!(isNaN(d)||isNaN(a)||d<20||d>38||a>=0)});if(Object.keys(k.current).forEach(r=>{q.some(a=>String(a.id).trim()===String(r).trim())||(k.current[r].remove(),delete k.current[r])}),q.forEach(r=>{if(N&&C&&String(r.id).trim()===String(C).trim()){k.current[r.id]&&(k.current[r.id].remove(),delete k.current[r.id]);return}const d=parseFloat(r.lat||33.5883),a=parseFloat(r.lng||-7.6328);if(isNaN(d)||isNaN(a)||d<20||d>38||a>=0)return;const O=w&&String(r.id).trim()===String(w.id).trim(),m=Re(r.specialty),D=f(y,T,d,a),_=Math.max(3,Math.round(D/30*60));if((r.full_name||"Artisan Maâlem").split(" ").map(h=>h.charAt(0).toUpperCase()+h.slice(1).toLowerCase()).join(" "),k.current[r.id])k.current[r.id].setLngLat([a,d]),k.current[r.id].getElement().parentNode||k.current[r.id].addTo(s);else{const h=document.createElement("div");h.style.width="44px",h.style.height="44px",h.className="relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125",O?h.innerHTML=`
            <div class="absolute w-12 h-12 rounded-2xl bg-emerald-500/30 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-500 shadow-md flex items-center justify-center text-emerald-600">
              ${m}
            </div>
            <span class="absolute -top-1 -right-1 px-1.5 py-0.2 bg-emerald-600 text-[8px] font-black text-white rounded-full border border-white">VOUS</span>
          `:h.innerHTML=`
            <div class="absolute w-10 h-10 rounded-2xl bg-blue-500/20 animate-pulse"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-blue-600 shadow-md flex items-center justify-center text-blue-600">
              ${m}
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
          `;const ee=new J({offset:20,className:"clean-trust-popup"}).setHTML(rt({maalem:r,isSelf:O,distanceKm:D,etaMin:_}));k.current[r.id]=new Y({element:h}).setLngLat([a,d]).setPopup(ee).addTo(s)}}),N&&Array.isArray(N)&&N.length>=2){const r=parseFloat(N[0]),d=parseFloat(N[1]);if(!isNaN(r)&&!isNaN(d)&&r>20&&r<38){const a=(M||[]).find(m=>String(m.id).trim()===String(C).trim()),O=st({maalem:a,etaSummary:H});if(E.current){E.current.getElement().parentNode||E.current.addTo(s);const m=E.current.getPopup();m&&m.setHTML(O);const D=B.current||[d,r],[_,h]=D;if(Math.hypot(d-_,r-h)>4e-5){const te=tt(h,_,r,d);_e.current=te,K.current&&(K.current.style.transform=`rotate(${Math.round(te)}deg)`),R.current&&cancelAnimationFrame(R.current);const ce=performance.now(),$e=1200,Ee=Fe=>{const De=Fe-ce,Le=Math.min(De/$e,1),Ce=1-Math.pow(1-Le,3),ke=_+(d-_)*Ce,Ae=h+(r-h)*Ce;B.current=[ke,Ae],E.current&&E.current.setLngLat([ke,Ae]),Le<1?R.current=requestAnimationFrame(Ee):(R.current=null,B.current=[d,r])};R.current=requestAnimationFrame(Ee)}else E.current.setLngLat([d,r]),B.current=[d,r]}else{const m=document.createElement("div");m.style.width="58px",m.style.height="58px",m.className="relative flex items-center justify-center cursor-pointer z-40 group",m.innerHTML=`
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
          `;const D=m.querySelector(".vehicle-heading-ring");K.current=D,B.current=[d,r];const _=new J({offset:30,className:"clean-trust-popup"}).setHTML(O);E.current=new Y({element:m}).setLngLat([d,r]).setPopup(_).addTo(s)}}}else E.current&&(R.current&&(cancelAnimationFrame(R.current),R.current=null),E.current.remove(),E.current=null,we.current=null,K.current=null,B.current=null);if(!U)Object.keys(A.current).forEach(r=>{A.current[r].remove(),delete A.current[r]});else{const r=$.filter(a=>a.status==="PENDING"),d=new Set(r.map(a=>String(a.id).trim()));Object.keys(A.current).forEach(a=>{d.has(String(a).trim())||(A.current[a].remove(),delete A.current[a])}),r.forEach(a=>{const O=parseFloat(a.lat||33.5883),m=parseFloat(a.lng||-7.6328);if(isNaN(O)||isNaN(m))return;const D=Re(a.service_type),_=f(u.lat,u.lng,O,m);if(A.current[a.id])A.current[a.id].setLngLat([m,O]),A.current[a.id].getElement().parentNode||A.current[a.id].addTo(s);else{const h=document.createElement("div");h.style.width="44px",h.style.height="44px",h.style.willChange="transform",h.className="relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125",h.innerHTML=`
            <div class="absolute w-11 h-11 rounded-2xl bg-red-500/20 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-red-500 shadow-md flex items-center justify-center text-red-600">
              ${D}
            </div>
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-xs"></span>
          `;const ee=String(a.service_type||"").toUpperCase().includes("CLIM")?"Climatisation & Froid":a.service_type==="PLUMBING"?"Plomberie":a.service_type==="ELECTRICIAN"?"Électricité":a.service_type==="AUTO_MECHANIC"?"Mécanique Auto":a.service_type==="PEINTURE"?"Peinture":a.service_type==="MACONNERIE"?"Maçonnerie":a.service_type==="JARDINAGE"?"Jardinage":a.service_type==="SERRURERIE"?"Serrurerie":"Dépannage Urgent",te=a.subcategory?`<div class="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">${a.subcategory}</div>`:"",ce=new J({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-red-200 p-3.5 min-w-[240px] space-y-2 font-sans text-slate-800 rounded-2xl shadow-xl">
              <div class="flex items-center justify-between border-b border-red-100 pb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block"></span>
                  <span class="font-black text-xs text-red-600 uppercase tracking-tight">SOS ${ee}</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold font-mono border border-amber-200">15 DH</span>
              </div>
              ${te}
              <div class="space-y-1 pt-1 text-xs">
                <p class="font-bold text-slate-900">Quartier : <span class="text-blue-600 font-extrabold">${a.district||"Casablanca"}</span></p>
                <div class="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-1 whitespace-nowrap">
                  <span>Distance : <strong class="text-slate-900">${_} km</strong></span>
                  <span>Tarif : <strong class="text-blue-700 font-bold">Accord Direct</strong></span>
                </div>
              </div>
            </div>`);A.current[a.id]=new Y({element:h}).setLngLat([m,O]).setPopup(ce).addTo(s)}})}},[X,w,u,t,p,N,g,M,$,z]),x.useEffect(()=>{const s=j.current;if(!s||!X)return;const l="route-source",i="route-casing-layer",c="route-line-layer";if(!o||o.length<2){s.getLayer(c)&&s.removeLayer(c),s.getLayer(i)&&s.removeLayer(i),s.getSource(l)&&s.removeSource(l),oe.current=!1;return}const y={type:"Feature",properties:{},geometry:{type:"LineString",coordinates:o}};s.getSource(l)?s.getSource(l).setData(y):(s.addSource(l,{type:"geojson",data:y}),s.addLayer({id:i,type:"line",source:l,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#1d4ed8","line-width":8,"line-opacity":.4}}),s.addLayer({id:c,type:"line",source:l,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#3b82f6","line-width":5,"line-opacity":.95}}));const T=o[o.length-1],q=`${T[0].toFixed(3)},${T[1].toFixed(3)}`;if(!oe.current||ve.current!==q){oe.current=!0,ve.current=q;try{const r=new se;o.forEach(d=>{Array.isArray(d)&&d.length>=2&&!isNaN(d[0])&&!isNaN(d[1])&&r.extend(d)}),r.isEmpty()||s.fitBounds(r,{padding:60,maxZoom:16})}catch{}}},[o,X]);const de=()=>{if(typeof window>"u"||!navigator.geolocation){S("Géolocalisation non supportée par votre navigateur.","error");return}le(!0);const s=(l,i,c)=>{le(!1),he({lat:l,lng:i}),j.current&&j.current.flyTo({center:[i,l],zoom:15.5,speed:1.4}),b&&b(l,i),S(`Position GPS détectée ${c}`,"success")};navigator.geolocation.getCurrentPosition(l=>{const{latitude:i,longitude:c,accuracy:y}=l.coords;s(i,c,`(Précision: ±${Math.round(y||10)}m)`)},()=>{navigator.geolocation.getCurrentPosition(l=>{const{latitude:i,longitude:c}=l.coords;s(i,c,"(Réseau / Wi-Fi)")},l=>{le(!1);const i=t||33.5883,c=p||-7.6328;he({lat:i,lng:c}),j.current&&j.current.flyTo({center:[c,i],zoom:14,speed:1.2}),l.code===1?S("Accès GPS refusé. Autorisez la localisation dans votre navigateur pour cibler votre adresse.","warning"):S("Signal GPS indisponible sur cet appareil. Position par défaut (Casablanca) activée.","info")},{enableHighAccuracy:!1,timeout:6e3,maximumAge:6e4})},{enableHighAccuracy:!0,timeout:6e3,maximumAge:0})},W=(M||[]).filter(s=>{if(s.is_online!==!0||s.is_available===!1)return!1;const l=parseFloat(s.lat),i=parseFloat(s.lng);return!isNaN(l)&&!isNaN(i)&&l>=20&&l<=38&&i<0}),ye=W.length,Ne=()=>{const s=j.current;if(!s||W.length===0){S("Aucun Maâlem en ligne détecté pour le moment.","info");return}if(W.length===1){const c=W[0],y=parseFloat(c.lat),T=parseFloat(c.lng);if(!isNaN(y)&&!isNaN(T)&&T<0){s.flyTo({center:[T,y],zoom:15,speed:1.4}),b&&b(y,T),S(`📍 Cadrage sur l'artisan en direct (${c.full_name})`,"success");return}}const l=new se;let i=0;W.forEach(c=>{const y=parseFloat(c.lat),T=parseFloat(c.lng);!isNaN(y)&&!isNaN(T)&&T<0&&y>=20&&y<=38&&(l.extend([T,y]),i++)}),i>0&&(s.fitBounds(l,{padding:60,maxZoom:15}),S(`📍 Cadrage sur les ${i} Maâlem(s) en ligne`,"success"))},Me=()=>{const s=j.current;if(!s)return;const l=$.filter(c=>c.status==="PENDING"&&c.lat&&c.lng);if(l.length===0){const c=parseFloat(t||(u==null?void 0:u.lat)||33.5883),y=parseFloat(p||(u==null?void 0:u.lng)||-7.6328);s.flyTo({center:[y,c],zoom:14.5,speed:1.2}),S("Aucune demande SOS en attente pour le moment.","info");return}if(l.length===1){s.flyTo({center:[parseFloat(l[0].lng),parseFloat(l[0].lat)],zoom:15,speed:1.4});return}const i=new se;l.forEach(c=>{i.extend([parseFloat(c.lng),parseFloat(c.lat)])}),s.fitBounds(i,{padding:60,maxZoom:15})},He=()=>{const s=j.current;if(!(!s||!o||o.length<2))try{const l=new se;o.forEach(i=>{Array.isArray(i)&&i.length>=2&&!isNaN(i[0])&&!isNaN(i[1])&&l.extend(i)}),l.isEmpty()||s.fitBounds(l,{padding:60,maxZoom:16})}catch{}};return e.jsxs("div",{className:"relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white",children:[e.jsx("div",{ref:ne,className:`w-full h-[320px] xs:h-[370px] sm:h-[440px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden map-theme-${fe.toLowerCase().replace("_","-")}`}),e.jsxs("div",{className:"absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1.25rem)]",children:[e.jsxs("button",{type:"button",onClick:de,disabled:F,className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Centrer sur ma position GPS",children:[e.jsx(Ve,{className:`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${F?"animate-spin text-amber-500":"text-blue-600"}`}),e.jsx("span",{className:"hidden xs:inline",children:F?"GPS...":"GPS"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>{ie(!ge),ae(!1)},className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Personnaliser la couleur des rues et routes",children:[e.jsx(Be,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"hidden sm:inline",children:"Couleur Rues"})]}),ge&&e.jsxs("div",{className:"absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-2 shadow-xl z-30 space-y-1.5 font-sans",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1",children:"Palette des Routes :"}),Xe.map(s=>e.jsxs("button",{type:"button",onClick:()=>{Oe(s.id),ie(!1)},className:`w-full text-left p-2 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 cursor-pointer ${fe===s.id?"bg-blue-50 text-blue-900 border border-blue-200":"text-slate-700 hover:bg-slate-50"}`,children:[e.jsx("span",{className:`w-3.5 h-3.5 rounded-full ${s.iconColor} shadow-xs mt-0.5 flex-shrink-0`}),e.jsxs("div",{children:[e.jsx("span",{className:"block font-black leading-tight",children:s.label}),e.jsx("span",{className:"text-[10px] font-normal text-slate-500 block",children:s.desc})]})]},s.id))]})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>{ae(!me),ie(!1)},className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Changer la source de la carte",children:[e.jsx(Te,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"hidden xs:inline",children:(je=re[z])==null?void 0:je.name.split(" ")[0]})]}),me&&e.jsxs("div",{className:"absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-1.5 shadow-xl z-30 space-y-1 font-sans",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1",children:"Source Cartographique :"}),Object.entries(re).map(([s,l])=>e.jsxs("button",{type:"button",onClick:()=>{Ge(s),ae(!1)},className:`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${z===s?"bg-blue-50 text-blue-900 border border-blue-200":"text-slate-700 hover:bg-slate-50"}`,children:[e.jsx("span",{className:"truncate pr-2",children:l.name}),z===s&&e.jsx(Ue,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"})]},s))]})]})]}),e.jsx("div",{className:"bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 sm:p-3 px-2.5 sm:px-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs text-slate-700 shadow-sm font-sans",children:U?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2",children:[e.jsxs("div",{className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 rounded-xl shadow-xs text-[10px] sm:text-xs whitespace-nowrap",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-blue-600"})]}),e.jsx("span",{className:"truncate",children:"GPS Pro"})]}),e.jsxs(V.button,{whileTap:{scale:.95},type:"button",onClick:Me,className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-red-800 hover:text-red-900 transition-all cursor-pointer bg-red-50 hover:bg-red-100 px-2 rounded-xl border border-red-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap",title:"Cadrer sur toutes les urgences SOS ouvertes dans la zone",children:[e.jsx("span",{className:"w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 inline-block animate-ping flex-shrink-0"}),e.jsxs("span",{className:"truncate",children:["SOS (",$.filter(s=>s.status==="PENDING").length,")"]})]}),e.jsxs(V.button,{whileTap:{scale:.95},type:"button",onClick:Ne,className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2 rounded-xl border border-emerald-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap",title:"Cadrer sur les Maâlems disponibles sur la carte",children:[e.jsxs("span",{className:"relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"})]}),e.jsxs("span",{className:"truncate",children:["Maâlems (",ye,")"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0",children:[e.jsxs(V.button,{whileTap:{scale:.95},type:"button",onClick:Me,className:"h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Cadrer l'ensemble de la zone active",children:[e.jsx(Te,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Chantiers"})]}),e.jsxs(V.button,{whileTap:{scale:.95},type:"button",onClick:de,disabled:F,className:"h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Centrer la carte sur votre position GPS exacte",children:[e.jsx(pe,{className:`w-3.5 h-3.5 text-white flex-shrink-0 ${F?"animate-spin":""}`}),e.jsx("span",{className:"truncate",children:F?"...":"Ma Position"})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2",children:[e.jsxs("div",{className:"h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 sm:px-3 rounded-xl shadow-xs text-[11px] sm:text-xs whitespace-nowrap",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-blue-600"})]}),e.jsx("span",{className:"truncate",children:"Votre Position"})]}),e.jsxs(V.button,{whileTap:{scale:.95},type:"button",onClick:Ne,className:"h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 sm:px-3 rounded-xl border border-emerald-200 shadow-xs text-[11px] sm:text-xs whitespace-nowrap",title:"Cadrer sur les Maâlems disponibles autour de vous",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-emerald-600"})]}),e.jsxs("span",{className:"truncate",children:["Artisans (",ye,") 🟢"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0",children:[o&&o.length>=2&&e.jsxs(V.button,{whileTap:{scale:.95},type:"button",onClick:He,className:"h-8 sm:h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 sm:px-3 rounded-xl border border-blue-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Cadrer l'ensemble du trajet (Artisan et Arrivée)",children:[e.jsx(pe,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Tout le Trajet"})]}),n==="CLIENT_PICKER"&&t&&p&&e.jsxs(V.button,{whileTap:{scale:.95},type:"button",onClick:()=>{j.current&&j.current.flyTo({center:[parseFloat(p),parseFloat(t)],zoom:15.5,speed:1.3})},className:"h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Recadrer sur l'adresse sélectionnée",children:[e.jsx(Pe,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Point SOS"})]}),e.jsxs(V.button,{whileTap:{scale:.95},type:"button",onClick:de,disabled:F,className:"h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Centrer la carte sur votre position GPS",children:[e.jsx(pe,{className:`w-3.5 h-3.5 text-white flex-shrink-0 ${F?"animate-spin":""}`}),e.jsx("span",{className:"truncate",children:F?"...":"Ma Position"})]})]})]})})]})},dt=({currentPage:n=1,totalPages:t=1,totalItems:p=0,startIndex:b=0,endIndex:g=0,onPageChange:o,pageSize:N,onPageSizeChange:C,pageSizeOptions:v=[10,20,50],className:H="",itemLabel:w="éléments"})=>{if(p===0||t<=1)return p>0&&t<=1&&v&&C?e.jsx("div",{className:`flex items-center justify-between py-3 text-xs text-slate-500 font-medium ${H}`,children:e.jsxs("span",{children:["Affichage de ",e.jsx("strong",{children:b})," à ",e.jsx("strong",{children:g})," sur ",e.jsx("strong",{children:p})," ",w]})}):null;const M=(()=>{const f=[];let Z=Math.max(1,n-Math.floor(2.5)),Q=Math.min(t,Z+5-1);Q-Z+1<5&&(Z=Math.max(1,Q-5+1));for(let U=Z;U<=Q;U++)f.push(U);return f})();return e.jsxs("div",{className:`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 select-none border-t border-slate-100 ${H}`,children:[e.jsxs("div",{className:"text-xs text-slate-500 font-medium flex items-center gap-2",children:[e.jsxs("span",{children:["Affichage de ",e.jsx("strong",{className:"text-slate-800",children:b})," à ",e.jsx("strong",{className:"text-slate-800",children:g})," sur ",e.jsx("strong",{className:"text-slate-800",children:p})," ",w]}),v&&C&&e.jsxs("div",{className:"flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200",children:[e.jsx("span",{className:"text-[11px] text-slate-400",children:"Par page :"}),e.jsx("select",{value:N,onChange:f=>{C(Number(f.target.value)),o&&o(1)},className:"text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer",children:v.map(f=>e.jsx("option",{value:f,children:f},f))})]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[n>2&&t>4&&e.jsx("button",{type:"button",onClick:()=>o(1),disabled:n===1,title:"Première page",className:"p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95",children:e.jsx(ze,{className:"w-4 h-4"})}),e.jsxs("button",{type:"button",onClick:()=>o(n-1),disabled:n===1,title:"Page précédente",className:"flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95",children:[e.jsx(Ze,{className:"w-4 h-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Précédent"})]}),e.jsxs("div",{className:"flex items-center gap-1 px-1",children:[M[0]>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:()=>o(1),className:"w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95",children:"1"}),M[0]>2&&e.jsx("span",{className:"text-slate-400 px-0.5 text-xs font-bold",children:"..."})]}),M.map(f=>{const S=f===n;return e.jsx("button",{type:"button",onClick:()=>o(f),className:`w-8 h-8 rounded-xl text-xs font-bold transition-all active:scale-95 ${S?"bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30":"border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs"}`,children:f},f)}),M[M.length-1]<t&&e.jsxs(e.Fragment,{children:[M[M.length-1]<t-1&&e.jsx("span",{className:"text-slate-400 px-0.5 text-xs font-bold",children:"..."}),e.jsx("button",{type:"button",onClick:()=>o(t),className:"w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95",children:t})]})]}),e.jsxs("button",{type:"button",onClick:()=>o(n+1),disabled:n===t,title:"Page suivante",className:"flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95",children:[e.jsx("span",{className:"hidden sm:inline",children:"Suivant"}),e.jsx(Ke,{className:"w-4 h-4"})]}),n<t-1&&t>4&&e.jsx("button",{type:"button",onClick:()=>o(t),disabled:n===t,title:"Dernière page",className:"p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95",children:e.jsx(We,{className:"w-4 h-4"})})]})]})};export{ot as I,dt as P};

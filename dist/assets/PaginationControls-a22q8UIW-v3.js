import{j as e,m as I}from"./motion-vendor-D8fNPfAT-v3.js";import{r as c,bl as Me,bm as Ce,bn as he,S as Ee,aE as be,M as je,bo as Le,a_ as ke,ax as Ae,bp as Te}from"./icons-vendor-B1E9i1es-v3.js";import{x as Se,C as Re,$ as K,M as Y,K as re,a as ge}from"./maplibre-vendor-v_HaOzn3-v3.js";import{u as Ie,a as Ge,x as Oe}from"./index-_7TA1kTO-v3.js";typeof window<"u"&&ge&&(ge.WORKER_URL="/assets/maplibre-gl-worker.mjs");const J={OSM_FR:{id:"OSM_FR",name:"Plan Urbain Complet (Rues & Lieux)",tiles:["https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png","https://b.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png","https://c.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"],attribution:"&copy; OpenStreetMap France contributors"},ESRI_STREETS:{id:"ESRI_STREETS",name:"Esri World Streets (Détaillé)",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],attribution:"&copy; Esri, HERE, Garmin, OpenStreetMap"},SATELLITE:{id:"SATELLITE",name:"Vue Satellite HD (Bâtiments réels)",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],attribution:"&copy; Esri, Maxar, Earthstar Geographics"},VOYAGER:{id:"VOYAGER",name:"Carto Voyager (Épuré)",tiles:["https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png","https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png","https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png","https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"],attribution:"&copy; CARTO &copy; OpenStreetMap"}},_e=[{id:"GOLD_CYAN",label:"Doré & Cyan (Haute Clarté)",iconColor:"bg-amber-400",desc:"Grands axes dorés et rues nettes"},{id:"NEON_CYBER",label:"Néon Cyberpunk (Sombre)",iconColor:"bg-cyan-400",desc:"Radar de nuit avec routes fluorescentes"},{id:"SILVER_SLATE",label:"Silver Épuré (Minimaliste)",iconColor:"bg-slate-300",desc:"Rendu monochrome moderne"},{id:"NATURAL",label:"Couleurs Naturelles (Standard)",iconColor:"bg-emerald-400",desc:"Rendu topographique officiel"}],Fe=p=>{const t=J[p]||J.OSM_FR;return{version:8,sources:{"base-tiles":{type:"raster",tiles:t.tiles,tileSize:256,attribution:t.attribution||"&copy; OpenStreetMap"}},layers:[{id:"base-tiles-layer",type:"raster",source:"base-tiles",minzoom:0,maxzoom:19}]}},h={PLUMBING:`
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
  `},we=p=>{const t=String(p||"").toUpperCase();return t.includes("CLIM")||t.includes("FROID")||t.includes("HVAC")||t.includes("AIR")?h.CLIMATISATION:t.includes("PLOMB")||t.includes("PLUMB")||t.includes("EAU")?h.PLUMBING:t.includes("ELEC")||t.includes("VOLT")||t.includes("COURANT")?h.ELECTRICIAN:t.includes("AUTO")||t.includes("CAR")||t.includes("LAVAGE")||t.includes("MECAN")?h.AUTO_MECHANIC:t.includes("MENUIS")||t.includes("CARPENTER")||t.includes("WOOD")||t.includes("BOIS")?h.MENUISERIE:t.includes("SERRUR")||t.includes("KEY")||t.includes("LOCK")||t.includes("PORTE")?h.SERRURERIE:t.includes("PEINT")||t.includes("PAINT")||t.includes("DECO")?h.PEINTURE:t.includes("MACON")||t.includes("BRICK")||t.includes("BATIMENT")||t.includes("CIMENT")?h.MACONNERIE:t.includes("ELECTRO")||t.includes("MULTIMEDIA")||t.includes("TV")?h.ELECTROMENAGER:t.includes("JARDIN")||t.includes("GARDEN")||t.includes("PLANT")?h.JARDINAGE:t.includes("NETT")||t.includes("MENAGE")||t.includes("CLEAN")?h.NETTOYAGE:t.includes("DERAT")||t.includes("DESINF")||t.includes("PEST")?h.DERATISATION:t.includes("PISCINE")||t.includes("POOL")||t.includes("WAVE")?h.PISCINE:h.PLUMBING},De=({mode:p="CLIENT_PICKER",selectedLat:t,selectedLng:u,onLocationSelect:N,filterCategory:$,activeRouteCoords:f,trackingMaalemPos:ae,trackingClientPos:D,etaSummary:B})=>{var me;const{user:C}=Ie(),{interventions:A,maalems:G,calculateDistanceInKm:M,showToast:d,isMaalemOnline:W,toggleMaalemOnlineStatus:V}=Ge(),O=!!(C&&(String(C.role||"").toUpperCase()==="MAALEM"||String(C.role||"").toUpperCase()==="ADMIN")),T=c.useRef(null),b=c.useRef(null),_=(()=>{try{return JSON.parse(localStorage.getItem("bricolemoi_client_gps")||"null")}catch{return null}})(),le=t||(_==null?void 0:_.lat)||33.5883,ne=u||(_==null?void 0:_.lng)||-7.6328,[F,ve]=c.useState("OSM_FR"),[oe,Ne]=c.useState("GOLD_CYAN"),[i,ie]=c.useState({lat:le,lng:ne}),[H,ye]=c.useState({}),[z,de]=c.useState(!1),[E,q]=c.useState(!1),[ce,Q]=c.useState(!1),[pe,X]=c.useState(!1),S=c.useRef({}),g=c.useRef({}),R=c.useRef(null),j=c.useRef(null);c.useEffect(()=>{if(!T.current)return;R.current=null,j.current=null,S.current={},g.current={};const s=new Se({container:T.current,style:Fe(F),center:[ne,le],zoom:14.5,minZoom:10,maxZoom:19,pitch:0,bearing:0,antialias:!0,attributionControl:!1});s.addControl(new Re({showCompass:!0}),"top-right"),b.current=s,s.on("load",()=>{de(!0),s.resize()});const l=setTimeout(()=>{s&&s.resize()},200);return s.on("click",o=>{N&&N(o.lngLat.lat,o.lngLat.lng)}),()=>{clearTimeout(l),R.current=null,j.current=null,S.current={},g.current={},de(!1),s.remove()}},[F]),c.useEffect(()=>{b.current&&t&&u&&b.current.flyTo({center:[u,t],zoom:14.5,speed:1.2})},[t,u]),c.useEffect(()=>{const s={};(G||[]).forEach(l=>{s[l.id]={lat:l.lat,lng:l.lng}}),ye(s)},[G]),c.useEffect(()=>{const s=b.current;if(!s||!z)return;if(R.current)R.current.setLngLat([i.lng,i.lat]),R.current.getElement().parentNode||R.current.addTo(s);else{const r=document.createElement("div");r.style.width="36px",r.style.height="36px",r.className="relative flex items-center justify-center cursor-pointer",r.innerHTML=`
        <div class="absolute w-10 h-10 rounded-full bg-blue-500/25 animate-ping"></div>
        <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md shadow-blue-500/40"></div>
      `;const w=new K({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
          <p class="font-black text-slate-900 text-xs">Votre Position GPS</p>
          <p class="text-[10px] text-slate-500 font-mono mt-0.5">${i.lat.toFixed(4)}, ${i.lng.toFixed(4)}</p>
        </div>`);R.current=new Y({element:r}).setLngLat([i.lng,i.lat]).setPopup(w).addTo(s)}const l=parseFloat(t||(i==null?void 0:i.lat)||33.5883),o=parseFloat(u||(i==null?void 0:i.lng)||-7.6328);if(p==="CLIENT_PICKER"&&!isNaN(l)&&!isNaN(o))if(j.current)j.current.setLngLat([o,l]),j.current.getElement().parentNode||j.current.addTo(s);else{const r=document.createElement("div");r.style.width="44px",r.style.height="52px",r.className="cursor-move transform -translate-y-full transition-transform hover:scale-110 z-30",r.innerHTML=`
          <div class="relative flex flex-col items-center">
            <div class="w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border-2 border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="w-1.5 h-3.5 bg-blue-600 shadow-sm rounded-b-full"></div>
          </div>
        `;const w=new K({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="text-xs font-black text-slate-900">Point d'Intervention</p>
            <p class="text-[10px] text-slate-500 mt-0.5">Glissez le marqueur pour affiner</p>
          </div>`);j.current=new Y({element:r,draggable:!0}).setLngLat([o,l]).setPopup(w).addTo(s),j.current.on("dragend",()=>{const a=j.current.getLngLat();N&&N(a.lat,a.lng)})}const n=parseFloat(t||(i==null?void 0:i.lat)||33.5883),m=parseFloat(u||(i==null?void 0:i.lng)||-7.6328),x=(G||[]).filter(r=>{if(r.is_online!==!0||r.is_available===!1)return!1;const w=H[r.id]||{lat:r.lat,lng:r.lng},a=parseFloat(w.lat),v=parseFloat(w.lng);return!(isNaN(a)||isNaN(v)||a<20||a>38||v>=0)});if(Object.keys(S.current).forEach(r=>{x.some(a=>String(a.id).trim()===String(r).trim())||(S.current[r].remove(),delete S.current[r])}),x.forEach(r=>{const w=H[r.id]||{lat:r.lat,lng:r.lng},a=parseFloat(w.lat||33.5883),v=parseFloat(w.lng||-7.6328);if(isNaN(a)||isNaN(v)||a<20||a>38||v>=0)return;const L=C&&String(r.id).trim()===String(C.id).trim(),P=we(r.specialty),Z=M(n,m,a,v),k=Math.max(3,Math.round(Z/30*60)),te=(r.full_name||"Artisan Maâlem").split(" ").map(y=>y.charAt(0).toUpperCase()+y.slice(1).toLowerCase()).join(" ");if(!S.current[r.id]){const y=document.createElement("div");y.style.width="44px",y.style.height="44px",y.className="relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125",L?y.innerHTML=`
            <div class="absolute w-12 h-12 rounded-2xl bg-emerald-500/30 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-500 shadow-md flex items-center justify-center text-emerald-600">
              ${P}
            </div>
            <span class="absolute -top-1 -right-1 px-1.5 py-0.2 bg-emerald-600 text-[8px] font-black text-white rounded-full border border-white">VOUS</span>
          `:y.innerHTML=`
            <div class="absolute w-10 h-10 rounded-2xl bg-blue-500/20 animate-pulse"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-blue-600 shadow-md flex items-center justify-center text-blue-600">
              ${P}
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
          `;const se=new K({offset:20,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3.5 rounded-2xl text-slate-800 font-sans shadow-xl min-w-[240px]">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span class="font-black text-sm text-slate-900 truncate max-w-[140px]">${L?"Votre Position Artisan":te}</span>
              </div>
              <span class="text-[10px] font-mono text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                ${L?"🟢 En Ligne":"En direct"}
              </span>
            </div>
            <div class="space-y-2 text-xs">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] text-slate-600 font-semibold truncate">${Oe(r.specialty)}</span>
                <span class="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 font-mono text-[11px] whitespace-nowrap shrink-0">
                  ⭐ ${(r.rating_avg||5).toFixed(1)} / 5.0${r.reviews_count?` (${r.reviews_count})`:""}
                </span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-2 border-t border-slate-100 whitespace-nowrap">
                <span>Distance : <strong class="text-slate-900">${Z} km</strong></span>
                <span>Arrivée : <strong class="text-blue-700 font-bold">~${k} min</strong></span>
              </div>
            </div>
          </div>`);S.current[r.id]=new Y({element:y}).setLngLat([v,a]).setPopup(se).addTo(s)}}),!O)Object.keys(g.current).forEach(r=>{g.current[r].remove(),delete g.current[r]});else{const r=A.filter(a=>a.status==="PENDING"),w=new Set(r.map(a=>String(a.id).trim()));Object.keys(g.current).forEach(a=>{w.has(String(a).trim())||(g.current[a].remove(),delete g.current[a])}),r.forEach(a=>{const v=parseFloat(a.lat||33.5883),L=parseFloat(a.lng||-7.6328);if(isNaN(v)||isNaN(L))return;const P=we(a.service_type),Z=M(i.lat,i.lng,v,L);if(g.current[a.id])g.current[a.id].setLngLat([L,v]),g.current[a.id].getElement().parentNode||g.current[a.id].addTo(s);else{const k=document.createElement("div");k.style.width="44px",k.style.height="44px",k.style.willChange="transform",k.className="relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125",k.innerHTML=`
            <div class="absolute w-11 h-11 rounded-2xl bg-red-500/20 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-red-500 shadow-md flex items-center justify-center text-red-600">
              ${P}
            </div>
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-xs"></span>
          `;const te=String(a.service_type||"").toUpperCase().includes("CLIM")?"Climatisation & Froid":a.service_type==="PLUMBING"?"Plomberie":a.service_type==="ELECTRICIAN"?"Électricité":a.service_type==="AUTO_MECHANIC"?"Mécanique Auto":a.service_type==="PEINTURE"?"Peinture":a.service_type==="MACONNERIE"?"Maçonnerie":a.service_type==="JARDINAGE"?"Jardinage":a.service_type==="SERRURERIE"?"Serrurerie":"Dépannage Urgent",y=a.subcategory?`<div class="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">${a.subcategory}</div>`:"",se=new K({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-red-200 p-3.5 min-w-[240px] space-y-2 font-sans text-slate-800 rounded-2xl shadow-xl">
              <div class="flex items-center justify-between border-b border-red-100 pb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block"></span>
                  <span class="font-black text-xs text-red-600 uppercase tracking-tight">SOS ${te}</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold font-mono border border-amber-200">15 DH</span>
              </div>
              ${y}
              <div class="space-y-1 pt-1 text-xs">
                <p class="font-bold text-slate-900">Quartier : <span class="text-blue-600 font-extrabold">${a.district||"Casablanca"}</span></p>
                <div class="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-1 whitespace-nowrap">
                  <span>Distance : <strong class="text-slate-900">${Z} km</strong></span>
                  <span>Tarif : <strong class="text-blue-700 font-bold">Accord Direct</strong></span>
                </div>
              </div>
            </div>`);g.current[a.id]=new Y({element:k}).setLngLat([L,v]).setPopup(se).addTo(s)}})}},[z,C,i,t,u,H,$,G,A,F]),c.useEffect(()=>{const s=b.current;if(!s||!z)return;const l="route-source",o="route-casing-layer",n="route-line-layer";if(!f||f.length<2){s.getLayer(n)&&s.removeLayer(n),s.getLayer(o)&&s.removeLayer(o),s.getSource(l)&&s.removeSource(l);return}const m={type:"Feature",properties:{},geometry:{type:"LineString",coordinates:f}};s.getSource(l)?s.getSource(l).setData(m):(s.addSource(l,{type:"geojson",data:m}),s.addLayer({id:o,type:"line",source:l,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#1d4ed8","line-width":8,"line-opacity":.4}}),s.addLayer({id:n,type:"line",source:l,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#3b82f6","line-width":5,"line-opacity":.95}}));try{const x=new re;f.forEach(r=>{Array.isArray(r)&&r.length>=2&&!isNaN(r[0])&&!isNaN(r[1])&&x.extend(r)}),x.isEmpty()||s.fitBounds(x,{padding:60,maxZoom:16})}catch{}},[f,z]);const ee=()=>{if(typeof window>"u"||!navigator.geolocation){d("Géolocalisation non supportée par votre navigateur.","error");return}q(!0);const s=(l,o,n)=>{q(!1),ie({lat:l,lng:o}),b.current&&b.current.flyTo({center:[o,l],zoom:15.5,speed:1.4}),N&&N(l,o),d(`Position GPS détectée ${n}`,"success")};navigator.geolocation.getCurrentPosition(l=>{const{latitude:o,longitude:n,accuracy:m}=l.coords;s(o,n,`(Précision: ±${Math.round(m||10)}m)`)},()=>{navigator.geolocation.getCurrentPosition(l=>{const{latitude:o,longitude:n}=l.coords;s(o,n,"(Réseau / Wi-Fi)")},l=>{q(!1);const o=t||33.5883,n=u||-7.6328;ie({lat:o,lng:n}),b.current&&b.current.flyTo({center:[n,o],zoom:14,speed:1.2}),l.code===1?d("Accès GPS refusé. Autorisez la localisation dans votre navigateur pour cibler votre adresse.","warning"):d("Signal GPS indisponible sur cet appareil. Position par défaut (Casablanca) activée.","info")},{enableHighAccuracy:!1,timeout:6e3,maximumAge:6e4})},{enableHighAccuracy:!0,timeout:6e3,maximumAge:0})},U=(G||[]).filter(s=>{if(s.is_online!==!0||s.is_available===!1)return!1;const l=H[s.id]||{lat:s.lat,lng:s.lng},o=parseFloat(l.lat),n=parseFloat(l.lng);return!isNaN(o)&&!isNaN(n)&&o>=20&&o<=38&&n<0}),ue=U.length,xe=()=>{const s=b.current;if(!s||U.length===0){d("Aucun Maâlem en ligne détecté pour le moment.","info");return}if(U.length===1){const n=U[0],m=H[n.id]||{lat:n.lat,lng:n.lng},x=parseFloat(m.lat),r=parseFloat(m.lng);if(!isNaN(x)&&!isNaN(r)&&r<0){s.flyTo({center:[r,x],zoom:15,speed:1.4}),N&&N(x,r),d(`📍 Cadrage sur l'artisan en direct (${n.full_name})`,"success");return}}const l=new re;let o=0;U.forEach(n=>{const m=H[n.id]||{lat:n.lat,lng:n.lng},x=parseFloat(m.lat),r=parseFloat(m.lng);!isNaN(x)&&!isNaN(r)&&r<0&&x>=20&&x<=38&&(l.extend([r,x]),o++)}),o>0&&(s.fitBounds(l,{padding:60,maxZoom:15}),d(`📍 Cadrage sur les ${o} Maâlem(s) en ligne`,"success"))},fe=()=>{const s=b.current;if(!s)return;const l=A.filter(n=>n.status==="PENDING"&&n.lat&&n.lng);if(l.length===0){const n=parseFloat(t||(i==null?void 0:i.lat)||33.5883),m=parseFloat(u||(i==null?void 0:i.lng)||-7.6328);s.flyTo({center:[m,n],zoom:14.5,speed:1.2}),d("Aucune demande SOS en attente pour le moment.","info");return}if(l.length===1){s.flyTo({center:[parseFloat(l[0].lng),parseFloat(l[0].lat)],zoom:15,speed:1.4});return}const o=new re;l.forEach(n=>{o.extend([parseFloat(n.lng),parseFloat(n.lat)])}),s.fitBounds(o,{padding:60,maxZoom:15})};return e.jsxs("div",{className:"relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white",children:[e.jsx("div",{ref:T,className:`w-full h-[320px] xs:h-[370px] sm:h-[440px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden map-theme-${oe.toLowerCase().replace("_","-")}`}),e.jsxs("div",{className:"absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1.25rem)]",children:[e.jsxs("button",{type:"button",onClick:ee,disabled:E,className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Centrer sur ma position GPS",children:[e.jsx(Me,{className:`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${E?"animate-spin text-amber-500":"text-blue-600"}`}),e.jsx("span",{className:"hidden xs:inline",children:E?"GPS...":"GPS"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>{X(!pe),Q(!1)},className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Personnaliser la couleur des rues et routes",children:[e.jsx(Ce,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"hidden sm:inline",children:"Couleur Rues"})]}),pe&&e.jsxs("div",{className:"absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-2 shadow-xl z-30 space-y-1.5 font-sans",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1",children:"Palette des Routes :"}),_e.map(s=>e.jsxs("button",{type:"button",onClick:()=>{Ne(s.id),X(!1)},className:`w-full text-left p-2 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 cursor-pointer ${oe===s.id?"bg-blue-50 text-blue-900 border border-blue-200":"text-slate-700 hover:bg-slate-50"}`,children:[e.jsx("span",{className:`w-3.5 h-3.5 rounded-full ${s.iconColor} shadow-xs mt-0.5 flex-shrink-0`}),e.jsxs("div",{children:[e.jsx("span",{className:"block font-black leading-tight",children:s.label}),e.jsx("span",{className:"text-[10px] font-normal text-slate-500 block",children:s.desc})]})]},s.id))]})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>{Q(!ce),X(!1)},className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Changer la source de la carte",children:[e.jsx(he,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"hidden xs:inline",children:(me=J[F])==null?void 0:me.name.split(" ")[0]})]}),ce&&e.jsxs("div",{className:"absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-1.5 shadow-xl z-30 space-y-1 font-sans",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1",children:"Source Cartographique :"}),Object.entries(J).map(([s,l])=>e.jsxs("button",{type:"button",onClick:()=>{ve(s),Q(!1)},className:`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${F===s?"bg-blue-50 text-blue-900 border border-blue-200":"text-slate-700 hover:bg-slate-50"}`,children:[e.jsx("span",{className:"truncate pr-2",children:l.name}),F===s&&e.jsx(Ee,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"})]},s))]})]})]}),e.jsx("div",{className:"bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 sm:p-3 px-2.5 sm:px-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs text-slate-700 shadow-sm font-sans",children:O?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2",children:[e.jsxs("div",{className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 rounded-xl shadow-xs text-[10px] sm:text-xs whitespace-nowrap",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-blue-600"})]}),e.jsx("span",{className:"truncate",children:"GPS Pro"})]}),e.jsxs(I.button,{whileTap:{scale:.95},type:"button",onClick:fe,className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-red-800 hover:text-red-900 transition-all cursor-pointer bg-red-50 hover:bg-red-100 px-2 rounded-xl border border-red-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap",title:"Cadrer sur toutes les urgences SOS ouvertes dans la zone",children:[e.jsx("span",{className:"w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 inline-block animate-ping flex-shrink-0"}),e.jsxs("span",{className:"truncate",children:["SOS (",A.filter(s=>s.status==="PENDING").length,")"]})]}),e.jsxs(I.button,{whileTap:{scale:.95},type:"button",onClick:xe,className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2 rounded-xl border border-emerald-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap",title:"Cadrer sur les Maâlems disponibles sur la carte",children:[e.jsxs("span",{className:"relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"})]}),e.jsxs("span",{className:"truncate",children:["Maâlems (",ue,")"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0",children:[e.jsxs(I.button,{whileTap:{scale:.95},type:"button",onClick:fe,className:"h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Cadrer l'ensemble de la zone active",children:[e.jsx(he,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Chantiers"})]}),e.jsxs(I.button,{whileTap:{scale:.95},type:"button",onClick:ee,disabled:E,className:"h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Centrer la carte sur votre position GPS exacte",children:[e.jsx(be,{className:`w-3.5 h-3.5 text-white flex-shrink-0 ${E?"animate-spin":""}`}),e.jsx("span",{className:"truncate",children:E?"...":"Ma Position"})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2",children:[e.jsxs("div",{className:"h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 sm:px-3 rounded-xl shadow-xs text-[11px] sm:text-xs whitespace-nowrap",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-blue-600"})]}),e.jsx("span",{className:"truncate",children:"Votre Position"})]}),e.jsxs(I.button,{whileTap:{scale:.95},type:"button",onClick:xe,className:"h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 sm:px-3 rounded-xl border border-emerald-200 shadow-xs text-[11px] sm:text-xs whitespace-nowrap",title:"Cadrer sur les Maâlems disponibles autour de vous",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-emerald-600"})]}),e.jsxs("span",{className:"truncate",children:["Artisans (",ue,") 🟢"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0",children:[p==="CLIENT_PICKER"&&t&&u&&e.jsxs(I.button,{whileTap:{scale:.95},type:"button",onClick:()=>{b.current&&b.current.flyTo({center:[parseFloat(u),parseFloat(t)],zoom:15.5,speed:1.3})},className:"h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Recadrer sur l'adresse sélectionnée",children:[e.jsx(je,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Point SOS"})]}),e.jsxs(I.button,{whileTap:{scale:.95},type:"button",onClick:ee,disabled:E,className:"h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Centrer la carte sur votre position GPS",children:[e.jsx(be,{className:`w-3.5 h-3.5 text-white flex-shrink-0 ${E?"animate-spin":""}`}),e.jsx("span",{className:"truncate",children:E?"...":"Ma Position"})]})]})]})})]})},Be=({currentPage:p=1,totalPages:t=1,totalItems:u=0,startIndex:N=0,endIndex:$=0,onPageChange:f,pageSize:ae,onPageSizeChange:D,pageSizeOptions:B=[10,20,50],className:C="",itemLabel:A="éléments"})=>{if(u===0||t<=1)return u>0&&t<=1&&B&&D?e.jsx("div",{className:`flex items-center justify-between py-3 text-xs text-slate-500 font-medium ${C}`,children:e.jsxs("span",{children:["Affichage de ",e.jsx("strong",{children:N})," à ",e.jsx("strong",{children:$})," sur ",e.jsx("strong",{children:u})," ",A]})}):null;const M=(()=>{const d=[];let V=Math.max(1,p-Math.floor(2.5)),O=Math.min(t,V+5-1);O-V+1<5&&(V=Math.max(1,O-5+1));for(let T=V;T<=O;T++)d.push(T);return d})();return e.jsxs("div",{className:`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 select-none border-t border-slate-100 ${C}`,children:[e.jsxs("div",{className:"text-xs text-slate-500 font-medium flex items-center gap-2",children:[e.jsxs("span",{children:["Affichage de ",e.jsx("strong",{className:"text-slate-800",children:N})," à ",e.jsx("strong",{className:"text-slate-800",children:$})," sur ",e.jsx("strong",{className:"text-slate-800",children:u})," ",A]}),B&&D&&e.jsxs("div",{className:"flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200",children:[e.jsx("span",{className:"text-[11px] text-slate-400",children:"Par page :"}),e.jsx("select",{value:ae,onChange:d=>{D(Number(d.target.value)),f&&f(1)},className:"text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer",children:B.map(d=>e.jsx("option",{value:d,children:d},d))})]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[p>2&&t>4&&e.jsx("button",{type:"button",onClick:()=>f(1),disabled:p===1,title:"Première page",className:"p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95",children:e.jsx(Le,{className:"w-4 h-4"})}),e.jsxs("button",{type:"button",onClick:()=>f(p-1),disabled:p===1,title:"Page précédente",className:"flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95",children:[e.jsx(ke,{className:"w-4 h-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Précédent"})]}),e.jsxs("div",{className:"flex items-center gap-1 px-1",children:[M[0]>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:()=>f(1),className:"w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95",children:"1"}),M[0]>2&&e.jsx("span",{className:"text-slate-400 px-0.5 text-xs font-bold",children:"..."})]}),M.map(d=>{const W=d===p;return e.jsx("button",{type:"button",onClick:()=>f(d),className:`w-8 h-8 rounded-xl text-xs font-bold transition-all active:scale-95 ${W?"bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30":"border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs"}`,children:d},d)}),M[M.length-1]<t&&e.jsxs(e.Fragment,{children:[M[M.length-1]<t-1&&e.jsx("span",{className:"text-slate-400 px-0.5 text-xs font-bold",children:"..."}),e.jsx("button",{type:"button",onClick:()=>f(t),className:"w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95",children:t})]})]}),e.jsxs("button",{type:"button",onClick:()=>f(p+1),disabled:p===t,title:"Page suivante",className:"flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95",children:[e.jsx("span",{className:"hidden sm:inline",children:"Suivant"}),e.jsx(Ae,{className:"w-4 h-4"})]}),p<t-1&&t>4&&e.jsx("button",{type:"button",onClick:()=>f(t),disabled:p===t,title:"Dernière page",className:"p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95",children:e.jsx(Te,{className:"w-4 h-4"})})]})]})};export{De as I,Be as P};

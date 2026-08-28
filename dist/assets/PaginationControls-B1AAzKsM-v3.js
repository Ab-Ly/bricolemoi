import{j as e,m as F}from"./motion-vendor-D8fNPfAT-v3.js";import{r as u,bl as Ce,bm as Le,bn as we,S as ke,aE as ve,M as Ae,bo as Te,a_ as Se,ax as Ie,bp as Re}from"./icons-vendor-B1E9i1es-v3.js";import{x as Ge,C as Oe,$ as z,M as P,K as le,a as Ne}from"./maplibre-vendor-v_HaOzn3-v3.js";import{u as Fe,a as _e,x as He}from"./index-UMqTCd77-v3.js";typeof window<"u"&&Ne&&(Ne.WORKER_URL="/assets/maplibre-gl-worker.mjs");const Q={OSM_FR:{id:"OSM_FR",name:"Plan Urbain Complet (Rues & Lieux)",tiles:["https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png","https://b.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png","https://c.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"],attribution:"&copy; OpenStreetMap France contributors"},ESRI_STREETS:{id:"ESRI_STREETS",name:"Esri World Streets (Détaillé)",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"],attribution:"&copy; Esri, HERE, Garmin, OpenStreetMap"},SATELLITE:{id:"SATELLITE",name:"Vue Satellite HD (Bâtiments réels)",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],attribution:"&copy; Esri, Maxar, Earthstar Geographics"},VOYAGER:{id:"VOYAGER",name:"Carto Voyager (Épuré)",tiles:["https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png","https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png","https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png","https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"],attribution:"&copy; CARTO &copy; OpenStreetMap"}},Ve=[{id:"GOLD_CYAN",label:"Doré & Cyan (Haute Clarté)",iconColor:"bg-amber-400",desc:"Grands axes dorés et rues nettes"},{id:"NEON_CYBER",label:"Néon Cyberpunk (Sombre)",iconColor:"bg-cyan-400",desc:"Radar de nuit avec routes fluorescentes"},{id:"SILVER_SLATE",label:"Silver Épuré (Minimaliste)",iconColor:"bg-slate-300",desc:"Rendu monochrome moderne"},{id:"NATURAL",label:"Couleurs Naturelles (Standard)",iconColor:"bg-emerald-400",desc:"Rendu topographique officiel"}],$e=x=>{const t=Q[x]||Q.OSM_FR;return{version:8,sources:{"base-tiles":{type:"raster",tiles:t.tiles,tileSize:256,attribution:t.attribution||"&copy; OpenStreetMap"}},layers:[{id:"base-tiles-layer",type:"raster",source:"base-tiles",minzoom:0,maxzoom:19}]}},g={PLUMBING:`
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
  `},ye=x=>{const t=String(x||"").toUpperCase();return t.includes("CLIM")||t.includes("FROID")||t.includes("HVAC")||t.includes("AIR")?g.CLIMATISATION:t.includes("PLOMB")||t.includes("PLUMB")||t.includes("EAU")?g.PLUMBING:t.includes("ELEC")||t.includes("VOLT")||t.includes("COURANT")?g.ELECTRICIAN:t.includes("AUTO")||t.includes("CAR")||t.includes("LAVAGE")||t.includes("MECAN")?g.AUTO_MECHANIC:t.includes("MENUIS")||t.includes("CARPENTER")||t.includes("WOOD")||t.includes("BOIS")?g.MENUISERIE:t.includes("SERRUR")||t.includes("KEY")||t.includes("LOCK")||t.includes("PORTE")?g.SERRURERIE:t.includes("PEINT")||t.includes("PAINT")||t.includes("DECO")?g.PEINTURE:t.includes("MACON")||t.includes("BRICK")||t.includes("BATIMENT")||t.includes("CIMENT")?g.MACONNERIE:t.includes("ELECTRO")||t.includes("MULTIMEDIA")||t.includes("TV")?g.ELECTROMENAGER:t.includes("JARDIN")||t.includes("GARDEN")||t.includes("PLANT")?g.JARDINAGE:t.includes("NETT")||t.includes("MENAGE")||t.includes("CLEAN")?g.NETTOYAGE:t.includes("DERAT")||t.includes("DESINF")||t.includes("PEST")?g.DERATISATION:t.includes("PISCINE")||t.includes("POOL")||t.includes("WAVE")?g.PISCINE:g.PLUMBING},Pe=({mode:x="CLIENT_PICKER",selectedLat:t,selectedLng:f,onLocationSelect:y,filterCategory:Z,activeRouteCoords:d,trackingMaalemPos:S,trackingClientPos:K,etaSummary:Y})=>{var ge;const{user:A}=Fe(),{interventions:G,maalems:_,calculateDistanceInKm:j,showToast:c,isMaalemOnline:X,toggleMaalemOnlineStatus:D}=_e(),H=!!(A&&(String(A.role||"").toUpperCase()==="MAALEM"||String(A.role||"").toUpperCase()==="ADMIN")),O=u.useRef(null),w=u.useRef(null),V=(()=>{try{return JSON.parse(localStorage.getItem("bricolemoi_client_gps")||"null")}catch{return null}})(),oe=t||(V==null?void 0:V.lat)||33.5883,ie=f||(V==null?void 0:V.lng)||-7.6328,[$,Me]=u.useState("OSM_FR"),[de,Ee]=u.useState("GOLD_CYAN"),[i,ce]=u.useState({lat:oe,lng:ie}),[U,je]=u.useState({}),[J,pe]=u.useState(!1),[T,ee]=u.useState(!1),[ue,te]=u.useState(!1),[xe,se]=u.useState(!1),C=u.useRef({}),v=u.useRef({}),L=u.useRef(null),k=u.useRef(null),M=u.useRef(null),fe=u.useRef("");u.useEffect(()=>{if(!O.current)return;L.current=null,k.current=null,M.current&&(M.current.remove(),M.current=null),C.current={},v.current={};const s=new Ge({container:O.current,style:$e($),center:[ie,oe],zoom:14.5,minZoom:10,maxZoom:19,pitch:0,bearing:0,antialias:!0,attributionControl:!1});s.addControl(new Oe({showCompass:!0}),"top-right"),w.current=s,s.on("load",()=>{pe(!0),s.resize()});const n=setTimeout(()=>{s&&s.resize()},200);return s.on("click",o=>{y&&(!d||d.length<2)&&y(o.lngLat.lat,o.lngLat.lng)}),()=>{clearTimeout(n),L.current=null,k.current=null,C.current={},v.current={},pe(!1),s.remove()}},[$]),u.useEffect(()=>{d&&d.length>=2||w.current&&t&&f&&w.current.flyTo({center:[f,t],zoom:14.5,speed:1.2})},[t,f,d]),u.useEffect(()=>{const s={};(_||[]).forEach(n=>{s[n.id]={lat:n.lat,lng:n.lng}}),je(s)},[_]),u.useEffect(()=>{const s=w.current;if(!s||!J)return;const n=!!(d&&d.length>=2);if(n)L.current&&(L.current.remove(),L.current=null);else if(L.current)L.current.setLngLat([i.lng,i.lat]),L.current.getElement().parentNode||L.current.addTo(s);else{const a=document.createElement("div");a.style.width="36px",a.style.height="36px",a.className="relative flex items-center justify-center cursor-pointer",a.innerHTML=`
          <div class="absolute w-10 h-10 rounded-full bg-blue-500/25 animate-ping"></div>
          <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md shadow-blue-500/40"></div>
        `;const p=new z({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="font-black text-slate-900 text-xs">Votre Position GPS</p>
            <p class="text-[10px] text-slate-500 font-mono mt-0.5">${i.lat.toFixed(4)}, ${i.lng.toFixed(4)}</p>
          </div>`);L.current=new P({element:a}).setLngLat([i.lng,i.lat]).setPopup(p).addTo(s)}const o=parseFloat(t||(i==null?void 0:i.lat)||33.5883),l=parseFloat(f||(i==null?void 0:i.lng)||-7.6328);if(x==="CLIENT_PICKER"&&!isNaN(o)&&!isNaN(l))if(k.current)k.current.setLngLat([l,o]),k.current.setDraggable(!n),k.current.getElement().parentNode||k.current.addTo(s);else{const a=document.createElement("div");a.style.width="44px",a.style.height="52px",a.className=`${n?"":"cursor-move"} transform -translate-y-full transition-transform hover:scale-110 z-30`,a.innerHTML=`
          <div class="relative flex flex-col items-center">
            <div class="w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border-2 border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="w-1.5 h-3.5 bg-blue-600 shadow-sm rounded-b-full"></div>
          </div>
        `;const p=new z({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3 rounded-2xl text-center shadow-xl font-sans">
            <p class="text-xs font-black text-slate-900">${n?"Point d'Arrivée (Votre Adresse)":"Point d'Intervention"}</p>
            <p class="text-[10px] text-slate-500 mt-0.5">${n?"Adresse confirmée de l'intervention":"Glissez le marqueur pour affiner"}</p>
          </div>`);k.current=new P({element:a,draggable:!n}).setLngLat([l,o]).setPopup(p).addTo(s),n||k.current.on("dragend",()=>{const r=k.current.getLngLat();y&&y(r.lat,r.lng)})}const h=parseFloat(t||(i==null?void 0:i.lat)||33.5883),N=parseFloat(f||(i==null?void 0:i.lng)||-7.6328),b=(_||[]).filter(a=>{if(a.is_online!==!0||a.is_available===!1)return!1;const p=U[a.id]||{lat:a.lat,lng:a.lng},r=parseFloat(p.lat),m=parseFloat(p.lng);return!(isNaN(r)||isNaN(m)||r<20||r>38||m>=0)});if(Object.keys(C.current).forEach(a=>{b.some(r=>String(r.id).trim()===String(a).trim())||(C.current[a].remove(),delete C.current[a])}),b.forEach(a=>{const p=U[a.id]||{lat:a.lat,lng:a.lng},r=parseFloat(p.lat||33.5883),m=parseFloat(p.lng||-7.6328);if(isNaN(r)||isNaN(m)||r<20||r>38||m>=0)return;const I=A&&String(a.id).trim()===String(A.id).trim(),W=ye(a.specialty),q=j(h,N,r,m),R=Math.max(3,Math.round(q/30*60)),ae=(a.full_name||"Artisan Maâlem").split(" ").map(E=>E.charAt(0).toUpperCase()+E.slice(1).toLowerCase()).join(" ");if(C.current[a.id])C.current[a.id].setLngLat([m,r]),C.current[a.id].getElement().parentNode||C.current[a.id].addTo(s);else{const E=document.createElement("div");E.style.width="44px",E.style.height="44px",E.className="relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125",I?E.innerHTML=`
            <div class="absolute w-12 h-12 rounded-2xl bg-emerald-500/30 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-500 shadow-md flex items-center justify-center text-emerald-600">
              ${W}
            </div>
            <span class="absolute -top-1 -right-1 px-1.5 py-0.2 bg-emerald-600 text-[8px] font-black text-white rounded-full border border-white">VOUS</span>
          `:E.innerHTML=`
            <div class="absolute w-10 h-10 rounded-2xl bg-blue-500/20 animate-pulse"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-blue-600 shadow-md flex items-center justify-center text-blue-600">
              ${W}
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs"></span>
          `;const ne=new z({offset:20,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-3.5 rounded-2xl text-slate-800 font-sans shadow-xl min-w-[240px]">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span class="font-black text-sm text-slate-900 truncate max-w-[140px]">${I?"Votre Position Artisan":ae}</span>
              </div>
              <span class="text-[10px] font-mono text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                ${I?"🟢 En Ligne":"En direct"}
              </span>
            </div>
            <div class="space-y-2 text-xs">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] text-slate-600 font-semibold truncate">${He(a.specialty)}</span>
                <span class="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 font-mono text-[11px] whitespace-nowrap shrink-0">
                  ⭐ ${(a.rating_avg||5).toFixed(1)} / 5.0${a.reviews_count?` (${a.reviews_count})`:""}
                </span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-2 border-t border-slate-100 whitespace-nowrap">
                <span>Distance : <strong class="text-slate-900">${q} km</strong></span>
                <span>Arrivée : <strong class="text-blue-700 font-bold">~${R} min</strong></span>
              </div>
            </div>
          </div>`);C.current[a.id]=new P({element:E}).setLngLat([m,r]).setPopup(ne).addTo(s)}}),S&&Array.isArray(S)&&S.length>=2){const a=parseFloat(S[0]),p=parseFloat(S[1]);if(!isNaN(a)&&!isNaN(p)&&a>20&&a<38)if(M.current)M.current.setLngLat([p,a]),M.current.getElement().parentNode||M.current.addTo(s);else{const r=document.createElement("div");r.style.width="48px",r.style.height="48px",r.className="relative flex items-center justify-center cursor-pointer transition-all duration-700 ease-out z-40",r.innerHTML=`
            <div class="absolute w-12 h-12 rounded-2xl bg-amber-500/30 animate-ping"></div>
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
            <span class="absolute -bottom-1 px-1.5 py-0.2 bg-slate-900 text-[8px] font-black text-white rounded-full border border-white shadow-xs">MAÂLEM</span>
          `;const m=new z({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-amber-300 p-3 rounded-2xl text-center shadow-xl font-sans">
              <p class="text-xs font-black text-slate-900">Artisan Maâlem en Route</p>
              <p class="text-[10px] text-amber-700 font-bold mt-0.5">En déplacement direct vers vous</p>
            </div>`);M.current=new P({element:r}).setLngLat([p,a]).setPopup(m).addTo(s)}}else M.current&&(M.current.remove(),M.current=null);if(!H)Object.keys(v.current).forEach(a=>{v.current[a].remove(),delete v.current[a]});else{const a=G.filter(r=>r.status==="PENDING"),p=new Set(a.map(r=>String(r.id).trim()));Object.keys(v.current).forEach(r=>{p.has(String(r).trim())||(v.current[r].remove(),delete v.current[r])}),a.forEach(r=>{const m=parseFloat(r.lat||33.5883),I=parseFloat(r.lng||-7.6328);if(isNaN(m)||isNaN(I))return;const W=ye(r.service_type),q=j(i.lat,i.lng,m,I);if(v.current[r.id])v.current[r.id].setLngLat([I,m]),v.current[r.id].getElement().parentNode||v.current[r.id].addTo(s);else{const R=document.createElement("div");R.style.width="44px",R.style.height="44px",R.style.willChange="transform",R.className="relative flex items-center justify-center cursor-pointer transform transition-transform hover:scale-125",R.innerHTML=`
            <div class="absolute w-11 h-11 rounded-2xl bg-red-500/20 animate-ping"></div>
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-red-500 shadow-md flex items-center justify-center text-red-600">
              ${W}
            </div>
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-xs"></span>
          `;const ae=String(r.service_type||"").toUpperCase().includes("CLIM")?"Climatisation & Froid":r.service_type==="PLUMBING"?"Plomberie":r.service_type==="ELECTRICIAN"?"Électricité":r.service_type==="AUTO_MECHANIC"?"Mécanique Auto":r.service_type==="PEINTURE"?"Peinture":r.service_type==="MACONNERIE"?"Maçonnerie":r.service_type==="JARDINAGE"?"Jardinage":r.service_type==="SERRURERIE"?"Serrurerie":"Dépannage Urgent",E=r.subcategory?`<div class="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">${r.subcategory}</div>`:"",ne=new z({offset:25,className:"clean-trust-popup"}).setHTML(`<div class="bg-white/95 backdrop-blur-xl border border-red-200 p-3.5 min-w-[240px] space-y-2 font-sans text-slate-800 rounded-2xl shadow-xl">
              <div class="flex items-center justify-between border-b border-red-100 pb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block"></span>
                  <span class="font-black text-xs text-red-600 uppercase tracking-tight">SOS ${ae}</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold font-mono border border-amber-200">15 DH</span>
              </div>
              ${E}
              <div class="space-y-1 pt-1 text-xs">
                <p class="font-bold text-slate-900">Quartier : <span class="text-blue-600 font-extrabold">${r.district||"Casablanca"}</span></p>
                <div class="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-1 whitespace-nowrap">
                  <span>Distance : <strong class="text-slate-900">${q} km</strong></span>
                  <span>Tarif : <strong class="text-blue-700 font-bold">Accord Direct</strong></span>
                </div>
              </div>
            </div>`);v.current[r.id]=new P({element:R}).setLngLat([I,m]).setPopup(ne).addTo(s)}})}},[J,A,i,t,f,U,S,Z,_,G,$]),u.useEffect(()=>{const s=w.current;if(!s||!J)return;const n="route-source",o="route-casing-layer",l="route-line-layer";if(!d||d.length<2){s.getLayer(l)&&s.removeLayer(l),s.getLayer(o)&&s.removeLayer(o),s.getSource(n)&&s.removeSource(n);return}const h={type:"Feature",properties:{},geometry:{type:"LineString",coordinates:d}};s.getSource(n)?s.getSource(n).setData(h):(s.addSource(n,{type:"geojson",data:h}),s.addLayer({id:o,type:"line",source:n,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#1d4ed8","line-width":8,"line-opacity":.4}}),s.addLayer({id:l,type:"line",source:n,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#3b82f6","line-width":5,"line-opacity":.95}}));const N=d[0],b=d[d.length-1],a=`${N[0].toFixed(3)},${N[1].toFixed(3)}_${b[0].toFixed(3)},${b[1].toFixed(3)}`;if(fe.current!==a){fe.current=a;try{const p=new le;d.forEach(r=>{Array.isArray(r)&&r.length>=2&&!isNaN(r[0])&&!isNaN(r[1])&&p.extend(r)}),p.isEmpty()||s.fitBounds(p,{padding:60,maxZoom:16})}catch{}}},[d,J]);const re=()=>{if(typeof window>"u"||!navigator.geolocation){c("Géolocalisation non supportée par votre navigateur.","error");return}ee(!0);const s=(n,o,l)=>{ee(!1),ce({lat:n,lng:o}),w.current&&w.current.flyTo({center:[o,n],zoom:15.5,speed:1.4}),y&&y(n,o),c(`Position GPS détectée ${l}`,"success")};navigator.geolocation.getCurrentPosition(n=>{const{latitude:o,longitude:l,accuracy:h}=n.coords;s(o,l,`(Précision: ±${Math.round(h||10)}m)`)},()=>{navigator.geolocation.getCurrentPosition(n=>{const{latitude:o,longitude:l}=n.coords;s(o,l,"(Réseau / Wi-Fi)")},n=>{ee(!1);const o=t||33.5883,l=f||-7.6328;ce({lat:o,lng:l}),w.current&&w.current.flyTo({center:[l,o],zoom:14,speed:1.2}),n.code===1?c("Accès GPS refusé. Autorisez la localisation dans votre navigateur pour cibler votre adresse.","warning"):c("Signal GPS indisponible sur cet appareil. Position par défaut (Casablanca) activée.","info")},{enableHighAccuracy:!1,timeout:6e3,maximumAge:6e4})},{enableHighAccuracy:!0,timeout:6e3,maximumAge:0})},B=(_||[]).filter(s=>{if(s.is_online!==!0||s.is_available===!1)return!1;const n=U[s.id]||{lat:s.lat,lng:s.lng},o=parseFloat(n.lat),l=parseFloat(n.lng);return!isNaN(o)&&!isNaN(l)&&o>=20&&o<=38&&l<0}),me=B.length,he=()=>{const s=w.current;if(!s||B.length===0){c("Aucun Maâlem en ligne détecté pour le moment.","info");return}if(B.length===1){const l=B[0],h=U[l.id]||{lat:l.lat,lng:l.lng},N=parseFloat(h.lat),b=parseFloat(h.lng);if(!isNaN(N)&&!isNaN(b)&&b<0){s.flyTo({center:[b,N],zoom:15,speed:1.4}),y&&y(N,b),c(`📍 Cadrage sur l'artisan en direct (${l.full_name})`,"success");return}}const n=new le;let o=0;B.forEach(l=>{const h=U[l.id]||{lat:l.lat,lng:l.lng},N=parseFloat(h.lat),b=parseFloat(h.lng);!isNaN(N)&&!isNaN(b)&&b<0&&N>=20&&N<=38&&(n.extend([b,N]),o++)}),o>0&&(s.fitBounds(n,{padding:60,maxZoom:15}),c(`📍 Cadrage sur les ${o} Maâlem(s) en ligne`,"success"))},be=()=>{const s=w.current;if(!s)return;const n=G.filter(l=>l.status==="PENDING"&&l.lat&&l.lng);if(n.length===0){const l=parseFloat(t||(i==null?void 0:i.lat)||33.5883),h=parseFloat(f||(i==null?void 0:i.lng)||-7.6328);s.flyTo({center:[h,l],zoom:14.5,speed:1.2}),c("Aucune demande SOS en attente pour le moment.","info");return}if(n.length===1){s.flyTo({center:[parseFloat(n[0].lng),parseFloat(n[0].lat)],zoom:15,speed:1.4});return}const o=new le;n.forEach(l=>{o.extend([parseFloat(l.lng),parseFloat(l.lat)])}),s.fitBounds(o,{padding:60,maxZoom:15})};return e.jsxs("div",{className:"relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white",children:[e.jsx("div",{ref:O,className:`w-full h-[320px] xs:h-[370px] sm:h-[440px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden map-theme-${de.toLowerCase().replace("_","-")}`}),e.jsxs("div",{className:"absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-1.25rem)]",children:[e.jsxs("button",{type:"button",onClick:re,disabled:T,className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Centrer sur ma position GPS",children:[e.jsx(Ce,{className:`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${T?"animate-spin text-amber-500":"text-blue-600"}`}),e.jsx("span",{className:"hidden xs:inline",children:T?"GPS...":"GPS"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>{se(!xe),te(!1)},className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Personnaliser la couleur des rues et routes",children:[e.jsx(Le,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"hidden sm:inline",children:"Couleur Rues"})]}),xe&&e.jsxs("div",{className:"absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-2 shadow-xl z-30 space-y-1.5 font-sans",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1",children:"Palette des Routes :"}),Ve.map(s=>e.jsxs("button",{type:"button",onClick:()=>{Ee(s.id),se(!1)},className:`w-full text-left p-2 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 cursor-pointer ${de===s.id?"bg-blue-50 text-blue-900 border border-blue-200":"text-slate-700 hover:bg-slate-50"}`,children:[e.jsx("span",{className:`w-3.5 h-3.5 rounded-full ${s.iconColor} shadow-xs mt-0.5 flex-shrink-0`}),e.jsxs("div",{children:[e.jsx("span",{className:"block font-black leading-tight",children:s.label}),e.jsx("span",{className:"text-[10px] font-normal text-slate-500 block",children:s.desc})]})]},s.id))]})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>{te(!ue),se(!1)},className:"p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm hover:border-slate-300 transition-all active:scale-90 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold flex-shrink-0 cursor-pointer",title:"Changer la source de la carte",children:[e.jsx(we,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"hidden xs:inline",children:(ge=Q[$])==null?void 0:ge.name.split(" ")[0]})]}),ue&&e.jsxs("div",{className:"absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-1.5 shadow-xl z-30 space-y-1 font-sans",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 py-1",children:"Source Cartographique :"}),Object.entries(Q).map(([s,n])=>e.jsxs("button",{type:"button",onClick:()=>{Me(s),te(!1)},className:`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${$===s?"bg-blue-50 text-blue-900 border border-blue-200":"text-slate-700 hover:bg-slate-50"}`,children:[e.jsx("span",{className:"truncate pr-2",children:n.name}),$===s&&e.jsx(ke,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"})]},s))]})]})]}),e.jsx("div",{className:"bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2 sm:p-3 px-2.5 sm:px-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs text-slate-700 shadow-sm font-sans",children:H?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2",children:[e.jsxs("div",{className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 rounded-xl shadow-xs text-[10px] sm:text-xs whitespace-nowrap",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-blue-600"})]}),e.jsx("span",{className:"truncate",children:"GPS Pro"})]}),e.jsxs(F.button,{whileTap:{scale:.95},type:"button",onClick:be,className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-red-800 hover:text-red-900 transition-all cursor-pointer bg-red-50 hover:bg-red-100 px-2 rounded-xl border border-red-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap",title:"Cadrer sur toutes les urgences SOS ouvertes dans la zone",children:[e.jsx("span",{className:"w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 inline-block animate-ping flex-shrink-0"}),e.jsxs("span",{className:"truncate",children:["SOS (",G.filter(s=>s.status==="PENDING").length,")"]})]}),e.jsxs(F.button,{whileTap:{scale:.95},type:"button",onClick:he,className:"h-8 sm:h-9 flex items-center justify-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2 rounded-xl border border-emerald-200 shadow-xs text-[10px] sm:text-xs whitespace-nowrap",title:"Cadrer sur les Maâlems disponibles sur la carte",children:[e.jsxs("span",{className:"relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"})]}),e.jsxs("span",{className:"truncate",children:["Maâlems (",me,")"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0",children:[e.jsxs(F.button,{whileTap:{scale:.95},type:"button",onClick:be,className:"h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Cadrer l'ensemble de la zone active",children:[e.jsx(we,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Chantiers"})]}),e.jsxs(F.button,{whileTap:{scale:.95},type:"button",onClick:re,disabled:T,className:"h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Centrer la carte sur votre position GPS exacte",children:[e.jsx(ve,{className:`w-3.5 h-3.5 text-white flex-shrink-0 ${T?"animate-spin":""}`}),e.jsx("span",{className:"truncate",children:T?"...":"Ma Position"})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2",children:[e.jsxs("div",{className:"h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 sm:px-3 rounded-xl shadow-xs text-[11px] sm:text-xs whitespace-nowrap",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-blue-600"})]}),e.jsx("span",{className:"truncate",children:"Votre Position"})]}),e.jsxs(F.button,{whileTap:{scale:.95},type:"button",onClick:he,className:"h-8 sm:h-9 flex items-center justify-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-all cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 sm:px-3 rounded-xl border border-emerald-200 shadow-xs text-[11px] sm:text-xs whitespace-nowrap",title:"Cadrer sur les Maâlems disponibles autour de vous",children:[e.jsxs("span",{className:"relative flex h-2 w-2 flex-shrink-0",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-2 w-2 bg-emerald-600"})]}),e.jsxs("span",{className:"truncate",children:["Artisans (",me,") 🟢"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 flex-shrink-0",children:[x==="CLIENT_PICKER"&&t&&f&&e.jsxs(F.button,{whileTap:{scale:.95},type:"button",onClick:()=>{w.current&&w.current.flyTo({center:[parseFloat(f),parseFloat(t)],zoom:15.5,speed:1.3})},className:"h-8 sm:h-9 bg-slate-50 hover:bg-slate-100 text-slate-800 px-2.5 sm:px-3 rounded-xl border border-slate-200 font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Recadrer sur l'adresse sélectionnée",children:[e.jsx(Ae,{className:"w-3.5 h-3.5 text-blue-600 flex-shrink-0"}),e.jsx("span",{className:"truncate",children:"Point SOS"})]}),e.jsxs(F.button,{whileTap:{scale:.95},type:"button",onClick:re,disabled:T,className:"h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-3 sm:px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer",title:"Centrer la carte sur votre position GPS",children:[e.jsx(ve,{className:`w-3.5 h-3.5 text-white flex-shrink-0 ${T?"animate-spin":""}`}),e.jsx("span",{className:"truncate",children:T?"...":"Ma Position"})]})]})]})})]})},Ze=({currentPage:x=1,totalPages:t=1,totalItems:f=0,startIndex:y=0,endIndex:Z=0,onPageChange:d,pageSize:S,onPageSizeChange:K,pageSizeOptions:Y=[10,20,50],className:A="",itemLabel:G="éléments"})=>{if(f===0||t<=1)return f>0&&t<=1&&Y&&K?e.jsx("div",{className:`flex items-center justify-between py-3 text-xs text-slate-500 font-medium ${A}`,children:e.jsxs("span",{children:["Affichage de ",e.jsx("strong",{children:y})," à ",e.jsx("strong",{children:Z})," sur ",e.jsx("strong",{children:f})," ",G]})}):null;const j=(()=>{const c=[];let D=Math.max(1,x-Math.floor(2.5)),H=Math.min(t,D+5-1);H-D+1<5&&(D=Math.max(1,H-5+1));for(let O=D;O<=H;O++)c.push(O);return c})();return e.jsxs("div",{className:`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 select-none border-t border-slate-100 ${A}`,children:[e.jsxs("div",{className:"text-xs text-slate-500 font-medium flex items-center gap-2",children:[e.jsxs("span",{children:["Affichage de ",e.jsx("strong",{className:"text-slate-800",children:y})," à ",e.jsx("strong",{className:"text-slate-800",children:Z})," sur ",e.jsx("strong",{className:"text-slate-800",children:f})," ",G]}),Y&&K&&e.jsxs("div",{className:"flex items-center gap-1.5 ml-2 pl-3 border-l border-slate-200",children:[e.jsx("span",{className:"text-[11px] text-slate-400",children:"Par page :"}),e.jsx("select",{value:S,onChange:c=>{K(Number(c.target.value)),d&&d(1)},className:"text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer",children:Y.map(c=>e.jsx("option",{value:c,children:c},c))})]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[x>2&&t>4&&e.jsx("button",{type:"button",onClick:()=>d(1),disabled:x===1,title:"Première page",className:"p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95",children:e.jsx(Te,{className:"w-4 h-4"})}),e.jsxs("button",{type:"button",onClick:()=>d(x-1),disabled:x===1,title:"Page précédente",className:"flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95",children:[e.jsx(Se,{className:"w-4 h-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Précédent"})]}),e.jsxs("div",{className:"flex items-center gap-1 px-1",children:[j[0]>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:()=>d(1),className:"w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95",children:"1"}),j[0]>2&&e.jsx("span",{className:"text-slate-400 px-0.5 text-xs font-bold",children:"..."})]}),j.map(c=>{const X=c===x;return e.jsx("button",{type:"button",onClick:()=>d(c),className:`w-8 h-8 rounded-xl text-xs font-bold transition-all active:scale-95 ${X?"bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30":"border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs"}`,children:c},c)}),j[j.length-1]<t&&e.jsxs(e.Fragment,{children:[j[j.length-1]<t-1&&e.jsx("span",{className:"text-slate-400 px-0.5 text-xs font-bold",children:"..."}),e.jsx("button",{type:"button",onClick:()=>d(t),className:"w-8 h-8 rounded-xl text-xs font-bold transition-all border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 active:scale-95",children:t})]})]}),e.jsxs("button",{type:"button",onClick:()=>d(x+1),disabled:x===t,title:"Page suivante",className:"flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs text-xs font-semibold active:scale-95",children:[e.jsx("span",{className:"hidden sm:inline",children:"Suivant"}),e.jsx(Ie,{className:"w-4 h-4"})]}),x<t-1&&t>4&&e.jsx("button",{type:"button",onClick:()=>d(t),disabled:x===t,title:"Dernière page",className:"p-1.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs active:scale-95",children:e.jsx(Re,{className:"w-4 h-4"})})]})]})};export{Pe as I,Ze as P};

# Modern Clean & Trust Engineering Guidelines (BricoleMoi)

Apply these rules strictly to all React + Tailwind CSS code in this PWA (`bricolemoi`):

## 1. Visual Identity & Palette (« Modern Clean & Trust »)
- **Background**: Soft pearl/off-white background (`bg-slate-50` / `#F8FAFC` or `bg-white`).
- **Typography**: High-contrast, clean slate typography (`text-slate-900` for titles, `text-slate-700` for body, `text-slate-500` for subtitles, `font-sans` / `Inter`).
- **Cards & Containers**: Crisp white cards with soft subtle elevation (`bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`).
- **Category & Icon Badges**: Clean pastel badges (`bg-blue-50 text-blue-600 border border-blue-100`, `bg-amber-50 text-amber-600 border border-amber-100`, `bg-emerald-50 text-emerald-600 border border-emerald-100`).

## 2. Action Buttons & Accents
- **Primary Action Buttons (Client / Global)**: Royal Blue & Indigo gradient (`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-blue-500/20 active:scale-95 transition-all`).
- **Secondary / Maâlem Action Buttons**: Warm Safran / Amber gradient (`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl px-6 py-3 shadow-md shadow-amber-500/20 active:scale-95 transition-all`).
- **Neutral Outlined Buttons**: Clean white buttons with subtle borders (`bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs active:scale-95 transition-all`).

## 3. Map & Overlay Panels
- Floating clean glass panels (`bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-800 shadow-xl`).
- CartoDB Positron / OpenStreetMap Clean Light tiles (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png` or Positron).

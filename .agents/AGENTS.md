# Dark Sci-Fi Glassmorphism Engineering Guidelines

Apply these rules strictly to all React + Tailwind CSS code generated in this PWA (`bricolemoi`):

## 1. Visual Identity & Palette
- **Background**: Deep dark futuristic page background (`bg-[#0B0F17]` / `#0B0F17`).
- **Typography**: High-contrast, crisp slate typography (`text-slate-100`, `text-slate-300`, `font-sans` / `Inter`).
- **Glassmorphism Cards**: Dark semi-transparent glass cards (`bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 rounded-2xl shadow-lg shadow-black/50 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300`).
- **Category & Icon Badges**: Dark glass icon badges (`bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]`).

## 2. Action Buttons & Accents
- **Primary Action Buttons**: Glowing neon cyan/blue gradient (`bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl px-6 py-3 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] active:scale-95 transition-all`).
- **Secondary Action Buttons**: Dark glass buttons (`bg-slate-900/80 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800/80 shadow-[0_0_15px_rgba(6,182,212,0.15)] active:scale-95 transition-all`).
- **Neon Glow Icons (`lucide-react`)**: SVG icons with glowing drop-shadow filters (`text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]`, `text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]`, `text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]`).

## 3. Map & Overlay Panels
- Floating semi-transparent glass panels (`bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 text-slate-100 shadow-[0_0_20px_rgba(6,182,212,0.2)]`).
- CartoDB Dark Matter tiles (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`).

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        morocco: {
          red: '#C1272D',
          green: '#006233',
          gold: '#D4AF37',
          dark: '#0F172A',
          emerald: '#059669',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

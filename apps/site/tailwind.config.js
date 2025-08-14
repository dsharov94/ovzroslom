/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: { 
  extend: {
    colors: {
      primary: { DEFAULT: '#B83280', 50:'#fff1f7',100:'#ffd7ea',200:'#ffadd6',300:'#ff7ab9',400:'#f14f9e',500:'#d93784',600:'#B83280',700:'#9a2a6b',800:'#7c2458',900:'#651f49' },
      accent: { DEFAULT: '#06B6D4' }
    },
    fontFamily: {
      sans: ['Inter','ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Arial']
    }
  } 
},

  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        overlay: {
          bg: 'rgba(0, 0, 0, 0.8)',
          accent: '#00ff9d',
        }
      }
    },
  },
  plugins: [],
}
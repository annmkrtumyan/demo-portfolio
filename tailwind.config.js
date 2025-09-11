/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220"
      },
      boxShadow: {
        'glow': '0 0 0 1px rgba(255,255,255,.08), 0 10px 30px rgba(0,0,0,.35)'
      }
    }
  },
  plugins: []
}

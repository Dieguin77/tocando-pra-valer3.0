/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // ADICIONE ESTE BLOCO ABAIXO:
      colors: {
        'brand-blue': '#016AA2',
      },
    },
  },
  plugins: [],
}
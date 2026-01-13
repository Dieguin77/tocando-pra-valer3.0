/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0172AA",
        "primary-hover": "#015d8c",
        "brand-blue": "#0172AA",
      },
    },
  },
  plugins: [],
}

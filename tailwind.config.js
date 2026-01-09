/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B5ED7",
        "primary-hover": "#0a52be",
      },
    },
  },
  plugins: [],
}

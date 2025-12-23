/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Adicionei essa linha caso esteja usando estrutura mista
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// Adicionei o link para a página de busca global no Home.jsx
// Certifique-se de que a rota para GlobalSearch está corretamente configurada no App.jsx
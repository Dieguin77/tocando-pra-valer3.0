import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// 1. Importe o Provider que criamos
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* 2. Envolva o App com o ThemeProvider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Songs from "./pages/Songs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/musicas" element={<Songs />} />
    </Routes>
  );
}

export default App;

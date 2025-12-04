import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Song from "./pages/Song";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/musicas" element={<Songs />} />
     <Route path="/musica/:id" element={<Song />} />
    </Routes>
  );
  } 

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cifras from '../pages/Cifras';
import CifraView from '../pages/CifraView';
import AreaAluno from '../pages/AreaAluno';
import Cursos from '../pages/Cursos';
import Sobre from '../pages/Sobre';
import Contato from '../pages/Contato';
import Contribuinte from '../pages/Contribuinte';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cifras" element={<Cifras />} />
      <Route path="/cifra/:id" element={<CifraView />} />
      <Route path="/area-aluno" element={<AreaAluno />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/contribuinte" element={<Contribuinte />} />
      {/* Rotas antigas redirecionando */}
      <Route path="/aulas" element={<Cifras />} />
      <Route path="/song/:id" element={<CifraView />} />
    </Routes>
  );
}

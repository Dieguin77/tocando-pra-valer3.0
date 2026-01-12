import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 dark:bg-slate-950 py-10 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-blue-400 mb-4">🎸 Tocando Pra Valer</h3>
            <p className="text-slate-400 text-sm">
              Aprenda a tocar violão e guitarra de forma prática e divertida.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cifras" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Cifras
                </Link>
              </li>
              <li>
                <Link to="/area-aluno" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Área do Aluno
                </Link>
              </li>
              <li>
                <Link to="/cursos" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Cursos
                </Link>
              </li>
            </ul>
          </div>

          {/* Links institucionais */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Institucional</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/contribuinte" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Seja um Contribuinte
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Contato</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contato@tocandopravaler.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🌐</span>
                <span>tocandopravaler.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Direitos autorais */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              &copy; {currentYear} Tocando Pra Valer. Todos os direitos reservados.
            </p>
            <p className="text-slate-600 text-xs text-center">
              Cifras e letras são de propriedade de seus respectivos autores e compositores.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

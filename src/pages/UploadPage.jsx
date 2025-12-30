import { useState } from 'react';
import { Link } from 'react-router-dom';
import UploadCifra from '../components/UploadCifra';
import { Music, Search, CheckCircle, Globe, Star, BookOpen, Pencil, Target, AlertTriangle, HelpCircle, Mail, Trophy, ArrowLeft } from 'lucide-react';

export default function UploadPage() {
  const [cifraSent, setCifraSent] = useState(false);

  const handleCifraSubmitted = (cifra) => {
    setCifraSent(true);
    setTimeout(() => setCifraSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header Simples */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft size={18} className="mr-2" />
            Voltar ao início
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Music size={24} className="text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Contribua com o Acervo</h1>
          </div>
          <p className="text-lg text-gray-600">
            Compartilhe suas cifras e ajude músicos de todo o mundo
          </p>
        </div>
      </div>

      {/* Container Principal */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Search, title: 'Revisão de Qualidade', desc: 'Toda cifra é revisada por nossa equipe' },
                { icon: CheckCircle, title: 'Simples e Rápido', desc: 'Preencha e envie em poucos cliques' },
                { icon: Globe, title: 'Compartilhe com Todos', desc: 'Acessível para músicos do mundo todo' },
                { icon: Star, title: 'Reconhecimento', desc: 'Seu nome aparece como colaborador' },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="p-5 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                    <item.icon size={20} className="text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Formulário de Upload */}
            <UploadCifra onCifraSubmitted={handleCifraSubmitted} />

            {/* Guia de Formatação */}
            <section className="p-6 bg-white rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <BookOpen size={22} className="text-blue-500" /> Guia de Formatação
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
                    <Pencil size={16} className="text-gray-400" /> Como Formatar
                  </h3>
                  <pre className="p-4 bg-gray-50 rounded-lg text-sm overflow-x-auto font-mono text-gray-700 border border-gray-100">
{`[Verso 1]
C      F
Aleluia, aleluia
Am     G
Que reina em meu coração

[Refrão]
C           F
Você é santo, você é digno`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
                    <Target size={16} className="text-gray-400" /> Boas Práticas
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Use acordes entre colchetes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Separe acordes do texto
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Inclua seções (Verso, Refrão)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Verifique antes de enviar
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✗</span> Não copie sem permissão
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-amber-500" /> Direitos Autorais
                </h3>
                <p className="text-sm text-gray-500">
                  Ao enviar, você confirma que a cifra é uma interpretação original ou baseada em fontes públicas.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="p-6 bg-white rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <HelpCircle size={22} className="text-blue-500" /> Perguntas Frequentes
              </h2>

              <div className="space-y-4">
                {[
                  { q: 'Quanto tempo leva para ser aprovada?', a: 'Em média, 1 a 2 dias úteis.' },
                  { q: 'Posso editar após enviar?', a: 'Sim! Entre em contato pelo email de suporte.' },
                  { q: 'Minha cifra foi rejeitada. O que faço?', a: 'Você receberá um email com o motivo. Corrija e envie novamente.' },
                  { q: 'Preciso de conta para enviar?', a: 'Não! Mas recomendamos fornecer email para atualizações.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">{item.q}</h4>
                    <p className="text-sm text-gray-500">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Target size={18} className="text-blue-500" /> Dica Importante
              </h3>
              <p className="text-sm text-gray-600">
                Músicas com cifras bem organizadas têm <strong className="text-blue-600">maior chance de aprovação</strong>. 
                Dedique um tempo para formatar!
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Mail size={18} className="text-gray-400" /> Precisa de Ajuda?
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Entre em contato conosco:
              </p>
              <a 
                href="mailto:suporte@tocandopravaler.com" 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Mail size={16} /> Email de Suporte
              </a>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Trophy size={18} className="text-amber-500" /> Seja um Colaborador!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Colaboradores ativos ganham <strong className="text-amber-600">selo especial</strong> no site!
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 rounded-lg font-medium text-white hover:bg-blue-600 transition-colors">
                <Star size={16} /> Saiba Mais
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

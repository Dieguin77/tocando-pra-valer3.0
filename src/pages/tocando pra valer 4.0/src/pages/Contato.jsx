import { useState } from 'react';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-900 animate-fadeIn">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 text-center">
          Entre em <span className="text-blue-500">Contato</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          Tire suas dúvidas ou entre em contato conosco.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
              📩 Envie sua mensagem
            </h2>
            <div className="mb-5">
              <label htmlFor="nome" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="telefone" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                Telefone (WhatsApp)
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="mensagem" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                placeholder="Sua mensagem..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>

          {/* Informações de contato */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                📍 Informações
              </h3>
              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">E-mail</p>
                    <p className="text-slate-800 dark:text-white font-medium">contato@tocandopravaler.com.br</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">WhatsApp</p>
                    <p className="text-slate-800 dark:text-white font-medium">(11) 99999-9999</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Site</p>
                    <p className="text-slate-800 dark:text-white font-medium">tocandopravaler.com.br</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <span className="text-xl">⏰</span>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Horário de atendimento</p>
                    <p className="text-slate-800 dark:text-white font-medium">Seg-Sáb: 8h às 20h</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* CTA WhatsApp */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                💬 Prefere o WhatsApp?
              </h3>
              <p className="text-white/90 mb-4 text-sm">
                Entre em contato diretamente pelo WhatsApp.
              </p>
              <a
                href="https://wa.me/5511999999999?text=Olá! Vim pelo site Tocando Pra Valer."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

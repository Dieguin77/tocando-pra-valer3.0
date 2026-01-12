import { useState } from 'react';

export default function Contribuinte() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'mensal',
      name: 'Apoio Mensal',
      price: 'R$ 9,90',
      period: '/mês',
      features: [
        'Acesso a cifras exclusivas',
        'Sem anúncios',
        'Suporte prioritário',
        'Nome nos créditos',
      ],
      highlight: false,
    },
    {
      id: 'semestral',
      name: 'Apoio Semestral',
      price: 'R$ 49,90',
      period: '/6 meses',
      features: [
        'Todos os benefícios mensais',
        'Economia de 16%',
        'Acesso antecipado a novidades',
        'Badge de contribuinte',
      ],
      highlight: true,
    },
    {
      id: 'anual',
      name: 'Apoio Anual',
      price: 'R$ 89,90',
      period: '/ano',
      features: [
        'Todos os benefícios anteriores',
        'Economia de 25%',
        'Acesso vitalício a conteúdos',
        'Menção especial no site',
      ],
      highlight: false,
    },
  ];

  const benefits = [
    {
      icon: '🎯',
      title: 'Conteúdo de Qualidade',
      description: 'Sua contribuição nos ajuda a criar mais e melhores conteúdos educacionais.',
    },
    {
      icon: '💡',
      title: 'Sem Anúncios',
      description: 'Experiência limpa e focada no que importa: seu aprendizado musical.',
    },
    {
      icon: '🚀',
      title: 'Novos Recursos',
      description: 'Financiamos o desenvolvimento de novas ferramentas e funcionalidades.',
    },
    {
      icon: '❤️',
      title: 'Comunidade',
      description: 'Faça parte de uma comunidade engajada de músicos e entusiastas.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            💜 Seja um <span className="text-purple-500">Contribuinte</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Apoie o Tocando Pra Valer e ajude-nos a continuar oferecendo conteúdo 
            musical de qualidade, gratuito e acessível para todos.
          </p>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg transition-all ${
                plan.highlight
                  ? 'ring-2 ring-purple-500 scale-105'
                  : 'hover:shadow-xl'
              } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.highlight && (
                <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MAIS POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-800 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm"
                  >
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  plan.highlight
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>

        {/* Outras formas de apoio */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            Outras formas de apoiar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">📢</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                Compartilhe
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Divulgue o Tocando Pra Valer para seus amigos músicos.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                Avalie
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Deixe sua avaliação e feedback para nos ajudar a melhorar.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🎵</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                Sugira
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Envie sugestões de músicas e funcionalidades.
              </p>
            </div>
          </div>
        </div>

        {/* Agradecimento */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            💜 Obrigado por fazer parte da nossa comunidade musical!
          </p>
        </div>
      </div>
    </div>
  );
}

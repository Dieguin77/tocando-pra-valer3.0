import React from "react";

export default function AlunoPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Área do Aluno</h1>
      <p className="text-gray-600 mb-6">Bem-vindo à sua área exclusiva! Aqui você pode acessar seu repertório, ferramentas, aulas e muito mais.</p>
      <ul className="space-y-3">
        <li className="border-b border-gray-100 pb-2"><a href="/musicas" className="text-blue-600 hover:underline">Repertório de Músicas</a></li>
        <li className="border-b border-gray-100 pb-2"><a href="/ferramentas" className="text-blue-600 hover:underline">Ferramentas Musicais</a></li>
        <li className="border-b border-gray-100 pb-2"><a href="/upload" className="text-blue-600 hover:underline">Enviar Nova Cifra</a></li>
      </ul>
    </div>
  );
}

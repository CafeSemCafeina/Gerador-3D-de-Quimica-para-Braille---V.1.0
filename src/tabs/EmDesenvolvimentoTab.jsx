// Essa secção serve Como uma página temporária para todos os materiais que ainda estão sendo desenvolvidos:
import React from 'react';

// Cores padrão da paleta do projeto
const PALETA_CORES = [
  '#511576', // Roxo (Padrão)
  '#1e3a8a', // Azul Escuro
  '#065f46', // Verde Escuro
  '#9a3412', // Laranja Escuro
  '#831843', // Rosa Escuro
  '#1f2937', // Grafite
];

export default function EmDesenvolvimentoTab({ theme, corPrincipal, setCorPrincipal, nomeMaterial }) {
  return (
    <div className="space-y-6 fade-in">
      {/* ========================================================================= */}
      {/* SELETOR DE PALETA DE CORES */}
      {/* ========================================================================= */}
      <div 
        className="p-4 rounded-xl shadow-sm transition-colors duration-500 flex flex-wrap items-center justify-between gap-4"
        style={{ backgroundColor: theme.fundoCaixa, border: `1px solid ${theme.bordaGeral}` }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700">Paleta de Cores:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {PALETA_CORES.map((cor) => (
            <button
              key={cor}
              onClick={() => setCorPrincipal(cor)}
              className={`w-7 h-7 rounded-full transition-transform duration-200 ${corPrincipal === cor ? 'scale-125 ring-2 ring-offset-2' : 'hover:scale-110'}`}
              style={{ backgroundColor: cor, ringColor: cor }}
              title={`Trocar cor principal para ${cor}`}
              aria-label={`Selecionar cor ${cor}`}
            />
          ))}

          {/* Seletor de cor personalizada */}
          <label 
            className="flex items-center justify-center w-7 h-7 rounded-full cursor-pointer overflow-hidden border border-slate-300 hover:scale-110 transition-transform" 
            title="Escolher cor personalizada"
          >
            <input 
              type="color" 
              value={corPrincipal} 
              onChange={(e) => setCorPrincipal(e.target.value)}
              className="w-10 h-10 -m-2 cursor-pointer border-none"
            />
          </label>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD DE AVISO DE DESENVOLVIMENTO */}
      {/* ========================================================================= */}
      <div 
        className="p-12 rounded-xl shadow-sm transition-colors duration-500 text-center" 
        style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-slate-100 rounded-full text-slate-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">{nomeMaterial}</h2>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-justify">
          O gerador paramétrico para este material didático está em fase de modelagem e desenvolvimento. Em breve você poderá customizar as opções e baixar os arquivos 3D diretamente por aqui.
        </p>
      </div>
    </div>
  );
}

import ColorTester from "../../components/common/ColorTester";

export default function EmDesenvolvimentoTab({ theme, nomeMaterial }) {
  return (
    <div className="p-12 rounded-xl shadow-sm transition-colors duration-500 text-center fade-in" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
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
  );
}

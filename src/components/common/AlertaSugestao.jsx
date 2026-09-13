import { Info } from 'lucide-react';

const AlertaSugestao = ({ sugestaoDados, aoAplicarSugestao }) => {
  if (!sugestaoDados) return null;
  return (
    <div role="alert" className="mt-3 bg-amber-50/90 border-l-4 border-amber-500 p-3 rounded-r-lg shadow-sm flex items-start space-x-3 text-left transition-all">
      <div className="p-1 bg-amber-500/10 rounded-full text-amber-600 flex-shrink-0 mt-0.5"><Info className="w-5 h-5" /></div>
      <div className="flex-1 text-xs sm:text-sm text-amber-900 leading-relaxed text-justify">
        <span className="font-semibold block text-amber-950 mb-0.5">Sugestão de Estequiometria / IUPAC:</span>
        {sugestaoDados.mensagem}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-amber-800 font-medium">Talvez você quisesse dizer:</span>
          {sugestaoDados.sugestoes.map((sug, idx) => (
            <button key={idx} type="button" onClick={() => aoAplicarSugestao(sug)} className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 font-mono font-bold rounded border border-amber-300 shadow-2xs transition-colors cursor-pointer underline decoration-amber-500/50">{sug}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertaSugestao;

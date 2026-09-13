import { Mail, GraduationCap, User } from 'lucide-react';
import { EQUIPE } from '../data/equipe';
import ColorTester from '../components/common/ColorTester';

const EquipeTab = ({ theme, corPrincipal, setCorPrincipal }) => (
  <div id="painel-equipe" role="tabpanel" aria-label="Nossa Equipe" className="space-y-6 fade-in">
    
    {/* Caixa do cabeçalho com 'relative' para o ícone */}
    <div className="relative p-6 sm:p-8 rounded-xl shadow-sm transition-colors duration-500 mb-6" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
      
      {/* Ícone com posicionamento absoluto padronizado */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
        <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
      </div>

      {/* Margem de segurança para o texto não sobrepor a paleta */}
      <div className="pr-16 sm:pr-[0px]">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-left">Nossa Equipe</h2>
        <p className="text-slate-600 mt-2 text-justify">Conheça os pesquisadores, desenvolvedores e professores que tornam o projeto Química ao Alcance das Mãos possível.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {EQUIPE.map((membro, index) => (
        <div key={index} className="p-6 rounded-xl shadow-sm transition-colors duration-500 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 hover:shadow-md" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white/50 flex-shrink-0 bg-slate-200 flex items-center justify-center overflow-hidden">
            {membro.foto ? <img src={membro.foto} alt={`Foto de ${membro.nome}`} className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-slate-400" aria-hidden="true" />}
          </div>
          
          <div className="flex-1 space-y-2">
            <div>
              
              <h3 className="text-lg font-bold text-slate-800 leading-tight">{membro.nome}</h3>
              <p className="text-sm font-semibold transition-colors text-justify" style={{ color: theme.corPrincipal }}>{membro.titulo}</p>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed text-justify">{membro.descricao}</p>
            <div className="pt-3 mt-3 border-t border-slate-200/50 flex flex-wrap justify-center sm:justify-start gap-4">
              {membro.email && (<a href={`mailto:${membro.email}`} className="flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"><Mail className="w-3.5 h-3.5 mr-1" />E-mail</a>)}
              {membro.lattes && (<a href={membro.lattes} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"><GraduationCap className="w-3.5 h-3.5 mr-1" />Lattes</a>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EquipeTab;

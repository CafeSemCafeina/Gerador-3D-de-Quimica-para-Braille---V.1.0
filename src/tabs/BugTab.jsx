import { Bug, Mail } from 'lucide-react';
import ColorTester from '../components/common/ColorTester';

// E-mails específicos para a equipe de suporte/desenvolvimento
const BUG_EMAILS = "andrevinniciosgaito@gmail.com,quimicaaoalcancedasmaos@gmail.com,davidfiocchi.automacao@gmail.com";
const BUG_EMAILS_DISPLAY = "andrevinniciosgaito@gmail.com; quimicaaoalcancedasmaos@gmail.com; davidfiocchi.automacao@gmail.com";

const BugTab = ({ theme, corPrincipal, setCorPrincipal }) => (
  <div id="painel-bug" role="tabpanel" aria-label="Reporte de Bug" className="relative p-8 sm:p-12 rounded-xl shadow-sm transition-colors duration-500 text-center fade-in" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
    
    {/* Ícone com posicionamento absoluto no canto direito */}
    <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
      <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
    </div>

    {/* Ícone do Bug atualizado para acompanhar a paleta de cores e o tamanho (p-5, w-14 h-14) da aba Parcerias */}
    <div className="flex justify-center mb-6">
      <div className="p-5 rounded-full shadow-inner transition-colors inline-block" style={{ backgroundColor: `${theme.corPrincipal}1A`, color: theme.corPrincipal }} aria-hidden="true">
        <Bug className="w-14 h-14" />
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-slate-800 mb-4">Achou um Bug ou Tem uma Sugestão?</h2>
    
    {/* Texto principal mais largo e justificado */}
    <p className="text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8 text-justify">
      O "Gerador 3D de Química para Braille" é um projeto de código aberto em constante evolução. Caso você encontre algum erro na geração dos caracteres, formatações inconsistentes, problemas na malha 3D ou qualquer outra falha técnica, por favor, nos avise! Suas sugestões de melhorias também são sempre bem-vindas, e essenciais para continuarmos aprimorando as ferramentas e funcionalidades do site.
    </p>
    
    <a href={`mailto:${BUG_EMAILS}?subject=Reporte%20de%20Bug%20/%20Sugestão%20-%20Gerador%20Braille`} className="inline-flex items-center px-6 py-3 text-white font-bold rounded-lg shadow-sm transition-all hover:opacity-90" style={{ backgroundColor: theme.corPrincipal }}>
      <Mail className="w-5 h-5 mr-2" />Reportar para a Equipe
    </a>
    
    {/* Texto de e-mail com text-justify para garantir que o início na esquerda seja IDÊNTICO ao parágrafo acima */}
    <p className="mt-6 text-sm text-slate-500 max-w-4xl mx-auto text-justify">
      Ou envie um e-mail para: <strong>{BUG_EMAILS_DISPLAY}</strong>
    </p>
  </div>
);

export default BugTab;

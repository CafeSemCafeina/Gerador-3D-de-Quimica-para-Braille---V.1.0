import { useState } from 'react';
import { Handshake, Mail, Heart, Check } from 'lucide-react';
import { CONTATOS_EMAILS, CHAVE_PIX } from '../data/equipe';
import ColorTester from '../components/common/ColorTester';

const ParceriasTab = ({ theme, corPrincipal, setCorPrincipal }) => {
  const [pixCopiado, setPixCopiado] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(CHAVE_PIX);
    setPixCopiado(true);
    setTimeout(() => setPixCopiado(false), 3000);
  };

  return (
    <div id="painel-parcerias" role="tabpanel" aria-label="Parcerias" className="relative p-8 sm:p-12 rounded-xl shadow-sm transition-colors duration-500 fade-in text-center" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
      
      {/* Ícone com posicionamento absoluto no canto direito */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
        <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
      </div>

      <div className="flex justify-center mb-6">
        <div className="p-5 rounded-full shadow-inner transition-colors" style={{ backgroundColor: `${theme.corPrincipal}1A`, color: theme.corPrincipal }}>
          <Handshake className="w-14 h-14" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-slate-800 mb-6 tracking-tight">Parcerias e Expansão</h2>
      
      <div className="max-w-3xl mx-auto space-y-6 text-slate-600 leading-relaxed text-left sm:text-center text-justify">
        <p>O projeto <strong>Química ao Alcance das Mãos</strong> visa transformar o ensino e a aprendizagem da química através da aplicação de ferramentas inclusivas e tecnologias inovadoras, como a impressão 3D e o design aberto de materiais didáticos. Nosso maior objetivo é <strong>expandir o alcance dessa tecnologia</strong>. Acreditamos que o conhecimento aberto tem o poder de mudar realidades, e por isso queremos que nossas matrizes de impressão 3D cheguem ao máximo possível de escolas, laboratórios e institutos de educação em todos os estados do país.</p>
        <p className="font-medium text-slate-700 bg-white/50 p-4 border-l-4 rounded-r-lg shadow-sm transition-colors text-justify" style={{ borderColor: theme.corPrincipal }}>Qualquer escola, instituição ou entidade educacional que tenha interesse em aplicar os nossos materiais pedagógicos, testar o gerador ou firmar algum tipo de colaboração e parceria conosco é mais que bem-vinda!</p>
      </div>
      
      <div className="mt-8 mb-12">
        <a href={`mailto:${CONTATOS_EMAILS}?subject=Interesse%20em%20Parceria%20-%20Química%20ao%20Alcance%20das%20Mãos`} className="inline-flex items-center px-8 py-4 text-white text-lg font-bold rounded-lg shadow-md transition-all transform hover:-translate-y-1 hover:opacity-90" style={{ backgroundColor: theme.corPrincipal }}>
          <Mail className="w-6 h-6 mr-3" />Entre em Contato Conosco
        </a>
        <p className="mt-4 text-sm text-slate-500">Ou envie um e-mail para: <strong>{CONTATOS_EMAILS.split(',').join('; ')}</strong></p>
      </div>
      
      <div className="p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-200 shadow-sm mt-8">
        <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Apoie esta Iniciativa</h3>
        <p className="text-slate-600 text-justify max-w-2xl mx-auto leading-relaxed mb-6">O <strong>Química ao Alcance das Mãos</strong> é um projeto independente e 100% voluntário. Nós garantimos que nossa plataforma e todos os seus recursos permanecerão <strong>sempre gratuitos e de código aberto</strong> para educadores, escolas e alunos de todo o Brasil. No entanto, temos custos contínuos para manter o site no ar de forma estável e continuar trazendo melhorias ao projeto. Se este gerador foi útil para você ou sua instituição, considere fazer uma doação voluntária de qualquer valor! Sua contribuição é fundamental para nos ajudar a manter a ferramenta no ar, além de permitir atualizações e a criação de novas funcionalidades assistivas.</p>
        <div className="flex flex-col items-center justify-center">
          <button onClick={handleCopyPix} className="inline-flex items-center px-6 py-3 font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors shadow-md transform hover:-translate-y-0.5">
            {pixCopiado ? <Check className="w-5 h-5 mr-2" /> : <Heart className="w-5 h-5 mr-2 fill-current" />}{pixCopiado ? 'Chave PIX Copiada!' : 'Fazer um PIX'}
          </button>
          <p className="text-xs text-slate-500 mt-3 font-mono bg-white px-3 py-1 border border-slate-200 rounded">Chave PIX (E-mail): <strong>{CHAVE_PIX}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default ParceriasTab;

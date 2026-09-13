import ColorTester from '../components/common/ColorTester';

const SobreProjetoTab = ({ theme, corPrincipal, setCorPrincipal }) => (
  <div id="painel-sobre" role="tabpanel" aria-label="Sobre o Projeto" className="relative p-8 sm:p-12 rounded-xl shadow-sm transition-colors duration-500 text-slate-700 fade-in space-y-8 text-left" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
    
    {/* Cabeçalho - O ícone da paleta agora vive AQUI DENTRO para não quebrar a margem superior */}
    <div className="border-b border-slate-200 pb-6">
      
      {/* Ícone com posicionamento absoluto padronizado */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
        <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
      </div>

      {/* Margem de segurança reduzida para 140px: impede a sobreposição do ícone sem quebrar a frase em duas linhas */}
      <div className="pr-16 sm:pr-[140px]">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Química ao Alcance das Mãos</h2>
        <p className="text-lg font-medium mt-2 transition-colors text-justify" style={{ color: theme.corPrincipal }}>Democratizando o ensino de ciências através da tecnologia e da manufatura aditiva.</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800">O Desafio da Inclusão</h3>
      <p className="leading-relaxed text-justify">O ensino de química é historicamente pautado em elementos visuais: fórmulas espaciais, reações, cores e gráficos. Para alunos com deficiência visual ou baixa visão, isso cria uma barreira imensa no aprendizado. Embora o <strong>Instituto Benjamin Constant (IBC)</strong> e o Ministerio da Educação (MEC) tenham estabelecido a norma da <a href="https://www.gov.br/ibc/pt-br/pesquisa-e-tecnologia/materiais-especializados-1/livros-em-braille-1/o-sistema-braille-arquivos/grafia-quimica-braille-para-uso-no-brasil-pdf.pdf/@@display-file/file" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline transition-colors" style={{ color: theme.corPrincipal }}>Grafia Química Braille para Uso no Brasil (3ª edição, 2017)</a>, a produção e o acesso a esses materiais físicos ainda são escassos, caros e lentos nas escolas regulares.</p>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800">A Solução: Código Aberto e Impressão 3D</h3>
      <p className="leading-relaxed text-justify">O Gerador 3D de Química para Braille nasceu para ser uma ponte entre a tecnologia de prototipagem rápida e a educação inclusiva. Através desta plataforma <strong>Open Source</strong>, qualquer professor, escola ou laboratório maker pode digitar uma fórmula e gerar uma matriz tátil digital (STL) em segundos. O que antes demorava semanas para ser encomendado, agora pode ser fabricado na própria escola via impressão 3D, sob demanda e com baixo custo.</p>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800">Inovação em Equipamentos de Laboratório</h3>
      <p className="leading-relaxed text-justify">Acreditamos que a tecnologia assistiva deve ser ágil e escalável. Este gerador é o primeiro passo de uma visão de startup mais ampla focada na criação de equipamentos de laboratório adaptados e materiais didáticos inovadores. Nosso objetivo é consolidar um ecossistema onde o design de hardware torne os laboratórios de ciências espaços 100% acessíveis.</p>
    </div>
  </div>
);

export default SobreProjetoTab;

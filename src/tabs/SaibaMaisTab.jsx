import React from 'react';
import ColorTester from '../components/common/ColorTester';

const SaibaMaisTab = ({ theme, corPrincipal, setCorPrincipal }) => (
  <div 
    id="painel-saiba-mais" 
    role="tabpanel" 
    aria-label="Saiba Mais" 
    className="relative p-8 sm:p-12 rounded-xl shadow-sm transition-colors duration-500 text-slate-700 fade-in space-y-8 text-left"
    style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}
  >
    
    {/* Cabeçalho da Aba - A paleta fica aqui dentro para não pular a margem */}
    <div className="border-b border-slate-200 pb-6">
      
      {/* Ícone com posicionamento absoluto padronizado */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
        <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
      </div>

      {/* Recuo de segurança de 140px para não bater no ícone, mantendo a frase em 1 linha */}
      <div className="pr-16 sm:pr-[1px]">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Novidades e Próximos Passos</h2>
        <p className="text-lg font-medium mt-2 transition-colors text-justify" style={{ color: theme.corPrincipal }}>
          Acompanhe o desenvolvimento contínuo, nossas pesquisas e redes de colaboração institucional.
        </p>
      </div>
    </div>

    {/* Seção 1: Expansão */}
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800">Expansão e Articulação Institucional</h3>
      <p className="leading-relaxed text-justify">
        O <strong>Química ao Alcance das Mãos</strong> é uma iniciativa em contínua expansão e aprimoramento científico. Atualmente, nosso foco está na consolidação de redes de colaboração e no rigoroso processo de validação técnica e educacional das nossas tecnologias assistivas, em articulação com instituições de excelência no ensino e na pesquisa, como o <strong>Instituto Benjamin Constant (IBC)</strong>, a <strong>Universidade Federal do Rio de Janeiro (UFRJ)</strong>, o <strong>Instituto Federal do Rio de Janeiro (IFRJ)</strong> e o <strong>Colégio Pedro II</strong>.
      </p>
      <p className="leading-relaxed text-justify">
        Estamos preparando novos recursos, dinâmicas interativas e formações didáticas que serão disponibilizadas em breve aqui na plataforma. Para acompanhar em tempo real nossas próximas atualizações, aprovações, agendas de aplicação nas escolas e parcerias firmadas, siga nossos canais oficiais de comunicação no Instagram:
      </p>
      <ul className="list-none space-y-2 pt-2 text-slate-700 font-medium pl-2">
        <li className="flex items-center gap-2">
          📱 <strong>Projeto Oficial:</strong> 
          <a href="https://www.instagram.com/quimicaaoalcancedasmaos/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: theme.corPrincipal }}>
            @quimicaaoalcancedasmaos
          </a>
        </li>
        <li className="flex items-center gap-2">
          🤝 <strong>Projeto Parceiro:</strong> 
          <a href="https://www.instagram.com/projetoatomizando/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: theme.corPrincipal }}>
            @projetoatomizando
          </a>
        </li>
      </ul>
    </div>

    {/* Divisória */}
    <div className="border-t border-slate-200/60 pt-6 space-y-4">
      {/* Seção 2: Força-Tarefa */}
      <h3 className="text-xl font-bold text-slate-800">Uma Força-Tarefa pela Divulgação Científica e Inclusão</h3>
      <p className="leading-relaxed text-justify">
        Com grande satisfação, atuamos em estreita parceria com o <a href="https://www.instagram.com/projetoatomizando/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: theme.corPrincipal }}>Projeto Atomizando (@projetoatomizando)</a>, uma brilhante iniciativa de extensão e divulgação científica da Universidade Federal do Rio de Janeiro (UFRJ). O Atomizando se destaca por aproximar a química do dia a dia e das escolas através de dinâmicas lúdicas, metodologias ativas e experimentação, tornando a aprendizagem muito mais interativa e estimulante.
      </p>
      <p className="leading-relaxed text-justify">
        Esta aliança estratégica representa uma verdadeira "força-tarefa" que soma conhecimentos teóricos, práticos e metodológicos para enriquecer e consolidar ambos os projetos. O traço de união dessa parceria é a <strong>Profa. Dra. Fernanda das Neves Costa</strong> (IPPN/UFRJ), coordenadora do Atomizando e peça fundamental na equipe do <em>Química ao Alcance das Mãos</em>. Sua liderança é indispensável na condução da articulação institucional do nosso projeto, especialmente nos trâmites acadêmicos e nas submissões ao Comitê de Ética em Pesquisa (CEP) em colaboração com o Instituto Benjamin Constant (IBC).
      </p>
    </div>
  </div>
);

export default SaibaMaisTab;

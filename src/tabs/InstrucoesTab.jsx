import { Settings, ArrowRight, Box, Copy, Languages, Sliders, Download } from 'lucide-react';
import { imgSelecaoImpressora, imgMenuInicial, imgPreVisualizacao, imgMultiCor } from '../data/assets';
import ColorTester from '../components/common/ColorTester';

const InstrucoesTab = ({ theme, corPrincipal, setCorPrincipal }) => (
  <div id="painel-instrucoes" role="tabpanel" aria-label="Instruções de Uso" className="relative p-6 sm:p-10 rounded-xl shadow-sm transition-colors duration-500 text-left fade-in space-y-10" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
    
    {/* Cabeçalho - A paleta agora vive DENTRO desta div para evitar o salto de margem do space-y-10 */}
    <div className="border-b border-slate-200 pb-4 pr-16 sm:pr-[10px]">
      
      {/* Ícone com posicionamento absoluto padronizado */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
        <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Manual de Instruções</h2>
      <p className="text-sm sm:text-base text-slate-500 mt-1 text-justify">Veja como extrair o máximo potencial do gerador digital e realizar a impressão 3D das suas matrizes em Braille.</p>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2"><Settings className="w-5 h-5 text-slate-500" />1. Como Usar os Recursos do Site</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-slate-600 leading-relaxed">
        <div className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 space-y-1 shadow-sm"><h4 className="font-bold text-slate-800 flex items-center gap-1.5"><Box className="w-4 h-4 text-slate-500" /> Gerador Braille 3D</h4><p className="text-justify">Digite qualquer fórmula química, palavra ou texto longo no campo principal. O sistema aplicará as normas de grafia instantaneamente e montará o modelo 3D em tempo real. Clicando em <strong>"Visualizar STL"</strong> você avalia o resultado e, em seguida, basta clicar em <strong>Baixar Arquivo STL</strong> para levar à impressora.</p></div>
        <div className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 space-y-1 shadow-sm"><h4 className="font-bold text-slate-800 flex items-center gap-1.5"><ArrowRight className="w-4 h-4 text-slate-500" /> Leitura Tátil 2D</h4><p className="text-justify">Abaixo do modelo 3D, você verá um mapa bidimensional das celas geradas, em que as <strong>bolinhas pretas</strong> indicam os pontos em relevo. É uma forma simples e visual de validar o que foi escrito e ajudar alunos ou educadores a se familiarizarem com a grafia Braille num primeiro momento.</p></div>
        <div className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 space-y-1 shadow-sm"><h4 className="font-bold text-slate-800 flex items-center gap-1.5"><Copy className="w-4 h-4 text-slate-500" /> Texto Braille (Unicode)</h4><p className="text-justify">Essa caixa gera o seu texto utilizando a fonte Unicode oficial do Braille digital. O botão <strong>"Copiar Texto Braille"</strong> permite que você copie os símbolos e cole-os diretamente em e-mails, redes sociais, documentos do Word ou painéis de comunicação.</p></div>
        <div className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 space-y-1 shadow-sm"><h4 className="font-bold text-slate-800 flex items-center gap-1.5"><Languages className="w-4 h-4 text-slate-500" /> Tradutor Reverso e Áudio</h4><p className="text-justify">Achou uma frase em Braille na internet e quer saber o que está escrito? Basta colar os caracteres em braille na caixa <strong>"Digite o texto Braille"</strong>. O site fará a leitura reversa traduzindo para o português no mesmo instante. Também é possível clicar em <strong>"Ouvir"</strong> para o sistema ditar o texto em voz alta para você.</p></div>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2"><Sliders className="w-5 h-5 text-slate-500" />2. Customização Ergonômica da Matriz</h3>
      <div className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 text-sm sm:text-base text-slate-600 leading-relaxed space-y-2 shadow-sm">
        <p className="text-justify">Ao abrir o painel de <strong>"Opções Avançadas de Impressão 3D"</strong> logo abaixo do campo de texto, você desbloqueia o controle de toda a geometria matemática da peça gerada: altura e diâmetro dos pontos, espessura da base, arredondamento das bordas, etc.</p>
        <p className="font-medium text-slate-700 text-justify">Por que isso é útil?</p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-justify">
          <li><strong>Acessibilidade sob medida:</strong> Alguns alunos com perda de sensibilidade tátil podem preferir que os pontos Braille sejam ligeiramente mais altos ou mais espaçados para facilitar a distinção.</li>
          <li><strong>Calibração do Bico da Impressora:</strong> Se estiver usando impressoras com bicos maiores (0.6mm ou 0.8mm) para imprimir mais rápido, você pode aumentar o <em>Diâmetro do Ponto</em> para evitar que fiquem finos ou falhados demais.</li>
        </ul>
      </div>
    </div>

    <div className="space-y-6">
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2"><Box className="w-5 h-5 text-slate-500" />3. Guia de Impressão 3D (Fatiamento no OrcaSlicer)</h3>
      <div className="p-5 rounded-lg border-l-4 space-y-6 shadow-sm" style={{ borderColor: theme.corPrincipal, backgroundColor: 'rgba(255,255,255,0.4)' }}>
        <div className="space-y-2">
          <h4 className="font-extrabold text-red-700 text-base uppercase tracking-wider flex items-center gap-1.5">⚠️ REGRA DE OURO: IMPRESSÃO SEMPRE NA VERTICAL (EM PÉ)</h4>
          <p className="text-slate-700 text-sm sm:text-base text-justify">Ao exportar o arquivo 3D <strong>".stl"</strong> e jogá-lo no software para impressão (fatiador), certifique-se de que a placa de texto está posicionada <strong>na vertical ("em pé") sobre a mesa</strong>, orientada ao longo do eixo Z.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 flex items-center justify-center p-2"><img src={imgSelecaoImpressora} alt="Seleção de Impressora no OrcaSlicer" className="w-full h-auto object-contain rounded" /></div>
              <div className="p-4 text-sm text-slate-600 text-justify"><strong className="block text-slate-800 mb-1 text-base">Passo 1: Impressora</strong>Abra o OrcaSlicer e selecione sua impressora na lista de dispositivos. O programa tem perfis prontos para máquinas modernas, como a <em>Creality Ender-3 V3 KE</em> ou a <em>Bambu Lab A1</em>.</div>
            </div>
            <div className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 flex items-center justify-center p-2"><img src={imgMenuInicial} alt="Menu inicial com peça posicionada em pé" className="w-full h-auto object-contain rounded" /></div>
              <div className="p-4 text-sm text-slate-600 text-justify"><strong className="block text-slate-800 mb-1 text-base">Passo 2: Filamento e Posição</strong>Arraste o seu `.stl` para dentro da plataforma. Perceba que a peça já é gerada em pé. Utilize <strong>PLA</strong> ou <strong>PETG</strong>. Evite usar filamento ABS em impressoras de câmara aberta, pois a peça longa certamente sofrerá "Warping" (encolhimento do plástico, fazendo a base descolar da mesa).</div>
            </div>
            <div className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 flex items-center justify-center p-2"><img src={imgPreVisualizacao} alt="Pré visualização da peça 3D fatiada" className="w-full h-auto object-contain rounded" /></div>
              <div className="p-4 text-sm text-slate-600 text-justify"><strong className="block text-slate-800 mb-1 text-base">Passo 3: Fatiamento da Peça 3D</strong>No canto superior direito, clique em "Pré-Visualizar" (ou aperte "Ctrl + R") para gerar as camadas de impressão. Confira se os pontos subiram de forma perfeitamente lisa na visualização e, em seguida, clique em <strong>Exportar Arquivo G-code</strong> para imprimir.</div>
            </div>
            <div className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 flex items-center justify-center p-2"><img src={imgMultiCor} alt="Impressão Braille colorida multimaterial" className="w-full h-auto object-contain rounded" /></div>
              <div className="p-4 text-sm text-slate-600 text-justify"><strong className="block text-slate-800 mb-1 text-base">Dica Extra: Impressão Multimaterial (Colorida)</strong>Caso possua uma máquina multicolorida (Bambu Lab A1/P1S combo, Creality K1C, Anycubic Kobra 3). Você pode pintar os pontos Braille de outra cor usando a ferramenta do próprio fatiador. Isso gera um excelente contraste e ajuda incrivelmente alunos com baixa visão ou professores com visão regular a identificar os caracteres braille!</div>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-xs sm:text-sm bg-white/60 p-4 rounded border border-slate-200/60 mt-4 shadow-sm text-justify">
          <p><strong>Por que NÃO imprimir a peça deitada de barriga na mesa?</strong></p>
          <p>Se a placa for impressa deitada horizontalmente, a ponta esférica de cada pontinho do Braille será fatiada em "degraus" por causa do empilhamento do eixo Z da impressora (conhecido como efeito escada ou <em>staircasing</em>). Esses micrômetros de plástico serrilhado deixam a superfície do Braille extremamente áspera e desconfortável, podendo até arranhar e machucar as pontas dos dedos da pessoa cega após minutos de leitura contínua.</p>
          <hr className="my-2 border-slate-200" />
          <p><strong>A vantagem absoluta de imprimir EM PÉ:</strong></p>
          <p>Na vertical, os motores dos eixos X e Y desenham perfeitamente o arco contínuo e orgânico das bolinhas laterais. A extrusora faz movimentos arredondados contínuos e sobe de forma muito mais suave. O resultado final são semiesferas perfeitamente lisas, sedosas ao toque, e que garantem 100% de conforto e segurança na leitura tátil.</p>
        </div>
        <div className="pt-4 text-sm sm:text-base text-slate-700">
          <h4 className="font-bold mb-1">Ainda não possui um software fatiador?</h4>
          <p className="text-justify mb-4">Caso seja o seu primeiro contato com impressão 3D ou se você está estruturando um laboratório maker na sua escola, recomendamos o download do <strong>OrcaSlicer</strong>. Pois é uma das ferramentas de fatiamento de código aberto mais robusta e amigável no momento, já contendo perfis prontos e perfeitamente calibrados para praticamente todas as marcas do mercado.</p>
          <a href="https://www.orcaslicer.com/download/" rel="noopener noreferrer" className="inline-flex mt-1 items-center px-5 py-3 font-bold text-white rounded-lg shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: theme.corPrincipal }}>
            <Download className="w-5 h-5 mr-2" /> Baixar OrcaSlicer
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default InstrucoesTab;

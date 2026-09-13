import { Download, Box, Sliders, ChevronDown, ChevronUp, Info, Layers, Palette, Eye, EyeOff } from 'lucide-react';
import ColorTester from '../components/common/ColorTester';
import ConfigSlider from '../components/common/ConfigSlider';
import StlViewer3D from '../components/common/StlViewer3D';
import { baixarModeloSTL } from '../utils/downloadStl';

const BlocosIonicosTab = ({ theme, corPrincipal, setCorPrincipal, autoRotate, setAutoRotate, ionico }) => {
  const {
    ionConfig, setIonConfig, selecionarTipoValencia,
    ionStlUrl, isGeneratingIon, handleGenerateIon,
    dimensoesIonico, setDimensoesIonico,
    mostrarDimensoesIonico, setMostrarDimensoesIonico,
    showDimensoesFisicasIonico, setShowDimensoesFisicasIonico
  } = ionico;

  const handleDownload = () => {
    if (!ionStlUrl) return;
    const nomeStr = ionConfig.formula.replace(/[^a-zA-Z0-9]/g, '_');
    baixarModeloSTL(ionStlUrl, `BlocoIonico_${nomeStr}.stl`);
  };

  return (
    <div id="painel-ionicos" role="tabpanel" aria-label="Blocos Iônicos" className="space-y-6 fade-in">

      {/* Caixa do Cabeçalho - Agora com 'relative' para ancorar a paleta */}
      <div className="relative p-6 rounded-xl shadow-sm transition-colors duration-500" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
        
        {/* Ícone com posicionamento absoluto padronizado */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
          <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
        </div>

        {/* Título e Texto com margem de segurança pr-[260px] e tamanhos aumentados (3xl / base) */}
        <div className="pr-16 sm:pr-[140px]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Gerador Didático: Blocos Iônicos com Encaixes</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 text-justify leading-relaxed">
            Crie seus proprios <strong>Bloquinhos Iônicos</strong> para ensinar diversos conceitos de química, como: Tipos de Ligações Químicas, Estequiometria/Balanceamento, Número de Oxidação (NOX) e Valência. Em que os <strong>Cátions</strong> possuem <strong>encaixes positivos (+)</strong> na extremidade direita, enquanto os <strong>Ânions possuem encaixes negativos (-)</strong> na sua extremidade esquerda que se conectam perfeitamente nos Cátions. A altura do bloco multiplica dependendo da valência (ex: bloco +2 tem o dobro da altura base).
          </p>
        </div>

        {/* Caixa de Atenção com espaçamento e texto ajustados para harmonizar com o novo cabeçalho */}
        <div className="mt-6 p-4 bg-blue-50/80 border border-blue-200 rounded-lg text-xs sm:text-sm text-blue-900 flex items-center gap-3 shadow-sm">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <span className="leading-relaxed"><strong>Atenção a Formatação:</strong> Para que a fórmula química saia correta no bloco, digite ou cole utilizando números sobrescritos (⁺, ⁻, ¹, ², ³, ⁴, ⁵, ⁶) e subscritos (₁, ₂, ₃, ₄, ₅, ₆).. Exemplo: <strong>SO₄²⁻</strong> ou <strong>H⁺</strong>. O texto será centralizado e dimensionado de forma automática!</span>
        </div>
      </div>

      <div className="p-6 rounded-xl shadow-sm transition-colors duration-500" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
        <form onSubmit={handleGenerateIon} className="space-y-6">

          {/* 1. Seleção de Tipo (Cátion ou Ânion) e Valência */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">1. Escolha o Tipo de Íon e a Valência (Carga)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((val) => (
                <button
                  key={`cat-${val}`} type="button"
                  onClick={() => selecionarTipoValencia('cation', val)}
                  className={`p-3 rounded-lg border-2 font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${ionConfig.tipo === 'cation' && ionConfig.valencia === val ? 'bg-blue-600 text-white border-blue-700 shadow-md transform scale-105' : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'}`}
                >
                  <span className="text-lg">Cátion +{val}</span>
                  <span className="text-[10px] font-normal opacity-80 uppercase tracking-wider mt-1">Encaixe Positivo</span>
                </button>
              ))}
              {[1, 2, 3, 4].map((val) => (
                <button
                  key={`an-${val}`} type="button"
                  onClick={() => selecionarTipoValencia('anion', val)}
                  className={`p-3 rounded-lg border-2 font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${ionConfig.tipo === 'anion' && ionConfig.valencia === val ? 'bg-red-600 text-white border-red-700 shadow-md transform scale-105' : 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100'}`}
                >
                  <span className="text-lg">Ânion -{val}</span>
                  <span className="text-[10px] font-normal opacity-80 uppercase tracking-wider mt-1">Encaixe Negativo</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Fórmula e Estilo de Texto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">2. Fórmula Química do Íon</label>
              <input
                type="text" value={ionConfig.formula}
                onChange={(e) => setIonConfig({ ...ionConfig, formula: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none text-xl font-mono"
                style={{ backgroundColor: theme.fundoSubCaixa, color: theme.textoSubCaixa }}
                placeholder="Ex: H⁺ ou Ca²⁺"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Fonte do Texto no Bloco</label>
              <select
                value={ionConfig.fonte} onChange={(e) => setIonConfig({ ...ionConfig, fonte: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 outline-none font-medium text-sm bg-white cursor-pointer"
                style={{ backgroundColor: theme.fundoSubCaixa, color: theme.textoSubCaixa }}
              >
                <option value="sans">Modern Sans-Serif (Padrão 3D)</option>
                <option value="serif">Academic Serif Clássica</option>
                <option value="mono">Technical Monospace</option>
                <option value="arial">Arial Black</option>
                <option value="himalaya">Microsoft Himalaya</option>
                <option value="helvetica">Helvetica</option>
                <option value="times">Times New Roman</option>
                <option value="courier">Courier New</option>
                <option value="verdana">Verdana</option>
                <option value="georgia">Georgia</option>
                <option value="tahoma">Tahoma</option>
                <option value="comic">Comic Sans MS</option>
                <option value="impact">Impact</option>
              </select>
            </div>
          </div>

          {/* 3. Dimensões do Bloco e Encaixes (MINIMIZÁVEL) */}
          <div className="pt-4 border-t border-slate-200">
            <button type="button" onClick={() => setShowDimensoesFisicasIonico(!showDimensoesFisicasIonico)} className="flex items-center text-sm font-semibold hover:opacity-80 transition-opacity uppercase tracking-wide mb-3" style={{ color: theme.corPrincipal }}>
              <Sliders className="w-4 h-4 mr-2" /> 3. Dimensões Físicas {showDimensoesFisicasIonico ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>

            {showDimensoesFisicasIonico && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm animate-fadeIn">
                <ConfigSlider label="Largura da Base (X)" value={ionConfig.largura} min="30.0" max="100.0" step="0.5" unit="mm" onChange={(e) => setIonConfig({ ...ionConfig, largura: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label={`Altura da Base (Y)`} value={ionConfig.altura} min="15.0" max="50.0" step="0.5" unit="mm" onChange={(e) => setIonConfig({ ...ionConfig, altura: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Espessura da base (Z)" value={ionConfig.espessura} min="2.0" max="15.0" step="0.5" unit="mm" onChange={(e) => setIonConfig({ ...ionConfig, espessura: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Largura do Encaixe" value={ionConfig.larguraEncaixe} min="4.0" max="20.0" step="0.5" unit="mm" onChange={(e) => setIonConfig({ ...ionConfig, larguraEncaixe: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Altura do Encaixe" value={ionConfig.alturaEncaixe} min="4.0" max="25.0" step="0.5" unit="mm" onChange={(e) => setIonConfig({ ...ionConfig, alturaEncaixe: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
              </div>
            )}
            <p className="text-xs text-slate-500 mt-2 text-right">Altura Total (Base x Valência) = {(ionConfig.altura * ionConfig.valencia).toFixed(1)}mm</p>
          </div>

          {/* 4. Espessura do Texto e Adição de Braille */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
              <ConfigSlider
                label="Espessura do Texto / Relevo"
                value={ionConfig.espessuraTexto} min="-2.0" max="2.0" step="0.5" unit="mm"
                onChange={(e) => setIonConfig({ ...ionConfig, espessuraTexto: parseFloat(e.target.value) })}
                cor={ionConfig.espessuraTexto < 0 ? '#dc2626' : theme.corPrincipal}
              />
              <span className="text-xs text-slate-500 block mt-1.5">
                {ionConfig.espessuraTexto < 0 ? 'Valores negativos: O texto será gerado como uma marcação negativa "para dentro da peça".' : 'Valores Positivos: O texto será gerado como um "Relevo" para fora da peça.'}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 h-full shadow-sm">
              <div>
                <span className="font-bold text-slate-800 block">Adicionar Escrita Braille ao Bloco?</span>
                <span className="text-xs text-slate-500">Gera a tradução tátil no bloco (centralizado automaticamente).</span>
              </div>
              <input
                type="checkbox" checked={ionConfig.incluirBraille}
                onChange={(e) => setIonConfig({ ...ionConfig, incluirBraille: e.target.checked })}
                className="w-6 h-6 rounded cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Botão Gerar Malha */}
          <div className="pt-2">
            <button
              type="submit" disabled={isGeneratingIon}
              className={`w-full py-4 text-white font-bold text-lg rounded-lg shadow-md transition-all flex items-center justify-center space-x-2 ${isGeneratingIon ? 'bg-slate-400 cursor-not-allowed' : 'hover:opacity-95'}`}
              style={!isGeneratingIon ? { backgroundColor: theme.corPrincipal } : {}}
            >
              <Layers className={`w-6 h-6 ${isGeneratingIon ? 'animate-spin' : ''}`} />
              <span>{isGeneratingIon ? 'Modelando Blocos e Vetores...' : `Visualizar STL (Íon ${ionConfig.tipo === 'cation' ? '+' : '-'}${ionConfig.valencia})`}</span>
            </button>
          </div>

        </form>
      </div>

      {/* VISUALIZADOR 3D DO BLOCO IÔNICO */}
      {ionStlUrl && (
        <div className="p-6 rounded-xl shadow-sm transition-colors duration-500 flex flex-col fade-in" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-800 flex items-center"><Box className="w-5 h-5 mr-2 text-slate-500" />Pré-visualização 3D</h2>

              <button onClick={() => setMostrarDimensoesIonico(!mostrarDimensoesIonico)} className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-semibold border border-slate-200 transition-colors">
                {mostrarDimensoesIonico ? <><EyeOff className="w-3.5 h-3.5" /> Ocultar Dimensões</> : <><Eye className="w-3.5 h-3.5" /> Mostrar Dimensões</>}
              </button>

              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                <Palette className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-semibold text-slate-700 hidden sm:inline">Cor (RGB):</span>
                <input type="color" value={ionConfig.corModelo} onChange={(e) => setIonConfig({ ...ionConfig, corModelo: e.target.value, corCustomizada: true })} className="w-6 h-6 rounded border-0 cursor-pointer p-0" title="Mudar cor do bloco livremente" />
              </div>
            </div>

            <button onClick={handleDownload} className="px-5 py-2.5 font-bold rounded-md shadow-sm transition-colors flex items-center space-x-2 text-white hover:opacity-90" style={{ backgroundColor: theme.btnBaixar }}>
              <Download className="w-5 h-5" /><span>Baixar STL do Bloco</span>
            </button>
          </div>

          <StlViewer3D
            url={ionStlUrl}
            cor={ionConfig.corModelo}
            dimensions={dimensoesIonico}
            onDimensionsParsed={setDimensoesIonico}
            mostrarDimensoes={mostrarDimensoesIonico}
            onToggleDimensoes={() => setMostrarDimensoesIonico(!mostrarDimensoesIonico)}
            autoRotate={false}
            onToggleAutoRotate={() => {}}
            height={450}
            cameraPosition={[0, 60, 110]}
            helpText="Gire a peça para inspecionar os pinos e rasgos • 2 cliques para ocultar dimensões XYZ"
          />
        </div>
      )}

    </div>
  );
};

export default BlocosIonicosTab;

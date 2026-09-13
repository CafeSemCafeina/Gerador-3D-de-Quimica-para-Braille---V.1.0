import { Settings, ArrowRight, Download, Box, Copy, Check, Grip, Languages, Trash2, Mic, MicOff, Volume2, Sliders, ChevronDown, ChevronUp, Eye, EyeOff, RefreshCw, Type } from 'lucide-react';
import ColorTester from '../components/common/ColorTester';
import ConfigSlider from '../components/common/ConfigSlider';
import AlertaSugestao from '../components/common/AlertaSugestao';
import BrailleCell from '../components/common/BrailleCell';
import StlViewer3D from '../components/common/StlViewer3D';
import { baixarModeloSTL } from '../utils/downloadStl';
import { FONTES_TEXTO_3D } from '../data/fontes';

const GeradorBrailleTab = ({ theme, corPrincipal, setCorPrincipal, autoRotate, setAutoRotate, gerador }) => {
  const {
    input, setInput, cells, isGenerating, stlUrl,
    dimensoesGerador, setDimensoesGerador, mostrarDimensoesGerador, setMostrarDimensoesGerador,
    copiado, brailleInput, translatedText, isListening, showAdvanced, setShowAdvanced,
    config3D, setConfig3D, configTextoVerso, setConfigTextoVerso, sugestaoQuimica, handleAplicarSugestao, handleGenerate,
    brailleUnicodeText, handleCopy, handleBrailleTranslate, handleClearTranslator,
    handleDictation, handleSpeak, celasFisicas
  } = gerador;

  const handleDownload = () => {
    if (!stlUrl) return;
    const nomeStr = input.replace(/[^a-zA-Z0-9]/g, '_');
    baixarModeloSTL(stlUrl, `MatrizBraille_${nomeStr}.stl`);
  };

  return (
    <div id="painel-gerador" role="tabpanel" aria-label="Gerador Braille" className="space-y-6 fade-in">
      
      <div className="relative p-6 rounded-xl shadow-sm transition-colors duration-500" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
        
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
          <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
        </div>

        <div className="text-slate-600 space-y-3">
          <div className="pr-16 sm:pr-[160px]">
            <p className="leading-relaxed text-justify">
              Converte fórmulas químicas em arquivos 3D (STL) para impressão 3D e leitura tátil, seguindo as normas estabelecidas pela <a href="https://www.gov.br/ibc/pt-br/pesquisa-e-tecnologia/materiais-especializados-1/livros-em-braille-1/o-sistema-braille-arquivos/grafia-quimica-braille-para-uso-no-brasil-pdf.pdf/@@display-file/file" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline transition-colors" style={{ color: theme.corPrincipal }}>Grafia Química Braille para Uso no Brasil (3ª edição, 2017)</a>.
            </p>
          </div>
          
          <div className="border-l-4 pl-3 py-2 pr-3 rounded-r text-sm transition-colors" style={{ borderColor: theme.corPrincipal, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <p className="text-justify">Uma ferramenta de tecnologia assistiva desenvolvida por <a href="https://www.linkedin.com/in/andre-gaito-2a58151b1/" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer font-semibold text-slate-700">André Vinnicios S. Gaito</a> para facilitar a inclusão no ensino de ciências e tornar a química ao alcance de todos.</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl shadow-sm transition-colors duration-500" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <label htmlFor="ionInput" className="block text-sm font-medium text-slate-700 mb-1">Digite a fórmula do Íon, Composto Químico ou Texto</label>
              <textarea id="ionInput" value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none text-lg font-mono resize-y min-h-[80px] pr-12 transition-colors duration-500" style={{ backgroundColor: theme.fundoSubCaixa, color: theme.textoSubCaixa }} rows={2} placeholder="Ex: Fe(OH)2 ou qualquer texto multilinhas..." />
              <button type="button" onClick={handleDictation} title="Ditar por voz" className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 ${isListening ? 'bg-red-100 text-red-600 animate-pulse ring-2 ring-red-400' : 'bg-white/50 text-slate-500 hover:text-slate-800 backdrop-blur'}`}>
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-end">
              <button type="submit" disabled={isGenerating} className={`w-full sm:w-auto px-6 py-3 font-medium rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 h-[52px] ${isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'hover:opacity-90'}`} style={!isGenerating ? { backgroundColor: theme.btnVisualizar, color: theme.textoBtnVis, border: `2px solid ${theme.borderBtnVis}` } : {}}>
                <Settings className={`w-5 h-5 inline-block ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Processando Malha...' : 'Visualizar STL'}</span>
              </button>
            </div>
          </div>

          <AlertaSugestao sugestaoDados={sugestaoQuimica} aoAplicarSugestao={handleAplicarSugestao} />

          <div className="border-t border-slate-200 pt-4 mt-2">
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: theme.corPrincipal }}>
              <Sliders className="w-4 h-4 mr-2" /> Opções Avançadas de Impressão 3D {showAdvanced ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
            {showAdvanced && (
              <div id="painel-avancado" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 bg-slate-50/50 p-5 rounded-lg border border-slate-200">
                <ConfigSlider label="Altura do Ponto" value={config3D.alturaPonto} min="0.5" max="1.5" step="0.05" unit="mm" onChange={(e) => setConfig3D({ ...config3D, alturaPonto: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Diâmetro do Ponto" value={config3D.diametroPonto} min="1.0" max="2.0" step="0.05" unit="mm" onChange={(e) => setConfig3D({ ...config3D, diametroPonto: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Espessura da Placa" value={config3D.espessuraPlaca} min="0.0" max="10.0" step="0.5" unit="mm" onChange={(e) => setConfig3D({ ...config3D, espessuraPlaca: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Bordas Arredondadas" value={config3D.borda} min="0.0" max="10.0" step="0.5" unit="mm" onChange={(e) => setConfig3D({ ...config3D, borda: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Dist. Pontos (X/Y)" value={config3D.distPontos} min="1.0" max="3.0" step="0.1" unit="mm" onChange={(e) => setConfig3D({ ...config3D, distPontos: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Dist. Celas" value={config3D.distCelas} min="3.0" max="8.0" step="0.1" unit="mm" onChange={(e) => setConfig3D({ ...config3D, distCelas: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Dist. Linhas" value={config3D.distLinhas} min="5.0" max="15.0" step="0.5" unit="mm" onChange={(e) => setConfig3D({ ...config3D, distLinhas: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                <ConfigSlider label="Margem Geral" value={config3D.margem} min="1.0" max="5.0" step="0.5" unit="mm" onChange={(e) => setConfig3D({ ...config3D, margem: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
              </div>
            )}
          </div>

          {/* NOVO BLOCO REINTEGRADO V 2.8: TEXTO NO VERSO DA PLACA */}
          <div className="border-t border-slate-200 pt-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input type="checkbox" checked={configTextoVerso.ativo} onChange={(e) => setConfigTextoVerso({ ...configTextoVerso, ativo: e.target.checked })} className="w-5 h-5 rounded cursor-pointer" style={{ accentColor: theme.corPrincipal }} />
              <span className="text-sm font-semibold flex items-center gap-1.5" style={{ color: theme.corPrincipal }}><Type className="w-4 h-4" /> Texto em Relevo no Verso</span>
            </label>
            <p className="text-xs text-slate-500 mt-1.5 text-justify">Grava a mesma fórmula/texto digitado em letras comuns na parte de trás da peça, tornando-a legível tanto para pessoas cegas (Braille na frente) quanto para pessoas videntes (texto no verso).</p>

            {configTextoVerso.ativo && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 bg-slate-50/50 p-5 rounded-lg border border-slate-200">
                <div>
                  <ConfigSlider label="Altura do Relevo" value={configTextoVerso.espessura} min="-2.0" max="2.0" step="0.05" unit="mm" onChange={(e) => setConfigTextoVerso({ ...configTextoVerso, espessura: parseFloat(e.target.value) })} cor={configTextoVerso.espessura < 0 ? '#dc2626' : theme.corPrincipal} />
                  <span className="text-xs text-slate-500 block mt-1.5 text-justify">
                    {configTextoVerso.espessura < 0 ? 'Valores negativos: O texto será gerado como uma marcação negativa "para dentro da peça".' : 'Valores Positivos: O texto será gerado como um "Relevo" para fora da peça.'}
                  </span>
                </div>
                <div>
                  <ConfigSlider label="Tamanho do Texto" value={configTextoVerso.tamanho} min="3.0" max="40.0" step="0.5" unit="mm" onChange={(e) => setConfigTextoVerso({ ...configTextoVerso, tamanho: parseFloat(e.target.value) })} cor={theme.corPrincipal} />
                  <span className="text-xs text-slate-500 block mt-1.5 text-justify">Referente à altura das letras. O texto é centralizado e reduzido automaticamente se não couber na placa.</span>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-600 uppercase mb-1">Fonte do Texto</label>
                  <select value={configTextoVerso.fonte} onChange={(e) => setConfigTextoVerso({ ...configTextoVerso, fonte: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 outline-none font-medium text-sm bg-white cursor-pointer">
                    {FONTES_TEXTO_3D.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
          {/* FIM DO BLOCO TEXTO NO VERSO */}
          
        </form>
      </div>

      {stlUrl && (
        <div role="region" className="p-6 rounded-xl shadow-sm transition-colors duration-500 flex flex-col" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-bold text-slate-800 flex items-center">
                <Box className="w-5 h-5 mr-2 text-slate-500" />
                Pré-visualização do Modelo 3D
              </h2>
              
              <button onClick={() => setMostrarDimensoesGerador(!mostrarDimensoesGerador)} className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-semibold border border-slate-200 transition-colors">
                {mostrarDimensoesGerador ? <><EyeOff className="w-3.5 h-3.5" /> Ocultar Dimensões</> : <><Eye className="w-3.5 h-3.5" /> Mostrar Dimensões</>}
              </button>

              <button onClick={() => setAutoRotate(!autoRotate)} className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-semibold border border-slate-200 transition-colors">
                <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ color: theme.corPrincipal }} />
                {autoRotate ? 'Parar Rotação' : 'Girar Peça'}
              </button>

            </div>
            
            <button onClick={handleDownload} className="px-4 py-2 font-medium rounded-md shadow-sm transition-colors flex items-center space-x-2 hover:opacity-90" style={{ backgroundColor: theme.btnBaixar, color: theme.textoBtnBaixar, border: `2px solid ${theme.borderBtnBaixar}` }}>
              <Download className="w-4 h-4" /><span className="hidden sm:inline">Baixar Arquivo STL</span><span className="sm:hidden">Baixar STL</span>
            </button>
          </div>

          <p className="sr-only text-justify">Modelo 3D gerado. Arquivo possui aproximadamente {celasFisicas.length} celas braille.</p>

          <StlViewer3D
            url={stlUrl}
            cor={theme.corPrincipal}
            dimensions={dimensoesGerador}
            onDimensionsParsed={setDimensoesGerador}
            mostrarDimensoes={mostrarDimensoesGerador}
            onToggleDimensoes={() => setMostrarDimensoesGerador(!mostrarDimensoesGerador)}
            autoRotate={autoRotate}
            onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
            height={350}
            cameraPosition={[0, 50, 100]}
          />
        </div>
      )}

      <div className="p-4 sm:p-6 rounded-xl shadow-sm transition-colors duration-500" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">Visualização das Celas Braille (Leitura Tátil 2D) <ArrowRight className="w-4 h-4 ml-2 text-slate-400" /></h2>
        {cells.length > 0 && (
          <div>
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap items-start gap-y-4 gap-x-1 sm:gap-x-0 p-4 sm:p-6 rounded-lg border border-slate-200 min-h-[180px] transition-colors duration-500" style={{ backgroundColor: theme.fundoSubCaixa }}>
              {cells.map((cell, index) => {
                if (cell.isNewline) return <div key={`nl-${index}`} className="col-span-4 sm:w-full h-2 sm:h-4"></div>;
                return <BrailleCell key={index} dots={cell.dots} label={cell.label} description={cell.description} />;
              })}
            </div>
            <div className="mt-4 flex justify-between items-center text-xs sm:text-sm text-slate-500 border-t border-slate-200 pt-4 px-1">
              <p>Largura estimada na impressão: <span className="font-bold text-slate-700">~{(celasFisicas.length * 6.5).toFixed(1)} mm</span></p>
              <p>Total: <span className="font-bold text-slate-700">{celasFisicas.length}</span> celas</p>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2 border border-slate-200 rounded-lg p-4 bg-slate-50/50 flex flex-col justify-between transition-colors">
                <div>
                  <span className="block text-xs font-bold text-slate-500 mb-2 uppercase">Texto Braille (Unicode)</span>
                  <div className="text-4xl tracking-widest font-mono mb-4 break-all min-h-[3rem] whitespace-pre-wrap p-2 rounded-md transition-colors duration-500 text-justify" style={{ backgroundColor: theme.fundoSubCaixa, color: theme.textoSubCaixa }}>
                    {brailleUnicodeText}
                  </div>
                </div>
                <button onClick={handleCopy} className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-md flex items-center justify-center space-x-2 transition-colors">
                  {copiado ? <span className="flex items-center text-green-700 font-semibold"><Check className="w-4 h-4 text-green-600 mr-1.5" /><span>Copiado!</span></span> : <><Copy className="w-4 h-4" /><span>Copiar Texto Braille</span></>}
                </button>
              </div>

              <div className="md:w-1/2 border border-slate-200 rounded-lg p-4 bg-slate-50/50 flex flex-col transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center text-[11px] sm:text-xs font-bold text-slate-500 uppercase"><Grip className="w-4 h-4 mr-1 sm:mr-1.5 text-slate-400" />Digite o texto Braille</span>
                  <button onClick={handleClearTranslator} className="px-2 py-1 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 rounded text-[10px] sm:text-xs font-bold flex items-center transition-colors"><Trash2 className="w-3 h-3 mr-1" />Limpar</button>
                </div>
                <textarea value={brailleInput} onChange={(e) => handleBrailleTranslate(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 outline-none text-lg font-mono mb-4 resize-y min-h-[4rem] transition-colors duration-500 text-justify" style={{ backgroundColor: theme.fundoSubCaixa, color: theme.textoSubCaixa }} placeholder="Cole caracteres Braille aqui..." />
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center text-xs font-bold text-slate-500 uppercase"><Languages className="w-4 h-4 mr-1.5 transition-colors" style={{ color: theme.corPrincipal }} />Tradução em Português</span>
                  <div className="flex gap-2">
                    <button onClick={() => { navigator.clipboard.writeText(translatedText); alert("Tradução copiada!"); }} className="px-2 py-1 rounded text-[10px] sm:text-xs font-bold flex items-center transition-colors" style={{ backgroundColor: `${theme.corPrincipal}20`, color: theme.corPrincipal }}><Copy className="w-3 h-3 mr-1" />Copiar</button>
                    <button onClick={handleSpeak} disabled={!translatedText} className="px-2 py-1 rounded text-[10px] sm:text-xs font-bold flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: `${theme.corPrincipal}20`, color: theme.corPrincipal }}><Volume2 className="w-3 h-3 mr-1" />Ouvir</button>
                  </div>
                </div>
                <div className="w-full px-3 py-2 border border-slate-300 rounded-md text-lg min-h-[3.5rem] font-sans whitespace-pre-wrap break-all transition-colors duration-500 flex-grow text-justify" style={{ backgroundColor: theme.fundoSubCaixa, color: theme.textoSubCaixa }}>
                  {translatedText || <span className="text-slate-400 italic">A tradução aparecerá aqui...</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeradorBrailleTab;

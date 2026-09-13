import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { track } from '@vercel/analytics';
import ColorTester from '../../components/common/ColorTester';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MAX_RODADAS = 30;

const obterCorComplementar = (cor) => {
  if (!cor) return '#10b981';
  const c = String(cor).toLowerCase();
  
  if (c.includes('purple') || c.includes('8b5cf6') || c.includes('a855f7') || c.includes('9333ea')) return '#22c55e';
  if (c.includes('green') || c.includes('22c55e') || c.includes('16a34a') || c.includes('15803d')) return '#8b5cf6';
  if (c.includes('blue') || c.includes('3b82f6') || c.includes('2563eb') || c.includes('1d4ed8')) return '#ef4444';
  if (c.includes('red') || c.includes('ef4444') || c.includes('dc2626') || c.includes('b91c1c')) return '#3b82f6';
  
  return '#f59e0b';
};

const DadosRadioativosTab = ({ theme, corPrincipal, setCorPrincipal }) => {
  useEffect(() => {
    track('Visualizou Aba', {
      aba: 'Dados Radioativos'
    });
  }, []); 

  const [quantidadeInicial, setQuantidadeInicial] = useState(() => {
    const salvo = sessionStorage.getItem('dados_rad_qtd_inicial');
    return salvo !== null ? Number(salvo) : 42;
  });

  const [facesRadioativas, setFacesRadioativas] = useState(() => {
    const salvo = sessionStorage.getItem('dados_rad_faces');
    return salvo !== null ? Number(salvo) : 1;
  });

  const [dadosExperimentais, setDadosExperimentais] = useState(() => {
    const salvo = sessionStorage.getItem('dados_rad_experimentais');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch (e) {
        console.error("Erro ao fazer parse dos dados experimentais", e);
      }
    }
    return Array.from({ length: MAX_RODADAS }, (_, i) => ({
      rodada: i,
      experimental: i === 0 ? 42 : '', 
    }));
  });

  useEffect(() => {
    sessionStorage.setItem('dados_rad_qtd_inicial', quantidadeInicial);
  }, [quantidadeInicial]);

  useEffect(() => {
    sessionStorage.setItem('dados_rad_faces', facesRadioativas);
  }, [facesRadioativas]);

  useEffect(() => {
    sessionStorage.setItem('dados_rad_experimentais', JSON.stringify(dadosExperimentais));
  }, [dadosExperimentais]);

  const handleInputChange = useCallback((index, value) => {
    setDadosExperimentais((prev) => {
      const novosDados = [...prev];
      novosDados[index].experimental = value === '' ? '' : Number(value);
      return novosDados;
    });
  }, []);

  const handleQuantidadeInicial = useCallback((e) => {
    const novoValor = Number(e.target.value);
    if (novoValor >= 0) {
      setQuantidadeInicial(novoValor);
      setDadosExperimentais((prev) => {
        const novosDados = [...prev];
        novosDados[0].experimental = novoValor;
        return novosDados;
      });
    }
  }, []);

  const handleJogarDados = useCallback(() => {
    track('Clicou Jogar Dados', {
      faces_radioativas: facesRadioativas,
      dados_iniciais: quantidadeInicial
    });

    setDadosExperimentais((prev) => {
      const indexVazio = prev.findIndex((d, idx) => idx > 0 && d.experimental === '');
      if (indexVazio === -1) return prev;

      const qtdAnterior = Number(prev[indexVazio - 1].experimental);
      if (isNaN(qtdAnterior) || qtdAnterior <= 0) return prev;

      const p = facesRadioativas / 6;
      let restantes = 0;
      
      for (let i = 0; i < qtdAnterior; i++) {
        if (Math.random() >= p) {
          restantes++;
        }
      }

      const novosDados = [...prev];
      novosDados[indexVazio].experimental = restantes;
      return novosDados;
    });
  }, [facesRadioativas, quantidadeInicial]);

  const handleReiniciarSimulacao = useCallback(() => {
    const novosDados = Array.from({ length: MAX_RODADAS }, (_, i) => ({
      rodada: i,
      experimental: i === 0 ? quantidadeInicial : '',
    }));
    setDadosExperimentais(novosDados);
  }, [quantidadeInicial]);

  const corComplementar = useMemo(() => obterCorComplementar(corPrincipal), [corPrincipal]);

  const parametrosMatematicos = useMemo(() => {
    const p = facesRadioativas / 6;
    const fracaoRestante = (6 - facesRadioativas) / 6;
    const lambda = facesRadioativas === 0 ? 0 : -Math.log(fracaoRestante);
    const meiaVida = facesRadioativas === 0 ? 'Infinita' : (Math.LN2 / lambda).toFixed(1);
    
    return { p, fracaoRestante, lambda, meiaVida, lambdaFormatado: lambda.toFixed(3).replace('.', ',') };
  }, [facesRadioativas]);

  const { lambda, meiaVida, lambdaFormatado, p, fracaoRestante } = parametrosMatematicos;

  const dadosGraficoProcessados = useMemo(() => {
    const baseGrafico = dadosExperimentais.map((linha) => {
      const teorico = Number((quantidadeInicial * Math.exp(-lambda * linha.rodada)).toFixed(2));
      return {
        ...linha,
        teorico,
        experimentalDecaido: linha.experimental !== '' ? quantidadeInicial - linha.experimental : null
      };
    });

    let ultimaRodada = 0;
    for (let i = baseGrafico.length - 1; i >= 0; i--) {
      if (baseGrafico[i].experimental !== '') {
        ultimaRodada = i;
        break;
      }
    }
    
    const proximoIndiceVazio = dadosExperimentais.findIndex((d, idx) => idx > 0 && d.experimental === '');
    const simulacaoConcluida = proximoIndiceVazio === -1 || (ultimaRodada > 0 && baseGrafico[ultimaRodada].experimental === 0);

    return {
      dadosGrafico: baseGrafico,
      dadosFiltradosGrafico: baseGrafico.slice(0, ultimaRodada + 1),
      ultimaRodadaPreenchida: ultimaRodada,
      simulacaoConcluida
    };
  }, [dadosExperimentais, quantidadeInicial, lambda]);

  const { dadosGrafico, dadosFiltradosGrafico, ultimaRodadaPreenchida, simulacaoConcluida } = dadosGraficoProcessados;

  const r2ValorCalculado = useMemo(() => {
    if (!simulacaoConcluida || ultimaRodadaPreenchida <= 0) return null;
    
    const pontosValidos = dadosFiltradosGrafico.filter(d => d.experimental !== '');
    const n = pontosValidos.length;
    
    if (n <= 1) return null;

    const somaY = pontosValidos.reduce((acc, curr) => acc + curr.experimental, 0);
    const mediaY = somaY / n;

    let sqRes = 0;
    let sqTot = 0;

    pontosValidos.forEach(curr => {
      sqRes += Math.pow(curr.experimental - curr.teorico, 2);
      sqTot += Math.pow(curr.experimental - mediaY, 2);
    });

    if (sqTot > 0) {
      const r2 = 1 - (sqRes / sqTot);
      return r2 >= 0 ? r2.toFixed(3).replace('.', ',') : '0,000';
    }
    return '1,000';
  }, [simulacaoConcluida, ultimaRodadaPreenchida, dadosFiltradosGrafico]);

  const limiteYAxis = Math.ceil(quantidadeInicial * 1.15);

  return (
    <div id="painel-dados-radioativos" role="tabpanel" aria-label="Dados Radioativos" className="relative p-8 sm:p-12 rounded-xl shadow-sm transition-colors duration-500 text-slate-700 fade-in space-y-8 text-left" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
      
      <div className="border-b border-slate-200 pb-6">
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
          <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
        </div>
        <div className="pr-16 sm:pr-[140px]">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dados Radioativos</h2>
          <p className="text-lg font-medium mt-2 transition-colors text-justify" style={{ color: theme.corPrincipal }}>
            Simulação estatística de tempo de meia-vida e decaimento nuclear.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">O Experimento Estatístico</h3>
        <p className="leading-relaxed text-justify">
          O material didático "Dados Radioativos" é um experimento prático desenvolvido para ensinar os conceitos de decaimento radioativo e tempo de meia-vida através da estatística. Utilizando a probabilidade de rolagem de dados com faces customizadas, os estudantes conseguem visualizar e quantificar um fenômeno químico microscópico de forma tátil e totalmente interativa.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Mecânica do Jogo</h3>
        <p className="leading-relaxed text-justify">
          Para iniciar, o aluno pode utilizar dados físicos ou clicar no botão <strong>Jogar Dados</strong> para simular os lançamentos digitalmente. Todo dado que exibir o símbolo radioativo virado para cima representa um núcleo que sofreu decaimento e deve ser retirado. O processo é repetido a cada rodada até que todos os dados decaiam a zero.
        </p>
      </div>
      
      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-bold text-slate-800">Análise Gráfica e Meia-Vida</h3>
        <p className="leading-relaxed text-justify">
          Com os resultados anotados após cada lançamento, o estudante constrói um gráfico relacionando o número de rodadas com os dados restantes para encontrar a meia-vida do conjunto. Ao final do jogo, é possível comparar a curva de decaimento experimental com a equação teórica, como: {"N(t) = " + quantidadeInicial + "e^{-" + lambdaFormatado + "t}"} para o cenário escolhido, permitindo assim avaliar a precisão matemática e idealidade (R²) do experimento.
        </p>
      </div>

      <div className="pt-6 border-t border-slate-200">
        
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 bg-slate-50 p-5 rounded-lg border border-slate-200 shadow-sm gap-6">
          <h3 className="text-2xl font-bold text-slate-800">Configurações da Simulação</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <label htmlFor="input-faces" className="font-semibold text-slate-700">Faces Radioativas:</label>
              <select
                id="input-faces"
                value={facesRadioativas}
                onChange={(e) => setFacesRadioativas(Number(e.target.value))}
                className="w-20 text-center border border-slate-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 transition-all font-bold bg-white"
                style={{ outlineColor: corPrincipal }}
              >
                {[0, 1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>{val}/6</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="input-qtd" className="font-semibold text-slate-700">Dados Iniciais (N):</label>
              <input
                id="input-qtd"
                type="number"
                min="1"
                value={quantidadeInicial}
                onChange={handleQuantidadeInicial}
                className="w-20 text-center border border-slate-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 transition-all font-bold"
                style={{ outlineColor: corPrincipal }}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleJogarDados}
                disabled={simulacaoConcluida}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-white shadow-sm transition-all ${simulacaoConcluida ? 'opacity-50 cursor-not-allowed bg-slate-400' : 'hover:opacity-90 active:scale-95'}`}
                style={{ backgroundColor: simulacaoConcluida ? undefined : corPrincipal }}
                title="Simular a próxima rodada de lançamento de dados"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Jogar Dados
              </button>

              <button
                onClick={handleReiniciarSimulacao}
                className="px-3 py-2 rounded-md font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 transition-all text-sm"
                title="Reiniciar todos os dados da tabela"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 font-bold text-lg text-white" style={{ backgroundColor: corPrincipal }}>
                Conjunto de Dados: {facesRadioativas} Face{facesRadioativas !== 1 ? 's' : ''} Radioativa{facesRadioativas !== 1 ? 's' : ''}
              </div>
              <div className="divide-y divide-slate-200 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Probabilidade de Decaimento (p)</span>
                  <span className="font-bold text-slate-900 mt-1 sm:mt-0">{facesRadioativas}/6 = {p.toFixed(4).replace('.', ',')}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Fração de Núcleos Restantes (1 - p)</span>
                  <span className="font-bold text-slate-900 mt-1 sm:mt-0">{6 - facesRadioativas}/6 = {fracaoRestante.toFixed(4).replace('.', ',')}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Constante de Decaimento (λ)</span>
                  <span className="font-bold text-slate-900 mt-1 sm:mt-0">λ = -ln({6 - facesRadioativas}/6) ≈ {lambdaFormatado}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Meia Vida (t<sub>1/2</sub>)</span>
                  <span className="font-bold text-slate-900 mt-1 sm:mt-0">
                    {facesRadioativas === 0 ? '0' : `ln(2) / ${lambdaFormatado} = ${meiaVida} rodadas`}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[450px] bg-white p-4 rounded-lg shadow-inner border border-slate-200 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dadosFiltradosGrafico} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="rodada" label={{ value: 'Nº de Rodadas', position: 'insideBottom', offset: -10 }} />
                  <YAxis 
                    label={{ 
                      value: 'Quantidade de Dados', 
                      angle: -90, 
                      position: 'insideLeft', 
                      style: { textAnchor: 'middle' } 
                    }} 
                    domain={[0, limiteYAxis]} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelFormatter={(label) => `Rodada: ${label}`}
                    formatter={(value, name) => [String(value).replace('.', ','), name]}
                  />
                  <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                  
                  <Line 
                    type="monotone" 
                    name="Quant. Dados" 
                    dataKey="experimental" 
                    stroke={corPrincipal} 
                    strokeWidth={3} 
                    activeDot={{ r: 6 }} 
                    connectNulls 
                  />
                  <Line 
                    type="monotone" 
                    name="Total de Decaimentos" 
                    dataKey="experimentalDecaido" 
                    stroke={corComplementar} 
                    strokeWidth={3} 
                    activeDot={{ r: 6 }} 
                    connectNulls 
                  />
                  <Line 
                    type="monotone" 
                    name={`Eq. Teórica Meia Vida: N(t) = ${quantidadeInicial}e^{-${lambdaFormatado}t}`}
                    dataKey="teorico" 
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={false} 
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              {r2ValorCalculado && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 top-[100px] bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full shadow-sm text-xs sm:text-sm font-bold border pointer-events-none flex items-center gap-1 z-10 transition-colors duration-300"
                  style={{ 
                    borderColor: corPrincipal,
                    color: corPrincipal 
                  }}
                >
                  <span>Idealidade R² = {r2ValorCalculado}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/5 xl:w-1/3 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="flex-1 max-h-[725px] overflow-y-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-white uppercase sticky top-0 z-10 shadow-sm" style={{ backgroundColor: corPrincipal }}>
                  <tr>
                    <th scope="col" className="px-3 py-3 text-center">Rodada</th>
                    <th scope="col" className="px-3 py-3 text-center">Quant. Exp.</th>
                    <th scope="col" className="px-3 py-3 text-center">Valor Teórico</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosGrafico.map((linha, index) => (
                    <tr key={linha.rodada} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2 text-center font-semibold text-slate-700">
                        {linha.rodada}
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          max={quantidadeInicial}
                          value={linha.experimental}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          className="w-full text-center border border-slate-300 rounded-md py-1 px-1 focus:outline-none focus:ring-2 transition-all"
                          style={{ outlineColor: corPrincipal }}
                          placeholder="-"
                        />
                      </td>
                      <td className="px-3 py-2 text-center font-medium text-slate-500">
                        {String(linha.teorico).replace('.', ',')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-50 text-xs text-slate-500 text-center border-t border-slate-200">
              Clique em <strong>Jogar Dados</strong> para simular rodadas ou digite manualmente.
            </div>
          </div>
        </div>

        {/* === SEÇÃO FÍSICA E IMPRESSÃO 3D === */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold mb-4" style={{ color: corPrincipal }}>
            Versão Física: Fabricação em Impressão 3D
          </h2>
          
          <p className="text-slate-700 mb-6 leading-relaxed">
            Produza seu próprio conjunto de Dados Radioativos. O arquivo <strong>3MF</strong> disponibilizado contém todas as placas organizadas, numeradas e nomeadas por tipo de conjunto, além do case de armazenamento para os 216 dados. O estojo foi projetado com marcações em Braille para garantir acessibilidade a alunos com deficiência visual.
          </p>

          {/* Tabela de Tempos de Impressão */}
          <div className="overflow-x-auto mb-8 shadow-sm rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ backgroundColor: `${corPrincipal}20` }}>
                  <th className="p-4 font-semibold text-slate-800 border-b border-slate-200">Componente</th>
                  <th className="p-4 font-semibold text-slate-800 border-b border-slate-200">Quantidade</th>
                  <th className="p-4 font-semibold text-slate-800 border-b border-slate-200">Tempo Estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">Conjuntos Radioativos</td>
                  <td className="p-4 border-b border-slate-200">5 conjuntos (42 unidades/cada)</td>
                  <td className="p-4 border-b border-slate-200">35 horas (7h por conjunto)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">Dados Estáveis (Não-radioativos)</td>
                  <td className="p-4 border-b border-slate-200">1 conjunto (6 unidades)</td>
                  <td className="p-4 border-b border-slate-200">1 hora</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">Case de Armazenamento (Base + Tampa)</td>
                  <td className="p-4 border-b border-slate-200">1 estojo (Para 216 dados)</td>
                  <td className="p-4 border-b border-slate-200">4 horas</td>
                </tr>
                <tr className="font-semibold bg-slate-50">
                  <td className="p-4" colSpan="2">Tempo Total (Bambu Lab P1S / Anycubic Kobra 3 Combo)</td>
                  <td className="p-4 text-slate-900">40 horas</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Instruções de Hardware */}
          <div className="bg-slate-50 p-6 rounded-lg mb-8 border border-slate-200">
            <h3 className="font-bold text-lg mb-3 text-slate-800">Compatibilidade de Impressão</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li><strong>Sistemas Multicores (Plug and Play):</strong> O arquivo 3MF está otimizado e pronto para fatiamento em impressoras modernas com sistemas multimaterial (ex: AMS ou ACE Pro).</li>
              <li><strong>Sistemas Monocromáticos (Ex: Ender-3 V3 KE):</strong> É perfeitamente possível imprimir o jogo em máquinas tradicionais de uma única extrusora. Basta adicionar pausas no fatiador (comando M600) na camada dos textos/símbolos e realizar a troca de filamento manualmente.</li>
            </ul>
          </div>

          {/* Botões de Download */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a 
              href="/downloads/dados_radioativos.3mf" 
              download
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: corPrincipal }}
            >
              Baixar Arquivo 3MF
            </a>
            <a 
              href="/downloads/manual_regras.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-slate-700 font-semibold border-2 bg-white hover:bg-slate-50 transition-colors"
              style={{ borderColor: corPrincipal }}
            >
              Abrir Manual de Regras (PDF)
            </a>
          </div>

          {/* Galeria de Instruções do Fatiador */}
          <h3 className="font-bold text-lg mb-4 text-slate-800">Instruções de Fatiamento</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
              <img src="/images/dados/instrucao_1.png" alt="Instrução de fatiamento para sistema multicolor" className="w-full h-auto rounded" />
              <p className="text-sm text-slate-600 mt-2 text-center">Configuração para sistemas Multicores</p>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
              <img src="/images/dados/instrucao_2.png" alt="Instrução para pausa e troca de cor (M600)" className="w-full h-auto rounded" />
              <p className="text-sm text-slate-600 mt-2 text-center">Configuração de pausa (M600) para monocromáticas</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DadosRadioativosTab;

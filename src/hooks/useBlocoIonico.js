import { useState, useEffect } from 'react';
import { geradorBlocoIonicoJSCAD, gerarUrlSTL } from '../braille3d';
import { parseBraille } from '../utils/brailleParser';
import { getIonColorBasedOnTheme } from '../data/theme';

/**
 * Encapsula todo o estado e as ações da aba "Blocos Iônicos": configuração
 * de tipo/valência/dimensões do bloco e geração da malha 3D com encaixes.
 */
export const useBlocoIonico = (corPrincipal) => {
  const [ionConfig, setIonConfig] = useState({
    tipo: 'cation',
    valencia: 1,
    largura: 55.9,
    altura: 25.0,
    espessura: 5.0,
    larguraEncaixe: 9.1,
    alturaEncaixe: 11.0,
    formula: 'H⁺',
    espessuraTexto: 1.0,
    fonte: 'sans',
    incluirBraille: false,
    corModelo: getIonColorBasedOnTheme(corPrincipal, 'cation'),
    corCustomizada: false
  });

  const [ionStlUrl, setIonStlUrl] = useState(null);
  const [isGeneratingIon, setIsGeneratingIon] = useState(false);
  const [dimensoesIonico, setDimensoesIonico] = useState(null);
  const [mostrarDimensoesIonico, setMostrarDimensoesIonico] = useState(true);
  const [showDimensoesFisicasIonico, setShowDimensoesFisicasIonico] = useState(true);

  useEffect(() => {
    if (!ionConfig.corCustomizada) {
      setIonConfig(prev => ({ ...prev, corModelo: getIonColorBasedOnTheme(corPrincipal, prev.tipo) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corPrincipal, ionConfig.tipo]);

  const selecionarTipoValencia = (tipo, valencia) => {
    setIonConfig(prev => ({
      ...prev,
      tipo,
      valencia,
      corModelo: prev.corCustomizada ? prev.corModelo : getIonColorBasedOnTheme(corPrincipal, tipo)
    }));
  };

  const handleGenerateIon = async (e) => {
    e.preventDefault();
    setIsGeneratingIon(true); setIonStlUrl(null); setDimensoesIonico(null);
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const brailleGerado = ionConfig.incluirBraille ? parseBraille(ionConfig.formula) : [];
      const modeloIon = geradorBlocoIonicoJSCAD({ ...ionConfig, cellsBraille: brailleGerado });
      setIonStlUrl(gerarUrlSTL(modeloIon));
    } catch (error) { console.error("Erro no bloco iônico:", error); alert("Ocorreu um erro ao modelar o bloco iônico."); }
    finally { setIsGeneratingIon(false); }
  };

  return {
    ionConfig, setIonConfig, selecionarTipoValencia,
    ionStlUrl, isGeneratingIon, handleGenerateIon,
    dimensoesIonico, setDimensoesIonico,
    mostrarDimensoesIonico, setMostrarDimensoesIonico,
    showDimensoesFisicasIonico, setShowDimensoesFisicasIonico
  };
};

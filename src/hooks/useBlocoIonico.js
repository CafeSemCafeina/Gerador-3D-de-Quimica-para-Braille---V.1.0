import { useState, useEffect, useRef } from 'react';
import { parseBraille } from '../utils/brailleParser';
import { getIonColorBasedOnTheme } from '../data/theme';
import { criarUrlStl, gerarStlAssincrono } from '../utils/gerarStl';

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

  const CAMPOS_MALHA = [
    'tipo', 'valencia', 'largura', 'altura', 'espessura',
    'larguraEncaixe', 'alturaEncaixe', 'formula', 'espessuraTexto',
    'fonte', 'incluirBraille'
  ];

  const geracaoId = useRef(0);
  const ionStlUrlRef = useRef(null);

  const invalidarIonStl = () => {
    setIonStlUrl((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
    setDimensoesIonico(null);
  };

  useEffect(() => {
    ionStlUrlRef.current = ionStlUrl;
  }, [ionStlUrl]);

  useEffect(() => () => {
    if (ionStlUrlRef.current) URL.revokeObjectURL(ionStlUrlRef.current);
  }, []);

  const aplicarIonConfig = (next) => {
    setIonConfig((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      if (CAMPOS_MALHA.some((campo) => resolved[campo] !== prev[campo])) {
        queueMicrotask(invalidarIonStl);
      }
      return resolved;
    });
  };

  useEffect(() => {
    if (!ionConfig.corCustomizada) {
      aplicarIonConfig(prev => ({ ...prev, corModelo: getIonColorBasedOnTheme(corPrincipal, prev.tipo) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corPrincipal, ionConfig.tipo]);

  const selecionarTipoValencia = (tipo, valencia) => {
    aplicarIonConfig(prev => ({
      ...prev,
      tipo,
      valencia,
      corModelo: prev.corCustomizada ? prev.corModelo : getIonColorBasedOnTheme(corPrincipal, tipo)
    }));
  };

  const handleGenerateIon = async (e) => {
    e.preventDefault();
    const token = ++geracaoId.current;
    setIsGeneratingIon(true);
    invalidarIonStl();

    try {
      const brailleGerado = ionConfig.incluirBraille ? parseBraille(ionConfig.formula) : [];
      const buffer = await gerarStlAssincrono('ionico', { ...ionConfig, cellsBraille: brailleGerado });
      if (token !== geracaoId.current) return;
      setIonStlUrl(criarUrlStl(buffer));
    } catch (error) {
      if (token !== geracaoId.current) return;
      console.error("Erro no bloco iônico:", error);
      alert("Ocorreu um erro ao modelar o bloco iônico.");
    } finally {
      if (token === geracaoId.current) setIsGeneratingIon(false);
    }
  };

  return {
    ionConfig, setIonConfig: aplicarIonConfig, selecionarTipoValencia,
    ionStlUrl, isGeneratingIon, handleGenerateIon,
    dimensoesIonico, setDimensoesIonico,
    mostrarDimensoesIonico, setMostrarDimensoesIonico,
    showDimensoesFisicasIonico, setShowDimensoesFisicasIonico
  };
};

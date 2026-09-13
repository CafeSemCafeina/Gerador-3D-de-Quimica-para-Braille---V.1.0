import { useState, useEffect, useRef } from 'react';
import { parseBraille as parseBrailleTexto, cellsToBrailleUnicode } from '../utils/brailleParser';
import { translateBrailleToText } from '../utils/brailleTranslator';
import { checarSugestaoQuimica } from '../utils/chemSuggestions';
import { criarUrlStl, gerarStlAssincrono } from '../utils/gerarStl';

const CONFIG_3D_PADRAO = {
  alturaPonto: 0.75, diametroPonto: 1.9, espessuraPlaca: 5.0, borda: 0.0,
  distPontos: 2.5, distCelas: 6.0, distLinhas: 10.0, margem: 2.0
};

/**
 * Encapsula todo o estado e as ações da aba "Gerador Braille": digitação/reconhecimento de fórmulas,
 * geração da malha 3D, tradutor reverso Braille -> português e leitura por voz.
 */
export const useBrailleGerador = () => {
  const [input, setInput] = useState('Fe(OH)2');
  const [cells, setCells] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stlUrl, setStlUrl] = useState(null);

  const [dimensoesGerador, setDimensoesGerador] = useState(null);
  const [mostrarDimensoesGerador, setMostrarDimensoesGerador] = useState(true);

  const [copiado, setCopiado] = useState(false);
  const [brailleInput, setBrailleInput] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [config3D, setConfig3D] = useState(CONFIG_3D_PADRAO);

  // Estado para a configuração do Texto no Verso adicionado
  const [configTextoVerso, setConfigTextoVerso] = useState({
    ativo: false,
    espessura: 0.6,
    tamanho: 10.0,
    fonte: 'sans'
  });

  const sugestaoQuimica = checarSugestaoQuimica(input);

  const parseBraille = (rawText) => {
    const result = parseBrailleTexto(rawText);
    setCells(result);
    return result;
  };

  const geracaoId = useRef(0);
  const stlUrlRef = useRef(null);

  const invalidarStl = () => {
    setStlUrl((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
    setDimensoesGerador(null);
  };

  useEffect(() => { parseBraille(input); }, []);

  useEffect(() => {
    stlUrlRef.current = stlUrl;
  }, [stlUrl]);

  useEffect(() => () => {
    if (stlUrlRef.current) URL.revokeObjectURL(stlUrlRef.current);
  }, []);

  const handleAplicarSugestao = (novaFormula) => {
    setInput(novaFormula);
    parseBraille(novaFormula);
    invalidarStl();
  };

  const handleInputChange = (novoValor) => {
    setInput(novoValor);
    parseBraille(novoValor);
    invalidarStl();
  };

  const atualizarConfig3D = (next) => {
    setConfig3D(next);
    invalidarStl();
  };

  const atualizarConfigTextoVerso = (next) => {
    setConfigTextoVerso(next);
    invalidarStl();
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    const blocosGerados = parseBraille(input);
    if (!blocosGerados || blocosGerados.length === 0) return;

    const token = ++geracaoId.current;
    setIsGenerating(true);
    invalidarStl();

    try {
      const buffer = await gerarStlAssincrono('braille', {
        cells: blocosGerados,
        config: config3D,
        textoVerso: { ...configTextoVerso, texto: input }
      });
      if (token !== geracaoId.current) return;
      setStlUrl(criarUrlStl(buffer));
    } catch (error) {
      if (token !== geracaoId.current) return;
      console.error("Erro ao gerar modelo:", error);
      alert("Ocorreu um erro ao gerar a malha 3D.");
    } finally {
      if (token === geracaoId.current) setIsGenerating(false);
    }
  };

  const brailleUnicodeText = cellsToBrailleUnicode(cells);

  const handleCopy = () => {
    navigator.clipboard.writeText(brailleUnicodeText);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleBrailleTranslate = (text) => {
    setBrailleInput(text);
    setTranslatedText(translateBrailleToText(text));
  };

  const handleClearTranslator = () => { setBrailleInput(''); setTranslatedText(''); };

  const handleDictation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Seu navegador não suporta digitação por voz nativamente."); return; }
    if (isListening) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR'; recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const newText = input ? `${input} ${transcript}` : transcript;
      handleInputChange(newText);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSpeak = () => {
    if (!translatedText) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = 'pt-BR'; utterance.rate = 0.92; utterance.pitch = 1.0;
    const vozes = window.speechSynthesis.getVoices();
    const vozNatural = vozes.find(v => v.lang.includes('pt') && (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google') || v.name.includes('Luciana') || v.name.includes('Francisca') || v.name.includes('Antonio'))) || vozes.find(v => v.lang.includes('pt'));
    if (vozNatural) { utterance.voice = vozNatural; }
    window.speechSynthesis.speak(utterance);
  };

  const celasFisicas = cells.filter(c => !c.isNewline);

  return {
    input, setInput: handleInputChange, cells, isGenerating, stlUrl,
    dimensoesGerador, setDimensoesGerador, mostrarDimensoesGerador, setMostrarDimensoesGerador,
    copiado, brailleInput, translatedText, isListening, showAdvanced, setShowAdvanced,
    config3D, setConfig3D: atualizarConfig3D,
    configTextoVerso, setConfigTextoVerso: atualizarConfigTextoVerso, 
    
    sugestaoQuimica, handleAplicarSugestao, handleGenerate,
    brailleUnicodeText, handleCopy, handleBrailleTranslate, handleClearTranslator,
    handleDictation, handleSpeak, celasFisicas
  };
};

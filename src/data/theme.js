import {
  logoPrincipal, logoAmarelo, logoAzul, logoLaranja, logoRosa, logoRoxo, logoVerde, logoVermelho
} from './assets';

// Primeira linha: As 7 cores originais
export const CORES_LINHA_1 = [
  { nome: 'Azul', hex: '#0e52c2' }, { nome: 'Roxo', hex: '#511576' }, { nome: 'Rosa', hex: '#db2777' },
  { nome: 'Vermelho', hex: '#dc2626' }, { nome: 'Laranja', hex: '#ea580c' }, { nome: 'Amarelo', hex: '#ca8a04' },
  { nome: 'Verde', hex: '#1a8441' }
];

// Segunda linha: As novas cores e o botão especial "rainbow"
export const CORES_LINHA_2 = [
  { nome: 'Ciano', hex: '#06b6d4' }, { nome: 'Lilás', hex: '#a855f7' }, { nome: 'Bege', hex: '#f5f5dc' },
  { nome: 'Marrom', hex: '#8b4513' }, { nome: 'Branco', hex: '#ffffff' }, { nome: 'Preto', hex: '#000000' },
  { nome: 'Arco-Íris (RGB)', hex: 'rainbow' } // Identificador especial
];

// Paletas de tema completas para cada cor predefinida do site.
const TEMAS_PREDEFINIDOS = {
  '#0e52c2': { cabecalho: '#ffffff', abaNormal: '#0e52c2', abaAtiva: '#0a3d91', fundoPrincipal: '#869fd8', btnVisualizar: '#0e52c2', btnBaixar: '#059669', fundoCaixa: '#ffffff', fundoSubCaixa: '#f8fafc', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#0e52c2', logo: logoAzul, textoSubCaixa: '#1e293b' },
  '#1a8441': { cabecalho: '#ffffff', abaNormal: '#1a8441', abaAtiva: '#1c6030', fundoPrincipal: '#87a194', btnVisualizar: '#1c6030', btnBaixar: '#066a63', fundoCaixa: '#eaf6f0', fundoSubCaixa: '#c3e4d3', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#1a8441', logo: logoVerde, textoSubCaixa: '#1e293b' },
  '#511576': { cabecalho: '#d8cff6', abaNormal: '#511576', abaAtiva: '#380d60', fundoPrincipal: '#87a2da', btnVisualizar: '#591884', btnBaixar: '#93e450', fundoCaixa: '#ede9fe', fundoSubCaixa: '#e8dafd', textoAba: '#a0f658', textoAbaNormal: 'rgba(160,246,88,0.6)', textoBtnVis: '#a0f658', borderBtnVis: '#a0f658', textoBtnBaixar: '#591884', borderBtnBaixar: '#591884', bordaGeral: '#cdc7f3', logo: logoRoxo, textoSubCaixa: '#000000' },
  '#db2777': { cabecalho: '#ffffff', abaNormal: '#db2777', abaAtiva: '#be185d', fundoPrincipal: '#f4a6c8', btnVisualizar: '#db2777', btnBaixar: '#059669', fundoCaixa: '#fdf2f8', fundoSubCaixa: '#fce7f3', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#db2777', logo: logoRosa, textoSubCaixa: '#1e293b' },
  '#dc2626': { cabecalho: '#ffffff', abaNormal: '#dc2626', abaAtiva: '#b91c1c', fundoPrincipal: '#f19e9e', btnVisualizar: '#dc2626', btnBaixar: '#059669', fundoCaixa: '#fef2f2', fundoSubCaixa: '#fee2e2', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#dc2626', logo: logoVermelho, textoSubCaixa: '#1e293b' },
  '#ea580c': { cabecalho: '#ffffff', abaNormal: '#ea580c', abaAtiva: '#c2410c', fundoPrincipal: '#f8bd9d', btnVisualizar: '#ea580c', btnBaixar: '#059669', fundoCaixa: '#fff7ed', fundoSubCaixa: '#ffedd5', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#ea580c', logo: logoLaranja, textoSubCaixa: '#1e293b' },
  '#ca8a04': { cabecalho: '#ffffff', abaNormal: '#ca8a04', abaAtiva: '#a16207', fundoPrincipal: '#f7dfa4', btnVisualizar: '#ca8a04', btnBaixar: '#059669', fundoCaixa: '#fefce8', fundoSubCaixa: '#fef9c3', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#ca8a04', logo: logoAmarelo, textoSubCaixa: '#1e293b' },
  
  // NOVOS TEMAS
  '#06b6d4': { cabecalho: '#ffffff', abaNormal: '#06b6d4', abaAtiva: '#0891b2', fundoPrincipal: '#a5f3fc', btnVisualizar: '#0891b2', btnBaixar: '#059669', fundoCaixa: '#ecfeff', fundoSubCaixa: '#cffafe', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#06b6d4', logo: logoPrincipal, textoSubCaixa: '#1e293b' },
  '#a855f7': { cabecalho: '#ffffff', abaNormal: '#a855f7', abaAtiva: '#9333ea', fundoPrincipal: '#e9d5ff', btnVisualizar: '#9333ea', btnBaixar: '#059669', fundoCaixa: '#faf5ff', fundoSubCaixa: '#f3e8ff', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#a855f7', logo: logoPrincipal, textoSubCaixa: '#1e293b' },
  '#f5f5dc': { cabecalho: '#ffffff', abaNormal: '#e5e5cb', abaAtiva: '#d5d5b9', fundoPrincipal: '#fefee2', btnVisualizar: '#8b7355', btnBaixar: '#059669', fundoCaixa: '#ffffff', fundoSubCaixa: '#f5f5dc', textoAba: '#4a3f35', textoAbaNormal: 'rgba(74,63,53,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#e5e5cb', logo: logoPrincipal, textoSubCaixa: '#1e293b' },
  '#8b4513': { cabecalho: '#ffffff', abaNormal: '#8b4513', abaAtiva: '#6b340e', fundoPrincipal: '#d2b48c', btnVisualizar: '#6b340e', btnBaixar: '#059669', fundoCaixa: '#fff8dc', fundoSubCaixa: '#ffebcd', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.7)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#8b4513', logo: logoPrincipal, textoSubCaixa: '#1e293b' },
  
  // TEMA BRANCO (Com contraste forçado)
  '#ffffff': { cabecalho: '#ffffff', abaNormal: '#ffffff', abaAtiva: '#f1f5f9', fundoPrincipal: '#e2e8f0', btnVisualizar: '#0f172a', btnBaixar: '#059669', fundoCaixa: '#ffffff', fundoSubCaixa: '#f8fafc', textoAba: '#0f172a', textoAbaNormal: 'rgba(15,23,42,0.6)', textoBtnVis: '#ffffff', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#cbd5e1', logo: logoPrincipal, textoSubCaixa: '#1e293b' },
  // TEMA PRETO (Com contraste forçado)
  '#000000': { cabecalho: '#0f172a', abaNormal: '#000000', abaAtiva: '#1e293b', fundoPrincipal: '#334155', btnVisualizar: '#ffffff', btnBaixar: '#059669', fundoCaixa: '#1e293b', fundoSubCaixa: '#0f172a', textoAba: '#ffffff', textoAbaNormal: 'rgba(255,255,255,0.6)', textoBtnVis: '#000000', borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: '#475569', logo: logoPrincipal, textoSubCaixa: '#f8fafc' }
};

/**
 * Retorna o objeto de tema (cores derivadas) para uma cor principal.
 * Contém cálculo matemático de contraste para cores customizadas.
 */
export const getTheme = (idOrHex) => {
  if (TEMAS_PREDEFINIDOS[idOrHex]) return { corPrincipal: idOrHex, ...TEMAS_PREDEFINIDOS[idOrHex] };
  
  // Cálculo de luminância para cores livres (RGB). Define se o texto será preto ou branco
  let r = 0, g = 0, b = 0;
  if (idOrHex && idOrHex.length === 7) {
    r = parseInt(idOrHex.slice(1, 3), 16);
    g = parseInt(idOrHex.slice(3, 5), 16);
    b = parseInt(idOrHex.slice(5, 7), 16);
  }
  const isLight = (r * 0.299 + g * 0.587 + b * 0.114) > 186;
  const textColor = isLight ? '#0f172a' : '#ffffff';
  const textNormal = isLight ? 'rgba(15,23,42,0.7)' : 'rgba(255,255,255,0.7)';

  return {
    corPrincipal: idOrHex, cabecalho: '#ffffff', abaNormal: idOrHex, abaAtiva: 'rgba(0,0,0,0.25)',
    fundoPrincipal: `${idOrHex}20`, btnVisualizar: idOrHex, btnBaixar: '#059669', fundoCaixa: '#ffffff',
    fundoSubCaixa: '#f8fafc', textoAba: textColor, textoAbaNormal: textNormal, textoBtnVis: textColor,
    borderBtnVis: 'transparent', textoBtnBaixar: '#ffffff', borderBtnBaixar: 'transparent', bordaGeral: idOrHex,
    logo: logoPrincipal, textoSubCaixa: '#1e293b'
  };
};

const MAPA_COR_ION = {
  '#0e52c2': { cation: '#0e52c2', anion: '#dc2626' },
  '#511576': { cation: '#1a8441', anion: '#511576' },
  '#1a8441': { cation: '#1a8441', anion: '#ea580c' },
  '#dc2626': { cation: '#0e52c2', anion: '#dc2626' },
  '#ea580c': { cation: '#1a8441', anion: '#ea580c' },
  '#ca8a04': { cation: '#ca8a04', anion: '#ff4500' },
  '#db2777': { cation: '#db2777', anion: '#a855f7' }
};

export const getIonColorBasedOnTheme = (themeHex, ionType) => {
  if (MAPA_COR_ION[themeHex]) return MAPA_COR_ION[themeHex][ionType];
  return ionType === 'cation' ? '#0e52c2' : '#dc2626';
};

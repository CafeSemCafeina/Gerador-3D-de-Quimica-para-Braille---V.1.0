import { BRAILLE_MAP, getU } from '../data/brailleMap';

/**
 * Converte um texto (fórmula química ou texto livre) em uma lista de "celas"
 * Braille, cada uma contendo os pontos ativos, um rótulo e uma descrição.
 * Função pura: não lê nem escreve nenhum estado do React.
 */
export const parseBraille = (rawText) => {
  if (!rawText.trim()) return [];

  const subscriptMap = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
  const text = rawText.replace(/[₀-₉]/g, char => subscriptMap[char]);

  const result = [];
  const normalizedText = text.replace(/\r/g, '');
  const chargeRegex = /\s*([+-]\d*|\d+[+-])$/;

  let baseStr = normalizedText;
  let chargeStr = "";

  if (!normalizedText.includes('\n')) {
    const match = normalizedText.trim().match(chargeRegex);
    if (match) {
      chargeStr = match[1];
      baseStr = normalizedText.trim().slice(0, match.index).trim();
    }
  }

  for (let char of baseStr) {
    if (char === ' ') { result.push({ dots: [], label: ' ', description: 'Espaço' }); continue; }
    if (char === '\n') { result.push({ isNewline: true, dots: [], label: '↵', description: 'Parágrafo' }); continue; }

    const isLetter = /[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(char);

    if (isLetter) {
      if (char !== char.toLowerCase()) result.push({ dots: BRAILLE_MAP.uppercaseIndicator, label: '⠨', description: 'Maiúscula' });
      const lowerChar = char.toLowerCase();
      if (BRAILLE_MAP.letters[lowerChar]) result.push({ dots: BRAILLE_MAP.letters[lowerChar], label: char, description: `Letra ${char}` });
    } else if (/[0-9]/.test(char)) { result.push({ dots: BRAILLE_MAP.lowerNumbers[char], label: char, description: `Índice ${char}` });
    } else if (BRAILLE_MAP.symbols[char]) { result.push({ dots: BRAILLE_MAP.symbols[char], label: char, description: 'Símbolo' }); }
  }

  if (chargeStr) {
    result.push({ dots: BRAILLE_MAP.chargeIndicator, label: '⠢', description: 'Ind. de Carga' });
    let inChargeNumber = false;
    for (let char of chargeStr) {
      if (char === '+') { inChargeNumber = false; result.push({ dots: BRAILLE_MAP.plus, label: '+', description: 'Positivo' }); }
      else if (char === '-') { inChargeNumber = false; result.push({ dots: BRAILLE_MAP.minus, label: '-', description: 'Negativo' }); }
      else if (/[0-9]/.test(char)) {
        if (!inChargeNumber) { result.push({ dots: BRAILLE_MAP.numberSign, label: '⠼', description: 'Numérico' }); inChargeNumber = true; }
        result.push({ dots: BRAILLE_MAP.standardNumbers[char], label: char, description: `Número ${char}` });
      }
    }
  }

  return result;
};

// Converte a lista de celas geradas por parseBraille em uma string Unicode Braille.
export const cellsToBrailleUnicode = (cells) => cells.map(cell => {
  if (cell.isNewline) return '\n';
  let code = 10240;
  if (cell.dots) { cell.dots.forEach(d => { if (d >= 1 && d <= 6) code += Math.pow(2, d - 1); }); }
  return String.fromCharCode(code);
}).join('');

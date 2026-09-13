import {
  REVERSE_LETTER_MAP, REVERSE_SYM_MAP, REVERSE_LOW_NUM_MAP,
  UPPER_INDICATOR, NUMBER_INDICATOR, CHARGE_INDICATOR
} from '../data/brailleMap';

const NUM_MAP = { 'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5', 'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0' };

/**
 * Traduz um texto em caracteres Unicode Braille de volta para português/fórmula química.
 * Função pura usada pelo tradutor reverso na aba "Gerador Braille".
 */
export const translateBrailleToText = (text) => {
  let result = ''; let isUpper = false; let isNumber = false; let isCharge = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ' || char === '⠀') { result += ' '; isNumber = false; isCharge = false; continue; }
    if (char === '\n') { result += '\n'; isNumber = false; isCharge = false; continue; }
    if (char === UPPER_INDICATOR) { isUpper = true; continue; }
    if (char === NUMBER_INDICATOR) { isNumber = true; continue; }
    if (char === CHARGE_INDICATOR) { isCharge = true; continue; }

    const mappedLetter = REVERSE_LETTER_MAP[char];
    const mappedSym = REVERSE_SYM_MAP[char];
    const mappedLowNum = REVERSE_LOW_NUM_MAP[char];

    const prevChar = result.slice(-1);
    const prevPrevChar = result.length > 1 ? result.slice(-2, -1) : ' ';
    const isPrevLower = /[a-zçáàâãéêíóôõú]/.test(prevChar);
    const isPrevPrevUpper = /[A-Z]/.test(prevPrevChar);
    const isChemicalElement = isPrevLower && isPrevPrevUpper;

    if (mappedLetter && mappedSym) {
      let useSymbol = true;
      if (isUpper) { useSymbol = false; } else {
        let nextBraille = text[i + 1];
        let nextIsLowerLetter = nextBraille && REVERSE_LETTER_MAP[nextBraille] && !REVERSE_SYM_MAP[nextBraille] && nextBraille !== UPPER_INDICATOR && nextBraille !== NUMBER_INDICATOR;
        if (isPrevLower && !isChemicalElement && (nextIsLowerLetter || !nextBraille || nextBraille === ' ' || nextBraille === '\n' || REVERSE_SYM_MAP[nextBraille])) {
          useSymbol = false;
          if (mappedSym === '(' && nextBraille) {
            let nL = REVERSE_LETTER_MAP[nextBraille];
            if (nL === 's' || nL === 'l' || nL === 'g' || nL === 'a') useSymbol = true;
          }
        } else if ((prevChar === ' ' || prevChar === '') && nextIsLowerLetter) { useSymbol = false; }
      }
      if (useSymbol) { result += mappedSym; } else { result += isUpper ? mappedLetter.toUpperCase() : mappedLetter; isUpper = false; }
      continue;
    }

    if (mappedLowNum && mappedSym) {
      if (isCharge) { result += mappedSym; if (mappedSym === '+' || mappedSym === '-') isCharge = false; }
      else { let useNumber = true; if ((isPrevLower && !isChemicalElement) || prevChar === ' ') useNumber = false; result += useNumber ? mappedLowNum : mappedSym; }
      continue;
    }

    if (mappedLetter) {
      if (isNumber && NUM_MAP[mappedLetter]) { result += NUM_MAP[mappedLetter]; } else { result += isUpper ? mappedLetter.toUpperCase() : mappedLetter; isUpper = false; isNumber = false; }
    } else if (mappedLowNum) { result += mappedLowNum; } else if (mappedSym) { result += mappedSym; if (isCharge && (mappedSym === '+' || mappedSym === '-')) isCharge = false; } else { result += char; }
  }
  return result;
};

// ============================================================================
// TABELA DE GRAFIA QUÍMICA BRAILLE
// Baseada em "Grafia Química Braille para Uso no Brasil" (IBC, 3ª edição, 2017)
// Para adicionar um novo símbolo/letra, basta editar os mapas abaixo.
// ============================================================================

export const BRAILLE_MAP = {
  uppercaseIndicator: [4, 6],
  letters: {
    'a': [1], 'b': [1, 2], 'c': [1, 4], 'd': [1, 4, 5], 'e': [1, 5],
    'f': [1, 2, 4], 'g': [1, 2, 4, 5], 'h': [1, 2, 5], 'i': [2, 4], 'j': [2, 4, 5],
    'k': [1, 3], 'l': [1, 2, 3], 'm': [1, 3, 4], 'n': [1, 3, 4, 5], 'o': [1, 3, 5],
    'p': [1, 2, 3, 4], 'q': [1, 2, 3, 4, 5], 'r': [1, 2, 3, 5], 's': [2, 3, 4], 't': [2, 3, 4, 5],
    'u': [1, 3, 6], 'v': [1, 2, 3, 6], 'w': [2, 4, 5, 6], 'x': [1, 3, 4, 6], 'y': [1, 3, 4, 5, 6], 'z': [1, 3, 5, 6],
    'á': [1, 2, 3, 5, 6], 'à': [1, 2, 3, 4, 6], 'â': [1, 6], 'ã': [3, 4, 5],
    'é': [1, 2, 3, 4, 5, 6], 'ê': [1, 2, 6],
    'í': [3, 4],
    'ó': [3, 4, 6], 'ô': [1, 4, 5, 6], 'õ': [2, 4, 6],
    'ú': [2, 3, 4, 5, 6],
    'ç': [1, 2, 3, 4, 6]
  },
  lowerNumbers: {
    '1': [2], '2': [2, 3], '3': [2, 5], '4': [2, 5, 6], '5': [2, 6],
    '6': [2, 3, 5], '7': [2, 3, 5, 6], '8': [2, 3, 6], '9': [3, 5], '0': [3, 5, 6]
  },
  standardNumbers: {
    '1': [1], '2': [1, 2], '3': [1, 4], '4': [1, 4, 5], '5': [1, 5],
    '6': [1, 2, 4], '7': [1, 2, 4, 5], '8': [1, 2, 5], '9': [2, 4], '0': [2, 4, 5]
  },
  symbols: {
    '(': [1, 2, 6], ')': [3, 4, 5], '[': [1, 2, 3, 5, 6], ']': [2, 3, 4, 5, 6],
    '.': [3], ',': [2], ';': [2, 3], ':': [2, 5], '!': [2, 3, 5], '?': [2, 6]
  },
  chargeIndicator: [5], numberSign: [3, 4, 5, 6], plus: [2, 3, 5], minus: [3, 6]
};

// Converte um array de pontos (ex: [1,2,4]) no caractere Unicode Braille correspondente.
export const getU = (dots) => {
  let code = 10240;
  if (dots) { dots.forEach(d => { if (d >= 1 && d <= 6) code += Math.pow(2, d - 1); }); }
  return String.fromCharCode(code);
};

// Mapas reversos (Unicode Braille -> caractere) usados pelo tradutor reverso.
export const REVERSE_LETTER_MAP = {};
Object.entries(BRAILLE_MAP.letters).forEach(([char, dots]) => { REVERSE_LETTER_MAP[getU(dots)] = char; });

export const REVERSE_SYM_MAP = {};
Object.entries(BRAILLE_MAP.symbols).forEach(([char, dots]) => { REVERSE_SYM_MAP[getU(dots)] = char; });
REVERSE_SYM_MAP[getU(BRAILLE_MAP.plus)] = '+';
REVERSE_SYM_MAP[getU(BRAILLE_MAP.minus)] = '-';

export const REVERSE_LOW_NUM_MAP = {};
Object.entries(BRAILLE_MAP.lowerNumbers).forEach(([char, dots]) => { REVERSE_LOW_NUM_MAP[getU(dots)] = char; });

export const UPPER_INDICATOR = getU(BRAILLE_MAP.uppercaseIndicator);
export const NUMBER_INDICATOR = getU(BRAILLE_MAP.numberSign);
export const CHARGE_INDICATOR = getU(BRAILLE_MAP.chargeIndicator);

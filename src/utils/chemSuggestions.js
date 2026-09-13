// ============================================================================
// Verificador de sugestões de estequiometria/IUPAC para a caixa de fórmula.
// Detecta erros comuns de valência, óxidos clássicos e grafia de carga iônica.
// ============================================================================

const NOX_ELEMENTOS = {
  'H': ['H+', 'H-'], 'Li': ['Li+'], 'Na': ['Na+'], 'K': ['K+'], 'Rb': ['Rb+'], 'Cs': ['Cs+'],
  'Be': ['Be2+'], 'Mg': ['Mg2+'], 'Ca': ['Ca2+'], 'Sr': ['Sr2+'], 'Ba': ['Ba2+'],
  'Fe': ['Fe2+', 'Fe3+'], 'Cu': ['Cu+', 'Cu2+'], 'Zn': ['Zn2+'], 'Al': ['Al3+'],
  'O': ['O2-', 'O22-'], 'S': ['S2-', 'S4+', 'S6+'], 'F': ['F-'], 'Cl': ['Cl-', 'Cl+', 'Cl3+', 'Cl5+', 'Cl7+']
};

const OXIDOS_CLASSICOS = {
  'NaO': ['Na2O', 'Na2O2'], 'KO': ['K2O', 'K2O2'], 'FeO': ['FeO', 'Fe2O3', 'Fe3O4'],
  'Cu2O2': ['CuO'], 'CO3': ['CO', 'CO2'], 'SO': ['SO2', 'SO3'], 'SO4': ['SO2', 'SO3']
};

const COMPOSTOS_ENSINO_MEDIO = {
  'NaOH2': ['NaOH'], 'Ca(OH)': ['Ca(OH)2'], 'HSO4': ['H2SO4'], 'HNO': ['HNO2', 'HNO3'],
  'HPO4': ['H3PO4'], 'HCO3': ['H2CO3'], 'NaCl2': ['NaCl'], 'CaSO42': ['CaSO4']
};

const DICIONARIO_GERAL = { ...OXIDOS_CLASSICOS, ...COMPOSTOS_ENSINO_MEDIO };

export const checarSugestaoQuimica = (texto) => {
  const limpo = texto.trim();
  if (!limpo || limpo.length < 2 || limpo.includes(' ')) return null;

  for (let errado in DICIONARIO_GERAL) {
    if (limpo.toUpperCase() === errado.toUpperCase()) {
      return { mensagem: `A proporção estequiométrica ou valência mais comum para esta substância é diferente.`, sugestoes: DICIONARIO_GERAL[errado] };
    }
  }

  const matchIon = limpo.match(/^([A-Z][a-z]?)([0-9]*)([+-])([0-9]*)$/);
  if (matchIon) {
    const [, elemento, numAntes, sinal, numDepois] = matchIon;
    const numeroCarga = numAntes || numDepois || '1';

    if (numeroCarga === '1') {
      const formCorreta = `${elemento}${sinal}`;
      if (limpo !== formCorreta && NOX_ELEMENTOS[elemento] && NOX_ELEMENTOS[elemento].includes(formCorreta)) {
        return { mensagem: `Na grafia química padrão, o número 1 na carga unitária é omitido.`, sugestoes: [formCorreta] };
      }
    }

    if (NOX_ELEMENTOS[elemento]) {
      const corretaLista = NOX_ELEMENTOS[elemento];
      if (!corretaLista.some(c => c.toUpperCase() === limpo.toUpperCase() || c === `${elemento}${numeroCarga}${sinal}`)) {
        return { mensagem: `O elemento ${elemento} não costuma formar o íon digitado. Confira os NOX mais estáveis:`, sugestoes: corretaLista };
      }
    }

    if (numDepois && !numAntes) {
      return { mensagem: `A convenção da IUPAC recomenda colocar o número antes do sinal na carga do íon.`, sugestoes: [`${elemento}${numDepois}${sinal}`] };
    }
  }
  return null;
};

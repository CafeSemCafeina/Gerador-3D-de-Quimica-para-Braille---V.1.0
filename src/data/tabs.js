// Sisrema de controle das Abas do site e da sua ordem no menu de navegação.
// Para adicionar/remover/reordenar uma aba, só editar o array
// e o "switch" de renderização em src/App.jsx.
export const TABS = [
  { id: 'gerador', label: 'Gerador Braille' },
  { id: 'materiais', label: 'Materiais Didáticos', subItems: [
      { id: 'ionicos', label: 'Blocos Iônicos' },
      { id: 'dados-radioativos', label: 'Dados Radioativos' },
      { id: 'giroscopios', label: 'Giroscópios Atômicos' },
      { id: 'dados-ionicos', label: 'Dados Iônicos' },
      { id: 'reguas', label: 'Réguas Químicas' },
      { id: 'geometria', label: 'Kit Geometria Molecular' },
      { id: 'carimbos', label: 'Carimbos Atômicos' },
      { id: 'spinner', label: 'Spinner Elementar' }
    ]
  },
  { id: 'sobre', label: 'Sobre o Projeto' },
  { id: 'instrucoes', label: 'Instruções' },
  { id: 'saiba-mais', label: 'Saiba Mais' },
  { id: 'parcerias', label: 'Parcerias' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'bug', label: 'Achou um Bug?' }
];

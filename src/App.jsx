import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// === ADIÇÕES DO VERCEL ANALYTICS ===
import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';
// ===================================

import { getTheme } from './data/theme';
import { useBrailleGerador } from './hooks/useBrailleGerador';
import { useBlocoIonico } from './hooks/useBlocoIonico';

import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// === IMPORTAÇÕES DAS ABAS CENTRAIS ===
import GeradorBrailleTab from './tabs/GeradorBrailleTab';
import BlocosIonicosTab from './tabs/BlocosIonicosTab';
import SobreProjetoTab from './tabs/SobreProjetoTab';
import InstrucoesTab from './tabs/InstrucoesTab';
import SaibaMaisTab from './tabs/SaibaMaisTab';
import ParceriasTab from './tabs/ParceriasTab';
import EquipeTab from './tabs/EquipeTab';
import BugTab from './tabs/BugTab';

// === IMPORTAÇÕES DAS SUB ABAS DE MATERIAIS DIDÁTICOS ===
import DadosRadioativosTab from './tabs/Materiais Didaticos/DadosRadioativosTab';
import GiroscopiosTab from './tabs/Materiais Didaticos/GiroscopiosTab';
import DadosIonicosTab from './tabs/Materiais Didaticos/DadosIonicosTab';
import ReguasQuimicasTab from './tabs/Materiais Didaticos/ReguasQuimicasTab';
import GeometriaMolecularTab from './tabs/Materiais Didaticos/GeometriaMolecularTab';
import CarimbosAtomicosTab from './tabs/Materiais Didaticos/CarimbosAtomicosTab';
import SpinnerElementarTab from './tabs/Materiais Didaticos/SpinnerElementarTab';



// ============================================================================
// APP.JSX — Orquestrador principal do site
//
// Este arquivo NAO contem a logica nem o layout de cada aba: ele apenas 
//gerencia qual aba esta ativa, o tema de cores (compartilhado por todas as abas)
// e delega o conteudo para o componente correspondente em `src/tabs/`.
// Para mexer em uma aba especifica, edite o arquivo dela em `src/tabs/`:
//   Gerador Braille  -> src/tabs/GeradorBrailleTab.jsx  (+ src/hooks/useBrailleGerador.js)
//   Blocos Ionicos   -> src/tabs/BlocosIonicosTab.jsx   (+ src/hooks/useBlocoIonico.js)
//   Sobre o Projeto  -> src/tabs/SobreProjetoTab.jsx
//   Instrucoes       -> src/tabs/InstrucoesTab.jsx
//   Saiba Mais       -> src/tabs/SaibaMaisTab.jsx
//   Parcerias        -> src/tabs/ParceriasTab.jsx
//   Equipe           -> src/tabs/EquipeTab.jsx
//   Achou um Bug?    -> src/tabs/BugTab.jsx
//
// Para adicionar/remover/reordenar uma aba no menu, edite `src/data/tabs.js`
// e adicione o `case` correspondente no `switch` abaixo.
// ============================================================================


export default function App() {
  const [corPrincipal, setCorPrincipal] = useState('#511576');
  const theme = getTheme(corPrincipal);
  const [autoRotate, setAutoRotate] = useState(false);

  const gerador = useBrailleGerador();
  const ionico = useBlocoIonico(corPrincipal);

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-slate-800 transition-colors duration-500" style={{ backgroundColor: theme.fundoPrincipal }}>
        <Header theme={theme} />
        
        {/* O Navigation não recebe mais activeTab/setActiveTab, ele lerá a URL atual via React Router */}
        <Navigation theme={theme} />

        <main className="flex-grow p-4 sm:p-6 w-full max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/gerador" replace />} />
            
            <Route path="/gerador" element={<GeradorBrailleTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} autoRotate={autoRotate} setAutoRotate={setAutoRotate} gerador={gerador} />} />
            <Route path="/ionicos" element={<BlocosIonicosTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} autoRotate={autoRotate} setAutoRotate={setAutoRotate} ionico={ionico} />} />
            
            <Route path="/dados-radioativos" element={<DadosRadioativosTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/giroscopios" element={<GiroscopiosTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/dados-ionicos" element={<DadosIonicosTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/reguas" element={<ReguasQuimicasTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/geometria" element={<GeometriaMolecularTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/carimbos" element={<CarimbosAtomicosTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/spinner" element={<SpinnerElementarTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            
            <Route path="/sobre" element={<SobreProjetoTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/instrucoes" element={<InstrucoesTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/saiba-mais" element={<SaibaMaisTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/parcerias" element={<ParceriasTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/equipe" element={<EquipeTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            <Route path="/bug" element={<BugTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />} />
            
            {/* Fallback de erro */}
            <Route path="*" element={<Navigate to="/gerador" replace />} />
          </Routes>
        </main>

        <Footer theme={theme} />
        {/* === ADIÇÃO DO COMPONENTE ANALYTICS DO VERCEL === */}
        <Analytics />
        
      </div>
    </Router>
  );
}

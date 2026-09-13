import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TABS } from '../../data/tabs';

export default function Navigation({ theme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Captura a URL atual e remove a barra inicial ("/") para comparar com o ID no TABS
  const location = useLocation();
  const activeTabId = location.pathname.substring(1) || 'gerador';

  return (
    <nav aria-label="Navegação Principal do Projeto" className="shadow-md sticky top-0 z-40 transition-colors duration-500" style={{ backgroundColor: theme.abaNormal }}>
      <div role="tablist" className="max-w-5xl mx-auto flex flex-wrap justify-start w-full px-2 sm:px-0 relative">
        {TABS.map((tab) => {
          const isSubActive = tab.subItems && tab.subItems.some(sub => sub.id === activeTabId);
          const isActive = activeTabId === tab.id || isSubActive;

          if (tab.subItems) {
            return (
              <div 
                key={tab.id}  className="relative group" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}
              >
                {/* O botão principal do dropdown permanece como button pois ele não navega, apenas abre o menu */}
                <button
                  role="tab" aria-expanded={dropdownOpen} className="whitespace-nowrap px-3 sm:px-5 py-3 sm:py-4 text-[12px] sm:text-[14px] font-semibold transition-all duration-300 border-b-4 h-full flex items-center gap-1"
                  style={{ backgroundColor: isActive ? theme.abaAtiva : 'transparent', color: isActive ? theme.textoAba : theme.textoAbaNormal, borderColor: isActive ? theme.textoAba : 'transparent' }}
                >
                  {tab.label} ▾
                </button>

                {/* Novo Menu Suspenso, no estilo Dropdown para os materiais didaticos e mateiais de acessibilidade */}
                <div 
                  className={`absolute left-0 top-full w-64 shadow-xl transition-all duration-200 z-50 flex flex-col rounded-b-lg overflow-hidden border ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                  style={{ backgroundColor: theme.abaAtiva, borderColor: theme.corPrincipal }}
                >
                  {tab.subItems.map((subTab) => (
                    <Link  
                      key={subTab.id}  
                      to={`/${subTab.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="text-left px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/20 block"
                      style={{ color: activeTabId === subTab.id ? '#ffffff' : 'rgba(255,255,255,0.85)', backgroundColor: activeTabId === subTab.id ? 'rgba(255,255,255,0.15)' : 'transparent'  }}
                    >
                      {subTab.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={tab.id} role="tab" aria-selected={isActive} to={`/${tab.id}`}
              className="whitespace-nowrap px-3 sm:px-5 py-3 sm:py-4 text-[12px] sm:text-[14px] font-semibold transition-all duration-300 border-b-4 h-full flex items-center"
              style={{  backgroundColor: isActive ? theme.abaAtiva : 'transparent',  color: isActive ? theme.textoAba : theme.textoAbaNormal,  borderColor: isActive ? theme.textoAba : 'transparent'}}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

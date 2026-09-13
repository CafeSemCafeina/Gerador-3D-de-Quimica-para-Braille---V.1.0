// Importação "Imagens Legado" (mantida para referência futura)
import { logoPrincipal } from '../../data/assets';

// NOVA Importação da nova logo oficial do projeto Química Ao Alcance Das Mãos em parceria com o projeto Atomizando UFRJ
import logoNovaLuva from '../../assets/Logo-luva-branca-Química-ao-Alcance-das-Mãos.webp';

const Header = ({ theme }) => {
  // ============================================================================
  // CÓDIGO LEGADO: Mantém a lógica antiga viva na memória do código.
  // Calcula qual seria a logo colorida (azul, amarela, vermelha...) baseada 
  // na paleta do momento, caso o projeto queira voltar a esse sistema no futuro.
  // ============================================================================
  const logoLegada = theme.logo || logoPrincipal;
  
  // ============================================================================
  // NOVA LÓGICA: Força a logo selecionada a ser sempre a da Luva Branca,
  // ignorando a troca de cores do tema para a imagem.
  // ============================================================================
  const logoSelecionada = logoNovaLuva;

  return (
    <header className="pt-6 pb-6 sm:pt-10 sm:pb-8 px-4 sm:px-6 z-10 relative transition-colors duration-500 shadow-sm" style={{ backgroundColor: theme.cabecalho }}>
      <div className="max-w-5xl mx-auto flex flex-row items-center justify-start gap-3 sm:gap-6">
        
        <img 
          src={logoSelecionada} 
          alt="Logo Química ao Alcance das Mãos" 
          className="w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain drop-shadow-sm flex-shrink-0 transition-all duration-300"
          data-logo-legada={logoLegada} /* Passa a logo legada como um atributo de dados (invisível) apenas para rastreio */
        />
        
        <div className="text-left flex flex-col justify-center">
          <h1 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Química ao Alcance das Mãos:</h1>
          <h2 className="text-[13px] sm:text-xl md:text-2xl font-medium text-slate-600 mt-0.5 sm:mt-2">Gerador 3D de Química para Braille</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;

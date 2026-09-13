import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { CORES_LINHA_1, CORES_LINHA_2 } from '../../data/theme';

const ColorTester = ({ corPrincipal, setCorPrincipal }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isRainbowMode, setIsRainbowMode] = useState(false);
  const isRoxo = corPrincipal === '#511576' && !isRainbowMode;

  // Lógica do Efeito Arco-Íris (RGB Gamer Dinâmico)
  useEffect(() => {
    let interval;
    if (isRainbowMode) {
      let hue = 0; // Começa no grau 0 (Vermelho)
      
      // Função matemática que converte o grau da roda HSL para código Hexadecimal
      const hslToHex = (h, s, l) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      };

      // Roda a cada 800ms para criar uma transição contínua junto com o CSS duration-500
      interval = setInterval(() => {
        hue = (hue + 20) % 360; // Avança 20 graus continuamente pela roda de cores
        setCorPrincipal(hslToHex(hue, 100, 50)); // Mantém as cores vibrantes (Sat 100%, Lum 50%)
      }, 800); 
    }
    return () => clearInterval(interval);
  }, [isRainbowMode, setCorPrincipal]);

  // Fecha o menu ao dar scroll
  useEffect(() => {
    const handleScroll = () => { if (menuAberto) setMenuAberto(false); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuAberto]);

  // Função para lidar com a seleção de uma cor manual
  const handleColorSelect = (hex) => {
    if (hex === 'rainbow') {
      setIsRainbowMode(true);
    } else {
      setIsRainbowMode(false);
      setCorPrincipal(hex);
    }
    setMenuAberto(false);
  };

  return (
    <div className="relative flex items-center space-x-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full border shadow-sm flex-shrink-0 z-10 transition-colors duration-500" style={{ borderColor: `${corPrincipal}40` }}>
      
      {/* Botão Switch Principal */}
      <button 
        type="button" 
        onClick={() => { setIsRainbowMode(false); setCorPrincipal(isRoxo ? '#0e52c2' : '#511576'); setMenuAberto(false); }} 
        className="w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative focus:outline-none cursor-pointer flex-shrink-0" 
        style={{ backgroundColor: isRoxo ? '#511576' : '#0e52c2' }}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isRoxo ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>

      {/* Ícone da Paleta */}
      <div className="relative">
        <button onClick={() => setMenuAberto(!menuAberto)} className="cursor-pointer text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center p-1">
          <Palette className="w-5 h-5 transition-colors" style={{ color: (!isRoxo && corPrincipal !== '#0e52c2' && !isRainbowMode) ? corPrincipal : undefined }} />
        </button>

        {/* Menu Expandido */}
        {menuAberto && (
          <div className="absolute top-full right-0 mt-2 p-3 bg-white rounded-xl shadow-xl border-2 flex flex-col gap-3 w-max z-50 animate-fadeIn transition-colors duration-500" style={{ borderColor: corPrincipal }}>
            <span className="text-[11px] font-bold text-slate-500 uppercase px-1">Cores Predefinidas</span>
            
            {/* Linha 1 */}
            <div className="flex flex-nowrap items-center gap-2 px-1">
              {CORES_LINHA_1.map(c => (
                <button 
                  key={c.nome} 
                  type="button" 
                  onClick={() => handleColorSelect(c.hex)} 
                  className={`w-7 h-7 rounded-full shadow-sm hover:scale-110 transition-transform flex-shrink-0 ${corPrincipal === c.hex && !isRainbowMode ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`} 
                  style={{ backgroundColor: c.hex }} 
                  title={c.nome} 
                />
              ))}
            </div>

            {/* Linha 2 */}
            <div className="flex flex-nowrap items-center gap-2 px-1 mt-1">
              {CORES_LINHA_2.map(c => (
                <button 
                  key={c.nome} 
                  type="button" 
                  onClick={() => handleColorSelect(c.hex)} 
                  className={`w-7 h-7 rounded-full shadow-sm hover:scale-110 transition-transform flex-shrink-0 ${(corPrincipal === c.hex && !isRainbowMode) || (c.hex === 'rainbow' && isRainbowMode) ? 'ring-2 ring-offset-2 ring-slate-400' : ''} ${c.hex === '#ffffff' ? 'border border-slate-300' : ''}`} 
                  style={c.hex === 'rainbow' ? { background: 'linear-gradient(to bottom right, red, orange, yellow, green, blue, indigo, violet)' } : { backgroundColor: c.hex }} 
                  title={c.nome} 
                />
              ))}
            </div>

            <div className="border-t border-slate-100 my-1"></div>
            
            {/* Seletor Livre RGB */}
            <label className="flex items-center justify-between px-1 cursor-pointer hover:bg-slate-50 rounded p-1.5 transition-colors">
              <span className="text-xs font-semibold text-slate-600">Cor Livre (RGB)</span>
              <input 
                type="color" 
                value={isRainbowMode ? '#000000' : corPrincipal} 
                onChange={(e) => { setIsRainbowMode(false); setCorPrincipal(e.target.value); }} 
                className="w-7 h-7 rounded cursor-pointer border-0 p-0 shadow-sm" 
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorTester;

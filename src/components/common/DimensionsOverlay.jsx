const DimensionsOverlay = ({ dimensions, isVisible }) => {
  if (!dimensions || !isVisible) return null;
  return (
    <div className="absolute top-4 left-4 z-10 bg-slate-900/85 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-xl text-white select-none pointer-events-none transition-opacity duration-300">
      <h4 className="text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider text-center">Dimensões Totais</h4>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div><span className="block text-[10px] text-red-400 font-bold mb-0.5">X (Larg)</span><span className="font-mono font-bold text-[13px]">{dimensions.x}<span className="text-[9px] ml-0.5">mm</span></span></div>
        <div><span className="block text-[10px] text-green-400 font-bold mb-0.5">Y (Alt)</span><span className="font-mono font-bold text-[13px]">{dimensions.y}<span className="text-[9px] ml-0.5">mm</span></span></div>
        <div><span className="block text-[10px] text-blue-400 font-bold mb-0.5">Z (Esp)</span><span className="font-mono font-bold text-[13px]">{dimensions.z}<span className="text-[9px] ml-0.5">mm</span></span></div>
      </div>
    </div>
  );
};

export default DimensionsOverlay;

const Dot = ({ active }) => (
  <div className={`w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full transition-colors duration-300 ${active ? 'bg-slate-800 shadow-sm' : 'bg-transparent border-[1.5px] sm:border-2 border-slate-200'}`} />
);

const BrailleCell = ({ dots, label, description }) => {
  return (
    <div className="flex flex-col items-center sm:mx-1 sm:mb-4" role="group" aria-label={`Cela Braille: ${description}`}>
      <div className="grid grid-cols-2 gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-white rounded-md shadow-sm" aria-hidden="true">
        <Dot active={dots.includes(1)} /> <Dot active={dots.includes(4)} />
        <Dot active={dots.includes(2)} /> <Dot active={dots.includes(5)} />
        <Dot active={dots.includes(3)} /> <Dot active={dots.includes(6)} />
      </div>
      <div className="mt-1.5 sm:mt-2 text-center flex flex-col items-center justify-center">
        <span className="block text-[11px] sm:text-sm font-bold text-slate-700 h-3 sm:h-5 leading-none">{label}</span>
        <span className="block text-[9px] sm:text-xs text-slate-500 w-[50px] sm:w-16 leading-tight break-words">{description}</span>
      </div>
    </div>
  );
};

export default BrailleCell;

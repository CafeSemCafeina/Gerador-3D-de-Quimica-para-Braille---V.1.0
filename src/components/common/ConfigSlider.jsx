const ConfigSlider = ({ label, value, min, max, step, unit, onChange, cor }) => (
  <div className="flex flex-col">
    <div className="flex justify-between items-center mb-1">
      <label className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase">{label}</label>
      <span className="text-xs font-mono px-2 py-0.5 rounded transition-colors" style={{ color: cor, backgroundColor: `${cor}1A`, border: `1px solid ${cor}33` }}>
        {value} {unit}
      </span>
    </div>
    <input
      type="range" min={min} max={max} step={step}
      value={value} onChange={onChange}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
      style={{ accentColor: cor }}
    />
  </div>
);

export default ConfigSlider;

"use client";
import React, { useState } from 'react';

interface Paso3Props {
  estudianteNombre: string;
}

export default function Paso3_Atlas_P2({ estudianteNombre }: Paso3Props) {
  const [aumento, setAumento] = useState('10X');
  const [campoFoco, setCampoFoco] = useState(50);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-2 uppercase">Estación 03</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">Atlas Histológico Virtual Integrado</h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">Explore las colecciones de preparaciones tisulares humanas bajo diferentes magnificaciones ópticas. Ajuste el micrómetro virtual para enfocar las estructuras clave de diagnóstico.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* PANEL DEL SIMULADOR MICROSCÓPICO */}
        <div className="flex-1 bg-black/40 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[300px] lg:min-h-[400px]">
          {!estudianteNombre && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">⚠️ Restricción de Muestra</span>
              <p className="text-xs text-slate-400 mt-1">Identifíquese en la Estación 01 para activar la iluminación del microscopio.</p>
            </div>
          )}

          {/* SIMULACIÓN DE CAMPO DE OBSERVACIÓN CIRCULAR (ÓPTICO) */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-slate-800 bg-slate-950 relative overflow-hidden shadow-2xl flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent mix-blend-overlay pointer-events-none"></div>
            <div className="text-center p-6 text-slate-700 text-xs font-mono">
              [Campo Óptico Activado]<br/>
              Aumento actual: <span className="text-cyan-400 font-bold">{aumento}</span><br/>
              Foco óptico: {campoFoco}%
            </div>
          </div>
        </div>

        {/* CONTROLES DE LA REVOLVER Y ENFOQUE */}
        <div className="w-full lg:w-1/3 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3 border-b border-slate-800 pb-2">Controles del Revólver</h3>
            <div className="grid grid-cols-3 gap-2">
              {['4X', '10X', '40X'].map((x) => (
                <button key={x} onClick={() => setAumento(x)} className={`p-2.5 rounded-lg font-mono text-xs font-bold transition-all ${aumento === x ? 'bg-cyan-600 text-white shadow-md border border-cyan-400' : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'}`}>
                  {x}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 border-b border-slate-800 pb-2">Tornillo Micrométrico (Foco)</h3>
            <input type="range" min="0" max="100" value={campoFoco} onChange={(e) => setCampoFoco(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>Mínimo</span>
              <span className="text-cyan-400 font-bold">{campoFoco}%</span>
              <span>Máximo</span>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl text-[11px] text-slate-400 leading-normal">
            <strong className="text-amber-400">Consejo Técnico:</strong> Al cambiar a 40X (alta resolución), utilice el control micrométrico para ajustar la nitidez de las membranas nucleares unidas.
          </div>
        </div>
      </div>
    </div>
  );
}
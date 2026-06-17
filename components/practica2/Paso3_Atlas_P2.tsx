"use client";
import React, { useState } from 'react';

interface Paso3Props {
  estudianteNombre: string;
}

export default function Paso3_Atlas_P2({ estudianteNombre }: Paso3Props) {
  const [encendido, setEncendido] = useState(false);
  const [intensidadLuz, setIntensidadLuz] = useState(0);
  const [aumento, setAumento] = useState('4X');
  const [carroX, setCarroX] = useState(50);
  const [carroY, setCarroY] = useState(50);
  const [micrometrico, setMicrometrico] = useState(20);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-2 animate-fadeIn">
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-1 uppercase">Estación 03</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Simulación Mecánica y Operación del Microscopio Óptico</h1>
        <p className="text-slate-400 text-xs md:text-sm">Manipule los componentes coaxiales del equipo virtual. Calibre el reóstato lumínico y desplace la platina mecánica para localizar los campos celulares de interés diagnóstico.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* CAMPO DE VISUALIZACIÓN ÓPTICA */}
        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[350px] lg:min-h-[400px] shadow-inner">
          
          <div className="absolute top-4 left-4 right-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-[11px] text-slate-400 leading-tight z-10 text-center">
            💡 <strong className="text-cyan-400">Guía de Operación Autónoma:</strong> 1. Encienda el interruptor (ON). 2. Eleve el potenciómetro de luz sobre el 50%. 3. Varíe los mandos coaxiales de la platina (Ejes X / Y) para desplazar el cuadrante del corte histológico.
          </div>

          {!estudianteNombre && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-amber-400 text-xs font-bold uppercase">⚠️ Sistema Platina Bloqueado</span>
              <p className="text-[11px] text-slate-500 mt-1">Habilite el protocolo de bioseguridad en la Estación 01 para energizar el estativo.</p>
            </div>
          )}

          <div 
            className="w-60 h-60 md:w-72 md:h-72 rounded-full border-[6px] border-slate-800 relative overflow-hidden transition-all duration-300 shadow-2xl flex items-center justify-center"
            style={{
              backgroundColor: encendido ? `rgba(254, 243, 199, ${intensidadLuz / 100})` : '#020617',
              boxShadow: encendido ? `0 0 ${intensidadLuz / 2}px rgba(251, 191, 36, 0.15)` : 'none'
            }}
          >
            {encendido && intensidadLuz > 15 ? (
              <div 
                className="text-center font-mono text-xs transition-all duration-300 p-4"
                style={{ 
                  filter: `blur(${Math.abs(micrometrico - 50) / 8}px)`,
                  transform: `translate(${carroX - 50}px, ${carroY - 50}px) scale(${aumento === '4X' ? 1 : aumento === '10X' ? 1.8 : 3.8})`,
                  color: intensidadLuz > 70 ? '#000' : '#fff'
                }}
              >
                <div className="font-black text-[12px] uppercase tracking-wider">Tejido Humano USTA</div>
                <div className="text-[9px] mt-1 opacity-70">Platina Coaxial X:{carroX}mm | Y:{carroY}mm</div>
              </div>
            ) : (
              <span className="text-slate-800 font-mono text-[9px] uppercase tracking-widest font-bold">Luz Insuficiente / Diafragma Cerrado</span>
            )}
            <div className="absolute inset-0 border border-black/20 rounded-full pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.85)]"></div>
          </div>
        </div>

        {/* PANEL DE MANDOS COAXIALES MECÁNICOS */}
        <div className="w-full lg:w-1/3 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4 backdrop-blur-md">
          
          {/* CONTROL ELÉCTRICO */}
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Sub-platina / Lámpara</span>
              <button 
                onClick={() => { setEncendido(!encendido); setIntensidadLuz(!encendido ? 40 : 0); }}
                className={`px-3 py-1 rounded font-mono text-[9px] font-black transition-all ${encendido ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'bg-slate-800 text-slate-400'}`}
              >
                {encendido ? "ON" : "OFF"}
              </button>
            </div>
            <label className="block text-[9px] text-slate-500 uppercase font-mono mb-1">Reóstato de Iluminación</label>
            <input type="range" min="0" max="100" disabled={!encendido} value={intensidadLuz} onChange={(e) => setIntensidadLuz(Number(e.target.value))} className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-amber-500 disabled:opacity-20" />
          </div>

          {/* CONTROL DEL CARRO COAXIAL */}
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 space-y-2.5">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-1">Mandos Coaxiales (Platina)</h4>
            <div>
              <label className="flex justify-between text-[9px] text-slate-400 font-mono mb-1"><span>Desplazamiento Transversal (Eje X)</span> <span className="text-cyan-400">{carroX}mm</span></label>
              <input type="range" min="15" max="85" value={carroX} onChange={(e) => setCarroX(Number(e.target.value))} className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-cyan-500" />
            </div>
            <div>
              <label className="flex justify-between text-[9px] text-slate-400 font-mono mb-1"><span>Desplazamiento Vertical (Eje Y)</span> <span className="text-cyan-400">{carroY}mm</span></label>
              <input type="range" min="15" max="85" value={carroY} onChange={(e) => setCarroY(Number(e.target.value))} className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-cyan-500" />
            </div>
          </div>

          {/* AJUSTES ÓPTICOS */}
          <div className="space-y-3">
            <div>
              <label className="block text-[9px] text-slate-500 uppercase font-mono mb-1">Cambiador de Objetivos (Revólver)</label>
              <div className="grid grid-cols-3 gap-2">
                {['4X', '10X', '40X'].map((x) => (
                  <button key={x} onClick={() => setAumento(x)} className={`p-2 rounded text-[10px] font-mono font-black ${aumento === x ? 'bg-cyan-600 text-white border border-cyan-400 shadow-md' : 'bg-slate-950/60 text-slate-500 border border-slate-800'}`}>{x}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex justify-between text-[9px] text-slate-400 font-mono mb-1"><span>Enfoque Fino (Tornillo Micrométrico)</span> <span className="text-teal-400">{micrometrico}%</span></label>
              <input type="range" min="0" max="100" value={micrometrico} onChange={(e) => setMicrometrico(Number(e.target.value))} className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-teal-400" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
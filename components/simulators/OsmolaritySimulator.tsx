/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.6.1
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * BIOPHYSICS MEMBRANE ENGINE: SIMULADOR DE FLUJO OSMÓTICO Y TONICIDAD ELECTROLÍTICA
 * ============================================================================
 */

"use client";
import React, { useState, useEffect } from 'react';

interface OsmolaritySimulatorProps {
  onConsolidarMuestra?: (id: string, datos: any) => void;
  estudianteNombre?: string;
}

interface SolucionElectrolitica {
  concentracion: string;
  osmolaridad: number;
  estado: 'Hipotónico' | 'Isotónico' | 'Hipertónico';
  descripcionEritrocito: string;
  descripcionElodea: string;
  fenomenoAnimal: 'Hemólisis / Lisis Osmótica' | 'Homeostasis / Normal' | 'Crenación / Deshidratación';
  fenomenoVegetal: 'Turgencia Extrema' | 'Equilibrio Dinámico' | 'Plasmólisis / Retracción';
}

const matrizSoluciones: Record<string, SolucionElectrolitica> = {
  '0.4': {
    concentracion: 'NaCl al 0.4% (Medio Hipotónico)',
    osmolaridad: 136,
    estado: 'Hipotónico',
    descripcionEritrocito: 'El agua entra masivamente por gradiente osmótico a través de acuaporinas. Debido a la ausencia de pared celular, el eritrocito sufre una distensión crítica de su membrana hasta la ruptura.',
    descripcionElodea: 'El agua entra con fuerza hacia la gran vacuola central. La presión hidrostática (presión de turgencia) empuja el protoplasto firmemente contra la pared celular rígida, la cual contiene la presión sin romperse.',
    fenomenoAnimal: 'Hemólisis / Lisis Osmótica',
    fenomenoVegetal: 'Turgencia Extrema'
  },
  '0.9': {
    concentracion: 'NaCl al 0.9% / Solución Fisiológica (Medio Isotónico)',
    osmolaridad: 308,
    estado: 'Isotónico',
    descripcionEritrocito: 'Existe un equilibrio dinámico; el flujo neto de agua es cero. El eritrocito mantiene su morfología óptima de disco bicóncavo acidófilo, garantizando el transporte de gases.',
    descripcionElodea: 'Las concentraciones intra y extracelulares están equilibradas. Los cloroplastos se distribuyen de manera uniforme y regular en el citoplasma adosado a los límites celulares.',
    fenomenoAnimal: 'Homeostasis / Normal',
    fenomenoVegetal: 'Equilibrio Dinámico'
  },
  '10': {
    concentracion: 'NaCl al 10% (Medio Hipertónico)',
    osmolaridad: 3422,
    estado: 'Hipertónico',
    descripcionEritrocito: 'La elevada concentración de solutos externos provoca la salida masiva de agua intracelular. La membrana celular colapsa arrugándose y formando proyecciones espiculadas características.',
    descripcionElodea: 'La vacuola central pierde toda el agua hacia el exterior. El citoplasma y la membrana plasmática se retraen drásticamente, desprendiéndose de la pared celular. Los cloroplastos quedan aglomerados en el centro.',
    fenomenoAnimal: 'Crenación / Deshidratación',
    fenomenoVegetal: 'Plasmólisis / Retracción'
  }
};

export default function OsmolaritySimulator({ onConsolidarMuestra, estudianteNombre }: OsmolaritySimulatorProps) {
  const [modelType, setModelType] = useState<'erythrocyte' | 'elodea'>('erythrocyte');
  const [concentracionSalina, setConcentracionSalina] = useState<string>('0.9');
  const [objetivoAumento, setObjetivoAumento] = useState<'40X' | '100X'>('100X');

  const solucionActual = matrizSoluciones[concentracionSalina];

  useEffect(() => {
    if (modelType === 'erythrocyte') setObjetivoAumento('100X');
    else setObjetivoAumento('40X');
  }, [modelType]);

  const registrarMuestraActual = () => {
    if (onConsolidarMuestra) {
      onConsolidarMuestra(modelType, {
        concentracion: concentracionSalina,
        osmolaridad: solucionActual.osmolaridad,
        estadoElectrolitico: solucionActual.estado,
        fenomenoObservado: modelType === 'erythrocyte' ? solucionActual.fenomenoAnimal : solucionActual.fenomenoVegetal
      });
      alert(`🔬 Fenómeno de ${modelType === 'erythrocyte' ? solucionActual.fenomenoAnimal : solucionActual.fenomenoVegetal} consolidado para el reporte de la Práctica 4.`);
    }
  };

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl font-sans select-none">
      
      {/* HEADER: MICRO-HUD DIGITAL */}
      <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-slate-300 text-xs font-mono tracking-widest uppercase">
            Óptica Campo Claro • Lente Objetivo: {objetivoAumento} {modelType === 'erythrocyte' ? '• Aceite de Inmersión' : ''}
          </span>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            type="button"
            onClick={() => setModelType('erythrocyte')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono uppercase tracking-wider transition-all ${modelType === 'erythrocyte' ? 'bg-indigo-600 text-white border border-indigo-400' : 'bg-slate-950 border border-slate-800 text-slate-400'}`}
          >
            Modelo Animal (Eritrocitos)
          </button>
          <button 
            type="button"
            onClick={() => setModelType('elodea')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono uppercase tracking-wider transition-all ${modelType === 'elodea' ? 'bg-indigo-600 text-white border border-indigo-400' : 'bg-slate-950 border border-slate-800 text-slate-400'}`}
          >
            Modelo Vegetal (Elodea)
          </button>
        </div>
      </div>

      {/* ÁREA INTERACTIVA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
        
        {/* PANEL LATERAL */}
        <div className="lg:col-span-4 bg-slate-900/30 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <span className="text-[9px] text-indigo-400 font-mono font-black uppercase tracking-widest block">Bomba de Perfusión Osmótica</span>
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Seleccione la solución salina:</h3>
            
            <div className="flex flex-col gap-2">
              {Object.keys(matrizSoluciones).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setConcentracionSalina(key)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all duration-200 ${
                    concentracionSalina === key 
                      ? 'border-indigo-500 bg-indigo-950/20 text-white font-bold shadow-lg ring-1 ring-indigo-500/30' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {matrizSoluciones[key].concentracion}
                </button>
              ))}
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl font-mono text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Osmolaridad:</span>
                <span className="text-slate-300 font-bold">{solucionActual.osmolaridad} mOsm/L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tonicidad:</span>
                <span className={`font-black uppercase ${solucionActual.estado === 'Isotónico' ? 'text-emerald-400' : solucionActual.estado === 'Hipotónico' ? 'text-cyan-400' : 'text-rose-400'}`}>{solucionActual.estado}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/80 p-3 rounded-xl space-y-1.5">
            <span className="text-[9px] text-indigo-400 font-mono font-black uppercase block tracking-wider">Cinética de Flujo de Agua (Acuaporinas):</span>
            <p className="text-slate-300 text-[11px] leading-relaxed text-justify italic">
              {modelType === 'erythrocyte' ? solucionActual.descripcionEritrocito : solucionActual.descripcionElodea}
            </p>
          </div>
        </div>

        {/* CONTENEDOR ÓPTICO */}
        <div className="lg:col-span-8 bg-[#040406] flex flex-col items-center justify-center p-6 relative overflow-hidden">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(63,63,150,0.18)_0%,rgba(2,2,5,1)_80%)] z-0"></div>

          <div className={`relative z-10 transition-all duration-[1500ms] ease-in-out flex items-center justify-center ${
            solucionActual.estado === 'Hipotónico' ? 'scale-[1.25]' : solucionActual.estado === 'Hipertónico' ? 'scale-[0.82]' : 'scale-100'
          }`}>
            
            {modelType === 'erythrocyte' ? (
              <div className={`transition-all duration-[1500ms] ease-in-out flex items-center justify-center relative
                ${solucionActual.estado === 'Isotónico' ? 'w-44 h-44 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 shadow-[inset_0_0_25px_rgba(100,0,0,0.8),0_0_20px_rgba(225,29,72,0.2)]' : ''}
                ${solucionActual.estado === 'Hipotónico' ? 'w-56 h-56 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 opacity-30 border-2 border-dashed border-rose-400/40 blur-[2px]' : ''}
                ${solucionActual.estado === 'Hipertónico' ? 'w-36 h-36 bg-rose-700 rounded-br-[30%] rounded-tl-[25%] rounded-tr-[35%] rounded-bl-[15%] border-[3px] border-rose-900 shadow-[inset_0_0_20px_rgba(50,0,0,0.9)]' : ''}
              `}>
                {solucionActual.estado === 'Isotónico' && (
                  <div className="w-20 h-20 bg-rose-600/50 rounded-full shadow-[inset_0_0_12px_rgba(150,0,0,0.6)] blur-[1px]"></div>
                )}
                {solucionActual.estado === 'Hipotónico' && (
                  <span className="text-[10px] font-black text-rose-300 font-mono uppercase tracking-widest text-center animate-ping">Lisis / Hemólisis</span>
                )}
                {solucionActual.estado === 'Hipertónico' && (
                  <div className="absolute inset-2 flex items-center justify-center">
                    <span className="text-[8px] font-black text-rose-200 font-mono uppercase tracking-tighter">Crenación</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-64 h-72 border-[4px] border-emerald-900 bg-emerald-950/20 shadow-[inset_0_0_30px_rgba(0,40,0,0.6)] flex items-center justify-center rounded-sm">
                <div className={`transition-all duration-[1500ms] ease-in-out border-2 border-emerald-500/40 bg-emerald-800/20 flex items-center justify-center relative
                  ${solucionActual.estado === 'Hipertónico' ? 'w-28 h-32 rounded-[2rem] border-emerald-600/60 bg-emerald-900/40' : 'w-[98%] h-[98%]'}
                  ${solucionActual.estado === 'Hipotónico' ? 'bg-emerald-700/40' : ''}
                `}>
                  <div className={`transition-all duration-[1500ms] ease-in-out bg-gradient-to-br from-cyan-900/20 to-cyan-700/30 border border-cyan-500/20 rounded-xl blur-[0.5px]
                    ${solucionActual.estado === 'Hipotónico' ? 'w-[92%] h-[92%] border-cyan-400/40' : ''}
                    ${solucionActual.estado === 'Isotónico' ? 'w-[75%] h-[80%]' : ''}
                    ${solucionActual.estado === 'Hipertónico' ? 'w-10 h-10 rounded-full' : ''}
                  `}></div>

                  {/* Cloroplastos estables sin caracteres de escape corruptos */}
                  <div className={`absolute bg-emerald-500/70 border border-emerald-400 shadow-sm rounded-full transition-all duration-[1500ms] ${solucionActual.estado === 'Hipertónico' ? 'top-12 left-10 w-4 h-4' : 'top-4 left-6 w-5 h-5'}`}></div>
                  <div className={`absolute bg-emerald-500/70 border border-emerald-400 shadow-sm rounded-full transition-all duration-[1500ms] ${solucionActual.estado === 'Hipertónico' ? 'bottom-10 right-10 w-4 h-4' : 'bottom-6 right-8 w-6 h-4 rotate-45'}`}></div>
                  <div className={`absolute bg-emerald-500/70 border border-emerald-400 shadow-sm rounded-full transition-all duration-[1500ms] ${solucionActual.estado === 'Hipertónico' ? 'top-14 right-10 w-3 h-3' : 'top-12 right-12 w-4 h-4'}`}></div>
                </div>
                <div className="absolute top-2 left-2 text-[8px] font-mono font-bold text-emerald-700 uppercase tracking-widest">Pared Celular</div>
              </div>
            )}
          </div>

          <div className="w-full max-w-md mt-6 z-10">
            <button
              type="button"
              onClick={registrarMuestraActual}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-mono text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-950/40 border border-indigo-400/20"
            >
              Consolidar Fenómeno Clínico de Tonicidad
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
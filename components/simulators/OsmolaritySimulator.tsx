/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.6.2
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
  const [isIncubating, setIsIncubating] = useState<boolean>(false);

  const solucionActual = matrizSoluciones[concentracionSalina];

  useEffect(() => {
    if (modelType === 'erythrocyte') {
      setObjetivoAumento('100X');
    } else {
      setObjetivoAumento('40X');
    }
  }, [modelType]);

  useEffect(() => {
    setIsIncubating(true);
    const timer = setTimeout(() => setIsIncubating(false), 800);
    return () => clearTimeout(timer);
  }, [concentracionSalina, modelType]);

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

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica BioLab: El copiado y pegado externo está deshabilitado para garantizar el rigor evaluativo individual.");
  };

  return (
    <div 
      className="w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl font-sans select-none"
      onPaste={prevenirFraude}
      onDrop={prevenirFraude}
    >
      {/* HEADER: MICRO-HUD DIGITAL */}
      <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isIncubating ? 'bg-amber-500 animate-ping' : 'bg-indigo-500 animate-pulse'}`}></div>
          <span className="text-slate-300 text-xs font-mono tracking-widest uppercase">
            {isIncubating ? 'Estabilizando Gradiente Osmótico...' : `Óptica Campo Claro • Lente Objetivo: ${objetivoAumento} ${modelType === 'erythrocyte' ? '• Aceite de Inmersión' : ''}`}
          </span>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            type="button"
            onClick={() => setModelType('erythrocyte')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider transition-all duration-200 ${modelType === 'erythrocyte' ? 'bg-indigo-600 text-white border border-indigo-400 shadow-md shadow-indigo-950/50' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
          >
            Modelo Animal (Eritrocitos)
          </button>
          <button 
            type="button"
            onClick={() => setModelType('elodea')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider transition-all duration-200 ${modelType === 'elodea' ? 'bg-indigo-600 text-white border border-indigo-400 shadow-md shadow-indigo-950/50' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
          >
            Modelo Vegetal (Elodea)
          </button>
        </div>
      </div>

      {/* ÁREA INTERACTIVA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
        
        {/* PANEL LATERAL */}
        <div className="lg:col-span-4 bg-slate-900/20 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[9px] text-indigo-400 font-mono font-black uppercase tracking-widest block">Bomba de Perfusión Osmótica</span>
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Seleccione la solución salina:</h3>
            
            <div className="flex flex-col gap-2.5">
              {Object.keys(matrizSoluciones).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setConcentracionSalina(key)}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all duration-300 ${
                    concentracionSalina === key 
                      ? 'border-indigo-500 bg-indigo-950/30 text-white font-bold shadow-lg ring-1 ring-indigo-500/30' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:bg-slate-900/30'
                  }`}
                >
                  <div className="font-semibold">{matrizSoluciones[key].concentracion}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl font-mono text-xs space-y-2.5 shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Osmolaridad Muestra:</span>
                <span className="text-indigo-300 font-bold">{solucionActual.osmolaridad} mOsm/L</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                <span className="text-slate-500">Tonicidad Celular:</span>
                <span className={`font-black uppercase tracking-wider px-2 py-0.5 rounded text-[10px] ${
                  solucionActual.estado === 'Isotónico' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                  solucionActual.estado === 'Hipotónico' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 
                  'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>{solucionActual.estado}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2 shadow-sm">
            <span className="text-[9px] text-indigo-400 font-mono font-black uppercase block tracking-wider border-b border-slate-900 pb-1">Cinética del Canal O osmotic (Acuaporinas):</span>
            <p className="text-slate-300 text-[11px] leading-relaxed text-justify italic">
              {modelType === 'erythrocyte' ? solucionActual.descripcionEritrocito : solucionActual.descripcionElodea}
            </p>
          </div>
        </div>

        {/* CONTENEDOR ÓPTICO DE CAMPO CLARO */}
        <div className="lg:col-span-8 bg-[#030305] flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-[400px]">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(63,63,180,0.12)_0%,rgba(2,2,4,1)_85%)] z-0"></div>
          
          {/* Retícula del Microscopio */}
          <div className="absolute border border-slate-800/20 rounded-full w-[340px] h-[340px] pointer-events-none z-10 flex items-center justify-center">
            <div className="absolute border border-slate-800/10 rounded-full w-[200px] h-[200px]"></div>
            <div className="w-full h-[1px] bg-slate-900/30 absolute"></div>
            <div className="h-full w-[1px] bg-slate-900/30 absolute"></div>
          </div>

          {isIncubating ? (
            <div className="z-20 text-center space-y-2 font-mono">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Ajustando foco óptico...</span>
            </div>
          ) : (
            <div className={`relative z-10 transition-all duration-[1200ms] ease-out flex items-center justify-center ${
              solucionActual.estado === 'Hipotónico' ? 'scale-[1.18]' : solucionActual.estado === 'Hipertónico' ? 'scale-[0.88]' : 'scale-100'
            }`}>
              
              {/* MODELO ERITROCITO */}
              {modelType === 'erythrocyte' ? (
                <div className="relative flex items-center justify-center">
                  {solucionActual.estado === 'Isotónico' && (
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-rose-800 shadow-[inset_0_0_30px_rgba(80,0,0,0.85),0_0_25px_rgba(225,29,72,0.15)] flex items-center justify-center animate-pulse">
                      <div className="w-22 h-22 bg-rose-700/60 rounded-full border border-rose-800/40 shadow-[inset_0_0_15px_rgba(120,0,0,0.7)] blur-[0.5px]"></div>
                    </div>
                  )}

                  {solucionActual.estado === 'Hipotónico' && (
                    <div className="w-60 h-60 rounded-full border-2 border-dashed border-rose-500/30 bg-rose-950/5 flex items-center justify-center relative">
                      <div className="absolute w-52 h-52 rounded-full bg-rose-600/10 blur-xl animate-ping"></div>
                      <div className="text-center space-y-1 z-10">
                        <span className="text-[10px] font-black text-rose-400 font-mono uppercase tracking-widest block animate-pulse">Membrana Rupturada</span>
                        <span className="text-[9px] text-rose-500/80 font-mono block">Fantasmas de Eritrocito</span>
                      </div>
                    </div>
                  )}

                  {solucionActual.estado === 'Hipertónico' && (
                    <div className="w-40 h-40 bg-gradient-to-br from-rose-700 to-rose-900 border-[3px] border-rose-950 shadow-[inset_0_0_25px_rgba(40,0,0,0.9)] flex items-center justify-center relative
                      rounded-br-[25%] rounded-tl-[30%] rounded-tr-[20%] rounded-bl-[35%] animate-bounce [animation-duration:4s]">
                      <div className="absolute top-2 left-8 w-1 h-3 bg-rose-950/40 rounded-full"></div>
                      <div className="absolute bottom-4 right-6 w-2 h-2 bg-rose-950/40 rounded-full"></div>
                      <div className="absolute top-10 right-4 w-3 h-1 bg-rose-950/40 rounded-full"></div>
                      <span className="text-[9px] font-black text-rose-200/60 font-mono uppercase tracking-tighter">Morfología Espiculada</span>
                    </div>
                  )}
                </div>
              ) : (
                /* MODELO CELULA VEGETAL (ELODEA) */
                <div className="relative w-68 h-76 border-[5px] border-emerald-950 bg-emerald-950/10 shadow-[inset_0_0_40px_rgba(0,30,0,0.7),0_0_20px_rgba(16,185,129,0.05)] flex items-center justify-center rounded-sm">
                  
                  {/* Membrana Celular Interna / Protoplasto */}
                  <div className={`transition-all duration-[1200ms] ease-out border-2 flex items-center justify-center relative
                    ${solucionActual.estado === 'Hipertónico' ? 'w-28 h-36 rounded-[2.5rem] border-emerald-600/60 bg-emerald-900/40 shadow-inner' : 'w-[98%] h-[98%] border-emerald-500/40 bg-emerald-800/10'}
                    ${solucionActual.estado === 'Hipotónico' ? 'bg-emerald-700/20 border-emerald-400/50' : ''}
                  `}>
                    
                    {/* Vacuola Central */}
                    <div className={`transition-all duration-[1200ms] ease-out bg-gradient-to-br from-cyan-900/10 to-cyan-700/20 border border-cyan-500/10 rounded-2xl blur-[0.5px]
                      ${solucionActual.estado === 'Hipotónico' ? 'w-[94%] h-[94%] border-cyan-400/30 bg-cyan-600/10' : ''}
                      ${solucionActual.estado === 'Isotónico' ? 'w-[75%] h-[82%]' : ''}
                      ${solucionActual.estado === 'Hipertónico' ? 'w-8 h-8 rounded-full bg-cyan-950/50 border-cyan-800/40' : ''}
                    `}></div>

                    {/* Cloroplastos Dinámicos según Tonicidad */}
                    <div className={`absolute bg-emerald-500/80 border border-emerald-400/80 shadow-md rounded-full transition-all duration-[1200ms] ${
                      solucionActual.estado === 'Hipertónico' ? 'top-14 left-10 w-4 h-4 z-10' : 'top-4 left-6 w-5 h-5'
                    }`}></div>
                    <div className={`absolute bg-emerald-500/80 border border-emerald-400/80 shadow-md rounded-full transition-all duration-[1200ms] ${
                      solucionActual.estado === 'Hipertónico' ? 'bottom-12 right-10 w-3.5 h-4 z-10' : 'bottom-6 right-8 w-6 h-4.5 rotate-45'
                    }`}></div>
                    <div className={`absolute bg-emerald-500/80 border border-emerald-400/80 shadow-md rounded-full transition-all duration-[1200ms] ${
                      solucionActual.estado === 'Hipertónico' ? 'top-16 right-11 w-4 h-3.5 z-10' : 'top-12 right-12 w-4.5 h-4.5'
                    }`}></div>
                    <div className={`absolute bg-emerald-500/80 border border-emerald-400/80 shadow-md rounded-full transition-all duration-[1200ms] ${
                      solucionActual.estado === 'Hipertónico' ? 'top-10 right-12 w-3.5 h-3.5 z-10' : 'bottom-16 left-4 w-5 h-4 -rotate-12'
                    }`}></div>
                  </div>

                  <div className="absolute top-2.5 left-2.5 text-[8px] font-mono font-bold text-emerald-800/80 uppercase tracking-widest">Pared Celular Hemicelulósica</div>
                  {solucionActual.estado === 'Hipertónico' && (
                    <div className="absolute bottom-2.5 right-2.5 text-[8px] font-mono text-amber-600/80 uppercase tracking-widest animate-pulse">Espacio Plasmolizado</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CONTROL CONSOLIDACIÓN */}
          <div className="w-full max-w-sm mt-6 z-10">
            <button
              type="button"
              onClick={registrarMuestraActual}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-mono text-xs font-black uppercase tracking-widest transition-all duration-200 shadow-xl shadow-indigo-950/50 border border-indigo-400/20 active:scale-[0.98]"
            >
              Consolidar Fenómeno Clínico de Tonicidad
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
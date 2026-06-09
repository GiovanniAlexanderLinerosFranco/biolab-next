"use client";
import React, { useState, useEffect } from 'react';

export default function OsmolaritySimulator() {
  const [cellType, setCellType] = useState('erythrocyte');
  const [osmolarity, setOsmolarity] = useState(300);
  const [cellState, setCellState] = useState('Isotónico');

  useEffect(() => {
    if (osmolarity < 280) setCellState('Hipotónico');
    else if (osmolarity > 320) setCellState('Hipertónico');
    else setCellState('Isotónico');
  }, [osmolarity]);

  return (
    <div className="w-full bg-black border border-slate-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] my-8 font-sans">
      
      {/* HUD del Microscopio */}
      <div className="bg-slate-950/80 border-b border-slate-800/50 p-4 flex justify-between items-center backdrop-blur-md relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-slate-300 text-sm font-mono tracking-widest uppercase">Lente Objetivo 40X / Contraste de Fases</span>
        </div>
        <div className="flex gap-4">
          <select value={cellType} onChange={(e) => setCellType(e.target.value)} 
            className="bg-slate-900 border border-slate-700 text-blue-400 text-xs uppercase tracking-widest font-bold py-2 px-4 rounded-lg outline-none cursor-pointer">
            <option value="erythrocyte">Muestra: Eritrocitos</option>
            <option value="animal">Muestra: Célula animal</option>
            <option value="vegetal">Muestra: Elodea (Vegetal)</option>
          </select>
        </div>
      </div>

      <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-[#0a0a0c]">
        
        {/* Fondo del portaobjetos (Efecto de luz de microscopio) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,60,0.4)_0%,rgba(5,5,10,1)_80%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

        {/* Panel de Inyección de Solución */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl w-[90%] max-w-md z-30">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Perfusión: {osmolarity} mOsm/L</span>
            <span className={cellState === 'Isotónico' ? 'text-emerald-400' : cellState === 'Hipotónico' ? 'text-cyan-400' : 'text-rose-400'}>{cellState.toUpperCase()}</span>
          </div>
          <input type="range" min="50" max="600" step="10" value={osmolarity} onChange={(e) => setOsmolarity(Number(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Célula - Renderizado Realista */}
        <div className={`relative z-10 transition-all duration-[1500ms] ease-in-out flex items-center justify-center
          ${cellState === 'Hipotónico' ? 'scale-[1.35]' : cellState === 'Hipertónico' ? 'scale-75 opacity-80' : 'scale-100'}
        `}>
          {cellType === 'erythrocyte' ? (
            // Eritrocito (Disco bicóncavo con iluminación realista)
            <div className={`transition-all duration-[1500ms] ease-in-out bg-rose-600 shadow-[inset_0_0_30px_rgba(100,0,0,0.9),0_0_20px_rgba(225,29,72,0.3)]
              ${cellState === 'Hipertónico' ? 'w-32 h-32 rounded-br-[25%] rounded-tl-[30%] rounded-tr-[40%] rounded-bl-[20%] border-[3px] border-rose-800/50' : 'w-40 h-40 rounded-full'}
            `}>
              {/* Centro cóncavo más claro */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[1500ms]
                ${cellState === 'Hipotónico' ? 'w-8 h-8 bg-rose-500/30 blur-sm' : cellState === 'Hipertónico' ? 'w-12 h-12 bg-rose-800/40 blur-[2px]' : 'w-16 h-16 bg-rose-500/40 shadow-[inset_0_0_10px_rgba(150,0,0,0.5)] blur-[1px]'}
              `}></div>
            </div>
          ) : cellType === 'animal' ? (
            <div className={`relative transition-all duration-[1500ms] ease-in-out w-44 h-44 border-4 border-violet-400/35 bg-violet-900/30 shadow-[inset_0_0_25px_rgba(59,7,100,0.75),0_0_24px_rgba(168,85,247,0.18)]
              ${cellState === 'Hipertónico' ? 'rounded-[38%] border-violet-300/30' : 'rounded-full'}
            `}>
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[1500ms] bg-fuchsia-950/60 border border-fuchsia-400/20
                ${cellState === 'Hipotónico' ? 'w-20 h-20' : cellState === 'Hipertónico' ? 'w-10 h-10' : 'w-14 h-14'}
              `}></div>
              <div className="absolute top-6 left-8 w-3 h-3 rounded-full bg-violet-200/40 blur-[1px]"></div>
              <div className="absolute bottom-8 right-10 w-4 h-4 rounded-full bg-violet-200/30 blur-[1px]"></div>
            </div>
          ) : (
            // Célula Vegetal (Pared celular rígida, vacuola central y cloroplastos)
            <div className="relative w-56 h-64 border-4 border-emerald-900/60 rounded-sm bg-emerald-950/40 shadow-[inset_0_0_20px_rgba(0,50,0,0.5)] overflow-hidden">
              {/* Membrana plasmática (se retrae en hipertónico) */}
              <div className={`absolute inset-1 transition-all duration-[1500ms] ease-in-out border-2 border-emerald-500/40 bg-emerald-800/20 flex items-center justify-center
                ${cellState === 'Hipertónico' ? 'scale-[0.65] rounded-3xl' : cellState === 'Hipotónico' ? 'scale-100 bg-emerald-700/30 shadow-[inset_0_0_15px_rgba(16,185,129,0.3)]' : 'scale-100'}
              `}>
                {/* Vacuola central (se expande o contrae dramáticamente) */}
                <div className={`absolute transition-all duration-[1500ms] ease-in-out bg-cyan-900/30 border border-cyan-500/20 rounded-full blur-[1px]
                  ${cellState === 'Hipotónico' ? 'w-48 h-56' : cellState === 'Hipertónico' ? 'w-16 h-16' : 'w-32 h-40'}
                `}></div>
                
                {/* Cloroplastos */}
                <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-emerald-500/60 shadow-[inset_0_0_5px_rgba(0,100,0,0.8)] blur-[0.5px]"></div>
                <div className="absolute bottom-6 right-4 w-5 h-7 rounded-full bg-emerald-500/60 shadow-[inset_0_0_5px_rgba(0,100,0,0.8)] blur-[0.5px] rotate-45"></div>
                <div className="absolute top-10 right-6 w-4 h-4 rounded-full bg-emerald-500/60 shadow-[inset_0_0_5px_rgba(0,100,0,0.8)] blur-[0.5px]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

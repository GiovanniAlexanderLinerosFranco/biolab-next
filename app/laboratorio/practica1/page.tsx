"use client";
import React, { useState } from 'react';
import Link from 'next/link';

import Paso1_Bioseguridad from '@/components/practica1/Paso1_Bioseguridad';
import Paso2_Fundamentos from '@/components/practica1/Paso2_Fundamentos';
import Paso3_Microscopio from '@/components/practica1/Paso3_Microscopio';
import Paso5_Bitacora from '@/components/practica1/Paso5_Bitacora';

export default function Practica1Interactive() {
  const [currentStep, setCurrentStep] = useState(0);
  const [estudianteNombre, setEstudianteNombre] = useState('');
  
  const [respuestasDesafios, setRespuestasDesafios] = useState({
    virus: '',
    animal: '',
    vegetal: '',
    hongo: '',
    protozoo: ''
  });

  const steps = ["Bioseguridad", "Diversidad", "Microscopía", "Bitácora"];

  return (
    <main className="min-h-screen relative font-sans text-slate-200 flex flex-col">
      
      {/* BANNER DE FONDO FIJO */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/assets/banner-guia1.png" 
          alt="BioLab Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-[4px]"></div>
      </div>

      {/* CONTENIDO FLOTANTE */}
      <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col flex-1">
        
        {/* NAVEGACIÓN SUPERIOR */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-slate-950/60 p-4 md:p-6 rounded-2xl border border-slate-700/50 backdrop-blur-xl mb-8 shadow-2xl gap-4">
          <Link href="/" className="px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white flex items-center gap-2 whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            ← Volver al Panel
          </Link>

          <div className="flex flex-wrap justify-center gap-2">
            {steps.map((s, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentStep(i)} 
                className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-widest font-bold transition-all shadow-md ${
                  currentStep === i 
                    ? 'bg-cyan-600 text-white border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                    : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </header>

        {/* ÁREA DE CONTENIDO PRINCIPAL */}
        <section className="bg-slate-900/60 border border-slate-700/50 rounded-[2rem] p-6 md:p-10 min-h-[600px] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between">
           
           <div className="flex-1 w-full">
             {currentStep === 0 && (
               <Paso1_Bioseguridad 
                 estudianteNombre={estudianteNombre} 
                 setEstudianteNombre={setEstudianteNombre} 
               />
             )}
             {currentStep === 1 && (
               <Paso2_Fundamentos 
                 estudianteNombre={estudianteNombre}
                 respuestasDesafios={respuestasDesafios} 
                 setRespuestasDesafios={setRespuestasDesafios} 
               />
             )}
             {currentStep === 2 && <Paso3_Microscopio />}
             {currentStep === 3 && (
               <Paso5_Bitacora 
                 estudianteNombre={estudianteNombre} 
                 respuestasDesafios={respuestasDesafios}
               />
             )}
           </div>

           {/* CONTROLES INFERIORES */}
           <div className="mt-12 flex justify-between items-center w-full max-w-4xl mx-auto border-t border-slate-700/50 pt-8">
             <button 
               onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} 
               disabled={currentStep === 0} 
               className={`px-6 py-3 rounded-xl font-bold transition-all text-sm ${
                 currentStep === 0 
                   ? 'opacity-0 cursor-default pointer-events-none' 
                   : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700 shadow-xl'
               }`}
             >
               Anterior
             </button>
             
             {currentStep < steps.length - 1 ? (
               <button 
                 onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))} 
                 className="px-8 py-3 rounded-xl font-bold transition-all text-sm flex items-center gap-2 bg-cyan-600/90 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-500/50"
               >
                 Siguiente Estación
               </button>
             ) : (
               <div className="text-xs font-mono text-slate-500 uppercase tracking-wider italic">
                 Diligencie su informe arriba para finalizar
               </div>
             )}
           </div>
        </section>
      </div>
    </main>
  );
}
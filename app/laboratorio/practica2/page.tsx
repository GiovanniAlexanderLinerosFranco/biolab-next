"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// Importación unificada y limpia de las 4 estaciones de la Práctica 2
import Paso1_Bioseguridad_P2 from '@/components/practica2/Paso1_Bioseguridad_P2';
import Paso2_Diagnostico_P2 from '@/components/practica2/Paso2_Diagnostico_P2';
import Paso3_Atlas_P2 from '@/components/practica2/Paso3_Atlas_P2';
import Paso4_Bitacora_P2 from '@/components/practica2/Paso4_Bitacora_P2'; // <-- Nombre de importación corregido

export default function Practica2Histologia() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // ESTADOS GLOBALES DE LA PRÁCTICA 2 (Sincronizados con Supabase)
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [estudianteEmail, setEstudianteEmail] = useState('');
  
  const [respuestasDesafios, setRespuestasDesafios] = useState({
    epitelial: '',
    conectivo: '',
    muscular: '',
    nervioso: ''
  });

  const steps = ["Bioseguridad", "Diagnóstico", "Atlas Histológico", "Bitácora Final"];

  return (
    <main className="min-h-screen relative font-sans text-slate-200 flex flex-col">
      
      {/* BANNER DE FONDO FIJO */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/assets/banner-guia1.png" 
          alt="BioLab Histología Banner" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-[6px]"></div>
      </div>

      {/* CONTENIDO FLOTANTE */}
      <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col flex-1">
        
        {/* NAVEGACIÓN SUPERIOR RESPONSIVE */}
        <header className="flex flex-col lg:flex-row justify-between items-center bg-slate-950/60 p-4 md:p-6 rounded-2xl border border-slate-700/50 backdrop-blur-xl mb-8 shadow-2xl gap-4">
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
                <span className="opacity-50 mr-1.5">{i + 1}.</span>
                {s}
              </button>
            ))}
          </div>
        </header>

        {/* ÁREA DE CONTENIDO PRINCIPAL */}
        <section className="bg-slate-900/60 border border-slate-700/50 rounded-[2rem] p-5 md:p-10 min-h-[600px] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between">
            
           <div className="flex-1 w-full">
             {/* ESTACIÓN 01: BIOSEGURIDAD ESPECÍFICA */}
             {currentStep === 0 && (
               <Paso1_Bioseguridad_P2 
                 estudianteNombre={estudianteNombre} 
                 setEstudianteNombre={setEstudianteNombre}
                 estudianteEmail={estudianteEmail}
                 setEstudianteEmail={setEstudianteEmail}
               />
             )}

             {/* ESTACIÓN 02: DIAGNÓSTICO DE LINAJES TISULARES */}
             {currentStep === 1 && (
               <Paso2_Diagnostico_P2 
                 estudianteNombre={estudianteNombre}
                 respuestasDesafios={respuestasDesafios} 
                 setRespuestasDesafios={setRespuestasDesafios} 
               />
             )}

             {/* ESTACIÓN 03: ATLAS HISTOLÓGICO DIGITAL INTERACTIVO */}
             {currentStep === 2 && (
               <Paso3_Atlas_P2 
                 estudianteNombre={estudianteNombre}
               />
             )}

             {/* ESTACIÓN 04: BITÁCORA Y EVALUACIÓN DE RÚBRICA SANEADA */}
             {currentStep === 3 && (
               <Paso4_Bitacora_P2 // <-- Componente JSX renombrado correctamente
                 estudianteNombre={estudianteNombre} 
                 estudianteEmail={estudianteEmail}
                 respuestasDesafios={respuestasDesafios}
               />
             )}
           </div>

           {/* CONTROLES INFERIORES DE NAVEGACIÓN */}
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
               Estación Anterior
             </button>
             
             {currentStep < steps.length - 1 ? (
               <button 
                 onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))} 
                 className="px-8 py-3 rounded-xl font-bold transition-all text-sm flex items-center gap-2 bg-cyan-600/90 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-500/50"
               >
                 Siguiente Estación
               </button>
             ) : (
               <div className="text-xs font-mono text-teal-500 font-bold uppercase tracking-wider italic animate-pulse text-center w-full lg:w-auto">
                 Diligencie su diagnóstico tisular completo para finalizar el reporte
               </div>
             )}
           </div>
        </section>
      </div>
    </main>
  );
}
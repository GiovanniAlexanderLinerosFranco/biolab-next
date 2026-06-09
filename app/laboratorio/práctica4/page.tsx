"use client";
import React from 'react';
import Link from 'next/link';
import AgglutinationSimulator from '@/components/simulators/AgglutinationSimulator';

export default function Practica4Page() {
  return (
    <main className="min-h-screen relative font-sans text-slate-200 flex flex-col">
      
      {/* BANNER DE FONDO FIJO - Inmersión visual */}
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
        
        {/* ENCABEZADO DE NAVEGACIÓN */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-slate-950/60 p-4 md:p-6 rounded-2xl border border-slate-700/50 backdrop-blur-xl mb-8 shadow-2xl gap-4">
          <Link href="/" className="px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white flex items-center gap-2 whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            ← Volver al Panel
          </Link>
          <div className="text-center md:text-right">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">Estación de Simulación Avanzada</span>
            <h2 className="text-sm font-bold text-white font-mono">PRÁCTICA 04: TIPIFICACIÓN ABO/Rh</h2>
          </div>
        </header>

        {/* CONTENEDOR DEL SIMULADOR DE AGLUTINACIÓN */}
        <section className="bg-slate-900/60 border border-slate-700/50 rounded-[2rem] p-4 md:p-8 min-h-[600px] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col">
          <AgglutinationSimulator />
        </section>

      </div>
    </main>
  );
}
"use client";
import React from 'react';
import Link from 'next/link';

const practicasSilabousta = [
  { id: 1, numero: "01", titulo: "Bioseguridad, Diversidad y Microscopía", disponible: true, ruta: "/laboratorio/practica1", badge: "ACTIVA HOY" },
  { id: 2, numero: "02", titulo: "Entre Células y Capas: Tejidos Humanos", disponible: false, ruta: "/laboratorio/practica2", badge: "BLOQUEADO" },
  { id: 3, numero: "03", titulo: "Receptores de Membrana Celular (ABO/Rh)", disponible: false, ruta: "/laboratorio/practica3", badge: "BLOQUEADO" },
  { id: 4, numero: "04", titulo: "Comunicación Celular y Flujo de Sustancias", disponible: false, ruta: "/laboratorio/practica4", badge: "BLOQUEADO" },
  { id: 5, numero: "05", titulo: "Índice Mitótico y Ciclo Celular", disponible: false, ruta: "/laboratorio/practica5", badge: "BLOQUEADO" },
  { id: 6, numero: "06", titulo: "Extracción y Aislamiento de ADN", disponible: false, ruta: "/laboratorio/practica6", badge: "BLOQUEADO" },
  { id: 7, numero: "07", titulo: "Transcripción y Traducción Génica", disponible: false, ruta: "/laboratorio/practica7", badge: "BLOQUEADO" },
  { id: 8, numero: "08", titulo: "Mutaciones Moleculares y Variabilidad", disponible: false, ruta: "/laboratorio/practica8", badge: "BLOQUEADO" }
];

export default function PanelLaboratorios() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 relative overflow-hidden">
      {/* GLOW DE FONDO CYBERPUNK */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-8">
        <header className="bg-slate-950/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">BioLab Virtual • PWA</h1>
            <p className="text-xs font-mono text-cyan-400">Universidad Santo Tomás — División de Ciencias de la Salud</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase tracking-widest">Estación de Servidor</span>
            <span className="text-xs text-white font-black">SISTEMA EN VIVO</span>
          </div>
        </header>

        {/* GRILLA CONTROLADA RESPONSIVE MOBILE-FIRST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practicasSilabousta.map((p) => (
            <div 
              key={p.id} 
              className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                p.disponible 
                  ? 'border-cyan-500/30 bg-slate-900/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] shadow-md' 
                  : 'border-slate-900 bg-slate-950/20 opacity-40 pointer-events-none'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-mono font-black text-slate-800">{p.numero}</span>
                <span className={`text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                  p.disponible 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse' 
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}>
                  {p.badge}
                </span>
              </div>
              
              <h3 className="text-white font-extrabold text-xs md:text-sm uppercase tracking-wide leading-tight mb-4">
                {p.titulo}
              </h3>

              {p.disponible ? (
                <Link 
                  href={p.ruta} 
                  className="w-full text-center py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-950/50 border border-cyan-400/30"
                >
                  INGRESAR A LA EXPERIENCIA
                </Link>
              ) : (
                <div className="w-full text-center py-2 bg-slate-950/50 border border-slate-900 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl">
                  ACCESO RESTRINGIDO
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
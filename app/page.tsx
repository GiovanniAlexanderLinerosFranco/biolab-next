/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.1.0
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * ENRUTAMIENTO UNIFICADO DEL PANEL DE AULA HACIA REGISTRO DE ASISTENCIA
 * ============================================================================
 */

"use client";
import React from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

const practicasSilabousta = [
  { id: 1, numero: "01", titulo: "Bioseguridad, Diversidad y Microscopía", disponible: true, ruta: "/laboratorio/practica1", badge: "ACTIVA" },
  { id: 2, numero: "02", titulo: "Entre Células y Capas: Tejidos Humanos", disponible: true, ruta: "/laboratorio/practica2", badge: "ACTIVA MAÑANA" }, // ACTIVADA PARA EL GRUPO DE LAS 8 AM
  { id: 3, numero: "03", titulo: "Receptores de Membrana Celular (ABO/Rh)", disponible: false, ruta: "/laboratorio/practica3", badge: "BLOQUEADO" },
  { id: 4, numero: "04", titulo: "Comunicación Celular y Flujo de Sustancias", disponible: false, ruta: "/laboratorio/practica4", badge: "BLOQUEADO" },
  { id: 5, numero: "05", titulo: "Índice Mitótico y Ciclo Celular", disponible: false, ruta: "/laboratorio/practica5", badge: "BLOQUEADO" },
  { id: 6, numero: "06", titulo: "Extracción y Aislamiento de ADN", disponible: false, ruta: "/laboratorio/practica6", badge: "BLOQUEADO" },
  { id: 7, numero: "07", titulo: "Transcripción y Traducción Génica", disponible: false, ruta: "/laboratorio/practica7", badge: "BLOQUEADO" },
  { id: 8, numero: "08", titulo: "Mutaciones Moleculares y Variabilidad", disponible: false, ruta: "/laboratorio/practica8", badge: "BLOQUEADO" }
];

export default function PanelLaboratorios() {
  // REDIRECCIÓN MAESTRA: El QR ahora apunta a la pasarela inteligente construida el viernes
  const urlRegistroAsistencia = "https://biolab-next.vercel.app/laboratorio/registro";

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 relative overflow-hidden">
      {/* GLOW DE FONDO CYBERPUNK */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-6">
        
        {/* ENCABEZADO INSTITUCIONAL */}
        <header className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">BioLab Virtual • PWA</h1>
            <p className="text-xs font-mono text-cyan-400">Universidad Santo Tomás — División de Ciencias de la Salud</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase tracking-widest">Estación de Servidor</span>
            <span className="text-xs text-white font-black">SISTEMA EN VIVO</span>
          </div>
        </header>

        {/* CONTENEDOR EXPANDIDO PARA PROYECTAR EL QR EN LA CLASE */}
        <section className="bg-slate-950/40 border border-cyan-500/20 p-6 rounded-3xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 flex-1">
            <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-black px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
              📱 CONTROL DE ASISTENCIA OBLIGATORIO
            </span>
            <h2 className="text-white font-extrabold text-lg uppercase tracking-tight">Escanee el código para registrar su ingreso</h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              Proyecte este panel en el aula. Los alumnos deben escanear el código QR para validar su identidad institucional antes de iniciar la simulación de microscopía y tejidos.
            </p>
            <div className="text-[11px] font-mono text-cyan-500/80 break-all select-all pt-1">
              Portal de acceso: {urlRegistroAsistencia}
            </div>
          </div>
          
          {/* RENDER DEL COMPONENTE QR ENRUTADO AL REGISTRO */}
          <div className="bg-white p-3.5 rounded-2xl shadow-2xl border border-slate-200 flex items-center justify-center shrink-0">
            <QRCodeSVG 
              value={urlRegistroAsistencia} 
              size={140}
              bgColor="#ffffff"
              fgColor="#020617" 
              level="H" 
              includeMargin={false}
            />
          </div>
        </section>

        {/* GRILLA CONTROLADA RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practicasSilabousta.map((p) => (
            <div 
              key={p.id} 
              className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                p.disponible 
                  ? 'border-cyan-500/40 bg-slate-900/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] shadow-md' 
                  : 'border-slate-900 bg-slate-950/20 opacity-30 pointer-events-none'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-mono font-black text-slate-800">{p.numero}</span>
                <span className={`text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                  p.id === 2 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                    : p.disponible 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
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
                  className={`w-full text-center py-2 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg border ${
                    p.id === 2
                      ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-950/50 border-amber-400/30'
                      : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-950/50 border-cyan-400/30'
                  }`}
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
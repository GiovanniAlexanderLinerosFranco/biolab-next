/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.3.2
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * PANEL CENTRAL INTEGRADO CON BASE DE DATOS Y BANNER REAL USTA
 * ============================================================================
 */

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '@/lib/supabaseClient';

export default function PanelLaboratorios() {
  const urlRegistroAsistencia = "https://biolab-next.vercel.app/laboratorio/registro";
  const [estadosDB, setEstadosDB] = useState<Record<string, boolean>>({});
  const [cargando, setCargando] = useState(true);

  const practicas = [
    { id: "biolab_p1", numero: "01", titulo: "Bioseguridad, Diversidad y Microscopía", ruta: "/laboratorio/practica1" },
    { id: "biolab_p2", numero: "02", titulo: "Entre Células y Capas: Tejidos Humanos", ruta: "/laboratorio/practica2" },
    { id: "biolab_p3", numero: "03", titulo: "Receptores de Membrana Celular (ABO/Rh)", ruta: "/laboratorio/practica3" },
    { id: "biolab_p4", numero: "04", titulo: "Comunicación Celular y Flujo de Sustancias", ruta: "/laboratorio/practica4" },
    { id: "biolab_p5", numero: "05", titulo: "Índice Mitótico y Ciclo Celular", ruta: "/laboratorio/practica5" },
    { id: "biolab_p6", numero: "06", titulo: "Extracción y Aislamiento de ADN", ruta: "/laboratorio/practica6" },
    { id: "biolab_p7", numero: "07", titulo: "Transcripción y Traducción Génica", ruta: "/laboratorio/practica7" },
    { id: "biolab_p8", numero: "08", titulo: "Mutaciones Moleculares y Variabilidad", ruta: "/laboratorio/practica8" }
  ];

  useEffect(() => {
    const consultarInterruptores = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('ecosistema_configuracion')
          .select('id, estado');

        if (!error && data) {
          const mapaEstados = data.reduce((acc, current) => {
            acc[current.id] = current.estado;
            return acc;
          }, {} as Record<string, boolean>);
          setEstadosDB(mapaEstados);
        }
      } catch (err) {
        console.error("Error al consultar interruptores:", err);
      } finally {
        setCargando(false);
      }
    };

    consultarInterruptores();
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-6">
        
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

{/* PROYECTOR DE AULA CON EL BANNER REAL DEL LABORATORIO USTA (COLORES ORIGINALES) */}
<section className="relative border border-slate-800/80 rounded-3xl overflow-hidden min-h-[220px] flex items-center shadow-2xl">
  <div className="absolute inset-0 z-0">
    <img 
      src="/assets/banner-guia1.png" 
      alt="Laboratorio Real USTA" 
      // CORREGIDO: Eliminado 'grayscale' y subida la opacidad para mantener los colores vivos reales
      className="w-full h-full object-cover object-center opacity-85 transition-all duration-300"
    />
    {/* Máscara de contraste optimizada para no saturar ni apagar los colores originales */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent"></div>
  </div>

  <div className="relative z-10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
    <div className="space-y-2 flex-1">
      <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-black px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
        📱 CONTROL DE ASISTENCIA REGULADO
      </span>
      <h2 className="text-white font-extrabold text-lg uppercase tracking-tight">Escanee para registrar su ingreso</h2>
      <p className="text-xs text-slate-200 leading-relaxed max-w-xl font-medium drop-shadow-md">
        Proyecte este panel en el aula. Los alumnos deben validar su identidad institucional antes de iniciar los desafíos interactivos programados para la sesión.
      </p>
      <div className="text-[11px] font-mono text-cyan-300 font-bold break-all select-all pt-1 drop-shadow-md">
        Portal de acceso: {urlRegistroAsistencia}
      </div>
    </div>
    
    <div className="bg-white p-3.5 rounded-2xl shadow-2xl border border-slate-200 flex items-center justify-center shrink-0">
      <QRCodeSVG 
        value={urlRegistroAsistencia} 
        size={130}
        bgColor="#ffffff"
        fgColor="#020617" 
        level="H" 
        includeMargin={false}
      />
    </div>
  </div>
</section>

        {/* GRILLA REGULADA POR TU BASE DE DATOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practicas.map((p) => {
            const estaActivaEnDB = estadosDB[p.id] === true;

            return (
              <div 
                key={p.id} 
                className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                  estaActivaEnDB 
                    ? 'border-cyan-500/40 bg-slate-900/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] shadow-md' 
                    : 'border-slate-900 bg-slate-950/20 opacity-30'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-mono font-black text-slate-800">{p.numero}</span>
                  <span className={`text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                    estaActivaEnDB 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse' 
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}>
                    {estaActivaEnDB ? "ACTIVA EN VIVO" : "BLOQUEADO"}
                  </span>
                </div>
                
                <h3 className="text-white font-extrabold text-xs md:text-sm uppercase tracking-wide leading-tight mb-4">
                  {p.titulo}
                </h3>

                {estaActivaEnDB ? (
                  <Link 
                    href={p.ruta} 
                    className="w-full text-center py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg border border-cyan-400/30"
                  >
                    INGRESAR A LA EXPERIENCIA
                  </Link>
                ) : (
                  <div className="w-full text-center py-2 bg-slate-950/50 border border-slate-900 text-slate-600 font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl cursor-not-allowed">
                    ACCESO RESTRINGIDO
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const reglasBioseguridad = [
  {
    id: 1,
    titulo: "Protección en Histología",
    descripcion: "Uso obligatorio de bata abrochada, guantes de nitrilo y protección ocular para la manipulación segura de láminas portaobjetos y reactivos de tinción histológica.",
    fases: {
      antes: "Inspeccione que el microscopio óptico y las cajas de láminas histológicas estén limpias, calibradas y en una superficie despejada.",
      durante: "Sostenga los portaobjetos exclusivamente por los bordes esmerilados para evitar dejar huellas grasas sobre los cortes de tejido.",
      despues: "Limpie el lente objetivo de inmersión únicamente con papel óptico especial y apague correctamente la fuente de luz del equipo."
    }
  }
];

interface Paso1Props {
  estudianteNombre: string;
  setEstudianteNombre: (val: string) => void;
  estudianteEmail: string;
  setEstudianteEmail: (val: string) => void;
}

export default function Paso1_Bioseguridad_P2({
  estudianteNombre,
  setEstudianteNombre,
  estudianteEmail,
  setEstudianteEmail
}: Paso1Props) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const reglaActual = reglasBioseguridad[0];
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estudianteEmail);

  const iniciarSesionEnSupabase = async () => {
    if (!estudianteNombre.trim()) {
      alert("Por favor, ingresa tu nombre completo.");
      return;
    }
    if (!estudianteEmail.trim() || !correoValido) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      alert("Error: Supabase no está configurado. Revise sus variables .env.local");
      return;
    }

    setIsConnecting(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('bitacoras_practica_2')
        .insert([
          {
            estudiante_nombre: estudianteNombre,
            estudiante_email: estudianteEmail,
            respuestas_desafios: {},
            tabla_tejidos: {},
            analisis_diagnostico: "Sesión iniciada en Práctica 2 de Histología"
          }
        ]);

      if (error) throw error;
      setStatus('success');
      console.log("¡Sesión de Histología iniciada con éxito en Supabase!");
    } catch (error) {
      console.error("Error al conectar con Supabase:", error);
      setStatus('error');
      alert("Error al registrar la sesión en la base de datos.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto p-4">
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-slate-950/80 border-2 border-cyan-600/40 p-5 rounded-2xl shadow-xl backdrop-blur-md">
          <label className="block text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
            🔑 Registro Clínico del Investigador (Práctica 2)
          </label>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">👤 Nombre completo</label>
              <input type="text" value={estudianteNombre} onChange={(e) => setEstudianteNombre(e.target.value)} disabled={status === 'success'} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 outline-none focus:border-cyan-400 font-semibold" placeholder="Su nombre completo..." />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">📧 Correo Institucional o Personal</label>
              <input type="email" value={estudianteEmail} onChange={(e) => setEstudianteEmail(e.target.value)} disabled={status === 'success'} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 outline-none focus:border-cyan-400 font-semibold" placeholder="usuario@ustabuca.edu.co..." />
            </div>
            <button onClick={iniciarSesionEnSupabase} disabled={isConnecting || status === 'success'} className={`w-full p-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${status === 'success' ? 'bg-green-600/20 text-green-400 border border-green-500/50 cursor-default' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.3)]'}`}>
              {isConnecting ? "Validando conexión..." : status === 'success' ? "✓ Sesión Histológica Activada" : status === 'error' ? "❌ Error (Reintentar)" : "Activar Sesión de Laboratorio"}
            </button>
            {!correoValido && estudianteEmail.length > 0 && (
              <p className="text-[11px] text-amber-400">Ingrese un correo válido para continuar.</p>
            )}
          </div>
        </div>
        <div>
          <div className="text-teal-500 font-bold text-xs tracking-widest mb-2 uppercase">Estación 01</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Entre células y capas: Tejidos Humanos</h1>
          <p className="text-slate-300 text-sm leading-relaxed text-justify">Antes de observar las láminas histológicas, reconozca el flujo de bioseguridad enfocado en la preservación de muestras biológicas y la operación correcta del microscopio óptico.</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-slate-800 pb-2">Fases de Operación en Microscopía</h3>
        <div className="space-y-4">
          <div className="border border-teal-800/40 bg-teal-900/10 p-3 rounded-lg">
            <span className="text-[10px] font-black text-teal-400 block mb-1 uppercase tracking-wider">ANTES</span>
            <p className="text-xs text-slate-300 leading-tight">{reglaActual.fases.antes}</p>
          </div>
          <div className="border border-amber-800/40 bg-amber-900/10 p-3 rounded-lg">
            <span className="text-[10px] font-black text-amber-400 block mb-1 uppercase tracking-wider">DURANTE</span>
            <p className="text-xs text-slate-300 leading-tight">{reglaActual.fases.durante}</p>
          </div>
          <div className="border border-rose-800/40 bg-rose-900/10 p-3 rounded-lg">
            <span className="text-[10px] font-black text-rose-400 block mb-1 uppercase tracking-wider">DESPUÉS</span>
            <p className="text-xs text-slate-300 leading-tight">{reglaActual.fases.despues}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
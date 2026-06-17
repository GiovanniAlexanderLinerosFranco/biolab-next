"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const reglasBioseguridad = [
  {
    id: 1,
    titulo: "Riesgo Biológico e Inmunohematología",
    descripcion: "Uso estricto de Barreras de Protección Primaria (bata de laboratorio, guantes de nitrilo y gafas de seguridad) para la manipulación de muestras sanguíneas virtuales o simuladas, previniendo la exposición a fluidos de origen humano.",
    fases: {
      antes: "Verifique que el área de tipificación esté desinfectada. Organice las láminas portaobjetos limpias y los reactivos comerciales (Anti-A, Anti-B, Anti-D) en gradillas estables.",
      durante: "Evite el contacto directo de la punta de los goteros de los reactivos con las gotas de muestra de sangre en la lámina para impedir la contaminación cruzada del banco de antisueros.",
      despues: "Deseche los aplicadores de mezcla en el guardián de seguridad para reactivos biológicos, limpie la estación de trabajo y registre el procedimiento en el sistema."
    }
  }
];

interface Paso1Props {
  estudianteNombre: string;
  setEstudianteNombre: (val: string) => void;
  estudianteEmail: string;
  setEstudianteEmail: (val: string) => void;
}

export default function Paso1_Bioseguridad_P3({
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
      alert("Por favor, ingresa un correo electrónico institucional válido.");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      alert("Error: El cliente de Supabase no está configurado de forma segura.");
      return;
    }

    setIsConnecting(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('bitacoras_practica_3')
        .insert([
          {
            estudiante_nombre: estudianteNombre,
            estudiante_email: estudianteEmail,
            respuestas_desafios: {},
            tabla_aglutinacion: {},
            analisis_clinico: "Sesión inicial activada para Práctica 3 de Receptores"
          }
        ]);

      if (error) throw error;
      setStatus('success');
      console.log("¡Sesión de Receptores de Membrana iniciada en Supabase!");
    } catch (error) {
      console.error(error);
      setStatus('error');
      alert("Error al registrar el acceso en la base de datos.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto p-4">
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-slate-950/80 border-2 border-cyan-600/40 p-5 rounded-2xl shadow-xl backdrop-blur-md">
          <label className="block text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
            🔑 Registro de Inmunohematología (Práctica 3)
          </label>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">👤 Nombre completo</label>
              <input type="text" value={estudianteNombre} onChange={(e) => setEstudianteNombre(e.target.value)} disabled={status === 'success'} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 outline-none focus:border-cyan-400 font-semibold" placeholder="Su nombre completo..." />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">📧 Correo Institucional</label>
              <input type="email" value={estudianteEmail} onChange={(e) => setEstudianteEmail(e.target.value)} disabled={status === 'success'} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 outline-none focus:border-cyan-400 font-semibold" placeholder="usuario@ustabuca.edu.co..." />
            </div>
            <button onClick={iniciarSesionEnSupabase} disabled={isConnecting || status === 'success'} className={`w-full p-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${status === 'success' ? 'bg-green-600/20 text-green-400 border border-green-500/50 cursor-default' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.3)]'}`}>
              {isConnecting ? "Validando investigador..." : status === 'success' ? "✓ Sesión de Receptores Activada" : "Habilitar Práctica 3"}
            </button>
            {!correoValido && estudianteEmail.length > 0 && (
              <p className="text-[11px] text-amber-400">Ingrese un formato de correo válido.</p>
            )}
          </div>
        </div>
        <div>
          <div className="text-teal-500 font-bold text-xs tracking-widest mb-2 uppercase">Estación 01</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Receptores de Membrana Celular</h1>
          <p className="text-slate-300 text-sm leading-relaxed text-justify">Analice cómo los antígenos expresados en la superficie de los eritrocitos actúan como receptores moleculares específicos que interactúan diferencialmente con anticuerpos comerciales externos.</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-slate-800 pb-2">Seguridad en Manejo de Antisueros</h3>
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
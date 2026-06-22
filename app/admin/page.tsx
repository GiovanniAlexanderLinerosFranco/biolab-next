/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.2.2
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * CONSOLA MAESTRA DE CONTROL DE PRÁCTICAS - CORRECCIÓN DE FINALLY
 * ============================================================================
 */

"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface PracticaConfig {
  id: string;
  asignatura: string;
  titulo_practica: string;
  estado: boolean;
  fecha_apertura: string;
  fecha_cierre: string;
}

export default function ConsolaAdminPage() {
  const [practicas, setPracticas] = useState<PracticaConfig[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeOperacion, setMensajeOperacion] = useState('');

  const cargarConfiguraciones = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('ecosistema_configuracion')
        .select('*')
        .order('asignatura', { ascending: true })
        .order('id', { ascending: true });

      if (error) throw error;
      setPracticas(data || []);
    } catch (err) {
      console.error("Error al leer configuraciones:", err);
    } // LINE 42: FIX CORRECTO (finally)
    finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarConfiguraciones();
  }, []);

  const toggleEstadoPractica = async (id: string, estadoActual: boolean) => {
    if (!supabase) return;
    setMensajeOperacion('Sincronizando interruptor con el servidor...');

    try {
      const { error } = await supabase
        .from('ecosistema_configuracion')
        .update({ estado: !estadoActual })
        .eq('id', id);

      if (error) throw error;

      setPracticas((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: !estadoActual } : p))
      );
      setMensajeOperacion('✓ Estado de la práctica actualizado en tiempo real.');
    } catch (err) {
      console.error(err);
      setMensajeOperacion('❌ Error de sincronización.');
    } // LINE 70: FIX CORRECTO (finally)
    finally {
      setTimeout(() => setMensajeOperacion(''), 3000);
    }
  };

  const actualizarFechaCierre = async (id: string, nuevaFecha: string) => {
    if (!supabase || !nuevaFecha) return;
    setMensajeOperacion('Actualizando límite de entrega...');

    try {
      const { error } = await supabase
        .from('ecosistema_configuracion')
        .update({ fecha_cierre: new Date(nuevaFecha).toISOString() })
        .eq('id', id);

      if (error) throw error;

      setPracticas((prev) =>
        prev.map((p) => (p.id === id ? { ...p, fecha_cierre: nuevaFecha } : p))
      );
      setMensajeOperacion('✓ Fecha límite de entrega consolidada.');
    } catch (err) {
      console.error(err);
      setMensajeOperacion('❌ Error al guardar la fecha.');
    } // LINE 94: FIX CORRECTO (finally)
    finally {
      setTimeout(() => setMensajeOperacion(''), 3000);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-xs text-amber-400 animate-pulse">
        Cargando Consola de Control Docente BioGALF...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans selection:bg-amber-500/20">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="bg-slate-950/60 border border-slate-900 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-black text-amber-400 tracking-widest uppercase bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-md">
              Panel Operador Maestro
            </span>
            <h1 className="text-xl font-extrabold text-white tracking-tight uppercase">
              Control de Cátedra e Integridad Académica
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Investigador Principal: PhD. Giovanni Alexander Lineros Franco
            </p>
          </div>

          <button 
            onClick={() => window.location.href = '/laboratorio/registro'}
            className="px-4 py-2 border border-slate-800 hover:bg-slate-900 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-all"
          >
            ← Salir al Registro General
          </button>
        </header>

        {mensajeOperacion && (
          <div className="bg-slate-900 border border-slate-800 text-amber-400 px-4 py-2.5 rounded-xl text-xs font-mono transition-all animate-pulse">
            {mensajeOperacion}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {practicas.length === 0 ? (
            <div className="bg-slate-950/40 border border-slate-900 p-8 rounded-2xl text-center text-xs font-mono text-slate-500">
              No se encontraron entornos cargados en la tabla &apos;ecosistema_configuracion&apos;.
            </div>
          ) : (
            practicas.map((practica) => (
              <div 
                key={practica.id}
                className={`bg-slate-950/40 border p-5 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-4 items-center transition-all ${
                  practica.estado ? 'border-cyan-900/40 bg-cyan-950/5' : 'border-slate-900/80 opacity-60'
                }`}
              >
                <div className="lg:col-span-4 space-y-1">
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 uppercase">
                    {practica.asignatura || 'Ciencias Básicas'}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight mt-1">{practica.titulo_practica}</h3>
                  <p className="text-[10px] font-mono text-slate-500">ID del Sistema: <span className="text-slate-400 font-bold">{practica.id}</span></p>
                </div>

                <div className="lg:col-span-3 flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold mb-1.5">Control de Aula:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleEstadoPractica(practica.id, practica.estado)}
                      className={`px-4 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase transition-all border ${
                        practica.estado 
                          ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-950/30' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {practica.estado ? '● ACTIVADO (En Vivo)' : '○ APAGADO (Bloqueado)'}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center">
                  <label className="text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                    Cierre de Actividad (Bloqueo de Reintentos):
                  </label>
                  <input
                    type="datetime-local"
                    value={practica.fecha_cierre ? practica.fecha_cierre.substring(0, 16) : ''}
                    onChange={(e) => actualizarFechaCierre(practica.id, e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500 w-full"
                  />
                </div>

              </div>
            ))
          )}
        </div>

        <footer className="text-center text-[10px] font-mono text-slate-600 pt-6 border-t border-slate-900/60">
          Core-Ecosystem Control Panel V3.2 • Autorizado exclusivamente para el control intersemestral de la Universidad Santo Tomás.
        </footer>

      </div>
    </main>
  );
}
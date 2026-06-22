/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.2.5
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * CONSOLA MAESTRA - INYECTOR DE EMERGENCIA EN FRONTIER INTEGRADO
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
  const [inyectando, setInyectando] = useState(false);

  const cargarConfiguraciones = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('ecosistema_configuracion')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setPracticas(data || []);
    } catch (err) {
      console.error("Error al leer configuraciones:", err);
    }
    finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarConfiguraciones();
  }, []);

  // BOTÓN DE EMERGENCIA: Inyecta las filas directamente usando el cliente interno de la PWA
  const inicializarTablasDesdeFront = async () => {
    if (!supabase) return;
    setInyectando(true);
    setMensajeOperacion('Creando registros de cátedra en la base de datos conectada...');
    
    const lotePrácticas = [
      { id: 'biolab_p1', asignatura: 'Biología Celular y Molecular', titulo_practica: 'Bioseguridad, Diversidad y Microscopía', estado: false, fecha_apertura: new Date().toISOString(), fecha_cierre: '2026-12-31T23:59:59.000Z' },
      { id: 'biolab_p2', asignatura: 'Biología Celular y Molecular', titulo_practica: 'Práctica 2: Reconocimiento de Organelas y Estructuras', estado: true, fecha_apertura: new Date().toISOString(), fecha_cierre: '2026-12-31T23:59:59.000Z' },
      { id: 'biolab_p3', asignatura: 'Biología Celular y Molecular', titulo_practica: 'Receptores de Membrana Celular (ABO/Rh)', estado: false, fecha_apertura: new Date().toISOString(), fecha_cierre: '2026-12-31T23:59:59.000Z' },
      { id: 'biolab_p4', asignatura: 'Biología Celular y Molecular', titulo_practica: 'Comunicación Celular y Flujo de Sustancias', estado: false, fecha_apertura: new Date().toISOString(), fecha_cierre: '2026-12-31T23:59:59.000Z' },
      { id: 'biolab_p5', asignatura: 'Biología Celular y Molecular', titulo_practica: 'Índice Mitótico y Ciclo Celular', estado: false, fecha_apertura: new Date().toISOString(), fecha_cierre: '2026-12-31T23:59:59.000Z' },
      { id: 'biolab_p6', asignatura: 'Biología Celular y Molecular', titulo_practica: 'Extracción y Aislamiento de ADN', estado: false, fecha_apertura: new Date().toISOString(), fecha_cierre: '2026-12-31T23:59:59.000Z' },
      { id: 'biolab_p7', asignatura: 'Biología Celular y Molecular', titulo_practica: 'Transcripción y Traducción Génica', estado: false, fecha_apertura: new Date().toISOString(), fecha_cierre: '2026-12-31T23:59:59.000Z' },
      { id: 'biolab_p8', asignatura: 'Biología Celular y Molecular', titulo_practica: 'Mutaciones Moleculares y Variabilidad', estado: false, fecha_apertura: new Date().toISOString(), fecha_cierre: '2026-12-31T23:59:59.000Z' }
    ];

    try {
      const { error } = await supabase
        .from('ecosistema_configuracion')
        .upsert(lotePrácticas, { onConflict: 'id' });

      if (error) throw error;
      setMensajeOperacion('✓ ¡Ecosistema sincronizado con éxito!');
      await cargarConfiguraciones();
    } catch (err: any) {
      console.error(err);
      setMensajeOperacion(`❌ Error: ${err.message || 'Verifique políticas RLS o conexión'}`);
    } finally {
      setInyectando(false);
    }
  };

  const toggleEstadoPractica = async (id: string, estadoActual: boolean) => {
    if (!supabase) return;
    setMensajeOperacion('Sincronizando interruptor...');
    try {
      const { error } = await supabase.from('ecosistema_configuracion').update({ estado: !estadoActual }).eq('id', id);
      if (error) throw error;
      setPracticas((prev) => prev.map((p) => (p.id === id ? { ...p, estado: !estadoActual } : p)));
      setMensajeOperacion('✓ Interruptor actualizado.');
    } catch (err) {
      setMensajeOperacion('❌ Error al cambiar estado.');
    } finally {
      setTimeout(() => setMensajeOperacion(''), 3000);
    }
  };

  const actualizarFechaCierre = async (id: string, nuevaFecha: string) => {
    if (!supabase || !nuevaFecha) return;
    try {
      const { error } = await supabase.from('ecosistema_configuracion').update({ fecha_cierre: new Date(nuevaFecha).toISOString() }).eq('id', id);
      if (error) throw error;
      setPracticas((prev) => prev.map((p) => (p.id === id ? { ...p, fecha_cierre: nuevaFecha } : p)));
    } catch (err) {
      console.error(err);
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
            <p className="text-xs text-slate-400 font-mono">PhD. Giovanni Alexander Lineros Franco</p>
          </div>
          <button onClick={() => window.location.href = '/laboratorio/registro'} className="px-4 py-2 border border-slate-800 hover:bg-slate-900 rounded-xl text-xs font-mono text-slate-400 transition-all">
            ← Salir
          </button>
        </header>

        {mensajeOperacion && (
          <div className="bg-slate-900 border border-slate-800 text-amber-400 px-4 py-2.5 rounded-xl text-xs font-mono animate-pulse">
            {mensajeOperacion}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {practicas.length === 0 ? (
            <div className="bg-slate-950/40 border border-slate-900 p-8 rounded-2xl text-center space-y-4">
              <p className="text-xs font-mono text-slate-500">
                La base de datos conectada a este Vercel no contiene los registros iniciales.
              </p>
              {/* ACCIÓN CORRECTIVA DIRECTA */}
              <button
                type="button"
                disabled={inyectando}
                onClick={inicializarTablasDesdeFront}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold rounded-xl border border-amber-400/20 transition-all shadow-lg uppercase tracking-wider"
              >
                {inyectando ? 'Sincronizando...' : '⚡ Inicializar Entornos de Práctica'}
              </button>
            </div>
          ) : (
            practicas.map((practica) => {
              const fechaFormateada = practica.fecha_cierre ? practica.fecha_cierre.replace(' ', 'T').substring(0, 16) : '';
              return (
                <div key={practica.id} className={`bg-slate-950/40 border p-5 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-4 items-center transition-all ${practica.estado ? 'border-cyan-900/40 bg-cyan-950/5' : 'border-slate-900/80 opacity-60'}`}>
                  <div className="lg:col-span-4 space-y-1">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 uppercase">{practica.asignatura}</span>
                    <h3 className="text-sm font-bold text-white tracking-tight mt-1">{practica.titulo_practica}</h3>
                    <p className="font-mono text-slate-500 text-[10px]">ID: <span className="text-slate-400 font-bold">{practica.id}</span></p>
                  </div>
                  <div className="lg:col-span-3 flex flex-col justify-center">
                    <button onClick={() => toggleEstadoPractica(practica.id, practica.estado)} className={`px-4 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase transition-all border ${practica.estado ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                      {practica.estado ? '● ACTIVADO' : '○ APAGADO'}
                    </button>
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <input type="datetime-local" value={fechaFormateada} onChange={(e) => actualizarFechaCierre(practica.id, e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono w-full" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
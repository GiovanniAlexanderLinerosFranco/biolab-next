/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.3.5
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * CONSOLA MAESTRA - INFRAESTRUCTURA DE DETECCIÓN ASÍNCRONA
 * ============================================================================
 */

"use client";
import React, { useEffect, useState } from 'react';

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
  const [errorSistema, setErrorSistema] = useState<string | null>(null);
  const [mensajeOperacion, setMensajeOperacion] = useState('');
  const [draftFechas, setDraftFechas] = useState<Record<string, string>>({});

  const activarModoPrueba = (practica: PracticaConfig) => {
    const expiraEn = new Date(Date.now() + 45 * 60 * 1000).toISOString();
    const tituloPractica = practica.id === 'biolab_p2' ? 'Práctica 2: Histología' : practica.titulo_practica;

    localStorage.setItem('biolab_estudiante_sesion', JSON.stringify({
      nombre: 'Docente en modo prueba',
      email: 'giovanni.lineros@ustabuca.edu.co',
      codigo: 'DEV-TEST',
      practicaId: practica.id,
      rol: 'DEVELOPER_TEST',
      expiraEn,
      origen: 'admin-dashboard',
      tituloPractica,
    }));

    setMensajeOperacion(`✓ Modo prueba habilitado para ${tituloPractica} hasta ${new Date(expiraEn).toLocaleTimeString('es-CO')}.`);
    window.location.href = `/laboratorio/practica/${encodeURIComponent(practica.id)}`;
  };

  const formatearParaInputLocal = (fechaIso: string) => {
    if (!fechaIso) return '';
    const fecha = new Date(fechaIso);
    if (Number.isNaN(fecha.getTime())) return '';

    const tzOffsetMs = fecha.getTimezoneOffset() * 60000;
    return new Date(fecha.getTime() - tzOffsetMs).toISOString().slice(0, 16);
  };

  const cargarConfiguraciones = async () => {
    try {
      setErrorSistema(null);

      const selectPromise = fetch('/api/admin/practicas', {
        method: 'GET',
        cache: 'no-store',
      }).then((res) => res.json());

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Tiempo de espera agotado (Timeout). Supabase no responde.")), 5000)
      );

      type SelectResponse = { ok: boolean; data?: PracticaConfig[]; message?: string };
      const response = (await Promise.race([selectPromise, timeoutPromise])) as SelectResponse;
      if (!response.ok) throw new Error(response.message || 'No fue posible cargar la configuración.');

      const data = response.data ?? [];

      if (!data || data.length === 0) {
        setErrorSistema("Tabla vacía: La tabla existe pero no contiene registros.");
      } else {
        setPracticas(data);
      }
    } catch (err: unknown) {
      console.error("Error crítico detectado:", err);
      const errorMensaje = err instanceof Error ? err.message : 'Error desconocido de red o políticas RLS.';
      setErrorSistema(`Falla de Conexión Central: ${errorMensaje}`);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarConfiguraciones();
  }, []);

  const toggleEstadoPractica = async (id: string, estadoActual: boolean) => {
    setMensajeOperacion('Sincronizando con el servidor...');
    try {
      const response = await fetch(`/api/admin/practicas/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: !estadoActual }),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || 'No se pudo actualizar el estado.');
      }

      setPracticas((prev) => prev.map((p) => (p.id === id ? { ...p, estado: !estadoActual } : p)));
      setMensajeOperacion('✓ Cambio guardado exitosamente.');
    } catch (err: unknown) {
      const errorMensaje = err instanceof Error ? err.message : 'No se pudo actualizar el estado.';
      setMensajeOperacion(`❌ Error: ${errorMensaje}`);
    } finally {
      setTimeout(() => setMensajeOperacion(''), 3000);
    }
  };

  const actualizarFecha = async (
    id: string,
    campo: 'fecha_apertura' | 'fecha_cierre',
    isoFecha: string,
  ) => {
    try {
      const response = await fetch(`/api/admin/practicas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [campo]: isoFecha }),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || `No se pudo actualizar ${campo}.`);
      }

      setPracticas((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [campo]: isoFecha } : p)),
      );
      const draftKey = `${id}:${campo}`;
      setDraftFechas((prev) => {
        const next = { ...prev };
        delete next[draftKey];
        return next;
      });
    } catch (err) {
      console.error(`Error al actualizar ${campo}:`, err);
      const errorMensaje = err instanceof Error ? err.message : `No se pudo actualizar ${campo}.`;
      setMensajeOperacion(`❌ Error: ${errorMensaje}`);
      setTimeout(() => setMensajeOperacion(''), 3000);
    }
  };

  const manejarCambioFecha = (
    id: string,
    campo: 'fecha_apertura' | 'fecha_cierre',
    valorLocal: string,
  ) => {
    const draftKey = `${id}:${campo}`;
    setDraftFechas((prev) => ({ ...prev, [draftKey]: valorLocal }));

    if (!valorLocal || valorLocal.length < 16) return;

    const fecha = new Date(valorLocal);
    if (Number.isNaN(fecha.getTime())) {
      setMensajeOperacion('❌ Error: Fecha inválida. Verifique apertura/cierre.');
      setTimeout(() => setMensajeOperacion(''), 3000);
      return;
    }

    const isoFecha = fecha.toISOString();
    actualizarFecha(id, campo, isoFecha);
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-xs text-amber-500 animate-pulse">
        [SISTEMA CORE] Estableciendo canal seguro de comunicación con Supabase...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans selection:bg-amber-500/20">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="bg-slate-950/60 border border-slate-900 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-black text-amber-400 tracking-widest uppercase bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-md">
              Control de Infraestructura Maestra
            </span>
            <h1 className="text-xl font-extrabold text-white tracking-tight uppercase">
              Consola Central de Cátedra
            </h1>
            <p className="text-xs text-slate-400 font-mono">PhD. Giovanni Alexander Lineros Franco</p>
          </div>
          <button 
            onClick={() => window.location.href = '/laboratorio/registro'} 
            className="px-4 py-2 border border-slate-800 hover:bg-slate-900 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-all shadow-sm"
          >
            ← Salir al Registro
          </button>
        </header>

        {mensajeOperacion && (
          <div className="bg-slate-900 border border-slate-800 text-amber-400 px-4 py-2.5 rounded-xl text-xs font-mono">
            {mensajeOperacion}
          </div>
        )}

        {errorSistema ? (
          <div className="bg-rose-950/20 border border-rose-500/30 p-6 rounded-2xl space-y-3">
            <h3 className="text-rose-400 font-bold font-mono text-xs uppercase tracking-wider">
              🛑 Alerta de Sincronización de Base de Datos
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {errorSistema}
            </p>
            <div className="text-[11px] text-slate-500 border-t border-rose-950/40 pt-3">
              Solución: Si el error persiste tras validar las variables en Vercel, revise si la tabla requiere desactivar las políticas de seguridad Row Level Security (RLS) para lectura pública.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {practicas.map((practica) => {
              const fechaAperturaFormateada = draftFechas[`${practica.id}:fecha_apertura`] ?? formatearParaInputLocal(practica.fecha_apertura);
              const fechaCierreFormateada = draftFechas[`${practica.id}:fecha_cierre`] ?? formatearParaInputLocal(practica.fecha_cierre);
              const rutaRegistro = `/laboratorio/registro?practica=${encodeURIComponent(practica.id)}`;
              const rutaRevision = `/laboratorio/practica/${encodeURIComponent(practica.id)}`;
              const tituloPractica = practica.id === 'biolab_p2' ? 'Práctica 2: Histología' : practica.titulo_practica;

              return (
                <div 
                  key={practica.id} 
                  className={`bg-slate-950/40 border p-5 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-4 items-center transition-all ${
                    practica.estado ? 'border-cyan-900/40 bg-cyan-950/5' : 'border-slate-900/80 opacity-60'
                  }`}
                >
                  <div className="lg:col-span-4 space-y-1">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 uppercase">
                      {practica.asignatura}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight mt-1">{tituloPractica}</h3>
                    <p className="font-mono text-slate-500 text-[10px]">ID: <span className="text-slate-400 font-bold">{practica.id}</span></p>
                  </div>
                  
                  <div className="lg:col-span-3 flex flex-col justify-center">
                    <button 
                      onClick={() => toggleEstadoPractica(practica.id, practica.estado)} 
                      className={`px-4 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase transition-all border ${
                        practica.estado ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {practica.estado ? '● ACTIVADO' : '○ APAGADO'}
                    </button>
                    <div className="mt-2 flex flex-col gap-1.5">
                      <button
                        onClick={() => activarModoPrueba(practica)}
                        className="text-center px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border border-teal-800/60 text-teal-300 hover:bg-teal-950/30 transition-all"
                      >
                        Probar práctica
                      </button>
                      <a
                        href={rutaRegistro}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border border-cyan-800/60 text-cyan-300 hover:bg-cyan-950/30 transition-all"
                      >
                        Abrir enlace QR
                      </a>
                      <a
                        href={rutaRevision}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border border-amber-800/60 text-amber-300 hover:bg-amber-950/30 transition-all"
                      >
                        Revisar práctica
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-2 justify-center">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        Apertura
                      </label>
                      <input
                        type="datetime-local"
                        value={fechaAperturaFormateada}
                        onChange={(e) => manejarCambioFecha(practica.id, 'fecha_apertura', e.target.value)}
                        className="bg-slate-900 border border-emerald-900/60 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono w-full focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-widest">
                        Cierre
                      </label>
                      <input
                        type="datetime-local"
                        value={fechaCierreFormateada}
                        onChange={(e) => manejarCambioFecha(practica.id, 'fecha_cierre', e.target.value)}
                        className="bg-slate-900 border border-rose-900/60 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono w-full focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

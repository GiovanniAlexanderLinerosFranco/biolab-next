/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.2.1
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * PORTAL DE REGISTRO UNIFICADO - SINTAXIS JSX REPARADA Y BALANCEADA
 * ============================================================================
 */

"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function RegistroFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const idPracticaUrl = searchParams.get('practica') || 'biolab_p1';
  const tokenUrl = searchParams.get('token') || '';
  const rutaPracticaDinamica = `/laboratorio/practica/${encodeURIComponent(idPracticaUrl)}`;

  // Estados del Formulario Estudiante
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [documento, setDocumento] = useState('');
  const [passwordAdmin, setPasswordAdmin] = useState('');

  // Estados de Control Interno
  const [isConnecting, setIsConnecting] = useState(false);
  const [estadoPractica, setEstadoPractica] = useState<{ activa: boolean; titulo: string; checked: boolean }>({ activa: false, titulo: '', checked: false });
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [tipoAcceso, setTipoAcceso] = useState<'ESTUDIANTE' | 'ADMIN'>('ESTUDIANTE');

  const correoUSTA = /^[^\s@]+@ustabuca\.edu\.co$/;

  useEffect(() => {
    const correoLimpio = email.trim().toLowerCase();
    if (correoLimpio === 'giovanni.lineros@ustabuca.edu.co') {
      setTipoAcceso('ADMIN');
    } else {
      setTipoAcceso('ESTUDIANTE');
    }
  }, [email]);

  useEffect(() => {
    const verificarDisponibilidad = async () => {
      try {
        const response = await fetch(`/api/registro/practica/${idPracticaUrl}`, {
          method: 'GET',
          cache: 'no-store',
        });
        const payload = (await response.json()) as {
          ok: boolean;
          data?: { estado: boolean; titulo_practica: string };
        };

        if (!response.ok || !payload.ok || !payload.data) {
          setEstadoPractica({ activa: false, titulo: 'Práctica No Identificada', checked: true });
          return;
        }

        setEstadoPractica({
          activa: payload.data.estado,
          titulo: payload.data.titulo_practica,
          checked: true
        });
      } catch (err) {
        console.error("Error consultando configuración remota:", err);
        setEstadoPractica({ activa: false, titulo: 'Práctica No Identificada', checked: true });
      }
    };

    verificarDisponibilidad();
  }, [idPracticaUrl]);

  const procesarRegistroPiloto = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeAlerta('');

    if (!email.trim()) {
      alert("Por favor, ingrese su correo institucional.");
      return;
    }

    if (!correoUSTA.test(email.trim())) {
      setMensajeAlerta("❌ Acceso Denegado: Para este piloto intersemestral, es obligatorio el uso exclusivo de tu correo institucional (@ustabuca.edu.co).");
      return;
    }

    // Bypass de desarrollador: acceso directo sin validaciones adicionales
    if (email.trim().toLowerCase() === 'giovanni.lineros@ustabuca.edu.co') {
      setRegistroExitoso(true);
      setTimeout(() => router.push(rutaPracticaDinamica), 800);
      return;
    }

    setIsConnecting(true);

    if (tipoAcceso === 'ADMIN') {
      const MASTER_PASSWORD = 'BioGalfAdmin2026*';

      if (passwordAdmin !== MASTER_PASSWORD) {
        setMensajeAlerta("❌ Contraseña Administrativa Incorrecta. Acceso de Cátedra denegado.");
        setIsConnecting(false);
        return;
      }

      setRegistroExitoso(true);
      setTimeout(() => {
        router.push('/admin');
      }, 1500);
      return;
    }

    if (!nombre.trim() || !documento.trim()) {
      alert("Por favor, complete su nombre y documento de identidad.");
      setIsConnecting(false);
      return;
    }

    if (!estadoPractica.activa) {
      setMensajeAlerta("⚠️ Control de Cátedra: La práctica seleccionada no se encuentra activa en este momento. Por favor, solicite al docente la apertura del entorno.");
      setIsConnecting(false);
      return;
    }

    try {
      const fingerprintHardware = btoa(navigator.userAgent + navigator.hardwareConcurrency).substring(0, 32);

      const response = await fetch('/api/registro/ingreso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim(),
          codigo: codigo.trim(),
          documento: documento.trim(),
          practicaId: idPracticaUrl,
          token: tokenUrl,
          fingerprint: fingerprintHardware,
        }),
      });

      const payload = (await response.json()) as { ok: boolean; code?: string; message?: string };

      if (response.status === 409 || payload.code === 'DUPLICATE') {
        setMensajeAlerta("🔒 Alerta de Integridad: Ya existe un registro de asistencia y un intento en curso con estas credenciales.");
        setIsConnecting(false);
        return;
      }

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || 'No se pudo completar el registro.');
      }

      localStorage.setItem('biolab_estudiante_sesion', JSON.stringify({
        nombre: nombre.trim(),
        email: email.trim(),
        codigo: codigo.trim() || documento.trim()
      }));

      setRegistroExitoso(true);
      
      setTimeout(() => {
        const rutaDestino = idPracticaUrl === 'biolab_p2' ? '/laboratorio/practica2' : '/laboratorio/practica1';
        router.push(rutaDestino);
      }, 2000);

} catch (error) {
      console.error("Error en registro:", error);
      setMensajeAlerta("Falla técnica de sincronización. Intente nuevamente.");
    } // LINE 175: CORRECCIÓN DE TIPEO
    finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <div className="w-full max-w-5xl bg-slate-950/40 border border-slate-900 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl backdrop-blur-md min-h-[580px]">
        
        {/* PANEL IZQUIERDO: IMAGEN DEL LABORATORIO REAL */}
        <div className="lg:col-span-6 relative bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-8 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-900">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div className="relative z-10">
            <span className="text-[9px] font-mono font-black text-cyan-400 tracking-widest uppercase bg-cyan-950/50 border border-cyan-800/40 px-2 py-1 rounded-md">
              BioLAB Virtual System v3.2
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-4 tracking-tight leading-tight uppercase font-sans">
              División de Ciencias <br />de la Salud
            </h1>
          </div>

{/* CONTENEDOR MODIFICADO PARA CARGAR LA FOTO DEL LABORATORIO USTA EN COLORES REALES */}
<div className="my-6 relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-inner">
  <img 
    src="/assets/banner-guia1.png" 
    alt="Laboratorio Biología Celular y Molecular USTA" 
    // CORREGIDO: Eliminado 'grayscale' y ajustada la opacidad
    className="object-cover w-full h-full opacity-80 transition-all duration-300" 
  />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
</div>

          <div className="relative z-10 text-[10px] font-mono text-slate-500 pt-4 border-t border-slate-900 flex justify-between items-center">
            <span>© 2026 PhD. Giovanni Alexander Lineros F.</span>
            <span className="text-cyan-600 font-bold">PROPERTY OF BIOGALF</span>
          </div>
        </div>

        {/* PANEL DERECHO: FORMULARIO */}
        <div className="lg:col-span-6 p-8 flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">
              {tipoAcceso === 'ADMIN' ? 'Autenticación Docente' : 'Registro de Asistencia'}
            </h2>
            {estadoPractica.checked && tipoAcceso === 'ESTUDIANTE' && (
              <p className="text-xs font-mono text-cyan-400 mt-1">
                🧪 Evaluando: <span className="underline font-sans font-bold text-slate-200">{estadoPractica.titulo}</span>
              </p>
            )}
          </div>

          {registroExitoso ? (
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3 animate-pulse">
              <div className="text-emerald-400 text-3xl">✓</div>
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                {tipoAcceso === 'ADMIN' ? 'Sesión de Cátedra Concedida' : 'Identificación Aprobada'}
              </h3>
              <p className="text-xs text-slate-400">Redirigiendo al entorno de trabajo correspondiente...</p>
            </div>
          ) : (
            <form onSubmit={procesarRegistroPiloto} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">Correo Institucional USTA:</label>
                  <input
                    required
                    type="email"
                    placeholder="ejemplo@ustabuca.edu.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono font-semibold transition-all"
                  />
                </div>

                {tipoAcceso === 'ADMIN' ? (
                  <div className="animate-fade-in">
                    <label className="block text-[10px] font-mono text-amber-400 uppercase font-bold mb-1">Contraseña de Seguridad Central:</label>
                    <input
                      required
                      type="password"
                      placeholder="Ingrese su clave de administrador..."
                      value={passwordAdmin}
                      onChange={(e) => setPasswordAdmin(e.target.value)}
                      className="w-full bg-slate-900/60 border border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono font-semibold transition-all"
                    />
                  </div>
                ) : (
                  <div className="space-y-3 animate-fade-in">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">Nombre Completo:</label>
                      <input
                        type="text"
                        placeholder="Ingrese sus dos nombres y apellidos..."
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">Código Estudiantil:</label>
                        <input
                          type="text"
                          maxLength={8}
                          placeholder="Ej: 2214056"
                          value={codigo}
                          onChange={(e) => setCodigo(e.target.value)}
                          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">Cédula de Ciudadanía:</label>
                        <input
                          type="text"
                          placeholder="Número de documento..."
                          value={documento}
                          onChange={(e) => setDocumento(e.target.value)}
                          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono font-semibold transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {mensajeAlerta && (
                <div className="bg-slate-950 border border-slate-800 text-slate-300 p-3 rounded-xl text-[11px] leading-relaxed font-sans shadow-inner">
                  {mensajeAlerta}
                </div>
              )}

              <button
                type="submit"
                disabled={isConnecting}
                className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg border disabled:opacity-40 ${
                  tipoAcceso === 'ADMIN' 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400/20' 
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400/20'
                }`}
              >
                {isConnecting ? "Procesando Autenticación..." : tipoAcceso === 'ADMIN' ? "Acceder a Consola Administrativa" : "Validar e Ingresar al Laboratorio"}
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}

export default function RegistroLaboratorioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-xs text-cyan-400 animate-pulse">
        Inicializando pasarela de registro unificado...
      </div>
    }>
      <RegistroFormContent />
    </Suspense>
  );
}
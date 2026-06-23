/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v2.5.6
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * RESOLUCIÓN DE COMPATIBILIDAD DE DISPATCH SIN CASTEO SEGURO
 * ============================================================================
 */

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Paso1_Bioseguridad from '@/components/practica1/Paso1_Bioseguridad';
import Paso2_Fundamentos from '@/components/practica1/Paso2_Fundamentos';
import Paso3_Microscopio from '@/components/practica1/Paso3_Microscopio';
import Paso5_Bitacora from '@/components/practica1/Paso5_Bitacora';
import { verificarLicenciaPropiedadIntelectual } from '@/lib/copyrightGuard';
import { inicializarSeguridadPortapapeles } from '@/lib/antiFraude';

export default function Practica1Page() {
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [estudianteEmail, setEstudianteEmail] = useState('');
  const [estudianteCodigo, setEstudianteCodigo] = useState('');
  const [estudianteDocumento, setEstudianteDocumento] = useState('');
  
  // Declaración directa usando la firma indexada nativa que acepta Paso2 y Paso5 simultáneamente
  const [respuestasDesafios, setRespuestasDesafios] = useState<{
    virus: string;
    animal: string;
    vegetal: string;
    hongo: string;
    protozoo: string;
    [key: string]: string; // Firma de índice para compatibilidad total con Record<string, string>
  }>({
    virus: '',
    animal: '',
    vegetal: '',
    hongo: '',
    protozoo: ''
  });

  const [pasoActual, setPasoActual] = useState(1);
  const [accesoAutorizado, setAccesoAutorizado] = useState(false);
  const [licenciaValida, setLicenciaValida] = useState<boolean | null>(null);
  const [errorLicencia, setErrorLicencia] = useState('');

  const ID_PRACTICA = 'biolab_p1';

  useEffect(() => {
    const validarDerechosAutor = async () => {
      const proteccion = await verificarLicenciaPropiedadIntelectual(ID_PRACTICA);
      
      if (!proteccion.autorizado) {
        setLicenciaValida(false);
        setErrorLicencia(proteccion.msg);
        return;
      }
      if (licenciaValida === null) setLicenciaValida(true);
    };

    validarDerechosAutor();

    const limpiarSeguridad = inicializarSeguridadPortapapeles();
    
    return () => {
      if (limpiarSeguridad) limpiarSeguridad();
    };
  }, [licenciaValida]);

  if (licenciaValida === false) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center select-none">
        <div className="max-w-md bg-red-950/20 border border-red-900/50 p-8 rounded-3xl space-y-4 shadow-2xl shadow-red-950/50">
          <div className="text-red-500 text-4xl animate-pulse">⚠️</div>
          <h2 className="text-white font-mono text-xs font-black tracking-widest uppercase">Sistema de Seguridad BioGALF</h2>
          <p className="text-xs text-red-400 font-sans leading-relaxed">{errorLicencia}</p>
          <div className="flex gap-2 justify-center">
            <Link
              href="/laboratorio"
              className="px-3 py-2 rounded-xl text-[10px] font-mono font-bold uppercase border border-slate-700 text-slate-300 hover:bg-slate-900"
            >
              Panel de Prácticas
            </Link>
            <Link
              href="/admin"
              className="px-3 py-2 rounded-xl text-[10px] font-mono font-bold uppercase border border-amber-700 text-amber-300 hover:bg-amber-950/30"
            >
              Dashboard Admin
            </Link>
          </div>
          <div className="text-[9px] text-slate-600 font-mono pt-4 border-t border-red-950/60">
            Copyright © 2026 BioGALF Home Health S.A.S. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }

  if (licenciaValida === null) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-xs text-cyan-400 animate-pulse">
        Verificando firma de seguridad criptográfica...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xs font-mono font-black text-cyan-400 tracking-wider uppercase">Práctica 1: Modelos Celulares y Microscopía</h2>
            {estudianteNombre && (
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">🧑‍🔬 Investigador: {estudianteNombre} {estudianteCodigo ? `(${estudianteCodigo})` : ''}</p>
            )}
            <div className="mt-2 flex gap-2">
              <Link
                href="/laboratorio"
                className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border border-slate-700 text-slate-300 hover:bg-slate-900"
              >
                Panel
              </Link>
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase border border-amber-700 text-amber-300 hover:bg-amber-950/30"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-mono">
            {[1, 2, 3, 5].map((paso) => (
              <button
                key={paso}
                disabled={!accesoAutorizado && paso !== 1}
                onClick={() => setPasoActual(paso)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  pasoActual === paso 
                    ? 'bg-cyan-600 text-white font-bold' 
                    : !accesoAutorizado && paso !== 1
                    ? 'opacity-30 cursor-not-allowed text-slate-600'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Estación {paso === 5 ? 4 : paso}
              </button>
            ))}
          </div>
        </header>

        <div className="transition-all duration-300">
          {pasoActual === 1 && (
            <Paso1_Bioseguridad
              estudianteNombre={estudianteNombre}
              setEstudianteNombre={setEstudianteNombre}
              estudianteEmail={estudianteEmail}
              setEstudianteEmail={setEstudianteEmail}
              estudianteCodigo={estudianteCodigo}
              setEstudianteCodigo={setEstudianteCodigo}
              estudianteDocumento={estudianteDocumento}
              setEstudianteDocumento={setEstudianteDocumento}
              onAccesoConcedido={() => setAccesoAutorizado(true)}
            />
          )}

          {pasoActual === 2 && accesoAutorizado && (
            <Paso2_Fundamentos 
              estudianteNombre={estudianteNombre}
              respuestasDesafios={respuestasDesafios}
              setRespuestasDesafios={setRespuestasDesafios} // Conexión directa y fluida sin casteos
            />
          )}

          {pasoActual === 3 && accesoAutorizado && (
            <Paso3_Microscopio />
          )}

          {pasoActual === 5 && accesoAutorizado && (
            <Paso5_Bitacora 
              estudianteNombre={estudianteNombre}
              estudianteEmail={estudianteEmail}
              respuestasDesafios={respuestasDesafios}
            />
          )}
        </div>

      </div>
    </main>
  );
}
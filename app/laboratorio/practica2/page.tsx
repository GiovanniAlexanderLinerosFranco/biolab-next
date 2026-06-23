/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.2.0
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * INTEGRACIÓN CON EL CORE ENGINE DE ASISTENCIA Y VERIFICACIÓN AUTÓNOMA
 * ============================================================================
 */

"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Paso1_Bioseguridad_P2 from '@/components/practica2/Paso1_Bioseguridad_P2';
import Paso2_Diagnostico_P2 from '@/components/practica2/Paso2_Diagnostico_P2';
import Paso3_Atlas_P2 from '@/components/practica2/Paso3_Atlas_P2';
import Paso4_Bitacora_P2 from '@/components/practica2/Paso4_Bitacora_P2';
import { verificarLicenciaPropiedadIntelectual } from '@/lib/copyrightGuard';

export default function Practica2Histologia() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Estados de sesión recuperados automáticamente del Core Engine
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [estudianteEmail, setEstudianteEmail] = useState('');
  const [estudianteCodigo, setEstudianteCodigo] = useState('');
  const [licenciaValida, setLicenciaValida] = useState<boolean | null>(null);

  const [respuestasDesafios, setRespuestasDesafios] = useState({
    epitelial: '',
    conectivo: '',
    muscular: '',
    nervioso: ''
  });

  const ID_PRACTICA = 'biolab_p2';
  const steps = ["Flujo Bioseguridad", "Caracterización Tisular", "Simulación Microscópica", "Validación de Bitácora"];

  // Sincronización e Integridad de Datos al cargar la página
  useEffect(() => {
    // 1. Validar Propiedad Intelectual y Estado On/Off del Interruptor de la Consola
    const validarEntorno = async () => {
      const proteccion = await verificarLicenciaPropiedadIntelectual(ID_PRACTICA);
      if (!proteccion.autorizado) {
        setLicenciaValida(false);
        alert(`SISTEMA BLOQUEADO: ${proteccion.msg}`);
        router.push('/laboratorio/registro?practica=biolab_p2');
        return;
      }
      setLicenciaValida(true);
    };
    
    validarEntorno();

    // 2. Extraer datos de la Pasarela del Viernes (Evita reescritura manual del alumno)
    const sesionGuardada = localStorage.getItem('biolab_estudiante_sesion');
    if (sesionGuardada) {
      try {
        const datos = JSON.parse(sesionGuardada) as {
          nombre?: string;
          email?: string;
          codigo?: string;
          practicaId?: string;
          rol?: string;
        };

        const practicaValida = datos.practicaId === ID_PRACTICA;

        if (!practicaValida) {
          alert('Sesión inválida para esta práctica. Registre su ingreso en el QR de la Práctica 2.');
          router.push('/laboratorio/registro?practica=biolab_p2');
          return;
        }

        setEstudianteNombre(datos.nombre || '');
        setEstudianteEmail(datos.email || '');
        setEstudianteCodigo(datos.codigo || '');
      } catch (e) {
        console.error("Error al parsear sesión del núcleo:", e);
      }
    } else {
      // Si el vivo intenta entrar directo saltándose la asistencia, lo mandamos de vuelta
      alert("Acceso Restringido: Debe registrar su asistencia antes de iniciar el simulador.");
      router.push('/laboratorio/registro?practica=biolab_p2');
    }
  }, [router]);

  if (licenciaValida === false) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-6 text-center space-y-4 max-w-md">
          <p className="font-mono text-xs text-red-500">ACCESO INTERRUMPIDO DESDE LA CONSOLA DOCENTE</p>
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
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative font-sans text-slate-200 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* BANNER DE FONDO FIJO */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/assets/banner-guia1.png" 
          alt="BioLab Histología Banner" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-[5px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto p-3 md:p-8 flex flex-col flex-1 gap-6">
        
        {/* NAVEGACIÓN SUPERIOR INTEGRADA */}
        <header className="flex flex-col lg:flex-row justify-between items-center bg-slate-950/70 p-4 md:p-6 rounded-3xl border border-slate-800/80 backdrop-blur-2xl shadow-2xl gap-4">
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex gap-2">
              <Link 
                href="/laboratorio" 
                className="px-5 py-2 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 hover:bg-cyan-500 hover:text-white flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                ← Panel
              </Link>
              <Link 
                href="/admin" 
                className="px-5 py-2 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all bg-amber-950/60 text-amber-300 border border-amber-800/50 hover:bg-amber-500 hover:text-white flex items-center gap-2"
              >
                Dashboard
              </Link>
            </div>
            <div className="text-right lg:text-left">
              <span className="bg-cyan-500/10 text-cyan-400 text-[9px] font-mono font-black px-2.5 py-0.5 rounded-full border border-cyan-500/20 uppercase tracking-wider">USTA • División Salud</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 w-full lg:w-auto">
            {steps.map((s, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentStep(i)} 
                className={`px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 border ${
                  currentStep === i 
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className="opacity-40 mr-1 font-mono font-normal">{i + 1}.</span>
                {s}
              </button>
            ))}
          </div>
        </header>

        {/* LAYOUT EN DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start flex-1">
          
          {/* MARCO LATERAL IZQUIERDO DE CONTEXTO AUTÓNOMO */}
          <aside className="lg:col-span-1 bg-slate-950/50 border border-slate-800/80 p-5 rounded-3xl backdrop-blur-xl space-y-5 shadow-xl hidden lg:block">
            <div>
              <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1 font-mono">Tema Eje</h3>
              <p className="text-xs text-white font-bold leading-snug">Tejidos y organización celular humana en salud oral y visual.</p>
            </div>
            
            <div className="border-t border-slate-800 pt-3">
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1 font-mono">Pregunta Reto</h3>
              <p className="text-[11px] text-slate-300 italic leading-relaxed">
                &quot;¿Cómo se agrupan y especializan las poblaciones celulares para construir capas de soporte y protección?&quot;
              </p>
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">Resultados Esperados</h3>
              <ul className="space-y-1.5 text-[11px] text-slate-400 leading-tight">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span> Identificar linajes epiteliales y conectivos.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span> Discriminar morfologías estriadas y neuronales.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span> Operar el carro mecánico del microscopio.
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-800 pt-3 bg-cyan-950/10 p-3 rounded-2xl border border-cyan-900/30">
              <h3 className="text-[9px] font-black text-cyan-400 uppercase tracking-wider mb-1 font-mono">Estado de Rúbrica</h3>
              <div className="text-[10px] text-slate-400 space-y-1 font-mono">
                <div>• Desafíos: <span className={Object.values(respuestasDesafios).filter(Boolean).length === 4 ? "text-teal-400 font-bold" : "text-amber-500 font-bold"}>{Object.values(respuestasDesafios).filter(Boolean).length}/4</span></div>
                <div>• Red: <span className={estudianteNombre ? "text-teal-400 font-bold" : "text-rose-500 font-bold"}>{estudianteNombre ? "ONLINE" : "OFFLINE"}</span></div>
                {estudianteCodigo && <div className="text-[9px] text-slate-500 block truncate">• Cód: {estudianteCodigo}</div>}
              </div>
            </div>
          </aside>

          {/* COLUMNA PRINCIPAL DE TRABAJO */}
          <section className="lg:col-span-3 bg-slate-900/50 border border-slate-800/40 rounded-[2rem] p-4 md:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between min-h-[580px]">
            <div className="w-full flex-1">
              {currentStep === 0 && (
                <Paso1_Bioseguridad_P2 
                  estudianteNombre={estudianteNombre} 
                  setEstudianteNombre={setEstudianteNombre}
                  estudianteEmail={estudianteEmail}
                  setEstudianteEmail={setEstudianteEmail}
                />
              )}
              {currentStep === 1 && (
                <Paso2_Diagnostico_P2 
                  estudianteNombre={estudianteNombre}
                  respuestasDesafios={respuestasDesafios} 
                  setRespuestasDesafios={setRespuestasDesafios} 
                />
              )}
              {currentStep === 2 && (
                <Paso3_Atlas_P2 
                  estudianteNombre={estudianteNombre}
                />
              )}
              {currentStep === 3 && (
                <Paso4_Bitacora_P2 
                  estudianteNombre={estudianteNombre} 
                  estudianteEmail={estudianteEmail}
                  respuestasDesafios={respuestasDesafios}
                />
              )}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-800/80 pt-6">
              <button 
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} 
                disabled={currentStep === 0} 
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                  currentStep === 0 ? 'opacity-0 cursor-default pointer-events-none' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                ◀ ESTACIÓN ANTERIOR
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button 
                  onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))} 
                  className="w-full sm:w-auto px-8 py-2.5 rounded-xl text-xs font-bold font-mono transition-all bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white border border-cyan-400/40 tracking-wider"
                >
                  SIGUIENTE ESTACIÓN ▶
                </button>
              ) : (
                <div className="text-[10px] font-mono text-teal-400 font-black uppercase tracking-widest bg-teal-950/30 border border-teal-800/40 px-4 py-2 rounded-xl animate-pulse text-center w-full sm:w-auto">
                  🛡️ Complete la bitácora para registrar el reporte científico
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
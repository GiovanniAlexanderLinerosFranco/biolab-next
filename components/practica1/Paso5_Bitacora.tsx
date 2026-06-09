"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// 1. INTERFAZ: Instruye a TypeScript para recibir los datos globales de la sesión
interface Paso5Props {
  estudianteNombre: string;
  respuestasDesafios: Record<string, string>;
}

// 2. RECEPCIÓN DE PROPS: Se inyectan las variables en el componente
export default function Paso5_Bitacora({ estudianteNombre, respuestasDesafios }: Paso5Props) {
  
  const [guardando, setGuardando] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState<'idle' | 'success' | 'error'>('idle');

  // LÍMITES DE CARACTERES MÁXIMOS POR CAJÓN PARA FORZAR CAPACIDAD DE SÍNTESIS
  const LIMITE_TABLA = 180;
  const LIMITE_CUESTIONARIO = 300;

  // 1. ESTADO DE LA BITÁCORA DIGITAL (Muestras A, B, C, D, E)
  const [bitacoraMuestras, setBitacoraMuestras] = useState({
    A: { tipo: '', rasgos: '', estructuras: '', justificacion: '' },
    B: { tipo: '', rasgos: '', estructuras: '', justificacion: '' },
    C: { tipo: '', rasgos: '', estructuras: '', justificacion: '' },
    D: { tipo: '', rasgos: '', estructuras: '', justificacion: '' },
    E: { tipo: '', rasgos: '', estructuras: '', justificacion: '' },
  });

  // 2. ESTADO DEL ANÁLISIS DE CONTRASTE (Tabla comparativa)
  const [analisisContraste, setAnalisisContraste] = useState('');

  // 3. ESTADO DE LAS CONCLUSIONES ARGUMENTADAS (Cuestionario final)
  const [conclusiones, setConclusiones] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: ''
  });

  // FUNCIÓN ANTI-FRAUDE: Bloquea copiar y pegar de IAs o fuentes externas
  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Control Académico: Para validar el desarrollo de competencias científicas y de síntesis, la transcripción debe ser manual. No se permite pegar contenido externo.");
  };

  // Manejador dinámico para las celdas de la tabla de muestras
  const manejarCambioMuestra = (muestra: 'A'|'B'|'C'|'D'|'E', campo: string, valor: string) => {
    if (valor.length <= LIMITE_TABLA) {
      setBitacoraMuestras(prev => ({
        ...prev,
        [muestra]: { ...prev[muestra], [campo]: valor }
      }));
    }
  };

  // Envío automatizado de datos a Supabase con verificación estricta de TypeScript
  const enviarBitacora = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setEstadoEnvio('idle');

    // Cláusula de guarda para asegurar que supabase no sea null si no hay variables de entorno aún
    if (!supabase) {
      console.warn("Simulación local: Supabase no está configurado aún. Datos capturados:", {
        estudianteNombre: estudianteNombre || "Anónimo",
        respuestasDesafios,
        bitacoraMuestras,
        analisisContraste,
        conclusiones
      });
      // Simulamos un éxito local para que el flujo de la PWA no se tranque
      setTimeout(() => {
        setEstadoEnvio('success');
        setGuardando(false);
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase
        .from('bitacoras_practica_1')
        .insert([
          {
            estudiante_nombre: estudianteNombre || "Anónimo",
            respuestas_desafios: respuestasDesafios,
            tabla_muestras: bitacoraMuestras,
            analisis_contraste: analisisContraste,
            conclusiones_preguntas: conclusiones,
            fecha_registro: new Date().toISOString(),
          }
        ]);

      if (error) throw error;
      setEstadoEnvio('success');
    } catch (error) {
      console.error("Error al registrar datos en Supabase:", error);
      setEstadoEnvio('error');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-4 lg:p-6 text-slate-200">
      
      {/* SECCIÓN DE ENCABEZADO CIENTÍFICO */}
      <div className="mb-6 border-b border-slate-800 pb-4">
        <div className="text-teal-500 font-bold text-xs tracking-widest mb-1 uppercase">
          Estación 04
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
          Bitácora Oficial de Evaluación e Interpretación
        </h1>
        <p className="text-slate-400 text-sm max-w-4xl">
          Consolide los hallazgos morfológicos y los desafíos resueltos. Sesión activa a nombre del investigador: <span className="text-cyan-400 font-bold font-mono">{estudianteNombre || "No identificado (Regrese a la Estación 1)"}</span>.
        </p>
      </div>

      {/* GUÍA DE USO INTUITIVA */}
      <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-xl flex items-center gap-3 mb-6">
        <span className="text-xl">💡</span>
        <p className="text-blue-200 text-xs leading-relaxed">
          <strong>Guía de uso:</strong> Complete cada casilla digitando sus observaciones sintéticas. Los contadores le indicarán el espacio remanente. Una vez finalizado todo el formulario, haga clic en el botón inferior para sincronizar su registro con la base de datos de calificaciones.
        </p>
      </div>

      <form onSubmit={enviarBitacora} className="space-y-8">
        
        {/* IDENTIFICACIÓN DEL ESTUDIANTE: Ahora es un panel de confirmación */}
        <div className={`border p-4 rounded-xl max-w-md backdrop-blur-sm ${estudianteNombre ? 'bg-teal-900/20 border-teal-800' : 'bg-rose-900/20 border-rose-800'}`}>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Identidad Validada para el Reporte:
          </label>
          <div className={`text-lg font-bold ${estudianteNombre ? 'text-teal-400' : 'text-rose-400'}`}>
            {estudianteNombre ? `✔️ ${estudianteNombre}` : '⚠️ Perfil no validado. Regrese a Bioseguridad.'}
          </div>
        </div>

        {/* 1. ACTIVIDAD: BITÁCORA DIGITAL (TABLA MUESTRAS A-E) */}
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-4 lg:p-6 shadow-xl">
          <div className="mb-4">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-1">Actividad 01</span>
            <h2 className="text-xl font-bold text-white">Registro de Evidencia Observacional (Muestras Panorama A-E)</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse bg-slate-950/40 text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase tracking-wider">
                  <th className="p-3 text-center w-12">Muestra</th>
                  <th className="p-3 w-48">Tipo de Célula Propuesto</th>
                  <th className="p-3">Rasgos Observados (Forma, Agregación)</th>
                  <th className="p-3">Estructuras Visibles (Núcleo, Pared)</th>
                  <th className="p-3">Justificación Científica Conclusiva</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(['A', 'B', 'C', 'D', 'E'] as const).map((letra) => (
                  <tr key={letra} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-3 text-center font-black text-sm text-teal-400 bg-slate-900/40">{letra}</td>
                    <td className="p-2">
                      <input 
                        type="text" required placeholder="Procariota / Eucariota..."
                        value={bitacoraMuestras[letra].tipo}
                        onChange={(e) => manejarCambioMuestra(letra, 'tipo', e.target.value)}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded p-1.5 focus:border-teal-500 text-xs focus:outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <textarea 
                        required placeholder="Describa bordes, agrupación..."
                        value={bitacoraMuestras[letra].rasgos}
                        onChange={(e) => manejarCambioMuestra(letra, 'rasgos', e.target.value)}
                        onPaste={prevenirFraude} onDrop={prevenirFraude}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded p-1.5 focus:border-teal-500 text-xs focus:outline-none resize-none h-14"
                      />
                      <div className="text-[9px] text-slate-600 text-right font-mono">{bitacoraMuestras[letra].rasgos.length}/{LIMITE_TABLA}</div>
                    </td>
                    <td className="p-2">
                      <textarea 
                        required placeholder="Presencia/ausencia organelos..."
                        value={bitacoraMuestras[letra].estructuras}
                        onChange={(e) => manejarCambioMuestra(letra, 'estructuras', e.target.value)}
                        onPaste={prevenirFraude} onDrop={prevenirFraude}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded p-1.5 focus:border-teal-500 text-xs focus:outline-none resize-none h-14"
                      />
                      <div className="text-[9px] text-slate-600 text-right font-mono">{bitacoraMuestras[letra].estructuras.length}/{LIMITE_TABLA}</div>
                    </td>
                    <td className="p-2">
                      <textarea 
                        required placeholder="Sustente con evidencia morfológica..."
                        value={bitacoraMuestras[letra].justificacion}
                        onChange={(e) => manejarCambioMuestra(letra, 'justificacion', e.target.value)}
                        onPaste={prevenirFraude} onDrop={prevenirFraude}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded p-1.5 focus:border-teal-500 text-xs focus:outline-none resize-none h-14"
                      />
                      <div className="text-[9px] text-slate-600 text-right font-mono">{bitacoraMuestras[letra].justificacion.length}/{LIMITE_TABLA}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. ACTIVIDAD: MATRIZ DE COMPARACIÓN ESTRUCTURADA INTEGRADA */}
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-4 lg:p-6 shadow-xl">
          <div className="mb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Actividad 02</span>
            <h2 className="text-xl font-bold text-white">Contraste entre Dominios y Modelos Celulares (Referencial Fisiológico)</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 mb-4">
            <table className="w-full text-left border-collapse bg-slate-950/20 text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="p-2.5">Criterio Diagnóstico</th>
                  <th className="p-2.5 text-amber-500/80">Bacteria</th>
                  <th className="p-2.5 text-teal-400/80">Célula Vegetal</th>
                  <th className="p-2.5 text-blue-400/80">Célula Animal</th>
                  <th className="p-2.5 text-purple-400/80">Hongo Filamentoso</th>
                  <th className="p-2.5 text-pink-400/80">Levadura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-medium text-slate-300">
                <tr>
                  <th className="p-2 bg-slate-900/20 font-bold text-slate-400">¿Tiene núcleo visible?</th>
                  <td className="p-2 text-rose-400/80">No</td>
                  <td className="p-2 text-teal-400/80">Sí</td>
                  <td className="p-2 text-teal-400/80">Sí</td>
                  <td className="p-2 text-teal-400/80">Sí</td>
                  <td className="p-2 text-teal-400/80">Sí</td>
                </tr>
                <tr>
                  <th className="p-2 bg-slate-900/20 font-bold text-slate-400">¿Presenta pared celular?</th>
                  <td className="p-2 text-teal-400/80">Sí (Peptidoglicano)</td>
                  <td className="p-2 text-teal-400/80">Sí (Celulosa)</td>
                  <td className="p-2 text-rose-400/80">No</td>
                  <td className="p-2 text-teal-400/80">Sí (Quitina)</td>
                  <td className="p-2 text-teal-400/80">Sí (Glucanos)</td>
                </tr>
                <tr>
                  <th className="p-2 bg-slate-900/20 font-bold text-slate-400">Organelos visibles (Óptica)</th>
                  <td className="p-2 text-rose-400/80">No</td>
                  <td className="p-2 text-teal-400/80">Sí (Cloroplastos/Vacuola)</td>
                  <td className="p-2 text-teal-400/80">Sí (Núcleo teñido)</td>
                  <td className="p-2 text-teal-400/80">Sí (Tabiques/Hifas)</td>
                  <td className="p-2 text-teal-400/80">Sí (Vacuolas)</td>
                </tr>
                <tr>
                  <th className="p-2 bg-slate-900/20 font-bold text-slate-400">Morfología predominante</th>
                  <td className="p-2 italic">Cocos, bacilos, espirilos</td>
                  <td className="p-2 italic">Poligonal o prismática</td>
                  <td className="p-2 italic">Irregular o redondeada</td>
                  <td className="p-2 italic">Filamentosa tubular</td>
                  <td className="p-2 italic">Ovalada o esférica</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              Análisis Analítico de Contraste:
            </label>
            <textarea
              required
              placeholder="Basándose en la matriz superior, redacte una síntesis sobre cómo la composición de la envoltura externa define el patrón geométrico..."
              value={analisisContraste}
              onChange={(e) => e.target.value.length <= LIMITE_CUESTIONARIO && setAnalisisContraste(e.target.value)}
              onPaste={prevenirFraude} onDrop={prevenirFraude}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-amber-500 focus:outline-none resize-none h-24 leading-relaxed"
            />
            <div className="text-[10px] text-slate-500 text-right font-mono">{analisisContraste.length}/{LIMITE_CUESTIONARIO}</div>
          </div>
        </div>

        {/* 3. ACTIVIDAD: INTERPRETA (CONCLUSIONES ARGUMENTADAS) */}
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-4 lg:p-6 shadow-xl space-y-6">
          <div className="mb-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">Actividad 03</span>
            <h2 className="text-xl font-bold text-white">Interpretación de Sistemas Vivos y Correlación de Salud</h2>
          </div>

          {/* PREGUNTA 1 */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-xs font-bold text-slate-300">
              1. ¿Qué modelo o muestra biológica observada en el simulador le ofreció más evidencia inequívoca para clasificarla como eucariota y por qué bases morfológicas?
            </label>
            <textarea
              required
              placeholder="Escriba su análisis fundamentado en la presencia de compartimentos..."
              value={conclusiones.pregunta1}
              onChange={(e) => e.target.value.length <= LIMITE_CUESTIONARIO && setConclusiones({...conclusiones, pregunta1: e.target.value})}
              onPaste={prevenirFraude} onDrop={prevenirFraude}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:border-purple-500 focus:outline-none resize-none h-20"
            />
            <div className="text-[10px] text-slate-500 text-right font-mono">{conclusiones.pregunta1.length}/{LIMITE_CUESTIONARIO}</div>
          </div>

          {/* PREGUNTA 2 */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-xs font-bold text-slate-300">
              2. ¿En qué caso específico su hipótesis predictiva inicial se vio modificada o refinada al aplicar la resolución óptica de los objetivos macro y micrométricos?
            </label>
            <textarea
              required
              placeholder="Describa el contraste entre su análisis preliminar panorama y la observación nítida..."
              value={conclusiones.pregunta2}
              onChange={(e) => e.target.value.length <= LIMITE_CUESTIONARIO && setConclusiones({...conclusiones, pregunta2: e.target.value})}
              onPaste={prevenirFraude} onDrop={prevenirFraude}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:border-purple-500 focus:outline-none resize-none h-20"
            />
            <div className="text-[10px] text-slate-500 text-right font-mono">{conclusiones.pregunta2.length}/{LIMITE_CUESTIONARIO}</div>
          </div>

          {/* PREGUNTA 3 */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-xs font-bold text-slate-300">
              3. ¿Cómo condiciona la compartimentalización celular y la envoltura estructural la respuesta fisiológica o farmacológica de un tejido en un contexto clínico o de salud?
            </label>
            <textarea
              required
              placeholder="Argumente la relación estructura-función vinculando conceptos como la pared bacteriana..."
              value={conclusiones.pregunta3}
              onChange={(e) => e.target.value.length <= LIMITE_CUESTIONARIO && setConclusiones({...conclusiones, pregunta3: e.target.value})}
              onPaste={prevenirFraude} onDrop={prevenirFraude}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:border-purple-500 focus:outline-none resize-none h-20"
            />
            <div className="text-[10px] text-slate-500 text-right font-mono">{conclusiones.pregunta3.length}/{LIMITE_CUESTIONARIO}</div>
          </div>
        </div>

        {/* PANEL DE NOTIFICACIÓN Y ENVÍO */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div>
            {estadoEnvio === 'success' && (
              <p className="text-teal-400 text-xs font-bold animate-pulse">
                🎉 Sincronización Exitosa: Bitácora guardada correctamente en Supabase (Simulado local).
              </p>
            )}
            {estadoEnvio === 'error' && (
              <p className="text-rose-400 text-xs font-bold">
                ❌ Error de Red: Verifique las variables de entorno de su cliente de base de datos.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={guardando || !estudianteNombre}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
              guardando || !estudianteNombre
                ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-teal-600 border border-teal-500 text-white hover:bg-teal-500 shadow-[0_0_15px_rgba(13,148,136,0.3)]'
            }`}
          >
            {!estudianteNombre ? 'Identifíquese en Bioseguridad para Enviar' : guardando ? 'Sincronizando...' : 'Finalizar Práctica y Enviar Reporte'}
          </button>
        </div>

      </form>

      {/* PIE DE PÁGINA AUTORAL */}
      <footer className="mt-12 pt-4 border-t border-slate-900 text-center text-[10px] text-slate-500 font-mono tracking-wider">
        DISEÑO FORMATIVO Y PEDAGÓGICO POR: PhD. GIOVANNI ALEXANDER LINEROS FRANCO © 2026
      </footer>

    </div>
  );
}
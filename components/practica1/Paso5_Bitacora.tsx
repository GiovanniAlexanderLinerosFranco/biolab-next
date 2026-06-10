"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface Paso5Props {
  estudianteNombre: string;
  estudianteEmail: string;
  respuestasDesafios: Record<string, string>;
}

type MuestraId = 'A' | 'B' | 'C' | 'D' | 'E';

// CONSTANTES DE LÍMITES
const LIMITE_TABLA = 180;
const LIMITE_CUESTIONARIO = 300;

// OPCIONES PARA SELECTS (DICCIONARIO TÉCNICO)
const tiposBiologicos = [
  { value: '', label: 'Seleccione...' },
  { value: 'acelular', label: 'Acelular (Virus)' },
  { value: 'procariota', label: 'Procariota (Bacteria)' },
  { value: 'eucariota_animal', label: 'Eucariota Animal' },
  { value: 'eucariota_vegetal', label: 'Eucariota Vegetal' },
  { value: 'eucariota_hongo', label: 'Eucariota Fúngica' },
  { value: 'eucariota_protozoo', label: 'Eucariota Protozoaria' },
];

const formasVisibles = [
  { value: '', label: 'Seleccione...' },
  { value: 'esferica', label: 'Esférica / Coco' },
  { value: 'alargada', label: 'Alargada / Bacilo' },
  { value: 'poligonal', label: 'Poligonal / Prismática' },
  { value: 'irregular', label: 'Irregular' },
  { value: 'filamentosa', label: 'Filamentosa' },
];

const estructurasClave = [
  { value: '', label: 'Seleccione...' },
  { value: 'nucleo', label: 'Núcleo Definido' },
  { value: 'pared', label: 'Pared Celular' },
  { value: 'cloroplastos', label: 'Cloroplastos' },
  { value: 'capside', label: 'Cápside Viral' },
  { value: 'cilios', label: 'Cilios / Flagelos' },
  { value: 'ninguna', label: 'No se distingue' },
];

export default function Paso5_Bitacora({ estudianteNombre, estudianteEmail, respuestasDesafios }: Paso5Props) {
  const [guardando, setGuardando] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState<'idle' | 'success' | 'error'>('idle');
  const [mensajeError, setMensajeError] = useState('');

  const [bitacoraMuestras, setBitacoraMuestras] = useState({
    A: { tipo: '', forma: '', estructuraClave: '', justificacion: '' },
    B: { tipo: '', forma: '', estructuraClave: '', justificacion: '' },
    C: { tipo: '', forma: '', estructuraClave: '', justificacion: '' },
    D: { tipo: '', forma: '', estructuraClave: '', justificacion: '' },
    E: { tipo: '', forma: '', estructuraClave: '', justificacion: '' },
  });

  const [analisisContraste, setAnalisisContraste] = useState('');
  
  const [conclusiones, setConclusiones] = useState<Record<string, string>>({ 
    pregunta1: '', 
    pregunta2: '', 
    pregunta3: '' 
  });

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Control Académico: Para validar su aprendizaje, el reporte debe ser digitado manualmente. No se permite pegar contenido externo.");
  };

  const manejarCambioMuestra = (muestra: MuestraId, campo: string, valor: string) => {
    setBitacoraMuestras(prev => ({
      ...prev,
      [muestra]: { ...prev[muestra], [campo]: valor }
    }));
  };

  const enviarBitacora = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);

    // --- MOTOR DE EVALUACIÓN: RÚBRICA 4 (COMPONENTE PRÁCTICO) ---
    const LLAVE = {
      A: { t: 'acelular', f: 'irregular', e: 'capside' },
      B: { t: 'procariota', f: 'alargada', e: 'pared' }, 
      C: { t: 'eucariota_animal', f: 'irregular', e: 'nucleo' },
      D: { t: 'eucariota_vegetal', f: 'poligonal', e: 'cloroplastos' },
      E: { t: 'eucariota_hongo', f: 'filamentosa', e: 'pared' }
    };

    let aciertos = 0;
    (Object.keys(bitacoraMuestras) as MuestraId[]).forEach(l => {
      if (bitacoraMuestras[l].tipo === LLAVE[l].t) aciertos++;
      if (bitacoraMuestras[l].forma === LLAVE[l].f) aciertos++;
      if (bitacoraMuestras[l].estructuraClave === LLAVE[l].e) aciertos++;
    });
    const notaDesempeno = (aciertos / 15) * 4.0 + 1.0;

    const textoTotal = (analisisContraste + conclusiones.pregunta1 + conclusiones.pregunta2 + conclusiones.pregunta3).toLowerCase();
    const glosario = ['organelo', 'eucariota', 'procariota', 'membrana', 'pared', 'núcleo', 'diferenciación', 'bioseguridad', 'cloroplasto', 'citoplasma'];
    const conteoKeywords = glosario.filter(w => textoTotal.includes(w)).length;
    const longitudTotal = textoTotal.length;

    let notaInterpretacion = 1.0;
    let nivel = "";

    if (longitudTotal > 650 && conteoKeywords >= 6) { notaInterpretacion = 5.0; nivel = "Excelente (4.6 - 5.0)"; }
    else if (longitudTotal > 450 && conteoKeywords >= 4) { notaInterpretacion = 4.3; nivel = "Sobresaliente (4.0 - 4.5)"; }
    else if (longitudTotal > 300 && conteoKeywords >= 2) { notaInterpretacion = 3.5; nivel = "Aceptable (3.0 - 3.9)"; }
    else if (longitudTotal > 150) { notaInterpretacion = 2.5; nivel = "Insuficiente (2.1 - 2.9)"; }
    else { notaInterpretacion = 1.5; nivel = "Deficiente (1.0 - 2.0)"; }

    const notaFinal = (notaDesempeno * 0.4) + (notaInterpretacion * 0.6);
    const notaFinalFixed = parseFloat(Math.max(1.0, notaFinal).toFixed(1));

    if (!isSupabaseConfigured || !supabase) {
      setEstadoEnvio('error');
      setMensajeError("Configuración de base de datos ausente.");
      setGuardando(false);
      return;
    }

    try {
      const { error } = await supabase.from('bitacoras_practica_1').insert([{
        estudiante_nombre: estudianteNombre,
        estudiante_email: estudianteEmail,
        respuestas_desafios: respuestasDesafios,
        tabla_muestras: bitacoraMuestras,
        analisis_contraste: analisisContraste,
        conclusiones_preguntas: conclusiones,
        calificacion: notaFinalFixed,
        fecha_registro: new Date().toISOString()
      }]);
      if (error) throw error;
      
      setEstadoEnvio('success');
      alert(
        `📊 INFORME DE EVALUACIÓN ACADÉMICA\n` +
        `----------------------------------------\n` +
        `Estudiante: ${estudianteNombre}\n\n` +
        `1. Desempeño Práctico (40%): ${notaDesempeno.toFixed(1)}\n` +
        `2. Interpretación (60%): ${notaInterpretacion.toFixed(1)}\n` +
        `   Nivel: ${nivel}\n` +
        `----------------------------------------\n` +
        `⭐ NOTA FINAL: ${notaFinalFixed} / 5.0\n\n` +
        `La bitácora ha sido archivada legalmente en el sistema.`
      );
    } catch (err: unknown) { // CORRECCIÓN: Se cambió 'any' por 'unknown' para cumplir ESLint
      setEstadoEnvio('error');
      if (err instanceof Error) {
        setMensajeError(err.message);
      } else {
        setMensajeError("Error desconocido al enviar");
      }
    } finally { setGuardando(false); }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-3 md:p-6 text-slate-200">
      
      {/* HEADER CIENTÍFICO RESPONSIVO */}
      <div className="mb-6 border-b border-slate-800 pb-4">
        <div className="text-teal-500 font-bold text-[10px] md:text-xs tracking-widest mb-1 uppercase">Estación 04</div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">Bitácora Oficial de Evaluación</h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] md:text-sm font-mono">
          <span className="text-cyan-400 font-bold">👤 {estudianteNombre || "No identificado"}</span>
          <span className="text-slate-500">📧 {estudianteEmail}</span>
        </div>
      </div>

      {/* GUÍA DE USO */}
      <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex items-start md:items-center gap-4 mb-8">
        <span className="text-2xl">💡</span>
        <p className="text-blue-200 text-xs md:text-sm leading-relaxed">
          <strong>Guía de uso:</strong> Registre sus hallazgos. La evaluación es automática según la <strong>Rúbrica 4</strong> (40% desempeño técnico, 60% interpretación). La nota mínima es 1.0 según reglamento.
        </p>
      </div>

      <form onSubmit={enviarBitacora} className="space-y-10">
        
        {/* ACTIVIDAD 01: REGISTRO OBSERVACIONAL (TABLA PC) */}
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-4 md:p-6 shadow-xl">
          <div className="mb-6">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-1">Actividad 01</span>
            <h2 className="text-xl font-bold text-white">Registro Panorama A-E</h2>
          </div>

          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse bg-slate-950/40 text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase">
                  <th className="p-4 text-center w-12">Muestra</th>
                  <th className="p-4">Clasificación</th>
                  <th className="p-4">Morfología</th>
                  <th className="p-4">Estructura</th>
                  <th className="p-4">Justificación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(['A', 'B', 'C', 'D', 'E'] as const).map((letra) => (
                  <tr key={letra} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4 text-center font-black text-lg text-teal-400 bg-slate-900/40">{letra}</td>
                    <td className="p-2">
                      <select required value={bitacoraMuestras[letra].tipo} onChange={(e) => manejarCambioMuestra(letra, 'tipo', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-teal-500 outline-none">
                        {tiposBiologicos.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </td>
                    <td className="p-2">
                      <select required value={bitacoraMuestras[letra].forma} onChange={(e) => manejarCambioMuestra(letra, 'forma', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-teal-500 outline-none">
                        {formasVisibles.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </td>
                    <td className="p-2">
                      <select required value={bitacoraMuestras[letra].estructuraClave} onChange={(e) => manejarCambioMuestra(letra, 'estructuraClave', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-teal-500 outline-none">
                        {estructurasClave.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </td>
                    <td className="p-2">
                      <textarea required onPaste={prevenirFraude} onDrop={prevenirFraude}
                        placeholder="Evidencia visible..."
                        value={bitacoraMuestras[letra].justificacion}
                        onChange={(e) => manejarCambioMuestra(letra, 'justificacion', e.target.value.substring(0, LIMITE_TABLA))}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 h-16 resize-none focus:border-teal-500 outline-none"
                      />
                      <div className="text-[9px] text-slate-600 text-right font-mono">{bitacoraMuestras[letra].justificacion.length}/{LIMITE_TABLA}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((letra) => (
              <div key={letra} className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
                  <span className="text-2xl font-black text-teal-500">{letra}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Identificación de Muestra</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Clasificación</label>
                    <select required value={bitacoraMuestras[letra].tipo} onChange={(e) => manejarCambioMuestra(letra, 'tipo', e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-teal-500 outline-none">
                      {tiposBiologicos.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Morfología</label>
                    <select required value={bitacoraMuestras[letra].forma} onChange={(e) => manejarCambioMuestra(letra, 'forma', e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-teal-500 outline-none">
                      {formasVisibles.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Estructura</label>
                    <select required value={bitacoraMuestras[letra].estructuraClave} onChange={(e) => manejarCambioMuestra(letra, 'estructuraClave', e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-teal-500 outline-none">
                      {estructurasClave.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Justificación Científica</label>
                    <textarea required onPaste={prevenirFraude} onDrop={prevenirFraude}
                      placeholder="Describa la evidencia visible..."
                      value={bitacoraMuestras[letra].justificacion}
                      onChange={(e) => manejarCambioMuestra(letra, 'justificacion', e.target.value.substring(0, LIMITE_TABLA))}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm h-24 resize-none focus:border-teal-500 outline-none"
                    />
                    <div className="text-[9px] text-slate-600 text-right font-mono">{bitacoraMuestras[letra].justificacion.length}/{LIMITE_TABLA}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVIDAD 02: MATRIZ DE CONTRASTE */}
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-4 md:p-6 shadow-xl">
          <div className="mb-4 md:mb-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Actividad 02</span>
            <h2 className="text-xl font-bold text-white">Contraste de Modelos Celulares</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 mb-6">
            <table className="w-full text-left border-collapse bg-slate-950/20 text-[10px] md:text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="p-3">Criterio</th>
                  <th className="p-3 text-amber-500">Bacteria</th>
                  <th className="p-3 text-teal-400">C. Vegetal</th>
                  <th className="p-3 text-blue-400">C. Animal</th>
                  <th className="p-3 text-purple-400">Hongo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                <tr><td className="p-2 font-bold bg-slate-900/20">Núcleo</td><td>No</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
                <tr><td className="p-2 font-bold bg-slate-900/20">Pared</td><td>Sí</td><td>Sí</td><td>No</td><td>Sí</td></tr>
                <tr><td className="p-2 font-bold bg-slate-900/20">Forma</td><td>Variable</td><td>Poligonal</td><td>Irregular</td><td>Tubular</td></tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Síntesis Comparativa de Hallazgos:</label>
            <textarea required onPaste={prevenirFraude} onDrop={prevenirFraude}
              placeholder="Redacte su análisis de contraste basándose en lo observado..."
              value={analisisContraste}
              onChange={(e) => setAnalisisContraste(e.target.value.substring(0, LIMITE_CUESTIONARIO))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs md:text-sm focus:border-amber-500 outline-none h-32 md:h-28"
            />
            <div className="text-[10px] text-slate-500 text-right font-mono font-bold">{analisisContraste.length}/{LIMITE_CUESTIONARIO}</div>
          </div>
        </div>

        {/* ACTIVIDAD 03: CONCLUSIONES ARGUMENTADAS */}
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-4 md:p-6 shadow-xl space-y-6">
          <div className="mb-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">Actividad 03</span>
            <h2 className="text-xl font-bold text-white">Interpretación y Conclusiones</h2>
          </div>

          {[
            { id: 'pregunta1', label: '1. ¿Cuál muestra le ofreció más evidencia para clasificarla como eucariota y qué estructura lo confirma?' },
            { id: 'pregunta2', label: '2. ¿Qué diferencia fundamental observó entre una bacteria y un protozoo al microscopio?' },
            { id: 'pregunta3', label: '3. Explique la importancia de la pared celular en las muestras que la presentan.' }
          ].map((q) => (
            <div key={q.id} className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 leading-snug">{q.label}</label>
              <textarea required onPaste={prevenirFraude} onDrop={prevenirFraude}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs md:text-sm focus:border-purple-500 outline-none h-24 md:h-20"
                value={conclusiones[q.id]}
                onChange={(e) => setConclusiones({...conclusiones, [q.id]: e.target.value.substring(0, LIMITE_CUESTIONARIO)})}
              />
              <div className="text-[10px] text-slate-500 text-right font-mono font-bold">{conclusiones[q.id].length}/{LIMITE_CUESTIONARIO}</div>
            </div>
          ))}
        </div>

        {/* PANEL DE ENVÍO */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800 pb-10">
          <div className="flex-1 w-full text-center sm:text-left">
            {estadoEnvio === 'success' && <p className="text-teal-400 font-bold animate-bounce text-sm">🎉 Reporte científico enviado con éxito a Supabase.</p>}
            {estadoEnvio === 'error' && <p className="text-rose-400 font-bold text-sm">❌ Error: {mensajeError}</p>}
          </div>

          <button type="submit" disabled={guardando || !estudianteNombre}
            className={`w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${
              guardando || !estudianteNombre ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 active:scale-95 text-white shadow-teal-900/40'
            }`}>
            {guardando ? 'Sincronizando...' : 'Finalizar y Enviar Reporte'}
          </button>
        </div>
      </form>

      <footer className="mt-8 text-center text-[10px] text-slate-600 font-mono tracking-widest uppercase">
        Diseño Formativo: PhD. Giovanni Alexander Lineros Franco © 2026
      </footer>
    </div>
  );
}
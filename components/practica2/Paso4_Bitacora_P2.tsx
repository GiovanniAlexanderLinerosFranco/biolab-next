"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface BitacoraProps {
  estudianteNombre: string;
  estudianteEmail: string;
  respuestasDesafios: Record<string, string>;
}

export default function Paso4_Bitacora_P2({
  estudianteNombre,
  estudianteEmail,
  respuestasDesafios
}: BitacoraProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // ESTADO LOCAL DE LA BITÁCORA ESTRUCTURADA
  const [tablaTejidos, setTablaTejidos] = useState({
    M1: { tejido: '', rasgo: '' },
    M2: { tejido: '', rasgo: '' }
  });

  const [analisisDiagnostico, setAnalisisDiagnostico] = useState('');

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Digite su análisis manualmente para asegurar la trazabilidad de su proceso de aprendizaje.");
  };

  const enviarReporteFinal = async () => {
    // SALVAGUARDA DEFENSIVA: Recuperación de identidad desde almacenamiento local si falla el estado de la PWA
    const emailEfectivo = estudianteEmail || (typeof window !== 'undefined' ? localStorage.getItem('biolab_estudiante_email') : null) || 'anonimo@ustabuca.edu.co';
    const nombreEfectivo = estudianteNombre || (typeof window !== 'undefined' ? localStorage.getItem('biolab_estudiante_nombre') : null) || 'Estudiante Anonimo';

    if (!tablaTejidos.M1.tejido || !tablaTejidos.M2.tejido || !analisisDiagnostico.trim()) {
      alert("Por favor, complete los campos diagnósticos mínimos de la bitácora.");
      return;
    }
    if (analisisDiagnostico.trim().length < 30) {
      alert("La justificación científica debe contener al menos 30 caracteres.");
      return;
    }

    // SALVAGUARDA DE SEGURIDAD EXIGIDA POR TYPESCRIPT
    if (!isSupabaseConfigured || !supabase) {
      alert("Error: Supabase no está configurado de forma segura en las variables de entorno.");
      return;
    }

    setIsSubmitting(true);

    // SISTEMA DE CALIFICACIÓN AUTOMÁTICA EN BASE A RÚBRICA INTERNA
    let aciertos = 0;
    if (respuestasDesafios.epitelial === 'B') aciertos++;
    if (respuestasDesafios.conectivo === 'B') aciertos++;
    if (respuestasDesafios.muscular === 'B') aciertos++;
    if (respuestasDesafios.nervioso === 'B') aciertos++;
    
    const notaCalculada = Number((1.0 + (aciertos * 1.0)).toFixed(1));

    // CONSOLIDACIÓN JSON PARA LA COLUMNA 'CONTENIDO' DEL ESQUEMA UNIFICADO
    const contenidoPayload = JSON.stringify({
      estudiante_email: emailEfectivo,
      respuestas_desafios: respuestasDesafios,
      tabla_tejidos: tablaTejidos,
      analisis_diagnostico: analisisDiagnostico,
      calificacion: notaCalculada
    });

    try {
      const { error } = await supabase
        .from('bitacoras') // <-- Tabla real y unificada del esquema SQL
        .insert([
          {
            practica_id: 2, // <-- Identificador numérico de Histología
            estudiante_nombre: nombreEfectivo,
            contenido: contenidoPayload // <-- Empaquetado completo seguro para la base de datos
          }
        ]);

      if (error) throw error;
      setEnviado(true);
      alert(`Reporte científico enviado con éxito. Calificación preliminar: ${notaCalculada}`);
    } catch (err) {
      console.error(err);
      alert("Error técnico de sincronización. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-4 md:p-6" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-2 uppercase">Estación 04</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Bitácora Científica de Linajes Tisulares</h1>
        <p className="text-slate-400 text-xs md:text-sm">Consolide los diagnósticos morfológicos observados en el laboratorio para la validación de la rúbrica automatizada.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* MUESTRA 1 */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">🔬 Evaluación: Muestra Panorama A</div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Tejido Identificado</label>
              <select value={tablaTejidos.M1.tejido} onChange={(e) => setTablaTejidos(prev => ({ ...prev, M1: { ...prev.M1, tejido: e.target.value } }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-400">
                <option value="">Seleccione...</option>
                <option value="epitelial">Tejido Epitelial (Células unidas revestimiento)</option>
                <option value="conectivo">Tejido Conectivo (Células con matriz abundante)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Criterio Morfológico Clave</label>
              <select value={tablaTejidos.M1.rasgo} onChange={(e) => setTablaTejidos(prev => ({ ...prev, M1: { ...prev.M1, rasgo: e.target.value } }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-400">
                <option value="">Seleccione...</option>
                <option value="cohesion">Alta cohesión celular sin vasos sanguíneos</option>
                <option value="fibras">Abundancia de fibras proteicas suspendidas</option>
              </select>
            </div>
          </div>

          {/* MUESTRA 2 */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">🔬 Evaluación: Muestra Panorama B</div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Tejido Identificado</label>
              <select value={tablaTejidos.M2.tejido} onChange={(e) => setTablaTejidos(prev => ({ ...prev, M2: { ...prev.M2, tejido: e.target.value } }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-400">
                <option value="">Seleccione...</option>
                <option value="muscular">Tejido Muscular (Fibras elongadas contráctiles)</option>
                <option value="nervioso">Tejido Nervioso (Somas neuronales y neuroglia)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Criterio Morfológico Clave</label>
              <select value={tablaTejidos.M2.rasgo} onChange={(e) => setTablaTejidos(prev => ({ ...prev, M2: { ...prev.M2, rasgo: e.target.value } }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-400">
                <option value="">Seleccione...</option>
                <option value="estrias">Presencia de estriaciones transversales organizadas</option>
                <option value="red_prolongaciones">Somas con ramificaciones citoplasmáticas densas</option>
              </select>
            </div>
          </div>

        </div>

        <div className="bg-slate-950/30 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Justificación Científica Conclusiva (Mínimo 30 caracteres)</label>
          <textarea value={analisisDiagnostico} onChange={(e) => setAnalisisDiagnostico(e.target.value)} placeholder="Redacte su análisis histológico final..." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs md:text-sm text-white h-24 resize-none outline-none focus:border-cyan-400 placeholder:text-slate-600" />
        </div>

        <button onClick={enviarReporteFinal} disabled={isSubmitting || enviado} className={`w-full p-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest transition-all ${enviado ? 'bg-green-600/20 text-green-400 border border-green-500/50 cursor-default' : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-xl'}`}>
          {isSubmitting ? "Despachando Reporte..." : enviado ? "✓ Reporte Histológico Registrado en Supabase" : "Finalizar Práctica y Enviar Reporte"}
        </button>
      </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface BitacoraProps {
  estudianteNombre: string;
  estudianteEmail: string;
  respuestasDesafios: Record<string, string>;
}

export default function Paso4_Bitacora_P3({
  estudianteNombre,
  estudianteEmail,
  respuestasDesafios
}: BitacoraProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const [tablaAglutinacion, setTablaAglutinacion] = useState({
    P1: { fenotipo: '', genotipo: '' },
    P2: { fenotipo: '', genotipo: '' }
  });

  const [analisisClinico, setAnalisisClinico] = useState('');

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Escriba sus conclusiones de inmunofetipado manualmente para validar el proceso científico.");
  };

  const enviarReporteFinal = async () => {
    if (!estudianteNombre || !estudianteEmail) {
      alert("Por favor, active su sesión en la Estación 01 antes de despachar.");
      return;
    }
    if (!tablaAglutinacion.P1.fenotipo || !tablaAglutinacion.P2.fenotipo || !analisisClinico.trim()) {
      alert("Por favor, complete los campos evaluativos de la bitácora.");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      alert("Error: Supabase no está disponible en las variables de entorno.");
      return;
    }

    setIsSubmitting(true);

    let aciertos = 0;
    if (respuestasDesafios.antigeno === 'B') aciertos++;
    if (respuestasDesafios.especificidad === 'B') aciertos++;
    if (respuestasDesafios.transduccion === 'B') aciertos++;
    if (tablaAglutinacion.P1.fenotipo === 'A+') aciertos++;
    if (tablaAglutinacion.P2.fenotipo === 'B-') aciertos++;

    const notaCalculada = Number((1.0 + (aciertos * 0.8)).toFixed(1));

    try {
      const { error } = await supabase
        .from('bitacoras_practica_3')
        .insert([
          {
            estudiante_nombre: estudianteNombre,
            estudiante_email: estudianteEmail,
            respuestas_desafios: respuestasDesafios,
            tabla_aglutinacion: tablaAglutinacion,
            analisis_clinico: analisisClinico,
            calificacion: notaCalculada
          }
        ]);

      if (error) throw error;
      setEnviado(true);
      alert(`Reporte de Receptores registrado con éxito. Nota: ${notaCalculada}`);
    } catch (err) {
      console.error(err);
      alert("Error al enviar el reporte inmunohematológico.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-2" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-1 uppercase">Estación 04</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Bitácora Oficial de Tipificación y Compatibilidad</h1>
        <p className="text-slate-400 text-xs md:text-sm">Asigne los fenotipos y perfiles alélicos moleculares correctos basados en las reacciones inmuno-lógicas del simulador.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* PACIENTE 1 */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">🩸 Inmunofenotipo: Paciente 01</div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-black mb-1">Fenotipo Asignado (Grupo ABO/Rh)</label>
              <select value={tablaAglutinacion.P1.fenotipo} onChange={(e) => setTablaAglutinacion(prev => ({ ...prev, P1: { ...prev.P1, fenotipo: e.target.value } }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-400">
                <option value="">Seleccione...</option>
                <option value="A+">Grupo A Positivo (A+)</option>
                <option value="B-">Grupo B Negativo (B-)</option>
                <option value="O+">Grupo O Positivo (O+)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-black mb-1">Genotipo Alélico Probable</label>
              <select value={tablaAglutinacion.P1.genotipo} onChange={(e) => setTablaAglutinacion(prev => ({ ...prev, P1: { ...prev.P1, genotipo: e.target.value } }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-400">
                <option value="">Seleccione...</option>
                <option value="AA_DD">Homocigoto Dominante (IᴬIᴬ / DD)</option>
                <option value="AO_Dd">Heterocigoto Combinado (Iᴬi / Dd)</option>
              </select>
            </div>
          </div>

          {/* PACIENTE 2 */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">🩸 Inmunofenotipo: Paciente 02</div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-black mb-1">Fenotipo Asignado (Grupo ABO/Rh)</label>
              <select value={tablaAglutinacion.P2.fenotipo} onChange={(e) => setTablaAglutinacion(prev => ({ ...prev, P2: { ...prev.P2, fenotipo: e.target.value } }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-400">
                <option value="">Seleccione...</option>
                <option value="A+">Grupo A Positivo (A+)</option>
                <option value="B-">Grupo B Negativo (B-)</option>
                <option value="O-">Grupo O Negativo (O-)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-black mb-1">Genotipo Alélico Probable</label>
              <select value={tablaAglutinacion.P2.genotipo} onChange={(e) => setTablaAglutinacion(prev => ({ ...prev, P2: { ...prev.P2, genotipo: e.target.value } }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-400">
                <option value="">Seleccione...</option>
                <option value="BB_dd">Homocigoto Recesivo Rh (IᴮIᴮ / dd)</option>
                <option value="BO_dd">Heterocigoto ABO / Recesivo Rh (Iᴮi / dd)</option>
              </select>
            </div>
          </div>

        </div>

        <div className="bg-slate-950/30 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Análisis Clínico y Relevancia en Soluciones Transfusionales</label>
          <textarea value={analisisClinico} onChange={(e) => setAnalisisClinico(e.target.value)} placeholder="Justifique fisiológicamente la importancia de los receptores moleculares de membrana en la prevención del shock hemolítico clínico..." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs md:text-sm text-white h-24 resize-none outline-none focus:border-cyan-400 placeholder:text-slate-600" />
        </div>

        <button onClick={enviarReporteFinal} disabled={isSubmitting || enviado} className={`w-full p-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest transition-all ${enviado ? 'bg-green-600/20 text-green-400 border border-green-500/50 cursor-default' : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-xl'}`}>
          {isSubmitting ? "Procesando Datos Moleculares..." : enviado ? "✓ Reporte de Receptores Registrado en Supabase" : "Finalizar Práctica y Enviar Reporte"}
        </button>
      </div>
    </div>
  );
}
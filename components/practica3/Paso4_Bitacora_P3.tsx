/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.5.0
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * IMMUNOHEMATOLOGY BITACORA ENGINES: VALIDADOR DE RÚBRICA AUTOMATIZADA GLOBAL
 * ============================================================================
 */

"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface BitacoraProps {
  estudianteNombre: string;
  estudianteEmail: string;
  respuestasAglutinacion: Record<string, {
    grupoSanguineoEstudiante: string;
    grupoSanguineoCorrecto: string;
    esGrupoCorrecto: boolean;
    respuestaTransduccionEstudiante: string;
    respuestaTransduccionCorrecta: string;
    esTransduccionCorrecta: boolean;
  }>;
}

export default function Paso4_Bitacora_P3({
  estudianteNombre,
  estudianteEmail,
  respuestasAglutinacion
}: BitacoraProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const [tablaGenotipos, setTablaGenotipos] = useState({
    P1: '',
    P2: '',
    P3: '',
    P4: ''
  });

  const [analisisClinico, setAnalisisClinico] = useState('');

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Escriba sus conclusiones de inmunofetipado manualmente para validar el proceso científico.");
  };

  const enviarReporteFinal = async () => {
    const emailEfectivo = estudianteEmail || (typeof window !== 'undefined' ? localStorage.getItem('biolab_estudiante_email') : null) || 'anonimo@ustabuca.edu.co';
    const nombreEfectivo = estudianteNombre || (typeof window !== 'undefined' ? localStorage.getItem('biolab_estudiante_nombre') : null) || 'Estudiante Anonimo';

    // Validación defensiva estricta de completitud
    const llavesPacientes = ['P1', 'P2', 'P3', 'P4'];
    const simuladorCompleto = llavesPacientes.every(id => respuestasAglutinacion && respuestasAglutinacion[id]);
    const genotiposCompletos = Object.values(tablaGenotipos).every(val => val !== '');

    if (!simuladorCompleto || !genotiposCompletos || !analisisClinico.trim()) {
      alert("Por favor, complete la simulación de los 4 casos del banco de sangre y asigne sus genotipos en la bitácora.");
      return;
    }

    if (analisisClinico.trim().length < 40) {
      alert("La justificación inmunohematológica debe contener al menos 40 caracteres con rigor científico.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      alert("Error: Supabase no está disponible en las variables de entorno.");
      return;
    }

    setIsSubmitting(true);

    // SISTEMA DE CALIFICACIÓN DE ALTA FIDELIDAD (4 Casos x 2 Dimensiones = 8 ítems evaluados)
    let aciertos = 0;
    llavesPacientes.forEach(id => {
      const data = respuestasAglutinacion[id];
      if (data.esGrupoCorrecto) aciertos++;
      if (data.esTransduccionCorrecta) aciertos++;
    });

    // Ponderación precisa de escala de 1.0 a 5.0 (0.5 puntos netos por acierto biológico)
    const notaCalculada = Number((1.0 + (aciertos * 0.5)).toFixed(1));

    const contenidoPayload = JSON.stringify({
      estudiante_email: emailEfectivo,
      respuestas_simulador_molecular: respuestasAglutinacion,
      tabla_genotipos_probables: tablaGenotipos,
      analisis_clinico_conclusivo: analisisClinico,
      calificacion: notaCalculada
    });

    try {
      const { error } = await supabase
        .from('bitacoras') // <-- Tabla real y unificada del esquema relacional SQL
        .insert([
          {
            practica_id: 3, // <-- Identificador numérico estricto de Receptores Celulares
            estudiante_nombre: nombreEfectivo,
            contenido: contenidoPayload
          }
        ]);

      if (error) throw error;
      setEnviado(true);
      alert(`Reporte Inmunohematológico unificado registrado con éxito en Supabase. Calificación preliminar: ${notaCalculada}`);
    } catch (err) {
      console.error(err);
      alert("Error técnico de sincronización con la nube de BioLab. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-2" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      
      <div className="mb-6">
        <div className="text-teal-500 font-bold text-xs tracking-[0.2em] mb-1 uppercase font-mono">Estación 04</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Bitácora Científica de Receptores y Perfiles Alélicos</h1>
        <p className="text-slate-400 text-xs md:text-sm">Consolide las correlaciones genotípicas probabilísticas basadas en los patrones de aglutinación molecular validados.</p>
      </div>

      <div className="space-y-6">
        
        {/* PANEL CUADRUPLE DE ASIGNACIÓN GENOTÍPICA DE EXPORTACIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* CASO 01 */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-[9px] text-teal-400 font-mono font-bold block uppercase tracking-wider">Caso 01 • Odontología</span>
            <div className="text-xs font-bold text-white truncate">Carlos Mendoza</div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] font-mono">
              Fenotipo: <span className="text-teal-400 font-bold">{respuestasAglutinacion['P1']?.grupoSanguineoEstudiante || 'No evaluado'}</span>
            </div>
            <div>
              <label className="block text-[9px] text-slate-500 uppercase font-black font-mono mb-1">Genotipo Probable:</label>
              <select value={tablaGenotipos.P1} onChange={(e) => setTablaGenotipos(prev => ({ ...prev, P1: e.target.value }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-[11px] text-white outline-none focus:border-teal-400">
                <option value="">Seleccione...</option>
                <option value="A_Hetero">Heterocigoto Combinado (Iᴬi / Dd)</option>
                <option value="A_Homo">Homocigoto Dominante (IᴬI\u1D2C / DD)</option>
              </select>
            </div>
          </div>

          {/* CASO 02 */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-[9px] text-teal-400 font-mono font-bold block uppercase tracking-wider">Caso 02 • Optometría</span>
            <div className="text-xs font-bold text-white truncate">Elena Rostova</div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] font-mono">
              Fenotipo: <span className="text-teal-400 font-bold">{respuestasAglutinacion['P2']?.grupoSanguineoEstudiante || 'No evaluado'}</span>
            </div>
            <div>
              <label className="block text-[9px] text-slate-500 uppercase font-black font-mono mb-1">Genotipo Probable:</label>
              <select value={tablaGenotipos.P2} onChange={(e) => setTablaGenotipos(prev => ({ ...prev, P2: e.target.value }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-[11px] text-white outline-none focus:border-teal-400">
                <option value="">Seleccione...</option>
                <option value="B_Recesivo_Rh">Heterocigoto ABO / Recesivo Rh (Iᴮi / dd)</option>
                <option value="B_Homo_Rh">Homocigoto B / Recesivo Rh (IᴮI\u1D4B / dd)</option>
              </select>
            </div>
          </div>

          {/* CASO 03 */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-[9px] text-teal-400 font-mono font-bold block uppercase tracking-wider">Caso 03 • Medicina</span>
            <div className="text-xs font-bold text-white truncate">Alejandro Silva</div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] font-mono">
              Fenotipo: <span className="text-teal-400 font-bold">{respuestasAglutinacion['P3']?.grupoSanguineoEstudiante || 'No evaluado'}</span>
            </div>
            <div>
              <label className="block text-[9px] text-slate-500 uppercase font-black font-mono mb-1">Genotipo Probable:</label>
              <select value={tablaGenotipos.P3} onChange={(e) => setTablaGenotipos(prev => ({ ...prev, P3: e.target.value }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-[11px] text-white outline-none focus:border-teal-400">
                <option value="">Seleccione...</option>
                <option value="O_Homo_Recesivo">Homocigoto Recesivo Absoluto (ii / dd)</option>
              </select>
            </div>
          </div>

          {/* CASO 04 */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-[9px] text-teal-400 font-mono font-bold block uppercase tracking-wider">Caso 04 • Medicina</span>
            <div className="text-xs font-bold text-white truncate">Lucía Villamizar</div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] font-mono">
              Fenotipo: <span className="text-teal-400 font-bold">{respuestasAglutinacion['P4']?.grupoSanguineoEstudiante || 'No evaluado'}</span>
            </div>
            <div>
              <label className="block text-[9px] text-slate-500 uppercase font-black font-mono mb-1">Genotipo Probable:</label>
              <select value={tablaGenotipos.P4} onChange={(e) => setTablaGenotipos(prev => ({ ...prev, P4: e.target.value }))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-[11px] text-white outline-none focus:border-teal-400">
                <option value="">Seleccione...</option>
                <option value="AB_Hetero_Rh">Codominante ABO / Heterocigoto Rh (IᴬI\u1D4B / Dd)</option>
                <option value="AB_Homo_Rh">Codominante ABO / Homocigoto Rh (IᴬI\u1D4B / DD)</option>
              </select>
            </div>
          </div>

        </div>

        {/* JUSTIFICACIÓN FENOTÍPICA DE TRANSFERENCIA DE CONOCIMIENTO */}
        <div className="bg-slate-950/30 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-bold text-slate-300 uppercase mb-2 font-mono">Análisis Fisiopatológico y Relevancia Clínico-Transfusional</label>
          <textarea 
            value={analisisClinico} 
            onChange={(e) => setAnalisisClinico(e.target.value)} 
            placeholder="Justifique fisiológicamente la importancia de los receptores oligosacarídicos y proteicos de membrana eritrocitaria en el emparejamiento de hemoderivados y la prevención del shock hemolítico agudo o aloinmunización..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs md:text-sm text-white h-24 resize-none outline-none focus:border-teal-500 placeholder:text-slate-600" 
          />
        </div>

        <button 
          onClick={enviarReporteFinal} 
          disabled={isSubmitting || enviado} 
          className={`w-full p-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest font-mono transition-all ${
            enviado 
              ? 'bg-green-600/20 text-green-400 border border-green-500/50 cursor-default' 
              : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-xl shadow-teal-950/20'
          }`}
        >
          {isSubmitting ? "Procesando Métricas de Rúbrica..." : enviado ? "✓ Reporte de Receptores Registrado de Forma Segura" : "Finalizar Práctica 3 y Despachar Reporte a Supabase"}
        </button>
      </div>
    </div>
  );
}
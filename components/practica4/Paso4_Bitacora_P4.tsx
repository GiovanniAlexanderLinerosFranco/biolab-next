/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.6.0
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * BIOPHYSICS BITACORA ENGINE: VALIDADOR DE RÚBRICA DE TONICIDAD Y FLUJOS TRANSMEMBRANA
 * ============================================================================
 */

"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface BitacoraProps {
  estudianteNombre: string;
  estudianteEmail: string;
  resultadosSimulador: Record<string, {
    concentracion: string;
    osmolaridad: number;
    estadoElectrolitico: string;
    fenomenoObservado: string;
  }>;
}

export default function Paso4_Bitacora_P4({
  estudianteNombre,
  estudianteEmail,
  resultadosSimulador
}: BitacoraProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const [respuestasTeoricas, setRespuestasTeTeoricas] = useState({
    mecanismoAgua: '',
    presionPared: ''
  });

  const [justificacionFisiologica, setJustificacionFisiologica] = useState('');

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica BioLab: Redacte sus conclusiones analíticas manualmente para registrar el desarrollo de sus competencias clínicas.");
  };

  const enviarReporteFinal = async () => {
    const emailEfectivo = estudianteEmail || (typeof window !== 'undefined' ? localStorage.getItem('biolab_estudiante_email') : null) || 'anonimo@ustabuca.edu.co';
    const nombreEfectivo = estudianteNombre || (typeof window !== 'undefined' ? localStorage.getItem('biolab_estudiante_nombre') : null) || 'Estudiante Anonimo';

    // Verificación defensiva de flujos completos en el simulador
    const modelosEvaluados = ['erythrocyte', 'elodea'];
    const simuladorCompleto = modelosEvaluados.every(id => resultadosSimulador && resultadosSimulador[id]);
    const preguntasCompletas = respuestasTeoricas.mecanismoAgua !== '' && respuestasTeoricas.presionPared !== '';

    if (!simuladorCompleto || !preguntasCompletas || !justificacionFisiologica.trim()) {
      alert("Por favor, complete la simulación de ambos modelos celulares y responda el cuestionario biofísico de la bitácora.");
      return;
    }

    if (justificacionFisiologica.trim().length < 40) {
      alert("La argumentación fisiológica debe contar con un mínimo de 40 caracteres para validar el rigor académico.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      alert("Error: Supabase no está disponible en las variables de entorno locales de la PWA.");
      return;
    }

    setIsSubmitting(true);

    // SISTEMA DE CALIFICACIÓN AUTOMATIZADA Q1 (4 variables del simulador + 2 teóricas = 6 ítems)
    let aciertos = 0;
    
    if (resultadosSimulador['erythrocyte']?.estadoElectrolitico === 'Hipertónico' || resultadosSimulador['erythrocyte']?.estadoElectrolitico === 'Hipotónico') aciertos++;
    if (resultadosSimulador['elodea']?.estadoElectrolitico === 'Hipertónico' || resultadosSimulador['elodea']?.estadoElectrolitico === 'Hipotónico') aciertos++;
    if (respuestasTeoricas.mecanismoAgua === 'A') aciertos++; // Acuaporinas
    if (respuestasTeoricas.presionPared === 'B') aciertos++;    // Presión de Turgencia

    // Escala de calificación ponderada (1.0 a 5.0)
    const notaCalculada = Number((1.0 + (aciertos * 1.0)).toFixed(1));

    const contenidoPayload = JSON.stringify({
      estudiante_email: emailEfectivo,
      datos_osmolaridad_simulador: resultadosSimulador,
      respuestas_mecanismos_transporte: respuestasTeoricas,
      analisis_homeostasis_celular: justificacionFisiologica,
      calificacion: notaCalculada
    });

    try {
      const { error } = await supabase
        .from('bitacoras') // <-- Tabla relacional única del Core Engine
        .insert([
          {
            practica_id: 4, // Identifier numérico estricto para Comunicación Celular y Ósmosis
            estudiante_nombre: nombreEfectivo,
            contenido: contenidoPayload
          }
        ]);

      if (error) throw error;
      setEnviado(true);
      alert(`Reporte Biofísico de la Práctica 4 enviado con éxito. Calificación unificada: ${notaCalculada}`);
    } catch (err) {
      console.error(err);
      alert("Error de sincronización con el nodo central de base de datos. Intente de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-2 text-slate-200 font-sans" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      
      <div className="mb-6">
        <div className="text-indigo-400 font-bold text-xs tracking-[0.2em] mb-1 uppercase font-mono">Estación 04</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Bitácora Científica de Flujo Osmótico y Homeostasis</h1>
        <p className="text-slate-400 text-xs md:text-sm">Registre las variaciones morfológicas calculadas y argumente los gradientes de transporte pasivo de la membrana celular.</p>
      </div>

      <div className="space-y-6">
        
        {/* TABLA RESUMEN DEL MONITOREO VIRTUAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* CUESTIONARIO 1 */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="text-[9px] text-indigo-400 font-mono font-black uppercase tracking-wider block">Desafío Biofísico 01</span>
            <label className="block text-xs font-bold text-white leading-tight">¿Qué canales proteicos transmembrana facilitan el transporte acelerado de moléculas de agua a favor de un gradiente osmótico?</label>
            <select 
              value={respuestasTeoricas.mecanismoAgua} 
              onChange={(e) => setRespuestasTeTeoricas(prev => ({ ...prev, mecanismoAgua: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-indigo-500"
            >
              <option value="">Seleccione el mecanismo...</option>
              <option value="A">Acuaporinas (Canales de agua integrales selectivos sin consumo energético)</option>
              <option value="B">Bombas ATPasas de contratransporte electrogénico</option>
              <option value="C">Complejos de unión estrecha de ocludinas apicales</option>
            </select>
          </div>

          {/* CUESTIONARIO 2 */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="text-[9px] text-indigo-400 font-mono font-black uppercase tracking-wider block">Desafío Biofísico 02</span>
            <label className="block text-xs font-bold text-white leading-tight">¿Cómo se denomina la presión hidrostática interna ejercida contra la pared celular vegetal en un medio hipotónico?</label>
            <select 
              value={respuestasTeoricas.presionPared} 
              onChange={(e) => setRespuestasTeTeoricas(prev => ({ ...prev, presionPared: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-indigo-500"
            >
              <option value="">Seleccione el fenómeno...</option>
              <option value="A">Presión oncótica mediada por albúmina sérica</option>
              <option value="B">Presión de Turgencia, que evita la lisis celular mecánica</option>
              <option value="C">Presión osmótica osmolar inversa inducida</option>
            </select>
          </div>

        </div>

        {/* REPORTE DE RECOLECCIÓN DE DATOS DEL SIMULADOR */}
        <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl font-mono text-xs space-y-2">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">🔬 Estado de Captura de Datos de Tonicidad:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
              Eritrocitos (Animal): <span className="text-indigo-400 font-bold">{resultadosSimulador['erythrocyte']?.fenomenoObservado || <span className="text-slate-600 italic">No consolidado</span>}</span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
              Elodea (Vegetal): <span className="text-indigo-400 font-bold">{resultadosSimulador['elodea']?.fenomenoObservado || <span className="text-slate-600 italic">No consolidado</span>}</span>
            </div>
          </div>
        </div>

        {/* DESARROLLO ANALÍTICO */}
        <div className="bg-slate-950/30 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-bold text-slate-300 uppercase mb-2 font-mono">Análisis Clínico de Homeostasis de Fluidos</label>
          <textarea 
            value={justificacionFisiologica} 
            onChange={(e) => setJustificacionFisiologica(e.target.value)} 
            placeholder="Argumente la relevancia del equilibrio osmótico de los fluidos corporales en la práctica clínica (Medicina, Odontología u Optometría), explicando cómo el gradiente electrolítico evita la alteración celular..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs md:text-sm text-white h-24 resize-none outline-none focus:border-indigo-500 placeholder:text-slate-600" 
          />
        </div>

        {/* BOTÓN DE DESPACHO */}
        <button 
          onClick={enviarReporteFinal} 
          disabled={isSubmitting || enviado} 
          className={`w-full p-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest font-mono transition-all ${
            enviado 
              ? 'bg-green-600/20 text-green-400 border border-green-500/50 cursor-default' 
              : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-xl shadow-indigo-950/20'
          }`}
        >
          {isSubmitting ? "Procesando Ecuaciones de Rúbrica..." : enviado ? "✓ Reporte de Tonicidad Almacenado en Producción" : "Finalizar Práctica 4 y Despachar a Supabase"}
        </button>

      </div>
    </div>
  );
}
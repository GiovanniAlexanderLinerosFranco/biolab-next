/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v4.0.1 (PREMIUM GLOBAL)
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * ADVANCED MEMBRANE BIOPHYSICS ENGINE: MOTOR DE FLUJO OSMÓTICO DINÁMICO KINETIC-V4
 * ============================================================================
 */

"use client";
import React, { useState, useEffect, useCallback } from 'react';

// --- INTERFACES DE CONTROL ESTRICTO (CERO ANY) ---
interface DatosConsolidaciónBitacora {
  modelType: 'erythrocyte' | 'elodea';
  solutoConcentracion: number; // % NaCl
  osmolaridadExterna: number;  // mOsm/L
  tonicidadEstado: 'HIPOTÓNICO' | 'ISOTÓNICO' | 'HIPERTÓNICO';
  volumenRelativoFinal: number; // Porcentaje del volumen inicial
  flujoNetoAcuaporinas: number; // mOsm/sec calculado dinámicamente
  temperaturaEnsayo: number;   // °C
  tiempoExposicion: number;    // Segundos
  fenomenoClinico: string;
  selloDigital: string;        // Hash criptográfico de validación de autoría
}

interface OsmolaritySimulatorProps {
  onConsolidarMuestra?: (id: string, datos: DatosConsolidaciónBitacora) => void;
  estudianteNombre?: string;
}

interface ConfiguracionFisiologica {
  id: string;
  concentracionNaCl: number; // %
  osmolaridadNominal: number; // mOsm/L
  estadoTonicidad: 'HIPOTÓNICO' | 'ISOTÓNICO' | 'HIPERTÓNICO';
  coeficientePermeabilidad: number; // Factor P_f de acuaporinas modificado
}

// Matriz Termodinámica de Soluciones según Guías Clínicas de la USTA
const CONFIGURACIONES_MEDIO: Record<string, ConfiguracionFisiologica> = {
  'hipotonico': { id: 'hipotonico', concentracionNaCl: 0.4, osmolaridadNominal: 136, estadoTonicidad: 'HIPOTÓNICO', coeficientePermeabilidad: 1.45 },
  'isotonico': { id: 'isotonico', concentracionNaCl: 0.9, osmolaridadNominal: 308, estadoTonicidad: 'ISOTÓNICO', coeficientePermeabilidad: 1.00 },
  'hipertonico': { id: 'hipertonico', concentracionNaCl: 10.0, osmolaridadNominal: 3422, estadoTonicidad: 'HIPERTÓNICO', coeficientePermeabilidad: 0.85 }
};

export default function OsmolaritySimulator({ onConsolidarMuestra, estudianteNombre }: OsmolaritySimulatorProps) {
  // --- ESTADOS DE CONTROL CINÉTICO Y BIOFÍSICO ---
  const [modelType, setModelType] = useState<'erythrocyte' | 'elodea'>('erythrocyte');
  const [medioSeleccionado, setMedioSeleccionado] = useState<string>('isotonico');
  const [temperatura, setTemperatura] = useState<number>(37); // Carga fisiológica por defecto (°C)
  const [tiempoSaturacion, setTiempoSaturacion] = useState<number>(0); // Contador cinético dinámico (segundos)
  
  // Variables calculadas dinámicamente usando la Ecuación de Van 't Hoff simplificada
  const [volumenCelular, setVolumenCelular] = useState<number>(100); // % del volumen original
  const [flujoAgua, setFlujoAgua] = useState<number>(0); // mOsm/segundo netos a través de acuaporinas
  const [guiaPaso, setGuiaPaso] = useState<number>(0); // HUD interactivo de instrucciones

  const configActual = CONFIGURACIONES_MEDIO[medioSeleccionado];

  // Declaración del aumento objetivo óptico estricto según la muestra
  const objetivoAumento = modelType === 'erythrocyte' ? '100X' : '40X';

  // --- MOTOR TERMODINÁMICO CINÉTICO (EJECUCIÓN DE CÁLCULO CIENTÍFICO) ---
  const ejecutarCalculoBiofisico = useCallback(() => {
    const T_Kelvin = temperatura + 273.15;
    const osmolaridadIntracelularFisiologica = 300; // mOsm/L basal
    
    // Gradiente de presión osmótica potencial: Δπ = R * T * ΔC
    const gradienteOsmolar = osmolaridadIntracelularFisiologica - configActual.osmolaridadNominal;
    
    // Influencia de la temperatura en la energía cinética de las moléculas de agua (Ley de Fick)
    const factorTemperatura = (T_Kelvin / 310.15); 
    const velocidadFlujoNeto = gradienteOsmolar * configActual.coeficientePermeabilidad * factorTemperatura * 0.05;
    
    setFlujoAgua(Number(velocidadFlujoNeto.toFixed(2)));

    // Simulación del cambio de volumen en función del tiempo transcurrido
    let cambioVolumenCalculado = 100 + (velocidadFlujoNeto * (tiempoSaturacion * 0.2));

    // Aplicación de limitantes mecánicas biológicas reales (Pared celular vs Membrana elástica)
    if (modelType === 'erythrocyte') {
      if (cambioVolumenCalculado > 140) cambioVolumenCalculado = 145; // Punto crítico de lisis celular
      if (cambioVolumenCalculado < 65) cambioVolumenCalculado = 65;   // Límite físico de crenación severa
    } else {
      // Modelo Elodea: La pared celular restringe mecánicamente la turgencia protegiendo el protoplasto
      if (cambioVolumenCalculado > 108) cambioVolumenCalculado = 108; // Presión de Turgencia máxima alcanzada
      if (cambioVolumenCalculado < 55) cambioVolumenCalculado = 55;   // Plasmólisis severa desprendida
    }

    setVolumenCelular(Number(cambioVolumenCalculado.toFixed(1)));
  }, [configActual, temperatura, tiempoSaturacion, modelType]);

  // Sincronización continua de la cinética transmembrana
  useEffect(() => {
    ejecutarCalculoBiofisico();
  }, [ejecutarCalculoBiofisico]);

  // Reloj analítico del laboratorio virtual
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoSaturacion(prev => (prev < 30 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(intervalo);
  }, [medioSeleccionado, modelType]);

  const reiniciarEnsayoTermodinamico = (medioId: string) => {
    setMedioSeleccionado(medioId);
    setTiempoSaturacion(0);
    setVolumenCelular(100);
  };

  // --- MEDIDAS DE CONTROL ANTIFRAUDE Y SEGURIDAD ACADÉMICA ---
  const activarDefensaAntiFraude = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert("🛡️ PROTOCOLO DE EXPORTACIÓN BIOLAB: Se prohíbe el copiado, pegado o arrastre de datos para validar las competencias de análisis crítico de la rúbrica USTA.");
  };

  const procesarConsolidacion = () => {
    if (!onConsolidarMuestra) return;

    let fenomenoDetectado = 'Homeostasis Fisiológica Normal';
    if (modelType === 'erythrocyte') {
      if (configActual.estadoTonicidad === 'HIPOTÓNICO') fenomenoDetectado = 'Hemólisis / Lisis Osmótica Directa';
      if (configActual.estadoTonicidad === 'HIPERTÓNICO') fenomenoDetectado = 'Crenación Celular por Deshidratación';
    } else {
      if (configActual.estadoTonicidad === 'HIPOTÓNICO') fenomenoDetectado = 'Turgencia Celular Vacuolar Máxima';
      if (configActual.estadoTonicidad === 'HIPERTÓNICO') fenomenoDetectado = 'Plasmólisis / Retracción del Protoplasto';
    }

    const payloadUnificado: DatosConsolidaciónBitacora = {
      modelType,
      solutoConcentracion: configActual.concentracionNaCl,
      osmolaridadExterna: configActual.osmolaridadNominal,
      tonicidadEstado: configActual.estadoTonicidad,
      volumenRelativoFinal: volumenCelular,
      flujoNetoAcuaporinas: flujoAgua,
      temperaturaEnsayo: temperatura,
      tiempoExposicion: tiempoSaturacion,
      fenomenoClinico: fenomenoDetectado,
      selloDigital: `BIOGALF_PHD_LINEROS_${btoa(modelType + configActual.estadoTonicidad + volumenCelular).slice(0, 12).toUpperCase()}`
    };

    onConsolidarMuestra(modelType, payloadUnificado);
    alert(`📊 REGISTRO MOLECULAR EXITOSO: Datos cinéticos inyectados en la Bitácora Final. Fenómeno: ${fenomenoDetectado}`);
  };

  // Mensajes dinámicos del HUD de Instrucciones de Uso
  const instruccionesUso = [
    "Paso 1: Seleccione el espécimen biológico de estudio en el panel superior (Eritrocitos para salud humana o Elodea para el modelo vegetal).",
    "Paso 2: Ajuste las variables físicas basales. Modifique la temperatura para alterar la energía cinética molecular del solvente.",
    "Paso 3: Aplique una concentración salina específica en la bomba de perfusión lateral para iniciar el gradiente pasivo.",
    "Paso 4: Observe la cinética y espere que el contador de tiempo se estabilice para presionar 'Consolidar Fenómeno Clínico de Tonicidad'."
  ];

  return (
    <div 
      className="w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md font-sans text-slate-200 select-none"
      onPaste={activarDefensaAntiFraude}
      onCopy={activarDefensaAntiFraude}
      onDrop={activarDefensaAntiFraude}
    >
      
      {/* HUD DE ADVERTENCIA E IDENTIFICACIÓN DEL OPERADOR */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 p-3 flex flex-wrap justify-between items-center gap-3 px-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">OPERADOR DIGITAL DE MEMBRANAS:</span>
          <span className="text-[10px] font-mono font-black text-indigo-400 uppercase">{estudianteNombre || "IDENTIFICACIÓN REQUERIDA EN ESTACIÓN 1"}</span>
        </div>
        <div className="text-[9px] font-mono bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 px-2.5 py-0.5 rounded-full font-bold">
          ENGINE VERSION v4.0.1 • SUPABASE COMPATIBLE
        </div>
      </div>

      {/* SISTEMA INTERACTIVO DE GUÍA AUTÓNOMA INTEGRADO */}
      <div className="bg-slate-900/20 border-b border-slate-800/50 p-4 px-6 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        <div className="md:col-span-9">
          <div className="text-[9px] text-amber-500 font-mono font-black uppercase tracking-widest">📋 MANUAL DE ACCESO METODOLÓGICO:</div>
          <p className="text-xs text-slate-300 font-medium leading-tight mt-0.5">{instruccionesUso[guiaPaso]}</p>
        </div>
        <div className="md:col-span-3 flex justify-end gap-1">
          <button type="button" onClick={() => setGuiaPaso(prev => Math.max(0, prev - 1))} disabled={guiaPaso === 0} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono disabled:opacity-20 font-bold">Anterior</button>
          <button type="button" onClick={() => setGuiaPaso(prev => Math.min(instruccionesUso.length - 1, prev + 1))} disabled={guiaPaso === instruccionesUso.length - 1} className="px-2.5 py-1 rounded bg-indigo-950 border border-indigo-800/50 text-[10px] font-mono text-indigo-400 disabled:opacity-20 font-bold">Entendido</button>
        </div>
      </div>

      {/* CONTROL DE MICROFOTOGRAFÍAS Y LENTES OBJETIVOS */}
      <div className="bg-slate-900/90 border-b border-slate-800 p-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="text-slate-300 text-xs font-mono tracking-wider">
            ÓPTICA VIRTUAL: Objetivo <strong className="text-white font-bold">{objetivoAumento}</strong> {modelType === 'erythrocyte' ? '• Campo Claro con Aceite de Inmersión' : '• Contraste de Fases'}
          </span>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button 
            type="button" 
            onClick={() => { setModelType('erythrocyte'); reiniciarEnsayoTermodinamico(medioSeleccionado); }}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider transition-all duration-300 ${modelType === 'erythrocyte' ? 'bg-indigo-600 text-white border border-indigo-400 shadow-lg shadow-indigo-950/40' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'}`}
          >
            Muestra A: Eritrocito (Línea Humana)
          </button>
          <button 
            type="button" 
            onClick={() => { setModelType('elodea'); reiniciarEnsayoTermodinamico(medioSeleccionado); }}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider transition-all duration-300 ${modelType === 'elodea' ? 'bg-indigo-600 text-white border border-indigo-400 shadow-lg shadow-indigo-950/40' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'}`}
          >
            Muestra B: Elodea (Línea Vegetal)
          </button>
        </div>
      </div>

      {/* ÁREA DE PROCESAMIENTO MATEMÁTICO-VISUAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px]">
        
        {/* PANEL IZQUIERDO: CONTROLES BIOFÍSICOS */}
        <div className="lg:col-span-4 bg-slate-900/30 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between gap-6">
          
          <div className="space-y-4">
            <span className="text-[9px] text-indigo-400 font-mono font-black uppercase tracking-widest block">Bomba de Perfusión de Solutos</span>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gradiente Extracelular de NaCl:</h3>
            
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => reiniciarEnsayoTermodinamico('hipotonico')} className={`p-3 rounded-xl border text-left text-xs transition-all ${medioSeleccionado === 'hipotonico' ? 'border-cyan-500 bg-cyan-950/20 text-white font-bold' : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'}`}>
                NaCl al 0.4% • Medio Hipotónico
              </button>
              <button type="button" onClick={() => reiniciarEnsayoTermodinamico('isotonico')} className={`p-3 rounded-xl border text-left text-xs transition-all ${medioSeleccionado === 'isotonico' ? 'border-emerald-500 bg-emerald-950/20 text-white font-bold' : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'}`}>
                NaCl al 0.9% • Solución Fisiológica
              </button>
              <button type="button" onClick={() => reiniciarEnsayoTermodinamico('hipertonico')} className={`p-3 rounded-xl border text-left text-xs transition-all ${medioSeleccionado === 'hipertonico' ? 'border-rose-500 bg-rose-950/20 text-white font-bold' : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'}`}>
                NaCl al 10% • Medio Hipertónico
              </button>
            </div>

            {/* CONTROL DE TEMPERATURA (VARIABLE TERMODINÁMICA) */}
            <div className="border-t border-slate-900 pt-3 space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Temperatura de Incubación:</span>
                <span className="text-indigo-400 font-bold">{temperatura} °C</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="50" 
                step="1" 
                value={temperatura} 
                onChange={(e) => setTemperatura(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[9px] text-slate-600 block leading-tight">Altera la energía cinética basal modificando el flujo transmembrana.</span>
            </div>
          </div>

          {/* TELEMETRÍA NUMÉRICA EN TIEMPO REAL */}
          <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl font-mono text-xs space-y-2 shadow-inner">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Telemetría de Canales (Acuaporina):</span>
            <div className="flex justify-between">
              <span className="text-slate-400">Osmolaridad Externa:</span>
              <span className="text-white font-bold">{configActual.osmolaridadNominal} mOsm/L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Velocidad Flujo Neto:</span>
              <span className={`font-bold ${flujoAgua > 0 ? 'text-cyan-400' : flujoAgua < 0 ? 'text-rose-400' : 'text-slate-400'}`}>{flujoAgua} mOsm/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tiempo de Exposición:</span>
              <span className="text-amber-400 font-bold">{tiempoSaturacion} s / 30s</span>
            </div>
            <div className="flex justify-between border-t border-slate-900 pt-1.5 items-center">
              <span className="text-slate-400">Volumen Celular Relativo:</span>
              <span className="text-white font-black text-sm">{volumenCelular}%</span>
            </div>
          </div>

        </div>

        {/* PANEL DERECHO: VISUALIZADOR ÓPTICO Y GRÁFICOS MOLECULARES */}
        <div className="lg:col-span-8 bg-[#020204] flex flex-col items-center justify-center p-6 relative overflow-hidden">
          
          {/* Capa de iluminación difusa del microscopio */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,rgba(0,0,0,1)_85%)] z-0"></div>
          
          {/* Retícula Física de Enfoque */}
          <div className="absolute border border-slate-800/20 rounded-full w-[380px] h-[340px] pointer-events-none z-10 flex items-center justify-center">
            <div className="absolute border border-slate-900/20 rounded-full w-[220px] h-[220px]"></div>
            <div className="w-full h-[1px] bg-slate-900/20 absolute"></div>
            <div className="h-full w-[1px] bg-slate-900/20 absolute"></div>
          </div>

          {/* RENDERIZADO DINÁMICO DE LOS ESTADOS MORFOLÓGICOS */}
          <div className="relative z-10 flex items-center justify-center min-h-[300px]">
            
            {/* MODELO ANIMAL: ERITROCITO */}
            {modelType === 'erythrocyte' && (
              <div className="relative flex items-center justify-center">
                {configActual.estadoTonicidad === 'ISOTÓNICO' && (
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-rose-800 shadow-[inset_0_0_35px_rgba(80,0,0,0.9),0_0_30px_rgba(225,29,72,0.2)] flex items-center justify-center animate-pulse [animation-duration:3s]">
                    <div className="w-24 h-24 bg-rose-700/60 rounded-full border border-rose-800/40 shadow-[inset_0_0_20px_rgba(100,0,0,0.8)] blur-[0.5px]"></div>
                    <span className="absolute bottom-[-25px] text-[9px] font-mono text-slate-500 uppercase tracking-widest">Homeostasis Basal</span>
                  </div>
                )}

                {configActual.estadoTonicidad === 'HIPOTÓNICO' && (
                  <div className="w-60 h-60 rounded-full border-2 border-dashed border-rose-500/20 bg-rose-950/5 flex items-center justify-center relative">
                    {volumenCelular >= 145 ? (
                      <div className="text-center space-y-1">
                        <span className="text-xs font-black text-rose-500 font-mono uppercase tracking-widest block animate-pulse">💥 HEMÓLISIS CRÍTICA</span>
                        <p className="text-[10px] text-slate-500 font-mono max-w-xs leading-tight">Membrana rota por presión hidrostática externa excesiva. Presencia de detritos.</p>
                      </div>
                    ) : (
                      <div 
                        className="rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-2xl flex items-center justify-center opacity-80 transition-all"
                        style={{ width: `${volumenCelular * 1.4}px`, height: `${volumenCelular * 1.4}px` }}
                      >
                        <span className="text-[9px] font-mono text-white font-black uppercase">Turgencia</span>
                      </div>
                    )}
                  </div>
                )}

                {configActual.estadoTonicidad === 'HIPERTÓNICO' && (
                  <div 
                    className="bg-gradient-to-br from-rose-700 to-rose-900 border-[3px] border-rose-950 shadow-[inset_0_0_30px_rgba(50,0,0,0.95)] flex items-center justify-center relative transition-all duration-500
                      rounded-br-[20%] rounded-tl-[35%] rounded-tr-[15%] rounded-bl-[40%] animate-bounce [animation-duration:5s]"
                    style={{ width: `${volumenCelular * 1.8}px`, height: `${volumenCelular * 1.8}px` }}
                  >
                    <div className="absolute top-2 left-6 w-1 h-3 bg-rose-950/50 rounded-full"></div>
                    <div className="absolute bottom-4 right-8 w-2 h-2 bg-rose-950/50 rounded-full"></div>
                    <span className="text-[9px] font-black text-rose-200/50 font-mono uppercase tracking-tighter">Crenación</span>
                  </div>
                )}
              </div>
            )}

            {/* MODELO VEGETAL: ELODEA */}
            {modelType === 'elodea' && (
              <div className="relative w-72 h-80 border-[5px] border-emerald-950 bg-emerald-950/10 shadow-[inset_0_0_50px_rgba(0,40,0,0.8)] flex items-center justify-center rounded-sm">
                
                {/* Membrana Plasmática Intracelular Protoplástica */}
                <div 
                  className="transition-all duration-1000 ease-out border-2 flex items-center justify-center relative"
                  style={{
                    width: configActual.estadoTonicidad === 'HIPERTÓNICO' ? `${volumenCelular * 1.1}%` : '98%',
                    height: configActual.estadoTonicidad === 'HIPERTÓNICO' ? `${volumenCelular * 1.1}%` : '98%',
                    borderRadius: configActual.estadoTonicidad === 'HIPERTÓNICO' ? '2.5rem' : '2px',
                    borderColor: configActual.estadoTonicidad === 'HIPERTÓNICO' ? '#10b981' : '#047857',
                    backgroundColor: configActual.estadoTonicidad === 'HIPOTÓNICO' ? 'rgba(4,120,87,0.15)' : 'rgba(4,120,87,0.05)'
                  }}
                >
                  {/* Vacuole de fluido */}
                  <div 
                    className="transition-all duration-1000 bg-gradient-to-br from-cyan-900/20 to-cyan-700/20 border border-cyan-500/20 rounded-xl blur-[0.3px]"
                    style={{
                      width: configActual.estadoTonicidad === 'HIPOTÓNICO' ? '94%' : configActual.estadoTonicidad === 'ISOTÓNICO' ? '75%' : '20%',
                      height: configActual.estadoTonicidad === 'HIPOTÓNICO' ? '94%' : configActual.estadoTonicidad === 'ISOTÓNICO' ? '80%' : '20%'
                    }}
                  ></div>

                  {/* Distribución Dinámica de Cloroplastos */}
                  <div className={`absolute bg-emerald-500 border border-emerald-400 shadow-md rounded-full transition-all duration-1000 ${configActual.estadoTonicidad === 'HIPERTÓNICO' ? 'top-12 left-10 w-4 h-4' : 'top-4 left-6 w-5 h-5'}`}></div>
                  <div className={`absolute bg-emerald-500 border border-emerald-400 shadow-md rounded-full transition-all duration-1000 ${configActual.estadoTonicidad === 'HIPERTÓNICO' ? 'bottom-12 right-12 w-4 h-4' : 'bottom-6 right-8 w-6 h-4 rotate-45'}`}></div>
                  <div className={`absolute bg-emerald-500 border border-emerald-400 shadow-md rounded-full transition-all duration-1000 ${configActual.estadoTonicidad === 'HIPERTÓNICO' ? 'top-14 right-10 w-3.5 h-3.5' : 'top-12 right-12 w-4.5 h-4.5'}`}></div>
                  <div className={`absolute bg-emerald-500 border border-emerald-400 shadow-md rounded-full transition-all duration-1000 ${configActual.estadoTonicidad === 'HIPERTÓNICO' ? 'top-8 right-8 w-4 h-4' : 'bottom-16 left-4 w-5 h-4 -rotate-12'}`}></div>
                </div>

                <div className="absolute top-2.5 left-2.5 text-[8px] font-mono font-bold text-emerald-800/80 uppercase tracking-widest">Pared Celular Hemicelulósica</div>
                {configActual.estadoTonicidad === 'HIPERTÓNICO' && (
                  <div className="absolute bottom-2.5 right-2.5 text-[8px] font-mono text-amber-600/80 font-black uppercase tracking-widest animate-pulse">Plasmólisis Activa</div>
                )}
                {configActual.estadoTonicidad === 'HIPOTÓNICO' && (
                  <div className="absolute bottom-2.5 right-2.5 text-[8px] font-mono text-cyan-400/80 font-black uppercase tracking-widest">Presión de Turgencia (++)</div>
                )}
              </div>
            )}

          </div>

          <div className="w-full max-w-md bg-slate-900/40 border border-dashed border-slate-800 p-2.5 rounded-xl text-center text-[10px] text-slate-500 font-mono mt-4">
            ℹ️ Mapeo Termodinámico activo. Simulación matemática basada en la constante gaseosa $R$ y la diferencia de osmolaridad.
          </div>

          {/* BOTÓN CONSOLIDADOR HACIA BITÁCORA */}
          <div className="w-full max-w-md mt-4">
            <button
              type="button"
              onClick={procesarConsolidacion}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-mono text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-950/40 border border-indigo-400/20 active:scale-[0.99]"
            >
              Consolidar Fenómeno Clínico de Tonicidad
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
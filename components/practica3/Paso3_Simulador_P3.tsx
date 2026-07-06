/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v4.0.0 (PREMIUM GLOBAL)
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * INMUNOQUÍMICA & TRANSDUCCIÓN MOLECULAR ENGINE - CORE V4
 * ============================================================================
 */

"use client";
import React, { useState, useEffect, useCallback } from 'react';

// --- INTERFACES DE CONTROL ESTRICTO ---
interface DetalleAglutinacionMuestra {
  pacienteId: string;
  grupoSanguineoEstudiante: string;
  grupoSanguineoCorrecto: string;
  esGrupoCorrecto: boolean;
  mecanismoSeñalizacionEstudiante: string;
  mecanismoSeñalizacionCorrecto: string;
  esSeñalizacionCorrecta: boolean;
  segundoMensajeroEstudiante: string;
  segundoMensajeroCorrecto: string;
  esMensajeroCorrecto: boolean;
}

interface Paso3Props {
  estudianteNombre: string;
  estudianteEmail: string;
  respuestasAglutinacion: Record<string, DetalleAglutinacionMuestra>;
  setRespuestasAglutinacion: React.Dispatch<React.SetStateAction<Record<string, DetalleAglutinacionMuestra>>>;
}

interface CasoClinicoBanco {
  id: string;
  nombre: string;
  facultad: 'Medicina' | 'Odontología' | 'Optometría';
  historiaClínica: string;
  bioquímicaEritrocito: string;
  reaccionesEsperadas: { AntiA: boolean; AntiB: boolean; AntiD: boolean };
  grupoSanguineoCorrecto: string;
  desafíoReceptor: string;
  opcionesReceptor: { id: string; texto: string }[];
  receptorCorrecto: string;
  desafíoSegundosMensajeros: string;
  opcionesMensajeros: { id: string; texto: string }[];
  mensajeroCorrecto: string;
}

// --- BANCO DE DATOS CLÍNICOS UNIFICADO CON RIGOR Q1 ---
const bancoCasosInmunoquimica: CasoClinicoBanco[] = [
  {
    id: 'P1',
    nombre: 'Caso 01 - Carlos Mendoza (Politraumatismo)',
    facultad: 'Medicina',
    historiaClínica: 'Paciente masculino de 24 años ingresa a urgencias con shock hipovolémico severo secundario a trauma cerrado de tórax y abdomen por accidente automovilístico. TA: 80/40 mmHg, FC: 135 lpm. Requiere transfusión masiva de empaquetados eritrocitarios de urgencia.',
    bioquímicaEritrocito: 'Presencia de epítopos terminales de N-acetilgalactosamina unidos a la sustancia H eritrocitaria (Antígeno A) y expresión del polipéptido transmembrana no glicosilado Rho(D).',
    reaccionesEsperadas: { AntiA: true, AntiB: false, AntiD: true },
    grupoSanguineoCorrecto: 'A+',
    desafíoReceptor: 'Para compensar la hipotensión crítica, el organismo libera masivamente norepinefrina. ¿Qué familia de receptores celulares en las células musculares lisas vasculares media la vasoconstricción sistémica periférica?',
    opcionesReceptor: [
      { id: 'GPCR_Alpha1', texto: 'Receptores Adrenérgicos Alfa-1 acoplados a proteína Gq, que activan la vía de la Fosfolipasa C (PLC).' },
      { id: 'GPCR_Beta2', texto: 'Receptores Adrenérgicos Beta-2 acoplados a proteína Gs, que aumentan la actividad de la Adenilato Ciclasa.' },
      { id: 'ION_Nic', texto: 'Receptores Nicotínicos de Acetilcolina acoplados a canales ionotrópicos permeables a sodio.' }
    ],
    receptorCorrecto: 'GPCR_Alpha1',
    desafíoSegundosMensajeros: 'Tras la unión del ligando adrenérgico al receptor Alfa-1, ¿cuál es la cascada intracelular de segundos mensajeros que induce la liberación de calcio desde el retículo sarcoplásmico?',
    opcionesMensajeros: [
      { id: 'CAMP_PKA', texto: 'Generación de AMP cíclico (cAMP) y subsecuente activación de la Proteína Quinasa A (PKA).' },
      { id: 'IP3_DAG', texto: 'Escisión del PIP2 en Inositol Trifosfato (IP3) y Diacilglicerol (DAG) por acción de la PLC.' },
      { id: 'CGMP_PKG', texto: 'Activación de la Guanilato Ciclasa soluble y acumulación de GMP cíclico (cGMP).' }
    ],
    mensajeroCorrecto: 'IP3_DAG'
  },
  {
    id: 'P2',
    nombre: 'Caso 02 - Elena Rostova (Dolor Pulpar Agudo)',
    facultad: 'Odontología',
    historiaClínica: 'Paciente femenina de 38 años acude a consulta por odontalgia bifásica lancinante e intolerable en el órgano dental 36, exacerbada por estímulos térmicos. Diagnóstico: Pulpitis irreversible aguda con compromiso de fibras nociceptivas tipo C.',
    bioquímicaEritrocito: 'Ausencia total de residuos antigénicos A y B (sustancia H desnuda sin adiciones de carbohidratos terminales) y ausencia del antígeno transmembrana D (Rh negativo).',
    reaccionesEsperadas: { AntiA: false, AntiB: false, AntiD: false },
    grupoSanguineoCorrecto: 'O-',
    desafíoReceptor: 'El dolor y la inflamación pulpar están mediados por la activación de canales catiónicos de potencial transitorio en los terminales nerviosos aferentes. ¿Qué tipo de receptor responde directamente a estímulos nocivos como el calor extremo o protones libres?',
    opcionesReceptor: [
      { id: 'ION_TRPV1', texto: 'Canal Ionotrópico TRPV1, activado por ligandos químicos o variaciones térmicas nocivas, permitiendo el influjo celular de cationes.' },
      { id: 'GPCR_Mu', texto: 'Receptor Opioide Mu acoplado a proteína Gi/o, que hiperpolariza la membrana presináptica.' },
      { id: 'RTK_TrkA', texto: 'Receptor Catalítico TrkA con actividad intrínseca de tirosina quinasa para el Factor de Crecimiento Nervioso.' }
    ],
    receptorCorrecto: 'ION_TRPV1',
    desafíoSegundosMensajeros: 'Al abrirse el canal ionotrópico TRPV1 en la fibra nerviosa pulpar, ¿qué evento biofísico directo transmembrana desencadena la propagación del potencial de acción hacia el sistema nervioso central?',
    opcionesMensajeros: [
      { id: 'DESPOL', texto: 'Influjo masivo de iones Sodio (Na+) y Calcio (Ca2+), provocando la despolarización rápida de la membrana neuronal.' },
      { id: 'HIPERPOL', texto: 'Eflujo selectivo de Potasio (K+) inducido por carga, resultando en hiperpolarización protectora.' },
      { id: 'INACTIV', texto: 'Bloqueo alostérico de los canales de Cloro regulados por voltaje citoplasmático.' }
    ],
    mensajeroCorrecto: 'DESPOL'
  },
  {
    id: 'P3',
    nombre: 'Caso 03 - Alejandro Silva (Uveitis Autoinmune)',
    facultad: 'Optometría',
    historiaClínica: 'Paciente masculino de 42 años presenta cuadro de ojo rojo unilateral, fotofobia severa, dolor ocular profundo y disminución de la agudeza visual. Examen con lámpara de hendidura revela células flotantes en cámara anterior (Efecto Tyndall ++). Sospecha de uveítis anterior aguda asociada a HLA-B27.',
    bioquímicaEritrocito: 'Presencia de residuos terminales de D-galactosa unidos covalentemente a la cadena oligosacarídica de la sustancia H (Antígeno B) y ausencia de la proteína Rh(D).',
    reaccionesEsperadas: { AntiA: false, AntiB: true, AntiD: false },
    grupoSanguineoCorrecto: 'B-',
    desafíoReceptor: 'La respuesta inflamatoria local y la proliferación de linfocitos T autorreactivos en la úvea están controladas por citoquinas y factores de crecimiento. ¿Qué tipo de receptor celular utiliza la cascada de fosforilación cruzada para regular la expresión génica proinflamatoria?',
    opcionesReceptor: [
      { id: 'CAT_RTK', texto: 'Receptores Catalíticos acoplados a Tirosina Quinasas (RTK) o receptores tipo JAK/STAT implicados en señales de supervivencia y transcripción.' },
      { id: 'GPCR_Gs', texto: 'Receptores acoplados a subunidad alfa Gs, estimulantes del aclaramiento inmunológico mediado por macrófagos.' },
      { id: 'ION_GABA', texto: 'Canales activados por neurotransmisor inhibitorio GABA tipo A permeables a aniones.' }
    ],
    receptorCorrecto: 'CAT_RTK',
    desafíoSegundosMensajeros: 'Tras la dimerización y autofosforilación de los residuos de tirosina citoplasmáticos del receptor catalítico, ¿qué cascada molecular mitogénica se desencadena?',
    opcionesMensajeros: [
      { id: 'MAPK_ERK', texto: 'Reclutamiento de proteínas adaptadoras Grb2/SOS, activación de la GTPasa Ras y encendido de la vía quinasa de MAPK/ERK.' },
      { id: 'CALMODULINA', texto: 'Fijación directa de iones de Calcio a la Calmodulina citosólica sin intermediarios lipídicos.' },
      { id: 'PKA_CYC', texto: 'Translocación nuclear inmediata de la subunidad catalítica de la PKA.' }
    ],
    mensajeroCorrecto: 'MAPK_ERK'
  }
];

export default function Paso3_Simulador_P3({
  estudianteNombre,
  estudianteEmail,
  respuestasAglutinacion,
  setRespuestasAglutinacion
}: Paso3Props) {
  // --- CONTROL DE TIEMPOS DE ACTIVIDAD INSTITUCIONAL ---
  const [horaInicio, setHoraInicio] = useState<string>('');
  const [horaCierre, setHoraCierre] = useState<string>('');
  const [segundosTranscurridos, setSegundosTranscurridos] = useState<number>(0);

  // --- ESTADOS DE LA EXPERIENCIA CENTRAL ---
  const [casoIdx, setCasoIdx] = useState<number>(0);
  const [suerosAplicados, setSuerosAplicados] = useState({ AntiA: false, AntiB: false, AntiD: false });
  const [seleccionGrupo, setSeleccionGrupo] = useState<string>('');
  const [seleccionReceptor, setSeleccionReceptor] = useState<string>('');
  const [seleccionMensajero, setSeleccionMensajero] = useState<string>('');

  const casoActual = bancoCasosInmunoquimica[casoIdx];

  // Inicialización estricta del reloj al montar el componente
  useEffect(() => {
    const ahora = new Date();
    setHoraInicio(ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    
    const limiteCierre = new Date(ahora.getTime() + 130 * 60 * 1000); // 130 minutos estimados de la guía
    setHoraCierre(limiteCierre.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    const cronometro = setInterval(() => {
      setSegundosTranscurridos(prev => prev + 1);
    }, 1000);

    return () => clearInterval(cronometro);
  }, []);

  const formatTiempo = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const restantes = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${restantes.toString().padStart(2, '0')}`;
  };

  const aplicarReactivoInmune = (tipo: 'AntiA' | 'AntiB' | 'AntiD') => {
    setSuerosAplicados(prev => ({ ...prev, [tipo]: true }));
  };

  const purgarLámina = () => {
    setSuerosAplicados({ AntiA: false, AntiB: false, AntiD: false });
    setSeleccionGrupo('');
    setSeleccionReceptor('');
    setSeleccionMensajero('');
  };

  const consolidarMuestraCaso = () => {
    if (!seleccionGrupo || !seleccionReceptor || !seleccionMensajero) {
      alert("❌ ERROR ANALÍTICO: Debe completar la tipificación inmunológica y resolver la totalidad de la cascada de señalización molecular.");
      return;
    }

    setRespuestasAglutinacion(prev => ({
      ...prev,
      [casoActual.id]: {
        pacienteId: casoActual.id,
        grupoSanguineoEstudiante: seleccionGrupo,
        grupoSanguineoCorrecto: casoActual.grupoSanguineoCorrecto,
        esGrupoCorrecto: seleccionGrupo === casoActual.grupoSanguineoCorrecto,
        mecanismoSeñalizacionEstudiante: seleccionReceptor,
        mecanismoSeñalizacionCorrecto: casoActual.receptorCorrecto,
        esSeñalizacionCorrecta: seleccionReceptor === casoActual.receptorCorrecto,
        segundoMensajeroEstudiante: seleccionMensajero,
        segundoMensajeroCorrecto: casoActual.mensajeroCorrecto,
        esMensajeroCorrecto: seleccionMensajero === casoActual.mensajeroCorrecto
      }
    }));

    alert(`📋 CASO CONSOLIDADO: Métricas registradas temporalmente en el Core para ${casoActual.nombre}.`);
  };

  const bloquearFraude = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert("🛡️ SISTEMA ANTIFRAUDE BIOLAB: Redacte sus elecciones manualmente. El copiado, pegado y arrastre externo están deshabilitados.");
  };

  return (
    <div 
      className="flex flex-col w-full max-w-6xl mx-auto p-2 text-slate-200 font-sans select-none"
      onPaste={bloquearFraude}
      onCopy={bloquearFraude}
      onDrop={bloquearFraude}
    >
      
      {/* HUD PREMIUM DE TIEMPOS INSTITUCIONALES (SOLICITADO) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 px-6 mb-6 shadow-xl items-center font-mono text-xs">
        <div className="flex flex-col">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Operador Académico</span>
          <span className="text-indigo-400 font-black truncate">{estudianteNombre || "No Registrado en Estación 1"}</span>
        </div>
        <div className="flex flex-col border-l border-slate-800 md:pl-4">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Hora Inicio de Práctica</span>
          <span className="text-white font-bold">{horaInicio || "--:--:--"}</span>
        </div>
        <div className="flex flex-col border-l border-slate-800 md:pl-4">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Tiempo en Laboratorio</span>
          <span className="text-amber-400 font-bold text-sm animate-pulse">{formatTiempo(segundosTranscurridos)} min</span>
        </div>
        <div className="flex flex-col border-l border-slate-800 md:pl-4">
          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Hora Límite de Cierre</span>
          <span className="text-rose-500 font-bold">{horaCierre || "--:--"}</span>
        </div>
      </div>

      {/* ENCABEZADO METODOLÓGICO */}
      <div className="mb-6">
        <div className="text-teal-400 font-bold text-xs tracking-[0.2em] mb-1 uppercase font-mono">Estación 03</div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Analizador Inmunomolecular, Tipificación ABO/Rh y Vías de Transducción</h1>
        <p className="text-slate-400 text-xs md:text-sm">Analice la aglutinación mediada por anticuerpos pentaméricos en membrana y resuelva los dilemas de señalización celular y segundos mensajeros.</p>
      </div>

      {/* DISEÑO EN DOS COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* PANEL DE CASOS Y BIOLOGÍA MOLECULAR (COL 5) */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-5 backdrop-blur-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
              <h3 className="text-xs font-black text-slate-400 uppercase font-mono tracking-wider">🔬 Banco de Sangre e Historias Clínicas</h3>
              <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[9px] px-2 py-0.5 rounded font-bold font-mono">CASOS ACTIVOS</span>
            </div>

            {/* Selectores de Casos */}
            <div className="grid grid-cols-3 gap-2">
              {bancoCasosInmunoquimica.map((caso, idx) => (
                <button
                  key={caso.id}
                  type="button"
                  onClick={() => { setCasoIdx(idx); purgarLámina(); }}
                  className={`p-2.5 rounded-xl border text-center font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${casoIdx === idx ? 'bg-teal-950/40 border-teal-500 text-white font-black' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                  {caso.id} ({caso.facultad.slice(0, 3)})
                </button>
              ))}
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
              <span className="text-[9px] font-mono font-bold text-teal-400 block uppercase tracking-wide">Anamnesis y Cuadro Clínico:</span>
              <p className="text-xs text-slate-300 leading-relaxed italic text-justify">{casoActual.historiaClínica}</p>
            </div>

            <div className="bg-slate-950/30 border border-slate-800/80 p-4 rounded-xl space-y-2">
              <span className="text-[9px] font-mono font-black text-teal-500 block uppercase tracking-wider">Perfil Inmunoquímico de la Membrana Eritrocitaria:</span>
              <div className="text-[11px] text-slate-400 space-y-1.5 text-justify">
                <div>• <strong>Antígenos de Superficie:</strong> {suerosAplicados.AntiA || suerosAplicados.AntiB ? casoActual.bioquímicaEritrocito : <span className="text-slate-600 italic">[Aplique sueros para incubar glicanos]</span>}</div>
              </div>
            </div>
          </div>

          {/* CONTROLES DE ADICIÓN DE ANTISUEROS MONOCLONALES */}
          <div className="space-y-3 border-t border-slate-800/60 pt-4">
            <span className="text-[9px] font-mono font-black text-slate-400 block uppercase tracking-wider">Dispensador de Antisueros IgM:</span>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => aplicarReactivoInmune('AntiA')} disabled={suerosAplicados.AntiA} className="p-3 rounded-lg bg-blue-950/40 border border-blue-800 text-blue-400 text-[10px] font-mono font-black uppercase hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30">Anti-A</button>
              <button type="button" onClick={() => aplicarReactivoInmune('AntiB')} disabled={suerosAplicados.AntiB} className="p-3 rounded-lg bg-yellow-950/20 border border-yellow-800 text-yellow-400 text-[10px] font-mono font-black uppercase hover:bg-yellow-600 hover:text-white transition-all disabled:opacity-30">Anti-B</button>
              <button type="button" onClick={() => aplicarReactivoInmune('AntiD')} disabled={suerosAplicados.AntiD} className="p-3 rounded-lg bg-slate-950 border border-slate-700 text-slate-300 text-[10px] font-mono font-black uppercase hover:bg-slate-600 hover:text-white transition-all disabled:opacity-30">Anti-D (Rh)</button>
            </div>
            <button type="button" onClick={purgarLámina} className="w-full py-2 rounded-lg bg-rose-950/10 border border-rose-900/30 text-rose-400 text-[10px] font-mono uppercase tracking-widest font-bold hover:bg-rose-900/20">Limpiar Platina de Reacción</button>
          </div>
        </div>

        {/* PANEL DERECHO: SIMULACIÓN EN PLACA Y ESCENARIOS INTERACTIVOS (COL 7) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative min-h-[500px]">
          
          {/* LÁMINA PORTAOBJETOS CON VISUALIZACIÓN DE HEMAGLUTINACIÓN */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3 shadow-inner">
            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider block">Placa de Tipificación Serológica:</span>
            <div className="grid grid-cols-3 gap-3">
              
              {/* POCILLO ANTI-A */}
              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-2">
                <span className="text-[9px] font-mono text-blue-400 font-bold">REACCIÓN ANTI-A</span>
                <div className="w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center transition-all duration-500 overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.AntiA ? (casoActual.reaccionesEsperadas.AntiA ? '#450a0a' : '#7f1d1d') : '#08070b' }}>
                  {suerosAplicados.AntiA && (
                    <span className="text-[8px] font-black text-white font-mono px-1 text-center leading-tight">
                      {casoActual.reaccionesEsperadas.AntiA ? "AGLUTINA (++)" : "HOMOGÉNEO (-)"}
                    </span>
                  )}
                </div>
              </div>

              {/* POCILLO ANTI-B */}
              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-2">
                <span className="text-[9px] font-mono text-yellow-500 font-bold">REACCIÓN ANTI-B</span>
                <div className="w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center transition-all duration-500 overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.AntiB ? (casoActual.reaccionesEsperadas.AntiB ? '#450a0a' : '#7f1d1d') : '#08070b' }}>
                  {suerosAplicados.AntiB && (
                    <span className="text-[8px] font-black text-white font-mono px-1 text-center leading-tight">
                      {casoActual.reaccionesEsperadas.AntiB ? "AGLUTINA (++)" : "HOMOGÉNEO (-)"}
                    </span>
                  )}
                </div>
              </div>

              {/* POCILLO ANTI-D */}
              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-2">
                <span className="text-[9px] font-mono text-slate-400 font-bold">REACCIÓN ANTI-D</span>
                <div className="w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center transition-all duration-500 overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.AntiD ? (casoActual.reaccionesEsperadas.AntiD ? '#450a0a' : '#7f1d1d') : '#08070b' }}>
                  {suerosAplicados.AntiD && (
                    <span className="text-[8px] font-black text-white font-mono px-1 text-center leading-tight">
                      {casoActual.reaccionesEsperadas.AntiD ? "AGLUTINA (++)" : "HOMOGÉNEO (-)"}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ASIGNACIÓN DE FENOTIPO */}
          <div className="bg-slate-900/30 border border-slate-800 p-3 rounded-xl mt-4 space-y-1.5">
            <label className="block text-[10px] text-slate-400 font-mono uppercase font-black">1. Conclusión Inmunohematológica (Grupo Sanguíneo):</label>
            <select value={seleccionGrupo} onChange={(e) => setSeleccionGrupo(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono outline-none focus:border-teal-500">
              <option value="">Seleccione el fenotipo calculado...</option>
              <option value="A+">Grupo A Positivo (A+)</option>
              <option value="B-">Grupo B Negativo (B-)</option>
              <option value="O-">Grupo O Negativo (O-)</option>
            </select>
          </div>

          {/* DESAFÍO DE RECEPTORES CELULARES */}
          <div className="bg-slate-900/30 border border-slate-800 p-3 rounded-xl mt-4 space-y-1.5">
            <label className="block text-[10px] text-slate-400 font-mono uppercase font-black">2. Diagnóstico Molecular de Receptores de Membrana:</label>
            <p className="text-[11px] text-slate-200 font-medium leading-snug">{casoActual.desafíoReceptor}</p>
            <select value={seleccionReceptor} onChange={(e) => setSeleccionReceptor(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-teal-500">
              <option value="">Seleccione la familia de receptores...</option>
              {casoActual.opcionesReceptor.map(o => (
                <option key={o.id} value={o.id}>{o.texto}</option>
              ))}
            </select>
          </div>

          {/* DESAFÍO DE SEGUNDOS MENSAJEROS / CASCADAS */}
          <div className="bg-slate-900/30 border border-slate-800 p-3 rounded-xl mt-4 space-y-1.5">
            <label className="block text-[10px] text-slate-400 font-mono uppercase font-black">3. Dinámica de Segundos Mensajeros y Transducción Intracelular:</label>
            <p className="text-[11px] text-slate-200 font-medium leading-snug">{casoActual.desafíoSegundosMensajeros}</p>
            <select value={seleccionMensajero} onChange={(e) => setSeleccionMensajero(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-teal-500">
              <option value="">Seleccione el mecanismo de transducción...</option>
              {casoActual.opcionesMensajeros.map(m => (
                <option key={m.id} value={m.id}>{m.texto}</option>
              ))}
            </select>
          </div>

          {/* BOTÓN CONSOLIDADOR */}
          <div className="mt-5 flex items-center justify-between gap-4 w-full pt-4 border-t border-slate-900">
            <div className="text-[10px] font-mono text-slate-500 truncate flex-1">
              Estado de Muestra {casoActual.id}: {respuestasAglutinacion[casoActual.id] ? <span className="text-teal-400 font-bold">✓ CONSOLIDADO</span> : <span className="text-rose-500 animate-pulse">❌ PENDIENTE</span>}
            </div>
            <button 
              type="button" 
              onClick={consolidarMuestraCaso} 
              className="p-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-mono text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-950/30 border border-indigo-400/20 active:scale-[0.99]"
            >
              Consolidar Caso de Señalización
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
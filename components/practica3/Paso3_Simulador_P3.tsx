/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.5.0
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * IMMUNOHEMATOLOGY MOLECULAR ENGINE: SIMULADOR AVANZADO DE RECEPTORES Y HEMAGLUTINACIÓN
 * ============================================================================
 */

"use client";
import React, { useState } from 'react';

interface Paso3Props {
  estudianteNombre: string;
  respuestasAglutinacion: any;
  setRespuestasAglutinacion: React.Dispatch<React.SetStateAction<any>>;
}

interface PacienteClinico {
  id: string;
  nombre: string;
  facultadDestino: 'Medicina' | 'Odontología' | 'Optometría';
  historia: string;
  antigenosPresentes: string;
  anticuerposSéricos: string;
  reacciones: { AntiA: boolean; AntiB: boolean; AntiD: boolean };
  grupoCorrecto: string;
  preguntaTransduccion: string;
  opcionesTransduccion: { id: string; texto: string }[];
  respuestaTransduccionCorrecta: string;
}

const bancoPacientesMundial: PacienteClinico[] = [
  {
    id: 'P1',
    nombre: 'Caso 01 - Carlos Mendoza (Maxilofacial)',
    facultadDestino: 'Odontología',
    historia: 'Paciente que ingresa programado para cirugía reconstructiva ortognática por asimetría maxilofacial. Se solicita tipificación inmunoquímica pre-quirúrgica obligatoria para prevenir shock hemolítico transoperatorio.',
    antigenosPresentes: 'N-acetilgalactosamina unida a la sustancia H (Antígeno A) y Proteína hidrofóbica transmembrana D (Rh).',
    anticuerposSéricos: 'Inmunoglobulinas Anti-B (Aglutininas plasmáticas).',
    reacciones: { AntiA: true, AntiB: false, AntiD: true },
    grupoCorrecto: 'A+',
    preguntaTransduccion: 'Durante el procedimiento quirúrgico, se administra lidocaína como anestésico local para bloquear la conducción del dolor. ¿A qué familia de receptores celulares de membrana se une este fármaco para detener el potencial de acción nociceptivo?',
    opcionesTransduccion: [
      { id: 'A', texto: 'Receptores acoplados a Proteínas G (GPCR) con activación de la vía de la adenilato ciclasa.' },
      { id: 'B', texto: 'Receptores Ionotrópicos, bloqueando canales de sodio (Na+) dependientes de voltaje en la membrana neuronal.' },
      { id: 'C', texto: 'Receptores Catalíticos con actividad intrínseca de Tirosina Quinasa (RTK).' }
    ],
    respuestaTransduccionCorrecta: 'B'
  },
  {
    id: 'P2',
    nombre: 'Caso 02 - Elena Rostova (Control Retiniano)',
    facultadDestino: 'Optometría',
    historia: 'Paciente con antecedentes clínicos de anemia hemolítica de origen autoinmune. Presenta alteraciones vasculares retinianas. Se requiere caracterizar los marcadores de membrana eritrocitaria para correlacionar con la fragilidad capilar ocular.',
    antigenosPresentes: 'D-galactosa unida a la sustancia H (Antígeno B). Ausencia del antígeno proteico D.',
    anticuerposSéricos: 'Inmunoglobulinas Anti-A.',
    reacciones: { AntiA: false, AntiB: true, AntiD: false },
    grupoCorrecto: 'B-',
    preguntaTransduccion: 'La cascada visual en los fotorreceptores de la retina (conos y bastones) se activa cuando los fotones de luz impactan sobre la rodopsina. ¿Qué tipo de receptor y mecanismo molecular celular transduce esta señal lumínica?',
    opcionesTransduccion: [
      { id: 'A', texto: 'Un receptor acoplado a proteína G (GPCR) que activa la fosfodiesterasa, disminuyendo los niveles de GMPc intracelular.' },
      { id: 'B', texto: 'Un canal iónico regulado por ligando extracelular directo.' },
      { id: 'C', texto: 'Un receptor ligado a enzimas que desencadena la cascada de quinasas MAP.' }
    ],
    respuestaTransduccionCorrecta: 'A'
  },
  {
    id: 'P3',
    nombre: 'Caso 03 - Dr. Alejandro Silva (Politraumatismo)',
    facultadDestino: 'Medicina',
    historia: 'Ingresa a la unidad de cuidados intensivos traumatológicos con shock hipovolémico severo secundario a accidente de tránsito. Requiere transfusión masiva inmediata de concentrado eritrocitario de emergencia.',
    antigenosPresentes: 'Ausencia total de azúcares terminales A y B (solo presenta sustancia H precursora). Ausencia del Antígeno D.',
    anticuerposSéricos: 'Inmunoglobulinas Anti-A y Anti-B (Isoaglutininas de alta reactividad lítica).',
    reacciones: { AntiA: false, AntiB: false, AntiD: false },
    grupoCorrecto: 'O-',
    preguntaTransduccion: 'Para estabilizar la hemodinámica del paciente, se infunde adrenalina endovenosa con el fin de inducir vasoconstricción periférica e inotropismo cardíaco a través de los receptores adrenérgicos beta-1 y alfa-1. ¿A qué grupo molecular pertenecen estos receptores?',
    opcionesTransduccion: [
      { id: 'A', texto: 'Receptores acoplados a proteína G (GPCR) que modulan segundos mensajeros como el AMPc y el IP3/Diacilglicerol.' },
      { id: 'B', texto: 'Receptores catalíticos asociados a la vía JAK/STAT.' },
      { id: 'C', texto: 'Canales iónicos rápidos dependientes de ligandos purinérgicos.' }
    ],
    respuestaTransduccionCorrecta: 'A'
  },
  {
    id: 'P4',
    nombre: 'Caso 04 - Lucía Villamizar (Shock Anafiláctico)',
    facultadDestino: 'Medicina',
    historia: 'Paciente que manifiesta una reacción alérgica sistémica grave aguda (anafilaxia) con hipotensión severa y angioedema. Se solicita tipificación para panel de exclusión inmunoquímica molecular antes de inyectar expansores plasmáticos basados en polímeros.',
    antigenosPresentes: 'N-acetilgalactosamina y D-galactosa unidas simultáneamente a cadenas de sustancia H. Presencia del Antígeno D.',
    reacciones: { AntiA: true, AntiB: true, AntiD: true },
    grupoCorrecto: 'AB+',
    anticuerposSéricos: 'Ausencia de anticuerpos naturales circulantes contra el sistema ABO.',
    preguntaTransduccion: 'Durante el shock anafiláctico, la unión de la IgE a los mastocitos libera histamina, la cual interactúa con receptores endoteliales vasculares promoviendo la síntesis de óxido nítrico mediante la entrada de calcio. ¿Qué tipo de receptor regula este cambio celular?',
    opcionesTransduccion: [
      { id: 'A', texto: 'Receptor acoplado a proteína Gq que activa la fosfolipasa C (PLC) aumentando el calcio intracelular.' },
      { id: 'B', texto: 'Receptor nuclear citoplasmático translocador de transcripción directa.' },
      { id: 'C', texto: 'Receptor tirosina quinasa dimerizable.' }
    ],
    respuestaTransduccionCorrecta: 'A'
  }
];

export default function Paso3_Simulador_P3({
  estudianteNombre,
  respuestasAglutinacion,
  setRespuestasAglutinacion
}: Paso3Props) {
  const [pacienteIdx, setPacienteIdx] = useState(0);
  const [suerosAplicados, setSuerosAplicados] = useState({ A: false, B: false, D: false });
  const [diagnosticoGrupo, setDiagnosticoGrupo] = useState('');
  const [respuestaTransduccion, setRespuestaTransduccion] = useState('');

  const pacienteActual = bancoPacientesMundial[pacienteIdx];

  const aplicarSuero = (tipo: 'A' | 'B' | 'D') => {
    setSuerosAplicados(prev => ({ ...prev, [tipo]: true }));
  };

  const limpiarPlatina = () => {
    setSuerosAplicados({ A: false, B: false, D: false });
    setDiagnosticoGrupo('');
    setRespuestaTransduccion('');
  };

  const registrarResultadosEstacion = (grupo: string, pregId: string) => {
    if (!grupo) {
      alert("Debe seleccionar un fenotipo de grupo sanguíneo para el registro.");
      return;
    }
    if (!pregId) {
      alert("Debe resolver el desafío molecular de transducción de señales.");
      return;
    }

    setRespuestasAglutinacion((prev: Record<string, any>) => ({
      ...prev,
      [pacienteActual.id]: {
        grupoSanguineoEstudiante: grupo,
        grupoSanguineoCorrecto: pacienteActual.grupoCorrecto,
        esGrupoCorrecto: grupo === pacienteActual.grupoCorrecto,
        respuestaTransduccionEstudiante: pregId,
        respuestaTransduccionCorrecta: pacienteActual.respuestaTransduccionCorrecta,
        esTransduccionCorrecta: pregId === pacienteActual.respuestaTransduccionCorrecta
      }
    }));

    alert(`📋 Datos consolidados para el ${pacienteActual.nombre}. Progreso guardado temporalmente para la Bitácora Final.`);
  };

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica BioLab: El copiado y pegado externo está deshabilitado para garantizar el rigor evaluativo individual.");
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-1 font-sans select-none" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      
      <div className="mb-6">
        <div className="text-teal-500 font-bold text-xs tracking-[0.2em] mb-1 uppercase font-mono">Estación 03</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Analizador Inmunomolecular y Simulador de Hemaglutinación</h1>
        <p className="text-slate-400 text-xs md:text-sm">Examine las interacciones antígeno-anticuerpo en la membrana eritrocitaria y resuelva las correlaciones clínicas de transducción celular.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* COLUMNA IZQUIERDA: HISTORIAS CLÍNICAS Y ENTORNO ANÁLITICO */}
        <div className="w-full lg:w-5/12 bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-5 backdrop-blur-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider font-mono">🩺 Banco de Muestras Clínicas</h3>
              <span className="bg-teal-500/10 text-teal-400 text-[9px] font-mono px-2 py-0.5 rounded-full border border-teal-500/20 font-black">4 ESCENARIOS Q1</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {bancoPacientesMundial.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => { setPacienteIdx(idx); limpiarPlatina(); }}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 text-xs ${
                    pacienteIdx === idx 
                      ? 'border-teal-500 bg-teal-950/30 text-white font-bold ring-1 ring-teal-400/20' 
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="truncate block font-bold">{p.nombre.split(' - ')[1]}</span>
                    <span className="text-[9px] text-slate-500 font-mono font-medium">Línea: {p.facultadDestino}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-500 font-bold">HISTORIA CLÍNICA:</span>
                <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-black uppercase tracking-wider text-[8px]">Urgencia Crítica</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed text-justify italic">{pacienteActual.historia}</p>
            </div>

            {/* INFORMACIÓN MOLECULAR OCULTA HASTA APLICAR REACTIVOS */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-3 rounded-xl space-y-1.5">
              <span className="text-[9px] text-teal-500 font-mono font-black uppercase tracking-wider block">Bioquímica del Receptor de Superficie Eritrocitaria:</span>
              <div className="text-[11px] text-slate-400 space-y-1 text-justify">
                <div>• <strong className="text-slate-300">Glicanos de Membrana:</strong> {suerosAplicados.A || suerosAplicados.B ? pacienteActual.antigenosPresentes : <span className="text-slate-600 font-mono italic">[Aplique antisueros para revelar epitopos]</span>}</div>
                <div className="pt-0.5">• <strong className="text-slate-300">Fracción Inmune Sérica:</strong> {suerosAplicados.A || suerosAplicados.B || suerosAplicados.D ? pacienteActual.anticuerposSéricos : <span className="text-slate-600 font-mono italic">[Muestra en incubación]</span>}</div>
              </div>
            </div>
          </div>

          {/* ACCIONES DE REACTIVOS */}
          <div className="space-y-3 border-t border-slate-800/80 pt-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono">🧪 Goteros de Antisueros Monoclonales</h3>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => aplicarSuero('A')} disabled={suerosAplicados.A} className="p-2.5 rounded-lg bg-blue-950/60 border border-blue-800 text-blue-400 text-[10px] font-black uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none shadow-md">Anti-A</button>
              <button onClick={() => aplicarSuero('B')} disabled={suerosAplicados.B} className="p-2.5 rounded-lg bg-yellow-950/40 border border-yellow-800 text-yellow-400 text-[10px] font-black uppercase tracking-wider hover:bg-yellow-500 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none shadow-md">Anti-B</button>
              <button onClick={() => aplicarSuero('D')} disabled={suerosAplicados.D} className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-wider hover:bg-slate-500 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none shadow-md">Anti-D (Rh)</button>
            </div>
            <button onClick={limpiarPlatina} className="w-full py-2 rounded-lg bg-rose-950/10 border border-rose-900/30 text-rose-400 text-[10px] font-mono uppercase font-bold tracking-widest hover:bg-rose-900/20 transition-all">
              Purgar Reactivos y Cambiar Muestra
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: SIMULADOR DE PLATINA E INTERACTIVIDAD MOLECULAR */}
        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative min-h-[450px]">
          
          {!estudianteNombre && (
            <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4 text-center rounded-2xl border border-red-900/20">
              <span className="text-amber-500 text-xs font-black font-mono uppercase tracking-widest animate-pulse">⚠️ CONTROL DE BIOSEGURIDAD RESTRINGIDO</span>
              <p className="text-[11px] text-slate-400 font-medium mt-1.5 max-w-xs leading-tight">Debe inicializar el protocolo de bioseguridad en la Estación 01 para interactuar con los reactivos inmunológicos.</p>
            </div>
          )}

          {/* LÁMINA PORTAOBJETOS INTERACTIVA */}
          <div className="w-full bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 space-y-4 shadow-xl">
            <div className="text-center text-[10px] font-mono text-slate-500 border-b border-slate-800 pb-2 uppercase tracking-widest">
              🔬 Lámina Portaobjetos de Reacción Química e Inmunológica
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              
              {/* POCILLO A */}
              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-3">
                <span className="text-[9px] font-mono text-blue-400 font-black tracking-wider">POCILLO ANTI-A</span>
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center transition-all duration-500 relative overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.A ? (pacienteActual.reacciones.AntiA ? '#450a0a' : '#7f1d1d') : '#0f172a' }}>
                  {suerosAplicados.A && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-1 text-center font-mono animate-fade-in">
                      {pacienteActual.reacciones.AntiA ? (
                        <>
                          <span className="text-red-400 text-xs font-black">🔬 (++)</span>
                          <span className="text-[8px] font-black text-red-200 uppercase leading-none mt-0.5">Aglutinación<br/>Densa</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-400 text-xs font-black">⚠️ (-)</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase leading-none mt-0.5">Mezcla<br/>Homogénea</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* POCILLO B */}
              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-3">
                <span className="text-[9px] font-mono text-yellow-500 font-black tracking-wider">POCILLO ANTI-B</span>
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center transition-all duration-500 relative overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.B ? (pacienteActual.reacciones.AntiB ? '#450a0a' : '#7f1d1d') : '#0f172a' }}>
                  {suerosAplicados.B && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-1 text-center font-mono">
                      {pacienteActual.reacciones.AntiB ? (
                        <>
                          <span className="text-red-400 text-xs font-black">🔬 (++)</span>
                          <span className="text-[8px] font-black text-red-200 uppercase leading-none mt-0.5">Aglutinación<br/>Densa</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-400 text-xs font-black">⚠️ (-)</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase leading-none mt-0.5">Mezcla<br/>Homogénea</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* POCILLO D */}
              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-3">
                <span className="text-[9px] font-mono text-slate-400 font-black tracking-wider">POCILLO ANTI-D</span>
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center transition-all duration-500 relative overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.D ? (pacienteActual.reacciones.AntiD ? '#450a0a' : '#7f1d1d') : '#0f172a' }}>
                  {suerosAplicados.D && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-1 text-center font-mono">
                      {pacienteActual.reacciones.AntiD ? (
                        <>
                          <span className="text-red-400 text-xs font-black">🔬 (++)</span>
                          <span className="text-[8px] font-black text-red-200 uppercase leading-none mt-0.5">Aglutinación<br/>Densa</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-400 text-xs font-black">⚠️ (-)</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase leading-none mt-0.5">Mezcla<br/>Homogénea</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* FORMULARIO DE RAZONAMIENTO CIENTÍFICO Y TRANSDUCCIÓN MOLECULAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            
            {/* SINOPSIS DIAGNÓSTICA DEL FENOTIPO */}
            <div className="bg-slate-900/50 border border-slate-800/80 p-3 rounded-xl flex flex-col justify-between gap-2">
              <div>
                <span className="text-[9px] text-amber-500 font-mono font-black uppercase tracking-wider block">1. Diagnóstico de Inmunocompatibilidad:</span>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5 text-justify">Con base en los patrones de aglutinación observados en la lámina, determine el fenotipo correcto:</p>
              </div>
              <select 
                value={diagnosticoGrupo} 
                onChange={(e) => setDiagnosticoGrupo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-teal-500 font-mono font-bold"
              >
                <option value="">Seleccione el grupo...</option>
                <option value="A+">Grupo Sanguíneo A Positivo (A+)</option>
                <option value="A-">Grupo Sanguíneo A Negativo (A-)</option>
                <option value="B+">Grupo Sanguíneo B Positivo (B+)</option>
                <option value="B-">Grupo Sanguíneo B Negativo (B-)</option>
                <option value="AB+">Grupo Sanguíneo AB Positivo (AB+)</option>
                <option value="AB-">Grupo Sanguíneo AB Negativo (AB-)</option>
                <option value="O+">Grupo Sanguíneo O Positivo (O+)</option>
                <option value="O-">Grupo Sanguíneo O Negativo (O-)</option>
              </select>
            </div>

            {/* DESAFÍO BIOMÉDICO MOLECULAR */}
            <div className="bg-slate-900/50 border border-slate-800/80 p-3 rounded-xl flex flex-col justify-between gap-2">
              <div>
                <span className="text-[9px] text-cyan-500 font-mono font-black uppercase tracking-wider block">2. Desafío de Transducción Celular ({pacienteActual.facultadDestino}):</span>
                <p className="text-[11px] text-slate-300 font-semibold leading-tight text-justify line-clamp-2">{pacienteActual.preguntaTransduccion}</p>
              </div>
              <select
                value={respuestaTransduccion}
                onChange={(e) => setRespuestaTransduccion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-teal-500"
              >
                <option value="">Seleccione el mecanismo...</option>
                {pacienteActual.opcionesTransduccion.map(o => (
                  <option key={o.id} value={o.id}>{o.id}) {o.texto.slice(0, 55)}...</option>
                ))}
              </select>
            </div>

          </div>

          {/* BOTÓN DE CONSOLIDACIÓN HACIA ESQUEMA UNIFICADO */}
          <button
            onClick={() => registrarResultadosEstacion(diagnosticoGrupo, respuestaTransduccion)}
            className="w-full mt-4 p-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-teal-950/20"
          >
            Consolidar Paciente e Inyectar en Bitácora Final
          </button>

        </div>
      </div>
    </div>
  );
}
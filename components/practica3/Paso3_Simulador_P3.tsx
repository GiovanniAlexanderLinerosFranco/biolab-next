/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.5.2
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * IMMUNOHEMATOLOGY MOLECULAR ENGINE: CORRECCIÓN DE KEY MATCHING EN OPCIONES
 * ============================================================================
 */

"use client";
import React, { useState } from 'react';

interface DetalleAglutinacion {
  grupoSanguineoEstudiante: string;
  grupoSanguineoCorrecto: string;
  esGrupoCorrecto: boolean;
  respuestaTransduccionEstudiante: string;
  respuestaTransduccionCorrecta: string;
  esTransduccionCorrecta: boolean;
}

interface Paso3Props {
  estudianteNombre: string;
  respuestasAglutinacion: Record<string, DetalleAglutinacion>;
  setRespuestasAglutinacion: React.Dispatch<React.SetStateAction<Record<string, DetalleAglutinacion>>>;
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
  opcionesTransduccion: { id: string; texto: string }[]; // <-- Nombre unificado estricto
  respuestaTransduccionCorrecta: string;
}

const bancoPacientesMundial: PacienteClinico[] = [
  {
    id: 'P1',
    nombre: 'Caso 01 - Carlos Mendoza (Maxilofacial)',
    facultadDestino: 'Odontología',
    historia: 'Paciente que ingresa programado para cirugía reconstructiva ortognática por asimetría maxilofacial. Se solicita tipificación inmunoquímica pre-quirúrgica obligatoria para prevenir shock hemolítico transoperatorio.',
    antigenosPresentes: 'N-acetilgalactosamina unida a la sustancia H (Antígeno H) para el grupo A y factor Rh reactivo por antígeno D.',
    anticuerposSéricos: 'Presencia de anticuerpos Anti-B naturales en el plasma sanguíneo.',
    reacciones: { AntiA: true, AntiB: false, AntiD: true },
    grupoCorrecto: 'A+',
    preguntaTransduccion: 'Al evaluar una muestra clínica de encía sana bajo el microscopio, observa múltiples hileras de células que se aplanan gradualmente hacia la capa más externa. ¿Qué característica anatómica describe este orden?',
    opcionesTransduccion: [
      { id: 'A', texto: 'Epitelio simple cúbico especializado en filtración selectiva.' },
      { id: 'B', texto: 'Epitelio estratificado plano, estructurado para resistir abrasión mecánica e invasión patógena.' },
      { id: 'C', texto: 'Tejido conectivo laxo con alta tasa de síntesis de colágeno.' }
    ],
    respuestaTransduccionCorrecta: 'B'
  },
  {
    id: 'P2',
    nombre: 'Caso 02 - Muestra de Soporte Tisular',
    facultadDestino: 'Odontología',
    historia: 'Durante el análisis del soporte dental, identifica células alargadas rodeadas por una densa malla rosada desorganizada de fibras colágenas.',
    antigenosPresentes: 'Ausencia de antígenos terminales A y B en la sustancia H basal de la membrana eritrocitaria.',
    anticuerposSéricos: 'Presencia de anticuerpos Anti-A y Anti-B en el suero.',
    reacciones: { AntiA: false, AntiB: false, AntiD: false },
    grupoCorrecto: 'O-',
    preguntaTransduccion: 'Durante el análisis del soporte dental, identifica células alargadas rodeadas por una densa malla rosada desorganizada de fibras. ¿Cómo clasifica este escenario tisular?',
    opcionesTransduccion: [
      { id: 'A', texto: 'Tejido epitelial de revestimiento glandular secretor.' },
      { id: 'B', texto: 'Tejido conectivo denso irregular, encargado de proporcionar soporte estructural y fijación.' },
      { id: 'C', texto: 'Fibras nerviosas mielinizadas de conducción aferente.' }
    ],
    respuestaTransduccionCorrecta: 'B'
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

  const registrarMuestraActual = () => {
    if (!diagnosticoGrupo || !respuestaTransduccion) {
      alert("Debe seleccionar un fenotipo de grupo sanguíneo y resolver el desafío molecular.");
      return;
    }

    setRespuestasAglutinacion((prev: Record<string, DetalleAglutinacion>) => ({
      ...prev,
      [pacienteActual.id]: {
        grupoSanguineoEstudiante: diagnosticoGrupo,
        grupoSanguineoCorrecto: pacienteActual.grupoCorrecto,
        esGrupoCorrecto: diagnosticoGrupo === pacienteActual.grupoCorrecto,
        respuestaTransduccionEstudiante: respuestaTransduccion,
        respuestaTransduccionCorrecta: pacienteActual.respuestaTransduccionCorrecta,
        esTransduccionCorrecta: respuestaTransduccion === pacienteActual.respuestaTransduccionCorrecta
      }
    }));

    alert(`📋 Datos consolidados para el ${pacienteActual.nombre}. Progreso guardado temporalmente.`);
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
        <div className="w-full lg:w-5/12 bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-5 backdrop-blur-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider font-mono">🩺 Banco de Muestras Clínicas</h3>
              <span className="bg-teal-500/10 text-teal-400 text-[9px] font-mono px-2 py-0.5 rounded-full border border-teal-500/20 font-black">PACIENTES DISPONIBLES</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {bancoPacientesMundial.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => { setPacienteIdx(idx); limpiarPlatina(); }}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 text-xs ${pacienteIdx === idx ? 'border-teal-500 bg-teal-950/30 text-white font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'}`}
                >
                  <span className="truncate block font-bold">{p.nombre.split(' - ')[1]}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl space-y-2">
              <p className="text-xs text-slate-300 leading-relaxed italic">{pacienteActual.historia}</p>
            </div>

            <div className="bg-slate-950/30 border border-slate-800/80 p-3 rounded-xl space-y-1.5">
              <span className="text-[9px] text-teal-500 font-mono font-black uppercase tracking-wider block">Bioquímica del Receptor de Superficie Eritrocitaria:</span>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• <strong>Glicanos de Membrana:</strong> {suerosAplicados.A || suerosAplicados.B ? pacienteActual.antigenosPresentes : '[Aplique reactivos]'}</div>
                <div>• <strong>Fracción Inmune Sérica:</strong> {suerosAplicados.A || suerosAplicados.B || suerosAplicados.D ? pacienteActual.anticuerposSéricos : '[Muestra en incubación]'}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-800/80 pt-4">
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => aplicarSuero('A')} disabled={suerosAplicados.A} className="p-2.5 rounded-lg bg-blue-950/60 border border-blue-800 text-blue-400 text-[10px] font-black uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all">Anti-A</button>
              <button type="button" onClick={() => aplicarSuero('B')} disabled={suerosAplicados.B} className="p-2.5 rounded-lg bg-yellow-950/40 border border-yellow-800 text-yellow-400 text-[10px] font-black uppercase tracking-wider hover:bg-yellow-500 hover:text-white transition-all">Anti-B</button>
              <button type="button" onClick={() => aplicarSuero('D')} disabled={suerosAplicados.D} className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-wider hover:bg-slate-500 hover:text-white transition-all">Anti-D</button>
            </div>
            <button type="button" onClick={limpiarPlatina} className="w-full py-2 rounded-lg bg-rose-950/10 border border-rose-900/30 text-rose-400 text-[10px] font-mono uppercase font-bold tracking-widest hover:bg-rose-900/20">Purgar Reactivos</button>
          </div>
        </div>

        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative min-h-[450px]">
          {!estudianteNombre && (
            <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4 text-center rounded-2xl">
              <span className="text-amber-500 text-xs font-black font-mono tracking-widest animate-pulse">⚠️ CONTROL DE BIOSEGURIDAD RESTRINGIDO</span>
            </div>
          )}

          <div className="w-full bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 space-y-4 shadow-xl">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-3">
                <span className="text-[9px] font-mono text-blue-400 font-black">POCILLO ANTI-A</span>
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center transition-all duration-500 overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.A ? (pacienteActual.reacciones.AntiA ? '#450a0a' : '#7f1d1d') : '#0f172a' }}>
                  {suerosAplicados.A && <span className="text-[8px] font-black text-white font-mono">{pacienteActual.reacciones.AntiA ? "AGLUTINA (++)" : "HOMOGÉNEO (-)"}</span>}
                </div>
              </div>

              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-3">
                <span className="text-[9px] font-mono text-yellow-500 font-black">POCILLO ANTI-B</span>
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center transition-all duration-500 overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.B ? (pacienteActual.reacciones.AntiB ? '#450a0a' : '#7f1d1d') : '#0f172a' }}>
                  {suerosAplicados.B && <span className="text-[8px] font-black text-white font-mono">{pacienteActual.reacciones.AntiB ? "AGLUTINA (++)" : "HOMOGÉNEO (-)"}</span>}
                </div>
              </div>

              <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-3">
                <span className="text-[9px] font-mono text-slate-400 font-black">POCILLO ANTI-D</span>
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center transition-all duration-500 overflow-hidden"
                     style={{ backgroundColor: suerosAplicados.D ? (pacienteActual.reacciones.AntiD ? '#450a0a' : '#7f1d1d') : '#0f172a' }}>
                  {suerosAplicados.D && <span className="text-[8px] font-black text-white font-mono">{pacienteActual.reacciones.AntiD ? "AGLUTINA (++)" : "HOMOGÉNEO (-)"}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-900/50 border border-slate-800/80 p-3 rounded-xl flex flex-col justify-between gap-2">
              <select value={diagnosticoGrupo} onChange={(e) => setDiagnosticoGrupo(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono">
                <option value="">Seleccione el grupo...</option>
                <option value="A+">Grupo A+ (A Positivo)</option>
                <option value="O-">Grupo O- (O Negativo)</option>
              </select>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 p-3 rounded-xl flex flex-col justify-between gap-2">
              <p className="text-[11px] text-slate-300 font-semibold line-clamp-2">{pacienteActual.preguntaTransduccion}</p>
              <select value={respuestaTransduccion} onChange={(e) => setRespuestaTransduccion(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">
                <option value="">Seleccione el mecanismo...</option>
                {pacienteActual.opcionesTransduccion.map(o => (
                  <option key={o.id} value={o.id}>{o.id}) {o.texto.slice(0, 50)}...</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-2 w-full">
            <div className="text-[10px] font-mono text-slate-500 truncate flex-1 flex items-center">Muestra actual registrada: {respuestasAglutinacion[pacienteActual.id] ? '✓ CONSOLIDADO' : '❌ PENDIENTE'}</div>
            <button type="button" onClick={registrarMuestraActual} className="p-3 rounded-xl bg-indigo-600 text-white font-mono text-xs font-black uppercase tracking-widest">Consolidar Muestra</button>
          </div>
        </div>
      </div>
    </div>
  );
}
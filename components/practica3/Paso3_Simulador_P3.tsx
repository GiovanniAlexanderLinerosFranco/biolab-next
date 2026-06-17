"use client";
import React, { useState } from 'react';

interface Paso3Props {
  estudianteNombre: string;
}

interface Paciente {
  id: string;
  nombre: string;
  historia: string;
  reacciones: { AntiA: boolean; AntiB: boolean; AntiD: boolean };
}

const pacientesBco: Paciente[] = [
  {
    id: 'P1',
    nombre: 'Paciente 01 - Carlos Mendoza',
    historia: 'Ingresa por urgencias odontológicas requiriendo cirugía maxilofacial compleja. Se solicita tipificación obligatoria de compatibilidad pre-quirúrgica.',
    reacciones: { AntiA: true, AntiB: false, AntiD: true } // Grupo A+
  },
  {
    id: 'P2',
    nombre: 'Paciente 02 - Elena Rostova',
    historia: 'Paciente en control optométrico avanzado que refiere antecedentes de anemia hemolítica. Requiere caracterizar fenotipos de receptores celulares de membrana.',
    reacciones: { AntiA: false, AntiB: true, AntiD: false } // Grupo B-
  }
];

export default function Paso3_Simulador_P3({ estudianteNombre }: Paso3Props) {
  const [pacienteIdx, setPacienteIdx] = useState(0);
  const [suerosAplicados, setSuerosAplicados] = useState({ A: false, B: false, D: false });

  const pacienteActual = pacientesBco[pacienteIdx];

  const aplicarSuero = (tipo: 'A' | 'B' | 'D') => {
    setSuerosAplicados(prev => ({ ...prev, [tipo]: true }));
  };

  const limpiarPlatina = () => {
    setSuerosAplicados({ A: false, B: false, D: false });
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-2">
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-1 uppercase">Estación 03</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Simulador Virtual de Inmunohematología y Aglutinación</h1>
        <p className="text-slate-400 text-xs md:text-sm">Analice la interacción antígeno-anticuerpo aplicando antisueros específicos sobre la membrana eritrocitaria de los pacientes.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* COLUMNA IZQUIERDA: CONTROL DE PACIENTES Y SUEROS */}
        <div className="w-full lg:w-1/3 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-5 backdrop-blur-md">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Banco de Sangre / Historias Clínicas</h3>
            <div className="flex flex-col gap-2">
              {pacientesBco.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => { setPacienteIdx(idx); limpiarPlatina(); }}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    pacienteIdx === idx ? 'border-cyan-500 bg-cyan-950/20 text-white font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {p.nombre}
                </button>
              ))}
            </div>

            <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-300 leading-relaxed italic">
              <strong>Caso de Estudio:</strong> {pacienteActual.historia}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-1">Goteros de Reactivos (Antisueros)</h3>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => aplicarSuero('A')} disabled={suerosAplicados.A} className="p-2.5 rounded-lg bg-blue-900/40 border border-blue-700/50 text-blue-200 text-[10px] font-black uppercase tracking-wider hover:bg-blue-800/50 disabled:opacity-30">Anti-A</button>
              <button onClick={() => aplicarSuero('B')} disabled={suerosAplicados.B} className="p-2.5 rounded-lg bg-yellow-900/30 border border-yellow-700/40 text-yellow-200 text-[10px] font-black uppercase tracking-wider hover:bg-yellow-800/40 disabled:opacity-30">Anti-B</button>
              <button onClick={() => aplicarSuero('D')} disabled={suerosAplicados.D} className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-[10px] font-black uppercase tracking-wider hover:bg-slate-700 disabled:opacity-30">Anti-D (Rh)</button>
            </div>
            <button onClick={limpiarPlatina} className="w-full py-2 rounded-lg bg-rose-950/20 border border-rose-900/40 text-rose-400 text-[10px] font-mono uppercase font-bold tracking-widest hover:bg-rose-900/30 transition-all">
              Limpiar Platina de Tipificación
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: PLATINA DE OBSERVACIÓN MOLECULAR */}
        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[350px] lg:min-h-[420px]">
          
          <div className="absolute top-4 left-4 right-4 bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-[11px] text-slate-400 leading-tight text-center">
            💡 <strong className="text-cyan-400">Guía Autónoma:</strong> Aplique los tres reactivos comerciales. Si el antisuero encuentra su receptor específico en la membrana, observará grumos densos corporales (<span className="text-teal-400 font-bold">Aglutinación</span>). Si no, la mezcla será homogénea.
          </div>

          {!estudianteNombre && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-amber-400 text-xs font-bold uppercase">⚠️ Control de Bioseguridad Restringido</span>
              <p className="text-[11px] text-slate-500 mt-1">Habilite el protocolo de protección inmunológica en la Estación 01.</p>
            </div>
          )}

          {/* LÁMINA PORTAOBJETOS DE TIPIFICACIÓN VIRTUAL */}
          <div className="w-full max-w-xl bg-slate-900 border-2 border-slate-800 rounded-2xl p-5 grid grid-cols-3 gap-4 shadow-2xl mt-12">
            
            {/* POCILLO ANTI-A */}
            <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-blue-400 font-bold">ZONA ANTI-A</span>
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center transition-all duration-300"
                   style={{ backgroundColor: suerosAplicados.A ? (pacienteActual.reacciones.AntiA ? '#991b1b' : '#ef4444') : '#1e293b' }}>
                {suerosAplicados.A && (
                  <span className="text-[9px] font-black text-white text-center font-mono leading-none">
                    {pacienteActual.reacciones.AntiA ? "AGLUTINA\n(++)" : "HOMOGÉNEO\n(-)"}
                  </span>
                )}
              </div>
            </div>

            {/* POCILLO ANTI-B */}
            <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-yellow-400 font-bold">ZONA ANTI-B</span>
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center transition-all duration-300"
                   style={{ backgroundColor: suerosAplicados.B ? (pacienteActual.reacciones.AntiB ? '#991b1b' : '#ef4444') : '#1e293b' }}>
                {suerosAplicados.B && (
                  <span className="text-[9px] font-black text-white text-center font-mono leading-none">
                    {pacienteActual.reacciones.AntiB ? "AGLUTINA\n(++)" : "HOMOGÉNEO\n(-)"}
                  </span>
                )}
              </div>
            </div>

            {/* POCILLO ANTI-D (Rh) */}
            <div className="bg-black/40 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 font-bold">ZONA ANTI-D</span>
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center transition-all duration-300"
                   style={{ backgroundColor: suerosAplicados.D ? (pacienteActual.reacciones.AntiD ? '#991b1b' : '#ef4444') : '#1e293b' }}>
                {suerosAplicados.D && (
                  <span className="text-[9px] font-black text-white text-center font-mono leading-none">
                    {pacienteActual.reacciones.AntiD ? "AGLUTINA\n(++)" : "HOMOGÉNEO\n(-)"}
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
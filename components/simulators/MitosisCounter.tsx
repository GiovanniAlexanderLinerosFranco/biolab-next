"use client";

import { useMemo, useState } from 'react';

type Phase = 'interfase' | 'profase' | 'metafase' | 'anafase' | 'telofase';
type FieldId = 'field1' | 'field2' | 'field3';

type CellSpec = {
  id: string;
  phase: Phase;
};

const fields: Record<FieldId, CellSpec[]> = {
  field1: [
    { id: 'f1-1', phase: 'interfase' },
    { id: 'f1-2', phase: 'interfase' },
    { id: 'f1-3', phase: 'profase' },
    { id: 'f1-4', phase: 'interfase' },
    { id: 'f1-5', phase: 'metafase' },
    { id: 'f1-6', phase: 'interfase' },
    { id: 'f1-7', phase: 'anafase' },
    { id: 'f1-8', phase: 'interfase' },
    { id: 'f1-9', phase: 'telofase' },
    { id: 'f1-10', phase: 'interfase' },
    { id: 'f1-11', phase: 'interfase' },
    { id: 'f1-12', phase: 'profase' },
  ],
  field2: [
    { id: 'f2-1', phase: 'interfase' },
    { id: 'f2-2', phase: 'profase' },
    { id: 'f2-3', phase: 'profase' },
    { id: 'f2-4', phase: 'metafase' },
    { id: 'f2-5', phase: 'interfase' },
    { id: 'f2-6', phase: 'anafase' },
    { id: 'f2-7', phase: 'interfase' },
    { id: 'f2-8', phase: 'telofase' },
    { id: 'f2-9', phase: 'interfase' },
    { id: 'f2-10', phase: 'profase' },
    { id: 'f2-11', phase: 'interfase' },
    { id: 'f2-12', phase: 'interfase' },
  ],
  field3: [
    { id: 'f3-1', phase: 'interfase' },
    { id: 'f3-2', phase: 'interfase' },
    { id: 'f3-3', phase: 'interfase' },
    { id: 'f3-4', phase: 'interfase' },
    { id: 'f3-5', phase: 'profase' },
    { id: 'f3-6', phase: 'metafase' },
    { id: 'f3-7', phase: 'anafase' },
    { id: 'f3-8', phase: 'telofase' },
    { id: 'f3-9', phase: 'interfase' },
    { id: 'f3-10', phase: 'interfase' },
    { id: 'f3-11', phase: 'profase' },
    { id: 'f3-12', phase: 'interfase' },
  ],
};

const phaseLabel: Record<Phase, string> = {
  interfase: 'Interfase',
  profase: 'Profase',
  metafase: 'Metafase',
  anafase: 'Anafase',
  telofase: 'Telofase',
};

const phaseAccent: Record<Phase, string> = {
  interfase: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
  profase: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  metafase: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  anafase: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  telofase: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
};

function getInterpretation(index: number) {
  if (index >= 35) {
    return 'Indice mitotico alto: el tejido sugiere proliferacion activa y recambio elevado.';
  }

  if (index >= 20) {
    return 'Indice mitotico intermedio: existe actividad proliferativa relevante, pero no dominante.';
  }

  return 'Indice mitotico bajo: predominan celulas en interfase y un tejido relativamente estable.';
}

function getCellVisualPhase(cell: CellSpec) {
  switch (cell.phase) {
    case 'profase':
      return <div className="h-7 w-7 rounded-full border-2 border-cyan-300/80 bg-cyan-300/15 shadow-[0_0_12px_rgba(34,211,238,0.3)]" />;
    case 'metafase':
      return <div className="h-7 w-7 rounded-full bg-amber-200/10 relative"><div className="absolute left-1/2 top-1/2 h-1 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300" /></div>;
    case 'anafase':
      return <div className="relative h-7 w-7"><div className="absolute left-0 top-1/2 h-2 w-3 -translate-y-1/2 rounded-full bg-rose-300" /><div className="absolute right-0 top-1/2 h-2 w-3 -translate-y-1/2 rounded-full bg-rose-300" /></div>;
    case 'telofase':
      return <div className="relative h-7 w-7"><div className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-emerald-300/70" /><div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-emerald-300/70" /></div>;
    default:
      return <div className="h-7 w-7 rounded-full bg-slate-300/20 border border-slate-300/20" />;
  }
}

export default function MitosisCounter() {
  const [selectedField, setSelectedField] = useState<FieldId>('field1');
  const [activePhase, setActivePhase] = useState<Phase>('interfase');
  const [answers, setAnswers] = useState<Record<string, Phase | undefined>>({});

  const cells = fields[selectedField];

  const summary = useMemo(() => {
    const counts: Record<Phase, number> = {
      interfase: 0,
      profase: 0,
      metafase: 0,
      anafase: 0,
      telofase: 0,
    };

    cells.forEach((cell) => {
      const answer = answers[cell.id];
      if (answer) {
        counts[answer] += 1;
      }
    });

    const totalClassified = Object.values(counts).reduce((sum, value) => sum + value, 0);
    const mitosisCount = counts.profase + counts.metafase + counts.anafase + counts.telofase;
    const mitoticIndex = totalClassified === 0 ? 0 : (mitosisCount / totalClassified) * 100;

    const predominantPhase = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

    return {
      counts,
      totalClassified,
      mitosisCount,
      mitoticIndex,
      predominantPhase: predominantPhase && predominantPhase[1] > 0 ? phaseLabel[predominantPhase[0] as Phase] : 'Sin clasificar',
      interpretation: totalClassified === 0 ? 'Esperando clasificacion de celulas.' : getInterpretation(Number(mitoticIndex.toFixed(1))),
    };
  }, [answers, cells]);

  function resetCurrentField() {
    const updatedAnswers = { ...answers };
    cells.forEach((cell) => {
      delete updatedAnswers[cell.id];
    });
    setAnswers(updatedAnswers);
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-[0_0_60px_rgba(2,6,23,0.7)]">
      <div className="grid gap-0 xl:grid-cols-[320px_1fr_320px]">
        <aside className="border-r border-slate-800 bg-slate-950/70 p-6 space-y-6">
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Configuración del análisis</h4>
            <label className="block text-sm text-slate-300 mb-2" htmlFor="mitosisFieldSelect">Campo de observación</label>
            <select id="mitosisFieldSelect" value={selectedField} onChange={(e) => setSelectedField(e.target.value as FieldId)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-cyan-300 outline-none">
              <option value="field1">Campo 1</option>
              <option value="field2">Campo 2</option>
              <option value="field3">Campo 3</option>
            </select>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Fase activa</h4>
            <div className="space-y-2">
              {(Object.keys(phaseLabel) as Phase[]).map((phase) => (
                <button key={phase} onClick={() => setActivePhase(phase)} className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${activePhase === phase ? phaseAccent[phase] : 'border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800'}`}>
                  {phaseLabel[phase]}
                </button>
              ))}
            </div>
          </div>

          <button onClick={resetCurrentField} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-slate-800">
            Reiniciar campo actual
          </button>
        </aside>

        <section className="bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_100%)] p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Campo microscópico</p>
              <h4 className="mt-2 text-xl font-black text-white">Contador virtual de mitosis</h4>
            </div>
            <span className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] ${phaseAccent[activePhase]}`}>
              Fase activa: {phaseLabel[activePhase]}
            </span>
          </div>

          <p className="mb-6 text-sm leading-7 text-slate-400">Haz clic sobre cada célula para clasificarla. La cámara combina morfología simplificada y conteo automático para calcular el índice mitótico del campo.</p>

          <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
            {cells.map((cell) => {
              const selectedAnswer = answers[cell.id];
              const isCorrect = selectedAnswer === cell.phase;
              const answered = Boolean(selectedAnswer);

              return (
                <button
                  key={cell.id}
                  onClick={() => setAnswers((current) => ({ ...current, [cell.id]: activePhase }))}
                  className={`flex h-24 items-center justify-center rounded-2xl border transition ${answered ? (isCorrect ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-amber-500/40 bg-amber-500/10') : 'border-slate-800 bg-slate-950/70 hover:bg-slate-900'}`}
                  title={`Clasificar ${cell.id}`}
                >
                  {getCellVisualPhase(cell)}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="border-l border-slate-800 bg-slate-950/70 p-6 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Resultado del análisis</h4>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2 text-sm text-slate-300">
            <p><strong>Total de células:</strong> {cells.length}</p>
            <p><strong>Células en interfase:</strong> {summary.counts.interfase}</p>
            <p><strong>Células en mitosis:</strong> {summary.mitosisCount}</p>
            <p><strong>Profase:</strong> {summary.counts.profase}</p>
            <p><strong>Metafase:</strong> {summary.counts.metafase}</p>
            <p><strong>Anafase:</strong> {summary.counts.anafase}</p>
            <p><strong>Telofase:</strong> {summary.counts.telofase}</p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-slate-200">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Índice mitótico</p>
            <p className="mt-2 text-3xl font-black text-white">{summary.mitoticIndex.toFixed(1)}%</p>
            <p className="mt-2 text-sm text-slate-300">Fase predominante: {summary.predominantPhase}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Interpretación</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{summary.interpretation}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
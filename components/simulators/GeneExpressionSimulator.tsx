"use client";

import { useMemo, useState } from 'react';

type ScenarioKey = 'referencia' | 'silenciosa' | 'missense' | 'nonsense';

type Scenario = {
  dna: string[];
  mrna: string[];
  protein: string[];
  outcome: string;
  phenotype: string;
};

const scenarios: Record<ScenarioKey, Scenario> = {
  referencia: {
    dna: ['TAC', 'GAA', 'CTT', 'ACT'],
    mrna: ['AUG', 'CUU', 'GAA', 'UGA'],
    protein: ['Met', 'Leu', 'Glu', 'Stop'],
    outcome: 'Traducción completa y proteína funcional.',
    phenotype: 'Rasgo conservado; no se anticipa alteración funcional relevante.',
  },
  silenciosa: {
    dna: ['TAC', 'GAG', 'CTT', 'ACT'],
    mrna: ['AUG', 'CUC', 'GAA', 'UGA'],
    protein: ['Met', 'Leu', 'Glu', 'Stop'],
    outcome: 'Cambio de codón sin cambio de aminoácido.',
    phenotype: 'Fenotipo probablemente conservado pese a la variación en la secuencia.',
  },
  missense: {
    dna: ['TAC', 'GTA', 'CTT', 'ACT'],
    mrna: ['AUG', 'CAU', 'GAA', 'UGA'],
    protein: ['Met', 'His', 'Glu', 'Stop'],
    outcome: 'Se incorpora un aminoácido distinto y cambia la proteína resultante.',
    phenotype: 'Posible alteración funcional moderada por sustitución aminoacídica.',
  },
  nonsense: {
    dna: ['TAC', 'ATT', 'CTT', 'ACT'],
    mrna: ['AUG', 'UAA', 'GAA', 'UGA'],
    protein: ['Met', 'Stop'],
    outcome: 'Aparece un codón de paro prematuro y la proteína queda truncada.',
    phenotype: 'Alta probabilidad de pérdida funcional y cambio fenotípico significativo.',
  },
};

const scenarioLabels: Record<ScenarioKey, string> = {
  referencia: 'Secuencia de referencia',
  silenciosa: 'Mutación silenciosa',
  missense: 'Mutación missense',
  nonsense: 'Mutación nonsense',
};

export default function GeneExpressionSimulator() {
  const [scenario, setScenario] = useState<ScenarioKey>('referencia');
  const current = scenarios[scenario];

  const analysis = useMemo(() => {
    const isReference = scenario === 'referencia';
    const severity = scenario === 'nonsense' ? 'Alta' : scenario === 'missense' ? 'Media' : scenario === 'silenciosa' ? 'Baja' : 'Basal';
    const translationStatus = current.protein.includes('Stop') && current.protein.length < 4 ? 'Interrumpida' : 'Completa';

    return {
      severity,
      translationStatus,
      interpretation: isReference
        ? 'El flujo ADN → ARN → proteína ocurre sin alteraciones detectables en la función final.'
        : `La variación seleccionada modifica el flujo informacional con impacto ${severity.toLowerCase()} sobre la proteína.`
    };
  }, [current.protein, scenario]);

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-[0_0_60px_rgba(2,6,23,0.7)]">
      <div className="grid gap-0 xl:grid-cols-[320px_1fr_320px]">
        <aside className="border-r border-slate-800 bg-slate-950/70 p-6 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Escenario molecular</h4>
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setScenario(key)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                scenario === key
                  ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {scenarioLabels[key]}
            </button>
          ))}
        </aside>

        <section className="bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_100%)] p-6 space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Flujo informacional</p>
            <h4 className="mt-2 text-xl font-black text-white">Simulador de expresión génica</h4>
            <p className="mt-3 text-sm leading-7 text-slate-400">Compara una secuencia de referencia con variantes puntuales y observa cómo cambia el ARN mensajero, la proteína y la consecuencia funcional inferida.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">ADN molde</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.dna.map((codon) => (
                  <span key={codon} className="rounded-lg border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-sm font-black text-violet-300">{codon}</span>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">ARN mensajero</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.mrna.map((codon) => (
                  <span key={codon} className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm font-black text-cyan-300">{codon}</span>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Proteína</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.protein.map((amino) => (
                  <span key={amino} className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-black text-emerald-300">{amino}</span>
                ))}
              </div>
            </article>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Resultado molecular</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{current.outcome}</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Fenotipo inferido</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{current.phenotype}</p>
            </article>
          </div>
        </section>

        <aside className="border-l border-slate-800 bg-slate-950/70 p-6 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Lectura final</h4>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-slate-200">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Estado de traducción</p>
            <p className="mt-2 text-2xl font-black text-white">{analysis.translationStatus}</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-slate-200">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-300">Severidad esperada</p>
            <p className="mt-2 text-2xl font-black text-white">{analysis.severity}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Interpretación</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{analysis.interpretation}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
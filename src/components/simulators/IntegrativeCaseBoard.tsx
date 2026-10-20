"use client";

import { useMemo, useState } from 'react';

type EvidenceKey = 'celular' | 'tisular' | 'membrana' | 'mitosis' | 'adn' | 'expresion';

const evidenceCards: Record<EvidenceKey, { title: string; summary: string; inference: string }> = {
  celular: {
    title: 'Microambiente celular',
    summary: 'Se observan cambios osmóticos con retracción celular en un medio hipertónico sostenido.',
    inference: 'Existe estrés de membrana y alteración del equilibrio hídrico.',
  },
  tisular: {
    title: 'Lectura tisular',
    summary: 'El tejido muestra desorganización focal con predominio de áreas epiteliales lesionadas.',
    inference: 'La alteración morfológica trasciende la célula aislada y afecta función de barrera.',
  },
  membrana: {
    title: 'Reconocimiento de membrana',
    summary: 'Los marcadores de superficie conservan identidad, pero hay un patrón de incompatibilidad en la muestra relacionada.',
    inference: 'El problema no es solo estructural; también compromete reconocimiento biológico.',
  },
  mitosis: {
    title: 'Índice mitótico',
    summary: 'El campo presenta un índice mitótico intermedio-alto con predominio de profase.',
    inference: 'El tejido intenta recambio o respuesta proliferativa frente a daño o estrés.',
  },
  adn: {
    title: 'Extracción de ADN',
    summary: 'La muestra ofrece precipitación moderada de ADN, compatible con material recuperable para análisis posterior.',
    inference: 'Hay base suficiente para estudiar la dimensión molecular del caso.',
  },
  expresion: {
    title: 'Expresión génica',
    summary: 'Se identifica una variante missense con impacto funcional moderado en la proteína final.',
    inference: 'La alteración molecular puede explicar parte del fenotipo observado, pero no actúa aislada.',
  },
};

const hypothesisMap = {
  osmotica: {
    label: 'Hipótesis osmótica dominante',
    match: ['celular', 'membrana'],
    verdict: 'La evidencia apoya un fenómeno inicial de desbalance osmótico que desencadena cambios celulares y funcionales.',
  },
  proliferativa: {
    label: 'Hipótesis proliferativa compensatoria',
    match: ['tisular', 'mitosis'],
    verdict: 'La evidencia sugiere respuesta tisular de reparación o recambio frente a un evento lesivo previo.',
  },
  molecular: {
    label: 'Hipótesis molecular integrada',
    match: ['adn', 'expresion'],
    verdict: 'La evidencia respalda que una variación molecular contribuye al cuadro, modulando la función proteica y el rasgo final.',
  },
};

type HypothesisKey = keyof typeof hypothesisMap;

export default function IntegrativeCaseBoard() {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceKey[]>([]);
  const [selectedHypothesis, setSelectedHypothesis] = useState<HypothesisKey>('osmotica');

  const analysis = useMemo(() => {
    const required = hypothesisMap[selectedHypothesis].match;
    const coverage = required.filter((item) => selectedEvidence.includes(item as EvidenceKey)).length;
    const strength = coverage === required.length ? 'Alta' : coverage === 1 ? 'Media' : 'Baja';

    let conclusion = 'Selecciona evidencias para construir una conclusión integradora.';
    if (selectedEvidence.length > 0) {
      conclusion = hypothesisMap[selectedHypothesis].verdict;
    }
    if (strength === 'Baja') {
      conclusion = 'La hipótesis aún no está bien sostenida: faltan evidencias clave para una explicación robusta.';
    }

    return { strength, conclusion };
  }, [selectedEvidence, selectedHypothesis]);

  function toggleEvidence(key: EvidenceKey) {
    setSelectedEvidence((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-[0_0_60px_rgba(2,6,23,0.7)]">
      <div className="grid gap-0 xl:grid-cols-[320px_1fr_320px]">
        <aside className="border-r border-slate-800 bg-slate-950/70 p-6 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Hipótesis de trabajo</h4>
          {(Object.keys(hypothesisMap) as HypothesisKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedHypothesis(key)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                selectedHypothesis === key
                  ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {hypothesisMap[key].label}
            </button>
          ))}
        </aside>

        <section className="bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_100%)] p-6 space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Caso transversal</p>
            <h4 className="mt-2 text-xl font-black text-white">Laboratorio integrador por evidencias</h4>
            <p className="mt-3 text-sm leading-7 text-slate-400">Selecciona evidencias provenientes de las prácticas previas y decide cuál hipótesis explica mejor el caso. El objetivo es pasar de datos aislados a una conclusión sistémica y argumentada.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(Object.keys(evidenceCards) as EvidenceKey[]).map((key) => {
              const card = evidenceCards[key];
              const active = selectedEvidence.includes(key);

              return (
                <button
                  key={key}
                  onClick={() => toggleEvidence(key)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-slate-800 bg-slate-950/70 hover:bg-slate-900'
                  }`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Evidencia</p>
                  <h5 className="mt-2 text-sm font-black text-white">{card.title}</h5>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{card.summary}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{card.inference}</p>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="border-l border-slate-800 bg-slate-950/70 p-6 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Síntesis final</h4>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-slate-200">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Fuerza de la hipótesis</p>
            <p className="mt-2 text-2xl font-black text-white">{analysis.strength}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Evidencias seleccionadas</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {selectedEvidence.length > 0
                ? selectedEvidence.map((item) => evidenceCards[item].title).join(', ')
                : 'Aún no has seleccionado evidencias.'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Conclusión integrada</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{analysis.conclusion}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
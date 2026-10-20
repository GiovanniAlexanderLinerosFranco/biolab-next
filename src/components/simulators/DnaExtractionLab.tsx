"use client";

import { useMemo, useState } from 'react';

type SampleKey = 'cebolla' | 'fresa' | 'higado';
type StepKey = 'maceracion' | 'detergente' | 'sal' | 'filtracion' | 'etanol';

type SampleConfig = {
  nombre: string;
  rendimiento: 'alto' | 'medio';
  color: string;
  textura: string;
};

const samples: Record<SampleKey, SampleConfig> = {
  cebolla: {
    nombre: 'Cebolla',
    rendimiento: 'medio',
    color: 'bg-violet-300/70',
    textura: 'Tejido vegetal organizado con nucleos abundantes y extraccion relativamente limpia.',
  },
  fresa: {
    nombre: 'Fresa',
    rendimiento: 'alto',
    color: 'bg-rose-300/70',
    textura: 'Tejido blando con alto rendimiento visible de ADN por cantidad de material genetico disponible.',
  },
  higado: {
    nombre: 'Higado',
    rendimiento: 'medio',
    color: 'bg-amber-300/70',
    textura: 'Muestra animal con alta carga organica y mayor necesidad de depuracion del extracto.',
  },
};

const orderedSteps: StepKey[] = ['maceracion', 'detergente', 'sal', 'filtracion', 'etanol'];

const stepLabels: Record<StepKey, string> = {
  maceracion: 'Maceración',
  detergente: 'Detergente',
  sal: 'Sal',
  filtracion: 'Filtración',
  etanol: 'Etanol frío',
};

const stepEffects: Record<StepKey, string> = {
  maceracion: 'La muestra se fragmenta y aumenta el contacto con reactivos.',
  detergente: 'Se desorganizan membranas lipídicas y se libera contenido celular.',
  sal: 'Se estabilizan cargas y se favorece la separación de proteínas asociadas.',
  filtracion: 'Se retiran restos grandes y mejora la claridad del extracto.',
  etanol: 'Disminuye la solubilidad y el ADN precipita como fibras visibles.',
};

export default function DnaExtractionLab() {
  const [sample, setSample] = useState<SampleKey>('fresa');
  const [completedSteps, setCompletedSteps] = useState<StepKey[]>([]);

  const sampleConfig = samples[sample];

  const status = useMemo(() => {
    const hasDetergent = completedSteps.includes('detergente');
    const hasSalt = completedSteps.includes('sal');
    const hasFiltration = completedSteps.includes('filtracion');
    const hasEthanol = completedSteps.includes('etanol');

    const liberation = hasDetergent ? 'Alta' : completedSteps.includes('maceracion') ? 'Parcial' : 'Minima';
    const clarity = hasFiltration ? 'Alta' : hasSalt ? 'Media' : 'Baja';
    const precipitation = hasEthanol && hasDetergent && hasSalt ? (sampleConfig.rendimiento === 'alto' ? 'Abundante' : 'Moderada') : hasEthanol ? 'Debil' : 'Ausente';

    let interpretation = 'Comienza la secuencia experimental para liberar y visualizar ADN.';
    if (completedSteps.length >= 3) {
      interpretation = 'La muestra ya presenta una ruptura efectiva de barreras celulares y un extracto en proceso de clarificación.';
    }
    if (hasEthanol && hasDetergent && hasSalt) {
      interpretation = 'La secuencia es coherente: lisis, estabilización iónica y precipitación permiten observar ADN visible en la interfase.';
    } else if (hasEthanol && (!hasDetergent || !hasSalt)) {
      interpretation = 'El alcohol se aplicó, pero la extracción es incompleta: faltan pasos previos para favorecer una precipitación robusta del ADN.';
    }

    return { liberation, clarity, precipitation, interpretation };
  }, [completedSteps, sampleConfig.rendimiento]);

  function toggleStep(step: StepKey) {
    setCompletedSteps((current) =>
      current.includes(step) ? current.filter((item) => item !== step) : [...current, step]
    );
  }

  function resetExperiment() {
    setCompletedSteps([]);
  }

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-[0_0_60px_rgba(2,6,23,0.7)]">
      <div className="grid gap-0 xl:grid-cols-[320px_1fr_320px]">
        <aside className="border-r border-slate-800 bg-slate-950/70 p-6 space-y-6">
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Muestra biológica</h4>
            <div className="space-y-2">
              {(Object.keys(samples) as SampleKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSample(key)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                    sample === key
                      ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
                      : 'border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {samples[key].nombre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Secuencia experimental</h4>
            <div className="space-y-2">
              {orderedSteps.map((step) => (
                <button
                  key={step}
                  onClick={() => toggleStep(step)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                    completedSteps.includes(step)
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {stepLabels[step]}
                </button>
              ))}
            </div>
          </div>

          <button onClick={resetExperiment} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-slate-800">
            Reiniciar experimento
          </button>
        </aside>

        <section className="bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_100%)] p-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Cámara molecular</p>
              <h4 className="mt-2 text-xl font-black text-white">Simulador de extracción de ADN</h4>
            </div>
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-violet-300">
              {samples[sample].nombre}
            </span>
          </div>

          <p className="text-sm leading-7 text-slate-400">Activa pasos de la secuencia experimental y observa cómo cambia la liberación del contenido celular, la claridad del extracto y la precipitación final del ADN.</p>

          <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]"></div>
            <div className={`absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full blur-[1px] transition-all duration-500 ${sampleConfig.color} ${completedSteps.includes('maceracion') ? 'scale-110 opacity-80' : 'scale-90 opacity-55'}`}></div>
            <div className={`absolute left-1/2 top-28 h-36 w-56 -translate-x-1/2 rounded-[2rem] border border-white/10 bg-white/5 transition-all duration-500 ${completedSteps.includes('filtracion') ? 'opacity-70' : 'opacity-40'}`}></div>
            <div className={`absolute left-1/2 top-20 h-52 w-52 -translate-x-1/2 rounded-full transition-all duration-500 ${completedSteps.includes('detergente') ? 'bg-cyan-300/10 scale-125' : 'bg-transparent scale-100'}`}></div>
            <div className={`absolute inset-x-16 bottom-16 h-10 rounded-full transition-all duration-500 ${completedSteps.includes('sal') ? 'bg-amber-300/20' : 'bg-transparent'}`}></div>
            <div className={`absolute left-1/2 bottom-10 h-24 w-32 -translate-x-1/2 rounded-t-[2rem] rounded-b-lg transition-all duration-500 ${completedSteps.includes('etanol') ? 'bg-slate-200/10' : 'bg-transparent'}`}></div>

            {completedSteps.includes('etanol') && (
              <>
                <div className={`absolute left-1/2 top-24 -translate-x-1/2 rounded-full bg-white/80 blur-[1px] transition-all duration-500 ${status.precipitation === 'Abundante' ? 'h-24 w-24 opacity-90' : status.precipitation === 'Moderada' ? 'h-16 w-16 opacity-80' : 'h-10 w-10 opacity-60'}`}></div>
                <div className="absolute left-1/2 top-20 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.25em] text-white/80">ADN precipitado</div>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {orderedSteps.map((step) => (
              <article key={step} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">{stepLabels[step]}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{stepEffects[step]}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="border-l border-slate-800 bg-slate-950/70 p-6 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Resultado del análisis</h4>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-slate-200">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Liberación celular</p>
            <p className="mt-2 text-2xl font-black text-white">{status.liberation}</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-slate-200">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-300">Claridad del extracto</p>
            <p className="mt-2 text-2xl font-black text-white">{status.clarity}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-slate-200">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">Precipitación de ADN</p>
            <p className="mt-2 text-2xl font-black text-white">{status.precipitation}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Interpretación molecular</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{status.interpretation}</p>
            <p className="mt-4 text-sm leading-7 text-slate-400">{sampleConfig.textura}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
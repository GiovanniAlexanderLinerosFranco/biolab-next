"use client";

import { useState } from 'react';

type TissueKey = 'epitelial' | 'conectivo' | 'muscular' | 'nervioso';
type ZoomLevel = '4X' | '10X' | '40X';

type TissueSpec = {
  nombre: string;
  organo: string;
  funcion: string;
  rasgos: string[];
  visual: {
    background: string;
    layerOne: string;
    layerTwo: string;
    accent: string;
  };
  zoomNotes: Record<ZoomLevel, string>;
};

const tissues: Record<TissueKey, TissueSpec> = {
  epitelial: {
    nombre: 'Tejido epitelial',
    organo: 'Mucosa intestinal o epitelio de revestimiento',
    funcion: 'Proteccion, absorcion y secrecion coordinada.',
    rasgos: [
      'Alta cohesion celular con escaso espacio intercelular.',
      'Polaridad apical-basal claramente sugerida.',
      'Lamina continua que recubre o delimita una superficie.',
    ],
    visual: {
      background: 'from-fuchsia-950 via-slate-950 to-black',
      layerOne: 'bg-fuchsia-300/70',
      layerTwo: 'bg-rose-200/80',
      accent: 'text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-400/10',
    },
    zoomNotes: {
      '4X': 'Se aprecia una banda continua de recubrimiento y una clara separacion respecto al tejido subyacente.',
      '10X': 'La arquitectura en capas permite reconocer superficie libre y base de anclaje.',
      '40X': 'Se distingue la alta densidad nuclear y el empaquetamiento de las celulas epiteliales.',
    },
  },
  conectivo: {
    nombre: 'Tejido conectivo',
    organo: 'Dermis o estroma de soporte',
    funcion: 'Sosten, union, nutricion y defensa tisular.',
    rasgos: [
      'Matriz extracelular amplia con fibras visibles.',
      'Celulas mas dispersas que en tejido epitelial.',
      'Patron de soporte mecanico y relleno biologico.',
    ],
    visual: {
      background: 'from-amber-950 via-slate-950 to-black',
      layerOne: 'bg-amber-200/70',
      layerTwo: 'bg-orange-300/65',
      accent: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
    },
    zoomNotes: {
      '4X': 'Predomina un campo amplio con baja densidad celular y abundante matriz de fondo.',
      '10X': 'Se hacen visibles haces y trayectos de fibras con orientacion variable.',
      '40X': 'La matriz y los fibroblastos permiten inferir soporte y resistencia tisular.',
    },
  },
  muscular: {
    nombre: 'Tejido muscular',
    organo: 'Miocardio o musculo esqueletico',
    funcion: 'Contraccion y generacion de fuerza mecanica.',
    rasgos: [
      'Fibras alargadas con patron direccional dominante.',
      'Organizacion repetitiva asociada a contraccion.',
      'Alta especializacion estructural para movimiento.',
    ],
    visual: {
      background: 'from-rose-950 via-slate-950 to-black',
      layerOne: 'bg-rose-300/70',
      layerTwo: 'bg-red-200/75',
      accent: 'text-rose-300 border-rose-400/30 bg-rose-400/10',
    },
    zoomNotes: {
      '4X': 'El campo muestra orientacion fibrilar predominante y organizacion en haces.',
      '10X': 'La repeticion de bandas o fasciculos orienta a funcion contractil.',
      '40X': 'Las fibras y sus limites sugieren alta especializacion para generar movimiento.',
    },
  },
  nervioso: {
    nombre: 'Tejido nervioso',
    organo: 'Sustancia gris o ganglio',
    funcion: 'Recepcion, integracion y conduccion de señales.',
    rasgos: [
      'Cuerpos celulares destacados entre prolongaciones.',
      'Red de conectividad mas que patron laminar o fibrilar simple.',
      'Distribucion compatible con procesamiento de informacion.',
    ],
    visual: {
      background: 'from-cyan-950 via-slate-950 to-black',
      layerOne: 'bg-cyan-300/70',
      layerTwo: 'bg-sky-200/80',
      accent: 'text-cyan-300 border-cyan-400/30 bg-cyan-400/10',
    },
    zoomNotes: {
      '4X': 'Se observan zonas de agrupacion celular y trayectos que conectan regiones.',
      '10X': 'La muestra permite diferenciar somas y un entramado de prolongaciones.',
      '40X': 'La morfologia neuronal se vuelve clave para inferir integracion y conduccion.',
    },
  },
};

const zoomLevels: ZoomLevel[] = ['4X', '10X', '40X'];

export default function HistologyAtlas() {
  const [activeTissue, setActiveTissue] = useState<TissueKey>('epitelial');
  const [zoom, setZoom] = useState<ZoomLevel>('10X');

  const tissue = tissues[activeTissue];

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-[0_0_60px_rgba(2,6,23,0.7)]">
      <div className="border-b border-slate-800 bg-slate-950/90 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-black">Atlas digital guiado</p>
          <h3 className="mt-2 text-2xl font-black text-white">Visor histologico interactivo</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {zoomLevels.map((level) => (
            <button
              key={level}
              onClick={() => setZoom(level)}
              className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.25em] transition ${
                zoom === level
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 xl:grid-cols-[300px_1fr]">
        <aside className="border-r border-slate-800 bg-slate-950/70 p-6 space-y-4">
          {Object.entries(tissues).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTissue(key as TissueKey)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                activeTissue === key
                  ? value.visual.accent
                  : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <span className="block text-[10px] uppercase tracking-[0.25em] font-black text-slate-500">Muestra</span>
              <span className="mt-2 block text-sm font-bold">{value.nombre}</span>
              <span className="mt-2 block text-xs text-slate-400">{value.organo}</span>
            </button>
          ))}
        </aside>

        <section className="p-6 space-y-6 bg-[linear-gradient(180deg,#020617_0%,#020617_100%)]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className={`rounded-3xl border border-slate-800 bg-gradient-to-br ${tissue.visual.background} p-5`}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Campo microscópico</p>
                  <h4 className="mt-2 text-xl font-black text-white">{tissue.nombre}</h4>
                </div>
                <span className={`rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.25em] ${tissue.visual.accent}`}>
                  Zoom {zoom}
                </span>
              </div>

              <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]"></div>
                <div className={`absolute left-6 right-6 top-8 h-20 rounded-[999px] blur-[1px] ${tissue.visual.layerOne} ${zoom === '4X' ? 'opacity-55 scale-95' : zoom === '10X' ? 'opacity-75 scale-100' : 'opacity-90 scale-110'}`}></div>
                <div className={`absolute left-10 right-10 top-32 h-24 rounded-[999px] blur-[2px] ${tissue.visual.layerTwo} ${zoom === '4X' ? 'opacity-40 scale-90' : zoom === '10X' ? 'opacity-70 scale-100' : 'opacity-95 scale-115'}`}></div>

                {activeTissue === 'epitelial' && (
                  <>
                    <div className="absolute inset-x-10 top-24 h-1 bg-white/40"></div>
                    <div className="absolute inset-x-8 bottom-12 grid grid-cols-9 gap-2">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className={`h-24 rounded-t-full rounded-b-lg ${tissue.visual.layerOne} ${zoom === '40X' ? 'scale-y-110' : ''}`}></div>
                      ))}
                    </div>
                  </>
                )}

                {activeTissue === 'conectivo' && (
                  <>
                    {Array.from({ length: 14 }).map((_, index) => (
                      <div
                        key={index}
                        className="absolute h-1 rounded-full bg-amber-100/70"
                        style={{
                          left: `${8 + (index % 5) * 16}%`,
                          top: `${18 + index * 5}%`,
                          width: `${18 + (index % 4) * 4}%`,
                          transform: `rotate(${index % 2 === 0 ? 18 : -16}deg)`,
                        }}
                      ></div>
                    ))}
                  </>
                )}

                {activeTissue === 'muscular' && (
                  <div className="absolute inset-8 flex flex-col justify-center gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className={`h-8 rounded-full ${tissue.visual.layerOne} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.15)_0px,rgba(255,255,255,0.15)_8px,transparent_8px,transparent_16px)]"></div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTissue === 'nervioso' && (
                  <>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className={`absolute rounded-full ${tissue.visual.layerOne}`} style={{ left: `${15 + index * 15}%`, top: `${18 + (index % 2) * 20}%`, width: '44px', height: '44px' }}></div>
                    ))}
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div key={index} className="absolute h-[2px] bg-cyan-100/70" style={{ left: `${14 + index * 10}%`, top: `${40 + (index % 3) * 12}%`, width: `${16 + (index % 2) * 8}%`, transform: `rotate(${index % 2 === 0 ? 24 : -22}deg)` }}></div>
                    ))}
                  </>
                )}
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">{tissue.zoomNotes[zoom]}</p>
            </article>

            <article className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Síntesis de lectura</p>
                <h4 className="mt-2 text-xl font-black text-white">Mapa forma-función</h4>
              </div>

              <div className={`rounded-2xl border p-4 ${tissue.visual.accent}`}>
                <p className="text-[10px] uppercase tracking-[0.25em] font-black">Órgano probable</p>
                <p className="mt-2 text-lg font-black text-white">{tissue.organo}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Función inferida</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{tissue.funcion}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-black">Rasgos decisivos</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {tissue.rasgos.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
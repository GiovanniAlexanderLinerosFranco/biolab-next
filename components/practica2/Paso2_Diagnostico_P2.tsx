"use client";
import React, { useState } from 'react';

type TejidoId = 'epitelial' | 'conectivo' | 'muscular' | 'nervioso';

interface TejidoEstructura {
  id: TejidoId;
  nombre: string;
  imagen: string;
  descripcion: string;
  criteriosDiferenciacion: string[];
  desafio: string;
  opciones: { id: string; texto: string }[];
  respuestaCorrecta: string;
}

const tejidosDatos: TejidoEstructura[] = [
  {
    id: 'epitelial',
    nombre: 'Tejido Epitelial (Mucosa Oral / Encía)',
    imagen: '/assets/tejido_epitelial.png',
    descripcion: 'Compuesto por células poliédricas dispuestas en capas contiguas y fuertemente unidas mediante complejos de unión, con una matriz extracelular nula. Al ser avascular, se nutre por difusión pasiva desde el tejido conectivo subyacente a través de la membrana basal. En Odontología, la mucosa oral presenta un epitelio estratificado plano adaptado a la fricción constante.',
    criteriosDiferenciacion: [
      "Alta densidad celular (células adosadas sin espacios libres).",
      "Núcleos celulares ordenados siguiendo la estratificación tisular.",
      "Ausencia total de vasos sanguíneos dentro del estrato celular."
    ],
    desafio: 'Al evaluar una muestra clínica de encía sana bajo el microscopio, observa múltiples hileras de células que se aplanan gradualmente hacia la capa más externa. ¿Qué característica anatómica describe este orden?',
    opciones: [
      { id: 'A', texto: 'Epitelio simple cúbico especializado en filtración selectiva.' },
      { id: 'B', texto: 'Epitelio estratificado plano, estructurado para resistir abrasión mecánica e invasión patógena.' },
      { id: 'C', texto: 'Tejido conectivo laxo con alta tasa de síntesis de colágeno.' }
    ],
    respuestaCorrecta: 'B'
  },
  {
    id: 'conectivo',
    nombre: 'Tejido Conectivo (Ligamento Periodontal)',
    imagen: '/assets/tejido_conectivo.png',
    descripcion: 'Se caracteriza por presentar células ampliamente separadas entre sí, inmersas en una abundante matriz extracelular (MEC) rica en fibras proteicas de colágeno y elastina sintetizadas por fibroblastos. El ligamento periodontal es un tejido conectivo denso dispuesto estratégicamente para suspender las piezas dentales en sus alveolos óseos y disipar fuerzas oclusales.',
    criteriosDiferenciacion: [
      "Baja densidad celular con células (fibroblastos) fusiformes.",
      "Predominio de matriz extracelular amorfa y densos haces de colágeno.",
      "Altamente vascularizado (presencia constante de capilares sanguíneos)."
    ],
    desafio: 'Durante el análisis del soporte dental, identifica células alargadas rodeadas por una densa malla rosada desorganizada de fibras. ¿Cómo clasifica este escenario tisular?',
    opciones: [
      { id: 'A', texto: 'Tejido epitelial de revestimiento glandular secretor.' },
      { id: 'B', texto: 'Tejido conectivo denso irregular, encargado de proporcionar soporte estructural y fijación.' },
      { id: 'C', texto: 'Fibras nerviosas mielinizadas de conducción aferente.' }
    ],
    respuestaCorrecta: 'B'
  },
  {
    id: 'muscular',
    nombre: 'Tejido Muscular (Músculo de la Masticación)',
    imagen: '/assets/tejido_muscular.png',
    descripcion: 'Especializado en la contracción mecánica masiva. Está formado por fibras musculares elongadas paralelas que contienen miofibrillas organizadas de actina y miosina. El tejido muscular estriado esquelético presenta sarcómeros visibles como estriaciones transversales, es multinucleado y sus núcleos se localizan en la periferia celular.',
    criteriosDiferenciacion: [
      "Células cilíndricas extraordinariamente largas dispuestas en haces paralelos.",
      "Estriaciones o bandas claras y oscuras transversales bien definidas.",
      "Múltiples núcleos localizados estrictamente en la periferia celular."
    ],
    desafio: 'Al microscopio se revelan bandas transversales nítidas en filamentos celulares cilíndricos y núcleos desplazados hacia los bordes externos. ¿Qué tipo celular observa?',
    opciones: [
      { id: 'A', texto: 'Fibras musculares lisas de control autónomo visceral.' },
      { id: 'B', texto: 'Fibras musculares estriadas esqueléticas de contracción voluntaria.' },
      { id: 'C', texto: 'Células epiteliales contráctiles del endotelio vascular.' }
    ],
    respuestaCorrecta: 'B'
  },
  {
    id: 'nervioso',
    nombre: 'Tejido Nervioso (Retina / Inervación Pulpar)',
    imagen: '/assets/tejido_nervioso.png',
    descripcion: 'Diseñado para la comunicación biológica rápida. Está integrado por dos poblaciones celulares fundamentales: las neuronas, especializadas en recibir, procesar y transmitir impulsos electroquímicos a través de prolongaciones citoplasmáticas (axones y dendritas); y las células gliales (neuroglía), responsables del soporte metabólico, protección y aislamiento.',
    criteriosDiferenciacion: [
      "Somas celulares de morfología estrellada o piramidal con extensiones ramificadas.",
      "Presencia de células gliales circundantes significativamente más pequeñas.",
      "Ausencia de fibras de colágeno masivas o capas celulares contiguas adosadas."
    ],
    desafio: 'Frente a un estímulo nociceptivo pulpar o lumínico retiniano, ¿cómo interactúan los componentes fundamentales del tejido nervioso para procesar el evento?',
    opciones: [
      { id: 'A', texto: 'Las células gliales transmiten el potencial de acción y las neuronas fagocitan desechos.' },
      { id: 'B', texto: 'Las neuronas generan y conducen la señal eléctrica, mientras las células gliales aseguran el soporte y la homeostasis metabólica.' },
      { id: 'C', texto: 'Los fibroblastos pulpares se despolarizan enviando iones a los capilares sanguíneos.' }
    ],
    respuestaCorrecta: 'B'
  }
];

interface Paso2Props {
  estudianteNombre: string;
  respuestasDesafios: Record<string, string>;
  setRespuestasDesafios: React.Dispatch<React.SetStateAction<{
    epitelial: string;
    conectivo: string;
    muscular: string;
    nervioso: string;
  }>>;
}

export default function Paso2_Diagnostico_P2({
  estudianteNombre,
  respuestasDesafios,
  setRespuestasDesafios
}: Paso2Props) {
  const [activo, setActivo] = useState(0);
  const tejidoActual = tejidosDatos[activo];

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Para consolidar su aprendizaje individual, no se permite copiar ni pegar contenidos externos.");
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-2" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-1 uppercase">Estación 02</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Criterios de Diferenciación y Caracterización Histológica</h1>
        <p className="text-slate-400 text-xs md:text-sm">Estudie con rigor metodológico las diferencias estructurales de los tejidos humanos para evitar confusiones diagnósticas.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* MENÚ DE RECONOCIMIENTO */}
        <div className="flex flex-col gap-2 w-full lg:w-1/4">
          {tejidosDatos.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActivo(index)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-300 text-xs font-bold shadow-md ${
                activo === index 
                  ? 'border-cyan-500 bg-cyan-950/20 text-white ring-2 ring-cyan-500/10' 
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{item.nombre.split(' (')[0]}</span>
                {respuestasDesafios[item.id] && <span className="text-teal-400 font-black">✓</span>}
              </div>
            </button>
          ))}
        </div>

        {/* CONTENEDOR CENTRAL */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col lg:flex-row gap-6 shadow-2xl backdrop-blur-md">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="w-full bg-black/40 rounded-xl border border-slate-800 overflow-hidden relative min-h-[220px] lg:min-h-[260px]">
              <img 
                src={tejidoActual.imagen} 
                alt={tejidoActual.nombre} 
                className="w-full h-full object-cover opacity-90 transition-transform duration-300"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[9px] text-cyan-400 font-mono uppercase tracking-widest font-black">Micrografía H&E (Corte Real)</span>
              </div>
            </div>

            {/* SISTEMA DE AYUDA AUTÓNOMA */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <h4 className="text-cyan-400 text-[10px] font-black uppercase tracking-wider mb-2 font-mono">📋 Criterios Clave de Reconocimiento Histológico:</h4>
              <ul className="space-y-1.5">
                {tejidoActual.criteriosDiferenciacion.map((crit, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-tight">
                    <span className="text-cyan-500 font-bold">•</span> {crit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white border-b border-slate-800 pb-1.5">{tejidoActual.nombre}</h3>
              <p className="text-slate-300 text-xs leading-relaxed text-justify mt-2">{tejidoActual.descripcion}</p>
            </div>

            <div className="border border-amber-700/40 bg-amber-950/10 p-4 rounded-xl flex flex-col gap-3 relative">
              {!estudianteNombre && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-amber-400 text-xs font-bold uppercase">⚠️ Identificación Requerida</span>
                  <p className="text-[11px] text-slate-500 mt-1">Registre su acceso en la Estación 01 para interactuar.</p>
                </div>
              )}
              <div>
                <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">Desafío Evaluativo Automatizado</h4>
                <p className="text-amber-100/90 text-xs font-semibold leading-tight">{tejidoActual.desafio}</p>
              </div>
              <div className="flex flex-col gap-2">
                {tejidoActual.opciones.map((opc) => (
                  <button
                    key={opc.id}
                    onClick={() => setRespuestasDesafios(prev => ({ ...prev, [tejidoActual.id]: opc.id }))}
                    className={`w-full text-left p-2.5 text-xs rounded-xl border transition-all ${
                      respuestasDesafios[tejidoActual.id] === opc.id
                        ? 'border-cyan-400 bg-cyan-900/30 text-white font-bold'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 mr-1 font-black">{opc.id})</span> {opc.texto}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
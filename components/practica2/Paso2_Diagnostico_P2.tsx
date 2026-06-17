"use client";
import React, { useState } from 'react';

type TejidoId = 'epitelial' | 'conectivo' | 'muscular' | 'nervioso';

interface TejidoEstructura {
  id: TejidoId;
  nombre: string;
  imagen: string;
  descripcion: string;
  desafio: string;
  opciones: { id: string; texto: string }[];
  respuestaCorrecta: string;
}

const tejidosDatos: TejidoEstructura[] = [
  {
    id: 'epitelial',
    nombre: 'Tejido Epitelial (Mucosa Oral)',
    imagen: '/assets/tejido_epitelial.png',
    descripcion: 'Formado por células fuertemente unidas con escasa matriz extracelular. Reviste la superficie de la cavidad oral (encías y lengua), actuando como una barrera mecánica protectora frente a la fricción alimentaria y la invasión de microorganismos.',
    desafio: 'Al observar un corte histológico de la encía, notas múltiples capas de células unidas y aplanadas en la superficie. ¿Qué tipo de epitelio y función diagnóstica se evidencia?',
    opciones: [
      { id: 'A', texto: 'Epitelio simple cúbico especializado en la absorción activa de nutrientes.' },
      { id: 'B', texto: 'Epitelio estratificado plano, especializado en protección mecánica contra el desgaste.' },
      { id: 'C', texto: 'Epitelio pseudoestratificado cilíndrico con cilios para el transporte celular.' }
    ],
    respuestaCorrecta: 'B'
  },
  {
    id: 'conectivo',
    nombre: 'Tejido Conectivo (Ligamento Periodontal)',
    imagen: '/assets/tejido_conectivo.png',
    descripcion: 'Caracterizado por células (fibroblastos) suspendidas en una abundante matriz extracelular rica en fibras de colágeno. En Odontología, este tejido forma el ligamento periodontal, responsable de amortiguar las fuerzas de masticación y anclar el diente al hueso alveolar.',
    desafio: 'Analizando el ligamento periodontal que sujeta las piezas dentales, observas fibroblastos dispersos en una densa red de colágeno. ¿Cuál es la función primordial de este tejido en la homeostasis estomatognática?',
    opciones: [
      { id: 'A', texto: 'Generar contracciones musculares involuntarias frente al trauma óseo.' },
      { id: 'B', texto: 'Proporcionar soporte estructural, amortiguación mecánica y fijación de los órganos dentales.' },
      { id: 'C', texto: 'Secretar neurotransmisores para modular la sensibilidad pulpar inmediata.' }
    ],
    respuestaCorrecta: 'B'
  },
  {
    id: 'muscular',
    nombre: 'Tejido Muscular (Músculos de la Masticación)',
    imagen: '/assets/tejido_muscular.png',
    descripcion: 'Compuesto por células elongadas llamadas fibras musculares que contienen proteínas contráctiles (actina y miosina). El tejido muscular estriado es el responsable directo de los movimientos voluntarios de la mandíbula durante el habla, la masticación y la deglución.',
    desafio: 'Durante los movimientos de apertura y cierre mandibular se activan células cilíndricas multinucleadas con estriaciones transversales evidentes. ¿Qué tipo celular específico realiza este proceso?',
    opciones: [
      { id: 'A', texto: 'Fibras musculares lisas de control autónomo visceral.' },
      { id: 'B', texto: 'Fibras musculares estriadas esqueléticas de contracción voluntaria.' },
      { id: 'C', texto: 'Células epiteliales contráctiles del endotelio vascular.' }
    ],
    respuestaCorrecta: 'B'
  },
  {
    id: 'nervioso',
    nombre: 'Tejido Nervioso (Retina / Receptores Orales)',
    imagen: '/assets/tejido_nervioso.png',
    descripcion: 'Constituido por neuronas, células altamente especializadas en la generación y conducción de impulsos eléctricos, y por células gliales que proveen soporte, aislamiento y nutrición metabólica. Es crucial para percibir el dolor, la temperatura y la presión en tratamientos clínicos.',
    desafio: 'En las estructuras sensoriales de la visión (retina) y la cavidad oral, ¿cómo interactúan los componentes fundamentales del tejido nervioso para procesar un estímulo?',
    opciones: [
      { id: 'A', texto: 'Las células gliales transmiten el impulso eléctrico y las neuronas fagocitan los desechos químicos.' },
      { id: 'B', texto: 'Las neuronas procesan y conducen el estímulo nervioso, mientras las células gliales aseguran el soporte y la homeostasis metabólica.' },
      { id: 'C', texto: 'Los queratinocitos se despolarizan enviando señales mecánicas directamente a la matriz extracelular.' }
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

  // FUNCIÓN MEDIDA ACADÉMICA ANTI-FRAUDE
  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Para consolidar su aprendizaje e interpretación individual, no se permite copiar, pegar ni arrastrar contenidos externos.");
  };

  const seleccionarOpcion = (opcionId: string) => {
    setRespuestasDesafios(prev => ({
      ...prev,
      [tejidoActual.id]: opcionId
    }));
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 md:p-6" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      
      {/* HEADER DE LA ESTACIÓN */}
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-2 uppercase">Estación 02</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">Reconocimiento y Diagnóstico de Linajes Tisulares</h1>
        <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3 w-full lg:w-3/4 backdrop-blur-sm shadow-md">
          <span className="text-xl">💡</span>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            <strong>Instrucciones:</strong> Navegue por los menús laterales para estudiar los 4 tejidos fundamentales humanos. Evalúe los rasgos estructurales y seleccione el diagnóstico correcto que cumpla con la rúbrica científica.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* SELECTORES LATERALES EN FORMATO DE TARJETAS MULTI-DISPOSITIVO */}
        <div className="flex flex-col gap-2.5 w-full lg:w-1/4">
          {tejidosDatos.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActivo(index)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 font-bold text-xs md:text-sm shadow-sm relative group ${
                activo === index 
                  ? 'border-cyan-500 bg-cyan-950/20 text-white ring-2 ring-cyan-500/10' 
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{item.nombre.split(' (')[0]}</span>
                {respuestasDesafios[item.id] && (
                  <span className="text-teal-400 font-black animate-pulse text-xs">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* VISUALIZADOR CENTRAL Y PANEL DE OPCIÓN MÚLTIPLE */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col lg:flex-row gap-6 shadow-xl backdrop-blur-md">
          
          {/* BANCO DE IMÁGENES RESPONSIVE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-black/40 rounded-xl border border-slate-800 overflow-hidden relative min-h-[220px] lg:min-h-[350px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
              <span className="text-[9px] text-cyan-400 font-mono uppercase tracking-widest font-black">Micrografía Óptica USTA</span>
            </div>
            <div className="text-slate-600 text-xs font-mono text-center p-4">
              [Visualizador Histológico: {tejidoActual.nombre}]
            </div>
          </div>

          {/* DESAFÍO CIENTÍFICO */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2 tracking-tight border-b border-slate-800 pb-2">
                {tejidoActual.nombre}
              </h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed text-justify italic">
                {tejidoActual.descripcion}
              </p>
            </div>

            {/* CONTROL DE IDENTIDAD REQUERIDO ANTES DE CALIFICAR */}
            <div className="border border-amber-700/40 bg-amber-950/10 p-4 rounded-xl flex flex-col gap-3 relative overflow-hidden">
              {!estudianteNombre && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">⚠️ Acceso Restringido</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                    Ingrese sus datos de identidad y valide su conexión en la <strong>Estación 01 (Bioseguridad)</strong> para desbloquear las opciones de diagnóstico.
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                  Desafío Diagnóstico
                </h4>
                <p className="text-amber-100/90 text-xs md:text-sm font-medium leading-snug">{tejidoActual.desafio}</p>
              </div>

              {/* RENDER DE BOTONES DE ACCIÓN MÚLTIPLE DE LA RÚBRICA */}
              <div className="flex flex-col gap-2 mt-2">
                {tejidoActual.opciones.map((opc) => {
                  const estaSeleccionado = respuestasDesafios[tejidoActual.id] === opc.id;
                  return (
                    <button
                      key={opc.id}
                      onClick={() => seleccionarOpcion(opc.id)}
                      className={`w-full text-left p-3 text-xs rounded-xl border transition-all duration-200 leading-relaxed ${
                        estaSeleccionado
                          ? 'border-cyan-400 bg-cyan-900/30 text-white font-bold shadow-md'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-cyan-400 mr-1 font-black">{opc.id})</span> {opc.texto}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
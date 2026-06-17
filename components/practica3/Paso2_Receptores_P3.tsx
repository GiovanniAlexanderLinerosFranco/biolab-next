"use client";
import React, { useState } from 'react';

type DesafioId = 'antigeno' | 'especificidad' | 'transduccion';

interface DesafioEstructura {
  id: DesafioId;
  nombre: string;
  descripcion: string;
  desafio: string;
  opciones: { id: string; texto: string }[];
  respuestaCorrecta: string;
}

const desafiosDatos: DesafioEstructura[] = [
  {
    id: 'antigeno',
    nombre: 'Antígenos Eritrocitarios (Receptores de Superficie)',
    descripcion: 'Los antígenos de los sistemas ABO y Rh son oligosacáridos o proteínas integrales expuestas en la superficie externa de la membrana del eritrocito. Funcionan como marcadores de identidad biológica que interactúan específicamente con anticuerpos del plasma.',
    desafio: 'Considerando la estructura de la membrana celular expuesta en la guía, ¿qué tipo de biomolécula conforma químicamente a los antígenos del sistema ABO?',
    opciones: [
      { id: 'A', texto: 'Lípidos puros de la bicapa hidrofóbica encargados del transporte pasivo.' },
      { id: 'B', texto: 'Glicoproteínas y glicolípidos cuyos residuos de carbohidratos determinan la especificidad del grupo.' },
      { id: 'C', texto: 'Ácidos nucleicos libres en el citoplasma celular eritrocitario.' }
    ],
    respuestaCorrecta: 'B'
  },
  {
    id: 'especificidad',
    nombre: 'Especificidad Ligando-Receptor',
    descripcion: 'La unión de un anticuerpo (ligando) a su antígeno específico (receptor) sigue un modelo estricto de complementariedad estructural ("llave-cerradura"). En inmunohematología, cuando ocurre este acoplamiento masivo, los eritrocitos forman redes macroscópicas llamadas aglutinación.',
    desafio: 'Si una muestra de sangre aglutina inmediatamente al entrar en contacto con el reactivo comercial Anti-A, ¿qué inferencia científica sobre los receptores de la membrana es correcta?',
    opciones: [
      { id: 'A', texto: 'La membrana celular carece por completo de receptores antigénicos funcionales.' },
      { id: 'B', texto: 'La membrana posee el antígeno A en su superficie, el cual fue reconocido por el anticuerpo específico del reactivo.' },
      { id: 'C', texto: 'El reactivo destruyó la bicapa de fosfolípidos mediante un proceso de ósmosis severa.' }
    ],
    respuestaCorrecta: 'B'
  },
  {
    id: 'transduccion',
    nombre: 'Reconocimiento y Compatibilidad Clínica',
    descripcion: 'El sistema inmune genera anticuerpos naturales contra los antígenos de membrana que el propio organismo no posee. Un error en la tipificación e interpretación de estos receptores celulares durante una transfusión desencadena una respuesta hemolítica severa que compromete la homeostasis.',
    desafio: 'Un estudiante identifica que una muestra de sangre no aglutina ni con Anti-A ni con Anti-B. Basado en la ausencia de estos receptores de superficie, ¿cuál es el grupo sanguíneo correcto?',
    opciones: [
      { id: 'A', texto: 'Grupo sanguíneo AB (expresa ambos receptores simultáneamente).' },
      { id: 'B', texto: 'Grupo sanguíneo O (carece de los antígenos determinantes A y B en la superficie celular).' },
      { id: 'C', texto: 'Grupo sanguíneo Rh positivo debido al colapso de la membrana.' }
    ],
    respuestaCorrecta: 'B'
  }
];

interface Paso2Props {
  estudianteNombre: string;
  respuestasDesafios: Record<string, string>;
  setRespuestasDesafios: React.Dispatch<React.SetStateAction<{
    antigeno: string;
    especificidad: string;
    transduccion: string;
  }>>;
}

export default function Paso2_Receptores_P3({
  estudianteNombre,
  respuestasDesafios,
  setRespuestasDesafios
}: Paso2Props) {
  const [activo, setActivo] = useState(0);
  const desafioActual = desafiosDatos[activo];

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Para fomentar la síntesis y el aprendizaje individual, no se permite el copiado ni pegado de texto externo.");
  };

  const seleccionarOpcion = (opcionId: string) => {
    setRespuestasDesafios(prev => ({
      ...prev,
      [desafioActual.id]: opcionId
    }));
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-2 uppercase">Estación 02</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">Interacción Ligando-Receptor en Membranas</h1>
        <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3 w-full lg:w-3/4 backdrop-blur-sm shadow-md">
          <span className="text-xl">💡</span>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            <strong>Instrucciones:</strong> Explore los módulos de especificidad molecular en el menú lateral. Analice los fundamentos de inmunohematología clínica y resuelva los desafíos de tipificación celular.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* MENÚ DE SELECCIÓN LATERAL */}
        <div className="flex flex-col gap-2.5 w-full lg:w-1/4">
          {desafiosDatos.map((item, index) => (
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

        {/* CONTENEDOR CENTRAL */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col lg:flex-row gap-6 shadow-xl backdrop-blur-md">
          
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-black/40 rounded-xl border border-slate-800 overflow-hidden relative min-h-[200px] lg:min-h-[320px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
              <span className="text-[9px] text-cyan-400 font-mono uppercase tracking-widest font-black">Modelo Antígeno-Anticuerpo</span>
            </div>
            <div className="text-slate-600 text-xs font-mono text-center p-4">
              [Simulador de Enlace Molecular: {desafioActual.id.toUpperCase()}]
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-white mb-2 tracking-tight border-b border-slate-800 pb-2">
                {desafioActual.nombre}
              </h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed text-justify italic">
                {desafioActual.descripcion}
              </p>
            </div>

            {/* CAJÓN DEL DESAFÍO DIRECTO */}
            <div className="border border-amber-700/40 bg-amber-950/10 p-4 rounded-xl flex flex-col gap-3 relative overflow-hidden">
              {!estudianteNombre && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">⚠️ Perfil Incompleto</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                    Registre su identidad en la <strong>Estación 01 (Bioseguridad)</strong> para desbloquear las opciones de análisis de membrana.
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                  Desafío Científico Seleccionado
                </h4>
                <p className="text-amber-100/90 text-xs md:text-sm font-medium leading-snug">{desafioActual.desafio}</p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                {desafioActual.opciones.map((opc) => {
                  const estaSeleccionado = respuestasDesafios[desafioActual.id] === opc.id;
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
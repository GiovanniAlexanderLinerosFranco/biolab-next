"use client";
import React, { useState } from 'react';

// Definimos los IDs permitidos para evitar errores de indexación
type EspecimenId = 'virus' | 'animal' | 'vegetal' | 'hongo' | 'protozoo';

interface Especimen {
  id: EspecimenId;
  nombre: string;
  imagen: string;
  descripcion: string;
  desafio: string;
}

const especimenes: Especimen[] = [
  {
    id: 'virus',
    nombre: 'Virus (Bacteriófago)',
    imagen: '/assets/virus.png',
    descripcion: 'Entidad biológica acelular compuesta por un genoma encapsulado en una cápside proteica. Carecen de metabolismo propio y ribosomas, obligándolos a parasitar la maquinaria celular del huésped para su replicación.',
    desafio: 'Considerando su carencia de ATPasas transmembrana, ¿qué mecanismo físico o termodinámico utiliza el bacteriófago T4 para inyectar su genoma sin gasto de ATP propio?'
  },
  {
    id: 'animal',
    nombre: 'Célula Animal',
    imagen: '/assets/animal.png',
    descripcion: 'Unidad eucariota caracterizada por la ausencia de pared celular y plastidios. Posee un sistema de endomembranas altamente especializado y colesterol en su bicapa lipídica para modular la fluidez.',
    desafio: 'Si se inhibe farmacológicamente la bomba Na+/K+ ATPasa, ¿cuál sería el impacto fisiológico inmediato en el volumen celular y el potencial de membrana?'
  },
  {
    id: 'vegetal',
    nombre: 'Célula Vegetal',
    imagen: '/assets/vegetal.png',
    descripcion: 'Célula eucariota con una pared celular rígida. Se distingue por la presencia de cloroplastos para la fotosíntesis y una gran vacuola central que mantiene la presión de turgencia.',
    desafio: 'Durante la exposición a un medio hipertónico severo, ¿qué estructura citoesquelética ancla la membrana a la pared celular durante la plasmólisis?'
  },
  {
    id: 'hongo',
    nombre: 'Hongo (Micelio)',
    imagen: '/assets/hongo.png',
    descripcion: 'Microorganismo eucariota, heterótrofo y osmotrófico. Su pared celular está compuesta por quitina y glucanos. En su membrana, el ergosterol sustituye funcionalmente al colesterol.',
    desafio: 'Sabiendo que los azoles inhiben la síntesis de ergosterol, explique por qué este bloqueo detiene el crecimiento fúngico con baja toxicidad en células humanas.'
  },
  {
    id: 'protozoo',
    nombre: 'Protozoo',
    imagen: '/assets/protozoo.png',
    descripcion: 'Eucariotas unicelulares, quimioheterótrofos y móviles. Presentan organelos especializados como las vacuolas contráctiles para la osmorregulación y cilios/flagelos para el desplazamiento.',
    desafio: 'Si un Paramecium es transferido de agua dulce a una solución isotónica, ¿cuál será la alteración en la frecuencia de pulsación de su vacuola contráctil?'
  }
];

interface Paso2Props {
  estudianteNombre: string;
  respuestasDesafios: Record<string, string>;
  setRespuestasDesafios: React.Dispatch<React.SetStateAction<{
    virus: string; animal: string; vegetal: string; hongo: string; protozoo: string;
  }>>;
}

export default function Paso2_Fundamentos({ estudianteNombre, respuestasDesafios, setRespuestasDesafios }: Paso2Props) {
  const [activo, setActivo] = useState(0);
  const especimenActual = especimenes[activo];
  const limiteCaracteres = 250;

  const manejarCambioRespuesta = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const texto = e.target.value;
    if (texto.length <= limiteCaracteres) {
      setRespuestasDesafios(prev => ({
        ...prev,
        [especimenActual.id]: texto
      }));
    }
  };

  const prevenirFraude = (e: React.ClipboardEvent<HTMLTextAreaElement> | React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Para fomentar la síntesis y el aprendizaje, debes digitar tu respuesta. No se permite pegar texto de fuentes externas o IA.");
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <div className="text-blue-500 font-bold text-xs tracking-widest mb-2 uppercase">Estación 02</div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">Exploración de la Diversidad Microbiana y Celular</h1>
        <div className="bg-blue-900/30 border border-blue-500/50 p-3 rounded-lg flex items-center gap-3 w-full lg:w-3/4">
          <span className="text-xl">💡</span>
          <p className="text-blue-200 text-sm">
            <strong>Guía de uso:</strong> Navegue por las opciones haciendo clic en cada grupo biológico. Lea la descripción y digite la respuesta al Desafío Rápido.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-3 w-full lg:w-1/4">
          {especimenes.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActivo(index)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 font-bold text-sm shadow-sm ${
                activo === index ? 'border-blue-500 bg-blue-900/30 text-white' : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{item.nombre}</span>
                {(respuestasDesafios[item.id]?.length ?? 0) > 10 && <span className="text-teal-400 text-xs">✓</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 shadow-xl">
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-black/50 rounded-xl border border-slate-700/50 overflow-hidden relative min-h-[250px]">
             <img src={especimenActual.imagen} alt={especimenActual.nombre} className="object-contain w-full h-full p-4 hover:scale-105 transition-transform duration-500" />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col h-full justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">{especimenActual.nombre}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 text-justify">{especimenActual.descripcion}</p>
            </div>

            <div className="border border-amber-700/50 bg-amber-900/10 p-4 rounded-lg flex flex-col gap-3 relative">
              {!estudianteNombre && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-lg z-10 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-amber-400 text-xl font-bold">⚠️ Perfil no identificado</span>
                  <p className="text-xs text-slate-400 mt-1">Por favor ingrese su nombre completo en la Estación 01.</p>
                </div>
              )}
              <div>
                <h4 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-1">Desafío Rápido</h4>
                <p className="text-amber-100/90 text-sm italic">"{especimenActual.desafio}"</p>
              </div>
              <div className="relative">
                <textarea
                  value={respuestasDesafios[especimenActual.id] || ''}
                  onChange={manejarCambioRespuesta}
                  onPaste={prevenirFraude} onDrop={prevenirFraude}
                  placeholder="Redacte su análisis aquí..."
                  className="w-full bg-slate-950/50 border border-amber-900/50 rounded p-3 text-sm text-slate-200 focus:border-amber-500 focus:outline-none resize-none min-h-[100px]"
                />
                <div className={`text-right text-xs mt-1 font-mono ${respuestasDesafios[especimenActual.id]?.length >= limiteCaracteres ? 'text-rose-400' : 'text-slate-500'}`}>
                  {respuestasDesafios[especimenActual.id]?.length || 0} / {limiteCaracteres}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
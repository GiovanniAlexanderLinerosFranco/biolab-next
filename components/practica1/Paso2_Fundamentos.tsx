"use client";

import React, { useState } from 'react';

// Definimos los IDs permitidos para evitar errores de indexación y asegurar coherencia con Supabase
type EspecimenId = 'virus' | 'animal' | 'vegetal' | 'hongo' | 'protozoo';

interface Especimen {
  id: EspecimenId;
  nombre: string;
  imagen: string;
  descripcion: string;
  desafio: string;
}

// Datos de los especímenes
const especimenes: Especimen[] = [
  {
    id: 'virus',
    nombre: 'Virus (Bacteriófago)',
    imagen: '/assets/virus.png',
    descripcion: 'Entidad biológica acelular (no es una célula). Consiste en material genético protegido por una cubierta de proteína llamada cápside. No posee metabolismo propio, por lo que depende totalmente de una célula huésped para replicarse.',
    desafio: 'Si los virus no tienen metabolismo propio ni pueden producir energía (ATP), ¿por qué necesitan infectar a una célula viva para poder multiplicarse?'
  },
  {
    id: 'animal',
    nombre: 'Célula Animal',
    imagen: '/assets/animal.png',
    descripcion: 'Unidad eucariota característica de los animales. Se distingue por la ausencia de pared celular, lo que le permite adoptar diversas formas. Posee un núcleo definido y organelos especializados.',
    desafio: 'A diferencia de las plantas, las células animales no tienen una pared celular rígida. ¿Qué estructura interna (red de proteínas) les ayuda a mantener su forma?'
  },
  {
    id: 'vegetal',
    nombre: 'Célula Vegetal',
    imagen: '/assets/vegetal.png',
    descripcion: 'Célula eucariota con una pared celular rígida de celulosa que le brinda soporte. Posee cloroplastos para la fotosíntesis y una gran vacuola central para el manejo del agua.',
    desafio: '¿Qué función cumple la pared celular cuando la célula vegetal se llena de agua y genera presión interna contra ella?'
  },
  {
    id: 'hongo',
    nombre: 'Hongo (Levadura/Micelio)',
    imagen: '/assets/hongo.png',
    descripcion: 'Organismo eucariota que puede ser unicelular o filamentoso. Tienen pared celular de quitina, pero no realizan fotosíntesis; obtienen su alimento por absorción del medio ambiente.',
    desafio: 'Los hongos poseen pared celular al igual que las plantas, pero no pueden fabricar su propio alimento. ¿Cómo obtienen su energía y nutrientes?'
  },
  {
    id: 'protozoo',
    nombre: 'Protozoo',
    imagen: '/assets/protozoo.png',
    descripcion: 'Eucariotas unicelulares que suelen vivir en ambientes acuáticos. Muchos presentan estructuras especializadas para el movimiento y la captura de alimento, como cilios o flagelos.',
    desafio: 'Si observa al microscopio un organismo unicelular con movimiento activo y un núcleo bien definido, ¿por qué puede asegurar que es un protozoo y no una bacteria?'
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

  // FUNCIÓN ANTI-FRAUDE
  const prevenirFraude = (e: React.ClipboardEvent<HTMLTextAreaElement> | React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Para fomentar la síntesis y el aprendizaje, debes digitar tu respuesta manualmente. No se permite pegar texto de fuentes externas o IA.");
  };

  const manejarCambioRespuesta = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const texto = e.target.value;
    if (texto.length <= limiteCaracteres) {
      setRespuestasDesafios(prev => ({
        ...prev,
        [especimenActual.id]: texto
      }));
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-6">
      {/* TÍTULO Y GUÍA DE USO */}
      <div className="mb-6">
        <div className="text-blue-500 font-bold text-xs tracking-widest mb-2 uppercase tracking-[0.2em]">Estación 02</div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">Exploración de la Diversidad Microbiana y Celular</h1>
        <div className="bg-blue-900/30 border border-blue-500/40 p-4 rounded-xl flex items-center gap-4 w-full lg:w-3/4 shadow-lg backdrop-blur-sm">
          <div className="bg-blue-500/20 p-2 rounded-full">
            <span className="text-2xl">💡</span>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">
            <strong>Instrucciones:</strong> Explore los grupos biológicos en el menú lateral. Observe la morfología de cada espécimen, analice la descripción técnica y responda el desafío propuesto con sus propias palabras.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* COLUMNA IZQUIERDA: MENÚ DE NAVEGACIÓN */}
        <div className="flex flex-col gap-3 w-full lg:w-1/4">
          {especimenes.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActivo(index)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 font-bold text-sm shadow-sm group ${
                activo === index 
                  ? 'border-blue-500 bg-blue-900/40 text-white ring-2 ring-blue-500/20 shadow-blue-500/10' 
                  : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{item.nombre}</span>
                {(respuestasDesafios[item.id]?.length ?? 0) > 10 && (
                  <span className="text-teal-400 text-xs font-black animate-pulse">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* COLUMNA DERECHA: VISUALIZADOR Y ENTRADA DE DATOS */}
        <div className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 flex flex-col lg:flex-row gap-8 shadow-2xl backdrop-blur-md">
          {/* SECCIÓN DE IMAGEN */}
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-black/40 rounded-xl border border-slate-700/50 overflow-hidden relative min-h-[350px] group">
             <img 
               src={especimenActual.imagen} 
               alt={especimenActual.nombre} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
             <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[10px] text-white/80 font-mono uppercase tracking-widest">Vista Microscópica</span>
             </div>
          </div>

          {/* SECCIÓN DE TEXTO Y DESAFÍO */}
          <div className="w-full lg:w-1/2 flex flex-col h-full justify-between">
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight border-b border-slate-800 pb-2">
                {especimenActual.nombre}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed text-justify italic">
                {especimenActual.descripcion}
              </p>
            </div>

            {/* CAJÓN DEL DESAFÍO RÁPIDO */}
            <div className="border border-amber-700/50 bg-amber-900/10 p-5 rounded-2xl flex flex-col gap-4 relative">
              {!estudianteNombre && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-2xl z-20 flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-amber-500/20 p-3 rounded-full mb-3">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <span className="text-amber-400 text-lg font-bold">Identidad no validada</span>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Debe ingresar su nombre completo y correo en la <strong>Estación 01 (Bioseguridad)</strong> para habilitar los desafíos científicos.
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-amber-500 text-xs font-black uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                  Desafío Rápido de Análisis
                </h4>
                {/* SOLUCIÓN AL ERROR DE ESLINT: Uso de entidades para las comillas */}
                <p className="text-amber-100/90 text-sm font-medium leading-snug">
                  &quot;{especimenActual.desafio}&quot;
                </p>
              </div>

              <div className="relative">
                <textarea
                  value={respuestasDesafios[especimenActual.id] || ''}
                  onChange={manejarCambioRespuesta}
                  onPaste={prevenirFraude} 
                  onDrop={prevenirFraude}
                  placeholder="Redacte su análisis fundamentado aquí..."
                  className="w-full bg-slate-950/70 border border-amber-900/40 rounded-xl p-4 text-sm text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none resize-none min-h-[130px] transition-all placeholder:text-slate-700"
                />
                
                <div className={`text-right text-[10px] mt-2 font-mono font-bold tracking-widest ${
                  (respuestasDesafios[especimenActual.id]?.length || 0) >= limiteCaracteres 
                  ? 'text-rose-500' 
                  : 'text-slate-500'
                }`}>
                  {respuestasDesafios[especimenActual.id]?.length || 0} / {limiteCaracteres} MAX_CHARS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIE DE ESTACIÓN (Las líneas que se habían perdido) */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">
          BioLab Interactive System • Registro Digital de Evidencia
        </p>
      </div>
    </div>
  );
}
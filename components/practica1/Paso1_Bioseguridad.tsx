"use client";
import React, { useState } from 'react';

// NOMBRES SIMPLIFICADOS PARA EVITAR ERRORES DE RUTAS URL
const reglasBioseguridad = [
  {
    id: 1,
    titulo: "Protección personal",
    imagen: "/assets/regla1_proteccion.png", // Asegúrate de que coincida con el archivo renombrado
    descripcion: "Use bata cerrada, guantes y cabello recogido antes de manipular cualquier muestra biológica.",
    fases: {
      antes: "Verifique el estado de sus elementos de protección personal (EPP) y colóqueselos correctamente.",
      durante: "Mantenga los EPP bien ajustados. Evite tocarse el rostro o ajustar las gafas con guantes contaminados.",
      despues: "Retírese los guantes técnica y cuidadosamente. Lávese las manos de inmediato."
    }
  },
  {
    id: 2,
    titulo: "Control de contaminación",
    imagen: "/assets/regla2_contaminacion.png", // Asegúrate de que coincida con el archivo renombrado
    descripcion: "Desinfecte la superficie, rotule la muestra y evite contacto cruzado entre láminas, pipetas y reactivos.",
    fases: {
      antes: "Limpie el mesón de trabajo con hipoclorito o alcohol al 70%. Prepare solo el material necesario.",
      durante: "Manipule una muestra a la vez. Utilice pipetas estériles diferentes para cada reactivo.",
      despues: "Desinfecte nuevamente el área de trabajo y esterilice las asas bacteriológicas si aplican."
    }
  },
  {
    id: 3,
    titulo: "Cierre del procedimiento",
    imagen: "/assets/regla3_cierre.png", // Asegúrate de que coincida con el archivo renombrado
    descripcion: "Deseche residuos según protocolo, limpie la estación y registre cualquier incidente en la bitácora.",
    fases: {
      antes: "Ubique los guardianes y canecas (roja, verde, gris) cerca de su área antes de empezar el análisis.",
      durante: "Clasifique los residuos en tiempo real. No acumule material biológico innecesario en el mesón.",
      despues: "Deseche materiales, limpie el microscopio, apague los equipos y registre sus observaciones."
    }
  }
];

interface Paso1Props {
  estudianteNombre: string;
  setEstudianteNombre: (val: string) => void;
}

export default function Paso1_Bioseguridad({ estudianteNombre, setEstudianteNombre }: Paso1Props) {
  const [reglaActiva, setReglaActiva] = useState(0);
  const reglaActual = reglasBioseguridad[reglaActiva];

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto p-6">
      
      {/* COLUMNA IZQUIERDA: Identidad, Títulos y Botones */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* TARJETA DE REGISTRO ANTE SUPABASE OBLIGATORIA AL INICIO */}
        <div className="bg-slate-950/80 border-2 border-cyan-600/40 p-5 rounded-2xl shadow-xl backdrop-blur-md">
          <label className="block text-xs font-black uppercase tracking-widest text-cyan-400 mb-2">
            🔑 Identificación del Investigador (Requerido):
          </label>
          <input 
            type="text"
            placeholder="Ingrese su nombre completo para activar la sesión..."
            value={estudianteNombre}
            onChange={(e) => setEstudianteNombre(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none transition-all font-semibold"
          />
        </div>

        <div>
          <div className="text-teal-500 font-bold text-xs tracking-widest mb-2 uppercase">
            Estación 01
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Bioseguridad en el laboratorio
          </h1>
          <p className="text-slate-300 leading-relaxed text-sm">
            Antes de observar muestras, el estudiante debe reconocer el flujo mínimo de seguridad: preparación personal, control del entorno y cierre responsable del procedimiento.
          </p>
        </div>

        <div className="bg-blue-900/30 border border-blue-500/50 p-3 rounded-lg flex items-center gap-3">
          <span className="text-xl">💡</span>
          <p className="text-blue-200 text-xs leading-relaxed">
            <strong>Guía de uso:</strong> Haga clic en cada una de las reglas a continuación para desplegar sus protocolos de aplicación.
          </p>
        </div>

        {/* BOTONES INTERACTIVOS DE LAS REGLAS */}
        <div className="flex flex-col gap-3 mt-2">
          {reglasBioseguridad.map((regla, index) => (
            <button
              key={regla.id}
              onClick={() => setReglaActiva(index)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 shadow-sm ${
                reglaActiva === index 
                  ? 'border-teal-400 bg-teal-900/20' 
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-500' 
              }`}
            >
              <span className="block text-[10px] font-bold text-slate-400 mb-1 tracking-wider uppercase">
                Regla {regla.id}
              </span>
              <span className={`block font-bold text-sm ${reglaActiva === index ? 'text-white' : 'text-slate-300'}`}>
                {regla.titulo}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* COLUMNA DERECHA: Contenido Dinámico de la Regla e Imagen de Firefly */}
      <div className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        
        {/* Cabecera y Descripción */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{reglaActual.titulo}</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {reglaActual.descripcion}
          </p>
        </div>

        {/* CONTENEDOR DE IMAGEN DINÁMICA DE ADOBE FIREFLY */}
        <div className="flex-1 w-full bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden mb-6 flex items-center justify-center relative min-h-[220px]">
           <img 
             src={reglaActual.imagen} 
             alt={`Visualización técnica de ${reglaActual.titulo}`} 
             className="w-full h-full object-cover opacity-85 transition-opacity duration-500"
             // Mejora UX: Si la imagen falla, oculta el ícono roto en lugar de mostrarlo
             onError={(e) => {
               e.currentTarget.style.display = 'none';
               console.warn(`No se encontró la imagen: ${reglaActual.imagen}`);
             }}
             onLoad={(e) => {
               e.currentTarget.style.display = 'block';
             }}
           />
        </div>

        {/* Bloque de Fases Inferior (Antes, Durante, Después) */}
        <div className="flex gap-3 h-40">
          <div className="flex-1 border border-teal-800/60 bg-teal-900/20 rounded-lg p-3 overflow-y-auto">
            <h4 className="text-teal-400 text-[10px] font-extrabold mb-2 tracking-wider">ANTES</h4>
            <p className="text-[11px] text-slate-300 break-words leading-tight">{reglaActual.fases.antes}</p>
          </div>

          <div className="flex-1 border border-amber-800/60 bg-amber-900/20 rounded-lg p-3 overflow-y-auto">
            <h4 className="text-amber-400 text-[10px] font-extrabold mb-2 tracking-wider">DURANTE</h4>
            <p className="text-[11px] text-slate-300 break-words leading-tight">{reglaActual.fases.durante}</p>
          </div>

          <div className="flex-1 border border-rose-800/60 bg-rose-900/20 rounded-lg p-3 overflow-y-auto">
            <h4 className="text-rose-400 text-[10px] font-extrabold mb-2 tracking-wider">DESPUÉS</h4>
            <p className="text-[11px] text-slate-300 break-words leading-tight">{reglaActual.fases.despues}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
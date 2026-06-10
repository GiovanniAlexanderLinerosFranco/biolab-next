"use client";
import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const reglasBioseguridad = [
  {
    id: 1,
    titulo: "Protección personal",
    imagen: "/assets/regla1_proteccion.png",
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
    imagen: "/assets/regla2_contaminacion.png",
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
    imagen: "/assets/regla3_cierre.png",
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
  estudianteEmail: string;
  setEstudianteEmail: (val: string) => void;
}

export default function Paso1_Bioseguridad({
  estudianteNombre,
  setEstudianteNombre,
  estudianteEmail,
  setEstudianteEmail
}: Paso1Props) {
  const [reglaActiva, setReglaActiva] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const reglaActual = reglasBioseguridad[reglaActiva];

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estudianteEmail);

  const iniciarSesionEnSupabase = async () => {
    if (!estudianteNombre.trim()) {
      alert("Por favor, ingresa tu nombre completo.");
      return;
    }

    if (!estudianteEmail.trim() || !correoValido) {
      alert("Por favor, ingresa un correo válido institucional o personal.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      alert("Error: Supabase no está configurado. Revisa tus variables .env.local");
      return;
    }

    setIsConnecting(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('bitacoras_practica_1')
        .insert([
          {
            estudiante_nombre: estudianteNombre,
            estudiante_email: estudianteEmail,
            respuestas_desafios: {},
            tabla_muestras: {},
            analisis_contraste: "Inicio de sesión en Paso 1",
            conclusiones_preguntas: {}
          }
        ]);

      if (error) throw error;

      setStatus('success');
      console.log("¡Conexión exitosa! Sesión iniciada en Supabase.");
    } catch (error) {
      console.error("Error al conectar con Supabase:", error);
      setStatus('error');
      alert("Error al registrar la sesión en la base de datos. Revisa la consola.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto p-6">
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-slate-950/80 border-2 border-cyan-600/40 p-5 rounded-2xl shadow-xl backdrop-blur-md">
          <label className="block text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
            🔑 Identificación del Investigador
          </label>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                👤 Nombre completo
              </label>
              <input
                type="text"
                placeholder="Ingrese su nombre completo..."
                value={estudianteNombre}
                onChange={(e) => setEstudianteNombre(e.target.value)}
                disabled={status === 'success'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                📧 Correo institucional o personal
              </label>
              <input
                type="email"
                placeholder="usuario@universidad.edu.co o usuario@gmail.com"
                value={estudianteEmail}
                onChange={(e) => setEstudianteEmail(e.target.value)}
                disabled={status === 'success'}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none transition-all font-semibold"
              />
            </div>

            <button
              onClick={iniciarSesionEnSupabase}
              disabled={isConnecting || status === 'success'}
              className={`w-full p-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                status === 'success'
                  ? 'bg-green-600/20 text-green-400 border border-green-500/50 cursor-default'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.3)]'
              }`}
            >
              {isConnecting
                ? "Validando conexión..."
                : status === 'success'
                ? "✓ Sesión de Laboratorio Activada"
                : status === 'error'
                ? "❌ Error (Reintentar)"
                : "Activar Sesión de Laboratorio"}
            </button>

            {!correoValido && estudianteEmail.length > 0 && (
              <p className="text-[11px] text-amber-400">
                Ingrese un correo válido para continuar.
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="text-teal-500 font-bold text-xs tracking-widest mb-2 uppercase">
            Estación 01
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Bioseguridad en el laboratorio
          </h1>
          <p className="text-slate-300 leading-relaxed text-sm">
            Antes de observar muestras, el estudiante debe reconocer el flujo mínimo de seguridad:
            preparación personal, control del entorno y cierre responsable del procedimiento.
          </p>
        </div>

        <div className="bg-blue-900/30 border border-blue-500/50 p-3 rounded-lg flex items-center gap-3">
          <span className="text-xl">💡</span>
          <p className="text-blue-200 text-xs leading-relaxed">
            <strong>Guía de uso:</strong> Haga clic en cada una de las reglas para desplegar sus protocolos de aplicación.
          </p>
        </div>

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

      <div className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{reglaActual.titulo}</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {reglaActual.descripcion}
          </p>
        </div>

        <div className="flex-1 w-full bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden mb-6 flex items-center justify-center relative min-h-[220px]">
          <img
            src={reglaActual.imagen}
            alt={reglaActual.titulo}
            className="w-full h-full object-cover opacity-85"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="flex gap-3 h-40">
          <div className="flex-1 border border-teal-800/60 bg-teal-900/20 rounded-lg p-3 overflow-y-auto">
            <h4 className="text-teal-400 text-[10px] font-extrabold mb-2">ANTES</h4>
            <p className="text-[11px] text-slate-300 leading-tight">{reglaActual.fases.antes}</p>
          </div>

          <div className="flex-1 border border-amber-800/60 bg-amber-900/20 rounded-lg p-3 overflow-y-auto">
            <h4 className="text-amber-400 text-[10px] font-extrabold mb-2">DURANTE</h4>
            <p className="text-[11px] text-slate-300 leading-tight">{reglaActual.fases.durante}</p>
          </div>

          <div className="flex-1 border border-rose-800/60 bg-rose-900/20 rounded-lg p-3 overflow-y-auto">
            <h4 className="text-rose-400 text-[10px] font-extrabold mb-2">DESPUÉS</h4>
            <p className="text-[11px] text-slate-300 leading-tight">{reglaActual.fases.despues}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * Práctica 3 — Receptores de membrana / inmunoquímica / señalización
 * ============================================================================
 */

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Paso1_Bioseguridad_P3 from "@/components/practica3/Paso1_Bioseguridad_P3";
import Paso2_Receptores_P3 from "@/components/practica3/Paso2_Receptores_P3";
import Paso3_Simulador_P3 from "@/components/practica3/Paso3_Simulador_P3";
import Paso4_Bitacora_P3 from "@/components/practica3/Paso4_Bitacora_P3";
import { verificarLicenciaPropiedadIntelectual } from "@/lib/copyrightGuard";
import { ensureDemoSession } from "@/lib/openAccess";

const ID_PRACTICA = "biolab_p3";

export default function Practica3ReceptoresPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [estudianteNombre, setEstudianteNombre] = useState("");
  const [estudianteEmail, setEstudianteEmail] = useState("");
  const [licenciaValida, setLicenciaValida] = useState<boolean | null>(null);
  const [respuestasDesafios, setRespuestasDesafios] = useState({
    antigeno: "",
    especificidad: "",
    transduccion: "",
  });
  const [respuestasAglutinacion, setRespuestasAglutinacion] = useState<
    Record<string, {
      pacienteId: string;
      grupoSanguineoEstudiante: string;
      grupoSanguineoCorrecto: string;
      esGrupoCorrecto: boolean;
      mecanismoSeñalizacionEstudiante: string;
      mecanismoSeñalizacionCorrecto: string;
      esSeñalizacionCorrecta: boolean;
      segundoMensajeroEstudiante: string;
      segundoMensajeroCorrecto: string;
      esMensajeroCorrecto: boolean;
    }>
  >({});

  const steps = [
    "Bioseguridad",
    "Receptores de membrana",
    "Simulador inmunoquímico",
    "Bitácora",
  ];

  useEffect(() => {
    const validarEntorno = async () => {
      const proteccion = await verificarLicenciaPropiedadIntelectual(ID_PRACTICA);
      if (!proteccion.autorizado) {
        setLicenciaValida(false);
        alert(`SISTEMA BLOQUEADO: ${proteccion.msg}`);
        return;
      }
      setLicenciaValida(true);

      const sesion = ensureDemoSession(ID_PRACTICA);
      setEstudianteNombre(sesion.nombre);
      setEstudianteEmail(sesion.email);
    };

    validarEntorno();
  }, []);

  if (licenciaValida === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] p-6">
        <div className="max-w-md space-y-4 rounded-2xl border border-red-900/50 bg-red-950/20 p-6 text-center">
          <p className="font-mono text-xs text-red-500">ACCESO INTERRUMPIDO DESDE LA CONSOLA DOCENTE</p>
          <Link href="/laboratorio" className="inline-block rounded-xl border border-slate-700 px-3 py-2 font-mono text-[10px] font-bold uppercase text-slate-300 hover:bg-slate-900">
            Panel de prácticas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col font-sans text-slate-200 selection:bg-teal-500/30">
      <div className="fixed inset-0 z-0 bg-[#020617]/95" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-3 md:p-8">
        <header className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-2xl md:p-6 lg:flex-row">
          <div className="flex w-full items-center justify-between gap-4 lg:w-auto lg:justify-start">
            <Link
              href="/laboratorio"
              className="flex items-center gap-2 rounded-xl border border-teal-800/50 bg-teal-950/60 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-teal-300 hover:bg-teal-500 hover:text-white"
            >
              ← Panel
            </Link>
            <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider text-teal-300">
              Práctica 03 · Receptores
            </span>
          </div>

          <div className="flex w-full flex-wrap justify-center gap-2.5 lg:w-auto">
            {steps.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setCurrentStep(i)}
                className={`rounded-xl border px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                  currentStep === i
                    ? "border-teal-400 bg-teal-600 text-white shadow-[0_0_20px_rgba(45,212,191,0.35)]"
                    : "border-slate-800 bg-slate-900/90 text-slate-400 hover:bg-slate-800"
                }`}
              >
                <span className="mr-1 font-mono opacity-40">{i + 1}.</span>
                {s}
              </button>
            ))}
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 items-start gap-6 lg:grid-cols-4">
          <aside className="hidden space-y-5 rounded-3xl border border-slate-800/80 bg-slate-950/50 p-5 shadow-xl backdrop-blur-xl lg:col-span-1 lg:block">
            <div>
              <h3 className="mb-1 font-mono text-[10px] font-black uppercase tracking-widest text-teal-400">Tema eje</h3>
              <p className="text-xs font-bold leading-snug text-white">
                Receptores de membrana, tipificación ABO/Rh y cascadas de señalización celular.
              </p>
            </div>
            <div className="border-t border-slate-800 pt-3">
              <h3 className="mb-1 font-mono text-[10px] font-black uppercase tracking-widest text-amber-500">Pregunta reto</h3>
              <p className="text-[11px] italic leading-relaxed text-slate-300">
                ¿Cómo determinan los receptores de superficie la identidad inmunológica y la respuesta a ligandos farmacológicos?
              </p>
            </div>
          </aside>

          <section className="flex min-h-[580px] flex-col justify-between rounded-[2rem] border border-slate-800/40 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-2xl md:p-8 lg:col-span-3">
            <div className="w-full flex-1">
              {currentStep === 0 && (
                <Paso1_Bioseguridad_P3
                  estudianteNombre={estudianteNombre}
                  setEstudianteNombre={setEstudianteNombre}
                  estudianteEmail={estudianteEmail}
                  setEstudianteEmail={setEstudianteEmail}
                />
              )}
              {currentStep === 1 && (
                <Paso2_Receptores_P3
                  estudianteNombre={estudianteNombre}
                  respuestasDesafios={respuestasDesafios}
                  setRespuestasDesafios={setRespuestasDesafios}
                />
              )}
              {currentStep === 2 && (
                <Paso3_Simulador_P3
                  estudianteNombre={estudianteNombre}
                  estudianteEmail={estudianteEmail}
                  respuestasAglutinacion={respuestasAglutinacion}
                  setRespuestasAglutinacion={setRespuestasAglutinacion}
                />
              )}
              {currentStep === 3 && (
                <Paso4_Bitacora_P3
                  estudianteNombre={estudianteNombre}
                  estudianteEmail={estudianteEmail}
                  respuestasAglutinacion={respuestasAglutinacion}
                />
              )}
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 sm:flex-row">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className={`w-full rounded-xl border px-6 py-2.5 font-mono text-xs font-bold transition-all sm:w-auto ${
                  currentStep === 0
                    ? "cursor-default opacity-0"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800"
                }`}
              >
                ◀ Estación anterior
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-2.5 font-mono text-xs font-bold tracking-wider text-white transition-all sm:w-auto"
                >
                  Siguiente estación ▶
                </button>
              ) : (
                <div className="w-full rounded-xl border border-teal-800/40 bg-teal-950/30 px-4 py-2 text-center font-mono text-[10px] font-black uppercase tracking-widest text-teal-300 sm:w-auto">
                  Complete la bitácora para registrar el reporte
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

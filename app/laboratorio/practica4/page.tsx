/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * Práctica 4 — Comunicación celular y flujo de sustancias (osmolaridad)
 * ============================================================================
 */

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import OsmolaritySimulator from "@/components/simulators/OsmolaritySimulator";
import Paso4_Bitacora_P4 from "@/components/practica4/Paso4_Bitacora_P4";
import { verificarLicenciaPropiedadIntelectual } from "@/lib/copyrightGuard";
import { ensureDemoSession } from "@/lib/openAccess";

const ID_PRACTICA = "biolab_p4";

type ResultadoOsmolaridad = {
  concentracion: string;
  osmolaridad: number;
  estadoElectrolitico: string;
  fenomenoObservado: string;
};

export default function Practica4OsmolaridadPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [estudianteNombre, setEstudianteNombre] = useState("");
  const [estudianteEmail, setEstudianteEmail] = useState("");
  const [licenciaValida, setLicenciaValida] = useState<boolean | null>(null);
  const [resultadosSimulador, setResultadosSimulador] = useState<
    Record<string, ResultadoOsmolaridad>
  >({});

  const steps = ["Simulador de osmolaridad", "Bitácora biofísica"];

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

  const consolidarMuestra = (
    id: string,
    datos: {
      solutoConcentracion: number;
      osmolaridadExterna: number;
      tonicidadEstado: "HIPOTÓNICO" | "ISOTÓNICO" | "HIPERTÓNICO";
      fenomenoClinico: string;
    }
  ) => {
    const tonicidadLegible: Record<string, string> = {
      HIPOTÓNICO: "Hipotónico",
      ISOTÓNICO: "Isotónico",
      HIPERTÓNICO: "Hipertónico",
    };

    setResultadosSimulador((prev) => ({
      ...prev,
      [id]: {
        concentracion: `${datos.solutoConcentracion}% NaCl`,
        osmolaridad: datos.osmolaridadExterna,
        estadoElectrolitico: tonicidadLegible[datos.tonicidadEstado] ?? datos.tonicidadEstado,
        fenomenoObservado: datos.fenomenoClinico,
      },
    }));
  };

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
    <main className="relative flex min-h-screen flex-col font-sans text-slate-200 selection:bg-cyan-500/30">
      <div className="fixed inset-0 z-0">
        <img src="/assets/banner-guia1.png" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-[4px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-3 md:p-8">
        <header className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-700/50 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-xl md:p-6 lg:flex-row">
          <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
            <Link
              href="/laboratorio"
              className="rounded-xl border border-cyan-500/30 bg-cyan-600/20 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-cyan-300 hover:bg-cyan-500 hover:text-white"
            >
              ← Panel
            </Link>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider text-cyan-300">
              Práctica 04 · Osmolaridad
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
                    ? "border-cyan-400 bg-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                    : "border-slate-800 bg-slate-900/90 text-slate-400 hover:bg-slate-800"
                }`}
              >
                <span className="mr-1 font-mono opacity-40">{i + 1}.</span>
                {s}
              </button>
            ))}
          </div>
        </header>

        <section className="flex min-h-[600px] flex-col justify-between rounded-[2rem] border border-slate-700/50 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-2xl md:p-8">
          <div className="flex-1">
            {currentStep === 0 && (
              <OsmolaritySimulator
                estudianteNombre={estudianteNombre}
                onConsolidarMuestra={consolidarMuestra}
              />
            )}
            {currentStep === 1 && (
              <Paso4_Bitacora_P4
                estudianteNombre={estudianteNombre}
                estudianteEmail={estudianteEmail}
                resultadosSimulador={resultadosSimulador}
              />
            )}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`w-full rounded-xl border px-6 py-2.5 font-mono text-xs font-bold sm:w-auto ${
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
                className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-8 py-2.5 font-mono text-xs font-bold tracking-wider text-white sm:w-auto"
              >
                Ir a bitácora ▶
              </button>
            ) : (
              <div className="w-full rounded-xl border border-cyan-800/40 bg-cyan-950/30 px-4 py-2 text-center font-mono text-[10px] font-black uppercase tracking-widest text-cyan-300 sm:w-auto">
                Consolide eritrocito y elodea en el simulador antes de enviar
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * Landing comercial — editoriales, universidades e interesados
 * ============================================================================
 */

import Link from "next/link";

const PRACTICAS = [
  "Bioseguridad, diversidad y microscopía",
  "Tejidos humanos (atlas histológico)",
  "Receptores de membrana (ABO/Rh)",
  "Comunicación celular y osmolaridad",
  "Índice mitótico y ciclo celular",
  "Extracción y aislamiento de ADN",
  "Transcripción y traducción génica",
  "Mutaciones y variabilidad molecular",
];

export default function LandingComercial() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(8,145,178,0.22),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.12),_transparent_45%)]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <p className="font-semibold tracking-[0.2em] text-cyan-300">BIOLAB VIRTUAL</p>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/laboratorio"
            className="rounded-lg border border-slate-600/80 px-3 py-2 text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
          >
            Entrar
          </Link>
          <a
            href="mailto:giovannilineros@biogalfhomehealth.com?subject=BioLab%20Virtual%20—%20licencia%20institucional"
            className="rounded-lg bg-cyan-600 px-3 py-2 font-semibold text-slate-950 transition hover:bg-cyan-500"
          >
            Solicitar licencia
          </a>
        </nav>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Laboratorio de biología celular y molecular, listo para licenciar.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Ocho prácticas interactivas con simuladores, bitácoras y control docente.
          Pensado para universidades, editoriales académicas y formadores independientes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/laboratorio"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 text-base font-bold tracking-wide text-slate-950 transition hover:bg-emerald-400"
          >
            Explorar el laboratorio
          </Link>
          <Link
            href="/laboratorio/practica1"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-400/40 px-6 text-base font-semibold text-cyan-100 transition hover:bg-cyan-500/10"
          >
            Ver práctica demo
          </Link>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Producto de BioGALF Home Health · Propiedad intelectual de PhD. Giovanni Alexander Lineros Franco
        </p>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-5xl border-t border-slate-800 px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Para quién es</h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Tres vías de adopción, un mismo núcleo pedagógico y técnico.
        </p>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          <li>
            <h3 className="text-lg font-semibold text-cyan-300">Universidades</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Cursos de biología celular/molecular con asistencia por código QR (Quick Response),
              activación de prácticas por sesión y bitácoras del estudiante.
            </p>
          </li>
          <li>
            <h3 className="text-lg font-semibold text-emerald-300">Editoriales</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Complemento digital a manuales y cartillas: simuladores embebibles,
              marca blanca institucional y licencia por cohorte o campus.
            </p>
          </li>
          <li>
            <h3 className="text-lg font-semibold text-amber-300">Interesados</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Docentes, academias y profesionales que quieran un entorno virtual
              serio sin montar un laboratorio físico completo.
            </p>
          </li>
        </ul>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-5xl border-t border-slate-800 px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Ocho prácticas incluidas</h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Del microscopio a la expresión génica, con estaciones de trabajo interactivas.
        </p>
        <ol className="mt-8 columns-1 gap-x-10 sm:columns-2">
          {PRACTICAS.map((titulo, i) => (
            <li
              key={titulo}
              className="mb-3 break-inside-avoid text-sm text-slate-300"
            >
              <span className="mr-2 font-mono text-cyan-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              {titulo}
            </li>
          ))}
        </ol>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-5xl border-t border-slate-800 px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Qué incluye la licencia</h2>
        <ul className="mt-6 space-y-3 text-slate-300">
          <li className="flex gap-3">
            <span className="text-emerald-400">●</span>
            Simuladores (microscopía, osmolaridad, aglutinación, mitosis, ADN, expresión génica).
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">●</span>
            Panel docente, códigos QR dinámicos y registro de ingreso por práctica.
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">●</span>
            Progressive Web App (aplicación web progresiva) instalable en aula o remoto.
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">●</span>
            Adaptación de marca y dominio institucional bajo acuerdo de licencia.
          </li>
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="mailto:giovannilineros@biogalfhomehealth.com?subject=BioLab%20Virtual%20—%20cotización%20licencia&body=Institución%20/%20editorial%3A%0ATipo%20de%20licencia%20de%20interés%3A%20universidad%20/%20editorial%20/%20individual%0ANúmero%20estimado%20de%20usuarios%3A%0A"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-600 px-6 text-base font-bold text-slate-950 transition hover:bg-cyan-500"
          >
            Pedir cotización
          </a>
          <Link
            href="/laboratorio/registro"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-600 px-6 text-base text-slate-300 transition hover:border-slate-400 hover:text-white"
          >
            Acceso con registro de sesión
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-800 px-4 py-8 text-center text-xs uppercase tracking-widest text-slate-500 sm:px-6">
        BioLab Virtual · BioGALF Home Health S.A.S. · Todos los derechos reservados
      </footer>
    </main>
  );
}

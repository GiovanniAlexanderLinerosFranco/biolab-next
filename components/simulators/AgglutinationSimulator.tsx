"use client";

import { useState } from 'react';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

type BloodProfile = {
  abo: 'A' | 'B' | 'AB' | 'O';
  rh: '+' | '-';
  antigens: Array<'A' | 'B' | 'D'>;
};

const bloodProfiles: Record<BloodType, BloodProfile> = {
  'A+': { abo: 'A', rh: '+', antigens: ['A', 'D'] },
  'A-': { abo: 'A', rh: '-', antigens: ['A'] },
  'B+': { abo: 'B', rh: '+', antigens: ['B', 'D'] },
  'B-': { abo: 'B', rh: '-', antigens: ['B'] },
  'AB+': { abo: 'AB', rh: '+', antigens: ['A', 'B', 'D'] },
  'AB-': { abo: 'AB', rh: '-', antigens: ['A', 'B'] },
  'O+': { abo: 'O', rh: '+', antigens: ['D'] },
  'O-': { abo: 'O', rh: '-', antigens: [] },
};

const aboCompatibility: Record<BloodProfile['abo'], BloodProfile['abo'][]> = {
  O: ['O', 'A', 'B', 'AB'],
  A: ['A', 'AB'],
  B: ['B', 'AB'],
  AB: ['AB'],
};

function getReaction(type: BloodType, antiserum: 'A' | 'B' | 'D') {
  return bloodProfiles[type].antigens.includes(antiserum);
}

function isCompatible(donor: BloodType, receptor: BloodType) {
  const donorProfile = bloodProfiles[donor];
  const receptorProfile = bloodProfiles[receptor];

  const aboSafe = aboCompatibility[donorProfile.abo].includes(receptorProfile.abo);
  const rhSafe = donorProfile.rh === '-' || receptorProfile.rh === '+';

  return aboSafe && rhSafe;
}

function buildRationale(donor: BloodType, receptor: BloodType) {
  const donorProfile = bloodProfiles[donor];
  const receptorProfile = bloodProfiles[receptor];
  const aboSafe = aboCompatibility[donorProfile.abo].includes(receptorProfile.abo);
  const rhSafe = donorProfile.rh === '-' || receptorProfile.rh === '+';

  if (aboSafe && rhSafe) {
    return 'La transfusion es compatible: los antigenos del donante no generan conflicto ABO/Rh para el receptor seleccionado.';
  }

  if (!aboSafe && !rhSafe) {
    return 'La transfusion es insegura por conflicto simultaneo en sistema ABO y factor Rh.';
  }

  if (!aboSafe) {
    return 'La transfusion es insegura por incompatibilidad ABO: el receptor puede reconocer como ajenos los antigenos del donante.';
  }

  return 'La transfusion es insegura por conflicto Rh: un donante Rh positivo no debe indicarse a un receptor Rh negativo.';
}

const antisera: Array<{ id: 'A' | 'B' | 'D'; label: string; accent: string }> = [
  { id: 'A', label: 'Anti-A', accent: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300' },
  { id: 'B', label: 'Anti-B', accent: 'border-amber-400/40 bg-amber-400/10 text-amber-300' },
  { id: 'D', label: 'Anti-D', accent: 'border-rose-400/40 bg-rose-400/10 text-rose-300' },
];

export default function AgglutinationSimulator() {
  const [donor, setDonor] = useState<BloodType>('O-');
  const [receptor, setReceptor] = useState<BloodType>('AB+');

  const compatibility = isCompatible(donor, receptor);
  const donorProfile = bloodProfiles[donor];
  const receptorProfile = bloodProfiles[receptor];

  return (
    <div className="my-8 rounded-3xl border border-slate-800 bg-black shadow-[0_0_60px_rgba(15,23,42,0.65)] overflow-hidden">
      <div className="border-b border-slate-800 bg-slate-950/90 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-black">Microlaboratorio inmunohematológico</p>
          <h3 className="mt-2 text-2xl font-black text-white">Simulador de aglutinación ABO/Rh</h3>
        </div>
        <span
          className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.25em] ${
            compatibility
              ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
              : 'border-rose-400/40 bg-rose-400/10 text-rose-300'
          }`}
        >
          {compatibility ? 'Compatible' : 'Incompatible'}
        </span>
      </div>

      <div className="grid gap-0 xl:grid-cols-[320px_1fr]">
        <aside className="border-r border-slate-800 bg-slate-950/70 p-6 space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Muestra donante</label>
            <select
              value={donor}
              onChange={(event) => setDonor(event.target.value as BloodType)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-cyan-300 outline-none"
            >
              {Object.keys(bloodProfiles).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Muestra receptora</label>
            <select
              value={receptor}
              onChange={(event) => setReceptor(event.target.value as BloodType)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-violet-300 outline-none"
            >
              {Object.keys(bloodProfiles).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-[0.25em] text-slate-300">Lectura del caso</h4>
            <p className="text-sm text-slate-400 leading-7">Compara el perfil antigénico del donante con la seguridad del receptor y anticipa si habrá aglutinación o riesgo transfusional.</p>
          </div>
        </aside>

        <section className="bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.10),transparent_35%),linear-gradient(180deg,#020617_0%,#020617_100%)] p-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-black">Tipificación del donante</p>
              <h4 className="mt-2 text-xl font-black text-white">Reacciones con antisueros</h4>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {antisera.map((antiserum) => {
                  const positive = getReaction(donor, antiserum.id);

                  return (
                    <div key={antiserum.id} className={`rounded-2xl border p-4 ${antiserum.accent}`}>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em]">{antiserum.label}</p>
                      <div className="mt-4 flex h-20 items-center justify-center rounded-full border border-white/10 bg-black/40 relative overflow-hidden">
                        <div className={`absolute inset-0 ${positive ? 'opacity-100' : 'opacity-20'} transition-opacity`}>
                          <div className="absolute top-4 left-5 w-3 h-3 rounded-full bg-white/80"></div>
                          <div className="absolute top-9 left-10 w-4 h-4 rounded-full bg-white/70"></div>
                          <div className="absolute bottom-5 right-8 w-3 h-3 rounded-full bg-white/80"></div>
                          {positive && (
                            <>
                              <div className="absolute top-7 right-12 w-6 h-6 rounded-full bg-white/90 blur-[1px]"></div>
                              <div className="absolute bottom-6 left-8 w-5 h-5 rounded-full bg-white/90 blur-[1px]"></div>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="mt-4 text-sm font-bold text-white">{positive ? 'Aglutinación positiva' : 'Sin aglutinación'}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 space-y-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-black">Síntesis del análisis</p>
                <h4 className="mt-2 text-xl font-black text-white">Decisión pretransfusional</h4>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Donante</p>
                  <p className="mt-2 text-2xl font-black text-white">{donor}</p>
                  <p className="mt-2 text-sm text-slate-300">Antígenos: {donorProfile.antigens.length > 0 ? donorProfile.antigens.join(', ') : 'ninguno detectable'}</p>
                </div>
                <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-300">Receptor</p>
                  <p className="mt-2 text-2xl font-black text-white">{receptor}</p>
                  <p className="mt-2 text-sm text-slate-300">Perfil esperado: ABO {receptorProfile.abo} / Rh {receptorProfile.rh}</p>
                </div>
              </div>

              <div className={`rounded-2xl border p-4 ${compatibility ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-rose-500/30 bg-rose-500/10'}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.25em] ${compatibility ? 'text-emerald-300' : 'text-rose-300'}`}>Veredicto</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{buildRationale(donor, receptor)}</p>
              </div>
            </article>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Clave ABO</p>
              <p className="mt-2 text-sm text-slate-300">O dona con amplitud, AB recibe con amplitud. A y B exigen compatibilidad específica por antígenos de membrana.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Clave Rh</p>
              <p className="mt-2 text-sm text-slate-300">Rh negativo puede donar a receptor Rh negativo o positivo; Rh positivo no debe indicarse a receptor Rh negativo.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Pregunta guía</p>
              <p className="mt-2 text-sm text-slate-300">¿Qué antígeno del donante explica la aglutinación observada y por qué ese hallazgo cambia la seguridad clínica?</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function Paso4_Muestras() {
  const [selected, setSelected] = useState<string | null>(null);

  const samples = [
    { id: 'virus', name: 'Virus (Bacteriófago)', file: 'virus.png' },
    { id: 'animal', name: 'Célula Animal', file: 'animal.png' },
    { id: 'vegetal', name: 'Célula Vegetal', file: 'vegetal.png' },
    { id: 'hongo', name: 'Hongo (Micelio)', file: 'hongo.png' },
    { id: 'protozoo', name: 'Protozoo', file: 'protozoo.png' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-4 space-y-6">
        <h2 className="text-white font-bold text-sm uppercase">Manual de Observación</h2>
        <p className="text-slate-400 text-xs leading-relaxed">Seleccione la muestra del inventario para cargarla en la platina virtual. Utilice el microscopio para ajustar el enfoque.</p>
        <div className="space-y-2">
          {samples.map(s => (
            <button key={s.id} onClick={() => setSelected(s.file)} className="w-full text-left p-3 border border-white/10 rounded text-xs hover:bg-white/5 transition">
              {s.name}
            </button>
          ))}
        </div>
      </div>
      <div className="md:col-span-8 h-[400px] relative border border-white/10 rounded-lg flex items-center justify-center bg-black/40">
        {selected ? (
          <Image src={`/assets/${selected}`} alt="Muestra" fill className="object-contain p-4" />
        ) : (
          <span className="text-slate-600 text-[10px] uppercase tracking-widest">Platina vacía: inserte una muestra</span>
        )}
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";

export default function PanelPrincipal() {
  const practicas = [
    { id: 1, title: "Bioseguridad y Microscopía", status: "Disponible", link: "/laboratorio/practica1" },
    { id: 2, title: "Osmolaridad y Tonicidad", status: "Disponible", link: "/laboratorio/practica2" },
    { id: 3, title: "Atlas Histológico", status: "Disponible", link: "/laboratorio/practica3" },
    { id: 4, title: "Tipificación ABO/Rh", status: "Disponible", link: "/laboratorio/practica4" },
    { id: 5, title: "Índice Mitótico", status: "Disponible", link: "/laboratorio/practica5" },
    { id: 6, title: "Extracción de ADN", status: "Disponible", link: "/laboratorio/practica6" },
    { id: 7, title: "Expresión Génica", status: "En desarrollo", link: "/laboratorio/practica7" },
    { id: 8, title: "Caso Integrador", status: "En desarrollo", link: "/laboratorio/practica8" },
  ];

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* FONDO DE LABORATORIO */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <div className="absolute inset-0 bg-slate-950/80 z-10 backdrop-blur-[2px]"></div>
        {/* Si no ha subido 'fondo-lab.jpg', el sistema mostrará un fondo oscuro elegante */}
        <img src="/assets/fondo-lab.jpg" alt="Laboratorio Biología Celular" className="w-full h-full object-cover z-0 opacity-40" />
      </div>

      <div className="relative z-20 w-full max-w-7xl">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
            BioLab Virtual <span className="text-cyan-500">USTA</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-light drop-shadow-md">
            Entorno de Simulación Avanzada en Biología Celular y Molecular para el sector salud.
          </p>
        </header>

        {/* REJILLA 4x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practicas.map((p) => (
            <Link key={p.id} href={p.status === "Disponible" ? p.link : "#"}>
              <div className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 h-full flex flex-col justify-between ${
                p.status === "Disponible" 
                  ? "bg-white/10 border-white/20 hover:bg-white/20 hover:-translate-y-2 cursor-pointer shadow-xl hover:shadow-cyan-500/20" 
                  : "bg-black/60 border-white/5 cursor-not-allowed opacity-70"
              }`}>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-5xl font-black text-white/10">{p.id}</span>
                  <span className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    p.status === "Disponible" 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" 
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                  }`}>
                    {p.status}
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white leading-tight">{p.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
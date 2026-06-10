"use client";
import React, { useState, useEffect } from 'react';

// 1. DEFINICIÓN DE LA INTERFAZ PARA TS
interface Muestra {
  id: string;
  nombre: string;
  imagen: string;
  targetMacro: number; 
  targetMicro: number;
  mision: string;
}

const muestrasMicroscopio: Muestra[] = [
  { 
    id: 'mucosa_oral', 
    nombre: 'Epitelio Escamoso (Mucosa Oral)', 
    imagen: "/assets/human oral mucosa squamous epithelial.png",
    targetMacro: 65, 
    targetMicro: 50,
    mision: 'Explore el campo para analizar la morfología de las células planas extendidas. Identifique los núcleos vesiculosos centrales y los pliegues característicos en las membranas citoplasmáticas.'
  },
  { 
    id: 'cebolla', 
    nombre: 'Células Epidérmicas (Allium cepa)', 
    imagen: "/assets/(onion) epidermal cells.png",
    targetMacro: 45, 
    targetMicro: 75,
    mision: 'Observe la disposición lineal y geométrica en "muro de ladrillo". Identifique la pared celular bien definida y la posición regular de los núcleos teñidos por el agente de contraste.'
  },
  { 
    id: 'sangre', 
    nombre: 'Frotis Sanguíneo (Tinción Wright)', 
    imagen: "/assets/human blood smear Wright's stain.png",
    targetMacro: 80, 
    targetMicro: 40,
    mision: 'Desplace el carro mecánico para diferenciar los abundantes eritrocitos anucleados y localice en el centro el leucocito polimorfonuclear (neutrófilo) con su característico núcleo lobulado.'
  }
];

export default function Paso3_Microscopio() {
  // 2. USO DE LA INTERFAZ EN EL ESTADO
  const [muestraActiva, setMuestraActiva] = useState<Muestra | null>(null);
  
  const [aumento, setAumento] = useState(4); 
  const [luzEncendida, setLuzEncendida] = useState(false);
  const [intensidadLuz, setIntensidadLuz] = useState(70); 
  const [aceiteAplicado, setAceiteAplicado] = useState(false); 

  const [macro, setMacro] = useState(0);
  const [micro, setMicro] = useState(0);
  
  const [carroX, setCarroX] = useState(50);
  const [carroY, setCarroY] = useState(50);

  const [blur, setBlur] = useState(20); 

  useEffect(() => {
    if (muestraActiva) {
      const distMacro = Math.abs(macro - muestraActiva.targetMacro);
      const distMicro = Math.abs(micro - muestraActiva.targetMicro);

      let totalBlur = (distMacro * 0.4) + (distMicro * 0.08);

      const tolerancia = aumento === 4 ? 5 : aumento === 10 ? 3 : aumento === 40 ? 2 : 1;

      if (distMacro <= tolerancia && distMicro <= tolerancia) {
        totalBlur = 0;
      }

      if (aumento === 100 && !aceiteAplicado) {
        totalBlur = totalBlur + 12; 
      }

      setBlur(Math.max(0, Math.min(totalBlur, 25)));
    } else {
      setBlur(20);
    }
  }, [macro, micro, muestraActiva, aumento, aceiteAplicado]);

  // 3. USO DE LA INTERFAZ EN LA FUNCIÓN
  const montarLamina = (muestra: Muestra) => {
    setMuestraActiva(muestra);
    setAumento(4); 
    setMacro(0);   
    setMicro(0);
    setCarroX(50); 
    setCarroY(50); 
    setAceiteAplicado(false); 
  };

  const obtenerEscalaVisual = (zoom: number) => {
    switch(zoom) {
      case 4: return 1;
      case 10: return 1.8;
      case 40: return 3.5;
      case 100: return 6;
      default: return 1;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-4 lg:p-6 text-slate-200">
      <div className="mb-6">
        <div className="text-teal-500 font-bold text-xs tracking-widest mb-2 uppercase">Estación 03</div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">Simulador de Microscopía Óptica y Exploración de Campo</h1>
        
        <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded-lg flex flex-col md:flex-row gap-4 w-full">
          <span className="text-2xl hidden md:block">🔬</span>
          <div className="text-blue-200 text-sm flex-1">
            <strong className="block text-blue-100 mb-1 text-base">Instrucciones de Operación Anátomo-Mecánica:</strong> 
            <ol className="list-decimal ml-4 space-y-1">
              <li>Active la **Iluminación** y calibre la luz óptima con el **Reóstato**.</li>
              <li>Monte una lámina del **Inventario**. Calibre el foco con **Macro/Micro**.</li>
              <li>Desplace el **Carro (XY)** para realizar el barrido del tejido histológico.</li>
              <li>Al indexar **100X**, recuerde aplicar el **Aceite de Cedro**.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl shadow-md flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-yellow-400 font-bold text-xs uppercase tracking-wider">Sistema de Iluminación</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-mono uppercase">{luzEncendida ? 'ON' : 'OFF'}</span>
                <button
                  onClick={() => setLuzEncendida(!luzEncendida)}
                  className={`w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner border border-slate-600 flex items-center px-0.5 ${
                    luzEncendida ? 'bg-yellow-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    luzEncendida ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex justify-between text-[11px] font-bold text-slate-300">
                <span>Reóstato (Intensidad Lumínica)</span>
                <span className="font-mono text-yellow-400">{intensidadLuz}%</span>
              </label>
              <input 
                type="range" min="10" max="100" 
                value={intensidadLuz} 
                onChange={(e) => setIntensidadLuz(Number(e.target.value))}
                disabled={!luzEncendida}
                className="w-full accent-yellow-500 cursor-pointer disabled:opacity-30" 
              />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl flex flex-col gap-3 shadow-md">
            <h3 className="text-amber-400 font-bold text-xs uppercase tracking-wider">Revólver Portaobjetivos</h3>
            <div className="grid grid-cols-4 gap-2">
              {[4, 10, 40, 100].map((obj) => (
                <button
                  key={obj}
                  disabled={!muestraActiva || !luzEncendida}
                  onClick={() => setAumento(obj)}
                  className={`py-2 rounded font-black text-xs border transition-all ${
                    aumento === obj 
                      ? 'bg-amber-600 border-amber-400 text-white shadow-sm' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  } ${(!muestraActiva || !luzEncendida) ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  {obj}X
                </button>
              ))}
            </div>

            {aumento === 100 && (
              <div className="mt-1 p-3 bg-amber-950/40 border border-amber-500/30 rounded-lg flex flex-col gap-2 animate-fadeIn">
                <p className="text-[11px] text-amber-300 leading-tight text-justify">
                  🔬 <strong>Medio de Inmersión Requerido:</strong> El objetivo de 100X necesita desplazar el aire para concentrar el haz de luz refractado por el condensador.
                </p>
                <button
                  onClick={() => setAceiteAplicado(true)}
                  disabled={aceiteAplicado}
                  className={`w-full py-1.5 rounded text-xs font-bold transition-all border ${
                    aceiteAplicado 
                      ? 'bg-teal-900/40 border-teal-500 text-teal-400 cursor-default'
                      : 'bg-amber-600 border-amber-500 text-white hover:bg-amber-500'
                  }`}
                >
                  {aceiteAplicado ? '🫗 Aceite de Cedro Aplicado' : '💧 Aplicar Aceite de Cedro'}
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl shadow-md">
            <h3 className="text-teal-400 font-bold text-xs uppercase tracking-wider mb-3">1. Inventario de Placas</h3>
            <div className="flex flex-col gap-2 mb-4">
              {muestrasMicroscopio.map((m) => (
                <button
                  key={m.id}
                  onClick={() => montarLamina(m)}
                  className={`p-2.5 rounded border text-left text-xs font-bold transition-all ${
                    muestraActiva?.id === m.id 
                      ? 'bg-teal-900/40 border-teal-500 text-white shadow-sm' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {m.nombre}
                </button>
              ))}
            </div>
            
            {muestraActiva && (
              <div className="border-l-4 border-amber-500 bg-amber-900/20 p-3 rounded-r">
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-wider mb-1">Misión de Exploración:</p>
                <p className="text-slate-300 text-xs italic leading-relaxed text-justify">{muestraActiva.mision}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl shadow-md">
              <h3 className="text-blue-400 font-bold text-[10px] uppercase tracking-wider mb-4">Carro Mecánico</h3>
              <div className="mb-4">
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">Eje X <span>{carroX}</span></label>
                <input type="range" min="20" max="80" value={carroX} onChange={(e) => setCarroX(Number(e.target.value))} disabled={!muestraActiva} className="w-full accent-blue-500" />
              </div>
              <div>
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">Eje Y <span>{carroY}</span></label>
                <input type="range" min="20" max="80" value={carroY} onChange={(e) => setCarroY(Number(e.target.value))} disabled={!muestraActiva} className="w-full accent-blue-400" />
              </div>
            </div>

            <div className="flex-1 bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl shadow-md">
              <h3 className="text-rose-400 font-bold text-[10px] uppercase tracking-wider mb-4">Enfoque Mecánico</h3>
              <div className="mb-4">
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">Macro <span>{macro}</span></label>
                <input type="range" min="0" max="100" value={macro} onChange={(e) => setMacro(Number(e.target.value))} disabled={!muestraActiva} className="w-full accent-rose-500" />
              </div>
              <div>
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">Micro <span>{micro}</span></label>
                <input type="range" min="0" max="100" value={micro} onChange={(e) => setMicro(Number(e.target.value))} disabled={!muestraActiva} className="w-full accent-teal-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black border-[10px] border-slate-800 rounded-3xl p-4 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden min-h-[460px]">
          <div className="absolute top-4 left-4 w-28 h-28 bg-slate-900 rounded-lg border-2 border-slate-700 shadow-lg z-20 flex items-center justify-center overflow-hidden">
            <span className="absolute top-1 left-2 text-[8px] text-slate-500 font-bold uppercase tracking-widest">Platina</span>
            <div 
              className="absolute w-5 h-5 rounded-full transition-all duration-200"
              style={{
                background: luzEncendida ? `rgba(254, 240, 138, ${intensidadLuz / 100})` : 'rgba(30, 41, 59, 1)',
                filter: luzEncendida ? 'blur(2px)' : 'none',
                boxShadow: luzEncendida ? `0 0 ${intensidadLuz * 0.2}px rgba(234, 179, 8, 0.6)` : 'none'
              }}
            ></div>
            
            {muestraActiva && (
              <div 
                className={`absolute w-16 h-8 border rounded-sm flex items-center justify-center transition-all duration-100 ease-linear ${
                  luzEncendida ? 'bg-blue-300/20 border-blue-400/60 backdrop-blur-sm' : 'bg-slate-700/50 border-slate-600'
                }`}
                style={{ transform: `translate(${(carroX - 50) * -0.7}px, ${(carroY - 50) * 0.7}px)` }}
              >
                <div className={`w-6 h-4 border-l border-r ${luzEncendida ? 'border-blue-500/40' : 'border-slate-500'}`}></div>
              </div>
            )}
          </div>

          <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-4 border-black bg-slate-950 flex items-center justify-center overflow-hidden relative shadow-[inset_0_0_80px_rgba(0,0,0,1)] bg-no-repeat">
            {!luzEncendida && (
              <div className="absolute inset-0 bg-black shadow-inner z-10 flex items-center justify-center">
                <span className="text-slate-800 text-[10px] font-bold uppercase tracking-widest font-mono">Sistema sin Iluminación</span>
              </div>
            )}

            {luzEncendida && !muestraActiva && (
              <div 
                className="absolute inset-0 z-0 flex items-center justify-center transition-all duration-200"
                style={{
                  background: `radial-gradient(circle, rgba(255,255,255,${intensidadLuz/100}) 0%, rgba(200,200,190,${(intensidadLuz/100)*0.6}) 100%)`
                }}
              >
                <span className="text-slate-500/60 text-xs font-bold uppercase tracking-widest font-mono mt-12">Campo Lumínico Vacío</span>
              </div>
            )}

            {luzEncendida && muestraActiva && (
              <div 
                className="w-[180%] h-[180%] flex items-center justify-center transition-all duration-300 ease-out absolute z-0"
                style={{
                  transform: `scale(${obtenerEscalaVisual(aumento)})`,
                  filter: `blur(${blur}px) brightness(${(intensidadLuz / 100) * (blur === 0 ? 1.05 : 0.88)})`
                }}
              >
                <img 
                  src={muestraActiva.imagen} 
                  alt="Placa Histológica"
                  className="w-full h-full object-cover opacity-95 transition-transform duration-100 ease-linear"
                  style={{ 
                    transform: `translate(${(carroX - 50) * -1.8}%, ${(carroY - 50) * -1.8}%)`
                  }}
                />
              </div>
            )}

            {luzEncendida && (
              <>
                <div className="absolute inset-0 pointer-events-none border-t border-slate-900/20 w-full top-1/2 z-20"></div>
                <div className="absolute inset-0 pointer-events-none border-l border-slate-900/20 h-full left-1/2 z-20"></div>
                <div className="absolute top-1/2 left-1/2 w-[1px] h-16 bg-black origin-bottom -rotate-45 -translate-x-1/2 -translate-y-full opacity-50 pointer-events-none z-20"></div>
              </>
            )}
            
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.85)_100%)] pointer-events-none rounded-full z-30"></div>
          </div>

          {luzEncendida && muestraActiva && (
            <div className="absolute bottom-4 right-4 bg-slate-900/90 px-3 py-1.5 rounded text-xs font-mono border border-slate-700 shadow-lg z-40 flex flex-col items-end gap-0.5">
              <span className={blur === 0 ? 'text-teal-400 font-black' : 'text-rose-400 font-bold'}>
                {blur === 0 ? 'LÁMINA ENFOCADA' : 'SISTEMA DESENFOCADO'}
              </span>
              {aumento === 100 && !aceiteAplicado && (
                <span className="text-[9px] text-amber-400 animate-pulse font-bold tracking-tight">
                  ⚠️ REFRACCIÓN DE AIRE (FALTA ACEITE DE CEDRO)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
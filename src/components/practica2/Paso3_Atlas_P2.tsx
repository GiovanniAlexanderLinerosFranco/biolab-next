/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.2.3
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * ESTACIÓN 03 (PRÁCTICA 2) - VISOR DE MICROSCOPÍA HISTOLÓGICA - CORREGIDO
 * ============================================================================
 */

"use client";
import React, { useState, useEffect } from 'react';

interface MuestraHistologica {
  id: string;
  nombre: string;
  imagen: string;
  targetMacro: number; 
  targetMicro: number;
  mision: string;
}

interface Paso3Props {
  estudianteNombre: string;
}

const muestrasPractica2: MuestraHistologica[] = [
  { 
    id: 'epitelial', 
    nombre: 'Tejido Epitelial (Epitelio cilíndrico simple teñido)', 
    imagen: "/assets/tejido_epitelial.png",
    targetMacro: 55, 
    targetMicro: 45,
    mision: 'Identifique la polaridad celular, la lámina basal y la disposición regular de los núcleos ovoides basales. Vital para comprender membranas mucosas en Odontología.'
  },
  { 
    id: 'conectivo', 
    nombre: 'Tejido Conectivo Laxo (Matriz extracelular y fibroblastos)', 
    imagen: "/assets/tejido_conectivo.png",
    targetMacro: 40, 
    targetMicro: 65,
    mision: 'Analice la red tridimensional de fibras de colágeno y elásticas. Localice fibroblastos residentes. Esqueleto fundamental de los tejidos de soporte estomatológicos.'
  },
  { 
    id: 'muscular', 
    nombre: 'Tejido Muscular Estriado Esquelético (Corte Longitudinal)', 
    imagen: "/assets/tejido_muscular.png",
    targetMacro: 70, 
    targetMicro: 50,
    mision: 'Observe las estriaciones transversales características (bandas A e I) y la posición periférica de los múltiples núcleos celulares.'
  },
  { 
    id: 'nervioso', 
    nombre: 'Tejido Nervioso Central (Soma Neuronal y Neuroglía)', 
    imagen: "/assets/tejido_nervioso.png",
    targetMacro: 60, 
    targetMicro: 55,
    mision: 'Identifique neuronas multipolares, el cono axónico, los corpúsculos de Nissl en el soma y los pequeños núcleos de la glía circundante.'
  }
];

export default function Paso3_Atlas_P2({ estudianteNombre }: Paso3Props) {
  const [muestraActiva, setMuestraActiva] = useState<MuestraHistologica | null>(null);
  const [aumento, setAumento] = useState<number>(4); 
  const [encendido, setEncendido] = useState<boolean>(false);
  const [intensidadLuz, setIntensidadLuz] = useState<number>(70); 
  const [aceiteAplicado, setAceiteAplicado] = useState<boolean>(false); 

  // Mandos Coaxiales de Enfoque y Platina
  const [macro, setMacro] = useState<number>(0);
  const [micro, setMicro] = useState<number>(0);
  const [carroX, setCarroX] = useState<number>(50);
  const [carroY, setCarroY] = useState<number>(50);

  const [blur, setBlur] = useState<number>(20); 

  // Algoritmo Óptico de Difracción y Enfoque Dinámico
  useEffect(() => {
    if (muestraActiva && encendido) {
      const distMacro = Math.abs(macro - muestraActiva.targetMacro);
      const distMicro = Math.abs(micro - muestraActiva.targetMicro);

      let totalBlur = (distMacro * 0.45) + (distMicro * 0.09);
      const tolerancia = aumento === 4 ? 6 : aumento === 10 ? 4 : aumento === 40 ? 2 : 1;

      if (distMacro <= tolerancia && distMicro <= tolerancia) {
        totalBlur = 0;
      }

      if (aumento === 100 && !aceiteAplicado) {
        totalBlur += 14; 
      }

      setBlur(Math.max(0, Math.min(totalBlur, 25)));
    } else {
      setBlur(20);
    }
  }, [macro, micro, muestraActiva, aumento, aceiteAplicado, encendido]);

  const montarLamina = (muestra: MuestraHistologica) => {
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
      case 4: return 1.1;
      case 10: return 2.0;
      case 40: return 4.0;
      case 100: return 6.8;
      default: return 1.1;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-4 lg:p-6 text-slate-200 animate-fadeIn">
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-widest mb-2 uppercase">Estación 03 - Atlas Virtual</div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
          Simulación Mecánica y Diagnóstico Histopatológico de Tejidos Fundamentales
        </h1>
        
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 w-full">
          <span className="text-2xl hidden md:block">💡</span>
          <div className="text-slate-400 text-xs flex-1 leading-relaxed">
            <strong className="block text-cyan-400 mb-1 text-sm">Guía de Operación Autónoma y Bioseguridad:</strong> 
            <ol className="list-decimal ml-4 space-y-1">
              <li>Encienda el estativo utilizando el interruptor central y calibre la emisión lumínica con el reóstato.</li>
              <li>Indexe una lámina portaobjetos del inventario de tejidos y use los mandos coaxiales de la platina mecánica (Ejes X / Y).</li>
              <li>Consiga el foco preciso interactuando secuencialmente con los macrométricos y micrométricos.</li>
              <li>Para microscopía de inmersión (**100X**), aplique una gota de aceite de cedro para evitar la refracción destructiva del haz.</li>
            </ol>
          </div>
        </div>
      </div>

      {!estudianteNombre && (
        <div className="bg-amber-950/40 border border-amber-500/30 p-6 rounded-2xl text-center mb-6">
          <span className="text-amber-400 text-xs font-black uppercase tracking-wider block">⚠️ SISTEMA INTEGRADO BLOQUEADO</span>
          <p className="text-xs text-slate-400 mt-1">Por favor complete la verificación de Bioseguridad en la Estación 01 para energizar los estativos del microscopio óptico.</p>
        </div>
      )}

      <div className={`flex flex-col lg:flex-row gap-8 ${!estudianteNombre ? 'opacity-20 pointer-events-none' : ''}`}>
        
        {/* PANEL DE MANDOS COAXIALES */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          
          {/* CONTROL DE ENERGÍA Y LUZ */}
          <div className="bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl shadow-md flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-amber-400 font-bold text-xs uppercase tracking-wider">Sub-platina / Iluminación</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-mono">{encendido ? 'ON' : 'OFF'}</span>
                <button
                  onClick={() => { setEncendido(!encendido); if(encendido) setIntensidadLuz(0); else setIntensidadLuz(70); }}
                  className={`w-12 h-6 rounded-full relative transition-all duration-300 border border-slate-600 flex items-center px-0.5 ${
                    encendido ? 'bg-amber-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    encendido ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex justify-between text-[11px] font-bold text-slate-300">
                <span>Reóstato (Potenciómetro de Voltaje)</span>
                <span className="font-mono text-amber-400">{intensidadLuz}%</span>
              </label>
              <input 
                type="range" min="10" max="100" 
                value={intensidadLuz} 
                onChange={(e) => setIntensidadLuz(Number(e.target.value))}
                disabled={!encendido}
                className="w-full accent-amber-500 cursor-pointer disabled:opacity-30" 
              />
            </div>
          </div>

          {/* REVÓLVER PORTAOBJETIVOS */}
          <div className="bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl flex flex-col gap-3 shadow-md">
            <h3 className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Revólver Óptico</h3>
            <div className="grid grid-cols-4 gap-2">
              {[4, 10, 40, 100].map((obj) => (
                <button
                  key={obj}
                  disabled={!muestraActiva || !encendido}
                  onClick={() => setAumento(obj)}
                  className={`py-2 rounded font-black text-xs border transition-all ${
                    aumento === obj 
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-sm' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  } ${(!muestraActiva || !encendido) ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  {obj}X
                </button>
              ))}
            </div>

            {aumento === 100 && (
              <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-lg flex flex-col gap-2 animate-fadeIn">
                <p className="text-[11px] text-amber-300 leading-relaxed text-justify">
                  🔬 <strong>Inmersión Requerida:</strong> Para evitar la pérdida de luz por refracción en el aire, aplique aceite de cedro sobre el cubreobjetos.
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
                  {aceiteAplicado ? '🫗 Inmersión Preparada' : '💧 Colocar Aceite de Cedro'}
                </button>
              </div>
            )}
          </div>

          {/* INVENTARIO DE LÁMINAS */}
          <div className="bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl shadow-md">
            <h3 className="text-teal-400 font-bold text-xs uppercase tracking-wider mb-3">2. Litoteca Histológica (Muestras)</h3>
            <div className="flex flex-col gap-2 mb-4">
              {muestrasPractica2.map((m) => (
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
              <div className="border-l-4 border-cyan-500 bg-cyan-950/20 p-3 rounded-r">
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-wider mb-1">Misión de Diagnóstico:</p>
                {/* CORREGIDO: Removido el token inválido 'misiones:' */}
                <p className="text-slate-300 text-xs italic leading-relaxed text-justify">{muestraActiva.mision}</p>
              </div>
            )}
          </div>

          {/* DESPLAZAMIENTO Y FOCO COAXIAL */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl shadow-md">
              <h3 className="text-blue-400 font-bold text-[10px] uppercase tracking-wider mb-3">Tornillos de la Platina (XY)</h3>
              <div className="mb-3">
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">Eje X Transversal <span>{carroX}mm</span></label>
                <input type="range" min="20" max="80" value={carroX} onChange={(e) => setCarroX(Number(e.target.value))} disabled={!muestraActiva} className="w-full accent-blue-500" />
              </div>
              <div>
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">Eje Y Vertical <span>{carroY}mm</span></label>
                <input type="range" min="20" max="80" value={carroY} onChange={(e) => setCarroY(Number(e.target.value))} disabled={!muestraActiva} className="w-full accent-blue-400" />
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/50 p-4 rounded-xl shadow-md">
              <h3 className="text-rose-400 font-bold text-[10px] uppercase tracking-wider mb-3">Enfoque Mecánico Coaxial</h3>
              <div className="mb-3">
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">Tornillo Macrométrico <span>{macro}</span></label>
                <input type="range" min="0" max="100" value={macro} onChange={(e) => setMacro(Number(e.target.value))} disabled={!muestraActiva} className="w-full accent-rose-500" />
              </div>
              <div>
                <label className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">Tornillo Micrométrico <span>{micro}</span></label>
                <input type="range" min="0" max="100" value={micro} onChange={(e) => setMicro(Number(e.target.value))} disabled={!muestraActiva} className="w-full accent-teal-500" />
              </div>
            </div>
          </div>

        </div>

        {/* CAMPO DE VISUALIZACIÓN MICROSCÓPICA (OCULAR) */}
        <div className="flex-1 bg-black border-[12px] border-slate-900 rounded-3xl p-4 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden min-h-[480px]">
          
          {/* Mini-Platina mecánica */}
          <div className="absolute top-4 left-4 w-28 h-28 bg-slate-950 rounded-lg border border-slate-800 shadow-lg z-20 flex items-center justify-center overflow-hidden">
            <span className="absolute top-1 left-2 text-[8px] text-slate-600 font-bold uppercase tracking-widest">Estativo</span>
            <div 
              className="absolute w-4 h-4 rounded-full transition-all duration-200"
              style={{
                background: encendido ? `rgba(253, 224, 71, ${intensidadLuz / 100})` : 'rgba(15, 23, 42, 1)',
                filter: encendido ? 'blur(3px)' : 'none'
              }}
            ></div>
            {muestraActiva && (
              <div 
                className={`absolute w-14 h-7 border rounded-sm transition-all duration-100 ease-linear ${
                  encendido ? 'bg-cyan-400/20 border-cyan-500/50 backdrop-blur-sm' : 'bg-slate-800 border-slate-700'
                }`}
                style={{ transform: `translate(${(carroX - 50) * -0.6}px, ${(carroY - 50) * 0.6}px)` }}
              />
            )}
          </div>

          {/* Ocular circular */}
          <div className="w-[290px] h-[290px] md:w-[440px] md:h-[440px] rounded-full border-4 border-slate-950 bg-slate-950 flex items-center justify-center overflow-hidden relative shadow-[inset_0_0_60px_rgba(0,0,0,1)]">
            
            {!encendido && (
              <div className="absolute inset-0 bg-black z-10 flex items-center justify-center">
                <span className="text-slate-800 text-[10px] font-bold uppercase tracking-widest font-mono">Luz Apagada (Falta Energía)</span>
              </div>
            )}

            {encendido && !muestraActiva && (
              <div 
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, rgba(255,254,245,${intensidadLuz/100}) 0%, rgba(215,210,195,${(intensidadLuz/100)*0.5}) 100%)`
                }}
              >
                <span className="text-slate-500/40 text-[9px] font-bold uppercase tracking-widest font-mono mt-16">Estativo vacío sin muestra</span>
              </div>
            )}

            {encendido && muestraActiva && (
              <div 
                className="w-[175%] h-[175%] flex items-center justify-center transition-all duration-300 ease-out absolute z-0"
                style={{
                  transform: `scale(${obtenerEscalaVisual(aumento)})`,
                  filter: `blur(${blur}px) brightness(${(intensidadLuz / 100) * (blur === 0 ? 1.02 : 0.85)})`
                }}
              >
                <img 
                  src={muestraActiva.imagen} 
                  alt="Lámina Histológica Histología"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-100 ease-linear"
                  style={{ 
                    transform: `translate(${(carroX - 50) * -1.6}%, ${(carroY - 50) * -1.6}%)`
                  }}
                />
              </div>
            )}

            {/* Retícula microscópica micrométrica grabada */}
            {encendido && (
              <>
                <div className="absolute inset-0 pointer-events-none border-t border-slate-950/20 w-full top-1/2 z-20"></div>
                <div className="absolute inset-0 pointer-events-none border-l border-slate-950/20 h-full left-1/2 z-20"></div>
                <div className="absolute top-1/2 left-1/2 w-[1px] h-12 bg-black origin-bottom -rotate-45 -translate-x-1/2 -translate-y-full opacity-40 pointer-events-none z-20"></div>
              </>
            )}
            
            {/* Sombra de contorno esférico óptico */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_52%,rgba(0,0,0,0.9)_100%)] pointer-events-none rounded-full z-30"></div>
          </div>

          {/* DISPLAY DE ESTADO EN FOCO */}
          {encendido && muestraActiva && (
            <div className="absolute bottom-4 right-4 bg-slate-900/95 px-3 py-1.5 rounded text-[10px] font-mono border border-slate-800 shadow-xl z-40 flex flex-col items-end gap-0.5">
              <span className={blur === 0 ? 'text-teal-400 font-black' : 'text-rose-400 font-bold'}>
                {blur === 0 ? '✓ RECONOCIMIENTO OPTIMIZADO' : '❌ TEJIDO DESENFOCADO'}
              </span>
              {aumento === 100 && !aceiteAplicado && (
                <span className="text-[9px] text-amber-400 animate-pulse font-bold tracking-tight">
                  ⚠️ CAMPO CIEGO: REFRACCIÓN CRÍTICA (FALTA ACEITE)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
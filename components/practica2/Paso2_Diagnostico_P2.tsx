/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.3.2
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * HISTOLOGY ENGINE REFACTOR: RESOLUCIÓN STRICT TYPE EN PREV STATE (ERROR 7006)
 * ============================================================================
 */

"use client";
import React, { useState } from 'react';

interface TejidoEstructura {
  id: string; 
  nombre: string;
  subtipos: string;
  imagen: string;
  descripcion: string;
  criteriosDiferenciacion: string[];
  desafio: string;
  opciones: { id: string; texto: string }[];
  pathCorrecto: string;
}

const tejidosDatos: TejidoEstructura[] = [
  {
    id: 'epitelial',
    nombre: 'Tejido Epitelial Especializado',
    subtipos: 'Estratificado Plano (Queratinizado / No Queratinizado), Simple, Seudoestratificado, Glandular',
    imagen: '/assets/tejido_epitelial.png',
    descripcion: 'Formado por células poliédricas cohesionadas con matriz extracelular casi nula y uniones intercelulares fuertes (desmosomas, uniones estrechas). Al ser avascular, depende de la difusión basal desde el tejido conectivo. En Odontología, la mucosa de revestimiento (estratificado plano no queratinizado) aporta flexibilidad, mientras que la masticatoria (queratinizado en encía y paladar) resiste la fricción bacteriana y mecánica. En Optometría, el epitelio anterior corneal actúa como barrera hidrofóbica selectiva, y el tejido glandular exocrino (ácinos de glándulas salivales) secreta activamente enzimas y mucinas.',
    criteriosDiferenciacion: [
      "Alta densidad celular con nula matriz extracelular intercelular.",
      "Polaridad morfológica definida (región apical, lateral y membrana basal).",
      "Clasificación estricta por morfología (plano, cúbico, cilíndrico) y estratos (simple o estratificado)."
    ],
    desafio: 'Durante la observación microscópica de un corte de córnea humana, identifica un estrato externo con múltiples hileras células adosadas que carecen de vasos sanguíneos, seguido geométricamente por capas internas transparentes. ¿Cómo clasifica y argumenta la función del estrato más externo?',
    opciones: [
      { id: 'A', texto: 'Epitelio simple cilíndrico ciliado, especializado en el transporte activo de fluidos y lubricación.' },
      { id: 'B', texto: 'Epitelio estratificado plano no queratinizado, estructurado como barrera de protección hidrofóbica frente a la abrasión mecánica e invasión microbiana.' },
      { id: 'C', texto: 'Tejido conectivo laxo con alta proporción de sustancia fundamental amorfa y capilares fenestrados.' }
    ],
    pathCorrecto: 'B'
  },
  {
    id: 'conectivo_laxodenso',
    nombre: 'Tejido Conectivo No Especializado',
    subtipos: 'Laxo, Denso Regular (Modelado), Denso Irregular (No Modelado)',
    imagen: '/assets/tejido_conectivo.png',
    descripcion: 'Tejido de soporte mecánico, metabólico y nutricional constituido por células separadas e inmersas en una abundante matriz extracelular (MEC). Los fibroblastos sintetizan las fibras de colágeno y elastina. El tejido laxo predomina bajo los epitelios para nutrición. El denso irregular resiste fuerzas multidireccionales en la dermis profunda y cápsulas orgánicas, mientras que el denso regular (modelado) organiza sus fibras colágenas en paralelo con precisión matemática para otorgar resistencia en tendones, el ligamento periodontal (fijación al hueso alveolar) y el estroma corneal (garantizando transparencia al paso de la luz).',
    criteriosDiferenciacion: [
      "Predominio de matriz extracelular (sustancia fundamental amorfa y fibras proteicas) sobre el componente celular.",
      "Presencia de fibroblastos fusiformes u ovalados dispersos en el espacio intercelular.",
      "Alta vascularización y presencia constante de capilares sanguíneos (excepto en el estroma corneal)."
    ],
    desafio: 'Al analizar el ligamento periodontal que une la pieza dental al hueso alveolar, observa haces compactos de colágeno ordenados en hileras paralelas y fibroblastos alargados alineados. ¿Qué subtipo tisular específico está evaluando?',
    opciones: [
      { id: 'A', texto: 'Tejido conectivo laxo con alta tasa de células inmunitarias residentes y escasas fibras delgadas.' },
      { id: 'B', texto: 'Tejido conectivo denso regular (modelado), diseñado para resistir fuerzas oclusales unidireccionales y tracción mecánica estructural.' },
      { id: 'C', texto: 'Tejido epitelial estratificado modificado para calcificación tisular.' }
    ],
    pathCorrecto: 'B'
  },
  {
    id: 'conectivo_sangre',
    nombre: 'Tejido Conectivo Especializado: Sistema Sanguíneo',
    subtipos: 'Eritrocitos, Leucocitos (Granulocitos y Agranulocitos), Plaquetas',
    imagen: '/assets/human blood smear Wright\'s stain.png',
    descripcion: 'Variedad altamente especializada de tejido conectivo cuya matriz extracelular es líquida (plasma sanguíneo). Un frotis de sangre periférica resuelto a 100x revela tres componentes formes esenciales: Eritrocitos (anucleados, discos bicóncavos acidófilos por hemoglobina), Plaquetas (fragmentos citoplasmáticos trombocíticos anucleados) y Leucocitos. Estos últimos se dividen en Granulocitos (Neutrófilos multilobulados de defensa bacteriana, Eosinófilos bilobulados de gránulos naranja-rojizos para parásitos/alergias, y Basófilos de gránulos densos) y Agranulocitos (Linfocitos de núcleo esférico masivo e inmunidad adaptativa, y Monocitos con núcleo arriñonado de linaje fagocítico).',
    criteriosDiferenciacion: [
      "Matriz extracelular completamente líquida carente de fibras de colágeno fibrilares en condiciones normales.",
      "Eritrocitos dominantes en el campo microscópico (anucleados, centro pálido por perfil bicóncavo).",
      "Lectura leucocitaria evidente basada en la morfología del núcleo y la granulación citoplasmática."
    ],
    desafio: 'En la rotación guiada de citoarquitectura sobre un frotis de sangre periférica teñido con Wright, el estudiante identifica una célula inmunitaria grande con un núcleo denso esférico que ocupa casi la totalidad del citoplasma, sin gránulos visibles. ¿De qué componente celular se trata y cuál es su función?',
    opciones: [
      { id: 'A', texto: 'Neutrófilo segmentado, encargado de la fagocitosis primaria de bacterias en infecciones agudas.' },
      { id: 'B', texto: 'Linfocito, responsable de la respuesta inmunitaria adaptativa, celular y humoral del organismo.' },
      { id: 'C', texto: 'Eritrocito maduro, especializado exclusivamente en el intercambio y transporte de gases respiratorios.' }
    ],
    pathCorrecto: 'B'
  },
  {
    id: 'muscular',
    nombre: 'Tejido Muscular Comparativo',
    subtipos: 'Estriado Esquelético, Estriado Cardíaco, Liso (Visceral)',
    imagen: '/assets/tejido_muscular.png',
    descripcion: 'Constituido por células o fibras elongadas especializadas en la conversión de energía química (ATP) en movimiento mecánico mediante filamentos contráctiles de actina y miosina. El músculo esquelético presenta fibras musculares cilíndricas extraordinariamente largas, estriaciones transversales organizadas (sarcómeros) y múltiples núcleos periféricos; controla movimientos voluntarios como la masticación, el habla y la deglución. El músculo cardíaco muestra ramificaciones bicornes, un núcleo central y discos intercalares de acoplamiento eléctrico. El músculo liso presenta células fusiformes, mononucleadas y carece de estriaciones, regulando movimientos involuntarios en vasos sanguíneos y órganos huecos.',
    criteriosDiferenciacion: [
      "Presencia o ausencia de estriaciones transversales macroestructurales nítidas (sarcómeros).",
      "Número y posición espacial de los núcleos celulares (múltiples periféricos vs único central).",
      "Morfología de la fibra: cilíndrica lineal en paralelo, ramificada con discos, o fusiforme aislada."
    ],
    desafio: 'Evaluando un preparado histológico de los músculos masticatorios del sistema estomatognático, observa células cilíndricas paralelas con un patrón bandeado regular de estrías claras y oscuras, y núcleos adosados estrictamente contra la membrana celular. ¿Cuál es la clasificación correcta de este tejido?',
    opciones: [
      { id: 'A', texto: 'Tejido muscular liso, especializado en contracciones lentas, sostenidas e involuntarias de las vísceras.' },
      { id: 'B', texto: 'Tejido muscular estriado esquelético, estructurado para contracciones rápidas, potentes y de control voluntario.' },
      { id: 'C', texto: 'Tejido conectivo especializado con propiedades contráctiles de matriz colágena.' }
    ],
    pathCorrecto: 'B'
  },
  {
    id: 'nervioso',
    nombre: 'Tejido Nervioso y Redes de Conducción',
    subtipos: 'Neuronas (Somas y Axones), Neuroglia (Astrocitos, Oligodendrocitos, Schwann, Microglía)',
    imagen: '/assets/tejido_nervioso.png',
    descripcion: 'Altamente especializado en la recepción, procesamiento, integración y transmisión de estímulos bioeléctricos y químicos. Está integrado por dos poblaciones celulares fundamentales: las Neuronas, células excitables que presentan un soma o cuerpo celular de morfología estrellada o piramidal con prolongaciones ramificadas (dendritas aferentes y un axón eferente); y las Células Gliales o Neuroglía (astrocitos, oligodendrocitos, microglía, células de Schwann), que superan en número a las neuronas y aseguran el soporte metabólico, aislamiento de mielina, nutrición y protección del microambiente nervioso. Forma estructuras de alta complejidad como la pulpa dental (nocicepción) y la retina ocular (fototransducción).',
    criteriosDiferenciacion: [
      "Somas neuronales prominentes con abundantes prolongaciones citoplasmáticas dendríticas o axónicas.",
      "Núcleos de aspecto vesiculoso grandes con nucléolo evidente ('ojo de búho') en los cuerpos neuronales.",
      "Abundancia de núcleos pequeños correspondientes a la neuroglía de soporte circundante."
    ],
    desafio: 'Al examinar la citoarquitectura de la retina, el evaluador identifica una red altamente ramificada donde células especializadas transforman los estímulos lumínicos en señales nerviosas, apoyadas metabólicamente por células circundantes más pequeñas. ¿Qué componentes celulares ejecutan esta sinergia de integración?',
    opciones: [
      { id: 'A', texto: 'Las células gliales generan los potenciales de acción y las neuronas actúan como barrera estructural pasiva.' },
      { id: 'B', texto: 'Las neuronas (fotorreceptores y ganglionares) procesan y conducen los impulsos eléctricos, mientras que las células gliales mantienen la homeostasis metabólica y el soporte.' },
      { id: 'C', texto: 'Los miocitos retinianos coordinan la conducción a través de uniones en hendidura de matriz extracelular.' }
    ],
    pathCorrecto: 'B'
  }
];

interface Paso2Props {
  estudianteNombre: string;
  respuestasDesafios: Record<string, string>;
  setRespuestasDesafios: React.Dispatch<React.SetStateAction<Record<string, string>>>; // Tipado indexado limpio para heredar de la página
}

export default function Paso2_Diagnostico_P2({
  estudianteNombre,
  respuestasDesafios,
  setRespuestasDesafios
}: Paso2Props) {
  const [activo, setActivo] = useState(0);
  const tejidoActual = tejidosDatos[activo];

  const prevenirFraude = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
    alert("🛡️ Medida Académica: Para consolidar su aprendizaje individual, no se permite copiar ni pegar contenidos externos.");
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-2" onPaste={prevenirFraude} onDrop={prevenirFraude}>
      
      <div className="mb-6">
        <div className="text-cyan-500 font-bold text-xs tracking-[0.2em] mb-1 uppercase font-mono">Estación 02</div>
        <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Criterios de Diferenciación y Caracterización Histológica Global</h1>
        <p className="text-slate-400 text-xs md:text-sm">Estudie con rigor metodológico los cuatro tejidos fundamentales y los linajes especializados del cuerpo humano para la validación de la rúbrica automatizada.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* MENÚ DE RECONOCIMIENTO TAXONÓMICO */}
        <div className="flex flex-col gap-2 w-full lg:w-1/4">
          {tejidosDatos.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActivo(index)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-300 text-xs font-bold shadow-md ${
                activo === index 
                  ? 'border-cyan-500 bg-cyan-950/30 text-white ring-2 ring-cyan-500/20' 
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="truncate pr-2">{item.nombre}</span>
                  {respuestasDesafios[item.id] && <span className="text-teal-400 font-black font-mono">✓</span>}
                </div>
                <span className="text-[9px] text-slate-500 font-normal line-clamp-1">{item.id === 'conectivo_sangre' ? 'Sistema Sanguíneo' : 'Subtipos e Inferencia'}</span>
              </div>
            </button>
          ))}
        </div>

        {/* CONTENEDOR CENTRAL */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col lg:flex-row gap-6 shadow-2xl backdrop-blur-md">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="w-full bg-black/40 rounded-xl border border-slate-800 overflow-hidden relative min-h-[220px] lg:min-h-[260px] flex items-center justify-center">
              <img 
                src={tejidoActual.imagen} 
                alt={tejidoActual.nombre} 
                className="w-full h-full object-cover opacity-90 transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[9px] text-cyan-400 font-mono uppercase tracking-widest font-black">
                  {tejidoActual.id === 'conectivo_sangre' ? 'Óptica 100x • Wright' : 'Óptica Campo Claro • H&E'}
                </span>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex-1">
              <h4 className="text-cyan-400 text-[10px] font-black uppercase tracking-wider mb-2 font-mono">📋 Marcadores Morfológicos de Diagnóstico Diferencial:</h4>
              <ul className="space-y-2">
                {tejidoActual.criteriosDiferenciacion.map((crit, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-tight text-justify">
                    <span className="text-cyan-500 font-bold font-mono">•</span> {crit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Línea Celular / Complejidad Tisular</span>
                <h3 className="text-base font-black text-white tracking-tight">{tejidoActual.nombre}</h3>
              </div>
              <div className="bg-slate-950/30 border border-slate-800/60 rounded-xl px-3 py-2">
                <span className="text-[9px] text-cyan-500 font-mono uppercase font-black tracking-wider block">Subtipos Clínicos Evaluados:</span>
                <p className="text-[10px] text-slate-400 font-semibold leading-tight mt-0.5">{tejidoActual.subtipos}</p>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed text-justify pt-1">{tejidoActual.descripcion}</p>
            </div>

            <div className="border border-amber-700/30 bg-amber-950/5 p-4 rounded-xl flex flex-col gap-3 relative">
              {!estudianteNombre && (
                <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-md z-30 flex flex-col items-center justify-center p-4 text-center rounded-xl border border-red-900/20">
                  <span className="text-amber-500 text-xs font-black font-mono uppercase tracking-widest animate-pulse">⚠️ BLOQUEO: ASISTENCIA REQUERIDA</span>
                  <p className="text-[11px] text-slate-400 font-medium mt-1.5 max-w-xs leading-tight">Debe inicializar sus datos de identificación en la Estación 01 para desbloquear el validador automático de la rúbrica.</p>
                </div>
              )}
              <div>
                <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1 font-mono">Desafío Clínico de Opción Múltiple</h4>
                <p className="text-amber-100/90 text-xs font-semibold leading-tight text-justify">{tejidoActual.desafio}</p>
              </div>
              <div className="flex flex-col gap-2">
                {tejidoActual.opciones.map((opc) => (
                  <button
                    key={opc.id}
                    onClick={() => setRespuestasDesafios((prev: Record<string, string>) => ({ ...prev, [tejidoActual.id]: opc.id }))} // <-- Corrección de Tipo Explícito prev (Línea 237)
                    className={`w-full text-left p-2.5 text-xs rounded-xl border transition-all duration-200 text-justify ${
                      respuestasDesafios[tejidoActual.id] === opc.id
                        ? 'border-cyan-400 bg-cyan-950/40 text-white font-bold ring-1 ring-cyan-400/20 shadow-lg'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 mr-1 font-black">{opc.id})</span> {opc.texto}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
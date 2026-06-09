import Link from 'next/link';
import HistologyAtlas from '@/components/simulators/HistologyAtlas';

export default function Practica3Page() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-300 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors w-fit bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-900/50 mb-8">
          ← Volver al Panel Principal
        </Link>
        
		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Identidad de la experiencia</p>
				<h2>Marco de la práctica</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Tema eje</h3>
					<p>Identificación de tejidos básicos y relación forma-función desde la lectura histológica.</p>
				</article>
				<article className="card">
					<h3>Modalidad</h3>
					<p>Laboratorio virtual guiado por estaciones de observación comparativa e interpretación.</p>
				</article>
				<article className="card">
					<h3>Duración estimada</h3>
					<p>130 minutos en sesión integrada con registro en bitácora digital.</p>
				</article>
				<article className="card">
					<h3>Ubicación en la ruta formativa</h3>
					<p>Tercera práctica del curso: integra célula, tejido, órgano y función biológica.</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Pregunta reto</p>
				<h2>¿Qué puede revelar un tejido sobre la función del órgano al que pertenece?</h2>
			</div>
			<article className="card">
				<p>
					A partir de micropreparados sin etiqueta, deberás reconocer patrones histológicos,
					proponer el tipo de tejido y argumentar qué función orgánica puede sostener según
					su organización celular y su matriz.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Por qué importa</p>
				<h2>Leer tejidos es comprender función, diagnóstico y salud</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<p>
						La histología permite vincular estructura microscópica con función biológica,
						base para interpretar daño tisular, reparación y cambios asociados a enfermedad.
					</p>
				</article>
				<article className="card">
					<p>
						En formación en salud, reconocer tejidos fortalece la lectura de reportes,
						la correlación clínica y la toma de decisiones con fundamento científico.
					</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Resultados de aprendizaje esperados</p>
				<h2>Lo que vas a lograr</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Objetivo general</h3>
					<p>
						Reconocer tejidos básicos mediante observación e interpretación histológica inicial,
						relacionando organización celular, forma y matriz con la función del órgano.
					</p>
				</article>
				<article className="card">
					<h3>Objetivos específicos</h3>
					<ul>
						<li>Distinguir rasgos de tejido epitelial, conectivo, muscular y nervioso.</li>
						<li>Comparar organización celular y matriz extracelular entre tipos tisulares.</li>
						<li>Proponer órgano probable y función inferida a partir de evidencias microscópicas.</li>
						<li>Argumentar interpretaciones en lenguaje histológico claro y preciso.</li>
					</ul>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Activación de saberes previos</p>
				<h2>Lo que necesitas recordar</h2>
			</div>
			<article className="card">
				<ul>
					<li>Las células se organizan en niveles que van de tejido a órgano y sistema.</li>
					<li>La forma celular y la disposición espacial se relacionan con la función.</li>
					<li>No todos los tejidos tienen la misma proporción de células y matriz.</li>
					<li>La observación histológica requiere comparar patrones, no solo memorizar nombres.</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Conceptos clave</p>
				<h2>Lenguaje para interpretar micropreparados</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Tejido</h3>
					<p>Conjunto organizado de células y matriz con función común.</p>
				</article>
				<article className="card">
					<h3>Epitelial</h3>
					<p>Tejido de alta cohesión celular que recubre, protege o secreta.</p>
				</article>
				<article className="card">
					<h3>Conectivo</h3>
					<p>Tejido de soporte con matriz extracelular abundante y diversa.</p>
				</article>
				<article className="card">
					<h3>Muscular</h3>
					<p>Tejido especializado en contracción y generación de movimiento.</p>
				</article>
				<article className="card">
					<h3>Nervioso</h3>
					<p>Tejido de conducción y procesamiento de señales.</p>
				</article>
				<article className="card">
					<h3>Matriz extracelular</h3>
					<p>Componente no celular que aporta soporte, elasticidad y comunicación.</p>
				</article>
				<article className="card">
					<h3>Lámina histológica</h3>
					<p>Corte tisular preparado para observación microscópica e interpretación.</p>
				</article>
				<article className="card">
					<h3>Organización celular</h3>
					<p>Patrón de distribución, orientación y asociación entre células.</p>
				</article>
				<article className="card">
					<h3>Forma-función</h3>
					<p>Principio que vincula arquitectura biológica con desempeño funcional.</p>
				</article>
				<article className="card">
					<h3>Órgano</h3>
					<p>Estructura compuesta por tejidos coordinados para una función mayor.</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Apertura</p>
				<h2>Escenario de ingreso</h2>
			</div>
			<article className="card">
				<p>
					Ingresas al laboratorio virtual de histología y recibes cinco micropreparados
					digitales sin identificación. Tu misión es construir un atlas interpretativo inicial:
					reconocer el tejido, inferir el órgano probable y justificar su función.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Explora y predice</p>
				<h2>Hipótesis antes de la lectura histológica guiada</h2>
			</div>
			<article className="card">
				<ol>
					<li>Predice qué rasgos te permitirán distinguir tejido epitelial de conectivo.</li>
					<li>Anticipa cómo identificar tejido muscular frente a tejido nervioso.</li>
					<li>Define qué señales te ayudarán a inferir órgano probable.</li>
					<li>Propón cómo relacionar estructura microscópica con función biológica.</li>
				</ol>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Experiencia central</p>
				<h2>Ruta de observación por estaciones de tejidos</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Estación 1: Tejido epitelial</h3>
					<ul>
						<li>Propósito de observación: reconocer patrones de recubrimiento y cohesión celular.</li>
						<li>Qué mirar: capas, polaridad, forma de células y límite basal.</li>
						<li>Qué comparar: simple vs estratificado, cúbico vs cilíndrico.</li>
						<li>Qué registrar: tipo de disposición celular y órgano probable.</li>
						<li>Qué inferencia construir: función protectora, absortiva o secretora.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 2: Tejido conectivo</h3>
					<ul>
						<li>Propósito de observación: interpretar soporte biológico mediado por matriz.</li>
						<li>Qué mirar: proporción célula-matriz, fibras y organización del espacio.</li>
						<li>Qué comparar: conectivo laxo vs denso en arquitectura y resistencia.</li>
						<li>Qué registrar: tipo de matriz y estructuras clave observadas.</li>
						<li>Qué inferencia construir: función de sostén, unión, nutrición o defensa.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 3: Tejido muscular</h3>
					<ul>
						<li>Propósito de observación: relacionar arquitectura celular con contracción.</li>
						<li>Qué mirar: estriaciones, orientación de fibras y núcleos.</li>
						<li>Qué comparar: músculo liso, esquelético y cardíaco.</li>
						<li>Qué registrar: patrón dominante y órgano probable asociado.</li>
						<li>Qué inferencia construir: tipo de movimiento o función mecánica.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 4: Tejido nervioso</h3>
					<ul>
						<li>Propósito de observación: identificar organización para conducción de señales.</li>
						<li>Qué mirar: somas neuronales, prolongaciones y células de soporte.</li>
						<li>Qué comparar: regiones con predominio de cuerpos neuronales o fibras.</li>
						<li>Qué registrar: rasgos de conectividad y distribución.</li>
						<li>Qué inferencia construir: función de integración o transmisión nerviosa.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 5: Relación tejido ↔ órgano ↔ función</h3>
					<ul>
						<li>Propósito de observación: sintetizar hallazgos en un mapa funcional.</li>
						<li>Qué mirar: coexistencia de tejidos en un mismo órgano.</li>
						<li>Qué comparar: variaciones tisulares según exigencia funcional.</li>
						<li>Qué registrar: cadena de evidencia desde microestructura hasta función.</li>
						<li>Qué inferencia construir: cómo la integración tisular sostiene la función orgánica.</li>
					</ul>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Estación interactiva</p>
				<h2>Atlas histológico</h2>
			</div>
			<article className="card space-y-6">
				<div>
					<h3>Estación interactiva: atlas histológico</h3>
					<p>
						Explora un campo microscópico guiado, cambia el aumento y compara rasgos de tejido epitelial,
						conectivo, muscular y nervioso para vincular microestructura, órgano probable y función biológica.
					</p>
				</div>
				<HistologyAtlas />
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Bitácora digital</p>
				<h2>Registro de observación histológica</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Tejido observado</th>
								<th>Rasgos histológicos</th>
								<th>Estructuras clave</th>
								<th>Órgano probable</th>
								<th>Función inferida</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Epitelial</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Conectivo</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Muscular</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Nervioso</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Comparación estructurada</p>
				<h2>Matriz de contraste tisular</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Comparación</th>
								<th>Rasgo estructural dominante</th>
								<th>Organización microscópica</th>
								<th>Función biológica asociada</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Epitelial vs conectivo</th>
								<td>Alta cohesión celular vs matriz abundante</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Muscular vs nervioso</th>
								<td>Fibras contráctiles vs redes de conducción</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Alta cohesión celular vs abundante matriz</th>
								<td>Barreras/recubrimiento vs soporte/union</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Estructura microscópica vs función biológica</th>
								<td>Patrón celular y matriz como predictores funcionales</td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Interpreta</p>
				<h2>Preguntas para razonar forma y función</h2>
			</div>
			<article className="card">
				<ul>
					<li>¿Qué rasgo histológico fue más decisivo para diferenciar cada tejido?</li>
					<li>¿Cómo cambia tu inferencia funcional cuando varía la proporción célula-matriz?</li>
					<li>¿Qué evidencia usarías para sustentar que dos muestras pertenecen al mismo órgano?</li>
					<li>¿En qué caso la forma microscópica te permitió predecir mejor la función?</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Conecta</p>
				<h2>Salud y formación profesional</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<p>
						La lectura histológica inicial es base para comprender informes diagnósticos,
						procesos de inflamación, lesión tisular y respuesta de órganos en salud y enfermedad.
					</p>
				</article>
				<article className="card">
					<p>
						En áreas como salud oral, optometría, enfermería y laboratorio clínico,
						la relación tejido-órgano-función fortalece la interpretación interdisciplinaria.
					</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Autoevaluación</p>
				<h2>Checklist y cierre conceptual</h2>
			</div>
			<article className="card">
				<ol>
					<li>Diferencio tejidos básicos con criterios histológicos observables.</li>
					<li>Relaciono organización celular y matriz con función probable.</li>
					<li>Justifico órgano probable con evidencia de la bitácora.</li>
					<li>Comunico hallazgos con lenguaje biológico claro y riguroso.</li>
				</ol>
				<p>
					Cierre: interpretar tejidos es pasar de la imagen microscópica a la comprensión funcional del órgano.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Profundiza</p>
				<h2>Aplicación profesional breve</h2>
			</div>
			<article className="card">
				<p>
					Analiza un caso en el que un informe describe alteración del epitelio de mucosa.
					Explica, en máximo 180 palabras, qué consecuencias funcionales podrías esperar
					y qué evidencia histológica apoyarías para sustentar tu hipótesis.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Ética, bioseguridad y cultura científica</p>
				<h2>Rigor en interpretación de imágenes biológicas</h2>
			</div>
			<article className="card">
				<ul>
					<li>Registra observaciones verificables y evita sobreinterpretar una sola imagen.</li>
					<li>Diferencia con claridad dato observado e inferencia explicativa.</li>
					<li>Usa responsablemente microfotografías, respetando fuente y contexto académico.</li>
					<li>Mantén trazabilidad de hallazgos para discusión científica transparente.</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Producto final</p>
				<h2>Evidencia evaluable</h2>
			</div>
			<article className="card">
				<p>Entrega en el aula virtual un informe breve que incluya:</p>
				<ul>
					<li>Bitácora digital diligenciada de tejidos observados.</li>
					<li>Matriz comparativa estructurada con evidencias de contraste.</li>
					<li>Respuestas argumentadas de la sección de interpretación.</li>
					<li>Conclusión final sobre relación tejido, órgano y función biológica.</li>
				</ul>
			</article>
		</section>
	
      </div>
    </main>
  );
}

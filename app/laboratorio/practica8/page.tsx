import Link from 'next/link';
import IntegrativeCaseBoard from '@/components/simulators/IntegrativeCaseBoard';

export default function Practica8Page() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-300 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors w-fit bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-900/50 mb-8">
          ← Volver al Panel Principal
        </Link>
        
		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Identidad de la experiencia</p>
				<h2>Marco de la práctica integradora</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Tema eje</h3>
					<p>Integración de evidencias celulares y moleculares para explicar fenómenos biológicos.</p>
				</article>
				<article className="card">
					<h3>Modalidad</h3>
					<p>Laboratorio virtual de cierre con análisis por estaciones, contraste de datos y toma de decisiones.</p>
				</article>
				<article className="card">
					<h3>Duración estimada</h3>
					<p>160 minutos en sesión integradora con bitácora digital y argumentación final.</p>
				</article>
				<article className="card">
					<h3>Ubicación en la ruta formativa</h3>
					<p>Octava práctica del curso: experiencia de cierre y síntesis de aprendizajes 1 a 7.</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Pregunta reto</p>
				<h2>¿Cómo se integran múltiples evidencias celulares y moleculares para explicar un fenómeno biológico o una situación de salud?</h2>
			</div>
			<article className="card">
				<p>
					Tu desafío será conectar observaciones de diferentes niveles biológicos para construir
					una explicación coherente, justificar decisiones interpretativas y defender una hipótesis
					final basada en evidencia integrada, no en datos aislados.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Por qué importa</p>
				<h2>Integrar evidencias mejora la interpretación y la toma de decisiones</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<p>
						En biología y salud, los fenómenos reales requieren conectar estructura, función,
						mecanismos celulares y procesos moleculares para evitar conclusiones parciales.
					</p>
				</article>
				<article className="card">
					<p>
						La integración de evidencias fortalece razonamiento clínico, lectura de resultados de laboratorio,
						diagnóstico y comunicación profesional sustentada en datos biológicos confiables.
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
						Integrar evidencias celulares y moleculares para explicar fenómenos biológicos,
						argumentando hipótesis y conclusiones con criterios de coherencia y trazabilidad.
					</p>
				</article>
				<article className="card">
					<h3>Objetivos específicos</h3>
					<ul>
						<li>Relacionar diversidad celular, membrana, tejido y reconocimiento con función biológica.</li>
						<li>Interpretar proliferación, ADN y expresión génica como niveles conectados de análisis.</li>
						<li>Contrastar observaciones, inferencias y explicaciones para sostener una hipótesis integrada.</li>
						<li>Comunicar decisiones interpretativas con lenguaje científico claro y argumentación rigurosa.</li>
					</ul>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Activación de saberes previos</p>
				<h2>Lo que necesitas traer de las prácticas 1 a 7</h2>
			</div>
			<article className="card">
				<ul>
					<li>La diversidad celular expresa relaciones estructura-función en contextos biológicos distintos.</li>
					<li>La membrana regula intercambio, homeostasis y respuesta frente al entorno.</li>
					<li>Los tejidos conectan organización celular con desempeño de órganos.</li>
					<li>La identidad celular y compatibilidad dependen de señales de reconocimiento en membrana.</li>
					<li>El ciclo celular evidencia ritmos de proliferación y continuidad tisular.</li>
					<li>El ADN almacena información hereditaria y su extracción permite evidenciarla.</li>
					<li>La expresión génica transforma secuencia molecular en proteínas y rasgos observables.</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Conceptos clave</p>
				<h2>Lenguaje integrador para interpretar evidencias</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Evidencia biológica</h3>
					<p>Dato observable o medible que respalda una interpretación en contexto.</p>
				</article>
				<article className="card">
					<h3>Estructura-función</h3>
					<p>Relación entre organización biológica y desempeño de procesos vitales.</p>
				</article>
				<article className="card">
					<h3>Homeostasis</h3>
					<p>Mantenimiento dinámico del equilibrio interno frente a variaciones externas.</p>
				</article>
				<article className="card">
					<h3>Reconocimiento celular</h3>
					<p>Discriminación de señales propias y ajenas mediada por superficie celular.</p>
				</article>
				<article className="card">
					<h3>Proliferación</h3>
					<p>Incremento celular regulado que sostiene crecimiento, recambio y reparación.</p>
				</article>
				<article className="card">
					<h3>Material genético</h3>
					<p>Información hereditaria que guía continuidad y variación biológica.</p>
				</article>
				<article className="card">
					<h3>Expresión génica</h3>
					<p>Procesos que convierten información genética en función molecular y celular.</p>
				</article>
				<article className="card">
					<h3>Interpretación</h3>
					<p>Construcción argumentada de significado a partir de datos y comparaciones.</p>
				</article>
				<article className="card">
					<h3>Integración</h3>
					<p>Articulación de evidencias de distintos niveles para una explicación coherente.</p>
				</article>
				<article className="card">
					<h3>Fenómeno biológico</h3>
					<p>Proceso observable que emerge de interacciones celulares y moleculares.</p>
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
					Accedes a una sala integradora con un caso de alteración biológica en estudio.
					Dispones de resultados obtenidos en múltiples estaciones del laboratorio virtual:
					microimágenes celulares, datos de tonicidad, patrones tisulares, reacciones de
					reconocimiento, índices proliferativos y registros genético-moleculares.
					Tu misión es cruzar la evidencia y explicar el fenómeno con consistencia.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Explora y predice</p>
				<h2>Hipótesis iniciales antes de integrar resultados</h2>
			</div>
			<article className="card">
				<ol>
					<li>Formula una hipótesis inicial sobre el fenómeno observado y su posible causa biológica.</li>
					<li>Anticipa qué evidencias celulares deberían apoyar o refutar esa hipótesis.</li>
					<li>Define qué evidencias moleculares son necesarias para consolidar una explicación sólida.</li>
					<li>Propón qué contradicciones esperarías si la hipótesis inicial fuera incorrecta.</li>
				</ol>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Experiencia central</p>
				<h2>Ruta de estaciones integradoras</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Estación 1: Identidad y diversidad celular</h3>
					<ul>
						<li>Propósito de observación: reconocer tipos celulares y su perfil estructural.</li>
						<li>Qué mirar: morfología, organización interna y variación entre muestras.</li>
						<li>Qué comparar: patrones celulares de referencia frente a patrones del caso.</li>
						<li>Qué registrar: rasgos distintivos y clasificación argumentada.</li>
						<li>Qué inferencia construir: posible implicación funcional de la diversidad observada.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 2: Membrana, intercambio y homeostasis</h3>
					<ul>
						<li>Propósito de observación: evaluar regulación de intercambio celular.</li>
						<li>Qué mirar: respuestas en medios distintos y señales de equilibrio o estrés.</li>
						<li>Qué comparar: comportamiento osmótico y estabilidad de membrana entre condiciones.</li>
						<li>Qué registrar: cambios de volumen, integridad y recuperación.</li>
						<li>Qué inferencia construir: estado de homeostasis y capacidad adaptativa celular.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 3: Tejido y función</h3>
					<ul>
						<li>Propósito de observación: vincular organización tisular con función.</li>
						<li>Qué mirar: disposición celular, matriz y patrón histológico predominante.</li>
						<li>Qué comparar: tejido esperado vs tejido del caso integrador.</li>
						<li>Qué registrar: evidencia de conservación o alteración de arquitectura.</li>
						<li>Qué inferencia construir: impacto funcional del patrón tisular encontrado.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 4: Reconocimiento e incompatibilidad</h3>
					<ul>
						<li>Propósito de observación: interpretar señales de identidad y respuesta de reconocimiento.</li>
						<li>Qué mirar: patrones de reacción y marcadores de compatibilidad.</li>
						<li>Qué comparar: respuestas compatibles frente a respuestas incompatibles.</li>
						<li>Qué registrar: evidencia de reconocimiento propio/ajeno y su intensidad.</li>
						<li>Qué inferencia construir: riesgo biológico asociado a incompatibilidad detectada.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 5: Proliferación y ciclo celular</h3>
					<ul>
						<li>Propósito de observación: analizar dinámica proliferativa del sistema celular.</li>
						<li>Qué mirar: distribución de fases y variación del índice mitótico.</li>
						<li>Qué comparar: población basal vs población con alteración proliferativa.</li>
						<li>Qué registrar: frecuencia de células en división y patrones por campo.</li>
						<li>Qué inferencia construir: relación entre proliferación y estado funcional del tejido.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 6: ADN, expresión génica y rasgo</h3>
					<ul>
						<li>Propósito de observación: conectar información genética con manifestación fenotípica.</li>
						<li>Qué mirar: variaciones de secuencia, cambios en ARN y efecto proteico.</li>
						<li>Qué comparar: perfil molecular de referencia vs perfil del caso.</li>
						<li>Qué registrar: cadena de eventos desde gen hasta rasgo.</li>
						<li>Qué inferencia construir: grado de impacto funcional de la variación genética.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 7: Integración de evidencias y explicación final</h3>
					<ul>
						<li>Propósito de observación: articular todos los hallazgos en una explicación unificada.</li>
						<li>Qué mirar: consistencia entre evidencia celular, tisular y molecular.</li>
						<li>Qué comparar: hipótesis inicial frente a evidencia acumulada.</li>
						<li>Qué registrar: argumentos clave, límites de interpretación y conclusión final.</li>
						<li>Qué inferencia construir: modelo explicativo integral del fenómeno estudiado.</li>
					</ul>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Estación interactiva</p>
				<h2>Laboratorio integrador por evidencias</h2>
			</div>
			<article className="card space-y-6">
				<div>
					<h3>Estación interactiva: laboratorio integrador por evidencias</h3>
					<p>
						Selecciona evidencias de distintos niveles biológicos, contrástalas con hipótesis alternativas y construye una conclusión final con trazabilidad explícita.
					</p>
				</div>
				<IntegrativeCaseBoard />
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Bitácora digital</p>
				<h2>Registro integrado de hallazgos por estación</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Estación</th>
								<th>Evidencia principal</th>
								<th>Interpretación parcial</th>
								<th>Concepto relacionado</th>
								<th>Aporte a la hipótesis final</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Estación 1</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Estación 2</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Estación 3</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Estación 4</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Estación 5</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Estación 6</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Estación 7</td>
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
				<h2>Matriz de contraste para integrar explicaciones</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Comparación</th>
								<th>Diferencia clave</th>
								<th>Evidencia de respaldo</th>
								<th>Implicación para la conclusión</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Observación vs interpretación</th>
								<td>Dato visible vs significado construido</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Evidencia aislada vs evidencia integrada</th>
								<td>Lectura parcial vs explicación sistémica</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Cambio celular vs cambio molecular</th>
								<td>Manifestación morfológica vs mecanismo de base</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Estructura visible vs proceso subyacente</th>
								<td>Lo observable en imagen vs dinámica interna</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Hipótesis inicial vs conclusión final</th>
								<td>Predicción preliminar vs explicación validada</td>
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
				<h2>Preguntas para integrar niveles de análisis</h2>
			</div>
			<article className="card">
				<ul>
					<li>¿Qué evidencia fue decisiva para pasar de una lectura parcial a una explicación integrada?</li>
					<li>¿Cómo se conectan los hallazgos de membrana, tejido y proliferación con el perfil molecular?</li>
					<li>¿Qué contradicción inicial lograste resolver al cruzar estaciones distintas?</li>
					<li>¿Qué límites reconoces en tu interpretación y qué dato adicional solicitarías?</li>
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
						En ciencias biomédicas y laboratorio clínico, las decisiones de diagnóstico se fortalecen
						cuando se integran evidencias morfológicas, funcionales y moleculares con trazabilidad.
					</p>
				</article>
				<article className="card">
					<p>
						La formación profesional exige interpretar datos complejos con rigor, comunicar incertidumbre
						y sostener conclusiones responsables frente a escenarios reales de salud.
					</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Autoevaluación</p>
				<h2>Checklist y cierre conceptual integrador</h2>
			</div>
			<article className="card">
				<ol>
					<li>Integro evidencias de diferentes estaciones en una explicación coherente.</li>
					<li>Diferencio claramente observación, inferencia y conclusión.</li>
					<li>Justifico decisiones interpretativas con datos celulares y moleculares.</li>
					<li>Reconozco límites de mi análisis y propongo mejoras de evidencia.</li>
				</ol>
				<p>
					Cierre: explicar la vida celular requiere conectar niveles biológicos y argumentar con evidencia integrada.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Profundiza</p>
				<h2>Mini reto final de síntesis</h2>
			</div>
			<article className="card">
				<p>
					Recibes un nuevo caso con tres hallazgos: alteración de homeostasis en membrana,
					cambio en índice proliferativo y variación puntual en una secuencia genética.
					Construye una explicación integrada que proponga el mecanismo biológico más probable
					y una decisión de análisis adicional para confirmarlo.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Ética, bioseguridad y cultura científica</p>
				<h2>Rigor y responsabilidad en interpretación de datos biológicos</h2>
			</div>
			<article className="card">
				<ul>
					<li>Mantén trazabilidad entre dato original, análisis realizado e inferencia emitida.</li>
					<li>Evita sobreinterpretar resultados cuando la evidencia sea insuficiente o ambigua.</li>
					<li>Practica honestidad interpretativa al reportar incertidumbres y límites metodológicos.</li>
					<li>Asume responsabilidad ética en el manejo y comunicación de información biológica.</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Producto final</p>
				<h2>Evidencia evaluable</h2>
			</div>
			<article className="card">
				<p>Entrega en el aula virtual un informe integrador que incluya:</p>
				<ul>
					<li>Bitácora digital completa por estaciones con interpretación parcial.</li>
					<li>Matriz de comparación estructurada diligenciada con evidencias de respaldo.</li>
					<li>Respuesta argumentada a las preguntas de integración multinivel.</li>
					<li>Conclusión final sustentada y trazable sobre el fenómeno biológico analizado.</li>
				</ul>
			</article>
		</section>
	
      </div>
    </main>
  );
}

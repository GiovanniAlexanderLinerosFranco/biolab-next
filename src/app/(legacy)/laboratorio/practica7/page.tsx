import Link from 'next/link';
import GeneExpressionSimulator from '@/components/simulators/GeneExpressionSimulator';

export default function Practica7Page() {
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
					<p>Expresión génica y relación entre información molecular, función proteica y rasgo.</p>
				</article>
				<article className="card">
					<h3>Modalidad</h3>
					<p>Laboratorio virtual guiado con estaciones de análisis de flujo de información biológica.</p>
				</article>
				<article className="card">
					<h3>Duración estimada</h3>
					<p>145 minutos en sesión integrada con bitácora digital y discusión de casos.</p>
				</article>
				<article className="card">
					<h3>Ubicación en la ruta formativa</h3>
					<p>Séptima práctica del curso: integra genética molecular con variación fenotípica.</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Pregunta reto</p>
				<h2>¿Cómo se transforma una secuencia molecular en una característica observable?</h2>
			</div>
			<article className="card">
				<p>
					Analizarás cómo la información codificada en un gen se transcribe, se traduce y
					se expresa en proteínas que sostienen funciones celulares, permitiendo explicar
					por qué pequeños cambios en secuencia pueden modificar un rasgo.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Por qué importa</p>
				<h2>De la variación genética a la variación biológica</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<p>
						Comprender expresión génica permite explicar cómo genes y proteínas participan
						en desarrollo, mantenimiento celular y diversidad de rasgos en organismos.
					</p>
				</article>
				<article className="card">
					<p>
						En salud y ciencias de la vida, interpretar el flujo ADN-ARN-proteína es clave para
						genética, biotecnología, diagnóstico molecular y decisiones clínicas informadas.
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
						Interpretar el flujo de información biológica desde el gen hasta el rasgo,
						relacionando transcripción, traducción, mutación y función proteica.
					</p>
				</article>
				<article className="card">
					<h3>Objetivos específicos</h3>
					<ul>
						<li>Diferenciar etapas de transcripción y traducción en el proceso de expresión génica.</li>
						<li>Relacionar cambios en secuencia con variaciones en codones y proteínas.</li>
						<li>Interpretar cómo mutaciones pueden alterar función molecular y fenotipo.</li>
						<li>Argumentar vínculo entre información genética, función celular y rasgo observable.</li>
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
					<li>El ADN almacena información genética y se organiza en genes.</li>
					<li>El núcleo contiene la información que guía síntesis molecular en la célula.</li>
					<li>Las proteínas ejecutan funciones estructurales, enzimáticas y regulatorias.</li>
					<li>Herencia y función biológica se conectan mediante expresión de la información genética.</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Conceptos clave</p>
				<h2>Lenguaje para seguir el flujo de información biológica</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Gen</h3>
					<p>Segmento de ADN con información para un producto funcional.</p>
				</article>
				<article className="card">
					<h3>ADN</h3>
					<p>Molécula que conserva y transmite la información hereditaria.</p>
				</article>
				<article className="card">
					<h3>ARN</h3>
					<p>Molécula intermediaria y funcional en transferencia de información genética.</p>
				</article>
				<article className="card">
					<h3>Transcripción</h3>
					<p>Proceso de síntesis de ARN a partir de una plantilla de ADN.</p>
				</article>
				<article className="card">
					<h3>Traducción</h3>
					<p>Lectura del ARN mensajero para formar una proteína.</p>
				</article>
				<article className="card">
					<h3>Codón</h3>
					<p>Triplete de nucleótidos que especifica un aminoácido o señal de parada.</p>
				</article>
				<article className="card">
					<h3>Proteína</h3>
					<p>Producto molecular que ejecuta funciones celulares específicas.</p>
				</article>
				<article className="card">
					<h3>Mutación</h3>
					<p>Cambio en secuencia genética con posible impacto funcional variable.</p>
				</article>
				<article className="card">
					<h3>Expresión génica</h3>
					<p>Conjunto de procesos que convierten información genética en función biológica.</p>
				</article>
				<article className="card">
					<h3>Fenotipo</h3>
					<p>Manifestación observable resultante de genes y entorno.</p>
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
					Ingresas al laboratorio virtual de expresión génica con una secuencia de referencia
					y varias variantes. Tu tarea es seguir el recorrido desde ADN hasta proteína para
					explicar cómo una diferencia molecular puede traducirse en un rasgo distinto.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Explora y predice</p>
				<h2>Predicciones antes del análisis guiado</h2>
			</div>
			<article className="card">
				<ol>
					<li>Predice qué ocurrirá si cambia una base en la secuencia de ADN.</li>
					<li>Anticipa cómo se relaciona un gen con una proteína específica.</li>
					<li>Explica por qué no todo cambio en ADN produce el mismo efecto biológico.</li>
					<li>Propón cómo un cambio molecular podría reflejarse en un rasgo observable.</li>
				</ol>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Experiencia central</p>
				<h2>Ruta de análisis del flujo informacional</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Estación 1: ADN como reserva de información</h3>
					<ul>
						<li>Propósito de observación: reconocer al ADN como fuente de instrucciones.</li>
						<li>Qué mirar: organización de secuencias y regiones codificantes.</li>
						<li>Qué comparar: secuencia de referencia vs secuencia variante.</li>
						<li>Qué registrar: posición y tipo de cambio molecular.</li>
						<li>Qué inferencia construir: potencial impacto de la variación genética.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 2: Transcripción y formación de ARN</h3>
					<ul>
						<li>Propósito de observación: seguir transferencia de información de ADN a ARN.</li>
						<li>Qué mirar: complementariedad de bases durante transcripción.</li>
						<li>Qué comparar: ARN generado desde secuencia normal y alterada.</li>
						<li>Qué registrar: codones resultantes en ARN mensajero.</li>
						<li>Qué inferencia construir: cómo el cambio original modifica el mensaje transcrito.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 3: Traducción y síntesis de proteína</h3>
					<ul>
						<li>Propósito de observación: interpretar paso de codones a aminoácidos.</li>
						<li>Qué mirar: secuencia proteica producida por cada ARN.</li>
						<li>Qué comparar: proteína funcional frente a proteína modificada.</li>
						<li>Qué registrar: cambios en longitud o composición aminoacídica.</li>
						<li>Qué inferencia construir: posible efecto en función molecular.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 4: Código genético y codones</h3>
					<ul>
						<li>Propósito de observación: reconocer reglas de lectura del código genético.</li>
						<li>Qué mirar: codones sinónimos, codones de cambio y codones de parada.</li>
						<li>Qué comparar: efecto de sustitución en distintas posiciones del codón.</li>
						<li>Qué registrar: tipo de variación (silenciosa, cambio de aminoácido, truncamiento).</li>
						<li>Qué inferencia construir: gravedad potencial según tipo de codón afectado.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 5: Mutación y cambio funcional</h3>
					<ul>
						<li>Propósito de observación: vincular mutación con alteración de función.</li>
						<li>Qué mirar: relación entre cambio proteico y desempeño esperado.</li>
						<li>Qué comparar: mutaciones con efecto leve, moderado o crítico.</li>
						<li>Qué registrar: evidencia funcional asociada a cada variante.</li>
						<li>Qué inferencia construir: probabilidad de impacto biológico significativo.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 6: Del cambio molecular al rasgo observable</h3>
					<ul>
						<li>Propósito de observación: integrar niveles molecular, celular y fenotípico.</li>
						<li>Qué mirar: consistencia entre variación genética y rasgo inferido.</li>
						<li>Qué comparar: escenarios con fenotipo conservado vs alterado.</li>
						<li>Qué registrar: cadena causal desde gen hasta rasgo.</li>
						<li>Qué inferencia construir: cómo fluye la información biológica en contexto real.</li>
					</ul>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Estación interactiva</p>
				<h2>Simulador de expresión génica</h2>
			</div>
			<article className="card space-y-6">
				<div>
					<h3>Estación interactiva: simulador de expresión génica</h3>
					<p>
						Explora una secuencia de referencia y compara mutaciones silenciosa, missense y nonsense para observar cómo cambian ARN, proteína y rasgo inferido.
					</p>
				</div>
				<GeneExpressionSimulator />
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Bitácora digital</p>
				<h2>Registro de flujo de información genética</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Secuencia o información de entrada</th>
								<th>Cambio observado</th>
								<th>Efecto sobre ARN</th>
								<th>Efecto sobre proteína</th>
								<th>Consecuencia funcional</th>
								<th>Rasgo inferido</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Caso 1</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Caso 2</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Caso 3</td>
								<td></td>
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
				<h2>Matriz de contraste gen-función-rasgo</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Comparación</th>
								<th>Diferencia clave</th>
								<th>Evidencia molecular</th>
								<th>Efecto esperado</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>ADN vs ARN</th>
								<td>Almacenamiento estable vs intermediario funcional</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Transcripción vs traducción</th>
								<td>ADN a ARN vs ARN a proteína</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Codón normal vs codón alterado</th>
								<td>Lectura esperada vs lectura modificada</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Proteína funcional vs proteína alterada</th>
								<td>Conformación activa vs desempeño comprometido</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Cambio molecular vs efecto fenotípico</th>
								<td>Variación de secuencia vs manifestación observable</td>
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
				<h2>Preguntas para razonar el flujo informacional</h2>
			</div>
			<article className="card">
				<ul>
					<li>¿Qué etapa del flujo ADN-ARN-proteína fue más sensible al cambio de secuencia?</li>
					<li>¿Qué diferencia encuentras entre un cambio silencioso y uno con impacto funcional?</li>
					<li>¿Cómo justificas que una variación molecular sí o no modifique un rasgo observable?</li>
					<li>¿Qué evidencias necesitas para afirmar relación causal entre mutación y fenotipo?</li>
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
						Comprender expresión génica es base para genética médica, diagnóstico molecular
						y análisis de variación asociada a condiciones de salud.
					</p>
				</article>
				<article className="card">
					<p>
						En biotecnología y áreas clínicas, vincular secuencia, proteína y fenotipo fortalece
						la interpretación de pruebas y la toma de decisiones profesionales fundamentadas.
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
					<li>Explico con claridad el flujo de información desde gen hasta rasgo.</li>
					<li>Diferencio funciones de transcripción, traducción y código genético.</li>
					<li>Relaciono mutaciones con posibles cambios funcionales y fenotípicos.</li>
					<li>Argumento interpretaciones con evidencia molecular y lenguaje científico.</li>
				</ol>
				<p>
					Cierre: cuando la información genética se expresa, conecta nivel molecular, función celular y diversidad biológica observable.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Profundiza</p>
				<h2>Caso breve de mutación y rasgo</h2>
			</div>
			<article className="card">
				<p>
					Una variante genética cambia un codón en un gen asociado a proteína estructural.
					Propón dos escenarios: uno con efecto mínimo y otro con impacto funcional marcado.
					Justifica cómo esa diferencia podría reflejarse en fenotipo.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Ética, bioseguridad y cultura científica</p>
				<h2>Uso responsable de información genética</h2>
			</div>
			<article className="card">
				<ul>
					<li>Registra resultados con trazabilidad y evita extrapolar sin evidencia suficiente.</li>
					<li>Diferencia claramente dato molecular, inferencia funcional y conclusión fenotípica.</li>
					<li>Protege confidencialidad y uso ético de información genética en contextos educativos.</li>
					<li>Reconoce límites interpretativos y necesidad de validación en escenarios clínicos.</li>
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
					<li>Bitácora digital completa de casos y efectos observados.</li>
					<li>Matriz comparativa diligenciada de flujo genético y efectos funcionales.</li>
					<li>Respuestas argumentadas de la sección de interpretación.</li>
					<li>Conclusión final sobre relación entre cambio molecular y rasgo.</li>
				</ul>
			</article>
		</section>
	
      </div>
    </main>
  );
}

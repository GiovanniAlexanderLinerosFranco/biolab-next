import Link from 'next/link';
import DnaExtractionLab from '@/components/simulators/DnaExtractionLab';

export default function Practica6Page() {
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
					<p>Extracción, visualización e interpretación del ADN como material genético celular.</p>
				</article>
				<article className="card">
					<h3>Modalidad</h3>
					<p>Laboratorio virtual guiado con secuencia experimental y análisis molecular comparado.</p>
				</article>
				<article className="card">
					<h3>Duración estimada</h3>
					<p>145 minutos en sesión integrada con bitácora digital y discusión de interpretación.</p>
				</article>
				<article className="card">
					<h3>Ubicación en la ruta formativa</h3>
					<p>Sexta práctica del curso: conecta célula, molécula e identidad hereditaria.</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Pregunta reto</p>
				<h2>¿Cómo puede hacerse visible una molécula que normalmente no vemos y qué nos revela sobre la organización de la vida?</h2>
			</div>
			<article className="card">
				<p>
					A través de una secuencia de extracción de ADN, interpretarás cómo cada etapa
					rompe barreras celulares, separa componentes y permite observar el material genético,
					relacionándolo con herencia e identidad biológica.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Por qué importa</p>
				<h2>Del laboratorio molecular a la comprensión de la herencia</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<p>
						El ADN concentra la información genética que sostiene continuidad biológica.
						Hacerlo visible permite comprender su localización celular y su rol en herencia.
					</p>
				</article>
				<article className="card">
					<p>
						En salud y ciencias biomédicas, interpretar procesos de extracción es base para
						genética molecular, diagnóstico y toma de decisiones apoyadas en evidencia biológica.
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
						Interpretar una secuencia de extracción de ADN relacionando ruptura de membranas,
						función de reactivos y precipitación con la visualización del material genético.
					</p>
				</article>
				<article className="card">
					<h3>Objetivos específicos</h3>
					<ul>
						<li>Reconocer dónde se localiza el ADN y qué barreras deben superarse para extraerlo.</li>
						<li>Explicar el papel de detergente, sal, filtración y alcohol frío en la secuencia experimental.</li>
						<li>Comparar resultados entre muestras biológicas distintas.</li>
						<li>Vincular observación experimental con herencia e identidad molecular.</li>
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
					<li>El material genético se encuentra organizado en el núcleo celular.</li>
					<li>Las membranas celulares actúan como barreras que protegen el contenido interno.</li>
					<li>Las biomoléculas responden de forma diferente según solvente y condiciones fisicoquímicas.</li>
					<li>Una secuencia experimental eficaz requiere observar, comparar y justificar cada paso.</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Conceptos clave</p>
				<h2>Lenguaje para interpretar extracción de ADN</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>ADN</h3>
					<p>Molécula portadora de información genética heredable.</p>
				</article>
				<article className="card">
					<h3>Material genético</h3>
					<p>Conjunto de instrucciones biológicas que orientan estructura y función.</p>
				</article>
				<article className="card">
					<h3>Núcleo</h3>
					<p>Compartimento celular principal donde se organiza el ADN en eucariotas.</p>
				</article>
				<article className="card">
					<h3>Membrana plasmática</h3>
					<p>Barrera selectiva que delimita la célula y protege su contenido.</p>
				</article>
				<article className="card">
					<h3>Detergente</h3>
					<p>Reactivo que desestabiliza lípidos de membrana y facilita liberación celular.</p>
				</article>
				<article className="card">
					<h3>Sal</h3>
					<p>Ayuda a neutralizar cargas y favorece separación de componentes.</p>
				</article>
				<article className="card">
					<h3>Filtración</h3>
					<p>Proceso de separación de restos celulares sólidos del extracto.</p>
				</article>
				<article className="card">
					<h3>Precipitación</h3>
					<p>Formación visible de ADN al cambiar condiciones de solubilidad.</p>
				</article>
				<article className="card">
					<h3>Alcohol frío</h3>
					<p>Favorece que el ADN salga de solución y se haga observable.</p>
				</article>
				<article className="card">
					<h3>Herencia</h3>
					<p>Transmisión de información genética entre generaciones celulares y organismos.</p>
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
					Ingresas al laboratorio virtual de biología molecular con dos muestras biológicas
					y una secuencia de extracción por etapas. Tu reto es explicar qué ocurre en cada paso
					hasta visualizar ADN y argumentar por qué ese resultado refleja identidad hereditaria.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Explora y predice</p>
				<h2>Predicciones antes de la secuencia experimental</h2>
			</div>
			<article className="card">
				<ol>
					<li>Predice qué ocurrirá cuando se rompan membranas celulares.</li>
					<li>Explica por qué se usa detergente en la liberación del contenido celular.</li>
					<li>Anticipa qué papel cumple la sal en la separación molecular.</li>
					<li>Justifica por qué el alcohol frío facilita la visualización del ADN.</li>
					<li>Propón qué diferencias de resultado esperarías entre muestras.</li>
				</ol>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Experiencia central</p>
				<h2>Ruta de extracción e interpretación molecular</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Estación 1: ¿Dónde está el ADN?</h3>
					<ul>
						<li>Propósito de observación: ubicar el ADN dentro de la organización celular.</li>
						<li>Qué mirar: relación núcleo, citoplasma y barreras celulares.</li>
						<li>Qué comparar: células con distinta densidad o tipo de tejido de origen.</li>
						<li>Qué registrar: localización esperada del material genético.</li>
						<li>Qué inferencia construir: necesidad de liberar contenido nuclear para extraer ADN.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 2: Ruptura celular y liberación del contenido</h3>
					<ul>
						<li>Propósito de observación: analizar apertura de membranas celulares.</li>
						<li>Qué mirar: cambios de textura y homogeneidad de la mezcla.</li>
						<li>Qué comparar: muestra antes y después de lisis inicial.</li>
						<li>Qué registrar: evidencia de liberación intracelular.</li>
						<li>Qué inferencia construir: cómo la lisis habilita acceso al ADN.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 3: Función de los reactivos</h3>
					<ul>
						<li>Propósito de observación: interpretar función de detergente y sal.</li>
						<li>Qué mirar: efecto de cada reactivo sobre claridad y consistencia del extracto.</li>
						<li>Qué comparar: secuencias con variaciones en proporción de reactivos.</li>
						<li>Qué registrar: respuesta de la muestra a cada paso químico.</li>
						<li>Qué inferencia construir: papel complementario de detergente y sal en extracción.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 4: Filtración y separación de restos celulares</h3>
					<ul>
						<li>Propósito de observación: separar fase líquida útil de residuos sólidos.</li>
						<li>Qué mirar: diferencia entre filtrado y retenido.</li>
						<li>Qué comparar: calidad del extracto antes y después de filtrar.</li>
						<li>Qué registrar: transparencia y presencia de partículas.</li>
						<li>Qué inferencia construir: importancia de limpiar la muestra antes de precipitar ADN.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 5: Precipitación del ADN</h3>
					<ul>
						<li>Propósito de observación: hacer visible el ADN mediante alcohol frío.</li>
						<li>Qué mirar: aparición de fibras o agregados blanquecinos.</li>
						<li>Qué comparar: zonas de interfaz con y sin precipitación evidente.</li>
						<li>Qué registrar: intensidad y velocidad de aparición del precipitado.</li>
						<li>Qué inferencia construir: relación entre solubilidad y visualización del ADN.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 6: Interpretación molecular y relación con herencia</h3>
					<ul>
						<li>Propósito de observación: integrar resultados experimentales en explicación biológica.</li>
						<li>Qué mirar: coherencia entre pasos aplicados y resultado final observado.</li>
						<li>Qué comparar: diferencias de extracción entre tipos de muestra.</li>
						<li>Qué registrar: hipótesis final sobre cantidad/calidad de ADN visible.</li>
						<li>Qué inferencia construir: vínculo entre ADN extraído, identidad y continuidad hereditaria.</li>
					</ul>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Estación interactiva</p>
				<h2>Simulador de extracción de ADN</h2>
			</div>
			<article className="card space-y-6">
				<div>
					<h3>Estación interactiva: simulador de extracción de ADN</h3>
					<p>
						Selecciona una muestra y activa pasos experimentales para observar cómo la lisis, la clarificación y el alcohol frío modifican la visibilidad final del ADN.
					</p>
				</div>
				<DnaExtractionLab />
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Bitácora digital</p>
				<h2>Registro de pasos y evidencia molecular</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Muestra</th>
								<th>Reactivo o paso aplicado</th>
								<th>Cambio observado</th>
								<th>Función inferida del paso</th>
								<th>Interpretación molecular</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Muestra A</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Muestra B</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Muestra C</td>
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
				<h2>Matriz de contraste de extracción molecular</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Comparación</th>
								<th>Diferencia experimental</th>
								<th>Evidencia observada</th>
								<th>Explicación molecular</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Membrana intacta vs membrana alterada</th>
								<td>Barrera cerrada vs contenido liberado</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Detergente vs sal</th>
								<td>Lisis lipídica vs estabilización iónica</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Filtración vs precipitación</th>
								<td>Separación de restos vs visualización de ADN</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Muestra vegetal vs otra muestra biológica</th>
								<td>Variación en textura, rendimiento y pureza</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Observación experimental vs explicación molecular</th>
								<td>Resultado visible vs mecanismo subyacente</td>
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
				<h2>Preguntas para razonamiento molecular</h2>
			</div>
			<article className="card">
				<ul>
					<li>¿Qué etapa fue más decisiva para que el ADN se volviera visible y por qué?</li>
					<li>¿Cómo se complementan detergente y sal en la secuencia de extracción?</li>
					<li>¿Qué significa observar más o menos precipitado entre muestras distintas?</li>
					<li>¿Cómo conectas el resultado final con herencia e identidad biológica?</li>
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
						La extracción de ADN es base para genética y biología molecular aplicada a diagnóstico,
						rastreo hereditario y comprensión de condiciones de salud.
					</p>
				</article>
				<article className="card">
					<p>
						En laboratorio clínico y áreas biomédicas, interpretar cada paso experimental fortalece
						la calidad del análisis y la toma de decisiones con fundamento molecular.
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
					<li>Explico dónde está el ADN y cómo se libera desde la célula.</li>
					<li>Justifico función de detergente, sal, filtración y alcohol frío.</li>
					<li>Interpreto diferencias observadas entre muestras biológicas.</li>
					<li>Relaciono extracción visible con identidad genética y herencia.</li>
				</ol>
				<p>
					Cierre: visualizar ADN no solo es un resultado experimental, es una puerta para comprender la continuidad de la vida.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Profundiza</p>
				<h2>Aplicación real en ciencia y salud</h2>
			</div>
			<article className="card">
				<p>
					Imagina que debes explicar a un equipo clínico por qué una muestra ofrece bajo rendimiento de ADN.
					Propón tres causas experimentales posibles y una mejora para cada una, justificando desde el nivel molecular.
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
					<li>Registra datos observados con precisión y evita conclusiones sin evidencia suficiente.</li>
					<li>Diferencia claramente resultado experimental e interpretación molecular.</li>
					<li>Gestiona responsablemente información genética y resguarda su contexto ético.</li>
					<li>Reconoce límites de la técnica y necesidad de validación en análisis avanzados.</li>
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
					<li>Bitácora digital diligenciada de pasos y cambios observados.</li>
					<li>Matriz comparativa con explicación molecular de cada contraste.</li>
					<li>Respuestas argumentadas de la sección de interpretación.</li>
					<li>Conclusión final sobre ADN visible, herencia e identidad biológica.</li>
				</ul>
			</article>
		</section>
	
      </div>
    </main>
  );
}

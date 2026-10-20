import Link from 'next/link';
import MitosisCounter from '@/components/simulators/MitosisCounter';

export default function Practica5Page() {
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
					<p>Ciclo celular, mitosis e índice mitótico como lectura de continuidad tisular.</p>
				</article>
				<article className="card">
					<h3>Modalidad</h3>
					<p>Laboratorio virtual guiado con análisis comparativo de campos celulares.</p>
				</article>
				<article className="card">
					<h3>Duración estimada</h3>
					<p>140 minutos en sesión integrada con bitácora digital y discusión de resultados.</p>
				</article>
				<article className="card">
					<h3>Ubicación en la ruta formativa</h3>
					<p>Quinta práctica del curso: conecta división celular con crecimiento y reparación.</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Pregunta reto</p>
				<h2>¿Cómo revela una población celular el ritmo de crecimiento y renovación de un tejido?</h2>
			</div>
			<article className="card">
				<p>
					A partir de microcampos celulares, deberás distinguir interfase y fases mitóticas,
					cuantificar células en división e interpretar qué indican esos patrones sobre dinámica tisular.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Por qué importa</p>
				<h2>División celular, tejidos y salud</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<p>
						El ciclo celular sostiene crecimiento, recambio y reparación de tejidos.
						Interpretar su ritmo permite comprender procesos fisiológicos de continuidad biológica.
					</p>
				</article>
				<article className="card">
					<p>
						En salud, alteraciones del control proliferativo se relacionan con patología;
						por eso leer el índice mitótico fortalece análisis clínico y de laboratorio.
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
						Interpretar el ciclo celular mediante identificación de fases mitóticas y cálculo básico
						del índice mitótico, relacionando proliferación con continuidad y función tisular.
					</p>
				</article>
				<article className="card">
					<h3>Objetivos específicos</h3>
					<ul>
						<li>Diferenciar interfase y mitosis en campos celulares comparativos.</li>
						<li>Reconocer profase, metafase, anafase y telofase por rasgos morfológicos.</li>
						<li>Relacionar citocinesis con finalización de la división celular.</li>
						<li>Inferir dinámica tisular a partir del índice mitótico observado.</li>
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
					<li>El ADN se organiza en cromosomas visibles durante división celular.</li>
					<li>El núcleo cambia su configuración según la fase del ciclo.</li>
					<li>No todas las células de un tejido se dividen al mismo tiempo.</li>
					<li>La proliferación celular se relaciona con función y estado del tejido.</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Conceptos clave</p>
				<h2>Lenguaje para leer división celular</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Ciclo celular</h3>
					<p>Secuencia de eventos que permite crecimiento y reproducción celular.</p>
				</article>
				<article className="card">
					<h3>Interfase</h3>
					<p>Etapa de preparación y síntesis previa a la división.</p>
				</article>
				<article className="card">
					<h3>Mitosis</h3>
					<p>División nuclear que distribuye material genético en dos células hijas.</p>
				</article>
				<article className="card">
					<h3>Profase</h3>
					<p>Condensación cromosómica e inicio de reorganización nuclear.</p>
				</article>
				<article className="card">
					<h3>Metafase</h3>
					<p>Alineación de cromosomas en el plano ecuatorial celular.</p>
				</article>
				<article className="card">
					<h3>Anafase</h3>
					<p>Separación de cromátidas hacia polos opuestos.</p>
				</article>
				<article className="card">
					<h3>Telofase</h3>
					<p>Reorganización nuclear y cierre de la división del material genético.</p>
				</article>
				<article className="card">
					<h3>Citocinesis</h3>
					<p>Separación del citoplasma para generar dos células independientes.</p>
				</article>
				<article className="card">
					<h3>Cromosoma</h3>
					<p>Estructura compacta de ADN visible durante fases de mitosis.</p>
				</article>
				<article className="card">
					<h3>Índice mitótico</h3>
					<p>Proporción de células en mitosis respecto al total observado.</p>
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
					Accedes a un laboratorio virtual de proliferación celular con campos de un tejido en recambio.
					Tu misión es reconocer fases del ciclo, clasificar eventos mitóticos y construir una lectura
					argumentada del ritmo de renovación del tejido.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Explora y predice</p>
				<h2>Predicciones antes de la observación guiada</h2>
			</div>
			<article className="card">
				<ol>
					<li>Predice qué fase será más frecuente en los campos observados.</li>
					<li>Anticipa qué rasgos diferenciarán profase, metafase, anafase y telofase.</li>
					<li>Propón qué sugiere biológicamente un tejido con alto índice mitótico.</li>
					<li>Explica por qué algunas células parecen en reposo y otras en división activa.</li>
				</ol>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Experiencia central</p>
				<h2>Ruta de observación por estaciones mitóticas</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Estación 1: Interfase y preparación para dividirse</h3>
					<ul>
						<li>Propósito de observación: reconocer células en preparación proliferativa.</li>
						<li>Qué mirar: núcleo íntegro y cromatina no condensada.</li>
						<li>Qué comparar: células en interfase frente a células mitóticas.</li>
						<li>Qué registrar: frecuencia relativa de interfase por campo.</li>
						<li>Qué inferencia construir: actividad basal de crecimiento del tejido.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 2: Profase y condensación cromosómica</h3>
					<ul>
						<li>Propósito de observación: identificar inicio visible de la mitosis.</li>
						<li>Qué mirar: cromosomas condensados y cambios nucleares.</li>
						<li>Qué comparar: transición entre interfase tardía y profase.</li>
						<li>Qué registrar: número de células en profase.</li>
						<li>Qué inferencia construir: entrada de la población al ciclo mitótico activo.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 3: Metafase y alineación</h3>
					<ul>
						<li>Propósito de observación: reconocer la organización ecuatorial cromosómica.</li>
						<li>Qué mirar: cromosomas alineados en el plano medio.</li>
						<li>Qué comparar: metafase frente a anafase incipiente.</li>
						<li>Qué registrar: eventos de alineación claros.</li>
						<li>Qué inferencia construir: control de distribución genética antes de separación.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 4: Anafase y separación</h3>
					<ul>
						<li>Propósito de observación: identificar segregación de cromátidas.</li>
						<li>Qué mirar: desplazamiento hacia polos opuestos.</li>
						<li>Qué comparar: anafase temprana vs tardía.</li>
						<li>Qué registrar: cantidad de eventos de separación.</li>
						<li>Qué inferencia construir: eficiencia en reparto del material genético.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 5: Telofase y citocinesis</h3>
					<ul>
						<li>Propósito de observación: reconocer cierre de la división celular.</li>
						<li>Qué mirar: reaparición nuclear y separación citoplasmática.</li>
						<li>Qué comparar: telofase sin y con citocinesis evidente.</li>
						<li>Qué registrar: células hijas en formación.</li>
						<li>Qué inferencia construir: continuidad poblacional posterior a mitosis.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 6: Índice mitótico e interpretación tisular</h3>
					<ul>
						<li>Propósito de observación: integrar conteo celular con significado biológico.</li>
						<li>Qué mirar: proporción de células en mitosis respecto al total.</li>
						<li>Qué comparar: campos con baja y alta proliferación.</li>
						<li>Qué registrar: índice mitótico por campo y promedio general.</li>
						<li>Qué inferencia construir: ritmo de recambio y estado funcional del tejido.</li>
					</ul>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Estación interactiva</p>
				<h2>Contador virtual de mitosis</h2>
			</div>

			<article className="card mitosis-card space-y-6">
				<div>
					<h3>Estación interactiva: contador virtual de mitosis</h3>
					<p>
						Selecciona una fase, clasifica cada célula del campo observado y obtén el índice mitótico de forma automática.
						La estación usa morfología simplificada para que puedas comparar interfase y mitosis con una lectura cuantitativa inmediata.
					</p>
				</div>

				<MitosisCounter />
			</article>

			<article className="card mitosis-log">
				<h3>Registro experimental breve</h3>
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Campo analizado</th>
								<th>Total de células</th>
								<th>Células en mitosis</th>
								<th>Índice mitótico</th>
								<th>Fase predominante</th>
								<th>Interpretación</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Campo 1, 2 o 3</td>
								<td>12</td>
								<td>Conteo automático de profase + metafase + anafase + telofase</td>
								<td>Porcentaje de células en división / total clasificado</td>
								<td>Fase con mayor frecuencia observada</td>
								<td>Relaciona proliferación alta, media o baja con el estado del tejido</td>
							</tr>
						</tbody>
					</table>
				</div>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Bitácora digital</p>
				<h2>Registro de continuidad y proliferación celular</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Campo observado</th>
								<th>Número total de células</th>
								<th>Células en interfase</th>
								<th>Células en mitosis</th>
								<th>Fase predominante</th>
								<th>Interpretación del tejido</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Campo 1</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Campo 2</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Campo 3</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Campo 4</td>
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
				<h2>Matriz de contraste mitótico</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Comparación</th>
								<th>Rasgo morfológico dominante</th>
								<th>Diferencia clave</th>
								<th>Inferencia biológica</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Interfase vs mitosis</th>
								<td>Cromatina difusa vs cromosomas visibles</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Profase vs metafase</th>
								<td>Condensación vs alineación ecuatorial</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Anafase vs telofase</th>
								<td>Separación cromátidas vs reorganización nuclear</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Tejido con baja vs alta proliferación</th>
								<td>Pocas vs numerosas células en mitosis</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Observación morfológica vs inferencia biológica</th>
								<td>Imagen microscópica vs explicación funcional</td>
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
				<h2>Preguntas para razonar continuidad celular</h2>
			</div>
			<article className="card">
				<ul>
					<li>¿Qué fase resultó más frecuente y qué sugiere sobre el estado del tejido?</li>
					<li>¿Qué rasgo fue decisivo para diferenciar interfase de profase temprana?</li>
					<li>¿Cómo cambia tu interpretación cuando el índice mitótico aumenta notablemente?</li>
					<li>¿Qué relación estableces entre división celular, reparación y continuidad tisular?</li>
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
						La proliferación celular regula desarrollo y regeneración; su alteración se asocia
						a procesos patológicos, incluido crecimiento tumoral descontrolado.
					</p>
				</article>
				<article className="card">
					<p>
						En histología, laboratorio clínico y áreas de salud, interpretar mitosis e índice mitótico
						fortalece lectura de tejidos y toma de decisiones basadas en evidencia.
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
					<li>Distingo interfase y fases de mitosis con criterios morfológicos claros.</li>
					<li>Clasifico profase, metafase, anafase y telofase con evidencia observacional.</li>
					<li>Calculo e interpreto índice mitótico en campos celulares comparados.</li>
					<li>Relaciono proliferación con crecimiento, reparación y estado tisular.</li>
				</ol>
				<p>
					Cierre: leer el tiempo de la célula permite comprender cómo se sostiene la continuidad de la vida en los tejidos.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Profundiza</p>
				<h2>Caso breve de proliferación celular</h2>
			</div>
			<article className="card">
				<p>
					Dos muestras tisulares muestran índices mitóticos diferentes: 4% y 22%.
					Explica qué hipótesis funcionales propondrías para cada una y qué información
					adicional solicitarías para interpretar si el aumento proliferativo es fisiológico o patológico.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Ética, bioseguridad y cultura científica</p>
				<h2>Rigor en análisis de imágenes celulares</h2>
			</div>
			<article className="card">
				<ul>
					<li>Registra conteos reales y evita ajustar resultados a expectativas previas.</li>
					<li>Diferencia observación directa de inferencia para mantener trazabilidad.</li>
					<li>Usa responsablemente imágenes y datos de laboratorio virtual.</li>
					<li>Reconoce límites de una sola observación y justifica necesidad de múltiples campos.</li>
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
					<li>Bitácora digital completa de campos observados.</li>
					<li>Matriz comparativa de fases y patrones proliferativos.</li>
					<li>Respuestas argumentadas a la sección de interpretación.</li>
					<li>Conclusión final sobre continuidad celular e índice mitótico tisular.</li>
				</ul>
			</article>
		</section>
	
      </div>
    </main>
  );
}

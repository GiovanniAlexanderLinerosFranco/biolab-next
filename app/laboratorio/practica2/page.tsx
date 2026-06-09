import Link from 'next/link';
import OsmolaritySimulator from '@/components/simulators/OsmolaritySimulator';

export default function Practica2Page() {
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
					<p>Membrana plasmática, transporte de sustancias y homeostasis celular.</p>
				</article>
				<article className="card">
					<h3>Modalidad</h3>
					<p>Laboratorio virtual guiado por estaciones con bitácora digital comparativa.</p>
				</article>
				<article className="card">
					<h3>Duración estimada</h3>
					<p>140 minutos en sesión integrada con análisis individual y discusión colaborativa.</p>
				</article>
				<article className="card">
					<h3>Ubicación en la ruta formativa</h3>
					<p>Segunda práctica del curso: profundiza la relación estructura-función iniciada en la guía 1.</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Pregunta reto</p>
				<h2>¿Cómo decide una célula qué entra, qué sale y qué debe transportar con gasto de energía?</h2>
			</div>
			<article className="card">
				<p>
					Analiza evidencias de osmosis, difusión y transporte activo para explicar cómo la membrana
					actúa como frontera dinámica que no solo separa, sino que regula e integra a la célula con su entorno.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Por qué importa</p>
				<h2>La membrana conecta estructura celular, tejidos y salud</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<p>
						El equilibrio entre entrada y salida de agua, iones y nutrientes sostiene la función de tejidos,
						la comunicación celular y la respuesta fisiológica frente a cambios del medio.
					</p>
				</article>
				<article className="card">
					<p>
						Comprender permeabilidad y transporte es clave para interpretar edema, deshidratación,
						absorción intestinal, acción de fármacos y alteraciones metabólicas en contextos clínicos.
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
						Interpretar cómo la membrana plasmática regula el flujo de sustancias mediante mecanismos
						pasivos y activos, relacionando tonicidad, permeabilidad selectiva y homeostasis celular.
					</p>
				</article>
				<article className="card">
					<h3>Objetivos específicos</h3>
					<ul>
						<li>Comparar respuestas de células vegetales y animales en medios hipotónico, isotónico e hipertónico.</li>
						<li>Analizar evidencia de permeabilidad de membrana en remolacha bajo condiciones térmicas distintas.</li>
						<li>Distinguir difusión simple, difusión facilitada y transporte activo con datos experimentales.</li>
						<li>Argumentar relaciones entre transporte de membrana, homeostasis y función celular en salud.</li>
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
					<li>La membrana plasmática es una bicapa lipídica con proteínas y carbohidratos asociados.</li>
					<li>Un gradiente describe diferencias de concentración entre dos regiones.</li>
					<li>Soluto es lo que se disuelve; solvente es el medio que disuelve.</li>
					<li>La tonicidad del medio condiciona flujo neto de agua y volumen celular.</li>
					<li>El transporte activo requiere energía metabólica para mover sustancias contra gradiente.</li>
				</ul>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Conceptos clave</p>
				<h2>Lenguaje de interpretación de la práctica</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Membrana plasmática</h3>
					<p>Frontera selectiva que regula intercambio, señalización y reconocimiento celular.</p>
				</article>
				<article className="card">
					<h3>Mosaico fluido</h3>
					<p>Modelo dinámico con fosfolípidos, colesterol, glucoproteínas y glucolípidos.</p>
				</article>
				<article className="card">
					<h3>Difusión simple</h3>
					<p>Paso espontáneo de moléculas pequeñas a favor de gradiente, sin proteínas transportadoras.</p>
				</article>
				<article className="card">
					<h3>Difusión facilitada</h3>
					<p>Transporte pasivo mediado por canales o proteínas carrier.</p>
				</article>
				<article className="card">
					<h3>Osmosis</h3>
					<p>Movimiento de agua a través de membrana semipermeable según gradiente osmótico.</p>
				</article>
				<article className="card">
					<h3>Transporte activo</h3>
					<p>Movimiento contra gradiente con consumo de ATP o energía acoplada.</p>
				</article>
				<article className="card">
					<h3>Hipotónico</h3>
					<p>Medio con menor concentración de solutos que el interior celular.</p>
				</article>
				<article className="card">
					<h3>Isotónico</h3>
					<p>Medio con concentración de solutos equivalente al interior celular.</p>
				</article>
				<article className="card">
					<h3>Hipertónico</h3>
					<p>Medio con mayor concentración de solutos que el interior celular.</p>
				</article>
				<article className="card">
					<h3>Permeabilidad selectiva</h3>
					<p>Capacidad de permitir paso diferencial de moléculas según tamaño, carga y afinidad.</p>
				</article>
				<article className="card">
					<h3>Homeostasis</h3>
					<p>Mantenimiento de condiciones internas estables pese a cambios externos.</p>
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
					En una sala virtual de análisis biológico recibes seis módulos con datos sin interpretar:
					tejido vegetal en tres medios, células animales en soluciones de distinta tonicidad, extractos
					de remolacha en frío y calor, bolsas de celofán con reactivos, y cultivos de levadura control
					y experimental. Tu reto es integrar la evidencia para explicar cómo negocia la célula su relación
					con el entorno.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Explora y predice</p>
				<h2>Predicciones antes de observar resultados</h2>
			</div>
			<article className="card">
				<ol>
					<li>Predice qué ocurrirá con células vegetales en medios 1, 2 y 3 (hipotónico, isotónico e hipertónico).</li>
					<li>Anticipa cambios de volumen y forma en células animales en los mismos tipos de medio.</li>
					<li>Estima qué diferencia habrá en liberación de pigmento de remolacha entre frío y calentamiento.</li>
					<li>Propón qué sustancias atravesarán una membrana de celofán y cuáles no, con justificación.</li>
					<li>Predice la diferencia entre condición control y experimental en transporte activo de levaduras.</li>
				</ol>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Experiencia central</p>
				<h2>Ruta comparativa por estaciones</h2>
			</div>
			<div className="grid two-columns">
				<article className="card">
					<h3>Estación 1: Arquitectura de membrana</h3>
					<ul>
						<li>Propósito de observación: reconocer componentes y dinámica del modelo de mosaico fluido.</li>
						<li>Qué mirar: distribución de fosfolípidos, colesterol, glucoproteínas y glucolípidos.</li>
						<li>Qué comparar: zonas con mayor y menor fluidez según composición.</li>
						<li>Qué registrar: esquema funcional con etiquetas y rol de cada componente.</li>
						<li>Qué inferencia construir: cómo la arquitectura habilita permeabilidad selectiva y señalización.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 2: Osmosis en células vegetales</h3>
					<ul>
						<li>Propósito de observación: analizar turgencia y plasmólisis en distintos medios.</li>
						<li>Qué mirar: posición de membrana respecto a pared celular y cambios de volumen vacuolar.</li>
						<li>Qué comparar: comportamiento en medio 1, 2 y 3.</li>
						<li>Qué registrar: evidencia visual y descripción del estado celular en cada condición.</li>
						<li>Qué inferencia construir: relación entre tonicidad del medio y movimiento neto de agua.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 3: Osmosis en células animales</h3>
					<ul>
						<li>Propósito de observación: interpretar crenación, estabilidad o lisis según tonicidad.</li>
						<li>Qué mirar: cambios de forma, integridad de membrana y variación de tamaño.</li>
						<li>Qué comparar: respuestas en soluciones hipotónica, isotónica e hipertónica.</li>
						<li>Qué registrar: patrón de cambio morfológico y tiempo aproximado de aparición.</li>
						<li>Qué inferencia construir: impacto de ausencia de pared celular sobre la vulnerabilidad osmótica.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 4: Permeabilidad de membrana</h3>
					<ul>
						<li>Propósito de observación: evaluar alteración de membrana usando remolacha como modelo.</li>
						<li>Qué mirar: intensidad de liberación de pigmento en frío y con calentamiento.</li>
						<li>Qué comparar: control térmico frente a condición de mayor temperatura.</li>
						<li>Qué registrar: cambio de coloración y lectura cualitativa/cuantitativa del sobrenadante.</li>
						<li>Qué inferencia construir: relación entre integridad de membrana y fuga de compuestos intracelulares.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 5: Difusión facilitada</h3>
					<ul>
						<li>Propósito de observación: distinguir paso diferencial de solutos a través de membrana de celofán.</li>
						<li>Qué mirar: resultados de reactivos como Lugol, Benedict y nitrato de plata.</li>
						<li>Qué comparar: sustancias que atraviesan vs sustancias retenidas.</li>
						<li>Qué registrar: cambios observables y evidencia química de presencia/ausencia de solutos.</li>
						<li>Qué inferencia construir: rol de tamaño molecular y selectividad en el transporte.</li>
					</ul>
				</article>
				<article className="card">
					<h3>Estación 6: Transporte activo</h3>
					<ul>
						<li>Propósito de observación: reconocer uso de energía en intercambio celular de levaduras.</li>
						<li>Qué mirar: diferencia de respuesta entre grupo control y grupo experimental.</li>
						<li>Qué comparar: condiciones con metabolismo activo vs condiciones de actividad limitada.</li>
						<li>Qué registrar: indicadores de transporte y respuesta celular por condición.</li>
						<li>Qué inferencia construir: evidencia de transporte contra gradiente dependiente de energía.</li>
					</ul>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Estación interactiva</p>
				<h2>Simulador de tonicidad y comportamiento celular</h2>
			</div>

			<article className="card simulator-card space-y-6">
				<div>
					<h3>Estación interactiva: simulador de tonicidad</h3>
					<p>
						Ajusta la osmolaridad del medio y compara la respuesta de un eritrocito frente a una célula vegetal.
						Usa la evidencia visual del campo microscópico para justificar entrada o salida neta de agua y el cambio morfológico observado.
					</p>
				</div>

				<OsmolaritySimulator />

				<div className="grid two-columns">
					<article className="card">
						<h3>Qué debes observar</h3>
						<ul>
							<li>Variación del volumen celular al mover el gradiente osmótico.</li>
							<li>Diferencias entre una célula con pared celular y una sin pared celular.</li>
							<li>Cambios en la integridad o deformación de la membrana.</li>
						</ul>
					</article>
					<article className="card">
						<h3>Interpretación esperada</h3>
						<ul>
							<li>Medio hipotónico: entrada de agua y aumento del volumen celular.</li>
							<li>Medio isotónico: equilibrio dinámico sin cambio neto apreciable.</li>
							<li>Medio hipertónico: salida de agua, retracción o plasmólisis.</li>
						</ul>
					</article>
				</div>
			</article>

			<article className="card simulator-log-card">
				<h3>Registro experimental breve</h3>
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Célula seleccionada</th>
								<th>Medio aplicado</th>
								<th>Flujo de agua</th>
								<th>Cambio observado</th>
								<th>Interpretación</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Eritrocito o célula vegetal</td>
								<td>Hipotónico, isotónico o hipertónico</td>
								<td>Entrada, equilibrio o salida de agua</td>
								<td>Turgencia, estabilidad, lisis, crenación o plasmólisis</td>
								<td>Relaciona gradiente osmótico con morfología observada</td>
							</tr>
						</tbody>
					</table>
				</div>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Bitácora digital</p>
				<h2>Registro por módulos de observación</h2>
			</div>

			<article className="card">
				<h3>Células vegetales en medios 1, 2 y 3</h3>
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Medio</th>
								<th>Tonicidad propuesta</th>
								<th>Cambio observado</th>
								<th>Estado celular</th>
								<th>Interpretación</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>2</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>3</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</article>

			<article className="card">
				<h3>Células animales</h3>
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Condición</th>
								<th>Tonicidad</th>
								<th>Respuesta celular</th>
								<th>Riesgo funcional</th>
								<th>Justificación</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>A</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>B</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>C</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</article>

			<article className="card">
				<h3>Permeabilidad de remolacha</h3>
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Condición térmica</th>
								<th>Color del medio</th>
								<th>Intensidad de pigmento</th>
								<th>Integridad de membrana inferida</th>
								<th>Conclusión</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Frío</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Calentamiento</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</article>

			<article className="card">
				<h3>Difusión facilitada en membrana de celofán</h3>
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Sustancia evaluada</th>
								<th>Reactivo usado</th>
								<th>Evidencia de paso</th>
								<th>No paso / retención</th>
								<th>Interpretación</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Almidón</td>
								<td>Lugol</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Azúcar reductor</td>
								<td>Benedict</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Iones cloruro</td>
								<td>Nitrato de plata</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</article>

			<article className="card">
				<h3>Transporte activo en levaduras</h3>
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Grupo</th>
								<th>Condición metabólica</th>
								<th>Respuesta observada</th>
								<th>Evidencia de uso de energía</th>
								<th>Interpretación final</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Control</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Experimental</td>
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
				<h2>Matriz de contraste de mecanismos y escenarios</h2>
			</div>
			<article className="card">
				<div className="table-wrap">
					<table className="data-table">
						<thead>
							<tr>
								<th>Comparación</th>
								<th>Rasgo distintivo 1</th>
								<th>Rasgo distintivo 2</th>
								<th>Evidencia observacional</th>
								<th>Implicación en homeostasis</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Transporte pasivo vs activo</th>
								<td>A favor de gradiente vs contra gradiente</td>
								<td>Sin gasto energético vs con gasto energético</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Osmosis vegetal vs animal</th>
								<td>Pared celular amortigua cambios vs membrana expuesta</td>
								<td>Turgencia/plasmólisis vs lisis/crenación</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Difusión facilitada vs simple</th>
								<td>Requiere proteínas vs sin proteínas</td>
								<td>Selectividad alta vs selectividad limitada</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Membrana intacta vs alterada</th>
								<td>Retención de compuestos vs fuga de compuestos</td>
								<td>Permeabilidad regulada vs permeabilidad aumentada</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th>Control vs experimental</th>
								<td>Condición base vs condición intervenida</td>
								<td>Referencia estable vs respuesta variable</td>
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
				<h2>Preguntas para construir explicación biológica</h2>
			</div>
			<article className="card">
				<ul>
					<li>¿Cómo cambia el comportamiento celular según la tonicidad del medio?</li>
					<li>¿Por qué la remolacha calentada libera más pigmento que en condición fría?</li>
					<li>¿Qué evidencia apoya que algunas sustancias atraviesan la membrana de celofán y otras no?</li>
					<li>¿Cómo demuestra el módulo de levaduras que ciertos procesos requieren energía?</li>
					<li>¿Qué relación tienen estos fenómenos con la homeostasis celular?</li>
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
						Los principios de tonicidad ayudan a interpretar equilibrio hídrico, edema y deshidratación,
						así como la seguridad en la administración de soluciones intravenosas.
					</p>
				</article>
				<article className="card">
					<p>
						La comprensión del transporte de membrana permite analizar absorción intestinal, intercambio
						de sustancias y respuesta celular en escenarios clínicos, farmacológicos y biotecnológicos.
					</p>
				</article>
			</div>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Autoevaluación</p>
				<h2>Checklist y mini cierre conceptual</h2>
			</div>
			<article className="card">
				<ol>
					<li>Distingo con evidencia osmosis, difusión simple, difusión facilitada y transporte activo.</li>
					<li>Interpreto diferencias entre respuestas vegetales y animales frente a tonicidad.</li>
					<li>Argumento el efecto de alteración de membrana en la liberación de pigmentos.</li>
					<li>Relaciono resultados experimentales con homeostasis en contextos biológicos y de salud.</li>
				</ol>
				<p>
					Cierre: la membrana no es una barrera pasiva; es una interfaz activa que integra energía,
					sensibilidad al entorno y regulación de la vida celular.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Profundiza</p>
				<h2>Aplicación a una situación real</h2>
			</div>
			<article className="card">
				<p>
					Diseña una recomendación breve para un caso de deshidratación por diarrea aguda,
					explicando qué tipo de solución favorecería la recuperación del equilibrio celular y por qué,
					usando lenguaje basado en tonicidad y transporte de membrana.
				</p>
			</article>
		</section>

		<section className="section">
			<div className="section-heading">
				<p className="section-tag">Ética, bioseguridad y cultura científica</p>
				<h2>Responsabilidad en análisis e interpretación</h2>
			</div>
			<article className="card">
				<ul>
					<li>Registra datos completos y evita ajustar resultados para que coincidan con expectativas.</li>
					<li>Diferencia observaciones directas de inferencias para mantener trazabilidad científica.</li>
					<li>Usa de forma responsable imágenes, tablas y datos compartidos en entornos virtuales.</li>
					<li>Reconoce equivalentes de bioseguridad del laboratorio físico al trabajar con simulaciones y datasets.</li>
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
					<li>Bitácora digital completa de las seis estaciones.</li>
					<li>Tablas diligenciadas de osmosis, permeabilidad, difusión facilitada y transporte activo.</li>
					<li>Respuestas interpretativas a las preguntas de análisis.</li>
					<li>Conclusión final sobre mecanismos de transporte y homeostasis celular.</li>
				</ul>
			</article>
		</section>
      </div>
    </main>
  );
}

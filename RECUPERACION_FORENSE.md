# Recuperacion forense de BioLab Next

## Resumen ejecutivo

El punto de desvio principal no fue un problema aislado de centrado del dashboard. La evidencia del documento de trabajo del 04/06/2026 muestra que el deterioro comenzo cuando se ejecuto una migracion automatizada desde `bio-lab-virtual` hacia `biolab-next` combinando tres decisiones de alto riesgo:

1. fusionar `styles.css` legacy directamente dentro de `app/globals.css`
2. migrar HTML completo de las practicas sin separar contenido pedagogico de estructura visual antigua
3. sobreescribir luego paginas y componentes con comandos sucesivos en terminal para "corregir" duplicados y contraste

El resultado fue una colision entre CSS legacy, Tailwind, componentes React nuevos y contenido migrado. Eso explica el descentrado, los fondos blancos, los duplicados de simuladores y la perdida parcial de coherencia en practica 1 y practica 2.

## Evidencia documental clave

### 1. La fusion de CSS legacy fue ordenada explicitamente

En el registro del 04/06/2026 aparece esta instruccion:

- `cat ../bio-lab-virtual/estilos/styles.css >> app/globals.css`

Y mas adelante tambien aparece la implementacion automatizada del mismo comportamiento dentro de `migrador.js`:

- leer `../bio-lab-virtual/estilos/styles.css`
- hacer `append` dentro de `app/globals.css`
- marcarlo con `ESTILOS ORIGINALES DEL DR. LINEROS (BIO-LAB-VIRTUAL)`

Esta es la raiz mas clara de la degradacion visual global.

### 2. La propia conversacion reconoce la colision entre dos mundos

El documento `biolab-next 040626.docx` dice literalmente que el proyecto sufrio una:

- "colision entre dos mundos"
- el script "arrastro las viejas clases de HTML"
- eso produjo "texto ilegible", "fondos blancos desfasados" y "duplicacion de la estacion de trabajo"

Ese texto confirma que el error no fue teorico: ya habia sido detectado durante la sesion original.

### 3. La migracion automatica introdujo deuda estructural

El mismo registro incluye el script que luego quedo en `migrador.js`, con estas acciones:

- crear `app/laboratorio/practica1` a `practica8`
- copiar el contenido de `<main>` desde los HTML viejos
- reescribir atributos HTML a JSX
- inyectar `OsmolaritySimulator` en practica 2
- fusionar CSS legacy dentro de `app/globals.css`

Eso resolvio velocidad de migracion, pero sacrifico control de capas visuales y trazabilidad.

### 4. Despues de migrar, hubo una secuencia de sobreescrituras

El chat muestra varias reescrituras completas por terminal sobre:

- `app/page.tsx`
- `app/laboratorio/practica2/page.tsx`
- `components/simulators/OsmolaritySimulator.tsx`
- `app/globals.css`

La combinacion de "migrar todo", luego "purgar duplicados", luego "forzar modo oscuro" sin un baseline estable explica por que algunas zonas quedaron coherentes y otras se rompieron.

## Punto de quiebre mas probable

### Quiebre primario

La orden de copiar y anexar `styles.css` dentro de `app/globals.css` y repetir esa fusion via `migrador.js`.

### Quiebre secundario

La migracion automatizada de HTML completo de las practicas con clases legacy y placeholders previos de simuladores.

### Quiebre terciario

Las correcciones posteriores mediante comandos que sobrescribian archivos enteros, especialmente en practica 2, sin un commit intermedio ni una capa de layout estabilizada.

## Lo que ya se recupero en esta sesion

1. Se deduplico `app/globals.css` y se elimino la mayor parte del arrastre repetido.
2. Se estabilizo `app/layout.tsx` quitando la restriccion global de ancho que competia con los contenedores internos.
3. Se reparo `components/practica1/Paso1_Bioseguridad.tsx`, que habia quedado sobrescrito con una copia recursiva del carrusel completo.
4. Se dejo base PWA funcional minima con manifest, icono y service worker.
5. Se dejo `Paso5_Bitacora` conectado a Supabase con flujo real de envio.

## Estado actual del riesgo

### Riesgo alto aun presente

- las practicas migradas siguen mezclando contenido legado y presentacion moderna
- no existe historial Git util: el repo conserva solo el commit inicial
- el archivo `Historial de desarrollo...docx` casi no aporta texto util extraible; parece contener poco texto o una estructura no textual

### Riesgo medio

- quedan decisiones de diseno pendientes para homogeneizar todas las practicas al mismo nivel de calidad
- el build del entorno actual puede fallar por limites de memoria del contenedor, aunque el lint ya esta limpio

## Recomendacion operativa

### Fase 1

Congelar este estado como baseline y subirlo a GitHub antes de rehacer mas practicas.

### Fase 2

Refactorizar guia por guia, sin volver a correr `migrador.js` ni scripts de inyeccion, tomando solo el contenido pedagogico util y remaquetandolo en componentes React limpios.

### Fase 3

Usar las practicas 1 y 2 como patron de calidad para el resto:

- narrativa conservada
- simulacion propia
- estilo oscuro coherente
- evaluacion y bitacora integradas

## Archivos relacionados

- `app/globals.css`
- `app/layout.tsx`
- `app/laboratorio/practica1/page.tsx`
- `components/practica1/Paso1_Bioseguridad.tsx`
- `components/practica1/Paso5_Bitacora.tsx`
- `migrador.js`
- `inyector.js`
- `inyector_paso4.js`

## Conclusion

La PWA no se perdio por un unico error de centrado. Se desvio cuando se priorizo una migracion rapida y acumulativa sobre una integracion por capas. El problema del dashboard fue un sintoma. La causa real fue la mezcla de CSS legacy, HTML migrado y correcciones destructivas sin baseline versionado.

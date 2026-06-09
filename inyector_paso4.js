/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = './app/laboratorio/practica1/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Agregar el import en la parte superior si no existe
if (!content.includes('Paso4_Muestras')) {
  content = content.replace(
    /import Paso3_Microscopio from '.*';/,
    "import Paso3_Microscopio from '@/components/practica1/Paso3_Microscopio';\nimport Paso4_Muestras from '@/components/practica1/Paso4_Muestras';"
  );
}

// 2. Reemplazar el div de reserva con el componente
content = content.replace(
  /{currentStep === 3 && <div[^>]*>\\\[ Módulo de Muestras \\\][^<]*<\/div>}/,
  '{currentStep === 3 && <Paso4_Muestras />}'
);

fs.writeFileSync(path, content);
console.log('✅ Paso 4 (Muestras Biológicas) inyectado correctamente en el carrusel.');

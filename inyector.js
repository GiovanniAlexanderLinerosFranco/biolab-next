/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = './app/laboratorio/practica1/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Agregar el import en la parte superior si no existe
if (!content.includes('Paso3_Microscopio')) {
  content = content.replace(
    /import Paso2_Fundamentos from '.*';/,
    "import Paso2_Fundamentos from '@/components/practica1/Paso2_Fundamentos';\nimport Paso3_Microscopio from '@/components/practica1/Paso3_Microscopio';"
  );
}

// Reemplazar el div vacío con el componente real
content = content.replace(
  /{currentStep === 2 && <div[^>]*>\\\[ Módulo del Microscopio \\\][^<]*<\/div>}/,
  '{currentStep === 2 && <Paso3_Microscopio />}'
);

fs.writeFileSync(path, content);
console.log('✅ Paso 3 (Microscopio) inyectado correctamente en el carrusel.');

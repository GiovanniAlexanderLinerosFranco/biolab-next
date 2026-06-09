/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const oldDir = path.join(__dirname, '../bio-lab-virtual/guias');
const newDir = path.join(__dirname, 'app/laboratorio');

console.log("Iniciando volcado de datos...");

for (let i = 1; i <= 8; i++) {
    const oldFile = path.join(oldDir, `practica${i}.html`);
    if (!fs.existsSync(oldFile)) {
        console.log(`⚠️ Práctica ${i} no encontrada. Omitiendo...`);
        continue;
    }

    let html = fs.readFileSync(oldFile, 'utf8');
    
    // Extraer todo lo que está dentro de la etiqueta <main>
    const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    let mainContent = match ? match[1] : html;

    // Adaptación sintáctica de HTML a JSX (React)
    mainContent = mainContent.replace(/class=/g, 'className=');
    mainContent = mainContent.replace(/for=/g, 'htmlFor=');
    mainContent = mainContent.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />');
    mainContent = mainContent.replace(/<br\s*>/gi, '<br />');
    mainContent = mainContent.replace(/<hr\s*>/gi, '<hr />');
    mainContent = mainContent.replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />');
    mainContent = mainContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''); 
    // Los estilos en línea de HTML rompen React, se remueven preventivamente:
    mainContent = mainContent.replace(/style="([^"]*)"/g, ''); 

    let imports = "import Link from 'next/link';\n";
    
    // Lógica especial para la Práctica 2 (Inyección del Simulador)
    if (i === 2) {
        imports += "import OsmolaritySimulator from '@/components/simulators/OsmolaritySimulator';\n";
        if (mainContent.includes('simulador-osmolaridad-root')) {
            mainContent = mainContent.replace(/<div[^>]*id="simulador-osmolaridad-root"[^>]*>.*?<\/div>/is, '<div className="my-8"><OsmolaritySimulator /></div>');
        } else {
            mainContent += '\n<div className="my-8"><OsmolaritySimulator /></div>';
        }
    }

    // Ensamblaje del nuevo componente de página
    const componentCode = `${imports}\nexport default function Practica${i}Page() {\n  return (\n    <main className="min-h-screen bg-[#0B1120] text-slate-300 p-6 md:p-12 font-sans">\n      <div className="max-w-5xl mx-auto space-y-8">\n        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors w-fit bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-900/50 mb-8">\n          ← Volver al Panel Principal\n        </Link>\n        ${mainContent}\n      </div>\n    </main>\n  );\n}\n`;

    const targetFolder = path.join(newDir, `practica${i}`);
    fs.mkdirSync(targetFolder, { recursive: true });
    fs.writeFileSync(path.join(targetFolder, 'page.tsx'), componentCode);
    console.log(`✅ Guía ${i} volcada y convertida a componente dinámico.`);
}

// Fusión de CSS
const oldCss = path.join(__dirname, '../bio-lab-virtual/estilos/styles.css');
const newCss = path.join(__dirname, 'app/globals.css');
if (fs.existsSync(oldCss)) {
    let cssContent = fs.readFileSync(oldCss, 'utf8');
    fs.appendFileSync(newCss, '\n/* --- ESTILOS ORIGINALES DEL DR. LINEROS (BIO-LAB-VIRTUAL) --- */\n' + cssContent);
    console.log(`✅ Estilos CSS originales fusionados con éxito.`);
}

console.log("🚀 Migración estructural completada.");

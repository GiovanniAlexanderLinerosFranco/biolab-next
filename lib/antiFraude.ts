/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v2.6
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * CONTROL INDUSTRIAL ANTI-FRAUDE: Bloqueo estricto de Clipboard (Copy/Paste/Cut)
 * ============================================================================
 */

export const inicializarSeguridadPortapapeles = () => {
  if (typeof window === 'undefined') return;

  // 1. Bloquear el pegado en cualquier campo de texto abierto
  const manejarPegado = (e: ClipboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      e.preventDefault();
      alert("⚠️ Control de Integridad Académica BioGALF: Queda estrictamente prohibido PEGAR contenido externo en las respuestas de la bitácora. Debe redactar su propio análisis científico.");
    }
  };

  // 2. Bloquear el copiado y corte para evitar que se compartan las respuestas por WhatsApp
  const manejarCopiadoCorte = (e: ClipboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      e.preventDefault();
      alert("⚠️ Protección de Propiedad Intelectual: No está permitido copiar ni extraer los textos analíticos de este entorno de simulación.");
    }
  };

  // Acoplar los escuchadores globales al documento del navegador
  document.addEventListener('paste', manejarPegado, true);
  document.addEventListener('copy', manejarCopiadoCorte, true);
  document.addEventListener('cut', manejarCopiadoCorte, true);

  return () => {
    document.removeEventListener('paste', manejarPegado, true);
    document.removeEventListener('copy', manejarCopiadoCorte, true);
    document.removeEventListener('cut', manejarCopiadoCorte, true);
  };
};
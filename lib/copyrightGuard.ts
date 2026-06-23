/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v2.5
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * ============================================================================
 */

import { supabase } from './supabaseClient';

export const verificarLicenciaPropiedadIntelectual = async (idAsignatura: string) => {
  if (!supabase) return { autorizado: false, msg: "Falla crítica: Cliente de seguridad no inicializado." };

  try {
    // 1. CAPTURAR EL DOMINIO ACTUAL EN CALIENTE
    const dominioCliente = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

    // 1.1 BYPASS DOCENTE EN PRODUCCION: habilita revisión operativa con sesión administrativa
    if (typeof window !== 'undefined') {
      const sesionRaw = localStorage.getItem('biolab_estudiante_sesion');
      if (sesionRaw) {
        try {
          const sesion = JSON.parse(sesionRaw) as { email?: string; rol?: string };
          const correo = sesion.email?.trim().toLowerCase() || '';
          const esAdmin = sesion.rol === 'ADMIN' || correo === 'giovanni.lineros@ustabuca.edu.co';
          if (esAdmin) {
            return { autorizado: true, msg: "Operador docente autorizado en modo revisión." };
          }
        } catch {
          // Si la sesión está corrupta, se ignora y continúa la validación estándar.
        }
      }
    }

    // 2. BYPASS DE SEGURIDAD PARA OPERADOR (TÚ): Permitir desarrollo en Localhost y GitHub Codespaces
    if (
      dominioCliente === 'localhost' || 
      dominioCliente === '127.0.0.1' || 
      dominioCliente.endsWith('.github.dev') // <-- ESTA LÍNEA DA LUZ VERDE A TU CODESPACE
    ) {
      return { autorizado: true, msg: "Entorno de desarrollo autorizado para el operador maestro." };
    }

    // 3. CONTROL DE LICENCIA COMERCIAL ESTRICTO PARA PRODUCCIÓN (EMPRESAS / UNIVERSIDADES)
    const { data: licencia, error } = await supabase
      .from('ecosistema_configuracion')
      .select('estado, fecha_apertura, fecha_cierre')
      .eq('id', idAsignatura)
      .single();

    if (error || !licencia) {
      return { autorizado: false, msg: "Infracción de Software: Licencia comercial no encontrada o revocada." };
    }

    const ahora = new Date();
    const apertura = new Date(licencia.fecha_apertura);
    const cierre = new Date(licencia.fecha_cierre);

    if (!licencia.estado) {
      return { 
        autorizado: false, 
        msg: "Licencia no habilitada: La práctica está desactivada por cátedra." 
      };
    }

    if (Number.isNaN(apertura.getTime()) || Number.isNaN(cierre.getTime())) {
      return {
        autorizado: false,
        msg: "Licencia inválida: Ventana horaria de apertura/cierre no configurada correctamente.",
      };
    }

    if (ahora < apertura || ahora > cierre) {
      return {
        autorizado: false,
        msg: "Licencia fuera de horario: La práctica está fuera de la ventana temporal autorizada.",
      };
    }

    return { autorizado: true, msg: "Licencia de propiedad intelectual verificada correctamente." };

  } catch {
    return { autorizado: false, msg: "Falla de autenticación con el servidor de derechos de autor." };
  }
};
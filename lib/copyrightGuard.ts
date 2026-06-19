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
      .select('estado, fecha_cierre')
      .eq('id', idAsignatura)
      .single();

    if (error || !licencia) {
      return { autorizado: false, msg: "Infracción de Software: Licencia comercial no encontrada o revocada." };
    }

    const ahora = new Date();
    if (ahora > new Date(licencia.fecha_cierre) || !licencia.estado) {
      return { 
        autorizado: false, 
        msg: "Licencia Expirada: El periodo de uso autorizado para este software ha caducado. Contacte al soporte de BioGALF Home Health S.A.S." 
      };
    }

    return { autorizado: true, msg: "Licencia de propiedad intelectual verificada correctamente." };

  } catch (err) {
    return { autorizado: false, msg: "Falla de autenticación con el servidor de derechos de autor." };
  }
};
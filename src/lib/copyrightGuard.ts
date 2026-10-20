/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v2.5
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * ============================================================================
 */

import { supabase } from './supabaseClient';
import { BIOLAB_OPEN_ACCESS } from './openAccess';

export const verificarLicenciaPropiedadIntelectual = async (idAsignatura: string) => {
  // Acceso abierto temporal (sin QR / sin paywall de licencia).
  if (BIOLAB_OPEN_ACCESS) {
    return {
      autorizado: true,
      msg: `Acceso abierto temporal habilitado para ${idAsignatura}.`,
    };
  }

  if (!supabase) return { autorizado: false, msg: "Falla crítica: Cliente de seguridad no inicializado." };

  try {
    const dominioCliente = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

    if (typeof window !== 'undefined') {
      const sesionRaw = localStorage.getItem('biolab_estudiante_sesion');
      if (sesionRaw) {
        try {
          const sesion = JSON.parse(sesionRaw) as {
            practicaId?: string;
            rol?: string;
            expiraEn?: string;
            origen?: string;
          };

          const esModoPrueba =
            sesion.rol === 'DEVELOPER_TEST' &&
            sesion.practicaId === idAsignatura &&
            sesion.origen === 'admin-dashboard' &&
            typeof sesion.expiraEn === 'string' &&
            new Date(sesion.expiraEn).getTime() > Date.now();

          if (esModoPrueba) {
            return { autorizado: true, msg: 'Modo prueba de desarrollador habilitado desde dashboard.' };
          }
        } catch {
          // continúa
        }
      }
    }

    if (
      dominioCliente === 'localhost' ||
      dominioCliente === '127.0.0.1' ||
      dominioCliente.endsWith('.github.dev')
    ) {
      return { autorizado: true, msg: "Entorno de desarrollo autorizado para el operador maestro." };
    }

    const { data: licencia, error } = await supabase
      .from('ecosistema_configuracion')
      .select('estado')
      .eq('id', idAsignatura)
      .single();

    if (error || !licencia) {
      return { autorizado: false, msg: "Infracción de Software: Licencia comercial no encontrada o revocada." };
    }

    if (!licencia.estado) {
      return {
        autorizado: false,
        msg: "Licencia no habilitada: La práctica está desactivada por cátedra.",
      };
    }

    return { autorizado: true, msg: "Licencia de propiedad intelectual verificada correctamente." };
  } catch {
    return { autorizado: false, msg: "Falla de autenticación con el servidor de derechos de autor." };
  }
};

import { supabase } from './supabaseClient';

export interface DatosEstudiante {
  nombre: string;
  codigo: string;
  email: string;
  documento: string;
}

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validarAccesoLaboratorio = async (datos: DatosEstudiante, practicaId: string) => {
  if (!supabase) {
    return { valido: false, msg: "Error del sistema: El cliente de la base de datos no está inicializado." };
  }

  if (!datos.nombre.trim()) return { valido: false, msg: "Ingrese su nombre completo." };
  if (!datos.codigo.trim()) return { valido: false, msg: "Ingrese su código o identificador de estudiante." };
  if (!regexEmail.test(datos.email.toLowerCase().trim())) {
    return { valido: false, msg: "Ingrese un correo electrónico válido." };
  }
  if (!datos.documento.trim()) return { valido: false, msg: "Ingrese su documento de identidad." };

  try {
    const { data: config, error: errConfig } = await supabase
      .from('ecosistema_configuracion')
      .select('*')
      .eq('id', practicaId)
      .single();

    if (errConfig || !config) return { valido: false, msg: "Error al verificar la configuración de la práctica." };
    if (!config.estado) {
      return { valido: false, msg: "Acceso denegado: Esta práctica ha sido bloqueada temporalmente por el docente." };
    }

    const { data: matricula } = await supabase
      .from('ecosistema_matricula')
      .select('completado')
      .eq('codigo_estudiantil', datos.codigo)
      .eq('practica_id', practicaId)
      .single();

    if (matricula && matricula.completado) {
      return {
        valido: false,
        msg: "Seguridad Académica: Ya existe un reporte científico registrado y finalizado para este código de estudiante. No se permiten intentos múltiples.",
      };
    }

    const { error: errMatricula } = await supabase
      .from('ecosistema_matricula')
      .upsert(
        {
          practica_id: practicaId,
          codigo_estudiantil: datos.codigo,
          documento_identidad: datos.documento,
          estudiante_nombre: datos.nombre,
          estudiante_email: datos.email.toLowerCase().trim(),
        },
        { onConflict: 'codigo_estudiantil,practica_id' }
      );

    if (errMatricula) throw errMatricula;

    return { valido: true, msg: "Acceso autorizado." };
  } catch {
    return { valido: false, msg: "Falla de comunicación con el servidor central de control." };
  }
};

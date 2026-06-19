import { supabase } from './supabaseClient';

export interface DatosEstudiante {
  nombre: string;
  codigo: string;
  email: string;
  documento: string;
}

export const validarAccesoLaboratorio = async (datos: DatosEstudiante, practicaId: string) => {
  // 1. BLINDAJE PARA TYPESCRIPT: Verificar que el cliente de Supabase esté inicializado
  if (!supabase) {
    return { valido: false, msg: "Error del sistema: El cliente de la base de datos no está inicializado." };
  }

  // 2. VALIDACIÓN FORMAL DE EXPRESIONES REGULARES (REGEX)
  const regexCodigo = /^\d{7,8}$/; // Obliga 7 u 8 dígitos numéricos de la Santo Tomás
  const regexEmail = /^[a-zA-Z0-9._%+-]+@(usta\.edu\.co|ustabuca\.edu\.co)$/; // Dominio USTA obligatorio

  if (!datos.nombre.trim()) return { valido: false, msg: "Ingrese su nombre completo." };
  if (!regexCodigo.test(datos.codigo)) return { valido: false, msg: "Código estudiantil inválido (debe contener 7 u 8 dígitos)." };
  if (!regexEmail.test(datos.email.toLowerCase().trim())) return { valido: false, msg: "Acceso denegado: Debe utilizar su correo institucional USTA (@usta.edu.co o @ustabuca.edu.co)." };
  if (!datos.documento.trim()) return { valido: false, msg: "Ingrese su documento de identidad." };

  try {
    // 3. CONSULTAR REGLAS DE TIEMPO Y ESTADO DESDE SUPABASE (Ya garantizado que supabase no es null)
    const { data: config, error: errConfig } = await supabase
      .from('ecosistema_configuracion')
      .select('*')
      .eq('id', practicaId)
      .single();

    if (errConfig || !config) return { valido: false, msg: "Error al verificar la configuración de la práctica." };
    if (!config.estado) return { valido: false, msg: "Acceso denegado: Esta práctica ha sido bloqueada temporalmente por el docente." };

    const ahora = new Date();
    const apertura = new Date(config.fecha_apertura);
    const cierre = new Date(config.fecha_cierre);

    if (ahora < apertura || ahora > cierre) {
      return { valido: false, msg: "Acceso denegado: El horario permitido para el desarrollo de esta sesión ha expirado." };
    }

    // 4. CONSULTAR CONTROL DE INTENTO ÚNICO
    const { data: matricula } = await supabase
      .from('ecosistema_matricula')
      .select('completado')
      .eq('codigo_estudiantil', datos.codigo)
      .eq('practica_id', practicaId)
      .single();

    if (matricula && matricula.completado) {
      return { valido: false, msg: "Seguridad Académica: Ya existe un reporte científico registrado y finalizado para este código de estudiante. No se permiten intentos múltiples." };
    }

    // 5. REGISTRAR O ACTUALIZAR LA SESIÓN EN LA MATRÍCULA
    const { error: errMatricula } = await supabase
      .from('ecosistema_matricula')
      .upsert({
        practica_id: practicaId,
        codigo_estudiantil: datos.codigo,
        documento_identidad: datos.documento,
        estudiante_nombre: datos.nombre,
        estudiante_email: datos.email.toLowerCase().trim()
      }, { onConflict: 'codigo_estudiantil,practica_id' });

    if (errMatricula) throw errMatricula;

    return { valido: true, msg: "Acceso autorizado." };

  } catch (error) {
    return { valido: false, msg: "Falla de comunicación con el servidor central de control." };
  }
};
import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type IngresoPayload = {
  nombre: string;
  email: string;
  codigo?: string;
  documento: string;
  practicaId: string;
  token?: string;
  fingerprint: string;
};

export async function POST(request: NextRequest) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Supabase admin no configurado. Defina NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en Vercel.',
      },
      { status: 500 }
    );
  }

  const body = (await request.json()) as IngresoPayload;

  const practicaId = body.practicaId?.trim();
  const email = body.email?.trim().toLowerCase();
  const nombre = body.nombre?.trim();
  const documento = body.documento?.trim();
  const codigo = body.codigo?.trim() || documento;

  if (!practicaId || !email || !nombre || !documento || !codigo || !body.fingerprint) {
    return NextResponse.json(
      { ok: false, message: 'Faltan datos obligatorios para registrar el ingreso.' },
      { status: 400 }
    );
  }

  const { data: config, error: errorConfig } = await supabaseAdmin
    .from('ecosistema_configuracion')
    .select('estado, fecha_apertura, fecha_cierre')
    .eq('id', practicaId)
    .single();

  if (errorConfig || !config) {
    return NextResponse.json(
      { ok: false, message: 'No se pudo verificar la configuración de la práctica.' },
      { status: 500 }
    );
  }

  if (!config.estado) {
    return NextResponse.json(
      { ok: false, message: 'La práctica está bloqueada por cátedra en este momento.' },
      { status: 403 }
    );
  }

  const ahora = new Date();
  const apertura = new Date(config.fecha_apertura);
  const cierre = new Date(config.fecha_cierre);

  if (ahora < apertura || ahora > cierre) {
    return NextResponse.json(
      { ok: false, message: 'La práctica está fuera de la ventana horaria permitida.' },
      { status: 403 }
    );
  }

  const { error: errorMatricula } = await supabaseAdmin
    .from('ecosistema_matricula')
    .insert([
      {
        codigo_estudiantil: codigo,
        documento_identidad: documento,
        correo_institucional: email,
        practica_id: practicaId,
        device_fingerprint: body.fingerprint,
        completado: false,
      },
    ]);

  if (errorMatricula && errorMatricula.code === '23505') {
    return NextResponse.json(
      {
        ok: false,
        code: 'DUPLICATE',
        message:
          'Ya existe un registro de asistencia y un intento en curso con estas credenciales.',
      },
      { status: 409 }
    );
  }

  if (errorMatricula) {
    return NextResponse.json(
      { ok: false, message: errorMatricula.message },
      { status: 500 }
    );
  }

  const tablaBitacoraObjetivo = practicaId === 'biolab_p2' ? 'bitacoras_practica_2' : 'bitacoras_practica_1';

  const { error: errorBitacora } = await supabaseAdmin.from(tablaBitacoraObjetivo).insert([
    {
      estudiante_nombre: nombre,
      estudiante_email: email,
      respuestas_desafios: {},
      tabla_muestras: {},
      analis_contraste: `Acceso concedido vía QR Dinámico. Token: ${body.token?.trim() || 'Directo'}`,
      conclusiones_preguntas: {},
    },
  ]);

  if (errorBitacora) {
    return NextResponse.json(
      { ok: false, message: errorBitacora.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

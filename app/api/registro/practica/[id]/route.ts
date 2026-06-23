import { NextResponse } from 'next/server';
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from('ecosistema_configuracion')
    .select('id, estado, titulo_practica, fecha_apertura, fecha_cierre')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { ok: false, message: error?.message ?? 'Práctica no encontrada.' },
      { status: 404 }
    );
  }

  const ahora = new Date();
  const apertura = data.fecha_apertura ? new Date(data.fecha_apertura) : null;
  const cierre = data.fecha_cierre ? new Date(data.fecha_cierre) : null;

  let accesoHabilitado = Boolean(data.estado);
  let motivoBloqueo = '';

  if (!data.estado) {
    accesoHabilitado = false;
    motivoBloqueo = 'La práctica está desactivada por cátedra.';
  } else if (!apertura || Number.isNaN(apertura.getTime())) {
    accesoHabilitado = false;
    motivoBloqueo = 'La práctica no tiene fecha de apertura válida.';
  } else if (!cierre || Number.isNaN(cierre.getTime())) {
    accesoHabilitado = false;
    motivoBloqueo = 'La práctica no tiene fecha de cierre válida.';
  } else if (ahora < apertura) {
    accesoHabilitado = false;
    motivoBloqueo = 'La práctica aún no está dentro de la ventana horaria de apertura.';
  } else if (ahora > cierre) {
    accesoHabilitado = false;
    motivoBloqueo = 'La práctica se encuentra fuera de la ventana horaria permitida.';
  }

  return NextResponse.json({
    ok: true,
    data: {
      ...data,
      acceso_habilitado: accesoHabilitado,
      motivo_bloqueo: motivoBloqueo,
      ahora_servidor: ahora.toISOString(),
    },
  });
}

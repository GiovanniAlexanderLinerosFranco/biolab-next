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
    .select('id, estado, titulo_practica')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { ok: false, message: error?.message ?? 'Práctica no encontrada.' },
      { status: 404 }
    );
  }

  const ahora = new Date();
  // Acceso abierto por horario: solo el interruptor docente (estado) puede bloquear.
  const accesoHabilitado = Boolean(data.estado);
  const motivoBloqueo = data.estado
    ? ''
    : 'La práctica está desactivada por cátedra.';

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

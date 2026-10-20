import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type UpdatePayload = {
  estado?: boolean;
};

export async function PATCH(
  request: NextRequest,
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
  const body = (await request.json()) as UpdatePayload;

  if (typeof body.estado !== 'boolean') {
    return NextResponse.json(
      { ok: false, message: 'Solo se admite actualizar el interruptor de estado (activado/apagado).' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('ecosistema_configuracion')
    .update({ estado: body.estado })
    .eq('id', id)
    .select('id, asignatura, titulo_practica, estado')
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, data });
}

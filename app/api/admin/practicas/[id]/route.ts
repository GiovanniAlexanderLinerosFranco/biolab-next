import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type UpdatePayload = {
  estado?: boolean;
  fecha_cierre?: string;
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

  const updateData: { estado?: boolean; fecha_cierre?: string } = {};

  if (typeof body.estado === 'boolean') {
    updateData.estado = body.estado;
  }

  if (typeof body.fecha_cierre === 'string' && body.fecha_cierre.trim()) {
    updateData.fecha_cierre = body.fecha_cierre;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { ok: false, message: 'No hay campos válidos para actualizar.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('ecosistema_configuracion')
    .update(updateData)
    .eq('id', id)
    .select('id, asignatura, titulo_practica, estado, fecha_apertura, fecha_cierre')
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, data });
}

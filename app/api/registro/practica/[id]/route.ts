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

  return NextResponse.json({ ok: true, data });
}

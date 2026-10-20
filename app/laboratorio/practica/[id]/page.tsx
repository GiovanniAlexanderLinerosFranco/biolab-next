/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.2.1
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * RUTA DINAMICA DE PRACTICAS - REDIRECCION SEGURA PARA IDS biolab_pX
 * ============================================================================
 */

import { redirect } from 'next/navigation';

type PracticePageProps = {
  params: Promise<{ id: string }>;
};

const PRACTICE_ROUTE_MAP: Record<string, string> = {
  biolab_p1: '/laboratorio/practica1',
  biolab_p2: '/laboratorio/practica2',
  biolab_p3: '/laboratorio/practica3',
  biolab_p4: '/laboratorio/practica4',
  biolab_p5: '/laboratorio/practica5',
  biolab_p6: '/laboratorio/practica6',
  biolab_p7: '/laboratorio/practica7',
  biolab_p8: '/laboratorio/practica8',
};

export default async function PracticaDinamicaPage({ params }: PracticePageProps) {
  const { id } = await params;

  const sanitizedId = (id || '').trim().toLowerCase();
  const rutaDestino = PRACTICE_ROUTE_MAP[sanitizedId] || '/laboratorio/practica1';

  redirect(rutaDestino);
}

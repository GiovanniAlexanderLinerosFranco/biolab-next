/**
 * ============================================================================
 * @license CORE-ECOSYSTEM & BIOLAB VIRTUAL SYSTEM v3.3.1
 * @copyright (c) 2026 PhD. Giovanni Alexander Lineros Franco.
 * All Rights Reserved.
 * PROPERTY OF BIOGALF HOME HEALTH S.A.S.
 * * ENRUTADOR MAESTRO DE ACCESO - REDIRECCIÓN INMEDIATA
 * ============================================================================
 */

import { redirect } from 'next/navigation';

export default function RootPage() {
  // Envía a cualquier usuario directamente al panel de control de asistencia
  redirect('/laboratorio/registro');
}
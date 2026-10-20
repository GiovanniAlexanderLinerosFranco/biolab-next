/**
 * Acceso abierto temporal: sin QR / registro de asistencia.
 * Desactivar cuando se reactive el flujo institucional:
 * NEXT_PUBLIC_BIOLAB_OPEN_ACCESS=false
 */

export const BIOLAB_OPEN_ACCESS =
  process.env.NEXT_PUBLIC_BIOLAB_OPEN_ACCESS !== "false";

export type SesionBiolab = {
  nombre: string;
  email: string;
  codigo: string;
  practicaId: string;
  rol: string;
  origen: string;
};

export function ensureDemoSession(practicaId: string): SesionBiolab {
  const sesion: SesionBiolab = {
    nombre: "Visitante demo",
    email: "demo@biolab.local",
    codigo: "DEMO",
    practicaId,
    rol: "ESTUDIANTE",
    origen: "open-access",
  };

  if (typeof window === "undefined") return sesion;

  try {
    const raw = localStorage.getItem("biolab_estudiante_sesion");
    if (raw) {
      const actual = JSON.parse(raw) as Partial<SesionBiolab>;
      if (actual.practicaId === practicaId && actual.nombre) {
        return {
          nombre: actual.nombre,
          email: actual.email || sesion.email,
          codigo: actual.codigo || sesion.codigo,
          practicaId,
          rol: actual.rol || "ESTUDIANTE",
          origen: actual.origen || "open-access",
        };
      }
    }
  } catch {
    // regenerar
  }

  localStorage.setItem("biolab_estudiante_sesion", JSON.stringify(sesion));
  return sesion;
}

// ... tus otras funciones (cn, getAuthUser, etc)

export function isEncuestaActiva(fechaFin: Date | string | null): boolean {
  if (!fechaFin) return true; // Si no hay fecha fin, es indefinida (activa)
  const ahora = new Date();
  const cierre = new Date(fechaFin);
  return ahora < cierre;
}
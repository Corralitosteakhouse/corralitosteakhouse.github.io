// Ajustes generales del reto. Cambia aquí y sube los cambios (git push) para publicar.
export const RETO = {
  // Zona horaria de los restaurantes (El Paso). Define qué cuenta como "hoy".
  timeZone: "America/Denver",
  // Dificultad de los vasos por intento: cuántos cruces y cuánto dura cada uno (ms).
  // Después del último nivel se repite ese mismo, así todos terminan ganando.
  shuffle: [
    { swaps: 9, ms: 420 },
    { swaps: 7, ms: 560 },
    { swaps: 5, ms: 750 },
  ],
  // Usuario de Instagram para la invitación a compartir, ej. "@corralitosteakhouse".
  // Déjalo vacío ("") para no mostrar esa línea.
  instagram: "",
  // Pasos del flujo: bienvenida, juego, premio.
  totalSteps: 3,
} as const;

import Image from "next/image";

// logo.png mide 900 × 571.
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt="Corralito Steak House"
      width={900}
      height={571}
      priority={priority}
      sizes="(max-width: 640px) 80vw, 480px"
      className={`h-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)] ${className}`}
    />
  );
}

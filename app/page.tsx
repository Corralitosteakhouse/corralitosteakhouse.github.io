import Link from "next/link";

// GitHub Pages no tiene redirecciones del servidor: la raíz manda a /reto/ desde el navegador.
export default function Home() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/reto/" />
      <p className="p-8 text-center">
        <Link href="/reto/" className="text-gold underline">
          Reto Corralito
        </Link>
      </p>
    </>
  );
}

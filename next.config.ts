import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite probar desde el celular en el wifi local (http://192.168.x.x:3000) con `npm run dev`.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // Sitio 100 % estático para GitHub Pages: `npm run build` deja todo en out/.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

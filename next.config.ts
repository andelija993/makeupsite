import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Omogućava pregled sa telefona u istoj Wi‑Fi mreži tokom razvoja.
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

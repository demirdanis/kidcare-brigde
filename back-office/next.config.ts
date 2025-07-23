import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Image optimizasyonunu kapat
    // veya
    formats: ["image/avif", "image/webp"], // WebP formatını belirt
    remotePatterns: [
      // Tüm domainleri kabul et (genel çözüm)
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      // Mock data'daki spesifik domainler
      {
        protocol: "https",
        hostname: "www.zengardentr.com",
        pathname: "/shop/ir/**",
      },
      {
        protocol: "https",
        hostname: "www.peyzajmarket.com",
        pathname: "/dosyalar/**",
      },
      {
        protocol: "https",
        hostname: "www.mistralpeyzaj.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dsmcdn.com",
        pathname: "/ty10/**",
      },
      {
        protocol: "https",
        hostname: "www.bitkilerde.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;

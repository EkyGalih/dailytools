import type { NextConfig } from 'next'
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "https://elna-glyphographic-nutritively.ngrok-free.dev"
  ],
}

export default nextConfig
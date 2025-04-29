/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

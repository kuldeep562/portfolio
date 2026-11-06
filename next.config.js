/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Keep Next dev's incremental cache separate so `next build` cannot replace
  // chunks/manifests that an already-running dev server is currently serving.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  basePath: '/portfolio',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

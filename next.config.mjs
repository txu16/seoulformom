/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/seoulformom",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

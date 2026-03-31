/** @type {import('next').NextConfig} */
const nextConfig = {
  // sharp requires native binaries — exclude from webpack bundling so it uses the platform binary
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals ?? []), 'sharp']
    }
    return config
  },
}

export default nextConfig

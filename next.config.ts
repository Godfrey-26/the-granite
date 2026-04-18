const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.thegranite.co.zw',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.thegranite.co.zw/api/v1/:path*/',
      },
    ]
  },
}

export default nextConfig;
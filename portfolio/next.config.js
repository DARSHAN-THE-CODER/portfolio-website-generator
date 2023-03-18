/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  nextScriptWorkers: true,
  compiler: {
    removeConsole: true
  },
  images: {
    domains: [
      "i.ibb.co"
    ],
  },
}

module.exports = nextConfig

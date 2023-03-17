/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  nextScriptWorkers: true,
  compiler: {
    removeConsole: true
  },
}

module.exports = nextConfig

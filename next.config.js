/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false, // 카카오 SDK 중복 초기화 방지
}

module.exports = nextConfig
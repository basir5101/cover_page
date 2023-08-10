/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAIL: process.env.EMAIL || "basir.bsmrstu@gmail.com",
    PASSWORD: process.env.PASSWORD || "ofllefedyzwyleio",
    PASSWORD: process.env.DOMAIN || "https://www.coverpagemaker.com",
    PASSWORD: process.env.NEXTAUTH_URL || "https://cover-page.vercel.app",
  }
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAIL: process.env.EMAIL || "basir.bsmrstu@gmail.com",
    PASSWORD: process.env.PASSWORD || "nifxlabliyvfwyxh",
    DOMAIN: process.env.DOMAIN || "https://www.coverpagemaker.com",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "https://www.coverpagemaker.com",
  }
}

module.exports = nextConfig
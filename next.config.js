/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAIL: process.env.EMAIL || "basir.bsmrstu@gmail.com",
    PASSWORD: process.env.PASSWORD || "nifxlabliyvfwyxh",
    DOMAIN: process.env.DOMAIN || "https://www.coverpagemaker.com",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "https://www.coverpagemaker.com",
    SERVICE_ID: "service_b5mw3fj",
    TEMPLATE_ID: "template_cv5sc2p",
    PUBLIC_ID: "F3BiT-6qq9GIkJA_Y",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  output: "export",
  basePath: "/interior",
  assetPrefix: "/interior",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

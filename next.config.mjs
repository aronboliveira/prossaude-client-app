/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  distDir: "build",
  output: "export",
  productionBrowserSourceMaps: true,
};
export default nextConfig;

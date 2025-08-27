/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ui/shared", "@lib/shared", "@config/shared"],
};
export default nextConfig;

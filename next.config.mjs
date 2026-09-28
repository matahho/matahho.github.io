/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Root user page (matahho.github.io) → served from domain root, no basePath needed.
};

export default nextConfig;

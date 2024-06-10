/** @type {import('next').NextConfig} */
const nextConfig = {
 async redirects() {
  return [
   {
    source: "/dashboard",
    destination: "/dashboard/orders",
    permanent: true,
   },
  ];
 },
};

export default nextConfig;

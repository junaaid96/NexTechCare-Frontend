/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
    images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
    async redirects() {
        return [
            { source: "/profiles/:path*", destination: "/dashboard", permanent: false },
            { source: "/services/create", destination: "/dashboard/services/new", permanent: false },
        ];
    },
};
export default nextConfig;

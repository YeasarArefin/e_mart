/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['adminapi.applegadgetsbd.com']
    },
    /* async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/api/:path*',
            },
        ];
    }, */
};

export default nextConfig;
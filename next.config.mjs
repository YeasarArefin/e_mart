/** @type {import('next').NextConfig} */

let appUrl = '';
if (process.env.NODE_ENV === 'development') {
    appUrl = 'http://localhost:3000/';
}
if (process.env.NODE_ENV === 'production') {
    appUrl = 'https://exclusive-mart.vercel.app/';
}

const nextConfig = {
    images: {
        domains: ['adminapi.applegadgetsbd.com']
    },
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: appUrl,
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
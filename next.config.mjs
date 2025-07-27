/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            // Add this second object for uploadthing
            {
                protocol: "https",
                hostname: "utfs.io",
            },
        ],
    },
};

export default nextConfig;
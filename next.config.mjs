/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xiymxowfqd.ufs.sh',
        port: '',
        pathname: '/f/**', // This is needed to match the full image URL
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/**', // This is the standard path for UploadThing
      },
      // You should also add Clerk images if you use them
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      }
    ],
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'gateway.pinata.cloud',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'maroon-accused-peacock-746.mypinata.cloud',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: '**',  
        },
        {
          protocol: 'http',
          hostname: '**', 
        },
      ],
    },
  };
  
  export default nextConfig;
  
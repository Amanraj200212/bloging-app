import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  cacheComponents: true,

  //that increate uplaod limit later i  this
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // or 10mb
    },
  },

  images: {
    remotePatterns:[
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "keen-camel-412.convex.cloud",
        protocol: "https",
        port: "",
      },
      {
        hostname: "grand-trout-56.convex.cloud",
        protocol: "https",
        port: "",
      }
    ]
  },
};

export default nextConfig;

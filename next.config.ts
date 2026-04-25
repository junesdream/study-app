import type { NextConfig } from "next";

const nextConfig = {
    output: "export",
    assetPrefix: "./",
    images: {
        unoptimized: true
    }
};

export default nextConfig;

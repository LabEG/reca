import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: process.env["BASE_PATH"] ?? "",
    compiler: {
        styledComponents: true
    }
};

export default nextConfig;

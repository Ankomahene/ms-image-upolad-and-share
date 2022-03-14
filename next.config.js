/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: "serverless",
  images: {
    domains: [ "res.cloudinary.com" ],
  },
  env: {
    cloudinaryUploadUrl:
      "https://api.cloudinary.com/v1_1/mister-shadrack/image/upload",
    cloudinaryApiKey: "452854456635595",
  },
};

module.exports = nextConfig;

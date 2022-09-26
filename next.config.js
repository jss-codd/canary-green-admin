module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  env: {
    API_PATH: "https://kg5l0w8x6i.execute-api.us-west-1.amazonaws.com/api/admin/",
    API_PATH_USER: "https://kg5l0w8x6i.execute-api.us-west-1.amazonaws.com/api/user/",
    //API_PATH: "http://localhost:3001/api/admin/",
    //API_PATH_USER: "http://localhost:3001/api/user/",
    WEB_PATH: "https://canary-green-admin.vercel.app",
  },
  images: {
    domains: ['canary-green-admin.vercel.app'],
    loader: 'imgix',
    path: 'https://canary-green-admin.vercel.app/',
  },
}
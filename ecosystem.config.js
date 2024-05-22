module.exports = {
  apps: [
    {
      name: "foi",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      max_memory_restart: "200M",
      script: "./.output/server/index.mjs",
    },
    // {
    //   name: "lms",
    //   port: "3001",
    //   exec_mode: "fork",
    //   instances: 1,
    //   max_memory_restart: "200M",
    //   script: "./.output/server/index.mjs",
    // },
    {
      name: "lms",
      port: 3001, // This is not directly used by PM2, ensure your app uses it correctly
      exec_mode: "fork",
      instances: 1,
      max_memory_restart: "200M",
      script: "./.output/server/index.mjs",
      env: {
        NODE_ENV: "development",
        NUXT_PUBLIC_SITE_URL: "https://lms.devxhub.com",
        // Add other environment variables as needed
      }
    }
  ],
};

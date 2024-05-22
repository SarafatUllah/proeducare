// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "ProEdu Care",
      titleTemplate: "%s",
      htmlAttrs: {
        lang: "en",
      },
      script: [
        {
          src: `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY}`,
          async: true,
          defer: true,
        },
        {
          src: "https://js.pusher.com/8.0.1/pusher.min.js",
          async: true,
          defer: true,
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "keywords", content: process.env.NUXT_PUBLIC_META_KEYWORDS },
        { property: "og:type", content: "website" },
        { name: "description", content: "ProEdu Care Outsourcing Institute" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Inter:100,300,400,500,700,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Red+Hat+Display:100,300,400,500,700,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400,2&display=swap",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: `${process.env.NUXT_PUBLIC_CDN_URL}/favicon_io/favicon-16x16.png`,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: `${process.env.NUXT_PUBLIC_CDN_URL}/favicon_io/favicon-32x32.png`,
        },
        {
          rel: "icon",
          type: "image/x-icon",
          sizes: "48x48",
          href: `${process.env.NUXT_PUBLIC_CDN_URL}/favicon_io/favicon.ico`,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "64x64",
          href: `${process.env.NUXT_PUBLIC_CDN_URL}/favicon_io/favicon-64x64.png`,
        },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          sizes: "180x180",
          href: `${process.env.NUXT_PUBLIC_CDN_URL}/favicon_io/apple-touch-icon.png`,
        },
        {
          rel: "android-chrome-icon-192",
          type: "image/png",
          sizes: "192x192",
          href: `${process.env.NUXT_PUBLIC_CDN_URL}/favicon_io/android-chrome-192x192.png`,
        },
        {
          rel: "android-chrome-icon-512",
          type: "image/png",
          sizes: "512x512",
          href: `${process.env.NUXT_PUBLIC_CDN_URL}/favicon_io/android-chrome-512x512.png`,
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  runtimeConfig: {
    apiUrl: process.env.NUXT_PUBLIC_API_URL,
    authSecret: "secret",
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      cdnURL: process.env.NUXT_PUBLIC_CDN_URL,
      googleMapKey: process.env.NUXT_PUBLIC_GOOGLE_MAP_KEY,
      workflow: process.env.NUXT_PUBLIC_WORKFLOW,
      recaptchaKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
      pusherAppKey: process.env.NUXT_PUBLIC_PUSHER_APP_KEY,
      pusherHost: process.env.NUXT_PUBLIC_PUSHER_HOST,
      pusherPort: process.env.NUXT_PUBLIC_PUSHER_PORT,
    },
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  devtools: { enabled: true },

  css: ["~/assets/css/main.css", "v-calendar/dist/style.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@pinia/nuxt", "dayjs-nuxt", "@vee-validate/nuxt", "@nuxtjs/i18n"],

  dayjs: {
    plugins: ["relativeTime", "utc", "timezone"],
    defaultTimezone: "Dhaka",
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },

  i18n: {
    locales: [
      {
        code: "bn",
        name: "Bengali",
        emoji: "🇧🇩",
        file: "bn-BD.json",
      },
      {
        code: "en",
        name: "English",
        emoji: "🇺🇸",
        file: "en-US.json",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
    detectBrowserLanguage: false,
  },

  nitro: {
    preset: process.env.NITRO_PRESET || "node-cluster",
    storage: {
      cache: {
        driver: "redis",
        url: process.env.NUXT_PUBLIC_REDIS_URL,
      },
      redis: {
        driver: "redis",
        url: process.env.NUXT_PUBLIC_REDIS_URL,
      },
    },
    devStorage: {
      cache: {
        driver: "fs",
        base: "./data/cache",
      },
      redis: {
        driver: "fs",
        base: "./data/db",
      },
    },
    routeRules: {
      "/server/**": {
        proxy: `${process.env.NUXT_PUBLIC_API_URL}/**`,
      },
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "marquee",
    },
  },
});

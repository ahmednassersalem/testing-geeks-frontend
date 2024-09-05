export default {
  head: {
    titleTemplate: "suknai: %s",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Testing" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo.svg" },
    ],
    script: [
      { src: "https://code.jquery.com/jquery-3.7.1.min.js"},
    ],
  },

  css: ["~assets/scss/main.scss",'animate.css/animate.min.css'],

  plugins: [
    "~plugins/axiosConfig",
    "~plugins/api",
    "~plugins/vuelidate",
    { src: '~/plugins/otpInput.js' },
  ],

  bootstrapVue: {
    bootstrapVueCSS: {
      componentPlugins: ["ToastPlugin"],
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  buildModules: ["@nuxtjs/style-resources"],

  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    '@nuxt/http',
    "@nuxtjs/i18n",
    "@nuxtjs/proxy",
    "@nuxtjs/auth-next",
    "nuxt-vue-select",
  ],

  auth: {
    plugins: ["~plugins/axiosConfig.js"],
    watchLoggedIn: false,
  },

  build: {
    babel: {
      compact: true,
    },
    transpile: [/^vue2-google-maps($|\/)/],
  },

  i18n: {
    locales: [
      {
        code: "ar",
        iso: "ar-AR",
        name: "العربية",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
      },
    ],
    seo: true,
    defaultLocale: "ar",
    noPrefixDefaultLocale: true,
    vueI18n: {
      fallbackLocale: "ar",
      messages: {
        ar: require("./locales/ar.json"),
        en: require("./locales/en.json"),
      },
    },
  },

  axios: {},

  proxy: {},

  router: {
    prefetchLinks: false
  },

  ssr: false,
  loading: {
    color: "#008041",
    height: "3px",
    continuous: true,
  },

  generate: {}


};

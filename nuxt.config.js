
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "朔月十六夜的小窝",
    meta: [
      { charset: 'utf-8' },
      { name: 'referrer', content: 'no-referrer' },
      { name: 'baidu-site-verification', content: 'jedIgeXSOS' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://lib.baomitu.com/element-ui/2.12.0/theme-chalk/index.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@assets/css/reset.css',
    '@assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',
      {
        target: 'http://101.133.227.160/', // api主机
        pathRewrite: { '^/api': '/', changeOrigin: true }
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

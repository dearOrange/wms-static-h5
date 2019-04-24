const pkg = require('./package')

const apiProtocol = 'http://'
const apiHost = '192.168.1.141' // 192.168.1.X X=> 141=学意 164=冯辉 187=秋燕 173=徐洪杰
const apiPort = 8080

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '农链万家',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],

    script: [
      {
        src: '//at.alicdn.com/t/font_1066904_ffky608ne5t.js',
        async: true,
        defer: true
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/ui',
    '~/plugins/auth',
    '~/plugins/date',
    '~/plugins/status',
    '~/plugins/money',
    '~/plugins/validate',
    '~/plugins/cookie'
  ],
  // router: {
  //   middleware: 'check-auth'
  // },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true,
    baseURL: `${apiProtocol}${apiHost}:${apiPort}/api`
  },
  proxy: {
    '/api': {
      target: `${apiProtocol}${apiHost}:${apiPort}`, // 被代理服务地址
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login/validate.do', method: 'post' },
          logout: { url: 'auth/logout', method: 'post' },
          user: { url: 'main/getLoginUser.do', method: 'post' }
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  // 配置域名 和 端口
  server: {
    port: 8000,
    host: '0.0.0.0'
  }
}

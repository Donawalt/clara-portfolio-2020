import axios from 'axios'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/styles/reset.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // modules for full static before `nuxt export` (coming in v2.12)
    '~/modules/static',
    '~/modules/crawler',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // This is where you import the new plugin
    '@nuxtjs/prismic'
  ],
  // This is where you configure your settings for the new plugin
  prismic: {
    endpoint: 'https://claraportfolio.cdn.prismic.io/api/v2', // Your endpoint here
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
    preview: '/preview/'
  },
  /*
   ** Styles Ressources
   */
  styleResources: {
    scss: './assets/styles/variables.scss'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
    }
  },
  generate: {
    fallback: '404.html',
    routes () { // Made an axios request for generate nested post during generate process 
      return axios.get('https://claraportfolio.cdn.prismic.io/api/v1/documents/search?ref=Xp12aBIAACIAyOI_&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22Xp12JBIAACEAyOEP%22%29+%5D%5D') // at(document.id, "project_post")
        .then((res) => {
          return res.data.results.map((project) => {
            return '/project/' + project.uid
          })
        })
    }// Netlify reads a 404.html, Nuxt will load as an SPA
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'],
 
  

  srcDir:'src',
  css: ['~/assets/css/main.css',],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        // { rel: 'icon', type: 'image/x-icon', href: '/Asset18.png' }, // For the standard favicon
        // { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }, // Example for other formats
        // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, // For iOS devices
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  
})

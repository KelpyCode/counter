// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@vite-pwa/nuxt',
    '@vueuse/motion/nuxt',
    '@formkit/auto-animate/nuxt'
  ],

  ssr: false,
  devtools: {
    enabled: true
  },
  app: {
    // Important: trailing slash usually helps avoid 404 on refresh
    baseURL: '/counter/', // ← change this!
    // buildAssetsDir: 'assets',     // optional — avoid starting with _
    head: {
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',
  nitro: {
    preset: 'github-pages'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  pwa: {
    manifest: {
      name: 'Counter',
      short_name: 'Counter',
      display: 'standalone',
      display_override: ['window-controls-overlay', 'standalone', 'browser'],
      orientation: 'portrait',
      theme_color: '#22223b',
      background_color: '#22223b',
      start_url: '/counter/',
      icons: [
        {
          src: '/counter/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/counter/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  }
})

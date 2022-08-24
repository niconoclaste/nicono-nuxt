import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
	srcDir: 'src/',
  css: [
		'~/assets/logos.css',
		'~/assets/fonts.css',
		'~/assets/styles.css',
  ],

  plugins: [
  ],

  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
		'@nuxt/content'
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
});
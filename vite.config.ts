import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { generateSW } from 'rollup-plugin-workbox';
import { VitePluginSitemap } from '@tormak/vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePluginSitemap({
      baseUrl: 'https://untitled-card-game.travislane.dev',
      contentBase: 'public',
      routes: [
        { path: '/', name: 'Home' }
      ],
      urlGenHook: async (config: { routes: any; }) => {
        let routes = config.routes;
        return routes;
      }
    }),
    generateSW({
      swDest: './dist/service-worker.js',
      globDirectory: './dist',
      globPatterns: [
        '**/*.{html,json,js,css}',
      ],
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 10,
          },
        },
      }, {
        urlPattern: /\.(?:js|css)$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'assets',
          expiration: {
            maxEntries: 10,
          },
        },
      }, {
        urlPattern: /\.(?:html)$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages',
          expiration: {
            maxEntries: 10,
          },
        },
      }],
    })
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
});

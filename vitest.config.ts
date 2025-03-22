import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
// import vue from '@vitejs/plugin-vue'
// import tailwindcss from '@tailwindcss/vite'

export default mergeConfig(
  viteConfig,
  defineConfig({
    // plugins: [
    //   vue({
    //     template: {
    //       compilerOptions: {
    //         isCustomElement: (tag) => ['highlightjs'].includes(tag),
    //       },
    //     },
    //   }),
    //   tailwindcss(),
    // ],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./src/components/__tests__/setup.ts'],
    },
  }),
)

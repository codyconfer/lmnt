import {defineConfig} from "vite"
import {minifyTemplateLiterals} from "rollup-plugin-minify-template-literals"


const __root = import.meta.dirname
const __dist = `${__root}/dist`
const __src = `${__root}/src`
const __elements = `${__src}/elements`

export default defineConfig({
  resolve: {
    alias: [
      { find: "@root", replacement: __root },
      { find: "@", replacement: __src },
      { find: "@elements", replacement: __elements }
    ],
  },
  plugins: [
    minifyTemplateLiterals({exclude: 'node_modules/**'})
  ],
  build: {
    minify: 'terser',
    terserOptions: {format: {comments: false}},
    lib: {
      entry: {
        'lmnt': `${__src}/index.ts`,
        'lmnt.elements': `${__src}/elements/index.ts`,
      },
      name: 'lmnt',
      formats: ['cjs', 'es'],
      fileName: (format: string) => {
        const _js = `lib/js/`
        switch (format) {
          case 'es':
            return `${_js}lmnt.js`
          case 'iife':
          case 'cjs':
          case 'umd':
          case 'system':
          default:
            return `${_js}lmnt.${format}.js`
        }
      },
    },
    rollupOptions: {
      input: {
        main: `${__root}/index.html`,
      },
    },
    outDir: __dist,
  },
})

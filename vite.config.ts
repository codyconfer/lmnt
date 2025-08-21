import {defineConfig} from "vite"
import terser from "@rollup/plugin-terser"
import {minifyTemplateLiterals} from "rollup-plugin-minify-template-literals"


const __dirname = `.`
const __dist = `${__dirname}/dist`
const __src = `${__dirname}/src`
const __elements = `${__src}/elements`
const __events = `${__src}/events`

export default defineConfig({
  resolve: {
    alias: {
      '@root': __dirname,
      '@': __src,
      '@elements': __elements,
      '@events': __events,
    }
  },
  plugins: [
    minifyTemplateLiterals({exclude: 'node_modules/**'}),
    terser({format: {comments: false}})
  ],
  build: {
    lib: {
      entry: {
        'lmnt': `${__src}/index.ts`,
        'lmnt.elements': `${__src}/elements/index.ts`,
        //'lmnt.events': `${__src}/events/index.ts`,
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
        main: `${__dirname}/index.html`,
      },
    },
    outDir: __dist,
  },
})

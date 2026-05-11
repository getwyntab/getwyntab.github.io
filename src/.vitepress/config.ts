import process from 'node:process'
import ElementPlus from 'unplugin-element-plus/vite'
import { defineConfig, loadEnv } from 'vitepress'

// Theme related config
import headConfig from './config/headConfig'

// Enhanced meta generation
import generateMeta from './config/hooks/generateMeta'

// Provides how to generate Meta head tags

// Allows generation of RSS feed
import generateOgImages from './config/hooks/generateOgImages'

import markdownConfig from './config/markdownConfig'

// For use with loading Markdown plugins
import themeConfig from './config/themeConfig'

const title = 'WYNTab'
const description = 'Write Your NewTab - Fully customize your New Tab page with custom HTML templates.'

const env = loadEnv('', process.cwd())
const hostname: string = env.VITE_HOSTNAME || 'https://getwyntab.github.io'

export default defineConfig({
  outDir: '../dist',
  lastUpdated: true,
  cleanUrls: true,
  title,
  description,
  sitemap: {
    hostname,
  },
  head: headConfig,
  markdown: markdownConfig,
  themeConfig,
  transformHead: async context => generateMeta(context, hostname),
  buildEnd: async (context) => {
    generateOgImages(context)
  },
  vite: {
    plugins: [ElementPlus({})],
    ssr: {
      noExternal: ['element-plus'],
    },
  },
})

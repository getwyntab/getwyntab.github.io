import type { HeadConfig } from 'vitepress'

const headConfig: HeadConfig[] = [
  ['meta', { name: 'darkreader-lock' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ['meta', { name: 'twitter:card', content: 'summary' }],
  ['meta', { property: 'og:site_name', content: 'WYNTab' }],
  ['meta', { property: 'og:description', content: 'Write Your NewTab - Fully customize your New Tab page with custom HTML templates.' }],
  ['meta', { property: 'og:locale', content: 'en_US' }],
  ['meta', { property: 'og:type', content: 'website' }],
]

export default headConfig

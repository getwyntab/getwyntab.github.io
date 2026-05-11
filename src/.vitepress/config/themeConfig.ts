import type { DefaultTheme } from 'vitepress'

import nav from './navigation/navbar'
import sidebar from './navigation/sidebar'

const themeConfig: DefaultTheme.Config = {
  logo: {
    src: '/img/logo.png',
    width: 24,
    height: 24,
  },

  nav,
  sidebar,

  outline: [2, 3],

  socialLinks: [
    {
      icon: 'github',
      link: 'https://github.com/getwyntab/wyntab',
      ariaLabel: 'Project GitHub',
    },
  ],

  footer: {
    message: '<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Open-source Apache Licensed</a> <span class="divider">|</span> <a href="/privacy/">Privacy policy</a>',
    copyright: `Copyright © ${new Date().getFullYear()} WYNTab Team`,
  },

  editLink: {
    pattern: 'https://github.com/getwyntab/getwyntab.github.io/edit/main/src/:path',
    text: 'Help us improve this page',
  },

  lastUpdated: {
    text: 'Last updated',
    formatOptions: {
      forceLocale: true,
      dateStyle: 'long',
      timeStyle: 'short',
    },
  },

  search: {
    provider: 'local',
  },
}

export default themeConfig

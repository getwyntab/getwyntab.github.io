import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.SidebarMulti = {
  '/download/': defaultSidebar(),
  '/docs/': defaultSidebar(),
}

function defaultSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        {
          text: 'Download',
          link: '/download/',
        },
        {
          text: 'Contribute',
          link: '/docs/contribute',
        },
      ],
    },
    {
      text: 'Guides',
      items: [
        {
          text: 'Getting started',
          link: '/docs/guides/getting-started',
        },
        {
          text: 'Custom templates',
          link: '/docs/guides/custom-templates',
        },
        {
          text: 'Backups',
          link: '/docs/guides/backups',
        },
        {
          text: 'Security & Privacy',
          link: '/docs/guides/security-and-privacy',
        },
        {
          text: 'Troubleshooting',
          link: '/docs/guides/troubleshooting/',
          collapsed: true,
          items: [
            {
              text: 'Common issues',
              link: '/docs/guides/troubleshooting/common-issues',
            },
            {
              text: 'Diagnosis',
              link: '/docs/guides/troubleshooting/diagnosis',
            },
          ],
        },
      ],
    },
    {
      text: 'Frequently Asked Questions',
      items: [
        { text: 'General', link: '/docs/faq/general' },
        { text: 'Storage', link: '/docs/faq/storage' },
      ],
    },
  ]
}

export default sidebar

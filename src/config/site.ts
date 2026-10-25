export interface TemplateItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  alt: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const siteConfig = {
  name: 'WYNTab',
  tagline: 'Write Your NewTab',
  version: '0.6.0',
  siteVersion: '0.0.1',
  cwsUrl: 'https://chromewebstore.google.com/detail/wyntab/hbfabaimiglbfjhcppfedgjkpfgabiff',
  githubUrl: 'https://github.com/getwyntab/wyntab',
  siteUrl: 'https://getwyntab.github.io',
  description: 'Write your new tab in raw HTML, CSS, and React. Zero tracking, zero latency, isolated in an offline local sandbox.',
  templates: [
    {
      id: 'atmosphere',
      name: 'Atmosphere',
      tagline: 'Ambient fluid gradient clock with subtle time display',
      image: '/screenshots/screenshot-3-newtab-atmosphere.png',
      alt: 'WYNTab Atmosphere Template Preview',
    },
    {
      id: 'terminal',
      name: 'Terminal',
      tagline: 'Minimalist developer CLI with custom command prompt',
      image: '/screenshots/screenshot-4-newtab-terminal.png',
      alt: 'WYNTab Terminal Template Preview',
    },
    {
      id: 'links',
      name: 'Links',
      tagline: 'Utilitarian bookmark dock with keyboard hotkeys',
      image: '/screenshots/screenshot-5-newtab-links.png',
      alt: 'WYNTab Links Template Preview',
    },
    {
      id: 'editor',
      name: 'Editor',
      tagline: 'Split CodeMirror 6 live preview with instant compilation',
      image: '/screenshots/screenshot-2-editor.png',
      alt: 'WYNTab CodeMirror Editor Preview',
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      tagline: 'Workstation template manager and preset library',
      image: '/screenshots/screenshot-1-dashboard.png',
      alt: 'WYNTab Dashboard Preview',
    },
  ],
  features: [
    {
      id: 'codemirror',
      title: 'Split CodeMirror 6 Editor',
      description: 'Full-canvas editor with syntax highlighting, line numbers, and live split-screen preview with zero reload delay.',
      icon: 'Code2',
    },
    {
      id: 'react',
      title: 'React 18 & JSX Engine',
      description: 'In-browser Sucrase transpiler compiles JSX and React 18 on the fly. No Node.js build step or bundlers required.',
      icon: 'Boxes',
    },
    {
      id: 'sandbox',
      title: 'MV3 postMessage Sandbox',
      description: 'Strict iframe sandbox isolation separating template execution from browser privileges and web APIs.',
      icon: 'ShieldCheck',
    },
    {
      id: 'storage',
      title: 'window.wyntab Storage Bridge',
      description: 'Fast asynchronous key-value persistent storage (get, set, remove) securely scoped to each template.',
      icon: 'HardDrive',
    },
    {
      id: 'prerender',
      title: 'Zero-Latency Pre-rendering',
      description: 'Background pre-render pipeline completely eliminates blank or white flashes on new tab initialization.',
      icon: 'Zap',
    },
    {
      id: 'offline',
      title: '100% Offline & Private',
      description: 'Zero telemetry, zero external tracking, zero cloud accounts. All custom code and data stay strictly in your local browser.',
      icon: 'EyeOff',
    },
  ],
  aiPrompt: `Create a single-file HTML new tab page for the WYNTab browser extension.

Technical Specifications:
1. Deliver a single, complete, self-contained HTML file (all CSS in <style> and all JS in <script> or <script type="module">).
2. Layout must fill the full viewport (100vw by 100vh) with zero margin and zero scrollbar overflow:
   html, body { width: 100vw; height: 100vh; margin: 0; padding: 0; overflow: hidden; }
3. Theme: Utilitarian dark-mode first (#121212 / #1E1E1E surfaces with high-contrast readable typography).
4. Styling: You may include Tailwind CSS directly via:
   <script src="https://cdn.tailwindcss.com"></script>
5. Libraries: You may import external ES modules directly from https://esm.sh/ (e.g. canvas-confetti, lucide, chart.js).
6. Data Persistence: For any user data (notes, bookmarks, settings, todos), use WYNTab's asynchronous storage bridge instead of localStorage:
   - Save: await window.wyntab.set('key', value)
   - Read: const val = await window.wyntab.get('key')
   - Delete: await window.wyntab.remove('key')

Feature Requirements:
[Describe your desired new tab experience here — e.g., "A minimalist Pomodoro timer with daily top-3 task checklist and keyboard shortcuts."]`,
};
